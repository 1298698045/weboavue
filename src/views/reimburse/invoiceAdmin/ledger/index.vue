<template>
    <div class="listWrap">
        <ContractList backColor="#F14A2D" :rightMenuImg="require('@/assets/img/rightMenu/fapiaotaizhang.png')" moduleName="reimburse" title="我的票夹" :isStatistics="isStatistics" :isTab="isTab" :isSearch="isSearch" tabName="ledger" />
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
        isStatistics: false,
        isTab: true,
        isSearch: false
    });
    const { isStatistics, isTab, isSearch } = toRefs(data);
  </script>
  <style scoped>
    .listWrap{
        width: 100%;
        height: 100%;
    }
  </style>