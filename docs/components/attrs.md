# 事件透传

## vue3 的事件透传原则如下

**`以 on 开头，并跟着大写字母的 props 会被当作事件监听器。`**

**比如，onClick 与模板中的 @click 等价，onVisibleChange 与模板中的 @visible-change 等价**

参考 vue 官方文档 **[透传 Attributes](https://cn.vuejs.org/guide/components/attrs.html)**

参考 vue 官方文档 **[渲染函数 & JSX](https://cn.vuejs.org/guide/extras/render-function.html)**

## `PlusProComponents` 组件的事件透传

具备以下条件的都支持事件透传

- **[columns](/components/config.html) 配置中的`*Props`字段**

- **其他组件中的`*Props`字段**

- **文档中说明这个字段是组件的 props 的字段**

## `fieldProps` 事件示例

[columns](/components/config.html) 配置中的`fieldProps`字段表示的是 传递给具体表单项和表格显示的配置，如 el-input，el-select，el-tag，el-image 的 props ，同时还支持事件透传

```js
const columns = [
  {
    label: '状态',
    prop: 'status',
    // 对应的element-plus 的组件el-select
    valueType: 'select',
    options: [],
    fieldProps: {
      // https://element-plus.org/zh-CN/component/select.html#select-events
      // el-select 的事件 `change`，对应的配置就是 `onChange`
      onChange: () => {
        console.log('onChange')
      },
      // el-select 的事件 `visible-change`，对应的配置就是 `onVisibleChange`
      onVisibleChange: () => {
        console.log('visibleChange')
      },
      // el-select 的事件 `remove-tag`，对应的配置就是 `onRemoveTag`
      onRemoveTag: () => {
        console.log('onRemoveTag')
      }
    }
  },
  {
    label: '名称',
    prop: 'name',
    // 对应的element-plus 的组件el-input
    valueType: 'input',
    fieldProps: {
      // https://element-plus.org/zh-CN/component/input.html#input-events
      // el-input 的事件 `blur`，对应的配置就是 `onBlur`
      onBlur: () => {
        console.log('onBlur')
      },
      // el-input 的事件 `focus`，对应的配置就是 `onFocus`
      onFocus: () => {
        console.log('onFocus')
      },
      // el-input 的事件 `change`，对应的配置就是 `onChange`
      onChange: () => {
        console.log('onChange')
      },
      // el-input 的事件 `input`，对应的配置就是 `onInput`
      onInput: () => {
        console.log('onInput')
      },
      // el-input 的事件 `clear`，对应的配置就是 `onClear`
      onClear: () => {
        console.log('onClear')
      }
    }
  }
]
```

## PlusLayout 子组件事件写法示例

[PlusLayout](/components/layout.html) 的 `sidebarProps` 和`headerProps`表示的就是子组件的 props。

如 [PlusSidebar ](/components/sidebar.html) 的事件 `toggleCollapse`和 [PlusHeader ](/components/header.html)的事件`clickDropdownItem`。

示例：

> 模板中

```html
<PlusLayout
  :sidebarProps="{ onToggleCollapse: handleToggleCollapse }"
  :headerProps="{ onClickDropdownItem: handleClickDropdownItem}"
/>
```

> setup 中

```ts
const handleClickDropdownItem = (dropdownItem: { label: string; value: string }) => {
  console.log(dropdownItem)
}

const handleToggleCollapse = (collapse: boolean) => {
  console.log(collapse)
}
```

## 其他\*Props 和高级组件事件写法参考上面示例
