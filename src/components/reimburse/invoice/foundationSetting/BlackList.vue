<template>
    <div class="WhiteList">
        <div class="cvnHeader">
            <div class="cnvText">可设置销售方的企业名称和税号，设置后，销售方的企业名称和税号完全一致的发票禁止录入</div>
            <div class="cnvBtn">
                <a-button type="primary" @click="handleAdd">增加</a-button>
            </div>
        </div>
        <table class="table">
            <colgroup>
                <col name="el-table_5_column_20" width="25">
                <col name="el-table_5_column_12" width="665">
                <col name="el-table_5_column_13" width="665">
                <col name="el-table_5_column_14" width="55">
                <col name="gutter" width="8">
            </colgroup>
            <thead>
                <tr>
                    <th></th>
                    <th>企业名称</th>
                    <th>税号</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in 8">
                    <td>{{item}}</td>
                    <td>
                        <a href=""> 成都市华远投资有限公司 </a>
                    </td>
                    <td>
                        <a href=""> 91510121057470767M </a>
                    </td>
                    <td>
                        <MinusCircleOutlined />
                    </td>
                </tr>
            </tbody>
        </table>
        <NewBlackList :isShow="isShow" @cancel="isShow=false" />
    </div>
</template>
<script setup>
    import {
        UnorderedListOutlined,
        DownOutlined,
        CaretDownOutlined,
        UserOutlined, MinusCircleOutlined
    } from "@ant-design/icons-vue";
    import { ref, watch, reactive, toRefs, onMounted, getCurrentInstance, onUpdated } from "vue";
    import NewBlackList from "@/components/reimburse/invoice/foundationSetting/model/NewBlackList.vue";

    import Interface from "@/utils/Interface.js";
    const { proxy } = getCurrentInstance();
    const data = reactive({
        isShow: false
    });
    const { isShow } = toRefs(data);
    const handleAdd = () => {
        data.isShow = true;
    }
</script>
<style lang="less" scoped>
    .WhiteList {
        width: 100%;
        height: 100%;

        .cvnHeader {
            .cnvText {
                font-size: 12px;
                color: #999;
                font-weight: 400;
            }

            .cnvBtn {
                margin: 16px 0;
            }
        }

        .table {
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
                    min-height: 35px;

                    a {
                        color: #333;

                        &:hover {
                            color: var(--textColor);
                            text-decoration: underline;
                        }

                        line-height: 24px;
                    }
                }

                &:hover {}
            }

            tr:nth-child(2n) {
                background: #fbfbfb;
            }
        }
    }
</style>