<template>
  <div>
    <DataGrid :data="tableList" :pagination="true" :total="total"
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
    </DataGrid>
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
  console.log("tableList",tableList)
  export default {
      props:['tableHeight'],
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
              pagePosition:"bottom",
              tableList: tableList
          }
      },
      computed:{
        gridHeight(){
          return this.tableHeight
        }
      }
  }
</script>