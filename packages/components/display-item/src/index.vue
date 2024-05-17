<template>
  <!-- 表单第一优先级 -->
  <PlusForm
    v-if="isEdit"
    ref="formInstance"
    v-model="modelValues"
    :model="modelValues"
    :columns="columns"
    :has-footer="false"
    :has-label="false"
    v-bind="column.formProps"
    class="plus-display-item__form"
    @change="handleChange"
  >
    <!--表单单项的插槽 -->
    <template v-if="$slots[getFieldSlotName(column.prop)]" #[getFieldSlotName(column.prop)]="data">
      <slot :name="getFieldSlotName(column.prop)" v-bind="data" :row="subRow" />
    </template>

    <!-- 表单el-form-item 下一行额外的内容 的插槽 -->
    <template v-if="$slots[getExtraSlotName(column.prop)]" #[getExtraSlotName(column.prop)]="data">
      <slot :name="getExtraSlotName(column.prop)" v-bind="data" :row="subRow" />
    </template>
  </PlusForm>

  <!-- 自定义显示 -->
  <template v-else-if="column.render && isFunction(column.render)">
    <PlusRender
      v-if="customFieldPropsIsReady"
      :render="column.render"
      :params="params"
      :callback-value="displayValue"
      :custom-field-props="customFieldProps"
    />
  </template>

  <!-- 插槽 -->
  <slot
    v-else-if="$slots[getTableCellSlotName(column.prop)]"
    :name="getTableCellSlotName(column.prop)"
    :prop="column.prop"
    :value-type="column.valueType"
    :row="subRow"
    :value="displayValue"
    :field-props="customFieldProps"
    :column="column"
  />

  <!--显示HTML -->
  <span
    v-else-if="column.renderHTML && isFunction(column.renderHTML)"
    class="plus-display-item"
    v-html="column.renderHTML(displayValue, { row: subRow, column, index })"
  />

  <!-- 状态显示 -->
  <span
    v-else-if="
      column.valueType === 'select' ||
      column.valueType === 'radio' ||
      column.valueType === 'checkbox'
    "
    class="plus-display-item plus-display-item__badge"
    v-bind="customFieldProps"
  >
    <span
      v-if="getStatus.color || getStatus.type"
      :class="[
        'plus-display-item__badge__dot',
        getStatus.type && !getStatus.color ? 'plus-display-item__badge__dot--' + getStatus.type : ''
      ]"
      :style="{ backgroundColor: getStatus.color }"
    />
    {{ getStatus.label }}
  </span>

  <!-- 复制 -->
  <span v-else-if="column.valueType === 'copy'" class="plus-display-item">
    {{ displayValue }}
    <el-icon
      size="16"
      class="plus-display-item__icon__copy"
      v-bind="customFieldProps"
      @click="handelClickCopy(column, subRow)"
    >
      <DocumentCopy v-if="!subRow.isCopy" />
      <Select v-else />
    </el-icon>
  </span>

  <!-- 统一处理 -->
  <template v-else-if="hasDisplayComponent(column.valueType)">
    <!--has slots  -->
    <component
      :is="isTagAndNoValue ? 'span' : displayComponent.component"
      v-if="displayComponent.hasSlots"
      :class="['plus-display-item', displayComponent.class]"
      v-bind="displayComponentProps"
    >
      <template v-for="(fieldSlot, key) in column.fieldSlots" :key="key" #[key]="data">
        <component
          :is="fieldSlot"
          :value="displayValue"
          :column="column"
          :row="subRow"
          v-bind="data"
        />
      </template>
      {{ column.valueType === 'link' ? column.linkText || displayValue : displayValue }}
    </component>
    <!--no slots  -->
    <component
      :is="displayComponent.component"
      v-else
      :class="['plus-display-item', displayComponent.class]"
      v-bind="displayComponentProps"
    >
      {{ displayComponent.format ? displayComponent.format(displayValue) : displayValue }}
    </component>
  </template>

  <el-divider
    v-else-if="column.valueType === 'divider'"
    ref="fieldInstance"
    class="plus-form-item-field"
    v-bind="customFieldProps"
  >
    {{ displayValue }}
  </el-divider>

  <!-- 没有format -->
  <span v-else class="plus-display-item" v-bind="customFieldProps">{{ displayValue }} </span>

  <slot name="edit-icon">
    <el-icon
      v-if="hasEditIcon && !isEdit"
      :size="16"
      class="plus-display-item__edit-icon"
      pointer-events="none"
    >
      <svg
        fill="none"
        viewBox="0 0 24 24"
        width="1em"
        height="1em"
        class="t-icon t-icon-edit-1"
        pointer-events="none"
      >
        <path
          fill="currentColor"
          d="M16.83 1.42l5.75 5.75L7.75 22H2v-5.75L16.83 1.42zm0 8.68l2.92-2.93-2.92-2.93-2.93 2.93 2.93 2.93zm-4.34-1.51L4 17.07V20h2.93l8.48-8.49L12.5 8.6z"
        />
      </svg>
    </el-icon>
  </slot>
</template>

<script lang="ts" setup>
import { DocumentCopy, Select } from '@element-plus/icons-vue'
import { PlusForm } from '@plus-pro-components/components/form'
import {
  isFunction,
  isArray,
  isString,
  getCustomProps,
  getTableCellSlotName,
  getFieldSlotName,
  getExtraSlotName,
  getValue,
  setValue
} from '@plus-pro-components/components/utils'
import type { Ref } from 'vue'
import { ref, watch, computed } from 'vue'
import type {
  PlusColumn,
  RecordType,
  FieldValueType,
  FieldValues
} from '@plus-pro-components/types'
import { useGetOptions } from '@plus-pro-components/hooks'
import { PlusRender } from '@plus-pro-components/components/render'
import { ElIcon, ElDivider } from 'element-plus'
import { hasDisplayComponent, getDisplayComponent } from './display-item'

