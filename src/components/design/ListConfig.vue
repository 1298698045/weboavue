<template>
    <div class="configWrap">
        <a-form>
            <a-form-item label="详情链接" class="formItem">
                <a-input v-model:value="item.detailUrl"></a-input>
            </a-form-item>
            <a-form-item label="更多链接" class="formItem">
                <a-input v-model:value="item.moreLinkURL"></a-input>
            </a-form-item>
            <a-form-item label="选择对象">
                <a-select v-model:value="item.entityId" style="width: 200px;">
                    <a-select-option v-for="(row,idx) in objectCodeList" :key="idx" :value="row.ID">{{row.Name}}</a-select-option>
                </a-select>
            </a-form-item>
            <div class="filterWrap">
                <p class="label">查询条件</p>
                <div class="filterList">
                    <div class="fileterRow" v-for="(filter,filterIdx) in filterList" :key="filterIdx">
                        <a-form>
                            <a-form-item class="formItem" label="逻辑运算符">
                                <a-select v-model:value="filter.logical" placeholder="请选择逻辑运算符">
                                    <a-select-option value="AND">与</a-select-option>
                                    <a-select-option value="OR">或</a-select-option>
                                </a-select>
                            </a-form-item>
                            <a-form-item class="formItem" label="字段">
                                <a-select v-model:value="filter.field" placeholder="请选择字段" @change="(e)=>changeField(e, filter, item)">
                                    <a-select-option  v-for="(field,fieldIdx) in attributes" :value="field.fieldName">{{field.label}}</a-select-option>
                                </a-select>
                            </a-form-item>
                            <a-form-item class="formItem" label="运算符">
                                <a-select v-model:value="filter.operator" placeholder="请选择运算符">
                                    <a-select-option v-for="(row,rowIdx) in filter.operatorList" :value="row.operator">{{row.label}}</a-select-option>
                                </a-select>
                            </a-form-item>
                            <a-form-item class="formItem" label="值">
                                <div v-if="filter.dType=='DateTime'">
                                    <a-date-picker v-model:value="filter.value" />
                                </div>
                                <div v-else-if="filter.dType=='Numeric'">
                                    <a-input type="Number" v-model:value="filter.value"></a-input>
                                </div>
                                <div v-else-if="filter.dType=='Picklist'||filter.dType=='L'">
                                    <a-select mode="multiple" v-model:value="filter.value" placeholder="请选择">
                                        <a-select-option v-for="v in filter.options" :key="v.value" :value="v.value">
                                            {{v.label}}
                                        </a-select-option>
                                    </a-select>
                                </div>
                                <div v-else-if="filter.dType=='BusinessUnit'" style="position: relative;">
                                    <a-select allowClear v-model:value="filter.value" placeholder="请选择"
                                            :default-active-first-option="false" :filter-option="false" showSearch
                                            @search="e=>searchlookup(filter, e)"
                                            @dropdownVisibleChange="e=>searchlookup(filter, '')">
                                            <template #suffixIcon></template>
                                            <a-select-option v-for="v in filter.options" :key="v.ID" :value="v.ID">{{ v.Name }}</a-select-option>
                                    </a-select>
                                    <i class="iconfont icon-sousuo pointer" @click="handleOpenLook(filter, filterIdx)"></i>
                                </div>
                                <div v-else>
                                    <a-input v-model:value="filter.value"></a-input>
                                </div>
                            </a-form-item>
                        </a-form>
                    </div>
                </div>
                <div>
                    <a-button :icon="h(PlusOutlined)" @click="handleAddFilter"></a-button>
                </div>
            </div>
            <a-form-item label="是否显示列头">
                <a-checkbox v-model:checkbox="item.showHeader"></a-checkbox>
            </a-form-item>
            <a-form-item label="显示列" class="formItem">
                <div class="showList">          
                    <div class="dragList">
                        <draggable
                            class="list-group"
                            :list="item.listColumns"
                            group="list"
                            itemKey="list"
                        >
                            <template #item="{ element, index }">
                                <div class="dragListItem">
                                    <svg width="24" height="24" viewBox="0 0 24 24" role="presentation"><g fill="currentColor" fill-rule="evenodd"><circle cx="10" cy="8" r="1"></circle> <circle cx="14" cy="8" r="1"></circle> <circle cx="10" cy="16" r="1"></circle> <circle cx="14" cy="16" r="1"></circle> <circle cx="10" cy="12" r="1"></circle> <circle cx="14" cy="12" r="1"></circle></g></svg>
                                    <span class="field">
                                        {{element.field}}
                                    </span>
                                    <span class="delIcon"><i class="iconfont icon-yishanchu"></i></span>
                                </div>
                            </template>
                        </draggable>
                    </div>
                </div>
            </a-form-item>
            <div class="rowAddShowList">
                <a-popover trigger="click" placement="right">
                    <template #content>
                        <a-select style="width: 200px;margin-right: 10px;">
                            <a-select-option v-for="(row,idx) in attributes" :key="idx" :value="row.attributeId">{{row.label}}</a-select-option>
                          </a-select>
                        <a-button type="primary">确认添加</a-button>
                    </template>
                    <a-button type="link">添加显示列</a-button>
                </a-popover>
            </div>
            <div class="sortBox">
                <div class="formRow" v-for="(sortItem,sortIdx) in item.orderExpression2" :key="sortIdx">
                    <a-form-item label="排序字段" class="formItem">
                        <a-select v-model:value="sortItem.attributeName" style="width: 200px;margin-right: 10px;">
                            <a-select-option value="beijing">Zone two</a-select-option>
                          </a-select>
                    </a-form-item>
                    <a-form-item label="排序方式" class="formItem">
                        <a-select v-model:value="sortItem.sort" style="width: 200px;margin-right: 10px;">
                            <a-select-option value="ASC">升序</a-select-option>
                            <a-select-option value="DESC">降序</a-select-option>
                          </a-select>
                    </a-form-item>
                </div>
                <div>
                    <a-button type="link" @click="handleAddItemSort">添加排序</a-button>
                </div>
            </div>
            <div class="footBtns">
                <a-button @click="saveConfig">保存</a-button>
                <a-button class="ml10" type="primary" @click="cancel">取消</a-button>
            </div>
        </a-form>
        <radio-dept v-if="isRadioDept" :isShow="isRadioDept" @cancel="cancelDeptModal" @selectVal="handleDeptParams" />
    </div>
