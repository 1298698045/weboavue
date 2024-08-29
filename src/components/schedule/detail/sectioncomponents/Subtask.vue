<template>
    <div>
        <div class="section-title">
            <span>子任务</span>
            <div class="edit">
            <div class="hover-iconbtn" @click="newrelated">
                <a-tooltip  title="添加" effect="dark"  placement="bottom">
                    <icon  name="add" />
                </a-tooltip>
            </div>
            </div>
            </div>
            <div class="progress" v-if="relatedlist.length>0">
                <el-progress :stroke-width="10" :percentage="percentage?Number(percentage):0" :format="format"></el-progress>
            </div>
            <div class="section-body" >
                <div class="detail-related-list" v-if="relatedlist.length>0">
                    <draggable
                    class="contentlist"
                    v-model="relatedlistmove"
                    animation="300"
                    dragClass="dragClass"
                    ghostClass="ghostClass"
                    chosenClass="chosenClass"
                    @start="onStart"
                    @end="onEnd"
                    >
                    <div class="detail-related-item" v-for="(item,index) in relatedlistmove" :key="item.id">
                        <div class="relateditem-left">
                            <div class="relateditem-icon">
                                <img :src='"/static/img"+item.fields.issuetype.iconUrl' alt="">
                            </div>
                            <div class="relateditem-name">
                                <span class="keytext" @click="opendetail(item.id||'')">{{item.key||''}}</span>
                            </div>
                            <div class="relateditem-title">
                                <div v-show="!item.edit">
                                    <span v-html="item.fields.summary"></span>
                                    <i class="el-icon-edit"  @click="openedit(index,item)"></i>
                                </div>
                                <div v-show="item.edit">
                                    <input
                                    class="searchinput"
                                    @change="edited(item)"
                                    @keydown="(e) => finishedit(e, item)"
                                    @keydown.stop="(e) => finishedit(e, item)"
                                    @blur="(e) => finishedit(27, item)"
                                    ref="relateditem"
                                    size="mini" type="text" v-model="item.fields.summary" />
                                </div>
                            </div>
                        </div>
                        <div class="relateditem-right">
                            <div class="relateditem-priorityCode" @click="item['editPriorityCode']=true">
                                <div v-if="!item.editPriorityCode" class="relateditem-icon">
                                    <img :src='"/static/img"+item.fields.priority.iconUrl' alt="">
                                </div>
                                <div v-else>
                                    <researchelselect 
                                    :focus="true"
                                    @blur="item.editPriorityCode = false"
                                    size="mini"
                                    @change="edited(item)"
                                    :selectoptions="priorities.nodes"
                                    v-model="item.fields.priority.id"
                                    name="PriorityCode" />
                                </div>
                            </div>
                            <div class="relateditem-user" @click="item['edituser']=true">
                                <div v-if="!item.edituser" :title="item.fields.assignee.displayName||''" class="relateditem-user-text">
                                <Userhead :userid="item.fields.assignee.accountId"/>
                                <span >{{item.fields.assignee.displayName||''}}</span>
                                </div>
                                <div v-else>
                                    <researchelselect 
                                    :focus="true"
                                    :filterables="true"
                                    :borderradius="true"
                                    @blur="item.edituser = false"
                                    :defaultdata="[{ID:item.fields.assignee.accountId,Name:item.fields.assignee.displayName,Icon:''}]"
                                    @change="(id,name,icon)=>OwningUserchange(item,id,name,icon)"
                                    v-model="item.fields.assignee.accountId"
                                    name="OwningUser"
                                    size="mini"
                                    optionsize="medium"
                                    objtypecode="8" />
                                </div>
                            </div>
                            <div class="relateditem-status" @click="item['editstatus']=true">
                                <div v-if="!item.editstatus">
                                    <el-tag type="info" v-if="item.fields.status.statusCategory.id == 1" size="mini">{{item.fields.status.name||''}}<i class="el-icon-arrow-down el-icon--right"></i></el-tag>
                                    <el-tag size="small" v-if="item.fields.status.statusCategory.id == 2">{{item.fields.status.name||''}}<i class="el-icon-arrow-down el-icon--right"></i></el-tag>
                                    <el-tag type="success" v-if="item.fields.status.statusCategory.id == 3" size="mini">{{item.fields.status.name||''}}<i class="el-icon-arrow-down el-icon--right"></i></el-tag>
                                </div>
                                <div v-else>
                                    <el-select
                                        filterable
                                        v-model="item.fields.status.id"
                                        @blur="closeedited(item)"
                                        @change="edited(item)"
                                        placeholder="请选择"
                                        x-placement="bottom-start"
                                    >
                                        <!-- <template #prefix>
                                        <el-tag v-if="item.fields.status.statusCategory.id == 1" type="info" size="mini">{{item.fields.status.name||''}}</el-tag>
                                        <el-tag v-if="item.fields.status.statusCategory.id == 2" size="mini">{{item.fields.status.name||''}}</el-tag>
                                        <el-tag v-if="item.fields.status.statusCategory.id == 3" type="success" size="mini">{{item.fields.status.name||''}}</el-tag>
                                        </template> -->
                                        <el-option
                                        v-for="options in statuss.nodes"
                                        :key="options.statusId"
                                        :label="options.name"
                                        :value="options.statusId"
                                        >
                                        <el-tag v-if="options.statusCategoryId == 1" type="info" size="mini">{{options.name}}</el-tag>
                                        <el-tag v-if="options.statusCategoryId == 2" size="mini">{{options.name}}</el-tag>
                                        <el-tag v-if="options.statusCategoryId == 3" type="success" size="mini">{{options.name}}</el-tag>
                                        </el-option>
                                    </el-select>
                                </div>

                            </div>
                        </div>
                    </div>
                    </draggable>

                </div>
                <div class="newtask" v-show="shownewtask">
                    <div class="searchinput">
                    <input  @keydown="savetask" ref="newtaskcontainer" class="el-input__inner" v-model="newtasksubject" placeholder="需要做什么"/>

                    </div>

                    <div class="newtaskfooter">
                        <a-button @click="savetask" :class="{'active':newtasksubject!=''}" type="primary" size="small">创建</a-button>
                        <div @click="shownewtask=false" size="small" class="hoverbtn">取消</div>
                    </div>
                </div>
            </div>
            <el-dialog title="子任务详情" v-model="subdetaildialog" width="80%" top="5vh" append-to-body>
                <subitemdetail :itemid="subdetailtaskid" @close="subdetaildialog=false" ></subitemdetail>
            </el-dialog>
    </div>
