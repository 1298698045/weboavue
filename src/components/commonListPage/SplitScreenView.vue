<template>
    <div class="splitScreen">
        <div class="screen-container">
            <div class="left-box" :style="{height:height+'px'}">
                <LeftScreen :entityApiName="entityApiName" @type="changePageType" @params="getCurrentRow" @clickBtn="handleClickBtn" />
            </div>
            <div class="right-box" :style="{height:height+'px'}">
                <div class="emptyState" :style="{height:height+'px'}" v-if="id == ''">
                    <div class="emptyImg">
                        <img src="@/assets/img/desertSmall.svg" alt="">
                    </div>
                    <div class="text-longform">
                        <h3 class="text-heading_medium">未选择记录</h3>
                        <p class="text-body_regular">从列表中打开记录，以开始使用。</p>
                    </div>
                </div>
                <DetailCommon v-else :id="id" :objectTypeCode="objectTypeCode" :entityApiName="entityApiName" />
            </div>
        </div>
    </div>
</template>
<script setup>
    import { ref, watch, reactive, toRefs, onMounted, getCurrentInstance, onUpdated, h, nextTick, defineProps, defineEmits } from "vue";
    import { useRouter, useRoute } from "vue-router";
    const router = useRouter();
    const route = useRoute();
    import Interface from "@/utils/Interface.js";
    const { proxy } = getCurrentInstance();

    import LeftScreen from "@/components/commonListPage/splitScreen/LeftScreen.vue";
    import RightScreen from "@/components/commonListPage/splitScreen/RightScreen.vue";
    import DetailCommon from "@/components/detail/DetailCommon.vue";
    const emit = defineEmits(['type']);


    const props = defineProps({
        entityApiName: String
    })

    const data = reactive({
        height: "",
        id: "",
        objectTypeCode: "132",
        entityApiName: props.entityApiName
    });
    const { height, id, objectTypeCode, entityApiName } = toRefs(data);

    if(props.entityApiName){
        data.entityApiName = props.entityApiName;
    }

    onMounted(()=>{
        data.height = document.documentElement.clientHeight - 65;
    });

    const changePageType = (e) => {
        emit("type", e);
    };

    const getCurrentRow = (id) => {
        data.id = id;
    };

    const handleClickBtn = (e) => {
        emit("clickBtn", e);
    }
</script>
<style lang="less" scoped>
    .splitScreen{
        width: calc(100% - 197px);
        position: absolute;
        left: 197px;
        right: 0;
        transition: left 0.25s;
        background-image: url("@/assets/img/lightning_blue_background.png");
        background-repeat: repeat-x;
        background-position: top left;
        background-color: #B0C4DF;
        background-position-y: 0px;
        overflow: hidden;
        .left-box{
            width: 386px;
            position: fixed;
            left: 197px;
            top: 65px;
        }
        .right-box{
            width: calc(100% - 386px);
            float: right;
            overflow-y: auto;
            .emptyState{
                padding-bottom: 48px;
                background: #fff;
                display: flex;
                flex-direction: column;
                justify-content: center;
                text-align: center;
                .text-longform{
                    .text-heading_medium,.text-body_regular{
                        margin-bottom: 12px;
                        font-size: 20px;
                        line-height: 1.25;
                        font-weight: normal;
                    }
                    .text-body_regular{
                        font-size: 13px;
                        line-height: 1.25;
                    }
                }
            }
        }
    }
</style>