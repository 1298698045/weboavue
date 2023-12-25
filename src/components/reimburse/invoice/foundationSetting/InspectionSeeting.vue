<template>
    <div class="enterWrap">
        <a-tabs v-model:activeKey="activeKey">
            <a-tab-pane key="1" tab="查验设置"></a-tab-pane>
            <a-tab-pane key="2" tab="定时查验"></a-tab-pane>
        </a-tabs>
        <div class="tabContent" v-if="activeKey==1">
            <div class="mainArea">
                <span class="main-tip">功能关闭后，app将无法使用相关功能</span>
                <div v-for="item in 10">
                    <div class="switchRoot">
                        <div class="rootl">
                            <div class="fontLabel">发票扫码</div>
                            <div class="fontDesc">支持扫发票二维码录入，需要开启发票查验服务才可使用</div>
                        </div>
                        <div class="rootr">
                            <a-switch></a-switch>
                        </div>
                    </div>
                    <div class="split-line"></div>
                </div>
            </div>
        </div>
        <div class="tabContent" v-else-if="activeKey==2">
            <div class="checktable">
                <div class="checktitle">
                    <div>
                        <span>定时查验发票</span>
                        <span> （可设置定时查验规则，系统将在指定时间内查验发票并会再次扣除接口次数） </span>
                    </div>
                    <div @click="handleAdd">
                        <PlusOutlined />
                        <span>添加</span>
                    </div>
                </div>
                <table>
                    <colgroup>
                        <col width="474">
                        <col width="472">
                    </colgroup>
                    <thead>
                        <tr>
                            <th>查验频率</th>
                            <th>查验泛微</th>
                        </tr>
                    </thead>
                </table>
            </div>
            <div class="paginFooter">
                <a-pagination v-model:current="current" :total="500" />
            </div>
        </div>
        <EditInspectionRule v-if="isShow" :isShow="isShow" @cancel="isShow=false" />
    </div>
</template>
<script setup>
    import {
        UnorderedListOutlined,
        DownOutlined,
        CaretDownOutlined,
        UserOutlined, PlusOutlined, MinusCircleOutlined
    } from "@ant-design/icons-vue";
    import { ref, watch, reactive, toRefs, onMounted, getCurrentInstance, onUpdated, h } from "vue";
    import EditInspectionRule from "@/components/reimburse/invoice/foundationSetting/model/EditInspectionRule.vue";
    import Interface from "@/utils/Interface.js";
    const { proxy } = getCurrentInstance();
    const data = reactive({
        activeKey: '1',
        current: 1,
        isShow: false
    });
    const { activeKey, current, isShow } = toRefs(data);
    const handleAdd = () => {
        data.isShow = true;
    }
</script>
<style lang="less" scoped>
    .split-line {
        height: 1px;
        width: 100%;
        background: #ebebeb;
        margin-top: 10px;
    }

    .enterWrap {
        width: 100%;
        height: 100%;

        .tabContent {
            height: calc(~"100% - 60px");
            overflow: auto;

            .mainArea {
                width: 800px;
                margin: 0 auto;
                padding: 20px 0 130px 0;

                .main-tip {
                    font-size: 12px;
                    color: #999;
                    font-weight: 400;
                    width: 100%;
                    height: 12px;
                    line-height: 12px;
                    margin-bottom: 20px;
                    display: inline-block;
                }

                .switchRoot {
                    margin-top: 10px;
                    display: flex;
                    justify-content: space-between;
                    align-items: self-start;

                    .rootl {
                        width: 90%;

                        .fontLabel {
                            height: 20px;
                            line-height: 20px;
                            width: 100%;
                            overflow: hidden;
                            white-space: nowrap;
                            text-overflow: ellipsis;
                            font-size: 14px;
                            color: #333;
                            font-weight: 400;
                        }

                        .fontDesc {
                            margin-top: 5px;
                            padding-bottom: 2px;
                            font-size: 12px;
                            color: #999;
                            font-weight: 400;
                            width: 100%;
                            /* overflow: hidden;
                            white-space: nowrap;
                            text-overflow: ellipsis; */
                        }
                    }

                    .rootr {}
                }
            }

            .mainArea.mainArea2 {
                .switchRoot {
                    margin-top: 20px;
                }
            }
        }
    }

    .rootTable {
        width: 100%;
        table-layout: fixed;
        border-collapse: separate;
        border: 1px solid #ebebeb;
        border-radius: 5px;
        margin-top: 10px;

        thead {
            color: #909399;
            font-weight: 500;
        }

        tr {
            background: #fff;

            th {
                padding: 5px 0;
                border: none;
            }

            td {
                padding: 3px 0;
                border: none;
                border-top: 1px solid #ebebeb;
                color: #666;
                height: 35px;
            }

            &:hover {}
        }

        tr:nth-child(2n) {
            background: #fbfbfb;
        }
    }

    .checktable {
        margin-top: 20px;
        .checktitle {
            height: 50px;
            display: flex;
            align-items: center;
            background: #fff;
            border: 1px solid #ebeef5;
            border-bottom: none;
            padding: 0 16px;
            justify-content: space-between;
            span:first-child{
                font-family: PingFang-SC-Medium;
                font-size: 14px;
                color: #111;
                line-height: 12px;
                font-weight: 700;
            }
            span:nth-child(2){
                font-size: 12px;
                color: #faad14;
                line-height: 12px;
                font-weight: 400;
                margin-left: 8px;
            }
            div:nth-child(2){
                span{
                    margin-left: 4px;
                    color: var(--textColor);
                    cursor: pointer;
                }
            }
        }

        table {
            width: 100%;
            border: 1px solid #ebeef5;
            border-collapse: collapse;

            thead {
                color: #909399;
                font-weight: 500;
            }

            th,
            td {
                height: 48px;
                padding: 0 10px;
                text-align: left;
            }
        }
    }
    .paginFooter{
        text-align: right;
        margin-top: 10px;
    }
</style>