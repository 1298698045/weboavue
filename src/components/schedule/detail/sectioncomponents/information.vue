<template>
<div v-if="show">
<div class="detail-section detail-status">
            <!-- <div class="section-title">状态</div> -->
            <div class="section-body">
                <div class="btn statusCategoryId hover deep" :style="{'pointer-events':!isAdmin?'none':'unset'}" :class="'statusCategoryId'+ruleForm.StateCode.content.statusCategory.id">
                    <choosestatus 
                        @visiblechange="visiblechange"
                        @change="savedetail"
                        :rowid="ruleForm.id" 
                        :label="ruleForm.StateCode.content.name" 
                        :statusId="ruleForm.StateCode.content.id"
                        :statusdata="ruleForm.StateCode.statuss.nodes"
                        :showWorkflow="showWorkflow"
                        />
                </div>
            </div>
        </div>
        <div class="detail-section">
            <div class="section-body">
    <el-collapse v-model="value">
        <el-collapse-item title="固定字段" name="1">
                        <el-descriptions title="" :column=1>
                            <el-descriptions-item label="经办人">
                                <div v-if="!edit.OwningUser||!isAdmin" @click="edit.OwningUser=true">
                                    <div class="flexbox">
                                        <Userhead :popover="true" :userid="ruleForm.OwningUser.Id"/>
                                        <div>
                                        {{ruleForm.OwningUser.Name}}
                                        </div>
                                    </div>
                                </div>
                                <div v-if="edit.OwningUser&&isAdmin">
                                    <researchelselect 
                                    :size="'mini'"
                                    :disabled="false"
                                    :focus="true"
                                    :filterables="true"
                                    :borderradius="true"
                                    @blur="editfieldblur('OwningUser')"
                                    :defaultdata="[{ID:ruleForm.OwningUser.Id,Name:ruleForm.OwningUser.Name,Icon:''}]"
                                    @change="savedetail"
                                    v-model="ruleForm.OwningUser.Id"
                                    :value="ruleForm.OwningUser.Id"
                                    :name="'OwningUser'"
                                    :optionsize="'medium'"
                                    :objtypecode="'8'" />
                                </div>
                                </el-descriptions-item>
                                <el-descriptions-item label="开始时间">
                                <div class="itemvalue" v-if="!edit.ScheduledStart" @click="editfield('ScheduledStart')">
                                    {{ruleForm.ScheduledStart}}
                                </div>
                                <div v-if="edit.ScheduledStart">
                                    <a-date-picker
                                    @change="savedetail('ScheduledStart')"
                                    @blur="editfieldblur('ScheduledStart')"
                                    ref="ScheduledStart"
                                    :size="'small'"
                                    v-model:value="ruleForm.ScheduledStart"
                                    type="date"
                                    valueFormat="YYYY-MM-DD"
                                    placeholder="选择日期时间">
                                    </a-date-picker>
                                </div>
                            </el-descriptions-item>
                            <el-descriptions-item label="截止日期">
                                <div class="itemvalue" v-if="!edit.ScheduledEnd" @click="editfield('ScheduledEnd')">
                                    {{ruleForm.ScheduledEnd}}
                                </div>
                                <div v-if="edit.ScheduledEnd">
                                    <a-date-picker
                                    @change="savedetail('ScheduledEnd')"
                                    @blur="editfieldblur('ScheduledEnd')"
                                    ref="ScheduledEnd"
                                    :size="'small'"
                                    v-model:value="ruleForm.ScheduledEnd"
                                    type="date"
                                    valueFormat="YYYY-MM-DD"
                                    placeholder="选择日期时间">
                                    </a-date-picker>
                                </div>
                            </el-descriptions-item>
                            <el-descriptions-item label="优先级" v-if="ruleForm.PriorityCode">
                                <div class="PriorityCodecontainer" :class="{'PriorityCodecontainer1':(!edit.PriorityCode||!isAdmin)}" @click="edit.PriorityCode=true">
                                    <researchelselect 
                                    :size="'mini'"
                                    @change="savedetail"
                                    @blur="editfieldblur('PriorityCode')"
                                    :selectoptions="ruleForm.PriorityCode.priorities.nodes"
                                    v-model="ruleForm.PriorityCode.content.id"
                                    :value="ruleForm.PriorityCode.content.id"
                                    :name="'PriorityCode'" />
                                </div>
                            </el-descriptions-item>
                        </el-descriptions>
                    </el-collapse-item>
    </el-collapse >
    <el-collapse v-model="value">

                    <el-collapse-item title="详细信息" name="2">
                        <el-descriptions title="" :column=1>
                            <!-- <el-descriptions-item label="报告人">
                                <div v-if="!edit.OwningUser" @click="edit.OwningUser=true">
                                    <div class="flexbox">
                                        <Userhead :popover="true" :userid="ruleForm.OwningUser.Id"/>
                                        <div>
                                        {{ruleForm.CreatedBy.Name}}
                                        </div>
                                    </div>
                                </div>
                                <div v-if="edit.OwningUser">
                                    <researchelselect 
                                    size="mini"
                                    :focus="true"
                                    :borderradius="true"
                                    @blur="edit.OwningUser = false"
                                    :filterables="true"
                                    :defaultdata="[{ID:ruleForm.OwningUser.Id,Name:ruleForm.OwningUser.Name,Icon:ruleForm.OwningUser.Icon}]"
                                    @change="savedetail('OwningUser')"
                                    v-model="ruleForm.OwningUser.Id"
                                    name="OwningUser"
                                    optionsize="medium"
                                    objtypecode="8" />
                                </div>
                                </el-descriptions-item> -->
                            
                            <el-descriptions-item label="原始预估">
                                <div class="itemvalue" v-if="!edit.TimeOriginalEstimate" @click="editfield('TimeOriginalEstimate')">
                                    {{takentformat(ruleForm.TimeOriginalEstimate)}}
                                </div>
                                <div v-if="edit.TimeOriginalEstimate">
                                    <a-tooltip class="item" effect="dark" placement="bottom">
                                        <template #title>
                                            <div class="tipsli">
                                                使用此格式：2w 4d 6h 45m<br/>
                                                <ul>
                                                    <li>w = 周</li>
                                                    <li>d = 天</li>
                                                    <li>h = 小时</li>
                                                    <li>m = 分钟</li>
                                                </ul>
                                            </div>
                                        </template>
                                    <el-input
                                     @change="savedetail('TimeOriginalEstimate')" 
                                     @blur="editfieldblur('TimeOriginalEstimate')"
                                    :size="'small'" ref="TimeOriginalEstimate" v-model="ruleForm.TimeOriginalEstimate"></el-input>
                                    </a-tooltip>
                                </div>
                            </el-descriptions-item>
                            <!-- <el-descriptions-item label="部门">
                                
                            </el-descriptions-item> -->
                        </el-descriptions>
                    </el-collapse-item>
    </el-collapse >
    <el-collapse v-model="value">

                    <el-collapse-item title="更多字段" name="3">
                        <el-descriptions title="" :column=1>
                           
                           
                            <el-descriptions-item label="创建时间">
                                {{ruleForm.CreatedOn}}
                            </el-descriptions-item>
                            <el-descriptions-item label="创建人">
                                    <div class="flexbox">

                                <Userhead :popover="true" :userid="ruleForm.CreatedBy.Id"/>
                                <div>
                                {{ruleForm.CreatedBy.Name}}

                                </div>
                                </div>
                            </el-descriptions-item>
                            <!-- <el-descriptions-item label="报告人">kooriookami</el-descriptions-item> -->
                        </el-descriptions>
                    </el-collapse-item>
                    </el-collapse>
                    </div>
                    </div>

            </div>
