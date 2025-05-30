<template>
    <div style="height: 100%;position: relative;">
        <div class="table-content" :class="themeType" ref="refContent">
            <div class="fixedTable" :class="{'active':isWidthChange}" v-if="isWidthChange">
                <table :class="themeType+'_table'">
                    <thead>
                        <tr>
                            <th v-for="(item, index) in computedColumns" :key="index" :style="{width:item.width ? item.width : 'auto'}">
                                <div>
                                    {{item.label}}
                                </div>
                            </th>
                        </tr>
                    </thead>
                </table>
            </div>
            <table :class="themeType+'_table'">
                <colgroup>
                    <!-- <col style="width: 54px; min-width: 54px;" v-if="themeType=='modern'">
                    <col style="width: 148.678px; min-width: 148.678px;">
                    <col style="width: 148.678px; min-width: 148.678px;">
                    <col style="width: 148.678px; min-width: 148.678px;">
                    <col style="width: 148.678px; min-width: 148.678px;">
                    <col style="width: 0px; min-width: 0px;"> -->
                </colgroup>
                <thead>
                    <tr>
                        <!-- <th v-if="themeType=='modern'">
                            <a-checkbox></a-checkbox>
                        </th> -->
                        <th v-for="(item, index) in computedColumns" :key="index" :style="{width:item.width ? item.width : 'auto'}">
                            <div>
                                {{item.label}}
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody v-if="themeType=='modern'">
                    <tr v-for="(item, index) in tableData" :key="index" @click="handleDetail(item)">
                        <!-- <td>
                            <span>
                                <div class="ebcoms-column">
                                    <a-checkbox></a-checkbox>
                                </div>
                            </span>
                        </td> -->
                        <td v-for="(column, idx) in computedColumns" :key="idx">
                            <span>
                                <div class="ebcoms-column">
                                    <span>
                                        <span v-html="item[column.column]"></span>
                                    </span>
                                </div>
                            </span>
                        </td>
                    </tr>
                </tbody>
                <tbody v-if="themeType=='default'">
                    <tr v-for="(item, index) in tableData" :key="index" @click="handleDetail(item)">
                        <td v-for="(column, idx) in computedColumns" :key="idx">
                            <span class="td-span">
                                <!-- <div class="ebcoms-column">
                                    {{item[column.column]}}
                                </div> -->
                                <a href="javascript:void(0);">
                                    <span>
                                        <span v-html="item[column.column]"></span>
                                    </span>
                                </a>
                            </span>
                        </td>
                    </tr>
                </tbody>
                <tbody v-if="themeType=='light'">
                    <tr v-for="(item, index) in tableData" :key="index" @click="handleDetail(item)">
                        <td v-for="(column, idx) in computedColumns" :key="idx">
                            <span>
                                <span v-html="item[column.column]"></span>
                            </span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <!-- <div class="table-grid-tfoot">
            <a-pagination v-model:current="pageNumber" size="small" show-quick-jumper :showSizeChanger="false" :total="500" @change="changePagination" />
        </div> -->
    </div>
</template>
<script setup>
    import { ref, reactive, toRefs, defineProps, computed, nextTick, onMounted } from "vue";

    const refContent = ref(null);
    import { useRoute, useRouter } from "vue-router";
    const router = useRouter();
    const props = defineProps({
        config: Object,
        columns: {
            type: Array,
            default: () => []
        },
        themeType: String,
        tableData: {
            type: Array,
            default: () => []
        }
    });
    const data = reactive({
        tableColumns: [
            {
                column: "id",
                label: "订单编号"
            },
            {
                column: "name",
                label: "供应商"
            },
            {
                column: "amount",
                label: "合同金额"
            },
            {
                column: "code",
                label: "订单状态"
            },
        ],
        listData: [
            {
                id: "CG_202310100137",
                name: "华泰机械制造有限公司",
                amount: "30000.00",
                code: 1
            },
            {
                id: "CG_202310100137",
                name: "华泰机械制造有限公司",
                amount: "30000.00",
                code: 1
            },
            {
                id: "CG_202310100137",
                name: "华泰机械制造有限公司",
                amount: "30000.00",
                code: 1
            }
        ],
        pageNumber: 1,
        isWidthChange: false
    });
    const { tableColumns, listData, pageNumber, isWidthChange } = toRefs(data);
    const computedColumns = computed(()=>{
        return props.columns.length > 0 ? props.columns : data.tableColumns;
    });

    const changePagination = (e) => {

    };
    onMounted(() => {
        nextTick(()=>{
            setTimeout(()=>{
                let height = refContent.value.clientHeight;
                let scrollHeight = refContent.value.scrollHeight;
                if(height < scrollHeight){
                    data.isWidthChange = true;
                }
            }, 1000)
        })
    });

    const handleDetail = (item) => {
        console.log("config", props.config);
        console.log(item);
        let isParams = props.config.detailUrl.indexOf('?');
        if (isParams != -1) {
            let params = props.config.detailUrl.split("?")[1];
            let arrParams = params.split("&");
            let d = {
                id: item.LIST_RECORD_ID
            };
            arrParams.forEach(item => {
                let strArr = item.split("=");
                let key = strArr[0];
                let value = strArr[1];
                d[key] = value;
            });
            const url = router.resolve({
                path: props.config.detailUrl,
                query: d
            });
            window.open(url.href);
        } else {
            const url = router.resolve({
                path: props.config.detailUrl,
                query: {
                    id: item.LIST_RECORD_ID
                }
            });
            window.open(url.href);
        }
    }

