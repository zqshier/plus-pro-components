<template>
  <div>
    <PlusTable
      key="1"
      :columns="tableConfig"
      :table-data="tableData"
      :action-bar="{ buttons, showNumber: 4 }"
      @clickAction="handleClickButton"
    />
  </div>
</template>

<script lang="ts" setup>
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { resolveDirective } from 'vue'
import { useTable } from 'plus-pro-components'
import type { PlusColumn, ButtonsCallBackParams } from 'plus-pro-components'

interface TableRow {
  id: number
  name: string
  status: string
  tag: string
  time: Date
}

const TestServe = {
  getList: async () => {
    const data = Array.from({ length: 3 }).map((item, index) => {
      return {
        id: index,
        name: index + 'name',
        status: String(index % 3),
        tag: index === 1 ? 'success' : index === 2 ? 'warning' : index === 3 ? 'info' : 'danger',
        time: new Date()
      }
    })
    return {
      data: data as TableRow[]
    }
  }
}

const { tableData, buttons } = useTable<TableRow[]>()

const permissionList = ['sys.view', 'sys.edit', 'sys.copy']

/**
 * 正常可引用（导入）写法
 */
const permission = {
  mounted(el: HTMLElement, binding) {
    const { value } = binding

    const hasButtonPermission = permissionList.includes(value)
    !hasButtonPermission && el.parentElement?.removeChild(el)
  }
}

/**
 * 如果 指令已经在全局注册，app.directive('copy',.....)，则需要使用resolveDirective解析出指令
 *
 * copy  指令已经在全局注册
 */
const copy = resolveDirective('copy')

buttons.value = [
  {
    // 查看
    text: '查看',
    props: {
      type: 'info'
    },
    //  show 字段控制权限
    show: () => permissionList.includes('sys.view')
  },
  {
    // 修改
    text: '修改',
    props: {
      type: 'primary'
    },
    directives: [
      // 相当于 v-permission="'sys.edit'"
      [permission, 'sys.edit']
    ]
  },
  {
    // 删除
    text: '删除',
    props: {
      type: 'danger'
    },
    confirm: {
      options: { draggable: true }
    },
    directives: [
      // 相当于 v-permission="'sys.del'"
      [permission, 'sys.del']
    ]
  },
  {
    text: '复制',
    props: {
      type: 'success'
    },
    directives: [
      // 相当于 v-permission="'sys.del'"
      [permission, 'sys.copy'],
      // 相当于 v-copy="'v-copy 复制的值'"
      [copy, 'v-copy 复制的值']
    ]
  }
]

const tableConfig: PlusColumn[] = [
  {
    label: '名称',
    prop: 'name'
  },
  {
    label: '状态',
    prop: 'status',
    valueType: 'select',
    options: [
      {
        label: '未解决',
        value: '0',
        color: 'red'
      },
      {
        label: '已解决',
        value: '1',
        color: 'blue'
      },
      {
        label: '解决中',
        value: '2',
        color: 'yellow'
      },
      {
        label: '失败',
        value: '3',
        color: 'red'
      }
    ]
  },
  {
    label: '标签',
    prop: 'tag',
    valueType: 'tag',
    fieldProps: (value: string) => {
      return { type: value }
    }
  },
  {
    label: '时间',
    prop: 'time',
    valueType: 'date-picker'
  }
]

const getList = async () => {
  try {
    const { data } = await TestServe.getList()
    tableData.value = data || []
  } catch (error) {}
}
getList()

const handleClickButton = (data: ButtonsCallBackParams) => {
  console.log(data.buttonRow.text)
}
</script>
