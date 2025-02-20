<template>
  <div class="WFFormPrint">
    <div class="header noprint">
      <div class="operate">
        <a-button type="primary" @click="handlePrint">打印</a-button>
        <a-button type="primary" class="ml10" @click="handleExportPdf">导出PDF</a-button>
      </div>
    </div>
    <div ref="pdfContent">
      <!-- <FlowForm ref="flowFormRef" v-if="processId!=''" :processId="processId" :processInstanceId="processInstanceId"
        :toActivityID="toActivityID" print="1" /> -->
        <FlowFormNew print="1" ref="flowFormRef" v-if="processId!=''"
        :processId="processId" :processInstanceId="processInstanceId"
        :toActivityID="toActivityID" />
    </div>
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
  // import FlowForm from "@/components/workflow/FlowForm.vue";
  // import FlowFormNew from "@/components/workflow/FlowFormNew.vue";
  import FlowFormNew from "@/components/workflow/FlowFormNewPreview.vue";
  import Interface from "@/utils/Interface.js";
  import html2canvas from 'html2canvas';
  import jsPDF from 'jspdf';
  const { proxy } = getCurrentInstance();
  import { useRouter, useRoute } from "vue-router";
  const route = useRoute();
  const router = useRouter();
  const flowFormRef = ref(null);
  const pdfContent = ref(null);
  const data = reactive({
    ruleLogId: "",
    processId: "",
    processInstanceId: route.query.id,
    toActivityID: "",
    processInstanceName: "",
    fromActivityId: ""
  });
  const { ruleLogId, processId, processInstanceId, toActivityID, processInstanceName, fromActivityId } = toRefs(data);


  const getProcessInstanceDetail = () => {
        let obj = {
            actions: [{
                id: "4270;a",
                descriptor: "aura://RecordUiController/ACTION$getRecordWithFields",
                callingDescriptor: "UNKNOWN",
                params: {
                    recordId: data.processInstanceId,
                    apiName: "WFProcessInstance"
                }
            }]
        }
        let d = {
            message: JSON.stringify(obj)
        }
        proxy.$post(Interface.detail, d).then(res => {
            if (res && res.actions && res.actions[0].returnValue) {
                let { ProcessId, ProcessInstanceId, ToActivityId, FromActivityId } = res.actions[0].returnValue.fields;
                data.processId = ProcessId.value;
                data.processInstanceName = ProcessInstanceId.displayValue;
            }
        });
    };
    getProcessInstanceDetail();

  onMounted(() => {
    // setTimeout(() => {
    //   window.print();
    // }, 5000);
  })

  const handlePrint = () => {
    window.print();
  };

  // const handleExportPdf = async () => {
  //   const content = pdfContent.value;
  //   console.log("content", content);
  //   const canvas = await html2canvas(content);
  //   const imgData = canvas.toDataURL('image/png');
  //   const doc = new jsPDF({
  //     orientation: 'portrait',
  //     unit: 'px',
  //     format: 'a4',
  //   });
  //   const imgProps= doc.getImageProperties(imgData);
  //   const pdfWidth = doc.internal.pageSize.getWidth();
  //   const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
  //   doc.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
  //   doc.save(data.processInstanceName+'.pdf');
  // }

  const handleExportPdf = async () => {
    const content = pdfContent.value;
    const contentWidth = content.offsetWidth;
    const contentHeight = content.offsetHeight;
    const canvas = await html2canvas(content, {
      scale: 2, // 提高截图分辨率
      useCORS: true, // 允许跨域图片
    });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'px',
      format: 'a4',
    });
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const scaleFactor = Math.min(pdfWidth / contentWidth, pdfHeight / contentHeight);

    const imgWidth = contentWidth * scaleFactor;
    const imgHeight = contentHeight * scaleFactor;
    const marginX = (pdfWidth - imgWidth) / 2;
    const marginY = (pdfHeight - imgHeight) / 2;
    pdf.addImage(imgData, 'PNG', marginX, marginY, imgWidth, imgHeight);
    pdf.save(data.processInstanceName + '.pdf');
  };

</script>
<style lang="less" scoped>
  .WFFormPrint {
    .header {
      display: flex;
      justify-content: flex-end;
      padding: 20px;
    }
  }
</style>
<style lang="less">
  @media print {
    .noprint {
      display: none !important;
    }
  }
</style>