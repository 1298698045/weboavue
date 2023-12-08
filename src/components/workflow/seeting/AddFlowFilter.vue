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
            <FilterQuery :FilterExpresssionList="FilterExpresssionList" @params="getFilterQuery"></FilterQuery>
          </div>
        </div>
        <template #footer>
          <div>
            <a-button @click="handleCancel">取消</a-button>
            <a-button type="primary" @click.prevent="handleSubmit">保存</a-button>
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
  import FilterQuery from "@/components/FilterQuery.vue";
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
  const data = reactive({
    title: "新建筛选器",
    height: document.documentElement.clientHeight - 300,
    id: inject("processId"),
    FilterExpresssionList: [],
    filterExpression: ""
  });
  const {
    title,
    height, id, FilterExpresssionList, filterExpression
  } = toRefs(data);
  const formState = reactive({
    searchVal: ""
  });
  
  const getFilterQuery = (e) => {
    data.filterExpression = e;
  }
  onMounted(() => {
    window.addEventListener("resize", (e) => {
      data.height = document.documentElement.clientHeight - 300;
      data.tableHeight = document.documentElement.clientHeight - 370
    });
  });

  const handleSubmit = () => {
    if(data.filterExpression){
        let obj = {
            processId: data.id,
            filterExpression: data.filterExpression,
        }
        proxy.$get(Interface.flow.usepriAdd,obj).then(res=>{
            message.success("保存成功！");
            emit("cancel", false);
        })
    }else {
        message.error("至少填写一条条件！")
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
  