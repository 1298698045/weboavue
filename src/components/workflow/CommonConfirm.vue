<template>
  <div>
    <a-modal
      v-model:open="props.isShow"
      width="800px"
      :style="setTop"
      :maskClosable="false"
      @cancel="handleCancel"
      @ok="handleSubmit"
    >
      <template #title>
        <div class="modal_title">{{ props.title||'' }}</div>
      </template>
      <div class="modalContainer CommonConfirm" ref="modelContentRef">
        <p style="text-align: center;padding: 16px 0;">
          {{ props.text||'' }}
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
  text: String,
  title:String,
  id:String,
  objTypeCode:String,
});
const emit = defineEmits(["cancel", "ok"]);
const modelContentRef = ref(null);

const handleCancel = () => {
  emit("cancel", false);
};
const handleSubmit = () => {
  if(props.title=='失效'){
    let url=Interface.edit;
        let d = {
        actions:[{
            id: "2919;a",
            descriptor: "",
            callingDescriptor: "UNKNOWN",
            params: {
              recordInput: {
                allowSaveOnDuplicate: false,
                apiName:props.objTypeCode=='100201'?'Content':'Notice',
                objTypeCode: props.objTypeCode,
                fields: {
                  StatusCode: 2,
                }
              }              
            }
        }]
    };
    if(props.id){
        d.actions[0].params.recordId=props.id;
    }
    let obj = {
        message: JSON.stringify(d)
    }
        proxy.$post(url,obj).then(res=>{
          if(res&&res.actions&&res.actions[0]&&res.actions[0].state&&res.actions[0].state=='SUCCESS'){
            message.success("操作成功！");
          }
          else{
            if(res&&res.actions&&res.actions[0]&&res.actions[0].state&&res.actions[0].errorMessage){
                message.success(res.actions[0].errorMessage);
            }
            else{
                message.success("操作失败！");
            }
          }
          emit("ok", false);
        });
  }
  else{
    if(props.id){
      emit("ok", props.id);
    }
    else{
      emit("ok", false);
    }
  }
};
const data = reactive({
  top: ""
});
const { top } = toRefs(data);

onMounted(()=>{
    let h = modelContentRef.value.clientHeight;
    data.top = (h + 126) / 2 + 'px';
})
const setTop = computed(() => ({
    top: `calc(50% - ${data.top})`
}));
</script>
<style lang="less">
@import url("@/style/modal.less");
.CommonConfirm p{
    text-align: center;
    padding: 15px 0px !important;
    font-size: 16px;
}
</style>
