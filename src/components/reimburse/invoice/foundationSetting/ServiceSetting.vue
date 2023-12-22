<template>
    <div class="seetingWrap">
        <div class="leftWrap">
        </div>
        <div class="rightWrap">
            <div class="tooltipWrap">
                <div class="top"> 小提示 </div>
                <div class="infos">
                    <div class="info"> 1、支持配置多个服务商并启用，服务器会根据配置的优先级进行调用，在当前服务商接口异常时，自动切换到其他服务商</div>
                    <div class="info"> 2、支持拖动卡片调整服务商的优先级 </div>
                    <div class="info"> 3、优先级数字越小，优先级越高 </div>
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