<template>
            <div>
                <div class="section-title">活动</div>
            <div class="section-body">
                <div class="detail-active-head">
                显示：
                <div @click="commontabchange(0)" class="tabbtn" :class="{'active':activebtn.commontabactive==0}">
                    全部
                </div>
                <div @click="commontabchange(1)" class="tabbtn" :class="{'active':activebtn.commontabactive==1}">
                    评论
                </div>
                <div @click="commontabchange(2)" class="tabbtn" :class="{'active':activebtn.commontabactive==2}">
                    历史记录
                </div>
                <div @click="commontabchange(3)" class="tabbtn" :class="{'active':activebtn.commontabactive==3}">
                    工作日志
                </div>
                <div class="sort" @click="sortchange">
                    <div class="sort hover pointer" v-if="sort=='down'">
                        <span>先显示最新的</span>
                        <icon name="sortdown"/>
                    </div>
                    <div class="sort hover pointer" v-else>
                        <span>先显示最旧的</span>
                        <icon name="sortup"/>
                    </div>
                </div>
                </div>
                <div class="detail-active-body">
                    <div class="common-container" v-show="activebtn.commontabactive==1">
                        <div class="common-container-left">
                            <Userhead :width="'32px'" :height="'32px'" />
                        </div>
                        <div class="common-container-right">
                            <div class="common-paceholder" v-show="!control.writecommon" @click="control.writecommon=true">
                                添加评论...
                                </div>
                            <div class="common-editor" v-show="control.writecommon">
                                <!-- <editor v-model="commoneditdescribe.value" :init="commoneditdescribe.init"></editor> -->
                                <TEditor ref="editorRef" mode="middle" :placeholder="'添加评论'"  :height=250
                                @input="getEditorContent" />
                                <div class="edit-foot">
                            <a-button type="primary" size="mini" @click="savecommon">保存</a-button>
                                <a-button @click="control.writecommon=false" size="mini">取消</a-button>
                            </div>
                            </div>
                        </div>
                    </div>
                   
                    <div v-if="commonlist.length==0&&activebtn.commontabactive!=3" class="el-empty">
                        <el-empty :image-size="140"></el-empty>
                    </div>
                    <div v-if="commonlist.length==0&&activebtn.commontabactive==3" class="el-empty">
                        <div class="css-1lmg9rr">
                            <img width="auto" height="auto" alt="" src="/static/img/images/icons/issuedetail/stopwatch.svg" class="css-1marach" style="--max-width:160px; --max-height:160px;">
                            <h4 class="css-ra4am"></h4>
                            <p class="css-10p4ort">还没有为此事务记录任何工作。记录工作可让您跟踪和报告花在事务上的时间。</p>
                            <div class="css-shyucn">
                                <div class="css-1oy5iav">
                                    <button class="css-19k3hl7" type="button" @click="addworklog">
                                        <span class="css-178ag6o">记录工作</span>
                                    </button>
                                </div>
                                <div class="css-177e4pm"></div>
                            </div>
                        </div>
                    </div>
                    <div class="manipulate-list" v-for="item in commonlist" :key="item.id">
                        <div class="manipulate-item" v-if="item.__typename=='CommentItem'">
                            <div class="manipulate-left">
                                <Userhead :width="'32px'" :height="'32px'" :popover="true" 
                                :userid="item.commentItem.createdBy.accountId"
                                :url="item.commentItem.createdBy.picture"/>
                            </div>
                            <div class="manipulate-right">
                                <div class="manipulate-head">
                                    <span class="name">{{item.commentItem.createdBy.name}}</span>
                                    <!-- <span class="type">已更新描述</span> -->
                                    <span class="time">{{item.commentItem.createdOn}}</span>
                                    <el-tag effect="dark" type="info" size="mini">评论</el-tag></div>
                                    <div class="manipulate-body" v-html="item.commentItem.body">
                                    </div>
                            </div>
                        </div>
                        <div class="manipulate-item" v-else>
                            <div class="manipulate-left">
                                <Userhead :width="'32px'" :height="'32px'" :popover="true" 
                                :userid="item.historyItem.actor.accountId"
                                :url="item.historyItem.actor.avatarUrl"/>
                            </div>
                            <div class="manipulate-right">
                                <div class="manipulate-head">
                                    <span class="name">{{item.historyItem.actor.displayName}}</span>
                                    <span class="type">已更新 {{item.historyItem.fieldDisplayName}}</span>
                                    <span class="time">{{item.historyItem.created}}</span>
                                    <el-tag effect="dark" type="info" size="mini">历史记录</el-tag></div>
                                    <div class="manipulate-body">
                                        {{item.historyItem.from.value}} -> {{item.historyItem.to.value}}
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <Worklog v-model="worklog" :value="worklog" @cancel="worklog=false" />
            </div>
            </div>
</template>
<script>
import Worklog from '@/components/schedule/detail/Worklog.vue';
import commonapi from '@/utils/commonapi';
import { projectcommentgetlist } from '@/utils/projectapi.js';
import Userhead from '@/components/schedule/detail/Userheadphoto.vue';
import icon from '@/components/schedule/detail/icon.vue';
//import tinymceinit from "@/utils/tinymceinit.js";
//import Editor from "@tinymce/tinymce-vue";
import TEditor from "@/components/TEditor.vue";
// import 'tinymce/icons/default';
// import 'tinymce/themes/silver/theme';

