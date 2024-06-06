<template>
  <div ref="tableWrapperInstance" class="plus-table">
    <PlusTableTitleBar
      v-if="titleBar"
      :columns="columns"
      :default-size="size"
      :title-bar="titleBar"
      :change-columns="subColumns"
      @click-density="handleClickDensity"
      @filter-table="handleFilterTableConfirm"
      @refresh="handleRefresh"
    >
      <template #title>
        <slot name="title" />
      </template>

      <template #toolbar>
        <slot name="toolbar" />
      </template>

      <!-- 表格拖拽行 和 列设置里拖拽 icon -->
      <template v-if="$slots['drag-sort-icon']" #drag-sort-icon>
        <slot name="drag-sort-icon" />
      </template>

      <!-- 表格表头 列设置 icon   -->
      <template v-if="$slots['column-settings-icon']" #column-settings-icon>
        <slot name="column-settings-icon" />
      </template>

      <!-- 表表格表头 密度 icon  -->
      <template v-if="$slots['density-icon']" #density-icon>
        <slot name="density-icon" />
      </template>
    </PlusTableTitleBar>

    <el-table
      ref="tableInstance"
      v-loading="loadingStatus"
      :reserve-selection="true"
      :data="tableData"
      :border="true"
      :height="height"
      :header-cell-style="headerCellStyle"
      :size="size"
      :row-key="rowKey"
      highlight-current-row
      scrollbar-always-on
      v-bind="$attrs"
      @cell-click="handleClickCell"
      @cell-dblclick="handleDoubleClickCell"
    >
      <!-- 默认插槽 -->
      <template #default>
        <slot name="default">
          <!-- 选择栏 -->
          <el-table-column
            v-if="isSelection"
            key="selection"
            type="selection"
            v-bind="selectionTableColumnProps"
          />

          <!-- 序号栏 -->
          <PlusTableTableColumnIndex
            v-if="hasIndexColumn"
            :index-content-style="indexContentStyle"
            :index-table-column-props="indexTableColumnProps"
            :page-info="(pagination as PlusPaginationProps)?.modelValue"
          />

          <!-- 拖拽行 -->
          <PlusTableColumnDragSort
            v-if="dragSortable"
            :sortable="dragSortable"
            :drag-sortable-table-column-props="dragSortableTableColumnProps"
            :table-instance="tableInstance"
            @dragSortEnd="handleDragSortEnd"
          >
            <template v-if="$slots['drag-sort-icon']" #drag-sort-icon>
              <slot name="drag-sort-icon" />
            </template>
          </PlusTableColumnDragSort>

          <!-- 展开行 -->
          <el-table-column v-if="hasExpand" type="expand" v-bind="expandTableColumnProps">
            <template #default="scoped">
              <div class="plus-table-expand-col">
                <slot name="expand" :index="scoped.$index" v-bind="scoped" />
              </div>
            </template>
          </el-table-column>

          <!--配置渲染栏  -->
          <PlusTableColumn
            :columns="subColumns"
            :editable="editable"
            @formChange="handleFormChange"
          >
            <!--表格单元格表头的插槽 -->
            <template v-for="(_, key) in headerSlots" :key="key" #[key]="data">
              <slot :name="key" v-bind="data" />
            </template>

            <!--表格单元格的插槽 -->
            <template v-for="(_, key) in cellSlots" :key="key" #[key]="data">
              <slot :name="key" v-bind="data" />
            </template>

            <!--表单单项的插槽 -->
            <template v-for="(_, key) in fieldSlots" :key="key" #[key]="data">
              <slot :name="key" v-bind="data" />
            </template>

            <!-- 表单el-form-item 下一行额外的内容 的插槽 -->
            <template v-for="(_, key) in extraSlots" :key="key" #[key]="data">
              <slot :name="key" v-bind="data" />
            </template>

            <!-- tooltip-icon  插槽 -->
            <template v-if="$slots['tooltip-icon']" #tooltip-icon>
              <slot name="tooltip-icon" />
            </template>

            <!--表格单元格编辑的插槽 -->
            <template v-if="$slots['edit-icon']" #edit-icon>
              <slot name="edit-icon" />
            </template>
          </PlusTableColumn>

          <!-- 操作栏 -->
          <PlusTableActionBar
            v-if="actionBar"
            v-bind="actionBar"
            @clickAction="handleAction"
            @clickActionConfirmCancel="handleClickActionConfirmCancel"
          >
            <!-- 操作栏更多icon插槽 -->
            <template v-if="$slots['action-bar-more-icon']" #action-bar-more-icon>
              <slot name="action-bar-more-icon" />
            </template>
          </PlusTableActionBar>
        </slot>
      </template>

      <!-- 插入至表格最后一行之后的内容 -->
      <template #append>
        <slot name="append" />
      </template>

      <!-- 当数据为空时自定义的内容 -->
      <template #empty>
        <slot name="empty" />
      </template>
    </el-table>

    <!-- 分页 -->
    <PlusPagination
      v-if="pagination"
      v-model="subPageInfo"
      v-bind="pagination"
      @change="handlePaginationChange"
    >
      <template v-if="$slots['pagination-left']" #pagination-left>
        <slot name="pagination-left" />
      </template>
      <template v-if="$slots['pagination-right']" #pagination-right>
        <slot name="pagination-right" />
      </template>
    </PlusPagination>
  </div>
