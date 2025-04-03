<template>
  <div>
    <a-modal v-model:open="props.isShow" width="900px" class="invoiceDetailModal" style="top:38px;"
      :maskClosable="false" @cancel="handleCancel" @ok="handleSubmit">
      <template #title>
        <div class="titleLeft">发票详情</div>
      </template>
      <div class="modalContainer invoiceDetailWrap">
        <div class="modalCenter" :style="{ height: height + 'px' }">
          <div class="detailInfo">
            <div class="detailTitle">{{ props.InvoiceType || '电子发票（普通发票）' }}</div>
            <div class="fh-section" v-for="(item, index) in layoutList" :key="index">
              <!-- <div class="fh-section-label" v-if="item.title != '内容' && item.title != '回执'">{{ item.title }}</div> -->
              <div class="section-content">
                <div class="sectionRow" v-for="(row, rowIdx) in item.rows" :key="rowIdx">
                  <div class="sectionCol" v-for="(attr, attrIdx) in row.attributes" :key="attrIdx">
                    <div class="sectionCol_label">
                      {{ attr.label }}
                    </div>
                    <div class="sectionCol_body">
                      <div class="ownerName">
                        <span v-if="attr.attributes.type == 'B'">{{ list[attr.localId].displayValue == 'true' ||
                          list[attr.localId].displayValue == true ? '是' : '否' }}</span>
                        <span v-else-if="attr.attributes.type == 'z' || attr.attributes.type == 'X'"><span
                            v-html="list[attr.localId]?.displayValue"></span></span>
                        <span v-else>{{ list[attr.localId]?.displayValue }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <template #footer>
        <div>
          <a-button @click="handleCancel">取消</a-button>
          <a-button type="primary" @click.prevent="handleEdit">编辑</a-button>
          <a-button type="primary" @click.prevent="handleView">查看原始电票</a-button>
        </div>
      </template>
    </a-modal>
    <common-form-modal :isShow="isCommon" v-if="isCommon" @cancel="isCommon = false"
      :title="data.recordId ? '编辑' : '新建'" @success="getDetail" :id="recordId" :objectTypeCode="objectTypeCode"
      :entityApiName="sObjectName"></common-form-modal>
    <addInvoice :isShow="isNew" v-if="isNew" :id="props.id" @ok="getDetail" @cancel="isNew = false" :entityId="entityId"
      :entityApiName="sObjectName" :objTypeCode="objectTypeCode" :name="'发票'" />
    <PdfView v-if="isPdf" :isShow="isPdf" :pdfParams="pdfParams" @cancel="isPdf = false" />
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
  nextTick,
} from "vue";
import {
  SearchOutlined,
  DownOutlined,
  UserOutlined,
} from "@ant-design/icons-vue";
import CommonFormModal from "@/components/listView/CommonFormModal.vue";
import PdfView from "@/components/file/PdfView.vue";
import { message } from "ant-design-vue";
import { useStore } from "vuex";
let store = useStore();
import Interface from "@/utils/Interface.js";
import addInvoice from "@/components/reimburse/invoice/addInvoice.vue";
const { proxy } = getCurrentInstance();
const props = defineProps({
  isShow: Boolean,
  id: String,
  InvoiceType: String
});
const formRef = ref();
const emit = defineEmits(["cancel"]);
const handleCancel = () => {
  emit("cancel", false);
};
const data = reactive({
  height: "",
  isCommon: false,
  recordId: '',
  objectTypeCode: '1090',
  sObjectName: 'Invoice',
  isShowDetail: true,
  layoutList: [],
  list: [],
  isPdf: false,
  pdfParams: {},
  isNew: false,
  entityId: ''
});
const { entityId, isNew, isPdf, pdfParams, list, layoutList, height, isCommon, recordId, objectTypeCode, sObjectName, isShowDetail } = toRefs(data);
const getDetail = () => {
  // data.isShowDetail=false;
  // nextTick(()=>{
  //   data.isShowDetail=true;
  // })
  let obj = {
    actions: [{
      id: "7366;a",
      descriptor: "",
      callingDescriptor: "UNKNOWN",
      params: {
        recordId: props.id,
        entityApiName: data.sObjectName,
        defaultFieldValues: {
          entityId: ""
        },
        mode: "CREATE",
        type: "FULL",
        layoutOverride: "00000000-0000-0000-0000-000000080001",
        inContextOfComponent: "",
        pageSize: -1,
        offset: 0
      }
    }]
  }
  let d = {
    message: JSON.stringify(obj)
  }
  proxy.$post(Interface.formCommon.layout, d).then(res => {
    //console.log("res", res);
    if (res && res.actions && res.actions[0] && res.actions[0].returnValue) {
      let { layout, record } = res.actions[0].returnValue;
      data.layoutList = layout.sections;
      data.list = JSON.parse(JSON.stringify(record.fields));
    }
  })
}
const handleView = () => {
  let url = Interface.getFiles;
  let d = {
    parentId: props.id,
    page: 1,
    rows: 10
  }
  proxy.$post(url, d).then(res => {
    if (res && res.actions && res.actions[0] && res.actions[0].returnValue && res.actions[0].returnValue && res.actions[0].returnValue.length) {
      let item = res.actions[0].returnValue[0];
      data.pdfParams = {
        id: item.id,
        name: item.name,
        index: 0,
        viewUrl: item.viewUrl,
        downloadUrl: item.downloadUrl
      };
      data.isPdf = true;
    } else {
      message.error('暂无原始电子发票pdf文件！');
    }
  })

}
//编辑
const handleEdit = (key) => {
  data.recordId = key;
  //data.isCommon = true;
  data.isNew = true;
}
// 通用弹窗关闭
const handleCommonCancel = (params) => {
  data.isCommon = false;
};
onMounted(() => {
  data.height = document.documentElement.clientHeight - 200;
  data.recordId = props.id;
  getDetail();
  window.addEventListener("resize", (e) => {
    data.height = document.documentElement.clientHeight - 200;
  });
});
</script>
<style lang="less">
@import url("@/style/modal.less");

