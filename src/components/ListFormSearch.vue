<template>
    <div class="formSearch" ref="formSearchRef">
        <a-form ref="formRef" :model="formState" name="basic" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }" autocomplete="off"
            @finish="onFinish" @finishFailed="onFinishFailed">
            <!-- <a-form-item label="标题" name="username"
                :rules="[{ required: true, message: 'Please input your username!' }]">
                <a-input v-model:value="formState.username" />
            </a-form-item>
            <a-form-item label="发起人" name="username"
                :rules="[{ required: true, message: 'Please input your username!' }]">
                <a-input v-model:value="formState.username" />
            </a-form-item> -->
            <a-form-item v-for="(item,index) in searchFields" :key="item.Name" :name="item.Name"
                :label="item.Label">
                <a-input v-if="item.DataType=='S'" :placeholder="item.Label" v-model:value="formState[item.Name]" />
                <a-date-picker :locale="locale" @change="(e)=>{changeDate(e,item)}" valueFormat="YYYY-MM-DD" v-else-if="item.DataType=='F'" :placeholder="item.Label" v-model:value="formState[item.Name]" />
                <a-select
                    v-model:value="formState[item.Name]"
                    v-else-if="item.DataType=='L'||item.DataType=='LT'||item.DataType=='DT'||item.DataType=='status'||item.DataType=='Priority'"
                    :placeholder="item.Label"
                    @change="handleChange">
                    <a-select-option value="jack">Jack</a-select-option>
                    <a-select-option value="lucy">Lucy</a-select-option>
                    <a-select-option value="disabled" disabled>Disabled</a-select-option>
                    <a-select-option value="Yiminghe">yiminghe</a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item class="formitembtn">
                <a-button type="primary" html-type="submit">搜索</a-button>
                <a-button style="margin-left: 10px" @click="resetForm">重置</a-button>
            </a-form-item>
        </a-form>
    </div>
</template>
<script setup>
    import { ref, reactive, onMounted, toRefs, getCurrentInstance, defineEmits, defineExpose } from "vue";
    import dayjs from 'dayjs';
    import 'dayjs/locale/zh-cn';
    import locale from 'ant-design-vue/es/date-picker/locale/zh_CN';
    dayjs.locale('zh-cn');
    import moment from "moment";
    import Interface from "@/utils/Interface.js";
    const { proxy } = getCurrentInstance();
    const formRef = ref();
    const formState = reactive({
    })
    // 搜索
    const onFinish = (values) => {
        console.log('Success:', values);
        emit("search", values)
    };
    // 重置
    const resetForm = () => {
        formRef.value.resetFields();
    }
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const data = reactive({
        searchFields: []
    })
    const { searchFields } = toRefs(data);
    const formSearchRef = ref();
    const emit = defineEmits(['update-height','search'])
    const getSearchLayout = () => {
        proxy.$get(Interface.formSearch,{}).then(res=>{
            // console.log("SearchFields", res);
            data.searchFields = res.returnValue.SearchFields;
            emit("update-height", formSearchRef.value.clientHeight)
            data.searchFields.forEach(item=>{
                formState[item.Name] = "";
            })
            // console.log("formState",formState)
        })
    }
    const handleChange = () =>{
        
    }
    const changeDate = (e,item) => {
        let time = moment(e).format("YYYY-MM-DD");
        // console.log(e, item, time);
    }
    onMounted(()=>{
        getSearchLayout();
    })
    defineExpose({resetForm})
</script>
<style lang="less">
    .formSearch{
        padding: 10px;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        .ant-form {
            display: flex;
            flex-wrap: wrap;
            /* align-items: center; */
            .ant-form-item{
                width: 200px;
                margin-right: 10px;
                margin-bottom: 10px !important;
                .ant-form-item-control-input-content{
                    display: flex;
                }
            }
            .ant-form-item.formitembtn{
                width: auto;
            }
        }
    }
</style>