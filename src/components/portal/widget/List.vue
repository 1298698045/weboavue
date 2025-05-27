<template>
    <div class="cardItem widgetItem" :class="themeType">
        <template v-if="themeType=='modern'">
            <div class="card-header">
                <div class="header-title">{{item.name}}</div>
                <span class="toolbar">
                    <ul>
                        <li @click.stop="getQuery()">
                            <a href="javascript:void(0);" name="refreshbtn" title="刷新">
                                <img src="@/assets/img/refresh_wev8.png" border="0" alt="">
                            </a>
                        </li>
                        <li style="width: 34px;" @click.stop="handleMore(item)">
                            <a href="javascript:void(0);">
                                <img class="imgMore" src="@/assets/img/more_wev8.png" border="0" alt="" title="更多">
                            </a>
                        </li>
                    </ul>
                </span>
            </div>
            <div class="card-body">
                <Table :config="item.properties" :columns="columns" :themeType="themeType" :tableData="tableData" />
            </div>
            <div class="card-foot"></div>
        </template>
        <template v-if="themeType=='default'">
            <div class="item-default-header">
                <span class="item-default-header-title">
                    <span class="title-font">{{item.name}}</span>
                </span>
                <span class="toolbar">
                    <ul>
                        <li @click="getQuery()">
                            <a href="javascript:void(0);" name="refreshbtn" title="刷新">
                                <img src="@/assets/img/refresh_wev8.png" border="0" alt="">
                            </a>
                        </li>
                        <li style="width: 34px;" @click.stop="handleMore(item)">
                            <a href="javascript:void(0);">
                                <img class="imgMore" src="@/assets/img/more_wev8.png" border="0" alt="" title="更多">
                            </a>
                        </li>
                    </ul>
                </span>
            </div>
            <div class="item-default-content">
                <Table :config="item.properties" :columns="columns" :themeType="themeType" :tableData="tableData" />
            </div>
        </template>
        <template v-if="themeType=='light'">
            <div class="dashGridItem">
                <h2 class="defaultHeading">
                    <div class="gridHeader truncation" title="商业机会阶段数量">{{item.name}}</div>
                    <div class="gridTitle truncation"></div>
                </h2>
                <div class="table-container">
                    <Table :config="item.properties" :columns="columns" :themeType="themeType" :tableData="tableData" />
                </div>
                <!-- <div class="actions">
                    <span>
                        <svg aria-hidden="true" class="btn_icon" viewBox="0 0 52 52">
                            <path
                                d="M48.8 2H33.3c-1 0-1.3.9-.5 1.7l4.9 4.9-9 9c-.5.5-.5 1.3 0 1.9l3.7 3.7c.5.5 1.3.5 1.9 0l9.1-9.1 4.9 4.9c.8.8 1.7.5 1.7-.5V3.1c0-.6-.6-1.1-1.2-1.1zM3.5 50h15.4c1 0 1.3-1.1.5-1.9l-4.9-5 9-9.1c.5-.5.5-1.4 0-1.9l-3.7-3.7c-.5-.5-1.3-.5-1.9 0l-9 9-5-4.9C3 31.7 2 32 2 33v15.4c0 .7.8 1.6 1.5 1.6zM50 48.8V33.3c0-1-.9-1.3-1.7-.5l-4.9 4.9-9-9c-.5-.5-1.3-.5-1.9 0l-3.7 3.7c-.5.5-.5 1.3 0 1.9l9.1 9.1-4.9 4.9c-.8.8-.5 1.7.5 1.7h15.4c.6 0 1.1-.6 1.1-1.2zM2 3.5v15.4c0 1 1.1 1.3 1.9.5l5-4.9 9.1 9c.5.5 1.4.5 1.9 0l3.7-3.7c.5-.5.5-1.3 0-1.9l-9-9 4.9-5C20.3 3 20 2 19 2H3.6C2.9 2 2 2.8 2 3.5z">
                            </path>
                        </svg>
                    </span>
                </div> -->
                <span class="actions">
                    <ul>
                        <li @click="getQuery()">
                            <a href="javascript:void(0);" name="refreshbtn" title="刷新">
                                <img src="@/assets/img/refresh_wev8.png" border="0" alt="">
                            </a>
                        </li>
                        <li style="width: 34px;" @click.stop="handleMore(item)">
                            <a href="javascript:void(0);">
                                <img class="imgMore" src="@/assets/img/more_wev8.png" border="0" alt="" title="更多">
                            </a>
                        </li>
                    </ul>
                </span>
                <div class="gridFooter">
                    <a class="truncation enabledLink" href="javascript:;">
                        查看{{item.name}}
                    </a>
                </div>
            </div>
        </template>
    </div>
</template>
<script setup>
    import { ref, reactive, toRefs, defineProps, getCurrentInstance } from "vue";
    import Interface from "@/utils/Interface.js";
    import Table from "./Table.vue";
    const { proxy } = getCurrentInstance();
    import { useStore } from "vuex";
    const store = useStore();
    import { useRoute, useRouter } from "vue-router";
    const router = useRouter();
    const props = defineProps({
        item: {
            type: Object,
            default: {}
        },
        themeType: String,
        dashboardId: String
    });
    // console.log("props", props.themeType);
    const data = reactive({
        columns: [],
        tableData: []
    });
    const { columns, tableData } = toRefs(data);
    if(props.item && props.item.properties){
        let { tableColumns } = props.item.properties;
        console.log("tableColumns", tableColumns);
        data.columns = tableColumns.map(item=>{
            if(['D','F','DT_M','TP','Year','Month','Y_M'].includes(item.type)){
                item.width = '180px';
            }else if(['U','O','Y'].includes(item.type)){
                item.width = '110px';
            }
            return item;
        });
    }

    const gotoMore = () => {
        let { moreUrl } = props.item.properties;
        const url = router.resolve({path: moreUrl});
        window.open(url.href);
    };
    const handleMore = (item) => {
        console.log("item", item);
        let { moreUrl } = item.properties;
        const url = router.resolve({
            path: moreUrl
        });
        window.open(url.href);
    };

    const getQuery = async ()  => {
        if(props.item.id == null){
            return false;
        }
        let obj = {
            actions:[{
                id: "",
                descriptor: "",
                callingDescriptor: "UNKNOWN",
                params: {
                    dashboardId: props.dashboardId,
                    componentId: props.item.id
                }
            }]
        };
        let d = {
            message: JSON.stringify(obj)
        };
        proxy.$post(Interface.portal.loadComponents, d).then(res=>{
            let { componentData, dashboardComponentMetadata } = res.actions[0].returnValue;
            let { rows, rowCount } = componentData;
            data.tableData = rows;
        });
    };
    getQuery();
</script>
<style lang="less" scoped>
    @import url(@/style/protal/widget.less);
</style>