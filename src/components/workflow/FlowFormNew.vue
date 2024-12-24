<template>
    <div class="wrap">
        <div class="formTable" v-if="isLoad">
            <table class="newTable">
                <template v-for="(row, key) in cellData" :key="key">
                    <tr v-if="isShowRow(row,key)" :style="setRowStyle(key)">
                        <template v-for="(col, colKey, colIndex) in row" :key="colIndex">
                            <td :col="colKey" :rowspan="col.rowspan || 1" :colspan="col.colspan || 1" v-if="isShowCell(key, colKey, col.rowspan, col) && col && col.field?.displayCategory!='RelatedList'" :style="setStyle(key,colKey)">
                                <template v-if="col.v ||  col.p">
                                    <span>
                                        {{col.v}}
                                    </span>
                                    <span v-if="col.p">
                                        {{col.p.body.dataStream}}
                                    </span>
                                </template>
                                <template v-else-if="col.field">
                                    <div>
                                        <FieldType :type="col.field.type" :print="print" :field="col.field" :entityApiName="entityApiName" :list="list" :select="select" :search="search" :attributes="attributes" @setValue="handleSetValue" @openlook="handleOpenLook" @lookup="searchlookup" @select="selectLookup" @suggestion="changeSuggestion" />
                                    </div>
                                </template>
                            </td>
                            <td v-else-if="col && col.field && col.field.displayCategory=='RelatedList'" :colspan="col.colspan" :style="setStyle(key,colKey)" style="background: #fff;padding: 10px;">
                                <div class="childTableOption" v-if="print!=1">
                                    <a-button class="ant-btn-icon" @click="handleAddSubTable(col)">
                                        <PlusOutlined />
                                    </a-button>
                                    <a-button :disabled="col.selectedList.length ? false : true" class="ant-btn-icon ml10" @click="handleDelSubTable(col)">
                                        <MinusOutlined />
                                    </a-button>
                                    <a-button :disabled="col.selectedList.length ? false : true" class="ant-btn-icon ml10" @click="handleCopySubTable(col)">
                                        <CopyOutlined />
                                    </a-button>
                                    <!-- <a-button @click="handleAddSubTable(col)">添加</a-button>
                                    <a-button class="ml10">批量添加</a-button> -->
                                </div>
                                <div class="excelTableView">
                                    <table>
                                        <thead>
                                            <tr>
                                                <td style="border: 1px solid #5d9cec;height: 30px;text-align: center;min-width: 40px;">操作</td>
                                                <!-- <td style="border: 1px solid #5d9cec;height: 30px;text-align: center;min-width: 30px;">序号</td> -->
                                                <td v-for="(child, childIdx) in col.field.checkedColumns" style="border: 1px solid #5d9cec;height: 30px;text-align: center;">
                                                    {{child.label}}
                                                </td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <a-checkbox-group v-model:value="col.selectedList" style="width: 100%;display: contents;">
                                                <tr v-for="(sub, subIdx) in col.subTableData" style="width: 100%;">
                                                    <td style="border: 1px solid #5d9cec;height: 24px;text-align: center;">
                                                        <a-checkbox :value="sub.key"></a-checkbox>
                                                    </td>
                                                    <!-- <td style="border: 1px solid #5d9cec;height: 24px;text-align: center;">{{subIdx+1}}</td> -->
                                                    <td v-for="(child, childIdx) in col.field.checkedColumns" style="border: 1px solid #5d9cec;height: 24px;">
                                                        <FieldType :type="child.type" :print="print" :field="child" :list="sub" :select="relatedObjData[col.field.id].select" :search="col.search" @openlook="(e)=>{handleOpenLookChildren(e, subIdx, col.field)}" @lookup="(search, field)=>searchlookupChildren(search, field, col, subIdx)" />
                                                    </td>
                                                </tr>
                                            </a-checkbox-group>
                                        </tbody>
                                    </table>
                                </div>
                            </td>
                        </template>
                    </tr>
                </template>
            </table>
        </div>
        <radio-dept
            v-if="isRadioDept"
            :isShow="isRadioDept"
            @cancel="cancelDeptModal"
            @selectVal="handleDeptParams"
        />
          <radio-user
            v-if="isRadioUser"
            :isShow="isRadioUser"
            @cancel="cancelUserModal"
            @selectVal="handleUserParams"
            :localId="fieldData.name"
          ></radio-user>
        <Lookup-filter v-if="isLookup" :isShow="isLookup" :field="fieldData.name" :entityApiName="entityApiName" :lookEntityApiName="lookEntityApiName" :lookObjectTypeCode="lookObjectTypeCode" :objectTypeCode="objTypeCode" @cancel="isLookup=false" @select="handleSelectData"></Lookup-filter>
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
        toRaw,
        nextTick,
        defineEmits,
        defineProps,
        defineExpose,
        inject,
    } from "vue";
    import {
        PlusOutlined, MinusOutlined, CopyOutlined
    } from "@ant-design/icons-vue";
    import Interface from "@/utils/Interface.js";
    import FieldType from "@/components/workflow/formPreview/FieldType.vue";
    import RadioDept from "@/components/commonModal/RadioDept.vue";
    import RadioUser from "@/components/commonModal/RadioUser.vue";
    import LookupFilter from "@/components/commonModal/LookupFilter.vue";
    import { formNodesValueObj } from "@/utils/common.js";
    import { message } from "ant-design-vue";
    const { proxy } = getCurrentInstance();
    import { useRoute, useRouter } from "vue-router";
    const router = useRouter();
    const route = useRoute();

    const props = defineProps({
        processId: String,
        processInstanceId: String,
        toActivityID: String,
        print: {
            type: String,
            default: 0
        }
    })
    const data = reactive({
        entityId: route.query.entityId,
        layoutData: {},
        rowCount: "",
        columnCount: "",
        cellData: {},
        mergeData: [],
        mergeRowKeyData: {},
        rows: [],
        mergeRowColData: {}, // startRow endRow 不同 处理合并行之后的单元格
        isRadioUser: false,
        isRadioDept: false,
        isLookup: false,
        fieldData: {},
        entityApiName: "QJD",
        lookEntityApiName: "",
        lookObjectTypeCode: "",
        objectTypeCode: "",
        list: {},
        select: {},
        search: {},
        columns: [],
        comps: [],
        ruleId: route.query.id, // 流程办理id
        processId: "",
        entityLayoutId: "",
        isLoad: false,
        entityObjectId: "",
        attributes: [],
        processInstanceId: "",
        objTypeCode: "",
        isSub: false, // 是否是子表
        subRecordFieldData: {}, // 相关列表搜索字段
        relatedObjData: {}, // 相关列表
        relatedEntityInfoList: [],
        toActivityID: "", // 当前节点ID
        deleteRelatedData: [], // 删除子表的数据
        masterEntityPermission: {}, // 主表权限
        relatedListEntityPermissions: [], // 子表权限
        maxRowNum: 0
    });
    const { entityId, layoutData, rowCount, columnCount, cellData, mergeData, rows, mergeRowColData, 
        isRadioUser, isRadioDept, isLookup, fieldData, entityApiName, lookEntityApiName, lookObjectTypeCode, objectTypeCode, columns, comps, ruleId,
        processId, entityLayoutId, select, isLoad, entityObjectId, attributes, list, search, processInstanceId, objTypeCode, isSub,
        subRecordFieldData, relatedObjData, relatedEntityInfoList, toActivityID, deleteRelatedData,
        masterEntityPermission, relatedListEntityPermissions, maxRowNum
     } = toRefs(data);

     const handleSetValue = (field, value) => {
        console.log("e", field, value);
        data.list[field] = value;
        console.log('data.list', data.list);
     }

    
    const getRuleLogData = async () => {
        let obj = {
            actions: [{
                id: "4270;a",
                descriptor: "aura://RecordUiController/ACTION$getRecordWithFields",
                callingDescriptor: "UNKNOWN",
                params: {
                    recordId: data.ruleId,
                    apiName: "WFRuleLog"
                }
            }]
        }
        let d = {
            message: JSON.stringify(obj)
        }
        let res = await proxy.$post(Interface.detail, d);
        if(res && res.actions && res.actions[0].returnValue){
            let { ProcessId, ProcessInstanceId, ToActivityID } = res.actions && res.actions[0].returnValue.fields;
            data.processId = ProcessId.value;
            data.processInstanceId = ProcessInstanceId.value;
            data.toActivityID = ToActivityID.value;
        }
    };

    const getProcessDefinitionInfo = async () => {
        let obj = {
            actions: [{
                id: "4270;a",
                descriptor: "aura://RecordUiController/ACTION$getRecordWithFields",
                callingDescriptor: "UNKNOWN",
                params: {
                    processId: data.processId
                }
            }]
        }
        let d = {
            message: JSON.stringify(obj)
        }
        let res = await proxy.$post(Interface.workflow.getProcessDefinitionInfo, d);
        console.log("getProcessDefinitionInfo-res", res);
        if(res && res.actions && res.actions[0].returnValue){
            let { entityLayoutId, templateId, templateName, entityType } = res.actions[0].returnValue;
            data.entityLayoutId = entityLayoutId;
            data.entityObjectId = templateId;
            data.entityApiName = templateName;
            data.objTypeCode = entityType;
        }
    }

    const getFlowFormDetail = async () => {
        let obj = {
            actions: [{
                id: "4270;a",
                descriptor: "aura://RecordUiController/ACTION$getRecordWithFields",
                callingDescriptor: "UNKNOWN",
                params: {
                    recordId: data.processInstanceId,
                    apiName: data.entityApiName
                }
            }]
        }
        let d = {
            message: JSON.stringify(obj)
        }
        let res = await proxy.$post(Interface.detail, d);
        // console.log("getFlowFormDetail", res);
        if(res && res.actions && res.actions[0] && res.actions[0].returnValue){
            let fields = res.actions[0].returnValue.fields;
            // console.log("data.comps", data.comps);
            for(let key in data.list){
                let type = data.comps.find(item=>item.id == key).type;
                // console.log("type:",type);

                if(type=='U' || type=='O' || type=='Y' || type=='Y_MD'){
                    data.search[key] = [{
                        ID: fields[key].value,
                        Name: fields[key].displayValue
                    }]
                }

                data.list[key] = fields[key].value;
            }
            // console.log("list", data.list);
        }
            
    }

    // 获取主对象相关列表
    const getRelatedObjects = async () => {
        let obj = {
            actions:[{
                id: "4270;a",
                descriptor: "",
                callingDescriptor: "UNKNOWN",
                params: {
                    id: data.entityObjectId
                }
            }]
        }
        let d = {
            message: JSON.stringify(obj)
        }
        let res = await proxy.$post(Interface.workflow.getRelatedObjects, d);
        let relatedEntityList = res.actions[0].returnValue;
        // console.log("relatedEntityList", relatedEntityList);
        // console.log("relatedObjData", data.relatedObjData);


        let relatedEntityInfoList = [];
        for(let key in data.relatedObjData){
            let name = data.relatedObjData[key].relatedName;
            let entityRow = relatedEntityList.find(item=>item.relatedEntity==name);
            entityRow.checkedColumns = data.relatedObjData[key].checkedColumns;
            relatedEntityInfoList.push(entityRow);
        };
        data.relatedEntityInfoList = relatedEntityInfoList;

    };

    const getRelatedPicks = async () => {
        const requests = data.relatedEntityInfoList.map(item => {
            let obj = {
                actions:[{
                    id: "2320;a",
                    descriptor: "",
                    callingDescriptor: "UNKNOWN",
                    params: {
                        objectApiName: item.relatedEntity,
                        recordTypeId: ""
                    }
                }]
            };
            let d = {
                message: JSON.stringify(obj)
            }
            return proxy.$post(Interface.pickListValues, d);
        });

        try{
            const results = await Promise.all(requests);
            let keys = Object.keys(data.relatedObjData);
            results.forEach((item, index)=>{
                let pickList = item.actions[0].returnValue;
                data.relatedObjData[keys[index]]['select'] = pickList;
            });
            // console.log("data.relatedObjData:", data.relatedObjData);
        }catch{

        }
    };

    const getRelatedAttrs = async () => {
        const requests = data.relatedEntityInfoList.map(item => {
            let d = {
                entityApiName: item.relatedEntity
            }
            return proxy.$post(Interface.objFieldData, d);
        });

        try{
            const results = await Promise.all(requests);
            let keys = Object.keys(data.relatedObjData);
            results.forEach((item, index)=>{
                let attributes = item.attributes;
                data.relatedObjData[keys[index]]['attributes'] = attributes;
            });
            // console.log("data.relatedObjData-attributes:", data.relatedObjData);
        }catch{

        }
    }

    const getFlowFormRelatedList = async () => {

        // console.log("relatedEntityInfoList", data.relatedEntityInfoList);

        let requests = data.relatedEntityInfoList.map(item=>{
            let filterQuery = item.relatedEntityJoinField+'\teq\t'+data.processInstanceId;
            let displayColumns = item.checkedColumns.map(row=>row.key).join(',');
            let d = {
                filterId: "",
                // displayColumns: displayColumns,
                objectTypeCode: item.relatedEntityObjectTypeCode,
                entityName: item.relatedEntity,
                filterQuery: filterQuery,
                page: 1,
                rows: 100
            };
            return proxy.$post(Interface.list2, d);
        })

        try{
            let results = await Promise.all(requests);
            // console.log("relatedObjData-nodes", data.relatedObjData);
            // console.log("results-nodes:", results);
    
            let keys = Object.keys(data.relatedObjData);
            results.forEach((item, index)=>{
                let list = [];
                item.nodes.forEach((row, idx)=>{
                    let obj = {};
                    for(let key in row){
                        if(row[key].__typeName){
                            obj[key] = formNodesValueObj(key, row);
                        }else {
                            obj[key] = row[key];
                        }
                    }
                    obj['key'] = idx+1;
                    list.push(obj);
                });
                // console.log("listlist", list);
                data.relatedObjData[keys[index]]['list'] = list;
            });
            // console.log('data.relatedObjDatadata.relatedObjData', data.relatedObjData);
    
            data.cellData.forEach(item=>{
                for(let key in item){
                    let col = item[key];
                    if(col.field?.displayCategory == 'RelatedList'){
                        let keys = col.field.checkedColumns.map(row=>row.key);
                        let relatedName = col.field.id;
                        let list = [];
                        data.relatedObjData[relatedName].list.forEach((row, index)=>{
                            let obj = {};
                            for(let field of keys){
                                if(Object.prototype.toString.call(row[field]) == '[object Object]'){
                                    if(col.search[field]?.length==0){
                                        col.search[field] = [row[field]];
                                    }else if(col.search[field]?.length > 0){
                                        let isBook = col.search[field].some(l=>l.ID==row[field].ID);
                                        if(!isBook){
                                            col.search[field].push(row[field]);
                                        }
                                    }
                                    obj[field] = row[field].ID;
                                }else {
                                    obj[field] = row[field];
                                }
                            };
                            obj['id'] = row.id;
                            obj['key'] = row.key;
                            list.push(obj);
                        });
                        col.subTableData = list;
                    }
                }
            });
    
            // console.log("data.cellData:", data.cellData);
        }catch(err){
            console.log("err");
        }
        
    }

    const getProcessData = async () => {
        
        let obj = {
            actions: [{
                id: "4270;a",
                descriptor: "aura://RecordUiController/ACTION$getRecordWithFields",
                callingDescriptor: "UNKNOWN",
                params: {
                    recordId: data.processId,
                    apiName: "WFProcess"
                }
            }]
        }
        let d = {
            message: JSON.stringify(obj)
        }
        let res = await proxy.$post(Interface.detail, d);
        if(res && res.actions && res.actions[0].returnValue){
            let { EntityLayoutId, EntityObjectId } = res.actions && res.actions[0].returnValue.fields;
            data.entityLayoutId = EntityLayoutId.value;
            data.entityObjectId = EntityObjectId.value;
        }
    }

    const getEntityData = async () => {
        let obj = {
            actions: [{
                id: "4270;a",
                descriptor: "aura://RecordUiController/ACTION$getRecordWithFields",
                callingDescriptor: "UNKNOWN",
                params: {
                    recordId: data.entityObjectId,
                    apiName: "Entity"
                }
            }]
        }
        let d = {
            message: JSON.stringify(obj)
        }
        let res = await proxy.$post(Interface.detail, d);
        if(res && res.actions && res.actions[0].returnValue){
            console.log("entity", res);
        }

    }

    const getPickList = () => {
        let d = {
            actions:[{
                id: "2320;a",
                descriptor: "",
                callingDescriptor: "UNKNOWN",
                params: {
                    objectApiName: data.entityApiName,
                    recordTypeId: ""
                }
            }]
        }
        let obj = {
            message: JSON.stringify(d)
        }
        proxy.$post(Interface.pickListValues, obj).then((res) => {
            let picklistFieldValues = res.actions[0].returnValue;
            data.select = picklistFieldValues;
        })
    }


    const getAttributes = async () => {
        const res = await proxy.$get(Interface.objFieldData, {
            entityApiName: data.entityApiName
        })
        data.attributes = res.attributes;
    }

    const selectLookup = (value, field) => {
        console.log('comps', data.comps);
        // console.log(value, field);
        let findRow = data.attributes.find(item=>field.id == item.name);
        // console.log("findRow", findRow);
        let obj = {
            actions:[{
                id: "2919;a",
                descriptor: "",
                callingDescriptor: "UNKNOWN",
                params: {
                    objectApiName: data.entityApiName,
                    objectFieldName: field.id,
                    objectFieldValue: value,
                    targetApiName: findRow.referencedEntity.EntityName,
                    targetObjectTypeCode: findRow.referencedEntity.EntityObjectTypeCode || '',
                }
            }]
        };
        let d = {
            message: JSON.stringify(obj)
        }
        // console.log("obj", obj);
        proxy.$post(Interface.getMapFieldValues, d).then(res=>{
            console.log("getMapFieldValues-res", res);
            let returnValue = res.actions[0].returnValue;
            
            for(let key in returnValue){
                const row = data.comps.find(item=>item.id == key);
                const type = row.type;
                if(type=='U' || type=='O' || type=='Y' || type=='Y_MD'){
                    const { value, displayValue } = returnValue[key];
                    const isExist = data.search[key].some(v=>v.ID == value);
                    if(!isExist){
                        let obj = {
                            ID: value,
                            Name: displayValue
                        };
                        data.search[key].push(obj);
                    }
                }
                data.list[key] = returnValue[key].value;
            }
        })
    }

    const searchlookup = (search, field) => {
        let targetApiName;
        let findRow = data.attributes.find(item=>field.id == item.name);
        // console.log("findRow", findRow);

        targetApiName = findRow.referencedEntity.EntityName;
        let obj = {
            actions:[{
                id: "6129;a",
                descriptor: "",
                callingDescriptor: "UNKNOWN",
                params: {
                    objectApiName: data.entityApiName,
                    fieldApiName: field.id,
                    pageParam: 1,
                    pageSize: 25,
                    q: "",
                    search: search,
                    searchType: "Recent",
                    targetApiName: targetApiName,
                    body: {
                        sourceRecord: {
                            apiName: data.entityApiName,
                            fields: {
                                Id: null,
                                RecordTypeId: ""
                            }
                        }
                    }
                }
            }]
        }
        let d = {
            message: JSON.stringify(obj)
        }
        proxy.$post(Interface.lookup, d).then((res) => {
            let list = res.actions[0].returnValue.lookupResults.records;
            let arr = [];
            list.forEach(item=>{
                arr.push({
                    ID: item.fields.Id.value,
                    Name: item.fields.Name.value
                })
            });

            if(data.search[field.id].length == 0){
                data.search[field.id] = arr;
            }else {
                arr.forEach(item=>{
                    let isBook = data.search[field.id].some(row=>row.ID==item.ID);
                    if(!isBook){
                        data.search[field.id].push(item);
                    }
                });
            }
            // data.search[field.id] = arr;
        })
    }

    const searchlookupChildren = (search, field, col, subIdx) => {
        // console.log("search", search);
        // console.log("field", field);
        // console.log("col", col);
        // console.log("subIdx", subIdx);
        let subRecordFieldData = {
            name: col.field.id, // 当前子表名称
            subIdx,
            data: field
        };
        let targetApiName;

        let attributes = data.relatedObjData[col.field.id].attributes;
        let findRow = attributes.find(item=>field.id == item.name);
        console.log("findRow", findRow);
        targetApiName = findRow.referencedEntity.EntityName;
        let obj = {
            actions:[{
                id: "6129;a",
                descriptor: "",
                callingDescriptor: "UNKNOWN",
                params: {
                    objectApiName: data.entityApiName,
                    fieldApiName: field.id,
                    pageParam: 1,
                    pageSize: 25,
                    q: "",
                    searchType: "Recent",
                    targetApiName: targetApiName,
                    search: search,
                    body: {
                        sourceRecord: {
                            apiName: data.entityApiName,
                            fields: {
                                Id: null,
                                RecordTypeId: ""
                            }
                        }
                    }
                }
            }]
        }
        let d = {
            message: JSON.stringify(obj)
        }
        proxy.$post(Interface.lookup, d).then((res) => {
            let list = res.actions[0].returnValue.lookupResults.records;
            let arr = [];
            list.forEach(item=>{
                arr.push({
                    ID: item.fields.Id.value,
                    Name: item.fields.Name.value
                })
            });
            // console.log("arr", arr);
            data.cellData.forEach(item=>{
                for(let key in item){
                    let { name, subIdx } = subRecordFieldData;
                    let { id } = subRecordFieldData.data;
                    if(item[key].field?.id == name){
                        if(item[key].search[id].length == 0){
                            item[key].search[id] = arr;
                        }else {
                            arr.forEach(selfItem=>{
                                let isBook = item[key].search[id].some(row=>row.ID==selfItem.ID);
                                if(!isBook){
                                    item[key].search[id].push(selfItem);
                                }
                            });
                            // item[key].search[id] = item[key].search[id].concat(arr);
                        }
                    }
                }    
            })
        })
    };

    // 获取权限
    const getPermission = async () => {
        let obj = {
            actions:[{
                id: "562;a",
                descriptor: "",
                callingDescriptor: "UNKNOWN",
                params: {
                    processId: data.processId,
                    activityId: data.toActivityID
                }
            }]
        };

        let d = {
            message: JSON.stringify(obj)
        }
        let res = await proxy.$post(Interface.workflow.getPermission, d);
        // console.log("permission-res", res);
        let permission = res.actions[0].returnValue;
        let { masterEntityPermission, relatedListEntityPermissions } = permission;
        data.masterEntityPermission = masterEntityPermission;
        data.relatedListEntityPermissions = relatedListEntityPermissions;

        handleFormPerm();
    }

    // permission 2:不可见 4:只读 8/0:读写 16: 显示默认值且不可修改 32: 显示默认值且可修改
    const handleFormPerm = () => {
        data.cellData.forEach(item=>{
            for(let key in item){
                let col = item[key];
                if(col.field && col.field.displayCategory != 'RelatedList'){
                    let id = col.field.id;
                    let permission = searchCorrelationFieldPerm(data.masterEntityPermission.fieldPermissions, id);
                    col.field.permission = permission;
                } else if(col.field && col.field.displayCategory == 'RelatedList'){
                    let relatedName = col.field.id.split('__')[1];
                    let { fieldPermissions } = data.relatedListEntityPermissions.find(v=>v.name==relatedName);
                    col.field.checkedColumns.forEach(column=>{
                        column.permission = searchCorrelationFieldPerm(fieldPermissions, column.key);
                    })
                }
            }
        });
        // console.log("data.cellData", data.cellData);
    };

    const searchCorrelationFieldPerm = (fieldPermissions, field) => {
        let row = fieldPermissions.find(item=>{
            return item.name == field;
        });
        let permission = row?.permission || '';
        return permission;
    }


    const loadQuery = async () => {
        data.processId = props.processId;
        data.processInstanceId = props.processInstanceId;
        data.toActivityID = props.toActivityID;
        // await getRuleLogData();
        await getProcessDefinitionInfo();
        // await getProcessData();
        // await getEntityData();
        await getDetail();
        getPickList();
        await getAttributes();
        await getFlowFormDetail();
        
        await getRelatedObjects();
        await getRelatedPicks();
        await getRelatedAttrs();
        await getFlowFormRelatedList();
        await getPermission();
        data.isLoad = true;
    }
    loadQuery();
    
    const getDetail = async () => {
        let obj = {
            actions: [{
                id: "4270;a",
                descriptor: "aura://RecordUiController/ACTION$getRecordWithFields",
                callingDescriptor: "UNKNOWN",
                params: {
                    recordId: data.entityLayoutId,
                    // recordId: "6E4F1989-831A-42EC-863B-675ECADC1F3B", // 流程步骤表单
                    apiName: "EntityForm"
                }
            }]
        }
        let d = {
            message: JSON.stringify(obj)
        }
        await proxy.$post(Interface.detail, d).then(res => {
            let { LayoutData } = res.actions[0].returnValue.fields;
            let univerLayoutData = JSON.parse(LayoutData.value);
            data.layoutData = univerLayoutData;

            let { cells, columnCount, columns, rowCount, rows, mergeData }  = univerLayoutData.formLayout.pageLayouts[0].workbook;
            data.rowCount = rowCount;
            data.columnCount = columnCount;
            data.mergeData = mergeData;
            data.rows = rows;
            data.columns = columns;
            console.log("mergeData:", mergeData);
            if(mergeData.length){
                mergeData.forEach(item=>{
                    if(item.startRow!=item.endRow){
                        data.mergeRowColData[item.startRow] = item;
                    }
                    data.mergeRowKeyData[item.startRow] = item;
                })
            }
            let comps = univerLayoutData.formLayout.pageLayouts[0].comps;
            data.comps = comps;
            comps.forEach(item=>{
              if(item.displayCategory!="RelatedList"){
                  let { row, column } = item.layout;
                  let style = {};
                  if(data.cellData[row]){
                      data.cellData[row][column] = {
                          v: item.label
                      }
                  }else {
                      data.cellData[row] = {
                          [column]: {
                              v: item.label,
                          }
                      }
                  }
                data.list[item.name] = "";
              }
              
            });

            data.cellData = JSON.parse(JSON.stringify(cells));

            // 获取最大行数
            let maxRowNum = 0;
            cells.forEach((item, index)=>{
                let temp = [];
                for (let key in item) {
                    if (item.hasOwnProperty(key)) {
                        temp.push(item[key]);
                    }
                };
                let isVal = temp.some(b => b && b.v || b.field);
                if(isVal){
                    maxRowNum = index;
                }
            });
            console.log("maxRowNum", maxRowNum);
            data.maxRowNum = maxRowNum;


            // console.log("comps", comps);
            // 处理子表
            comps.forEach(item=>{
                let { row, column } = item.layout;
                let style = {};
                if(data.cellData?.[row]?.[column]){
                    data.cellData[row][column].v = "";
                    data.cellData[row][column].field = item;
                    data.cellData[row][column].subTableData = [];
                    data.cellData[row][column].selectedList = [];
                    if(item.displayCategory=='RelatedList'){
                        data.cellData[row][column].search = {};
                        console.log("data.cellData[row][column]", data.cellData[row][column]);
                        let rowField = {
                            key: 1
                        };
                        item.checkedColumns?.forEach(item=>{
                            rowField[item.key] = "";
                            item.id = item.key;
                        })
                        data.cellData[row][column].subTableData.push(rowField);

                        // search
                        data.cellData[row][column].field.checkedColumns.forEach(k=>{
                            // console.log("k", k);
                            data.cellData[row][column].search[k.id] = [];
                        })

                        // 记录相关列表
                        let relatedName = item.id.split("__")[1];
                        data.relatedObjData[item.id] = {
                            relatedName: relatedName,
                            checkedColumns: item.checkedColumns
                        }
                    }
                }
            });
            if(data.mergeData){
                data.mergeData.forEach(item=>{
                    if(data.cellData[item.startRow] && data.cellData[item.startRow][item.startColumn]){
                        data.cellData[item.startRow][item.startColumn].colspan = item.endColumn - item.startColumn + 1;
                        data.cellData[item.startRow][item.startColumn].rowspan = item.endRow - item.startRow + 1;
                        if(item.endColumn){
                            let num = item.endColumn - item.startColumn;
                            for(let i = 0; i < num; i++){
                                let deleteNum = item.endColumn-i;
                                data.cellData[item.startRow][deleteNum].skip = true;
                                // delete data.cellData[item.startRow][deleteNum];
                            };
                        }

                        // 处理合并行
                        if(item.startColumn == item.endColumn && item.endRow - item.startRow > 0){
                            let num = item.endRow - item.startRow;
                            console.log("num", num);
                            for(let i = 0; i < num; i++){
                                let deleteRow = item.endRow-i;
                                data.cellData[deleteRow][item.startColumn].skip = true;
                                // delete data.cellData[deleteRow][item.startColumn];
                            }
                        }
                    }
                });
            };
            console.log('data.cellData2', data.cellData);
            console.log('mergeRowKeyData', data.mergeRowKeyData);
            // console.clear();
        })
    }

    const setRowStyle = (key) => {
        let style = {};
        if(data.rows[key] && data.rows[key].h){
            style.height = data.rows[key].h + "px"
        }
        return style;
    }

    const setStyle = (row, col) => {
        // console.log("style", data.cellData[row][col].style);
        let style = {};
        if(data.cellData[row][col].style){
            let styleData = data.cellData[row][col].style;
            for(let styleName in styleData){
                if(styleName=='fs'){
                    // style.fontSize = styleData[styleName] + "px";
                }
                if(styleName == 'bg'){
                    style.background = styleData[styleName].rgb;
                }
                if(styleName == 'cl'){
                    style.color = styleData[styleName]?.rgb;
                }
                if(styleName=='bd'){
                    style.border = "1px solid #000";
                    style.width = '90px';
                    let layout = data.comps[Number(row)]?.layout;
                    // style.width = data.columns[layout.column].defaultWidth + 'px';
                }
                if(styleName=='ht'){
                    style.textAlign = styleData[styleName] == 1 ? "left" : styleData[styleName] == 2 ? "center" : styleData[styleName] == 3 ? "right" : "";
                }
                if(styleName=='pd'){
                    if(styleData[styleName]){
                        let { b, l, r, t } = styleData[styleName];
                        style.paddingTop = t+'px';
                        style.paddingRight = r+'px';
                        style.paddingBottom = b+'px';
                        style.paddingLeft = l+'px';
                    }
                }
                if(styleName=='ff'){
                    style.fontFamily = styleData[styleName];
                }
                if(styleName=='tr'){
                    if(styleData[styleName]?.a == 0 && styleData[styleName].v == 1){
                        style.writingMode = "vertical-rl";
                    }
                }
                if(styleName=='bl'){
                    // style.fontWeight = 'bold';
                }
            }
        }
        return style;
    }

    const isShowCell = (key, colKey, col) => {
        // console.log("data.cellData", data.cellData);
        let isBook = true;
        if(key == 0){
            isBook = false;
        }
        if(colKey == 0){
            isBook = false;
        }
        if(colKey == data.columnCount-1){
            isBook = false;
        }
        // 处理合并行跳过
        if(data.cellData[key][colKey]?.skip){
            isBook = false;
        }
        return isBook;
    }

    // 合并行和列
    let ranges = [];
    const shouldRenderCell = (rowKey, colKey, rowspan, col) => {
        let n = true;
        if(data.mergeRowKeyData[rowKey]){
            // console.log('mergeRowKeyData[rowKey]', data.mergeRowKeyData[rowKey]);
            n = isInRange(colKey, data.mergeRowKeyData[rowKey].startColumn, data.mergeRowKeyData[rowKey].endColumn+1);
            // console.log("data.mergeRowKeyData", data.mergeRowKeyData[rowKey], rowKey, colKey, n, data.mergeRowKeyData[rowKey].startColumn, data.mergeRowKeyData[rowKey].endColumn );
        } else {
            n = false;
        }
        if(data.mergeRowColData[rowKey]){
            // 处理合并行
            let startRow =  data.mergeRowColData[rowKey].startRow;
            let endRow =  data.mergeRowColData[rowKey].endRow;
            if(startRow != endRow){
                // console.log("startRow", startRow, endRow);
                let min = startRow+1;
                let max = endRow;
                for(let i = min; i <= endRow; i++){
                    if(ranges.indexOf(i)==-1){
                        ranges.push(i);
                    }
                }
            }
        }
        // console.log("ranges", ranges, rowKey, ranges.indexOf(rowKey));

        // 处理合并行 - 第二行的列
        if(ranges.indexOf(rowKey)!=-1){
            if(colKey==1){
                n = true;
            }
        }
        if(col.v=='' && !col.field){
            n = true;
        }
        return !n;
    };

    const isInRange = (num, min, max) => {
        return num > min && num < max;
    }

    const handleOpenLook = (e) => {
        data.isChildren = false;
        console.log('e', e);
        data.fieldData = e;
        let type = e.type;
        if (type == 'U') {
            data.isRadioUser = true;
        } else if (type == 'O') {
            data.isRadioDept = true;
        }else {
            // console.log("data", data.attributes);
            let { EntityName, EntityObjectTypeCode } = data.attributes.find(item=>item.name == e.id).referencedEntity;
            console.log("EntityName, EntityObjectTypeCode", EntityName, EntityObjectTypeCode);
            data.lookEntityApiName = EntityName;
            data.lookObjectTypeCode = EntityObjectTypeCode;
            data.isLookup = true;
        }
    };

    // 子表查找字段
    const handleOpenLookChildren = (e, subIdx, field) => {
        console.log("e", e);
        // console.log("field", field);
        data.isSub = true;
        // console.log("handleOpenLookChildren", e, subIdx);
        data.subRecordFieldData = {
            name: field.id, // 当前子表名称
            subIdx,
            data: e
        };
        let type = e.type;
        // console.log("subRecordFieldData", data.subRecordFieldData);

        if (type == 'U') {
            data.isRadioUser = true;
        } else if (type == 'O') {
            data.isRadioDept = true;
        }else {
            let attributes = data.relatedObjData[field.id].attributes;
            let { EntityName, EntityObjectTypeCode } = attributes.find(item=>item.name == e.id).referencedEntity;
            // console.log("EntityName, EntityObjectTypeCode", EntityName, EntityObjectTypeCode);
            data.lookEntityApiName = EntityName;
            data.lookObjectTypeCode = EntityObjectTypeCode;
            data.isLookup = true;
        }
    };

    const cancelUserModal = () => {
        data.isRadioUser = false;
    };
    const handleUserParams = (e) => {
        // console.log("search:", data.search);
        // console.log("fieldData:", data.fieldData);
        // console.log("handleUserParams:", e);
        let newData = {
            ID: e.id,
            Name: e.name
        }
        
        // 处理子表
        if(!data.isSub){
            let { name } = data.fieldData;
            if(data.search[name] == undefined){
                // console.log("1123", data.search[name])
                data.search[name] = [
                    newData
                ]
            }else {
                let isBook = data.search[name].some(item=>item.ID==newData.ID);
                if(!isBook){
                    data.search[name].push(newData);
                }
            }
            data.list[name] = newData.ID;
        }else {
            // console.log("sublist", data.subRecordFieldData);
            // console.log("dada", data.cellData);
            data.cellData.forEach(item=>{
                for(let key in item){
                    let { name, subIdx } = data.subRecordFieldData;
                    let { id } = data.subRecordFieldData.data;
                    if(item[key].field?.id == name){
                        if(item[key].search[id].length == 0){
                            item[key].search[id] = [newData];
                        }else {
                            let isBook = item[key].search[id].some(row=>row.ID==newData.ID);
                            if(!isBook){
                                item[key].search[id].push(newData);
                            }
                        }
                        item[key].subTableData[subIdx][id] = newData.ID;
                    }
                }    
            })
        }
        // console.log("search", data.search);
        // console.log("list", data.list);
        data.isRadioUser = false;
    };

    const cancelDeptModal = () => {
        data.isRadioDept = false;
    };

    const handleDeptParams = (e) => {
        // console.log("handleDeptParams:", e);
        // console.log("fieldData:", data.fieldData);
        let newData = e;
        if(!data.isSub){
            let { name } = data.fieldData;
            console.log("data.search[name]", data.search[name]);
            if(data.search[name] == undefined){
                data.search[name] = [
                    newData
                ]
            }else {
                let isBook = data.search[name].some(item=>item.ID==newData.ID);
                if(!isBook){
                    data.search[name].push(newData);
                }
            }
            data.list[name] = newData.ID;
        }else {
            data.cellData.forEach(item=>{
                for(let key in item){
                    let { name, subIdx } = data.subRecordFieldData;
                    let { id } = data.subRecordFieldData.data;
                    if(item[key].field?.id == name){
                        if(item[key].search[id].length == 0){
                            item[key].search[id] = [newData];
                        }else {
                            let isBook = item[key].search[id].some(row=>row.ID==newData.ID);
                            if(!isBook){
                                item[key].search[id].push(newData);
                            }
                        }
                        item[key].subTableData[subIdx][id] = newData.ID;
                    }
                }    
            })
        }

        data.isRadioDept = false;
    };


    // 通用查找弹窗赋值
    const handleSelectData = (e) => {
        let newData = {
            ID: e.id,
            Name: e.Name
        }
        if(!data.isSub){
            let { name } = data.fieldData;
            console.log("data.search[name]", data.search[name]);
            if(data.search[name] == undefined){
                data.search[name] = [
                    newData
                ]
            }else {
                let isBook = data.search[name].some(item=>item.ID==newData.ID);
                if(!isBook){
                    data.search[name].push(newData);
                }
            }
            data.list[name] = newData.ID;
        }else {
            data.cellData.forEach(item=>{
                for(let key in item){
                    let { name, subIdx } = data.subRecordFieldData;
                    let { id } = data.subRecordFieldData.data;
                    if(item[key].field?.id == name){
                        if(item[key].search[id].length == 0){
                            item[key].search[id] = [newData];
                        }else {
                            let isBook = item[key].search[id].some(row=>row.ID==newData.ID);
                            if(!isBook){
                                item[key].search[id].push(newData);
                            }
                        }
                        item[key].subTableData[subIdx][id] = newData.ID;
                    }
                }    
            })
        }

        data.isLookup = false;
    }

    const isRowShow = (row, key) => {
        let show = true;
        if(row==undefined){
            show = false;
        }
        return show;
    }

    const isShowRow = (row, index) => {
        let isBook = true;
        let temp = [];
        for (let key in row) {
            if (row.hasOwnProperty(key)) {
                temp.push(row[key]);
            }
        };
        let empty = temp.every(b => b && b.v == '' && b.field==undefined);
        if(empty){
            isBook = false;
        }
        // if(empty && index < data.maxRowNum){
        //     isBook = true;
        // }
        return isBook;  
    };

    // 添加子表行

    const handleAddSubTable = (col) => {
        console.log("handleAddSubTable", col);
        let row = {
            key: col.subTableData.length + 1
        };
        col.field.checkedColumns.forEach(item=>{
            row[item.key] = "";
        })
        col.subTableData.push(row);
    };

    const handleDelSubTable = (col) => {
        
        // console.log('col.subTableData', col, col.subTableData, col.selectedList);

        let relatedName = col.field.id.split("__")[1];

        // let  = data.relatedObjData[id];

        let { relatedEntity, relatedEntityObjectTypeCode } = data.relatedEntityInfoList.find(item=>item.relatedEntity == relatedName);

        // console.log("relatedEntity, relatedEntityObjectTypeCode", relatedEntity, relatedEntityObjectTypeCode);

        let deleteRelatedData = [];
        for (let i = col.subTableData.length - 1; i >= 0; i--) {
            let item = col.subTableData[i]
            if (col.selectedList.indexOf(col.subTableData[i].key) !== -1) {
                if(item.id){
                    item.relatedEntity = relatedEntity;
                    item.relatedEntityObjectTypeCode = relatedEntityObjectTypeCode;
                    deleteRelatedData.push(item);
                    col.subTableData.splice(i, 1);
                }else {
                    col.subTableData.splice(i, 1);
                }
            }
        };
        console.log("deleteRelatedData:", deleteRelatedData);
        data.deleteRelatedData = deleteRelatedData;

        // if(deleteRelatedData.length){
        //     deleteRelted();
        // }
    };

    const deleteRelted = async () => {
        let requests = data.deleteRelatedData.map(item=>{
            let obj = {
                actions: [{
                id: "2919;a",
                descriptor: "",
                callingDescriptor: "UNKNOWN",
                    params: {
                        recordId: item.id,
                        apiName: item.relatedEntity,
                        objTypeCode: item.relatedEntityObjectTypeCode,
                    }
                }]
            };
            let d = {
                message: JSON.stringify(obj)
            };
            return proxy.$post(Interface.delete, d);
        });
        
        const results = await Promise.all(requests);
        // console.log("results", results);
        data.deleteRelatedData = [];
        // getFlowFormRelatedList();
    }

    const handleCopySubTable = (col) => {
        console.log("col", col);
        let list = col.subTableData.filter(item=>{
            return col.selectedList.find(row=>{
                return item.key == row;
            })
        });
        const copyData = JSON.parse(JSON.stringify(list));
        copyData.forEach(item=>{
            item.id = '';
            item.key = item.key+new Date().getTime();
            col.subTableData.push(item);
        });
        console.log("col.subTableData", col.subTableData);
    }

    const handleSave_old = () => {
        // console.log("保存", data.list);
        let d = {
          actions:[{
              id: "2919;a",
              descriptor: "",
              callingDescriptor: "UNKNOWN",
              params: {
                  recordId: data.processInstanceId,
                  recordInput:{
                      allowSaveOnDuplicate: false,
                      apiName: data.entityApiName,
                      objTypeCode: data.objTypeCode,
                      fields: data.list
                  }
              }
          }]
        };
        let obj = {
            message: JSON.stringify(d)
        };
        proxy.$post(Interface.edit, obj).then((res) => {
            console.log("res", res);
            message.success("保存成功！");
        })

        // console.log("cellData:", data.cellData);
        // saveRelated();
        
    }

    const handleSave = () => {
        console.log("data.list", data.list);
        console.log("comps", data.comps);

        let isRequired = false;
        for(let i = 0; i < data.comps.length; i++){
            const item = data.comps[i];
            if(item.required == true && (data.list[item.id] == '' || data.list[item.id] == null || data.list[item.id] == undefined)){
                message.error(`${item.label}不能为空!`)
                isRequired = true;
                break;
            }
        }
        if(isRequired){
            return false;
        };

        if(data.deleteRelatedData.length){
            deleteRelted();
        }

        let relatedList = saveRelated();

        let obj = {
          actions:[{
              id: "2919;a",
              descriptor: "",
              callingDescriptor: "UNKNOWN",
              params: {
                master: {
                    recordId: data.processInstanceId,
                    recordInput:{
                        allowSaveOnDuplicate: false,
                        apiName: data.entityApiName,
                        objTypeCode: data.objTypeCode,
                        fields: data.list
                    }
                },
                relatedList: relatedList
              }
          }]
        };

        let d = {
            message: JSON.stringify(obj)
        }

        console.log("d", JSON.stringify(obj));

        proxy.$post(Interface.workflow.updateRecordBatch , d).then(res=>{
            message.success("保存成功！");
        })
    };

    const saveRelated = () => {
        let relatedObj = {};
        data.cellData.forEach(item=>{
            for(let key in item){
                if(item[key]?.field?.displayCategory == 'RelatedList'){
                    let { field, subTableData } = item[key];
                    let relatedName = field.id.split("__")[1];
                    relatedObj[field.id] = {
                        relatedName: relatedName,
                        list: subTableData,
                        checkedColumns: field.checkedColumns
                    }
                }
            }
        });
        console.log("relatedObj", relatedObj);
        let relatedList = [];
        for(let key in relatedObj){
            let relatedName = relatedObj[key].relatedName;
            let list = relatedObj[key].list;
            let newList = list.map(item=>{
                const { key, ...rest } = item;
                return rest;
            });
            data.relatedEntityInfoList.forEach(item=>{
                if(item.relatedEntity == relatedName){
                    // relatedList.push({
                    //     relatedEntity: item.relatedEntity,
                    //     relatedEntityObjectTypeCode: item.relatedEntityObjectTypeCode,
                    //     list: newList
                    // });
                    newList.forEach(row=>{
                        let obj = {
                            recordId: row.id || '',
                            recordInput: {
                                allowSaveOnDuplicate: false,
                                apiName: item.relatedEntity,
                                objTypeCode: item.relatedEntityObjectTypeCode,
                                fields: row
                            }
                        }
                        relatedList.push(obj);
                    })
                }
            })
        };
        // console.log("relatedList", relatedList);
        return relatedList;
    }

    const changeSuggestion = (val, field) => {
        data.list[field.id] = val;
    }

    defineExpose({handleSave});

