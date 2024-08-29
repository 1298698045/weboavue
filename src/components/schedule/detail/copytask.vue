<template>
<div class="container">
    <el-dialog
    :append-to-body="true"
  :visible.sync="dialogVisible"
  width="30%">
  <div class="popup">
        <div class="popup-head">
            <div class="popup-title">复制任务</div>
        </div>
        <div class="popup-body">
            <div class="body-main">
            <div class="popup-form">
            <div class="item-title">摘要</div>
              <el-input v-model="ruleForm.Subject"></el-input>
            </div>
        </div>
        
        </div>
        <div class="popup-footer">
            <el-button size="small" @click="closepopup">取消</el-button>
            <el-button size="small" type="primary" @click="save">保存</el-button>
        </div>
    </div>
</el-dialog>
</div>
    
</template>
<script>
import commonapi from '@/utils/commonapi.js'
import researchelselect from '@/components/schedule/detail/dropbtn/researchelselect.vue'

  export default {
    data() {
      return {
        dialogVisible:false,
        defaultdata:{project:[]},
        ruleForm:{
            Subject:''
        }
      }
    },
    components:{
        researchelselect
    },
    props:['Subject','itemid'],
    created(){
        
    },
    methods: {
     show(){
         this.dialogVisible = true
         this.ruleForm.Subject = this.Subject
     },
     save(){
        commonapi.entitysaverecord({Subject:this.ruleForm.Subject}).then(()=>{
            this.$message.success('复制成功')
            // this.$emit('reload')
            this.closepopup()
            // this.reload()
        })
     },
      closepopup(){
          this.dialogVisible = false
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
    padding: 20px;
    display: flex;
    justify-content: space-between;
}
.popup-body{
    height: 200px;
    overflow: auto;
    padding:0 25px;
    box-sizing: border-box;
}
.popup-footer{
    text-align: right;
    padding: 20px;
}
.item-title{
    margin: 20px 0 10px 0;
}
.el-select{
    width: 100%;
}
</style>