<template>
    <div class="formSearch">
        <a-form :model="formState" name="basic" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }" autocomplete="off"
            @finish="onFinish" @finishFailed="onFinishFailed">
            <a-form-item label="标题" name="username"
                :rules="[{ required: true, message: 'Please input your username!' }]">
                <a-input v-model:value="formState.username" />
            </a-form-item>
            <a-form-item label="发起人" name="username"
                :rules="[{ required: true, message: 'Please input your username!' }]">
                <a-input v-model:value="formState.username" />
            </a-form-item>
            <a-form-item v-for="(item,index) in searchFields" :key="item.Name" :name="item.Name"
                :label="item.Label">
                <a-input v-if="item.DataType=='S'" />
                <a-date-picker v-else-if="item.DataType=='F'" />
            </a-form-item>
            <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
                <a-button type="primary" html-type="submit">搜索</a-button>
            </a-form-item>
        </a-form>
    </div>
</template>
<script setup>
    import { ref, reactive, onMounted, toRefs, getCurrentInstance } from "vue";
    import Interface from "@/utils/Interface.js";
    const { proxy } = getCurrentInstance();
    const formState = reactive({
        username: ''
    })
    const onFinish = (values) => {
        console.log('Success:', values);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const data = reactive({
        searchFields: []
    })
    const { searchFields } = toRefs(data);
    const getSearchLayout = () => {
        proxy.$get(Interface.formSearch,{}).then(res=>{
            console.log("SearchFields", res);
            data.searchFields = res.returnValue.SearchFields;
        })
    }
    onMounted(()=>{
        getSearchLayout();
    })
</script>