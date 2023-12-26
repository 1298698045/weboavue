<template>
    <div class="listWrap">
        <ContractList moduleName="reimburse" title="待处理报销单" :isStatistics="isStatistics" :isTab="isTab" tabName="myReimburse" />
    </div>
  </template>
  <script setup>
     import {
        UnorderedListOutlined,
        DownOutlined,
        CaretDownOutlined,
        UserOutlined
    } from "@ant-design/icons-vue";
    import { ref, watch, reactive, toRefs, onMounted, getCurrentInstance, onUpdated } from "vue";
    import Interface from "@/utils/Interface.js";
    const { proxy } = getCurrentInstance();
    import ContractList  from "@/components/contract/ContractList.vue";
    const data = reactive({
        isStatistics: true,
        isTab: false
    });
    const { isStatistics, isTab } = toRefs(data);
  </script>
  <style>
    .listWrap{
        width: 100%;
        height: 100%;
    }
  </style>