.invoiceDetailWrap {
  .detailInfo {
    .detailTitle {
      font-size: 16px;
      height: 55px;
      line-height: 40px;
      text-align: center;
      color: #000;
    }

    .fh-section {
      margin-bottom: 8px;

      .fh-section-label {
        background: #f2f2f2;
        padding: 0 15px;
        line-height: 32px;
        border-radius: 4px;
      }

      .section-content {
        overflow: visible;
        visibility: visible;
        opacity: 1;
        height: auto;

        .sectionRow {
          padding: 0 16px;
          display: flex;

          .sectionCol {
            margin-left: 0;
            margin-right: 16px;
            padding: 8px 4px;
            flex: 1 1 0%;
            min-width: 0;
            border-bottom: 1px solid #c9c9c9;
            display: flex;
            align-items: center;

            .sectionCol_label {
              width: 23%;
            }

            .sectionCol_body {
              display: flex;
              align-items: center;

              .ownerName {
                display: flex;

                .uiImage {
                  width: 24px;
                  height: 24px;
                  border-radius: 50%;
                  overflow: hidden;
                  margin-right: 4px;

                  img {
                    width: 100%;
                    height: 100%;
                  }
                }

                a {
                  margin: 0 2px;
                  color: #0b5cab;
                }
              }
            }
          }
        }
      }
    }

    .fh-section-label {
      width: 100%;
      font-weight: 700;
      height: 30px;
      line-height: 30px;
      padding-left: 10px;

      font-size: 14px;
      color: #868686;
      border-bottom: 1px solid #e2e2e2;
      background-color: #f4faff !important;
      border-left: 2px solid #2b9dec;
      border-radius: 0 !important;
      margin-bottom: 10px;
    }

    .slds-form-element {
      display: flex;
      padding: 10px 10px 10px 15px;
      padding-left: 0;
    }

    .fh-section .sectionCol {
      border-bottom: 0 !important;
    }

    .fh-section .sectionCol_label {
      min-width: 168px;
      color: #000;
    }

    .fh-section .forcePageBlockItem {
      border-bottom: 0;
    }

    .fh-section .sectionCol_body {
      border-bottom: 1px solid #dedede !important;
      padding-left: 10px;
      padding-bottom: 5px;
      font-size: 12px;
      flex: 1;
      height: 30px;
      margin-right: 25px;

      .sectionCol_static {
        white-space: normal;
        word-break: break-all;
      }
    }
  }
}

.invoiceDetailModal {
  .titleLeft {
    text-align: left;
    font-size: 15px;
    color: #333;
    font-weight: 900;
    position: relative;
    top: 10px;
    left: 15px;
  }

  .ant-modal-header {
    border: none;
  }

  .ant-modal-footer {
    border: none;
  }

  .fh-section {
    color: #333 !important;

    .sectionCol {
      padding: 5px 0 !important;

      .sectionCol_label {
        color: #999 !important;
      }

      .sectionCol_body {
        border: none !important;
        font-size: 14px !important;
      }
    }

  }
}
</style>