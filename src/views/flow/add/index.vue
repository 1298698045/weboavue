<template>
    <div class="addWorkWrap">
        <div class="panelRowWrap">
            <div class="panel-item">
                <div class="panel-tabs">
                    <div class="panel-tab" :class="{'active':currentTab==0}" @click="changeTab(0, 'currentTab')">最近使用</div>
                    <div class="panel-tab" :class="{'active':currentTab==1}" @click="changeTab(1, 'currentTab')">我的收藏</div>
                </div>
                <div class="panel-bd">
                    <div class="tabcontainer">
                        <div class="moduleBoxWrap">
                            <div class="moduleBox">
                                <div class="title">
                                    <div class="leftTitle">上级来文办理</div>
                                    <a-tooltip>
                                        <template #title>收藏</template>
                                        <HeartFilled/>
                                    </a-tooltip>
                                </div>
                                <div class="bottomInfo">办公室</div>
                            </div>
                            <div class="moduleBox">
                                <div class="title">
                                    <div class="leftTitle">上级来文办理</div>
                                    <a-tooltip>
                                        <template #title>收藏</template>
                                        <HeartFilled/>
                                    </a-tooltip>
                                </div>
                                <div class="bottomInfo">办公室</div>
                            </div>
                            <div class="moduleBox">
                                <div class="title">
                                    <div class="leftTitle">上级来文办理</div>
                                    <a-tooltip>
                                        <template #title>收藏</template>
                                        <HeartFilled/>
                                    </a-tooltip>
                                </div>
                                <div class="bottomInfo">办公室</div>
                            </div>
                            <div class="moduleBox">
                                <div class="title">
                                    <div class="leftTitle">上级来文办理</div>
                                    <a-tooltip>
                                        <template #title>收藏</template>
                                        <HeartFilled/>
                                    </a-tooltip>
                                </div>
                                <div class="bottomInfo">办公室</div>
                            </div>
                            <div class="moduleBox">
                                <div class="title">
                                    <div class="leftTitle">上级来文办理</div>
                                    <a-tooltip>
                                        <template #title>收藏</template>
                                        <HeartFilled/>
                                    </a-tooltip>
                                </div>
                                <div class="bottomInfo">办公室</div>
                            </div>
                            <div class="moduleBox">
                                <div class="title">
                                    <div class="leftTitle">上级来文办理</div>
                                    <a-tooltip>
                                        <template #title>收藏</template>
                                        <HeartFilled/>
                                    </a-tooltip>
                                </div>
                                <div class="bottomInfo">办公室</div>
                            </div>
                            <div class="fake_item"></div>
                            <div class="fake_item"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="panelRowWrap">
            <div class="panel-item">
                <div class="panel-head">
                    <div class="panel-title">全部流程</div>
                    <div class="panel-head-right">
                        <a-input-search
                            v-model:value="searchVal"
                            placeholder=""
                            @search="onSearch"
                        />
                    </div>
                </div>
                <div class="panel-tabs">
                    <div class="panel-tab" :class="{'active':currentTab2==0}" @click="changeTab(0, 'currentTab2')">全部</div>
                    <div class="panel-tab" :class="{'active':currentTab2==index+1}"  @click="changeTab(index+1, 'currentTab2')" v-for="(item,index) in processLists" :key="index">
                        {{item.name}}
                    </div>
                </div>
                <div class="panel-bd">
                    <div class="tabcontainer">
                        <div class="moduleBoxBd" v-for="(item,index) in processLists" :key="index">
                            <p class="processTypeName">{{item.name}}</p>
                            <div class="moduleBoxWrap">
                                <div class="moduleBox" v-for="(row,idx) in item.Processes" :key="idx" @click="handleStartProcess(row)">
                                    <div class="title">
                                        <div class="leftTitle">{{row.name}}</div>
                                        <a-tooltip>
                                            <template #title>
                                                <span>
                                                    {{row.favoriteState=='0' ? '收藏' : '取消收藏'}}
                                                </span>
                                            </template>
                                            <HeartFilled/>
                                        </a-tooltip>
                                    </div>
                                </div>
                                <div class="fake_item"></div>
                                <div class="fake_item"></div>
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
    import "./add.less";
    import { ref, reactive, onMounted, toRefs, getCurrentInstance, defineEmits, toRaw } from "vue";
    import { HeartFilled } from "@ant-design/icons-vue";
    import Interface from "@/utils/Interface.js";
    const { proxy } = getCurrentInstance();

    const data = reactive({
        searchVal:"",
        currentTab: 0,
        currentTab2: 0,
        processLists: [],
        rowRecord: {}
    })
    const { searchVal, processLists, currentTab, currentTab2, rowRecord } = toRefs(data);
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
        BusinessUnitList: []
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
    }
</script>