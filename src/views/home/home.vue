<template>
    <div class="dashboardHome">
        <main class="weapp-de-workspace">
            <ProtalGridLayout :themeType="themeType" :dashboardId="dashboardId" />
        </main>
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
        toRaw,
        nextTick,
        defineEmits,
        defineProps,
        defineExpose,
        inject,
    } from "vue";
    import { FullscreenOutlined, LinkOutlined } from '@ant-design/icons-vue';
    import ProtalGridLayout from "@/components/portalPreview/PortalGridLayout.vue";
    
    import Interface from "@/utils/Interface.js";
    import { useRoute, useRouter } from "vue-router";
    const route = useRoute();
    const { proxy } = getCurrentInstance();
    
    import { useStore } from "vuex";
    let store = useStore();
    store.commit("initializeFromRoute", route.query.id);

    // import { useStore } from "vuex.js";
    // import { storeToRefs } from 'pinia';
    // import { getCommonDetail } from "@/utils/commonApi.js";
    // const store = useStore();
    // store.initializeFromRoute();
    // const { dashboardId, isMasterAttr } = storeToRefs(store);

    const router = useRouter();

    const data = reactive({
        layoutData: [],
        isFullScreen: false,
        themeType: store.state.themeType,
        dashboardId: route.query.id
    });

    const { layoutData, isFullScreen, themeType, dashboardId } = toRefs(data);

    const getDetail = async () => {
        let obj = {
            actions:[{
                id: "4270;a",
                descriptor: "aura://RecordUiController/ACTION$getRecordWithFields",
                callingDescriptor: "UNKNOWN",
                params: {
                    recordId: store.state.dashboardId,
                    apiName: 'PageDashboard'
                }
            }]
        }
        let d = {
            message: JSON.stringify(obj)
        };
        proxy.$post(Interface.detail, d).then(res=>{
            let fields = res.actions[0].returnValue.fields;
            // store.commit("setTheme", fields.Theme.value);
        })
    };
    getDetail();


</script>



<style lang="less" scoped>
    .dashboardHome {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        background: #e8edf4;
    }
    .weapp-de-workspace{
        height: 100%;
        flex: 1 1 auto;
        flex-basis: 0;
        overflow: auto;
        background-color: #e8edf4;
        transition: all .3s cubic-bezier(.645,.045,.355,1);
        &.active{
            margin-left: 200px;
        }
    }
    .ui-btn{
        outline: none;
        position: relative;
        text-align: center;
        line-height: 16px;
        font-size: 12px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 32px;
        width: 34px;
        color: #666;
        border: 0;
        border-radius: 0;
        background: #fff;
        cursor: pointer;
        &::before{
            content: "";
            transition: all .3s cubic-bezier(.645,.045,.355,1);
            opacity: .2;
            background-color: transparent;
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            margin: auto;
        }
        &:hover{
            color: #666;
            &::before{
                height: 32px;
                background: #5d9cec;
            }
        }
    }
</style>