<template>
  <div>
    <el-row style="margin-bottom: 10px">
      <el-button type="primary" @click="handleAdd">新增数据</el-button>
      <el-button type="danger" @click="handleDelete">移除数据</el-button>
      <el-button plain @click="handleEditable(true)">开启编辑</el-button>
      <el-button plain @click="handleEditable(false)">关闭编辑</el-button>
      <el-button type="primary" @click="handleEditable('click')">
        切换点击（click）单元格开启编辑
      </el-button>
      <el-button type="primary" @click="handleEditable('dblclick')">
        切换双击（dblclick）单元格开启编辑
      </el-button>
    </el-row>

    <el-row style="margin-bottom: 10px">
      <el-alert type="warning" :closable="false">
        表格第一列和第二列有自己的 <code> editable</code>配置，优先级高于整体的
        <code> editable</code>，表格整体的配置改变后对于单个的配置无效。
      </el-alert>
    </el-row>

    <PlusTable
      ref="plusTableInstance"
      :columns="tableConfig"
      :table-data="tableData"
      :editable="editable"
      :title-bar="false"
      @formChange="formChange"
      @edited="handleEdited"
    />
  </div>
</template>

<script lang="ts" setup>
import { ElMessage } from 'element-plus'
import type { PlusColumn, PlusTableInstance } from 'plus-pro-components'
import { useTable } from 'plus-pro-components'
import { ref } from 'vue'

interface TableRow {
  id: number
  name: string
  status: string
  rate: number
  switch: boolean
  time: string | Date
  tag: string
}

const TestServe = {
  getList: async () => {
    const data = Array.from({ length: 4 }).map((item, index) => {
      return {
        id: index,
        name: index < 2 ? '' : index + 'name',
        status: String(index % 3),
        rate: index > 3 ? 2 : 3.5,
        switch: index % 2 === 0 ? true : false,
        time: index < 2 ? '' : new Date(),
        tag: index === 1 ? 'success' : index === 2 ? 'warning' : index === 3 ? 'info' : ''
      }
    })

    return { data: data as TableRow[] }
  }
}
const { tableData } = useTable<TableRow[]>()

const plusTableInstance = ref<PlusTableInstance | null>(null)

const editable = ref<string | boolean>(false)

const tableConfig = ref<PlusColumn[]>([
  {
    label: '名称',
    prop: 'name',
    width: 120,
    tableColumnProps: {
      align: 'right'
    },
    formProps: {
      // 添加校验
      rules: {
        name: [
          {
            required: true,
            message: '请输入名称'
          }
        ]
      }
    },
    // 优先级高于表格整体配置
    editable: false
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
    ],
    // 优先级高于表格整体配置
    editable: true
  },
  {
    label: '评分',
    width: 200,
    prop: 'rate',
    valueType: 'rate'
  },
  {
    label: '标签',
    width: 200,
    prop: 'tag',
    valueType: 'tag'
  },
  {
    label: '开关',
    width: 100,
    prop: 'switch',
    valueType: 'switch'
  },
  {
    label: '日期',
    prop: 'time',
    valueType: 'date-picker',
    width: 250,
    fieldProps: {
      type: 'date',
      placeholder: '请选择日期',
      format: 'YYYY-MM-DD',
      valueFormat: 'YYYY-MM-DD'
    }
  }
])

const getList = async () => {
  try {
    const { data } = await TestServe.getList()
    tableData.value = data.map(item => ({ ...item }))
  } catch (error) {}
}
getList()

const handleAdd = () => {
  const index = ((tableData.value.at(-1)?.id as number) || 0) + 1
  tableData.value.push({
    id: index,
    name: index < 2 ? '' : index + 'name',
    status: String(index % 3),
    rate: index > 3 ? 2 : 3.5,
    switch: index % 2 === 0 ? true : false,
    time: index < 2 ? '' : new Date(),
    tag: index === 1 ? 'success' : index === 2 ? 'warning' : index === 3 ? 'info' : ''
  })
}

const handleDelete = () => {
  tableData.value.pop()
}

const formChange = (e: any) => {
  console.log(e, 'formChange')
}
const handleEditable = (_editable: boolean | 'click' | 'dblclick') => {
  editable.value = _editable
}

// 当表格的editable值为'click'或'dblclick'退出编辑状态时触发
const handleEdited = () => {
  ElMessage.success('退出编辑了')
}
</script>
