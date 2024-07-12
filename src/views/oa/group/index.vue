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
                            <span>{{ text }}</span>
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
                            <div v-if="column.key=='AvatarImg'">
                                <img :src="text" alt="" class="group_list_avatar"/>
                            </div>
                            <div v-if="column.key=='Name'">
                                <a href="javascript:;" @click="handleDetail(record)" style="color:var(--textColor);">{{ text }}</a>
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
                dataIndex: 'AvatarImg',
                key: 'AvatarImg',
                width: 150
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
            },
            {
                title: '创建时间',
                dataIndex: 'CreatedOn',
                key: 'CreatedOn',
            },
            {
                title: '所有人',
                dataIndex: 'OwningUser',
                key: 'OwningUser',
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
            hideOnSinglePage:true,
            showSizeChanger:true,
            showQuickJumper:true,
            total:0,//数据总数
            pageSize:10,
            current:1,
            showTotal:((total)=>{
                return `共${total}条`
            })
        },
        tableHeight:0
    })
    const { treeData, pageNumber, pageSize, listData,
         searchVal, total, isLeft, selectedKeys, dataSource, columns, groupList,isCommon,recordId,objectTypeCode,sObjectName,isDelete,deleteDesc,external,pagination,tableHeight } = toRefs(data);
    
    const handleTreeSelect = (e) => {
        data.selectedKeys = e;
        getQuery();
    }
    const handleLeftShow = () => {
        data.isLeft = !data.isLeft;
    }
    const getQuery = () => {
        let filterQuery='';
        if(data.selectedKeys[0]=='owner'){
            filterQuery='\nOwningUser\teq-userid';
        }else if(data.selectedKeys[0]=='join'){
            filterQuery='';
        }else if(data.selectedKeys[0]=='public'){
            filterQuery='\nIsPublic\teq\ttrue';
        }
        // proxy.$get(Interface.user.groupList, {
        //     scope: data.selectedKeys[0],
        //     search: data.searchVal
        // }).then(res => {
        //     data.dataSource = res.listData;
        // })
        data.dataSource=[];
        data.pagination.total = 0;
        proxy.$post(Interface.list2, {
            filterId:'',
            objectTypeCode:data.objectTypeCode,
            entityName:data.sObjectName,
            filterQuery:filterQuery,
            search:data.searchVal||'',
            page: data.pagination.current,
            rows: data.pagination.pageSize,
            sort:'ImportSequenceNumber',
            order:'ASC',
            displayColumns:'Name,Quantity,CreatedOn,OwningUser,AvatarImg'
        }).then(res => {
            data.listData = res.nodes;
            data.total = res.pageInfo?res.pageInfo.total:0;
            data.pagination.total = res.pageInfo?res.pageInfo.total:0;
            var list = [];
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
                list.push(item)
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
    const handleDetail = (row) => {
        let GroupId = row.id;
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
        data.tableHeight = h-100;
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
</style>