</template>

<script lang="ts" setup>
import { reactive, toRefs, watch, ref, provide, shallowRef, useSlots, unref } from 'vue'
import type { PlusPaginationProps } from '@plus-pro-components/components/pagination'
import { PlusPagination } from '@plus-pro-components/components/pagination'
import {
  DefaultPageInfo,
  TableFormRefInjectionKey,
  TableFormFieldRefInjectionKey
} from '@plus-pro-components/constants'
import type { CSSProperties, Ref } from 'vue'
import type { ComponentSize } from 'element-plus/es/constants'
import type { TableInstance } from 'element-plus'
import { ElTable, ElTableColumn, vLoading } from 'element-plus'
import type {
  PageInfo,
  PlusColumn,
  RecordType,
  FormFieldRefsType
} from '@plus-pro-components/types'
import type { Options as SortableOptions } from 'sortablejs'
import {
  getTableCellSlotName,
  getTableHeaderSlotName,
  getFieldSlotName,
  getExtraSlotName,
  filterSlots,
  isSVGElement
} from '@plus-pro-components/components/utils'
import PlusTableActionBar from './table-action-bar.vue'
import PlusTableColumn from './table-column.vue'
import PlusTableTableColumnIndex from './table-column-index.vue'
import PlusTableColumnDragSort from './table-column-drag-sort.vue'
import PlusTableTitleBar from './table-title-bar.vue'
import type {
  ButtonsCallBackParams,
  TableState,
  ActionBarProps,
  TitleBar,
  TableFormRefRow,
  FormChangeCallBackParams
} from './type'

/**
 * 表格数据
 */
export interface PlusTableProps {
  /* 表格数据*/
  tableData?: RecordType[]
  /* 表格配置信息*/
  columns?: PlusColumn[]
  // 密度
  defaultSize?: ComponentSize
  /* 分页参数*/
  pagination?: false | Partial<PlusPaginationProps>
  /* 操作栏参数*/
  actionBar?: false | Partial<ActionBarProps>
  /* 是否需要序号*/
  hasIndexColumn?: boolean
  /* 是否工具栏*/
  titleBar?: boolean | Partial<TitleBar>
  /* 是否是多选表格*/
  isSelection?: boolean
  /* 是否需要展开行*/
  hasExpand?: boolean
  /* loading状态*/
  loadingStatus?: boolean
  /* 表格高度*/
  // eslint-disable-next-line vue/require-default-prop
  height?: string
  /* 表格头样式*/
  headerCellStyle?: Partial<CSSProperties>
  /** rowKey */
  rowKey?: string
  /** sortablejs配置 */
  dragSortable?: false | Partial<SortableOptions>
  dragSortableTableColumnProps?: RecordType
  indexTableColumnProps?: RecordType
  selectionTableColumnProps?: RecordType
  expandTableColumnProps?: RecordType
  indexContentStyle?:
    | Partial<CSSProperties>
    | ((row: RecordType, index: number) => Partial<CSSProperties>)
  editable?: boolean | 'click' | 'dblclick'
}
export interface PlusTableEmits {
  (e: 'paginationChange', pageInfo: PageInfo): void
  (e: 'clickAction', data: ButtonsCallBackParams): void
  (e: 'clickActionConfirmCancel', data: ButtonsCallBackParams): void
  (e: 'dragSortEnd', newIndex: number, oldIndex: number): void
  (e: 'formChange', data: FormChangeCallBackParams): void
  (e: 'refresh'): void
  (
    e: 'cell-click',
    row: RecordType,
    column: PlusColumn,
    cell: HTMLTableCellElement,
    event: Event
  ): void
  (
    e: 'cell-dblclick',
    row: RecordType,
    column: PlusColumn,
    cell: HTMLTableCellElement,
    event: Event
  ): void
  (e: 'edited'): void
}

defineOptions({
  name: 'PlusTable',
  inheritAttrs: false
})

const props = withDefaults(defineProps<PlusTableProps>(), {
  defaultSize: 'default',
  pagination: false,
  actionBar: false,
  hasIndexColumn: false,
  titleBar: true,
  isSelection: false,
  hasExpand: false,
  loadingStatus: false,
  tableData: () => [],
  columns: () => [],
  headerCellStyle: () => ({
    'background-color': 'var(--el-fill-color-light)'
  }),
  rowKey: 'id',
  dragSortable: false,
  dragSortableTableColumnProps: () => ({}),
  indexTableColumnProps: () => ({}),
  indexContentStyle: () => ({}),
  selectionTableColumnProps: () => ({
    width: 40
  }),
  expandTableColumnProps: () => ({}),
  editable: false
})
const emit = defineEmits<PlusTableEmits>()

