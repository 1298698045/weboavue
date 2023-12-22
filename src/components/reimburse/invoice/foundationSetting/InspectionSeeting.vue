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
            <div class="mainArea mainArea2">
                <div>
                    <div class="switchRoot">
                        <div class="rootl">
                            <div class="fontLabel">手动录入发票文件是否必传</div>
                            <div class="fontDesc">开启后，手动录入如果没有发票文件将禁止录入</div>
                        </div>
                        <div class="rootr">
                            <a-switch></a-switch>
                        </div>
                    </div>
                    <div class="switchRoot">
                        <div class="rootl">
                            <div class="fontLabel">手动录入的发票文件上传，是否使用发票识别功能</div>
                            <div class="fontDesc">使用发票识别功能，会调用发票识别接口。默认开启，使用发票识别，关闭后，则不使用发票识别，只做文件上传</div>
                        </div>
                        <div class="rootr">
                            <a-switch></a-switch>
                        </div>
                    </div>
                    <div class="switchRoot">
                        <div class="rootl">
                            <div class="fontLabel">电子发票文件格式校验
                                <a-checkbox v-model:checked="checked">不包含油票类电子发票</a-checkbox>
                            </div>
                            <div class="fontDesc">发票是电子发票，则只支持文件格式是PDF或OFD的原文件，其他格式禁止录入</div>
                        </div>
                        <div class="rootr">
                            <a-switch></a-switch>
                        </div>
                    </div>
                    <div class="switchRoot">
                        <div class="rootl">
                            <div class="fontLabel">公司签章</div>
                            <div class="fontDesc">
                                对支持签章识别的发票，有签章才可以录入，无签章禁止录入，校验的发票类型有：增值税电子发票、机打发票、增值税普通发票、定额发票、机动车销售统一发票</div>
                        </div>
                        <div class="rootr">
                            <a-switch></a-switch>
                        </div>
                    </div>
                    <div class="switchRoot">
                        <div class="rootl">
                            <div class="fontLabel">个人类型的发票按用户姓名校验</div>
                            <div class="fontDesc">发票录入时校验购买方名称和当前用户姓名是否一致，如果不一致，禁止录入。默认关闭，则不校验，开启后校验。</div>
                        </div>
                        <div class="rootr">
                            <a-switch></a-switch>
                        </div>
                    </div>
                    <div class="switchRoot">
                        <div class="rootl">
                            <div class="fontLabel">是否禁止录入个人抬头的发票</div>
                            <div class="fontDesc">设置对象包括增值税类发票和机打发票，即有购买方抬头信息的发票，若开启，则不允许个人抬头的发票录入，默认关闭，表示允许录入个人抬头的发票。
                            </div>
                        </div>
                        <div class="rootr">
                            <a-switch></a-switch>
                        </div>
                    </div>
                    <div class="switchRoot">
                        <div class="rootl">
                            <div class="fontLabel">发票联次控制
                                <a-checkbox-group v-model:value="value">
                                    <a-checkbox value="发票联">发票联</a-checkbox>
                                    <a-checkbox value="抵扣联">抵扣联</a-checkbox>
                                    <a-checkbox value="记账联">记账联</a-checkbox>
                                    <a-checkbox value="存根联">存根联</a-checkbox>
                                </a-checkbox-group>
                            </div>
                            <div class="fontDesc">默认所有联次可以录入，勾选的将禁止录入
                            </div>
                        </div>
                        <div class="rootr">
                            <a-switch></a-switch>
                        </div>
                    </div>
                    <div class="switchRoot">
                        <div class="rootl">
                            <div class="fontLabel">不允许指定的发票类型录入</div>
                            <div class="fontDesc">默认为空，允许所有类型的发票录入，可设置指定的发票类型不让录入</div>
                            <a-button :icon="h(PlusOutlined)" href="https://www.google.com" />
                        </div>
                    </div>
                    <div class="switchRoot">
                        <div class="rootl">
                            <div class="fontLabel">是否禁止编辑发票金额</div>
                            <div class="fontDesc">默认开关关闭，允许所有类型的发票识别后编辑金额，可设置指定类型的发票不允许编辑；开关打开，禁止所有类型的发票编辑金额</div>
                            <div class="fontDesc">影响字段：价税合计、税额、不含税金额、税率</div>
                            <a-button :icon="h(PlusOutlined)" href="https://www.google.com" />
                        </div>
                        <div class="rootr">
                            <a-switch></a-switch>
                        </div>
                    </div>
                    <div class="switchRoot">
                        <div class="rootl">
                            <div class="fontLabel">是否按发票来源允许编辑发票金额</div>
                            <div class="fontDesc">默认开关关闭，所有录入来源的发票均可编辑发票金额；开关打开，可设置指定录入类型的发票允许编辑金额</div>
                            <div class="fontDesc">影响字段：价税合计、税额、不含税金额、税率</div>
                        </div>
                        <div class="rootr">
                            <a-switch></a-switch>
                        </div>
                    </div>
                    <div class="switchRoot">
                        <div class="rootl">
                            <div class="fontLabel">关键字过滤</div>
                            <div class="fontDesc">可设置关键字，若是发票明细中包含对应的关键字，则对应发票禁止录入</div>
                            <table class="rootTable">
                                <colgroup>
                                    <col name="el-table_3_column_18" width="25">
                                    <col name="el-table_3_column_1" width="710">
                                    <col name="el-table_3_column_2" width="55">
                                </colgroup>
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>敏感词</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="item in 8">
                                        <td>{{item}}</td>
                                        <td>
                                            茅台
                                        </td>
                                        <td>
                                            <MinusCircleOutlined />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="rootr">
                            <a-button type="primary">增加</a-button>
                        </div>
                    </div>
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
        UserOutlined, PlusOutlined, MinusCircleOutlined
    } from "@ant-design/icons-vue";
    import { ref, watch, reactive, toRefs, onMounted, getCurrentInstance, onUpdated, h } from "vue";
    import Interface from "@/utils/Interface.js";
    const { proxy } = getCurrentInstance();
    const data = reactive({
        activeKey: '1'
    });
    const { activeKey } = toRefs(data);
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
            &:hover{

            }
        }
        tr:nth-child(2n){
            background: #fbfbfb;
        }
    }
</style>