<template>
  <div class="container">
    <el-popover
      popper-class="noleftpadding"
      placement="bottom"
      width="380"
      trigger="click"
      >
      <template #reference>
          <div class="head-operate-item svgiconbtn" style="margin-right:10px">
            <svgicon width="20px" height="25px" class="icon" name="gongxiang"/>
            <span class="title"></span>
          </div>
      </template>
      <div class="popup">
        <div class="popup-head">
            <div class="popup-title">共享</div>
        </div>
        <div class="popup-body">
            <div class="body-main">
            <div class="popup-form">
            <researchelselect 
             placeholder="请选择用户"
             v-model="value1" 
             :multiple="true"
             :showicon="false"
             :borderradius="true"
             optionsize="medium"
             name="OwningUser"
             objtypecode="8" />
            <div class="dec">
                <span>收件人将看到事务名称和您的消息</span>
            </div>
            <el-input placeholder="添加消息" v-model="value2" type="textarea" :rows="3">
            </el-input>
            </div>
        </div>
        
        </div>
        <div class="popup-footer">
            <div class="copyurl" @click="copylink">
                <input ref="copyinput" type="text" style="position: absolute;z-index:-1;opacity: 0">
                <svgicon name="fenxiang" />
                <span>复制链接</span>
            </div>
            <el-button size="small" type="primary">发送</el-button>
        </div>
    </div>
      
    </el-popover>
  </div>
    
</template>
<script>
 import svgicon from '@/components/schedule/detail/icon.vue'
import researchelselect from '@/components/schedule/detail/dropbtn/researchelselect.vue'

  export default {
      components:{
          svgicon,researchelselect
    },
    mounted() {

    },
    data() {
      return {
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
        value1: [],
        value2: ''
      }
    },
    methods: {
      copylink(){
            let href = this.$route.fullPath
            var input = this.$refs.copyinput
            input.value = window.location.host+'/#'+href
            input.select();
            document.execCommand('Copy')
            this.$message.success('复制成功')
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
    height: 180px;
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
.popup-form>>>.el-select{
  max-width: 1000px !important;
  width: 100% !important;
}
.noleftpadding .popup{
    display: block !important;
    position: relative;
    border: 0;
    box-shadow: none;
}
.popup-form .container.user{
  padding: 0;
}
</style>