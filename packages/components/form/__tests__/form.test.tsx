import { describe, expect, test } from 'vitest'
import { nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import ElementPlus, { ElButton } from 'element-plus'
import { CreditCard, Calendar, Soccer } from '@element-plus/icons-vue'
import type { PlusColumn, FieldValues } from '@plus-pro-components/types'
import type { PlusFormGroupRow } from '@plus-pro-components/components/form'
import PlusForm from '../src/index.vue'

describe('form/index.vue', () => {
  test('render test', async () => {
    interface RestaurantItem {
      value: string
      link: string
    }

    interface Option {
      key: number
      label: string
      disabled: boolean
    }
    const generateData = () => {
      const data: Option[] = []
      for (let i = 1; i <= 15; i++) {
        data.push({
          key: i,
          label: `Option ${i}`,
          disabled: i % 4 === 0
        })
      }
      return data
    }

    const restaurants = ref<RestaurantItem[]>([])

    const createFilter = (queryString: string) => {
      return (restaurant: RestaurantItem) => {
        return restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
      }
    }
    const loadAll = () => {
      return [
        { value: 'vue', link: 'https://github.com/vuejs/vue' },
        { value: 'element', link: 'https://github.com/ElemeFE/element' },
        { value: 'cooking', link: 'https://github.com/ElemeFE/cooking' },
        { value: 'mint-ui', link: 'https://github.com/ElemeFE/mint-ui' },
        { value: 'vuex', link: 'https://github.com/vuejs/vuex' },
        { value: 'vue-router', link: 'https://github.com/vuejs/vue-router' },
        { value: 'babel', link: 'https://github.com/babel/babel' }
      ]
    }

    restaurants.value = loadAll()

    const columns: PlusColumn[] = [
      {
        label: 'autocomplete',
        width: 120,
        prop: 'autocomplete',
        valueType: 'autocomplete',
        tooltip: '自动补全输入框',
        fieldProps: {
          fetchSuggestions: (queryString: string, cb: any) => {
            const results = queryString
              ? restaurants.value.filter(createFilter(queryString))
              : restaurants.value
            // call callback function to return suggestions
            cb(results)
          }
        }
      },
      {
        label: 'cascader',
        prop: 'cascader',
        valueType: 'cascader',
        options: [
          {
            value: '0',
            label: '陕西',
            children: [
              {
                value: '0-0',
                label: '西安',
                children: [
                  {
                    value: '0-0-0',
                    label: '新城区'
                  },
                  {
                    value: '0-0-1',
                    label: '高新区'
                  },
                  {
                    value: '0-0-2',
                    label: '灞桥区'
                  }
                ]
              }
            ]
          },
          {
            value: '1',
            label: '山西',
            children: [
              {
                value: '1-0',
                label: '太原',
                children: [
                  {
                    value: '1-0-0',
                    label: '小店区'
                  },
                  {
                    value: '1-0-1',
                    label: '古交市'
                  },
                  {
                    value: '1-0-2',
                    label: '万柏林区'
                  }
                ]
              }
            ]
          }
        ]
      },
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
        ]
      },
      {
        label: 'color-picker',
        prop: 'color-picker',
        valueType: 'color-picker'
      },
      {
        label: 'time',
        prop: 'time',
        valueType: 'date-picker'
      },
      {
        label: 'select',
        width: 120,
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
        label: 'input',
        width: 120,
        prop: 'input'
      },
      {
        label: 'input-number',
        prop: 'number',
        valueType: 'input-number',
        fieldProps: { precision: 2, step: 2 }
      },
      {
        label: 'textarea',
        prop: 'textarea',
        valueType: 'textarea',
        fieldProps: {
          maxlength: 10,
          showWordLimit: true,
          autosize: { minRows: 2, maxRows: 4 }
        }
      },

      {
        label: 'rate',
        width: 200,
        prop: 'rate',
        valueType: 'rate'
      },
      {
        label: 'switch',
        width: 100,
        prop: 'switch',
        valueType: 'switch'
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
        ]
      },
      {
        label: 'text',
        prop: 'text',
        valueType: 'text'
      },
      {
        label: 'transfer',
        prop: 'transfer',
        valueType: 'transfer',
        fieldProps: {
          data: generateData()
        }
      },
      {
        label: 'divider',
        prop: 'divider',
        valueType: 'divider'
      },
      {
        label: 'slider',
        prop: 'slider',
        valueType: 'slider'
      },
      {
        label: 'time-picker',
        prop: 'time-picker',
        valueType: 'time-picker'
      },
      {
        label: 'time-select',
        prop: 'time-select',
        valueType: 'time-select'
      },
      {
        label: 'plus-radio',
        prop: 'plus-radio',
        valueType: 'plus-radio',
        options: [
          { label: '选项一', value: 1 },
          { label: '选项二', value: 2 }
        ]
      },
      {
        label: 'plus-date-picker',
        prop: 'plus-date-picker',
        valueType: 'plus-date-picker'
      },
      {
        label: 'plus-input-tag',
        prop: 'plus-input-tag',
        valueType: 'plus-input-tag'
      }
    ]
    const state = ref<FieldValues>({
      status: '0',
      name: '',
      rate: 4,
      progress: 100,
      switch: true,
      time: new Date().toString(),
      img: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
    })

    const rules = {
      name: [
        {
          required: true,
          message: '请输入名称'
        }
      ],
      tag: [
        {
          required: true,
          message: '请输入标签'
        }
      ]
    }

    const wrapper = mount(
      () => <PlusForm modelValue={state.value} rules={rules} columns={columns} />,
      {
        global: {
          plugins: [ElementPlus]
        }
      }
    )

    await nextTick()
    expect(wrapper.find('.el-autocomplete').exists()).toBe(true)
    expect(wrapper.find('.el-cascader').exists()).toBe(true)
    expect(wrapper.find('.el-checkbox-group').exists()).toBe(true)
    expect(wrapper.find('.el-color-picker').exists()).toBe(true)
    expect(wrapper.find('.el-date-editor').exists()).toBe(true)
    expect(wrapper.find('.el-input').exists()).toBe(true)
    expect(wrapper.find('.el-input-number').exists()).toBe(true)
    expect(wrapper.find('.el-textarea').exists()).toBe(true)
    expect(wrapper.find('.el-rate').exists()).toBe(true)
    expect(wrapper.find('.el-switch').exists()).toBe(true)
    expect(wrapper.find('.el-radio-group').exists()).toBe(true)
    expect(wrapper.find('.el-date-editor--time').exists()).toBe(true)
    expect(wrapper.find('.plus-radio').exists()).toBe(true)
    expect(wrapper.find('.plus-date-picker').exists()).toBe(true)
    expect(wrapper.find('.plus-input-tag').exists()).toBe(true)
    expect(wrapper.find('.el-text').exists()).toBe(true)
    expect(wrapper.find('.el-divider').exists()).toBe(true)
    expect(wrapper.find('.el-transfer').exists()).toBe(true)
  })

  test('group test', async () => {
    const state = ref({
      status: '0',
      name: '',
      rate: 4,
      progress: 100,
      switch: true,
      time: new Date().toString(),
      img: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
    })

    const rules = {
      name: [
        {
          required: true,
          message: '请输入名称'
        }
      ],
      tag: [
        {
          required: true,
          message: '请输入标签'
        }
      ]
    }

    const group: PlusFormGroupRow[] = [
      {
        title: '第一分组',
        icon: CreditCard,
        columns: [
          {
            label: '名称',
            width: 120,
            prop: 'name',
            valueType: 'copy',
            tooltip: '名称最多显示6个字符'
          },
          {
            label: '状态',
            width: 120,
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
          }
        ]
      },
      {
        title: '第二分组',
        icon: Calendar,
        columns: [
          {
            label: '标签',
            width: 120,
            prop: 'tag'
          },
          {
            label: '执行进度',
            width: 200,
            prop: 'progress'
          },
          {
            label: '评分',
            width: 200,
            prop: 'rate',
            valueType: 'rate'
          },
          {
            label: '是否显示',
            width: 100,
            prop: 'switch',
            valueType: 'switch'
          }
        ]
      },
      {
        title: '第三分组',
        icon: Soccer,
        columns: [
          {
            label: '时间',
            prop: 'time',
            valueType: 'date-picker'
          },
          {
            label: '数量',
            prop: 'number',
            valueType: 'input-number',
            fieldProps: { precision: 2, step: 2 }
          },
          {
            label: '城市',
            prop: 'city',
            valueType: 'cascader',
            options: [
              {
                value: '0',
                label: '陕西',
                children: [
                  {
                    value: '0-0',
                    label: '西安',
                    children: [
                      {
                        value: '0-0-0',
                        label: '新城区'
                      },
                      {
                        value: '0-0-1',
                        label: '高新区'
                      },
                      {
                        value: '0-0-2',
                        label: '灞桥区'
                      }
                    ]
                  }
                ]
              },
              {
                value: '1',
                label: '山西',
                children: [
                  {
                    value: '1-0',
                    label: '太原',
                    children: [
                      {
                        value: '1-0-0',
                        label: '小店区'
                      },
                      {
                        value: '1-0-1',
                        label: '古交市'
                      },
                      {
                        value: '1-0-2',
                        label: '万柏林区'
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            label: '地区',
            prop: 'place',
            tooltip: '请精确到门牌号',
            fieldProps: {
              placeholder: '请精确到门牌号'
            }
          },
          {
            label: '经度',
            prop: 'lng',
            tooltip: '请保留两位小数'
          },
          {
            label: '纬度',
            prop: 'lat',
            tooltip: '请保留两位小数'
          },
          {
            label: '要求',
            prop: 'demand',
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
            ]
          },
          {
            label: '梦想',
            prop: 'gift',
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
            ]
          },
          {
            label: '到期时间',
            prop: 'endTime',
            valueType: 'date-picker',
            fieldProps: {
              type: 'datetimerange',
              startPlaceholder: '请选择开始时间',
              endPlaceholder: '请选择结束时间'
            }
          },
          {
            label: '奖励',
            prop: 'price'
          },
          {
            label: '提成',
            prop: 'percentage'
          },
          {
            label: '说明',
            prop: 'desc',
            valueType: 'textarea',
            fieldProps: {
              maxlength: 10,
              showWordLimit: true,
              autosize: { minRows: 2, maxRows: 4 }
            }
          }
        ]
      }
    ]

    const wrapper = mount(() => <PlusForm modelValue={state.value} rules={rules} group={group} />, {
      global: {
        plugins: [ElementPlus]
      }
    })

    await nextTick()
    expect(wrapper.find('.plus-form__group__item').exists()).toBe(true)
    expect(wrapper.find('.plus-form__group__item .plus-form__group__item__icon').exists()).toBe(
      true
    )
    expect(wrapper.find('.plus-form__group__item .el-card__header').text()).includes('第一分组')
    expect(wrapper.find('.plus-form').text()).includes('第二分组')
    expect(wrapper.find('.plus-form').text()).includes('第三分组')
  })

  test('slots test', async () => {
    const state = ref<FieldValues>({
      status: '0',
      name: '',
      rate: 4,
      progress: 100,
      switch: true,
      time: new Date().toString(),
      img: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
    })

    const rules = {
      name: [
        {
          required: true,
          message: '请输入名称'
        }
      ],
      tag: [
        {
          required: true,
          message: '请输入标签'
        }
      ]
    }

    const columns: PlusColumn[] = [
      {
        label: '名称',
        width: 120,
        prop: 'name',
        valueType: 'copy',
        tooltip: '名称最多显示6个字符'
      },
      {
        label: '状态',
        width: 120,
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
      }
    ]

    const submitText = '提交'
    const resetText = '重置'

    const footer = ({
      handleSubmit,
      handleReset
    }: {
      handleSubmit: () => void
      handleReset: () => void
    }) => {
      return (
        <div class="custom-footer">
          <ElButton onClick={handleSubmit}> {submitText} </ElButton>
          <ElButton onClick={handleReset}> {resetText} </ElButton>
        </div>
      )
    }

    const wrapper = mount(
      () => (
        <PlusForm
          modelValue={state.value}
          rules={rules}
          columns={columns}
          v-slots={{
            footer,
            'plus-label-name': () => 'plus-label-name',
            'plus-field-name': () => 'plus-field-name',
            'plus-extra-name': () => 'plus-extra-name',
            'tooltip-icon': () => 'tooltip-icon'
          }}
        />
      ),
      {
        global: {
          plugins: [ElementPlus]
        }
      }
    )

    await nextTick()
    expect(wrapper.find('.custom-footer').exists()).toBe(true)
    expect(wrapper.find('.custom-footer .el-button').exists()).toBe(true)
    expect(wrapper.find('.custom-footer').text()).includes(submitText)
    expect(wrapper.find('.custom-footer').text()).includes(resetText)
    expect(wrapper.find('.plus-form').text()).includes('plus-label-name')
    expect(wrapper.find('.plus-form').text()).includes('plus-field-name')
    expect(wrapper.find('.plus-form').text()).includes('tooltip-icon')
    expect(wrapper.find('.plus-form-item-extra').text()).includes('plus-extra-name')
  })
})
