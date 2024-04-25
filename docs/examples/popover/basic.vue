<template>
  <PlusPopover placement="top-start" trigger="hover" title="Title" :width="200">
    this is content, this is content, this is content
    <template #reference>
      <el-button class="mgb-10 mgr-10">Hover to activate</el-button>
    </template>
  </PlusPopover>

  <PlusPopover
    placement="bottom"
    title="Title"
    :width="200"
    trigger="click"
    content="this is content, this is content, this is content"
  >
    <template #reference>
      <el-button class="mgb-10 mgr-10">Click to activate</el-button>
    </template>
  </PlusPopover>

  <PlusPopover
    title="Title"
    :width="200"
    trigger="contextmenu"
    content="this is content, this is content, this is content"
  >
    <template #reference>
      <el-button class="mgb-10 mgr-10">Contextmenu to activate</el-button>
    </template>
  </PlusPopover>

  <PlusPopover :visible="visible" placement="bottom" title="Title" trigger="click" :width="200">
    this is content, this is content, this is content
    <template #reference>
      <el-button class="mgb-10" @click="visible = !visible">Manual to activate</el-button>
    </template>
  </PlusPopover>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const visible = ref(false)
</script>

<style lang="scss" scoped>
.mgb-10 {
  margin-bottom: 10px;
}
.mgr-10 {
  margin-right: 10px;
}
</style>
