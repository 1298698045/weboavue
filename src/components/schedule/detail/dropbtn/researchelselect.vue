<template>
    <div class="container" :class="{'mini':size=='mini','user':objtypecode==8||objtypecode==30020}">
        <div class="checkedimg" v-if="value&&value!=''&&showicon!=false">
            <!-- {{showicon}} -->
            <div v-if="type=='group'">
                <img v-if="checkeditem" :class="{'borderradius':borderradius}" 
                :src="checkeditem.avatarValue.large?('@/assets/img/taskdetail'+checkeditem.avatarValue.large):''" alt="">
            </div>
            <div v-else-if="type=='groups'">
                <img v-if="checkeditem" :class="{'borderradius':borderradius}" 
                :src="checkeditem.iconUrl?('@/assets/img/taskdetail'+checkeditem.iconUrl):''" alt="">
            </div>
            <div v-else-if="objtypecode==8||objtypecode==30020">
                <div v-if="checkeditem">
                    <Userhead :url="(checkeditem.Icon!=''?(checkeditem.Icon?('@/assets/img/taskdetail'+checkeditem.Icon):''):false)" class="optionimg" />
                </div>
            </div>
            <img v-else-if="filterables" :class="{'borderradius':borderradius}"  :src="checkeditem&&checkeditem.Icon?('@/assets/img/taskdetail'+checkeditem.Icon):''" alt="" />
            <img v-else :class="{'borderradius':borderradius}"  :src="checkeditem&&checkeditem.iconUrl?('@/assets/img/taskdetail'+checkeditem.iconUrl):''" alt="" />
        </div>
        <el-select
        :disabled="disabled"
          v-if="filterables==true"
          :popper-class="optionsize"
          ref="select"
          :size="size"
          @blur="blur"
          @change="change"
          :value="value"
          :placeholder="placeholder?placeholder:'请选择'"
          :multiple="multiple"
          filterable
          remote
          @visible-change="getlookup(objtypecode,name,type,method,parentid)"
          :remote-method="(query)=>{searchlookup(query,objtypecode,name,type,method,parentid);}"
        >
            <div v-if="type=='group'">
                <el-option-group
                key="recentProjects"
                label="近期项目">
                <el-option
                    v-for="item,index in search[name].recentProjects.nodes"
                    :key="item.id+index"
                    :label="item.name"
                    :value="item.id">
                    <div class="option">
                        <img :class="{'borderradius':borderradius}" :src="item.avatarValue.large" alt="">
                        <div>{{item.name}}</div>
                    </div>
                </el-option>
                </el-option-group>
                <el-option-group
                key="allProjects"
                label="所有项目">
                <el-option
                    v-for="item,index in search[name].allProjects.nodes"
                    :key="item.id+index"
                    :label="item.name"
                    :value="item.id">
                    <div class="option">
                        <img :class="{'borderradius':borderradius}" :src="item.avatarValue.large" alt="">
                        <div>{{item.name}}</div>
                    </div>
                </el-option>
                </el-option-group>
            </div>
            <div v-if="type=='groups'">
                <el-option-group
                v-for="group,index in search[name].nodes"
                :key="group.id+index"
                :label="group.name">
                <el-option
                    v-for="item,index1 in group.nodes"
                    :key="item.id+index1"
                    :label="item.name"
                    :value="item.id">
                    <div class="option">
                        <img :class="{'borderradius':borderradius}" :src="item.iconUrl?('@/assets/img/taskdetail'+item.iconUrl):''" alt="">
                        <div class="item-label" :title="item.name">{{item.name}}</div>
                    </div>
                </el-option>
                </el-option-group>
            </div>
            <div v-else>
                <el-option
                v-for="item,index in search[name]"
                :key="item.ID+index"
                :label="item.Name"
                :value="item.ID"
                :class="{'selected':value==item.ID}"
            >
            <div class="option" >
                <Userhead v-if="objtypecode==8||objtypecode==30020" :url="item.Icon!=''?item.Icon:false" />
                <img v-else :class="{'borderradius':borderradius}" :src="item.Icon" alt="">
                <div>{{item.Name}}<span class="tome" v-if="item.ID==userid&&item.Name!='当前用户'"> (指派给我)</span></div>
            </div>
            </el-option>
            </div>
        </el-select>
        
        <el-select
          v-else-if="picklist==true"
          :disabled="disabled"
          :popper-class="optionsize"
          ref="select"
          :size="size"
          @blur="blur"
          @change="change"
          :value="value1"
          :placeholder="(placeholder?placeholder:'请选择')"
          :multiple="multiple"
          remote
        >
            <el-option
                v-for="item,index in selectoptions"
                :key="item.value+index"
                :label="item.label"
                :value="item.value"
            >
            <div class="option">
                <div>{{item.label}}</div>
            </div>
            </el-option>
        </el-select>
        <el-select v-else :disabled="disabled"
          :popper-class="optionsize"
          ref="select"
          filterable
          :size="size"
          @blur="blur"
          @change="change"
          v-model="value1"
          :value="value1"
          :placeholder="placeholder?placeholder:'请选择'"
          :multiple="multiple"
          remote
        >
            <el-option
                v-for="item,index in selectoptions"
                :key="item.id+index"
                :label="item.name"
                :value="item.id"
            >
            <div class="option">
                <img :class="{'borderradius':borderradius}" :src="item.iconUrl?('@/assets/img/taskdetail'+item.iconUrl):''" alt="">
                <div>{{item.name}}</div>
            </div>
            </el-option>
        </el-select>
    </div>
