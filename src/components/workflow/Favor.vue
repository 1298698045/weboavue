<template>
  <div>
      <a-modal v-model:open="props.isShow" width="600px" :style="setTop" :maskClosable="false" @cancel="handleCancel" @ok="handleSubmit">
          <template #title>
              <div>
                  收藏
               </div>
          </template>
          <div class="modalContainer Favor" ref="modelContentRef">
              <div class="modalCenter">
                  <a-form
                      ref="formRef"
                      :label-col="labelCol"
                      :model="formState">
                      <a-form-item label="收藏" name="noticeMethod">
                          <a-input type="checkbox" v-model:checked="formState.noticeMethod" class="CalendarCheckbox"></a-input>
                      </a-form-item>
                      <a-form-item label="备注：" name="Description" class="Description">
                          <a-textarea :rows="3" v-model:value="formState.Description" />
                      </a-form-item>
                      
                  </a-form>
              </div>
          </div>
          <template #footer>
              <div>
                  <a-button type="primary" @click.prevent="handleSubmit">确定</a-button>
                  <a-button @click="handleCancel">取消</a-button>
              </div>
          </template>
      </a-modal>
  </div>
</template>
<script setup>
  import {
      ref,
      reactive,
      watch,
      h,
      defineComponent,
      onMounted,
      defineProps,
      toRefs,
      getCurrentInstance,
      defineExpose,
      defineEmits,
      computed
  } from "vue";
  import { PieChartOutlined } from "@ant-design/icons-vue";
  import Interface from "@/utils/Interface.js";
  const { proxy } = getCurrentInstance();
  const props = defineProps({
      paramsData: Object,
      isShow: Boolean
  });
  const isModal = ref(true);
  const labelCol = ref({ style: { width: '100px' } });
  const emit = defineEmits(['update-status']);
  const handleSubmit = () => {
      handleCancel();
  }
  const handleCancel = () => {
      emit("update-status",false);
  }
  const formState = reactive({
      ProcessName: "",
      BusinessUnitId:"",
      Title:"",
      Priority:"0",
      Description:"",
      BusinessUnitList: [],
      noticeMethod: []
  })
  const modelContentRef = ref(null);
  onMounted(()=>{
      //formState.ProcessName = props.paramsData.InstanceIdName;
      let h = modelContentRef.value.clientHeight;
      data.top = (h + 180) / 2 + 'px';
  })
  const setTop = computed(() => ({
      top: `calc(50% - ${data.top})`
  }));
  defineExpose({isModal})
</script>
<style lang="less">
  .ant-modal-content{
  padding: 0 !important;
  .ant-modal-header{
      border-bottom: 2px solid #e5e6eb;
      padding: 12px;
      font-size: 16px;
      color: #000;
      text-align: center;
  }
  .ant-modal-footer{
      border-top: 2px solid #e5e6eb;
      padding: 16px 20px;
      box-sizing: border-box;
  }
  .Favor{
      .modalCenter{
          padding: 10px 15px;
          box-sizing: border-box;
          height: 300px;
          overflow-y: auto;
          .form-tip {
              font-size: 12px;
              margin-bottom: 12px;
              color: #606266;
          }
          .ProcessName {
              color: var(--textColor);
          }
          .form-tip1 {
              font-size: 12px;
              color: red;
              line-height: 8px;
              margin-top: 10px;
              margin-bottom: 7px;
          }
          .processTitle .ant-form-item-required{
              color: red !important;
          }
          :where(.css-dev-only-do-not-override-kqecok).ant-form-horizontal .ant-form-item-label{
              width: 50px !important;
          }
          :where(.css-dev-only-do-not-override-kqecok).ant-form-item .ant-form-item-control-input-content{
              flex: unset;
              line-height: 34px;
          }
          textarea:where(.css-dev-only-do-not-override-kqecok).ant-input{
              width: 510px !important;
              display: inline-block;
          }
      }
  }
}
</style>