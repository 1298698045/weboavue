<template>
  <div class="WFFormPrint">
    <FlowForm ref="flowFormRef" v-if="processId!=''" :processId="processId" :processInstanceId="processInstanceId"
      :toActivityID="toActivityID" print="1" />
  </div>
</template>
<script setup>
  import { ref, reactive, onMounted, toRefs, getCurrentInstance, defineEmits, toRaw, watch, nextTick } from "vue";
  import {
    UnorderedListOutlined,
    DownOutlined,
    CaretDownOutlined,
    DeleteFilled,
    DeleteOutlined,
    UpOutlined,
    PlusOutlined,
    EditOutlined
  } from "@ant-design/icons-vue";
  import { message } from "ant-design-vue";
  import FlowForm from "@/components/workflow/FlowForm.vue";
  import Interface from "@/utils/Interface.js";
  const { proxy } = getCurrentInstance();
  import { useRouter, useRoute } from "vue-router";
  const route = useRoute();
  const router = useRouter();
  const flowFormRef = ref(null);
  const data = reactive({
    ruleLogId: route.query.id,
    processId: "",
    processInstanceId: "",
    toActivityID: "",
    processInstanceName: "",
    fromActivityId: ""
  });
  const { ruleLogId, processId, processInstanceId, toActivityID, processInstanceName, fromActivityId } = toRefs(data);

  const getRuleLogData = () => {
        let obj = {
            actions: [{
                id: "4270;a",
                descriptor: "aura://RecordUiController/ACTION$getRecordWithFields",
                callingDescriptor: "UNKNOWN",
                params: {
                    recordId: data.ruleLogId,
                    apiName: "WFRuleLog"
                }
            }]
        }
        let d = {
            message: JSON.stringify(obj)
        }
        proxy.$post(Interface.detail, d).then(res=>{
            if(res && res.actions && res.actions[0].returnValue){
                let { ProcessId, ProcessInstanceId, ToActivityID } = res.actions && res.actions[0].returnValue.fields;
                data.processId = ProcessId.value;
                data.processInstanceName = ProcessInstanceId.displayValue;
                data.processInstanceId = ProcessInstanceId.value;
                data.toActivityID = ToActivityID.value;
                data.fromActivityId = FromActivityId.value;
            }
        });
    };
    getRuleLogData();

    onMounted(()=>{
      // setTimeout(() => {
      //   window.print();
      // }, 5000);
    })

</script>
<style lang="less" scoped>
  .WFFormPrint{
    
  }
</style>