<template>
  <div>
    <a-modal v-model:open="props.isShow" width="800px" :style="setTop" :maskClosable="false" @cancel="handleCancel"
      @ok="handleSubmit">
      <template #title>
        <div class="modal_title">删除</div>
      </template>
      <div class="modalContainer" ref="modelContentRef">
        <p style="text-align: center;padding: 16px 0;" v-if="desc">
          {{ desc }}
        </p>
        <slot></slot>
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
    computed
  } from "vue";
  import { SearchOutlined, DeleteOutlined } from "@ant-design/icons-vue";
  import { message } from "ant-design-vue";
  import Interface from "@/utils/Interface.js";

  const { proxy } = getCurrentInstance();
  const labelCol = ref({ style: { width: "100px" } });
  const props = defineProps({
    isShow: Boolean,
    sObjectName: String,
    recordId: String,
    desc: {
      type: String,
      default: "如果您删除此列表视图，该视图将为所有具备访问权限的用户永久删除。是否确定要删除？"
    },
    objTypeCode: String,
    external: {
      type: Boolean,
      default: false
    }
  });
  const emit = defineEmits(["cancel", "ok"]);
  const modelContentRef = ref(null);

  const handleCancel = () => {
    emit("cancel", false);
  };
  const handleSubmit = () => {
    if(!props.external){
      let obj = {
        actions: [{
          id: "2919;a",
          descriptor: "",
          callingDescriptor: "UNKNOWN",
          params: {
            recordId: props.recordId,
            apiName: props.sObjectName,
            objTypeCode: props.objTypeCode,
          }
        }]
      };
      let d = {
        message: JSON.stringify(obj)
      };
      proxy.$post(Interface.delete, d).then(res => {
        if (res && res.actions && res.actions[0] && res.actions[0].state == 'SUCCESS') {
          message.success("删除成功");
          emit("ok", false);
        } else {
          if (res && res.actions && res.actions[0] && res.actions[0].errorMessage) {
            message.success(res.actions[0].errorMessage);
          }
          else {
            message.error("删除失败");
          }
        }
        emit("cancel", false);
      })
    }else {
      emit("ok", false);
    }
  };
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
    top: ""
  });
  const { listData, targetKeys, selectedKeys, list, top } = toRefs(data);
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
  //getQuery();
  onMounted(() => {
    let h = modelContentRef.value.clientHeight;
    data.top = (h + 126) / 2 + 'px';
  })
  const setTop = computed(() => ({
    top: `calc(50% - ${data.top})`
  }));
</script>
<style lang="less">
  @import url("@/style/modal.less");
</style>