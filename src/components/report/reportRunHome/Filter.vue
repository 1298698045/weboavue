<template>
    <div class="filter">
        <div class="sectionable-table">
            <div class="sectionable-table-section-title">
                <div class="sectionable-table-section-title-label">筛选器</div>
                <div class="sectionable-table-section-actions">
                    <a-tooltip placement="left" title="关闭筛选器面板" color="#032d60">
                        <button @click="handleCloseFilter">
                            <svg aria-hidden="true" class="btn_icon" viewBox="0 0 52 52"><path d="M3.4 29h33.2c.9 0 1.3 1.1.7 1.7l-9.6 9.6c-.6.6-.6 1.5 0 2.1l2.2 2.2c.6.6 1.5.6 2.1 0L49.5 27c.6-.6.6-1.5 0-2.1L32 7.4c-.6-.6-1.5-.6-2.1 0l-2.1 2.1c-.6.6-.6 1.5 0 2.1l9.6 9.6c.6.7.2 1.8-.7 1.8H3.5c-.8 0-1.5.6-1.5 1.4v3c0 .8.6 1.6 1.4 1.6z"></path></svg>
                        </button>
                    </a-tooltip>
                </div>
            </div>
            <div class="sectionable-table-section-content">
                <div class="sectionable-table-group">
                    <div class="sectionable-table-group-title">
                        <a-select placeholder="添加筛选器..." v-model:value="field" style="width: 100%;" @change="changeField">
                            <template #suffixIcon>
                                <svg class="fh-input__icon fh-input__icon_left" focusable="false" data-key="search" aria-hidden="true" viewBox="0 0 520 520" part="icon"><g><path d="M496 453L362 320a189 189 0 10-340-92 190 190 0 00298 135l133 133a14 14 0 0021 0l21-21a17 17 0 001-22zM210 338a129 129 0 11130-130 129 129 0 01-130 130z"></path></g></svg>
                            </template>
                            <a-select-opt-group v-for="(item, index) in categories" :label="item.label">
                                <a-select-option  v-for="(row, key, idx) in item.columns" :key="idx" :value="key"> {{item.columns[key].label}}</a-select-option>
                            </a-select-opt-group>
                        </a-select>
                    </div>
                    <div class="sectionable-table-group-content">
                        <ul class="section-table-rows-container">
                            <li class="sectionable-table-row" v-for="(item, index) in filterList" :key="index" :ref="(e)=>setRef(e, index)" @click="handleEditForm(item, index)">
                                <div class="sectionable-table-row-container">
                                    <div class="sectionable-table-row-actions">
                                        <div class="sectionable-table-row-content">
                                            <div class="filterContainer" :class="{'active':current==index}">
                                                <div class="filters__item">
                                                    <div class="fh-grow">
                                                        <button class="button_reset">
                                                            <span class="show text-body_small">{{item.fieldName}}</span>
                                                            <span class="show" v-if="item.valueText"><span class="filterPredicate"> {{item.valueText}}</span></span>
                                                        </button>
                                                    </div>
                                                    <button class="fh-btn-icon" title="删除筛选器 创建人" @click.stop="handleDeleteFilter(item, index)">
                                                        <svg aria-hidden="true" class="btn_icon" viewBox="0 0 52 52"><g><path d="M45.5 10H33V6c0-2.2-1.8-4-4-4h-6c-2.2 0-4 1.8-4 4v4H6.5c-.8 0-1.5.7-1.5 1.5v3c0 .8.7 1.5 1.5 1.5h39c.8 0 1.5-.7 1.5-1.5v-3c0-.8-.7-1.5-1.5-1.5zM23 7c0-.6.4-1 1-1h4c.6 0 1 .4 1 1v3h-6V7zM41.5 20h-31c-.8 0-1.5.7-1.5 1.5V45c0 2.8 2.2 5 5 5h24c2.8 0 5-2.2 5-5V21.5c0-.8-.7-1.5-1.5-1.5zM23 42c0 .6-.4 1-1 1h-2c-.6 0-1-.4-1-1V28c0-.6.4-1 1-1h2c.6 0 1 .4 1 1v14zm10 0c0 .6-.4 1-1 1h-2c-.6 0-1-.4-1-1V28c0-.6.4-1 1-1h2c.6 0 1 .4 1 1v14z"></path></g></svg>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <section class="portal-positioned" ref="popverRef" :style="{top:top+'px'}" v-if="isEditForm">
                <header class="popover__header">
                    <h2 class="text-heading_small">编辑筛选器</h2>
                    <span @click="handleCancelPopover">
                        <svg aria-hidden="true" class="btn_icon" viewBox="0 0 52 52"><path d="M31 25.4l13-13.1c.6-.6.6-1.5 0-2.1l-2-2.1c-.6-.6-1.5-.6-2.1 0L26.8 21.2c-.4.4-1 .4-1.4 0L12.3 8c-.6-.6-1.5-.6-2.1 0l-2.1 2.1c-.6.6-.6 1.5 0 2.1l13.1 13.1c.4.4.4 1 0 1.4L8 39.9c-.6.6-.6 1.5 0 2.1l2.1 2.1c.6.6 1.5.6 2.1 0L25.3 31c.4-.4 1-.4 1.4 0l13.1 13.1c.6.6 1.5.6 2.1 0L44 42c.6-.6.6-1.5 0-2.1L31 26.8c-.4-.4-.4-1 0-1.4z"></path></svg>
                    </span>
                </header>
                <div class="popover__body">
                    <div class="form_stacked">
                        <a-form :model="formState" ref="formRef">
                            <a-form-item name="field" label="字段" :labelWrap="true">
                                <!-- <a-input v-model:value="formState.field"></a-input> -->
                                <a-select placeholder="添加筛选器..." v-model:value="formState.field" style="width: 100%;">
                                    <template #suffixIcon>
                                        <svg class="fh-input__icon fh-input__icon_left" focusable="false" data-key="search" aria-hidden="true" viewBox="0 0 520 520" part="icon"><g><path d="M496 453L362 320a189 189 0 10-340-92 190 190 0 00298 135l133 133a14 14 0 0021 0l21-21a17 17 0 001-22zM210 338a129 129 0 11130-130 129 129 0 01-130 130z"></path></g></svg>
                                    </template>
                                    <a-select-opt-group v-for="(item, index) in categories" :label="item.label">
                                        <a-select-option  v-for="(row, key, idx) in item.columns" :key="idx" :value="key"> {{item.columns[key].label}}</a-select-option>
                                    </a-select-opt-group>
                                </a-select>
                            </a-form-item>
                            <a-form-item name="field" label="运算符" :labelWrap="true">
                                <a-select v-model:value="formState.operator" :show-search="true" :filter-option="filterOption" optionFilterProp="label" placeholder="请选择运算符">
                                    <a-select-option v-for="(item,index) in formState.operatorList" :key="item.name" :label="item.label" :value="item.name">{{item.label}}</a-select-option>
                                </a-select>
                            </a-form-item>
                            <a-form-item name="field" :labelWrap="true" v-if="formState.dataType=='picklist'">
                                <template #label>
                                    <div class="flex" style="width: 100%;justify-content: space-between;">
                                        <span class="label">值</span>
                                        <a href="javascript:;">显示所选(1)</a>
                                    </div> 
                                </template>
                                <a-input v-model:value="formState.valueText">
                                    <template #prefix>
                                        <svg class="fh-input__icon fh-input__icon_left" focusable="false" data-key="search" aria-hidden="true" viewBox="0 0 520 520" part="icon"><g><path d="M496 453L362 320a189 189 0 10-340-92 190 190 0 00298 135l133 133a14 14 0 0021 0l21-21a17 17 0 001-22zM210 338a129 129 0 11130-130 129 129 0 01-130 130z"></path></g></svg>
                                    </template>
                                </a-input>
                                <div class="multi-picklist-container">
                                    <div class="multi-picklist-option" @click="changeAllPicklist">
                                        <span>
                                            <svg aria-hidden="true" class="action-selectable" viewBox="0 0 52 52"><path d="M19.1 42.5L2.6 25.9c-.6-.6-.6-1.6 0-2.2l2.2-2.2c.6-.6 1.6-.6 2.2 0L19.4 34c.4.4 1.1.4 1.5 0L45.2 9.5c.6-.6 1.6-.6 2.2 0l2.2 2.2c.6.6.6 1.6 0 2.2L21.3 42.5c-.6.7-1.6.7-2.2 0z"></path></svg>
                                        </span>
                                        <div class="item-name">
                                            <div class="option-label">所有</div>
                                        </div>
                                    </div>
                                    <div class="multi-picklist-option" v-for="(item, index) in formState.filterValues" :key="index" @click="handleCheck(item, index)">
                                        <span>
                                            <svg aria-hidden="true" class="action-selectable" :class="{'active':item.isCheck==true}" viewBox="0 0 52 52"><path d="M19.1 42.5L2.6 25.9c-.6-.6-.6-1.6 0-2.2l2.2-2.2c.6-.6 1.6-.6 2.2 0L19.4 34c.4.4 1.1.4 1.5 0L45.2 9.5c.6-.6 1.6-.6 2.2 0l2.2 2.2c.6.6.6 1.6 0 2.2L21.3 42.5c-.6.7-1.6.7-2.2 0z"></path></svg>
                                        </span>
                                        <div class="item-name">
                                            <div class="option-label">{{item.label}}</div>
                                        </div>
                                    </div>
                                </div>
                            </a-form-item>

                            <div class="formItemFlex" v-else-if="formState.dataType=='date'">
                                <div class="formItemCol">
                                    <a-form-item label="类型">
                                        <a-select v-model:value="formState.date.type" placeholder="请选择类型">
                                            <a-select-option value="1">值</a-select-option>
                                            <a-select-option value="2">字段</a-select-option>
                                        </a-select>
                                    </a-form-item>
                                </div>
                                <div class="formItemCol">
                                    <a-form-item label="日期" name="valueText" v-if="formState.date.type==1">
                                        <a-date-picker style="width: 100%;" valueFormat="YYYY-MM-DD" v-model:value="formState.valueText" />
                                    </a-form-item>
                                    <a-form-item label="值" v-if="formState.date.type==2">
                                        <a-select placeholder="添加筛选器..." v-model:value="formState.field" style="width: 100%;">
                                            <template #suffixIcon>
                                                <svg class="fh-input__icon fh-input__icon_left" focusable="false" data-key="search" aria-hidden="true" viewBox="0 0 520 520" part="icon"><g><path d="M496 453L362 320a189 189 0 10-340-92 190 190 0 00298 135l133 133a14 14 0 0021 0l21-21a17 17 0 001-22zM210 338a129 129 0 11130-130 129 129 0 01-130 130z"></path></g></svg>
                                            </template>
                                            <a-select-opt-group v-for="(item, index) in categories" :label="item.label">
                                                <a-select-option  v-for="(row, key, idx) in item.columns" :key="idx" :value="key"> {{item.columns[key].label}}</a-select-option>
                                            </a-select-opt-group>
                                        </a-select>
                                    </a-form-item>
                                </div>
                            </div>
                            <a-form-item name="valueText" label="值" :labelWrap="true" v-else>
                                <a-input v-model:value="formState.valueText"></a-input>
                            </a-form-item>
                        </a-form>
                    </div>
                </div>
                <footer class="popover__footer">
                    <div class="filter-properties">
                        <a-checkbox v-model:checked="formState.remember">已锁定</a-checkbox>
                    </div>
                    <div class="filter-button-group">
                        <a-button @click="handleCancelPopover">取消</a-button>
                        <a-button class="ml10" type="primary" @click="handleApply">应用</a-button>
                    </div>
                </footer>
            </section>
        </div>
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
        toRaw,
        inject,
        nextTick
    } from "vue";
    import {
        SearchOutlined,
        DownOutlined,
        UserOutlined,
    } from "@ant-design/icons-vue";
    import { message } from "ant-design-vue";
    import Interface from "@/utils/Interface.js";
    const { proxy } = getCurrentInstance();
    import { useRouter, useRoute } from "vue-router";
    const router = useRouter();
    const route = useRoute();
    const props = defineProps({
        record: Object,
        categories: Array,
        describeReport: Object
    })
    const formRef = ref(null);
    const itemRefs = [];
    const popverRef = ref(null);

    const formState = reactive({
        field: "",
        operator: "",
        remember: false,
        filterValues: [],
        dataType: "",
        date: {
            type: "1",
            value: "",
        },
        valueText: "",
        operatorList: [],
    })

    const data = reactive({
        filterList: [],
        categories: [],
        attributes: [],
        top: 0,
        field: "",
        dataTypeFilterOperatorMap: {},
        isEditForm: false,
        operatorList: [],
        current: 0
    });
    const { filterList, categories, attributes, top, field, dataTypeFilterOperatorMap, isEditForm, operatorList, current } = toRefs(data);
    
    const emit = defineEmits(['params','close']);

    watch(()=>data.filterList, (newVal, oldVal)=>{
        // console.log('watch-filterList', newVal, oldVal);
        let reportFilter = [];
        newVal.forEach(item=>{
            reportFilter.push({
                column: item.field,
                filterType: 'fieldValue',
                isRunPageEditable: true,
                operator: item.operator,
                value: item.value || item.valueText
            })
        });
        emit("params","reportFilters", reportFilter);
    }, {deep: true, immediate: false});

    if(props.record){
        data.categories = JSON.parse(JSON.stringify(props.categories));
        data.dataTypeFilterOperatorMap = props.describeReport.reportTypeMetadata.dataTypeFilterOperatorMap;
        let reportFilter = props.describeReport.reportMetadata.reportFilters;
        console.log('filter-reportFilter',reportFilter);
        const convertColumn = (column) => {
            let fieldData = {};
            for(let i=0; i < data.categories.length; i++){
                let item = data.categories[i];
                for(let key in item.columns){
                    // console.log(key, column);
                    if(key==column){
                        fieldData = item.columns[column];
                        break;
                    }
                }
            }
            return fieldData;
        }   
        let filterList = [];
        reportFilter.forEach(item=>{
            let fieldItemData = convertColumn(item.column);
            console.log('fieldItemData',fieldItemData);
            let filterValues = fieldItemData.filterValues;
            let valueTextArr = [];
            let valueText = item.value;
            if(fieldItemData.dataType=='picklist'){
                let values = item.value.split(',');
                values.forEach(item=>{
                    filterValues.forEach(row=>{
                        if(item==row.name){
                            valueTextArr.push(row.label);
                            row.isCheck = true;
                        }
                    })
                })
                valueText = valueTextArr.join(',');
            }
            item.valueText = valueText;

            
            filterList.push({
                field: item.column,
                fieldName: fieldItemData.label,
                dataType: fieldItemData.dataType,
                operator: item.operator,
                operatorList: data.dataTypeFilterOperatorMap[fieldItemData.dataType],
                isComplete: true,
                value: item.value,
                valueText: item.valueText,
                filterValues: filterValues
            })
        })
        data.filterList = filterList;
    }

    const filterOption = (input, option) => {
      return option.label.toLowerCase().includes(input.toLowerCase());
    };
    
    const setRef = (el, index) => {
        if (el && el != null) {
            itemRefs[index] = {
                name: "ref_" + index,
                el,
            };
        }
    };
    const handleEditForm = (item, index) => {
        formState.dataType = item.dataType;
        formState.field = item.field;
        formState.operatorList = item.operatorList;
        formState.operator = item.operator;
        if(item.dataType=='picklist'){
            formState.filterValues = item.filterValues;
            formState.valueText = item.valueText;
        } else if(item.dataType == 'date'){
            formState.valueText = item.valueText;
        }else {
            formState.valueText = item.valueText;
        }
        data.current = index;
        data.isEditForm = true;
        nextTick(()=>{
            let domHeight = itemRefs[index].el.clientHeight;
            let popverHeight = popverRef.value.clientHeight;
            data.top = itemRefs[index].el.offsetTop  + ( domHeight / 2 ) - (popverHeight / 2);
        })
    }

    const changeField = (e) => {
        let rowData = data.categories.find(item=>{
            return item.columns[e];
        });
        let { label, dataType, filterValues } = rowData.columns[e];
        // console.log("dataTypeFilterOperatorMap", data.dataTypeFilterOperatorMap[dataType]);
        formState.operatorList = data.dataTypeFilterOperatorMap[dataType];
        formState.field = label;
        formState.operator = formState.operatorList[0].name;
        let obj = {
            fieldName: label,
            field: e,
            value: "",
            dataType: dataType,
            isComplete: false,
            valueText: "",
            operatorList: data.dataTypeFilterOperatorMap[dataType]
        }
        if(dataType=='picklist'){
            obj.filterValues = filterValues;
        }
        data.filterList.push(obj);
        formState.filterValues = filterValues.map(item=>{
            item.isCheck = false;
            return item;
        });
        formState.dataType = dataType;
        // console.log("ref", itemRefs);
        data.isEditForm = true;
        if(data.current==-1){
            data.current = data.filterList.length - 1;
        }
        data.current = data.filterList.length - 1;
        nextTick(()=>{
            // console.log("popverRef.value.clientHeight", popverRef.value.clientHeight);
            let domHeight = itemRefs[data.current].el.clientHeight;
            let popverHeight = popverRef.value.clientHeight;
            data.top = itemRefs[data.current].el.offsetTop  + ( domHeight / 2 ) - (popverHeight / 2);
        })
    }

    const handleCheck = (item, index) => {
        // console.log("item", item, index);
        item.isCheck = !item.isCheck;
    }
    // picklist 选择所有
    const changeAllPicklist = () => {
        formState.filterValues.forEach(item=>{
            item.isCheck = true;
        })
    }

    const handleDeleteFilter = (item, index) => {
        data.filterList.splice(index, 1);
    };

    const handleCancelPopover = () => {
        if(!data.filterList[data.current].isComplete){
            data.filterList.splice(data.current, 1);
        }
        data.field = '';
        data.current = -1;
        data.isEditForm = false;
    }

    const handleApply = () => {
        if(formState.dataType=='picklist'){
            // console.log("formState.filterValues", formState.filterValues);
            // console.log("picklist", formState.filterValues);
            let selected = formState.filterValues.filter(item=>{
                return item.isCheck;
            });
            let valueText = selected.map(item=>item.label).join(',');
            let value = selected.map(item=>item.name).join(',');
            // console.log("valueText", valueText);
            data.filterList[data.current].valueText = valueText;
            data.filterList[data.current].value = value;
        } else if(formState.dataType == 'date') {
            data.filterList[data.current].valueText = formState.valueText;
        } else {
            data.filterList[data.current].value = formState.valueText;
            data.filterList[data.current].valueText = formState.valueText;
        }
        data.filterList[data.current].operator = formState.operator;
        data.filterList[data.current].isComplete = true;
        formRef.value.resetFields();
        data.isEditForm = false;
        data.current = -1;
        data.field = '';
    }

    const handleCloseFilter = () => {
        emit("close", false);
    }
