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
          <div>{{title}}</div>
        </template>
        <div class="modalContainer">
          <p style="text-align: center;line-height: 30px;">
            {{status==0?'你确定要撤销提交考勤吗？':'你确定要提交考勤吗？'}}
          </p>
          <div style="text-align: center;line-height: 30px;">
            上月考勤人数{{attdNums[1]?.Count}}
          </div>
          <div style="text-align: center;line-height: 30px;">
            本月考勤人数{{attdNums[0]?.Count}}
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
  import dayjs from 'dayjs';
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
    status: [String, Number],
    time: String
  });
  const emit = defineEmits(["cancel", "ok"]);
  
  const data = reactive({
    title: "提交考勤",
    listData: [],
    targetKeys: [],
    selectedKeys: [],
    list: [
      {
        sortField: "",
        sortMethod: "",
      },
    ],
    attdNums: []
  });
  const { listData, targetKeys, selectedKeys, list, title, attdNums } = toRefs(data);
  if(props.status==0){
    data.title = "撤销提交考勤";
  }
  const getQuery = () => {
    let startDate = dayjs(props.time).startOf('month').format('YYYY-MM-DD');
    let endDate = dayjs(props.time).endOf('month').format('YYYY-MM-DD');
    let d = {
        startDate: startDate,
        endDate: endDate,
        unitId: props.unitId
    }
    proxy.$get(Interface.attd.monthtips, d).then(res=>{
        data.attdNums = res.data.Table;
    })
  };
  getQuery();
  const handleCancel = () => {
    emit("cancel", false);
  };
  const handleSubmit = () => {
    // emit("ok", false);
    let d = {
        yearNumber: props.yearNumber,
        monthNumber: props.monthNumber,
        objectTypeCode:  10,
        unitId: props.unitId,
        status: props.status,
        desc: ""
    };
    proxy.$get(Interface.attd.submitAttd, d).then(res=>{
        message.success("提交成功!");
        emit("cancel", false);
    })
  };
  </script>
  <style lang="less">
  @import url("@/style/modal.less");
  </style>
  