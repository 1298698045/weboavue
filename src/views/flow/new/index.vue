<template>
    <div class="todoList">
        <div class="headerBar">
            <div class="headerLeft">
                <div class="icon-circle-base">
                    <img :src="require('@/assets/img/rightMenu/morenliucheng.png')" alt="">
                </div>
                <span class="headerTitle">新建流程</span>
            </div>
        </div>
        <div class="todo-content">
            <div class="newFlowWrap">
                <div class="webTabs">
                    <a-tabs v-model:activeKey="activeKey">
                        <a-tab-pane :key="1" tab="全部流程"></a-tab-pane>
                        <a-tab-pane :key="2" tab="我的收藏"></a-tab-pane>
                        <a-tab-pane :key="3" tab="最近使用"></a-tab-pane>
                    </a-tabs>
                    <a-input-search
                        v-model:value="searchVal"
                        placeholder="搜索流程"
                        style="width: 200px"
                        @search="onSearch"
                    />
                </div>
                <div class="flowContainer">
                    <div class="flowTypes">
                        <div class="flowTypeItem" :class="{'active':typeIndex===''}"  @click="handleTabTypes({}, '')">
                            全部
                        </div>
                        <a class="flowTypeItem" :class="{'active':typeIndex===index}" v-for="(item, index) in processLists" :key="index" @click="handleTabTypes(item, index)">
                            {{ item.name }}
                        </a>
                    </div>
                    <div class="flowContent">
                        <div class="flowPanelItem" :id="item.folderId" v-for="(item, index) in processLists" :key="index" :style="{'borderColor':colors[index%5]}">
                            <div class="flowPanelItemHead">
                                <div class="typeName">{{ item.name }}</div>
                            </div>
                            <div class="flowPanelItemBd">
                                <div class="flowRowItem" v-for="(row, idx) in item.Processes" :key="idx" @click="handleStartProcess(row)">
                                    <div class="flowName rowEllipsis">{{row.name}}</div>
                                    <div class="collectionIcon" :class="{'active':row.favoriteState=='1'}" @click.stop>
                                        <a-tooltip>
                                            <template #title>{{ row.favoriteState=='1'?'取消收藏':'收藏' }}</template>
                                            <i class="iconfont icon-quxiaoshoucang" v-if="row.favoriteState=='1'"></i>
                                            <i class="iconfont icon-tianjiashoucang" v-else></i>
                                        </a-tooltip>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="modal">
        <a-modal v-model:open="isModal" width="550px" :maskClosable="false" @cancel="handleCancel" @ok="handleOk">
            <template #title>
                <div>
                    新建流程事务
                 </div>
            </template>
            <div class="modalContainer">
                <div class="modalCenter">
                    <a-form
                        ref="formRef"
                        :label-col="labelCol"
                        :model="formState">
                        <div class="form-tip">请输入流程事务标题，建立事务</div>
                        <a-form-item label="流程：" name="ProcessName">
                            <div class="ProcessName">{{ formState.ProcessName || '' }}</div>
                        </a-form-item>
                        <a-form-item name="BusinessUnitId" label="发起部门：" :rules="[{ required: true, message: '请选择发起部门' }]">
                            <a-select v-model:value="formState.BusinessUnitId">
                                <a-select-option v-for="(item,index) in formState.BusinessUnitList" :key="index" :value="item.id">{{item.name}}</a-select-option>
                            </a-select>
                        </a-form-item>
                        <a-form-item class="processTitle" label="标题：" name="Title"  :rules="[{ required: true, message: '标题不能为空' }]">
                            <a-input v-model:value="formState.Title" />
                            <div class="form-tip1">默认标题是 流程名称 部门名称，为了查询方便，请输入流程真实标题。</div>
                            <div class="form-tip1">如收文 关于XX来文 XX科室 XX人。</div>
                        </a-form-item>
                        <a-form-item name="Priority" label="紧急程度：">
                            <a-select v-model:value="formState.Priority">
                                <a-select-option value="0">普通</a-select-option>
                                <a-select-option value="1">紧急</a-select-option>
                                <a-select-option value="2">加急</a-select-option>
                            </a-select>
                        </a-form-item>
                        <a-form-item label="备注：" name="Description">
                            <a-textarea :rows="3" v-model:value="formState.Description" />
                        </a-form-item>
                    </a-form>
                </div>
            </div>
            <template #footer>
                <div>
                    <a-button type="primary" @click.prevent="handleSubmit">确定</a-button>
                    <a-button @click="handleCancel">取消</a-button>
                </div>
            </template>
        </a-modal>
    </div>
