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
            <div class="searchForm">
                <a-input-search
                    v-model:value="searchVal"
                    placeholder="请输入名称"
                    size="large"
                    @search="onSearch"
                    >
                    <template #enterButton>
                        <a-button>搜索</a-button>
                    </template>
                </a-input-search>
            </div>
            <Dtable ref="gridRef" :columns="columns" :gridUrl="gridUrl" :tableHeight="tableHeight" :isCollapsed="isCollapsed"></Dtable>
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
    title: "筛选器",
    height: document.documentElement.clientHeight - 300,
    columns: [
        {
          field: 'ids',
          checkbox: true
        },
    ],
    isCollapsed: false,
    tableHeight: document.documentElement.clientHeight - 370,
    id: inject("processId"),
    searchVal: ""
  });
  const gridUrl = ref(Interface.lookSearch);
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
      data.tableHeight = document.documentElement.clientHeight - 370
    });
  });

  const getConfig = () => {
    proxy.$get(Interface.lookupfilter,{
        objectTypeCode: ""
    }).then(res=>{
        res.returnValue.GridColumns.forEach(item=>{
            data.columns.push({
                field: item.Name,
                title: item.Title,
                width: item.Width,
                sortable: true,
            })
        })
        gridRef.value.loadGrid();
    })
  }
  getConfig();
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
  