<template>
  <el-config-provider :locale="locales" namespace="el">
    <AppNav>
      <el-dropdown>
        <span class="el-dropdown-link">
          {{ language }}
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item v-for="(item, key) in langs" :key="key" @click="handleLang(key)">
              {{ item.langName }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>

      <el-switch
        v-model="dark"
        :active-action-icon="Moon"
        :inactive-action-icon="Sunny"
        style="--el-switch-on-color: #2c2c2c; --el-switch-off-color: #f2f2f2"
        @change="handleChange"
      />
    </AppNav>
  </el-config-provider>
</template>

<script setup lang="ts">
/* eslint-disable @typescript-eslint/ban-ts-comment*/
import { ref } from 'vue'
import { Moon, Sunny, ArrowDown } from '@element-plus/icons-vue'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import en from 'element-plus/es/locale/lang/en'
import ja from 'element-plus/es/locale/lang/ja'
// @ts-ignore
import type { Language } from '../../locale'
import { zhCn as plusZhCn, en as plusEn, ja as plusJa } from '../../locale'
import AppNav from './views/layout.vue'
// import AppNav from './__nav.vue' <el-icon><Sunny /></el-icon>

const langs = {
  zhCn: {
    langName: '中文',
    ...zhCn,
    ...plusZhCn
  },
  en: {
    langName: 'English',
    ...en,
    ...plusEn
  },
  ja: {
    langName: 'Japanese',
    ...ja,
    ...plusJa
  }
}

const dark = ref(false)
const language = ref('中文')
const locales = ref<Language & { langName: string }>(langs.zhCn)

const handleLang = (key: keyof typeof langs) => {
  locales.value = langs[key]
  language.value = locales.value.langName
}

const handleChange = (val: any) => {
  if (val) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}
</script>

<style lang="scss" scoped>
.nav-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  display: flex;
}

.switch-language {
  margin-right: 10px;
}

.el-dropdown-link {
  cursor: pointer;
  display: inline-block;
  margin-right: 10px;
  &:focus-visible {
    outline: none;
  }
}
</style>
