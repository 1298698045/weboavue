<template>
    <div>
      <a-modal v-model:open="props.isShow" width="640px" :maskClosable="false" @cancel="handleCancel"
        @ok="handleSubmit">
        <template #title>
          <div class="modal_title">导出</div>
        </template>
        <div class="modalContainer" ref="modelContentRef">
          <div class="modalCenter">
            <div class="reportsExportFormat">
                <fieldset class="form-element">
                    <legend class="form-element__label">导出视图</legend>
                    <div class="form-element__control">
                        <div class="visual-picker" :class="{'selected':formState.selected=='Formatted-export'}" @click="changeSelection('Formatted-export')">
                            <input id="formatted-export" name="options" type="radio" value="Formatted-export" :checked="isSelected('Formatted-export')">
                            <label for="formatted-export" class="label">
                                <span></span>
                                <span class="visual-picker__figure">
                                    <span>
                                        <span class="visual-picker-header">格式化报表</span>
                                        <span class="visual-picker-body">
                                            导出报表，其中包含报表标头、分组和筛选设置。
                                        </span>
                                    </span>
                                </span>
                                <span class="visual-picker__text-check">
                                    <span class="checkIconColor">
                                        <svg focusable="false" aria-hidden="true" viewBox="0 0 520 520" part="icon" lwc-1e39mgvor8u="" data-key="check" class="svgIcon"><g lwc-1e39mgvor8u=""><path d="M191 425L26 259c-6-6-6-16 0-22l22-22c6-6 16-6 22 0l124 125a10 10 0 0015 0L452 95c6-6 16-6 22 0l22 22c6 6 6 16 0 22L213 425c-6 7-16 7-22 0z" lwc-1e39mgvor8u=""></path></g></svg>
                                    </span>
                                </span>
                            </label>
                        </div>
                        <div class="visual-picker" :class="{'selected':formState.selected=='Data-export'}" @click="changeSelection('Data-export')">
                            <input id="data-export" name="options" type="radio" value="Data-export" :checked="isSelected('Data-export')">
                            <label for="data-export" class="label">
                                <span></span>
                                <span class="visual-picker__figure">
                                    <span>
                                        <span class="visual-picker-header">仅限详细信息</span>
                                        <span class="visual-picker-body">
                                            仅导出详细信息行。使用此数据，以进行更多计算，或上载到其他系统。
                                        </span>
                                    </span>
                                </span>
                                <span class="visual-picker__text-check">
                                    <span class="checkIconColor">
                                        <svg focusable="false" aria-hidden="true" viewBox="0 0 520 520" part="icon" lwc-1e39mgvor8u="" data-key="check" class="svgIcon"><g lwc-1e39mgvor8u=""><path d="M191 425L26 259c-6-6-6-16 0-22l22-22c6-6 16-6 22 0l124 125a10 10 0 0015 0L452 95c6-6 16-6 22 0l22 22c6 6 6 16 0 22L213 425c-6 7-16 7-22 0z" lwc-1e39mgvor8u=""></path></g></svg>
                                    </span>
                                </span>
                            </label>
                        </div>
                    </div>
                </fieldset>
                <div class="data-excel-input-holder">
                    <div class="form-element" :style="{maxWidth:formState.selected=='Formatted-export'?'50%':'100%'}">
                        <label class="form-element__label">格式</label>
                        <div class="form-element__control">
                            <div class="select_container">
                                <select class="select" name="" id="">
                                    <option value="xls">Excel 格式 .xls</option>
                                    <option value="xlsx">Excel 格式 .xlsx</option>
                                    <option value="localecsv">逗号分隔符 .csv</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="form-element" v-if="formState.selected=='Data-export'">
                        <label class="form-element__label">编码</label>
                        <div class="form-element__control">
                            <div class="select_container">
                                <select class="select" name="" id="">
                                    <option value="ISO-8859-1">ISO-8859-1（通用美语和西欧语言，ISO-LATIN-1）</option>
                                    <option value="Unicode">Unicode</option>
                                    <option value="UTF-8">Unicode (UTF-8)</option>
                                    <option value="MS932">日语 (Windows)</option>
                                    <option value="Shift_JIS">日语 (Shift-JIS)</option>
                                    <option value="GB18030">中国国标 (GB18030)</option>
                                    <option value="GB2312">简体中文 (GB2312)</option>
                                    <option value="Big5">繁体中文 (Big5)</option>
                                    <option value="EUC_KR">韩语</option>
                                    <option value="UTF-16">Unicode (UTF-16, Big Endian)</option>
                                    <option value="Big5-HKSCS">Big5 繁体中文 (HKSCS)</option>
                                    <option value="x-SJIS_0213">日文 (Shift_JIS-2004)</option>
                                </select>
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
            <a-button type="primary" @click.prevent="handleExport">导出</a-button>
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
      computed,
      toRaw
    } from "vue";
    import { SearchOutlined, DeleteOutlined } from "@ant-design/icons-vue";
    import { message } from "ant-design-vue";
    import Interface from "@/utils/Interface.js";
  
    const { proxy } = getCurrentInstance();
    const labelCol = ref({ style: { width: "100px" } });
    const props = defineProps({
      isShow: Boolean,
    });
    const formRef = ref(null);
    const emit = defineEmits(["cancel", "ok"]);

    const handleCancel = () => {
      emit("cancel", false);
    };
    

    const formState = reactive({
        selected: "Formatted-export"
    })

    const isSelected = (value) => {  
      return formState.selected === value;  
    };

    const changeSelection = (e) => {
        console.log("e", e);
        formState.selected = e;  
    }

    const data = reactive({

    });
    // const {  } = toRefs(data);
    
    onMounted(() => {

    })
    const handleExport = () => {
      formRef.value.validate().then(() => {
        let obj = {
            actions:[{
                id: "2919;a",
                descriptor: "",
                callingDescriptor: "UNKNOWN",
                params: {
                    recordInput:{
                        allowSaveOnDuplicate: false,
                        apiName: "ReportTypeFolder",
                        objTypeCode: 9105,
                        fields: toRaw(formState)
                    }
                }
            }]
        };
        let d = {
            message: JSON.stringify(obj)
        }

      }).catch((err) => {
        console.log("error", err);
      });
    };

  </script>
  <style lang="less">
    @import url("@/style/modal.less");
  </style>
  <style lang="less" scoped>
    .modalContainer{
        height: 338px;
        overflow-y: auto;
    }
    .modalCenter{
        padding: 16px;
        .reportsExportFormat{
            padding: 12px;
            .form-element{
                border: 0;
                position: relative;
                min-width: 0;
                padding-bottom: 16px;
                .form-element__label{
                    display: inline-block;
                    color: #444444;
                    font-size: 16px;
                    line-height: 1.25;
                    font-weight: 700;
                    padding-right: 8px;
                    padding-top: 4px;
                    margin-bottom: 2px;
                }
                .form-element__control{
                    position: relative;
                    clear: both;
                    .visual-picker{
                        display: inline-flex;
                        position: relative;
                        flex-direction: column;
                        border: 0;
                        border-radius: 0;
                        text-align: center;
                        cursor: pointer;
                        
                        input{
                            width: 1px;
                            height: 1px;
                            border: 0;
                            clip: rect(0 0 0 0);
                            margin: -1px;
                            overflow: hidden;
                            padding: 0;
                            position: absolute;
                        }
                        .label{
                            .visual-picker__figure{
                                background: #ffffff;
                                box-shadow: 0 2px 2px rgba(0, 0, 0, 0.05);
                                border: 1px solid #c9c9c9;
                                border-radius: 4px;
                                text-align: center;
                                display: flex;
                                justify-content: center;
                                align-items: center;
                                margin: auto;
                                width: 192px;
                                height: 176px;
                                span{
                                    display: block;
                                }
                                .visual-picker-header{
                                    font-size: 16px;
                                    line-height: 1.25;
                                    padding-bottom: 16px;
                                }
                                .visual-picker-body{
                                    padding: 0 16px;
                                    font-size: 12px;
                                    line-height: 1.25;
                                    color: #444444;
                                }
                            }
                        }
                        .label:hover{
                            cursor: pointer;
                            .visual-picker__figure{
                                border: 1px solid #1b96ff;
                                box-shadow: 0 0 0 1px #1b96ff inset;
                            }
                        }
                        &.selected{
                            .visual-picker__figure{
                                border: 1px solid #1b96ff;
                                box-shadow: 0 0 0 1px #1b96ff inset;
                            }
                            .visual-picker__figure::after{
                                content: '';
                                position: absolute;
                                top: 0;
                                right: 0;
                                border-color: transparent;
                                border-style: solid;
                                border-radius: 0 4px 0 0;
                                border-width: 16px;
                                border-right-color: #1b96ff;
                                border-top-color: #1b96ff;
                            }
                        }
                    }
                    .visual-picker+.visual-picker{
                        margin-left: 16px;
                    }
                    .visual-picker__text-check{
                        display: inline-block;
                        border-radius: 4px;
                        line-height: 1;
                        background: transparent;
                        position: absolute;
                        top: 2px;
                        right: 10px;
                        width: 8px;
                        height: 8px;
                        .checkIconColor{
                            color: #fff;
                            width: 14px;
                            height: 14px;
                            fill: currentColor;
                            .svgIcon{
                                width: 14px;
                                height: 14px;
                                fill: currentColor;
                            }
                        }
                    }
                }
            }
            .data-excel-input-holder{
                display: flex;
                flex-direction: row;
                .form-element{
                    position: relative;
                    min-width: 0;
                    padding-bottom: 16px;
                    flex-grow: 1;
                    flex-basis: 0;
                    .form-element__label{
                        word-wrap: break-word;
                        hyphens: auto;
                        display: inline-block;
                        color: #444444;
                        font-size: 12px;
                        padding-right: 8px;
                        padding-top: 4px;
                        margin-bottom: 2px;
                    }
                    .form-element__control{
                        clear: left;
                        position: relative;
                        .select_container{
                            position: relative;
                            &::before,&::after{
                                position: absolute;
                                content: '';
                                display: block;
                                right: 8px;
                                width: 0;
                                height: 0;
                                border-left: 3px solid transparent;
                                border-right: 3px solid transparent;
                                pointer-events: none;
                            }
                            &::before{
                                border-bottom: 5px solid currentColor;
                                top: calc((28px / 2) - 6px);
                            }
                            &::after{
                                border-top: 5px solid currentColor;
                                bottom: calc((28px / 2) - 6px);
                            }
                            .select{
                                height: 32px;
                                width: 100%;
                                border: 1px solid #747474;
                                border-radius: 4px;
                                background: #fff;
                                padding-left: 8px;
                                padding-right: 24px;
                                appearance: none;
                                &:focus{
                                    outline: 0;
                                    background: #fff;
                                    border-color: #747474;
                                    box-shadow: 0 0 0 2px #0B5CAB, 0 0 3px #0176d3;
                                }
                            }
                        }
                    }
                }
                &>div:nth-child(1){
                    padding-right: 16px;
                }
            }
        }
    }
  </style>