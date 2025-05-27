<template>
  <div class="DutyShiftSearchWrap">
    <div class="headerBar">
      <div class="headerLeft">
        <div class="icon-circle-base">
          <img :src="require('@/assets/img/rightMenu/hetong.png')" alt="">
        </div>
        <span class="headerTitle">总值班查询</span>
      </div>
      <div class="headerRight">
        <!-- <a-button type="primary" class="ml10" @click="handleNew">新建权限</a-button> -->
      </div>
    </div>
    <div class="todo-content">
      <a-row>
        <a-col span="24" class="wea-left-right-layout-right">
          <div style="height: 100%" ref="contentRef">
            <HighSearch @update-height="changeHeight" @search="handleSearch" :entityApiName="sObjectName"></HighSearch>
            <div class="tableWrap" ref="tablelist">
              <div class="empty" v-if="!dataSource.length">
                <img src="/src/assets/img/empty.png" alt="" />
                <p class="emptyDesc">当前暂无数据</p>
              </div>
              <a-table v-if="dataSource.length" :scroll="{ y: tableHeight }" :dataSource="dataSource" :columns="columns"
                :pagination="data.pagination" @change="handleTableChange" bordered>
                <template #bodyCell="{ column, index, record }">
                  <template v-if="column.key === 'index'">
                    <div>
                      {{ index + 1 }}
                    </div>
                  </template>
                  <template v-if="column.key === 'checked'">
                    <div>
                      <a-checkbox v-model:checked="record.checked"></a-checkbox>
                    </div>
                  </template>
                  <template v-if="column.key == 'Action'">
                    <div class="iconBox">
                      <div class="popup">
                        <div class="option-item" @click="handleDelete(record.id)" :num="index">删除</div>
                      </div>
                      <svg class="moreaction" width="15" height="20" viewBox="0 0 520 520" fill="none"
                        role="presentation" data-v-69a58868="">
                        <path d="M83 140h354c10 0 17 13 9 22L273 374c-6 8-19 8-25 0L73 162c-7-9-1-22 10-22z"
                          fill="#747474" data-v-69a58868=""></path>
                      </svg>
                    </div>
                  </template>
                  <template v-if="column.key === 'DutyShiftDate'">
                    <div :class="{'state0':record['state']==0,'state1':record['state']==1,'state2':record['state']==2}">
                      <span class="DutyShiftDate">{{ record[column.key] }}</span>
                    </div>
                  </template>
                   <template v-if="column.key != 'Action'&&column.key!='index'&&column.key!='checked'&&column.key!='DutyShiftDate'&&column.key!='state'">
                      <div class="dutyShiftCell" :class="{'state0':record['state']==0,'state1':record['state']==1,'state2':record['state']==2}">
                        <div class="dutyShiftCellItem" v-for="(item,index) in record[column.key]" :key="index">
                          <div class="peoplename">{{ item.EmployeeIdName||'' }}</div>
                          <div class="shiftname" v-if="item.WorkShiftIdName">{{ item.WorkShiftIdName }}</div>
                        </div>
                      </div>
                   </template>
                </template>
              </a-table>
            </div>
          </div>
        </a-col>
      </a-row>
    </div>
    <Delete v-if="data.isDelete" :isShow="data.isDelete" :desc="data.deleteDesc" @cancel="cancelDelete"
      @ok="refreshData" :sObjectName="sObjectName" :recordId="data.recordId" :objTypeCode="objectTypeCode"
      :external="data.external" />
    <common-form-modal :isShow="isCommon" v-if="isCommon" @cancel="isCommon = false" :title="data.recordId ? '编辑' : '新建'"
      @success="refreshData" :id="data.recordId" :objectTypeCode="objectTypeCode" :entityApiName="sObjectName"
      :relatedObjectAttributeValue="relatedObjectAttributeValue"
      :relatedObjectAttributeName="relatedObjectAttributeName"></common-form-modal>
    <CommonConfirm v-if='isConfirm' :isShow="isConfirm" :text="confirmText" :title="confirmTitle"
      @cancel="isConfirm = false" @ok="isConfirm = false" :id="CheckList" />
  </div>
</template>
<script setup>
import {
  UnorderedListOutlined,
  DownOutlined,
  CaretDownOutlined,
  UserOutlined,
  ApartmentOutlined,
  SearchOutlined,
  StarOutlined,
  StarFilled,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined
} from "@ant-design/icons-vue";
import { ref, watch, reactive, toRefs, onMounted, getCurrentInstance, onUpdated } from "vue";
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import locale from 'ant-design-vue/es/date-picker/locale/zh_CN';
dayjs.locale('zh-cn');
import Interface from "@/utils/Interface.js";
import { message } from "ant-design-vue";
import HighSearch from "@/components/HighSearch.vue";
import { useRouter, useRoute } from "vue-router";
import { girdFormatterValue } from "@/utils/common.js";
const route = useRoute();
const router = useRouter();
import CommonFormModal from "@/components/listView/CommonFormModal.vue";
import CommonConfirm from "@/components/workflow/CommonConfirm.vue";
import Delete from "@/components/listView/Delete.vue";

