<template>
  <div class="relatedWrap" ref="PersonnelLst">
    <div class="panel">
      <div class="panel-head">
        <div class="panel-title">人员信息</div>
        <div class="panel-btn"></div>
      </div>
      <div class="panel-bd">
        <div class="peopleHeader">
          <div class="left">
            <a-input-search
              v-model:value="searchVal"
              placeholder="请输入"
              style="width: 300px"
              @search="onSearch"
            />
          </div>
          <div class="rightOption">
            <a-button class="ml10" type="primary" @click="AddPeople">添加成员</a-button>
            <a-button class="ml10" type="primary" @click="AddAdmin">添加管理员</a-button>
            <a-button class="ml10" type="primary" @click="onSearch">查询</a-button>
            <a-button class="ml10" type="default" @click="onClear">重置</a-button>
            <a-button class="ml10" type="default">导出</a-button>
          </div>
        </div>
        <a-table :columns="columns" :dataSource="listData" :scroll="{ y:tableHeight }" :pagination="data.pagination" @change="handleTableChange">
          <template #bodyCell="{ column, index,record }">
            <template v-if="column.key === 'Action'">
              <a-button type="text" size="small" @click="handleDelete(record.id)">删除</a-button>
            </template>
            <template v-if="column.key === 'index'">
              <div>
                {{ index + 1 }}
              </div>
            </template>
            <template v-if="column.key === 'sort'">
              <div class="sortIcon">
                <ArrowUpOutlined />
                <ArrowDownOutlined />
              </div>
            </template>
          </template>
        </a-table>
      </div>
    </div>
    <radio-user :isShow="isRadioUser" @selectVal="getUserData" @cancel="closeUser" @ok="refreshPeople"></radio-user>
    <Delete :isShow="isDelete" :desc="deleteDesc" @cancel="cancelDelete" @ok="refreshPeople" :sObjectName="sObjectName" :recordId="recordId" :objTypeCode="objectTypeCode" :external="external" />
  </div>
</template>
<script setup>
import "@/style/common.less";
import {
  ref,
  toRefs,
  reactive,
  toRaw,
  onMounted,
  watch,
  getCurrentInstance,
  defineEmits,
  defineExpose,
  defineProps,
  h
} from "vue";
import {
  SwapLeftOutlined,
  SwapRightOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
} from "@ant-design/icons-vue";
import Interface from "@/utils/Interface.js";
import { girdFormatterValue } from "@/utils/common.js";
import { message } from "ant-design-vue";
import RadioUser from "@/components/commonModal/MultipleUser.vue";
import Delete from "@/components/listView/Delete.vue";
const { proxy } = getCurrentInstance();
const PersonnelLst = ref();
var columns = [
  {
    title: "序号",
    dataIndex: "index",
    key: "index",
  },
  {
    title: "排序",
    dataIndex: "",
    key: "sort",
  },
  {
    title: "姓名",
    dataIndex: "FullName",
  },
  {
    title: "部门",
    dataIndex: "BusinessUnitIdName",
  },
  {
    title: "角色",
    dataIndex: "RoleCode",
  },
  {
    title: "电话",
    dataIndex: "MobilePhone",
  },
  {
    title: "邮箱",
    dataIndex: "EMailAddress",
  },
  {
    title: "职位",
    dataIndex: "JobTitle",
  },
  {
    title: "操作",
    key: "Action",
    width: 150,
  },
];
const props = defineProps({
  id: String,
});

const emit = defineEmits(["load"]);

const data = reactive({
  list: [],
  selectedRowKeys: [],
  loading: false,
  listData: [],
  searchVal: "",
  isRadioUser: false,
  isDelete: false,
  RoleCode: 0,
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
  total:0,
  tableHeight:0,
  recordId:'',
  objectTypeCode:'90',
  sObjectName:'GroupMembership',
  isDelete: false,
  deleteDesc: '确定要删除吗？',
  external:false,
});
const columnList = toRaw(columns);
const { listData, searchVal,pagination,tableHeight,recordId,objectTypeCode,sObjectName,isDelete,deleteDesc,external,isRadioUser } = toRefs(data);
const getQuery = () => {
  // proxy.$get(Interface.user.groupUser, {}).then((res) => {
  //   data.listData = res.rows;
  // });
  data.listData=[];
  data.pagination.total = 0;
  let filterQuery='\nGroupId\teq\t'+props.id;
        proxy.$post(Interface.list2, {
            filterId:'',
            objectTypeCode:'90',
            entityName:'GroupMembership',
            filterQuery:filterQuery,
            search:data.searchVal||'',
            page: data.pagination.current,
            rows: data.pagination.pageSize,
            sort:'DisplayOrder',
            order:'ASC',
            displayColumns:'RegardingObjectIdName,PhotoUrl,FullName,BusinessUnitIdName,RoleCode,MobilePhone,EMailAddress,WorkStatus'
        }).then(res => {
            var list = [];
            data.total = res.pageInfo?res.pageInfo.total:0;
            data.pagination.total = res.pageInfo?res.pageInfo.total:0;
            //console.log(pagination)
            for (var i = 0; i < res.nodes.length; i++) {
                var item = res.nodes[i];
                for(var cell in item){
                    if(cell!='id'&&cell!='nameField'&&cell!='PhotoUrl'){
                        item[cell]=girdFormatterValue(cell,item);
                    }
                    if(cell=='RegardingObjectIdName'){
                        item['FullName']=item[cell];
                    }
                }
                list.push(item)
            }
            data.listData = list;
            
        })
};
const onSearch = (e) => {
  getQuery();
};
const onClear = (e) => {
  data.searchVal='';
  getQuery();
};
//改变页码
const handleTableChange=(pag, filters, sorter)=>{
  data.pagination.current=pag.current;
  getQuery();
}
getQuery();
// 添加成员
const AddPeople = () => {
  data.isRadioUser = true;
  data.RoleCode = 0;
}
// 添加管理员
const AddAdmin = () => {
  data.RoleCode = 2;
  data.isRadioUser = true;
};
const refreshPeople=(e)=>{
  getQuery();
  emit("load","");
}
const closeUser = (e) => {
  data.isRadioUser = false;
};
// 添加成员/管理员
const getUserData = (params) => {
  console.log("params:", params);
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
                    GroupId: props.id,
                    RegardingObjectIdName: params.name,
                    RegardingObjectId: params.id,
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

};
defineExpose({ getQuery,PersonnelLst });
//删除
const handleDelete = (key) => {
    data.recordId=key;
    data.isDelete = true;
}
//删除关闭
const cancelDelete = (e) => {
    data.isDelete = false;
};
onMounted(() => {
    let h = PersonnelLst.value.clientHeight;
    data.tableHeight = h+260;
})
</script>
<style lang="less">
.relatedWrap {
  width: 100%;
}
.peopleHeader {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
</style>
