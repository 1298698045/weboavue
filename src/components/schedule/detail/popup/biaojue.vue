<template>
<div class="container">
<el-popover
    popper-class="noleftpadding"
    placement="bottom"
    width="240"
    trigger="click">
    <template #reference>
        <div class="head-operate-item svgiconbtn">
            <icon name="biaojue" class="icon" />
            <span class="title">1</span>
        </div>
    </template>
<div class="head hover pointer" @click="Vote">
    <icon name="biaojue" class="icon" />
    <div>为此事务表决</div>
</div>
<div class="body">
    <div v-if="list>0"><div class="sectontitle">已为此事务表决</div>
    <div class="bodycontainer hover" v-for="i in list" :key="i">
        <div>
            <Userhead />
        </div>
        <div>jackliu</div>
    </div>
    </div>
    <div v-else>
        <el-empty :image-size="80" description="还没有关注者"></el-empty>
    </div>
    
</div>
</el-popover>
</div>
  
    
</template>
<script>
import { IssueVote } from "@/utils/projectapi.js"
import Userhead from '@/components/schedule/detail/Userheadphoto.vue'
import icon from '@/components/schedule/detail/icon.vue'
import { getToken } from '@/utils/auth'
export default {
    data(){
        return{
            list:1,
            userid:'',
            Issueid:''
        }
    },
    components:{
        icon,Userhead
    },
    props:['itemid'],
    watch:{
        itemid(){
            this.Issueid=this.itemid;
        }
    },
    created(){
        this.userid=getToken();
    },
    methods:{
        Vote(){
            IssueVote({userid:this.userid,Issueid:this.Issueid}).then((res)=>{
                if(res.status==1){
                    this.$message.success('点赞成功')
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
    align-items: center;
}
.bodycontainer+.bodycontainer{
    border-top:1px solid #dedede ;
}
.bodycontainer>*{
 margin-right: 15px;   
}
.sectontitle{
    color: #666;
    font-size: 12px;
    padding:0 10px 0px 10px;
}
.body{
    border-top: 1px solid #dedede;
    padding: 10px 0 5px 0;
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