<template>
  <div class="treeListWrap">
    <ContractTreeList title="范本库" treeTitle="范本分类" :isStatistics="isStatistics" :isTab="isTab" :isSearch="isSearch" />
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
  import ContractTreeList from "@/components/contract/ContractTreeList.vue";
  import Interface from "@/utils/Interface.js";
  const { proxy } = getCurrentInstance();
  const data = reactive({
    isStatistics: true,
    isTab: false,
    isSearch: true
  });
  const { isStatistics, isTab, isSearch } = toRefs(data);
</script>
<style lang="less" scoped>
  .treeListWrap{
    width: 100%;
    height: 100%;
  }
</style>