<template>
    <div class="wrapper">
        <div class="row">
            <div class="itemBox w20" style="border-radius: 4px;" v-for="item in 5">
                <div class="itemCenter">
                    <div class="leftBox">
                        <img :src="require('@/assets/img/rsgx_01.png')" alt="">
                        <div style="margin-left: 16px;">
                            <p style="font-size: 15px; font-weight: 500; color: rgb(51, 51, 51);">费用报销</p>
                            <p style="font-size: 12px; color: rgb(154, 154, 154);">/ 进行中数量</p>
                        </div>
                    </div>
                    <div class="rightBox">
                        <span style="font-size: 21px; font-weight: 500; color: rgb(50, 85, 180);">235</span>
                        <span style="font-size: 14px; color: rgb(154, 154, 154); margin-left: 5px;">/ 121</span>
                    </div>
                </div>
                <div class="itemCenter">
                    <ul class="wfull">
                        <li>
                            <p class="pl-4" style="font-size: 18px; color: rgb(51, 51, 51); font-weight: bold;">2,563.49<span style="font-size: 12px; color: rgb(153, 153, 153); font-weight: 400;">元</span></p>
                            <p class="pl-4" style="font-size: 12px; color: rgb(153, 153, 153);">报销总金额</p>
                        </li>
                        <li class="flex justify-end">
                            <p class="pr-16" style="color: rgb(213, 57, 57); font-size: 14px;"><span style="font-size: 12px; color: rgb(153, 153, 153);">同比</span>7% <img :src="require('@/assets/img/fkiconu1.png')"></p>
                            <p style="color: rgb(73, 183, 180); font-size: 14px;"><span style="font-size: 12px; color: rgb(153, 153, 153);">环比</span>5% <img :src="require('@/assets/img/fkicond1.png')"></p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="itemBox paddingNone" style="width: 100%;">
                <div class="itemBoxHeader">
                    <p class="lname">快捷报账</p>
                    <div class="right">
                        <span>
                            <img :src="require('@/assets/img/refresh_wev8.png')" alt="">
                        </span>
                        <span style="margin-left: 10px;">
                            <img :src="require('@/assets/img/more_wev8.png')" alt="">
                        </span>
                    </div>
                </div>
                <div class="content_view">
                    <ul class="weax-iconblock-temp weax-iconblock-temp39">
                        <li class="weax-iconblock-temp39-item" v-for="item in 8">
                            <div class="weax-iconblock-temp39-left">
                                <img class="weax-iconblock-temp39-img" :src="require('@/assets/img/iconchailvshenqing.png')">
                            </div>
                            <div class="weax-iconblock-temp39-right">
                                <p class="weax-iconblock-temp39-title">差旅申请</p>
                                <div class="weax-iconblock-temp39-btns">
                                    <a-button>流程介绍</a-button>
                                    <a-button type="primary" class="ml10">立即发起</a-button>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="itemBox paddingNone" style="width: 100%;">
                <div class="itemBoxHeader">
                    <p class="lname">对公付款</p>
                    <div class="right">
                        <span>
                            <img :src="require('@/assets/img/refresh_wev8.png')" alt="">
                        </span>
                        <span style="margin-left: 10px;">
                            <img :src="require('@/assets/img/more_wev8.png')" alt="">
                        </span>
                    </div>
                </div>
                <div class="content_view" style="padding: 0 20px 30px 10px;">
                    <table class="commonTable">
                        <thead>
                            <tr>
                                <th>付款申请</th>
                                <th>采购订单</th>
                                <th>预算情况</th>
                                <th>资金计划</th>
                                <th>合同款项</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in 5">
                                <td>（首付款）维森集团服务器采购合同付款申请</td>
                                <td>维森集团服务器采购订单</td>
                                <td><a-tag color="processing">预算内</a-tag></td>
                                <td><a-tag color="success">账期内</a-tag></td>
                                <td>首付款</td>
                                <td>
                                    <a-button>批准付款</a-button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="itemBox w70">
                <div class="itemBoxHeader">
                    <p class="lname">流程中心</p>
                    <div class="right">
                        <span>
                            <img :src="require('@/assets/img/refresh_wev8.png')" alt="">
                        </span>
                        <span style="margin-left: 10px;">
                            <img :src="require('@/assets/img/more_wev8.png')" alt="">
                        </span>
                    </div>
                </div>
                <div class="content_view">
                    <a-tabs v-model:activeKey="activeKey">
                        <a-tab-pane key="1" tab="全部"></a-tab-pane>
                        <a-tab-pane key="2" tab="支付类"></a-tab-pane>
                        <a-tab-pane key="3" tab="报销类"></a-tab-pane>
                        <a-tab-pane key="4" tab="预算类"></a-tab-pane>
                    </a-tabs>
                    <div>
                        <table class="table">
                            <tbody>
                                <tr v-for="item in 4">
                                    <td>
                                        <span>
                                            <b><span>阿萨德饭阿萨德</span></b>
                                            <span><b>&nbsp;</b>（<span><span></span></span>：<span><span></span></span>）-<span><span>杨文元（演示账号）</span></span>-<span><span>2023-12-14</span></span></span>
                                        </span>
                                        <img title="查看流转意见" class="portal_workflow_signaturesIcon"
                                            :src="require('@/assets/img/req_wev8.png')" width="14px" height="16px"
                                            alt="">
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div class="itemBox w30">
                <div class="itemBoxHeader">
                    <p class="lname">派单情况</p>
                    <div class="right">
                        <span>
                            <img :src="require('@/assets/img/refresh_wev8.png')" alt="">
                        </span>
                        <span style="margin-left: 10px;">
                            <img :src="require('@/assets/img/more_wev8.png')" alt="">
                        </span>
                    </div>
                </div>
                <div class="content_view">
                    <ul class="sendList">
                        <li v-for="item in 3">
                            <div class="title">
                                <img :src="require('@/assets/img/1icon_pdqk01.png')">
                                <h3>费审中心</h3>
                            </div>
                            <div class="cont">
                                <p><span>总单量</span>：135</p>
                                <p><span>自动派单</span>：92</p>
                                <p><span>手动派单</span>：30</p>
                                <p><span>结余</span>：13</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="itemBox w70">
                <div class="itemBoxHeader">
                    <p class="lname">各部门预算执行情况</p>
                    <div class="right">
                        <span>
                            <img :src="require('@/assets/img/refresh_wev8.png')" alt="">
                        </span>
                        <span style="margin-left: 10px;">
                            <img :src="require('@/assets/img/more_wev8.png')" alt="">
                        </span>
                    </div>
                </div>
                <div class="content_view">
                    <table class="commonTable">
                        <thead>
                            <tr class="trHead">
                                <th>部门</th>
                                <th>总预算</th>
                                <th>已用</th>
                                <th>冻结</th>
                                <th>可用</th>
                                <th>比率</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in 5">
                                <td>行政服务部</td>
                                <td>60,000</td>
                                <td>60,000</td>
                                <td>200元</td>
                                <td>58,568元</td>
                                <td>
                                    <a-progress :percent="30" size="small" />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="itemBox w30">
                <div class="itemBoxHeader">
                    <p class="lname">现金流量</p>
                    <div class="right">
                        <span>
                            <img :src="require('@/assets/img/refresh_wev8.png')" alt="">
                        </span>
                        <span style="margin-left: 10px;">
                            <img :src="require('@/assets/img/more_wev8.png')" alt="">
                        </span>
                    </div>
                </div>
                <div class="content_view">
                    <ul class="sendList">
                        <li v-for="item in 3">
                            <img :src="require('@/assets/img/1icon_pdqk01.png')">
                            <h3>费审中心</h3>
                            <div class="div">
                                <h5>3,503 万元</h5>
                                <p>本月现金流量</p>
                            </div>
                            <div class="div">
                                <h5>3,503 万元</h5>
                                <p>本月现金流量</p>
                            </div>
                        </li>
                    </ul>
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
        inject,
        nextTick
    } from "vue";
    import {
        DownOutlined, WeiboCircleOutlined
    } from "@ant-design/icons-vue";
    import { message } from "ant-design-vue";
    import * as echarts from "echarts";
    import Interface from "@/utils/Interface.js";
    const { proxy } = getCurrentInstance();
    const data = reactive({
        activeKey: '1',
        chartCurrent: 1
    });
    const { activeKey, chartCurrent } = toRefs(data);
