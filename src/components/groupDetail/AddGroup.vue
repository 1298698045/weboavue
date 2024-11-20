<template>
  <div class="AddGroup" ref="AddGroup">
    <a-modal v-model:open="props.isShow" width="850px" :maskClosable="false" @cancel="handleCancel" @ok="handleSubmit" class="AddGroupModel">
      <template #title>
        <div v-if="step==0">
          {{ title }}
        </div>
        <div v-if="step==1">
          上载组照片
        </div>
        <div v-if="step==2">
          管理成员
        </div>
      </template>
      <div class="modalContainer">
        <div class="modalCenter" :style="{ height: height + 'px!important' }" v-if="step==0">
          <div class="form-legend-desktop">
            <abbr class="required">*</abbr>
            = 必填信息
          </div>
          <a-form :model="formState" ref="formRef" class="formRef">
            <div class="section">
              <div class="sectionTitle">小组详细信息</div>
              <div class="sectionRow">
                <div class="sectionItem">
                  <a-form-item name="Name" label="名称" :rules="[{ required: true, message: '请输入' }]">
                      <a-input v-model:value="formState.Name"></a-input>
                  </a-form-item>
                </div>
              </div>
              <div class="sectionRow">
                  <div class="sectionItem">
                      <a-form-item name="Description" label="描述">
                          <a-textarea :rows="4" placeholder="请输入" v-model:value="formState.Description" />
                      </a-form-item>
                  </div>
              </div>
              <div class="sectionRow">
                  <div class="sectionItem">
                      <a-form-item name="Notice" label="信息">
                        <TEditor
                          :placeholder="'请输入'"
                          @input="getInputContent"
                          ref="editorRef"
                        />
                          <!-- <a-textarea :rows="4" placeholder="请输入" v-model:value="formState.Notice" /> -->
                      </a-form-item>
                  </div>
              </div>
              <!-- <div class="sectionRow">
                <div class="sectionItem">
                  <a-form-item name="BusinessUnitId" label="部门" :rules="[{ required: true, message: '请选择' }]">
                      <a-select v-model:value="formState.BusinessUnitId.Id" 
                      :default-active-first-option="false" :filter-option="false" showSearch @search="(e) => {searchlookup(e,'BusinessUnit', 'BusinessUnitId');}" @dropdownVisibleChange="(e) => {searchlookup('','BusinessUnit', 'BusinessUnitId');}">
                          <template #suffixIcon></template>
                          <a-select-option v-for="(option, optionIdx) in search.BusinessUnitId" :key="optionIdx" :value="option.ID">{{ option.Name }}</a-select-option>
                      </a-select>
                      <div class="selectIcon">
                          <SearchOutlined class="ant-select-suffix" @click="handleOpenLook('10')" />
                      </div>
                  </a-form-item>
                </div>
              </div> -->
              <div class="sectionRow">
                <div class="sectionItem">
                  <a-form-item name="OwningUser" label="所有人" :rules="[{ required: true, message: '请选择' }]">
                      <a-select v-model:value="formState.OwningUser.Id" 
                      :default-active-first-option="false" :filter-option="false" showSearch @search="(e) => {searchlookup(e,'SystemUser', 'OwningUser');}" @dropdownVisibleChange="(e) => {searchlookup('','SystemUser', 'OwningUser');}">
                          <template #suffixIcon></template>
                          <a-select-option v-for="(option, optionIdx) in search.OwningUser" :key="optionIdx" :value="option.ID">{{ option.Name }}</a-select-option>
                      </a-select>
                      <div class="selectIcon">
                          <SearchOutlined class="ant-select-suffix" @click="handleOpenLook('8')" />
                      </div>
                  </a-form-item>
                </div>
                
              </div>
              <div class="sectionRow">
                <div class="sectionItem">
                  <a-form-item name="ImportSequenceNumber" label="顺序">
                      <a-input v-model:value="formState.ImportSequenceNumber"></a-input>
                  </a-form-item>
                </div>
              </div>
              <!-- <div class="sectionRow">
                <div class="sectionItem">
                  <a-form-item name="Priority" label="优先级">
                    <a-select v-model:value="formState.Priority">
                      <a-select-option v-for="(item,index) in select.Priority" :value="item.value" :key="index">{{item.label}}</a-select-option>
                    </a-select>
                  </a-form-item>
                </div>
                <div class="sectionItem">
                  <a-form-item name="StateCode" label="状态">
                    <a-select v-model:value="formState.StateCode">
                      <a-select-option v-for="(item,index) in select.StateCode" :value="item.value" :key="index">{{item.label}}</a-select-option>
                    </a-select>
                  </a-form-item>
                </div>
              </div> -->
            </div>
            <div class="section">
              <div class="sectionTitle">小组访问权限</div>
              <div class="sectionRow">
                <div class="sectionItem">
                  <a-form-item name="IsPublic" label="公用小组">
                      <a-checkbox v-model:checked="formState.IsPublic"></a-checkbox>
                  </a-form-item>
                </div>
                <div class="sectionItem">
                  <!-- <a-form-item name="RequireAttach" label="是否必须上传附件">
                      <a-checkbox v-model:checked="formState.RequireAttach"></a-checkbox>

                  </a-form-item> -->
                </div>
              </div>
            </div>
          </a-form>
        </div>
        <div class="modalCenter modalCenter2" :style="{ height: height + 'px!important' }" v-if="step==1">
          <a-form :model="formState2" ref="formRef2" class="formRef2">
            <div class="section">
              <div class="sectionRow">
                <div class="sectionItem">
                        <div class="uploadtext1">您可以上载 JPG、GIF 或 PNG 文件。最大文件大小为 16 MB。</div>
                        <div class="uploadtext2">当前照片：</div>
                        <img :src="imageUrl" alt="" class="uploadcurrent"/>
                        <a-form-item label="">
                            <a-upload
                                v-model:file-list="fileList"
                                name="file"
                                list-type=""
                                class="avatar-uploader"
                                :show-upload-list="false"
                                :data="{ 'id': recordId }"
                                :multiple="false"
                                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                :before-upload="beforeUpload"
                                @change="handleChange"
                            >
                                <a-button class="ant-upload-text"><UploadOutlined /> 上载图像</a-button>
                            </a-upload>
                        </a-form-item>
                    </div>
              </div>
            </div>
          </a-form>
        </div>
        <div class="modalCenter" :style="{ height: height + 'px!important' }" v-if="step==2">
          <a-form :model="formState3" ref="formRef3" class="formRef3">
            <div class="section">
              <div class="sectionRow">
                <div class="sectionItem">
                  <a-form-item name="member" label="" :rules="[{ required: true, message: '请选择' }]">
                      <a-select v-model:value="formState3.member.Id" 
                      @change="changeUserData"
                      :default-active-first-option="false" :filter-option="false" showSearch @search="(e) => {searchlookup(e,'SystemUser', 'member');}" @dropdownVisibleChange="(e) => {searchlookup('','SystemUser', 'member');}">
                          <template #suffixIcon></template>
                          <a-select-option v-for="(option, optionIdx) in search.member" :key="optionIdx" :value="option.ID">{{ option.Name }}</a-select-option>
                      </a-select>
                      <div class="selectIcon">
                          <SearchOutlined class="ant-select-suffix" @click="handleOpenLook('8')" />
                      </div>
                  </a-form-item>
                </div>
              </div>
              <div class="sectionRow">
                <div class="sectionItem addMember">
                      <a-select v-model:value="data.RoleCode">
                          <a-select-option v-for="(item,index) in RoleCodeList" :value="item.value" :key="index">{{item.label}}</a-select-option>
                      </a-select>
                      <a-button @click="AddPeople" type="primary"><PlusOutlined /> 添加</a-button>
                  </div>
              </div>
              <div class="sectionRow">
                <div class="sectionItem memberlist">
                  <a-table :columns="columns" :dataSource="peopleList" :scroll="{ y:tableHeight }" :pagination="data.pagination" @change="handleTableChange">
                      <template #bodyCell="{ column, index, record }">
                        <template v-if="column.key === 'Action'">
                          <a-button type="text" size="small" @click="handleDelete(record.id)">删除</a-button>
                        </template>
                        <template v-if="column.key === 'index'">
                          <div>
                            {{ index + 1 }}
                          </div>
                        </template>
                        <div v-if="column.key=='AvatarImg'">
                            <img :src="text||require('@/assets/img/avatar-r.png')" alt="" class="AddGroup_list_avatar"/>
                        </div>
                      </template>
                    </a-table>
                </div>
              </div>
            </div>
          </a-form>
        </div>
      </div>
      <template #footer>
        <div>
          <a-button @click="handleCancel" class="cancelmodel AddGroupCancel" v-if="step!=2">取消</a-button>
          <a-button type="primary" @click.prevent="handleSubmit" v-if="step==0">保存并继续</a-button>
          <a-button type="primary" @click.prevent="handleNext" v-if="step==1">下一步</a-button>
          <a-button type="primary" @click.prevent="handleComplete" v-if="step==2">完成</a-button>
        </div>
      </template>
    </a-modal>
    <RadioDept :isShow="isRadioDept"  @cancel="cancelDeptModal" @selectVal="handleDeptParams" />
    <radio-user :isShow="isRadioUser" @selectVal="getUserData" @cancel="closeUser" @ok="refreshPeople"></radio-user>
    <Delete :isShow="isDelete" :desc="deleteDesc" @cancel="cancelDelete" @ok="refreshPeople" :sObjectName="sObjectName" :recordId="memberId" :objTypeCode="objectTypeCode" :external="external" />
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
    UploadOutlined,
    PlusOutlined,
  } from "@ant-design/icons-vue";
  import { message } from "ant-design-vue";
  import { formTreeData,girdFormatterValue } from "@/utils/common.js";
  import FilterQuery from "@/components/FilterQuery.vue";
  import Interface from "@/utils/Interface.js";
  import RadioDept from "@/components/commonModal/RadioDept.vue";
  import RadioUser from "@/components/commonModal/RadioUser.vue";
  import Delete from "@/components/listView/Delete.vue";
  import { useRouter, useRoute } from "vue-router";
  import TEditor from "@/components/TEditor.vue";
  const router = useRouter();
  const { proxy } = getCurrentInstance();
  console.log(document.documentElement.clientHeight);
  //   const labelCol = ref({ style: { width: "100px" } });
  const props = defineProps({
    title: String,
    isShow: Boolean,
    id: String,
    type: String,
  });
  const editorRef = ref();
  const formRef = ref();
  const formRef2 = ref();
  const formRef3 = ref();
  const emit = defineEmits(["cancel","load"]);
  const handleCancel = () => {
    emit("cancel", false);
  };
  const AddGroup = ref();
  const formState2 = reactive({
    OwningUser: {
        Id: '',
        Name:''
    },
   
  });
  const formState3 = reactive({
    member: {
        Id: '',
        Name: ''
    },
   
  });
  const data = reactive({
    title: "新建小组",
    height: document.documentElement.clientHeight - 350,
    select: {},
    search: {
      OwningUser:[],
      member:[],
      BusinessUnitId:[]
    },
    step:0,
    fileList: [],
    file: "",
    imageUrl:require('@/assets/img/defaultGroup.png'),
    recordId:'',
    isRadioDept:false,
    isRadioUser:false,
    objectTypeCode:'90',
    sObjectName:'GroupMembership',
    isDelete: false,
    deleteDesc: '确定要删除吗？',
    external:false,
    RoleCode:0,
    RoleCodeList:[
      {
        value:0,
        label:'成员'
      },
      {
        value:2,
        label:'管理员'
      },
    ],
    memberId:'',
    peopleList:[],
    pagination:{
      hideOnSinglePage:true,
      showSizeChanger:true,
      showQuickJumper:true,
      total:0,//数据总数
      pageSize:10,
      current:1,
      showTotal:((total)=>{
          return `共${total}条`
      })
    },
    tableHeight:0,
  });
  const {
    title,
    height, select, search,step,imageUrl,fileList,file,recordId,isRadioDept,isRadioUser,objectTypeCode,sObjectName,isDelete,deleteDesc,external,RoleCode,RoleCodeList,memberId,peopleList,pagination,tableHeight
  } = toRefs(data);
  const formState = reactive({
    Name: '',
    BusinessUnitId: {
        Id: '',
    },
    ImportSequenceNumber: '',
    IsPublic: false,
    RequireAttach: false,

    OwningUser: {
        Id: '',
        Name: ''
    },
    Description: '',
    StateCode: '',
    Priority: '',
    Notice:''
  });

  const onSearch = (e) => {

  }
  const getBase64=(file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }
  const beforeUpload = (e) => {
    console.log("beforeUpload",e);
  }
  const handleChange = (info) => {
    //console.log("handleChange",info);
    data.file = info.file;
    if (info.file.status === 'uploading') {
      return;
    }
    if (info.file.status === 'done'||info.file.status === 'error') {
      getBase64(info.file.originFileObj).then(imageUrl => {
        message.success('图片上传成功！');
        data.imageUrl=imageUrl;
        //console.log('文件的URL:', imageUrl);
      });
    }
  }
  
  onMounted(() => {
    window.addEventListener("resize", (e) => {
      data.height = document.documentElement.clientHeight - 350;
    });
    let h = AddGroup.value.clientHeight;
    data.tableHeight = document.documentElement.clientHeight-500;
  });
  const searchlookup = (searchVal, Lktp, field) => {
    let obj = {
            actions:[{
                id: "6129;a",
                descriptor: "",
                callingDescriptor: "UNKNOWN",
                params: {
                    objectApiName: 'Group',
                    fieldApiName: field,
                    pageParam: 1,
                    pageSize: 25,
                    q: searchVal||'',
                    searchType: "Recent",
                    targetApiName: Lktp,
                    body: {
                        sourceRecord: {
                            apiName: 'Group',
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
            data.search[field] = arr;
        });
  }
  const handleOpenLook = (type,name) => {
    if(type=='10'){
      data.isRadioDept = true;
    }
    else if(type=='8'){
      data.isRadioUser = true;
    }
  }
  const cancelDeptModal = (e) => {
    data.isRadioDept = false;
  }
  const handleDeptParams = (e) => {
    //console.log("e",e);
    if(e.ID){
      formState.BusinessUnitId.Id = e.ID;
      data.isRadioDept = false;
      let result =data.search.BusinessUnitId.filter((item) => {
        return item.ID == e.ID;
      });
      if(result&&result.length){}else{
        data.search.BusinessUnitId.push({
          ID:e.ID,
          Name:e.Name
        })
      }
    }
  }
  const getDetail = () => {
    let d = {
        actions:[{
            id: "4270;a",
            descriptor: "aura://RecordUiController/ACTION$getRecordWithFields",
            callingDescriptor: "UNKNOWN",
            params: {
              recordId: props.id,
              apiName:'Group',
              objTypeCode: 9
            }
        }]
    };
    let obj = {
        message: JSON.stringify(d)
    }
    proxy.$post(Interface.detail,obj).then(res=>{
        if(res&&res.actions&&res.actions[0]){
          //data.select = res.actions[0].picklistValuesMap||{};
          let record = res.actions[0].returnValue.fields;
          formState.Name = record.Name?record.Name.displayValue:'';
          //formState.OwningUser.Id = record.OwningUser?record.OwningUser.value:'';
          //formState.BusinessUnitId.Id = record.BusinessUnitId?record.BusinessUnitId.value : '';
          formState.ImportSequenceNumber = record.ImportSequenceNumber?record.ImportSequenceNumber.value:'';
          formState.IsPublic = record.IsPublic?record.IsPublic.value : false;
          formState.Description = record.Description?record.Description.value : '';
          formState.Notice=record.Notice?record.Notice.value : '';
          editorRef.value.content=record.Notice?record.Notice.value : '';
          if(record.OwningUser&&record.OwningUser.value){
                let OwningUserName=record.OwningUser.displayValue||'';
                let OwningUserId=record.OwningUser.value;
                formState.OwningUser={Id:OwningUserId,Name:OwningUserName};
                data.search.OwningUser.push({
                    ID: OwningUserId,
                    Name: OwningUserName
                });
            }
            searchlookup('', 'SystemUser','OwningUser');
        }
    })
    
  }
  if(props.id){
      getDetail();
      data.title='编辑小组';
  }
  const handleSubmit = () => {
    formRef.value
      .validate()
      .then(() => {
            console.log("values", formState, toRaw(formState));
            let item = toRaw(formState)
            let url=Interface.create;
            let d = {
            actions:[{
                id: "2919;a",
                descriptor: "",
                callingDescriptor: "UNKNOWN",
                params: {
                  recordInput: {
                    allowSaveOnDuplicate: false,
                    apiName: 'Group',
                    objTypeCode: 9,
                    fields: {
                        Name: item.Name,
                        OwningUser: item.OwningUser.Id,
                        //BusinessUnitId: item.BusinessUnitId.Id,
                        Description: item.Description,
                        Notice:item.Notice,
                        ImportSequenceNumber:item.ImportSequenceNumber||item.ImportSequenceNumber==0?item.ImportSequenceNumber*1:'',
                        IsPublic:item.IsPublic
                    }
                  }              
                }
            }]
            };
            if(props.id){
                d.actions[0].params.recordId=props.id;
                url=Interface.edit;
            }
            let obj = {
                message: JSON.stringify(d)
            }
            proxy.$post(url,obj).then(res=>{
                  //formRef.value.resetFields();
                  if(res&&res.actions&&res.actions[0]&&res.actions[0].returnValue&&res.actions[0].state=='SUCCESS'){
                    data.recordId=res.actions[0].returnValue.id;
                    message.success("保存成功！");
                    emit("load", false);
                    setTimeout(function(){
                        //emit("cancel", false);
                        data.step=1;
                    },500)
                  }
                  else{
                    message.error("保存失败！");
                  }
            });
      
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

  // 添加成员
const AddPeople = () => {
  if(formState3.member.Id){}else{
    message.error("请选择要添加的成员");
    return
  }
  let url=Interface.create;
        let d = {
        actions:[{
            id: "2919;a",
            descriptor: "",
            callingDescriptor: "UNKNOWN",
            params: {
              recordInput: {
                allowSaveOnDuplicate: false,
                apiName: 'GroupMembership',
                objTypeCode: '90',
                fields: {
                    GroupId: data.recordId,
                    RegardingObjectIdName: formState3.member.Name,
                    RegardingObjectId: formState3.member.Id,
                    RoleCode: data.RoleCode,
                    RegardingObjectTypeCode:8
                }
              }              
            }
        }]
    };
    
    let obj = {
        message: JSON.stringify(d)
    }
    proxy.$post(url,obj).then(res=>{
      data.isRadioUser = false;
      if(res&&res.actions&&res.actions[0]&&res.actions[0].returnValue){
        message.success("添加成功！");
        refreshPeople();
      }
      
    });
}
const getQuery = () => {
  data.peopleList=[];
  data.pagination.total = 0;
  let filterQuery='\nGroupId\teq\t'+data.recordId;
        proxy.$post(Interface.list2, {
            filterId:'',
            objectTypeCode:'90',
            entityName:'GroupMembership',
            filterQuery:filterQuery,
            search:'',
            page: data.pagination.current,
            rows: data.pagination.pageSize,
            sort:'DisplayOrder',
            order:'ASC',
            displayColumns:'RegardingObjectIdName,AvatarImg,FullName,BusinessUnitId,RoleCode,MobilePhone,EMailAddress,WorkStatus'
        }).then(res => {
            var list = [];
            data.pagination.total = res.pageInfo?res.pageInfo.total:0;
            for (var i = 0; i < res.nodes.length; i++) {
                var item = res.nodes[i];
                for(var cell in item){
                    if(cell!='id'&&cell!='nameField'&&cell!='AvatarImg'){
                        item[cell]=girdFormatterValue(cell,item);
                    }
                    if(cell=='RegardingObjectIdName'){
                        item['FullName']=item[cell];
                    }
                }
                list.push(item)
            }
            data.peopleList = list;
            
        })
};
const handleNext=(e)=>{
  data.step=2
  getQuery();
}
const refreshPeople=(e)=>{
  if(data.step==2){
    getQuery();
  }
}
const closeUser = (e) => {
  data.isRadioUser = false;
};
const changeUserData = (e) => {
    if(e){
      formState3.member.Id = e;
      let result =data.search.member.filter((item) => {
        return item.ID == e;
      });
      if(result&&result.length){
        formState3.member.Name = result[0].Name;
      }
    }
  }
const getUserData = (e) => {
  data.isRadioUser = false;
  if(e.id){
    if(data.step==0){
        formState.OwningUser.Id = e.id;
        data.isRadioDept = false;
        let result =data.search.OwningUser.filter((item) => {
          return item.ID == e.id;
        });
        if(result&&result.length){}else{
          data.search.OwningUser.push({
            ID:e.id,
            Name:e.name
          })
        }
    }
    else{
      formState3.member.Id = e.id;
      formState3.member.Name = e.name;
        data.isRadioDept = false;
        let result =data.search.member.filter((item) => {
          return item.ID == e.id;
        });
        if(result&&result.length){}else{
          data.search.member.push({
            ID:e.id,
            Name:e.name
          })
        }
    }
  }
};
//删除
const handleDelete = (key) => {
    data.memberId=key;
    data.isDelete = true;
}
//删除关闭
const cancelDelete = (e) => {
    data.isDelete = false;
};
const handleComplete = (e) => {
    emit("cancel", false);
    let GroupId = data.recordId;
    let routeData = router.resolve({
        name: 'GroupDetail',
        query: {
            GroupId: GroupId
        }
    });
    if(props.type=='1'){
      window.location.reload();
    }
    else{
      window.open(routeData.href, '_blank');
    }
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
    key:'AvatarImg'
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
const handleTableChange=(pag, filters, sorter)=>{
  data.pagination.current=pag.current;
  getQuery();
}
const getInputContent = (e) => {
  formState.Notice = e;
};
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
.modalCenter2{
    display: flex;
    justify-content: center;
    align-items: center;
    .formRef2{
    height: 100%;
    .section{
      height: 100%;
    }
    .sectionRow{
      height: 100%;
    }
    .sectionItem{
      height: 100%;
      text-align: center;
      line-height: 35px;
    }
    .uploadcurrent{
      margin: 25px 0;
    }
  }
}
.AddGroupCancel{
  float: left;
}
.sectionItem.addMember{
   text-align: right;
   margin-bottom: 10px;
  .ant-select{
    margin-right: 10px;
    width:150px;
    text-align: left;
  }
  .ant-select-selector{
    border-radius: 2px;
  }
}
.AddGroup_list_avatar{
    width: 40px !important;
    position: relative;
    right: 5px;
}
.form-legend-desktop {
    text-align: right;
    margin-bottom: 8px;
}
.AddGroupModel{
  .ant-input {
    border-radius: 4px !important;
  }
}
</style>