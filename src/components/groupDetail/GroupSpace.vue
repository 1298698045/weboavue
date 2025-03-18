<template>
  <div class="GroupSpace">
    <div class="panel panel0">
      <!-- <div class="panel-head">
        <div class="panel-title">发布帖子</div>
      </div> -->
      <div class="panel-bd commentBox">
        <div class="tabContainer">
          <a-tabs v-model:activeKey="activeKey" @change="changeTab">
            <a-tab-pane key="0" tab="状态"></a-tab-pane>
            <a-tab-pane key="30400" tab="投票"></a-tab-pane>
            <a-tab-pane key="1" tab="问题"></a-tab-pane>
          </a-tabs>
        </div>
        <div class="TEditorWrap CommentWrap" v-if="activeKey=='6000'||activeKey=='0'">
        <TEditor
            :placeholder="'有什么新鲜事想分享给大家?'"
            @input="getInputContent"
            :height="230"
        />
        </div>
        <div class="VoteWrap" v-if="activeKey=='30400'">
            <div class="VoteLabel">问题</div>
            <a-textarea class="Votetextarea" v-model:value="data.content" placeholder="您想提问什么？" :rows="3"></a-textarea>
            <template v-for="(item,index) in VoteOptions" :key="index">
                <div class="VoteLabel">选项{{index+1}}</div>
                <a-input class="VoteInput" v-model:value="item.name"></a-input>
            </template>
        </div>
        <div class="TEditorWrap QuestionWrap" v-if="activeKey=='30401'||activeKey=='1'">
            <div class="QuestionLabel">问题</div>
            <a-textarea class="Votetextarea" v-model:value="data.content" placeholder="您想知道什么？" :rows="3"></a-textarea>
            <div class="QuestionLabel">详细信息</div>
            <TEditor
                :placeholder="'如果您还需要补充，请在此处添加一些细节...'"
                :height="230"
            />
        </div>
        <div class="sendWrap">
          <a-button type="primary" class="optionalWrapLeft" @click="addQuestionOption" v-if="activeKey=='30400'"><PlusOutlined />添加新选项</a-button>
          <a-button type="primary" :disabled="!isSend" @click="sendContent">发布</a-button>
        </div>
      </div>
    </div>
    <div class="panel panel1">
      <div class="panel-head">
        <div class="panel-title">群组动态</div>
        <div class="panel-search">
          <a-input-search
            v-model:value="searchVal"
            placeholder="搜索动态"
            style="width: 300px"
            @search="onSearch"
            allowClear
          />
        </div>
      </div>
      <div class="panel-bd">
        <div class="trendsWrap">
          <div class="empty" v-if="!spaceList.length">
            <img
              :src="require('@/assets/img/empty.png')"
              alt=""
            />
            <p class="emptyDesc">当前暂无数据</p>
          </div>
          <div
            class="trendsItem"
            v-for="(item, index) in spaceList"
            :key="index"
          >
            <div class="trendsItemBox">
              <div class="avatar">
                <!-- <img :src="item.ImageUrls" alt="" /> -->
                <a-avatar :size="37">
                    <template #icon><UserOutlined /></template>
                </a-avatar>
              </div>
              <div class="trends-info">
                <div class="info-name">
                  {{ item.OwningUser }}
                  <!-- <svg
                    viewBox="0 0 24 24"
                    aria-label="认证账号"
                    role="img"
                    class="r-1cvl2hr r-4qtqp9 r-yyyyoo r-1xvli5t r-9cviqr r-f9ja8p r-og9te1 r-bnwqim r-1plcrui r-lrvibr"
                  >
                    <g>
                      <path
                        d="M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39.2-2.9-.81-3.91s-2.52-1.27-3.91-.81c-.66-1.31-1.91-2.19-3.34-2.19s-2.67.88-3.33 2.19c-1.4-.46-2.91-.2-3.92.81s-1.26 2.52-.8 3.91c-1.31.67-2.2 1.91-2.2 3.34s.89 2.67 2.2 3.34c-.46 1.39-.21 2.9.8 3.91s2.52 1.26 3.91.81c.67 1.31 1.91 2.19 3.34 2.19s2.68-.88 3.34-2.19c1.39.45 2.9.2 3.91-.81s1.27-2.52.81-3.91c1.31-.67 2.19-1.91 2.19-3.34zm-11.71 4.2L6.8 12.46l1.41-1.42 2.26 2.26 4.8-5.23 1.47 1.36-6.2 6.77z"
                      ></path>
                    </g>
                  </svg>
                  <span class="name2">@{{ item.OwningUser }}</span> -->
                </div>
                <div class="info-time">
                  {{ item.CreatedOn }}
                </div>
                <div class="info-desc" v-html="item.Description">
                </div>
              </div>
              <div class="trends-more">
                <a-dropdown>
                      <a class="ant-dropdown-link" @click.prevent>
                        <MoreOutlined />
                      </a>
                      <template #overlay>
                          <a-menu>
                              <a-menu-item v-if="item.OwningUserId&&data.OwningUser&&data.OwningUser==item.OwningUserId" @click="handleDelete(item.id,1,'')">
                                  <DeleteOutlined /><span class="a-menu-item-label">删除</span>
                              </a-menu-item>
                          </a-menu>
                      </template>
                  </a-dropdown>
              </div>
            </div>
            <!-- <div class="trendsItemBottom">
              <div class="iconBox" title="评论">
                <svg
                  title="评论"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  class="r-4qtqp9 r-yyyyoo r-1xvli5t r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-1hdv0qi"
                >
                  <g>
                    <path
                      d="M1.751 10c0-4.42 3.584-8 8.005-8h4.366c4.49 0 8.129 3.64 8.129 8.13 0 2.96-1.607 5.68-4.196 7.11l-8.054 4.46v-3.69h-.067c-4.49.1-8.183-3.51-8.183-8.01zm8.005-6c-3.317 0-6.005 2.69-6.005 6 0 3.37 2.77 6.08 6.138 6.01l.351-.01h1.761v2.3l5.087-2.81c1.951-1.08 3.163-3.13 3.163-5.36 0-3.39-2.744-6.13-6.129-6.13H9.756z"
                    ></path>
                  </g>
                </svg>
                <span class="num">{{ item.NumOfComment || 0 }}</span>
              </div>
              <div class="iconBox" title="点赞">
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  class="r-4qtqp9 r-yyyyoo r-1xvli5t r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-1hdv0qi"
                >
                  <g>
                    <path
                      d="M16.697 5.5c-1.222-.06-2.679.51-3.89 2.16l-.805 1.09-.806-1.09C9.984 6.01 8.526 5.44 7.304 5.5c-1.243.07-2.349.78-2.91 1.91-.552 1.12-.633 2.78.479 4.82 1.074 1.97 3.257 4.27 7.129 6.61 3.87-2.34 6.052-4.64 7.126-6.61 1.111-2.04 1.03-3.7.477-4.82-.561-1.13-1.666-1.84-2.908-1.91zm4.187 7.69c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01.896 1.81.846 4.17-.514 6.67z"
                    ></path>
                  </g>
                </svg>
                <span class="num">{{ item.NumOfLike || 0 }}</span>
              </div>
              <div class="iconBox" title="分享">
                <svg
                  title="分享"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  class="r-4qtqp9 r-yyyyoo r-1xvli5t r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-1hdv0qi"
                >
                  <g>
                    <path
                      d="M12 2.59l5.7 5.7-1.41 1.42L13 6.41V16h-2V6.41l-3.3 3.3-1.41-1.42L12 2.59zM21 15l-.02 3.51c0 1.38-1.12 2.49-2.5 2.49H5.5C4.11 21 3 19.88 3 18.5V15h2v3.5c0 .28.22.5.5.5h12.98c.28 0 .5-.22.5-.5L19 15h2z"
                    ></path>
                  </g>
                </svg>
              </div>
            </div> -->
            <div class="commentBtn">
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
                        <div class="leftAvatar leftAvatar1">
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
                            <div class="commentContent" v-html="item.Description||'暂无'"></div>
                            <div class="commentBtn">
                                <span class="commentBtn-item" title="删除" v-if="item1.OwningUserId&&data.OwningUser&&data.OwningUser==item1.OwningUserId" @click="handleDelete(item1.id,2,item)" ><DeleteOutlined /></span>
                                <span class="commentBtn-item" title="回复" v-if="!item1.IsShowReply" @click="item1.IsShowReply=true"><MessageOutlined /><span></span></span>
                                <span class="commentBtn-item" title="回复" v-if="item1.IsShowReply" @click="item1.IsShowReply=false" style="color: #1677ff;"><MessageOutlined /><span></span></span>
                                <span class="commentBtn-item" title="点赞" v-if="!item1.IsLike" @click="item1.IsLike=true;item1.NumOfLike=1"><LikeOutlined /><span>{{ item1.NumOfLike||0 }}</span></span>
                                <span class="commentBtn-item" title="取消点赞" v-if="item1.IsLike" @click="item1.IsLike=false;item1.NumOfLike=0" style="color: red;"><LikeFilled /><span>{{ item1.NumOfLike||0 }}</span></span>
                            </div>
                            <div class="commentReply" v-if="item1.IsShowReply">
                                <div class="commentBox">
                                    <div class="leftAvatar leftAvatar2">
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
    </div>
    <Delete :isShow="isDelete" :desc="deleteDesc" :sObjectName="sObjectName" :recordId="recordId" :objTypeCode="objectTypeCode" :external="external" @cancel="closeDelete" @ok="deleteOk" />
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
  h,
  computed,
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
import {
  EditOutlined,
  UnorderedListOutlined,
  UserOutlined,
  LikeOutlined,DeleteOutlined,ExportOutlined,MessageOutlined,BarsOutlined,MoreOutlined,SearchOutlined,LikeFilled,LoadingOutlined
} from "@ant-design/icons-vue";
import { useStore } from "vuex";
let store = useStore();
import { notification } from 'ant-design-vue';
import Interface from "@/utils/Interface.js";
import { girdFormatterValue } from "@/utils/common.js";
const { proxy } = getCurrentInstance();
import { message } from "ant-design-vue";
import TEditor from "@/components/TEditor.vue";
import Delete from "@/components/listView/Delete.vue";
const data = reactive({
  adminList: [],
  peopleList: [],
  searchVal: "",
  spaceList: [],
  content: "",
  isDelete: false,
  recordId:'',
  objectTypeCode:'6000',
  sObjectName:'Chatter',
  deleteDesc: '确定要删除吗？',
  external:false,
  OwningUser:'',
  OwningUserName:'',
  keyIndex:1,
  activeKey:'0',
  type:1,
  typeitem:'',
  listData1:{},
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
});
const props = defineProps({
  id: String,
});
const isSend = computed(() => {
  return data.content ? true : false;
});
const addQuestionOption= () => {
  data.VoteOptions.push({name:'',displayOrder:data.VoteOptions.length+1});
};
const getInputContent = (e) => {
  data.content = e;
};
const { VoteOptions,listData1,typeitem,type,activeKey,keyIndex,OwningUserName,OwningUser,adminList, peopleList, searchVal, spaceList, content,isDelete,recordId,objectTypeCode,sObjectName,deleteDesc,external } = toRefs(data);
const sendContent= () => {
  if(data.content==""){
            notification.open({
                key,
                message: "内容不能为空！"
            });
        }else {
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
            //                     RegardingObjectId: props.id,
            //                     OwningUser:data.OwningUser,
            //                     Description:data.content,
            //                     RegardingObjectTypeCode:'9',
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
            //     message.success("发送成功！");
            //     data.keyIndex=1;
            //     getSpace();
            //     //data.content = "";
            // }
            
            // });
            let url=Interface.status.submit;
                let d = {
                actions:[{
                    id: "2919;a",
                    descriptor: "",
                    callingDescriptor: "UNKNOWN",
                    params: {
                        text:data.content,
                        chatterTypeCode:data.activeKey,
                        RegardingObjectId: props.id,
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
                getSpace();
                data.content = "";
                editorRef.value.content="";
            }
            
            });
        }
};
const onSearch = (e) => {
  data.keyIndex=1;
  getSpace();
};
const getSpace = () => {
  if(data.keyIndex){}else{return false}
        if(data.keyIndex==1){
            data.spaceList = [];
        }
  let filterQuery='\nRegardingObjectId\teq\t'+props.id;
  if(data.searchVal){
    filterQuery+='\nDescription\tcontains\t'+data.searchVal;
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
        //         data.spaceList = data.spaceList.concat(list);
        //     }
        // })
        filterQuery='\nRegardingObjectId\teq\t'+props.id+'\nChatterTypeCode\teq\t'+data.activeKey;
        let url=Interface.status.query;
                let d = {
                actions:[{
                    id: "2919;a",
                    descriptor: "",
                    callingDescriptor: "UNKNOWN",
                    params: {
                        pageSize: 10,
                        pageNumber: data.keyIndex,
                        RegardingObjectId: props.id,
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
                data.spaceList = data.spaceList.concat(list);
            }
        })
};
//getSpace();
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
            getSpace();
        }
        else{
            getCommentList1(data.typeitem.id,data.typeitem)
        }
};
const changeTab = (e) => {
        data.activeKey = e;
        data.keyIndex=1;
        getSpace();
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
        getSpace();
        window.addEventListener(
            "scroll",
            function () {
            if (document.getElementsByClassName("detail-scroll").length) {
            } else {
                return;
            }
            var clientHeight =
                document.getElementsByClassName("detail-scroll")[0].clientHeight;
            var scrollTop =
                document.getElementsByClassName("detail-scroll")[0].scrollTop;
            var scrollHeight =
                document.getElementsByClassName("detail-scroll")[0].scrollHeight;
            if (
                scrollTop &&
                clientHeight &&
                (clientHeight + scrollTop >= scrollHeight)
            ) {
                data.keyIndex = data.keyIndex + 1;
                getSpace();
            }
            },
            true
        );
    });
