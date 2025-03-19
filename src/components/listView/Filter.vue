<template>
    <div class="filterContainer" @click.stop>
        <div class="panelFilter">
            <div class="panelHeader" v-if="!isEdit">
                <h2 class="panelTitle">筛选器</h2>
                <a-button type="link" @click="handleCloseModal"><CloseOutlined style="color:rgb(116, 116, 116)" /></a-button>
            </div>
            <div class="panelHeader" v-else>
                <a-button @click="handleCloseModal">取消</a-button>
                <a-button type="primary" @click="handleSave">保存</a-button>
            </div>
            <div class="panelBody" ref="panelBdRef">
                <div class="bodyTitle">匹配所有这些筛选器</div>
                <ul>
                    <li v-for="(item,index) in filterList" :ref="(el) => setItemRefs(el, item, index)" :key="index" @click="handleItemOpenFilter(item,index,$event)">
                        <div class="filterItemBox" :class="{'empty':item.label==''}">
                            <div class="trigger">
                                <div class="fieldLabel">{{item.label==""?"新建筛选器":item.label}}</div>
                                <div class="operatorAndOperand">
                                    <span class="test-operatorWrapper">{{item.operatorText}}</span>
                                    &nbsp;
                                    <span class="val rowEllipsis" v-if="item.dType=='BusinessUnit' || item.dType=='User' || item.dType == 'Lookup' || item.dType=='Picklist'||item.dType=='L'||item.dType=='LT'||item.dType=='DT'">{{ item.showValText }}</span>
                                    <span class="val rowEllipsis" v-else-if="item.dType=='CheckBox'">{{item.val ? '是' : '否'}}</span>
                                    <span class="val rowEllipsis" v-else>{{item.val}}</span>
                                </div>
                            </div>
                            <div class="closeX">
                                <a-button type="link" @click.stop="handleRemoveItem(item,index)"><CloseOutlined style="color:rgb(116, 116, 116);" /></a-button>
                            </div>
                        </div>
                    </li>
                </ul>
                <div class="addFilterRemoveAll" v-if="filterList.length < 10">
                    <a role="button" class=" addFilter" href="javascript:void(0);" @click="handleAddFilter">添加筛选器</a>
                    <a role="button" class="removeAll" href="javascript:void(0);" @click="handleAllDelete">全部删除</a>
                </div>
            </div>
        </div>
        <div class="panel-content scrollable" v-if="isFormModal" :style="{top:currentTop+'px'}">
            <div class="forceFilterPanelCallout">
                <div class="rIcon"></div>
                <div class="filterForm">
                    <a-form :model="formState" ref="formRef" :label-col="labelCol">
                        <a-form-item name="field" label="字段">
                            <a-select v-model:value="formState.field" :show-search="true" :filter-option="filterOption" optionFilterProp="label" placeholder="请选择字段" @change="changeAttribute">
                                <a-select-option v-for="(item,index) in attributes" :key="item.fieldName" :label="item.label" :value="item.fieldName">{{item.label}}</a-select-option>
                            </a-select>
                        </a-form-item>
                        <a-form-item name="operator" label="运算符">
                            <a-select v-model:value="formState.operator" placeholder="请选择运算符" @change="changeOperator">
                                <a-select-option v-for="(item,index) in operatorList" :key="item.operator" :value="item.operator">{{item.label}}</a-select-option>
                            </a-select>
                        </a-form-item>
                        <!-- <a-form-item name="val" label="值">
                            <a-date-picker valueFormat="YYYY-MM-DD" v-if="dType=='F'" v-model:value="formState.val" />
                            <a-input v-else="dType=='S'" v-model:value="formState.val" />
                        </a-form-item> -->
                        <a-form-item name="val" label="值">
                            <div v-if="formState.dType=='DateTime'">
                                <a-date-picker valueFormat="YYYY-MM-DD" v-model:value="formState.val"  />
                            </div>
                            <div v-else-if="formState.dType=='Numeric'">
                                <a-input type="Number" v-model:value="formState.val"></a-input>
                            </div>
                            <div v-else-if="formState.dType=='Picklist'||formState.dType=='L'||formState.dType=='LT'||formState.dType=='DT'">
                                <a-select mode="multiple" v-model:value="formState.val" placeholder="请选择" @change="changeSelect">
                                    <a-select-option v-for="v in formState.options" :key="v.value" :value="v.value">
                                        {{v.label}}
                                    </a-select-option>
                                </a-select>
                            </div>
                            <div v-else-if="formState.dType=='BusinessUnit' || formState.dType=='User' || formState.dType == 'Lookup'" style="position: relative;">
                                <a-select mode="multiple" v-model:value="formState.val" placeholder="请选择"
                                    :default-active-first-option="false" :filter-option="false" showSearch
                                    @change="e=>changePickVal(e, filter)"
                                    @search="e=>searchlookup(filter, e)"
                                    @dropdownVisibleChange="e=>searchlookup(filter, '')">
                                    <template #suffixIcon></template>
                                    <a-select-option v-for="v in formState.options" :key="v.ID" :value="v.ID">{{ v.Name
                                        }}</a-select-option>
                                </a-select>
                                <i class="iconfont icon-sousuo pointer"
                                    @click="handleOpenLook"></i>
                            </div>
                            <div v-else-if="formState.dType=='CheckBox'">
                                <a-checkbox v-model:checked="formState.val"></a-checkbox>
                            </div>
                            <div v-else>
                                <a-input v-model:value="formState.val"></a-input>
                            </div>
                        </a-form-item>
                        <a-form-item style="text-align: right;">
                            <a-button type="primary" @click="handleComplete">完成</a-button>
                        </a-form-item>
                    </a-form>
                </div>
            </div>
        </div>
        <radio-dept v-if="isRadioDept" :isShow="isRadioDept" @cancel="cancelDeptModal" @selectVal="handleDeptParams" />
        <radio-user v-if="isRadioUser" :isShow="isRadioUser"  @cancel="isRadioUser=false" @selectVal="handleUserParams" :localId="formState.field"></radio-user>
        <LookupFilter v-if="isLookupFilter" :field="formState.field" :entityApiName="sObjectName" :lookEntityApiName="lookEntityApiName" :entityType="lookEntityType" :objectTypeCode="lookObjectTypeCode" :isShow="isLookupFilter" @select="handleSelectLook" @cancel="isLookupFilter=false" />
    </div>
