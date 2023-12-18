<template>
    <div class="listWrap">
        <ContractList title="开票未到账" :isStatistics="isStatistics" />
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
        isStatistics: true
    });
    const { isStatistics } = toRefs(data);
</script>
<style>
    .listWrap{
        width: 100%;
        height: 100%;
    }
</style>