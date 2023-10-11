<template>
    <div class="filterContainer">
        <div class="panelFilter">
            <div class="panelHeader">
                <h2 class="panelTitle">筛选器</h2>
                <a-button type="link" @click="handleCloseModal"><CloseOutlined style="color:rgb(116, 116, 116)" /></a-button>
            </div>
            <div class="panelBody" ref="panelBdRef">
                <div class="bodyTitle">匹配所有这些筛选器</div>
                <ul>
                    <li v-for="(item,index) in filterList" :ref="(el) => setItemRefs(el, item, index)" :key="index" @click="handleItemOpenFilter(item,index,$event)">
                        <div class="filterItemBox">
                            <div class="trigger">
                                <div class="fieldLabel">{{item.field==""?"新建筛选器":item.field}}</div>
                                <div class="operatorAndOperand">
                                    <span class="test-operatorWrapper">{{item.operator}}</span>
                                    &nbsp;
                                    <span class="test-operandsWrapper">{{item.val}}</span>
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
                <div class="pointer"></div>
                <div class="filterForm">
                    <a-form :model="formState" ref="formRef" :label-col="labelCol">
                        <a-form-item name="field" label="字段">
                            <a-select v-model:value="formState.field" placeholder="请选择字段" @change="changeAttribute">
                                <a-select-option v-for="(item,index) in attributes" :key="item.name" :value="item.name">{{item.label}}</a-select-option>
                            </a-select>
                        </a-form-item>
                        <a-form-item name="operator" label="运算符">
                            <a-select v-model:value="formState.operator" placeholder="请选择运算符">
                                <a-select-option v-for="(item,index) in operatorList" :key="item.operator" :value="item.operator">{{item.label}}</a-select-option>
                            </a-select>
                        </a-form-item>
                        <a-form-item name="val" label="值">
                            <a-date-picker valueFormat="YYYY-MM-DD" v-if="dType=='F'" v-model:value="formState.val" />
                            <a-input v-else="dType=='S'" v-model:value="formState.val" />
                        </a-form-item>
                        <a-form-item style="text-align: right;">
                            <a-button type="primary" @click="handleComplete">完成</a-button>
                        </a-form-item>
                    </a-form>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
    import { ref, watch, reactive, toRefs, onMounted, getCurrentInstance, onUpdated, h, nextTick, defineProps, defineEmits, defineExpose } from "vue";
    import { CloseOutlined } from "@ant-design/icons-vue";
    import Interface from "@/utils/Interface.js";
    const { proxy } = getCurrentInstance();
    const labelCol = ref({ style: { width: '60px' } });
    const formState = reactive({
        field: "",
        operator: "",
        val: ""
    })
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
        isFormModal: false
    })
    const panelBdRef = ref();
    const formRef = ref();
    let itemRefs = [];
    const { filterList, attributes, operatorList, dType, currentTop, isFormModal } = toRefs(data);

    // 添加筛选器
    const handleAddFilter = () => {
        itemRefs = [];
        data.filterList.length < 10 && data.filterList.push({
            field: "",
            operator: "",
            val: ""
        });
        // console.log("current",data.current);
        data.current++;
        var index = data.current;
        setFormStyle(index);
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
        proxy.$get(Interface.entityFilter,{}).then(res=>{
            data.attributes = res.entity.attributes;
        })
    }
    getField();
    const changeAttribute = (e) =>{
        formState.operator = "";
        formState.val = "";
        var row = data.attributes.find(item=>item.name==e);
        data.operatorList = row.operator;
        data.dType = row.type;
    }


    const handleComplete = () => {
        // console.log("formState",formState);
        const copyObj = JSON.parse(JSON.stringify(formState));
        data.filterList[data.current] = copyObj;
        resetForm();
        data.isFormModal = false;
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
        data.current = index;
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
   const emit = defineEmits(['close']);
    // 关闭弹窗
    const handleCloseModal = () =>{
        emit("close",false);
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
                            .fieldLabel{
                                font-size: 12px;
                                color: #444444;
                                line-height: 1.5;
                            }
                            .operatorAndOperand{
                                color: #181818;
                                font-size: 14px;
                                line-height: 1.5;
                            }
                        }
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
            .pointer{
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
        }
    }
</style>