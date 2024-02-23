<template>
    <div>
        <div class="headerOption">
            <a-upload
                v-model:file-list="fileList"
                name="file"
                action="file.attachment.upload"
                :headers="headers"
                @change="handleChange"
            >
                <template #itemRender="{ file, actions }"> </template>
                <a-button type="primary">
                    上传附件
                </a-button>
            </a-upload>
        </div>
        <a-table :scroll="{ x: '1400px' | true }"  :columns="columns" :data-source="dataList" :pagination="false">
            <template #bodyCell="{ column, record, index }">
                <template v-if="column.key === 'action'">
                    <span>
                      <a>查看</a>
                      <a-divider type="vertical" />
                      <a>下载</a>
                      <a-divider type="vertical" />
                      <a>
                        删除
                      </a>
                    </span>
                  </template>
            </template>
        </a-table>
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
        h
    } from "vue";
    import dayjs from 'dayjs';
    import 'dayjs/locale/zh-cn';
    import locale from 'ant-design-vue/es/date-picker/locale/zh_CN';
    dayjs.locale('zh-cn');
    import calendar from 'dayjs/plugin/calendar';
    import weekday from 'dayjs/plugin/weekday';
    import localeData from 'dayjs/plugin/localeData';
    
    dayjs.extend(calendar);
    dayjs.extend(weekday);
    dayjs.extend(localeData);
    import { SearchOutlined, DeleteOutlined, PlusOutlined, CopyOutlined } from "@ant-design/icons-vue";
    import { message } from "ant-design-vue";


    import Interface from "@/utils/Interface.js";
    const { proxy } = getCurrentInstance();
    const data = reactive({
        columns: [
            {
                title: '操作',
                key: 'action',
            },
            {
                title: "名称",
                dataIndex: "Name",
                key: "Name"
            },
            {
                title: "创建时间",
                dataIndex: "CreatedOn",
                key: "CreatedOn"
            }
        ],
        dataList: [
        ],
        
        search: {},
        localId: "",
        recordVal: {},
        fileList: [],
        headers: {
            authorization: 'authorization-text',
        }
    });
    const field = {};
    const { columns, dataList, search, localId, recordVal, headers, fileList } = toRefs(data);
    const getQuery = () => {
        proxy.$get(Interface.files,{
            id: ""
        }).then(res=>{
            data.dataList = res.listData;
        })
    };
    getQuery();
    const handleChange = (e) => {
        console.log("e", e);
    }
</script>
<style lang="less" scoped>
    .searchItem{
        position: relative;
        .selectIcon{
            position: absolute;
            right: 10px;
            top: 5px;
        }
    }
    .headerOption{
        text-align: right;
        padding-bottom: 20px;
    }
</style>