</template>
<script>
import {getCurrentInstance} from "vue";
import commonapi from '@/utils/commonapi'
import choosestatus from '@/components/schedule/detail/choosestatus.vue'
import researchelselect from '@/components/schedule/detail/dropbtn/researchelselect.vue'
import Userhead from '@/components/schedule/detail/Userheadphoto.vue'
import { takentformat } from '@/utils/formatdate.js'
import Interface from "@/utils/Interface.js";
import dayjs from 'dayjs';
export default {
    data(){
        return {
            value:['1'],
            edit:{
                OwningUser:'',
                PriorityCode:'',
                ScheduledEnd:'',
                ScheduledStart:'',
                CreatedBy:'',
                TimeOriginalEstimate:''
            },
            ruleForm:{
                StateCode:{content:{statusCategory:{id:''}}}
            },
            search:{
                OwningUser:[]
            },
            defaultsearch:{
                OwningUser:[]
            },
            show:false,
            proxy:null
        }
    },
    components:{
        researchelselect,Userhead,choosestatus
    },
    props:['informationdata','showWorkflow','isAdmin'],
    watch:{
        informationdata:{
            handler(){
                this.ruleForm = this.informationdata.record
                this.defaultsearch.OwningUser.push({
                    ID:this.ruleForm.OwningUser.Id,
                    Name:this.ruleForm.OwningUser.Name
                })
                this.search.OwningUser.push({
                    ID:this.ruleForm.OwningUser.Id,
                    Name:this.ruleForm.OwningUser.Name
                })
                this.show = true
            },
            deep: true,
        }
    },
    beforecreated(){
    },
    created(){
        const { proxy } = getCurrentInstance();
        this.proxy=proxy;
        //console.log(this.informationdata)
    },
    mounted(){
        this.informationdata.record = {
                    Subject:'测试',
                    Description:'',
                    OwningUser:{
                        Id:'',
                        Name:''
                    },
                    CreatedBy:{
                        Id:'',
                        Name:'',
                        Icon:''
                    },
                    PriorityCode:'',
                    ScheduledStart:'',
                    ScheduledEnd:'',
                    IssueType:'',
                    IssueKey:'',
                    StateCode:{content:{statusCategory:{id:''},id:'',name:''},statuss:{nodes:[]}},
                    RegardingObjectId:{
                        id:'',
                        name:'',
                        avatarValue:{
                            large:''
                        }
                    },
                    subtask:[],
                    id:'',
                    TimeOriginalEstimate:''
                }
    },
    methods:{
        takentformat(val){
            return takentformat(val)
        },
        visiblechange(val){
            if(val==false){
                this.statusindex = null
            }
        },
        editfieldblur(field){
            if(this.isAdmin){}else{
                return false;
            }
            setTimeout(() => {
                this.edit[field] = false
            }, 200);
        },
        editfield(field){
            if(this.isAdmin){}else{
                return false;
            }
            this.edit[field] = true
            this.$nextTick(()=>{
                //console.log(this.$refs)
                this.$refs[field].focus()
            })
        },
        savedetail(column,val){
            if(column=='TimeOriginalEstimate'){
                var pattern = /^((\d+[w]\s)?|(\d+[w])\b)((\d+[d]\s)|(\d+[d])\b)?((\d+[h]\s)|(\d+[h])\b)?(\d+[m])?$/ 
                if(!pattern.test(this.ruleForm[column])){
                    this.$message.error('请输入正确格式');
                    return false
                }
            }
            const fields = {}
            fields[column] = this.ruleForm[column]
            fields['Description'] = this.ruleForm['Description']
            if(column=='PriorityCode'){
                fields[column] = val||''
            }
            if(column=='ScheduledStart'||column=='ScheduledEnd'){
                fields[column] = this.ruleForm[column]?dayjs(this.ruleForm[column]).format("YYYY-MM-DD"):''
            }
            if(column=='OwningUser'){
                fields[column] = val||''
            }
            if(column=='StateCode'){
                fields[column] = val||''
            }
            // commonapi.entitysaverecord(fields,4200,this.informationdata.id).then(()=>{
            //     this.$message.success('保存成功')
            //     this.edit[column] = false
            //     this.$emit('reload')
            // })
            var that=this;
            let url = Interface.edit;
            let d = {
                actions:[{
                    id: "2919;a",
                    descriptor: "",
                    callingDescriptor: "UNKNOWN",
                    params: {
                        recordId: that.ruleForm.id,
                        recordInput:{
                            allowSaveOnDuplicate: false,
                            apiName: 'ActivityPointer',
                            objTypeCode: '4200',
                            fields: fields
                        }
                    }
                }]
            };
            let obj = {
                message: JSON.stringify(d)
            }
            this.proxy.$post(url, obj).then((res) => {
                 that.$message.success('保存成功')
                 that.edit[column] = false
                 that.$emit('reload')
            });
        }
    }
}
</script>
<style scoped>
.el-collapse>>>.el-descriptions-item__container{
    justify-content:space-between;
}
.el-collapse>>>.el-descriptions-item__content{
    width: 60%;
    display: block;
    font-size: 13px;
}
:deep .el-collapse .el-descriptions-item__label,:deep .el-collapse .el-descriptions__label{
    font-weight: 700 !important;
    font-size: 13px !important;
    color: rgb(66, 82, 110) !important;
}
.el-collapse>>>.el-descriptions-item__label::after{
    content: '';
}
.el-collapse{
    border: 1px solid #EBEEF5;
    padding: 0 10px;
}
.el-collapse>>>.el-collapse-item__header{
    font-weight: 700;
}
.el-collapse>>>.el-collapse-item__header.is-active{
    border-bottom: 1px solid #dedede;
}
.el-collapse>>>.el-collapse-item__content{
    padding: 10px 0 0 5px;
}
.section-title {
    font-weight: 700;
    padding: 0 5px;
}
.section-body{
    margin: 5px 0;
    padding: 0 5px;
}
.detail-section {
    margin-bottom: 15px ;
}
.flexbox{
    display: flex;
    align-items: center;
}
.flexbox>div{
    margin-right: 10px;
}
.el-collapse{
    margin-bottom: 10px;
    border-radius: 4px;
}
.itemvalue{
    width: 100%;
    height: 100%;
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
.PriorityCodeicon{
    width: 16px;
    height: 16px;
}
.item-container{
    display: flex;
    align-items: center;
}
.item-container>span{
    display: flex;
    align-items: center;
    margin-right: 10px;
}
.PriorityCodecontainer{
    margin-left: -5px;
}
.PriorityCodecontainer>>>.el-input__suffix{
    display: none;
}
.PriorityCodecontainer>>>.el-input__inner{
    border-color: transparent;
    background-color: transparent;
    padding-left: 20px !important;
}
.btn.statusCategoryId{
    padding: 6px 10px;
    height: 30px;
    min-width: 65px;
    width: auto;
    line-height: 18px;
    margin-top: 0;
    margin-bottom: -2px;
}
:deep .el-descriptions__cell {
    display: flex;
}
:deep .el-descriptions__content .container{
    padding: 0 !important;
    position: relative;
    top: -4px;
}
:deep .PriorityCodecontainer1 .el-select .el-input__wrapper{
    box-shadow: none !important;
}
:deep .el-descriptions__label:not(.is-bordered-label){
    display: flex;
    align-items: center;
}
:deep .el-descriptions__content:not(.is-bordered-label){
    min-width: 200px;
    height: 25px;
    position: relative !important;
    top: 0px;
}
</style>
<style>
.statusCategoryId {
  padding: 2px 4px;
  display: inline-block;
  height: 18px;
  line-height: 14px;
  border-radius: 4px;
  overflow: hidden;
  font-weight: 700;
  margin-top: 5px;
}
.statusCategoryId.hover {
  cursor: pointer;
}
.statusCategoryId .el-dropdown-link {
  font-size: 14px !important;
}
.status1style {
  color: #42526E !important;
  background-color: #dfe1e6 !important;
}
.status1hoverstyle {
  color: #42526E !important;
  background-color: #a5adba !important;
}
.status2style {
  color: #0747A6 !important;
  background-color: #deebff !important;
}
.status2hoverstyle {
  color: #fff !important;
  background-color: #0052cc !important;
}
.status3style {
  color: #006644 !important;
  background-color: #e3fcef !important;
}
.status3hoverstyle {
  color: #fff !important;
  background-color: #00875a !important;
}
.statusCategoryId1 {
  color: #42526E !important;
  background-color: #dfe1e6 !important;
}
.statusCategoryId1 .el-dropdown-link {
  color: #42526E !important;
  background-color: #dfe1e6 !important;
}
.statusCategoryId1.hover:hover {
  color: #42526E !important;
  background-color: #a5adba !important;
}
.statusCategoryId1.hover:hover .el-dropdown-link {
  color: #42526E !important;
  background-color: #a5adba !important;
}
.statusCategoryId2 {
  color: #0747A6 !important;
  background-color: #deebff !important;
}
.statusCategoryId2 .el-dropdown-link {
  color: #0747A6 !important;
  background-color: #deebff !important;
}
.statusCategoryId2.hover:hover,
.statusCategoryId2.deep {
  color: #fff !important;
  background-color: #0052cc !important;
}
.statusCategoryId2.hover:hover .el-dropdown-link,
.statusCategoryId2.deep .el-dropdown-link {
  color: #fff !important;
  background-color: #0052cc !important;
}
.statusCategoryId3 {
  color: #006644 !important;
  background-color: #e3fcef !important;
}
.statusCategoryId3 .el-dropdown-link {
  color: #006644 !important;
  background-color: #e3fcef !important;
}
.statusCategoryId3.hover:hover,
.statusCategoryId3.deep {
  color: #fff !important;
  background-color: #00875a !important;
}
.statusCategoryId3.hover:hover .el-dropdown-link,
.statusCategoryId3.deep .el-dropdown-link {
  color: #fff !important;
  background-color: #00875a !important;
}
body .el-collapse-item__header {
    margin: 0 -10px;
    padding: 0 10px;
    font-size: 14px;
    color: #172b4d;
    font-weight: 700;
}
.el-descriptions__cell .el-descriptions__content .ant-picker-input{
    height: 26px !important;
}
</style>