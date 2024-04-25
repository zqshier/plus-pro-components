<template>
  <PlusPagination v-model="page" :total="100" :small="true">
    <template #pagination-left>
      <span class="fs-12">总计:59.49</span>
    </template>
  </PlusPagination>

  <PlusPagination v-model="page" :total="100" align="left" :small="true">
    <template #pagination-right>
      <span class="fs-12">总计:59.49</span>
    </template>
  </PlusPagination>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const page = ref()
</script>

<style lang="scss" scoped>
.fs-12 {
  font-size: 12px;
}
</style>
