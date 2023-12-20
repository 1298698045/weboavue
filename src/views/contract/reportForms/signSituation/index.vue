<template>
    <div class="wrapper">
        <ContractReportForms title="合同签署情况" :isTab="isTab" />
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
    import ContractReportForms from "@/components/contract/ContractReportForms.vue";
    import Interface from "@/utils/Interface.js";
    const { proxy } = getCurrentInstance();
    const data = reactive({
        isTab: true
    });
    const { isTab } = toRefs(data);
  </script>
  <style lang="less" scoped>
    .wrapper{
        width: 100%;
        height: 100%;
    }
  </style>