</script>
<style lang="less" scoped>
    table{
        table-layout: fixed;
    }
    table.modern_table{
        width: 100%;
        border-collapse: collapse;
        thead{
            tr{
                th{
                    height: 35px;
                    background: #fbfbfb;
                    border-top: 1px solid transparent;
                    border-right: 1px solid transparent;
                    border-left: 1px solid transparent;
                    color: #333333;
                    font-size: 14px;
                    padding: 0 16px;
                    font-weight: 500;
                    border-bottom: 1px solid #f2f2f2;
                    text-align: left;
                    white-space: nowrap;
                }
            }
        }
        tbody{
            tr{
                &:hover{
                    cursor: pointer;
                    background: #f5f5f5;
                }
                td{
                    height: 40px;
                    display: table-cell;
                    vertical-align: middle;
                    word-break: break-word;
                    font-size: 14px;
                    color: #666;
                    font-weight: normal;
                    border-bottom: 1px solid #f2f2f2;
                    .ebcoms-column{
                        display: flex;
                        align-items: center;
                        height: 100%;
                        padding: 6px 12px;
                        width: inherit;
                    }
                }
            }
        }
    }
    .table-content{
        height: calc(100% - 42px);
        overflow: auto;
    }
    .table-grid-tfoot{
        padding: 8px 12px;
        overflow: hidden;
        border-top: 1px solid #f2f2f2;
        text-align: right;
    }
    .table-content.light{
        height: 100%;
    }
    table.default_table{
        width: 100%;
        border-collapse: collapse;
        thead{
            tr{
                padding: 8px 0 7px 0;
                height: 65px;
                th{
                    padding: 1px 0;
                    border-bottom: 1px solid #e9e9e9;
                    overflow: hidden !important;
                    white-space: nowrap !important;
                    text-overflow: ellipsis !important;
                    background-color: #f7fbfe;
                    border-bottom-width: 2px;
                    font-weight: 400;
                    color: #666;
                    text-align: left;
                    white-space: nowrap;
                    div{
                        padding: 10px !important;
                        display: inline-block;
                        width: 100%;
                    }
                }
            }
        }
        tbody{
            tr{
                &:hover{
                    background: #e9f7ff;
                    cursor: pointer;
                }
                td{
                    table-layout: fixed;
                    vertical-align: top;
                    word-break: break-all;
                    border-bottom: 1px solid #e2e2e2 !important;
                    overflow: hidden !important;
                    white-space: nowrap !important;
                    text-overflow: ellipsis !important;
                    border: none;
                    padding: 4px 1px 3px;
                    font-size: 13px;
                    height: 28px;
                    .td-span{
                        position: relative;
                        width: 100%;
                        display: block;
                        a{
                            color: #333333 !important;
                            max-width: 100% !important;
                            display: inline-block;
                            white-space: nowrap;
                            &:hover{
                                color: #4d7ad8 !important;
                            }
                        }
                    }
                }
            }
            tr:nth-child(2n){
                background: #fafafa;
            }
        }
    }
    table.light_table{
        width: 100%;
        border-collapse: collapse;
        thead{
            tr{
                th{
                    border-bottom: 1px solid #a8b7c7;
                    background-color: #f3f3f3;
                    color: #444;
                    vertical-align: middle;
                    font-weight: normal;
                    text-align: left;
                    font-size: 12px;
                    border-left: 1px solid #e1e6ef;
                    border-right: 1px solid #c9c9c9;
                    border-top: 1px solid #c9c9c9;
                    height: 35px;
                    white-space: nowrap;
                    &>div{
                        padding-left: 6px;
                        padding-right: 6px;
                        padding-top: 6px;
                        padding-bottom: 6px;
                    }
                }
            }
        }
        tbody{
            tr{
                td{
                    border-bottom: 1px solid #c9c9c9;
                    border-left: 1px solid #c9c9c9;
                    border-right: 1px solid #c9c9c9;
                    font-size: 12px;
                    font-weight: 400;
                    color: #16315a;
                    fill: #16315a;
                    line-height: 1;
                    padding-left: 6px;
                    padding-right: 6px;
                    padding-top: 6px;
                    padding-bottom: 6px;
                    height: 29px;
                }
            }
        }
    }
    .fixedTable{
        width: 100%;
        position: absolute;
        top: -1px;
        z-index: 999;
        &.active{
            width: calc(100% - 10px);
        }
    }
</style>
<style lang="less">
    .ebcoms-column {
        a {
            color: #333333 !important;
            font-size: 14px !important;

            &:hover {
                text-decoration: underline !important;
            }
        }
    }
    /* .td-span a{
        color: #333333 !important;
        max-width: 100% !important;
        display: inline-block;
        white-space: nowrap;
        &:hover{
            color: #4d7ad8 !important;
        }
    } */
    .td-span {
        a {
            color: #333333 !important;
            font-size: 14px !important;

            &:hover {
                text-decoration: underline;
            }
        }
    }
    .light_table {
        td {
            a {
                color: #333333 !important;
                font-size: 14px !important;

                &:hover {
                    text-decoration: underline;
                }
            }
        }
    }
</style>