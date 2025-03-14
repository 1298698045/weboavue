<template>
    <div class="writeEmail">
        <!-- <div class="emailHeader">
            <div class="emailLogo">
                <MailOutlined />
                <span class="logoText">写邮件</span>
            </div>
            <div class="emailSearch"></div>
            <div class="return" @click="backToOA">返回OA</div>
        </div> -->
        <div class="whitemailHeader">
            <a-tabs v-model:activeKey="activeKey">
                <a-tab-pane key="1" tab="普通邮件"></a-tab-pane>
                <a-tab-pane key="2" tab="群邮件"></a-tab-pane>
            </a-tabs>
        </div>
        <div class="whitemailCenter">
            <div class="containerWrap">
                <div class="leftContainer">
                    <div class="leftBd">
                        <div class="formWrap">
                            <a-form ref="formRef" :model="formState" :label-col="labelCol">
                                <a-form-item label="收件人" name="addressee"
                                    v-if="activeKey=='1'"
                                    :rules="[{ required: activeKey*1==1?true:false, message: '请选择收件人' }]">
                                    <a-select :default-active-first-option="false"
                                    allowClear :filter-option="false" showSearch
                                    @dropdownVisibleChange="(e) => {getUserList1('');}"
                                    @search="(e) => {getUserList1(e);}" ref="select" v-model:value="formState.addressee" mode="multiple"
                                        placeholder="请选择收件人">
                                        <a-select-option v-for="(item, index) in selectConcatsList" :key="index" :value="item.ID" class="userclass">
                                            <a-avatar :size="37">
                                                <template #icon><UserOutlined /></template>
                                                <!-- <img :src="item.ImageUrls" alt="" class="commentAvatar" /> -->
                                            </a-avatar>
                                            用户：
                                            {{item.OrganizationId?item.OrganizationId+' / ':''}}{{item.BusinessUnitId?item.BusinessUnitId+' / ':''}}{{item.Name}}{{item.EmployeeId?' ('+item.EmployeeId+')':''}}
                                        </a-select-option>
                                    </a-select>
                                </a-form-item>
                                <a-form-item label="群组" name="group"
                                    v-if="activeKey=='2'"
                                    :rules="[{ required: activeKey*1==2?true:false, message: '请选择群组' }]">
                                    <a-select v-model:value="formState.group" mode="multiple"
                                    @dropdownVisibleChange="(e) => {getGroupList1('');}"
                                    @search="(e) => {getGroupList1(e);}" placeholder="请选择群组">
                                        <a-select-option v-for="(item, index) in selectGroupList" :key="index" :value="item.ID">小组：{{item.Name}}</a-select-option>
                                    </a-select>
                                </a-form-item>
                                <a-form-item label="主题" name="theme" :rules="[{ required: true, message: '请输入主题' }]">
                                    <a-input v-model:value="formState.theme" placeholder="请输入主题"></a-input>
                                </a-form-item>
                            </a-form>
                            <div class="filesWrap">
                                <div class="selectFile">
                                    <a-upload multiple v-model:file-list="fileList" name="files" 
                                    :headers="headers" :data="uploadData" :action="Interface.email.upload"
                                        :showUploadList="false"
                                        :before-upload="beforeUpload"
                                        @change="handleChange">
                                        <a-button type="link">添加附件<span style="color: red;">（单个附件不能超过40M，不支持exe和js脚本文件上传）</span></a-button>
                                        <template #itemRender>
                                            
                                        </template>
                                    </a-upload>
                                    <div class="inboxFileList">
                                        <div class="inboxFileItem" v-for="(item,index) in fileList2" :key="index">
                                            <div class="leftImg">
                                                <img src="/src/assets/img/filetype/doc.png" v-if="item.fileExtension=='ocx'||item.fileExtension=='docx'||item.fileExtension=='doc'||
                                                     item.fileExtension=='.ocx'||item.fileExtension=='.docx'||item.fileExtension=='.doc'||item.fileExtension=='.wps'||item.fileExtension=='wps'" />
                                                <img src="/src/assets/img/filetype/rar.png" v-else-if="item.fileExtension=='rar'||item.fileExtension=='zip'||
                                                     item.fileExtension=='.rar'||item.fileExtension=='.zip'" />
                                                <img src="/src/assets/img/filetype/Excel.png" v-else-if="item.fileExtension=='xlsx'||item.fileExtension=='xls'||
                                                     item.fileExtension=='.xlsx'||item.fileExtension=='.xls'" />
                                                <img src="/src/assets/img/filetype/Pdf.png" v-else-if="item.fileExtension=='pdf'||item.fileExtension=='.pdf'" />
                                                <img src="/src/assets/img/filetype/TXT.png" v-else-if="item.fileExtension=='txt'||item.fileExtension=='.txt'" />
                                                <img src="/src/assets/img/filetype/PPT.png" v-else-if="item.fileExtension=='ppt'||item.fileExtension=='.ppt'||item.fileExtension=='pptx'||item.fileExtension=='.pptx'" />
                                                <img src="/src/assets/img/filetype/defaultImg.png" v-else-if="item.fileExtension=='jpg'||item.fileExtension=='png'||item.fileExtension=='.jpg'||item.fileExtension=='.png'" />
                                                <img src="/src/assets/img/filetype/Folder.png" v-else />
                                            </div>
                                            <div class="rightFileInfo">
                                                <div class="fileName rowEllipsis">
                                                    {{item.name}}
                                                </div>
                                                <div class="fileSize">{{item.size}}</div>
                                                <div class="fileOptionShow" :title="(item.name||'')">
                                                    <div class="btns">
                                                        <a-tooltip title="查看" placement="top">
                                                            <a-button type="text" :icon="h(EyeOutlined)" @click="handlePreviewFile(item)"></a-button>
                                                        </a-tooltip>
                                                        <a-tooltip title="下载" placement="top">
                                                            <a-button type="text" :icon="h(VerticalAlignBottomOutlined)" @click="downloadFile(item)"></a-button>
                                                        </a-tooltip>
                                                        <a-tooltip title="删除" placement="top">
                                                            <a-button type="text" :icon="h(CloseOutlined)" @click="deleteFile(item)"></a-button>
                                                        </a-tooltip>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="editor">
                                <Editor ref="editorRef" placeholder="请输入邮件内容" :height="height" @input="getContent" />
                            </div>
                            <div class="checkWrap">
                                <a-checkbox v-model:checked="formState.chkSms">短信</a-checkbox>
                                <a-checkbox>已读回执</a-checkbox>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="rightContainer" v-if="activeKey=='1'">
                    <div class="rightFixedHead">
                        <a-input-search v-model:value="searchVal" placeholder="请输入" style="width: 200px"
                            @search="onSearch" />
                        <a-button class="ml10" :icon="h(PlusOutlined)" @click="openPeopleModel"></a-button>
                    </div>
                    <div class="treePeopleWrap">
                        <a-tree blockNode  @select="selectPeople"  v-model:expandedKeys="latelyexpandedKeys" v-model:selectedKeys="latelySelectedKeys" :tree-data="latelyTreeData">
                        </a-tree>
                        <a-tree blockNode  @select="selectPeople"  v-model:expandedKeys="DeptexpandedKeys" v-model:selectedKeys="deptSelectedKeys"
                            :load-data="loadDeptNode" :tree-data="departListTree">
                        </a-tree>
                        <a-tree blockNode @select="selectPeople" v-model:expandedKeys="expandedKeys" v-model:selectedKeys="selectedKeys"
                            :load-data="loadGroupNode" :tree-data="groupTreeData">
                        </a-tree>
                    </div>
                </div>
                <div class="rightContainer" v-else>
                    <div class="treePeopleWrap">
                        <a-tree blockNode :tree-data="departListTree2" @select="selectGroup">
                        </a-tree>
                        <a-tree blockNode :tree-data="groupTreeData2" @select="selectGroup">
                        </a-tree>
                    </div>
                </div>
            </div>
        </div>
        <div class="writeFooter">
            <div class="footerOption">
                <a-button class="mr10" type="primary" @click="handleSendEmail(1)">发送</a-button>
                <a-button class="mr10" @click="handleSendEmail(0)">存草稿</a-button>
                <a-button class="mr10" @click="cancelWriteEmail">取消</a-button>
            </div>
        </div>
        <radio-user v-if="isRadioUser" :isShow="isRadioUser" @selectVal="getUserData" @cancel="closeUser" @ok="refreshPeople"></radio-user>
    </div>
