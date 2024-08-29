<template>
    <div class="dropbtn" :class="{'showmenu':isshowmenu}">
        <el-dropdown trigger="click"
        @visible-change="changeDropdown"
            :hide-on-click="false">
            <span>
            <span class="el-dropdown-link" v-if="numbertype!=1">
                <slot>请选择</slot>
                <!-- <span v-if="shownumber!=false">{{picklistValues&&picklistValues[0]?picklistValues[0]:(checkListlabel&&checkListlabel[0]?checkListlabel[0]:'')}}</span> -->
                <span class="checkListnumber" v-if="shownumber!=false&&checkList.length>0">{{checkList.length}}</span>
                <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <span class="el-dropdown-link" v-if="numbertype==1&&filterdata">
                <span class="el-dropdown-link-text" v-if="checkList.length==1&&computedfilterdata&&computedfilterdata.find((item)=>{return item.name == checkList[0]})">
                {{computedfilterdata.find((item)=>{return item.name == checkList[0]}).label}}
                </span>
                <span class="el-dropdown-link-text" v-else-if="checkList.length>1&&computedfilterdata&&computedfilterdata.find((item)=>{return item.name == checkList[0]})">
               {{computedfilterdata.find((item)=>{return item.name == checkList[0]}).label}}和其他
                {{checkList.length-1}}
                    个值
                </span>
                <span v-else>全部</span>
            </span>
            <span class="el-dropdown-link" v-else-if="numbertype==1&&!filterdata">
                <span class="el-dropdown-link-text" v-if="checkList.length==1">
                {{search.list.find((item)=>{return item.ID == checkList[0]}).Name}}
                </span>
                <span class="el-dropdown-link-text" v-else-if="checkList.length>1">
               {{search.list.find((item)=>{return item.ID == checkList[0]}).Name}}和其他
                {{checkList.length-1}}
                    个值
                </span>
                <span v-else>全部</span>
            </span>
            </span>
            <el-dropdown-menu slot="dropdown">
                    <div class="dropdown-search" v-show="isshowsearch">
                        <el-input @input="searchdata" placeholder="搜索" size="mini" v-model="searchtext" clearable>
                            <i slot="prefix" class="el-input__icon el-icon-search"></i>
                        </el-input>
                    </div>
                    <el-checkbox-group
                    @input="$emit('input', checkList);"
                    v-model="checkList">
                        <div v-if="filterdata">
                            <div class="setfields" v-if="droptype=='setfields'">显示这些字段</div>
                            <el-dropdown-item v-for="item,index in filterdatashow" :key="index">
                                <el-checkbox :label="item.name">
                                    <div class="label-container">
                                        <div v-if="showicon">
                                            <svgicon :name="item.type" />
                                        </div>
                                        <div>{{item.label}}</div>
                                    </div>
                                </el-checkbox>
                            </el-dropdown-item>
                        </div>
                        <div v-else-if="filtertable">
                            <el-dropdown-item v-for="item,index in search.list" :key="index">
                                <el-checkbox :label="item.ID">
                                    <div v-if="checkboxdroptype=='U'" class="user-container">
                                        <div>
                                            <Userhead height="16px" width="16px" :url="item.url"/>
                                        </div>
                                        <div>{{item.Name}}</div>
                                    </div>
                                    <div v-else-if="checkboxdroptype=='status'">
                                        {{item.Name}}
                                    </div>
                                    <div v-else>{{item.Name}}</div>
                                </el-checkbox>
                            </el-dropdown-item>
                        </div>
                        <div v-else>
                            <el-dropdown-item><el-checkbox label="无长篇故事的事务"></el-checkbox></el-dropdown-item>
                            <el-dropdown-item><el-checkbox label="前期规划"></el-checkbox></el-dropdown-item>
                            <el-dropdown-item><el-checkbox label="开发"></el-checkbox></el-dropdown-item> 
                            <el-dropdown-item><el-checkbox label="测试"></el-checkbox></el-dropdown-item> 
                            <el-dropdown-item><el-checkbox label="发布"></el-checkbox></el-dropdown-item> 
                        </div>     
                    </el-checkbox-group>
                    <el-dropdown-item divided v-if="isshowboard">
                        <el-switch v-model="isshowLeft" inactive-text="" @change="changeShow"></el-switch><span class="switchtext">长篇故事 面板</span>
                    </el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </div>
