<template>
    <div class="detailWrap">
        <div class="detail-header">
            <div class="leftBox">
                <div class="title">
                    <span class="backText"> « 返回列表</span>
                    <span>{{fields.FullName.displayValue}}</span>
                </div>
                <ul class="pageHeader-from" v-if="Object.keys(fields).length">
                    <li class="listRecordItem" v-for="(item, index) in layoutItems" :key="index">
                        <div class="formLabel">姓名</div>
                        <div class="formVal">
                            <a href="javascript:;" class="textUnderline">{{fields[item.name].displayValue}}</a>
                        </div>
                    </li>
                </ul>
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
                <div class="btnBox" v-for="(item, index) in actionList" :key="index">
                    <div class="btnGroup ml10" v-if="Array.isArray(item)">
                      <a-button
                        v-for="(row, idx) in item"
                        :key="idx"
                        @click="handleClickBtn(row.devNameOrId)"
                        >{{ row.label }}</a-button
                      >
                    </div>
                    <a-button class="ml10" @click="handleClickBtn(item.devNameOrId)" v-else>{{ item.label }}</a-button>
                </div>
                <!-- <a-button class="ml10">正文</a-button>
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
                  </a-dropdown> -->
            </div>
        </div>
        <!-- <ul class="pageHeader-from" v-if="Object.keys(fields).length">
            <li class="listRecordItem">
                <div class="formLabel">姓名</div>
                <div class="formVal">
                    <a href="javascript:;" class="textUnderline">{{fields.FullName.displayValue}}</a>
                </div>
            </li>
            <li class="listRecordItem">
                <div class="formLabel">工号</div>
                <div class="formVal">
                    <a href="javascript:;" class="textUnderline">{{fields.EmployeeNo.displayValue}}</a>
                </div>
            </li>
            <li class="listRecordItem">
                <div class="formLabel">部门</div>
                <div class="formVal">
                    <a href="javascript:;" class="textUnderline">{{fields.DeptId.displayValue}}</a>
                </div>
            </li>
            <li class="listRecordItem">
                <div class="formLabel">用工形式</div>
                <div class="formVal">
                    <a href="javascript:;" class="textUnderline">{{fields.ContractTypeCode.displayValue}}</a>
                </div>
            </li>
            <li class="listRecordItem">
                <div class="formLabel">人员类别</div>
                <div class="formVal">
                    <a href="javascript:;" class="textUnderline">{{fields.EmpCategoryCode.displayValue}}</a>
                </div>
            </li>
            <li class="listRecordItem">
                <div class="formLabel">人员状态</div>
                <div class="formVal">
                    <a href="javascript:;" class="textUnderline">{{fields.StateCode.displayValue}}</a>
                </div>
            </li>
            <li class="listRecordItem">
                <div class="formLabel">第二状态</div>
                <div class="formVal">
                    <a href="javascript:;" class="textUnderline">{{fields.SubStateCode.displayValue}}</a>
                </div>
            </li>
        </ul> -->
        <div class="detail-scroll">
            <div class="detail-bd" style="width: 100%;">
                <div class="tabContainer" v-if="activeKey==0" style="width: 100%;">
                    <div class="tabContainerChild">
                        <DetailInfo :id="id" :objectTypeCode="objectTypeCode" :entityApiName="entityApiName" />
                    </div>
                </div>
                <div class="tabContainer" v-if="activeKey==1">
                    <div class="tabContainerChild">
                        <RelatedList :id="id" :objectTypeCode="objectTypeCode" :entityApiName="entityApiName" :fullName="fields.FullName.displayValue" />
                    </div>
                </div>
            </div>
            <div class="detail-files">
                <Files />
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
        DeleteOutlined,
        UpOutlined,
        PlusOutlined
    } from "@ant-design/icons-vue";
    import Related from "@/components/detail/Related.vue";
    import Info from "@/components/detail/Info.vue";
    import ReadRecord from "@/components/detail/ReadRecord.vue";
    import Comment from "@/components/detail/Comment.vue";
    import Interface from "@/utils/Interface.js";
    const { proxy } = getCurrentInstance();
    import useWrokDetail from "@/utils/workDetail";
    // const { relatedList, getRelatedWork } = useWrokDetail();

    import DetailInfo from "@/components/detail/DetailInfo.vue";
    import RelatedList from "@/components/detail/RelatedList.vue";
    import Files from "@/components/detail/FilePanel.vue";

    import { useRouter, useRoute } from "vue-router";
    const router = useRouter();
    const route = useRoute();
    const data = reactive({
        tabs: [
            {
                label: "详细信息"
            },
            {
                label: "相关子集"
            }
        ],
        activeKey: 0,
        id: route.query.id,
        entityApiName: route.query.sObjectName,
        objectTypeCode: route.query.objectTypeCode,
        actionList: [],
        fields: {},
        layoutItems: []
    })
    const { tabs, activeKey, id, entityApiName, objectTypeCode,
         pageCurrent, actionList, fields, layoutItems } = toRefs(data);

    const changeTabs = (e) => {
        data.activeKey = e;
    }
    const getCompact = () => {
        let obj = {
            actions:[{
                id: "3514;a",
                descriptor: "",
                callingDescriptor: "",
                params: {
                    recordId: data.id,
                    entityApiName:data.entityApiName
                }
            }]
        }
        let d = {
            message: JSON.stringify(obj)
        }
        proxy.$post(Interface.detailObj.compact, d).then(res=>{
            console.log("res", res);
            let { layoutItems } = res.actions[0].returnValue;
            data.layoutItems = layoutItems;
        })
    }
    getCompact();
    const getDetail = () => {
        let obj = {
            actions: [{
                id: "4270;a",
                descriptor: "aura://RecordUiController/ACTION$getRecordWithFields",
                callingDescriptor: "UNKNOWN",
                params: {
                    recordId: data.id,
                    apiName: data.entityApiName
                }
            }]
        };
        let d = {
            message: JSON.stringify(obj)
        }
        proxy.$post(Interface.detail, d).then(res => {
            let fields = res.actions[0].returnValue.fields;
            data.fields = fields;
        })
    };
    getDetail();

    const getActions = () => {
        let obj = {
            actions: [{
                id: "13285;a",
                descriptor: "",
                callingDescriptor: "UNKNOWN",
                params: {
                    recordId: data.id,
                    entityApiName: data.entityApiName,
                    sections: ["PAGE"]
                }
            }]
        }
        let d = {
            message: JSON.stringify(obj)
        }
        proxy.$post(Interface.detailObj.actions, d).then(res => {
            data.actions = res.actions[0].returnValue;
            let actionList = res.actions[0].returnValue;
            var temp = [];
            for (var i = 0; i < actionList.length; i++) {
                let item = actionList[i];
                if (item.isSeparator) {
                    temp.push([item]);
                } else {
                    if (Array.isArray(temp[temp.length - 1])) {
                        temp[temp.length - 1].push(item);
                    } else {
                        temp.push(item);
                    }
                }
            }
            data.actionList = temp;
        })
    }
    getActions();

    const handleClickBtn = (type) => {
        if(type=='Edit'){
            data.isCommon = true;
        }
    }
