<template>
    <div class="listWrap">
        <ContractList backColor="#3ae6b8" :rightMenuImg="require('@/assets/img/rightMenu/caiwushenhe.png')" moduleName="reimburse" title="待处理报销单" :isStatistics="isStatistics" :isTab="isTab" tabName="financialReview" />
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
  <style scoped>
    .listWrap{
        width: 100%;
        height: 100%;
    }
  </style>