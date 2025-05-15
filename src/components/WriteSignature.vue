<template>
    <div>
        <a-modal v-model:open="props.isShow" width="640px" :style="setTop" :maskClosable="false" @cancel="handleCancel"
            @ok="handleSubmit">
            <template #title>
                <div class="modal_title">
                    手写签名
                </div>
            </template>
            <div class="modalContainer" ref="modelContentRef">
                <div class="modalCenter1">
                    <div class="signature-pad-container">
                        <canvas ref="signaturePad"></canvas>
                    </div>
                    <div class="signatureUrl" v-if="signImgUrl">
                        <img :src="signImgUrl" alt="">
                    </div>
                </div>
            </div>
            <template #footer>
                <div>
                    <a-button @click="handleCancel">取消</a-button>
                    <a-button @click="handleClear">清除</a-button>
                    <a-button type="primary" @click.prevent="handleSubmit">保存</a-button>
                </div>
            </template>
        </a-modal>
    </div>
</template>
<script setup>
    import {
        ref, watch, reactive, toRefs, onMounted, getCurrentInstance, onUpdated, defineProps, defineExpose,
        defineEmits, computed
    } from "vue";
    import { SearchOutlined } from "@ant-design/icons-vue";
    import { message } from "ant-design-vue";
    import Interface from "@/utils/Interface.js";
    import SignaturePad from "signature_pad";
    const { proxy } = getCurrentInstance();
    const signaturePad = ref(null)
    let signaturePadInstance = null;
    const props = defineProps({
        isShow: Boolean,
        signImgUrl: String
    });
    console.log("signImgUrl", props.signImgUrl);
    const emit = defineEmits(['cancel', 'load']);
    const modelContentRef = ref(null);

    const data = reactive({
        top: ""
    })
    const { top } = toRefs(data);

    onMounted(() => {
        let h = modelContentRef.value.clientHeight;
        data.top = (h + 126) / 2 + 'px';
        if (signaturePad.value) {
            signaturePadInstance = new SignaturePad(signaturePad.value);
            if(props.signImgUrl){
                signaturePadInstance.toDataURL(props.signImgUrl);
            }
        }
    })
    const setTop = computed(() => ({
        top: data.top
    }));

    const handleCancel = () => {
        emit("cancel", false);
    };
    const handleClear = () => {
        signaturePadInstance.clear();
    };
    const handleSubmit = () => {
        const dataURL = signaturePadInstance.toDataURL();
        emit("signUrl", dataURL);
    }
</script>
<style lang="less" scoped>
    @import url('@/style/modal.less');

    .modalCenter1 {
        height: auto !important;
    }
    .signature-pad-container{
        text-align: center;
        canvas{
            border: 1px solid #333;
        }
    }
    .signatureUrl{
        text-align: center;
    }
</style>