<template>
    <div class="dropbtn" :class="{'showmenu':isshowmenu2}">
        <el-dropdown trigger="click"
        @visible-change="changeDropdown"
            :hide-on-click="false">
            <span>
            <span class="el-dropdown-link" v-if="numbertype!=1">
                <slot>请选择</slot>
                <span v-if="shownumber!=false&&checkList&&checkList.length>0">{{picklistValues&&picklistValues[0]?picklistValues[0]:(checkListlabel&&checkListlabel[0]?checkListlabel[0]:'')}}</span>
                <span class="checkListnumber" v-if="shownumber!=false&&checkList&&checkList.length>1">{{'+'+(checkList.length-1)}}</span>
                <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <span class="el-dropdown-link" v-if="numbertype==1&&filterdata">
                <span class="el-dropdown-link-text" v-if="checkList&&checkList.length==1">
                {{computedfilterdata.find((item)=>{return item.name == checkList[0]}).label}}
                </span>
                <span class="el-dropdown-link-text" v-else-if="checkList&&checkList.length>1">
               {{computedfilterdata.find((item)=>{return item.name == checkList[0]}).label}}和其他
                {{checkList.length-1}}
                    个值
                </span>
                <span v-else>全部</span>
            </span>
            <span class="el-dropdown-link" v-else-if="numbertype==1&&!filterdata">
                <span class="el-dropdown-link-text" v-if="checkList&&checkList.length==1">
                {{search.list.find((item)=>{return item.ID == checkList[0]}).Name}}
                </span>
                <span class="el-dropdown-link-text" v-else-if="checkList&&checkList.length>1">
               {{search.list.find((item)=>{return item.ID == checkList[0]}).Name}}和其他
                {{checkList.length-1}}
                    个值
                </span>
                <span v-else>全部</span>
            </span>
            </span>
            <el-dropdown-menu slot="dropdown" ref="elDropdown" class="lang-select-dropdown">
                    <div class="dropdown-search">
                        <el-input @input="searchdata" placeholder="搜索" size="mini" v-model="searchtext" clearable>
                            <i slot="prefix" class="el-input__icon el-icon-search"></i>
                        </el-input>
                    </div>
                    <el-checkbox-group
                    @input="$emit('input', checkList);"
                    @change="$emit('change', checkList,checkListlabel);"
                    v-model="checkList">
                        <div v-if="filterdata">
                            <template v-for="item,k in filterdatashow" >
                                <el-dropdown-item :key="k+'e'" v-if="item.label!='项目'&&item.label!='事务类型'&&item.label!='状态'&&item.label!='经办人'&&checkList&&checkList.find((element=>{return (item.name == element)}))">
                                    <el-checkbox :label="item.name">
                                        <div class="label-container">
                                            <div v-if="showicon">
                                                <svgicon :name="item.type" />
                                            </div>
                                            <div>{{item.label}}</div>
                                        </div>
                                    </el-checkbox>
                                </el-dropdown-item>
                            </template>
                            <template v-for="item,k in filterdatashow" >
                                <el-dropdown-item :key="k+'f'" v-if="item.label!='项目'&&item.label!='事务类型'&&item.label!='状态'&&item.label!='经办人'&&checkList&&!checkList.find((element=>{return (item.name == element)}))">
                                    <el-checkbox :label="item.name">
                                        <div class="label-container">
                                            <div v-if="showicon">
                                                <svgicon :name="item.type" />
                                            </div>
                                            <div>{{item.label}}</div>
                                        </div>
                                    </el-checkbox>
                                </el-dropdown-item>
                            </template>
                        </div>
                        <div v-else-if="filtertable">
                            <template v-for="item,k in search.list">
                                <el-dropdown-item :key="k+'o'" v-if="item.Name=='当前用户'">
                                    <el-checkbox :label="item.ID">
                                        <div v-if="checkboxdroptype=='U'" class="user-container">
                                            <div>
                                                <Userhead height="16px" width="16px" :url="item.url"/>
                                            </div>
                                            <div>当前用户</div>
                                        </div>
                                    </el-checkbox>
                                </el-dropdown-item>
                            </template>
                            <template v-for="item,k in search.list">
                                <el-dropdown-item :key="k+'a'" v-if="(item.Name!='当前用户')&&(item.ID==$route.query.id)&&checkList&&checkList.find((element=>{return (item.ID == element)}))">
                                    <el-checkbox :label="item.ID">
                                        <div v-if="checkboxdroptype=='U'" class="user-container">
                                            <div>
                                                <Userhead height="16px" width="16px" :url="item.url"/>
                                            </div>
                                            <div>{{item.Name}}</div>
                                        </div>
                                        <div v-else-if="checkboxdroptype=='project'">
                                            <div class="checkbox-img"><img :src="item.IconUrl?('/static/img'+item.IconUrl):'/static/img/images/icons/project/project00015.svg'" alt=""></div>
                                            <div>{{item.Name}}</div>
                                        </div>
                                        <div v-else-if="checkboxdroptype=='IssueType'">
                                            <div class="checkbox-img"><img :src="item.IconUrl?('/static/img'+item.IconUrl):(item.Name=='任务'?'/static/img/images/icons/issuetypes/task.svg':'/static/img/images/icons/issuetypes/subtask.png')" alt=""></div>
                                            <div>{{item.Name}}</div>
                                        </div>
                                        <div v-else-if="checkboxdroptype=='status'">
                                            <div class="statusCategoryId hover statusCategoryId0" v-if="item.ID==1">{{item.Name}}</div>
                                            <div class="statusCategoryId hover statusCategoryId1" v-if="item.ID==2">{{item.Name}}</div>
                                            <div class="statusCategoryId hover statusCategoryId2" v-if="item.ID==3">{{item.Name}}</div>
                                        </div>
                                        <div v-else-if="checkboxdroptype=='StatusCategory'">
                                            <div class="statusCategoryId hover statusCategoryId0" v-if="item.key=='new'">{{item.Name}}</div>
                                            <div class="statusCategoryId hover statusCategoryId1" v-else-if="item.key=='indeterminate'">{{item.Name}}</div>
                                            <div class="statusCategoryId hover statusCategoryId2" v-else-if="item.key=='done'">{{item.Name}}</div>
                                            <div class="statusCategoryId hover statusCategoryId3" v-else>{{item.Name}}</div>
                                        </div>
                                        <div v-else>{{item.Name}}</div>
                                    </el-checkbox>
                                </el-dropdown-item>
                            </template>
                            <template v-for="item,k in search.list">
                                <el-dropdown-item :key="k+'b'" v-if="(item.Name!='当前用户')&&(item.ID!=$route.query.id)&&checkList&&checkList.find((element=>{return (item.ID == element)}))">
                                    <el-checkbox :label="item.ID">
                                        <div v-if="checkboxdroptype=='U'" class="user-container">
                                            <div>
                                                <Userhead height="16px" width="16px" :url="item.url"/>
                                            </div>
                                            <div>{{item.Name}}</div>
                                        </div>
                                        <div v-else-if="checkboxdroptype=='project'">
                                            <div class="checkbox-img"><img :src="item.IconUrl?('/static/img'+item.IconUrl):'/static/img/images/icons/project/project00015.svg'" alt=""></div>
                                            <div>{{item.Name}}</div>
                                        </div>
                                        <div v-else-if="checkboxdroptype=='IssueType'">
                                            <div class="checkbox-img"><img :src="item.IconUrl?('/static/img'+item.IconUrl):(item.Name=='任务'?'/static/img/images/icons/issuetypes/task.svg':'/static/img/images/icons/issuetypes/subtask.png')" alt=""></div>
                                            <div>{{item.Name}}</div>
                                        </div>
                                        <div v-else-if="checkboxdroptype=='status'">
                                            <div class="statusCategoryId hover statusCategoryId0" v-if="item.ID==1">{{item.Name}}</div>
                                            <div class="statusCategoryId hover statusCategoryId1" v-if="item.ID==2">{{item.Name}}</div>
                                            <div class="statusCategoryId hover statusCategoryId2" v-if="item.ID==3">{{item.Name}}</div>
                                        </div>
                                        <div v-else-if="checkboxdroptype=='StatusCategory'">
                                            <div class="statusCategoryId hover statusCategoryId0" v-if="item.key=='new'">{{item.Name}}</div>
                                            <div class="statusCategoryId hover statusCategoryId1" v-else-if="item.key=='indeterminate'">{{item.Name}}</div>
                                            <div class="statusCategoryId hover statusCategoryId2" v-else-if="item.key=='done'">{{item.Name}}</div>
                                            <div class="statusCategoryId hover statusCategoryId3" v-else>{{item.Name}}</div>
                                        </div>
                                        <div v-else>{{item.Name}}</div>
                                    </el-checkbox>
                                </el-dropdown-item>
                            </template>
                            <template v-for="item,k in search.list">
                                <el-dropdown-item :key="k+'c'" v-if="(item.Name!='当前用户')&&checkList&&!checkList.find((element=>{return (item.ID == element)}))">
                                    <el-checkbox :label="item.ID">
                                        <div v-if="checkboxdroptype=='U'" class="user-container">
                                            <div>
                                                <Userhead height="16px" width="16px" :url="item.url"/>
                                            </div>
                                            <div>{{item.Name}}</div>
                                        </div>
                                        <div v-else-if="checkboxdroptype=='project'">
                                            <div class="checkbox-img"><img :src="item.IconUrl?('/static/img'+item.IconUrl):'/static/img/images/icons/project/project00015.svg'" alt=""></div>
                                            <div>{{item.Name}}</div>
                                        </div>
                                        <div v-else-if="checkboxdroptype=='IssueType'">
                                            <div class="checkbox-img"><img :src="item.IconUrl?('/static/img'+item.IconUrl):(item.Name=='任务'?'/static/img/images/icons/issuetypes/task.svg':'/static/img/images/icons/issuetypes/subtask.png')" alt=""></div>
                                            <div>{{item.Name}}</div>
                                        </div>
                                        <div v-else-if="checkboxdroptype=='status'">
                                            <div class="statusCategoryId hover statusCategoryId0" v-if="item.ID==1">{{item.Name}}</div>
                                            <div class="statusCategoryId hover statusCategoryId1" v-if="item.ID==2">{{item.Name}}</div>
                                            <div class="statusCategoryId hover statusCategoryId2" v-if="item.ID==3">{{item.Name}}</div>
                                        </div>
                                        <div v-else-if="checkboxdroptype=='StatusCategory'">
                                            <div class="statusCategoryId hover statusCategoryId0" v-if="item.key=='new'">{{item.Name}}</div>
                                            <div class="statusCategoryId hover statusCategoryId1" v-else-if="item.key=='indeterminate'">{{item.Name}}</div>
                                            <div class="statusCategoryId hover statusCategoryId2" v-else-if="item.key=='done'">{{item.Name}}</div>
                                            <div class="statusCategoryId hover statusCategoryId3" v-else>{{item.Name}}</div>
                                        </div>
                                        <div v-else>{{item.Name}}</div>
                                    </el-checkbox>
                                </el-dropdown-item>
                            </template>
                            <template v-for="item,k in search.list">
                                <el-dropdown-item :key="k+'d'" v-if="(item.Name!='当前用户')&&(!checkList||checkList==[])">
                                    <el-checkbox :label="item.ID">
                                        <div v-if="checkboxdroptype=='U'" class="user-container">
                                            <div>
                                                <Userhead height="16px" width="16px" :url="item.url"/>
                                            </div>
                                            <div>{{item.Name}}</div>
                                        </div>
                                        <div v-else-if="checkboxdroptype=='project'">
                                            <div class="checkbox-img"><img :src="item.IconUrl?('/static/img'+item.IconUrl):'/static/img/images/icons/project/project00015.svg'" alt=""></div>
                                            <div>{{item.Name}}</div>
                                        </div>
                                        <div v-else-if="checkboxdroptype=='IssueType'">
                                            <div class="checkbox-img"><img :src="item.IconUrl?('/static/img'+item.IconUrl):(item.Name=='任务'?'/static/img/images/icons/issuetypes/task.svg':'/static/img/images/icons/issuetypes/subtask.png')" alt=""></div>
                                            <div>{{item.Name}}</div>
                                        </div>
                                        <div v-else-if="checkboxdroptype=='status'">
                                            <div class="statusCategoryId hover statusCategoryId0" v-if="item.ID==1">{{item.Name}}</div>
                                            <div class="statusCategoryId hover statusCategoryId1" v-if="item.ID==2">{{item.Name}}</div>
                                            <div class="statusCategoryId hover statusCategoryId2" v-if="item.ID==3">{{item.Name}}</div>
                                        </div>
                                        <div v-else-if="checkboxdroptype=='StatusCategory'">
                                            <div class="statusCategoryId hover statusCategoryId0" v-if="item.key=='new'">{{item.Name}}</div>
                                            <div class="statusCategoryId hover statusCategoryId1" v-else-if="item.key=='indeterminate'">{{item.Name}}</div>
                                            <div class="statusCategoryId hover statusCategoryId2" v-else-if="item.key=='done'">{{item.Name}}</div>
                                            <div class="statusCategoryId hover statusCategoryId3" v-else>{{item.Name}}</div>
                                        </div>
                                        <div v-else>{{item.Name}}</div>
                                    </el-checkbox>
                                </el-dropdown-item>
                            </template>
                        </div>
                        <div v-else>
                            <el-dropdown-item><el-checkbox label="暂无选项"></el-checkbox></el-dropdown-item>
                        </div>     
                    </el-checkbox-group>
                    <el-dropdown-item divided>
                        <span class="switchtext1" @click="clearSelect" v-if="checkList&&checkList.length&&filtertable">清空选择</span>
                        <span class="switchtext2" v-if="filtertable">共 {{search&&search.list&&search.list.length?search.list.length:0}} 个</span>
                    </el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </div>
