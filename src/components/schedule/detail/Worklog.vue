<template>
<div class="container">
    <el-dialog width="500px" title="时间跟踪" :append-to-body="true" v-model="value" top="6.5vh" class="el-overlay-dialog1">
        <div class="popup">
    <div class="popup-head">
      <div class="popup-title">时间跟踪</div>
    </div>
    <div class="popup-body">
      <div class="body-main">
        <div class="popup-form">
            <div class="progeress">
                <el-progress :percentage="50" :show-text="false"></el-progress>
                <div class="progeress-msg">
                    <div>已记录4天</div>
                    <div>剩余10天</div>
                </div>
            </div>
            <div class="andsubtask">
                <el-checkbox v-model="checked">包含子任务</el-checkbox>
            </div>
            <div class="estimate">
                对这个问题的最初估计是 
                <el-tag size="mini" type="info">3周4天5小时60分</el-tag>
            </div>
            <div class="timerecord form-item">
                <div class="">
                    <div class="form-label">
                        所用时间
                    </div>
                    <div class="form-value">
                    <!-- <a-tooltip class="item" effect="dark" placement="bottom"> -->
                    <!-- <div slot="content" class="tipsli">
                        使用此格式：2w 4d 6h 45m<br/>
                        <ul>
                            <li>w = 周</li>
                            <li>d = 天</li>
                            <li>h = 小时</li>
                            <li>m = 分钟</li>
                        </ul>
                    </div> -->
                        <el-input :class="{'error':!takentimerule}" @input="takentimechange" v-model="takentime"></el-input>
                    <!-- </a-tooltip> -->
                    </div>
                    <div v-if="!takentimerule" class="error">请输入正确的日期格式如:
                        <br/>
                        2w 3d 1h 50m
                    </div>

                </div>
                <div class="">
                <div class="form-label">
                    剩余时间
                </div>
                    <div class="form-value">
                        <a-tooltip class="item" effect="dark" placement="bottom">
                    <!-- <div slot="content" class="tipsli">
                        使用此格式：2w 4d 6h 45m<br/>
                        <ul>
                            <li>w = 周</li>
                            <li>d = 天</li>
                            <li>h = 小时</li>
                            <li>m = 分钟</li>
                        </ul>
                    </div> -->
                        
                        <template #title>
                            <div class="tipsli">
                                    使用此格式：2w 4d 6h 45m<br/>
                                    <ul>
                                        <li>w = 周</li>
                                        <li>d = 天</li>
                                        <li>h = 小时</li>
                                        <li>m = 分钟</li>
                                    </ul>
                                </div>
                        </template>
                        <el-input v-model="remainingtimevalue"></el-input>
                    </a-tooltip>
                    </div>
                </div>
            </div>
            
            
            <div class="daterecord form-item">
                <div>
                    <div class="form-label">
                        开始日期
                        <span class="require">*</span>
                    </div>
                    <div class="form-value">
                        <el-date-picker
                        v-model="value2"
                        type="datetime"
                        value-format="yyyy:MM:dd HH:mm:ss"
                        placeholder="选择日期时间">
                        </el-date-picker>
                    </div>
                </div>
            </div>
            <div class="daterecord form-item">
                <div>
                    <div class="form-label">
                        工作描述
                    </div>
                    <div class="form-value">
                        <!-- <Editor v-model="description"/> -->
                        <TEditor ref="editorRef" mode="middle" :placeholder="'添加评论'"  :height=250
                        @input="getEditorContent" />
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
    <div class="popup-bottom">
      <div class="popup-footer">
      <el-button size="small" @click="submitForm('ruleForm')" type="primary">保存</el-button>
      <el-button size="small" @click="closepopup">取消</el-button>
    </div>
    </div>
    
  </div>
  </el-dialog>
</div>
  
</template>
<script>
import researchelselect from '@/components/schedule/detail/dropbtn/researchelselect.vue';
//import Editor from "@/components/schedule/detail/editor.vue";
import TEditor from "@/components/TEditor.vue";
import icon from "@/components/schedule/detail/icon.vue";
import '@/components/schedule/detail/popupstyle.css';
import { takentimechange } from '@/utils/formatdate.js';
export default {
  inject:['reload'],
  props:['value'],
  components: {
      TEditor,
    researchelselect,icon
  },
  mounted() {
  },
  computed:{
      show:{
          get(){
            // return true
            return this.value
          },
          set(val){
              this.$emit('input',val)
          }
      }
  },
  watch:{
    takentime(){
        
    }
  },
  data() {
    return {
        description:'',
        checked:false,
        takentime:'',
        value2:new Date(),
        oldtime:'',
        remainingtimevalue:'2w 3d 4h 50m',
        oldremainingtimevalue:'2w 3d 4h 50m',
        takentimerule:true
    };
  },
  created(){
  },
  mounted(){
  },
  methods: {
    getEditorContent(e){
        this.description = e;
    },
    takentimechange(){
        const ntime = takentimechange(this.takentime,this.oldremainingtimevalue,this.oldtime,'reduce')
        if(ntime.rule){
            this.remainingtimevalue = ntime.time
            this.takentimerule = true
        }else{
            this.remainingtimevalue = this.oldremainingtimevalue
            this.takentimerule = false
        }
    },
    closepopup() {
        this.$emit('cancel',false)
    },
  },
};
</script>
<style scoped>
.container>>>.el-dialog{
    width: 400px;
}
.popup{
    display: block !important;
    position: relative !important;
    border: none !important;
    box-shadow: none !important;
}
.popup-body{
  border-bottom: 2px solid #dedede;
  height: calc(95vh - 220px) !important;
}
.popup-head{
    display: none;
}
.color{
  display: inline-block;
  width: 16px;
  height: 16px;
  border-radius: 4px;
  margin-right: 5px;
}
.checkedcolor{
  width: 16px;
  height: 16px;
  border-radius: 4px;
  position: absolute;
  z-index: 2;
  margin-top: 12px;
  margin-left: 10px;
}
.colorcheck>>>.el-input__inner{
padding-left: 30px;
}
.color1{
  background-color: #dfe1e6;
}
.color2{
  background-color: #0052cc;
}
.color3{
  background-color: #14892c;
}
.el-select-dropdown__item{
  display: flex;
  align-items: center;
}
.progeress-msg{
    display: flex;
    justify-content: space-between;
    margin-top: 5px;
}
.andsubtask{
    margin-top: 15px;
}
.form-item{
 display: flex;
 justify-content: space-between;
}
.estimate{
    margin:20px 0;
}
.form-item>div+div{
    margin-left: 10px;
}
.form-value{
    margin-top: 5px;
}
.require{
    color: #DE350B;
}
.form-item+.form-item{
    margin-top:15px;
}
.daterecord>div{
    flex: 1;
}
.el-date-editor {
    width: 100%;
}
.tipsli li{
    list-style-type: disc;
    margin-left: 20px;
    line-height: 20px;
}
.error{
    color: rgb(222, 53, 11);
}
.error>>>.el-input__inner{
    border-color: rgb(222, 53, 11) !important;
}
.tipsli{
    margin: 10px 0;
}
</style>
<style>
.el-overlay-dialog1 .el-dialog__body{
    padding: 0 !important;
}
</style>