</template>
<script setup>
    import { ref, watch, reactive, toRefs, onMounted, getCurrentInstance, onUpdated, h, nextTick, defineProps, defineEmits, defineExpose } from "vue";
    import { CloseOutlined } from "@ant-design/icons-vue";
    import RadioDept from "@/components/commonModal/RadioDept.vue";
    import RadioUser from "@/components/commonModal/RadioUser.vue";
    import LookupFilter from "@/components/commonModal/LookupFilter.vue";
    import { message } from "ant-design-vue";
    import Interface from "@/utils/Interface.js";
    const { proxy } = getCurrentInstance();
    const labelCol = ref({ style: { width: '60px' } });
    const props = defineProps({
        sObjectName: String,
        filterId: String
    })
    const initialState = () => {
        return {
            field: "",
            operator: "",
            operatorText: "",
            val: "",
            label: "",
            Lktp: "",
            dType: "",
            options: [],
            picklistValues: [],
            showValText: ""
        }
    }

    const formState = reactive(initialState());
    const data = reactive({
        // filterList: [{
        //     field: "",
        //     operator: "",
        //     val: ""
        // }],
        filterList: [],
        attributes: [],
        operatorList: [],
        dType: "",
        current: -1,
        currentTop: 0,
        isFormModal: false,
        options: [],
        isRadioDept: false,
        isRadioUser: false,
        isLookupFilter: false,
        lookEntityApiName: "",
        lookObjectTypeCode: "",
        isEdit: false
    })
    const panelBdRef = ref();
    const formRef = ref();
    let itemRefs = [];
    const { filterList, attributes, operatorList, dType, currentTop, isFormModal, options,
        isRadioDept, isRadioUser, isLookupFilter, lookEntityApiName, lookObjectTypeCode,
        isEdit
     } = toRefs(data);
     onMounted(()=>{
        // window.addEventListener("click", ()=>{
        //     data.isFormModal = false;
        // })
     })
     watch(()=>data.filterList,(newVal,oldVal)=>{
        data.isEdit = true;
    },{deep: true, immediate: false});

    const getFilterQuery = () => {
        proxy.$get(Interface.listView.getListView, {
            id: props.filterId
        }).then(res=>{
            let fieldCriteria = res.actions[0].returnValue.fieldCriteria.map(item=>{
                item.attribute = item.column;
                return item;
            });
            getFilterList(fieldCriteria)
        })
    }
    const getOperator = (field, item) => {
        console.log(field, item, '123123');
        var row = data.attributes.find(function (v) {
            return v.fieldName == field;
        });
        return row && row.operator || '';
    }
    const getDType = (field, item) => {
        var row = data.attributes.find(function (v) {
            return v.fieldName == field;
        });
        return row && row.dType || '';
    }
    const getOperatorType = (operator, list) => {
        if (list) {
            var row = list.find(function (v) {
                return v.operator == operator;
            });
            return row.operatorType;
        } else {
            return '';
        }
    }
    const getLktp = (field, item) => {
        var row = data.attributes.find(function (v) {
            return v.attribute == field;
        });
        return row && row.referencedEntity.EntityObjectTypeCode || '';
    }
    const getFilterList = (FilterExpresssionList) => {
        if(FilterExpresssionList.length){
            data.filterList = [];
            let item = {};
            FilterExpresssionList.forEach(v=>{
                var operatorList = getOperator(v.attribute, item);
                let operatorText = operatorList.find(row=>row.operator==v.operator)?.label;
                console.log("operatorText", operatorText);
                var dType = getDType(v.attribute, item);
                var operatorType = getOperatorType(v.operator, operatorList, item);
                var Lktp = getLktp(v.attribute, item);
                var options = [];
                let showValText = '';
                if (Lktp == '' && dType == 'BusinessUnit') {
                    Lktp = 10;
                }
                if (Lktp && dType == 'BusinessUnit' || dType == 'User' || dType == 'MasterDetail') {
                    var response = getEntityLookup(Lktp, '', v)
                    if (response) {
                        options = response.listData;
                    };
                    let temp = [];
                    v.operands.forEach((row,index)=>{
                        temp.push({
                            ID: row,
                            Name: v.picklistValues[index]
                        })
                    });
                    options = temp;
                    showValText = v.picklistValues.join(',');
                    
                }
                if (dType == 'Picklist' || dType == 'L') {
                    options = getFilterValues(v.attribute, item);
                    let temp = options.filter(row=>{
                        return v.operands.find(f=>{
                            return f == row.value;
                        })
                    });
                    showValText = temp.map(row=>row.label).join(',');
                }
                if (dType == 'Picklist' || dType == 'L' || dType == 'BusinessUnit' || dType == 'User' || dType == 'MasterDetail') {

                } else {
                    if (v.operands && v.operands.length > 0) {
                        v.operands = v.operands[0];
                    }
                    if (v.value && v.value.length > 0) {
                        v.value = v.value[0];
                    }
                }
                if(dType == 'CheckBox'){
                    v.operands = v.operands == "0" ? false : true;
                }
                data.filterList.push({
                    operator: v.operator,
                    operatorText: operatorText,
                    field: v.attribute,
                    logical: v.logical,
                    operatorList: operatorList,
                    operatorType: operatorType,
                    dType: dType,
                    val: v.operands || v.value,
                    label: v.label,
                    Lktp: Lktp,
                    options: options,
                    deptText: '',
                    picklistValues: v.picklistValues,
                    showValText: showValText
                });
            });
            console.log("data.filterList", data.filterList);
        }
    }
    
    const getFilterValues = (field, item) => {
        var row = data.attributes.find(function (v) {
            return v.fieldName == field;
        });
        return row && row.filterValues || [];
    }

    const filterOption = (input, option) => {
      return option.label.toLowerCase().includes(input.toLowerCase());
    };
    const changeSelect = (e) => {
        let list = formState.options.filter(item=>{
            return e.find(row=>row==item.value);
        });
        formState.showValText = list.map(item=>item.label).join(',')
    }
    const changeOperator = (e) =>{ 
        let row = data.operatorList.find(item=>item.operator);
        formState.operatorText = row.label;
    }
    const changePickVal = (e, item) => {
        let list = formState.options.filter(item=>{
            return e.find(row=>row==item.ID);
        });
        formState.picklistValues = list.map(item=>item.Name);
        formState.showValText = list.map(item=>item.Name).join(',')
    }
    // 添加筛选器
    const handleAddFilter = () => {
        itemRefs = [];
        data.filterList.length < 10 && data.filterList.push({
            field: "",
            operator: "",
            val: "",
            label: ""
        });
        // console.log("current",data.current);
        data.current++;
        let index = data.current;
        if(data.filterList.length){
            index = data.filterList.length-1;
            data.current = index;
        }
        setFormStyle(index);
        // nextTick(()=>{
        //     resetForm();
        // })
        data.dType = '';
        Object.assign(formState, initialState());
    }
    // 全部删除
    const handleAllDelete = () => {
        data.filterList = [];
        data.current = 0;
        data.isFormModal = false;
        itemRefs = [];
        console.log("itemRefs",itemRefs)
    }
    const getField = () => {
        proxy.$get(Interface.objFieldData, {
            entityApiName: props.sObjectName
        }).then(res=>{
            data.attributes = res.attributes;
            getFilterQuery();
        })
    }
    getField();
    
    const changeAttribute = (e) =>{
        formState.operator = "";
        formState.operatorText = "";
        formState.val = "";
        var row = data.attributes.find(item=>item.fieldName==e);
        if(row.dType=='BusinessUnit' || row.dType=='User' || row.dType == 'Lookup' || row.dType == 'L' ||
            row.dType == 'LT' || row.dType == 'DT' || row.dType == 'Picklist'
        ){
            formState.val = [];
        }
        formState.label = row.label;
        data.operatorList = row.operator;
        data.dType = row.dType;
        formState.dType = row.dType;
        if(row.referencedEntity){
            data.lookEntityApiName = row.referencedEntity.EntityName;
            data.lookObjectTypeCode = row.referencedEntity.EntityObjectTypeCode;
            formState.Lktp = row.referencedEntity.EntityObjectTypeCode;
        }
        if(row.filterValues){
            data.options = row.filterValues;
            formState.options = row.filterValues;
        }
    }


    const handleComplete = () => {
        // console.log("formState",formState);
        const copyObj = JSON.parse(JSON.stringify(formState));
        console.log("copyObj", copyObj);
        data.filterList[data.current] = copyObj;
        resetForm();
        data.isFormModal = false;
        console.log("filterList", data.filterList)
    }
    // 清空
    const resetForm = () => {
        formRef.value.resetFields();
    }
    const handleItemOpenFilter = (item,index,e) => {
        // console.log("itemRefs123123", itemRefs[index].el.offsetTop);
        // console.log("itemRefs123123", itemRefs[index].el.offsetLeft);
        // console.log("panelBdRef.value.scrollTop",panelBdRef.value.scrollTop)
        // data.isFormModal = true;
        console.log(item,'123');
        formState.dType = item.dType;
        formState.field = item.field;
        formState.operator = item.operator;
        formState.options = item.options;
        formState.val = item.val;
        formState.label = item.label;
        formState.operatorText = item.operatorText;
        formState.showValText = item.showValText;
        data.current = index;
        if(item.operatorList){
            data.operatorList = getOperator(item.field, {});
        }
        setFormStyle(index);
        // let top = itemRefs[index].el.offsetTop;
        // let countTop = (top / 2 / 2 - 10.5) + ( index * 65 ) - panelBdRef.value.scrollTop;
        // if(index>0){
        //     countTop = countTop - (index - 1) * 12;
        // }
        // // - ( index > 1 ? index - 1 * 12 : 0 ))
        // console.log("countTop",countTop);

        // console.log("panelBdRef",panelBdRef.value.scrollTop)
        // data.currentTop = countTop;
    }
    const setFormStyle = (index) =>{
        data.isFormModal = true;
        nextTick(()=>{
            let top = itemRefs[index].el.offsetTop;
            let countTop = (top / 2 / 2 - 10.5) + ( index * 65 ) - panelBdRef.value.scrollTop;
            if(index>0){
                countTop = countTop - (index - 1) * 12;
            }
            data.currentTop = countTop;
            console.log("currentTop",data.currentTop)
        })
    }
    const handleRemoveItem = (item,index) => {
        data.filterList.splice(index,1);
        if(index==data.current){
            data.isFormModal = false;
            data.current--;
        }
    }
   
    const setItemRefs = (el,item,index) => {
        if(el && el!=null){
            itemRefs.push({
                id: index,
                el
            })
            console.log("itemRefs",itemRefs)
        }
    }
   const emit = defineEmits(['close','success']);
    // 关闭弹窗
    const handleCloseModal = () =>{
        emit("close",false);
    }
    const handleOpenLook = () => {
        if (formState.Lktp == 8 || formState.Lktp == 10020) {
            data.isRadioUser = true;
        } else if(formState.Lktp == 10) {
            data.isRadioDept = true;
        } else {
            data.isLookupFilter = true;
        }
    };
    const getEntityLookup = async (lksrch) => {
        var response;
        // var d = {
        //     Lktp: Lktp,
        //     lksrch: lksrch
        // }
        let obj = {
            actions:[{
                id: "6129;a",
                descriptor: "",
                callingDescriptor: "UNKNOWN",
                params: {
                    objectApiName: props.sObjectName,
                    fieldApiName: formState.field,
                    pageParam: 1,
                    pageSize: 25,
                    q: "",
                    searchType: "Recent",
                    targetApiName: data.lookEntityApiName,
                    body: {
                        sourceRecord: {
                            apiName: props.sObjectName,
                            fields: {
                                id: null,
                                RecordTypeId: ""
                            }
                        }
                    }
                }
            }]
        };
        let d = {
            message: JSON.stringify(obj)
        }
        await proxy.$post(Interface.lookup, d).then(res => {
            response = res;
        })
        return response;
    }
    // 查询条件-搜索
    const searchlookup = (searchVal) => {
        var res = getEntityLookup(formState.Lktp || 10, searchVal);
        res.then(res => {
            if(res){
                // filter.options = res.listData;
                console.log("resresres", res);
                let list = res.actions[0].returnValue.lookupResults.records;
                console.log("resresres", list);
                let arr = [];
                list.forEach(item=>{
                    let isBook = data.options.some(row=>row.ID==item.fields.Id.value);
                    if(!isBook){
                        arr.push({
                            ID: item.fields.Id.value,
                            Name: item.fields.Name.value
                        })
                    }
                });
                data.options = data.options.concat(arr);
                formState.options = formState.options.concat(arr);
            }
        })
    }
    // 部门
    const handleDeptParams = (params) => {
        console.log("params", params);
        let index = formState.options.findIndex(item => params.ID == item.ID);
        if (index == -1) {
            formState.options.push({
                ID: params.ID,
                Name: params.Name
            });
        }
        formState.val.push(params.ID);
        changePickVal([params.ID]);
        data.isRadioDept = false;
    };
    // 用户
    const handleUserParams = (params) => {
        let index = formState.options.findIndex(item => params.id == item.ID);
        if (index == -1) {
            formState.options.push({
                ID: params.id,
                Name: params.name
            });
        }
        formState.val.push(params.id);
        changePickVal([params.id]);
        // data.filterList[data.filterIdx].picklistValues.push(params.name);
        data.isRadioUser = false;
    };

    const handleSave = () => {
        // console.log("data.filterList",data.filterList);
        let result = [];
        data.filterList.forEach(function (v) {
            let value = v.val;
            if (!Array.isArray(v.val)) {
                value = [v.val];
            }
            if(typeof v.val == 'boolean'){
                value = v.val ? [1] : [0];
            }
            result.push({
                // logical: v.logical,
                attribute: v.field,
                label: v.label,
                operator: v.operator,
                operands: value,
                column: v.field,
                picklistValues: v.picklistValues
            });
        });
        let filterExpression = result;
        // console.log("result", result);
        
        let obj = {
            actions:[{
                id: "7696;a",
                descriptor: "",
                callingDescriptor: "UNKNOWN",
                params: {
                    entityKeyPrefixOrApiName: props.sObjectName,
                    listViewIdOrName: props.filterId,
                    label: null,
                    visibility: null,
                    displayColumnApiNames: null,
                    listViewFieldCriteria: filterExpression,
                    listViewScope: {
                        apiName: props.sObjectName,
                        label: "",
                        relatedEntityId: null
                    },
                    booleanFilterLogic: "",
                    shareIds: null
                }
            }]
        }
        let d = {
            message: JSON.stringify(obj)
        }
        proxy.$post(Interface.listView.saveFilter, d).then(res=>{
            message.success("保存成功！");
            emit('success', true);
            emit("close",false);
        })
    }
