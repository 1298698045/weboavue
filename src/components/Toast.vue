<template>
    <div class="forceVisualMessageQueue">
        <div style="top: 90px" class="toastContainer">
            <div class="forceToastMessage" :class="{'success':type=='success','error':type=='error'}">
                <span class="leftIcon">
                    <svg focusable="false" aria-hidden="true"
                        viewBox="0 0 520 520" part="icon" lwc-gj6nt2jq8l="" data-key="info"
                        class="svgIcon">
                        <g lwc-gj6nt2jq8l="">
                            <path
                                d="M260 20a240 240 0 100 480 240 240 0 100-480zm0 121c17 0 30 13 30 30s-13 30-30 30-30-13-30-30 13-30 30-30zm50 210c0 5-4 9-10 9h-80c-5 0-10-3-10-9v-20c0-5 4-11 10-11 5 0 10-3 10-9v-40c0-5-4-11-10-11-5 0-10-3-10-9v-20c0-5 4-11 10-11h60c5 0 10 5 10 11v80c0 5 4 9 10 9 5 0 10 5 10 11z"
                                lwc-gj6nt2jq8l=""></path>
                        </g>
                    </svg>
                </span>
                <div class="forceActionsText">
                    {{message}}
                </div>
                <span class="closeIcon">
                    <svg focusable="false"
                        aria-hidden="true" viewBox="0 0 520 520" part="icon" lwc-3bq099ugqsh=""
                        data-key="close" class="svgIcon">
                        <g lwc-3bq099ugqsh="">
                            <path
                                d="M310 254l130-131c6-6 6-15 0-21l-20-21c-6-6-15-6-21 0L268 212a10 10 0 01-14 0L123 80c-6-6-15-6-21 0l-21 21c-6 6-6 15 0 21l131 131c4 4 4 10 0 14L80 399c-6 6-6 15 0 21l21 21c6 6 15 6 21 0l131-131a10 10 0 0114 0l131 131c6 6 15 6 21 0l21-21c6-6 6-15 0-21L310 268a10 10 0 010-14z"
                                lwc-3bq099ugqsh=""></path>
                        </g>
                    </svg>
                </span>
            </div>
        </div>
    </div>
</template>
<script setup>
    import {
        ref,
        watch,
        reactive,
        toRefs,
        onMounted,
        getCurrentInstance,
        onUpdated,
        defineProps,
        defineExpose,
        defineEmits,
        toRaw,
        inject,
        nextTick
    } from "vue";
    import {
        SearchOutlined,
        DownOutlined,
        UserOutlined,
    } from "@ant-design/icons-vue";
    // import { message } from "ant-design-vue";
  import Toast from "@/utils/toast.js";
    import Interface from "@/utils/Interface.js";
    const { proxy } = getCurrentInstance();
    import { useRouter, useRoute } from "vue-router";

    const router = useRouter();
    const route = useRoute();
    const props = defineProps({
        message: String,
        type: String
    })
    const data = reactive({
        messageText: "",
        visible: false
    });
    const { messageText, visible } = toRefs(data);

    const showToast = (msg, timeout = 3000) => {
        data.messageText = msg;
        data.visible = true;
        setTimeout(() => {
            data.visible = false;
        }, timeout);
    }
</script>
<style lang="less" scoped>
    .forceVisualMessageQueue {
        position: fixed;
        text-align: center;
        top: auto;
        right: 0;
        left: 0;
        z-index: 10000;
    }
    .toastContainer{
        position: fixed;
        width: 100%;
        left: 0;
        top: 0;
        z-index: 10000;
        text-align: center
    }
    .forceToastMessage{
        color: #fff;
        display: inline-flex;
        align-items: center;
        position: relative;
        background: #747474;
        border-radius: 4px;
        margin: 8px;
        padding: 12px 12px 12px 24px;
        min-width: 480px;
        text-align: left;
        justify-content: space-between;
        font-size: 16px;
        &.success{
            background: #2e844a;
        }
        &.error{
            background: #747474;
        }
    }
    .leftIcon{
        margin-right: 12px;
    }
    .leftIcon,.closeIcon{
        display: inline-block;
        width: 24px;
        height: 24px;
    }
    .forceActionsText{
        flex: 1;
    }
    .svgIcon{
        width: 24px;
        height: 24px;
        fill: currentColor;
    }
    .closeIcon{
        cursor: pointer;
    }
</style>