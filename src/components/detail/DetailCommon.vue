<template>
    <div class="detailWrap" style="min-height: 100vh;">
        <div class="detail-header">
            <div class="primaryFieldRow">
                <div class="fieldCol" style="flex: 1;">
                    <div class="profilePicWrapper">
                        <div class="forceEntityIcon" :style="{background:initialData?.recordThemeInfo?.primaryPalette ? '#'+initialData?.recordThemeInfo?.primaryPalette:'red'}">
                            <img class="img" :src="Interface.pathUrl+initialData?.recordThemeInfo?.iconImageURL" alt="" />
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
                    <div class="fh-btn-group">
                        <div class="fh-btn" v-for="(item, index) in btnActions.slice(0,3)"
                            @click="handleBtnActions(item.apiName)">{{ item.label }}</div>
                        <a-dropdown :trigger="['click']" v-if="btnActions.length > 3">
                            <div class="fh-btn fh-btn-icon">
                                <svg focusable="false" aria-hidden="true" viewBox="0 0 520 520" part="icon"
                                    lwc-6qul4k2dv7m="" data-key="down" class="slds-icon slds-icon_x-small">
                                    <g lwc-6qul4k2dv7m="">
                                        <path
                                            d="M83 140h354c10 0 17 13 9 22L273 374c-6 8-19 8-25 0L73 162c-7-9-1-22 10-22z"
                                            lwc-6qul4k2dv7m=""></path>
                                    </g>
                                </svg>
                            </div>
                            <template #overlay>
                                <a-menu :trigger="['click']"
                                    style="padding: 10px 0;border: 1px solid #333;border-radius: 4px;">
                                    <a-menu-item
                                        style="min-width: 98px;padding: 8px 12px; color:#0176d3;font-size: 12px;"
                                        v-for="(item, index) in btnActions.slice(3)" :key="item.apiName">
                                        {{ item.label }}
                                    </a-menu-item>
                                </a-menu>
                            </template>
                        </a-dropdown>
                    </div>
                </div>
            </div>
            <ul class="pageHeader-from">
                <li class="listRecordItem" v-for="(item, index) in layoutItems" :key="index">
                    <div class="formLabel">{{ item.label }}</div>
                    <div class="formVal">
                        <a href="javascript:;" class="textUnderline" :title="item.value">{{ item.value }}</a>
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
                    <DetailInfo ref="detailInfoRef" :id="id" :objectTypeCode="objectTypeCode" :entityApiName="entityApiName" />
                </div>
                <div class="recordLayout" v-if="activeKey==1">
                    <RelatedList :id="id" :objectTypeCode="objectTypeCode" :entityApiName="entityApiName" fullName="Name" />
                </div>
                <div class="recordLayout" v-if="activeKey==2">
                    <FilesList :parentId="id" :entityName="entityApiName"></FilesList>
                </div>
            </div>
        </div>
        <div class="detailHeadFixed" v-if="isFixedHead">
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
                    <div class="fh-btn-group">
                        <div class="fh-btn" v-for="(item, index) in btnActions.slice(0,3)"
                            @click="handleBtnActions(item.apiName)">{{ item.label }}</div>
                        <a-dropdown :trigger="['click']" v-if="btnActions.length > 3">
                            <div class="fh-btn fh-btn-icon">
                                <svg focusable="false" aria-hidden="true" viewBox="0 0 520 520" part="icon"
                                    lwc-6qul4k2dv7m="" data-key="down" class="slds-icon slds-icon_x-small">
                                    <g lwc-6qul4k2dv7m="">
                                        <path
                                            d="M83 140h354c10 0 17 13 9 22L273 374c-6 8-19 8-25 0L73 162c-7-9-1-22 10-22z"
                                            lwc-6qul4k2dv7m=""></path>
                                    </g>
                                </svg>
                            </div>
                            <template #overlay>
                                <a-menu :trigger="['click']"
                                    style="padding: 10px 0;border: 1px solid #333;border-radius: 4px;">
                                    <a-menu-item
                                        style="min-width: 98px;padding: 8px 12px; color:#0176d3;font-size: 12px;"
                                        v-for="(item, index) in btnActions.slice(3)" :key="item.apiName">
                                        {{ item.label }}
                                    </a-menu-item>
                                </a-menu>
                            </template>
                        </a-dropdown>
                    </div>
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

    import { ref, reactive, onMounted, toRefs, getCurrentInstance, defineEmits, toRaw, defineProps, watch, nextTick } from "vue";
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
    
    const props = defineProps({
        id: String,
        objectTypeCode: [String, Number],
        entityApiName: String,

    })
    const detailInfoRef = ref(null);

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
        id: props.id,
        objectTypeCode: props.objectTypeCode,
        entityApiName: props.entityApiName,
        isDelete: false,
        Name: "",
        templateName: "",
        layoutItems: [],
        fields: {},
        btnActions: [],
        isFixedHead: false,
        initialData: {}
    });
    const { tabs, activeKey, desc, isConfirm, isCommon, id, objectTypeCode, entityApiName, 
    isDelete, Name, templateName, layoutItems, fields, btnActions, isFixedHead, initialData } = toRefs(data);

    onMounted(()=>{
        window.addEventListener("scroll", (e) => {
            let scrollTop = document.documentElement.scrollTop;
            // console.log("scrollTop:", scrollTop);
            if (scrollTop >= 50) {
                data.isFixedHead = true;
            } else {
                data.isFixedHead = false;
            }
        })
    })

    const getMetadataInitialLoad = () => {
        proxy.$get(Interface.listView.getMetadataInitialLoad, {
            name: "",
            entityType: data.entityApiName,
            sObjectName: data.entityApiName
        }).then(res => {
          if (res && res.actions && res.actions[0] && res.actions[0].returnValue) {
            data.initialData = res.actions[0].returnValue;
          }
        })
    }
    getMetadataInitialLoad();

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
    };

    const getCompact = () => {
        let obj = {
            actions: [{
                id: "3514;a",
                descriptor: "",
                callingDescriptor: "",
                params: {
                    recordId: data.id,
                    entityApiName: data.entityApiName
                }
            }]
        }
        let d = {
            message: JSON.stringify(obj)
        }
        proxy.$post(Interface.detailObj.compact, d).then(res => {
            let { layoutItems } = res.actions[0].returnValue;
            // data.layoutItems = layoutItems;
            let temp = [];
            layoutItems.forEach(item => {
                let obj = {
                    label: item.label,
                    value: data.fields[item.name].displayValue
                };
                temp.push(obj);
            });
            data.layoutItems = temp;
        })
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
          data.fields = fields;
          data.Name = fields.Name.displayValue;
          getCompact();
        })
    };

    const getRecordActions = () => {
        let obj = {
            actions: [{
                id: "4270;a",
                descriptor: "aura://RecordUiController/ACTION$getRecordWithFields",
                callingDescriptor: "UNKNOWN",
                params: {
                    recordId: data.id,
                    entityApiName: data.entityApiName
                }
            }]
        };
        let d = {
            message: JSON.stringify(obj)
        }
        proxy.$post(Interface.detailObj.btnActions, d).then(res => {
            data.btnActions = res.actions[0].returnValue.actions;
        })
    };
    getRecordActions();

    const handleBtnActions = (name) => {
        if (name == 'Edit') {
            handleEdit();
        } else if (name == 'Delete') {
            handleDelete();
        } else {
            if (typeof (eval(name)) == "function") {
                var result = eval(name + "();");
            } else {

            }
        }
    };

    watch(()=>props.id, (newVal, oldVal) => {
        console.log("props", props)
        data.id = props.id;
        data.objectTypeCode = props.objectTypeCode;
        data.entityApiName = props.entityApiName;
        data.activeKey = 0;
        getDetail();
        nextTick(()=>{
            detailInfoRef.value.getLayout();
        })
    },{immediate: true, deep: true})
  
  </script>
  <style lang="less" scoped>
    .detailHeadFixed{
        width: calc(100% - 385px);
        position: fixed;
        top: 90px;
        left: 385px;
    }
  </style>