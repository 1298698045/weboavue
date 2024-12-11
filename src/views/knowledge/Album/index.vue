<template>
    <div class="addressBook AlbumWrap">
        <div class="headerBar">
            <div class="headerLeft">
                <div class="icon-circle-base" style="background: #217346;">
                    <img :src="require('@/assets/img/rightMenu/xiaozu.png')" alt="">
                </div>
                <span class="headerTitle">相册文件</span>
            </div>
            <div class="headerRight">
                <a-upload v-model:file-list="fileList" action="#" :showUploadList="false" v-if="data.BreadCrumbList.length"
                
                >
                   <a-button class="ml10" type="primary" >上传照片</a-button>
                </a-upload>
                <a-button class="ml10" type="primary" @click="handleDepth('')" v-if="data.BreadCrumbList.length">设置权限</a-button>
                <a-button class="ml10" type="primary" @click="handleNew">新建相册</a-button>
                <!-- <a-dropdown class="ml10">
                    <template #overlay>
                        <a-menu @click="handleMenuClick">
                            <a-menu-item key="1">
                                看板
                            </a-menu-item>
                            <a-menu-item key="2">
                                列表
                            </a-menu-item>
                        </a-menu>
                    </template>
                    <a-button>
                        {{data.type==1?'看板':'列表'}}
                        <DownOutlined />
                    </a-button>
                </a-dropdown> -->
            </div>
        </div>
        <div class="todoListWrap">
            <div class="leftTree" v-if="isLeft">
                <div class="leftTreeWrap">
                    <a-tree :tree-data="treeData" block-node :selectedKeys="selectedKeys" @select="handleTreeSelect">
                        <template #title="{ text, key }">
                          <FolderOutlined v-if="text=='所有相册'" />
                          <UserOutlined v-if="text=='我创建的'" />
                          <ClockCircleOutlined v-if="text=='最近使用'" />
                          <FolderViewOutlined v-if="text=='时光轴'" />
                          <DeleteOutlined v-if="text=='回收站'" />
                            <span :key="key">{{ text }}</span>
                        </template>
                    </a-tree>
                </div>
            </div>
            <div class="rightContainer">
                <div class="sanlan" :class="{'active':!isLeft}" @click="handleLeftShow">
                    <!-- <span class="icon">
                        <LeftOutlined v-if="isLeft" />
                        <RightOutlined v-else />
                    </span> -->
                </div>
                <div class="head-right-breadcrumb">
                        <a-breadcrumb>
                          <a-breadcrumb-item><a href="javascript:void(0)" @click="tofolder('','')"><HomeOutlined style="margin-right: 5px;" /> 相册文件</a></a-breadcrumb-item>
                          <a-breadcrumb-item v-for="(item,index) in BreadCrumbList" :key="index"><a href="javascript:void(0)" @click="tofolder(item.id,item.name)">{{item.name||''}}</a></a-breadcrumb-item>
                        </a-breadcrumb>
                      </div>
                <div class="rightHeader">
                    <div class="lform">
                        <a-input-search
                            class="ml10"
                            v-model:value="searchVal"
                            placeholder="输入文件名称"
                            style="width: 200px;"
                            @search="onSearch"
                        />
                    </div>
                    <div class="rBtns">
                        <a-button class="ml10" type="primary" @click="onSearch">查询</a-button>
                        <a-button class="ml10" @click="onClear">重置</a-button>
                        <!-- <a-button class="ml10" type="primary">新建</a-button> -->
                    </div>
                </div>
                <div class="tableWrap" ref="tablelist">
                    <div class="card-content" v-show="data.type=='1'">
                        <div class="content-item" v-for="(item,index) in FolderList" :key="index" @click="tofolder(item.id,item.Name)">
                            <img :src="require('@/assets/img/filetype/Folder.png')" />
                            <div class="add-addtext" :title="item.Name">{{item.Name}}</div>
                            <div class="add-addtime">{{item.CreatedOn}}</div>
                            <div class="iconBox content-item-iconBox">
                                <div class="popup">
                                    <!-- <div class="option-item" @click="handleDetail(item.id)" :num="index">查看</div>  
                                    <div class="option-item" :num="index">重命名</div> -->
                                    <div class="option-item" @click.stop="handleEdit(item.id)">编辑</div>  
                                    <div class="option-item" @click.stop="handleDepth(item)">设置权限</div>
                                    <div class="option-item" @click.stop="handleDelete(item.id,'folder')">删除</div>
                                </div>
                                <svg class="moreaction" width="15" height="20" viewBox="0 0 520 520" fill="none" role="presentation" data-v-69a58868=""><path d="M83 140h354c10 0 17 13 9 22L273 374c-6 8-19 8-25 0L73 162c-7-9-1-22 10-22z" fill="#747474" data-v-69a58868=""></path></svg>
                            </div>
                        </div>
                        <div class="content-item" v-for="(item,index) in FileList" :key="index" @click="handleOpenFile(item)">
                            <img :src="item.ThumbnailUrl||require('@/assets/img/filetype/defaultImg.png')" />
                            <div class="add-addtext" :title="item.Name">{{item.Name}}</div>
                            <div class="add-addtime">{{item.CreatedOn}}</div>
                            <div class="iconBox content-item-iconBox">
                                <div class="popup">
                                    <div class="option-item" @click.stop="handleOpenFile(item)" :num="index">预览</div>
                                    <div class="option-item" @click.stop="handleDelete(item.id,'file')">删除</div>
                                    <!-- <div class="option-item" @click="handleDetail(item.id)" :num="index">查看</div>  
                                    <div class="option-item" @click="handleEdit(item.id)" :num="index">编辑</div>  
                                    <div class="option-item" :num="index">重命名</div>  
                                    <div class="option-item" :num="index" @click.stop="handleDepth(item)">设置权限</div>-->
                                </div>
                                <svg class="moreaction" width="15" height="20" viewBox="0 0 520 520" fill="none" role="presentation" data-v-69a58868=""><path d="M83 140h354c10 0 17 13 9 22L273 374c-6 8-19 8-25 0L73 162c-7-9-1-22 10-22z" fill="#747474" data-v-69a58868=""></path></svg>
                            </div>
                        </div>
                    </div>
                    <div class="empty" v-if="FolderList.length==0&&FileList.length==0">
                        <img
                        :src="require('@/assets/img/empty.png')"
                        alt=""
                        />
                        <p class="emptyDesc">当前暂无数据</p>
                    </div>
                    <a-table v-show="data.type=='2'" style="height: 100%;" :scroll="{ y:tableHeight }" :dataSource="FolderList" :columns="columns" :pagination="false" @change="handleTableChange">
                        <template #bodyCell="{ column, index,text, record }">
                          <template v-if="column.key === 'index'">
                              <div>
                                {{ index + 1 }}
                              </div>
                            </template>
                            <template v-if="column.key === 'checked'">
                              <div>
                                <a-checkbox v-model:checked="record.checked"></a-checkbox>
                              </div>
                            </template>
                            <div v-if="column.key=='Name'">
                              <div class="AlbumName">
                                <img :src="require('@/assets/img/filetype/Folder.png')" alt="" class="group_list_avatar"/>
                                <a href="javascript:;" @click="handleDetail(record.id)" style="color:var(--textColor);">{{ text }}</a>
                              </div>
                            </div>
                            <div v-if="column.key=='Action'">
                                <div class="iconBox">
                                    <div class="popup">
                                        <div class="option-item" @click="handleDetail(record.id)" :num="index">查看</div>  
                                        <div class="option-item" @click="handleEdit(record.id)" :num="index">编辑</div>  
                                        <div class="option-item" :num="index">重命名</div>  
                                        <div class="option-item" @click="handleDelete(record.id,'folder')" :num="index">删除</div>
                                        <div class="option-item" :num="index" @click.stop="handleDepth(record)">设置权限</div>  
                                    </div>
                                    <svg class="moreaction" width="15" height="20" viewBox="0 0 520 520" fill="none" role="presentation" data-v-69a58868=""><path d="M83 140h354c10 0 17 13 9 22L273 374c-6 8-19 8-25 0L73 162c-7-9-1-22 10-22z" fill="#747474" data-v-69a58868=""></path></svg>
                                </div>
                            </div>
                        </template>
                    </a-table>
                    <div class="pageWrap">
                        <a-pagination 
                        show-size-changer
                        show-quick-jumper
                        :pageSizeOptions="['10', '20', '50', '80', '100']"
                        :pageSize="pagination.pageSize"
                        @showSizeChange="sizeChange"
                        @change="handleTableChange" v-model:current="pagination.current" :total="pagination.total" :show-total="total => `共 ${total} 条`" />
                    </div>
                </div>
            </div>
        </div>
        <div class="loadingWrap" v-if="loading">
            <loading-outlined></loading-outlined>
            <span class="loadinglabel">正在加载中，请稍候...</span>
        </div>
        <common-form-modal :isShow="isCommon" v-if="isCommon" @cancel="isCommon=false" :title="data.recordId?'编辑':'新建'" @success="tofolder('','')" :id="recordId" :objectTypeCode="objectTypeCode" :entityApiName="sObjectName" :relatedObjectAttributeValue="relatedObjectAttributeValue" :relatedObjectAttributeName="relatedObjectAttributeName"></common-form-modal>
        <!-- <add-group :isShow="isCommon" v-if="isCommon" @cancel="handleCommonCancel" :title="recordId?'编辑':'新建'" @load="onSearch" :id="recordId" ></add-group> -->
        <Delete :isShow="isDelete" :desc="deleteDesc" @cancel="cancelDelete" @ok="onSearch" :sObjectName="sObjectName" :recordId="recordId" :objTypeCode="objectTypeCode" :external="external" />
        <NewDepth :isShow="isDepth" v-if="isDepth"  @cancel="isDepth=false" :id="data.SelectKey" :ObjectTypeCode="'100103'" :ObjectName="data.SelectName" />
        <!-- 图片预览 -->
        <PhotoPreview v-if="isPhoto" :isShow="isPhoto" :photoParams="photoParams" @cancel="isPhoto=false" />
    </div>
