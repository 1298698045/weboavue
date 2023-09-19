<template>
  <div class="header-logo">
    {{ title }}
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import setting from "/src/utils/setting.js";
const title = ref(setting.title);
</script>
<style>
.header-logo {
  width: 197px;
  height: 55px;
  line-height: 55px;
  background: #1c69db;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #fff;
  font-size: 14px;
}
</style>
