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
        <div class="modalContainer">
          <div class="modalCenter" :style="{ height: height + 'px!important' }">
            <Dtable ref="gridRef" :columns="columns" :gridUrl="gridUrl" :tableHeight="tableHeight" :isCollapsed="isCollapsed"></Dtable>
          </div>
        </div>
        <template #footer>
          <div>
              <a-button type="primary" @click.prevent="handleBatchAdd">批量添加</a-button>
              <a-button type="primary" @click.prevent="handleAllAddPeople">全部添加</a-button>
            <a-button @click="handleCancel">取消</a-button>
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
  } from "@ant-design/icons-vue";
  import { message } from "ant-design-vue";
  import Dtable from "@/components/Dtable.vue";
  import Interface from "@/utils/Interface.js";
  const { proxy } = getCurrentInstance();
  console.log(document.documentElement.clientHeight);
  const labelCol = ref({ style: { width: "100px" } });
  const props = defineProps({
    isShow: Boolean
  });
  const formRef = ref();
  const emit = defineEmits(["cancel"]);
  const handleCancel = () => {
    emit("cancel", false);
  };
  const gridRef = ref();

  const addPeopleRow = (id) => {
    // console.log("id", id);
    let d = {
        objectTypeCode: 10,
        unitId: "",
        ToDept: "",
        startDate: "",
        endDate: "",
        // yearNumber: formState.yearNumber,
        // monthNumber: formState.monthNumber,
        employeeId: id,
        // transferType: formState.transferType
    }
    proxy.$get(Interface.attd.transferdeptIn, d).then((res) => {
        message.success("保存成功！");
        emit("cancel", false);
    });
  };


  const handleBatchAdd = () => {
    console.log("gridRef", gridRef.value.getCheckList());
    let list = gridRef.value.getCheckList();
    list.forEach(item=>{
        addPeopleRow(item.EmployeeId);
    })
  };

  const handleAllAddPeople = () => {

  };

  window.addPeopleRow = addPeopleRow;

  function formatAdd(value, row) {
    if (value == null) {    
        value = row["ValueId"];
    }
    return "<a  href='javascript:;' class='workshift-delete' id='" + value + "' onclick=\"addPeopleRow('"+row.EmployeeId+"')\" >添加</a>";
  }

  const data = reactive({
    title: "未添加人员列表",
    height: document.documentElement.clientHeight - 300,
    columns: [
        { field: 'Ids', checkbox: true, halign: 'center' },
        { field: 'EmployeeId', title: "操作", formatter: formatAdd, halign: 'center' },
        { field: 'Name', title: "姓名", sortable: true, halign: 'center' },
        { field: 'EmployeeNo', title: "工号", halign: 'center' },
        { field: 'DeptIdName', title: "部门", halign: 'center' }
    ],
    isCollapsed: false,
    tableHeight: document.documentElement.clientHeight - 320,
    id: inject("processId"),
    searchVal: ""
  });
  const gridUrl = ref(Interface.attd.notPeopleList);
  const {
    title,
    height, columns, isCollapsed, tableHeight, searchVal
  } = toRefs(data);
  const formState = reactive({
    searchVal: ""
  });
  const handleMenu = (e)=> {
    let item = data.menus.find(item=>item.key==e.key);
    data.currentMenu = item.name;
    data.currentKey = item.key;
    getLook();
}
const onSearch = (e) => {
    gridRef.value.loadGrid();
}
  onMounted(() => {
    window.addEventListener("resize", (e) => {
      data.height = document.documentElement.clientHeight - 300;
      data.tableHeight = document.documentElement.clientHeight - 320
    });
    gridRef.value.loadGrid();
  });
  const handleSubmit = () => {
    let list = gridRef.value.getCheckList();
    console.log("checklist", list);
    if(list.length){
        let objectIds = list.map(item=>{
            return '1039:'+item.LIST_RECORD_ID;
        }).join(',');
        let obj = {
            processId: data.id,
            objectIds: objectIds,
            rightCode: 32
        }
        proxy.$get(Interface.flow.datapriAdd,obj).then(res=>{
            message.success("保存成功！");
            emit("cancel", false);
        })
    }else {
        message.error("至少选择一项！")
    }
  };
  </script>
  <style lang="less">
  @import url("@/style/modal.less");
    .searchForm{
        width: 300px;
        margin-bottom: 10px;
    }
  </style>
  