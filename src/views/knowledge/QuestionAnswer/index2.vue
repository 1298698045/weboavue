<template>
    <div class="CommunityCommentWrap">
        <div class="mainContent">
            <div class="leftContent">
                <div class="panel panel0">
                    <div class="panel-head">
                        <div class="panel-title">
                            社区状态
                        </div>
                        <div class="panel-btn">
                        </div>
                    </div>
                    <div class="panel-bd">
                        <div class="left-menu">
                            <div class="left-menu-item" :class="{'left-menu-item-active':data.selectmenu==1}" @click="changeMenu(1)">
                                <span class="left-menu-item-icon"><BarsOutlined /></span><span class="left-menu-item-label">全部状态</span>
                            </div>
                            <div class="left-menu-item" :class="{'left-menu-item-active':data.selectmenu==2}" @click="changeMenu(2)">
                                <span class="left-menu-item-icon"><UserOutlined /></span><span class="left-menu-item-label">我的状态</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="middleContent">
                <div class="panel panel1">
                    <div class="panel-bd">
                        <div class="panelCommunityCommentWrap">
                            <div class="commentBox commentBox0">
                                <!-- <div class="leftAvatar">
                                    <a-avatar :size="37">
                                        <template #icon><UserOutlined /></template>
                                    </a-avatar>
                                </div>
                                <div class="rightTextare">
                                    <textarea class="textarea" v-model="comment" placeholder-class="placeholder" placeholder="您想知道什么？" name="" id="" cols="30" rows="10"></textarea>
                                </div> -->
                                <div class="tabContainer">
                                <a-tabs v-model:activeKey="activeKey" @change="changeTab">
                                    <!-- <a-tab-pane key="6000" tab="状态"></a-tab-pane> -->
                                    <a-tab-pane key="0" tab="状态"></a-tab-pane>
                                    <a-tab-pane key="30400" tab="投票"></a-tab-pane>
                                    <a-tab-pane key="1" tab="问题"></a-tab-pane>
                                    <!-- <a-tab-pane key="30401" tab="问题"></a-tab-pane> -->
                                </a-tabs>
                                </div>
                                <div class="TEditorWrap CommentWrap" v-if="activeKey=='6000'||activeKey=='0'">
                                <TEditor
                                ref="editorRef"
                                    :placeholder="'有什么新鲜事想分享给大家?'"
                                    @input="getInputContent"
                                    :height="230"
                                />
                                </div>
                                <div class="VoteWrap" v-if="activeKey=='30400'">
                                    <div class="VoteLabel">问题</div>
                                    <a-textarea class="Votetextarea" v-model:value="data.comment" placeholder="您想提问什么？" :rows="3"></a-textarea>
                                    <template v-for="(item,index) in VoteOptions" :key="index">
                                        <div class="VoteLabel">选项{{index+1}}</div>
                                        <a-input class="VoteInput" v-model:value="item.name"></a-input>
                                    </template>
                                </div>
                                <div class="TEditorWrap QuestionWrap" v-if="activeKey=='30401'||activeKey=='1'">
                                    <div class="QuestionLabel">问题</div>
                                    <a-textarea class="Votetextarea" v-model:value="data.comment" placeholder="您想知道什么？" :rows="3"></a-textarea>
                                    <div class="QuestionLabel">详细信息</div>
                                    <TEditor
                                        :placeholder="'如果您还需要补充，请在此处添加一些细节...'"
                                        :height="230"
                                    />
                                </div>
                            </div>
                            <div class="optionalWrap">
                                <a-button type="primary" class="optionalWrapLeft" @click="addQuestionOption" v-if="activeKey=='30400'"><PlusOutlined />添加新选项</a-button>
                                <a-button type="primary" class="optionalWrapRight" @click="handleSendComment" :disabled="!data.comment">发布</a-button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="panel panel2">
                    <!-- <div class="panel-head">
                        <div class="panel-title">
                        </div>
                        <div class="panel-btn">
                        </div>
                    </div> -->
                    <div class="panel-bd">
                        <div class="panelCommunityCommentWrap">
                            <div class="commentSearch">
                                <div class="wea-left-tree-search">
                                    <a-input
                                    v-model:value="searchVal"
                                    placeholder="搜索状态"
                                    @change="onSearch"
                                    allowClear
                                    />
                                    <div class="wea-left-tree-search-icon">
                                        <SearchOutlined />
                                    </div>
                                </div>
                            </div>
                            <div class="commentList">
                                <div class="commentItemBox" v-for="(item,index) in listData" :key="index">
                                    <div class="leftAvatar">
                                        <a-avatar :size="37">
                                            <template #icon><UserOutlined /></template>
                                            <!-- <img :src="item.ImageUrls" alt="" class="commentAvatar" /> -->
                                        </a-avatar>
                                    </div>
                                    <div class="rightComment">
                                        <div class="commentName">{{item.OwningUser||'暂无'}}</div>
                                        <div class="commentTime">
                                            {{item.CreatedOn}}
                                        </div>
                                        <div class="commentMore">
                                            <a-dropdown :trigger="['hover']" class="ml10">
                                                <span class="btn-drop">
                                                    <MoreOutlined />
                                                </span>
                                                <template #overlay>
                                                <a-menu>
                                                    <a-menu-item v-if="item.OwningUserId&&data.OwningUser&&data.OwningUser==item.OwningUserId" @click="handleDelete(item.id,1,'')">
                                                        <DeleteOutlined /><span class="a-menu-item-label">删除</span>
                                                    </a-menu-item>
                                                </a-menu>
                                                </template>
                                            </a-dropdown>
                                        </div>
                                        <div class="commentContent" v-html="item.Description||'暂无'"></div>
                                        <div class="commentBtn">
                                            <!-- <span class="deleteComment" @click="handleDelete(item.id)">删除</span> -->
                                            <!-- <span class="commentBtn-item" title="删除" v-if="item.OwningUserId&&data.OwningUser&&data.OwningUser==item.OwningUserId" @click="handleDelete(item.id)" ><DeleteOutlined /></span> -->
                                            <span class="commentBtn-item" title="分享" ><ExportOutlined /><span>{{ item.NumOfForward||0 }}</span></span>
                                            <span class="commentBtn-item" title="评论" v-if="!item.IsShowReply" @click="item.IsShowReply=true;getCommentList1(item.id,item)"><MessageOutlined /><span>{{ item.NumOfComment||0 }}</span></span>
                                            <span class="commentBtn-item" title="评论" v-if="item.IsShowReply" @click="item.IsShowReply=false" style="color: #1677ff;"><MessageOutlined /><span>{{ item.NumOfComment||0 }}</span></span>
                                            <span class="commentBtn-item" title="点赞" v-if="!item.IsLike" @click="item.IsLike=true;item.NumOfLike=1"><LikeOutlined /><span>{{ item.NumOfLike||0 }}</span></span>
                                            <span class="commentBtn-item" title="取消点赞" v-if="item.IsLike" @click="item.IsLike=false;item.NumOfLike=0" style="color: red;"><LikeFilled /><span>{{ item.NumOfLike||0 }}</span></span>
                                        </div>
                                        <div class="commentReply" v-if="item.IsShowReply">
                                            <div class="commentBox">
                                                <div class="leftAvatar">
                                                    <a-avatar :size="37">
                                                        <template #icon><UserOutlined /></template>
                                                        <!-- <img :src="require('@/assets/img/avatar-r.png')" alt="" class="commentAvatar" /> -->
                                                    </a-avatar>
                                                </div>
                                                <div class="rightTextare">
                                                    <textarea class="textarea" v-model="item.comment" placeholder-class="placeholder" placeholder="" name="" id="" cols="30" rows="3"></textarea>
                                                </div>
                                            </div>
                                            <div class="optionalWrap">
                                                <a-button type="primary" @click="handleSendComment1(item,item)">发布</a-button>
                                            </div>
                                            <div class="commentList">
                                                <div class="commentItemBox" v-for="(item1,index1) in listData1[item.id]" :key="index1">
                                                    <div class="leftAvatar">
                                                        <a-avatar :size="37">
                                                            <template #icon><UserOutlined /></template>
                                                            <!-- <img :src="item1.ImageUrls" alt="" class="commentAvatar" /> -->
                                                        </a-avatar>
                                                    </div>
                                                    <div class="rightComment">
                                                        <div class="commentName">{{item1.Title||item1.OwningUser||'暂无'}}</div>
                                                        <div class="commentTime">
                                                            {{item1.CreatedOn}}
                                                        </div>
                                                        <div class="commentContent">{{item1.Description||'暂无'}}</div>
                                                        <div class="commentBtn">
                                                            <span class="commentBtn-item" title="删除" v-if="item1.OwningUserId&&data.OwningUser&&data.OwningUser==item1.OwningUserId" @click="handleDelete(item1.id,2,item)" ><DeleteOutlined /></span>
                                                            <span class="commentBtn-item" title="回复" v-if="!item1.IsShowReply" @click="item1.IsShowReply=true"><MessageOutlined /><span></span></span>
                                                            <span class="commentBtn-item" title="回复" v-if="item1.IsShowReply" @click="item1.IsShowReply=false" style="color: #1677ff;"><MessageOutlined /><span></span></span>
                                                            <span class="commentBtn-item" title="点赞" v-if="!item1.IsLike" @click="item1.IsLike=true;item1.NumOfLike=1"><LikeOutlined /><span>{{ item1.NumOfLike||0 }}</span></span>
                                                            <span class="commentBtn-item" title="取消点赞" v-if="item1.IsLike" @click="item1.IsLike=false;item1.NumOfLike=0" style="color: red;"><LikeFilled /><span>{{ item1.NumOfLike||0 }}</span></span>
                                                        </div>
                                                        <div class="commentReply" v-if="item1.IsShowReply">
                                                            <div class="commentBox">
                                                                <div class="leftAvatar">
                                                                    <a-avatar :size="37">
                                                                        <template #icon><UserOutlined /></template>
                                                                        <!-- <img :src="require('@/assets/img/avatar-r.png')" alt="" class="commentAvatar" /> -->
                                                                    </a-avatar>
                                                                </div>
                                                                <div class="rightTextare">
                                                                    <textarea class="textarea" v-model="item1.comment" placeholder-class="placeholder" placeholder="" name="" id="" cols="30" rows="3"></textarea>
                                                                </div>
                                                            </div>
                                                            <div class="optionalWrap">
                                                                <a-button type="primary" @click="handleSendComment1(item,item1)">回复</a-button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- <div class="pagination">
                                <a-pagination
                                show-size-changer
                                show-quick-jumper
                                :pageSizeOptions="['10', '20', '50', '80', '100']"
                                :pageSize="rows"
                                @showSizeChange="sizeChange"
                                v-model:current="page" :total="total" @change="ChangePage" :show-total="total => `共 ${total} 条`" />
                            </div> -->
                        </div>
                    </div>
                </div>
            </div>
            <div class="rightContent">
                <div class="panel panel3">
                    <div class="panel-head">
                        <div class="panel-title">
                            标签
                        </div>
                        <div class="panel-btn">
                        </div>
                    </div>
                    <div class="panel-bd">
                        <div class="tag-container">
                            <div class="labCls" id="asklabeid_10" @click="loadQuestionData('服务业');">
                                <a href="javascript:void(0);" class="" title="服务业">服务业</a>
                            </div>
                            <div class="labCls" id="asklabeid_9" @click="loadQuestionData('房地产');">
                                <a href="javascript:void(0);" class="" title="房地产">房地产</a>
                            </div>
                            <div class="labCls" id="asklabeid_8" @click="loadQuestionData('电讯业');">
                                <a href="javascript:void(0);" class="" title="电讯业">电讯业</a>
                            </div>
                            <div class="labCls" id="asklabeid_7" @click="loadQuestionData('宾馆');">
                                <a href="javascript:void(0);" class="" title="宾馆">宾馆</a>
                            </div>
                            <div class="labCls" id="asklabeid_6" @click="loadQuestionData('餐饮');">
                                <a href="javascript:void(0);" class="" title="餐饮">餐饮</a>
                            </div>
                            <div class="labCls" id="asklabeid_5" @click="loadQuestionData('能源');">
                                <a href="javascript:void(0);" class="" title="能源">能源</a>
                            </div>
                            <div class="labCls" id="asklabeid_4" @click="loadQuestionData('采矿');">
                                <a href="javascript:void(0);" class="" title="采矿">采矿</a>
                            </div>
                            <div class="labCls" id="asklabeid_3" @click="loadQuestionData('保险业');">
                                <a href="javascript:void(0);" class="" title="保险业">保险业</a>
                            </div>
                            <div class="labCls" id="asklabeid_2" @click="loadQuestionData('互联网');">
                                <a href="javascript:void(0);" class="" title="互联网">互联网</a>
                            </div>
                            <div class="labCls" id="asklabeid_1" @click="loadQuestionData('制造业');">
                                <a href="javascript:void(0);" class="" title="制造业">制造业</a>
                            </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="loadingWrap" v-if="loading">
            <loading-outlined></loading-outlined>
            <span class="loadinglabel">正在加载中，请稍候...</span>
        </div>
        <Delete :isShow="isDelete" :desc="deleteDesc" :sObjectName="sObjectName" :recordId="recordId" :objTypeCode="objectTypeCode" :external="external" @cancel="closeDelete" @ok="deleteOk" />
    </div>