</template>
<script setup>
    import "@/style/oldIcon/iconfont.css";
    import axios from "axios";
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
        nextTick,
        h,
        toRaw
    } from "vue";
    import {
        EllipsisOutlined, CloseOutlined, UserOutlined, PlusOutlined, VerticalAlignBottomOutlined, EyeOutlined
    } from "@ant-design/icons-vue";
    import { message } from "ant-design-vue";
    import Interface from "@/utils/Interface.js";
    import Delete from "@/components/listView/Delete.vue";
    import Editor from "@/components/TEditor.vue"
    import RadioUser from "@/components/commonModal/RadioUser.vue";
    import { formTreeData,girdFormatterValue } from "@/utils/common.js";
    import { useRouter, useRoute } from "vue-router";
    //import { search } from "core-js/fn/symbol";
    const { proxy } = getCurrentInstance();
    const route = useRoute();
    const router = useRouter();
    const activeKey = ref('1');
    const labelCol = ref({ style: { width: '100px' } });
    const formRef = ref();
    const formState = reactive({
        addressee: [],
        theme: "",
        chkSms: false,
        group: [],
        mailBody: ""
    })
    const editorRef = ref();
    const emit = defineEmits(['cancel','refresh']);
    const props = defineProps({
        ltags:String,
        id:String,
        type:String,
    })
    const previewIcon = h("i",{
        class: "iconfont icon-yulanwenjian"
    })
    const token = localStorage.getItem("token");
    const data = reactive({
        fileList: [],
        fileList1:[],
        fileList2: [],
        searchVal: "",
        departListTree:[
            {
                title: '部门',
                key: 1
            }
        ],
        groupTreeData: [
            {
                title: '小组',
                key: 1
            }
        ],
        expandedKeys: [],
        selectedKeys: [],
        groupDataList: [],
        DeptexpandedKeys: [],
        deptSelectedKeys: [],
        deptTreeData: [],
        selectConcatsList: [],
        selectGroupList: [],
        departListTree2: [
            {
                title: '部门',
                key: 1,
                children: []
            }
        ],
        groupTreeData2: [
            {
                title: '小组',
                key: 1,
                children: []
            }
        ],
        latelyTreeData:[
            {
                title: '最近联系人',
                key: 1,
                children:[]
            }
        ],
        latelyexpandedKeys: [],
        latelySelectedKeys: [],
        height: 600,
        isRadioUser:false,
        defaultExpandAll:false,
        currentUserId:'',
        currentUserName:'',
        keyword:'',
        id:'',
        uploadData: {
            parentId: ""
        },
        headers: {
            Authorization: token,
            Token: token
        }
    })
    const { uploadData,keyword,currentUserId,currentUserName,fileList,fileList2, headers, searchVal, groupTreeData, expandedKeys, selectedKeys, groupDataList, DeptexpandedKeys,
        deptSelectedKeys, deptTreeData, departListTree, selectConcatsList, selectGroupList, departListTree2, groupTreeData2, latelyTreeData,
        latelyexpandedKeys, latelySelectedKeys, height,isRadioUser,defaultExpandAll,id
    } = toRefs(data);
    if(route.query.Id){
        if(route.query.type*1==1){
            activeKey.value='1';
            data.selectConcatsList.push({
                ID: route.query.Id,
                Name: route.query.Name
            });
            formState.addressee.push(route.query.Id);
        }else if(route.query.type*1==2){
            activeKey.value='2';
            data.selectGroupList.push({
                ID: route.query.Id,
                Name: route.query.Name
            });
            formState.group.push(route.query.Id);
        }
    }
    const getContent = (e) => {
        formState.mailBody = e;
    }
    const unique = (list) => {
        for (var i = 0; i < list.length; i++) {
            for (var j = i + 1; j < list.length; j++) {
                if (list[i].uid == list[j].uid) {
                    list.splice(j, 1)
                    j--;
                }
            }
        }
        return list;
    }
    const beforeUpload=()=>{
        //执行顺序1
        if(data.id==''){
            let url=Interface.email.saveDraft;
            let d = {
                actions:[{
                    id:"4105;a",
                    descriptor:"",
                    callingDescriptor:"UNKNOWN",
                    params: {
                        subject:'',
                        body:'',
                        isGroupmail:false,
                        to:[]
                    }
                }]
            };
            let obj = {
                message: JSON.stringify(d)
            }
            proxy.$post(url,obj).then(res=>{
                if (res && res.actions && res.actions[0] && res.actions[0].state == 'SUCCESS') {
                    data.id=res.actions[0].returnValue.id;
                    data.uploadData.parentId=res.actions[0].returnValue.id;
                    if(props.id&&props.id!=data.id){
                        copyAttachment();
                    }
                }
            })
        }
    }
    const handleChange = (file) => {
        if (file.file.status == "done") {
            message.success("上传成功！");
        }
        if(file&&file.file){
            let size=file.file.size;
            size=size?(size*1/1024).toFixed(2):0;
            data.fileList2.push({
                uid: file.file.uid,
                name: file.file.name,
                url: file.file.url,
                fileExtension: file.file.name ? (file.file.name).split('.')[1] : '',
                raw: file.file.originFileObj,
                Privilege: '',
                size:size+'kb',
                downloadUrl:file.file.url,
                viewUrl:file.file.url
            });
        }
        data.fileList2=unique(data.fileList2);
    }
    const onSearch = (e) => {
        data.latelyexpandedKeys=[1];
        data.latelyTreeData[0].children = data.selectConcatsList.filter(item=>{
            item.title = item.Name;
            item.key = item.ID;
            item.id = item.ID;
            item.isExpanded=true;
           return item.Name.indexOf(data.searchVal) != -1;
        })
    }
    const highlightKeyword = (label) => {
        if (!data.keyword) {
            return label;
        }
        var highlightedLabel = label.replace(new RegExp(data.keyword, 'gi'), function (match){
            return '<span style="color: red;">'+match+'</span>';
        });
        return highlightedLabel;
    }
    const getUserList1 = (e) => {
        //proxy.$get(Interface.user.allUser,{}).then(res=>{
            // let list = res.actions[0].returnValue.lookupResults.records;
            // let arr = [];
            // list.forEach(item=>{
            //     arr.push({
            //         ID: item.fields.Id.value,
            //         Name: item.fields.Name.value
            //     })
            // });
            // data.selectConcatsList = data.selectConcatsList.concat(arr);
            // data.selectConcatsList = uniqu(data.selectConcatsList,'ID');
        //})
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
            rows: 10,
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
                            item[cell]=girdFormatterValue(cell,item)||require('@/assets/img/avatar-r.png');
                        }
                    }
                    if(!item.AvatarImg){
                        item.AvatarImg=require('@/assets/img/avatar-r.png');
                    }
                    item.Name=item.FullName;
                    item.ID = item.id;
                    list.push(item)
                }
            }
            data.selectConcatsList = list;
        })
    }
    const getUserList = (e) => {
        let obj = {
      actions:[{
        id: "6129;a",
        descriptor: "",
        callingDescriptor: "UNKNOWN",
        params: {
          objectApiName: 'MailInbox',
          fieldApiName: 'ToUserIds',
          pageParam: 1,
          pageSize: 25,
          q: e,
          searchType: "Recent",
          targetApiName: 'SystemUser',
          body: {
            sourceRecord: {
              apiName: 'MailInbox',
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
        proxy.$post(Interface.lookup,d).then(res=>{
            let list = res.actions[0].returnValue.lookupResults.records;
            let arr = [];
            list.forEach(item=>{
                arr.push({
                    ID: item.fields.Id.value,
                    Name: item.fields.Name.value
                })
            });
            data.selectConcatsList = data.selectConcatsList.concat(arr);
            data.selectConcatsList = uniqu(data.selectConcatsList,'ID');
        })
        
    }
    const getGroupList1 = (e) => {
        let filterQuery='\nIsPublic\teq\ttrue';
        if(e){
            filterQuery+="\nName\tcontains\t"+e;
        }
        let d = {
            filterId: "",
            objectTypeCode:'9',
            entityName:'Group',
            filterQuery: filterQuery,
            search:e,
            page: 1,
            rows: 100,
            displayColumns:'Name'
        };
        proxy.$get(Interface.list2, d).then(res=>{
            let nodes = res.nodes;
            data.selectGroupList = nodes.map(item=>{
                item.Name = item.Name&&item.Name.textValue?item.Name.textValue:'';
                item.ID = item.id;
                return item;
            });
        })
    }
    const getGroupList = (e) => {
        let obj = {
      actions:[{
        id: "6129;a",
        descriptor: "",
        callingDescriptor: "UNKNOWN",
        params: {
          objectApiName: 'MailInbox',
          fieldApiName: 'ToGroupIds',
          pageParam: 1,
          pageSize: 25,
          q: e,
          searchType: "Recent",
          targetApiName: 'Group',
          body: {
            sourceRecord: {
              apiName: 'MailInbox',
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
        proxy.$post(Interface.lookup,d).then(res=>{
            let list = res.actions[0].returnValue.lookupResults.records;
            let arr = [];
            list.forEach(item=>{
                arr.push({
                    ID: item.fields.Id.value,
                    Name: item.fields.Name.value
                })
            });
            data.selectGroupList = data.selectGroupList.concat(arr);
            data.selectGroupList = uniqu(data.selectGroupList,'ID');
            //console.log(data.selectGroupList)
        })
        
    }

    // 获取最近联系人
    const getLately = () => {
        // proxy.$get(Interface.addressBook.lastList,{}).then(res=>{
        //     let rows = res.listData.map(item=>{
        //         item.title = item.FullName;
        //         item.key = item.SystemUserId;
        //         return item;
        //     })
        //     data.latelyTreeData[0].children = rows;
        // })
        let rows = data.selectConcatsList.map(item=>{
            item.title = item.Name;
            item.key = item.ID;
            item.id = item.ID;
            return item;
        })
        data.latelyTreeData[0].children = rows;
    }
    getLately();
    // 公共小组
    const getRightGroupList = () => {
        // proxy.$get(Interface.user.groupList, {}).then(res => {
        //     data.groupDataList = res.listData.map(function (item) {
        //         item.title = item.Name;
        //         item.key = item.GroupId;
        //         item.children = [];
        //         return item;
        //     });
        //     data.groupTreeData2[0].children = data.groupDataList;
        // })
        let d = {
            filterId: "",
            entityType: "Group",
            filterQuery: "\nIsPublic\teq\ttrue",
            page: 1,
            rows: 100,
        };
        proxy.$get(Interface.list2, d).then(res=>{
            let nodes = res.nodes;
            data.groupDataList = nodes.map(item=>{
                item.title = item.Name&&item.Name.textValue?item.Name.textValue:'';
                item.key = item.id;
                item.children = [];
                return item;
            });
            data.groupTreeData2[0].children = data.groupDataList;
        })
    }
    getRightGroupList();
    const loadGroupNode = treeNode => {
        //console.log("treeNode",treeNode);
        return new Promise(resolve => {
            // if (treeNode.dataRef.children) {
            //     resolve();
            //     return;
            // }
            if(treeNode.key==1){
                treeNode.dataRef.children = data.groupDataList;
                data.groupTreeData = [...data.groupTreeData];
                resolve();
            }
            if(treeNode.id && treeNode.id!=""){
                loadGroupPeople(treeNode.id).then(res=>{
                    //console.log("list", res)
                    let temp = res.nodes.map(item=>{
                        item.title = item.RegardingObjectIdName&&item.RegardingObjectIdName.textValue?item.RegardingObjectIdName.textValue:'';
                        item.key = item.id;
                        item.isLeaf = true
                        return item;
                    })
                    treeNode.dataRef.children = temp;
                    resolve();
                });
            }else {
                resolve();
            }
        });
    };
    const loadGroupPeople = (groupId) => {
        return new Promise((resolve,reject)=>{
            // proxy.$get(Interface.group.list,{
            //     groupId: groupId
            // }).then(res=>{
            //     resolve(res);
            // })
            let d = {
                filterId: "",
                entityType: "GroupMembership",
                displayColumns: "id,RegardingObjectIdName,BusinessUnitId",
                filterQuery: "\nGroupId\teq\t" + groupId,
                page: 1,
                rows: 100,
            };
            proxy.$get(Interface.list2, d).then(res=>{
                resolve(res);
            })
        })
    }
    const selectPeople = (e,selectedNodes) => {
        //console.log("e",e, selectedNodes);
        let row = selectedNodes.node;
        //console.log(row);
        let index = data.selectConcatsList.findIndex(item=>item.ID==row.id);
        if(index==-1 && row.id){
            data.selectConcatsList.push({
                ID: row.id,
                Name: row.title
            });
            formState.addressee.push(row.id);
        }
        if(index>=0){
            message.error("不能重复添加收件人！");
        }
    }

    
    const getDeptTree = () => {
        // proxy.$get(Interface.treeList,{
        //     entity: "organizationtree"
        // }).then(res=>{
        //     console.log("res",res);
        //     let rows = res.rows.map(item=>{
        //         item.key = item.id
        //         item.title = item.text;
        //         return item;
        //     });
        //     let list = formTreeData(rows, 'id', 'pid');
        //     data.deptTreeData = list;
        //     data.departListTree2[0].children = list;
        // })
        proxy.$get(Interface.deptTree, {}).then(res => {
            //console.log("res", res);
            let listData = res.actions[0].returnValue;
            let rows = listData.map(item=>{
                item.key = item.id
                item.title = item.name;
                item.children=[];
                return item;
            });
            let list = formTreeData(rows, 'id', 'parentId');
            data.deptTreeData = list;
            data.departListTree2[0].children = list;
        })
    }
    getDeptTree();
    // 加载部门下面联系人
    const loadDeptNode = treeNode => {
        //console.log("treeNode",treeNode);
        return new Promise(resolve=>{
            if(treeNode.key==1){
                treeNode.dataRef.children = data.deptTreeData;
                data.departListTree = [...data.departListTree];
                resolve();
            }
            if(treeNode.id){
                loadDeptUser(treeNode.id).then(res=>{
                    //console.log("list", res)
                    let temp = res.nodes.map(item=>{
                        item.title = item.FullName&&item.FullName.textValue?item.FullName.textValue:'';
                        item.key = item.id;
                        item.isLeaf = true
                        return item;
                    })
                    //console.log("treeNode.dataRef.children",treeNode.dataRef.children);
                    if(treeNode.dataRef.children==undefined){
                        treeNode.dataRef.children = [];
                    }
                    treeNode.dataRef.children =  treeNode.dataRef.children.concat(temp);
                    resolve();
                });
            }
        })
    }
    const loadDeptUser = (deptId) => {
        return new Promise(resolve=>{
            // proxy.$get(Interface.user.sysUser,{
            //     businessUnitId: deptId
            // }).then(res=>{
            //     resolve(res);
            // })
            let d = {
                filterId: "",
                entityType: "SystemUser",
                displayColumns: "id,Name,FullName,UserName,EmployeeId,BusinessUnitIdName,OrganizationId",
                filterQuery: "\nBusinessUnitId\teq\t" + deptId,
                page: 1,
                rows: 100
            };
            proxy.$get(Interface.list2, d).then(res=>{
                resolve(res);
            })
        })
    }
    // 选择群组
    const selectGroup = (e,node)=>{
        //console.log(e,node);
        let row = node.node;
        let index = data.selectGroupList.findIndex(item=>item.ID == row.id);
        if(index==-1){
            data.selectGroupList.push({
                ID: row.id,
                Name: row.title
            });
            formState.group.push(row.id);
        }
        if(index>=0){
            message.error("不能重复添加群组！");
        }
    }
    // 发送邮件
    const handleSendEmail = (type) => {
        let url=Interface.email.saveDraft;
        let tos=[];
        if (type == 1) {
            url = Interface.email.send;
            for (var i = 0; i < formState.addressee.length; i++) {
                for (var j = 0; j < data.selectConcatsList.length; j++) {
                    if (formState.addressee[i] == data.selectConcatsList[j].ID) {
                        tos.push({
                            id: formState.addressee[i],
                            name: data.selectConcatsList[j].Name || ''
                        })
                    }
                }
            }
        }
        if (activeKey.value * 1 == 2) {
            url = Interface.email.sendbatch;
            for (var i = 0; i < formState.group.length; i++) {
                for (var j = 0; j < data.selectGroupList.length; j++) {
                    if (formState.group[i] == data.selectGroupList[j].ID) {
                        tos.push({
                            id: 'R:'+formState.group[i],
                            name: data.selectGroupList[j].Name || ''
                        })
                    }
                }
            }
        }
        let d = {
            actions:[{
                id:"4105;a",
                descriptor:"",
                callingDescriptor:"UNKNOWN",
                params: {
                    subject:formState.theme,
                    body:formState.mailBody,
                    isGroupmail:false,
                    to:tos
                }
            }]
        };
        if(activeKey.value*1==2){
            d.actions[0].params.isGroupmail=true;
        }
        if(data.id){
            d.actions[0].params.id=data.id;
        }
        let obj = {
            message: JSON.stringify(d)
        }
        formRef.value.validate().then(() => {
            //console.log('values', formState, toRaw(formState));
            // proxy.$get(url,{
            //     id: "",
            //     subject: formState.theme,
            //     mailBody: formState.mailBody,
            //     ToUserIds:activeKey.value=='1'?formState.addressee:'',
            //     ToGroupIds:activeKey.value=='1'?'':formState.group,
            //     emailStatus: 1,
            //     priority: 0,
            //     Forward: "",
            //     IsGroupmail: activeKey.value=='1'?false:true,
            //     chkSms: formState.chkSms
            // }).then(res=>{
            //     console.log("res",res);
            //     emit("cancel", props.ltags);
            //     emit("refresh", '');
            // })
            proxy.$post(url,obj).then(res=>{
                //console.log("res",res);
                if (res && res.actions && res.actions[0] && res.actions[0].state == 'SUCCESS') {
                    data.id=res.actions[0].returnValue.id;
                    data.uploadData.parentId=res.actions[0].returnValue.id;
                    message.success(type==1?"发送成功":"保存成功");
                    // if (data.fileList2&&data.fileList2.length) {
                    //     var fd = new FormData();
                    //     fd.append('parentid', data.id);
                    //     for (var i = 0; i < data.fileList2.length; i++) {
                    //         var item = data.fileList2[i];
                    //         if (item.raw&&item.isNew) {
                    //             fd.append('files', item.raw);
                    //         }
                    //     }
                    //     axios({
                    //         url: Interface.email.upload,
                    //         method: 'POST',
                    //         data: fd,
                    //         headers: {
                    //             'Content-type': 'multipart/form-data',
                    //         },
                    //     }).then(res=>{

                    //     }).catch(err => {
                    //         console.log('error', err);
                    //     });
                    // }
                    
                    if(type==1){
                        emit("cancel", props.ltags);
                        data.id='';
                        data.uploadData.parentId='';
                    }
                    emit("refresh", '');
                }
                else if (res && res.actions && res.actions[0] && res.actions[0].errorMessage) {
                    message.success(res.actions[0].errorMessage);
                }
                else {
                    message.error(type==1?"发送失败":"保存失败");
                }
            })
        }).catch(err => {
            console.log('error', err);
        });
        
    }
    const cancelWriteEmail= () => {
        emit("cancel", props.ltags);
        // let url = router.resolve({
        //     path:'/email',
        //     name: "Email",
        //     query: {
                
        //     },
        // });
        //window.open(url.href);
        //window.location.href=url.href;
    }
    const uniqu=(array, name)=>{
        var arr = []
        for (var j = 0; j < array.length; j++) {
            if (JSON.stringify(arr).indexOf(array[j][name]) == -1) {
                arr.push(array[j])
            }
        }
        return arr
    }
    const backToOA = () => {
        let url = router.resolve({
            path:'/workspace/personal/home',
            name: "PersonalHome",
            query: {
                
            },
        });
        //window.open(url.href);
        window.location.href=url.href;
    }
    const openPeopleModel=(e)=>{
        data.isRadioUser = true;
    }
    const refreshPeople=(e)=>{
       
    }
    const closeUser = (e) => {
        data.isRadioUser = false;
    };
    const getUserData = (params) => {
      //console.log("params:", params);
      data.isRadioUser = false;
      if(params.id){
        let index = data.selectConcatsList.findIndex(item=>item.ID==params.id);
        if(index==-1 && params.id){
            data.selectConcatsList.push({
                ID: params.id,
                Name: params.name
            });
            formState.addressee.push(params.id);
        }
        if(index>=0){
            message.error("不能重复添加收件人！");
        }
      }
    };
    const getDetail = () => {
        proxy.$get(Interface.email.getMail,{
            id: props.id,
        }).then(res=>{
            if(res&&res.actions&&res.actions[0]&&res.actions[0].returnValue&&res.actions[0].returnValue){
                let detail = res.actions[0].returnValue;
                formState.theme=detail.subject;
                if(props.type){
                    formState.theme=props.type+'：'+detail.subject;
                }
                if(detail.fromName&&detail.createdBy){
                    data.selectConcatsList.push({
                        ID: detail.createdBy,
                        Name: detail.fromName
                    });
                    formState.addressee.push(detail.createdBy);
                }
                if(detail.body){
                    formState.mailBody=detail.body;
                    console.log(formState.mailBody)
                    if(editorRef&&editorRef.value){
                        editorRef.value.content=detail.body;
                    }
                }
            }
        })
    }
    //预览附件
    const handlePreviewFile= (item) => {
        // let d = {}
        // proxy.$post(url,d).then(res=>{
        //     if(res&&res.actions&&res.actions[0]&&res.actions[0].state&&res.actions[0].state=='SUCCESS'){
                
        //     }
        //     else{
        //         if(res&&res.actions&&res.actions[0]&&res.actions[0].state&&res.actions[0].errorMessage){
        //             message.success(res.actions[0].errorMessage);
        //         }
        //         else{
        //             message.success("预览失败！");
        //         }
        //     }
        // })
        window.open(item.viewUrl);
    };
    //下载附件
    const downloadFile= (item) => {
        // let d = {}
        // proxy.$post(url,d).then(res=>{
        //     if(res&&res.actions&&res.actions[0]&&res.actions[0].state&&res.actions[0].state=='SUCCESS'){
                
        //     }
        //     else{
        //         if(res&&res.actions&&res.actions[0]&&res.actions[0].state&&res.actions[0].errorMessage){
        //             message.success(res.actions[0].errorMessage);
        //         }
        //         else{
        //             message.success("下载失败！");
        //         }
        //     }
        // })
        window.open(item.downloadUrl);
    };
    //删除附件
    const deleteFile=(item)=>{
        let d = {
            actions:[{
                    id: "4105;a",
                    descriptor: "",
                    callingDescriptor: "UNKNOWN",
                    params: {
                        parentId:data.id,
                        fileId:item.uid
                    }
                }]
            };
            let obj = {
                message: JSON.stringify(d)
            }
            proxy.$post(Interface.email.deleteAttachment,obj).then(res=>{
                if(res&&res.actions&&res.actions[0]&&res.actions[0].state&&res.actions[0].state=='SUCCESS'){
                    message.success("删除成功！");
                    for (var i = 0; i < data.fileList2.length; i++) {
                        if (item.uid == data.fileList2[i].uid) {
                            data.fileList2.splice(i, 1);
                        }
                    }
                }
                else{
                    if(res&&res.actions&&res.actions[0]&&res.actions[0].state&&res.actions[0].errorMessage){
                        message.error(res.actions[0].errorMessage);
                    }
                    else{
                        message.error("删除失败！");
                    }
                }
            }).catch(err => {
                console.log('error', err);
                message.error("删除失败！");
            });
    }
    //获取附件列表
    const getAttachments = () => {
        proxy.$get(Interface.email.getAttachments,{
            id: props.id,
        }).then(res=>{
            if(res&&res.actions&&res.actions[0]&&res.actions[0].returnValue&&res.actions[0].returnValue){
                data.fileList2=res.actions[0].returnValue||[];
                for (var i = 0; i < data.fileList2.length; i++) {
                    var item = data.fileList2[i];
                    let size=item.fileSize;
                    size=size?(size*1/1024).toFixed(2):0;
                    size=size+'kb';
                    let name=item.name||'';
                    if(name){
                        name=name.replaceAll('.'+item.fileExtension,'');
                    }
                    data.fileList2[i].size=size;
                    data.fileList2[i]['uid']=item.attachId;
                    data.fileList2[i]['url']=item.viewUrl;
                    data.fileList2[i]['downloadUrl']=item.downloadUrl;
                    data.fileList2[i]['viewUrl']=item.viewUrl;
                }
            }
        })
    }
    //回复或转发，复制邮件附件
    const copyAttachment = () => {
        let d = {
            actions:[{
                id: "4105;a",
                descriptor: "",
                callingDescriptor: "UNKNOWN",
                params: {
                    copyEmailId:props.id,
                    emailId:data.id
                }
            }]
        };
        let obj = {
            message: JSON.stringify(d)
        }
        proxy.$post(Interface.email.copyAttachment,obj).then(res=>{
            if(res&&res.actions&&res.actions[0]&&res.actions[0].state&&res.actions[0].state=='SUCCESS'){
                getAttachments()
            }
            else{
                if(res&&res.actions&&res.actions[0]&&res.actions[0].state&&res.actions[0].errorMessage){
                    message.success(res.actions[0].errorMessage);
                }
                else{
                    message.success("附件复制失败！");
                }
            }
        })
    }
    // watch(()=>props.body,(newVal,oldVal)=>{
    //     if(props.body){
    //         formState.mailBody=props.body;
    //         let editorRef = ref();
    //         if(editorRef&&editorRef.value){
    //             editorRef.value.content=props.body;
    //         }
    //     }
    // },{immediate:true,deep:true})
    onMounted(() => {
        if(props.id){
            getDetail();
            if(props.ltags!='draft'){
                beforeUpload();
            }
            else{
                data.id=props.id;
                data.uploadData.parentId=props.id;
            }
        }
        else{
            beforeUpload();
        }
        let userInfo=window.localStorage.getItem('userInfo');
        if(userInfo){
            userInfo=JSON.parse(userInfo);
            data.currentUserId=userInfo.userId;
            data.currentUserName=userInfo.fullName;
        }
    })
</script>
<style lang="less" scoped>
    .writeEmail {
        height: 100vh;
        width: 100%;
        background: #f0f2f6;
        .ant-select-selection-item-content .ant-avatar{
            display: none !important;
        }
    }

    .whitemailHeader {
        // padding-top: 70px;
        border-bottom: 1px solid #e5e6eb;
        background: #fff;
    }

    .whitemailCenter {
        width: 100%;
        height: calc(~"100% - 180px");
        background: #fff;
        /* overflow: hidden; */
        .containerWrap {
            display: flex;
            height: 100%;

            .leftContainer {
                flex: 1;
                height: 100%;
                overflow: auto;
                .leftBd {
                    padding: 20px 50px;
                    height: 100%;
                    box-sizing: border-box;

                    .checkWrap {
                        padding: 10px 0;
                    }
                    .filesWrap{
                        .selectFile{
                            .inboxFileList{
                                display: flex;
                                flex-wrap: wrap;
                                .inboxFileItem{
                                    width: 266px;
                                    border-radius: 2px;
                                    background: #f2f3f5;
                                    padding: 10px;
                                    box-sizing: border-box;
                                    margin-right: 16px;
                                    margin-bottom: 16px;
                                    cursor: pointer;
                                    display: flex;
                                    overflow: hidden;
                                    position: relative;
                                    .leftImg{
                                        width: 32px;
                                        height: 32px;
                                        position: relative;
                                        top: 5px;
                                        img{
                                            width: 100%;
                                            height: 100%;
                                        }
                                    }
                                    .rightFileInfo{
                                        flex: 1;
                                        margin-left: 14px;
                                        overflow: hidden;
                                        color: #1d2129;
                                        .fileSize{
                                            color: #4e5969;
                                            padding-top: 4px;
                                        }
                                        .fileOptionShow{
                                            position: absolute;
                                            width: calc(~"100% - 36px");
                                            height: 100%;
                                            left: 42px;
                                            top: 0;
                                            background: rgba(242, 243, 245,.8);
                                            display: none;
                                            .btns{
                                                display: flex;
                                                align-items: center;
                                                height: 100%;
                                                justify-content: flex-end;
                                                padding-right: 20px;
                                                box-sizing: border-box;
                                            }
                                        }
                                    }
                                    &:hover .fileOptionShow{
                                        display: block;
                                    }
                                }
                            }
                        }
                    }
                }
            }

            .rightContainer {
                width: 15%;
                height: 100%;
                border-left: 1px solid #dcdcdc;
                padding: 20px;
                box-sizing: border-box;
                .rightFixedHead {
                    display: flex;
                    align-items: center;
                }
                .treePeopleWrap{
                    height: calc(~"100% - 60px");
                    box-sizing: border-box;
                    margin: 10px 0;
                    overflow-y: auto;
                }
            }
        }
    }

    .writeFooter {
        width: 100%;
        height: 64px;
        position: fixed;
        bottom: 0;
        background: #f2f3f5;
        box-sizing: border-box;

        .footerOption {
            padding: 16px 50px;
            box-sizing: border-box;
        }
    }
    .emailHeader {
        width: 100%;
        height: 64px;
        background: var(--backColor);
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-right: 20px;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 100;
        color: #fff;
        .emailLogo {
            width: 175px;
            height: 64px;
            display: flex;
            align-items: center;
            padding: 19px 25px;
            box-sizing: border-box;
            cursor: pointer;
            position: relative;
            color: #fff;

            &:hover {
                background: #fff;

                svg {
                    fill: var(--textColor);
                }

                color: var(--textColor);
            }

            svg {
                width: 26px;
                height: 26px;
            }

            .logoText {
                font-size: 20px;
                font-weight: bold;
                padding-left: 13px;
            }
        }

        .return {
            cursor: pointer;
        }
    }
    :deep .ant-tree-title{
            white-space: nowrap;
        }
    .userclass{
        .anticon-user{
            position: relative;
            top: -2px;
        }
        .ant-avatar{
            margin-right: 8px;
        }
        .anticon-check{
            position: relative;
            top: 10px;
        }
    }
</style>