</script>
<style lang="less" scoped>
    .detailWrap{
        overflow: auto;
        position: relative;
        z-index: 999;
        .detail-header{
            width: calc(~"100% - 12px");
            height: 127px;
        }
    }
    .tabContainer{
        display: block !important;
        padding: 10px 0 !important;
        background: #fff;
    }

    .tabContainerChild{
        width: 100%;
        height: auto;
        background: #fff;
    }
    .detail-scroll{
        display: flex;
        margin-top: 127px;
        padding: 0;
        height: auto !important;
        overflow: inherit;
        .detail-bd{
            flex: 1;

        }
        .detail-files{
            width: 20%;
            margin-left: 20px;
            /* margin-top: 24px; */
            margin-right: 12px;
        }
    }
    .pageHeader-from{
        transform: translate3d(0px, 0px, 0px);
        opacity: 1;
        visibility: visible;
        padding: 8px 16px;
        /* width: calc(~"100% - 12px"); */
        /* position: fixed;
        top: 71px; */
        z-index: 999;
        display: flex;
        border-radius: 0 0 4px 4px;
        /* background: #f2f2f2; */
        background: #fff;
        
        .listRecordItem{
            max-width: 123px;
            padding-right: 32px;
            overflow: hidden;
            .formLabel{
                color: #444444;
                font-size: 12px;
            }
            .formVal{
                a{
                    margin: 2px;
                    display: inline-block;
                    vertical-align: top;
                    border-bottom: 1px dotted;
                    max-width: 100%;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    color: #0b5cab;
                }
            }
        }
    }
</style>