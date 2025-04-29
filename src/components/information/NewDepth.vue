<template>
    <div class="NewDepthWrap">
        <a-modal v-model:open="props.isShow" width="850px" :maskClosable="false" @cancel="handleCancel"
            @ok="handleSubmit">
            <template #title>
                <div>
                    {{ title }}
                </div>
            </template>
            <div class="modalContainer">
                <div class="modalCenter" :style="{ height: height + 'px!important' }">
                    <a-form :model="formState" ref="formRef">
                        <div class="section">
                            <div class="sectionRow">
                                <div class="sectionItem">
                                    <a-form-item label="搜索">
                                        <div class="menuRow">
                                            <a-dropdown>
                                                <template #overlay>
                                                    <a-menu @click="handleMenu">
                                                        <a-menu-item v-for="(item,index) in menus" :key="item.key" :num="index">
                                                            <UserOutlined v-if="item.name=='用户'" />
                                                            <UserSwitchOutlined v-if="item.name=='角色'" />
                                                            <TeamOutlined v-if="item.name=='小组'" />
                                                            <ApartmentOutlined v-if="item.name=='部门'" />
                                                            {{item.name}}
                                                        </a-menu-item>
                                                    </a-menu>
                                                </template>
                                                <a-button>
                                                    <UserOutlined v-if="currentMenu=='用户'" />
                                                    <UserSwitchOutlined v-if="currentMenu=='角色'" />
                                                    <TeamOutlined v-if="currentMenu=='小组'" />
                                                    <ApartmentOutlined v-if="currentMenu=='部门'" />
                                                    <DownOutlined />
                                                </a-button>
                                            </a-dropdown>
                                            <a-select class="aselect" v-model:value="users" show-search
                                                mode="multiple" :placeholder="'搜索'+currentMenu"
                                                :default-active-first-option="false" :filter-option="false"
                                                :not-found-content="null" @search="handleSearch" @change="handleChange"
                                                @dropdownVisibleChange="(e)=>{getOptions('')}">
                                                <template #suffixIcon>
                                                    <SearchOutlined class="ant-select-suffix" />
                                                </template>
                                                <a-select-option :value="item.ID" v-for="(item,index) in options"
                                                    :key="index">{{item.Name}}</a-select-option>
                                            </a-select>
                                        </div>
                                    </a-form-item>
                                </div>
                                <div class="sectionItem">
                                    <a-form-item label="访问权限">
                                        <a-select v-model:value="rightCode">
                                            <a-select-option value="2">读</a-select-option>
                                            <a-select-option value="4">读/写</a-select-option>
                                            <a-select-option value="8">读/写/删</a-select-option>
                                            <a-select-option value="16">管理（读/写/删/移动）</a-select-option>
                                        </a-select>
                                    </a-form-item>
                                </div>
                            </div>
                        </div>
                        <div class="addBtn">
                            <a-button type="primary" @click="handleAddPrem">添加</a-button>
                        </div>
                        <div class="section">
                            <div class="sectionTitle">已添加</div>
                            <div class="empty" v-if="!listData.length">
                                <img
                                src="/src/assets/img/empty.png"
                                alt=""
                                />
                                <p class="emptyDesc">当前暂无数据</p>
                            </div>
                            <div class="rowBox" v-for="(item,index) in listData" :key="index">
                                <div class="imgs">
                                    <img :src="require('@/assets/img/user/role.png')" alt="" v-if="item.AccessObjectTypeCode*1==1036" />
                                    <img :src="require('@/assets/img/user/group.png')" alt="" v-if="item.AccessObjectTypeCode*1==9" />
                                    <img :src="require('@/assets/img/user/businessunit.png')" alt="" v-if="item.AccessObjectTypeCode*1==10" />
                                    <img :src="require('@/assets/img/user/user.png')" alt="" v-if="item.AccessObjectTypeCode*1==8" />
                                </div>
                                <div class="name">
                                    {{item.AccessObjectName}}
                                </div>
                                <div class="option">
                                    <a-select v-model:value="item.Depth" style="width: 200px;" @change="(e)=>{changeItemPerm(e,item)}">
                                        <a-select-option value="2">读</a-select-option>
                                        <a-select-option value="4">读/写</a-select-option>
                                        <a-select-option value="8">读/写/删</a-select-option>
                                        <a-select-option value="16">管理（读/写/删/移动）</a-select-option>
                                    </a-select>
                                </div>
                                <div class="delIcon">
                                    <CloseOutlined @click="handleItemDelete(item)"  v-if="item.ObjectId != '00000000-0000-0000-0000-000000000000' && item.ObjectId != '00000000-0000-0000-0000-000000000001'" />
                                </div>
                            </div>
                        </div>
                    </a-form>
                </div>
            </div>
            <template #footer>
                <!-- <div>
            <a-button @click="handleCancel">取消</a-button>
            <a-button type="primary" @click.prevent="handleSubmit">保存</a-button>
          </div> -->
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
    } from "vue";
    import {
        SearchOutlined,
        DownOutlined,
        UserOutlined,
        TeamOutlined,
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
        id: String,
        name:String,
        ObjectTypeCode:String,
        ObjectName:String
    });
    const formRef = ref();
    const emit = defineEmits(["cancel","load"]);
    const handleCancel = () => {
        emit("cancel", false);
    };
    const data = reactive({
        title: "新增权限",
        height: document.documentElement.clientHeight - 300,
        menus: [
            {
                key: 1,
                name: "角色"
            },
            {
                key: 2,
                name: "小组"
            },
            {
                key: 3,
                name: "部门"
            },
            {
                key: 4,
                name: "用户"
            }
        ],
        currentMenu: "角色",
        listData: [],
        rightCode: '2',
        users: [],
        peoples: [],
        userInfoId:'',
        options:[]
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
        options
    } = toRefs(data);
    const formState = reactive({
        name: "",
    });

    onMounted(() => {
        if(props.ObjectTypeCode=='5080'){
            if(props.ObjectName){
                data.title='新增 '+(props.name||'')+' 权限记录'
            }
        }else if(props.ObjectTypeCode=='100103'){
            //console.log(props.ObjectName)
            if(props.ObjectName){
                data.title='设置 '+props.ObjectName+' 权限'
            }
        }
        
        window.addEventListener("resize", (e) => {
            data.height = document.documentElement.clientHeight - 300;
        });
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
        let ObjectType='';
        if(data.currentMenu=='用户'){
            ObjectType='8';
        }else if(data.currentMenu=='角色'){
            ObjectType='1036';
        }else if(data.currentMenu=='小组'){
            ObjectType='9';
        }else if(data.currentMenu=='部门'){
            ObjectType='10';
        }
        if(data.users&&data.users.length){
            let ObjectName=[];
            data.options.map((item) => {
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
                            apiName: 'RecordAccessControl',
                            objTypeCode: '6061',
                            fields: {
                                AccessObjectId: data.users.join(","),
                                AccessObjectTypeCode:ObjectType*1,
                                AccessObjectName:ObjectName,
                                ObjectId:props.id,
                                ObjectTypeCode: props.ObjectTypeCode*1,
                                Name: props.ObjectName,
                                Depth:data.rightCode*1,
                            }
                        }
                    }
                }]
            };
            let obj = {
                message: JSON.stringify(d)
            }
            proxy.$post(url, obj).then((res) => {
                if(res&&res.actions&&res.actions[0]&&res.actions[0].state&&res.actions[0].state=='SUCCESS'){
                    message.success("添加成功！");
                    getAccess();
                }
                else{
                    if(res&&res.actions&&res.actions[0]&&res.actions[0].state&&res.actions[0].errorMessage){
                        message.error(res.actions[0].errorMessage);
                    }
                    else{
                        message.error("添加失败！");
                    }
                }
                
            });
        }
        else{
            message.error("请选择需要添加的用户、角色、小组或者部门");
        }
    }
    const handleMenu = (e)=> {
        data.users=[];
        data.currentMenu = data.menus.find(item=>item.key==e.key).name;
    }

    const getAccess = () => {
        // proxy.$get(Interface.schedule.sharedList,{
        // }).then(res=>{
        //     data.listData = res.rows;
        // })
        data.listData = [];
        let filterQuery='\nObjectId\teq\t'+props.id;
        proxy.$post(Interface.list2, {
            filterId:'',
            objectTypeCode:'6061',
            entityName:'RecordAccessControl',
            filterQuery:filterQuery,
            search:'',
            page: 1,
            rows: 100,
            sort:'CreatedOn',
            order:'desc',
            displayColumns:'AccessObjectName,Name,CreatedBy,CreatedOn,Depth,ObjectId,AccessObjectTypeCode'
        }).then(res => {
            var list = [];
            data.total = res.pageInfo?res.pageInfo.total:0;
            if(res&&res.nodes){}else{return}
            for (var i = 0; i < res.nodes.length; i++) {
                var item = res.nodes[i];
                for(var cell in item){
                    if(cell!='id'&&cell!='nameField'&&cell!='ImageUrls'&&cell!='AccessObjectTypeCode'){
                        item[cell]=girdFormatterValue(cell,item);
                    }
                    if(cell=='AccessObjectTypeCode'){
                        item[cell]=item[cell]?item[cell].value:'';
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
        getOptions(val);
    }
    const handleChange = (e) => {

    }
    const getOptions = (val)=>{
        // proxy.$get(Interface.uilook,{
        //     Lktp: 30020,
        //     lksrch: val
        // }).then(res=>{
        //     data.options = res.listData;
        // })
        if(data.currentMenu=='用户'){
            getUser(val);
        }else if(data.currentMenu=='角色'){
            getRole(val);
        }else if(data.currentMenu=='小组'){
            getGroup(val);
        }else if(data.currentMenu=='部门'){
            getUnit(val);
        }
    }
    const getUser = (e) => {
        let filterQuery='';
        if(e){
            filterQuery="\nFullName\tcontains\t"+e;
        }
        let d = {
            filterId: "",
            objectTypeCode:'8',
            entityName:'SystemUser',
            filterQuery: filterQuery,
            page: 1,
            rows: 20,
            displayColumns:'FullName,OrganizationId,BusinessUnitId,EmployeeId'
        };
        proxy.$get(Interface.list2, d).then(res=>{
            var list = [];
            if(res&&res.nodes){
                for (var i = 0; i < res.nodes.length; i++) {
                    var item = res.nodes[i];
                    for(var cell in item){
                        if(cell!='id'&&cell!='nameField'&&cell!='AvatarImg'){
                            item[cell]=girdFormatterValue(cell,item);
                        }
                        if(cell=='AvatarImg'){
                            item[cell]=girdFormatterValue(cell,item)||'@/assets/img/avatar-r.png';
                        }
                    }
                    if(!item.AvatarImg){
                        item.AvatarImg='@/assets/img/avatar-r.png';
                    }
                    item.Name=item.FullName;
                    item.ID = item.id;
                    list.push(item)
                }
            }
            data.options = list;
        })
    }
    const getRole=(e)=>{
        let filterQuery='';
        if(e){
            filterQuery="\nName\tcontains\t"+e;
        }
        let d = {
            filterId: "",
            objectTypeCode:'1036',
            entityName:'Role',
            filterQuery: filterQuery,
            page: 1,
            rows: 20,
            displayColumns:'Name,RoleId'
        };
        proxy.$get(Interface.list2, d).then(res=>{
            var list = [];
            if(res&&res.nodes){
                for (var i = 0; i < res.nodes.length; i++) {
                    var item = res.nodes[i];
                    for(var cell in item){
                        if(cell!='id'&&cell!='nameField'){
                            item[cell]=girdFormatterValue(cell,item);
                        }
                    }
                    item.ID = item.id;
                    list.push(item)
                }
            }
            data.options = list;
        })
    }
    const getGroup=(e)=>{
        let filterQuery='\nIsPublic\teq\ttrue';
        if(e){
            filterQuery="\nName\tcontains\t"+e;
        }
        let d = {
            filterId: "",
            objectTypeCode:'9',
            entityName:'Group',
            filterQuery: filterQuery,
            page: 1,
            rows: 20,
            displayColumns:'Name,GroupId'
        };
        proxy.$get(Interface.list2, d).then(res=>{
            var list = [];
            if(res&&res.nodes){
                for (var i = 0; i < res.nodes.length; i++) {
                    var item = res.nodes[i];
                    for(var cell in item){
                        if(cell!='id'&&cell!='nameField'){
                            item[cell]=girdFormatterValue(cell,item);
                        }
                    }
                    item.ID = item.id;
                    list.push(item)
                }
            }
            data.options = list;
        })
    }
    const getUnit=(e)=>{
        let filterQuery='';
        if(e){
            filterQuery="\nName\tcontains\t"+e;
        }
        let d = {
            filterId: "",
            objectTypeCode:'10',
            entityName:'BusinessUnit',
            filterQuery: filterQuery,
            page: 1,
            rows: 20,
            displayColumns:'Name,BusinessUnitId'
        };
        proxy.$get(Interface.list2, d).then(res=>{
            var list = [];
            if(res&&res.nodes){
                for (var i = 0; i < res.nodes.length; i++) {
                    var item = res.nodes[i];
                    for(var cell in item){
                        if(cell!='id'&&cell!='nameField'){
                            item[cell]=girdFormatterValue(cell,item);
                        }
                    }
                    item.ID = item.id;
                    list.push(item)
                }
            }
            data.options = list;
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
                apiName: 'RecordAccessControl',
                objTypeCode: '6061',
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
                            apiName: 'RecordAccessControl',
                            objTypeCode: '6061',
                            fields: {
                                Depth: item.Depth,
                            }
                        }
                    }
                }]
            };
            let obj = {
                message: JSON.stringify(d)
            }
            proxy.$post(url, obj).then((res) => {
                if(res&&res.actions&&res.actions[0]&&res.actions[0].state&&res.actions[0].state=='SUCCESS'){
                    message.success("设置成功！");
                }
                else{
                    if(res&&res.actions&&res.actions[0]&&res.actions[0].state&&res.actions[0].errorMessage){
                        message.error(res.actions[0].errorMessage);
                    }
                    else{
                        message.error("添加失败！");
                    }
                }
            });
    }
</script>
<style lang="less" scoped>
    @import url("@/style/modal.less");
    .ant-modal-content .ant-modal-footer {
        border-top: 0;
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
        }
        :deep .ant-select-show-search:where(.css-dev-only-do-not-override-kqecok).ant-select:not(.ant-select-customize-input) .ant-select-selector{
            border-radius: 0 4px 4px 0 !important;
            margin-left: -1px !important;
        }
    }
    .addBtn{
        padding-left: 10px;
        padding-bottom: 10px;
        text-align: right;
        margin-right: 10px;
    }
    .empty {
            background: #fff;
            padding: 0px 0 30px;
            height: 100%;
            width: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            margin-top: 50px;
            img{
                width: 130px;
            }
            .emptyDesc{
                color: #333;
            }
        }
</style>