const subColumns: Ref<PlusColumn[]> = ref([])
const tableInstance = shallowRef<TableInstance | null>(null)
const tableWrapperInstance = ref<HTMLDivElement | null>(null)
const state = reactive<TableState>({
  subPageInfo: {
    ...(((props.pagination as PlusPaginationProps)?.modelValue || DefaultPageInfo) as PageInfo)
  },
  size: props.defaultSize
})

const slots = useSlots()
/**
 * 表格单元格的插槽
 */
const cellSlots = filterSlots(slots, getTableCellSlotName())

/**
 * 表格单元格表头的插槽
 */
const headerSlots = filterSlots(slots, getTableHeaderSlotName())

/**
 * 表单单项的插槽
 */
const fieldSlots = filterSlots(slots, getFieldSlotName())

/**
 * el-form-item 下一行额外的内容 的插槽
 */
const extraSlots = filterSlots(slots, getExtraSlotName())

/**
 * 表单的ref
 */
const formRefs = shallowRef<Record<string | number, TableFormRefRow[]>>({})
provide(TableFormRefInjectionKey, formRefs)
/**
 * 表单Field的ref
 */
const formFieldRefs = shallowRef<FormFieldRefsType>({})
provide(TableFormFieldRefInjectionKey, formFieldRefs)

// 监听配置更改
watch(
  () => props.columns,
  val => {
    subColumns.value = val.filter(item => unref(item.hideInTable) !== true)
  },
  {
    deep: true,
    immediate: true
  }
)

// 发分页改变事件
const handlePaginationChange = () => {
  emit('paginationChange', { ...state.subPageInfo })
}

const handleAction = (callbackParams: ButtonsCallBackParams) => {
  emit('clickAction', callbackParams)
}

const handleClickActionConfirmCancel = (callbackParams: ButtonsCallBackParams) => {
  emit('clickActionConfirmCancel', callbackParams)
}

const handleFilterTableConfirm = (_columns: PlusColumn[]) => {
  subColumns.value = _columns.filter(item => unref(item.hideInTable) !== true)
}

// 密度
const handleClickDensity = (size: ComponentSize) => {
  state.size = size
}

const handleDragSortEnd = (newIndex: number, oldIndex: number) => {
  emit('dragSortEnd', newIndex, oldIndex)
}

// 刷新
const handleRefresh = () => {
  emit('refresh')
}

const handleFormChange = (data: FormChangeCallBackParams) => {
  emit('formChange', data)
}

// 保存活动的表单
const currentForm = ref()

const handleCellEdit = (row: RecordType, column: PlusColumn, type: 'click' | 'dblclick') => {
  const rowIndex = props.tableData.indexOf(row)
  const columnIndex = column.index
  const columnConfig = subColumns.value[column.index]

  // 不是可编辑行，如操作栏
  if (!columnConfig) return

  if (props.editable === type) {
    document.addEventListener('click', handleStopEditClick)

    const currentCellForm = formRefs.value[rowIndex][columnIndex]

    // 停止上一个表单的编辑状态
    if (currentForm.value) {
      currentForm.value?.stopCellEdit()
    }
    currentForm.value = currentCellForm

    // 开启当前点击的单元格的编辑
    currentCellForm.startCellEdit()

    // 当表单初始化完成
    const unwatch = watch(
      () => formFieldRefs.value.valueIsReady,
      val => {
        if (
          val?.value &&
          formFieldRefs.value?.fieldInstance?.focus &&
          (props.editable === 'click' || props.editable === 'dblclick')
        ) {
          formFieldRefs.value.fieldInstance.focus()
          // 销毁监听
          unwatch()
        }
      }
    )
  }
}

const handleClickCell = (
  row: RecordType,
  column: PlusColumn,
  cell: HTMLTableCellElement,
  event: Event
) => {
  handleCellEdit(row, column, 'click')
  emit('cell-click', row, column, cell, event)
}

const handleDoubleClickCell = (
  row: RecordType,
  column: PlusColumn,
  cell: HTMLTableCellElement,
  event: Event
) => {
  handleCellEdit(row, column, 'dblclick')
  emit('cell-dblclick', row, column, cell, event)
}

// 退出编辑状态
const handleStopEditClick = (e: MouseEvent) => {
  if (tableWrapperInstance.value && currentForm.value) {
    const wrapperClass = '.el-table__body-wrapper'
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const tbody = tableWrapperInstance.value.querySelector(wrapperClass)!
    const target = e?.target as HTMLElement
    const cls = Array.from(target.classList).join('.')
    const tempCls = cls ? `.${cls}` : ''
    const contains = tempCls && tbody.querySelector(tempCls)
    if (!contains && !isSVGElement(target)) {
      currentForm.value?.stopCellEdit()
      emit('edited')
      document.removeEventListener('click', handleStopEditClick)
    }
  }
}

const { subPageInfo, size } = toRefs(state)

defineExpose({
  formRefs,
  tableInstance
})
</script>
