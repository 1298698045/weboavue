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
                <a-button class="ml10">正文</a-button>
                <a-button type="primary" class="ml10">保存表单</a-button>
                <a-button type="primary" danger class="ml10" @click="handleRejection">审批拒绝</a-button>
                <a-button type="primary" class="ml10" @click="handleSubmitProcess">提交流程</a-button>
                <a-dropdown :trigger="['hover']" class="ml10">
                    <span class="btn-drop">
                      <UnorderedListOutlined style="color: #1D2129;" />
                    </span>
                    <template #overlay>
                      <a-menu>
                        <a-menu-item key="1" @click="handleUrging">
                          催办
                        </a-menu-item>
                        <a-menu-item key="2" @click="handleCirculation">
                          传阅他人
                        </a-menu-item>
                        <a-menu-item key="3" @click="handleDelegate">
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
                <div class="tabContainer containerForm" v-if="activeKey==0">
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
                                    <div class="empty" v-if="relatedList.length==0">
                                        <div>
                                            <img :src="require('@/assets/img/empty.png')" alt="">
                                            <p class="emptyDesc">当前暂无数据</p>
                                        </div>
                                    </div>
                                    <div class="relevantItem" v-for="(item,index) in relatedList" :key="index">
                                        <div class="relevantTitle">{{item.Name}}</div>
                                        <div class="relevantTimerInfo">{{item.CreatedOn}} {{item.CreatedByName}}</div>
                                        <a-popconfirm title="是否确定要删除？"
                                            ok-text="确定"
                                            cancel-text="取消"
                                            @confirm="confirm"
                                            @cancel="cancel">
                                            <DeleteOutlined />
                                        </a-popconfirm>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="panel">
                            <div class="panel-head">
                                <div class="panel-title">
                                    附件 (0)
                                </div>
                            </div>
                            <div class="panel-bd">
                                
                            </div>
                        </div>
                    </div>
                </div>
                <div class="tabContainer" v-if="activeKey==2">
                    <Related />
                </div>
                <div class="tabContainer" v-if="activeKey==3">
                    <Info />
                </div>
                <div class="tabContainer" v-if="activeKey==4">
                    <read-record />
                </div>
                <div class="tabContainer" v-if="activeKey==5">
                    <Comment />
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
                          <UnorderedListOutlined style="color: #1D2129;" />
                        </span>
                        <template #overlay>
                          <a-menu @click="handleMenuClick">
                            <a-menu-item key="1" @click="handleUrging">
                              催办
                            </a-menu-item>
                            <a-menu-item key="2" @click="handleCirculation">
                                传阅他人
                            </a-menu-item>
                            <a-menu-item key="3" @click="handleDelegate">
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
        <SubmitProcess ref="processRef" v-if="isProcess" :isShow="isProcess" @update-status="updateStatus" :paramsData="ProcessData" />
        <ApprovalRejection ref="rejectionRef" v-if="isRejection" :isShow="isRejection" @update-status="updateStatus" :paramsData="RejectionData"  />
        <circulation-modal ref="circulationRef" @update-status="updateStatus" v-if="isCirculation" :paramsData="CirculationData.params" :isShow="isCirculation"></circulation-modal>
        <Delegate ref="DelegateRef" @update-status="updateStatus" :paramsData="DelegateData.params" :isShow="isModal" v-if="isModal" />
        <Urging ref="UrgingRef" @update-status="updateStatus" v-if="isUrging" :paramsData="UrgingData.params" :isShow="isUrging" />
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
    import Related from "@/components/detail/Related.vue";
    import Info from "@/components/detail/Info.vue";
    import ReadRecord from "@/components/detail/ReadRecord.vue";
    import Comment from "@/components/detail/Comment.vue";
    import Interface from "@/utils/Interface.js";
    const { proxy } = getCurrentInstance();
    import useWrokDetail from "@/utils/workDetail";
    const { relatedList, getRelatedWork } = useWrokDetail();
    import SubmitProcess from "@/components/workflow/SubmitProcess.vue";
    import ApprovalRejection from "@/components/workflow/ApprovalRejection.vue";
    import CirculationModal from "@/components/workflow/CirculationModal.vue";
    import Delegate from "@/components/workflow/Delegate.vue";
    import Urging from "@/components/workflow/Urging.vue";
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
            },
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
    getRelatedWork();
    
    const handleSubmitProcess = () => {
        data.isProcess = true;
    }
    const handleRejection = () => {
        data.isRejection = true;
    }
    const updateStatus = () => {
        data.isProcess = false;
        data.isRejection = false;
        data.isCirculation = false;
        data.isModal = false;
        data.isUrging = false;
    }
    const CirculationData = reactive({
        params: {}
    })
    const DelegateData = reactive({
        params: {}
    })
    function CirculationFn(InstanceId,RuleLogId,InstanceIdName,ExecutorIdentityName){
        CirculationData.params = {
            InstanceId,RuleLogId,InstanceIdName,ExecutorIdentityName
        }
        data.isCirculation = true;
    }
    const handleCirculation = () => {
        data.isCirculation = true;
    }
    const handleDelegate = () => {
        data.isModal = true;
    }
    const UrgingData = reactive({
        params: {}
    })
    const handleUrging = () => {
        data.isUrging = true;
    }
</script>