<template>
    <div class="addressBook">
        <div class="headerBar">
            <div class="headerLeft">
                <div class="icon-circle-base" style="background: #217346;">
                    <img :src="require('@/assets/img/rightMenu/xiaozu.png')" alt="">
                </div>
                <span class="headerTitle">小组</span>
            </div>
            <div class="headerRight">
                <a-button class="ml10" type="primary" @click="handleNew">新建</a-button>
            </div>
        </div>
        <div class="todoListWrap">
            <div class="leftTree" v-if="isLeft">
                <div class="leftTreeWrap">
                    <a-tree :tree-data="treeData" block-node :selectedKeys="selectedKeys" @select="handleTreeSelect">
                        <template #title="{ text, key }">
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
                <div class="rightHeader">
                    <div class="lform">
                        <a-input-search
                            class="ml10"
                            v-model:value="searchVal"
                            placeholder="搜索此列表"
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
                    <a-table style="height: 100%;" :scroll="{ y:tableHeight }" :dataSource="dataSource" :columns="columns" :pagination="data.pagination" @change="handleTableChange">
                        <template #bodyCell="{ column, text, record }">
                            <div v-if="column.key=='AvatarUrl'">
                                <img :src="record.AvatarUrl?Interface.viewAvatar+'/Group/'+record.id:defaultImg" :on-error="defaultImg" alt="" class="group_list_avatar"/>
                            </div>
                            <div v-if="column.key=='Name'">
                                <a href="javascript:;" @click="handleDetail(record.id)" style="color:var(--textColor);">{{ text }}</a>
                            </div>
                            <div v-if="column.key=='Action'">
                                <div class="iconBox">
                                    <div class="popup">
                                        <div class="option-item" @click="handleDetail(record.id)" :num="index">查看</div>  
                                        <div class="option-item" @click="handleEdit(record.id)" :num="index">编辑</div>  
                                        <div class="option-item" @click="handleDelete(record.id)" :num="index">删除</div>
                                    </div>
                                    <svg class="moreaction" width="15" height="20" viewBox="0 0 520 520" fill="none" role="presentation" data-v-69a58868=""><path d="M83 140h354c10 0 17 13 9 22L273 374c-6 8-19 8-25 0L73 162c-7-9-1-22 10-22z" fill="#747474" data-v-69a58868=""></path></svg>
                                </div>
                            </div>
                        </template>
                    </a-table>
                </div>
            </div>
        </div>
        <!-- <common-form-modal :isShow="isCommon" v-if="isCommon" @cancel="handleCommonCancel" :title="recordId?'编辑':'新建'" @load="onSearch" :id="recordId" :objectTypeCode="objectTypeCode" :entityApiName="sObjectName"></common-form-modal> -->
        <add-group :isShow="isCommon" v-if="isCommon" @cancel="handleCommonCancel" :title="recordId?'编辑':'新建'" @load="onSearch" :id="recordId" ></add-group>
        <Delete :isShow="isDelete" :desc="deleteDesc" @cancel="cancelDelete" @ok="onSearch" :sObjectName="sObjectName" :recordId="recordId" :objTypeCode="objectTypeCode" :external="external" />
    </div>
