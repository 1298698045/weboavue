<template>
    <div class="container" :class="{'mini':size=='mini','user':objtypecode==8||objtypecode==30020}">
        <div class="checkedimg" v-if="value&&value!=''&&showicon!=false">
            <!-- {{showicon}} -->
            <div v-if="type=='group'">
                <img v-if="checkeditem" :class="{'borderradius':borderradius}" 
                :src="checkeditem.avatarValue.large||checkeditem.avatarValue.large
                " alt="">
            </div>
            <div v-else-if="type=='groups'">
                <img v-if="checkeditem" :class="{'borderradius':borderradius}" 
                :src="'/static/img'+(checkeditem.iconUrl||'')" alt="">
            </div>
            <div v-else-if="objtypecode==8||objtypecode==30020">
                <div v-if="checkeditem">
                    <Userhead :url="(checkeditem.Icon!=''?checkeditem.Icon:false)" />
                </div>
            </div>
            <img v-else-if="filterables" :class="{'borderradius':borderradius}"  :src="checkeditem&&checkeditem.Icon?checkeditem.Icon:''" alt="" />
            <img v-else :class="{'borderradius':borderradius}"  :src="'/static/img'+(checkeditem&&checkeditem.iconUrl?checkeditem.iconUrl:'')" alt="" />
        </div>
        <el-select
        :disabled="disabled"
          v-if="filterables==true"
          :popper-class="optionsize"
          ref="select"
          :size="size"
          @blur="blur"
          @input="change"
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
                        <img :class="{'borderradius':borderradius}" :src="'/static/img'+(item.iconUrl||'')" alt="">
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
          @input="change"
          :value="value"
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
        <el-select
          v-else
          :disabled="disabled"
          :popper-class="optionsize"
          ref="select"
          :size="size"
          @blur="blur"
          @input="change"
          :value="value"
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
                <img :class="{'borderradius':borderradius}" :src="'/static/img'+(item.iconUrl||'')" alt="">
                <div>{{item.name}}</div>
            </div>
            </el-option>
        </el-select>
    </div>
</template>
<script>
import Userhead from '@/components/schedule/detail/Userheadphoto.vue'
import { getToken } from '@/utils/auth'
export default {
    data(){
        return {
            search:{},
            defaultsearch:{},
            checkedid:'',
            userid:''
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
                    return this.selectoptions.find((item)=>{return (item.id||item.Id||item.value)==this.checkedid})
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
                        this.$emit('change',val,this.checkeditem.Name||this.checkeditem.name||'',this.checkeditem.Icon||this.checkeditem.iconUrl||'')
                    }
                }
            }
        },
        blur(){
            setTimeout(() => {
                this.$emit('blur')
            },200);
        }
    },
    watch:{
        defaultdata(){
            //  console.log(this.defaultdata)
        }
    },
    created(){
        this.userid=getToken()
        // console.log(this.selectoptions)
        // console.log(this.value,'this.value')
        // console.log(this.name)
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
    .el-select-dropdown__item{
        color:#172B4D !important;
        display:flex !important;
        align-items: center !important;
    }
    .el-select-dropdown__item.selected{
        color:#172B4D;
        font-weight: normal;
    }
    .tome{
        color:#C1C7D0;
    }
</style>