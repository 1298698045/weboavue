<template>
    <div class="treeListWrap">
      <ContractTreeList moduleName="contract" tabName="contractApproval"  :treeTitle="'按流程类型显示'" :isHead="isHead" :isTab="isTab" :isSearch="isSearch" :isStatistics="isStatistics" />
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
        isHead: false,
        isTab: true,
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