<template>
<div>
    <div v-if="popover">
         <el-popover
            popper-class="nopadding"
            placement="top"
            width="320"
            trigger="hover"
            v-model="visible">
            <template #reference>
                    <div v-if="imgurl==false||!imgurl||imgurl==''" class="item-img" :style="{'height':height,'width':width}">
                        <svg :style="{'height':height,'width':width}" width="24" height="24" viewBox="0 0 24 24" role="presentation"><g fill="currentColor" fill-rule="evenodd"><path d="M6 14c0-1.105.902-2 2.009-2h7.982c1.11 0 2.009.894 2.009 2.006v4.44c0 3.405-12 3.405-12 0V14z"></path><circle cx="12" cy="7" r="4"></circle></g></svg>
                    </div>
                    <div v-else>
                        <img :src="imgurl" >
                    </div>
            </template>
            <div class="head"></div>
            <div class="body">
                <div class="top">
                    <div class="use-img">
                        <div v-if="imgurl==false||!imgurl||imgurl==''" class="item-img" :style="{'height':'90px','width':'90px'}">
                            <svg :style="{'height':'90px','width':'90px'}" width="24" height="24" viewBox="0 0 24 24" role="presentation"><g fill="currentColor" fill-rule="evenodd"><path d="M6 14c0-1.105.902-2 2.009-2h7.982c1.11 0 2.009.894 2.009 2.006v4.44c0 3.405-12 3.405-12 0V14z"></path><circle cx="12" cy="7" r="4"></circle></g></svg>
                        </div>
                        <div v-else>
                            <img :src="imgurl" >
                        </div>
                    </div>
                    <div class="user-msg">
                        <div class="top-username">{{formdata.FullName}}</div>
                        <div>{{formdata.BusinessUnitIdName}}</div>
                    </div>
                </div>
                <div class="bottom">
                    <div class="bottommsg">
                        <i class="el-icon-message"></i>
                        {{formdata.PersonalEMailAddress}}
                    </div>
                    <div class="bottom-btn btn" @click="touserdetail">
                        查看个人资料
                    </div>
                </div>
            </div>
        </el-popover>
    </div>
    <div v-else>
        <div>
                <div v-if="imgurl==false||!imgurl||imgurl==''" class="item-img" :style="{'height':height,'width':width}">
                <svg :style="{'height':height,'width':width}" width="24" height="24" viewBox="0 0 24 24" role="presentation"><g fill="currentColor" fill-rule="evenodd"><path d="M6 14c0-1.105.902-2 2.009-2h7.982c1.11 0 2.009.894 2.009 2.006v4.44c0 3.405-12 3.405-12 0V14z"></path><circle cx="12" cy="7" r="4"></circle></g></svg>
            </div>
            <div>
                <slot></slot>
            </div>
            </div>
    </div>
</div>
        
</template>
<script>
import commonapi from '@/utils/commonapi.js'
export default {
    data(){
        return {
            visible:false,
            formdata:{},
            imgurl:''
        }
    },
    props:['url','height','width','popover','userid'],
    created(){
        if(this.url!=false){
            this.imgurl = this.url
        }else{
            this.imgurl = false
        }
    },
    watch:{
        visible(val){
            if(val==true){
                commonapi.entitygetdetail(8,this.userid).then((res)=>{
                    this.formdata = res.record
                })
            }
        }
    },
    methods:{
        touserdetail(){
            const routerurl = this.$router.resolve({
                path:'/people/information',
                query:{
                    id:this.userid
                }
            })
            window.open(routerurl.href)
        }
    }
}
</script>
<style scoped>
.user-msg{
    margin-top: 15px;
    margin-left: 10px;
}
.item-img{
    background-color:#8993A4;
    color: #fff;
    width: 24px;
    height: 24px;
    border-radius: 50%;
}
.top{
    padding: 20px 20px 10px 20px;
    background-color: rgb(7,71,166);
    color: #fff;
    line-height: 22px;
    display: flex;
    height: 90px;
    box-sizing: border-box;
}
.bottom{
    padding: 20px;
    font-size: 12px;
}
.bottom-btn{
    float: right;
    margin-top: 20px;
}
.bottom::after{
    clear: both;
    display: block;
    content: '';
}
.bottommsg{
    margin-left: 115px;
}
.el-icon-message{
    color: #999;
    margin-right: 5px;
}
.top-username{
    font-size: 16px;
}
</style>