const { proxy } = getCurrentInstance();
const tablelist = ref();

let data = reactive({
  isCollapsed: false,
  tableHeight: 0,
  fieldNames: {
    children: 'children', title: 'name', key: 'id'
  },
  activeKey: 0,
  isModal: false,
  isCirculation: false,
  isNew: false,
  searchVal: '',
  value: "",
  isDelete: false,
  deleteDesc: '确定要删除吗？',
  recordId: '',
  external: false,
  userId: '',
  isCommon: false,
  objectTypeCode: '20451',
  sObjectName: 'HRAttendEmpDutyShift',
  relatedObjectAttributeValue: {},
  relatedObjectAttributeName: '',
  SelectKey: '',
  SelectName: '',
  selectedKeys: [],
  isNewFolder: false,
  CheckList: [],
  isConfirm: false,
  confirmText: '',
  confirmTitle: '',
  pagination: {
    hideOnSinglePage: false,
    showSizeChanger: true,
    showQuickJumper: true,
    total: 0,//数据总数
    pageSize: 15,
    current: 1,
    showTotal: ((total) => {
      return `共${total}条`
    })
  },
  columns: [
    // {
    //   title: "序号",
    //   dataIndex: "index",
    //   key: "index",
    //   width: 80,
    // },
    {
        title: "选择",
        dataIndex: "checked",
        key: "checked",
        width: 50,
    },
    {
      title: "值班日期",
      dataIndex: "DutyShiftDate",
      key: "DutyShiftDate",
      width: 100,
    },
    {
      title: "领导值班",
      dataIndex: "Leader",
      key: "Leader",
      width: 200,
    },
    {
      title: "行政总值班",
      dataIndex: "XZ",
      key: "XZ",
      width: 200,
    },
    {
      title: "医疗值班",
      dataIndex: "YL",
      key: "YL",
      width: 200,
    },
    {
      title: "护理值班",
      dataIndex: "HL",
      key: "HL",
      width: 200,
    },
     {
      title: "创伤中心排班",
      dataIndex: "CSZX",
      key: "CSZX",
      width: 200,
    },
    // {
    //   title: "操作",
    //   key: "Action",
    //   width: 120,
    // },
  ],
  dataSource: [],
  hightSearchParams: {}
});
const handleCollapsed = () => {
  data.isCollapsed = !data.isCollapsed;
};
const { hightSearchParams, dataSource, columns, pagination, CheckList, isConfirm, confirmText, confirmTitle, isNewFolder, selectedKeys, SelectName, SelectKey, relatedObjectAttributeValue, relatedObjectAttributeName, recordId, objectTypeCode, sObjectName, isCommon, isCollapsed, userId, tableHeight, fieldNames, activeKey, isModal, isCirculation, isNew, value, searchVal, SearchFields } = toRefs(data);
const contentRef = ref(null);
const gridRef = ref(null);

function changeHeight(h) {
  let h1 = tablelist.value.clientHeight;
  data.tableHeight = h1 - 75;
}
const handleSearch = (obj) => {
  data.pagination.current = 1;
  if (obj) {
    data.hightSearchParams = obj;
  }
  else {
    data.hightSearchParams = {}
  }
  getQuery();
}

const handleDelete = (id) => {
  data.relatedObjectAttributeValue = {};
  data.relatedObjectAttributeName = '';
  data.objectTypeCode = '6061';
  data.sObjectName = 'RecordAccessControl';
  data.recordId = id;
  data.isDelete = true;
}
const refreshData = (e) => {
  getQuery();
};
const cancelDelete = (e) => {
  data.isDelete = false;
};
//改变页码
const handleTableChange = (pag, filters, sorter) => {
  data.pagination.current = pag.current;
  getQuery();
}

