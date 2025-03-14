<template>
    <div class="cardItem widgetItem" :class="themeType" @click="handleClick">
        <template v-if="themeType=='modern'">
            <div class="card-header">
                <div class="header-title">{{item.name}}</div>
            </div>
            <div class="card-body">
                <div class="tabList-wrapper">
                    <div class="tabContainer flex">
                        <div class="tabList">
                            <div class="tab" :class="{
                              active: current == tabIdx,
                            }" v-for="(tab, tabIdx) in item.tabs" @click.stop="handleItemTab(tab, tabIdx)">
                                <div class="tabHover">
                                    <span class="tabText">
                                        {{ tab.title }}
                                        <span class="tabnum">0</span>
                                        <span style="font-weight: normal" @click="
                                    deleteTabListTag(tab, tabIdx)
                                  ">
                                            <i class="iconfont icon-yishanchu"></i>
                                        </span>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <!-- <div class="rightAdd">
                            <a-popover trigger="click" placement="right">
                                <template #content>
                                    <a-form>
                                        <a-form-item label="标签名称">
                                            <a-input v-model:value="item.addTagName"></a-input>
                                        </a-form-item>
                                        <a-form-item label="对象代码">
                                            <a-select v-model:value="item.addObjCode" placeholder="请选择对象代码">
                                                <a-select-option v-for="(
                                        field, fieldIdx
                                      ) in objCodeList" :key="fieldIdx" :value="field.ID">{{ field.Name
                                                    }}</a-select-option>
                                            </a-select>
                                        </a-form-item>
                                        <div>
                                            <a-button type="primary" @click="handleAddTags(item)">确认添加</a-button>
                                        </div>
                                    </a-form>
                                </template>
                                <a-button type="link">添加标签</a-button>
                            </a-popover>
                        </div> -->
                    </div>
                    <Table :config="properties" :columns="columns" :themeType="themeType" :tableData="tableData" />
                </div>
            </div>
            <div class="card-foot"></div>
        </template>
        <template  v-if="themeType=='default'">
            <div class="item-default-header">
                <span class="item-default-header-title">
                    <span class="title-font">{{item.name}}</span>
                </span>
                <div class="titlecontainer">
                    <div class="rc-tabs">
                        <div class="rc-tabs-tab" :class="{active: current == tabIdx }" v-for="(tab, tabIdx) in item.tabs" @click.stop="handleItemTab(tab, tabIdx)">
                            <div class="tab2" style="width: auto; vertical-align: top; background-size: 100% 100%; height: 32px; line-height: 32px; padding-top: 0px; position: relative;">
                                <div style="width: 76px; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; display: inline-block;">{{ tab.title }}</div>
                                <div class="" style="display: inline-block; width: 12px; height: 12px; position: absolute; right: 0px; bottom: 9px;"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <span class="toolbar">
                    <ul>
                        <li>
                            <a href="javascript:void(0);" name="refreshbtn" title="刷新">
                                <img :src="require('@/assets/img/refresh_wev8.png')" border="0" alt="">
                            </a>
                        </li>
                        <li style="width: 34px;">
                            <a href="javascript:void(0);">
                                <img class="imgMore" :src="require('@/assets/img/more_wev8.png')" border="0" alt="" title="更多"  @click="gotoMore">
                            </a>
                        </li>
                    </ul>
                </span>
            </div>
            <div class="item-default-content">
                <Table :config="properties" :columns="columns" :themeType="themeType" :tableData="tableData" />
            </div>
        </template>
        <template v-if="themeType=='light'">
            <div class="dashGridItem">
                <h2 class="defaultHeading">
                    <div class="gridHeader truncation" title="商业机会阶段数量">{{item.name}}</div>
                    <div class="gridTitle truncation"></div>
                </h2>
                <div class="tabs_default query-builder-widget-tab">
                    <ul class="fh-tabs_default__nav">
                        <li class="fh-tabs_default__item" :class="{ active: current == tabIdx }" v-for="(tab, tabIdx) in item.tabs" @click.stop="handleItemTab(tab, tabIdx)">
                            <a href="javascript:;" class="fh-tabs_default__link">
                                <span class="tab-label">
                                    <h2 class="tab-title">{{tab.title}}</h2>
                                </span>
                            </a>
                        </li>
                    </ul>
                </div>
                <div class="table-container" style="height: calc(100% - 90px);">
                    <Table :config="item.properties" :columns="columns" :themeType="themeType" :tableData="tableData" />
                </div>
                <div class="actions">
                    <span>
                        <svg aria-hidden="true" class="btn_icon" viewBox="0 0 52 52"><path d="M48.8 2H33.3c-1 0-1.3.9-.5 1.7l4.9 4.9-9 9c-.5.5-.5 1.3 0 1.9l3.7 3.7c.5.5 1.3.5 1.9 0l9.1-9.1 4.9 4.9c.8.8 1.7.5 1.7-.5V3.1c0-.6-.6-1.1-1.2-1.1zM3.5 50h15.4c1 0 1.3-1.1.5-1.9l-4.9-5 9-9.1c.5-.5.5-1.4 0-1.9l-3.7-3.7c-.5-.5-1.3-.5-1.9 0l-9 9-5-4.9C3 31.7 2 32 2 33v15.4c0 .7.8 1.6 1.5 1.6zM50 48.8V33.3c0-1-.9-1.3-1.7-.5l-4.9 4.9-9-9c-.5-.5-1.3-.5-1.9 0l-3.7 3.7c-.5.5-.5 1.3 0 1.9l9.1 9.1-4.9 4.9c-.8.8-.5 1.7.5 1.7h15.4c.6 0 1.1-.6 1.1-1.2zM2 3.5v15.4c0 1 1.1 1.3 1.9.5l5-4.9 9.1 9c.5.5 1.4.5 1.9 0l3.7-3.7c.5-.5.5-1.3 0-1.9l-9-9 4.9-5C20.3 3 20 2 19 2H3.6C2.9 2 2 2.8 2 3.5z"></path></svg>
                    </span>
                </div>
            </div>
        </template>
    </div>
