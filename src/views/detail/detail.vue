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
                    <a-tabs v-model:activeKey="activeKey">
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
                <a-button class="ml10">正文</a-button>
                <a-button type="primary" class="ml10">保存表单</a-button>
                <a-button type="primary" class="ml10">提交流程</a-button>
                <a-dropdown :trigger="['hover']" class="ml10">
                    <span class="btn-drop">
                      <UnorderedListOutlined />
                    </span>
                    <template #overlay>
                      <a-menu @click="handleMenuClick">
                        <a-menu-item key="1">
                          催办
                        </a-menu-item>
                        <a-menu-item key="2">
                          传阅他人
                        </a-menu-item>
                        <a-menu-item key="3">
                          委托
                        </a-menu-item>
                        <a-menu-item key="4">
                            打印审批单
                        </a-menu-item>
                        <a-menu-item key="5">
                            PDF
                        </a-menu-item>
                      </a-menu>
                    </template>
                  </a-dropdown>
            </div>
        </div>
        <div class="detail-scroll">
            <div class="detail-bd">
                <div class="tabContainer containerForm">
                    <div class="tableBox">

                    </div>
                    <div class="rightAside">
                        <div class="panel">
                            <div class="panel-head">
                                <div class="panel-title">
                                    相关事务
                                </div>
                                <div class="panel-btn">
                                    <a-button type="text" size="small">添加关联</a-button>
                                </div>
                            </div>
                            <div class="panel-bd">
                                <div class="relevantList">
                                    <div class="empty">
                                        <div>
                                            <img src="/img/newImg/empty.png" alt="">
                                            <p class="emptyDesc">当前暂无数据</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="detail-footer">
            <div class="flexEnd">
                <div class="rightBox">
                    <a-button class="ml10">正文</a-button>
                    <a-button type="primary" class="ml10">保存表单</a-button>
                    <a-button type="primary" class="ml10">提交流程</a-button>
                    <a-dropdown :trigger="['hover']" class="ml10">
                        <span class="btn-drop">
                          <UnorderedListOutlined />
                        </span>
                        <template #overlay>
                          <a-menu @click="handleMenuClick">
                            <a-menu-item key="1">
                              催办
                            </a-menu-item>
                            <a-menu-item key="2">
                              传阅他人
                            </a-menu-item>
                            <a-menu-item key="3">
                              委托
                            </a-menu-item>
                            <a-menu-item key="4">
                                打印审批单
                            </a-menu-item>
                            <a-menu-item key="5">
                                PDF
                            </a-menu-item>
                          </a-menu>
                        </template>
                      </a-dropdown>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
    import "./detail.less";
    import { ref, reactive, onMounted, toRefs, getCurrentInstance, defineEmits, toRaw } from "vue";
    import {
        UnorderedListOutlined,
        DownOutlined,
        CaretDownOutlined,
    } from "@ant-design/icons-vue";
    import Interface from "@/utils/Interface.js";
    const { proxy } = getCurrentInstance();
    
    const data = reactive({
        tabs: [
            {
                label: "表单信息"
            },
            {
                label: "流程图"
            },
            {
                label: "相关事务与附件信息"
            },
            {
                label: "流转信息"
            },
            {
                label: "阅读记录"
            },
            {
                label: "讨论留言"
            }
        ]
    })
    const { tabs } = toRefs(data);
</script>