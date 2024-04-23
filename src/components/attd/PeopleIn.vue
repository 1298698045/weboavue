<template>
    <div>
      <a-modal
        v-model:open="props.isShow"
        width="1200px"
        :maskClosable="false"
        @cancel="handleCancel"
        @ok="handleSubmit"
      >
        <template #title>
          <div>
            {{ title }}
          </div>
        </template>
        <div class="modalContainer addUser">
          <div class="modalCenter" :style="{ height: height + 'px!important' }">
            <div class="addUserWrap" v-if="current==1">
                <div class="leftCategory">
                    <div class="select-title" @click="isDeptCollapse=!isDeptCollapse;">
                        <span class="arrowIcon">
                            <DownOutlined v-if="isDeptCollapse" />
                            <RightOutlined v-else />
                        </span>
                        选择部门
                    </div>
                    <div class="deptTree" v-if="isDeptCollapse">
                        <a-tree :tree-data="deptTree" blockNode @select="handleDeptUser">
                            <template #title="{ text, key }">
                                {{text}}
                            </template>
                        </a-tree>
                    </div>
                    <div class="select-title" @click="isGroupCollapse=!isGroupCollapse;">
                        <span class="arrowIcon">
                            <DownOutlined v-if="isGroupCollapse" />
                            <RightOutlined v-else />
                        </span>
                        选择小组
                    </div>
                    <div class="group" v-if="isGroupCollapse">
                        <a-tree :tree-data="groupList" blockNode @select="handleGroupUser">
                            <template #title="{ Name, key }">
                                {{Name}}
                            </template>
                        </a-tree>
                    </div>
                    <div class="select-title" @click="isRoleCollapse=!isRoleCollapse;">
                        <span class="arrowIcon">
                            <DownOutlined v-if="isRoleCollapse" />
                            <RightOutlined v-else />
                        </span>
                        选择角色
                    </div>
                    <div class="role" v-if="isRoleCollapse">
                        <a-tree :tree-data="roleList" blockNode @select="handleRoleUser">
                            <template #title="{ Name, key }">
                                {{Name}}
                            </template>
                        </a-tree>
                    </div>
                </div>
                <div class="centerUser">
                    <div class="search">
                        <a-input-search v-model:value="searchUserVal" placeholder="搜索人员" 
                         @search="handleSearchUser" />
                    </div>
                    <div class="userContent">
                        <a-checkbox-group v-model:value="selectUsers" style="width: 100%;" @change="changeUser">
                            <table>
                                <colgroup width="50"></colgroup>
                                <colgroup width="200"></colgroup>
                                <colgroup width="200"></colgroup>
                                <colgroup width="200"></colgroup>
                                <thead>
                                    <tr>
                                        <th style="text-align: center;">
                                            <a-checkbox v-model:checked="checkedAll"></a-checkbox>
                                        </th>
                                        <th style="text-align: left;">
                                            姓名
                                        </th>
                                        <th>工号</th>
                                        <th>部门</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(item, index) in listData" :key="index">
                                        <td style="text-align: center;">
                                            <a-checkbox :value="item.systemUserId"></a-checkbox>
                                        </td>
                                        <td style="text-align: left;">
                                            {{item.fullName}}
                                        </td>
                                        <td>
                                            {{item.EmployeeId}}
                                        </td>
                                        <td>
                                            {{item.BusinessUnitIdName}}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </a-checkbox-group>
                    </div>
                </div>
                <div class="selectUser">
                    <div class="selectUserDesc">已添加{{selectUserList.length}}个成员</div>
                    <div class="userItem" v-for="(item, index) in selectUserList" :key="index">
                        {{item.fullName}}
                        <CloseOutlined class="aIcon" @click="handleDelete(item, index)" />
                    </div>
                </div>
            </div>
            <div class="inDate" v-if="current==2">
                <a-form :model="formState" ref="formRef">
                    <div class="section">
                        <div class="sectionRow">
                            <div class="sectionItem">
                                <a-form-item name="transferType" label="添加方式" :rules="[{ required: true, message: '请选择姓名' }]">
                                    <a-radio-group v-model:value="formState.transferType" name="radioGroup">
                                        <a-radio value="49">部门调入</a-radio>
                                        <a-radio value="45">借入</a-radio>
                                        <a-radio value="0">科室轮转</a-radio>
                                    </a-radio-group>
                                    <p class="red" style="color: red;">
                                        <span v-if="formState.transferType=='49'">部门调入: 会修改人员编制科室, 下月报考勤，调入人员自动进入调入部门。</span>
                                        <span v-else-if="formState.transferType=='45'">借      入: 不会修改人员编制科室。</span>
                                        <span v-else-if="formState.transferType=='0'">科室轮转: 不会修改人员编制科室。</span>
                                    </p>
                                </a-form-item>
                            </div>
                        </div>
                        <div class="sectionRow">
                            <div class="sectionItem">
                                <a-form-item name="unit" label="部门" :rules="[{ required: true, message: '请选择姓名' }]">
                                   <a-input disabled v-model:value="formState.unit"></a-input>
                                </a-form-item>
                            </div>
                        </div>
                        <div class="sectionRow">
                            <div class="sectionItem">
                                <a-form-item name="yearNumber" label="年份" :rules="[{ required: true, message: '请选择姓名' }]">
                                   <a-input disabled v-model:value="formState.yearNumber"></a-input>
                                </a-form-item>
                            </div>
                            <div class="sectionItem">
                                <a-form-item name="monthNumber" label="月份" :rules="[{ required: true, message: '请选择调出类型' }]">
                                   <a-input disabled v-model:value="formState.monthNumber"></a-input>
                                </a-form-item>
                            </div>
                        </div>
                        <div class="sectionRow">
                            <div class="sectionItem">
                                <a-form-item name="startDate" label="调入日期" :rules="[{ required: true, message: '请选择姓名' }]">
                                    <a-date-picker v-model:value="formState.startDate" valueFormat="YYYY-MM-DD" />
                                </a-form-item>
                            </div>
                            <div class="sectionItem">
                                <a-form-item name="endDate" label="截至日期" :rules="[{ required: true, message: '请选择调出类型' }]">
                                    <a-date-picker v-model:value="formState.endDate" valueFormat="YYYY-MM-DD" />
                                </a-form-item>
                            </div>
                        </div>
                    </div>
                </a-form>
            </div>
          </div>
        </div>
        <template #footer>
          <div>
            <a-button @click="handleCancel">取消</a-button>
            <a-button type="primary" :disabled="selectUsers.length?false:true" v-if="current==1" @click.prevent="handleNext">下一步</a-button>
            <a-button v-else @click="handlePrev">上一步</a-button>
            <a-button type="primary" v-if="current==2" @click.prevent="handleSubmit">保存</a-button>
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
    inject
  } from "vue";
  import {
    SearchOutlined,
    DownOutlined,
    UserOutlined,
    RightOutlined,
    CloseOutlined
  } from "@ant-design/icons-vue";
  import { formTreeData, unique } from "@/utils/common.js";
  import { message } from "ant-design-vue";

  import Interface from "@/utils/Interface.js";
  const { proxy } = getCurrentInstance();
