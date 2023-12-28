<template>
  <div class="treeListWrap">
    <ContractTreeList moduleName="contract" tabName="termLibrary" title="合同条款库" treeTitle="条款分类" />
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

</script>
<style lang="less" scoped>
  .treeListWrap{
    width: 100%;
    height: 100%;
  }
</style>