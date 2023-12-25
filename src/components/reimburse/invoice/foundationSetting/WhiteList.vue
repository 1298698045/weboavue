<template>
    <div class="WhiteList">
        <div class="cvnHeader">
            <div class="cnvText">可设置购买方的企业名称和税号，设置后，企业类型的发票，只允许录入购买方的企业名称和税号完全一致的发票</div>
            <div class="cnvBtn">
                <a-button type="primary" @click="handleAdd">增加</a-button>
            </div>
        </div>
        <table class="table">
            <colgroup>
                <col name="el-table_4_column_19" width="25">
                <col name="el-table_4_column_3" width="168">
                <col name="el-table_4_column_4" width="166">
                <col name="el-table_4_column_5" width="166">
                <col name="el-table_4_column_6" width="166">
                <col name="el-table_4_column_7" width="166">
                <col name="el-table_4_column_8" width="166">
                <col name="el-table_4_column_9" width="166">
                <col name="el-table_4_column_10" width="166">
                <col name="el-table_4_column_11" width="55">
                <col name="gutter" width="8">
            </colgroup>
            <thead>
                <tr>
                    <th></th>
                    <th>校验内容</th>
                    <th>发票类型</th>
                    <th>企业名称</th>
                    <th>税号</th>
                    <th>地址、电话</th>
                    <th>开户行及账号</th>
                    <th>生效开始时间</th>
                    <th>生效结束时间</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in 8">
                    <td>{{item}}</td>
                    <td>
                        <a href=""> 抬头*税号 </a>
                    </td>
                    <td>
                        全部
                    </td>
                    <td>
                        <a href=""> 四川麒云网络科技有限公司 </a>
                    </td>
                    <td>
                        <a href=""> 91510100MA6CRR2Q5F </a>
                    </td>
                    <td>
                        <a href=""> 成都高新区天九南巷133号1层18010502867 </a>
                    </td>
                    <td>
                        <a href=""> 建设银行成都龙腾路支行51050148856100000420 </a>
                    </td>
                    <td>
                        <a href=""> 2023-12-14 16:00:29 </a>
                    </td>
                    <td>

                    </td>
                    <td>
                        <MinusCircleOutlined />
                    </td>
                </tr>
            </tbody>
        </table>
        <NewWhiteList :isShow="isShow" @cancel="isShow=false" />
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
   import NewWhiteList from "@/components/reimburse/invoice/foundationSetting/model/NewWhiteList.vue";
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
                    a{
                        color: #333;
                        &:hover{
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