</script>
<style lang="less">
    .filterContainer{
        width: 100%;
        height: 100%;
        position: relative;
    }
    .panelFilter{
        height: 100%;
        .panelHeader{
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 12px;
            background: #fff;
            border-bottom: 1px solid rgb(229,229,229);
            .panelTitle{
                font-weight: inherit;
                font-size: 16px;
            }
        }
        .panelBody{
            padding: 12px;
            background: #fff;
            height: calc(~"100% - 57px");
            font-size: 14px;
            overflow: auto;
            .bodyTitle{
                color: #444444;
                line-height: 1.5;
            }
            ul{
                li{
                    margin: 12px 0;
                    .filterItemBox{
                        border: 1px solid rgb(201,201,201);
                        border-radius: 4px;
                        padding: 12px;
                        display: flex;
                        justify-content: space-between;
                        box-sizing: border-box;
                        .trigger{
                            /* flex: 1; */
                            width: calc(~"100% - 30px");
                            .fieldLabel{
                                font-size: 12px;
                                color: #444444;
                                line-height: 1.5;
                            }
                            .operatorAndOperand{
                                color: #181818;
                                font-size: 14px;
                                line-height: 1.5;
                                display: flex;
                                align-items: center;
                                .val{
                                    display: inline-block;
                                    width: calc(~"100% - 50px");
                                }
                            }
                        }
                        .closeX{
                            width: 30px;
                        }
                    }
                    .filterItemBox.empty{
                        background: #faffbd;
                        border: 1px solid #a86403;
                    }
                    .filterItemBox:hover{
                        cursor: pointer;
                        background: #f3f3f3;
                    }
                }
            }
            .addFilterRemoveAll{
                display: flex;
                justify-content: space-between;
                a{
                    font-size: 14px;
                    font-weight: 400;
                    color: var(--textColor);
                    text-decoration: unset;
                }
                a:hover{
                    text-decoration: underline;
                    color: var(--hoverColor);
                }
            }
        }
    }
    .panel-content{
        width: 400px;
        /* height: 309px; */
        border: 1px solid #b6b6b6;
        border-radius: 5px;
        background-color: #ffffff;
        overflow: visible;
        position: absolute;
        right: 101%;
        top: 0;
        .forceFilterPanelCallout{
            padding: 16px 16px 14px 16px;
            position: relative;
            .rIcon{
                width: 21px;
                height: 21px;
                z-index: 99;
                transform: rotate(45deg);
                background: #fff;
                border: 0;
                border-right: 1px solid #d8dde6;
                border-top: 1px solid #d8dde6;
                position: absolute;
                top: calc(~"50%  - 21px");
                right: -12px;
            }
            .filterForm{
                .ant-form-item{
                    .ant-row{
                        display: block !important;
                        .ant-col{
                            width: 100% !important;
                        }
                        .ant-form-item-label{
                            text-align: left;
                        }
                    }
                }
            }
        }
    }
    :where(.css-dev-only-do-not-override-kqecok).ant-input{
        border-color: #747474;
    }
    .icon-sousuo {
        position: absolute;
        top: 3px;
        right: 10px;
        cursor: pointer;
    }
</style>