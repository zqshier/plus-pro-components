<template>
  <div>
    <PlusForm
      v-model="state"
      :columns="columns"
      :rules="rules"
      @change="handleChange"
      @submit="handleSubmit"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { PlusColumn, FieldValues } from 'plus-pro-components'
import { set } from 'lodash-es'

const state = ref<FieldValues>({})

const columns: PlusColumn[] = [
  {
    label: '文本',
    prop: 'a.b.c',
    renderField: value => value + ' - 自定义'
  },
  {
    label: 'name',
    prop: 'a.b.d'
  },
  {
    label: 'tag',
    prop: 'a.b.e',
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
    label: 'tag1',
    prop: 'a.b.f',
    valueType: 'select',
    fieldProps: {
      multiple: true
    },
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
  }
]

const rules = {
  'a.b.c': [
    {
      required: true,
      message: '请输入名称'
    }
  ],
  'a.b.d': [
    {
      required: true,
      message: '请输入标签'
    }
  ]
}

const initValue = () => {
  set(state.value, 'a.b.c', '我是一段有想法的文本')
  set(state.value, 'a.b.e', '3')
  set(state.value, 'a.b.f', ['0', '3'])
}

setTimeout(() => {
  initValue()
}, 1000)

const handleChange = (values: FieldValues) => {
  console.log(values)
}
const handleSubmit = (values: FieldValues) => {
  console.log(values)
}
</script>
