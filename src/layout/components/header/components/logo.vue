<template>
  <div class="header-logo">
    <!-- {{ collapsed ? title.slice(0, 2) : title }} -->
    {{ title }}
  </div>
</template>
<script setup>
import { ref, onMounted, computed } from "vue";
import { useStore } from "vuex";
import setting from "/src/utils/setting.js";
const title = ref(setting.title);
const store = useStore();
const collapsed = computed(() => {
  return store.state.collapsed;
});
</script>
<style>
.header-logo {
  width: 100%;
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
