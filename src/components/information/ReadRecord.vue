<template>
    <div class="ReadRecordWrap">
        <div class="panel">
            <div class="panel-head">
                <div class="panel-title" v-if="isTitle">
                    阅读记录
                </div>
                <div class="panel-btn">
                </div>
            </div>
            <div class="panel-bd">
                <div class="panelReadRecordWrap">
                    <div class="ReadRecordList">
                        <div class="ReadRecordItemBox" v-for="(item,index) in listData" :key="index">
                            <div class="leftAvatar">
                                <a-avatar :size="37">
                                    <template #icon><UserOutlined /></template>
                                </a-avatar>
                            </div>
                            <div class="rightReadRecord">
                                <div class="ReadRecordName">{{item.DeptName}} / {{item.ReaderName}}</div>
                                <div class="ReadRecordTime">
                                    {{item.CreatedOn}}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="pagination">
                        <a-pagination v-model:current="page" :total="total" show-less-items />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
    import { ref, reactive, onMounted, toRefs, getCurrentInstance, defineEmits, toRaw, defineProps } from "vue";
    import { UserOutlined } from "@ant-design/icons-vue";
    import { notification } from 'ant-design-vue';
    import Interface from "@/utils/Interface.js";
    const { proxy } = getCurrentInstance();
    const props = defineProps({
        isTitle: {
            default: true,
            type: Boolean
        }
    })
    const data = reactive({
        listData: [],
        page: 1,
        rows: 10,
        total: 0,
        ReadRecord: "",
    })
    const { listData, page, rows, total, ReadRecord } = toRefs(data);
    const getReadRecordList = () => {
        proxy.$get(Interface.information.readList,{
            NewsId: data.id,
            pageNumber: data.pageNumber,
            pageSize: data.pageSize
        }).then(res=>{
            data.listData = res.listData;
            data.total = res.total;
        })
    }
    getReadRecordList();    
</script>
<style lang="less">
    .ReadRecordWrap{
        width: 100%;
        .panelReadRecordWrap{
            padding: 0 80px;
            .ReadRecordBox{
                display: flex;
                .leftAvatar{
                    margin-right: 12px;
                }
                .rightTextare{
                    flex: 1;
                    border-radius: 2px;
                    .textarea{
                        width: 100%;
                        height: 100px;
                        min-height: 22px;
                        border-radius: 2px;
                        background: #f2f3f5;
                        padding-top: 6px;
                        padding-left: 12px;
                        font-size: 14px;
                        border: none;
                        outline: 0;
                        resize: vertical;
                    }
                }
            }
            .optionalWrap{  
                text-align: right;
                padding-top: 10px;
            }
            .ReadRecordList{
                .ReadRecordItemBox{
                    display: flex;
                    margin-top: 20px;
                    .leftAvatar{
                        font-size: 36px;
                        color: #C9CDD4;
                        margin-right: 12px;
                    }
                    .rightReadRecord{
                        flex: 1;
                        overflow: hidden;
                        line-height: 23px;
                        position: relative;
                        top: 5px;
                        .ReadRecordName{
                            font-size: 14px;
                            color: #ff7d00;
                        }
                        .ReadRecordContent{
                            margin: 6px 0;
                        }
                        .ReadRecordTime{
                            font-size: 12px;
                            color: #86909c;
                        }
                    }
                }
            }
            .pagination{
                margin-top: 20px;
                text-align: right;
                max-height: 74px;
            }
        }
    }
</style>