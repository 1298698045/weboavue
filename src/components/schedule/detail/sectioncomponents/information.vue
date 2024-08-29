<template>
<div v-if="show">
<div class="detail-section detail-status">
            <!-- <div class="section-title">状态</div> -->
            <div class="section-body">
                <div class="btn statusCategoryId hover deep" :class="'statusCategoryId'+ruleForm.StateCode.content.statusCategory.id">
                    <choosestatus 
                        @visiblechange="visiblechange"
                        @change="$emit('reload')"
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
                                <div v-if="!edit.OwningUser" @click="edit.OwningUser=true">
                                    <div class="flexbox">
                                        <Userhead :popover="true" :userid="ruleForm.OwningUser.Id"/>
                                        <div>
                                        {{ruleForm.OwningUser.Name}}
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
                                    :defaultdata="[{ID:ruleForm.OwningUser.Id,Name:ruleForm.OwningUser.Name,Icon:''}]"
                                    @change="savedetail('OwningUser')"
                                    v-model="ruleForm.OwningUser.Id"
                                    name="OwningUser"
                                    optionsize="medium"
                                    objtypecode="8" />
                                </div>
                                </el-descriptions-item>
                                <el-descriptions-item label="开始时间">
                                <div class="itemvalue" v-if="!edit.ScheduledStart" @click="editfield('ScheduledStart')">
                                    {{ruleForm.ScheduledStart}}
                                </div>
                                <div v-if="edit.ScheduledStart">
                                    <el-date-picker
                                    @change="savedetail('ScheduledStart')"
                                    @blur="editfieldblur('ScheduledStart')"
                                    ref="ScheduledStart"
                                    size="small"
                                    v-model="ruleForm.ScheduledStart"
                                    type="date"
                                    value-format="yyyy-MM-dd"
                                    placeholder="选择日期时间">
                                    </el-date-picker>
                                </div>
                            </el-descriptions-item>
                            <el-descriptions-item label="截止日期">
                                <div class="itemvalue" v-if="!edit.ScheduledEnd" @click="editfield('ScheduledEnd')">
                                    {{ruleForm.ScheduledEnd}}
                                </div>
                                <div v-if="edit.ScheduledEnd">
                                    <el-date-picker
                                    @change="savedetail('ScheduledEnd')"
                                    @blur="editfieldblur('ScheduledEnd')"
                                    ref="ScheduledEnd"
                                    size="small"
                                    v-model="ruleForm.ScheduledEnd"
                                    type="date"
                                    value-format="yyyy-MM-dd"
                                    placeholder="选择日期时间">
                                    </el-date-picker>
                                </div>
                            </el-descriptions-item>
                            <el-descriptions-item label="优先级" v-if="ruleForm.PriorityCode">
                                <div class="PriorityCodecontainer">
                                    <researchelselect 
                                    size="mini"
                                    @change="savedetail('PriorityCode')"
                                    :selectoptions="ruleForm.PriorityCode.priorities.nodes"
                                    v-model="ruleForm.PriorityCode.content.id"
                                    name="PriorityCode" />
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
                                    <el-tooltip class="item" effect="dark" placement="bottom">
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
                                    size="small" ref="TimeOriginalEstimate" v-model="ruleForm.TimeOriginalEstimate"></el-input>
                                    </el-tooltip>
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
import commonapi from '@/utils/commonapi'
import choosestatus from '@/components/schedule/detail/choosestatus.vue'
import researchelselect from '@/components/schedule/detail/dropbtn/researchelselect.vue'
import Userhead from '@/components/schedule/detail/Userheadphoto.vue'
import { takentformat } from '@/utils/formatdate.js'
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
            show:false
        }
    },
    components:{
        researchelselect,Userhead,choosestatus
    },
    props:['informationdata','showWorkflow'],
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
            setTimeout(() => {
                this.edit[field] = false
            }, 200);
        },
        editfield(field){
            this.edit[field] = true
            this.$nextTick(()=>{
                console.log(this.$refs)
                this.$refs[field].focus()
            })
        },
        savedetail(column){
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
                fields[column] = this.ruleForm.PriorityCode.content.id
            }
            commonapi.entitysaverecord(fields,4200,this.informationdata.id).then(()=>{
                this.$message.success('保存成功')
                this.edit[column] = false
                this.$emit('reload')
            })
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
.el-collapse>>>.el-descriptions-item__label{
    font-weight: 700;
    font-size: 13px;
    color: rgb(66, 82, 110);
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
}
.btn.statusCategoryId{
    padding: 6px 10px;
}
:deep .el-descriptions__cell {
    display: flex;
}
</style>