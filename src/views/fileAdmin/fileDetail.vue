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
                <a-dropdown :trigger="['hover']" class="ml10">
                    <span class="btn-drop">
                      <UnorderedListOutlined style="color: #1D2129;" />
                    </span>
                    <template #overlay>
                      <a-menu>
                        <a-menu-item key="1">
                          备注
                        </a-menu-item>
                      </a-menu>
                    </template>
                  </a-dropdown>
            </div>
        </div>
        <div class="detail-scroll">
            <div class="detail-bd">
                <div class="tabContainer" v-if="activeKey==0"></div>
                <div class="tabContainer" v-if="activeKey==1">
                    <FileReadRecord />
                </div>
                <div class="tabContainer" v-if="activeKey==2">
                    <DownloadFile />
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
    import "@/style/common.less";
    import "@/style/detail.less";
    import { ref, reactive, onMounted, toRefs, getCurrentInstance, defineEmits, toRaw } from "vue";
    import {
        UnorderedListOutlined,
        DownOutlined,
        CaretDownOutlined,
        DeleteFilled,
        DeleteOutlined
    } from "@ant-design/icons-vue";
    import FileReadRecord from "../../components/file/FileReadRecord.vue";
    import DownloadFile from "@/components/file/DownloadFile.vue";
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
        console.log("e",e);
        data.activeKey = e;
    }
</script>
<style lang="less" scoped>
    .detail-scroll{
        height: calc(~"100% - 95px") !important;
        .detail-bd{
            height: 100%;
            .tabContainer{
                width: 100%;
                height: 100%;
                margin-bottom: 0 !important;
                padding-bottom: 0 !important;
            }
        }
    }
</style>