//   console.log(document.documentElement.clientHeight);

  const labelCol = ref({ style: { width: "100px" } });

  const props = defineProps({
    isShow: Boolean,
    objectTypeCode: [Number, String],
    deptCurrent: Object,
    time: String
  });
  
  const emit = defineEmits(["cancel","submit"]);
  console.log(props.time)
  const handleCancel = () => {
    emit("cancel", false);
  };
  const formRef = ref(null);
  const data = reactive({
    title: "添加人员",
    height: document.documentElement.clientHeight - 300,
    columns: [
        {
          field: 'ids',
          checkbox: true
        },
    ],
    isCollapsed: false,
    tableHeight: document.documentElement.clientHeight - 370,
    id: "",
    searchVal: "",
    isAdvance: false,
    selectUserList: [],
    searchUserVal: "",
    deptTree: [],
    groupList: [],
    roleList: [],
    isDeptCollapse: false,
    isGroupCollapse: false,
    isRoleCollapse: false,
    listData: [],
    checkedAll: false,
    selectUsers: [],
    current: 1,
    step: 2
  });
  const {
    title,
    height, columns, isCollapsed, tableHeight, searchVal, isAdvance, selectUserList,
    searchUserVal, deptTree, groupList, roleList, isDeptCollapse, isGroupCollapse, isRoleCollapse,
    listData, checkedAll, selectUsers, current, step
  } = toRefs(data);
  const formState = reactive({
    transferType: "45",
    unit: props.deptCurrent.name,
    yearNumber: props.time.split('-')[0] || '',
    monthNumber: props.time.split('-')[1] || '',
    startDate: "",
    endDate: ""
  });
  
  onMounted(() => {
    window.addEventListener("resize", (e) => {
      data.height = document.documentElement.clientHeight - 300;
      data.tableHeight = document.documentElement.clientHeight - 370
    });
  });
  const getDeptTree = () => {
    proxy.$get(Interface.treeList, {
        entity: "organizationtree"
    }).then(res=>{
        data.deptTree = formTreeData(res.rows, 'id', 'pid');
    })
  };
  const getGroup = () => {
    proxy.$get(Interface.user.groupList, {
    }).then(res=>{
        data.groupList = res.listData;
    })
  };
  const getRole = () => {
    proxy.$get(Interface.user.role, {
    }).then(res=>{
        data.roleList = res.listData;
    })
  };
  getDeptTree();
  getGroup();
  getRole();
  watch(()=> data.listData,(newVal,oldVal)=>{
    if(data.selectUserList.length){
        let selectUsers = data.listData.filter(item=>{
            return data.selectUserList.find(row=>row.systemUserId==item.systemUserId);
        }).map(l=>l.systemUserId);
        console.log('selectUsers',selectUsers);
        data.selectUsers = selectUsers;
    }
  }, {deep: true, immediate: true})
  const handleDeptUser = (e,node) => {
    let id = node.node.id;
    getDeptUser(id);
  };
  const getDeptUser = (id) => {
    proxy.$get(Interface.user.sysUser,{
        businessUnitId: id,
        search: ""
    }).then(res=>{
        data.listData = res.listData;
        
    })
  };
  const handleGroupUser = (e, node) => {
    let id = node.node.GroupId;
    getGroupUser(id);
  };
  const getGroupUser = (id) => {
    proxy.$get(Interface.user.groupUser,{
        groupId: id,
        disablePage: true,
        search: ""
    }).then(res=>{
        data.listData = res.listData.map(item=>{
            item.systemUserId = item.SystemUserId;
            item.fullName = item.FullName;
            return item;
        });
    })
  };
  getDeptUser();
  const handleRoleUser = (e, node) => {
    let id = node.node.RoleId;
    getRoleUser(id);
  }
  const getRoleUser = (id) => {
    proxy.$get(Interface.user.roleUserList,{
        roleid: id,
        search: ""
    }).then(res=>{
        data.listData = res.listData.map(item=>{
            item.systemUserId = item.SystemUserId;
            item.fullName = item.FullName;
            return item;
        });
    })
  };
  const changeUser = (e) => {
    // console.log("list", data.listData);
    // console.log("e", e);
    let list = data.listData.filter(item=>{
        return e.find(row=>row==item.systemUserId);
    });
    console.log("selectUserList", list);
    data.selectUserList = unique(data.selectUserList.concat(list), 'systemUserId');
  };
  

  const handleDelete = (item, index) => {
    let idx = data.selectUsers.findIndex(row=>row==item.systemUserId);
    data.selectUsers.splice(idx, 1);
    data.selectUserList.splice(index, 1);
  };
  
  const handleSearchUser = () => {

  };
  const handleSubmit = () => {
    formRef.value.validate().then(() => {
        let d = {
            objectTypeCode: 10,
            unitId: "",
            ToDept: "",
            startDate: "",
            endDate: "",
            yearNumber: formState.yearNumber,
            monthNumber: formState.monthNumber,
            employeeId: data.selectUsers.join(','),
            transferType: formState.transferType
        }
        proxy.$get(Interface.attd.transferdeptIn, d).then((res) => {
            message.success("保存成功！");
            emit("cancel", false);
            formRef.value.resetFields();
        });
    })
    .catch((err) => {
        console.log("error", err);
    });
  };

  const handleNext = () => {
    data.current++;
  };
  const handlePrev = () => {
    data.current--;
  };
  </script>