</template>
<script>
import Userhead from '@/components/schedule/detail/Userheadphoto.vue'
import svgicon from '@/components/schedule/detail/icon.vue'
import './dropbtn.css'

export default {
    data(){
        return{
            checkList:this.value,
            searchtext:'',
            isshowmenu:false,
            search:{
                list:[]
            },
            isshowLeft:true,
            isshowboard:true,
            isshowsearch:false,
            checkListlabel:[],
            defaultsearch:{
                list:[]
            },
            droptype:''
        }
    },
    computed:{
        computedfilterdata(){
            return JSON.parse(JSON.stringify(this.filterdata))
        },
        filterdatashow(){
            this.computedfilterdata.forEach((item)=>{
                if(this.format&&(!item.label||!item.name)){
                    item.label = item[this.format.label]
                    item.name = item[this.format.value]
                }
            })
            return this.computedfilterdata.filter((item)=>{
                return item.label&&item.label.indexOf(this.searchtext)!=-1
            })
        }
    },
    components:{
        Userhead,svgicon
    },
    props:['filterdata','value','shownumber','filtertable',
    'referencedEntityObjectTypeCode','picklistValues','operands',
    'checkboxdroptype','numbertype','format','showicon','iconformat','showLeftbox','checkedlistChange','isshowLeftbox','showboard','showsearch','type'],
    watch:{
        isshowLeftbox(){
            this.isshowLeft=this.isshowLeftbox
        },
        value(){
            this.checkList = this.value
        },
        checkList(){
            if(this.filtertable){
                this.defaultsearch.list.forEach((item,index)=>{
                    if(!this.checkList.find((element)=>{return element==item.ID})){
                        this.defaultsearch.list.splice(index,1)
                        this.checkListlabel.splice(index,1)
                    }
                })
                this.checkList.forEach((element)=>{
                    if(!this.defaultsearch.list.find((item)=>{return item.ID==element})){
                        const label = this.search.list.find((item)=>{return item.ID==element}).Name
                        this.defaultsearch.list.push({
                            ID:element,
                            Name:label
                        })
                        this.checkListlabel.push(label)
                    }
                })
            }
            this.$emit('change',this.checkList,this.checkListlabel)
            //console.log(this.checkList)
            this.checkListChange(this.checkList)
        },
        picklistValues(){
            this.checkList = this.picklistValues
        }
        
    },
    created(){
        if(this.showboard==false){
            this.isshowboard=false
            this.$forceUpdate()
        }
        if(this.showsearch==true){
            this.isshowsearch=true
            this.$forceUpdate()
        }
        if(this.type){
            this.droptype=this.type
            this.$forceUpdate()
        }
        
        if(this.filtertable){
            if(this.checkList&&this.checkList.length>0){
                this.checkList.forEach((element,index)=>{
                    const label = this.picklistValues[index]
                    this.defaultsearch.list.push({
                        ID:element,
                        Name:label
                    })
                    this.checkListlabel.push(label)
                })
            }else{
                this.checkList = []
            }
            this.getlookup(this.referencedEntityObjectTypeCode,'list')
        }else{
            if(this.checkList&&this.checkList.length>0){
                // console.log(this.checkList)
                // console.log(this.filterdatashow)
                this.checkList.forEach((element,index)=>{
                    var label=''
                    if(this.filterdatashow){
                        var item=this.filterdatashow.find((item)=>{
                            if(item.name==element){
                                return true
                            }
                            if(item.fieldId==element){
                                return true
                            }
                        })
                        if(item&&item.label){
                            label=item.label
                        }
                    }
                    this.checkListlabel.push(label)
                })
            }else{
                this.checkList = []
            }
        }
    },
    methods:{
        changeDropdown(bool){
            if(bool){
                this.isshowmenu=true;
            }
            else{
                this.isshowmenu=false;
            }
        },
        checkListChange(val){
            if(this.checkedlistChange){
                this.checkedlistChange(val)
            }
        },
        changeShow(val){
            this.showLeftbox(val)
        },
        searchdata(){
            if(this.filtertable){
                this.searchlookup(this.searchtext,this.referencedEntityObjectTypeCode,'list')
            }
            else{

            }
        }
    }
}
</script>
<style scoped>
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
.switchtext{
    font-size: 14px;
    color: #172B4D;
    margin-left: 10px;
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
.setfields{
    height: 30px;
    color: #97A0AF;
    font-size: 12px;
    line-height: 35px;
    padding-left: 10px;
}
</style>