</script>
<style lang="less" scoped>
    .wrapper {
        height: 100%;
        overflow: auto;
    }

    .row {
        display: flex;
        .itemBox {
            width: calc(~"25% - 10px");
            min-height: 165px;
            margin: 0px 10px 0px 0px;
            padding: 12px 15px;
            /* display: inline-block; */
            border-radius: 2px;
            background: rgb(255, 255, 255);
            cursor: pointer;
            vertical-align: top;
            position: relative;
            line-height: 1.6;
            margin-bottom: 10px;

            h5 {
                font-size: 13px;
                color: rgb(51, 51, 51);
                font-weight: normal;

                .menuText {
                    display: inline-block;
                    margin-left: 20px;
                    color: rgb(136, 136, 136);
                }
            }

            .infoWrap {
                padding: 2px 0px 5px;
                display: flex;
                align-items: center;
                justify-content: space-between;

                .div_infor {
                    width: 80%;

                    h3 {
                        font-size: 24px;
                        line-height: 2;

                        i {
                            font-size: 12px;
                            color: rgb(51, 51, 51);
                            font-style: normal;
                            margin-left: 5px;
                            font-weight: normal;
                        }
                    }

                    span {
                        color: rgb(170, 170, 170);
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                    }
                }

                .div_echarts {
                    width: 100px;
                    height: 100%;
                    z-index: 10;
                }

            }

            .itemBottom {
                margin-top: 8px;
                color: rgb(136, 136, 136);
                border-top: 1px solid rgb(233, 235, 237);
                padding-top: 10px;

                span {
                    img {
                        width: 16px;
                        display: inline-block;
                        vertical-align: middle;
                        margin-right: 6px;
                        margin-top: -2px;
                    }
                }

                a {
                    color: rgb(51, 51, 51);
                    text-decoration: none;
                }
            }

            .head {
                font-size: 14px;
                color: #2153B5;
                text-align: center;
                font-weight: normal;

                i {
                    color: #aaa;
                    font-size: 12px;
                    font-weight: normal;
                    margin: 0 15px;
                }
            }

            .ul_quicklaunch {
                .li_carousel {
                    padding: 12px 0;

                    h5 {
                        font-size: 12px;
                        color: #7D838D;
                        border-left: 3px solid #4A82F0;
                        padding-left: 10px;
                        font-weight: normal;
                        line-height: 16px;
                    }

                    .toolWrap {
                        padding: 10px 0 0;

                        .tool {
                            width: 50%;
                            display: inline-block;
                            position: relative;
                            padding: 8px 0;

                            &:hover {
                                background: #F0F3F8;
                                border-radius: 2px;
                                cursor: pointer;
                            }

                            img {
                                width: 20px;
                                display: inline-block;
                                position: absolute;
                                left: 5px;
                            }

                            h3 {
                                padding-left: 30px;
                                color: #333;
                                font-size: 12px;
                                font-weight: normal;
                                overflow: hidden;
                                text-overflow: ellipsis;
                                white-space: nowrap;
                            }
                        }
                    }

                    .flowWrap {
                        padding: 10px 0 0;

                        .flow {
                            padding: 10px 0 10px 30px;
                            position: relative;
                            display: block;

                            &:hover {
                                background: #F0F3F8;
                                border-radius: 2px;
                                cursor: pointer;
                            }

                            p {
                                img {
                                    width: 20px;
                                    display: inline-block;
                                    position: absolute;
                                    left: 5px;
                                }

                                h3 {
                                    font-size: 12px;
                                    font-weight: normal;
                                    color: #333;
                                }
                            }

                            span {
                                overflow: hidden;
                                text-overflow: ellipsis;
                                white-space: nowrap;
                                margin-top: 5px;
                                color: #aaa;
                                font-size: 12px;
                                display: inline-block;
                            }
                        }
                    }
                }
            }
        }

        .itemBox.parent {
            padding: 0;
            background: transparent;
        }

        .itemBox.itemBoxChild {
            width: 100%;
            margin: 0;
            height: calc(~"50% - 5px");
            padding: 0;

            &:first-child {
                margin-bottom: 10px;
            }
        }

        .itemBoxHeader {
            width: 100%;
            background-color: rgb(255, 255, 255);
            background-repeat: repeat;
            background-position: 0px 0px;
            border-style: none none solid;
            border-width: medium medium 1px;
            border-color: rgb(0, 0, 0) rgb(0, 0, 0) rgb(238, 238, 238);
            height: 50px;
            box-sizing: content-box;
            display: flex;
            justify-content: space-between;
            align-items: center;

            .icon {
                width: 20px;
                height: 20px;
                margin-left: 15px;
            }

            .lname {
                margin-left: 15px;
                line-height: 50px;
                font-size: 14px;
                font-weight: 700;
            }

            .right {
                text-align: right;
                line-height: 50px;
                padding-right: 20px;
            }
        }

        .content_view {
            padding: 5px;

            .tabs {
                font-size: 14px;
                line-height: 1.5;
                white-space: nowrap;
                border-bottom: 0 solid #f3f3f3;
            }

            .table {
                width: 100%;
                border-collapse: collapse;

                tr {
                    width: 100%;

                    &:hover {
                        background: #e9f7ff;
                    }

                    td {
                        border: none;
                        padding: 4px 1px 3px;
                        border-bottom: 1px solid #e2e2e2 !important;

                        img {
                            vertical-align: middle;
                        }

                        .portal_workflow_signaturesIcon {
                            width: 14px;
                            height: 16px;
                            margin-top: -8px;
                            margin-left: 10px;
                        }
                    }
                }
            }
        }

        .portal_Element {
            .totail {
                padding: 10px 0 20px;
                border-bottom: 1px solid #eee;

                a {
                    width: 50%;
                    text-align: center;
                    display: inline-block;
                    vertical-align: middle;
                    color: #666;
                    font-size: 12px;

                    h3 {
                        font-size: 22px;
                        color: var(--textColor);
                        font-family: ui-serif;
                    }
                }
            }

            h5 {
                padding: 15px 0 10px;
                font-size: 12px;
                color: #aaa;
                font-weight: normal;
            }

            .plate {
                li {
                    padding: 10px 0;

                    h3 {
                        font-size: 14px;
                        font-weight: normal;
                        color: #333;
                        margin-bottom: 5px;

                        i {
                            padding: 0px 14px;
                            background-color: #e30303;
                            color: #fff;
                            border-radius: 50px;
                            font-style: normal;
                            float: right;
                            line-height: 17px;
                        }
                    }

                    .div_date {
                        p {
                            color: #888;
                            position: relative;
                            padding: 4px 0 4px 15px;
                            cursor: pointer;

                            &::before {
                                content: '';
                                width: 4px;
                                height: 4px;
                                border-radius: 50px;
                                background-color: #aaa;
                                display: block;
                                position: absolute;
                                left: 4px;
                                top: 13px;
                            }

                            .font {
                                width: 56%;
                                overflow: hidden;
                                text-overflow: ellipsis;
                                white-space: nowrap;
                                display: inline-block;
                                vertical-align: middle;
                            }

                            span:last-child {
                                margin-left: 10px;
                                vertical-align: middle;
                                color: #aaa;
                            }
                        }
                    }
                }
            }
        }

        .timeBox {
            margin: 10px 20px;

            .time {
                display: inline-block;
                width: 60px;
                color: var(--textColor);
            }
        }
    }

    .itemBox.paddingNone {
        padding: 0;
    }
    .ul_header{
        height: 45px;
        line-height: 45px;
        border-bottom: 1px solid #eee;
        padding-left: 10px;
        font-size: 12px;
        color: #999;    
        position: relative;
        li{
            float: left;
            margin-left: 15px;
            &.active{
                color: #333;
                font-weight: bold;
            }
            
        }
    }
    .ul_header::after{
        content: '';
        position: absolute;
        width: 3px;
        height: 18px;
        left: 15px;
        top: 14px;
        background: #2b8cf9;
    }
    .itemCenter{
        padding: 16px;
        border-bottom: 1px solid rgb(241, 241, 241);
        display: flex;
        justify-content: space-between;
        align-items: center;
        .leftBox{
            display: flex;
            img{
                width: 42px;
                display: inline-block;
            }
        }
        .wfull{
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 16px 0;
            li{
                width: 50%;
            }
        }
    }
    .itemCenter:last-child{
        border-bottom: 0;
    }
    .itemBox.w20{
        width: calc(~"20% - 10px");
    }
    .weax-iconblock-temp39 {
        width: 100%;
        padding: 6px;
        flex-wrap: wrap;
        display: flex;
        .weax-iconblock-temp39-item {
            width: 25%;
            padding: 6px;
            display: flex;
            min-width: 190px;
            .weax-iconblock-temp39-left {
                width: 30%;
                justify-content: flex-end;
                align-items: center;
                display: flex;
                padding-right: 5px;
                .weax-iconblock-temp39-img {
                    width: 48px;
                    height: 48px;
                    border-radius: 3px;
                    vertical-align: middle;
                }
            }
            .weax-iconblock-temp39-right {
                width: 70%;
                padding-left: 5px;
                justify-content: center;
                flex-direction: column;
                display: flex;
                .weax-iconblock-temp39-title {
                    color: #2d3748;
                    text-align: left;
                    padding-bottom: 6px;
                }
                .weax-iconblock-temp39-btns {
                    display: flex;
                    white-space: nowrap;
                }
            }
        }
    }
    .commonTable{
        width: 100%;
        border-collapse: collapse;
        height: 320px;
        overflow: auto;
        tr{
            th{
                height: 65px;
                background: #f7fbfe;
                color: #333;
                font-weight: normal;
                border-bottom: 1px solid #e2e2e2;
                text-align: left;
                padding-left: 10px;
            }
            td{
                border-bottom: 1px solid #e2e2e2;
                text-align: left;
                padding-left: 10px;
                height: 41px;
                line-height: 41px;
            }
        }
        tr.trHead{
            th{
                height: 40px;
                background: rgb(242, 245, 249);
                color: #888;
            }
        }
    }
    .itemBox.w70{
        width: 70%;
    }
    .itemBox.w30{
        width: 30%;
    }
    .sendList{
        width: 100%;
        position: relative;
        border-bottom: 1px solid #E7F1F8;
        overflow: hidden;
        padding: 8px 0 0 8px;
        li{
            width: 100%;
            position: relative;
            border-bottom: 1px solid #E7F1F8;
            overflow: hidden;
            padding: 19px 0 19px 160px;
            &:hover{
                background: #ebf8ff;
            }
            .title{
                position: absolute;
                font-style: normal;
                font-weight: bold;
                left: 18px;
                top: 15px;
                border-bottom: 0px solid rgb(0, 0, 0);
                height: 17px;
                color: rgb(37, 37, 37);
                font-family: 微软雅黑;
                img{
                    width: 40px;
                    height: 40px;
                    padding: 6px;
                    border-radius: 50px;
                    border: 1px solid #2B4BAB;
                    vertical-align: middle;
                    display: inline-block;
                }
                h3{
                    font-size: 15px;
                    font-weight: normal;
                    color: #2B4BAB;
                    vertical-align: middle;
                    margin-left: 10px;
                    display: inline-block;
                }
            }
            .cont{
                p{
                    width: 50%;
                    display: inline-block;
                    padding: 4px 0;
                    font-size: 16px;
                    color: #2B4BAB;
                    span{
                        color: #666;
                        font-size: 14px;
                    }
                }
            }
            img{
                width: 35px;
                position: absolute;
                left: 20px;
                top: 25px;
            }
            h3{
                font-size: 14px;
                color: #2B4BAB;
                font-weight: normal;
            }
            .div{
                width: 50%;
                display: inline-block;
                h5{
                    font-size: 16px;
                    color: #333;
                    font-weight: normal;
                    margin: 3px 0 2px;
                }
                p{
                    font-size: 14px;
                    color: #888;
                }
            }
        }
    }
</style>