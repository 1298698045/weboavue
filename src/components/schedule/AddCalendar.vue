<template>
    <div>
        <a-modal v-model:open="props.isShow" width="800px" :style="setTop" :maskClosable="false" @cancel="handleCancel"
            @ok="handleSubmit">
            <template #title>
                <div>
                    {{ title }}
                </div>
            </template>
            <div class="modalContainer" ref="modelContentRef">
                <div class="modalCenter" :style="{ 'min-height':height + 'px!important','height':'auto !important' }">
                    <a-form :model="formState" ref="formRef">
                        <div class="section">
                            <div class="sectionRow">
                                <div class="sectionItem">
                                    <a-form-item label="">
                                        <div>选择日历类型</div>
                                        <div class="menuRow">
                                            <a-dropdown>
                                                <template #overlay>
                                                    <a-menu @click="handleMenu">
                                                        <a-menu-item v-for="(item,index) in menus" :key="item.key" :num="index">
                                                            <!-- <UserOutlined v-if="item.name=='人员'" /> -->
                                                             <div class="sectionItemImg" v-if="item.name=='人员'"><img src="data:image/png;base64,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" alt="" data-v-bf3d5b96=""></div>
                                                            <!-- <CalendarOutlined v-if="item.name=='公共日历和资源'" /> -->
                                                             <div class="sectionItemImg sectionItemImg2" v-if="item.name=='公共日历和资源'"><svg fill="#fff" focusable="false" aria-hidden="true" viewBox="0 0 100 100" part="icon" lwc-5eng04crq1j="" data-key="event" class="slds-icon"><g lwc-5eng04crq1j=""><path d="M76 42H24a2 2 0 00-2 2v30a6 6 0 006 6h44a6 6 0 006-6V44a2 2 0 00-2-2zM40 70a2 2 0 01-2 2h-4a2 2 0 01-2-2v-4c0-1.1.9-2 2-2h4a2 2 0 012 2zm0-14a2 2 0 01-2 2h-4a2 2 0 01-2-2v-4c0-1.1.9-2 2-2h4a2 2 0 012 2zm14 14a2 2 0 01-2 2h-4a2 2 0 01-2-2v-4c0-1.1.9-2 2-2h4a2 2 0 012 2zm0-14a2 2 0 01-2 2h-4a2 2 0 01-2-2v-4c0-1.1.9-2 2-2h4a2 2 0 012 2zm14 14a2 2 0 01-2 2h-4a2 2 0 01-2-2v-4c0-1.1.9-2 2-2h4a2 2 0 012 2zm0-14a2 2 0 01-2 2h-4a2 2 0 01-2-2v-4c0-1.1.9-2 2-2h4a2 2 0 012 2zm4-30h-5v-2c0-2.2-1.8-4-4-4s-4 1.8-4 4v2H41v-2c0-2.2-1.8-4-4-4s-4 1.8-4 4v2h-5a6 6 0 00-6 6v2c0 1.1.9 2 2 2h52a2 2 0 002-2v-2a6 6 0 00-6-6z" lwc-5eng04crq1j=""></path></g></svg></div>
                                                            {{item.name}}
                                                        </a-menu-item>
                                                    </a-menu>
                                                </template>
                                                <a-button>
                                                    <!-- <UserOutlined v-if="currentMenu=='人员'" />-->
                                                    <div class="sectionItemImg" v-if="currentMenu=='人员'"><img src="data:image/png;base64,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" alt="" data-v-bf3d5b96=""></div>
                                                    <!-- <CalendarOutlined v-if="currentMenu=='公共日历和资源'" /> -->
                                                     <div class="sectionItemImg sectionItemImg2" v-if="currentMenu=='公共日历和资源'"><svg fill="#fff" focusable="false" aria-hidden="true" viewBox="0 0 100 100" part="icon" lwc-5eng04crq1j="" data-key="event" class="slds-icon"><g lwc-5eng04crq1j=""><path d="M76 42H24a2 2 0 00-2 2v30a6 6 0 006 6h44a6 6 0 006-6V44a2 2 0 00-2-2zM40 70a2 2 0 01-2 2h-4a2 2 0 01-2-2v-4c0-1.1.9-2 2-2h4a2 2 0 012 2zm0-14a2 2 0 01-2 2h-4a2 2 0 01-2-2v-4c0-1.1.9-2 2-2h4a2 2 0 012 2zm14 14a2 2 0 01-2 2h-4a2 2 0 01-2-2v-4c0-1.1.9-2 2-2h4a2 2 0 012 2zm0-14a2 2 0 01-2 2h-4a2 2 0 01-2-2v-4c0-1.1.9-2 2-2h4a2 2 0 012 2zm14 14a2 2 0 01-2 2h-4a2 2 0 01-2-2v-4c0-1.1.9-2 2-2h4a2 2 0 012 2zm0-14a2 2 0 01-2 2h-4a2 2 0 01-2-2v-4c0-1.1.9-2 2-2h4a2 2 0 012 2zm4-30h-5v-2c0-2.2-1.8-4-4-4s-4 1.8-4 4v2H41v-2c0-2.2-1.8-4-4-4s-4 1.8-4 4v2h-5a6 6 0 00-6 6v2c0 1.1.9 2 2 2h52a2 2 0 002-2v-2a6 6 0 00-6-6z" lwc-5eng04crq1j=""></path></g></svg></div>
                                                    <!-- <DownOutlined />-->
                                                    <div class="IconWrapContent" hight="15" data-v-69a58868="" data-v-8def4144=""><span class="svgicon" data-v-69a58868=""><svg width="15" height="20" viewBox="0 0 520 520" fill="none" role="presentation" data-v-69a58868=""><path d="M83 140h354c10 0 17 13 9 22L273 374c-6 8-19 8-25 0L73 162c-7-9-1-22 10-22z" fill="#747474" data-v-69a58868=""></path></svg></span></div>
                                                </a-button>
                                            </a-dropdown>
                                            <a-select class="aselect" v-model:value="users" show-search :showArrow="true" @focus="sectionItemBottomShow=true" @blur="sectionItemBottomShow=false"
                                                mode="multiple" :placeholder="'搜索 '+currentMenu"
                                                :default-active-first-option="false" :filter-option="false"
                                                :not-found-content="null" @search="handleSearch" @change="handleChange"
                                                @dropdownVisibleChange="getPeople">
                                                <template #suffixIcon>
                                                    <SearchOutlined class="ant-select-suffix" />
                                                </template>
                                                <a-select-option :value="item.ID" v-for="(item,index) in peoples" :key="index">
                                                    <div class="sectionItemImg sectionItemImgSmall"><img src="data:image/png;base64,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" alt="" data-v-bf3d5b96=""></div>
                                                    {{item.Name}}
                                                </a-select-option>
                                            </a-select>
                                        </div>
                                        <div class="sectionItemBottom" :style="{'visibility':sectionItemBottomShow?'unset':'hidden'}">
                                            <svg focusable="false" aria-hidden="true" viewBox="0 0 52 52" part="icon" lwc-3vrq8qge44v="" data-key="info_alt" class="slds-icon slds-icon-text-default slds-icon_xx-small"><g lwc-3vrq8qge44v=""><path d="M26 2a24 24 0 100 48 24 24 0 100-48zm0 42C16 44 8 36 8 26S16 8 26 8s18 8 18 18-8 18-18 18zm0-29.9c1.7 0 3 1.3 3 3s-1.3 3-3 3-3-1.3-3-3 1.3-3 3-3zm5 21c0 .5-.4.9-1 .9h-8c-.5 0-1-.3-1-.9v-2c0-.5.4-1.1 1-1.1.5 0 1-.3 1-.9v-4c0-.5-.4-1.1-1-1.1-.5 0-1-.3-1-.9v-2c0-.5.4-1.1 1-1.1h6c.5 0 1 .5 1 1.1v8c0 .5.4.9 1 .9.5 0 1 .5 1 1.1z" lwc-3vrq8qge44v=""></path></g></svg>
                                            <span>要移除选定记录，按退格键或删除键。</span>
                                        </div>
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
            <a-button type="primary" @click.prevent="handleAddPrem">添加</a-button>
          </div>
            </template>
        </a-modal>
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
        computed
    } from "vue";
    import {
        SearchOutlined,
        DownOutlined,
        UserOutlined,
        CalendarOutlined,
        ApartmentOutlined,
        UserSwitchOutlined,
        CloseOutlined
    } from "@ant-design/icons-vue";
    import { message } from "ant-design-vue";

    import Interface from "@/utils/Interface.js";
    import { girdFormatterValue } from "@/utils/common.js";
    const { proxy } = getCurrentInstance();
    //console.log(document.documentElement.clientHeight);
    const labelCol = ref({ style: { width: "100px" } });
    const props = defineProps({
        isShow: Boolean,
        id: String
    });
    const formRef = ref();
    const emit = defineEmits(["cancel"]);
    const handleCancel = () => {
        emit("cancel", false);
    };
    const data = reactive({
        title: "添加日历",
        height: 100,
        menus: [
            {
                key: 1,
                name: "人员"
            },
            {
                key: 2,
                name: "公共日历和资源"
            },
        ],
        currentMenu: "人员",
        listData: [],
        rightCode: '2',
        users: [],
        peoples: [],
        userInfoId:'',
        sectionItemBottomShow:false
    });
    const {
        title,
        height,
        menus,
        currentMenu,
        listData,
        rightCode,
        users,
        peoples,
        userInfoId,
        sectionItemBottomShow
    } = toRefs(data);
    const formState = reactive({
        name: "",
    });
    const modelContentRef = ref(null);
    onMounted(() => {
        window.addEventListener("resize", (e) => {
            //data.height = document.documentElement.clientHeight - 300;
        });
        let h = modelContentRef.value.clientHeight;
        data.top = (h + 126) / 2 + 'px';
        let userInfo=window.localStorage.getItem('userInfo');
        if(userInfo){
            userInfo=JSON.parse(userInfo);
            data.userInfoId=userInfo.userId;
            if(data.userInfoId=='jackliu'){
                data.userInfoId='2ec00cf2-a484-4136-8fef-e2a2719c5ed6';
            }
        }
        getAccess();
    });
    const setTop = computed(() => ({
        top: `calc(50% - ${data.top})`
    }));
    // 添加权限
    const handleAddPrem = () => {
        // console.log("data",data.users, data.rightCode);
        // var objecsts = "";
        // proxy.$get(Interface.schedule.addAccess,{
        //     objecsts: data.users.join(","),
        //     rightCode: data.rightCode
        // }).then(res=>{
        //     message.success("添加成功！");
        //     getAccess();
        // })
        return
        let ObjectType='';
        if(data.currentMenu=='人员'){
            ObjectType='8';
        }else if(data.currentMenu=='公共日历和资源'){
            ObjectType='4003';
        }
        if(data.users&&data.users.length){
            let ObjectName=[];
            data.peoples.map((item) => {
                for(var i=0;i<data.users.length;i++){
                    if(data.users[i]&&item.ID&&data.users[i]==item.ID&&item.Name&&item.Name!='undefined'){
                        ObjectName.push(item.Name)
                    }
                }
            });
            ObjectName=ObjectName.join(",");
            let url = Interface.create;
            let d = {
                actions:[{
                    id: "2919;a",
                    descriptor: "",
                    callingDescriptor: "UNKNOWN",
                    params: {
                        // recordId: props.id,
                        recordInput:{
                            allowSaveOnDuplicate: false,
                            apiName: 'CalendarShare',
                            objTypeCode: '20376',
                            fields: {
                                ObjectId: data.users.join(","),
                                ObjectName: ObjectName,
                                Name: ObjectName,
                                SharedRights: data.rightCode,
                                AccessLevel: data.rightCode,
                                ObjectTypeName: data.currentMenu,
                                ObjectType:ObjectType,
                                CalendarId:(props.id?props.id:(data.userInfoId&&data.userInfoId!='undefined'?data.userInfoId:''))
                            }
                        }
                    }
                }]
            };
            let obj = {
                message: JSON.stringify(d)
            }
            proxy.$post(url, obj).then((res) => {
                message.success("添加成功！");
                getAccess();
            });
        }
        else{
            message.error("请选择需要添加的日历");
        }
    }
    const handleMenu = (e)=> {
        data.currentMenu = data.menus.find(item=>item.key==e.key).name;
    }

    const getAccess = () => {
        // proxy.$get(Interface.schedule.sharedList,{
        // }).then(res=>{
        //     data.listData = res.rows;
        // })
        data.listData = [];
        let filterQuery='\nCalendarId\teq\t'+(props.id?props.id:(data.userInfoId&&data.userInfoId!='undefined'?data.userInfoId:''));
        proxy.$post(Interface.list2, {
            filterId:'',
            objectTypeCode:'20376',
            entityName:'CalendarShare',
            filterQuery:filterQuery,
            search:'',
            page: 1,
            rows: 100,
            sort:'CreatedOn',
            order:'desc',
            displayColumns:'CalendarShareId,CreatedOn,ObjectName,SharedRights,AccessLevel,ImageUrls'
        }).then(res => {
            var list = [];
            data.total = res.pageInfo?res.pageInfo.total:0;
            if(res&&res.nodes){}else{return}
            for (var i = 0; i < res.nodes.length; i++) {
                var item = res.nodes[i];
                for(var cell in item){
                    if(cell!='id'&&cell!='nameField'&&cell!='ImageUrls'){
                        item[cell]=girdFormatterValue(cell,item);
                    }
                    if(cell=='ImageUrls'){
                        item[cell]=girdFormatterValue(cell,item)||require('@/assets/img/avatar-r.png');
                    }
                }
                list.push(item)
            }
            data.listData = list;
            
        })
    }
    //getAccess();
    const handleSubmit = () => {
        
    };
    const handleSearch = (val) =>{
        getPeople(val);
    }
    const handleChange = (e) => {

    }
    const getPeople = (val="")=>{
        proxy.$get(Interface.uilook,{
            Lktp: 30020,
            lksrch: val
        }).then(res=>{
            data.peoples = res.listData;
        })
    }
    // 删除已添加人
    const handleItemDelete = (item) => {
        // proxy.$get(Interface.file.removecontentaccess,{
        //     id: item.id
        // }).then(res=>{
        //     message.success(res.msg);
        //     getAccess();
        // })
        let obj = {
            actions: [{
            id: "2919;a",
            descriptor: "",
            callingDescriptor: "UNKNOWN",
            params: {
                recordId: item.id,
                apiName: 'CalendarShare',
                objTypeCode: '20376',
            }
            }]
        };
        let d = {
            message: JSON.stringify(obj)
        };
        proxy.$post(Interface.delete, d).then(res => {
            if (res && res.actions && res.actions[0] && res.actions[0].state == 'SUCCESS') {
                message.success("删除成功");
                getAccess();
            } else {
            if (res && res.actions && res.actions[0] && res.actions[0].errorMessage) {
                message.error(res.actions[0].errorMessage);
            }
            else {
                message.error("删除失败");
            }
            }
        })
    }
    const changeItemPerm = (e,item) => {
            let url = Interface.edit;
            let d = {
                actions:[{
                    id: "2919;a",
                    descriptor: "",
                    callingDescriptor: "UNKNOWN",
                    params: {
                        recordId: item.id,
                        recordInput:{
                            allowSaveOnDuplicate: false,
                            apiName: 'CalendarShare',
                            objTypeCode: '20376',
                            fields: {
                                SharedRights: item.SharedRights,
                                AccessLevel: item.SharedRights,
                            }
                        }
                    }
                }]
            };
            let obj = {
                message: JSON.stringify(d)
            }
            proxy.$post(url, obj).then((res) => {
                message.success("设置成功！");
                getAccess();
            });
    }
