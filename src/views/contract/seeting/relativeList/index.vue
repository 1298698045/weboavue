<template>
    <div class="listWrap">
        <ContractList backColor="#96358a" moduleName="contract" tabName="relativeList" title="相对方查询" :isStatistics="isStatistics" :isTab="isTab" :isSearch="isSearch" />
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
        isTab: false,
        isSearch: true
    });
    const { isStatistics, isTab, isSearch } = toRefs(data);
</script>
<style>
    .listWrap{
        width: 100%;
        height: 100%;
    }
</style>