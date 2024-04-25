<template>
    <div>
      <a-modal
        v-model:open="props.isShow"
        width="800px"
        :maskClosable="false"
        @cancel="handleCancel"
        @ok="handleSubmit"
      >
        <template #title>
          <div>删除  考勤</div>
        </template>
        <div class="modalContainer" style="padding: 10px 0;">
          <p style="text-align: center;">
            你确定要删除你选择的员工考勤吗？
          </p>
          <div style="text-align: center;padding-top: 10px;">
            <a-checkbox></a-checkbox>是否从本科室移除
          </div>
        </div>
        <template #footer>
          <div>
            <a-button @click="handleCancel">取消</a-button>
            <a-button type="primary" @click.prevent="handleSubmit">确定</a-button>
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
  } from "vue";
  import { SearchOutlined, DeleteOutlined } from "@ant-design/icons-vue";
  import Interface from "@/utils/Interface.js";
  
  const { proxy } = getCurrentInstance();
  import { message } from "ant-design-vue";
  const labelCol = ref({ style: { width: "100px" } });
  const props = defineProps({
    isShow: Boolean,
    desc:{
      type: String,
      default: "如果您删除此列表视图，该视图将为所有具备访问权限的用户永久删除。是否确定要删除？"
    },
    unitId: String,
    yearNumber: [String, Number],
    monthNumber: [String, Number],
    empSelects: Array
  });
  const emit = defineEmits(["cancel", "ok"]);
  
  const data = reactive({
    listData: [],
    targetKeys: [],
    selectedKeys: [],
    list: [
      {
        sortField: "",
        sortMethod: "",
      },
    ],
  });
  const { listData, targetKeys, selectedKeys, list } = toRefs(data);
  const mockData = [];
  for (let i = 0; i < 20; i++) {
    mockData.push({
      key: i.toString(),
      title: `content${i + 1}`,
      description: `description of content${i + 1}`,
      // disabled: i % 3 < 1,
    });
  }
  const oriTargetKeys = mockData
    .filter((item) => +item.key % 3 > 1)
    .map((item) => item.key);
  const disabled = ref(false);
  // const targetKeys = ref(oriTargetKeys);
  // const selectedKeys = ref(['1', '4']);
  const handleChange = (nextTargetKeys, direction, moveKeys) => {
    console.log("targetKeys: ", nextTargetKeys);
    console.log("direction: ", direction);
    console.log("moveKeys: ", moveKeys);
  };
  const handleSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
    console.log("sourceSelectedKeys: ", sourceSelectedKeys);
    console.log("targetSelectedKeys: ", targetSelectedKeys);
  };
  const handleScroll = (direction, e) => {
    console.log("direction:", direction);
    console.log("target:", e.target);
  };
  
  const getQuery = () => {
    proxy.$get(Interface.entityFilter, {}).then((res) => {
      console.log("entityFilter", res);
      let attributes = res.entity.attributes.map((item) => {
        item.title = item.label + item.name;
        item.key = item.name;
        return item;
      });
      data.listData = attributes;
      let ColumnSet = res.filter[0].ColumnSet.split(",");
      // let temp = data.listData.filter(item=>{
      //     return ColumnSet.find(row=>{
      //         return row == item.key;
      //     })
      // })
      data.targetKeys = ColumnSet;
    });
  };
  const handleAddRowField = () => {
    data.list.push({
      sortField: "",
      sortMethod: "",
    });
  };
  const handleDelteField = (item, index) => {
    data.list.splice(index, 1);
  };
//   getQuery();
  const handleCancel = () => {
    emit("cancel", false);
  };
  const handleSubmit = () => {
    // emit("ok", false);
    let d = {
        yearNumber: props.yearNumber,
        monthNumber: props.monthNumber,
        startDate: "",
        endDate: "",
        objectTypeCode:  10,
        unitId: props.unitId,
        employeeIds: props.empSelects.map(item=>item.EmployeeId).join(',')
    };
    proxy.$get(Interface.attd.clearAttdLeave, d).then(res=>{
        message.success("删除成功!");
        emit("cancel", false);
    })
  };
  </script>
  <style lang="less">
  @import url("@/style/modal.less");
  </style>
  