<template>
  <div>
    <PlusPage :columns="tableConfig" :request="getList" />
  </div>
</template>

<script lang="ts" setup>
import type { PlusColumn, PageInfo } from 'plus-pro-components'
import { computed } from 'vue'

const getList = async (
  query: PageInfo & {
    status?: string
    name?: string
  }
) => {
  const { page = 1, pageSize = 10, status, name } = query || {}
  const total = 1000
  const List = Array.from({ length: total }).map((item, index) => {
    return {
      id: index,
      name: index + 'name',
      status: String(index % 3),
      tag: index === 1 ? 'success' : index === 2 ? 'warning' : index === 3 ? 'info' : 'danger',
      progress: index * 10,
      rate: index > 3 ? 2 : 3.5,
      switch: index % 2 === 0 ? true : false,
      img: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      time: new Date(),
      custom: 'custom' + index
    }
  })

  const mockList = List.filter(item => {
    if (status && status !== item.status) {
      return false
    }
    if (name && name !== item.name) {
      return false
    }

    return true
  })

  const pageList = mockList.filter(
    (item, index) => index < pageSize * page && index >= pageSize * (page - 1)
  )

  // 等待2s
  await new Promise(resolve => {
    setTimeout(() => {
      resolve('')
    }, 2000)
  })

  return { data: pageList, success: true, total: mockList.length }
}

const tableConfig: PlusColumn[] = [
  {
    label: '名称',
    width: 120,
    prop: 'name',
    order: 0
  },
  {
    label: '状态',
    width: 120,
    prop: 'status',
    valueType: 'select',
    order: computed(() => 100),
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
    width: 120,
    prop: 'tag',
    valueType: 'tag',
    order: 2,
    fieldProps: (value: string) => {
      return { type: value }
    }
  },
  {
    label: '执行进度',
    width: 200,
    prop: 'progress',
    valueType: 'progress',
    fieldProps: (value: number) => {
      const data =
        value >= 80
          ? { status: 'success' }
          : value > 50
          ? { status: 'exception' }
          : { status: 'warning' }

      return data
    }
  },
  {
    label: '开关',
    width: 100,
    prop: 'switch',
    hideInSearch: true,
    valueType: 'switch',
    editable: true
  },
  {
    label: '时间',
    prop: 'time',
    valueType: 'date-picker',
    hideInForm: true
  }
]
</script>
