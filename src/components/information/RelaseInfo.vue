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
                        <a-form-item name="name" label="发布人">
                            <a-input v-model:value="formState.ApprovedBy"></a-input>
                        </a-form-item>
                    </div>
                    <div class="sectionItem">
                        <a-form-item name="BusinessUnitId" label="发布部门" :rules="[{ required: true, message: '请输入名称' }]">
                            <a-input v-model:value="formState.BusinessUnitId" @click="handleFocus"></a-input>
                        </a-form-item>
                    </div>
                </div>
                <div class="sectionRow">
                    <div class="sectionItem">
                        <a-form-item name="IsImportant" label="重要信息">
                          <a-checkbox v-model:checked="formState.IsImportant"></a-checkbox>
                        </a-form-item>
                    </div>
                    <div class="sectionItem">
                        <a-form-item name="IsTop" label="置顶信息">
                          <a-checkbox v-model:checked="formState.IsTop"></a-checkbox>
                        </a-form-item>
                    </div>
                </div>
                <div class="sectionRow">
                    <div class="sectionItem">
                        <a-form-item name="AttachRightCode" label="附件权限">
                            <a-select v-model:value="formState.AttachRightCode" placeholder="请选择附件权限">
                                <a-select-option v-for="item in AttachRightCodeList" :value="item.value">{{item.label}}</a-select-option>
                            </a-select>
                        </a-form-item>
                    </div>
                    <div class="sectionItem">
                        <a-form-item name="EndTopDate" label="置顶截止">
                            <a-date-picker v-model:value="formState.EndTopDate" show-time placeholder="置顶截止" />
                        </a-form-item>
                    </div>
                </div>
                <div class="sectionRow">
                    <div class="sectionItem">
                        <a-form-item name="ApprovedOn" label="发布时间" :rules="[{ required: true, message: '请输入名称' }]">
                            <a-date-picker v-model:value="formState.ApprovedOn" show-time placeholder="发布时间" />
                        </a-form-item>
                    </div>
                    <div class="sectionItem">
                        <a-form-item name="IsPublic" label="查看范围">
                            <a-checkbox v-model:checked="formState.IsPublic">所有人可以查看</a-checkbox>
                        </a-form-item>
                    </div>
                </div>
                <div class="sectionRow">
                    <div class="sectionItem">
                        <a-form-item name="KeyWords" label="移动标签">
                            <a-checkbox-group v-model:value="formState.KeyWords" style="width: 100%">
                                <a-checkbox :value="item" v-for="(item,index) in keywords" :key="index">{{item}}</a-checkbox>
                            </a-checkbox-group>
                        </a-form-item>
                    </div>
                </div>
                <div class="sectionRow">
                    <div class="sectionItem">
                        <a-form-item name="FolderId" label="栏目" :rules="[{ required: true, message: '请输入名称' }]">
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
                </div>
              </div>
              <div class="section">
                <div class="sectionTitle">图片/轮播信息</div>
                <div class="sectionRow">
                    <div class="sectionItem">
                        <a-form-item name="CoverDisplay" label="图片（手机/首页）">
                            <a-select v-model:value="formState.CoverDisplay" placeholder="请选择图片（手机/首页）">
                                <a-select-option v-for="item in CoverDisplayList" :value="item.value">{{item.label}}</a-select-option>
                            </a-select>
                        </a-form-item>
                    </div>
                </div>
              </div>
              <div class="section">
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
    UserOutlined,
    InboxOutlined
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
    folderName: String,
    folderPicker: String
  });
  const formRef = ref();
  const emit = defineEmits(["cancel"]);
  const handleCancel = () => {
    emit("cancel", false);
  };
  const formState = reactive({
    ApprovedBy: '',
    BusinessUnitId: '',
    IsImportant: '',
    IsTop: '',
    AttachRightCode:'',
    EndTopDate: '',
    ApprovedOn: '',
    StateCode: '',
    KeyWords: [],
    IsPublic: '',
    CoverDisplay: '',
    FolderId:''
  });
  const data = reactive({
    title: "发布信息",
    height: document.documentElement.clientHeight - 300,
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
    BusinessUnitId: ''
  });
  const {
    title,
    height, AttachRightCodeList, keywords, treeData, CoverDisplayList,
     fileList, isRadioDept, BusinessUnitId
  } = toRefs(data);

  const cancelDeptModal = (e) => {
    data.isRadioDept = e;
  }
  const handleDeptParams = (e) => {
    console.log("e",e);
    formState.BusinessUnitId = e.Name;
    data.BusinessUnitId = e.ID;
    data.isRadioDept = false;
  }
  const handleFocus = (e) => {
    data.isRadioDept = true;
  }
  const getTreeData = () => {
    proxy.$get(Interface.information.contentTree,{}).then((response)=>{
        let formTree = (list) => {
            list.forEach(item=>{
                if(item.children){
                    formTree(item.children);
                }
                item.key = item.id;
                item.value = item.id;
            })
        }
        formTree(response);
        data.treeData = response;
    })
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
  
  onMounted(() => {
    window.addEventListener("resize", (e) => {
      data.height = document.documentElement.clientHeight - 300;
    });
  });
  
  const handleSubmit = () => {
    formRef.value
      .validate()
      .then(() => {
        console.log("values", formState, toRaw(formState));
        let obj = {
          params: {
            objTypeCode: 30027,
            fields: {
                ApprovedBy: {
                    Id: ""
                },
                BusinessUnitId: {
                    Id: data.BusinessUnitId
                },
                IsImportant: formState.IsImportant?1:0,
                IsTop: formState.IsTop ? 1 : 0,
                AttachRightCode: formState.AttachRightCode,
                EndTopDate: dayjs(formState.EndTopDate).format("YYYY-MM-DD hh:mm:ss"),
                ApprovedOn: dayjs(formState.ApprovedOn).format("YYYY-MM-DD hh:mm:ss"),
                StateCode: 1,
                KeyWords: formState.KeyWords.join(',') || '',
                IsPublic: formState.IsPublic ? 1 : 0,
                CoverDisplay: formState.CoverDisplay,
                Title: "",
                FolderId: {
                    Id: ""
                }
            },
            id: "",
            ContentTypeCode: 1,
          },
        };
        var messages = JSON.stringify(obj);
        proxy.$get(Interface.saveRecord, { message: messages }).then((res) => {
          formRef.value.resetFields();
          message.warning("保存成功！");
          emit("cancel", false);
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
  </style>
  