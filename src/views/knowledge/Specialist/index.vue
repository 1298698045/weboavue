<template>
  <div class="SpecialistWrap" ref="SpecialistMap">
    <div class="panel" :style="{ height: height + 'px' }">
      <div class="panel-head">
        <!-- <div class="panel-title"></div> -->
        <div class="tabWrap panel-bd-tabWrap">
              <a-tabs v-model:activeKey="activeKey" @change="changeTabs">
                  <a-tab-pane v-for="(item, index) in tabs" :key="index">
                      <template #tab>
                          <span>{{ item.label }}</span>
                      </template>
                  </a-tab-pane>
              </a-tabs>
          </div>
        <div class="panel-btn">
            <!-- <a-button class="ml10" type="primary" @click="AddPeople">添加成员</a-button>
            <a-button class="ml10" type="primary" @click="AddAdmin">添加管理员</a-button> -->
            <div class="left">
            <a-input-search
              v-model:value="searchVal"
              placeholder="专家姓名、简介、关键字"
              style="width: 300px"
              @search="onSearch"
            />
          </div>
            <a-button class="ml10" type="primary" @click="onSearch">查询</a-button>
            <a-button class="ml10" type="primary">新建</a-button>
        </div>
      </div>
      <div class="panel-bd panel-bd1">
        <!-- <div class="peopleHeader">
          <div class="left">
            <a-input-search
              v-model:value="searchVal"
              placeholder="请输入"
              style="width: 300px"
              @search="onSearch"
            />
          </div>
          <div class="rightOption">
            <a-button class="ml10" type="primary" @click="onSearch">查询</a-button>
            <a-button class="ml10" type="default" @click="onClear">重置</a-button>
            <a-button class="ml10" type="default">导出</a-button>
          </div>
        </div> -->
        <div class="SpecialistWrapList">
            <div class="SpecialistItem" v-for="(item,index) in listData" :key="index">
                  <div class="item_title">
                    <div style="font-size: 14px;line-height:30px;float: left;">专家：</div>
                    <div style="cursor:pointer;font-size: 14px;line-height:30px;float: left;">{{item.FullName||'暂无'}}</div>
                  </div>
                  <div style="width: 98%;height: 3px;position: relative;margin: 0px auto">
                    <div style="width: 100%;height: 1px;font-size: 0px;"></div>
                    <div style="width: 100%;height: 1px;background: #eaeaea;font-size: 0px;"></div>
                    <div style="width: 50px;height: 3px;background: #3BBAD9;position: absolute;top: 0px;left: 0px;font-size: 0px;"></div>
                  </div>
                  <div style="width: 98%;margin: 0px auto;height: auto;margin-top: 10px;">
                    <table class="item_table" style="width: 100%" cellpadding="0" cellspacing="0" border="0">
                      <colgroup><col width="10"><col width="15"><col width="*"></colgroup>
                      <tbody>
                        <tr>
                          <td valign="middle">
                          <div class="photo_4" style="width: auto;height:110px;">
                            <a id="resourceimghref" href="/messager/usericon/05e2cab71e11431e9b7d6438087ded45.jpg" onclick="return getImageResult(this);" onfocus="this.blur()"> 
                              <img border="0" height="110" :src="require('@/assets/img/showEmpAvatar.png')">
                            </a>
                            </div>
                          </td>
                          <td width="15"></td>
                          <td width="*" valign="top">
                            <div class="content"><font class="ftitle">岗位：</font>{{item.PostId||'暂无'}}</div>
                            <div class="content"><font class="ftitle">部门：</font>{{item.BusinessUnitId||'暂无'}}</div>
                            <div class="content" style="height: 44px;overflow: hidden;" title="关键字">
                              <font class="ftitle">关键字：</font>
                              <span>{{item.KeyWords||'暂无'}}</span>&nbsp;
                            </div>
                            <div class="content" style="height: 22px;overflow: hidden;">
                              <div class="d_btn" @click="openSendEmail(item)">发送邮件</div>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <div style="width: 100%;margin: 0px auto;height: 30px;position: relative;margin-top:5px;">
                      <div style="width: 100%;height: 15px;border-bottom: 1px #eaeaea solid;font-size: 0px;"></div>
                      <div style="width: 65px;line-height: 30px;position: absolute;top: 0px;left: 10px;background: #F9F9F9;text-align: center;">专家简介</div>
                    </div>
                    <div class="content_def">
                      {{item.Description||'暂无'}}
                    </div>
                    <!-- <div class="content_def">建立健全公司知识产权和商业秘密保护体系。从公司研发、销售、客服、经销商包括客户等环节进行规范保护； 负责公司法律纠纷、诉讼的处理及跟踪； 负责公司合同文本的法律审核、提供法律意见； 负责审核公司各项规章制度、确保公司各项规章制度的合法、规范、严谨；建立健全公司知识产权和商业秘密保护体系。从公司研发、销售、客服、经销商包括客户等环节进行规范保护； 负责公司法律纠纷、诉讼的处理及跟踪； 负责公司合同文本的法律审核、提供法律意见； 负责审核公司各项规章制度、确保公司各项规章制度的合法、规范、严谨；</div> -->
                  </div>
                  <div style="width: 98%;margin: 0px auto;height: 30px;position: relative;">
                    <div style="width: 100%;height: 15px;border-bottom: 1px #eaeaea solid;font-size: 0px;"></div>
                    <div style="width: 65px;line-height: 30px;position: absolute;top: 0px;left: 10px;background: #F9F9F9;text-align: center;">观点文章</div>
                  </div>
                  <div>
                    <table class="Econtent" width="100%">
                      <tbody>
                        <tr height="18px" v-for="(child,childIndex) in item.childData" :key="childIndex">
                          <td width="*" :title="child.Name||''">
                            <a href="javascript:')">{{child.Name||''}}</a>
                          </td>
                          <td width="70">
                            <font class="font">{{child.CreatedOn||''}}</font>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

            </div>
        </div>
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
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import locale from 'ant-design-vue/es/date-picker/locale/zh_CN';
dayjs.locale('zh-cn');
import calendar from 'dayjs/plugin/calendar';
import weekday from 'dayjs/plugin/weekday';
import localeData from 'dayjs/plugin/localeData';
import axios from "axios";
dayjs.extend(calendar);
dayjs.extend(weekday);
dayjs.extend(localeData);
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
import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const route = useRoute();
const { proxy } = getCurrentInstance();
const PersonnelLst = ref();
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
        hideOnSinglePage:false,
        showSizeChanger:true,
        showQuickJumper:true,
        total:0,//数据总数
        pageSize:10,
        current:1,
        pageSizeOptions: ['10', '20', '50', '100'],
        defaultPageSize: 10,
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
  activeKey:0,
    tabs: [
        {
        label: "专家库",
        },
        {
        label: "运营专家",
        },
        {
        label: "业务专家",
        },
        {
        label: "法务专家",
        },
        {
        label: "技术专家",
        },
    ],
    height:100,
});
const changeTabs = (e) => {
      data.activeKey = e;
      data.pagination.current=1;
      getQuery();
  };