</template>
<script>
import { getprojectboardtask, getStatusCategory } from "@/utils/projectapi.js"
import Userhead from '@/components/schedule/detail/Userheadphoto.vue'
import svgicon from '@/components/schedule/detail/icon.vue'
import { getToken } from '@/utils/auth'
import './dropbtn.css'
export default {
    data(){
        return{
            checkList:this.value,
            searchtext:'',
            isshowmenu2:false,
            search:{
                list:[]
            },
            isshowLeft:true,
            checkListlabel:[],
            defaultsearch:{
                list:[]
            },
            userid:''
        }
    },
    computed:{
        computedfilterdata(){
            if(this.filterdata){
                return JSON.parse(JSON.stringify(this.filterdata))
            }
            
        },
        filterdatashow(){
            if(this.computedfilterdata){
            this.computedfilterdata.forEach((item)=>{
                if(this.format&&(!item.label||!item.name)){
                    item.label = item[this.format.label]
                    item.name = item[this.format.value]
                }
            })
            return this.computedfilterdata.filter((item)=>{
                return item.label&&item.label.indexOf(this.searchtext)!=-1
            })
        }}
    },
    components:{
        Userhead,svgicon
    },
    props:['filterdata','value','shownumber','filtertable',
    'referencedEntityObjectTypeCode','picklistValues','operands',
    'checkboxdroptype','numbertype','format','showicon','iconformat','showLeftbox','checkedlistChange','isshowLeftbox','isshowmenu','isshowmenuchange'],
    watch:{
        isshowmenu(){
            this.isshowmenu2=this.isshowmenu
        },
        isshowmenu2(){
            //console.log(this.checkList)
            //this.isshowmenuchange(this.isshowmenu2)
        },
        isshowLeftbox(){
            this.isshowLeft=this.isshowLeftbox
        },
        value(){
            this.checkList = this.value
        },
        checkList(){
            if(this.checkList&&this.checkList!='undefined'){
                if(this.checkList&&typeof this.checkList !='object'&&this.checkList!='undefined'){
                    var a=[];
                    a.push(this.checkList);
                    this.checkList=a;
                }
                if(this.filtertable){
                    this.defaultsearch.list=[]
                    this.checkListlabel=[]
                    
                    this.checkList.forEach((element)=>{
                        const searchitem=this.search.list.find((item)=>{return item.ID==element})
                        const label = searchitem&&searchitem.Name?searchitem.Name:''
                        this.defaultsearch.list.push({
                            ID:element,
                            Name:label
                        })
                        if(element==this.$route.query.id){
                            this.checkListlabel.unshift(label)
                        }
                        else{
                            this.checkListlabel.push(label)
                        }
                    })
                }
                if(this.checkList&&this.checkList.length){
                    //this.$emit('change',this.checkList,this.checkListlabel)
                }
                //this.$emit('change',this.checkList,this.checkListlabel)
                //this.checkListChange(this.checkList)
            }
        },
        picklistValues(){
            //this.checkList = this.picklistValues
        }
    },
    created(){
        //console.log(this.checkList)
        this.userid=getToken();
        if(this.filtertable){
            if(this.checkList!='undefined'&&this.checkList&&typeof this.checkList !='object'){
                var a=[];
                a.push(this.checkList);
                this.checkList=a;
            }
            
            if(this.checkList[0]&&this.checkList.length>0){
                this.checkList.forEach((element,index)=>{
                    const label = (this.picklistValues&&this.picklistValues[index]&&this.picklistValues[index]!='undefined')?this.picklistValues[index]:(this.checkList&&this.checkList[index]&&this.checkList[index]!='undefined'?this.checkList[index]:'');
                    this.defaultsearch.list.push({
                        ID:element,
                        Name:label
                    })
                    if(element==this.$route.query.id||element==this.userid){
                        this.checkListlabel.unshift(label)
                    }
                    else{
                        this.checkListlabel.push(label)
                    }
                })
            }
            else{
                this.checkList = []
            }
        }else{
            if(this.checkList!='undefined'&&this.checkList&&this.checkList[0]&&this.checkList.length>0){
                if(typeof this.checkList !='object'){
                    var a=[];
                    a.push(this.checkList);
                    this.checkList=a;
                }
                this.checkList.forEach((element,index)=>{
                    const filterdatashowitem=this.filterdatashow.find((item)=>{
                        if(item.name==element){
                            return true
                        }
                        if(item.fieldId==element){
                            return true
                        }
                    })
                    const label = filterdatashowitem&&filterdatashowitem.label?filterdatashowitem.label:''
                    this.checkListlabel.push(label)
                })
            }else{
                this.checkList = []
            }
        }
        
        //console.log(this.checkListlabel)
    },
    mounted(){
        const dropdownMenu = this.$refs['elDropdown'] // 找到dropdown下面的dropdownMenu
        dropdownMenu.$data.currentPlacement = 'bottom-start'
    },
    methods:{
        changeDropdown(bool){
            if(bool){
                this.isshowmenu2=true;
                if(this.referencedEntityObjectTypeCode&&this.referencedEntityObjectTypeCode!='undefined'){
                    this.getlookup(this.referencedEntityObjectTypeCode,'list')
                }
                else{
                    var item='';
                    if(this.checkboxdroptype=='IssueType'){
                        // this.search.list=[
                        //     {ID:'task',Name:'任务'},
                        //     {ID:'subtask',Name:'子任务'},
                        // ]
                        // commonapi.entitygetdetail(122,'').then((res)=>{
                        //     if(res&&res.context&&res.context.picklistValuesMap&&res.context.picklistValuesMap[item]){
                        //             var datalist=[];
                        //     }
                        // })
                        var that=this;
                        getprojectboardtask({
                            projectId:that.$route.query.id,
                            search:'',
                            OwningUser:'',
                            filterQuery:''
                        }).then((res)=>{
                            if(res&&res.data&&res.data.boardScope){
                                that.search.list=[];
                                const datalist=res.data.boardScope.projectLocation.issueTypes;
                                datalist.find(function(item,index){
                                    that.search.list.push({
                                        ID:item.id,
                                        IconUrl:item.iconUrl,
                                        Name:item.name
                                    })
                                })
                                window.list=that.search.list;
                            }
                        })
                    }
                    if(this.checkboxdroptype=='status'){
                        this.search.list=[
                            {ID:1,Name:'待办'},
                            {ID:2,Name:'正在进行'},
                            {ID:3,Name:'已完成'},
                        ]
                    }
                    if(this.checkboxdroptype=='StatusCategory'){
                        var that=this;
                        getStatusCategory().then((res)=>{
                            if(res&&res.length){
                                that.search.list=[];
                                res.find(function(item,index){
                                    that.search.list.push({
                                        ID:item.id,
                                        key:item.key,
                                        Name:item.name
                                    })
                                })
                                window.list=that.search.list;
                            }
                        })
                    }
                }
                window.list=this.search.list;

            }
            else{
                this.isshowmenu2=false;
            }
            
        },
        checkListChange(val){
            if(this.checkedlistChange){
                this.checkedlistChange(val)
            }
        },
        clearSelect(){
            this.checkList=[];
            this.checkListlabel=[];
            this.$emit('change',[],[]);
            //console.log(this.checkList)
            // this.$forceUpdate()
        },
        searchdata(){
            if(this.filtertable&&this.referencedEntityObjectTypeCode&&this.referencedEntityObjectTypeCode!=8){
                this.searchlookup(this.searchtext,this.referencedEntityObjectTypeCode,'list')
            }
            else{
                if(this.searchtext){
                    var list=this.search.list
                    var that=this
                    this.search.list=[]
                    list.find(function(item,index){
                        if((item.Name).indexOf(that.searchtext)!=-1){
                            that.search.list.push(item)
                        }
                    })
                }
                else{
                    this.search.list=window.list;
                }
                
            }
        }
    }
}
</script>
<style scoped>
.statusCategoryId {
    padding: 1px 4px;
    display: inline-block;
    height: 18px;
    line-height: 18px;
    border-radius: 4px;
    overflow: hidden;
    font-weight: 700;
    margin-top: 2px;
    font-size: 12px;
}
.statusCategoryId0 {
    color: #42526E !important;
    background-color: #dfe1e6 !important;
}
.statusCategoryId1 {
    color: #0747A6 !important;
    background-color: #deebff !important;
}
.statusCategoryId2 {
    color: #006644 !important;
    background-color: #e3fcef !important;
}
.statusCategoryId3{
    color: #42526E !important;
    background-color: #fff !important;
}
.statusCategoryId.hover {
    cursor: pointer;
}