<style lang="less">
@import url("@/style/modal.less");
.ant-modal-content .modalContainer.addUser .modalCenter{
    padding: 0 !important;
}
.ant-modal-header{
    margin-bottom: 0 !important;
}
.ant-modal-footer{
    margin-top: 0 !important;
}
.addUserWrap{
    display: flex;
    height: 100%;
    overflow: hidden;
    .leftCategory{
        width: 180px;
        height: 100%;
        border-right: 1px solid #dddbda;
        overflow-y: auto;
        .select-title{
            line-height: 1.25;
            background-color: #ececec;
            padding: 8px 4px;
            font-size: 12px;
            cursor: pointer;
        }
    }
    .centerUser{
        flex: 1;
        height: 100%;
        .search{
            padding: 10px 20px;
            border-bottom: 1px solid #dddbda;
        }
        .userContent{
            height: calc(~"100% - 53px");
            overflow-y: auto;
            table{
                width: 100%;
                border-collapse: collapse;
                /* text-align: center; */
                thead{
                    background: #f3f2f2;
                    border-bottom: 1px solid #dddbda;
                    tr{
                        th{
                            padding: 8px 0;
                            text-align: left;
                        }
                    }
                }
                tbody{
                    tr{
                        border-bottom: 1px solid #dddbda;
                        td{
                            padding: 8px 0;
                            font-weight: bold;
                        }
                    }
                }
            }
        }
    }
    .selectUser{
        width: 150px;
        height: 100%;
        overflow-y: auto;
        border-left: 1px solid #dddbda;
        .selectUserDesc{
            font-size: 12px;
            color: #999;
            padding: 10px 25px 10px 10px;
        }
        .userItem{
            margin: 5px 15px 5px 10px;
            border: 1px solid #dddbda;
            height: 25px;
            line-height: 25px;
            border-radius: 4px;
            color: #333;
            font-size: 13px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 15px;
            &:hover{
                background: #d8edff;
            }
            .aIcon{
                cursor: pointer;
            }
        }
    }
}
</style>
<style scoped>
    :where(.css-dev-only-do-not-override-kqecok).ant-picker {
        width: 100%;
    }
</style>