const { height,activeKey,tabs,listData, searchVal,pagination,tableHeight,recordId,objectTypeCode,sObjectName,isDelete,deleteDesc,external,isRadioUser } = toRefs(data);
const getQuery = () => {
  //data.listData=[];
  data.pagination.total = 0;
  let filterQuery='';
    if(data.activeKey==0){
      //filterQuery+='\nRoleCode\teq\t0';
    }
    if(data.activeKey==1){
      //filterQuery+='\nRoleCode\teq\t2';
    }
    if(data.pagination.current==1){
      data.listData=[];
    }
        proxy.$post(Interface.list2, {
            filterId:'',
            objectTypeCode:'8',
            entityName:'SystemUser',
            filterQuery:filterQuery,
            search:data.searchVal||'',
            page: data.pagination.current,
            rows: data.pagination.pageSize,
            sort:'EmployeeId',
            order:'ASC',
            displayColumns:'FullName,AvatarImg,BusinessUnitId,PostId,KeyWords,JobTitle,EmployeeId,MobilePhone,InternalEMailAddress,OwningUser'
        }).then(res => {
            data.total = res.pageInfo?res.pageInfo.total:0;
            data.pagination.total = res.pageInfo?res.pageInfo.total:0;
            //console.log(pagination)
            for (var i = 0; i < res.nodes.length; i++) {
                var item = res.nodes[i];
                for(var cell in item){
                    if(cell!='id'&&cell!='nameField'&&cell!='AvatarImg'){
                        item[cell]=girdFormatterValue(cell,item);
                    }
                    if(cell=='AvatarImg'){
                      item[cell]=girdFormatterValue(cell,item)||'@/assets/img/avatar-r.png';
                    }
                }
                if(!item.AvatarImg){
                    item.AvatarImg='@/assets/img/avatar-r.png';
                }
                data.listData.push(item);
                getItemList(item.id,i);
            }            
        })
};
const getItemList=(id,index)=>{
  data.listData[index]['childData'] =[];
  let filterQuery='\nEmployeeId\teq\t'+id;
  proxy.$post(Interface.list2, {
            filterId:'',
            objectTypeCode:'30026',
            entityName:'HREmployeeBook',
            filterQuery:filterQuery,
            search:'',
            page: 1,
            rows: 50,
            displayColumns:'Name'
        }).then(res => {
            let list = [];
            for (var i = 0; i < res.nodes.length; i++) {
                let item = res.nodes[i];
                for(var cell in item){
                    if(cell!='id'&&cell!='nameField'){
                        item[cell]=girdFormatterValue(cell,item);
                    }
                    if(cell=='CreatedOn'){
                        item[cell]=item[cell]?dayjs(item[cell]).format("YYYY-MM-DD"):'';
                    }
                }
                list.push(item);
            }
            data.listData[index]['childData'] = list;
        })
}
const onSearch = (e) => {
  data.pagination.current=1;
  getQuery();
};
const onClear = (e) => {
  data.searchVal='';
  data.pagination.current=1;
  getQuery();
};
//改变页码
const handleTableChange=(page, pageSize)=>{
    //data.pagination.current=page.current;
    data.pagination.current=page;
    data.pagination.pageSize=pageSize;
    getQuery();
}
const sizeChange=(current, size)=>{
  handleTableChange(current, size)
}
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
//defineExpose({ getQuery,PersonnelLst });
//删除
const handleDelete = (key) => {
    data.recordId=key;
    data.isDelete = true;
}
//删除关闭
const cancelDelete = (e) => {
    data.isDelete = false;
};
//发送邮件
const openSendEmail= (item) => {
        let url = router.resolve({
            path:'/email/0',
            name: "Email",
            query: {
                Id:item.id,
                Name:item.FullName,
                type:1
            },
        });
        window.open(url.href);
    };
