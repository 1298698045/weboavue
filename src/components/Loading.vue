<template>
  <div class="loadingWrap">
    <loading-outlined></loading-outlined>
    <span class="loadinglabel">正在加载中，请稍候...</span>
  </div>
</template>
<script setup>
import {
  ref,
  reactive,
  onMounted,
  toRefs,
  getCurrentInstance,
  defineEmits,
  defineExpose,
  nextTick,
  defineProps,
  watch,
} from "vue";
import { LoadingOutlined } from "@ant-design/icons-vue";
onMounted(() => {});
</script>
<style lang="less" scoped>
.loadingWrap {
  width: 100%;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 40px;
  color: #fff;
  position: fixed;
  top: 0;
  z-index: 1000;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.45);

  .loadinglabel {
    font-size: 22px;
    margin-left: 25px;
  }
}
</style>
