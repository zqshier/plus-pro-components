<template>
  <div v-for="item in columns" :key="item.label" class="plus-example-display-item">
    {{ item.label }}：
    <PlusDisplayItem :column="item" :row="row" />
    <el-divider style="margin: 10px 0" />
  </div>
</template>

<script lang="ts" setup>
import type { PlusColumn } from 'plus-pro-components'

const columns: PlusColumn[] = [
  {
    label: '名称',
    prop: 'name',
    tooltip: '名称最多显示6个字符'
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
    valueType: 'tag'
  },
  {
    label: '标签1',
    prop: 'tag1',
    valueType: 'tag'
  },
  {
    label: 'money',
    prop: 'money',
    valueType: 'money'
  },
  {
    label: '执行进度',
    prop: 'progress',
    valueType: 'progress',
    fieldProps: {
      style: {
        width: '100px'
      }
    }
  },
  {
    label: '评分',
    prop: 'rate',
    editable: true,
    valueType: 'rate'
  },
  {
    label: '是否显示',
    prop: 'switch',
    editable: true,
    valueType: 'switch'
  },
  {
    label: '时间',
    prop: 'time',
    valueType: 'date-picker'
  },
  {
    label: '时间1',
    prop: 'time1',
    valueType: 'date-picker'
  },
  {
    label: 'img',
    prop: 'img',
    valueType: 'img'
  },
  {
    label: '链接',
    prop: 'link',
    valueType: 'link',
    linkText: 'link'
  },
  {
    label: '链接1',
    prop: 'link1',
    valueType: 'link'
  },
  {
    label: 'code',
    prop: 'code',
    valueType: 'code'
  },
  {
    label: 'copy',
    prop: 'copy',
    valueType: 'copy'
  },
  {
    label: 'divider',
    prop: 'divider',
    valueType: 'divider'
  },
  {
    label: 'avatar',
    prop: 'avatar',
    valueType: 'avatar'
  }
]
const row = {
  name: 'name',
  status: '1',
  tag: 'success',
  tag1: '',
  money: '100',
  progress: 0,
  rate: 4,
  switch: true,
  time: new Date(),
  time1: '',
  code: `const data = 100`,
  copy: 'copy',
  link: '',
  link1: '',
  img: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
  avatar: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
  divider: 'divider'
}
</script>
