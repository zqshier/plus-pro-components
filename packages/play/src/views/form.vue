<template>
  <el-card>
    <PlusForm v-model="state" label-width="140px" :columns="columns" :rules="rules" />
    {{ state }}
  </el-card>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { PlusColumn, FieldValues } from '@plus-pro-components/types'

const originData = {
  checkbox: [],
  input: '',
  textarea: '',
  rate: '',
  radio: '',
  slider: ''
}

const state = ref<FieldValues>({ ...originData })

const rules: any = {}

Object.keys(originData).forEach(key => {
  rules[key] = [
    {
      required: true,
      message: '不能为空',
      trigger: ['checkbox', 'radio', 'slider', 'rate'].includes(key) ? 'change' : 'change'
    }
  ]
})

const columns: PlusColumn[] = [
  {
    label: 'checkbox',
    prop: 'checkbox',
    valueType: 'checkbox',
    options: [
      {
        label: '四六级',
        value: '0'
      },
      {
        label: '计算机二级证书',
        value: '1'
      },
      {
        label: '普通话证书',
        value: '2'
      }
    ],
    fieldProps: {}
  },

  {
    label: 'input',
    width: 120,
    prop: 'input',
    fieldProps: {}
  },
  {
    label: 'textarea',
    prop: 'textarea',
    valueType: 'textarea',
    fieldProps: {
      rows: 100,
      maxlength: 10,
      showWordLimit: true,
      autosize: { minRows: 2, maxRows: 4 }
    }
  },
  {
    label: 'rate',
    width: 200,
    prop: 'rate',
    valueType: 'rate',
    fieldProps: {}
  },
  {
    label: 'radio',
    prop: 'radio',
    valueType: 'radio',
    options: [
      {
        label: '诗',
        value: '0'
      },
      {
        label: '远方',
        value: '1'
      },
      {
        label: '美食',
        value: '2'
      }
    ],
    fieldProps: {
      textColor: ''
    }
  },
  {
    label: 'slider',
    prop: 'slider',
    valueType: 'slider',
    fieldProps: {}
  }
]
</script>