</script>
<style lang="less" scoped>
    .sectionable-table{
        padding: 14px 16px;
        display: flex;
        flex-direction: column;
        .sectionable-table-section-title{
            display: flex;
            justify-content: space-between;
            align-items: center;
            position: relative;
            margin-bottom: 8px;
            .sectionable-table-section-title-label{
                font-size: 14px;
                color: #747474;
                font-weight: bold;
            }
            .sectionable-table-section-actions{
                margin-top: -1px;
                button{
                    border: none;
                    cursor: pointer;
                    background: transparent;
                    color: #747474;
                }
            }
        }
        .sectionable-table-section-content{
            .sectionable-table-group{
                .sectionable-table-group-content{
                    display: flex;
                    flex-direction: column;
                    flex-grow: 1;
                    .sectionable-table-row{
                        .sectionable-table-row-container{
                            border-radius: 4px;
                            margin-bottom: 0;
                            height: auto;
                            min-height: none;
                            border: 0;
                            background-color: #fff;
                            padding: 0;
                            margin-top: 0;
                            .sectionable-table-row-actions{
                                color: #747474;
                                white-space: normal;
                                line-height: normal;
                                font-size: 14px;
                                .sectionable-table-row-content{
                                    color: #747474;
                                    white-space: normal;
                                    line-height: normal;
                                    font-size: 14px;
                                    .filterContainer{
                                        display: flex;
                                        flex-direction: row;
                                        border: 1px solid #c9c9c9;
                                        border-radius: 4px;
                                        background: #fff;
                                        margin-bottom: 0;
                                        overflow-wrap: break-word;
                                        margin-top: 4px;
                                        &.active{
                                            border-color: #1b96ff;
                                        }
                                        .filters__item{
                                            padding: 0;
                                            border: 0;
                                            background: none;
                                            width: 100%;
                                            overflow: hidden;
                                            display: flex;
                                            align-items: center;
                                            border-radius: 4px;
                                            .button_reset{
                                                width: 100%;
                                                padding: 6px 8px;
                                                border: 1px solid transparent;
                                                color: currentColor;
                                                font-size: inherit;
                                                line-height: inherit;
                                                background: transparent;
                                                text-align: inherit;
                                                box-shadow: none;
                                                cursor: pointer;
                                                position: relative;
                                                .text-body_small{
                                                    font-size: 13px;
                                                }
                                                .show{
                                                    display: block;
                                                    line-height: 1.5;
                                                }
                                                .filterPredicate{
                                                    font-size: 14px;
                                                    font-weight: normal;
                                                    color: #032d60;
                                                }
                                            }
                                            .fh-grow{
                                                flex: 1;
                                            }
                                            .fh-btn-icon{
                                                width: 20px;
                                                height: 20px;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    .portal-positioned{
        position: absolute;
        outline: 0;
        right: 238px;
        top: 300px;
        z-index: 1000;
        border-radius: 4px;
        width: 320px;
        min-height: 32px;
        background: #fff;
        display: inline-block;
        box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.16);
        border: 1px solid #c9c9c9;
        &:before,&:after{
            width: 16px;
            height: 16px;
            position: absolute;
            transform: rotate(45deg);
            content: '';
            background-color: inherit;
            top: 50%;
            right: -8px;
            margin-top: -8px;
        }
        &:after{
            box-shadow: 1px -1px 2px 0 rgba(0, 0, 0, 0.16);
            z-index: -1;
        }
        .popover__header{
            border-bottom: 0;
            padding: 12px 12px 8px 12px;
            position: relative;
            word-wrap: break-word;
            display: flex;
            justify-content: space-between;
            align-items: center;
            svg{
                width: 16px;
                height: 16px;
                cursor: pointer;
            }
            .text-heading_small{
                font-size: 14px;
                color: #032d60;
                line-height: 1.25;
                margin-bottom: 0;
                font-weight: inherit;
            }
        }
        .popover__body{
            padding: 12px;
            
        }
        .popover__footer{
            border-top: 0;
            padding: 12px;
            /* background: #f3f3f3; */
            border-bottom-left-radius: inherit;
            border-bottom-right-radius: inherit;
            display: flex;
            justify-content: space-between;
            .text-align_right{
                text-align: right;
            }
        }
    }
    .multi-picklist-container{
        width: 100%;
        height: 195px;
        overflow-y: auto;
        margin-top: 10px;
        .multi-picklist-option{
            display: flex;
            flex-flow: row nowrap;
            justify-content: space-between;
            align-items: center;
            height: 40px;
            &:hover{
                background: #f3f2f2;
            }
            span{
                width: 40px;
                height: 40px;
            }
            .action-selectable{
                min-width: 16px;
                width: 16px;
                height: 16px;
                margin: 12px;
                opacity: 0;
                fill: #fff;
                &.active{
                    opacity: 1;
                    fill: #0070d1;
                }
            }
            .item-name{
                width: 100%;
                margin-right: auto;
                line-height: 16px;
                cursor: pointer;
                align-items: center;
                text-align: left;
                color: #080707;
            }
        }
    }
    .formItemFlex{
        display: flex;
        .formItemCol{
            width: 70%;
        }
        .formItemCol:first-child{
            width: 30%;
        }
    }
    
</style>
<style lang="less">
    .form_stacked{
        .ant-row{
            display: block !important;
            .ant-col.ant-form-item-label{
                width: 100%;
            }
            label{
                width: 100%;
                max-width: 100%;
            }
        }
        .ant-form-item{
            padding: 0 4px;
        }
        
    }
</style>