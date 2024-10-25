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
});
const emit = defineEmits(["cancel", "ok"]);
const modelContentRef = ref(null);

const handleCancel = () => {
  emit("cancel", false);
};
const handleSubmit = () => {
  emit("ok", false);
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