</script>
<style lang="less" scoped>
    @import url("@/style/modal.less");

    .ant-modal-content .ant-modal-footer {
        border-top: 0;
    }

    .ant-modal-content .modalContainer .modalCenter {
        /* height: 500px !important; */
        display: flex;
        /* align-items: center; */
        padding-top: 30px;
        form{
            flex: 1;
        }
    }
    .modalCenter{
        height: 350px !important;
    }
    .section {
        .sectionTitle {
            height: 30px;
            background-color: rgb(243, 242, 242);
            line-height: 30px;
            border-radius: 4px;
            padding-left: 15px;
            margin-bottom: 12px;
            /* margin: 2rem 2rem 0.5rem 2rem; */
        }

        .sectionRow {
            padding: 0 10px;
            box-sizing: border-box;
            display: flex;

            .sectionItem {
                flex: 1;
                margin-right: 20px;

                .ant-row {
                    display: block !important;
                }
            }

            .sectionItem:last-child {
                margin-right: 0;
            }
        }
    }

    :where(.css-dev-only-do-not-override-kqecok).ant-picker {
        width: 100%;
    }

    .ant-form-item {
        position: relative;
    }

    .selectIcon {
        position: absolute;
        right: 10px;
        top: 5px;
    }

    .rowBox {
        width: 100%;
        display: flex;
        align-items: center;
        border-bottom: 1px solid #e2e3e5;
        padding: 10px 10px;

        .imgs {
            width: 30px;
            height: 30px;
            background: var(--backColor);

            img {
                width: 100%;
                height: 100%;
            }
        }

        .name {
            flex: 1;
            margin-left: 20px;
        }
        .delIcon{
            width: 50px;
            cursor: pointer;
            padding-left: 20px;
        }
    }
    .menuRow{
        display: flex;
        align-items: center;
        .ant-btn{
            border-radius: 4px 0 0 4px;
            min-height: 38px;
            height: 100%;
            display: flex;
            align-items: center;
            padding: 0 6px 0 8px;
        }
        .ant-btn:hover{
                z-index: 1 !important;
        }
        .ant-btn:active{
                z-index: 1 !important;
        }
        :deep .ant-select-show-search:where(.css-dev-only-do-not-override-kqecok).ant-select:not(.ant-select-customize-input) .ant-select-selector{
            border-radius: 0 4px 4px 0 !important;
            margin-left: -1px !important;
            min-height: 38px;
        }
    }
    :deep .sectionRow :where(.css-dev-only-do-not-override-kqecok).ant-form-item .ant-row{
        flex-direction: column;
    }
    :deep .sectionRow :where(.css-dev-only-do-not-override-kqecok).ant-form-item .ant-form-item-label{
        text-align: left;
    }
    :deep .sectionRow :where(.css-dev-only-do-not-override-kqecok).ant-form-item .ant-form-item-label >label{
        min-height: 38px;
        height: 100%;
    }
    :deep :where(.css-dev-only-do-not-override-kqecok).ant-select .ant-select-arrow{
        font-size: 16px !important;
        color:rgb(116, 116, 116) !important;
    }
    .addBtn{
        padding-left: 10px;
        padding-bottom: 10px;
    }
    .sectionItemImg{
        width: 24px;
        height: 24px;
        background: #1B96FF;
        border-radius: 4px;
        float: left;
        margin-right: 5px;
        img{
            width: 100%;
            height: 100%;
        }
    }
    .sectionItemImg2{
        background: #939393;
    }
    .ant-select-selection-item-content .sectionItemImgSmall{
        width: 18px;
        height: 18px;
        margin-top: 4px;
        border-radius: 2px;
    }
    :deep :where(.css-dev-only-do-not-override-kqecok).ant-select-multiple .ant-select-selection-item{
        height: 28px !important;
        line-height: 26px !important;
    }
    .sectionItemBottom{
        font-size: 12px;
        svg{
            width: 13px;
            height: auto;
            position: relative;
            top: 2px;
            margin-right: 2px;
            fill: #333;
            margin-top: 3px;
        }
    }
</style>