<template>
    <div class="wrapper">
        <div class="row">
            <div class="itemBox" v-for="item in 4">
                <h5>
                    业绩达成
                    <a-dropdown>
                        <a class="menuText" @click.prevent>
                          本年
                          <DownOutlined />
                        </a>
                        <template #overlay>
                          <a-menu>
                            <a-menu-item>全部</a-menu-item>
                            <a-menu-item>本月</a-menu-item>
                            <a-menu-item>本季</a-menu-item>
                            <a-menu-item>本年</a-menu-item>
                            <a-menu-item>上个月</a-menu-item>
                            <a-menu-item>上一年</a-menu-item>
                          </a-menu>
                        </template>
                    </a-dropdown>
                </h5>
                <div class="itemBoxBd">
                    <div class="infoWrap">
                        <div class="div_infor">
                            <h3>128.00<i>万元</i></h3>
                            <span>有效合同金额</span>
                        </div>
                        <div class="div_echarts"></div>
                    </div>
                    <div class="itemBottom">
                        <span style="width: 100%; margin: 0px; display: inline-block;">
                            <img :src="require('@/assets/img/icon_02.png')">
                            目标金额：
                            <font>
                            <a href="/spa/portal/static/index.html#/main/portal/portal-166-1" target="_blank">
                                800.00万元（同指标排名：52名）</a>
                            </font>
                        </span>
                    </div>
                </div>
            </div>
        </div>
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
    inject
  } from "vue";
  import {
    DownOutlined
  } from "@ant-design/icons-vue";
  import { message } from "ant-design-vue";
  import Interface from "@/utils/Interface.js";
  const { proxy } = getCurrentInstance();
</script>
<style lang="less" scoped>
    .row{
        display: flex;
        .itemBox{
            width: calc(~"25% - 10px");
            height: 165px;
            margin: 0px 10px 0px 0px;
            padding: 12px 15px;
            display: inline-block;
            border-radius: 2px;
            background: rgb(255, 255, 255);
            cursor: pointer;
            vertical-align: top;
            position: relative;
            line-height: 1.6;

            h5{
                font-size: 13px;
                color: rgb(51, 51, 51);
                font-weight: normal;
                .menuText{
                    display: inline-block;
                    margin-left: 20px;
                    color: rgb(136, 136, 136);
                }
            }
            .infoWrap{
                padding: 2px 0px 5px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                .div_infor{
                    width: 80%;
                    h3{
                        font-size: 24px;
                        line-height: 2;
                        i{
                            font-size: 12px;
                            color: rgb(51, 51, 51);
                            font-style: normal;
                            margin-left: 5px;
                            font-weight: normal;
                        }
                    }
                    span{
                        color: rgb(170, 170, 170);
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                    }
                }
                .div_echarts{
                    width: 100px;
                    height: 100%;
                    z-index: 10;
                }

            }
            .itemBottom{
                margin-top: 8px;
                color: rgb(136, 136, 136);
                border-top: 1px solid rgb(233, 235, 237);
                padding-top: 10px;
                span{
                    img{
                        width: 16px;
                        display: inline-block;
                        vertical-align: middle;
                        margin-right: 6px;
                        margin-top: -2px;
                    }
                }
                a{
                    color: rgb(51, 51, 51);
                    text-decoration: none;
                }
            }
        }
    }
</style>