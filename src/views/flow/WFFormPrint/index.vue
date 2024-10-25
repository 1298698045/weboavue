<template>
  <div class="WFFormPrint" :style="{height: height+'px'}">
      <div class="panel">
          <div class="panel-head noprint">
              {{ (title?title+' ':'表单打印')+'' }}
            <div class="panel-btn">
                <a-button type="primary" class="ml10" @click="openPrint()">打印</a-button>
            </div>
          </div>
          <div class="panel-bd">
              <div class="panelWFFormPrint">
                  <div class="WFFormPrint">
                      
                  </div>
              </div>
          </div>
      </div>
  </div>
</template>
<script setup>
  import { ref, reactive, onMounted, toRefs, getCurrentInstance, defineEmits, toRaw, defineProps } from "vue";
  import dayjs from 'dayjs';
  import 'dayjs/locale/zh-cn';
  import locale from 'ant-design-vue/es/date-picker/locale/zh_CN';
  dayjs.locale('zh-cn');
  import calendar from 'dayjs/plugin/calendar';
  import weekday from 'dayjs/plugin/weekday';
  import localeData from 'dayjs/plugin/localeData';

  dayjs.extend(calendar);
  dayjs.extend(weekday);
  dayjs.extend(localeData);
  import { UserOutlined } from "@ant-design/icons-vue";
  import { notification } from 'ant-design-vue';
  import Interface from "@/utils/Interface.js";
  import { girdFormatterValue } from "@/utils/common.js";
  import { message } from "ant-design-vue";
  import { useRouter, useRoute } from "vue-router";
  import QRCode from "qrcode";
  const { proxy } = getCurrentInstance();
  const router = useRouter();
  const route = useRoute();
  const qrcodeimg = ref();
  const props = defineProps({
      id:String
  })
  const data = reactive({
      title:'',
      listData: [],
      id: route.query.id,
      height:0,
  })
  const { title, listData, id, height } = toRefs(data);
  const getDetail = () => {
  let d = {
            actions:[{
                id: "4270;a",
                descriptor: "aura://RecordUiController/ACTION$getRecordWithFields",
                callingDescriptor: "UNKNOWN",
                params: {
                recordId: data.id,
                apiName:'',
                objTypeCode: ''
                }
            }]
        };
        let obj = {
            message: JSON.stringify(d)
        }
        proxy.$post(Interface.detail,obj).then(res=>{
            if(res&&res.actions&&res.actions[0]&&res.actions[0].returnValue&&res.actions[0].returnValue.fields){
            let fields=res.actions[0].returnValue.fields;
               data.title=fields.Name.displayValue;
               //data.Start=fields.ScheduledStart&&fields.ScheduledStart.value?dayjs(fields.ScheduledStart.value).format("YYYY-MM-DD HH:mm"):'';
            }
        })
};
  onMounted(() => {
        data.height = document.documentElement.clientHeight;
        //getDetail();
        openPrint();
  })
  const openPrint=()=>{
    window.print();
  }
</script>
<style lang="less">
@media print {
  @page {
    size: auto;
    margin: 5mm;
  }

  .noprint {
    display: none !important;
  }
}
  .WFFormPrint{
      width: 100%;
      height: 100%;
      .panel{
        height: 100%;
        border-radius: 0;
        //background: #f0f2f6 !important;
        //color: #fff !important;
        font-weight: bold !important;
        font-size: 14px;
        .panel-head{
          font-size: 25px !important;
          justify-content: center;
          margin-bottom: 15px !important;
          position: relative;
          .panel-btn{
            position: absolute;
            right: 20px;
            top: 0;
          }
        }
        .panel-info{
          padding-left: 10px;
          span{
            font-size: 18px !important;
            min-width: 200px;
            display: inline-block;
            text-align: left !important;
            margin-right: 30px;
          }
          margin-bottom: 10px !important;
          text-align: left !important;
        }
        .qrcodeimg-top{
          margin-top: 20px;
          margin-bottom: 35px;
        }
        .qrcodeimg-bottom1{
          margin-top: 35px;
        }
        .qrcodeimg-bottom2{
          margin-top: 30px;
        }
        .ant-table-cell{
          line-height: 1;
        }
        .ant-table-cell::before{
          display: none !important;
        }
        .ant-table-cell-scrollbar{
          display: none !important;
        }
        *{
          //background: #165dff !important;
          //color: #fff !important;
          font-weight: bold !important;
          font-size: 14px;
          text-align: center !important;
        }
        
        .panel-bd{
          display: flex;
        }
      }
      .panelDynamicQrcodeWrap{
        width: 600px;
        height: 100%;
        margin-right: 70px;
      }
      .panelWFFormPrint{
          flex: 1;
          padding: 0 0px;
          .DynamicSignBox{
              display: flex;
              .leftAvatar{
                  margin-right: 12px;
              }
              .rightTextare{
                  flex: 1;
                  border-radius: 2px;
                  .textarea{
                      width: 100%;
                      height: 100px;
                      min-height: 22px;
                      border-radius: 2px;
                      background: #f2f3f5;
                      padding-top: 6px;
                      padding-left: 12px;
                      font-size: 14px;
                      border: none;
                      outline: 0;
                      resize: vertical;
                  }
              }
          }
          .optionalWrap{  
              text-align: right;
              padding-top: 10px;
          }
          .WFFormPrint{
              .DynamicSignItemBox{
                  display: flex;
                  margin-top: 20px;
                  .leftAvatar{
                      font-size: 36px;
                      color: #C9CDD4;
                      margin-right: 12px;
                  }
                  .rightDynamicSign{
                      flex: 1;
                      overflow: hidden;
                      line-height: 15px;
                      position: relative;
                      top: 5px;
                      .DynamicSignName{
                          font-size: 14px;
                          color: #ff7d00;
                      }
                      .DynamicSignContent{
                          margin: 6px 0;
                      }
                      .DynamicSignTime{
                          font-size: 12px;
                          color: #86909c;
                      }
                  }
              }
          }
          .pagination{
              margin-top: 20px;
              text-align: right;
              max-height: 74px;
          }
      }
  }
  .WFFormPrint .panel .panel-bd{
     height: calc(~"100% - 50px") !important;
  }
</style>