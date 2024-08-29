<template>
<div class="container">
    <el-dialog
    :append-to-body="true"
  :visible.sync="dialogVisible"
  width="30%">
  <div class="popup">
        <div class="popup-head">
            <div class="popup-title">移动任务</div>
        </div>
        <div class="popup-body">
            <div class="body-main">
            <div class="popup-form">
            <div class="item-title">项目</div>
            <researchelselect 
              :filterables="true"
              :defaultdata="defaultdata.project"
              v-model="ruleForm.project.Id"
              name="project"
              objtypecode="20290"
              type="group" />
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
            project:{}
        }
      }
    },
    components:{
        researchelselect
    },
    props:['project','itemid'],
    created(){
        
    },
    methods: {
     show(){
         this.dialogVisible = true
         this.defaultdata.project = [this.project]
         this.ruleForm.project = {
             Id:this.project.id
         }
     },
     save(){
        
        commonapi.entitysaverecord({RegardingObjectId:{Id:this.ruleForm.project.Id}},4200,this.itemid).then(()=>{
            this.$message.success('移动成功')
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