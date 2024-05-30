# 常见问题

## 是否兼容element-plus@2.6.0 ？

是， [详见 issues/79](https://github.com/plus-pro-components/plus-pro-components/issues/79)，[详见 issues/105](https://github.com/plus-pro-components/plus-pro-components/issues/105)

## 国际化不起效果？

[详见](/guide/i18n.html#国际化不起效果)

## 表单字段改变后怎么根据改变字段的值通过接口获取另一个字段的 options?

[详见 issues/99](https://github.com/plus-pro-components/plus-pro-components/issues/99)

## PlusTable 和 PlusForm 复用 PlusColumn 问题？

[详见 issues/94](https://github.com/plus-pro-components/plus-pro-components/issues/94)

## 单个组件的事件在哪里配置?

[参考](/components/attrs.html)

## PlusTable 表格操作栏如何居中显示?

小于<el-tag>v0.1.7</el-tag>

```css
.plus-table .plus-table-action-bar .cell {
  justify-content: center;
}
```

大于等于<el-tag>v0.1.7</el-tag>

```html
<PlusTable :action-bar="{ actionBarTableColumnProps: { align: 'center' } }" />
```

## PlusTable 表格操作栏如何做权限控制?

小于<el-tag>v0.1.7</el-tag>

可使用 [ActionBarButtonsRow](/components/type.html#actionbarbuttonsrow) 中的 `show` 字段控制。 [示例](/components/table.html#自定义操作栏)

大于等于<el-tag>v0.1.7</el-tag>

可使用 [ActionBarButtonsRow](/components/type.html#actionbarbuttonsrow) 中的 `directives`指令字段控制。[示例](/components/table.html#权限控制)

## 搜索表单如何改变重置、搜索按钮的顺序?

[参考 flex 布局 order ](https://www.w3school.com.cn/tiy/t.asp?f=cssref_order)

[详见 issues/54](https://github.com/plus-pro-components/plus-pro-components/issues/54)

```css
.plus-search__button__wrapper .el-button {
  order: 2;
}

.plus-search__button__wrapper .el-button--primary {
  order: 1;
  margin-left: 0;
  margin-right: 20px;
}

.plus-search__button__wrapper .el-link {
  order: 3;
}
```
