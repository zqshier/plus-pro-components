<template>
  <el-button style="margin-bottom: 10px" type="primary" @click="toggle">切换语言</el-button>
  <el-config-provider :locale="locales">
    <DatePicker />
  </el-config-provider>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import en from 'element-plus/es/locale/lang/en'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import plusZhCn from 'plus-pro-components/es/locale/lang/zh-cn'
import plusEn from 'plus-pro-components/es/locale/lang/en'
import DatePicker from '../date-picker/basic.vue'

const zhCnLocales = {
  ...zhCn,
  ...plusZhCn
}
const enLocales = {
  ...en,
  ...plusEn
}

const language = ref('zh-cn')
const locales = computed(() => (language.value === 'zh-cn' ? zhCnLocales : enLocales))

const toggle = () => {
  language.value = language.value === 'zh-cn' ? 'en' : 'zh-cn'
  console.log(language.value)
}
</script>
