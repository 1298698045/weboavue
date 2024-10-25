<template>
  <div class="dtable" :style="{height:tableHeight+'px'}">
    <div id="datagrid"></div>
    <!-- <DataGrid :data="tableList" :pagination="true" :total="total"
        :pageSize="pageSize" :resizable="true"
        :pagePosition="pagePosition" :style="{'height':gridHeight+'px'}">
        <GridColumn :draggable="true" field="IsRead" title="已读" :sortable="true">
          <template slot="header" slot-scope="scope">
            <div>
              {{scope.row.IsRead ? '123' : '456'}}
            </div>
          </template>
        </GridColumn>
        <GridColumn :draggable="true" field="Name" :fitColumns="true" width="30%" title="标题" :sortable="true"></GridColumn>
        <GridColumn field="PriorityName" title="紧急程度" :sortable="true"></GridColumn>
        <GridColumn field="ToActivityName" title="当前环节" :sortable="true" align="right"></GridColumn>
        <GridColumn field="FromActivityName" title="来源环节" :sortable="true" align="right"></GridColumn>
        <GridColumn field="CreatedByName" title="来源提交人" :sortable="true"></GridColumn>
        <GridColumn field="CreatedOn" title="来源提交" :sortable="true" align="center"></GridColumn>
        <GridColumn field="StartByName" title="发起人姓名" :sortable="true" align="center"></GridColumn>
        <GridColumn field="StartedOn" title="发起时间" :sortable="true" align="center"></GridColumn>
        <GridColumn field="BusinessUnitIdName" :sortable="true" title="发起人部门" align="center"></GridColumn>
        <GridColumn field="Deadline" title="办理期限" :sortable="true" align="center"></GridColumn>
        <GridColumn field="ProcessIdName" title="流程" :sortable="true" align="center"></GridColumn>
    </DataGrid> -->
    <!-- <s-table :columns="columns" :data-source="dataSource" :height="tableHeight" :pagination="{ position: [bottom] }"></s-table> -->
  </div>
</template>
<!-- <script setup>
import { ref, reactive, defineProps } from "vue";
const listJson = require('../localData/datalist.json') 
console.log("listjson",listJson)
const props = defineProps({
  tableHeight: String
})
const top = ref('topLeft');
const bottom = ref('bottomRight');
const listData = reactive([
  {
    code: "FI-SW-01",
    name: "Koi",
    unitcost: 10.0,
    status: "P",
    listprice: 36.5,
    attr: "Large",
    itemid: "EST-1",
  },
  {
    code: "K9-DL-01",
    name: "Dalmation",
    unitcost: 12.0,
    status: "P",
    listprice: 18.5,
    attr: "Spotted Adult Female",
    itemid: "EST-10",
  },
  {
    code: "RP-SN-01",
    name: "Rattlesnake",
    unitcost: 12.0,
    status: "P",
    listprice: 38.5,
    attr: "Venomless",
    itemid: "EST-11",
  },
  {
    code: "RP-SN-01",
    name: "Rattlesnake",
    unitcost: 12.0,
    status: "P",
    listprice: 26.5,
    attr: "Rattleless",
    itemid: "EST-12",
  },
  {
    code: "RP-LI-02",
    name: "Iguana",
    unitcost: 12.0,
    status: "P",
    listprice: 35.5,
    attr: "Green Adult",
    itemid: "EST-13",
  },
  {
    code: "FL-DSH-01",
    name: "Manx",
    unitcost: 12.0,
    status: "P",
    listprice: 158.5,
    attr: "Tailless",
    itemid: "EST-14",
  },
  {
    code: "FL-DSH-01",
    name: "Manx",
    unitcost: 12.0,
    status: "P",
    listprice: 83.5,
    attr: "With tail",
    itemid: "EST-15",
  },
  {
    code: "FL-DLH-02",
    name: "Persian",
    unitcost: 12.0,
    status: "P",
    listprice: 23.5,
    attr: "Adult Female",
    itemid: "EST-16",
  },
  {
    code: "FL-DLH-02",
    name: "Persian",
    unitcost: 12.0,
    status: "P",
    listprice: 89.5,
    attr: "Adult Male",
    itemid: "EST-17",
  },
  {
    code: "AV-CB-01",
    name: "Amazon Parrot",
    unitcost: 92.0,
    status: "P",
    listprice: 63.5,
    attr: "Adult Male",
    itemid: "EST-18",
  },
]);
const columns = reactive([
{
        title: 'Full Name',
        dataIndex: 'name',
        resizable: true
      },
      {
        title: 'Age',
        dataIndex: 'age',
      },
      {
        title: 'Column 1',
        dataIndex: 'address',
      },
      {
        title: 'Column 2',
        dataIndex: 'address',
      },
      {
        title: 'Column 3',
        dataIndex: 'address',
      },
      {
        title: 'Column 4',
        dataIndex: 'address',
      },
      { title: 'Column 5', dataIndex: 'address' },
])
const data = [];
for (let i = 0; i < 1000; i++) {
  data.push({
    key: i,
    name: `Edrward ${i}`,
    age: i + 1,
    address: `London Park no. ${i}`,
  });
}
var dataSource = reactive(data)
</script> -->