</template>
<script setup>
    import "@/style/flow/icon/iconfont.css";
    import { ref, reactive, onMounted, toRefs, getCurrentInstance, defineEmits, toRaw } from "vue";
    import { HeartFilled } from "@ant-design/icons-vue";
    import Interface from "@/utils/Interface.js";
    const { proxy } = getCurrentInstance();

    const data = reactive({
        searchVal:"",
        currentTab: 0,
        currentTab2: 0,
        processLists: [],
        rowRecord: {},
        activeKey: 1,
        typeIndex: "",
        colors:['#55d2d4','rgb(55, 178, 255)','rgb(255, 94, 86)','rgb(179, 123, 250)','rgb(55, 178, 255)',]
    })
    const { colors,searchVal, processLists, currentTab, currentTab2, rowRecord, activeKey, typeIndex } = toRefs(data);
    const getProcessList = () =>{
        proxy.$get(Interface.workflow.processList,{}).then(res=>{
            console.log("res",res);
            data.processLists = res.processLists;
        })
    }
    getProcessList();

    const changeTab = (index,currentName) =>{
        data[currentName] = index;
    }
    const onSearch = (e) => {
        console.log('e',e)
    }
    // 弹窗
    const isModal = ref(false);
    const labelCol = ref({ style: { width: '100px' } });
    const formState = reactive({
        ProcessName:"",
        BusinessUnitId:"",
        Title:"",
        Priority:"0",
        Description:"",
        BusinessUnitList: [],
    })
    const handleStartProcess = (row)=> {
        formState.ProcessName = row.name;
        data.rowRecord = row;
        getUserInfo();
        getDeptList();
        isModal.value = true;
    }
    const handleOk = () => {
        isModal.value = false;
    }
    const handleCancel = () => {
        isModal.value = false;
    }
    const formRef = ref();
    const handleSubmit = () => {
        formRef.value.validate().then(() => {
            console.log('values', formState, toRaw(formState));
            handleCancel();
        }).catch(err => {
            console.log('error', err);
        });
    }

    const getUserInfo = async () => {
        await proxy.$get(Interface.userInfo,{}).then(res=>{
            
        })
    }
    // 获取部门
    const getDeptList = () => {
        proxy.$get(Interface.businessunitList,{}).then(res=>{
            formState.BusinessUnitList = res.businessUnits;
            formState.Title = data.rowRecord.name + ' ' + res.businessUnits[0].name;
            formState.BusinessUnitId =  res.businessUnits[0].id;
        })
    };
    const scrollToAnchor = (event, item) => {
        event.preventDefault();
        const anchorElement = document.getElementById(item.AppId);
        if (anchorElement) {
            anchorElement.scrollIntoView({ behavior: 'smooth' });
        }
    };
    const handleTabTypes = (item, index) => {
        data.typeIndex = index;
    };
</script>
<style lang="less" scoped>
    @import "@/style/flow/treeList.less";
    .newFlowWrap{
        height: 100%;
        .webTabs{
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid #eaeaea;
            padding-right: 10px;
            :deep .ant-tabs-nav::before{
                border-bottom: none !important;
            }
        }
        .flowContainer{
            padding: 20px;
            height: calc(~"100% - 44px");
            overflow-y: auto;
            .flowTypes{
                display: flex;
                flex-wrap: wrap;
                .flowTypeItem{
                    padding: 5px 10px;
                    background: #f5f5f5;
                    border-radius: 1px;
                    margin-right: 2px;
                    cursor: pointer;
                    font-weight: bold;
                    margin-bottom: 2px;
                    color: #333;
                    &:hover,&.active{
                        background: #108ee9;
                        color: #fff;
                    }
                }
            }
            .flowContent{
                margin-top: 20px;
                .flowPanelItem{
                    padding: 0 20px;
                    //border: 1px solid #f5f5f5;
                    height: auto !important;
                    padding-bottom: 10px;
                    margin-bottom: 20px;
                    border-top: 4px solid #55d2d4;
                    .flowPanelItemHead{
                        padding: 10px 0;
                        .typeName{
                            color: #55d2d4;
                            font-weight: bold;
                        }
                    }
                    .flowPanelItemBd{
                        display: flex;
                        flex-wrap: wrap;
                        .flowRowItem{
                            width: calc(~"20% - 10px");
	                        height: 58px;
                            background: #f5f5f5;
                            margin-bottom: 10px;
                            cursor: pointer;
                            padding: 16px 24px 16px 10px;
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            margin-right: 10px;
                            &:hover{
                                box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.2);
                                .collectionIcon{
                                    visibility: visible;
                                }
                            }
                            .flowName{
                                color: #1d2129;
                                font-weight: bold;
                                flex: 1;
                            }
                            .collectionIcon{
                                visibility: hidden;
                                &.active{
                                    visibility: visible;
                                    color:#f7ba1e;
                                }
                                .icon-tianjiashoucang{
                                    opacity: .6;
                                    &:hover{
                                        opacity: 1;
                                    }
                                }
                            }
                        }
                        .flowRowItem:nth-child(5n){
                            margin-right: 0 !important;
                        }
                    }
                }
            }
        }
        .flowContainer .flowContent .flowPanelItem .flowPanelItemBd .flowRowItem{
            width: calc(~'100% - 10px');
            height: 38px !important;
        }
        .flowContainer .flowContent .flowPanelItem{
            width: 23.5%;
            margin: 0 9px;
            height: auto;
            background: #f5f5f5;
            height: 100%;
        }
        .flowContainer .flowContent{
            flex-wrap: wrap;
            display: flex;
            justify-content: space-between;
            align-content: flex-start;
        }
    }
</style>