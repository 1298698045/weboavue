<template>
  <div class="treeListWrap">
    <TreeList :title="'流程设置'" :isTab="isTab" :isSearch="isSearch" :isStatistics="isStatistics" />
  </div>
</template>
<script setup>
  import {
    UnorderedListOutlined,
    DownOutlined,
    CaretDownOutlined,
    UserOutlined, MoneyCollectOutlined
  } from "@ant-design/icons-vue";
  import { ref, watch, reactive, toRefs, onMounted, getCurrentInstance, onUpdated  } from "vue";
  import TreeList from "@/components/contract/TreeList.vue";
  import Interface from "@/utils/Interface.js";
  const { proxy } = getCurrentInstance();
  const data = reactive({
      isTab: false,
      isSearch: false,
      isStatistics: false
  });
  const { isHead, isTab, isSearch, isStatistics  } = toRefs(data);
</script>
<style lang="less" scoped>
  .treeListWrap{
    width: 100%;
    height: 100%;
  }
</style>