const getQuery = () => {
  data.dataSource = [];
  data.pagination.total = 0;
  data.dataSource = [
    {
      DutyShiftDate:'2025-05-16',
      Leader:[
        {
          EmployeeIdName:'许海波',
          WorkShiftIdName:'全天'
        }
      ],
      XZ:[
        {
          EmployeeIdName:'骆安庆',
          WorkShiftIdName:'白班'
        },
        {
          EmployeeIdName:'毛志良',
          WorkShiftIdName:'晚班'
        }
      ],
      YL:[
        {
          EmployeeIdName:'毛齐彬',
          WorkShiftIdName:'白班'
        },
        {
          EmployeeIdName:'王金峰',
          WorkShiftIdName:'晚班'
        }
      ],
      HL:[
        {
          EmployeeIdName:'虞洁芳',
          WorkShiftIdName:'白班'
        },
        {
          EmployeeIdName:'许旭黎',
          WorkShiftIdName:'晚班'
        }
      ],
      CSZX:[
        {
          EmployeeIdName:'姜亚奇',
          WorkShiftIdName:'全天'
        }
      ],
    },
    {
      DutyShiftDate:'2025-05-17',
      Leader:[
        {
          EmployeeIdName:'许海波',
          WorkShiftIdName:'全天'
        }
      ],
      XZ:[
        {
          EmployeeIdName:'骆安庆',
          WorkShiftIdName:'白班'
        },
        {
          EmployeeIdName:'毛志良',
          WorkShiftIdName:'晚班'
        }
      ],
      YL:[
        {
          EmployeeIdName:'毛齐彬',
          WorkShiftIdName:'白班'
        },
        {
          EmployeeIdName:'王金峰',
          WorkShiftIdName:'晚班'
        }
      ],
      HL:[
        {
          EmployeeIdName:'虞洁芳',
          WorkShiftIdName:'白班'
        },
        {
          EmployeeIdName:'许旭黎',
          WorkShiftIdName:'晚班'
        }
      ],
      CSZX:[
        {
          EmployeeIdName:'姜亚奇',
          WorkShiftIdName:'全天'
        }
      ],
    },
    {
      DutyShiftDate:'2025-05-18',
      Leader:[
        {
          EmployeeIdName:'许海波',
          WorkShiftIdName:'全天'
        }
      ],
      XZ:[
        {
          EmployeeIdName:'骆安庆',
          WorkShiftIdName:'白班'
        },
        {
          EmployeeIdName:'毛志良',
          WorkShiftIdName:'晚班'
        }
      ],
      YL:[
        {
          EmployeeIdName:'毛齐彬',
          WorkShiftIdName:'白班'
        },
        {
          EmployeeIdName:'王金峰',
          WorkShiftIdName:'晚班'
        }
      ],
      HL:[
        {
          EmployeeIdName:'虞洁芳',
          WorkShiftIdName:'白班'
        },
        {
          EmployeeIdName:'许旭黎',
          WorkShiftIdName:'晚班'
        }
      ],
      CSZX:[
        {
          EmployeeIdName:'姜亚奇',
          WorkShiftIdName:'全天'
        }
      ],
    },
    {
      DutyShiftDate:'2025-05-19',
      Leader:[
        {
          EmployeeIdName:'许海波',
          WorkShiftIdName:'全天'
        }
      ],
      XZ:[
        {
          EmployeeIdName:'骆安庆',
          WorkShiftIdName:'白班'
        },
        {
          EmployeeIdName:'毛志良',
          WorkShiftIdName:'晚班'
        }
      ],
      YL:[
        {
          EmployeeIdName:'毛齐彬',
          WorkShiftIdName:'白班'
        },
        {
          EmployeeIdName:'王金峰',
          WorkShiftIdName:'晚班'
        }
      ],
      HL:[
        {
          EmployeeIdName:'虞洁芳',
          WorkShiftIdName:'白班'
        },
        {
          EmployeeIdName:'许旭黎',
          WorkShiftIdName:'晚班'
        }
      ],
      CSZX:[
        {
          EmployeeIdName:'姜亚奇',
          WorkShiftIdName:'全天'
        }
      ],
    },
    {
      DutyShiftDate:'2025-05-20',
      Leader:[
        {
          EmployeeIdName:'许海波',
          WorkShiftIdName:'全天'
        }
      ],
      XZ:[
        {
          EmployeeIdName:'骆安庆',
          WorkShiftIdName:'白班'
        },
        {
          EmployeeIdName:'毛志良',
          WorkShiftIdName:'晚班'
        }
      ],
      YL:[
        {
          EmployeeIdName:'毛齐彬',
          WorkShiftIdName:'白班'
        },
        {
          EmployeeIdName:'王金峰',
          WorkShiftIdName:'晚班'
        }
      ],
      HL:[
        {
          EmployeeIdName:'虞洁芳',
          WorkShiftIdName:'白班'
        },
        {
          EmployeeIdName:'许旭黎',
          WorkShiftIdName:'晚班'
        }
      ],
      CSZX:[
        {
          EmployeeIdName:'姜亚奇',
          WorkShiftIdName:'全天'
        }
      ],
    },
    {
      DutyShiftDate:'2025-05-21',
      Leader:[
        {
          EmployeeIdName:'许海波',
          WorkShiftIdName:'全天'
        }
      ],
      XZ:[
        {
          EmployeeIdName:'骆安庆',
          WorkShiftIdName:'白班'
        },
        {
          EmployeeIdName:'毛志良',
          WorkShiftIdName:'晚班'
        }
      ],
      YL:[
        {
          EmployeeIdName:'毛齐彬',
          WorkShiftIdName:'白班'
        },
        {
          EmployeeIdName:'王金峰',
          WorkShiftIdName:'晚班'
        }
      ],
      HL:[
        {
          EmployeeIdName:'虞洁芳',
          WorkShiftIdName:'白班'
        },
        {
          EmployeeIdName:'许旭黎',
          WorkShiftIdName:'晚班'
        }
      ],
      CSZX:[
        {
          EmployeeIdName:'姜亚奇',
          WorkShiftIdName:'全天'
        }
      ],
    },
    {
      DutyShiftDate:'2025-05-22',
      Leader:[
        {
          EmployeeIdName:'许海波',
          WorkShiftIdName:'全天'
        }
      ],
      XZ:[
        {
          EmployeeIdName:'骆安庆',
          WorkShiftIdName:'白班'
        },
        {
          EmployeeIdName:'毛志良',
          WorkShiftIdName:'晚班'
        }
      ],
      YL:[
        {
          EmployeeIdName:'毛齐彬',
          WorkShiftIdName:'白班'
        },
        {
          EmployeeIdName:'王金峰',
          WorkShiftIdName:'晚班'
        }
      ],
      HL:[
        {
          EmployeeIdName:'虞洁芳',
          WorkShiftIdName:'白班'
        },
        {
          EmployeeIdName:'许旭黎',
          WorkShiftIdName:'晚班'
        }
      ],
      CSZX:[
        {
          EmployeeIdName:'姜亚奇',
          WorkShiftIdName:'全天'
        }
      ],
    },
    {
      DutyShiftDate:'2025-05-23',
      Leader:[
        {
          EmployeeIdName:'许海波',
          WorkShiftIdName:'全天'
        }
      ],
      XZ:[
        {
          EmployeeIdName:'骆安庆',
          WorkShiftIdName:'白班'
        },
        {
          EmployeeIdName:'毛志良',
          WorkShiftIdName:'晚班'
        }
      ],
      YL:[
        {
          EmployeeIdName:'毛齐彬',
          WorkShiftIdName:'白班'
        },
        {
          EmployeeIdName:'王金峰',
          WorkShiftIdName:'晚班'
        }
      ],
      HL:[
        {
          EmployeeIdName:'虞洁芳',
          WorkShiftIdName:'白班'
        },
        {
          EmployeeIdName:'许旭黎',
          WorkShiftIdName:'晚班'
        }
      ],
      CSZX:[
        {
          EmployeeIdName:'姜亚奇',
          WorkShiftIdName:'全天'
        }
      ],
    },
    {
      DutyShiftDate:'2025-05-24',
      Leader:[
        {
          EmployeeIdName:'许海波',
          WorkShiftIdName:'全天'
        }
      ],
      XZ:[
        {
          EmployeeIdName:'骆安庆',
          WorkShiftIdName:'白班'
        },
        {
          EmployeeIdName:'毛志良',
          WorkShiftIdName:'晚班'
        }
      ],
      YL:[
        {
          EmployeeIdName:'毛齐彬',
          WorkShiftIdName:'白班'
        },
        {
          EmployeeIdName:'王金峰',
          WorkShiftIdName:'晚班'
        }
      ],
      HL:[
        {
          EmployeeIdName:'虞洁芳',
          WorkShiftIdName:'白班'
        },
        {
          EmployeeIdName:'许旭黎',
          WorkShiftIdName:'晚班'
        }
      ],
      CSZX:[
        {
          EmployeeIdName:'姜亚奇',
          WorkShiftIdName:'全天'
        }
      ],
    },
    {
      DutyShiftDate:'2025-05-25',
      Leader:[
        {
          EmployeeIdName:'许海波',
          WorkShiftIdName:'全天'
        }
      ],
      XZ:[
        {
          EmployeeIdName:'骆安庆',
          WorkShiftIdName:'白班'
        },
        {
          EmployeeIdName:'毛志良',
          WorkShiftIdName:'晚班'
        }
      ],
      YL:[
        {
          EmployeeIdName:'毛齐彬',
          WorkShiftIdName:'白班'
        },
        {
          EmployeeIdName:'王金峰',
          WorkShiftIdName:'晚班'
        }
      ],
      HL:[
        {
          EmployeeIdName:'虞洁芳',
          WorkShiftIdName:'白班'
        },
        {
          EmployeeIdName:'许旭黎',
          WorkShiftIdName:'晚班'
        }
      ],
      CSZX:[
        {
          EmployeeIdName:'姜亚奇',
          WorkShiftIdName:'全天'
        }
      ],
    },
    {
      DutyShiftDate:'2025-05-26',
      Leader:[
        {
          EmployeeIdName:'许海波',
          WorkShiftIdName:'全天'
        }
      ],
      XZ:[
        {
          EmployeeIdName:'骆安庆',
          WorkShiftIdName:'白班'
        },
        {
          EmployeeIdName:'毛志良',
          WorkShiftIdName:'晚班'
        }
      ],
      YL:[
        {
          EmployeeIdName:'毛齐彬',
          WorkShiftIdName:'白班'
        },
        {
          EmployeeIdName:'王金峰',
          WorkShiftIdName:'晚班'
        }
      ],
      HL:[
        {
          EmployeeIdName:'虞洁芳',
          WorkShiftIdName:'白班'
        },
        {
          EmployeeIdName:'许旭黎',
          WorkShiftIdName:'晚班'
        }
      ],
      CSZX:[
        {
          EmployeeIdName:'姜亚奇',
          WorkShiftIdName:'全天'
        }
      ],
    },
    {
      DutyShiftDate:'2025-05-27',
      Leader:[
        {
          EmployeeIdName:'许海波',
          WorkShiftIdName:'全天'
        }
      ],
      XZ:[
        {
          EmployeeIdName:'骆安庆',
          WorkShiftIdName:'白班'
        },
        {
          EmployeeIdName:'毛志良',
          WorkShiftIdName:'晚班'
        }
      ],
      YL:[
        {
          EmployeeIdName:'毛齐彬',
          WorkShiftIdName:'白班'
        },
        {
          EmployeeIdName:'王金峰',
          WorkShiftIdName:'晚班'
        }
      ],
      HL:[
        {
          EmployeeIdName:'虞洁芳',
          WorkShiftIdName:'白班'
        },
        {
          EmployeeIdName:'许旭黎',
          WorkShiftIdName:'晚班'
        }
      ],
      CSZX:[
        {
          EmployeeIdName:'姜亚奇',
          WorkShiftIdName:'全天'
        }
      ],
    },
    {
      DutyShiftDate:'2025-05-28',
      Leader:[
        {
          EmployeeIdName:'许海波',
          WorkShiftIdName:'全天'
        }
      ],
      XZ:[
        {
          EmployeeIdName:'骆安庆',
          WorkShiftIdName:'白班'
        },
        {
          EmployeeIdName:'毛志良',
          WorkShiftIdName:'晚班'
        }
      ],
      YL:[
        {
          EmployeeIdName:'毛齐彬',
          WorkShiftIdName:'白班'
        },
        {
          EmployeeIdName:'王金峰',
          WorkShiftIdName:'晚班'
        }
      ],
      HL:[
        {
          EmployeeIdName:'虞洁芳',
          WorkShiftIdName:'白班'
        },
        {
          EmployeeIdName:'许旭黎',
          WorkShiftIdName:'晚班'
        }
      ],
      CSZX:[
        {
          EmployeeIdName:'姜亚奇',
          WorkShiftIdName:'全天'
        }
      ],
    },
    {
      DutyShiftDate:'2025-05-29',
      Leader:[
        {
          EmployeeIdName:'许海波',
          WorkShiftIdName:'全天'
        }
      ],
      XZ:[
        {
          EmployeeIdName:'骆安庆',
          WorkShiftIdName:'白班'
        },
        {
          EmployeeIdName:'毛志良',
          WorkShiftIdName:'晚班'
        }
      ],
      YL:[
        {
          EmployeeIdName:'毛齐彬',
          WorkShiftIdName:'白班'
        },
        {
          EmployeeIdName:'王金峰',
          WorkShiftIdName:'晚班'
        }
      ],
      HL:[
        {
          EmployeeIdName:'虞洁芳',
          WorkShiftIdName:'白班'
        },
        {
          EmployeeIdName:'许旭黎',
          WorkShiftIdName:'晚班'
        }
      ],
      CSZX:[
        {
          EmployeeIdName:'姜亚奇',
          WorkShiftIdName:'全天'
        }
      ],
    },
    {
      DutyShiftDate:'2025-05-30',
      Leader:[
        {
          EmployeeIdName:'许海波',
          WorkShiftIdName:'全天'
        }
      ],
      XZ:[
        {
          EmployeeIdName:'骆安庆',
          WorkShiftIdName:'白班'
        },
        {
          EmployeeIdName:'毛志良',
          WorkShiftIdName:'晚班'
        }
      ],
      YL:[
        {
          EmployeeIdName:'毛齐彬',
          WorkShiftIdName:'白班'
        },
        {
          EmployeeIdName:'王金峰',
          WorkShiftIdName:'晚班'
        }
      ],
      HL:[
        {
          EmployeeIdName:'虞洁芳',
          WorkShiftIdName:'白班'
        },
        {
          EmployeeIdName:'许旭黎',
          WorkShiftIdName:'晚班'
        }
      ],
      CSZX:[
        {
          EmployeeIdName:'姜亚奇',
          WorkShiftIdName:'全天'
        }
      ],
    },
    {
      DutyShiftDate:'2025-05-31',
      Leader:[
        {
          EmployeeIdName:'许海波',
          WorkShiftIdName:'全天'
        }
      ],
      XZ:[
        {
          EmployeeIdName:'骆安庆',
          WorkShiftIdName:'白班'
        },
        {
          EmployeeIdName:'毛志良',
          WorkShiftIdName:'晚班'
        }
      ],
      YL:[
        {
          EmployeeIdName:'毛齐彬',
          WorkShiftIdName:'白班'
        },
        {
          EmployeeIdName:'王金峰',
          WorkShiftIdName:'晚班'
        }
      ],
      HL:[
        {
          EmployeeIdName:'虞洁芳',
          WorkShiftIdName:'白班'
        },
        {
          EmployeeIdName:'许旭黎',
          WorkShiftIdName:'晚班'
        }
      ],
      CSZX:[
        {
          EmployeeIdName:'姜亚奇',
          WorkShiftIdName:'全天'
        }
      ],
    },
  ];
  let today=dayjs(new Date()).format("YYYY-MM-DD");
  data.dataSource.forEach((item) => {
    if(item.DutyShiftDate){
      if((new Date(item.DutyShiftDate)).getTime()==(new Date(today)).getTime()){
        item.state=1;
      }else if((new Date(item.DutyShiftDate)).getTime()<(new Date(today)).getTime()){
        item.state=0;
      }else if((new Date(item.DutyShiftDate)).getTime()>(new Date(today)).getTime()){
        item.state=2;
      }
    }
  });
  data.pagination.total = data.dataSource.length;
  // let url = Interface.list2;
  // let d = {
  //   filterId: '',
  //   objectTypeCode: data.objectTypeCode,
  //   entityName: data.sObjectName,
  //   page: data.pagination.current,
  //   rows: data.pagination.pageSize,
  //   sort: 'CreatedOn',
  //   order: 'desc',
  //   displayColumns: 'Name'
  // }
  // if (data.hightSearchParams) {
  //   if (data.hightSearchParams.search) {
  //     d.search = data.hightSearchParams.search;
  //   }
  //   if (data.hightSearchParams.filterCondition) {
  //     d.filterCondition = data.hightSearchParams.filterCondition;
  //   }
  // }
  // data.dataSource = [];
  // data.pagination.total = 0;
  // proxy.$post(url, d).then(res => {
  //   let list = [];
  //   if (res && res.nodes) {
  //     data.pagination.total = res.pageInfo ? res.pageInfo.total : 0;
  //     for (var i = 0; i < res.nodes.length; i++) {
  //       var item = res.nodes[i];
  //       for (var cell in item) {
  //         if (cell != 'id' && cell != 'nameField') {
  //           item[cell] = girdFormatterValue(cell, item);
  //         }
  //         if (cell == 'CreatedOn') {
  //           item[cell] = item[cell] ? dayjs(item[cell]).format("YYYY-MM-DD HH:mm") : '';
  //         }
  //       }
  //       list.push(item)
  //     }
  //   }
  //   data.dataSource = list;
  // })
}
//批量
const handleRelease = () => {
  let list = gridRef.value.getCheckList();
  if (list.length) {
    data.CheckList = list;
    data.isConfirm = true;
    data.confirmText = '确定要批量吗？';
    data.confirmTitle = '批量';
  } else {
    message.error("请至少勾选一项！")
  }
}