</script>
<style lang="less">
.GroupSpace {
  .panel{
    padding: 20px 25px;
    min-height: 200px;
    padding-top: 15px;
    height: auto;
  }
  .panel1{
    margin-bottom: 0;
    padding: 0;
    background: #f0f2f6;
    .panel-head{
      padding: 12px 25px;
      background: #fff;
      border-radius: 4px;
      margin-bottom: 15px;
    }
  }
  .panel0{
    .panel-bd{
      border:2px solid #eeeeee;
      border-radius: 8px;
      overflow: hidden;
      .tox .tox-edit-area::before{
        border-radius: 8px;
      }
      .TEditorWrap{
        padding: 15px 15px 0;
      }
      .sendWrap{
        padding: 12px 16px 12px;
        margin: 0;
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
    }
  }
  .tox:not([dir=rtl]){
    height: 220px !important;
  }
  .trends-more,.iconBox{
    cursor: pointer;
  }
  .trends-more{
    .ant-dropdown-link{
      font-size: 22px;
      transform: rotate(-90deg);
      -moz-transform:rotate(-90deg);
      -webkit-transform:rotate(-90deg);
      display: block;
      cursor: pointer;
    }
  }
  .trendsItemBox{
    padding-bottom: 0 !important;
  }
  .trendsWrap {
    background: #f0f2f6;
    .empty {
      background: #fff;
      padding: 8px 0 22px;
      img{
      width: 80px;
    }
  }
    .trendsItem {
      background: #fff;
      border-radius: 4px;
      margin-bottom: 15px;
      padding-bottom: 10px;
      //border-bottom: 1px solid #e2e3e5;
      .trendsItemBox {
        display: flex;
        padding: 15px 20px;
        border-radius: 3px;
        .avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          overflow: hidden;
          margin-right: 9px;
          margin-top: 1px;
          img {
            width: 100%;
            height: 100%;
          }
          .anticon{
            position: relative;
            top: -2px;
            left: 1px;
          }
        }
        .trends-info {
          flex: 1;
          .info-name {
            display: flex;
            align-items: center;
            font-weight: normal;
            color: #ff7d00;
            svg {
              width: 18px;
              margin: 0 3px;
              margin-left: 1px;
              fill: var(--textColor);
            }
            .name2 {
              color: #536471;
              font-weight: normal;
            }
          }
          .info-time {
            margin-top: 3px;
            color: #86909c;
            font-size: 12px;
          }
          .info-desc {
            font-size: 15px;
            margin: 15px 0 5px 0;
          }
        }
      }
      .commentBtn{
          font-size: 12px;
          color: #86909c;
          text-align: center;
          margin: 10px;
          display: flex;
          text-align: center !important;
          .commentBtn-item{
                font-size: 14px;
                margin-left: 10px;
                cursor: pointer;
                color: #666;
                margin-left: 80px;
                text-align: center !important;
                flex: 1;
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
      .trendsItemBottom {
        display: flex;
        justify-content: center;
        padding: 15px 0;
        color: #666;
        .iconBox {
          flex: 1;
          text-align: center;
          display: flex;
          align-items: center;
          justify-content: center;
          svg {
            width: 16px;
            fill: #666;
            border-radius: 50%;
            padding: 8px;
            box-sizing: unset;
          }
          span {
            padding-left: 10px;
          }
          &:hover {
            svg {
              fill: #3399ff;
              background: rgba(29, 155, 240, 0.1);
            }
          }
        }
      }
    }
    // .trendsItem:hover {
    //   background: #e9f7ff !important;
    // }
  }
  .sendWrap {
    margin-top: 20px;
    text-align: right;
  }
  .commentList .commentItemBox .rightComment .commentBtn{
          display: block !important;
          text-align: right !important;
        }
        .commentList .commentReply .commentBox .leftAvatar{
           height: 28px;
           .ant-avatar{
            position: relative;
            top:-13px;
           }
        }
        .commentReply .commentItemBox .leftAvatar1{
           height: 28px;
           .ant-avatar{
            position: relative;
            top:-10px;
           }
        }
        .commentList .commentReply{
          padding: 0 !important;
        }
        .panel-search {
          width: calc(~'100% - 100px') !important;
          text-align: right;
        .ant-input-group-wrapper{
          width: 500px !important;
        }
      }
}
.a-menu-item-label{
        margin-left: 5px !important;
    }
    .commentItemBox{
                    display: flex;
                    margin-top: 10px;
    //margin-left: 5px !important;
    border-bottom: 1px solid #eee;
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
    .commentReply{
            margin-top: 12px;
            padding: 0 20px 10px 60px;
            .commentBox{
              display: flex;
                .leftAvatar{
                    margin-right: 12px;
                    margin-top: 5px;
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
                padding-left: 5px;
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
                line-height: 26px !important;
            }
            .leftAvatar .ant-avatar .anticon{
                font-size: 16px;
                top: -5px;
            }
            .optionalWrap{
                padding-top: 0px;
                text-align: right;
                margin-top: 10px;
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
        .GroupSpace{
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
          .optionalWrapLeft{
              float:left;
          }
          .optionalWrapRight{
              float:right;
          }
        }
</style>