</template>
<script setup>
    import { ref, reactive, onMounted, toRefs, getCurrentInstance, defineEmits, toRaw, defineProps } from "vue";
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
    import { UserOutlined,LikeOutlined,DeleteOutlined,ExportOutlined,MessageOutlined,BarsOutlined,MoreOutlined,SearchOutlined,LikeFilled,LoadingOutlined,PlusOutlined } from "@ant-design/icons-vue";
    import { notification } from 'ant-design-vue';
    import Interface from "@/utils/Interface.js";
    import { girdFormatterValue } from "@/utils/common.js";
    import { message } from "ant-design-vue";
    import Delete from "@/components/listView/Delete.vue";
    import TEditor from "@/components/TEditor.vue";
    const { proxy } = getCurrentInstance();
    const props = defineProps({
        title:String,
        id:String,
        RegardingObjectTypeCode:String
    })
    const editorRef = ref();
    const data = reactive({
        listData: [],
        listData1:{},
        page: 1,
        rows: 10,
        total: 0,
        comment: "",
        activeKey:'0',
        searchVal:"",
        isDelete: false,
        recordId:'',
        objectTypeCode:'6000',
        sObjectName:'Chatter',
        deleteDesc: '确定要删除吗？',
        external:false,
        OwningUser:'',
        OwningUserName:'',
        id:'',
        keyIndex:1,
        selectmenu:1,
        type:1,
        typeitem:'',
        loading:false,
        VoteOptions:[
            {
                name:'',
                displayOrder:1
            },
            {
                name:'',
                displayOrder:2
            },
            {
                name:'',
                displayOrder:3
            },
        ]
    })
    const { VoteOptions,activeKey,loading,typeitem,type,OwningUserName,listData1,selectmenu,keyIndex,listData, page, rows, total, comment,searchVal,isDelete,recordId,objectTypeCode,sObjectName,deleteDesc,external } = toRefs(data);
    const changeMenu=(e)=>{
        data.selectmenu=e;
        data.keyIndex=1;
        getCommentList();
    }
    const getCommentList = () => {
        data.loading=true;
        // proxy.$get(Interface.commentList,{
        //     meetingid:"4c51a922-8762-40ae-9e10-5e1fa3f51a60",
        //     page: page,
        //     rows: rows
        // }).then(res=>{
        //     data.listData = res.rows;
        //     data.total = res.total;
        // })
        //data.listData = [];
        if(data.keyIndex){}else{return false}
        if(data.keyIndex==1){
            data.listData = [];
        }
        data.total = 0;
        let filterQuery='\nRegardingObjectTypeCode\teq\t6000';
        if(data.searchVal){
            filterQuery+='\nDescription\tcontains\t'+data.searchVal;
        }
        if(data.selectmenu==2){
            filterQuery+='\nOwningUser\teq\t'+data.OwningUser;
        }
        // proxy.$post(Interface.list2, {
        //     filterId:'',
        //     objectTypeCode:'6000',
        //     entityName:'Chatter',
        //     filterQuery:filterQuery,
        //     search:'',
        //     page: data.keyIndex,
        //     rows: 10,
        //     sort:'CreatedOn',
        //     order:'desc',
        //     displayColumns:'OwningUser,CreatedOn,Description,NumOfComment,NumOfLike,ImageUrls'
        // }).then(res => {
        //     var list = [];
        //     data.total = res.pageInfo?res.pageInfo.total:0;
        //     for (var i = 0; i < res.nodes.length; i++) {
        //         var item = res.nodes[i];
        //         for(var cell in item){
        //             if(cell!='id'&&cell!='nameField'&&cell!='ImageUrls'){
        //                 if(cell=='OwningUser'){
        //                     item['OwningUserId']=item[cell].userValue.Value;
        //                     if(item['OwningUserId']){
        //                         item['OwningUserId']=(item['OwningUserId']).toUpperCase();
        //                     }
        //                 }
        //                 item[cell]=girdFormatterValue(cell,item);
        //             }
        //             if(cell=='ImageUrls'){
        //                 item[cell]=girdFormatterValue(cell,item)||require('@/assets/img/avatar-r.png');
        //             }
        //             if(cell=='CreatedOn'){
        //                 item[cell]=item[cell]?dayjs(item[cell]).format("YYYY-MM-DD HH:mm"):'';
        //             }
        //         }
        //         list.push(item)
        //     }
        //     if(list&&list.length){
        //         data.listData = data.listData.concat(list);
        //     }
        // })
        filterQuery='\nChatterTypeCode\teq\t'+data.activeKey;
        let url=Interface.status.query;
        if(data.selectmenu==2){
            //filterQuery+='\nCreatedBy\teq\t'+data.OwningUser;
            //filterQuery+='\nCreatedBy\teq-userid';
            url=Interface.status.mine;
            filterQuery='';
        }
                let d = {
                actions:[{
                    id: "2919;a",
                    descriptor: "",
                    callingDescriptor: "UNKNOWN",
                    params: {
                        pageSize: 10,
                        pageNumber: data.keyIndex,
                        //filterQuery: filterQuery,
                        //RegardingObjectId:'',
                        ChatterTypeCode:data.activeKey,
                        search: data.searchVal||''
                    }
                }]
            };
            let obj = {
                message: JSON.stringify(d)
            }
            proxy.$post(url,obj).then(res=>{
            var list = [];
            if (res && res.actions && res.actions[0] && res.actions[0].returnValue && res.actions[0].returnValue.rows) {
                data.total = res.actions[0].returnValue.total.length || 0;
                for (var i = 0; i < res.actions[0].returnValue.rows.length; i++) {
                    var item = res.actions[0].returnValue.rows[i];
                    for(var cell in item){
                        if(cell=='ImageUrls'){
                            item[cell]=require('@/assets/img/avatar-r.png');
                        }
                        if(cell=='CreatedOn'||cell=='createdOn'){
                            item['CreatedOn']=item[cell]?dayjs(item[cell]).format("YYYY-MM-DD HH:mm"):'';
                        }
                    }
                    if(!item['ImageUrls']){
                        item['ImageUrls']=require('@/assets/img/avatar-r.png');
                    }
                    item['OwningUserId']=item.createdByName||'';
                    item['OwningUser']=item.createdBy||'';
                    item['Description']=item.text==''?'<span style="color:rgba(0, 0, 0, 0.25);">暂无内容</span>':item.text;
                    item['NumOfLike']=item.numOfLike||0;
                    item['NumOfComment']=item.numOfComment||0;
                    list.push(item)
                }
            }
            if(list&&list.length){
                data.listData = data.listData.concat(list);
            }
        })
        setTimeout(function(){
            data.loading=false;
        },500)
    }
    //改变页码
    const ChangePage=(page, pageSize)=>{
        data.page=page;
        data.rows=pageSize;
        getCommentList();
    }
    const sizeChange=(current, size)=>{
        ChangePage(current, size)
    }
    const key = 'updatable';
    const handleSendComment = () => {
        if(data.comment==""){
            notification.open({
                key,
                message: "内容不能为空！"
            });
        }else {
            // proxy.$get(Interface.sendComment,{
            //     title: data.comment,
            //     ObjectId: "4c51a922-8762-40ae-9e10-5e1fa3f51a60"
            // }).then(res=>{
            //     if(res.status==1){
            //         notification.open({
            //             key,
            //             message: res.msg
            //         });
            //         data.comment = "";
            //     }
            // })
            // let url=Interface.create;
            //     let d = {
            //     actions:[{
            //         id: "2919;a",
            //         descriptor: "",
            //         callingDescriptor: "UNKNOWN",
            //         params: {
            //             recordInput: {
            //                 allowSaveOnDuplicate: false,
            //                 apiName: 'Chatter',
            //                 objTypeCode: '6000',
            //                 fields: {
            //                     RegardingObjectId: data.OwningUser,
            //                     OwningUser:data.OwningUser,
            //                     Description:data.comment,
            //                     RegardingObjectTypeCode:'6000',
            //                     ChatterTypeCode:data.activeKey
            //                 }
            //             }              
            //         }
            //     }]
            // };
            
            // let obj = {
            //     message: JSON.stringify(d)
            // }
            // proxy.$post(url,obj).then(res=>{
            // if(res&&res.actions&&res.actions[0]&&res.actions[0].returnValue){
            //     message.success("发布成功！");
            //     data.keyIndex=1;
            //     getCommentList();
            //     data.comment = "";
            // }
            
            // });
            let url=Interface.status.submit;
                let d = {
                actions:[{
                    id: "2919;a",
                    descriptor: "",
                    callingDescriptor: "UNKNOWN",
                    params: {
                        text:data.comment,
                        chatterTypeCode:data.activeKey,
                        location: {
                            location: "",
                            buidingName: "",
                            longitude: "",
                            latitude: ""
                        },
                        visible: {
                            visibleType: 0
                        }
                    }
                }]
            };
            if(data.activeKey=='1'){
                url=Interface.question.submit;
            }
            if(data.activeKey=='30400'){
                url=Interface.poll.submit;
                d.actions[0].options=data.VoteOptions;
            }
            let obj = {
                message: JSON.stringify(d)
            }
            proxy.$post(url,obj).then(res=>{
            if(res&&res.actions&&res.actions[0]&&res.actions[0].returnValue){
                message.success("发布成功！");
                data.keyIndex=1;
                getCommentList();
                data.comment = "";
                editorRef.value.content="";
            }
            
            });
        }
    }
    const handleSendComment1=(item,item1)=>{
        if(item1.comment==""){
            notification.open({
                key,
                message: "回复内容不能为空！"
            });
        }else {
            let Name='';

            if(item.id&&item1.id&&item.id!=item1.id){
                Name=data.OwningUserName+' 回复 '+item1.OwningUser;
            }
            let url=Interface.create;
                let d = {
                actions:[{
                    id: "2919;a",
                    descriptor: "",
                    callingDescriptor: "UNKNOWN",
                    params: {
                        recordInput: {
                            allowSaveOnDuplicate: false,
                            apiName: 'Chatter',
                            objTypeCode: '6000',
                            fields: {
                                RegardingObjectId: item.id,
                                OwningUser:data.OwningUser,
                                Description:item1.comment,
                                RegardingObjectTypeCode:'8',
                                Title:Name
                            }
                        }              
                    }
                }]
            };
            
            let obj = {
                message: JSON.stringify(d)
            }
            proxy.$post(url,obj).then(res=>{
            if(res&&res.actions&&res.actions[0]&&res.actions[0].returnValue){
                message.success("回复成功！");
                getCommentList1(item.id,item);
                item1.comment = "";
            }
            
            });
        }
    }
    const getCommentList1 = (id,item) => {
        //data.listData1[id] = [];
        let item0=item;
        let filterQuery='\nRegardingObjectTypeCode\teq\t8';
        if(id){
            filterQuery+='\nRegardingObjectId\teq\t'+id;
        }
        proxy.$post(Interface.list2, {
            filterId:'',
            objectTypeCode:'6000',
            entityName:'Chatter',
            filterQuery:filterQuery,
            search:'',
            page: 1,
            rows: 100,
            sort:'CreatedOn',
            order:'asc',
            displayColumns:'Title,OwningUser,CreatedOn,Description,NumOfComment,NumOfLike,ImageUrls'
        }).then(res => {
            var list = [];
            for (var i = 0; i < res.nodes.length; i++) {
                var item = res.nodes[i];
                for(var cell in item){
                    if(cell!='id'&&cell!='nameField'&&cell!='ImageUrls'){
                        if(cell=='OwningUser'){
                            item['OwningUserId']=item[cell].userValue.Value;
                            if(item['OwningUserId']){
                                item['OwningUserId']=(item['OwningUserId']).toUpperCase();
                            }
                        }
                        item[cell]=girdFormatterValue(cell,item);
                    }
                    if(cell=='ImageUrls'){
                        item[cell]=girdFormatterValue(cell,item)||require('@/assets/img/avatar-r.png');
                    }
                    if(cell=='CreatedOn'){
                        item[cell]=item[cell]?dayjs(item[cell]).format("YYYY-MM-DD HH:mm"):'';
                    }
                }
                list.push(item)
            }
            data.listData1[id]=list;
            if(item0){
                item0.NumOfComment=list.length;
            }
        })
    }
    // 删除
    const handleDelete = (e,type,typeitem) => {
        data.type=type;
        data.typeitem=typeitem;
        data.recordId=e;
        data.isDelete = true;
    };
    const closeDelete = (e) => {
        data.recordId='';
        data.isDelete = false;
    };
    const deleteOk = (e) => {
        if(data.type==1){
            data.keyIndex=1;
            getCommentList();
        }
        else{
            getCommentList1(data.typeitem.id,data.typeitem)
        }
    };
    const loadQuestionData= (e) => {
        data.searchVal=e;
        data.keyIndex=1;
        getCommentList();
    };
    const onSearch=()=>{
        data.keyIndex=1;
        getCommentList();
    }
    const getInputContent = (e) => {
        data.comment = e;
    };
    const addQuestionOption= () => {
        data.VoteOptions.push({name:'',displayOrder:data.VoteOptions.length+1});
    };
    const changeTab = (e) => {
        data.activeKey = e;
        data.keyIndex=1;
        getCommentList();
    }
    onMounted(() => {
        let userInfo=window.localStorage.getItem('userInfo');
        if(userInfo){
            userInfo=JSON.parse(userInfo);
            data.OwningUser=userInfo.userId;
            data.OwningUserName=userInfo.fullName;
            if(data.OwningUser=='jackliu'){
                data.OwningUser='2ec00cf2-a484-4136-8fef-e2a2719c5ed6';
            }
            data.OwningUser=(data.OwningUser).toUpperCase();
        }
        getCommentList();
        window.addEventListener(
            "scroll",
            function () {
            if (document.getElementsByClassName("CommunityCommentWrap").length) {
            } else {
                return;
            }
            var clientHeight =
                document.getElementsByClassName("CommunityCommentWrap")[0].clientHeight;
            var scrollTop =
                document.getElementsByClassName("CommunityCommentWrap")[0].scrollTop;
            var scrollHeight =
                document.getElementsByClassName("CommunityCommentWrap")[0].scrollHeight;
            if (
                scrollTop &&
                clientHeight &&
                (clientHeight + scrollTop >= scrollHeight)
            ) {
                data.keyIndex = data.keyIndex + 1;
                getCommentList();
            }
            },
            true
        );
    });