onMounted(() => {
  let userInfo = window.localStorage.getItem('userInfo');
  if (userInfo) {
    userInfo = JSON.parse(userInfo);
    data.userId = userInfo.userId;
  }
  data.pagination.current = 1;
  getQuery();
  window.addEventListener('resize', changeHeight)
})
</script>
<style lang="less" scoped>
.DutyShiftSearchWrap {
  width: 100%;
  height: 100%;
  background: #fff;

  .todo-head {
    width: 100%;
    height: 52px;
    line-height: 52px;
    background: #f9f9f9;
    border-bottom: 1px solid #eaeaea;
    display: flex;
    align-items: center;

    .todo-head-left {
      padding-left: 20px;
      display: flex;
      align-items: center;
      flex: 1;

      .icon-circle-base {
        width: 35px;
        height: 35px;
        //background: rgb(0, 121, 222);
        background: rgb(150, 53, 138);
        border-radius: 50%;
        margin-right: 10px;
        color: #fff;
      }

      .wea-new-top-title-breadcrumb {
        color: #484a4d;
        margin-left: 3px;
        font-size: 14px;
        font-weight: 500;
      }
    }

    .todo-head-right {
      padding-right: 14px;
      display: flex;
      align-items: center;

      .btn-drop {
        display: inline-block;
        padding-left: 20px;
        line-height: 40px;
        vertical-align: middle;
        cursor: pointer;
      }

      .ant-btn-group {
        margin-left: 10px;
      }
    }
  }

  .todo-content {
    width: 100%;
    height: calc(~"100% - 52px");

    .ant-row {
      height: 100%;

      .wea-left-right-layout-left {
        border-right: 1px solid #eaeaea;

        .wea-left-tree {
          width: 100%;
          height: 100%;

          .wea-left-tree-search {
            width: 100%;
            height: 46px;
            line-height: 46px;
            display: flex;
            align-items: center;
            box-sizing: border-box;
            padding: 0 14px;

            :deep .ant-input {
              border: none !important;
            }

            .wea-left-tree-search-label {
              display: inline-block;
              padding-left: 14px;
              min-width: 76px;
              cursor: pointer;
              font-weight: 600;
              text-overflow: ellipsis;
              overflow: hidden;
              white-space: nowrap;
              font-size: 12px;
            }
          }

          .wea-left-tree-scroll {
            margin-top: 10px;
            width: 100%;
            height: calc(~"100% - 56px");
            overflow: auto;

            .ant-tree-title {
              display: inline-block;
              width: 100%;
            }

            .ant-tree-title>span {
              width: 100%;
              display: flex;
              justify-content: space-between;

              .tree-num {
                padding-right: 10px;
                position: relative;
                color: rgb(197, 197, 197);

                .tree-btn {
                  position: absolute;
                  left: -20px;
                  top: 1px;
                  width: 14px;
                  height: 14px;
                  color: #aaa;
                  display: none;
                }

                .tree-favor {
                  left: -20px;
                }

                .tree-add {
                  left: -110px;
                }

                .tree-edit {
                  left: -80px;
                }

                .tree-delete {
                  left: -50px;
                }

                .tree-favor-active {
                  color: #ffa741;
                }
              }
            }
          }
        }
      }

      .wea-left-right-layout-right {
        height: 100%;
        overflow: hidden;
        background-color: #fff;
        position: relative;

        .wea-left-right-layout-btn {
          width: 18px;
          height: 60px;
          position: absolute;
          top: 50%;
          left: 0;
          margin-top: -30px;
          z-index: 11;
          cursor: pointer;
          background-size: 100% 100%;
        }

        .wea-left-right-layout-btn.wea-left-right-layout-btn-show {
          background: url(~@/assets/img/leftTree-show.png) no-repeat -2px 0;
        }

        .wea-left-right-layout-btn.wea-left-right-layout-btn-show:hover {
          background: url(~@/assets/img/leftTree-show-hover.png) no-repeat -2px 0;
        }

        .wea-left-right-layout-btn.wea-left-right-layout-btn-hide {
          background: url(~@/assets/img/leftTree-hide.png) no-repeat -2px 0;
        }

        .wea-left-right-layout-btn.wea-left-right-layout-btn-hide:hover {
          background: url(~@/assets/img/leftTree-hide-hover.png) no-repeat -2px 0;
        }
      }

      .wea-tab {
        height: 46px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #e2e3e5;
        padding: 0 15px;

        :deep .ant-tabs-nav::before {
          border-bottom: none !important;
        }
      }

      //.wea-tabContent {
      //height: calc(~"100% - 98px");
      //}
    }
  }
}