.IssueType{
    display: flex;
    justify-content: center;
    align-items: center;
}
.project{
    display: flex;
    justify-content: center;
    align-items: center;
}
.el-checkbox__label>div{
    display: flex;
    justify-content: center;
    align-items: center;
}
.checkbox-img{
    line-height: 0px;
    margin-right: 5px;
}
.checkbox-img img{
    width: 16px;
    height: 16px;
}
.dropdown-search{
    padding: 0 10px;
    border-bottom: 2px solid #eceaea;
    /* display: none; */
}
.el-input>>>.el-input__inner{
    outline: none;
    border: 0;
}
.el-checkbox-group{
    max-height: 300px;
    overflow: auto;
}
.user-container,.el-checkbox{
    display: flex;
    align-items: center;
    line-height: 32px;
    height: 32px;
}
.user-container>div{
    margin-right: 5px;
}
.user-container>>>.item-img{
    line-height: 18px;
}
.label-container{
    display: flex;
    align-items: center;
    color:#172B4D;
}
.label-container>div{
    margin-right: 5px;
}
.switchtext1{
    font-size: 14px;
    color: #172B4D;
    margin-left: 0px;
    float: left;
}
.switchtext2{
    font-size: 14px;
    color: #172B4D;
    margin-left: 0px;
    float: right;
}
.el-dropdown-menu>>>.el-switch__core {
    zoom: 0.8;
    width: 42px;
    height: 20.8px;
}
.el-dropdown-menu>>>.el-switch.is-checked .el-switch__core {
    background-color: #00875A;
    color: #FFFFFF;
    border-color: #00875A;
}
.checkListnumber{
    width: 17px;
    border-radius: 50%;
}
.dropbtn{
    border-radius: 3px;
}
.dropbtn:hover{
    border-radius: 3px;
}
.showmenu{
    background:#253858 !important;
}
.showmenu .el-dropdown{
    color: #F4F5F7 !important;
}
.el-dropdown-link .el-icon--right{
    font-weight: 700;
    font-size: 12px;
}
.el-dropdown-menu>>>.el-checkbox__label{
    color: #172B4D !important;
}
.el-dropdown-menu>>>.el-checkbox__inner{
    border: 2px solid #8993A4;
}
.el-dropdown-menu>>>.el-checkbox__input.is-checked .el-checkbox__inner{
    background-color: rgb(0, 82, 204);
    border: 2px solid rgb(0, 82, 204);
}
.el-dropdown-menu>>>.el-checkbox__input.is-checked .el-checkbox__inner::after{
    top: 0px;
    left: 3px;
    border: 2px solid #FFF;
    border-top: 0;
    border-left: 0;
}
.dropbtn{
    padding: 6px 10px !important;
}
.checkListnumber{
    background-color: var(--ds-background-brand-bold, #97A0AF);
    color: var(--ds-text-inverse, #172B4D);
    min-width: 25px;
    border-radius: 22px;
}
.lang-select-dropdown {
    margin-left: -10px !important;
}
</style>