</script>
<style lang="less">
    .CommunityCommentWrap{
        width: 100%;
        .panelCommunityCommentWrap{
            padding: 0 80px;
            .commentBox{
                display: flex;
                .leftAvatar{
                    margin-right: 12px;
                }
                .rightTextare{
                    flex: 1;
                    border-radius: 2px;
                    .textarea{
                        width: 100%;
                        height: 100px;
                        min-height: 22px;
                        border-radius: 4px;
                        background: #f2f3f5;
                        padding-top: 12px;
                        padding-left: 12px;
                        font-size: 14px;
                        border: none;
                        outline: 0;
                        resize: vertical;
                    }
                }
            }
            .optionalWrap{  
                text-align: right;
                padding-top: 10px;
                .optionalWrapLeft{
                    float:left;
                }
                .optionalWrapRight{
                    float:right;
                }
            }
            .commentList{
                .commentItemBox{
                    display: flex;
                    margin-top: 20px;
                    .leftAvatar{
                        font-size: 36px;
                        color: #C9CDD4;
                        margin-right: 12px;
                    }
                    .rightComment{
                        flex: 1;
                        overflow: hidden;
                        position: relative;
                        .commentName{
                            font-size: 14px;
                            color: #ff7d00;
                        }
                        .commentContent{
                            margin: 6px 0;
                        }
                        .commentTime{
                            font-size: 12px;
                            color: #86909c;
                        }
                        .commentBtn{
                            font-size: 12px;
                            color: #86909c;
                        }
                        .commentMore{
                            position: absolute;
                            top: -5px;
                            right: 0px;
                            font-size: 15px;
                            color: #86909c;
                            .btn-drop{
                                font-size: 22px;
                                transform: rotate(-90deg);
                                -moz-transform:rotate(-90deg);
                                -webkit-transform:rotate(-90deg);
                                display: block;
                                cursor: pointer;
                            }
                        }
                        
                    }
                }
            }
            .pagination{
                margin-top: 20px;
                text-align: right;
                max-height: 74px;
            }
        }
        .commentAvatar{
            width: 40px;
            height: 40px;
            position: relative;
            top: 0px;
        }
        :where(.css-dev-only-do-not-override-kqecok).ant-avatar{
            // background: transparent !important;
            width: 40px !important;
            height: 40px !important;
            line-height: 40px !important;
        }
        :where(.css-dev-only-do-not-override-kqecok).ant-avatar .ant-avatar-string{
            left: 0 !important;
            transform: unset !important;
        }
        .deleteComment{
            cursor: pointer; 
            margin-left: 8px;
        }
        height: 100%;
        .panel{
            height: 100%;
            padding: 0;
        }
        .panelCommunityCommentWrap {
            padding: 0 15px;
            padding-right: 15px;
            height: 100%;
            padding-left: 0px;
        }
        .panelCommunityCommentWrap .commentBox{
            padding-left: 5px;
        }
        .panel-bd{
            height: calc(~'100% - 40px') !important;
        }
        .commentList{
            height: calc(~'100% - 225px') !important;
            overflow: auto;
            margin-top: 18px;
        }
        .commentTime{
            text-align: left;
            margin-top: 3px;
        }
        .commentBtn{
            text-align: right;
        }
        .panelCommunityCommentWrap .commentList .commentItemBox{
            margin: 0;
            border-bottom: 1px solid #eee;
            padding-bottom: 15px;
            padding-right: 20px;
            padding-top: 20px;
            padding-left: 20px;
        }
        // .panelCommunityCommentWrap .commentList .commentItemBox:hover{
        //     background: #e9f7ff !important;
        // }
        .ant-avatar{
            line-height: 36px !important;
            position: relative;
            top: -8px;
        }
        .commentBtn-item{
            font-size: 14px;
            margin-left: 10px;
            cursor: pointer;
            color: #666;
            margin-left: 80px;
            text-align: left;
            .anticon{
                font-size: 15px;
                margin-right: 10px;
            }
        }
        .commentBtn-item:first-child{
            margin-left: 10px;
        }
        .commentBtn-item:last-child{
            margin-left: 80px;
        }
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
    .CommunityCommentWrap {
        overflow: auto;
        height: 100%;
        padding: 5px;
        .mainContent{
            display: flex;
            width:100%;
            height: 100%;
            max-width: 1122px;
            margin: 0 auto;
            .leftContent{
                width: 182px;
                height: 100%;
                margin-right: 15px;
            }
            .middleContent{
                width: auto;
                flex: 1;
                margin-right: 15px;
                height: 100%;
            }
            .rightContent{
                width: 280px;
                height: 100%;
            }
        }
        .panel0{
            height: 100%;
            padding: 20px 18px;
            .panel-title{
                font-size: 22px;
                color: #333;
                // font-weight: normal;
                font-weight: 500;
            }
            .left-menu{
                width: 100%;
                height: 100%;
                .left-menu-item{
                    position: relative;
                    padding: 10px 10px;
                    cursor: pointer;
                    color: #333;
                    font-weight: 500;
                    font-size: 16px;
                    .left-menu-item-icon{
                        width: 22px;
                        height: 22px;
                        font-size: 20px;
                        position: relative;
                        top: 1px;
                    }
                    .left-menu-item-label{
                        margin-left: 10px;
                    }
                }
                .left-menu-item:hover{
                    color: #ff8200;
                }
                .left-menu-item-active{
                    color: #ff8200;
                }
            }
        }
        .panel1{
            min-height: 370px;
            height: auto;
            margin-bottom: 15px;
            padding: 15px;
            padding-top: 15px;
            padding-right: 0;
            .panel-head{
                margin-bottom: 15px !important;
            }
            .ant-avatar{
                top: 0px !important;
            }
        }
        .panel2{
            height: calc(~'100% - 230px');
            height: auto !important;
            margin-bottom: 0;
            .commentList{
                height: calc(~'100% - 15px') !important;
                height: auto !important;
                margin-top: 0 !important;
                background: #e8edf4;
                .commentItemBox{
                    background: #fff;
                    margin-bottom: 15px;
                    border-radius: 5px;
                }
            }
            .commentSearch{
                padding: 3px 0px 5px 0;
                margin-bottom: 14px;
                background: #fff;
                border-radius: 5px;
                :deep .ant-input{
                    text-indent: 5px;
                    height: 26px;
                }
                .wea-left-tree-search {
                    width: 100%;
                    height: 46px;
                    line-height: 46px;
                    display: flex;
                    align-items: center;
                    box-sizing: border-box;
                    padding: 0 14px;
                    margin-top: 3px;
                    position: relative;
                    :deep .ant-input{
                        border:none !important;
                    }
                    .wea-left-tree-search-label {
                        display: inline-block;
                        padding-left: 14px;
                        min-width: 76px;
                        cursor: pointer;
                        font-weight: 600;
                        text-overflow: ellipsis;
                        overflow: hidden;
                        white-space: nowrap;
                        font-size: 14px;
                        color: #666;
                    }
                    .wea-left-tree-search-icon{
                        color: #bbb;
                        position: absolute;
                        right: 20px;
                        top: 0px;
                        z-index: 1;
                        font-size: 18px;
                        display: block;
                        width: 22px;
                        height: 22px;
                    }
                }
            }
            .panelCommunityCommentWrap{
                padding-right: 0;
                background: #e8edf4;
            }
        }
        .panel3{
            height: 100%;
            padding: 15px;
            .panel-title{
                color: #333;
                font-size: 15px;
            }
            .tag-container {
                margin: 0px 10px 0px 5px;
                overflow: hidden;
                padding-bottom: 7px !important;
            }
            .tag-container div {
                float: left;
                padding: 0px 7px;
                line-height: 24px;
                background-color: rgb(238, 250, 240) !important;
                border-radius: 4px;
                color: #5b9c4a !important;
                margin: 8px 8px 0px 0px;
                a{
                    color: #5b9c4a !important;
                    font-size: 12px;
                }
            }
        }
        .panelCommunityCommentWrap .pagination{
            margin: 10px 15px 8px;
        }
        .commentBtn {
            text-align: center;
            display: flex;
            margin-top: 15px;
            .commentBtn-item {
                //margin-right: 30px;
                flex: 1;
                .anticon{
                    margin-right: 10px;
                }
            }
        }
        .leftAvatar .ant-avatar .anticon{
            position: relative;
            left: 0.9px;
            font-size: 22px;
            top: 1.1px;
        }

        .commentReply{
            margin-top: 12px;
            .commentBox{
                padding-left: 0px;
            }
            .commentBox .rightTextare .textarea{
                height: 30px;
                padding-top: 8px;
                position: relative;
                top: 5px;
            }
            .ant-avatar{
                width: 30px !important;
                height: 30px !important;
            }
            .leftAvatar .ant-avatar .anticon{
                font-size: 16px;
                top: -5px;
            }
            .optionalWrap{
                padding-top: 0px;
            }
            .ant-btn{
                font-size: 13px;
                height: 26px;
                padding: 0px 8px;
            }
            .commentList{
                background: transparent;
            }
            .commentList .commentItemBox{
                margin-bottom: 0;
                background: transparent;
                padding-left: 0 !important;
            }
            .commentBtn{
                display: block;
                margin-top: 10px;
                text-align: right !important;
            }
            .commentBtn-item{
                margin-left: 10px !important;
            }
            .commentBtn-item:last-child .anticon{
                margin-right: 5px;
            }
        }
        .ant-input-clear-icon{
            position: relative !important;
            right: 22px !important;
        }
        .ant-input{
            border:none !important;
        }
        .TEditorWrap{
            padding: 10px;
        }
        .tabContainer{
            background: #f3f3f3;
            .ant-tabs-tab:hover,.ant-tabs-tab-active{
            background: #fff;
            .ant-tabs-tab-btn{
                color: #333;
                font-weight: bolder;
            }
            }
            .ant-tabs-ink-bar{
                display: none;
            }
        }
        .panelCommunityCommentWrap .commentBox0{
            display: block;
            border: 2px solid #eeeeee;
            border-radius: 8px;
            overflow: hidden;
            padding-left: 0;
        }
        button.tox-tbtn.tox-tbtn--select.tox-tbtn--bespoke {
            width: 113px !important;
        }
    }
    .a-menu-item-label{
        margin-left: 5px !important;
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
    :deep .tox .tox-edit-area::before{
        border-radius: 10px !important;
    }
    .CommunityCommentWrap{
        .VoteWrap{
            padding: 15px;
        }
        .QuestionWrap{
            padding: 15px;
        }
        .commentBox .ant-input{
            border: 1px solid #dedede !important;
            border-radius: 4px !important;
            margin-bottom: 6px;
        }
        .VoteLabel,.QuestionLabel{
            margin-bottom: 6px;
        }
    }
    
</style>