.information-tree :deep .ant-tree-title {
  white-space: nowrap !important;
}

:deep .iconBox {
  text-align: left;

  .popup {
    text-align: left;
    top: 20px;
  }

  .moreaction {
    padding: 0px 1px;
    width: 18px;
    border: 1px solid #dedede;
    border-radius: 4px;
    position: relative;
    top: 1px;
  }
}

.DutyShiftSearchWrap {
  .headerBar .headerLeft .icon-circle-base {
    //background: rgb(223, 88, 58);
    background: rgb(150, 53, 138);

    img {
      width: 20px;
      height: 20px;
      position: relative;
      top: 0.4px;
    }
  }

  .alltype {
    padding-left: 0 !important;
    min-width: 60px !important;
  }

  .wea-left-tree-select {
    position: relative;

    .ant-select {
      width: 100%;

      :deep .ant-select-selector {
        border-radius: 0 !important;
        border: 0 !important;
        border-bottom: 1px solid #dedede !important;
        height: 46px;
        line-height: 46px;
        display: block;
        padding-left: 35px;
        border-color: #dedede !important;
        box-shadow: none !important;

        .ant-select-selection-item {
          font-size: 13px;
          color: #494949;
        }
      }
    }

    .wea-left-tree-select-icon {
      color: #494949;
      position: absolute;
      left: 12px;
      top: 13px;
      z-index: 1;
    }
  }

  .wea-left-tree-search {
    margin-top: 3px;
    position: relative;

    .wea-left-tree-search-icon {
      color: #bbb;
      position: absolute;
      right: 21px;
      top: 1px;
      z-index: 1;
    }
  }

  .wea-left-tree-scroll {
    height: calc(~'100% - 100px') !important;
  }

  :deep .ant-tabs .ant-tabs-tab {
    padding: 12px 24px !important;
    margin-right: 6px !important;
  }

  :deep .anticon-close-circle {
    right: 14px !important;
    position: relative !important;
  }

  :deep .ant-tree-switcher .ant-tree-switcher-icon {
    position: relative;
    top: 2px;
    left: 5px;
  }

  :deep .ant-tree-treenode {
    padding-left: 10px !important;
  }

  :deep .ant-tree .ant-tree-checkbox+span {
    line-height: 30px;
  }

  :deep .ant-tree .ant-tree-checkbox {
    position: relative;
    left: 4px;
    top: -2px;
  }

  .wea-left-tree-scroll {
    height: calc(100% - 58px) !important;
  }

  :deep .formSearch .ant-form {
    position: relative !important;
    top: 6px !important;
  }

  .tableWrap {
    height: calc(~'100% - 70px');
    :deep .ant-table-cell{
      text-align: center;
    }
    :deep .ant-table-thead{
       .ant-table-cell{
        color: #444;
        font-size: 15px;
       }
    }
    .dutyShiftCell{
        display: flex;
        justify-content: center;
        align-items: center;
      .dutyShiftCellItem{
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0 8px;
        .peoplename{
          font-size: 15px;
          white-space: nowrap;
        }
        .shiftname{
          font-size: 13px;
          padding: 2px 9px;
          border-radius: 4px;
          background: #bbb;
          margin-left: 6px;
          color: #fff;
          white-space: nowrap;
        }
      }
    }
    .state0{
      .dutyShiftCellItem{
        .peoplename{
          color: #bbb;
        }
        .shiftname{
          background: transparent;
          color: #bbb;
          border: 1px solid #bbb;
          padding: 1px 8px;
        }
      }
      .DutyShiftDate{
        color: #bbb;
        font-size: 15px;
      }
    }
    .state1{
      .dutyShiftCellItem{
        font-weight: bold;
        .peoplename{
          color: red;
        }
        .shiftname{
          
        }
      }
      .DutyShiftDate{
        font-weight: bold;
        color: red;
        font-size: 15px;
      }
    }
    .state2{
      .dutyShiftCellItem{
        .peoplename{
          color: #106FAE;
        }
      }
      .DutyShiftDate{
        color: #106FAE;
        font-size: 15px;
      }
    }
  }

  :deep .ant-table-wrapper {
    height: calc(~'100% - 0px');

    .ant-table-container {
      height: calc(~'100% - 0px');
    }
  }

  :deep .ant-spin-nested-loading {
    height: calc(~'100% - 0px');

    .ant-spin-container {
      height: calc(~'100% - 0px');
    }
  }

  :deep .ant-table-wrapper .ant-table {
    height: calc(~'100% - 35px') !important;
  }

  .empty {
    background: #fff;
    padding: 0px 0 30px;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    img {
      width: 130px;
    }

    .emptyDesc {
      color: #333;
    }
  }

  :deep .ant-table-tbody .ant-table-cell {
    padding: 8px 16px !important;

    .AccessObjectName {
      white-space: nowrap;
      text-overflow: ellipsis;
      width: 100%;
      overflow: hidden;
    }

    .ant-select {
      width: 100%;
    }
  }

  .group_list_avatar {
    position: relative;
    top: 4px;
  }

  .iconBox .moreaction {
    padding: 0px 1px;
    width: 18px;
    border: 1px solid #dedede;
    border-radius: 4px;
    position: relative;
    top: 1px;
  }

  .iconBox .popup {
    top: 25px;
    right: 0;
    width: max-content;
    min-width: 88px;
  }

  :deep .formSearch .searchItem:first-child .ant-form-item {
    width: 255px;
  }

  :deep .ant-table-wrapper .ant-table-thead>tr>th {
    background-color: #f7fbfe !important;
    padding: 8.5px 16px !important;
  }

  :deep .ant-table-tbody tr:hover,
  :deep .ant-table-tbody tr:hover td {
    background-color: #e9f7ff !important;
    color: #108def !important;
  }

  :deep .ant-table-tbody tr:nth-child(odd) {
    background-color: rgb(250, 250, 250) !important;
    /* 奇数行背景色 */
  }

  :deep .ant-table-tbody tr:nth-child(even) {
    background-color: #fff !important;
    /* 偶数行背景色 */
  }

  :deep .ant-pagination {
    margin: 16px 16px !important;

    .ant-pagination-item {
      border: 1px solid #d9d9d9;
    }

    .ant-pagination-item:hover {
      border: 1px solid #1677ff;
      background: #fff !important;
    }

    .ant-pagination-item-active,
    .ant-pagination-item-active:hover {
      border: 1px solid #1677ff;
      background: #1677ff !important;

      a {
        color: #fff;
      }
    }
  }
}

:deep .ant-tree-treenode:hover .tree-btn {
  display: block !important;
}

input[aria-hidden=true] {
  display: none !important;
}
</style>