</script>
<style lang="less" scoped>
    @media print{
        .childTableOption{
            display: none !important;
        }
    }
    .wrap{
        width: 100%;
        /* height: 100vh; */
        /* overflow: auto; */
        background: #fff;
        .formTable{
            width: 95%;
            /* min-height: calc(100vh - 130px); */
            /* margin: 65px auto; */
            display: flex;
            justify-content: center;
            padding: 30px 50px;
            /* background: #e7ecf3; */
            /* box-shadow: 0 0 14px 0 hsla(0, 0%, 83.9%, .5); */
        }
        table{
            border-collapse: collapse;
            tr{
                td{
                    /* width: 90px;
                    height: 30px; */
                    /* border: 1px solid #dedede; */
                    background: transparent !important;
                }
            }
        }
        .childTableOption{
            display: flex;
            justify-content: flex-end;
            align-items: center;
            margin-bottom: 10px;
        }
        .table{
            width: 794px;
            table-layout: fixed;
            td{
                overflow: auto;
            }
        }
        .excelTableView{
            width: 100%;
            overflow: auto;
            table{
                width: 100%;
                td{
                    overflow: hidden;
                    color: #333 !important;
                }
            }
        }
    }
    table.newTable{
        tr{
            td{
                min-width: 66px;
            }
        }
    }
</style>