</template>
<script setup>
    import {
        ref, watch, reactive, toRefs, onMounted, getCurrentInstance, onUpdated, defineProps, defineExpose,
        defineEmits, h
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
    import { useRouter, useRoute } from "vue-router";
    import { HomeOutlined,SearchOutlined,UserOutlined, MoreOutlined, CopyOutlined, SortAscendingOutlined,LeftOutlined, RightOutlined, PlusOutlined, DownOutlined,FolderOutlined,ClockCircleOutlined,FolderViewOutlined,DeleteOutlined,LoadingOutlined } from "@ant-design/icons-vue";
    import Interface from "@/utils/Interface.js";
    import { formTreeData,girdFormatterValue } from "@/utils/common.js";
    import { message } from "ant-design-vue";
    import CommonFormModal from "@/components/listView/CommonFormModal.vue";
    import Delete from "@/components/listView/Delete.vue";
    import AddGroup from "@/components/groupDetail/AddGroup.vue";
    import NewDepth from "@/components/information/NewDepth.vue";
    import PhotoPreview from "@/components/file/PhotoPreview.vue";
    const tablelist=ref();
    const { proxy } = getCurrentInstance();
    const router = useRouter();
    const data = reactive({
        treeData: [
          {
            text: '所有相册',
            key: 'all'
        },
        {
            text: '我创建的',
            key: 'owner'
        },
        {
            text: '最近使用',
            key: 'join'
        },
        {
            text: '时光轴',
            key: 'timeline'
        },
        {
            text: '回收站',
            key: 'deleted'
        }
      ],
        pageNumber: 1,
        pageSize: 12,
        listData: [],
        searchVal: "",
        total: 0,
        isLeft: true,
        selectedKeys: ["all"],
        FolderList: [],
        FileList:[],
        columns: [
        {
            title: "序号",
            dataIndex: "index",
            key: "index",
            width: 70,
        },
        {
            title: "选择",
            dataIndex: "checked",
            key: "checked",
            width: 70,
        },
            {
                title: '文件名称',
                dataIndex: 'Name',
                key: 'Name',
            },
            {
                title: '大小',
                dataIndex: 'Quantity',
                key: 'Quantity',
                width: 200
            },
            {
                title: '创建时间',
                dataIndex: 'CreatedOn',
                key: 'CreatedOn',
                width: 200
            },
            {
                title: '修改时间',
                dataIndex: 'ModifiedOn',
                key: 'ModifiedOn',
                width: 200
            },
            {
                title: '创建人',
                dataIndex: 'CreatedBy',
                key: 'CreatedBy',
                width: 200
            },
            {
                title: '操作',
                dataIndex: 'Action',
                key: 'Action',
                width: 120
            },
        ],
        groupList: [],
        isCommon: false,
        recordId:'',
        objectTypeCode:'100103',
        sObjectName:'FileFolder',

        isDelete: false,
        deleteDesc: '确定要删除吗？',
        external:false,
        pagination:{
            hideOnSinglePage:false,
            showSizeChanger:true,
            showQuickJumper:true,
            total:0,//数据总数
            pageSize:10,
            current:1,
            pageSizeOptions: ['10', '20', '50', '100'],
            defaultPageSize: 10,
            showTotal:((total)=>{
                return `共${total}条`
            })
        },
        tableHeight:0,
        type:'1',
        BreadCrumbList:[],
        fileList:[],
        uploadFileList:[],
        relatedObjectAttributeValue:{value:'10010000-0000-0000-0000-000000000011',name:'相册文件'},
        relatedObjectAttributeName:'ParentId',
        loading:false,
        isDepth:false,
        SelectKey:'',
        SelectName:'',
        folderId:'',
        folderName:'',
        isPhoto: false,
        photoParams: {}
    })
    const { isPhoto,photoParams,uploadFileList,fileList,folderId,folderName,isDepth,SelectKey,SelectName,loading,relatedObjectAttributeValue,relatedObjectAttributeName,BreadCrumbList,FileList,type,treeData, pageNumber, pageSize, listData,
         searchVal, total, isLeft, selectedKeys, FolderList, columns, groupList,isCommon,recordId,objectTypeCode,sObjectName,isDelete,deleteDesc,external,pagination,tableHeight } = toRefs(data);
    
    const handleTreeSelect = (keys,{node}) => {
        if(keys&&keys.length){
            data.selectedKeys=keys;
        }
        data.pagination.current=1;
        getQuery();
    }
    const handleLeftShow = () => {
        data.isLeft = !data.isLeft;
    }
    const handleDepth= (item) => {
        if(item){
            data.SelectKey=item.id;
            data.SelectName=item.Name;
        }
        else{
            data.SelectKey=data.folderId;
            data.SelectName=data.folderName;
        }
        data.isDepth=true;
    }
    const getQuery = () => {
        data.loading=true;
        // let filterQuery='\nParentId\teq\t10010000-0000-0000-0000-000000000011';
        // if(data.selectedKeys[0]=='owner'){
        //     filterQuery='\nOwningUser\teq-userid';
        // }else if(data.selectedKeys[0]=='join'){
        //     filterQuery='';
        // }else if(data.selectedKeys[0]=='public'){
        //     filterQuery='\nIsPublic\teq\ttrue';
        // }
        data.FolderList=[];
        data.FileList=[];
        data.pagination.total = 0;
        let url=Interface.album.queryAlbums;
        if(data.selectedKeys[0]=='owner'){
            url=Interface.album.queryOwningAlbums;
        }
        let filterQuery='';
        if(data.folderId){
            //filterQuery='\nParentId\teq\t'+data.folderId;
            getFile();
            return
        }
        // if(data.searchVal){
        //     filterQuery='\nName\tcontains\t'+data.searchVal;
        // }
        let d = {
        actions:[{
            id: "4270;a",
            descriptor: "",
            callingDescriptor: "UNKNOWN",
            params: {
                pageSize: data.pagination.pageSize,
                pageNumber: data.pagination.current,
                search: data.searchVal||'',
                filterQuery: filterQuery,
                sort:'SortNumber',
                order:'ASC'
            }
        }]
    };
    let obj = {
        message: JSON.stringify(d)
    }
    proxy.$post(url,obj).then(res=>{
        if(res&&res.actions&&res.actions[0]&&res.actions[0].returnValue&&res.actions[0].returnValue&&res.actions[0].returnValue.nodes){
            let folder=res.actions[0].returnValue;
            data.listData = folder.nodes;
            data.total = folder.pageInfo?folder.pageInfo.total:0;
            data.pagination.total = folder.pageInfo?folder.pageInfo.total:0;
            let list = [];
            for (var i = 0; i < folder.nodes.length; i++) {
                let item = folder.nodes[i];
                for(var cell in item){
                    if(cell!='id'&&cell!='nameField'){
                        item[cell]=girdFormatterValue(cell,item);
                    }
                    if(cell=='CreatedOn'){
                        item[cell]=item[cell]?dayjs(item[cell]).format("YYYY-MM-DD"):'';
                    }
                }
                list.push(item)
            }
            data.FolderList = list;
            //getFile();
        }
    })
        // proxy.$post(Interface.list2, {
        //     filterId:'',
        //     objectTypeCode:'100200',
        //     entityName:'ItemTree',
        //     filterQuery:filterQuery,
        //     search:data.searchVal||'',
        //     page: data.pagination.current,
        //     rows: data.pagination.pageSize,
        //     sort:'SortNumber',
        //     order:'ASC',
        //     displayColumns:'Name,Quantity,CreatedOn,OwningUser'
        // }).then(res => {
        //     data.listData = res.nodes;
        //     data.total = res.pageInfo?res.pageInfo.total:0;
        //     data.pagination.total = res.pageInfo?res.pageInfo.total:0;
        //     var list = [];
        //     for (var i = 0; i < res.nodes.length; i++) {
        //         var item = res.nodes[i];
        //         for(var cell in item){
        //             if(cell!='id'&&cell!='nameField'){
        //                 item[cell]=girdFormatterValue(cell,item);
        //             }
        //             if(cell=='CreatedOn'){
        //                 //item[cell]=girdFormatterValue(cell,item)||require('@/assets/img/avatar-r.png');
        //                 item[cell]=item[cell]?dayjs(item[cell]).format("YYYY-MM-DD"):'';
        //             }
        //         }
        //         list.push(item)
        //     }
        //     data.FolderList = list;
        // })
        setTimeout(function(){
            data.loading=false;
        },500)
    }
    const getFile=()=>{
        if(data.folderId){
            let url=Interface.album.queryPhotos;            
            let d = {
            actions:[{
                id: "4270;a",
                descriptor: "",
                callingDescriptor: "UNKNOWN",
                params: {
                    pageSize: data.pagination.pageSize,
                    pageNumber: data.pagination.current,
                    search: data.searchVal||'',
                    albumId:data.folderId,
                    sort:'SortNumber',
                    order:'ASC'
                }
            }]
        };
        let obj = {
            message: JSON.stringify(d)
        }
        proxy.$post(url,obj).then(res=>{
            if(res&&res.actions&&res.actions[0]&&res.actions[0].returnValue&&res.actions[0].returnValue&&res.actions[0].returnValue.nodes){
                let file=res.actions[0].returnValue;
                data.listData = file.nodes;
                data.total = file.pageInfo?file.pageInfo.total:0;
                data.pagination.total = file.pageInfo?file.pageInfo.total:0;
                let list = [];
                for (var i = 0; i < file.nodes.length; i++) {
                    let item = file.nodes[i];
                    for(var cell in item){
                        if(cell!='id'&&cell!='nameField'){
                            item[cell]=girdFormatterValue(cell,item);
                        }
                        if(cell=='CreatedOn'){
                            item[cell]=item[cell]?dayjs(item[cell]).format("YYYY-MM-DD"):'';
                        }
                    }
                    list.push(item)
                }
                data.FileList = list;
            }
        })
        }
        setTimeout(function(){
            data.loading=false;
        },500)
    }
    const onSearch = (e)=> {
        data.pagination.current=1;
        getQuery();
    }
    const onClear = (e)=> {
        data.searchVal='';
        data.pagination.current=1;
        getQuery();
    }
    const handleMenuClick = (e) => {
        data.type=e.key;
        //console.log("e",e);
    }
    const handleDetail = (id) => {
      return
        let GroupId = id;
        let routeData = router.resolve({
            name: 'GroupDetail',
            query: {
                GroupId: GroupId
            }
        });
        window.open(routeData.href, '_blank');
    }
    //改变页码
    const handleTableChange=(page, pageSize)=>{
        data.pagination.current=page;
        data.pagination.pageSize=pageSize;
        getQuery();
    }
    const sizeChange=(current, size)=>{
        handleTableChange(current, size)
    }
    //新建
    const handleNew = (e) => {
      data.objectTypeCode='100103';
      data.sObjectName='FileFolder';
      data.recordId='';
      data.isCommon = true;
    }
    //编辑
    const handleEdit = (id) => {
      data.objectTypeCode='100103';
      data.sObjectName='FileFolder';
      data.recordId=id;
      data.isCommon = true;
    }
    // 通用弹窗关闭
    const handleCommonCancel = (params) => {
        data.isCommon=false;
    };
    //删除
    const handleDelete = (id,type) => {
        data.recordId=id;
        if(type=='folder'){
            data.objectTypeCode='100103';
            data.sObjectName='FileFolder';
        }
        else{
            data.objectTypeCode='100100';
            data.sObjectName='File';
        }
        data.isDelete = true;
    }
    //删除关闭
    const cancelDelete = (e) => {
        data.isDelete = false;
    };
    onMounted(() => {
        getQuery();
        let h = tablelist.value.clientHeight;
        data.tableHeight = h-80-20;
    })
    const tofolder = (id,name) => {
        data.folderId=id;
        data.folderName=name;
        CreatedBreadCrumb(id,name);
        data.pagination.current=1;
        getQuery();
    };
    const handleOpenFile = (item) => {
        if(item){
            data.photoParams = item;
            data.isPhoto = true;
        }
    };
  const CreatedBreadCrumb=(id,name)=>{
    data.SelectKey=id
    data.SelectName=name
    if(id){
        if((JSON.stringify(data.BreadCrumbList)).indexOf(id)!=-1){
            data.BreadCrumbList=(data.BreadCrumbList).slice(0,(JSON.stringify(data.BreadCrumbList)).indexOf(id)+1)
        }
        else{
            data.BreadCrumbList.push({
                id:id,
                name:name
            })
        }
    }
    else{
      data.BreadCrumbList=[];
    }
  }
</script>
<style lang="less" scoped>
    @import "@/style/addressBook.less";
    .rightContainer{
        .rightHeader{
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin: 20px 0;
        }
        .tableWrap{
            height: calc(~"100% - 80px");
        }
    }
    .group_list_avatar{
        height: 40px;
    }
    .addressBook{
        :deep .ant-table-tbody .ant-table-cell{
            padding: 8px 16px !important;
        }
        .group_list_avatar{
            position: relative;
            top: 4px;
        }
        .iconBox .moreaction {
            padding: 0px 1px;
            width: 18px;
            border: 1px solid #dedede;
            border-radius: 4px;
            position: relative;
            top: 1px;
        }
        .iconBox .popup{
            top: 25px;
            right: 0;
            width: max-content;
            min-width: 88px;
        }

        :deep .ant-table-wrapper .ant-table-thead >tr>th{
        background-color: #f7fbfe !important;
        padding: 8.5px 16px !important;
        }
        :deep .ant-table-tbody tr:hover,:deep .ant-table-tbody tr:hover td{
        background-color: #e9f7ff !important;
        color: #108def !important;
        }
        :deep .ant-table-tbody tr:nth-child(odd) {
        background-color: rgb(250, 250, 250) !important; /* 奇数行背景色 */
        }
        :deep .ant-table-tbody tr:nth-child(even) {
        background-color: #fff !important; /* 偶数行背景色 */
        }
        :deep .ant-pagination{
            .ant-pagination-item{
                border: 1px solid #d9d9d9;
            }
            .ant-pagination-item:hover{
                border: 1px solid #1677ff;
                background: #fff !important;
            }
            .ant-pagination-item-active,.ant-pagination-item-active:hover{
                border: 1px solid #1677ff;
                background: #1677ff !important;
                a{
                    color: #fff;
                }
            }
        } 
    }
    .AlbumWrap{
      .AlbumName{
        display: flex;
        align-items: center;
      }
      .group_list_avatar{
        height: 35px;
        margin-right: 10px;
        top: 0;
      }
      .todoListWrap .leftTree{
        width: 180px;
      }
      :deep .ant-tree .ant-tree-treenode{
        height: 40px;
        line-height: 40px;
        display: block;
        padding-left: 10px !important;
        margin-bottom: 4px;
      }
      :deep .ant-tree .ant-tree-treenode-selected .ant-tree-title{
        color: #018efb !important;
      }
      :deep .ant-tree-title .anticon{
        font-size: 15px;
        margin-right: 5px;
      }
      .card-content{
        overflow: auto;
        height: 100%;
      }
      .content-item {
          font-size: 12px;
          float: left;
          text-align: center;
          margin: 10px;
          border: 1px solid #fff;
          border-color: transparent;
          padding: 30px 30px;
          width: 200px;
          cursor: pointer;
          &:hover{
            background: rgba(242, 243, 245, 1);
            .content-item-iconBox{
                visibility:visible;
            }
          }
      }
      .content-item img {
          width: 96px;
      }
      .add-addtext {
          margin-top: 5px;
          white-space: nowrap;
          position: relative;
          width: 100%;
          left: 0;
          overflow: hidden;
          text-overflow: ellipsis;
          font-size: 15px;
          font-weight: bold;
      }
      .add-addtime{
          margin-top: 8px;
          white-space: nowrap;
          position: relative;
          width: 100%;
          left: 0;
          overflow: hidden;
          text-overflow: ellipsis;
          font-size: 14px;
          color: rgba(134, 144, 156, 1);
      }
      .head-right-breadcrumb{
        border-bottom: 1px solid #dedede;
        padding: 10px;
        position: relative;
        padding-bottom: 9px;
        margin: 0 15px;
      }
      .todoListWrap .rightContainer{
        padding: 0;
        padding-bottom: 10px;
      }
      .rightContainer .rightHeader{
        margin: 18px 10px 18px 10px;
        .rBtns{
            margin-right: 10px;
        }
      }
      .content-item{
        padding: 25px 30px;
        margin: 0 20px;
        position: relative;
        .content-item-iconBox{
            visibility: hidden;
            position: absolute;
            top: 12px;
            right: 12px;
            .popup{
                text-align: left;
                top: 20px;
            }
        }
      }
      .rightContainer .tableWrap{
        height: calc(~'100% - 95px');
        position: relative;
        .card-content{
            padding-bottom: 15px;
        }
      }
      .empty{
        width: 100%;
        height: auto;
        position: absolute;
        top: 20%;
        z-index: 1;
        color: #999;
        left: 0;
        text-align: center;
        img{
            width: 170px;
        }
      }
      .pageWrap{
        text-align: right;
        padding: 15px;
      }
      .ant-pagination{
            .ant-pagination-item{
                border: 1px solid #d9d9d9;
            }
            .ant-pagination-item:hover{
                border: 1px solid #1677ff;
                background: #fff !important;
            }
            .ant-pagination-item-active,.ant-pagination-item-active:hover{
                border: 1px solid #1677ff;
                background: #1677ff !important;
                a{
                    color: #fff;
                }
            }
        } 
        .card-content{
            height: calc(~'100% - 70px');
        }
    }
    .loadingWrap{
        width: 100%;
        left: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 40px;
        color: #fff;
        position: fixed;
        top: 0;
        z-index: 1000;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.45);
        .loadinglabel{
            font-size: 22px;
            margin-left: 25px;
        }
    }
</style>