</template>
<script>
import commonapi from '@/utils/commonapi.js'
import { ListViewRankAfter, ListViewRankBefore } from '@/utils/projectapi.js'
import researchelselect from '@/components/schedule/detail/dropbtn/researchelselect.vue'
import Userhead from '@/components/schedule/detail/Userheadphoto.vue'
import icon from '@/components/schedule/detail/icon.vue'
import draggable from "vuedraggable"

export default {
    data(){
        return{
            subdetaildialog:false,
            subdetailtaskid:'',
            clicktime:false,
            newtasksubject:'',
            shownewtask:false,
            relatedlistmove:[]
        }
    },
    props:['itemid','relatedlist','priorities','statuss'],
    watch:{
        relatedlist(){
            this.relatedlistmove = this.relatedlist||[]
        }
    },
    computed:{
      completedsubtask(){
          return this.relatedlistmove.filter((item)=>{return item.fields.status.statusCategory.id==3})
      },
      percentage(){
          if(this.relatedlistmove.length==0){
              return 0
          }
          var percent=((this.completedsubtask.length/this.relatedlistmove.length)*100).toFixed(1)
          return percent
      }
    },
    components:{
        Userhead,
        commonapi,
        researchelselect,
        icon,
        subitemdetail: () => import('@/components/schedule/detail/detail.vue'),
        draggable
    },
    created(){
        this.relatedlistmove = this.relatedlist
        // this.getdata()
    },
    methods:{
        opendetail(id){
            this.subdetaildialog=true
            this.subdetailtaskid=id
        },
        onStart(){},
        onEnd(e){
            const rowid = e.item._underlying_vm_.id
            if(e.newIndex==0){
                ListViewRankBefore({relativeIssueId:this.relatedlistmove[1].id,issueId:rowid})
            }else{
                ListViewRankAfter({relativeIssueId:this.relatedlistmove[e.newIndex-1].id,issueId:rowid})
            }
        },
        reload(){
            // this.getdata()
            this.$emit('reload')
        },
        format(percentage) {
            return `${percentage}%已完成` ;
        },
        OwningUserchange(item,id,name,icon){
            item.edituser = false
            this.edited(item)
        },
        closeedited(item){
            var that=item;
            setTimeout(function(){
                that.editstatus=false
            },100)
        },
        openedit(index,item){
            this[item]['edit']=true;
            this.$nextTick(()=>{
                this.$refs.relateditem[index].focus()
            })
        },
        finishedit(e, item) {
            if(e==27){
                if(item.Subject==''){
                    this.reload()
                }else{
                    item.edit = false
                }
            }
            if(e.keyCode == 13){
                
                item.edit = false
            }
        },
        edited(item){
            //console.log(item)
            if(item.fields.summary!=''){
                const fields = {
                    ParentActivityId:{Id:this.itemid},
                    Subject:item.fields.summary,
                    RegardingObjectId:{Id:this.$route.query.id},
                    ActivityTypeCode:4212,
                    StateCode:item.fields.status.id,
                    PriorityCode:item.fields.priority.id,
                    OwningUser:{Id:item.fields.assignee.accountId},
                    IssueType:10010
                }
                commonapi.entitysaverecord(fields,4200,item.id).then(()=>{
                    this.$message.success('保存成功')
                    this.reload()
                })
            }
        },
        newrelated(){
            this.shownewtask = true
            this.$nextTick(()=>{
                this.$refs.newtaskcontainer.focus()
            })
        },
        getdata(){
            const filterQuery = 'ParentActivityId\teq\t'+this.itemid
            commonapi.entitygridsearch('00U',filterQuery).then((res)=>{
                this.relatedlist = res.rows
            })
        },
        savetask(){
            if(this.newtasksubject!=''){
                commonapi.entitysaverecord({
                    Subject:this.newtasksubject,
                    RegardingObjectId:{Id:this.$route.query.id},
                    ActivityTypeCode:4212,
                    ParentActivityId:{Id:this.itemid},
                    IssueType:10010
                },4200).then(()=>{
                    this.newtasksubject = ''
                    this.$message.success('保存成功')
                    this.reload()
                    this.newrelated()
                })
            }
        }
    }
}
</script>
<style scoped>
.edit-foot{
    margin-top: 10px;
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
.detail-related-item{
    display: flex;
    justify-content: space-between;
    cursor: pointer;
    align-items: center;
    height: 40px;
}
.detail-related-item+.detail-related-item{
    border-top: 1px solid #dedede;
}
.detail-related-item:hover{
    background-color: #f3f3f3;
}
.detail-related-item>div{
    display: flex;
}
.detail-related-item>div>div{
    margin-right: 10px;
}
.detail-related-list{
    padding:3px;
    border: 1px solid #dedede;
    border-radius: 4px;
}
.relateditem-title i{
    margin-left: 3px;
    cursor: pointer;
    display: none;
}
.detail-related-item:hover i{
    display: inline-block;
}
.el-dropdown-menu__item{
    padding: 0 50px 0 10px;
    border-left: 2px solid transparent;
    line-height: 32px;
}
.el-dropdown-menu__item:hover{
    border-left: 2px solid #0052CC;
    background-color: rgb(244,245,247);
}
.el-tag--mini{
    height: 22px;
    line-height: 22px;
}
.relateditem-title input{
    border: 2px solid rgb(76,144,255);
    outline: none;
    height: 22px;
    line-height: 22px;
    text-indent: 5px;
    border-radius: 4px;
    width: 200px;
}
.detail-body{
    padding: 0 0 0 35px;
    display: flex;
    justify-content: space-between;
    height: calc(100vh - 150px);
}
.detail-body>div{
    overflow: auto;
    height: 100%;
}
.detail-section {
    margin: 15px 0;
}
.section-title{
    font-weight: 700;
    padding: 0 5px;
    display: flex;
    justify-content: space-between;
}
.edit>>>svg{
    width: 16px;
    height: 16px;
}
.edit>>>.hover-iconbtn{
    height: 24px;
    width: 24px;
}
.section-body{
    margin: 5px 0;
    padding: 0 5px;
}
.detail-describe .section-body{
    padding: 0;
}
.placeholder{
    color: #777;
    border-radius: 4px;
    cursor: pointer;
    padding: 7px 5px;
}
.placeholder:hover{
    background-color: rgb(231, 231, 233);
}
.progress{
    padding: 5px;
}
.el-progress{
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.progress>>>.el-progress-bar{
    margin-right: -100px;
    padding-right: 100px;
}
.progress>>>.el-progress__text{
    font-size: 14px !important;
}
.newtask{
    margin-top: 10px;
}
.newtaskfooter{
    margin-top: 10px !important;
    text-align: right !important;
}
.newtaskfooter>button{
    margin-right: 5px !important;
    height: 31px !important;
    background-color: rgba(9,30,66,0.04) !important;
    color: #A5ADBA !important;
}
.newtaskfooter>button>>>span{
    /* background-color: rgba(9,30,66,0.04) !important; */
}
.newtaskfooter>button.active{
    background-color: #0052CC !important;
    color: #fff !important;
}
.relateditem-icon img{
    width: 16px;
    height: 16px;
}
.relateditem-left{
    flex: 1;
    align-items: center;
}
.relateditem-icon{
    display: flex;
    align-items: center;
}
.relateditem-title{
    flex: 1;
}
.relateditem-title>div{
    width: 100%;
}
.relateditem-title input{
    width: 100%;
}
.relateditem-priorityCode{
    display: flex;
}
.keytext:hover{
  text-decoration: underline;
}
.opendetail>span{
  display: flex;
  align-items: center;
}
.opendetail:hover .copylink{
    visibility: initial;
}
.opendetail{
  display: flex;
  justify-content: space-between;
}
.relateditem-user-text{
    display: flex;
    align-items: center;
    /* width: 76px; */
}
.relateditem-user-text>span{
    margin-left: 10px;
    position: relative;
    top: 1px;
}
.relateditem-right>>>.item-img{
    margin-top: 4px !important;
}
.relateditem-right>>>.checkedimg{
    margin-top: 4px !important;
}
.relateditem-right>>>.relateditem-icon{
    position: relative;
    top: 1px;
}
.relateditem-status{
    display: flex;
    align-items: center;
    position: relative;
    top: 1px;
}
.relateditem-status>div .el-tag{
    line-height: 20px !important;
    height: 22px !important;
}
.detail-related .el-input__inner {
    -webkit-appearance: none;
    background-color: #fff;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    height: 40px;
    line-height: 40px;
    outline: 0;
    padding: 0 15px;
    -webkit-transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    width: 100%;
}
.detail-related .hoverbtn{
    padding: 6px 10px;
    cursor: pointer;
    color: #42526e !important;
    border-radius: 4px;
    display: inline-block;
}
</style>