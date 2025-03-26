<template>
    <div>
        <a-modal v-model:open="props.isShow" width="640px" :style="setTop" :maskClosable="false" @cancel="handleCancel" @ok="handleSubmit">
            <template #title>
                <div class="modal_title">
                    {{recordId ? '编辑' : '新建'}}图表
                 </div>
            </template>
            <div class="modalContainer" ref="modelContentRef">
                <div class="modalCenter" :style="{ height: height + 'px' }">
                    <a-form :model="formState" ref="formRef" :label-col="labelCol" labelAlign="left">
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
                                <a-select-option v-for="(item,index) in aggregateFields" :key="item.fieldName" :label="item.label" :value="item.name">{{item.label}}</a-select-option>
                            </a-select>
                        </a-form-item>
                        <a-form-item label="分组字段">
                            <a-select v-model:value="formState.GroupingField">
                                <a-select-option v-for="(item,index) in attributes" :key="item.fieldName" :label="item.label" :value="item.name">{{item.label}}</a-select-option>
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
        select: {},
        height: document.documentElement.clientHeight - 300,
        // aggregateFields: [],
        // groupingFields: []
    })
    const { top, chartTypes, attributes, select, height, groupingFields } = toRefs(data);
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
            // data.aggregateFields = res.attributes.filter(item=>item.dType == 'Numeric');
            // data.groupingFields = res.attributes.filter(item=>item.dType == 'Numeric');
        })
    }
    getField();

    const aggregateFields = computed(()=>{
        let temp = [];
        if(formState.AggregateType == 'Avg' || formState.AggregateType == 'Sum'){
            temp = data.attributes.filter(item=>item.dType == 'Numeric');
        }else {
            temp = data.attributes;
        }
        return temp;
    })

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
        top: `calc(50% - ${data.top})`,
    }));

    const getDetail = () => {
        let obj = {
            actions: [{
                id: "4270;a",
                descriptor: "aura://RecordUiController/ACTION$getRecordWithFields",
                callingDescriptor: "UNKNOWN",
                params: {
                    recordId: props.recordId,
                    apiName: "ListViewChart"
                }
            }]
        }
        let d = {
            message: JSON.stringify(obj)
        }
        proxy.$post(Interface.detail, d).then(res => {
            let fields = res.actions[0].returnValue.fields;
            console.log(fields);
            formState.Name = fields.Name.displayValue;
            formState.ChartType = fields.ChartType.displayValue;
            formState.AggregateType = fields.AggregateType.displayValue;
            formState.AggregateField = fields.AggregateField.displayValue;
            formState.GroupingField = fields.GroupingField.displayValue;
        });
    };
    if(props.recordId){
        getDetail();
    }


    const handleCancel = ()=> {
        emit("cancel", false);
    }
    const handleSubmit = ()=> {
        formRef.value.validate().then(() => {
            let url = Interface.create;
            let obj = {
                actions: [{
                    id: "2919;a",
                    descriptor: "",
                    callingDescriptor: "UNKNOWN",
                    params: {
                        recordInput: {
                            allowSaveOnDuplicate: false,
                            apiName: "ListViewChart",
                            objTypeCode: 1040,
                            fields: {
                                Name: formState.Name,
                                ListViewId: props.filterId,
                                ChartType: formState.ChartType,
                                AggregateType: formState.AggregateType,
                                GroupingField: formState.GroupingField,
                                AggregateField: formState.AggregateField
                            }
                        }
                    }
                }]
            };
            if(props.recordId){
                url = Interface.edit;
                obj.actions[0].params.recordId = props.recordId;
            }
            let d = {
                message: JSON.stringify(obj)
            }
            proxy.$post(url, d).then(res=>{
                if(res && res.actions && res.actions[0] && res.actions[0].state == "SUCCESS"){
                    let id = res.actions[0].returnValue.id;
                    message.success("保存成功！");
                    emit('cancel', false);
                    emit("success", id);
                }else {
                    message.error("保存失败！");
                }
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
        padding: 25px 40px 10px 40px;
    }
</style>