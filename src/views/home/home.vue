<template>
    <div class="dashboardHome">
        <main class="weapp-de-workspace">
            <ProtalGridLayout ref="portalRef" :themeType="themeType" :dashboardId="route.query.id" />
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

    const router = useRouter();
    const portalRef = ref(null);
    const data = reactive({
        layoutData: [],
        isFullScreen: false,
        themeType: store.state.themeType,
        dashboardId: ""
    });

    const { layoutData, isFullScreen, themeType, dashboardId } = toRefs(data);

    data.dashboardId = route.query.id;
    const handleStorageEvent = (event) => {
        if (event.key === 'REFRESH_LIST') {
            portalRef.value.getQuery();
        }
    }
    onMounted(()=>{
        window.addEventListener("storage", handleStorageEvent);
    })

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