</template>
<script setup>
    import {
        ref, watch, reactive, toRefs, onMounted, getCurrentInstance, onUpdated, defineProps, defineExpose,
        defineEmits, h
    } from "vue";
    import { useRouter, useRoute } from "vue-router";
    import { SearchOutlined, MoreOutlined, CopyOutlined, SortAscendingOutlined,LeftOutlined, RightOutlined, PlusOutlined } from "@ant-design/icons-vue";
    import Interface from "@/utils/Interface.js";
    import { formTreeData,girdFormatterValue } from "@/utils/common.js";
    import { message } from "ant-design-vue";
    //import CommonFormModal from "@/components/listView/CommonFormModal.vue";
    import Delete from "@/components/listView/Delete.vue";
    import AddGroup from "@/components/groupDetail/AddGroup.vue";
    const tablelist=ref();
    const { proxy } = getCurrentInstance();
    const router = useRouter();
    const data = reactive({
        treeData: [{
            text: '我的小组',
            key: 'owner'
        },
        {
            text: '活动小组',
            key: 'join'
        },
        {
            text: '公共小组',
            key: 'public'
        }],
        pageNumber: 1,
        pageSize: 12,
        listData: [],
        searchVal: "",
        total: 0,
        isLeft: true,
        selectedKeys: ["owner"],
        dataSource: [],
        columns: [
            {
                title: '头像',
                dataIndex: 'AvatarUrl',
                key: 'AvatarUrl',
                width: 120
            },
            {
                title: '名称',
                dataIndex: 'Name',
                key: 'Name',
            },
            {
                title: '成员人数',
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
                title: '所有人',
                dataIndex: 'OwningUser',
                key: 'OwningUser',
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
        objectTypeCode:'9',
        sObjectName:'Group',
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
            showTotal:((total)=>{
                return `共${total}条`
            })
        },
        tableHeight:0,
        defaultImg:require('@/assets/img/avatar-r.png')
    })
    const { treeData, pageNumber, pageSize, listData,defaultImg,
         searchVal, total, isLeft, selectedKeys, dataSource, columns, groupList,isCommon,recordId,objectTypeCode,sObjectName,isDelete,deleteDesc,external,pagination,tableHeight } = toRefs(data);
    
    const handleTreeSelect = (keys,{node}) => {
        if(keys&&keys.length){
            data.selectedKeys=keys;
        }
        getQuery();
    }
    const handleLeftShow = () => {
        data.isLeft = !data.isLeft;
    }
    const getQuery = () => {
        let url=Interface.list2;
        let d={
            filterId:'',
            objectTypeCode:data.objectTypeCode,
            entityName:data.sObjectName,
            filterQuery:'',
            search:data.searchVal||'',
            page: data.pagination.current,
            rows: data.pagination.pageSize,
            sort:'ImportSequenceNumber',
            order:'ASC',
            displayColumns:'Name,Quantity,CreatedOn,OwningUser,AvatarUrl'
        }
        if(data.selectedKeys[0]=='owner'){
            //d.filterQuery='\nOwningUser\teq-userid';
            url=Interface.group.getOwningGroups;
            d = {
                search:data.searchVal||'',
                page: data.pagination.current,
                rows: data.pagination.pageSize,
                sort:'ImportSequenceNumber',
                order:'ASC',
            }
        }else if(data.selectedKeys[0]=='join'){
            //d.filterQuery='';
            url=Interface.group.getJointGroups;
            d = {
                search:data.searchVal||'',
                page: data.pagination.current,
                rows: data.pagination.pageSize,
                sort:'ImportSequenceNumber',
                order:'ASC',
            }
        }else if(data.selectedKeys[0]=='public'){
            d.filterQuery='\nIsPublic\teq\ttrue';
        }
        data.dataSource=[];
        data.pagination.total = 0;
        proxy.$post(url,d).then(res => {
            let list = [];
            if(res&&res.nodes&&data.selectedKeys[0]=='public'){
                //data.listData = res.nodes;
                //data.total = res.pageInfo?res.pageInfo.total:0;
                data.pagination.total = res.pageInfo?res.pageInfo.total:0;
                for (var i = 0; i < res.nodes.length; i++) {
                    var item = res.nodes[i];
                    for(var cell in item){
                        if(cell!='id'&&cell!='nameField'){
                            item[cell]=girdFormatterValue(cell,item);
                        }
                    }
                    if(!item.AvatarUrl){
                        item.AvatarUrl=item.avatarUrl;
                    }
                    list.push(item)
                }
            }
            else if(res&&res.actions&&res.actions[0]&&res.actions[0].returnValue&&data.selectedKeys[0]!='public'){
                data.pagination.total = res.actions[0].returnValue.length||0;
                for (var i = 0; i < res.actions[0].returnValue.length; i++) {
                    var item = res.actions[0].returnValue[i];
                    if(!item.AvatarUrl){
                        item.AvatarUrl=item.avatarUrl;
                    }
                    item.id=item.groupId;
                    item.Name=item.name;
                    item.Quantity=item.quantity;
                    item.CreatedOn=item.createdOn;
                    item.OwningUser=item.owningUserName;
                    list.push(item)
                }
            }
            data.dataSource = list;
        })
    }
    getQuery();
    const onSearch = (e)=> {
        getQuery();
    }
    const onClear = (e)=> {
        data.searchVal='';
        getQuery();
    }
    const handleMenuClick = (e) => {
        console.log("e",e);
    }
    const handleDetail = (id) => {
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
    const handleTableChange=(pag, filters, sorter)=>{
      data.pagination.current=pag.current;
      getQuery();
    }
    //新建
    const handleNew = (e) => {
      data.recordId='';
      data.isCommon = true;
    }
    //编辑
    const handleEdit = (key) => {
      console.log(key,2222222)
      data.recordId=key;
      data.isCommon = true;
    }
    // 通用弹窗关闭
    const handleCommonCancel = (params) => {
        data.isCommon=false;
    };
    //删除
    const handleDelete = (key) => {
        data.recordId=key;
        data.isDelete = true;
    }
    //删除关闭
    const cancelDelete = (e) => {
        data.isDelete = false;
    };
    onMounted(() => {
        let h = tablelist.value.clientHeight;
        data.tableHeight = h-80;
    })
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
    
</style>