</template>
<script>
import {getCurrentInstance} from "vue";
import Userhead from '@/components/schedule/detail/Userheadphoto.vue';
import { getToken } from '@/utils/auth'
import { getprojectboardtask } from "@/utils/projectapi.js";
import Interface from "@/utils/Interface.js";
export default {
    data(){
        return {
            search:{},
            defaultsearch:{},
            checkedid:'',
            userid:'',
            proxy:null,
            value1:this.value
        }
    },
    props:['value','name','objtypecode','defaultdata',
    'optionsize','size','focus','borderradius',
    'placeholder','multiple','showicon','type',
    'filterables','selectoptions','picklist','disabled','method',
    'parentid'],
    computed:{
        checkeditem(){
            if(this.type=='group'){
                return this.search[this.name].recentProjects.nodes.find((item)=>{return item.id==this.checkedid})||this.search[this.name].allProjects.nodes.find((item)=>{return item.id==this.checkedid})
            }else if(this.type=='groups'){
                let item = {}
                this.search[this.name].nodes.forEach(nodes => {
                    const searchitem = nodes.nodes.find((items)=>{return items.id==this.checkedid})
                    if(searchitem){
                        item = searchitem
                    }
                });
                return item       
            }else{
                if(this.filterables){
                    return this.search[this.name].find((item)=>{return (item.id||item.ID)==this.checkedid})
                }else{
                    return this.selectoptions.find((item)=>{return (item.id*1==this.checkedid*1)})
                }
            }
        }
    },
    components:{
        Userhead
    },
    methods:{
        change(val){
            this.checkedid = val
            this.$emit('input',val)
            if(typeof val!='object'){
                if(this.type=='group'){
                    this.$emit('change',val,this.checkeditem.name, this.checkeditem.avatarValue.large)
                }else if(this.type=='groups'){
                    this.$emit('change',{
                        val:val,
                        name:this.checkeditem.name,
                        iconUrl:this.checkeditem.iconUrl,
                        timeOriginalEstimate:this.checkeditem.timeOriginalEstimate,
                        timeTracking:this.checkeditem.timeTracking
                    })
                }else {
                    if(this.checkeditem){
                        this.$emit('change',this.name,val,this.checkeditem.Name||this.checkeditem.name||'',this.checkeditem.Icon||this.checkeditem.iconUrl||'')
                    }
                }
            }
        },
        blur(){
            setTimeout(() => {
                this.$emit('blur')
            },200);
        },
        uniqu(array, name){
            var arr = []
            for (var j = 0; j < array.length; j++) {
                if (JSON.stringify(arr).indexOf(array[j][name]) == -1) {
                    arr.push(array[j])
                }
            }
            return arr
        },
        getlookup(objtypecode,name){
            this.searchlookup('', objtypecode, name);
        },
        searchlookup(search, Lktp, fieldApiName){
            var that=this;
            let obj = {
            actions:[{
                    id: "6129;a",
                    descriptor: "",
                    callingDescriptor: "UNKNOWN",
                    params: {
                        objectApiName: 'ActivityPointer',
                        fieldApiName: fieldApiName,
                        pageParam: 1,
                        pageSize: 25,
                        q: search,
                        searchType: "Recent",
                        targetApiName: 'SystemUser',
                        body: {
                            sourceRecord: {
                            apiName: 'ActivityPointer',
                                fields: {
                                    Id: null,
                                    RecordTypeId: ""
                                }
                            }
                        }
                    }
                }]
            }
            if(Lktp=='8'){
                obj.actions[0].params.targetApiName='SystemUser';
            }
            if(Lktp=='30020'){
                obj.actions[0].params.targetApiName='HREmployee';
            }
            let d = {
                message: JSON.stringify(obj)
            }
            this.proxy.$post(Interface.lookup,d).then(res=>{
                let list = res.actions[0].returnValue.lookupResults.records;
                let arr = [];
                list.forEach(item=>{
                    arr.push({
                        ID: item.fields.Id.value=='jackliu'?'2EC00CF2-A484-4136-8FEF-E2A2719C5ED6':item.fields.Id.value,
                        Name: item.fields.Name.value,
                        Icon:''
                    })
                });
                that.search[fieldApiName] = that.search[fieldApiName].concat(arr);
                that.search[fieldApiName] = that.uniqu(that.search[fieldApiName],'ID');
                //console.log(that.search[fieldApiName],that.checkedid,that.userid)
            })
            // proxy.$get(Interface.uilook, {
            //         Lktp: Lktp,
            //         Lksrch: search,
            //     })
            //     .then((res) => {
            //         let listData = res.listData;
            //         data.OwningUserList = listData;
            //     });
        }
    },
    watch:{
        defaultdata(){
            //  console.log(this.defaultdata)
        }
    },
    created(){
        const { proxy } = getCurrentInstance();
        this.proxy=proxy;
        // this.userid=getToken()
        // console.log(this.selectoptions)
        // console.log(this.value,'this.value')
        // console.log(this.name)
        let userInfo=window.localStorage.getItem('userInfo');
        if(userInfo){
            userInfo=JSON.parse(userInfo);
            this.userid=userInfo.userId?(userInfo.userId).toUpperCase():'';
            if(this.userid=='JACKLIU'){
                this.userid='2EC00CF2-A484-4136-8FEF-E2A2719C5ED6'
            }
        }
        this.checkedid = this.value
        if(this.type=='group'){
            this['search'][this.name]={
                recentProjects:{
                    nodes:this.defaultdata||[]
                },
                allProjects:{
                    nodes:[]
                }
            }
        }else if(this.type=='groups'){
            this['search'][this.name]={
                nodes:[{
                    nodes:this.defaultdata||[]
                }]
            }
        }else{
            this['search'][this.name]=this.defaultdata||[];
        }
        this['defaultsearch'][this.name]=this.defaultdata||[];
    },
    mounted(){
        if(this.focus){
            this.$refs.select.focus()
        }
    }
}           
</script>
<style scoped>
    .checkedimg img{
        width: 16px;
        height: 16px;
        position: absolute;
        z-index: 1;
        margin-top: 11px;
        margin-left: 8px;
        pointer-events: none;
    }
    .checkedimg>>>.item-img{
        width: 24px;
        height: 24px;
        position: absolute;
        z-index: 1;
        margin-top: 8px;
        margin-left: 8px;
    }
    .option{
        display: flex;
        align-items: center;
    }
    .option img{
        width: 16px;
        height: 16px;
        margin-right: 10px;
        margin-left: -5px;
    }
    .container{
        position: relative;
    }
    .container .checkedimg+.el-select>>>.el-input__inner{
        padding-left: 30px;
    }
    .container.user .checkedimg+.el-select>>>.el-input__inner{
        padding-left: 40px;
    }
    .container.mini>>>.checkedimg img{
        margin-top: 8px;
    }
    .container.mini>>>.el-input__icon{
        line-height: 30px;
    }
    .container.mini>>>.item-img,.container.mini>>>.item-img svg{
        width: 20px;
        height: 20px;
    }
    .borderradius{
        border-radius: 50%;
    }
    .container>>>.el-input.is-focus .el-input__inner{
        background-color: #fff !important;
    }
    .option>>>.item-img{
        line-height: 24px;
        margin-right: 10px;
    }
    .item-label{
        max-width: 150px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .detail-left-list{
        cursor:pointer;
    }
    :deep .el-select-dropdown__item{
        color:#172B4D !important;
        display:flex !important;
        align-items: center !important;
    }
    .el-select-dropdown__item:hover,.el-select-dropdown__item.selected,.el-select-dropdown__item.hover{
        color:#606266;
        font-weight: normal !important;
        background-color: #ecf5ff !important;
        border-left: 2px solid #0052cc !important;
        padding-left: 18px !important;
    }
    .tome{
        color:#C1C7D0;
    }
    .optionimg{
        position: relative !important;
        top: -2px !important;
    }
</style>