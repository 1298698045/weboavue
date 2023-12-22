<template>
    <div class="seetingWrap">
        <div class="leftWrap">
            <div class="settingCard">
                <div class="cardTitle">
                    下载发票文件设置
                </div>
                <div class="cardBody">
                    <span class="text">
                        启用发票文件命名规则
                    </span>
                    <a-switch v-model:checked="checked" />
                </div>
            </div>
            <div class="settingCard">
                <div class="cardTitle">
                    识别多发票文件设置
                </div>
                <div class="cardBody">
                    <span class="text">
                        启用发票文件命名规则
                    </span>
                    <a-switch v-model:checked="checked" />
                </div>
            </div>
            <div class="settingCard">
                <div class="cardTitle">
                    提醒设置
                </div>
                <div class="cardBody">
                    <span class="text">
                        启用消息提醒
                    </span>
                    <a-switch v-model:checked="checked" />
                </div>
            </div>
        </div>
        <div class="rightWrap">
            <div class="tooltipWrap">
                <div class="top"> 小提示 </div>
                <div class="infos">
                    <div class="info"> 1、下载发票文件设置：开关关闭时，发票文件和关联附件使用上传时的原名称；开启后，发票文件名称按规则显示，发票附件为命名规则后增加_附件； </div>
                    <div class="info"> 2、上传识别多发票文件设置：开关关闭时，多发票图片识别后，根据规则对切割后的文件进行重命名，例：上传文件为a,切割后文件名称为a(1),a(2),a(3)；开启后，发票文件名称按规则显示； </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
    import {
       UnorderedListOutlined,
       DownOutlined,
       CaretDownOutlined,
       UserOutlined
   } from "@ant-design/icons-vue";
   import { ref, watch, reactive, toRefs, onMounted, getCurrentInstance, onUpdated } from "vue";
   import Interface from "@/utils/Interface.js";
   const { proxy } = getCurrentInstance();
   const data = reactive({
    checked: false
   });
   const { checked } = toRefs(data);
 </script>
 <style lang="less" scoped>
    .seetingWrap{
        width: 100%;
        display: flex;
        .leftWrap{
            width: calc(~"100% - 338px");
            margin-right: 20px;
        }
        .rightWrap{
            width: 338px;
            .tooltipWrap{
                width: 100%;
                background: #fff;
                border: 1px solid #e5e5e5;
                border-radius: 3px;
                .top{
                    height: 40px;
                    padding-left: 16px;
                    font-family: PingFangSC-Regular;
                    font-size: 14px;
                    line-height: 40px;
                    background: #f5f5f5;
                    border-bottom: 1px solid #e5e5e5;
                    color: #666;
                    letter-spacing: -.31px;
                    font-weight: 400;
                }
                .infos{
                    padding: 16px;
                    .info{
                        font-family: PingFangSC-Regular;
                        font-size: 12px;
                        color: #999;
                        line-height: 18px;
                        font-weight: 400;
                        margin-bottom: 10px;
                    }
                }
            }
        }
    }
    .settingCard{
        width: 100%;
        background: #fff;
        border: 1px solid #ebebeb;
        margin-bottom: 15px;
        .cardTitle{
            font-size: 14px;
            color: #111;
            line-height: 14px;
            font-weight: 600;
            border-bottom: 1px solid #ebebeb;
            margin: 0 16px;
            padding: 16px 0;
        }
        .cardBody{
            padding: 16px;
            .text{
                display: inline-block;
                min-width: 350px;
            }
        }
    }
 </style>