<script>
  const res = require("@/localData/datalist.json");
  var tableList = res.rows;
  console.log("tableList", tableList)
  export default {
    props: ['tableHeight', 'isCollapsed'],
    data() {
      return {
        data: [
          {
            "code": "FI-SW-01",
            "name": "Koi",
            "unitcost": 10.00,
            "status": "P",
            "listprice": 36.50,
            "attr": "Large",
            "itemid": "EST-1"
          },
          {
            "code": "K9-DL-01",
            "name": "Dalmation",
            "unitcost": 12.00,
            "status": "P",
            "listprice": 18.50,
            "attr": "Spotted Adult Female",
            "itemid": "EST-10"
          },
          {
            "code": "RP-SN-01",
            "name": "Rattlesnake",
            "unitcost": 12.00,
            "status": "P",
            "listprice": 38.50,
            "attr": "Venomless",
            "itemid": "EST-11"
          },
          {
            "code": "RP-SN-01",
            "name": "Rattlesnake",
            "unitcost": 12.00,
            "status": "P",
            "listprice": 26.50,
            "attr": "Rattleless",
            "itemid": "EST-12"
          },
          {
            "code": "RP-LI-02",
            "name": "Iguana",
            "unitcost": 12.00,
            "status": "P",
            "listprice": 35.50,
            "attr": "Green Adult",
            "itemid": "EST-13"
          },
          {
            "code": "FL-DSH-01",
            "name": "Manx",
            "unitcost": 12.00,
            "status": "P",
            "listprice": 158.50,
            "attr": "Tailless",
            "itemid": "EST-14"
          },
          {
            "code": "FL-DSH-01",
            "name": "Manx",
            "unitcost": 12.00,
            "status": "P",
            "listprice": 83.50,
            "attr": "With tail",
            "itemid": "EST-15"
          },
          {
            "code": "FL-DLH-02",
            "name": "Persian",
            "unitcost": 12.00,
            "status": "P",
            "listprice": 23.50,
            "attr": "Adult Female",
            "itemid": "EST-16"
          },
          {
            "code": "FL-DLH-02",
            "name": "Persian",
            "unitcost": 12.00,
            "status": "P",
            "listprice": 89.50,
            "attr": "Adult Male",
            "itemid": "EST-17"
          },
          {
            "code": "AV-CB-01",
            "name": "Amazon Parrot",
            "unitcost": 92.00,
            "status": "P",
            "listprice": 63.50,
            "attr": "Adult Male",
            "itemid": "EST-18"
          }
        ],
        total: 1000,
        pageSize: 10,
        // gridHeight: 500,
        pagePosition: "bottom",
        tableList: tableList
      }
    },
    computed: {
      gridHeight() {
        return this.tableHeight
      }
    },
    watch: {
      isCollapsed(newval, oldval) {
        $("#datagrid").datagrid("reload");
      }
    },
    mounted() {
      // this.loadGrid();
    },
    methods: {
      loadGrid() {
        const imgUrl = require("@/assets/flow/checkbox_checked.gif")
        var columns = [
          {
            field: 'ids',
            checkbox: true
          },
          {
              field: "Action",
              title: "操作",
              formatter: function formatter(value, row, index) {
                // var str = `<button style="cursor: pointer;">办理</button>
                //     <button style="cursor: pointer;">委派</button>
                //     <button style="cursor: pointer;">传阅</button>
                //     <button style="cursor: pointer;">打印</button>`;
                var str = `
                  <div class="iconBox">
                    <div class="popup">
                      <div class="option-item">办理</div>
                      <div class="option-item">委派</div>  
                      <div class="option-item">传阅</div>  
                      <div class="option-item">打印</div>
                    </div>
                    <svg class="moreaction" width="15" height="20" viewBox="0 0 520 520" fill="none" role="presentation" data-v-69a58868=""><path d="M83 140h354c10 0 17 13 9 22L273 374c-6 8-19 8-25 0L73 162c-7-9-1-22 10-22z" fill="#747474" data-v-69a58868=""></path></svg></div>
                `
                return str;
              }
          },
          {
            field: 'IsRead', title: '已读', sortable: true, formatter: function (value, row, index) {
              if (value == 'True' || value == 'true' || value == true) {
                return '<img style=\"height:18px;width:24px;margin-left:7px;\" src="' + imgUrl + '" />';
              }
              else {
                return '';
              }
            }
          },
          { field: 'Name', title: '标题', sortable: true },
          { field: 'PriorityName', title: '紧急程度', sortable: true },
          { field: 'ToActivityName', title: '当前环节', sortable: true },
          { field: 'FromActivityName', title: '来源环节', sortable: true },
          { field: 'CreatedByName', title: '来源提交人', sortable: true },
          { field: 'CreatedOn', title: '来源提交', sortable: true },
          { field: 'StartByName', title: '发起人姓名', sortable: true },
          { field: 'StartedOn', title: '发起时间', sortable: true },
          { field: 'BusinessUnitIdName', title: '发起人部门', sortable: true },
          { field: 'Deadline', title: '办理期限', sortable: true },
          { field: 'ProcessIdName', title: '流程', sortable: true },
        ]
        this.$nextTick(() => {
          var height = this.tableHeight;
          $('#datagrid').datagrid({
            url: '/localData/datalist.json',
            method: "get",
            columns: [columns],
            // data: tableList,
            singleSelect: false,
		        checkOnSelect: false,
            pagination: true,
            pageNumber: 1,
            pageSize: 10,
            fit: true,
            striped: false,
            rownumbers: true,
            onLoadSuccess: function () {
              $('#datagrid').datagrid('resize', { height: height });
            }
          });
        })
      }
    },
  }
</script>
<style lang="less">
  .iconBox{
    position: relative;
    cursor: pointer;
  }
  .icon.img{
    width: 20px;
    height: 20px;
    cursor: pointer;
  }
  .iconBox:hover .popup{
    display: block;
  }
  .popup{
    position: absolute;
    top: 0;
    min-width: 100px;
    background: #fff;
    display: none;
    z-index: 999999;
    box-shadow: 0 1px 6px hsla(0,0%,39%,.2);
    border: 1px solid #d9d9d9;
    border-radius: 6px;
  }
  .popup .option-item{
    padding: 7px 15px;
    font-size: 12px;
    border-radius: 6px 6px 0 0;
  }
  .popup .option-item:hover{
    background: #eaf8fe;
  }
  td[field="Action"] .datagrid-cell{
    overflow: initial !important;
  }
  :deep .iconBox{
  text-align: center;
  .popup{
    text-align: left;
    top: 20px;
  }
  .moreaction{
    padding: 0px 1px;
    width: 18px;
    border: 1px solid #dedede;
    border-radius: 4px;
    position: relative;
    top: 1px;
  }
}
</style>