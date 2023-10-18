<template>
    <div>
        
    </div>
</template>
<script setup>
    import "@/style/common.less";
    import { ref, toRefs, reactive, toRaw, onMounted, watch, getCurrentInstance } from "vue";
    import { SwapLeftOutlined, SwapRightOutlined, ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons-vue";
    import Interface from "@/utils/Interface.js";
    const { proxy } = getCurrentInstance();
    import G2 from '@antv/g2';

</script>