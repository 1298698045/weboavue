<template>
    <div class="formSearch" ref="formSearchRef">
        <a-form ref="formRef" :model="formState" name="basic" autocomplete="off" @finish="onFinish"
            @finishFailed="onFinishFailed">
            <!-- <a-form-item label="标题" name="username"
                :rules="[{ required: true, message: 'Please input your username!' }]">
                <a-input v-model:value="formState.username" />
            </a-form-item>
            <a-form-item label="发起人" name="username"
                :rules="[{ required: true, message: 'Please input your username!' }]">
                <a-input v-model:value="formState.username" />
            </a-form-item> -->
            <div class="searchItem" v-for="(item,index) in searchFields" :key="item.Name">
                <a-form-item :name="item.Name" :label="item.Label" v-if="item.DataType=='S'">
                    <a-input class="radiusNone" :placeholder="item.Label" v-model:value="formState[item.Name]" />
                    <!-- <a-date-picker :locale="locale" @change="(e)=>{changeDate(e,item)}" valueFormat="YYYY-MM-DD" v-else-if="item.DataType=='F'" :placeholder="item.Label" v-model:value="formState[item.Name]" /> -->
                </a-form-item>
                <a-form-item :name="item.Name" :label="item.Label"
                    v-else-if="item.DataType=='L'||item.DataType=='LT'||item.DataType=='DT'||item.DataType=='status'||item.DataType=='Priority'">
                    <a-select v-model:value="formState[item.Name]" :placeholder="item.Label" @change="handleChange">
                        <a-select-option value="jack">Jack</a-select-option>
                        <a-select-option value="lucy">Lucy</a-select-option>
                        <a-select-option value="disabled" disabled>Disabled</a-select-option>
                        <a-select-option value="Yiminghe">yiminghe</a-select-option>
                    </a-select>
                </a-form-item>
                <a-form-item class="formTime" :name="item.Name" :label="item.Label" v-else-if="item.DataType=='F'">
                    <!--  v-if="item.dateTypeCurrent.value=='default'" v-model:value="formState[item.Name]" -->
                    <a-range-picker  style="border-right: none;" class="radiusNone" valueFormat="YYYY-MM-DD" :disabled="item.dateTypeCurrent.value=='default'?false:true" @change="(e)=>{changeRangeDate(e,item)}" />
                    <a-dropdown class="radiusNone">
                        <template #overlay>
                          <a-menu>
                            <a-menu-item v-for="(row,idx) in timeoperator" :key="row.value" @click="changeDateType(item,row)">
                                {{row.label}}
                            </a-menu-item>
                          </a-menu>
                        </template>
                        <a-button class="downBtn">
                          {{item.dateTypeCurrent.label}}
                          <DownOutlined />
                        </a-button>
                      </a-dropdown>
                </a-form-item>
            </div>
            <a-form-item class="formitembtn">
                <a-button type="primary"  class="radiusNone" html-type="submit">搜索</a-button>
                <a-button style="margin-left: 10px"  class="radiusNone" @click="resetForm">重置</a-button>
            </a-form-item>
        </a-form>
    </div>
</template>
<script setup>
    import { ref, reactive, onMounted, toRefs, getCurrentInstance, defineEmits, defineExpose, nextTick, defineProps, watch } from "vue";
    import {
        SearchOutlined,
        DownOutlined,
        UserOutlined,
    } from "@ant-design/icons-vue";
    import dayjs from 'dayjs';
    import 'dayjs/locale/zh-cn';
    import locale from 'ant-design-vue/es/date-picker/locale/zh_CN';
    dayjs.locale('zh-cn');
    import moment from "moment";
    import Interface from "@/utils/Interface.js";
    const { proxy } = getCurrentInstance();
    const formRef = ref();
    const formState = reactive({
    });
    
    const props = defineProps({
        isCollapsed: false
    });
    watch(()=>props.isCollapsed,(newVal,oldVal)=>{
        nextTick(()=>{
            emit("update-height", formSearchRef.value.clientHeight);
        })
    }, {deep: true});
    // 搜索
    const onFinish = (values) => {
        console.log('Success:', values);
        var filterQuery = "";
        data.searchFields.forEach(item=>{
            if(item.DataType=='F'){
                if(item.dateTypeCurrent.value=='default'){
                    filterQuery += "\n" + item.Name + "\tbetween\t" + values[item.Name];
                }else {
                    filterQuery += "\n" + item.Name + "\t" + values[item.Name];
                }
            }else {
                filterQuery += "\n" + item.Name + "\teq\t" + values[item.Name];
            }
        })
        console.log(filterQuery, "filterQuery");
        // emit("search", values);
        emit("search", filterQuery);
    };
    // 重置
    const resetForm = () => {
        formRef.value.resetFields();
        emit("search", "")
    }
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const timeoperator = [{
        label: '今天',
        value: 'today',
    }, {
        label: '昨天',
        value: 'yesterday',
    }, {
        label: '明天',
        value: 'tomorrow',
    }, {
        label: '本周',
        value: 'this-week',
    }, {
        label: '本月',
        value: 'this-month',
    }, {
        label: '上月',
        value: 'last-month',
    }, {
        label: '下月',
        value: 'next-month',
    }, {
        label: '今年',
        value: 'this-year',
    }, {
        label: '去年',
        value: 'last-year',
    }, {
        label: '本月生日',
        value: 'birthday-this-month',
    },{
        label: '自定义',
        value: 'default',
    }]
    const data = reactive({
        searchFields: [],
        dateType: "default",
        dateText: "自定义"
    })
    
    const { searchFields, dateType, dateText } = toRefs(data);
    const formSearchRef = ref();
    const emit = defineEmits(['update-height', 'search'])
    const changeDateType = (item,row) => {
        console.log(item,row);
        item.dateTypeCurrent = row;
        if(row.value!='default'){
            formState[item.Name] = row.value;
        }else {
            formState[item.Name] = [];
        }
    }

    const changeRangeDate = (e,item) => {
        console.log("e",e,item);
    }
    const getSearchLayout = () => {
        proxy.$get(Interface.formSearch, {}).then(res => {
            // console.log("SearchFields", res);
            data.searchFields = res.returnValue.SearchFields;
            nextTick(()=>{
                emit("update-height", formSearchRef.value.clientHeight);
            })
            data.searchFields.forEach(item => {
                formState[item.Name] = "";
                if(item.DataType=='F'){
                    item.dateTypeCurrent = {
                        value: "default",
                        label: "自定义"
                    }
                    formState[item.Name] = [];
                }
            })
            // console.log("formState",formState)
        })
    }
    const handleChange = () => {

    }
    const changeDate = (e, item) => {
        let time = moment(e).format("YYYY-MM-DD");
        // console.log(e, item, time);
    }
    onMounted(() => {
        getSearchLayout();
    })
    defineExpose({ resetForm })
</script>
<style lang="less">
    .formSearch {
        padding: 10px;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        background: #f7fbfe;
        .ant-form {
            display: flex;
            flex-wrap: wrap;

            /* align-items: center; */
            .ant-form-item {
                width: 200px;
                margin-right: 10px;
                margin-bottom: 10px !important;

                .ant-form-item-control-input-content {
                    display: flex;
                }
            }

            .ant-form-item.formTime {
                width: auto;
                .ant-picker{
                    width: 200px;
                }
            }

            .ant-form-item.formitembtn {
                width: auto;
            }
            .downBtn{
                width: 80px;
                padding: 0;
            }
        }
    }
</style>
<style>
    .formSearch :where(.css-dev-only-do-not-override-kqecok).ant-select-single .ant-select-selector{
        border-radius: 0 !important;
    }
</style>