<template>
    <div class="detailWrap">
        <div class="detail-header">
            <div class="leftBox">
                <div class="title">
                    <div>
                        <span>02 差旅费报销流程 院领导 jackliu3 2023-09-22&nbsp;</span>
                    </div>
                </div>
                <div class="tabWrap">
                    <a-tabs v-model:activeKey="activeKey" @change="changeTabs">
                        <a-tab-pane v-for="(item,index) in tabs" :key="index">
                            <template #tab>
                                <span>
                                    {{item.label}}
                                </span>
                            </template>
                        </a-tab-pane>
                    </a-tabs>
                </div>
            </div>
            <div class="rightBox">
                <a-button class="ml10">编辑</a-button>
                <a-button type="primary" class="ml10">删除</a-button>
                <a-button type="primary" class="ml10">预览</a-button>
            </div>
        </div>
        <div class="detail-scroll">
            <div class="detail-bd">
                <div class="tabContainer">
                    
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
    import "@/style/detail.less";
    import { ref, reactive, onMounted, toRefs, getCurrentInstance, defineEmits, toRaw } from "vue";
    import {
        UnorderedListOutlined,
        DownOutlined,
        CaretDownOutlined,
        DeleteFilled,
        DeleteOutlined
    } from "@ant-design/icons-vue";
    import Interface from "@/utils/Interface.js";
    const { proxy } = getCurrentInstance();
    const data = reactive({
        tabs: [
            {
                label: "详细信息"
            },
            {
                label: "阅读记录"
            },
            {
                label: "下载记录"
            }
        ],
        activeKey: 0,
        isProcess: false,
        isRejection: false,
        ProcessData: {},
        RejectionData: {},
        isCirculation: false,
        isModal: false,
        isUrging: false
    })
    const { tabs, activeKey, isProcess,isRejection, ProcessData, RejectionData, isCirculation, isModal, isUrging } = toRefs(data);
    const changeTabs = (e) => {
        data.activeKey = e;
    }
</script>
<style lang="less" scoped>
    .detail-scroll{
        height: calc(~"100% - 95px");
        .detail-bd{
            height: 100%;
            .tabContainer{
                width: 100%;
                height: 100%;
                background: #fff;
                border-radius: 5px;
            }
        }
    }
</style>