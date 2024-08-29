<template>
<el-popover
      placement="bottom"
      width="450"
      trigger="click"
      >
      <div class="popup">
        <div class="popup-head">
            <div class="popup-title">通知</div>
            <div class="showall">
                <el-switch size="mini"
                v-model="value1"
                inactive-text="仅显示未读">
                </el-switch>
            </div>
        </div>
        <div class="popup-body">
            <div class="body-main">
            <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="直接" name="first">

    </el-tab-pane>
    <el-tab-pane label="已关注" name="second">

    </el-tab-pane>
  </el-tabs>
  <div class="body-des">
      <div>最新</div>
      <div class="readall">全部标记为已读</div>
  </div>
  <div class="manipulate-list" >
                        <div class="manipulate-item" v-for="i in 10" :key="i">
                            <div class="manipulate-left">
                                <Userhead :width="'40px'" :height="'40px'" />
                            </div>
                            <div class="manipulate-right">
                                <div class="manipulate-head">
                                    <span class="name">jack liu</span>
                                    <span class="type">将</span>
                                    <span class="project">oa项目</span>
                                    <span class="movement">的</span>
                                    <span class="type">截止日期</span>
                                    <span class="movement">改变为</span>
                                    <span class="message">2021年10月11日</span>
                                </div>
                                <div class="manipulate-body">
                                    <span class="type">
                                        <img src="/static/img/svg/viewavatar.svg" alt="">
                                    </span>
                                    <div class="taskname">任务一</div>
                                </div>
                                <div class="manipulate-body">
                                    <div class="">oa-17 · 已完成</div>
                                </div>
                            </div>
                        </div>
                    </div>
        </div>
        
        </div>
    </div>
      <div slot="reference">
        <svgicon class="icon" name="tongzhi"/>
      </div>
    </el-popover>
    
</template>
<script>
 import svgicon from '@/components/schedule/detail/icon.vue'
import Userhead from '@/components/schedule/detail/Userheadphoto.vue'

  export default {
      components:{
          svgicon,Userhead
    },
    mounted() {

    },
    data() {
      return {
          activeName:'first',
          value1:false,        
          options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value2: ''
      }
    },
    methods: {
     handleClick(){

     },
      closepopup(){
          this.$parent.$parent.addpeopledialog = false
      }
    }
  }
</script>
<style scoped>

.popup-title{
    font-size: 18px;
    color: #000;
}
.popup-head{
    padding: 10px;
    display: flex;
    justify-content: space-between;
}
.popup-body{
    height: 300px !important;
    overflow: auto;
    padding:0 10px;
    box-sizing: border-box;
}
.popup-footer{
    display: flex;
    justify-content: space-between;
    padding: 10px 10px;
}
.item-title{
    margin: 20px 0 10px 0;
}
.el-select{
    width: 100%;
}
.dec{
    margin: 10px 0 20px 0;
    color: #6B778C;
    font-size: 12px;
}
.copyurl{
    color: #6B778C;
    cursor: pointer;
    display: flex;
    align-items: center;
}
.copyurl>span{
    margin-right: 5px;
}
.copyurl>>>path{
    fill: #fff;
}
.body-des{
    display: flex;
    justify-content: space-between;
    font-size: 12px;
}
.readall{
    cursor: pointer;
}
.readall:hover{
    color: #409EFF;
}
.manipulate-head{
    color: #333;
    font-size: 12px;
    margin-bottom: 5px;
    }
.manipulate-item{
    display: flex;
    margin: 20px 0;
}
.manipulate-left{
    padding: 5px 10px 0 0;
}
.manipulate-head .name,.manipulate-head .project{
    color: #3b73af;
    cursor: pointer;
}
.manipulate-body{
    display: flex;
    color: #666;
    font-size: 12px;
}
.manipulate-body .time{
    margin-left: 10px;
}
.manipulate-body .comment{
    margin-left: 10px;
    color: #3b73af;
    cursor: pointer;
}
.commentbox{
    padding-bottom: 10px;
}
.commentbox textarea{
    width: 100%;
    padding: 5px;
}
.taskname{
    margin-left: 5px;
}
</style>