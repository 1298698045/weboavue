<template>
    <div class="WFFormPrint">
        <div class="header noprint">
            <div class="operate">
                <a-button type="primary" @click="handlePrint">打印</a-button>
                <a-button type="primary" class="ml10" @click="handleExportPdf">导出PDF</a-button>
            </div>
        </div>
        <div ref="pdfContent">
            <div class="form-container-item" v-for="(item, index) in formList" :key="index">
                <FlowFormNew print="1" v-if="item.processId!=''" :processId="item.processId"
                    :processInstanceId="item.processInstanceId" :toActivityID="toActivityID" />
            </div>
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
        toActivityID: "",
        ids: [],
        formList: []
    });

    const { toActivityID, ids, formList } = toRefs(data);


    const handleFormList = async () => {
        let requests = data.ids.map(item => {
            let obj = {
                actions: [{
                    id: "4270;a",
                    descriptor: "aura://RecordUiController/ACTION$getRecordWithFields",
                    callingDescriptor: "UNKNOWN",
                    params: {
                        recordId: item,
                        apiName: "WFProcessInstance"
                    }
                }]
            };
            let d = {
                message: JSON.stringify(obj)
            }
            return proxy.$post(Interface.detail, d);
        });
        const results = await Promise.all(requests);
        let temp = [];
        results.forEach(item => {
            let { ProcessId, ProcessInstanceId } = item.actions[0].returnValue.fields;
            let obj = {
                processId: ProcessId.value,
                processInstanceId: ProcessInstanceId.value,
                processInstanceName: ProcessInstanceId.displayValue
            };
            temp.push(obj);
        });
        data.formList = temp;
    }
    const loadQuery = async () => {
        // if (route.query.ids) {
        //     data.ids = route.query.ids.split(',');
        //     await handleFormList();
        // }
        const ids = localStorage.getItem("batchPrintIds");
        if (ids) {
            data.ids = ids.split(',');
            await handleFormList();
        }
    }
    loadQuery();

    onMounted(() => {

    });

    const handlePrint = () => {
        window.print();
    };


    const handleExportPdf2 = async () => {
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

        const imgWidth = contentWidth * scaleFactor * 2;
        const imgHeight = contentHeight * scaleFactor * 2;
        const marginX = (pdfWidth - imgWidth) / 2;
        const marginY = (pdfHeight - imgHeight) / 2;
        pdf.addImage(imgData, 'PNG', marginX, marginY, imgWidth, imgHeight);
        pdf.save("批量导出表单" + '.pdf');
    };

    const handleExportPdf3 = async () => {
        const forms = document.querySelectorAll('.form-container-item'); // 找到所有表单
        const pdf = new jsPDF('p', 'mm', 'a4');

        const a4WidthMM = 210;
        const a4HeightMM = 297;
        const marginMM = 10; // 上下左右留白

        const a4ContentWidthMM = a4WidthMM - marginMM * 2;
        const a4ContentHeightMM = a4HeightMM - marginMM * 2;

        const dpi = 96; // html2canvas的标准dpi
        const mmToPxRatio = dpi / 25.4; // 1mm = 3.7795px

        const a4ContentWidthPx = a4ContentWidthMM * mmToPxRatio;
        const a4ContentHeightPx = a4ContentHeightMM * mmToPxRatio;

        for (let i = 0; i < forms.length; i++) {
            const form = forms[i];

            // ⚡ 注意这里 scale 提高一点，截图更清晰
            const canvas = await html2canvas(form, {
                scale: 2, // 提高清晰度
                useCORS: true,
                allowTaint: true,
            });

            const contentWidth = canvas.width;
            const contentHeight = canvas.height;

            const imgData = canvas.toDataURL('image/jpeg', 1.0);

            // ⚡ 计算宽度放缩比例，适配A4内容区
            const scale = a4ContentWidthPx / contentWidth;
            const scaledHeightPx = contentHeight * scale;

            // ⚡ A4内容区能放多少像素
            const pageHeightPx = a4ContentHeightPx;

            let renderedHeight = 0;

            while (renderedHeight < contentHeight) {
                if (i !== 0 || renderedHeight !== 0) {
                    pdf.addPage();
                }

                const pageCanvas = document.createElement('canvas');
                pageCanvas.width = contentWidth;
                pageCanvas.height = Math.min(contentHeight - renderedHeight, pageHeightPx / scale);

                const pageCtx = pageCanvas.getContext('2d');
                pageCtx.fillStyle = '#FFFFFF';
                pageCtx.fillRect(0, 0, pageCanvas.width, pageCanvas.height);

                pageCtx.drawImage(
                    canvas,
                    0,
                    renderedHeight,
                    contentWidth,
                    pageCanvas.height,
                    0,
                    0,
                    contentWidth,
                    pageCanvas.height
                );

                const pageImgData = pageCanvas.toDataURL('image/jpeg', 1.0);

                const imgHeightMM = (pageCanvas.height * 25.4) / dpi * scale;
                const imgWidthMM = a4ContentWidthMM;

                pdf.addImage(
                    pageImgData,
                    'JPEG',
                    marginMM,
                    marginMM,
                    imgWidthMM,
                    imgHeightMM
                );

                renderedHeight += pageCanvas.height;
            }
        }

        pdf.save('exported_forms.pdf');
    };

    const handleExportPdf = async () => {
        const elements = document.querySelectorAll('.form-container-item'); // 你所有表单的 class

        const pdf = new jsPDF('p', 'mm', 'a4');
        const pageWidth = pdf.internal.pageSize.getWidth(); // 210mm
        const pageHeight = pdf.internal.pageSize.getHeight(); // 297mm

        for (let i = 0; i < elements.length; i++) {
            const element = elements[i];

            // 重点1：高倍数 scale 提高清晰度
            const canvas = await html2canvas(element, {
                scale: 3,
                useCORS: true,
            });

            const imgData = canvas.toDataURL('image/jpeg', 1.0);

            const imgProps = pdf.getImageProperties(imgData);
            const imgWidth = imgProps.width;
            const imgHeight = imgProps.height;

            // 重点2：自己手动算比例，放到A4宽度拉伸
            const ratio = imgWidth / imgHeight;
            const pdfW = pageWidth; // A4的宽
            const pdfH = pageHeight / ratio; // 高度等比缩放

            if (pdfH > pageHeight) {
                // 图片高度超A4，分页处理
                let position = 0;
                let remainingHeight = pdfH;
                while (remainingHeight > 0) {
                    pdf.addImage(imgData, 'JPEG', 0, position, pdfW, pdfH);
                    remainingHeight -= pageHeight;
                    if (remainingHeight > 0) {
                        pdf.addPage();
                        position = -remainingHeight + pdfH;
                    }
                }
            } else {
                // 图片小于一页，居中或者顶端显示
                const yOffset = (pageHeight - pdfH) / 2; // 想居中
                pdf.addImage(imgData, 'JPEG', 0, yOffset, pdfW, pdfH);
            }

            if (i < elements.length - 1) {
                pdf.addPage();
            }
        }

        pdf.save('download.pdf');
    }

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

        @page {
            size: A4;
            margin: 0;
        }

        body {
            margin: 0;
        }

        .form-container-item {
            width: 210mm;
            min-height: 297mm;
            page-break-after: always;
            page-break-inside: avoid;
            box-sizing: border-box;
            padding: 20mm;
        }
    }
</style>