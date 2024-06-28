<template>
    <div>
        <a-modal v-model:open="props.isShow" width="640px" :style="setTop" :maskClosable="false" @cancel="handleCancel" @ok="handleSubmit">
            <template #title>
                <div class="modal_title">
                    新建图表
                 </div>
            </template>
            <div class="modalContainer" ref="modelContentRef">
                <div class="modalCenter">
                    <a-form :model="formState" ref="formRef">
                        <a-form-item name="Name" label="图表名称" :rules="[{ required: true, message: '请输入列表名称!' }]">
                            <a-input v-model:value="formState.Name" />
                        </a-form-item>
                        <a-form-item label="图表类型">
                            <a-select v-model:value="formState.ChartType">
                                <a-select-option :value="item.value" v-for="(item, index) in chartTypes" :key="index">{{item.name}}</a-select-option>
                            </a-select>
                        </a-form-item>
                        <a-form-item label="合计类型">
                            <a-select v-model:value="formState.AggregateType">
                                <a-select-option value="Avg">平均值</a-select-option>
                                <a-select-option value="Sum">总和</a-select-option>
                                <a-select-option value="Count">计数</a-select-option>
                            </a-select>
                        </a-form-item>
                        <a-form-item label="合计字段">
                            <a-select v-model:value="formState.AggregateField">
                                <a-select-option v-for="(item,index) in attributes" :key="item.fieldName" :label="item.label" :value="item.id">{{item.label}}</a-select-option>
                            </a-select>
                        </a-form-item>
                        <a-form-item label="分组字段">
                            <a-select v-model:value="formState.GroupingField">
                                <a-select-option v-for="(item,index) in attributes" :key="item.fieldName" :label="item.label" :value="item.id">{{item.label}}</a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-form>
                </div>
            </div>
            <template #footer>
                <div>
                    <a-button @click="handleCancel">取消</a-button>
                    <a-button type="primary" @click.prevent="handleSubmit">保存</a-button>
                </div>
            </template>
        </a-modal>
    </div>
</template>
<script setup>
    import { ref, watch, reactive, toRefs, onMounted, getCurrentInstance, onUpdated, defineProps,defineExpose,
        defineEmits, computed } from "vue";
    import { SearchOutlined } from "@ant-design/icons-vue";
    import { message } from "ant-design-vue";
    import Interface from "@/utils/Interface.js";
    const { proxy } = getCurrentInstance();
    const formRef = ref(null);
    const labelCol = ref({ style: { width: '100px' } });
    const props = defineProps({
        isShow: Boolean,
        sObjectName:String,
        recordId:String,
        filterId: String,
    })
    const emit = defineEmits(['cancel','success']);
    const modelContentRef = ref(null);
    
    const data = reactive({
        top: "",
        chartTypes: [],
        attributes: [],
        select: {}
    })
    const { top, chartTypes, attributes, select } = toRefs(data);
    const formState = reactive({
        Name: "",
        ChartType: "",
        AggregateType: "",
        GroupingField: "",
        AggregateField: ""
    })
    const getField = () => {
        proxy.$get(Interface.objFieldData, {
            entityApiName: props.sObjectName
        }).then(res=>{
            data.attributes = res.attributes;
            // data.attributes.forEach(item=>{
            //     if(item.fieldName == 'AggregateType' || item.fieldName == 'GroupingField' || item.fieldName == 'AggregateField'){
            //         data.select[item.fieldName] = item.filterValues;
            //     }
            // })
        })
    }
    getField();
    const handleSearch = (val) =>{
        console.log('val',val);
        getPeople(val)
    }
    const handleChange = (e) =>{
    }

    const getMethodData = () => {
        let obj = {
            actions: [{
                id: "0157;a",
                descriptor: "",
                callingDescriptor: "UNKNOWN",
                params: {
                    scope: "Lead",
                    listViewId: props.filterId
                }
            }]
        }
        let d = {
            message: JSON.stringify(obj)
        }
        proxy.$post(Interface.listView.chartData, d).then(res=>{
            let { chartTypes } = res.actions[0].returnValue;
            data.chartTypes = chartTypes;

        })
    }
    getMethodData();
    onMounted(()=>{
        let h = modelContentRef.value.clientHeight;
        data.top = (h + 126) / 2 + 'px';
    })
    const setTop = computed(() => ({
        top: data.top
    }));
    const handleCancel = ()=> {
        emit("cancel", false);
    }
    const handleSubmit = ()=> {
        formRef.value.validate().then(() => {
            let obj = {
                actions: [{
                    id: "2919;a",
                    descriptor: "",
                    callingDescriptor: "UNKNOWN",
                    recordInput: {
                        allowSaveOnDuplicate: false,
                        apiName: "ListViewChart",
                        objTypeCode: 1040,
                        fields: {
                            ListViewId: props.filterId,
                            ChartType: formState.ChartType,
                            AggregateType: formState.AggregateType,
                            GroupingField: formState.GroupingField,
                            AggregateField: formState.AggregateField
                        }
                    }
                }]
            };
            let d = {
                message: JSON.stringify(obj)
            }
            proxy.$post(Interface.create, d).then(res=>{
                message.success("保存成功！");
                emit("success", false);
            })
        }).catch((err) => {
            console.log("error", err);
        });
    }
</script>
<style lang="less" scoped>
    @import url('@/style/modal.less');
    .modalCenter{
        /* height: auto !important; */
        height: 300px;
    }
    .ant-form-item{
        padding: 25px 40px 15px 40px;
    }
</style>