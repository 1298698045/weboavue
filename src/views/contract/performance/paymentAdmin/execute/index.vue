<template>
    <div class="listWrap">
        <ContractList moduleName="contract" tabName="execute" title="付款执行台账" :isStatistics="isStatistics" :isTab="isTab" />
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