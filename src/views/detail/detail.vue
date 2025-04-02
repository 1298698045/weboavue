<template>
    <div class="detailWrap" style="min-height: 100vh;">
        <div class="detail-header">
            <div class="primaryFieldRow">
                <div class="fieldCol" style="flex: 1;">
                    <div class="profilePicWrapper">
                        <div style="background-color: #3BA755;" class="forceEntityIcon">
                            <img :src="require('@/assets/img/task_120.png')" alt="">
                        </div>
                    </div>
                    <div class="media__body">
                        <h1>
                            <div class="entityNameTitle">通用详情</div>
                            <div class="pageHeadTitle">{{ Name }}</div>
                        </h1>
                    </div>
                </div>
                <div class="fieldCol actionsContainer">
                    <!-- <div class="fh-btn-group">
                        <div class="fh-btn">批量录入岗位职责</div>
                        <div class="fh-btn">添加岗位职责</div>
                        <div class="fh-btn" @click="handleEdit">编辑</div>
                        <div class="fh-btn">复制</div>
                        <div class="fh-btn" @click="printPostInstructions">打印岗位说明</div>
                        <a-dropdown :trigger="['click']">
                            <div class="fh-btn fh-btn-icon">
                                <svg focusable="false" aria-hidden="true" viewBox="0 0 520 520" part="icon" lwc-6qul4k2dv7m="" data-key="down" class="slds-icon slds-icon_x-small"><g lwc-6qul4k2dv7m=""><path d="M83 140h354c10 0 17 13 9 22L273 374c-6 8-19 8-25 0L73 162c-7-9-1-22 10-22z" lwc-6qul4k2dv7m=""></path></g></svg>
                            </div>
                            <template #overlay>
                                <a-menu :trigger="['click']" style="padding: 10px 0;border: 1px solid #333;border-radius: 4px;">
                                    <a-menu-item style="min-width: 98px;padding: 8px 12px; color:#0176d3;font-size: 12px;" key="1">
                                        新建备注
                                    </a-menu-item>
                                    <a-menu-item style="min-width: 98px;padding: 8px 12px; color:#0176d3;font-size: 12px;" key="1">
                                        撤销
                                    </a-menu-item>
                                    <a-menu-item style="min-width: 98px;padding: 8px 12px; color:#0176d3;font-size: 12px;" key="1">
                                        复制
                                    </a-menu-item>
                                    <a-menu-item style="min-width: 98px;padding: 8px 12px; color:#0176d3;font-size: 12px;" key="1">
                                        导出说明书
                                    </a-menu-item>
                                    <a-menu-item style="min-width: 98px;padding: 8px 12px; color:#0176d3;font-size: 12px;" key="1">
                                        下载说明书
                                    </a-menu-item>
                                </a-menu>
                            </template>
                        </a-dropdown>
                    </div> -->
                </div>
            </div>
            <ul class="pageHeader-from">
                <li class="listRecordItem">
                    <div class="formLabel">名称</div>
                    <div class="formVal">
                        <a href="javascript:;" class="textUnderline">{{Name}}</a>
                    </div>
                </li>
            </ul>
        </div>
        <div class="detail-main">
            <div class="uiTabBar">
                <ul class="tabs_nav">
                    <li class="tabs_nav_item" :class="{'active':activeKey==index}"  v-for="(item,index) in tabs" :key="index"  @click="changeTabs(index)">
                        <a href="javascript:;" class="tabItemHead">
                            {{item.label}}
                        </a>
                    </li>
                </ul>
            </div>
            <div class="record-container" style="height: calc(100% - 50px);">
                <div class="recordLayout" v-if="activeKey==0">
                    <DetailInfo :id="id" :objectTypeCode="objectTypeCode" :entityApiName="entityApiName" />
                </div>
                <div class="recordLayout" v-if="activeKey==1">
                    <RelatedList :id="id" :objectTypeCode="objectTypeCode" :entityApiName="entityApiName" fullName="Name" />
                </div>
                <div class="recordLayout" v-if="activeKey==2">
                    <FilesList  :parentId="id" :entityName="entityApiName"></FilesList>
                </div>
            </div>
        </div>
        <ConfirmModal :isShow="isConfirm" v-if="isConfirm" :desc="desc" @cancel="isConfirm=false" @ok="handleOkConfirm" />
        <common-form-modal :isShow="isCommon" v-if="isCommon" @cancel="isCommon=false" title="编辑" @success="loadInfo" :id="id" :objectTypeCode="objectTypeCode" :entityApiName="entityApiName"></common-form-modal>
        <Delete :isShow="isDelete" v-if="isDelete" desc="是否确定要删除？" :recordId="id" :sObjectName="entityApiName" :objTypeCode="objectTypeCode" @cancel="isDelete=false"  />
    </div>
  </template>
  <script setup>
    import "@/style/detailCommon.less";
    import { ref, reactive, onMounted, toRefs, getCurrentInstance, defineEmits, toRaw } from "vue";
    import {
        UnorderedListOutlined,
        DownOutlined,
        CaretDownOutlined,
        DeleteFilled,
        DeleteOutlined, SearchOutlined
    } from "@ant-design/icons-vue";
    import { message } from "ant-design-vue";
    import Interface from "@/utils/Interface.js";
    const { proxy } = getCurrentInstance();
  
    import DetailInfo from  "@/components/detail/DetailInfo.vue";
    
    import ConfirmModal from "@/components/commonModal/Confirm.vue";
    import CommonFormModal from "@/components/listView/CommonFormModal.vue";
    import Delete from "@/components/listView/Delete.vue";
    import FilesList from "@/components/detail/FilesList.vue";
    import RelatedList from "@/components/detail/RelatedList.vue";
  
  
    import { useRouter, useRoute } from "vue-router";
    const router = useRouter();
    const route = useRoute();
  
    const labelCol = ref({ style: { width: '150px',textAlign:"left" } });
  
    const filterOption = (input, option) => {
        return option.label.toLowerCase().includes(input.toLowerCase());
    };
  
    const data = reactive({
        tabs: [
            {
                label: "基本信息"
            },
            {
                label: "相关列表"
            },
            {
                label: "附件"
            }
        ],
        activeKey: 0,
        desc: "",
        isConfirm: false,
        isCommon: false,
        id: route.query.id,
        objectTypeCode: route.query.objectTypeCode,
        entityApiName: route.query.entityType,
        isDelete: false,
        Name: "",
        templateName: "",
    })
    const { tabs, activeKey, desc, isConfirm, isCommon, id, objectTypeCode, entityApiName, 
    isDelete, Name, templateName } = toRefs(data);

    const changeTabs = (e) => {
        data.activeKey = e;
    };
  
    const handleEdit = () => {
      data.isCommon = true;
    };

    // 加载基本信息
    const loadInfo = () => {
      data.isCommon = false;
      getDetail();
    };

    // 删除
    const handleDelete = () => {
      data.isDelete = true;
    }

    const getDetail = () => {
        let obj = {
            actions:[{
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
        proxy.$post(Interface.detail, d).then(res=>{
          let fields = res.actions[0].returnValue.fields;
          data.Name = fields.Name.displayValue;
        })
    };
    getDetail();
  
  </script>