onMounted(() => {
  let h = document.documentElement.clientHeight;
  //data.tableHeight = h-565;
  data.height=h-80;
  window.addEventListener("resize", (e) => {
    let h = document.documentElement.clientHeight;
    //data.tableHeight = h-565;
    data.height=h-80;
  });
  window.addEventListener(
            "scroll",
            function () {
            if (document.getElementsByClassName("panel").length) {
            } else {
                return;
            }
            var clientHeight =
                document.getElementsByClassName("panel")[0].clientHeight;
            var scrollTop =
                document.getElementsByClassName("panel")[0].scrollTop;
            var scrollHeight =
                document.getElementsByClassName("panel")[0].scrollHeight;
            if (
                scrollTop &&
                clientHeight &&
                (clientHeight + scrollTop >= scrollHeight)
            ) {
                data.pagination.current = data.pagination.current + 1;
                getQuery();
            }
            },
            true
        );
  getQuery();
})
</script>
<style lang="less">
.SpecialistWrap {
  width: 100%;
  .panel{
    padding: 12px 8px;
    margin-bottom: 0;
  }
  .tabWrap{
        width: 100%;
        border-bottom: 1px solid #eee;
        position: relative;
        top: 0px;
      }
      .panel-head{
        margin-bottom: 12px;
        position: relative;
      }
      .panel-btn{
        position: absolute;
        right: 5px;
        top:0;
      }
      .ant-tabs-nav-wrap .ant-tabs-nav-list .ant-tabs-tab{
        padding: 10px 18px !important;
      }

}
body .ant-table-tbody td{
      padding: 6.5px 16px !important;
    }
    body .ant-table-measure-row td{
      padding: 0 !important;
    }
    body .ant-table-wrapper .ant-table-thead >tr>th{
      background-color: #f7fbfe !important;
      padding: 8.5px 16px !important;
    }
    body .ant-table-tbody tr:hover,body .ant-table-tbody tr:hover td{
      background-color: #e9f7ff !important;
      color: #108def !important;
    }
    body .ant-table-tbody tr:nth-child(odd) {
      background-color: rgb(250, 250, 250) !important; /* 奇数行背景色 */
    }
    body .ant-table-tbody tr:nth-child(even) {
      background-color: #fff !important; /* 偶数行背景色 */
    }
    .ant-pagination{
        .ant-pagination-item{
            border: 1px solid #d9d9d9;
        }
        .ant-pagination-item:hover{
            border: 1px solid #1677ff;
            background: #fff !important;
        }
        .ant-pagination-item-active,.ant-pagination-item-active:hover{
            border: 1px solid #1677ff;
            background: #1677ff !important;
            a{
                color: #fff;
            }
        }
    } 