export default {
    data(){
        return{
            sort:'up',
            activebtn:{
                commontabactive:0
            },
            control:{
                writecommon:false
            },
            commoneditdescribe:{
                value:'',
                show:false,
                //init: tinymceinit.init
            },
            commonlist:[],
            worklog:false,
        }
    },
    props:['itemid'],
    components:{
        //Editor,
        TEditor,
        Userhead,
        icon,
        Worklog
    },
    watch:{
        itemid(){
          //this.getcommon()
        }
    },
    created(){
        //this.getcommon()
    },
    methods:{
        getEditorContent(e){
            this.commoneditdescribe.value = e;
        },
        addworklog(){
            this.worklog = true
        },
        getcommon(){
            return
            // var filterQuery = 'RegardingObjectId\teq\t'+this.itemid
            var filterQuery = ''
            if(this.activebtn.commontabactive!=''){
                filterQuery += 'CommentType\teq\t'+this.activebtn.commontabactive
            }
            projectcommentgetlist({
                // filterQuery:filterQuery,
                type:this.activebtn.commontabactive,
                regardingObjectId:this.itemid,
                sort:this.sort,
                entityType: "10C",
                pageSize:1000,
                pageNumber:1
            }).then((res)=>{
                this.commonlist = res.actions[0].returnValue.Data
            })
        },
        commontabchange(type){
            this.activebtn.commontabactive = type
            this.getcommon()
        },
        savecommon(){
            commonapi.entitysaverecord({
                Body:this.commoneditdescribe.value,
                RegardingObjectId:{
                    Id:this.itemid
                },
                CommentType:1,
                RegardingObjectTypeCode:4212
            },20310).then(()=>{
                this.control.writecommon = false
                this.getcommon()
            })
        },
        sortchange(){
            const sort = this.sort=='up'?'down':'up'
            this.sort = sort
            this.getcommon()
        }
    }
}
</script>
<style scoped>
.tabbtn{
    padding: 4px 5px;
    cursor: pointer;
    color: rgb(66, 82, 110) ;
    border-radius: 4px;
    background-color: rgb(243, 243, 245);
    display: inline-block;
    margin-right: 5px;
}
.tabbtn.active{
    color: rgb(244, 245, 247) ;
    background-color: rgb(80, 95, 121);;
}
.manipulate-head{
    color: #666;
}
.manipulate-head .name,.manipulate-head .type{
    color: #000;
}
.manipulate-body{
    margin: 5px;
}
.manipulate-item{
    display: flex;
    margin: 20px 0;
}
.manipulate-left{
    padding: 5px 10px 0 0;
}
.common-paceholder{
    padding: 10px;
    border: 1px solid #dedede;
    border-radius: 4px;
}
.common-container{
    display: flex;
}
.common-container{
    margin-top: 15px;
}
.common-container-left{
    margin-right: 10px;
    padding-top: 5px;
}
.common-container-right{
    flex: 1;
}
.edit-foot{
    margin-top: 10px;
}
.section-title{
    font-weight: 700;
    padding: 0 5px;
}
.section-body{
    margin: 5px 0;
    padding: 0 5px;
}
.sort{
    display: flex;
    float: right;
    cursor: pointer;
    padding: 5px 10px;
    border-radius: 4px;
    align-items: center;
}
.sort>>>svg{
    width: 16px;
    height: 16px;
    margin-left: 1px;
}
.el-empty{
    display: flex;
    justify-content: center;
    width: 100%;
}
.addworklog{
    cursor: pointer;
    color: #108def;
    margin: 10px 0;
}

.css-1lmg9rr {
    margin: 25px auto !important;
    text-align: center;
    max-width: 304px;
}
.css-1marach {
    display: block;
    max-width: var(--max-width);
    max-height: var(--max-height);
    margin: 0px auto 24px;
    border: 0;
}
.css-ra4am {
    font-size: 1.42857em;
    font-style: inherit;
    line-height: 1.2;
    color: var(--ds-text, var(--ds-text, #172B4D));
    font-weight: var(--ds-font-weight-medium, 500);
    letter-spacing: -0.008em;
    margin-top: 0px;
    margin-bottom: 16px;
}
.css-10p4ort {
    margin-top: var(--ds-space-0, 0px);
    margin-bottom: var(--ds-space-300, 24px);
    color: var(--ds-text, #172B4D);
}
.css-shyucn {
    display: flex;
    margin-bottom: var(--ds-space-100, 8px);
    padding-left: var(--ds-space-500, 40px);
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
}
.css-1oy5iav {
    display: inline-flex;
    gap: var(--ds-space-050, 4px);
}
.css-19k3hl7 {
    -webkit-box-align: baseline;
    align-items: baseline;
    box-sizing: border-box;
    display: inline-flex;
    font-size: inherit;
    font-style: normal;
    font-family: inherit;
    font-weight: 500;
    max-width: 100%;
    position: relative;
    text-align: center;
    white-space: nowrap;
    cursor: pointer;
    height: 2.28571em;
    line-height: 2.28571em;
    vertical-align: middle;
    width: auto;
    -webkit-box-pack: center;
    justify-content: center;
    color: var(--ds-link, #0052CC) !important;
    border-width: 0px;
    border-radius: 3px;
    text-decoration: none;
    transition: background 0.1s ease-out 0s, box-shadow 0.15s cubic-bezier(0.47, 0.03, 0.49, 1.38) 0s;
    background: var(--ds-background-neutral-subtle, none);
    padding: 0px 10px;
}
.css-1oy5iav > * {
    flex: 1 0 auto;
}
.css-178ag6o {
    opacity: 1;
    transition: opacity 0.3s ease 0s;
    margin: 0px 2px;
    -webkit-box-flex: 1;
    flex-grow: 1;
    flex-shrink: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.css-177e4pm {
    width: var(--ds-space-300, 24px);
    margin-left: var(--ds-space-200, 16px);
}
.common-container-right .ant-btn{
    margin-right: 10px;
}
</style>