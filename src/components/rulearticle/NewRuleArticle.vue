<template>
    <div>
      <a-modal
        v-model:open="props.isShow"
        width="850px"
        :maskClosable="false"
        @cancel="handleCancel"
        @ok="handleSubmit"
      >
        <template #title>
          <div>
            {{ title }}
          </div>
        </template>
        <div class="modalContainer">
        <RadioDept :isShow="isRadioDept"  @cancel="cancelDeptModal" @selectVal="handleDeptParams" />
          <div class="modalCenter" :style="{ height: height + 'px!important' }">
            <a-form :model="formState" ref="formRef">
              <div class="section">
                <div class="sectionTitle">基本信息</div>
                <div class="sectionRow">
                    <div class="sectionItem">
                        <a-form-item name="Name" label="名称" :rules="[{ required: true, message: '请输入名称' }]">
                            <a-input v-model:value="formState.Name" class="ApprovedByName"></a-input>
                        </a-form-item>
                    </div>
                    <div class="sectionItem">
                        <a-form-item name="ArticleNumber" label="编号">
                            <a-input v-model:value="formState.ArticleNumber" class="ApprovedByName"></a-input>
                        </a-form-item>
                    </div>
                </div>
                <div class="sectionRow">
                  <div class="sectionItem">
                        <a-form-item name="FolderId" label="栏目" :rules="[{ required: true, message: '请选择栏目' }]">
                            <a-tree-select
                                v-model:value="formState.FolderId"
                                show-search
                                style="width: 100%"
                                :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
                                placeholder="请选择栏目"
                                allow-clear
                                tree-default-expand-all
                                :tree-data="treeData"
                                tree-node-filter-prop="name"
                            >
                                <template #title="{ value: val, name }">
                                    <span>{{ name }}</span>
                                </template>
                            </a-tree-select>
                        </a-form-item>
                    </div>
                    <div class="sectionItem">
                      <a-form-item name="PublicationScope" label="公开方式">
                          <a-select v-model:value="formState.PublicationScope" placeholder="请选择公开方式">
                              <a-select-option v-for="(item,index) in PublicationScopeList" :value="item.value" :key="index">{{item.label}}</a-select-option>
                          </a-select>
                      </a-form-item>
                    </div>
                </div>
                <div class="sectionRow">
                    <div class="sectionItem">
                        <a-form-item name="name" label="发布人">
                            <a-input v-model:value="formState.ApprovedBy" disabled class="ApprovedByName"></a-input>
                        </a-form-item>
                    </div>
                    <div class="sectionItem">
                        <a-form-item name="BusinessUnitId" label="发布部门" :rules="[{ required: true, message: '请选择部门' }]">
                            <div>
                                <a-select placeholder="请选择"
                                        v-model:value="data.BusinessUnitId"
                                        :default-active-first-option="false" :filter-option="false" showSearch
                                        @search="searchlookup2" 
                                        @change="handleDeptParams2"
                                        @dropdownVisibleChange="searchlookup2">
                                        <template #suffixIcon></template>
                                        <a-select-option v-for="v in listData" :key="v.ID" :value="v.ID">{{ v.Name
                                            }}</a-select-option>
                                    </a-select>
                                    <i class="iconfont icon-sousuo pointer selectIcon"
                                        @click="handleFocus"></i>
                            </div>
                        </a-form-item>
                    </div>
                </div>
                <div class="sectionRow">
                    <div class="sectionItem">
                        <a-form-item name="ActiveOn" label="生效日期">
                            <a-date-picker v-model:value="formState.ActiveOn" placeholder="生效日期" :valueFormat="'YYYY-MM-DD'" />
                        </a-form-item>
                    </div>
                    <div class="sectionItem">
                        <a-form-item name="ExpiresOn" label="失效日期">
                            <a-date-picker v-model:value="formState.ExpiresOn" placeholder="失效日期" :valueFormat="'YYYY-MM-DD'" />
                        </a-form-item>
                    </div>
                </div>
              </div>
              <div class="section" v-if="props.type=='version'">
                <div class="sectionTitle sectionTitle2">修订说明</div>
                <div class="sectionRow">
                    <div class="sectionItem">
                        <a-form-item name="Description" label="修订说明">
                          <a-textarea v-model:value="formState.Description" placeholder="" />
                        </a-form-item>
                    </div>
                </div>
              </div>
              <div class="section">
                <div class="sectionTitle sectionTitle2">制度文件</div>
                <div class="sectionRow">
                    <div class="sectionItem">
                        <div class="uploadPanel">
                          <a-upload-dragger v-model:fileList="fileList" name="file" :multiple="true"
                              action="https://www.mocky.io/v2/5cc8019d300000980a055e76">
                              <div class="uploadRow">
                                  <p class="ant-upload-drag-icon">
                                      <inbox-outlined></inbox-outlined>
                                  </p>
                                  <p class="ant-upload-text">将文件拖到此处，或点击上传</p>
                              </div>
                              <template #itemRender="{ file, actions }">
                                  <div class="uploadList">
                                      <div class="uploadItem">
                                          <div>
                                              <img :src="require('@/assets/img/filetype/doc.png')"
                                                  v-if="file.FileExtension=='ocx'||file.FileExtension=='docx'||file.FileExtension=='doc'" />
                                              <img :src="require('@/assets/img/filetype/rar.png')"
                                                  v-else-if="file.FileExtension=='rar'||file.FileExtension=='zip'" />
                                              <img :src="require('@/assets/img/filetype/Excel.png')"
                                                  v-else-if="file.FileExtension=='xlsx'||file.FileExtension=='xls'" />
                                              <img :src="require('@/assets/img/filetype/pdf.png')"
                                                  v-else-if="file.FileExtension=='pdf'" />
                                              <img :src="require('@/assets/img/filetype/TXT.png')"
                                                  v-else-if="file.FileExtension=='TXT' || file.FileExtension=='txt'" />
                                              <img :src="require('@/assets/img/filetype/PPT.png')"
                                                  v-else-if="file.FileExtension=='ppt'||file.FileExtension=='pptx'" />
                                              <img :src="require('@/assets/img/filetype/video.png')"
                                                  v-else-if="file.FileExtension=='mp4'||file.FileExtension=='.mp4'" />
                                              <img :src="require('@/assets/img/filetype/defaultImg.png')"
                                                  v-else-if="file.FileExtension=='jpg'||file.FileExtension=='png'||record.FileExtension=='gif'" />
                                              <img :src="require('@/assets/img/filetype/File.png')" v-else />
                                              <div class="filemsg">
          
                                              </div>
                                              <div class="uploadAction">
                                                  <div class="icons">
                                                      <span class="icon">
                                                          <ZoomInOutlined />
                                                      </span>
                                                      <span class="icon">
                                                          <DownloadOutlined />
                                                      </span>
                                                      <span class="icon">
                                                          <DeleteOutlined />
                                                      </span>
                                                  </div>
                                              </div>
                                          </div>
          
                                      </div>
                                  </div>
                              </template>
                          </a-upload-dragger>
                      </div>
                    </div>
                </div>
              </div>
            </a-form>
          </div>
        </div>
        <template #footer>
          <div>
            <a-button @click="handleCancel">取消</a-button>
            <a-button type="primary" @click.prevent="handleSubmit">保存</a-button>
          </div>
        </template>
      </a-modal>
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
    defineProps,
    defineExpose,
    defineEmits,
    toRaw,
  } from "vue";
  import {
    SearchOutlined,
    DownOutlined,
    DownloadOutlined,
    ZoomInOutlined,
    UserOutlined,
    InboxOutlined,
    DeleteOutlined
  } from "@ant-design/icons-vue";
  import { message } from "ant-design-vue";
  import RadioDept from "@/components/commonModal/RadioDept.vue";
  import Interface from "@/utils/Interface.js";
  import dayjs from 'dayjs';
  const { proxy } = getCurrentInstance();
  console.log(document.documentElement.clientHeight);
  const labelCol = ref({ style: { width: "100px" } });
  const props = defineProps({
    isShow: Boolean,
    type: String,
    id: String,
    FolderId: String
  });
  const formRef = ref();
  const emit = defineEmits(["cancel","ok"]);
  const handleCancel = () => {
    emit("cancel", false);
  };
  const formState = reactive({
    ApprovedBy: '',
    BusinessUnitId: '',
    ArticleNumber:'',
    PublicationScope:'院内公开',
    Name:'',
    FolderId:'',
    ActiveOn:null,
    ExpiresOn:null,
    Description:''
  });
  const data = reactive({
    title: "",
    height: document.documentElement.clientHeight - 350,
    AttachRightCodeList: [
        {
            label: '所有',
            value:0
        },
        {
            label: '只读',
            value: 4
        },
        {
            label: '可下载',
            value: 8
        }
    ],
    PublicationScopeList: [
        {
            label: '院内公开',
            value: '院内公开'
        },
    ],
    keywords: [],
    treeData: [],
    CoverDisplayList: [
        {
            label: '标题左边',
            value: 'LeftTitle'
        },
        {
            label: '标题右边',
            value: 'RightTitle'
        },
        {
            label: '标题下面大图',
            value: 'BelowTitleBigImg'
        },
        {
            label: '标题下列表',
            value: 'BelowGrid'
        },
        {
            label: '标题下轮播',
            value: 'Carousel'
        }
    ],
    fileList: [],
    isRadioDept: false,
    BusinessUnitId: '',
    ApprovedBy:'',
    listData:[]
  });
  const {
    title,
    height, AttachRightCodeList, keywords, treeData, CoverDisplayList,
     fileList, isRadioDept, BusinessUnitId,ApprovedBy,listData,PublicationScopeList
  } = toRefs(data);

  const cancelDeptModal = (e) => {
    data.isRadioDept = e;
  }
  const handleDeptParams = (e) => {
    //console.log("e",e);
    if(e.ID){
      formState.BusinessUnitId = e.Name;
      data.BusinessUnitId = e.ID;
      data.isRadioDept = false;
      let result =data.listData.filter((item) => {
        return item.ID == e.ID;
      });
      if(result&&result.length){}else{
        data.listData.push({
          ID:e.ID,
          Name:e.Name
        })
      }
    }
  }
  const handleDeptParams2 = (e) => {
    //console.log("eeee",e);
    if(e){
      data.BusinessUnitId = e;
      let result =data.listData.filter((item) => {
        return item.ID == e;
      });
      if(result&&result.length){
        formState.BusinessUnitId = result[0].Name;
      }
    }
  }
  const handleFocus = (e) => {
    data.isRadioDept = true;
  }
  const getTreeData = () => {
      data.treeData = [
        {
          "id":"10010000-0000-0000-0000-000000007002",
          "key":"10010000-0000-0000-0000-000000007002",
          "value":"10010000-0000-0000-0000-000000007002",
          "name":"制度文件",
          "text":"制度文件",
          "quantity":0,
          "parent":null,
          "children":[
            {"id":"ec230bb1-b9a5-42eb-83fc-4b6410038f57","key":"ec230bb1-b9a5-42eb-83fc-4b6410038f57","value":"ec230bb1-b9a5-42eb-83fc-4b6410038f57","name":"讨论稿","text":"讨论稿","quantity":0,"parent":"10010000-0000-0000-0000-000000007002","children":[]},
            {"id":"61f0d939-2474-4c29-b47e-fb700d6ef4c3","key":"61f0d939-2474-4c29-b47e-fb700d6ef4c3","value":"61f0d939-2474-4c29-b47e-fb700d6ef4c3","name":"暂行稿","text":"暂行稿","quantity":0,"parent":"10010000-0000-0000-0000-000000007002","children":[]},
            {"id":"c141ce85-126f-4771-9f7a-8023dec67493","key":"c141ce85-126f-4771-9f7a-8023dec67493","value":"c141ce85-126f-4771-9f7a-8023dec67493","name":"实施稿","text":"实施稿","quantity":0,"parent":"10010000-0000-0000-0000-000000007002","children":[]}]
        }
      ]
  }
  getTreeData();
  
  

  const getTags = () => {
    proxy.$get(Interface.information.tags,{}).then(res=>{
        data.keywords = res.data;
    })
  }
  getTags();
  
  const searchlookup = (search, attribute) => {
    console.log(search, attribute);
    proxy
      .$get(Interface.uilook, {
        Lktp: attribute.attributes.sObjectType,
        Lksrch: search,
      })
      .then((res) => {
        let listData = res.listData;
        data.search[attribute.targetValue] = listData;
      });
  };
  const searchlookup2 = () => {
    let obj = {
            actions:[{
                id: "6129;a",
                descriptor: "",
                callingDescriptor: "UNKNOWN",
                params: {
                    objectApiName: props.entityApiName,
                    fieldApiName: 'BusinessUnitId',
                    pageParam: 1,
                    pageSize: 25,
                    q: "",
                    searchType: "Recent",
                    targetApiName: 'BusinessUnit',
                    body: {
                        sourceRecord: {
                            apiName: props.entityApiName,
                            fields: {
                                Id: null,
                                    RecordTypeId: ""
                                }
                            }
                        }
                    }
                }]
        }
        let d = {
            message: JSON.stringify(obj)
        }
        proxy.$post(Interface.lookup, d).then((res) => {
            let list = res.actions[0].returnValue.lookupResults.records;
            let arr = [];
            list.forEach(item=>{
                arr.push({
                    ID: item.fields.Id.value,
                    Name: item.fields.Name.value
                })
            });
            data.listData = arr;
        });
  }
  onMounted(() => {
    window.addEventListener("resize", (e) => {
      data.height = document.documentElement.clientHeight - 350;
    });
    if(props.type=='new'){
      data.title='新建制度文件';
      let userInfo=window.localStorage.getItem('userInfo');
      if(userInfo){
            userInfo=JSON.parse(userInfo);
            var userId=userInfo.userId;
            var userName=userInfo.fullName;
            if(userId=='jackliu'){
                userId='2EC00CF2-A484-4136-8FEF-E2A2719C5ED6'
            }
            formState.ApprovedBy=userName;
            data.ApprovedBy=userId;
        }
      
    }else if(props.type=='history'){
      data.title='编辑制度文件';
    }else if(props.type=='version'){
      data.title='修订制度文件';
    }
    if(props.id){
      getDetail();
    }
  });
  const getDetail = () => {
        let d = {
            actions:[{
                id: "4270;a",
                descriptor: "aura://RecordUiController/ACTION$getRecordWithFields",
                callingDescriptor: "UNKNOWN",
                params: {
                  recordId: props.id,
                  apiName:'Institution',
                  objTypeCode: '100204'
                }
            }]
        };
        let obj = {
            message: JSON.stringify(d)
        }
        proxy.$post(Interface.detail,obj).then(res=>{
            if(res&&res.actions&&res.actions[0]&&res.actions[0].returnValue&&res.actions[0].returnValue.fields){
              let fields=res.actions[0].returnValue.fields;
              formState.ApprovedBy=fields.ApprovedBy.displayValue;
              data.ApprovedBy=fields.ApprovedBy.value;
              formState.BusinessUnitId=fields.BusinessUnitId.displayValue;
              data.BusinessUnitId=fields.BusinessUnitId.value;
              data.listData=[];
              data.listData.push({
                  ID:fields.BusinessUnitId.value,
                  Name:fields.BusinessUnitId.displayValue
              })
              formState.ArticleNumber=fields.ArticleNumber.value||'';
              formState.PublicationScope=fields.PublicationScope.value||'';
              formState.Name=fields.Name.value||'';
              formState.FolderId=fields.FolderId.value||'';
              formState.ActiveOn=fields.ActiveOn&&fields.ActiveOn.value?dayjs(new Date(fields.ActiveOn.value)).format("YYYY-MM-DD"):'';
              formState.ExpiresOn=fields.ExpiresOn&&fields.ExpiresOn.value?dayjs(new Date(fields.ExpiresOn.value)).format("YYYY-MM-DD"):'';
              formState.Description=fields.Description?fields.Description.value:'';
            }
        })
    }

  const handleSubmit = () => {
    formRef.value
      .validate()
      .then(() => {
        console.log("values", formState, toRaw(formState));
        // let obj = {
        //   params: {
        //     objTypeCode: props.objectTypeCode,
        //     fields: {
        //         ApprovedBy: {
        //             Id: ""
        //         },
        //         BusinessUnitId: {
        //             Id: data.BusinessUnitId
        //         },
        //         IsImportant: formState.IsImportant?1:0,
        //         IsTop: formState.IsTop ? 1 : 0,
        //         AttachRightCode: formState.AttachRightCode,
        //         EndTopDate: dayjs(formState.EndTopDate).format("YYYY-MM-DD hh:mm:ss"),
        //         ApprovedOn: dayjs(formState.ApprovedOn).format("YYYY-MM-DD hh:mm:ss"),
        //         StateCode: 1,
        //         KeyWords: formState.KeyWords.join(',') || '',
        //         IsPublic: formState.IsPublic ? 1 : 0,
        //         CoverDisplay: formState.CoverDisplay,
        //         Title: "",
        //         FolderId: {
        //             Id: props.FolderId
        //         }
        //     },
        //     id: props.id,
        //     ContentTypeCode: 1,
        //   },
        // };
        // var messages = JSON.stringify(obj);
        // proxy.$get(Interface.saveRecord, { message: messages }).then((res) => {
        //   formRef.value.resetFields();
        //   message.warning("保存成功！");
        //   emit("cancel", false);
        // });
        let url=Interface.edit;
        let d = {
          actions:[{
                id: "2919;a",
                descriptor: "",
                callingDescriptor: "UNKNOWN",
                params: {
                  recordInput: {
                    allowSaveOnDuplicate: false,
                    apiName: 'Institution',
                    objTypeCode: '100204',
                    fields: {
                        ApprovedBy: data.ApprovedBy,
                        BusinessUnitId: data.BusinessUnitId,
                        ArticleNumber: formState.ArticleNumber,
                        PublicationScope: formState.PublicationScope,
                        ActiveOn: dayjs(formState.ActiveOn).format("YYYY-MM-DD"),
                        ExpiresOn: dayjs(formState.ExpiresOn).format("YYYY-MM-DD"),
                        Name: formState.Name,
                        Description: formState.Description,
                        FolderId: formState.FolderId
                    }
                  }              
                }
            }]
          };
          if(props.id){
              d.actions[0].params.recordId=props.id;
          }
          let obj = {
              message: JSON.stringify(d)
          }
          proxy.$post(url,obj).then(res=>{
            formRef.value.resetFields();
            message.success("保存成功！");
            emit("cancel", false);
            emit("ok", '');
          });

      })
      .catch((err) => {
        console.log("error", err);
      });
  };
  </script>
  <style lang="less">
  @import url("@/style/modal.less");
  .ant-modal-content .modalContainer .modalCenter {
    /* height: 500px !important; */
  }
  .section {
    .sectionTitle {
      height: 30px;
      background-color: rgb(243, 242, 242);
      line-height: 30px;
      border-radius: 4px;
      padding-left: 15px;
      margin-bottom: 12px;
      /* margin: 2rem 2rem 0.5rem 2rem; */
    }
    .sectionRow {
      padding: 0 10px;
      box-sizing: border-box;
      display: flex;
      .sectionItem {
        flex: 1;
        margin-right: 20px;
        .ant-row {
          display: block !important;
        }
      }
      .sectionItem:last-child {
        margin-right: 0;
      }
    }
  }
  :where(.css-dev-only-do-not-override-kqecok).ant-picker {
    width: 100%;
  }
  .ant-form-item {
    position: relative;
  }
  .selectIcon {
    position: absolute;
    right: 10px;
    top: 5px;
  }
  .uploadRow {
        display: flex;
        align-items: center;
        justify-content: center;
        align-items: center;
    }
    :where(.css-dev-only-do-not-override-kqecok).ant-upload-wrapper .ant-upload-drag p.ant-upload-drag-icon{
        margin-bottom: 0 !important;
    }
    :where(.css-dev-only-do-not-override-kqecok).ant-upload-wrapper .ant-upload-drag .ant-upload {
        padding: 0 !important;
    }

    .ant-upload-list {
        display: flex;
        flex-wrap: wrap;

        .ant-upload-list-item-container {
            width: 148px;
            height: 148px;
            margin-right: 10px;
        }
    }

    .uploadItem {
        overflow: hidden;
        background-color: #fff;
        border: 1px solid #c0ccda;
        border-radius: 6px;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        width: 148px;
        height: 148px;
        margin: 0 8px 8px 0;
        display: inline-block;
        position: relative;
        cursor: pointer;

        img {
            width: 125px;
        }

        &:hover .uploadAction {
            opacity: 1;
        }

        .uploadAction {
            position: absolute;
            width: 100%;
            height: 100%;
            left: 0;
            top: 0;
            cursor: default;
            text-align: center;
            color: #fff;
            opacity: 0;
            font-size: 20px;
            background-color: rgba(0, 0, 0, .5);
            -webkit-transition: opacity .3s;
            transition: opacity .3s;
            display: flex;
            align-items: center;
            justify-content: center;

            .icons {
                display: flex;

                .icon {
                    display: inline-block;
                    width: 30px;
                    cursor: pointer;

                    &:hover {
                        color: var(--textColor);
                    }
                }
            }
        }
    }
    .sectionItem .ApprovedByName{
      border-radius: 4px !important;
    }
    :where(.css-dev-only-do-not-override-kqecok).ant-tree-select-dropdown .ant-select-tree .ant-select-tree-treenode{
      width: 100%;
    }
    :where(.css-dev-only-do-not-override-kqecok).ant-upload-wrapper .ant-upload-drag p.ant-upload-text{
      font-size: 14px;
    }
    .section .sectionTitle2{
      margin-top: 10px;
      margin-bottom: 20px;
    }
  </style>
  