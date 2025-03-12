<template>
  <div>
    <a-modal v-model:open="props.isShow" width="850px" :maskClosable="false" @cancel="handleCancel" @ok="handleSubmit">
      <template #title>
        <div>
          {{ title }}
        </div>
      </template>
      <div class="modalContainer">
        <RadioDept :isShow="isRadioDept" @cancel="cancelDeptModal" @selectVal="handleDeptParams" />
        <div class="modalCenter" :style="{ height: height + 'px!important' }" v-show="step * 1 == 0">
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
                  <a-form-item name="BusinessUnitId" label="发布部门" :rules="[{ required: true, message: '请选择部门' }]">
                    <div v-if="!formState.BusinessUnitId">
                      <a-select placeholder="请选择" v-model:value="data.BusinessUnitId"
                        :default-active-first-option="false" :filter-option="false" showSearch @search="searchlookup2"
                        @change="handleDeptParams2" @dropdownVisibleChange="searchlookup2">
                        <template #suffixIcon></template>
                        <a-select-option v-for="v in listData" :key="v.ID" :value="v.ID">{{ v.Name
                        }}</a-select-option>
                      </a-select>
                      <i class="iconfont icon-sousuo pointer selectIcon" @click="handleFocus"></i>
                    </div>
                    <a-input v-if="formState.BusinessUnitId" v-model:value="formState.BusinessUnitId" disabled
                      class="ApprovedByName"></a-input>
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
                      <a-select-option v-for="(item, index) in AttachRightCodeList" :value="item.value" :key="index">{{
                        item.label }}</a-select-option>
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
              </div>
              <div class="sectionRow">
                <div class="sectionItem">
                  <a-form-item name="KeyWords" label="移动标签">
                    <a-checkbox-group v-model:value="formState.KeyWords" style="width: 100%">
                      <a-checkbox :value="item" v-for="(item, index) in keywords" :key="index">{{ item }}</a-checkbox>
                    </a-checkbox-group>
                  </a-form-item>
                </div>
                <div class="sectionItem">
                  <a-form-item name="IsPublic" label="查看范围">
                    <a-checkbox v-model:checked="formState.IsPublic">所有人可以查看</a-checkbox>
                  </a-form-item>
                </div>
              </div>
            </div>

          </a-form>
        </div>
        <div class="modalCenter" :style="{ height: height + 'px!important' }" v-show="step * 1 == 1">
          <div class="section">
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
          </div>
          <div class="section">
            <div class="sectionRow">
              <div class="sectionItem sectionItem1">
                <div class="uploadPanel">
                  <a-upload-dragger v-model:fileList="fileList" name="file" :multiple="true"
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76">
                    <div class="uploadRow">
                      <p class="ant-upload-drag-icon">
                        <PlusOutlined />
                      </p>
                      <p class="ant-upload-text">将文件拖到此处，或点击上传</p>
                    </div>
                    <template #itemRender="{ file }">
                      <div class="uploadList">
                        <div class="uploadItem">
                          <div>
                            <img :src="require('@/assets/img/filetype/doc.png')"
                              v-if="file.FileExtension == 'ocx' || file.FileExtension == 'docx' || file.FileExtension == 'doc'" />
                            <img :src="require('@/assets/img/filetype/rar.png')"
                              v-else-if="file.FileExtension == 'rar' || file.FileExtension == 'zip'" />
                            <img :src="require('@/assets/img/filetype/Excel.png')"
                              v-else-if="file.FileExtension == 'xlsx' || file.FileExtension == 'xls'" />
                            <img :src="require('@/assets/img/filetype/pdf.png')"
                              v-else-if="file.FileExtension == 'pdf'" />
                            <img :src="require('@/assets/img/filetype/TXT.png')"
                              v-else-if="file.FileExtension == 'TXT' || file.FileExtension == 'txt'" />
                            <img :src="require('@/assets/img/filetype/PPT.png')"
                              v-else-if="file.FileExtension == 'ppt' || file.FileExtension == 'pptx'" />
                            <img :src="require('@/assets/img/filetype/video.png')"
                              v-else-if="file.FileExtension == 'mp4' || file.FileExtension == '.mp4'" />
                            <img :src="require('@/assets/img/filetype/defaultImg.png')"
                              v-else-if="file.FileExtension == 'jpg' || file.FileExtension == 'png' || record.FileExtension == 'gif'" />
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
        </div>
        <div class="modalCenter" :style="{ height: height + 'px!important' }" v-show="step * 1 == 2">
          <a-form :model="formState3" ref="formRef3" class="formRef3">
            <div class="section">
              <div class="sectionTitle">添加可查看人员</div>
              <div class="sectionRow">
                <div class="sectionItem memberlist">
                  <FilterQuery :FilterExpresssionList="FilterExpresssionList" @params="getFilterQuery"></FilterQuery>
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
          <a-button type="primary" @click="step = 2" v-if="step == 1">下一步</a-button>
          <a-button @click="data.step = 1" v-if="step == 2">上一步</a-button>
          <a-button type="primary" @click="handleSubmit2" v-if="step == 2">完成</a-button>
        </div>
      </template>
    </a-modal>
    <RadioDept :isShow="isRadioDept" @cancel="cancelDeptModal" @selectVal="handleDeptParams" />
    <radio-user :isShow="isRadioUser" @selectVal="getUserData" @cancel="closeUser" @ok="refreshPeople"></radio-user>
    <Delete :isShow="isDelete" :desc="deleteDesc" @cancel="cancelDelete" @ok="refreshPeople" :sObjectName="sObjectName"
      :recordId="memberId" :objTypeCode="objectTypeCode" :external="external" />
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
  InboxOutlined,
  PlusOutlined
} from "@ant-design/icons-vue";
import { message } from "ant-design-vue";
import Interface from "@/utils/Interface.js";
import dayjs from 'dayjs';
import RadioDept from "@/components/commonModal/RadioDept.vue";
import RadioUser from "@/components/commonModal/RadioUser.vue";
import Delete from "@/components/listView/Delete.vue";
import FilterQuery from "@/components/PeopleFilterQuery.vue";
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
const handleSubmit2 = () => {
  emit("cancel", false);
  let reUrl = router.resolve({
    path: "/lightning/o/Content/home",
    query: {

    }
  })
  window.open(reUrl.href);
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
const data = reactive({
  title: "发布信息",
  height: document.documentElement.clientHeight - 350,
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
  tableHeight: 0,
  FilterExpresssionList: [],
  filterExpression: ""
});
const {
  title, step, search, FilterExpresssionList, filterExpression,
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
const beforeUpload = (e) => {
  console.log("beforeUpload", e);
}
const handleChange = (info) => {
  //console.log("handleChange",info);
  data.file = info.file;
  if (info.file.status === 'uploading') {
    return;
  }
  if (info.file.status === 'done' || info.file.status === 'error') {
    getBase64(info.file.originFileObj).then(imageUrl => {
      message.success('图片上传成功！');
      data.imageUrl = imageUrl;
      //console.log('文件的URL:', imageUrl);
    });
  }
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
  proxy.$get(Interface.information.contentTree, {
    objectTypeCode: props.objectTypeCode
  }).then((response) => {
    let formTree = (list) => {
      list.forEach(item => {
        if (item.children) {
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
    data.height = document.documentElement.clientHeight - 350;
  });
  getDetail();
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
      formState.ApprovedBy = fields.ApprovedBy.displayValue;
      data.ApprovedBy = fields.ApprovedBy.value;
      formState.BusinessUnitId = fields.BusinessUnitId.displayValue;
      data.BusinessUnitId = fields.BusinessUnitId.value;
      data.listData = [];
      data.listData.push({
        ID: fields.BusinessUnitId.value,
        Name: fields.BusinessUnitId.displayValue
      })
      formState.IsImportant = fields.IsImportant.value ? true : false;
      formState.IsTop = fields.IsTop.value * 1 == 1 ? true : false;
      formState.AttachRightCode = fields.AttachRightCode.value * 1;
      formState.StateCode = fields.StateCode.value * 1;
      formState.EndTopDate = fields.EndTopDate && fields.EndTopDate.value ? dayjs(fields.EndTopDate.value.split('.')[0]).format("YYYY-MM-DD hh:mm:ss") : '';
      formState.ApprovedOn = fields.ApprovedOn && fields.ApprovedOn.value ? dayjs(fields.ApprovedOn.value.split('.')[0]).format("YYYY-MM-DD hh:mm:ss") : '';
      formState.KeyWords = fields.KeyWords.value ? (fields.KeyWords.value).split(',') : [];
      formState.IsPublic = fields.IsPublic.value * 1 == 1 ? true : false;
      formState.CoverDisplay = fields.CoverDisplay.value;
      formState.FolderId = fields.FolderId.value;
      let userInfo = window.localStorage.getItem('userInfo');
      if (userInfo && !formState.ApprovedBy) {
        userInfo = JSON.parse(userInfo);
        var userId = userInfo.userId;
        var userName = userInfo.fullName;
        var businessUnitId = userInfo.businessUnitId;
        var businessUnitName = userInfo.businessUnitName || '';
        if (userId == 'jackliu') {
          userId = '2EC00CF2-A484-4136-8FEF-E2A2719C5ED6'
        }
        formState.ApprovedBy = userName;
        data.ApprovedBy = userId;
        data.BusinessUnitId = businessUnitName ? businessUnitId : '';
        formState.BusinessUnitId = businessUnitName;
      }
    }
  })
}

const handleSubmit = () => {
  data.step = 1;
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
};
var columns = [
  {
    title: "序号",
    dataIndex: "index",
    key: "index",
  },
  {
    title: "头像",
    dataIndex: "AvatarImg",
    key: 'AvatarImg'
  },
  {
    title: "姓名",
    dataIndex: "FullName",
  },
  {
    title: "部门",
    dataIndex: "BusinessUnitId",
  },
  {
    title: "角色",
    dataIndex: "RoleCode",
  },

  {
    title: "操作",
    key: "Action",
    width: 150,
  },
];
//改变页码
const handleTableChange = (pag, filters, sorter) => {
  data.pagination.current = pag.current;
  getQuery();
}
const getFilterQuery = (e) => {
  console.log("e", e);
  data.filterExpression = e;
}
//获取人员筛选器数据
const getFilterExpresssionList = () => {
  proxy.$get(Interface.flow.handleDetail, {
    ProcessId: data.processId,
    StepId: props.stepId,
    StepCode: props.stepCode
  }).then(res => {
    let Variables = res.Variables;
    Variables.forEach(item => {
      for (let key in formState.Variables) {
        if (item.Id == formState.Variables[key].value) {
          formState.Variables[key].checkbox = true;
        }
      }
    });
    let StepVariables = res.StepVariables;
    StepVariables.Variables.forEach(item => {
      for (let key in formState.StepVariables) {
        if (item.Id == formState.StepVariables[key].value) {
          formState.StepVariables[key].checkbox = true;
        }
      }
    })
    let Groups = res.Groups;
    Groups.forEach(item => {
      data.targetKeys.push(item.ObjectTypeCode + ':' + item.Id);
    })
    formState.scope = res.FilterScope.Scope;
    data.FilterExpresssionList = res.FilterExpresssion;
  })
}
//getFilterExpresssionList();
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

.sectionItem .ApprovedByName {
  border-radius: 4px !important;
}

.sectionItem1 {
  height: 150px;
  width: 150px;
  padding: 10px;
  justify-items: center;
  margin-top: 60px;
}

.uploadRow {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 150px;
  width: 150px;
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
</style>