</template>
<script setup>
    import "@/style/common.less";
    import "@/style/icon/iconfont.css";
    import {
        EllipsisOutlined, PlusOutlined
    } from "@ant-design/icons-vue";
    import { message } from "ant-design-vue";
    import {
        ref,
        watch,
        reactive,
        toRefs,
        onMounted,
        getCurrentInstance,
        onUpdated,
        h,
        nextTick,
        defineProps,
        defineExpose,
        defineEmits,
    } from "vue";
    import dayjs from 'dayjs';
    import 'dayjs/locale/zh-cn';
    import locale from 'ant-design-vue/es/date-picker/locale/zh_CN';
    dayjs.locale('zh-cn');
    import calendar from 'dayjs/plugin/calendar';
    import weekday from 'dayjs/plugin/weekday';
    import localeData from 'dayjs/plugin/localeData';

    dayjs.extend(calendar);
    dayjs.extend(weekday);
    dayjs.extend(localeData);

    import draggable from 'vuedraggable';

    import RadioDept from "@/components/commonModal/RadioDept.vue";
    import RadioUser from "@/components/commonModal/RadioUser.vue";

    import Interface from "@/utils/Interface.js";
    const { proxy } = getCurrentInstance();
    const props = defineProps({
        item: Object
    })
    
    const data = reactive({
        attributes: [],
        objectCodeList: [],
        filterExpression: [],
        jsonFilter: [],
        filterList: [],
        isRadioDept: false,
        filterIdx: '', // 记录筛选器下标
    });
    const { attributes, objectCodeList, filterExpression, jsonFilter, filterList, isRadioDept, filterIdx } = toRefs(data);
    
    console.log(props);
    const getFilterList = () => {
        let self = props.item;
        if(self.config && self.config.filterExpression){
            var filterExpression = JSON.parse(self.config.filterExpression);
            console.log("filterExpression", filterExpression);
            if(filterExpression && self.componentType!='tablist'){
                data.filterList = [];
                filterExpression.forEach(function(v){
                    var operatorList = getOperator(v.attribute,self);
                    var dType = getDType(v.attribute, self);
                    var operatorType = getOperatorType(v.operator, operatorList, self);
                    var Lktp = getLktp(v.attribute, self);
                    var options = [];
                    if(Lktp=='' && dType=='BusinessUnit'){
                        Lktp = 10;
                    }
                    if(Lktp && dType == 'BusinessUnit' || dType=='User' || dType == 'MasterDetail'){
                        var response = getEntityLookup(Lktp, '')
                        if(response){
                            options = response.listData;
                        }
                    }
                    if(dType=='Picklist'|| dType == 'L'){
                        options = getFilterValues(v.attribute, self)
                    }
                    if(dType=='Picklist' || dType == 'L' || dType == 'BusinessUnit' || dType == 'User' || dType == 'MasterDetail'){

                    }else {
                        if(v.operands && v.operands.length>0){
                            v.operands = v.operands[0];
                        }
                    }
                    data.filterList.push({
                        operator: v.operator, 
                        field: v.attribute,
                        logical: v.logical, 
                        operatorList: operatorList,
                        operatorType: operatorType,
                        dType: dType,
                        value: v.operands || v.value,
                        label: v.label,
                        Lktp: Lktp,
                        options: options,
                        deptText: ''
                    })
                })
            }
            console.log("data.filterList", data.filterList)
        }
    }
    
    const getOperator = (field,item) => {
        console.log(field,item,'123123');
        var row = data.attributes.find(function (v) {
            return v.fieldName == field;
        });
        return row && row.operator || '';
    }
    const getDType = (field,item) => {
        var row = data.attributes.find(function (v) {
            return v.fieldName == field;
        });
        return row &&  row.dType || '';
    }
    const getOperatorType = (operator,list) => {
        if(list){
            var row = list.find(function (v) {
                return v.operator == operator;
            });
            return row.operatorType;
        }else {
            return '';
        }
    }
    const getLktp = (field,item)=> {
        var row = data.attributes.find(function (v) {
            return v.fieldName == field;
        });
        return row &&  row.referencedEntityObjectTypeCode || '';
    }
    const getEntityLookup = async (Lktp, lksrch) => {
        var response;
        var d = {
            Lktp: Lktp,
            lksrch: lksrch
        }
        await proxy.$get(Interface.design.look,{}).then(res=>{
            response = res;
        })
        return response;
    }
    const getFilterValues = (field,item) => {
        var row = data.attributes.find(function (v) {
            return v.fieldName == field;
        });
        return row &&  row.filterValues || [];
    }

    const changeField = (e, item, parentItem) => {
        var row = data.attributes.find(function (v) {
            return v.fieldName == e;
        });
        item.field = e;
        item.dType = row.dType;
        item.operatorList = row.operator;
        item.label = row.label;
        item.Lktp = row.referencedEntityObjectTypeCode;
        item.options = row.filterValues;
        item.condition = '';
        item.value = '';
    }
    
    const getConfig = () => {
        proxy.$get(Interface.design.attrs,{
            objTypeCode: props.item.config.templateObjectTypeCode
        }).then(res=>{
            data.attributes = res.attributes;
            getFilterList();
        });
    }
    getConfig();
    const getLook = () => {
        proxy.$get(Interface.design.look,{
            Lktp: 100000
        }).then(res=>{
            data.objectCodeList = res.listData;
            data.objectCodeList.push({
                ID: props.item.config.templateId,
                Name: props.item.config.templateTitle
            })
            props.item.entityId = props.item.config.templateId;
        })
    }
    getLook();
    // 添加排序
    const handleAddItemSort = () => {
        props.item.orderExpression2.push({
            attributeName: "",
            SortDir: "",
            sort: ""
        })
    }
    // 查询条件-搜索
    const searchlookup = (filter,searchVal) => {
        console.log("filter", filter);
        var res = getEntityLookup(filter.Lktp || 10, searchVal);
        res.then(response=>{
            filter.options = response.listData;
        })
    }
    const handleOpenLook = (filter, filterIdx) => {
        data.filterIdx = filterIdx;
        if(filter.Lktp == 8){

        }else {
            data.isRadioDept = true;
        }
    }
    // 关闭单选部门弹窗
    const cancelDeptModal = (e) => {
        data.isRadioDept = e;
    }
    const handleDeptParams = (params) => {
        console.log("params", params);
        let index = data.filterList[data.filterIdx].options.findIndex(item=>params.ID==item.ID);
        if(index==-1){
            data.filterList[data.filterIdx].options.push(params);
        }
        data.filterList[data.filterIdx].value = params.ID;
        data.isRadioDept = false;
    }
    // 添加查询条件
    const handleAddFilter = () => {
        var obj = Object.assign({}, data.filterList[0]);
        Object.keys(obj).forEach(function (key) {
            obj[key] = '';
        });
        data.filterList.push(obj);
    }
    const cancel = () => {
        props.item.isConfig = false;
    }
    // 保存
    const saveConfig = () => {

    }
</script>
<style lang="less" scoped>
    .showList{
        margin-top: 20px;
        width: 249px;
        border-bottom: 1px solid #dfe1e6;
        .dragListItem {
            line-height: 48px;
            height: 48px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            padding: 0 10px;
            box-sizing: border-box;
            display: flex;
            align-items: center;
            justify-content: space-between;
            &:hover{
                background: #f2f3f5;
            }
            svg{
                color: #97A0AF;
                padding-right: 5px;
            }
            .field{
                flex: 1;
            }
            .delIcon{
                cursor: pointer;
            }
        }
    }
    .formItem{
        margin-bottom: 10px;
        :deep .ant-row{
            display: block !important;
        }
    }
    .formRow{
        display: flex;
        .formItem{
            flex: 1;
        }
    }
    
    .filterWrap{
        .ant-form{
            display: flex;
            .formItem{
                flex: 1;
                margin-right: 5px;
            }
            .formItem:last-child{
                margin-right: 0;
            }
        }
    }
    .icon-sousuo{
        position: absolute;
        top: 3px;
        right: 10px;
        cursor: pointer;
    }
</style>