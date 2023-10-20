<template>
  <div></div>
</template>
<script setup>
import {
  ref,
  watch,
  reactive,
  toRefs,
  onMounted,
  getCurrentInstance,
  onUpdated,
  defineProps,
  defineExpose,
  defineEmits,
} from "vue";
import { SearchOutlined, DeleteOutlined } from "@ant-design/icons-vue";
import Interface from "@/utils/Interface.js";

const { proxy } = getCurrentInstance();
</script>
<style lang="less"></style>
