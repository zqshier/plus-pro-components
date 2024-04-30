# 版本升级

本记录只记录影响较大变更，对于一般[新功能、性能提升和问题修复](/guide/changelog.html)不在此记录。

## v0.1.0

### 更加友好

- 重构了 [PlusFormItem](/components/form-item.html) 和重 [PlusDisplay](/components/display-item.html) 组件，对新功能扩展更加友好。
- 重构了 d.ts 生成工具，ts 提示由原来的 `80%` 提升至 `100%`，对用户使用更加友好。

### 体积更小

- 整包体积由原来的 `39.5MB` 优化至 `9.5MB`，体积减少了 `76%`。
- CSS 体积由原来的 `17.7kB` 优化至 `12.8KB`，体积减少了 `28%`。

### 更高的单元测试覆盖率

- 单元测试覆盖率由原来的 `90%` 提升至 `92.5%`。

<el-divider />

## 从 v0.0.9 迁移到 v0.0.10

### PlusDrawerForm 抽屉表单 事件修改

- [PlusDrawerForm](/components/drawer-form.html#drawerform-events) 的事件`submit` 已废弃，请使用`confirm` 代替。[ 参考 DrawerForm-events](/components/drawer-form.html#drawerform-events)

<el-divider />

## 从 v0.0.7 迁移到 v0.0.8

### 国际化文件导入方式修改

- 导入文件报错

```sh
ERROR  failed to resolve import "plus-pro-components/locale/zh-cn.mjs"
ERROR  failed to resolve import "plus-pro-components/locale/en.mjs"
```

- 解决方案

```js
import plusZhCn from 'plus-pro-components/locale/zh-cn.mjs' // [!code --]
import plusZhCn from 'plus-pro-components/locale/zh-cn' // [!code ++]

import plusEn from 'plus-pro-components/locale/en.mjs' // [!code --]
import plusEn from 'plus-pro-components/locale/en' // [!code ++]
```

或者

```js
import plusZhCn from 'plus-pro-components/locale/zh-cn.mjs' // [!code --]
import plusZhCn from 'plus-pro-components/es/locale/lang/zh-cn' // [!code ++]

import plusEn from 'plus-pro-components/locale/en.mjs' // [!code --]
import plusEn from 'plus-pro-components/es/locale/lang/en' // [!code ++]
```

<el-divider />

## 从 v0.0.4 迁移到 v0.0.5

### PlusSearch 搜索组件

- 搜索按钮现在默认靠右，要恢复以前的顺序排布可使用以下代码

  ```css
  .plus-search .plus-search__button__wrapper.el-form-item {
    flex: none;
  }
  ```

<el-divider />

## 从 v0.0.3 迁移到 v0.0.4

### PlusFormItem 表单单项组件

- 表单单项组件 移除了 `valueType === 'date-picker'`时，`el-date-picker` 组件的默认属性 `format` 和`value-format`，原来的默认值都为 `YYYY-MM-DD HH:mm:ss`。

- 受影响的组件 [PlusForm](/components/form.html)， [PlusDialogForm](/components/dialog-form.html)，[PlusDrawerForm ](/components/drawer-form.html)， [PlusStepsForm ](/components/steps-form.html)，[PlusSearch ](/components/search.html)，[PlusDisplayItem ](/components/display-item.html)，[PlusTable ](/components/table.html)，[PlusPage ](/components/page.html)

<el-divider />

## 从 v0.0.2 迁移到 v0.0.3

### 高级组件通用配置 columns

- `headerFilter`参数已废弃，请使用 `disabledHeaderFilter`代替。[ 参考 columns](/components/config.html)

<el-divider />
