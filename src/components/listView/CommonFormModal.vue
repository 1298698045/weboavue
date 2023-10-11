<template>
    <div>
        <a-modal v-model:open="props.isShow" width="850px" :maskClosable="false" @cancel="handleCancel" @ok="handleSubmit">
            <template #title>
                <div>
                    {{title}}
                 </div>
            </template>
            <div class="modalContainer">
                <div class="modalCenter">
                    <a-form :model="formState" ref="formRef">
                        <div class="section" v-for="(item,index) in layoutList" :key="index">
                            <div class="sectionTitle">{{item.title}}</div>
                            <div class="sectionRow" v-for="(row,idx) in item.rows" :key="idx">
                                <div class="sectionItem" v-for="(attribute,attributeIdx) in row.attributes" :key="attributeIdx">
                                    <a-form-item v-if="['L','LT','DT'].includes(attribute.attributes.type)"
                                     :label="attribute.label" :rules="[{ required: attribute.attributes.required, message: '请选择'+attribute.label }]">
                                        <a-select
                                            allowClear
                                            v-model:value="list[attribute.targetValue]"
                                            :placeholder="'请选择'+attribute.label">
                                            <a-select-option v-for="(option,optionIdx) in select[attribute.targetValue]&&select[attribute.targetValue].values"
                                             :key="optionIdx" :value="option.value">{{option.label}}</a-select-option>
                                        </a-select>
                                    </a-form-item>
                                    <a-form-item v-else-if="['O','Y','U','Y_MD'].includes(attribute.attributes.type)"
                                     :label="attribute.label" :rules="[{ required: attribute.attributes.required, message: '请选择'+attribute.label }]">
                                        <a-select
                                            allowClear
                                            v-model:value="list[attribute.targetValue]"
                                            show-search
                                            :default-active-first-option="false"
                                            :filter-option="false"
                                            @search="(e)=>{searchlookup(e,attribute)}"
                                            @dropdownVisibleChange="(e)=>{searchlookup('',attribute)}"
                                            :placeholder="'请选择'+attribute.label">
                                            <a-select-option v-for="(option,optionIdx) in search[attribute.targetValue]"
                                             :key="optionIdx" :value="option.ID">{{option.Name}}</a-select-option>
                                        </a-select>
                                    </a-form-item>
                                    <a-form-item v-else-if="attribute.attributes.type=='D'" :label="attribute.label">
                                        <a-date-picker valueFormat="YYYY-MM-DD" :placeholder="'请选择'+attribute.label" v-model:value="list[attribute.targetValue]" />
                                    </a-form-item>
                                    <a-form-item v-else-if="attribute.attributes.type=='X'" :label="attribute.label">
                                        <a-textarea :rows="4" v-model:value="list[attribute.targetValue]" />
                                    </a-form-item>
                                    <a-form-item v-else :label="attribute.label">
                                        <a-input v-model:value="list[attribute.targetValue]"></a-input>
                                    </a-form-item>
                                </div>
                            </div>
                        </div>
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
        defineEmits } from "vue";
    import { SearchOutlined, DownOutlined, UserOutlined } from "@ant-design/icons-vue";
    import Interface from "@/utils/Interface.js";
    const { proxy } = getCurrentInstance();

    const labelCol = ref({ style: { width: '100px' } });
    const props = defineProps({
        isShow: Boolean,
    })
    const emit = defineEmits(['cancel']);
    const handleCancel = ()=> {
        emit("cancel", false);
    }
    const handleSubmit = ()=> {

    }
    const data = reactive({
        title: "新建部门变动",
        layoutList: [],
        list: {},
        select: {},
        search: {}
    })
    const { title, layoutList, list, select, search } = toRefs(data);
    const formState = reactive({

    })

    const getConfig = () => {
        proxy.$get(Interface.entityConfig,{}).then(res=>{
            let componentDef = res.actions[0].returnValue.componentDef;
            data.layoutList = componentDef.sections;
            let record = res.actions[0].returnValue.record;
            data.list = JSON.parse(JSON.stringify(record));
            componentDef.lookupAttributes.forEach(item=>{
                data.list[item.name] = { Id: '', Name: '' };
                data.search[item.name] = [];
            })
        })
    }
    getConfig();
    const getPickerList = () => {
        proxy.$get(Interface.picklist,{}).then(res=>{
            data.select = res.actions[0].returnValue.picklistFieldValues
        })
    }
    getPickerList();


    const searchlookup = (search,attribute) => {
        console.log(search,attribute)
        proxy.$get(Interface.uilook,{
            Lktp: attribute.attributes.sObjectType,
            Lksrch: search
        }).then(res=>{
            let listData = res.listData;
            data.search[attribute.targetValue] = listData;
        })
    }
</script>
<style lang="less">
    @import url('@/style/modal.less');
    .ant-modal-content .modalContainer .modalCenter{
        height: 500px !important;
    }
    .section{
        .sectionTitle{
            height: 30px;
            background-color: rgb(243, 242, 242);
            line-height: 30px;
            border-radius: 4px;
            padding-left: 15px;
            margin-bottom: 12px;
            /* margin: 2rem 2rem 0.5rem 2rem; */
        }
        .sectionRow{
            padding: 0 10px;
            box-sizing: border-box;
            display: flex;
            .sectionItem{
                flex: 1;
                margin-right: 20px;
                .ant-row{
                    display: block !important;
                }
            }
            .sectionItem:last-child{
                margin-right: 0;
            }
        }
    }
    :where(.css-dev-only-do-not-override-kqecok).ant-picker{
        width: 100%;
    }
</style>