.peopleHeader {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
.SpecialistWrap .pageWrap{
      text-align: right;
      padding: 15px;
    }
    .SpecialistWrap .iconBox .moreaction {
        padding: 0px 1px;
        width: 18px;
        border: 1px solid #dedede;
        border-radius: 4px;
        position: relative;
        top: 1px;
    }
    .SpecialistWrap .iconBox .popup{
        top: 25px;
        right: 0;
        width: max-content;
        min-width: 88px;
    }
    .SpecialistWrap{
        .ant-table-wrapper,.ant-spin-nested-loading,.ant-spin-nested-loading .ant-spin-container,.ant-table-wrapper .ant-table,.ant-table-wrapper .ant-table-container{
            height: 100% !important;
        }
        .iconBox {
  position: relative;
  cursor: pointer;
}
.icon.img {
  width: 20px;
  height: 20px;
  cursor: pointer;
}
.iconBox:hover .popup {
  display: block;
}
.popup {
  position: absolute;
  top: 0;
  min-width: 100px;
  background: #fff;
  display: none;
  z-index: 999999;
  box-shadow: 0 1px 6px rgba(99, 99, 99, 0.2);
  border: 1px solid #d9d9d9;
  border-radius: 6px;
}
.popup .option-item {
  padding: 7px 15px;
  font-size: 12px;
  border-radius: 6px 6px 0 0;
}
.popup .option-item:hover {
  background: #eaf8fe;
}
td[field="Action"] .datagrid-cell {
  overflow: initial !important;
}
:deep .iconBox {
  text-align: center;
}
:deep .iconBox .popup {
  text-align: left;
  top: 20px;
}
:deep .iconBox .moreaction {
  padding: 0px 1px;
  width: 18px;
  border: 1px solid #dedede;
  border-radius: 4px;
  position: relative;
  top: 1px;
}

    }
    .SpecialistWrap .panel-bd1{
      height: calc(~'100% - 170px') !important;
    }
    .SpecialistWrap .ant-table-body{
      height: 100% !important;
    }
    .container {
        padding: 10px;
        box-sizing: border-box;
    }
    .ant-pagination{
        .ant-pagination-item{
            border: 1px solid #d9d9d9;
        }
        .ant-pagination-item:hover{
            border: 1px solid #1677ff;
            background: #fff !important;
        }
        .ant-pagination-item-active,.ant-pagination-item-active:hover{
            border: 1px solid #1677ff;
            background: #1677ff !important;
            a{
                color: #fff;
            }
        }
    } 
    .SpecialistWrap{
      .sortIcon{
        .anticon{
          margin-right: 5px;
        }
      }
      .tabWrap{
        width: 100%;
        //border-bottom: 1px solid #eee;
        .ant-tabs-nav-wrap{
          position: relative;
          top: -1px;
        }
      }
      .panel-head{
        margin-bottom: 12px;
        position: relative;
      }
      .panel-btn{
        position: absolute;
        right: 5px;
        top:0;
      }
      .ant-tabs-nav-wrap .ant-tabs-nav-list .ant-tabs-tab{
        padding: 10px 18px !important;
      }
    }
    .SpecialistWrap{
      .panel-btn{
        display: flex;
        .left{
          width: 298px
        }
      }
      .panel-head{
        margin-bottom:0;
      }
      .SpecialistWrapList{
        width: 100%;
        height: auto;
        font-size: 12px;
        font-family: '微软雅黑' !important;
        .SpecialistItem{
          width: calc(~'50% - 25px');
          height: 490px;
          float: left;
          margin-left: 15px;
          margin-right: 5px;
          margin-top: 20px;
          background: #F9F9F9;
          .item_title {
              width: 98%;
              margin: 0px auto;
              line-height: 30px;
              height: 30px;
              font-size: 13px;
              position: relative;
          }
          .item_table img{
            width: 110px !important;
            height: 110px !important;
          }
          .item_table .photo_4{
            width: 110px !important;
            height: 110px !important;
          }
          .content{
            width: 100%;
            line-height: 22px;
          }
          .ftitle {
              color: #808080;
          }
          .d_btn {
              width: 65px;
              line-height: 22px;
              text-align: center;
              margin-right: 5px;
              background: #EAEAEA;
              color: #717171;
              float: left;
              cursor: pointer;
          }
          .content_def {
              width: 98%;
              margin: 0px auto;
              margin-top: 0px;
              margin-bottom: 0px;
              height: 140px;
              line-height: 20px;
              border: 1px #F9F9F9 solid;
              padding: 3px;
              padding-top: 0px;
              padding-bottom: 0px;
              text-align: left;
              outline: none;
              overflow: auto;
          }
          .Econtent {
            td {
              line-height: 23px;
              padding-left: 12px;
              padding-right: 10px;
            }
            .font{
              width: 75px;
              display: inline-block;
            }
          }
        }
      }
    }
</style>
