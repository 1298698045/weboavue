<template>
    <div class="seetingWrap">
        <div class="leftWrap">
            <div class="settingCard">
                <div class="cardTitle">
                    修改报销状态权限
                    <div class="desc"> 设置指定范围的人员，拥有修改发票报销状态的权限，系统管理员默认拥有该权限 </div>
                </div>
                <div class="cardBody">
                    <div class="action">
                        <div class="sel">
                            <span> 人员 </span>
                            <a-button :icon="h(PlusOutlined)"></a-button>
                            <a-input-search
                                v-model:value="value"
                                placeholder="搜索人员"
                                style="width: 200px;margin-left: 10px;"
                                @search="onSearch"
                                />
                        </div>
                        <div class="list">
                            <div>
                                <div class="iuv-user">
                                    <CloseCircleOutlined class="del-icon" />
                                    <span class="user-avatar">姚</span>
                                    <div class="user-name"> 姚萍(YT) </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="settingCard">
                <div class="cardTitle">
                    批量编辑
                    <div class="desc">设置指定的字段，支持批量编辑</div>
                </div>
                <div class="cardBody">
                    <div class="action">
                        <div class="sel">
                            <span> 编辑字段 </span>
                            <div style="display: inline-block;margin-left: 10px;">
                                <!-- <a-select style="width: 150px;">
                                    <a-select-option value="费用类型">费用类型</a-select-option>
                                    <a-select-option value="用途备注">用途备注</a-select-option>
                                </a-select> -->
                                <a-button :icon="h(PlusOutlined)"></a-button>
                                <div class="tags">
                                    <span class="tag">费用类型</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="rightWrap">
            <div class="tooltipWrap">
                <div class="top"> 小提示 </div>
                <div class="infos">
                    <div class="info">  1、开启“按发票未核销金额进行总额控制”时，可将未报销发票改为已报销；如果发票报销状态为“已核销”，且未核销金额不为0，可将发票报销状态手动改为“未报销”重新使用；  </div>
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
       UserOutlined, PlusOutlined, CloseCircleOutlined
   } from "@ant-design/icons-vue";
   import { ref, watch, reactive, toRefs, onMounted, getCurrentInstance, onUpdated, h } from "vue";
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
            .desc{
                font-size: 12px;
                color: #666;
                line-height: 20px;
                font-weight: 400;
            }
        }
        .cardBody{
            padding: 16px;
            .text{
                display: inline-block;
                min-width: 350px;
            }
            .action{
                padding: 16px 0;
                display: flex;
                .sel{
                    display: flex;
                    align-items: center;
                    .tags{
                        margin-top: 15px;
                    }
                }
                .list{
                    &>div{
                        margin: 0 5px 5px 0;
                        .iuv-user{
                            width: 48px;
                            position: relative;
                            .del-icon{
                                position: absolute;
                                right: 2px;
                                top: -5px;
                                color: red;
                                cursor: pointer;
                                display: none;
                            }
                            &:hover .del-icon{
                                display: block;
                            }
                            .user-avatar{
                                height: 34px;
                                width: 34px;
                                line-height: 34px;
                                background: #409eff;
                                margin-left: 7px;
                                border-radius: 4px;
                                display: inline-block;
                                text-align: center;
                                color: #fff;
                            }
                            .user-name{
                                font-family: PingFangSC-Regular;
                                font-size: 12px;
                                color: #999;
                                text-align: center;
                                line-height: 16px;
                            }
                        }
                    }
                }
            }
        }
    }
 </style>