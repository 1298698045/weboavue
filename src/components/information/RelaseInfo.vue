<template>
  <div>
    <a-modal v-model:open="props.isShow" width="850px" style="top:10px;" :maskClosable="false" @cancel="handleCancel"
      @ok="handleSubmit">
      <template #title>
        <div>
          {{ title }}
        </div>
      </template>
      <div class="modalContainer RelaseInfoWrap">
        <RadioDept :isShow="isRadioDept" @cancel="cancelDeptModal" @selectVal="handleDeptParams" />
        <div class="modalCenter modalCenter1" :style="{ height: height + 'px!important' }" v-show="step * 1 == 0">
          <a-form :model="formState" ref="formRef">
            <div class="section">
              <div class="sectionTitle">基本信息</div>
              <div class="sectionRow">
                <div class="sectionItem">
                  <a-form-item name="name" label="发布人">
                    <a-input v-model:value="formState.ApprovedBy" disabled class="ApprovedByName"></a-input>
                  </a-form-item>
                </div>
                <div class="sectionItem">
                  <a-form-item name="BusinessUnitId" label="发布部门">
                    <!-- <div v-if="!formState.BusinessUnitId">
                      <a-select placeholder="请选择" v-model:value="data.BusinessUnitId"
                        :default-active-first-option="false" :filter-option="false" showSearch @search="searchlookup2"
                        @change="handleDeptParams2" @dropdownVisibleChange="searchlookup2">
                        <template #suffixIcon></template>
                        <a-select-option v-for="v in listData" :key="v.ID" :value="v.ID">{{ v.Name
                        }}</a-select-option>
                      </a-select>
                      <i class="iconfont icon-sousuo pointer selectIcon" @click="handleFocus"></i>
                    </div> -->
                    <a-input v-model:value="formState.BusinessUnitId" disabled class="ApprovedByName"></a-input>
                  </a-form-item>
                </div>
              </div>

              <div class="sectionRow">
                <div class="sectionItem">
                  <a-form-item name="ApprovedOn" label="发布时间" :rules="[{ required: true, message: '请输入发布时间' }]">
                    <a-date-picker v-model:value="formState.ApprovedOn" valueFormat="YYYY-MM-DD HH:mm:ss" show-time
                      placeholder="发布时间" />
                  </a-form-item>
                </div>
                <div class="sectionItem">
                  <a-form-item name="StateCode" label="发布状态" :rules="[{ required: true, message: '请选择发布状态' }]">
                    <a-select v-model:value="formState.StateCode" placeholder="请选择发布状态">
                      <a-select-option v-for="(item, index) in StateCodeList" :value="item.value" :key="index">{{
                        item.label
                      }}</a-select-option>
                    </a-select>
                  </a-form-item>
                </div>
              </div>
              <div class="sectionRow">
                <div class="sectionItem">
                  <a-form-item name="FolderId" label="栏目" :rules="[{ required: true, message: '请选择栏目' }]">
                    <a-tree-select v-model:value="formState.FolderId" show-search style="width: 100%"
                      :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }" placeholder="请选择栏目" allow-clear
                      tree-default-expand-all :tree-data="treeData" tree-node-filter-prop="name">
                      <template #title="{ name }">
                        <span>{{ name }}</span>
                      </template>
                    </a-tree-select>
                  </a-form-item>
                </div>
                <div class="sectionItem">
                  <a-form-item name="AttachRightCode" label="附件权限">
                    <a-select v-model:value="formState.AttachRightCode" placeholder="请选择附件权限">
                      <a-select-option v-for="(item, index) in AttachRightCodeList" :value="item.value" :key="index">{{
                        item.label }}</a-select-option>
                    </a-select>
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
                  <a-form-item name="IsPublic" label="查看范围">
                    <a-checkbox v-model:checked="formState.IsPublic">所有人可以查看</a-checkbox>
                  </a-form-item>
                </div>
                <div class="sectionItem" v-if="formState.IsTop">
                  <a-form-item name="EndTopDate" label="置顶截止">
                    <a-date-picker v-model:value="formState.EndTopDate" valueFormat="YYYY-MM-DD HH:mm:ss" show-time
                      placeholder="置顶截止" />
                  </a-form-item>
                </div>
              </div>
              <div class="sectionRow">
                <div class="sectionItem">
                  <a-form-item name="KeyWords" label="移动标签">
                    <a-checkbox-group v-model:value="formState.KeyWords" style="width: 100%">
                      <a-checkbox :value="item" v-for="(item, index) in keywords" :key="index">{{ item }}</a-checkbox>
                    </a-checkbox-group>
                  </a-form-item>
                </div>
              </div>

            </div>

          </a-form>
        </div>
        <div class="modalCenter" :style="{ height: height + 'px!important' }" v-show="step * 1 == 1">
          <!-- <div class="section">
            <div class="sectionTitle">图片/轮播信息</div>
            <div class="sectionRow">
              <div class="sectionItem">
                <a-form-item name="CoverDisplay" label="图片（手机/首页）">
                  <a-select v-model:value="formState.CoverDisplay" placeholder="请选择图片（手机/首页）">
                    <a-select-option v-for="(item, index) in CoverDisplayList" :value="item.value" :key="index">{{
                      item.label
                    }}</a-select-option>
                  </a-select>
                </a-form-item>
              </div>
            </div>
          </div> -->
          <div class="section">
            <div class="sectionTitle">图片信息</div>
            <div class="sectionRow">
              <div class="sectionItem RelaseInfoUpload">
                <div class="uploadPanel">
                  <div class="inboxFileList">
                    <div class="inboxFileItem" v-for="(item, index) in fileList" :key="index">
                      <div class="FileInfo">
                        <img :src="item.viewUrl" class="img" />
                        <!-- <div class="fileName rowEllipsis">
                            {{item.name}}
                          </div>
                          <div class="fileSize">{{item.size}}</div> -->
                        <div class="fileOptionShow" :title="(item.name || '')">
                          <div class="btns">
                            <a-tooltip title="查看" placement="top">
                              <a-button type="text" :icon="h(EyeOutlined)" @click="handlePreviewFile(item)"></a-button>
                            </a-tooltip>
                            <a-tooltip title="下载" placement="top">
                              <a-button type="text" :icon="h(VerticalAlignBottomOutlined)"
                                @click="downloadFile(item)"></a-button>
                            </a-tooltip>
                            <a-tooltip title="删除" placement="top">
                              <a-button type="text" :icon="h(CloseOutlined)" @click="deleteFile0(item)"></a-button>
                            </a-tooltip>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="inboxFileItem">
                      <a-upload-dragger accept="image/*" v-model:fileList="fileList" :headers="headers"
                        @change="changeFiles" :data="uploadData" :action="Interface.information.uploadMedia"
                        :showUploadList="false" multiple name="files" :before-upload="beforeUpload">
                        <div class="uploadRow">
                          <p class="ant-upload-drag-icon">
                            <PlusOutlined />
                          </p>
                          <p class="ant-upload-text">点击上传图片</p>
                        </div>
                      </a-upload-dragger>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modalCenter" :style="{ height: height + 'px!important' }" v-show="step * 1 == 2">
          <a-form :model="formState3" ref="formRef3" class="formRef3">
            <div class="section">
              <div class="sectionTitle">添加可查看人员</div>
              <div class="sectionRow">
                <div class="sectionItem memberlist">
                  <FilterQuery :FilterExpresssionList="FilterExpresssionList" @params="getFilterQuery"
                    :entityApiName="'SystemUser'"></FilterQuery>
                </div>
              </div>
              <div class="sectionRow peopleRow">
                <div class="sectionItem peopleItem">
                  <div class="sectionItemTitle">查询结果</div>
                  <a-button type="primary" class="sectionItemBtn" @click="handleSearch">搜索</a-button>
                  <a-table :columns="columns" :dataSource="peopleList" :scroll="{ y: tableHeight }"
                    :pagination="data.pagination" @change="handleTableChange">
                    <template #bodyCell="{ column, index, record }">
                      <template v-if="column.key === 'index'">
                        <div>
                          {{ data.pagination.pageSize * (data.pagination.current - 1) + index + 1 }}
                        </div>
                      </template>
                      <template v-if="column.key == 'AvatarImg'">
                        <img :src="record.AvatarImg" @error="handleImageError(record)" alt=""
                          class="AddGroup_list_avatar" />
                      </template>
                    </template>
                  </a-table>
                  <!-- <div class="empty" v-if="peopleList.length == 0">
                    <img :src="require('@/assets/img/empty.png')" alt="" />
                    <p class="emptyDesc">当前暂无数据</p>
                  </div> -->
                </div>
              </div>
            </div>
          </a-form>
        </div>
      </div>
      <template #footer>
        <div>
          <a-button @click="handleCancel" v-if="step == 0">取消</a-button>
          <a-button type="primary" @click.prevent="handleSubmit" v-if="step == 0">下一步</a-button>
          <a-button @click="data.step = 0" v-if="step == 1">上一步</a-button>
          <a-button type="primary" @click="getFilterExpresssionList" v-if="step == 1">下一步</a-button>
          <a-button @click="data.step = 1" v-if="step == 2">上一步</a-button>
          <a-button type="primary" @click="saveFilterExpresssionList" v-if="step == 2">完成</a-button>
        </div>
      </template>
    </a-modal>
    <RadioDept v-if="isRadioDept" :isShow="isRadioDept" @cancel="cancelDeptModal" @selectVal="handleDeptParams" />
    <radio-user v-if="isRadioUser" :isShow="isRadioUser" @selectVal="getUserData" @cancel="closeUser"
      @ok="refreshPeople"></radio-user>
    <Delete v-if='isDelete' :isShow="isDelete" :desc="deleteDesc" @cancel="cancelDelete" @ok="refreshPeople"
      :sObjectName="sObjectName" :recordId="memberId" :objTypeCode="objectTypeCode" :external="external" />
    <CommonConfirm v-if='isConfirm' :isShow="isConfirm" :text="'确定要删除吗？'" :title="'删除'" @cancel="isConfirm = false"
      @ok="deleteFile" :id="recordId" />
    <ImageView v-if="isPhoto" :isShow="isPhoto" :photoParams="photoParams" @cancel="isPhoto = false" />
    <PdfView v-if="isPdf" :isShow="isPdf" :pdfParams="pdfParams" @cancel="isPdf = false" />
    <TxtView v-if="isTxt" :isShow="isTxt" :txtParams="txtParams" @cancel="isTxt = false" />
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
  h
} from "vue";
import {
  PlusOutlined,
  SearchOutlined,
  DownOutlined,
  DownloadOutlined,
  ZoomInOutlined,
  UserOutlined,
  InboxOutlined,
  DeleteOutlined,
  VerticalAlignBottomOutlined,
  CloseOutlined,
  EyeOutlined
} from "@ant-design/icons-vue";
import { girdFormatterValue } from "@/utils/common.js";
import { message } from "ant-design-vue";
import Interface from "@/utils/Interface.js";
import dayjs from 'dayjs';
import RadioDept from "@/components/commonModal/RadioDept.vue";
import RadioUser from "@/components/commonModal/RadioUser.vue";
import Delete from "@/components/listView/Delete.vue";
import FilterQuery from "@/components/FilterQuery.vue";
import CommonConfirm from "@/components/workflow/CommonConfirm.vue";
import ImageView from "@/components/file/ImageView.vue";
import PdfView from "@/components/file/PdfView.vue";
import TxtView from "@/components/file/TxtView.vue";
import { useRouter, useRoute } from "vue-router";
const route = useRoute();
const router = useRouter();
const { proxy } = getCurrentInstance();
//console.log(document.documentElement.clientHeight);
const labelCol = ref({ style: { width: "100px" } });
const props = defineProps({
  isShow: Boolean,
  folderName: String,
  folderPicker: String,
  objectTypeCode: [String, Number],
  id: [String, Number],
  FolderId: String
});
const formRef = ref();
const formRef3 = ref();
const emit = defineEmits(["cancel"]);
const handleCancel = () => {
  emit("cancel", false);
};
const formState = reactive({
  ApprovedBy: '',
  BusinessUnitId: '',
  IsImportant: false,
  IsTop: false,
  AttachRightCode: '',
  EndTopDate: '',
  ApprovedOn: '',
  StateCode: 1,
  KeyWords: [],
  IsPublic: false,
  CoverDisplay: '',
  FolderId: ''
});
const token = localStorage.getItem("token");
const data = reactive({
  title: "发布信息",
  height: document.documentElement.clientHeight - 150,
  AttachRightCodeList: [
    {
      label: '所有',
      value: 0
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
  StateCodeList: [
    {
      label: '草稿',
      value: 0
    },
    {
      label: '已发布',
      value: 1
    },
    {
      label: '审批不通过',
      value: 2
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
  BusinessUnitId: '',
  ApprovedBy: '',
  listData: [],
  step: 0,
  search: {
    OwningUser: [],
    member: [],
    BusinessUnitId: []
  },
  recordId: '',
  isRadioDept: false,
  isRadioUser: false,
  objectTypeCode: '90',
  sObjectName: 'GroupMembership',
  isDelete: false,
  deleteDesc: '确定要删除吗？',
  external: false,
  RoleCode: 0,
  RoleCodeList: [
    {
      value: 0,
      label: '成员'
    },
    {
      value: 2,
      label: '管理员'
    },
  ],
  memberId: '',
  peopleList: [],
  pagination: {
    hideOnSinglePage: true,
    showSizeChanger: true,
    showQuickJumper: true,
    total: 0,//数据总数
    pageSize: 10,
    current: 1,
    showTotal: ((total) => {
      return `共${total}条`
    })
  },
  tableHeight: document.documentElement.clientHeight - 470,
  FilterExpresssionList: [],
  filterExpression: "",
  ImageList: [],
  uploadData: {
    // parentId: '',
    // entityName: 'Media'
    id: ''
  },
  headers: {
    Authorization: token,
    Token: token,
  },
  isConfirm: false,
  isPhoto: false,
  photoParams: {},
  isPdf: false,
  pdfParams: {},
  isTxt: false,
  txtParams: {}
});
const {
  isTxt, txtParams,
  title, step, search, FilterExpresssionList, filterExpression, ImageList, uploadData, headers, isConfirm, isPhoto, photoParams, isPdf, pdfParams,
  height, AttachRightCodeList, keywords, treeData, CoverDisplayList,
  fileList, BusinessUnitId, ApprovedBy, listData, StateCodeList,
  recordId, isRadioDept, isRadioUser, objectTypeCode, sObjectName, isDelete, deleteDesc, external, RoleCode, RoleCodeList, memberId, peopleList, pagination, tableHeight
} = toRefs(data);
const AddGroup = ref();
const formState2 = reactive({
  OwningUser: {
    Id: '',
    Name: ''
  },

});
const formState3 = reactive({
  member: {
    Id: '',
    Name: ''
  },

});
// 添加成员
const AddPeople = () => {
  if (formState3.member.Id) { } else {
    message.error("请选择要添加的成员");
    return
  }
  let url = Interface.create;
  let d = {
    actions: [{
      id: "2919;a",
      descriptor: "",
      callingDescriptor: "UNKNOWN",
      params: {
        recordInput: {
          allowSaveOnDuplicate: false,
          apiName: 'GroupMembership',
          objTypeCode: '90',
          fields: {
            GroupId: props.id,
            RegardingObjectIdName: formState3.member.Name,
            RegardingObjectId: formState3.member.Id,
            RoleCode: data.RoleCode,
            RegardingObjectTypeCode: 8
          }
        }
      }
    }]
  };

  let obj = {
    message: JSON.stringify(d)
  }
  proxy.$post(url, obj).then(res => {
    data.isRadioUser = false;
    if (res && res.actions && res.actions[0] && res.actions[0].returnValue) {
      message.success("添加成功！");
      refreshPeople();
    }

  });
}
const handleImageError = (record) => {
  record.AvatarImg = '/src/assets/img/avatar.png';
  return record;
};
const refreshPeople = (e) => {
  if (data.step == 2) {
    getQuery();
  }
}
const closeUser = (e) => {
  data.isRadioUser = false;
};
const getBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}
// const searchlookup = (searchVal, Lktp, field) => {
//   let obj = {
//           actions:[{
//               id: "6129;a",
//               descriptor: "",
//               callingDescriptor: "UNKNOWN",
//               params: {
//                   objectApiName: 'Group',
//                   fieldApiName: field,
//                   pageParam: 1,
//                   pageSize: 25,
//                   q: searchVal||'',
//                   searchType: "Recent",
//                   targetApiName: Lktp,
//                   body: {
//                       sourceRecord: {
//                           apiName: 'Group',
//                           fields: {
//                               Id: null,
//                                   RecordTypeId: ""
//                               }
//                           }
//                       }
//                   }
//               }]
//       }
//       let d = {
//           message: JSON.stringify(obj)
//       }
//       proxy.$post(Interface.lookup, d).then((res) => {
//           let list = res.actions[0].returnValue.lookupResults.records;
//           let arr = [];
//           list.forEach(item=>{
//               arr.push({
//                   ID: item.fields.Id.value,
//                   Name: item.fields.Name.value
//               })
//           });
//           data.search[field] = arr;
//       });
// }
const handleOpenLook = (type, name) => {
  if (type == '10') {
    data.isRadioDept = true;
  }
  else if (type == '8') {
    data.isRadioUser = true;
  }
}
// const cancelDeptModal = (e) => {
//   data.isRadioDept = false;
// }
// const handleDeptParams = (e) => {
//   //console.log("e",e);
//   if(e.ID){
//     formState.BusinessUnitId.Id = e.ID;
//     data.isRadioDept = false;
//     let result =data.search.BusinessUnitId.filter((item) => {
//       return item.ID == e.ID;
//     });
//     if(result&&result.length){}else{
//       data.search.BusinessUnitId.push({
//         ID:e.ID,
//         Name:e.Name
//       })
//     }
//   }
// }
const changeUserData = (e) => {
  if (e) {
    formState3.member.Id = e;
    let result = data.search.member.filter((item) => {
      return item.ID == e;
    });
    if (result && result.length) {
      formState3.member.Name = result[0].Name;
    }
  }
}
const getUserData = (e) => {
  data.isRadioUser = false;
  if (e.id) {
    if (data.step == 0) {
      formState.OwningUser.Id = e.id;
      data.isRadioDept = false;
      let result = data.search.OwningUser.filter((item) => {
        return item.ID == e.id;
      });
      if (result && result.length) { } else {
        data.search.OwningUser.push({
          ID: e.id,
          Name: e.name
        })
      }
    }
    else {
      formState3.member.Id = e.id;
      formState3.member.Name = e.name;
      data.isRadioDept = false;
      let result = data.search.member.filter((item) => {
        return item.ID == e.id;
      });
      if (result && result.length) { } else {
        data.search.member.push({
          ID: e.id,
          Name: e.name
        })
      }
    }
  }
};
const cancelDeptModal = (e) => {
  data.isRadioDept = e;
}
const handleDeptParams = (e) => {
  //console.log("e",e);
  if (e.ID) {
    formState.BusinessUnitId = e.Name;
    data.BusinessUnitId = e.ID;
    data.isRadioDept = false;
    let result = data.listData.filter((item) => {
      return item.ID == e.ID;
    });
    if (result && result.length) { } else {
      data.listData.push({
        ID: e.ID,
        Name: e.Name
      })
    }
  }
}
const handleDeptParams2 = (e) => {
  //console.log("eeee",e);
  if (e) {
    data.BusinessUnitId = e;
    let result = data.listData.filter((item) => {
      return item.ID == e;
    });
    if (result && result.length) {
      formState.BusinessUnitId = result[0].Name;
    }
  }
}
const handleFocus = (e) => {
  data.isRadioDept = true;
}
const getTreeData = () => {
  // proxy.$get(Interface.information.contentTree, {
  //   objectTypeCode: props.objectTypeCode
  // }).then((response) => {
  //   let formTree = (list) => {
  //     list.forEach(item => {
  //       if (item.children) {
  //         formTree(item.children);
  //       }
  //       item.key = item.id;
  //       item.value = item.id;
  //     })
  //   }
  //   formTree(response);
  //   data.treeData = response;
  // })
  let url = Interface.content.folder.get;
  let d = {
    actions: [{
      id: "2919;a",
      descriptor: "",
      callingDescriptor: "UNKNOWN",
      params: {
        id: '00000000-0000-0000-0000-000000002000'
      }
    }]
  };
  let obj = {
    message: JSON.stringify(d)
  }
  proxy.$post(url, obj).then(res => {
    if (res && res.actions && res.actions[0] && res.actions[0].returnValue) {
      let formTree = (list) => {
        list.forEach(item => {
          if (item.children) {
            formTree(item.children);
          }
          item.key = item.id;
          item.value = item.id;
        })
      }
      let response = res.actions[0].returnValue;
      formTree(response);
      data.treeData = response;
    }
  });
}
getTreeData();



const getTags = () => {
  proxy.$get(Interface.information.tags, {}).then(res => {
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
    actions: [{
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
    list.forEach(item => {
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
    data.height = document.documentElement.clientHeight - 150;
    data.tableHeight = document.documentElement.clientHeight - 470;
  });
  if (props.id) {
    getDetail();
    getFiles();
    data.uploadData.id = props.id;
  }
});
const getDetail = () => {
  let d = {
    actions: [{
      id: "4270;a",
      descriptor: "aura://RecordUiController/ACTION$getRecordWithFields",
      callingDescriptor: "UNKNOWN",
      params: {
        recordId: props.id,
        apiName: props.objectTypeCode == '100201' ? 'Content' : 'Notice',
        objTypeCode: props.objectTypeCode
      }
    }]
  };
  let obj = {
    message: JSON.stringify(d)
  }
  proxy.$post(Interface.detail, obj).then(res => {
    if (res && res.actions && res.actions[0] && res.actions[0].returnValue && res.actions[0].returnValue.fields) {
      let fields = res.actions[0].returnValue.fields;
      formState.ApprovedBy = fields.ApprovedBy ? fields.ApprovedBy.displayValue : '';
      data.ApprovedBy = fields.ApprovedBy ? fields.ApprovedBy.value : '';
      formState.BusinessUnitId = fields.BusinessUnitId ? fields.BusinessUnitId.displayValue : '';
      data.BusinessUnitId = fields.BusinessUnitId ? fields.BusinessUnitId.value : '';
      if (fields.BusinessUnitId && fields.BusinessUnitId.value) {
        data.listData = [];
        data.listData.push({
          ID: fields.BusinessUnitId.value,
          Name: fields.BusinessUnitId.displayValue
        })
      }
      formState.IsImportant = fields.IsImportant && fields.IsImportant.value ? true : false;
      formState.IsTop = fields.IsTop && fields.IsTop.value * 1 == 1 ? true : false;
      formState.AttachRightCode = fields.AttachRightCode ? fields.AttachRightCode.value * 1 : 0;
      //formState.StateCode = fields.StateCode.value * 1;
      formState.EndTopDate = fields.EndTopDate && fields.EndTopDate.value ? dayjs(fields.EndTopDate.value.split('.')[0]).format("YYYY-MM-DD hh:mm:ss") : '';
      formState.ApprovedOn = fields.ApprovedOn && fields.ApprovedOn.value ? dayjs(fields.ApprovedOn.value.split('.')[0]).format("YYYY-MM-DD hh:mm:ss") : '';
      formState.KeyWords = fields.KeyWords && fields.KeyWords.value ? (fields.KeyWords.value).split(',') : [];
      formState.IsPublic = fields.IsPublic && fields.IsPublic.value * 1 == 1 ? true : false;
      formState.CoverDisplay = fields.CoverDisplay ? fields.CoverDisplay.value : '';
      formState.FolderId = fields.FolderId ? fields.FolderId.value : '';
      let userInfo = window.localStorage.getItem('userInfo');
      if (userInfo && !formState.ApprovedBy) {
        userInfo = JSON.parse(userInfo);
        var userId = userInfo.userId;
        var userName = userInfo.fullName;
        var businessUnitId = userInfo.businessUnitId;
        var businessUnitName = window.localStorage.getItem('businessUnitName') || '';
        if (userId == 'jackliu') {
          userId = '2EC00CF2-A484-4136-8FEF-E2A2719C5ED6'
        }
        formState.ApprovedBy = userName;
        data.ApprovedBy = userId;
        data.BusinessUnitId = businessUnitId;
        formState.BusinessUnitId = businessUnitName;
      }
      data.filterExpression = fields.PeopleQuery && fields.PeopleQuery.value ? fields.PeopleQuery.value : '';
    }
  })
}

const handleSubmit = () => {
  //data.step = 1;
  formRef.value
    .validate()
    .then(() => {
      //console.log("values", formState, toRaw(formState));
      let url = Interface.edit;
      let d = {
        actions: [{
          id: "2919;a",
          descriptor: "",
          callingDescriptor: "UNKNOWN",
          params: {
            recordInput: {
              allowSaveOnDuplicate: false,
              apiName: 'Content',
              objTypeCode: props.objectTypeCode,
              fields: {
                ApprovedBy: data.ApprovedBy,
                BusinessUnitId: data.BusinessUnitId,
                IsImportant: formState.IsImportant,
                IsTop: formState.IsTop ? 1 : 0,
                AttachRightCode: formState.AttachRightCode,
                EndTopDate: formState.EndTopDate ? dayjs(formState.EndTopDate).format("YYYY-MM-DD hh:mm:ss") : '',
                ApprovedOn: formState.ApprovedOn ? dayjs(formState.ApprovedOn).format("YYYY-MM-DD hh:mm:ss") : '',
                StateCode: formState.StateCode,
                KeyWords: formState.KeyWords.join(',') || '',
                IsPublic: formState.IsPublic ? 1 : 0,
                CoverDisplay: formState.CoverDisplay,
                //Title: "",
                FolderId: formState.FolderId
              }
            }
          }
        }]
      };
      if (props.id) {
        d.actions[0].params.recordId = props.id;
      }
      let obj = {
        message: JSON.stringify(d)
      }
      proxy.$post(url, obj).then(res => {
        //formRef.value.resetFields();
        if (res && res.actions && res.actions[0] && res.actions[0].returnValue) {
          props.id = res.actions[0].returnValue.id;
          data.uploadData.id = res.actions[0].returnValue.id;
          message.success("保存成功！");
          data.step = 1;
        }
        else {
          message.error("保存失败！");
        }
        //emit("cancel", false);

      });

    })
    .catch((err) => {
      console.log("error", err);
    });
};
//删除
const handleDelete = (key) => {
  data.memberId = key;
  data.isDelete = true;
}
//删除关闭
const cancelDelete = (e) => {
  data.isDelete = false;
  data.isConfirm = false;
};
var columns = [
  {
    title: "序号",
    dataIndex: "index",
    key: "index",
    width: 70
  },
  {
    title: "头像",
    dataIndex: "AvatarImg",
    key: 'AvatarImg',
    width: 80
  },
  {
    title: "姓名",
    dataIndex: "FullName",
  },
  {
    title: "工号",
    dataIndex: "EmployeeId",
  },
  {
    title: "部门",
    dataIndex: "BusinessUnitId",
  },
  // {
  //   title: "操作",
  //   key: "Action",
  //   width: 150,
  // },
];
const getQuery = () => {
  data.peopleList = [];
  data.pagination.total = 0;
  let filterQuery = '';
  let filterExpression = JSON.parse(data.filterExpression);
  console.log(filterExpression,66666666)
  if (filterExpression && filterExpression.length) {
    filterExpression.forEach(v => {
      if(v.operands&&v.operands.length){
        filterQuery+='\n'+v.attribute+'\t'+v.operator+'\t'+v.operands.join(',');
      }
    });
  }
  proxy.$post(Interface.list2, {
    filterId: '',
    objectTypeCode: '8',
    entityName: 'SystemUser',
    filterQuery: filterQuery,
    search: '',
    page: data.pagination.current,
    rows: data.pagination.pageSize,
    sort: '',
    order: 'ASC',
    displayColumns: 'FullName,BusinessUnitId,EmployeeId'
  }).then(res => {
    var list = [];
    data.total = res.pageInfo ? res.pageInfo.total : 0;
    data.pagination.total = res.pageInfo ? res.pageInfo.total : 0;
    for (var i = 0; i < res.nodes.length; i++) {
      var item = res.nodes[i];
      for (var cell in item) {
        if (cell != 'id' && cell != 'nameField') {
          item[cell] = girdFormatterValue(cell, item);
        }
      }
      item['AvatarImg'] = '/api/one/user/avatar/' + item.id;
      list.push(item)
    }
    data.peopleList = list;

  })
}
//改变页码
const handleTableChange = (pag, filters, sorter) => {
  data.pagination.current = pag.current;
  getQuery();
}
const getFilterQuery = (e) => {
  console.log('filterExpression:', e);
  if (e) {
    data.filterExpression = e;
  }
  else {
    data.filterExpression = '';
  }
}
//查询
const handleSearch = () => {
  data.pagination.current = 1;
  getQuery();
}
//获取人员筛选器数据
const getFilterExpresssionList = () => {
  if (data.filterExpression) {
    let filterExpression = JSON.parse(data.filterExpression);
    if (filterExpression && filterExpression.length) {
      data.FilterExpresssionList = filterExpression;
      data.FilterExpresssionList.forEach(v => {
        v['operatorType'] = '';
      });
    }
  }
  else {
    data.filterExpression = '';
    data.FilterExpresssionList = [];
  }
  data.step = 2;
}
//保存筛选器数据
const saveFilterExpresssionList = () => {
  let url = Interface.edit;
  let d = {
    actions: [{
      id: "2919;a",
      descriptor: "",
      callingDescriptor: "UNKNOWN",
      params: {
        recordInput: {
          allowSaveOnDuplicate: false,
          apiName: 'Content',
          objTypeCode: props.objectTypeCode,
          fields: {
            PeopleQuery: data.filterExpression
          }
        }
      }
    }]
  };
  if (props.id) {
    d.actions[0].params.recordId = props.id;
  }
  let obj = {
    message: JSON.stringify(d)
  }
  proxy.$post(url, obj).then(res => {
    //formRef.value.resetFields();
    if (res && res.actions && res.actions[0] && res.actions[0].returnValue) {
      message.success("保存成功！");
      setTimeout(function () {
        emit("cancel", false);
        let reUrl = router.resolve({
          path: "/lightning/o/Content/home",
          query: {

          }
        })
        window.open(reUrl.href);
      }, 1000)
    }
    else {
      message.error("保存失败！");
    }
  });

}
//获取媒体图片
const getFiles = () => {
  data.fileList = [];
  data.ImageList = [];
  let url = Interface.information.getMedia;
  let d = {
    actions: [{
      id: "2919;a",
      descriptor: "",
      callingDescriptor: "UNKNOWN",
      params: {
        pageNumber: 1,
        pageSize: 1000,
        contentId: props.id
      }
    }]
  };
  let obj = {
    message: JSON.stringify(d)
  };
  proxy.$post(url, obj).then(res => {
    var list = [];
    var list2 = [];
    if (res && res.actions && res.actions[0] && res.actions[0].returnValue && res.actions[0].returnValue && res.actions[0].returnValue.rows) {
      for (var i = 0; i < res.actions[0].returnValue.rows.length; i++) {
        var item = res.actions[0].returnValue.rows[i];
        let size = item.fileSize;
        size = size ? (size * 1 / 1024).toFixed(2) : 0;
        size = size + 'kb';
        let name = item.name || '';
        if (name) {
          name = name.replaceAll('.' + item.ext, '');
        }
        let ite = {
          size: size,
          url: '/Media/' + item.valueId + '/' + name,
          fileLocation: item.fileLocation || '',
          uid: item.valueId,
          id: item.valueId,
          downloadUrl: item.downloadUrl || '',
          viewUrl: item.viewUrl || '',
          fileExtension: item.ext,
          fileSize: item.fileSize,
          name: item.name,
          Name: item.name,
          CreatedOn: item.createdOn ? dayjs(item.createdOn).format("YYYY-MM-DD hh:mm") : '',
          CreatedBy: item.createdByName || '',
        };
        list.push(ite);
        if (item.ext == 'jpg' || item.ext == 'jpeg' || item.ext == 'png') {
          list2.push(ite);
        }
      }
    }
    data.fileList = list;
    data.ImageList = list2;
  })
};
const beforeUpload = (e) => {
  //data.uploadData.entityName = 'Media';
  //data.uploadData.id = props.id;
  console.log("beforeUpload", e);
}
const changeFiles = (e) => {
  // console.log("e", e);
  if (e.file.status == "done") {
    message.success("上传成功！");
    getFiles();
  }
}
//预览附件
const handlePreviewFile = (item) => {
  let url = '';
  if (item.fileExtension == 'jpg' || item.fileExtension == 'jpeg' || item.fileExtension == 'png') {
    let index = 0;
    for (var i = 0; i < data.ImageList.length; i++) {
      let ite = data.ImageList[i];
      if (ite.id == item.id) {
        index = i;
      }
    }
    data.photoParams = {
      id: item.id,
      item: item,
      imageList: data.ImageList,
      index: index
    };
    data.isPhoto = true;
  } else if (item.fileExtension == 'pdf') {
    url = '/pdfjs/web/viewer.html?file=' + encodeURIComponent(item.viewUrl);
    data.pdfParams = {
      id: item.id,
      name: item.name,
      index: 0,
      viewUrl: item.viewUrl,
      downloadUrl: item.downloadUrl
    };
    data.isPdf = true;
  }
  else if (item.fileExtension == 'txt') {
    data.txtParams = {
      name: item.name,
      viewUrl: item.viewUrl,
      downloadUrl: item.downloadUrl
    };
    data.isTxt = true;
  }
  else if (item.fileExtension == 'docx' || item.fileExtension == 'pptx' || item.fileExtension == 'xlsx' || item.fileExtension == 'doc' || item.fileExtension == 'ppt' || item.fileExtension == 'xls') {
    //let medittype = 0;
    downloadFile(item);
    //openfile(medittype, item.id, item.Name);
  }
  else {
    downloadFile(item);
  }
};
//下载附件
const downloadFile = (item) => {
  let url = item.downloadUrl;
  window.open(url);
  // let text = item.Name || '';
  // windowOpen(url, text);
};
//删除
const deleteFile0 = (item) => {
  data.recordId = item.id;
  data.confirmText = '确定要删除吗？'
  data.confirmTitle = '删除'
  data.isConfirm = true;
  //data.isDelete = true;
}
//删除附件
const deleteFile = (id) => {
  let d = {
    actions: [{
      id: "2919;a",
      descriptor: "",
      callingDescriptor: "UNKNOWN",
      params: {
        recordId: id,
        apiName: 'Media',
        objTypeCode: '20011',
      }
    }]
  };
  let obj = {
    message: JSON.stringify(d)
  };
  // proxy.$post(Interface.deleteFiles, obj).then(res => {
  proxy.$post(Interface.delete, obj).then(res => {
    if (res && res.actions && res.actions[0] && res.actions[0].state && res.actions[0].state == 'SUCCESS') {
      message.success("删除成功！");
      data.isConfirm = false;
      getFiles();
    }
    else {
      if (res && res.actions && res.actions[0] && res.actions[0].state && res.actions[0].errorMessage) {
        message.error(res.actions[0].errorMessage);
      }
      else {
        message.error("删除失败！");
      }
    }
  }).catch(err => {
    console.log('error', err);
    message.error("删除失败！");
  });
}
</script>
<style lang="less">
@import url("@/style/modal.less");

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

    .sectionItemTitle {
      font-size: 14px;
      margin: 20px 0 5px 0;
    }

    .sectionItem {
      flex: 1;
      margin-right: 20px;
      position: relative;

      .ant-row {
        display: block !important;
      }

      .sectionItemBtn {
        position: absolute;
        right: 0;
        top: 1px;
      }
    }

    .sectionItem:last-child {
      margin-right: 0;
    }

    .empty {
      height: 60px;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      text-align: center;
      color: #666;

      img {
        width: 50px;
      }

      .emptyDesc {
        font-size: 14px;
      }
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

:where(.css-dev-only-do-not-override-kqecok).ant-upload-wrapper .ant-upload-drag p.ant-upload-drag-icon {
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
    //width: 125px;
    width: 100%;
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

.sectionItem .ApprovedByName {
  border-radius: 4px !important;
}

.RelaseInfoUpload {
  height: 150px;
  width: 150px;
  padding: 10px;
  justify-items: center;
  margin-top: 0px;
}

.uploadRow {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 155px;
  width: 155px;
  flex-direction: column;
}

.sectionItem.addMember {
  text-align: right;
  margin-bottom: 10px;

  .ant-select {
    margin-right: 10px;
    width: 150px;
    text-align: left;
  }

  .ant-select-selector {
    border-radius: 2px;
  }
}

.AddGroup_list_avatar {
  width: 40px !important;
  position: relative;
  right: 5px;
}

.form-legend-desktop {
  text-align: right;
  margin-bottom: 8px;
}

.sectionItem3 {
  display: flex
}

.sectionItem3 .ant-form-item {
  flex: 1;
  margin-right: 20px;
}

input[aria-hidden="true"] {
  display: none !important;
}

.el-radio:focus:not(.is-focus):not(:active):not(.is-disabled) .el-radio__inner {
  box-shadow: none !important;
}

.uploadPanel {
  .ant-upload-drag {
    background: transparent !important;
    width: 155px;
    border: none !important;
  }

  .ant-upload-wrapper {
    width: 155px !important;
    display: inline-block;
  }
}

.uploadPanel {
  .inboxFileList {
    display: flex;
    flex-wrap: wrap;
    margin-top: 20px;

    .ant-btn.ant-btn-text,
    .ant-btn.ant-btn-text:hover {
      color: #000 !important;
    }

    .inboxFileItem {
      width: 175px;
      height: 175px;
      border-radius: 4px;
      background: #f2f3f5;
      padding: 10px;
      box-sizing: border-box;
      margin-right: 16px;
      margin-bottom: 16px;
      cursor: pointer;
      display: flex;
      overflow: hidden;
      position: relative;

      .leftImg {
        width: 170px;
        height: 170px;
        position: relative;
        top: 5px;

        img {
          width: 100%;
          height: 100%;
        }
      }

      .FileInfo {
        flex: 1;
        margin-left: 0px;
        overflow: hidden;
        color: #1d2129;
        width: 155px;
        height: 155px;
        position: relative;
        top: 0px;

        img {
          width: 155px;
          height: 155px;
        }

        .fileSize {
          color: #4e5969;
          padding-top: 4px;
        }

        .fileOptionShow {
          position: absolute;
          width: calc(~"100% - 0px");
          height: 155px;
          left: 0;
          top: 0;
          background: rgba(242, 243, 245, .8);
          display: none;

          .btns {
            display: flex;
            align-items: center;
            height: 100%;
            justify-content: center;
            padding-right: 0px;
            box-sizing: border-box;
          }
        }
      }

      &:hover .fileOptionShow {
        display: block;
      }
    }
  }
}

.RelaseInfoWrap {
  .modalCenter {
    .ant-form {
      height: 100%;

      .section {
        height: 100%;

        .peopleRow {
          height: calc(100% - 172px);

          .peopleItem {
            height: 100%;

            .ant-table-wrapper {
              height: calc(100% - 93px) !important;
            }
          }
        }
      }
    }
  }

  .modalCenter1 {
    .section .sectionRow .sectionItem .ant-row {
      width: 100%;
      display: flex !important;

      .ant-form-item-label {
        min-width: 80px !important;
        text-align: right !important;
      }
    }

    .ant-form-item {
      margin: 10px 0 !important;
    }
  }

  .formRef3 {
    .ant-input {
      border: 1px solid #d9d9d9 !important;
      border-radius: 6px !important;
    }
  }
}
</style>