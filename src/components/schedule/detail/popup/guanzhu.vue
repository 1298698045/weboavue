<template>
<div class="container">
<el-popover
    popper-class="noleftpadding"
    placement="bottom"
    width="240"
    trigger="click">
    <template #reference>
        <div class="head-operate-item svgiconbtn">
            <icon name="guanzhu" class="icon" />
            <span class="title">1</span>
        </div>
    </template>
<div class="head hover pointer">
    <icon name="guanzhu" class="icon" />
    <div>停止关注</div>
</div>
<div class="body">
    <div v-if="list>0"><div class="sectontitle">关注此事务</div>
    <div class="bodycontainer hover" v-for="i in list" :key="i">
        <div>
            <Userhead />
        </div>
        <div>jackliu</div>
        <div>
    <icon name="guanbi" class="icon" />
        </div>
    </div>
    </div>
    <div v-else>
        <el-empty :image-size="80" description="还没有关注者"></el-empty>
    </div>
    
</div>
<div class="footer hover pointer">
    <icon name="add" class="icon" />
    <span>添加关注者</span>
</div>
</el-popover>
</div>
  
    
</template>
<script>
import { getIssueWatchers } from "@/utils/projectapi.js"
import Userhead from '@/components/schedule/detail/Userheadphoto.vue'
import icon from '@/components/schedule/detail/icon.vue'
export default {
    data(){
        return{
            list:0
        }
    },
    components:{
        icon,Userhead
    },
    created(){
        //this.getWatchers();
    },
    methods:{
        getWatchers(){
            getIssueWatchers().then((res)=>{
                if(res){
                    
                }
            })
        }
    }
}
</script>
<style scoped>
.head{
    display: flex;
    align-items: center;
    padding:8px 10px;
}
.head>*{
    margin-right: 5px;
}
.bodycontainer{
    display: flex;
    padding: 10px;
    justify-content: space-between;
    align-items: center;
}
.bodycontainer+.bodycontainer{
    border-top:1px solid #dedede ;
}
.sectontitle{
    color: #666;
    font-size: 12px;
    padding:0 10px 0px 10px;
}
.body{
    border-top: 1px solid #dedede;
    border-bottom: 1px solid #dedede;
    padding: 10px 0 5px 0;
}
.bodycontainer>>>.svgicon svg{
    width: 16px;
    height: 16px;
    cursor: pointer;
    visibility: hidden;
}
.bodycontainer:hover>>>.svgicon svg{
    visibility: initial;
}
.footer{
    display: flex;
    align-items: center;
    padding:8px 10px;
    margin-top: 5px;
}
.footer>>>.svgicon svg{
    width: 16px;
    height: 16px;
    margin-right: 50px;
}
.el-empty{
    padding: 15px;
}
</style>