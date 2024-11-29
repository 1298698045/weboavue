<template>
    <div class="wrap">
        <div class="formTable" v-if="isLoad">
            <table class="table">
                <!-- <tr v-for="(item, index) in rowCount">
                    <td v-for="(row, idx) in columnCount" :style="setStyle(index,idx)">
                        <span>
                            {{cellData[index] && cellData[index][idx]?.v}}
                        </span>
                    </td>
                </tr> -->
                <template v-for="(row, key) in cellData" :key="key">
                    <tr v-if="isRowShow(row,key)" :style="setRowStyle(key)">
                        <!-- <td v-for="(col, colKey, colIndex) in row" :key="colKey" :colspan="col.colspan || 1" v-if="shouldRenderCell(key, colIndex)" :style="setStyle(key,colIndex)">
                            <span>
                                {{col.v}}
                            </span>
                        </td> -->
                        <template v-for="(col, colKey, colIndex) in row">
                            <td :col="colKey" :rowspan="col.rowspan || 1" :colspan="col.colspan || 1" v-if="shouldRenderCell(key, colKey, col.rowspan,col) && col.field?.displayCategory!='RelatedList'" :style="setStyle(key,colKey)">
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
                                        <!-- {{col.field.name}} = {{col.field.type}} -->
                                        <FieldType :type="col.field.type" :field="col.field" :entityApiName="entityApiName" :list="list" :select="select" :search="search" :attributes="attributes" @setValue="handleSetValue" @openlook="handleOpenLook" @lookup="searchlookup" />
                                    </div>
                                </template>
                            </td>
                            <td v-else-if="col.field && col.field.displayCategory=='RelatedList'" :colspan="7 || col.colspan" :style="setStyle(key,colKey)" style="background: #fff;padding: 10px;">
                                <div class="childTableOption">
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
                                                        <a-checkbox :value="sub.id"></a-checkbox>
                                                    </td>
                                                    <!-- <td style="border: 1px solid #5d9cec;height: 24px;text-align: center;">{{subIdx+1}}</td> -->
                                                    <td v-for="(child, childIdx) in col.field.checkedColumns" style="border: 1px solid #5d9cec;height: 24px;">
                                                        <FieldType :type="child.type" :field="child" :list="sub" :select="select" :search="search" @openlook="(e)=>{handleOpenLookChildren(e, subIdx, col.field)}" @lookup="searchlookup" />
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
        <Lookup-filter v-if="isLookup" :isShow="isLookup" :field="fieldData.name" :entityApiName="entityApiName" :lookEntityApiName="lookEntityApiName" :objectTypeCode="objectTypeCode" @cancel="isLookup=false" @select="handleSelectData"></Lookup-filter>
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
    import { message } from "ant-design-vue";
    const { proxy } = getCurrentInstance();
    import { useRoute, useRouter } from "vue-router";
    const router = useRouter();
    const route = useRoute();

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
        subRecordFieldData: {}
    });
    const { entityId, layoutData, rowCount, columnCount, cellData, mergeData, rows, mergeRowColData, 
        isRadioUser, isRadioDept, isLookup, fieldData, entityApiName, lookEntityApiName, objectTypeCode, columns, comps, ruleId,
        processId, entityLayoutId, select, isLoad, entityObjectId, attributes, list, search, processInstanceId, objTypeCode, isSub,
        subRecordFieldData
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
            let { ProcessId, ProcessInstanceId } = res.actions && res.actions[0].returnValue.fields;
            data.processId = ProcessId.value;
            data.processInstanceId = ProcessInstanceId.value;
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
            console.log("data.comps", data.comps);
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
            console.log("list", data.list);
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
            data.search[field.id] = arr;
            // console.log("data.search", data.search);
        })
    } 

    const loadQuery = async () => {
        await getRuleLogData();
        await getProcessDefinitionInfo();
        // await getProcessData();
        // await getEntityData();
        await getDetail();
        getPickList();
        await getAttributes();
        await getFlowFormDetail();
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
                    // recordId: "6E4F1989-831A-42EC-863B-675ECADC1F3B",
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
            console.log("univerLayoutData:", univerLayoutData);
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
            // 去除空白单元格
            let del = [];
            cells.forEach((item, index)=>{
                let temp = [];
                for(let key in item){
                    temp.push(item[key]);
                }
                let isBook = temp.some(v=>v.v!='');
                if(!isBook){
                    if(del.indexOf(index)==-1){
                        del.push(index);
                        delete cells[index];
                    }
                }
            })
            console.log('del', del);
            console.log('cells', cells);
            data.cellData = cells;


            // 处理子表
            comps.forEach(item=>{
                let { row, column } = item.layout;
                let style = {};
                if(data.cellData[row][column]){
                    data.cellData[row][column].v = "";
                    data.cellData[row][column].field = item;
                    data.cellData[row][column].subTableData = [];
                    data.cellData[row][column].selectedList = [];
                    if(item.displayCategory=='RelatedList'){
                        console.log("data.cellData[row][column]", data.cellData[row][column]);
                        let rowField = {
                            id: 1
                        };
                        item.checkedColumns.forEach(item=>{
                            rowField[item.key] = "";
                            item.id = item.key;
                        })
                        data.cellData[row][column].subTableData.push(rowField);
                    }
                }
            });
            if(data.mergeData){
                data.mergeData.forEach(item=>{
                    if(data.cellData[item.startRow] && data.cellData[item.startRow][item.startColumn]){
                        data.cellData[item.startRow][item.startColumn].colspan = item.endColumn - item.startColumn + 1;
                        data.cellData[item.startRow][item.startColumn].rowspan = item.endRow - item.startRow + 1;
                    }
                });
            };
            console.log('data.cellData2', data.cellData);
            console.log('mergeRowKeyData', data.mergeRowKeyData);
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
                    let { b, l, r, t } = styleData[styleName];
                    style.paddingTop = t+'px';
                    style.paddingRight = r+'px';
                    style.paddingBottom = b+'px';
                    style.paddingLeft = l+'px';
                }
                if(styleName=='ff'){
                    style.fontFamily = styleData[styleName];
                }
                if(styleName=='tr'){
                    if(styleData[styleName].a == 0 && styleData[styleName].v == 1){
                        style.writingMode = "vertical-rl";
                    }
                }
            }
        }
        return style;
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
            // data.lookEntityApiName = attribute.attributes.referencedEntityName;
            // data.recordObj = attribute;
            // data.type = type;
            // data.isLookup = true;
        }
    };

    // 子表查找字段
    const handleOpenLookChildren = (e, subIdx, field) => {
        console.log("field", field);
        data.isSub = true;
        console.log("handleOpenLookChildren", e, subIdx);
        data.subRecordFieldData = {
            name: field.id, // 当前子表名称
            subIdx,
            data: e
        };
        let type = e.type;
        if (type == 'U') {
            data.isRadioUser = true;
        } else if (type == 'O') {
            data.isRadioDept = true;
        }else {

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
        let { name } = data.fieldData;
        
        if(data.search[name] == undefined){
            console.log("1123", data.search[name])
            data.search[name] = [
                newData
            ]
        }else {
            let isBook = data.search[name].some(item=>item.ID==newData.ID);
            if(!isBook){
                data.search[name].push(newData);
            }
        }
        if(!data.isSub){
            data.list[name] = newData.ID;
        }else {
            console.log("sublist", data.subRecordFieldData);
            console.log("dada", data.cellData)
        }
        console.log("search", data.search);
        console.log("list", data.list);
        data.isRadioUser = false;
    };

    const cancelDeptModal = () => {
        data.isRadioDept = false;
    };
    const handleDeptParams = () => {

    };

    const handleSelect = () => {
        
    }

    const isRowShow = (row, key) => {
        let show = true;
        if(row==undefined){
            show = false;
        }
        return show;
    }

    // 添加子表行

    const handleAddSubTable = (col) => {
        console.log("handleAddSubTable", col);
        let row = {
            id: col.subTableData.length + 1
        };
        col.field.selectableColumns.forEach(item=>{
            row[item.key] = "";
        })
        col.subTableData.push(row);
    };

    const handleDelSubTable = (col) => {
        console.log('col.subTableData',col.subTableData, col.selectedList);
        for (let i = col.subTableData.length - 1; i >= 0; i--) {
            if (col.selectedList.indexOf(col.subTableData[i].id) !== -1) {
                col.subTableData.splice(i, 1);
            }
        }
    };

    const handleCopySubTable = (col) => {
        let list = col.subTableData.filter(item=>{
            return col.selectedList.find(row=>{
                return item.id == row;
            })
        })
        const copyData = JSON.parse(JSON.stringify(list));
        copyData.forEach(item=>{
            item.id = item.id+new Date().getTime();
            col.subTableData.push(item);
        })
    }

    const handleSave = () => {
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
    }

    defineExpose({handleSave});

</script>
<style lang="less" scoped>
    .wrap{
        width: 100%;
        /* height: 100vh; */
        /* overflow: auto; */
        background: #f7f7f7;
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
                }
            }
        }
    }
</style>