export interface PlusDisplayItemProps {
  column: PlusColumn
  row: RecordType
  index?: number
  editable?: boolean | 'click' | 'dblclick'
}
export interface PlusTableTableColumnEmits {
  (e: 'change', data: { value: FieldValueType; prop: string; row: RecordType }): void
}

defineOptions({
  name: 'PlusDisplayItem'
})

const props = withDefaults(defineProps<PlusDisplayItemProps>(), {
  column: () => ({ prop: '', label: '' }),
  row: () => ({}),
  index: 0,
  editable: false
})
const emit = defineEmits<PlusTableTableColumnEmits>()

const customFieldProps = ref<RecordType>({})
const formInstance = ref()
const { customOptions: options } = useGetOptions(props.column)
const columns: Ref<PlusColumn[]> = ref([])
const subRow = ref(props.row)
const customFieldPropsIsReady = ref(false)
const isEdit = ref(false)
const falseArray = [false, 'click', 'dblclick']

watch(
  () => [props.editable, props.column.editable],
  () => {
    if (props.column.editable === true) {
      isEdit.value = true
      return
    }
    if (props.column.editable === false) {
      isEdit.value = false
      return
    }

    if (props.editable === true) {
      isEdit.value = true
      return
    }
    if (falseArray.includes(props.editable)) {
      isEdit.value = false
      return
    }
  },
  {
    immediate: true
  }
)

const hasEditIcon = computed(
  () =>
    (props.editable === 'click' || props.editable === 'dblclick') && props.column.editable !== false
)

/** 多层值支持 */
const displayValue = computed({
  get() {
    return getValue(subRow.value, props.column.prop)
  },
  set(value) {
    setValue(subRow.value, props.column.prop, value)
  }
})

/**
 * 表单绑定值处理
 */
const modelValues = computed({
  get() {
    return { [props.column.prop]: displayValue.value }
  },
  set(values) {
    displayValue.value = values[props.column.prop]
  }
})

/**
 * tag 没有值的时候不渲染
 */
const isTagAndNoValue = computed(() => props.column.valueType === 'tag' && !displayValue.value)

const params = computed(() => ({
  row: subRow.value,
  column: props.column,
  index: props.index
}))

const imageUrl = computed(() => {
  const option = displayValue.value
  if (option && isString(option)) {
    return { options: [option], url: option }
  }
  if (isArray(option)) {
    return { options: option, url: option[0] }
  }
  return { options: [], url: '' }
})

const getStatus = computed(() => {
  let option = options.value?.find(i => i.value === displayValue.value)
  if (props.column?.customGetStatus && isFunction(props.column?.customGetStatus)) {
    option = props.column?.customGetStatus({
      options: options.value,
      value: displayValue.value,
      row: subRow.value
    })
  }
  if (!option) {
    return { label: '', value: '' }
  }
  return option
})

const displayComponent = computed(() => getDisplayComponent(props.column.valueType))

const displayComponentProps = computed(() => {
  return {
    // img
    ...(props.column.valueType === 'img'
      ? {
          fit: 'cover',
          previewTeleported: true,
          src: imageUrl.value.url,
          previewSrcList: props.column.preview !== false ? imageUrl.value.options : []
        }
      : null),
    // progress
    ...(props.column.valueType === 'progress'
      ? {
          percentage: displayValue.value
        }
      : null),
    // link
    ...(props.column.valueType === 'link'
      ? {
          type: 'primary'
        }
      : null),
    // avatar
    ...(props.column.valueType === 'avatar'
      ? {
          src: displayValue.value
        }
      : null),
    ...customFieldProps.value
  }
})

watch(
  () => props.column,
  val => {
    if (val) {
      columns.value = [val as PlusColumn]
    }
  },
  {
    immediate: true,
    deep: true
  }
)

watch(
  () => props.column.fieldProps,
  val => {
    getCustomProps(val, displayValue.value, subRow.value, props.index, 'fieldProps')
      .then(data => {
        customFieldProps.value = data
        customFieldPropsIsReady.value = true
      })
      .catch(err => {
        throw err
      })
  },
  {
    immediate: true,
    deep: true
  }
)

watch(
  () => props.row,
  val => {
    subRow.value = { ...val }
  },
  {
    deep: true
  }
)

const copy = (data: string) => {
  const url = data
  const textarea = document.createElement('textarea')
  textarea.readOnly = true
  textarea.style.position = 'absolute'
  textarea.style.left = '-9999px'
  textarea.value = url
  document.body.appendChild(textarea)
  textarea.select()
  document.execCommand('Copy')
  textarea.remove()
}

const handelClickCopy = (item: PlusColumn, row: RecordType) => {
  copy(row[item.prop])
  row.isCopy = true
  setTimeout(() => {
    row.isCopy = false
  }, 3000)
}

const handleChange = (values: FieldValues) => {
  emit('change', { value: values[props.column.prop], prop: props.column.prop, row: subRow })
}

const startCellEdit = () => {
  if (props.column.editable === false) {
    isEdit.value = false
    return
  }
  isEdit.value = true
}

const stopCellEdit = () => {
  if (props.column.editable === true) {
    isEdit.value = true
    return
  }
  isEdit.value = false
}

const getDisplayItemInstance = () => {
  return {
    index: props.index,
    prop: props.column.prop,
    formInstance: computed(() => formInstance.value?.formInstance)
  }
}

defineExpose({
  startCellEdit,
  stopCellEdit,
  getDisplayItemInstance
})
</script>