</template>
<script setup>
    import { ref, reactive, toRefs, defineProps, nextTick, getCurrentInstance } from "vue";
    import Interface from "@/utils/Interface.js";
    const { proxy } = getCurrentInstance();
    import Table from "./Table.vue";
    import { useStore } from "vuex";
    const store = useStore();
    store.tabListCurrent = 0;
    import { useRoute, useRouter } from "vue-router";
    const router = useRouter();
    const props = defineProps({
        item: {
            type: Object,
            default: {}
        },
        themeType: String
    })
    const data = reactive({
        tabs: [
            {
                displayName: "tab1",
                listComponent: {
                    dataList: []
                }
            },
            {
                displayName: "tab2", 
                listComponent: {
                    dataList: []
                }
            }
        ],
        current: 0,
        properties: props.item?.tabs && props.item?.tabs[0].properties || {},
        columns: props.item?.tabs && props.item?.tabs[0].properties.tableColumns || [],
        tableData: []
    });
    const { tabs, current, properties, columns, tableData } = toRefs(data);
    const handleItemTab = (item, index) => {
        data.current = index;
        store.tabListCurrent = index;
        store.tabListClickType = 1;
        data.properties = props.item.tabs[index].properties;
        data.columns = props.item.tabs[index].properties.tableColumns;
    };
    const handleClick = () => {
        store.tabListClickType = 0;
    }
    const deleteTabListTag = (item, index) => {
        
    }
    const getQuery = async () => {
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
            let { tabs } = componentData;
            data.tabs = tabs;
            let { rows } = data.tabs[data.current].dataList;
            data.tableData = rows;
        });
    };
    getQuery();

    const gotoMore = () => {
        let { moreUrl } = props.item.properties;
        const url = router.resolve({path: moreUrl});
        window.open(url.href);
    }

</script>
<style lang="less" scoped>
    @import url(@/style/protal/widget.less);


    .tabContainer.flex {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .tabContainer {
        border-bottom: 1px solid #e5e6eb;

        .tabList {
            height: 40px;
            line-height: 40px;
            cursor: pointer;

            .tab {
                font-size: 14px;
                color: #4e5969;
                padding: 0 8px;
                float: left;
                width: auto !important;

                &:hover {
                    .tabHover {
                        background: #f2f3f5;
                    }
                }

                .tabHover {
                    border-radius: 2px;
                    padding: 0 8px !important;
                    box-sizing: border-box;
                    background: transparent;
                    display: inline-block;
                    height: 29px;
                    line-height: 29px;

                    .bottom {
                        position: absolute;
                        width: 100%;
                        height: 2px;
                        background: var(--textColor);
                        top: 33px;
                        left: 1px;
                    }

                    .tabText {
                        position: relative;

                        .num.active {
                            color: #f53f3f;
                        }
                    }
                }
            }

            .tab.active {
                .tabHover {
                    .tabText {
                        color: var(--textColor);
                        font-weight: 700;
                    }

                    .tabText::before {
                        content: "";
                        display: inline-block;
                        position: absolute;
                        width: 100%;
                        height: 2px;
                        background: var(--textColor);
                        top: 29px;
                        left: 0;
                        transition: all 0.5s;
                    }
                }

                &:hover {
                    .tabHover {
                        background: transparent;
                    }
                }
            }
        }
    }

    .tabContainer.notBorder {
        border: none;
    }

    .titlecontainer{
        position: relative; 
        left: 86px; 
        z-index: 1; 
        background-color: white;
        .rc-tabs{
            .rc-tabs-tab{
                float: left;
                margin-right: 0 !important;
                padding: 0 !important;
                .tab2{
                    display: inline-block;
                    word-break: keep-all;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    overflow: hidden;
                    padding-top: 0 !important;
                    cursor: pointer;
                    text-align: center;
                    font-style: normal;
                    font-weight: normal;
                    border-bottom-color: rgb(255, 255, 255);
                    border-bottom-width: 0px;
                    color: rgb(102, 102, 102);
                    font-family: 微软雅黑 !important;
                    font-size: 12px;
                }
                &.active{
                    .tab2{
                        color: #2b4bab;
                    }
                }
            }
        }
    }

</style>