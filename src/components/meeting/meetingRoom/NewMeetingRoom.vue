<template>
  <div>
    <a-modal v-model:open="props.isShow" width="850px" style="top:10px;" :maskClosable="false" @cancel="handleCancel" @ok="handleSubmit">
      <template #title>
        <div>
          {{ title }}
        </div>
      </template>
      <div class="modalContainer NewMeetingRoomWrap">
        <div class="modalCenter modalCenter1" :style="{ height: height + 'px!important' }" v-show="step * 1 == 0">
          <a-form :model="formState" ref="formRef">
            <div class="section">
              <div class="sectionTitle">基本信息</div>
              <div class="sectionRow">
                <div class="sectionItem">
                  <a-form-item name="Name" label="名称" :rules="[{ required: true, message: '请输入名称' }]">
                    <a-input v-model:value="formState.Name" class="NewMeetingRoomInputClass"></a-input>
                  </a-form-item>
                </div>
                <div class="sectionItem">
                  <a-form-item name="StatusCode" label="状态" :rules="[{ required: true, message: '请选择状态' }]">
                    <a-select v-model:value="formState.StatusCode" placeholder="请选择状态">
                      <a-select-option v-for="(item, index) in StatusCodeList" :value="item.value" :key="index">{{
                        item.label
                      }}</a-select-option>
                    </a-select>
                  </a-form-item>
                </div>
              </div>
              <div class="sectionRow">
                <div class="sectionItem">
                  <a-form-item name="Capacity" label="容纳人数" :rules="[{ required: true, message: '请输入容纳人数' }]">
                    <a-input v-model:value="formState.Capacity" class="NewMeetingRoomInputClass"></a-input>
                  </a-form-item>
                </div>
                <div class="sectionItem">
                  <a-form-item name="SortNumber" label="序号" :rules="[{ required: true, message: '请输入序号' }]">
                    <a-input v-model:value="formState.SortNumber" class="NewMeetingRoomInputClass" type="number"></a-input>
                  </a-form-item>
                </div>
              </div>
              <div class="sectionRow">
                <div class="sectionItem">
                  <a-form-item name="ResourceNumber" label="资源编号">
                    <a-input v-model:value="formState.ResourceNumber" class="NewMeetingRoomInputClass"></a-input>
                  </a-form-item>
                </div>
                <div class="sectionItem">
                  <a-form-item name="ResourceTypeCode" label="类型">
                    <a-select v-model:value="formState.ResourceTypeCode" placeholder="请选择类型">
                      <a-select-option v-for="(item, index) in ResourceTypeCodeList" :value="item.value" :key="index">{{
                        item.label }}</a-select-option>
                    </a-select>
                  </a-form-item>
                </div>
              </div>
              <div class="sectionRow">
                <div class="sectionItem">
                  <a-form-item name="ApproveByIds" label="负责人" :rules="[{ required: true, message: '请选择负责人' }]">
                      <a-select v-model:value="formState.ApproveByIds.Id"
                      :default-active-first-option="false" :filter-option="false" showSearch @search="(e) => {searchlookup(e,'SystemUser', 'ApproveByIds');}" @dropdownVisibleChange="(e) => {searchlookup('','SystemUser', 'ApproveByIds');}">
                          <template #suffixIcon></template>
                          <a-select-option v-for="(option, optionIdx) in search.ApproveByIds" :key="optionIdx" :value="option.ID">{{ option.Name }}</a-select-option>
                      </a-select>
                      <div class="selectIcon">
                          <SearchOutlined class="ant-select-suffix" @click="handleOpenLook('8')" />
                      </div>
                  </a-form-item>
                </div>
                <div class="sectionItem">
                  <a-form-item name="MobilePhone" label="电话" :rules="[{ required: true, message: '请输入电话' }]">
                    <a-input v-model:value="formState.MobilePhone" class="NewMeetingRoomInputClass"></a-input>
                  </a-form-item>
                </div>
              </div>
              <div class="sectionRow">
                <div class="sectionItem">
                  <a-form-item name="Longitude" label="经度">
                    <a-input v-model:value="formState.Longitude" class="NewMeetingRoomInputClass"></a-input>
                  </a-form-item>
                </div>
                <div class="sectionItem">
                  <a-form-item name="Latitude" label="纬度">
                    <a-input v-model:value="formState.Latitude" class="NewMeetingRoomInputClass"></a-input>
                  </a-form-item>
                </div>
              </div>
              <div class="sectionRow">
                <div class="sectionItem">
                  <a-form-item name="Location" label="地址">
                    <a-input v-model:value="formState.Location" class="NewMeetingRoomInputClass"></a-input>
                  </a-form-item>
                </div>
                <div class="sectionItem">
                  <a-form-item name="AttachInfo" label="配备物品">
                    <a-input v-model:value="formState.AttachInfo" class="NewMeetingRoomInputClass"></a-input>
                  </a-form-item>
                </div>
              </div>
              
              <div class="sectionRow">
                <div class="sectionItem">
                  <a-form-item name="AvailableStartTime" label="可使用开始时间" :rules="[{ required: true, message: '请输入可使用开始时间' }]">
                    <a-time-picker v-model:value="formState.AvailableStartTime" valueFormat="hh:mm" format="hh:mm" placeholder="可使用开始时间" />
                  </a-form-item>
                </div>
                <div class="sectionItem">
                  <a-form-item name="AvailableEndTime" label="可使用结束时间" :rules="[{ required: true, message: '请输入可使用结束时间' }]">
                    <a-time-picker v-model:value="formState.AvailableEndTime" valueFormat="hh:mm" format="hh:mm" placeholder="可使用结束时间" />
                  </a-form-item>
                </div>
              </div>

              <div class="sectionRow">
                <div class="sectionItem">
                  <a-form-item name="ApplyStartTime" label="预约开始时间" :rules="[{ required: true, message: '请输入预约开始时间' }]">
                    <a-time-picker v-model:value="formState.ApplyStartTime" valueFormat="hh:mm" format="hh:mm" placeholder="预约开始时间" />
                  </a-form-item>
                </div>
                <div class="sectionItem">
                  <a-form-item name="ApplyEndTime" label="预约截至时间" :rules="[{ required: true, message: '请输入预约截至时间' }]">
                    <a-time-picker v-model:value="formState.ApplyEndTime" valueFormat="hh:mm" format="hh:mm" placeholder="预约截至时间" />
                  </a-form-item>
                </div>
              </div>
              
              <div class="sectionRow">
                <div class="sectionItem">
                  <a-form-item name="Visibility" label="所有人可用">
                    <a-checkbox v-model:checked="formState.Visibility"></a-checkbox>
                  </a-form-item>
                </div>
                <div class="sectionItem">
                  <a-form-item name="MondayAllow" label="星期一">
                    <a-checkbox v-model:checked="formState.MondayAllow"></a-checkbox>
                  </a-form-item>
                </div>
                <div class="sectionItem">
                  <a-form-item name="TuesdayAllow" label="星期二">
                    <a-checkbox v-model:checked="formState.TuesdayAllow"></a-checkbox>
                  </a-form-item>
                </div>
                <div class="sectionItem">
                  <a-form-item name="WednesdayAllow" label="星期三">
                    <a-checkbox v-model:checked="formState.WednesdayAllow"></a-checkbox>
                  </a-form-item>
                </div>
                <div class="sectionItem">
                  <a-form-item name="ThursdayAllow" label="星期四">
                    <a-checkbox v-model:checked="formState.ThursdayAllow"></a-checkbox>
                  </a-form-item>
                </div>
                <div class="sectionItem">
                  <a-form-item name="FridayAllow" label="星期五">
                    <a-checkbox v-model:checked="formState.FridayAllow"></a-checkbox>
                  </a-form-item>
                </div>
                <div class="sectionItem">
                  <a-form-item name="SaturdayAllow" label="星期六">
                    <a-checkbox v-model:checked="formState.SaturdayAllow"></a-checkbox>
                  </a-form-item>
                </div>
                <div class="sectionItem">
                  <a-form-item name="SundayAllow" label="星期日">
                    <a-checkbox v-model:checked="formState.SundayAllow"></a-checkbox>
                  </a-form-item>
                </div>
              </div>
              
              <div class="sectionRow">
                
                <div class="sectionItem">
                  
                </div>
              </div>

              <div class="sectionRow">
                <div class="sectionItem">
                  <a-form-item name="Description" label="备注">
                    <a-textarea :rows="4" v-model:value="formState.Description" />
                  </a-form-item>
                </div>
                
              </div>
              
            </div>

          </a-form>
        </div>
        <div class="modalCenter" :style="{ height: height + 'px!important' }" v-show="step * 1 == 1">
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
                        @change="changeFiles" :data="uploadData" :action="Interface.information.uploadMedia" :showUploadList="false"
                        multiple name="files" :before-upload="beforeUpload">
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
      </div>
      <template #footer>
        <div>
          <a-button @click="handleCancel" v-if="step == 0">取消</a-button>
          <a-button type="primary" @click.prevent="handleSubmit" v-if="step == 0">下一步</a-button>
          <a-button @click="data.step = 0" v-if="step == 1">上一步</a-button>
          <a-button type="primary" @click="handleSubmit2" v-if="step == 1">完成</a-button>
        </div>
      </template>
    </a-modal>
    <RadioDept v-if="isRadioDept" :isShow="isRadioDept" @cancel="cancelDeptModal" @selectVal="handleDeptParams" />
    <radio-user v-if="isRadioUser" :isShow="isRadioUser" @selectVal="getUserData" @cancel="closeUser" @ok="refreshPeople"></radio-user>
    <Delete :isShow="isDelete" :desc="deleteDesc" @cancel="cancelDelete" @ok="refreshPeople" :sObjectName="sObjectName"
      :recordId="recordId" :objTypeCode="objectTypeCode" :external="external" />
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
const labelCol = ref({ style: { width: "100px" } });
const props = defineProps({
  isShow: Boolean,
  objectTypeCode: String,
  entityApiName: String,
  id: String,
  title: String
});
const formRef = ref();
const formRef3 = ref();
const emit = defineEmits(["cancel","load"]);
const handleCancel = () => {
  emit("cancel", false);
};
const handleSubmit2 = () => {
  emit("cancel", false);
  emit("load", false);
};
const formState = reactive({
  Name:'',
  StatusCode: 1,
  Capacity:'',
  SortNumber:'',
  ResourceNumber:'',
  Visibility:false,
  ApproveByIds: {
    Id: '',
    Name: ''
  },
  MobilePhone:'',
  ResourceTypeCode:2,
  Longitude:'',
  Latitude:'',
  Location:'',
  AttachInfo:'',
  AvailableStartTime:'',
  AvailableEndTime:'',
  ApplyStartTime:'',
  ApplyEndTime:'',
  MondayAllow:false,
  TuesdayAllow:false,
  WednesdayAllow:false,
  ThursdayAllow:false,
  FridayAllow:false,
  SaturdayAllow:false,
  SundayAllow:false,
  Description: ''
});
const token = localStorage.getItem("token");
const data = reactive({
  title: "新建企业资源",
  height: document.documentElement.clientHeight - 150,
  ResourceTypeCodeList: [
    {
      label: '设备',
      value: 0
    },
    {
      label: '车辆',
      value: 1
    },
    {
      label: '会议室',
      value: 2
    }
  ],
  StatusCodeList: [
    {
      label: '已停用',
      value: 0
    },
    {
      label: '已启用',
      value: 1
    }
  ],
  keywords: [],
  treeData: [],
  fileList: [],
  isRadioDept: false,
  BusinessUnitId: '',
  ApprovedBy: '',
  listData: [],
  step: 0,
  search: {
    ApproveByIds: [],
    BusinessUnitId: []
  },
  recordId: '',
  isRadioDept: false,
  isRadioUser: false,
  objectTypeCode: '20034',
  sObjectName: '',
  isDelete: false,
  deleteDesc: '确定要删除吗？',
  external: false,
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
  filterExpression: "",
  ImageList: [],
  uploadData: {
    // parentId: '',
    // entityName: 'Media'
    id:''
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
  height, ResourceTypeCodeList, keywords, treeData,
  fileList, BusinessUnitId, ApprovedBy, listData, StatusCodeList,
  recordId, isRadioDept, isRadioUser, objectTypeCode, sObjectName, isDelete, deleteDesc, external, peopleList, pagination, tableHeight
} = toRefs(data);
const unique = (list, field) => {
    for (let i = 0; i < list.length; i++) {
        for (let j = i + 1; j < list.length; j++) {
            if (list[i][field] == list[j][field]) {
                list.splice(j, 1);
                j--;
            }
        }
    }
    return list;
}
const handleImageError = (record) => {
  record.AvatarImg = '/src/assets/img/avatar.png';
  return record;
};
const refreshPeople = (e) => {
  
}
const closeUser = (e) => {
  data.isRadioUser = false;
};

const handleOpenLook = (type, name) => {
  if (type == '10') {
    data.isRadioDept = true;
  }
  else if (type == '8') {
    data.isRadioUser = true;
  }
}

const getUserData = (e) => {
  data.isRadioUser = false;
  if (e.id) {
    if (data.step == 0) {
      formState.ApproveByIds.Id = e.id;
      data.isRadioDept = false;
      let result = data.search.ApproveByIds.filter((item) => {
        return item.ID == e.id;
      });
      if (result && result.length) { } else {
        data.search.ApproveByIds=[{
          ID: e.id,
          Name: e.name
        }]
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

const searchlookup = (e,fieldApiName,fieldName) => {
  let obj = {
    actions: [{
      id: "6129;a",
      descriptor: "",
      callingDescriptor: "UNKNOWN",
      params: {
        objectApiName: props.entityApiName,
        fieldApiName: fieldApiName,
        pageParam: 1,
        pageSize: 25,
        q: e,
        searchType: "Recent",
        targetApiName: fieldApiName,
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
    data.search[fieldName] = (data.search[fieldName]).concat(arr);
    data.search[fieldName] = unique(data.search[fieldName],'ID');
  });
}
onMounted(() => {
  let userInfo = window.localStorage.getItem('userInfo');
  if (userInfo) {
    userInfo = JSON.parse(userInfo);
    var userId = userInfo.userId;
    var userName = userInfo.fullName;
    var businessUnitId = userInfo.businessUnitId;
    if (userId == 'jackliu') {
      userId = '2EC00CF2-A484-4136-8FEF-E2A2719C5ED6'
    }
    formState.ApproveByIds.Id = userName;
    formState.ApproveByIds.Name = userId;
    data.search.ApproveByIds=[{
      ID:userId,
      Name:userName
    }];
    data.BusinessUnitId = businessUnitId;
  }
  window.addEventListener("resize", (e) => {
    data.height = document.documentElement.clientHeight - 150;
  });
  if (props.id) {
    data.title='编辑企业资源';
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
        apiName: props.entityApiName,
        objTypeCode: data.objectTypeCode
      }
    }]
  };
  let obj = {
    message: JSON.stringify(d)
  }
  proxy.$post(Interface.detail, obj).then(res => {
    if (res && res.actions && res.actions[0] && res.actions[0].returnValue && res.actions[0].returnValue.fields) {
      let fields = res.actions[0].returnValue.fields;
      formState.Name = fields.Name?fields.Name.value:'';
      formState.StatusCode = fields.StatusCode?fields.StatusCode.value*1:'';
      formState.Capacity = fields.Capacity?fields.Capacity.value:'';
      formState.SortNumber = fields.SortNumber?fields.SortNumber.value:'';
      formState.ResourceNumber = fields.ResourceNumber?fields.ResourceNumber.value:'';
      formState.Visibility = fields.Visibility && fields.Visibility.value ? true : false;
      if (fields.ApproveByIds&&fields.ApproveByIds.value) {
        formState.ApproveByIds.Id=fields.ApproveByIds.value;
        formState.ApproveByIds.Name=fields.ApproveByIds.displayValue;
        data.search.ApproveByIds=[{
          ID: fields.ApproveByIds.value,
          Name: fields.ApproveByIds.displayValue
        }];
      }
      formState.MobilePhone = fields.MobilePhone?fields.MobilePhone.value:'';
      formState.ResourceTypeCode = fields.ResourceTypeCode?fields.ResourceTypeCode.value*1:'';
      formState.Longitude = fields.Longitude?fields.Longitude.value:'';
      formState.Latitude = fields.Latitude?fields.Latitude.value:'';
      formState.Location = fields.Location?fields.Location.value:'';
      formState.AttachInfo = fields.AttachInfo?fields.AttachInfo.value:'';

      formState.AvailableStartTime = fields.AvailableStartTime && fields.AvailableStartTime.value ? fields.AvailableStartTime.value : '';
      formState.AvailableEndTime = fields.AvailableEndTime && fields.AvailableEndTime.value ? fields.AvailableEndTime.value : '';
      formState.ApplyStartTime = fields.ApplyStartTime && fields.ApplyStartTime.value ? fields.ApplyStartTime.value : '';
      formState.ApplyEndTime = fields.ApplyEndTime && fields.ApplyEndTime.value ? fields.ApplyEndTime.value : '';

      formState.MondayAllow = fields.MondayAllow && fields.MondayAllow.value ? true : false;
      formState.TuesdayAllow = fields.TuesdayAllow && fields.TuesdayAllow.value ? true : false;
      formState.WednesdayAllow = fields.WednesdayAllow && fields.WednesdayAllow.value ? true : false;
      formState.ThursdayAllow = fields.ThursdayAllow && fields.ThursdayAllow.value ? true : false;
      formState.FridayAllow = fields.FridayAllow && fields.FridayAllow.value ? true : false;
      formState.SaturdayAllow = fields.SaturdayAllow && fields.SaturdayAllow.value ? true : false;
      formState.SundayAllow = fields.SundayAllow && fields.SundayAllow.value ? true : false;

      formState.Description = fields.Description?fields.Description.value:'';
      
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
              apiName: props.entityApiName,
              objTypeCode: data.objectTypeCode,
              fields: {
                Name:formState.Name,
                StatusCode: formState.StatusCode,
                Capacity:formState.Capacity,
                SortNumber:formState.SortNumber,
                ResourceNumber:formState.ResourceNumber,
                Visibility:formState.Visibility,
                ApproveByIds:formState.ApproveByIds.Id,
                MobilePhone:formState.MobilePhone,
                ResourceTypeCode:formState.ResourceTypeCode,
                Longitude:formState.Longitude,
                Latitude:formState.Latitude,
                Location:formState.Location,
                AttachInfo:formState.AttachInfo,
                AvailableStartTime:formState.AvailableStartTime ? formState.AvailableStartTime : '',
                AvailableEndTime:formState.AvailableEndTime ? formState.AvailableEndTime : '',
                ApplyStartTime:formState.ApplyStartTime ? formState.ApplyStartTime : '',
                ApplyEndTime:formState.ApplyEndTime ? formState.ApplyEndTime : '',
                MondayAllow:formState.MondayAllow,
                TuesdayAllow:formState.TuesdayAllow,
                WednesdayAllow:formState.WednesdayAllow,
                ThursdayAllow:formState.ThursdayAllow,
                FridayAllow:formState.FridayAllow,
                SaturdayAllow:formState.SaturdayAllow,
                SundayAllow:formState.SundayAllow,
                Description: formState.Description
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
          data.uploadData.id = props.id;
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
  data.isDelete = true;
}
//删除关闭
const cancelDelete = (e) => {
  data.isDelete = false;
  data.isConfirm = false;
};

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
        contentId:props.id
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
  data.uploadData.id = props.id;
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
      height: 40%;
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

.sectionItem .NewMeetingRoomInputClass {
  border-radius: 4px !important;
  border-color: #d9d9d9 !important;
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
.NewMeetingRoomWrap {
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

}
</style>