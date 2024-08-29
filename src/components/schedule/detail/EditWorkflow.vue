<template>
    <div class="createdproject">
        <div class="createdproject-head">
            <i class="el-icon-close" @click="closepopup"></i>
            <div class="rightbtn">
                <button class="css-s5tygj" disabled="" type="button"><span class="css-178ag6o">更新工作流</span></button>
                <button class="css-1vi0drz" type="button" @click="closepopup"><span class="css-178ag6o">关闭</span></button>
            </div>
        </div>
        <div class="createdproject-body">
            <div class="body-main">
                <WorkflowPanel :closepopup="closepopup"></WorkflowPanel>
            <!-- <div class="createdproject-left">
                <div class="createdproject-title">添加项目详情</div>
                <div class="createdproject-description">您可以随时在项目设置中更改这些详情。</div>
                <div class="createdproject-form">
                    <div class="from-item">
                        <div class="item-label">名称
                            <span>*</span>
                        </div>
                        <div class="item-value">
                        <el-input v-model="form.Name"></el-input>
                        </div>
                    </div>
                    <div class="from-item">
                        <div class="item-label">键
                        </div>
                        <div class="item-value">
                        <el-input style="width:50%" v-model="form.ProjectKey"></el-input>
                        </div>
                    </div>
                </div>
            </div>
            <div class="createdproject-right">
                    <div class="right-head">
                        <div class="right-head-title">模板</div>
                        <div class="right-head-btn">
                            <div class="hover-btn">更改模板(暂不可用)</div>
                        </div>
                    </div>
                    <div class="right-body">
                        <div class="project-model">
                            <div class="model-left">
                                <div class="model-img">
                                    <img src="/static/img/svg/kanban.svg" alt="">
                                </div>
                            </div>
                            <div class="model-right">
                                <div class="model-title">客户服务管理</div>
                                <div class="model-description">使用专为帮助外部客户而设计的模板，快速提供卓越的服务体验。</div>
                            </div>
                        </div>
                    </div>
            </div> -->
            </div>
        <!-- <div class="createdproject-footer">
            <el-button size="small" @click="closepopup">取消</el-button>
            <el-button size="small" type="primary" @click="entitysaverecord">创建</el-button>
        </div> -->
        </div>
        
    </div>
</template>
<script>
import {ProjectEdit} from '@/utils/projectapi.js'
import WorkflowPanel from "@/components/schedule/detail/workflow/panel.vue"
export default {
    inject:['reload'],
    components: {
        WorkflowPanel
    },
    data(){
        return {
            form:{
                Name:''
            }
        }
    },
    methods:{
        closepopup(){
            this.$parent.isShowEditWorkflow = false
        },
        entitysaverecord(){
            if(this.form.Name!=''){
                ProjectEdit({
                        Name:this.form.Name,
                        ProjectKey:this.form.ProjectKey
                },20290).then(res=>{
                    this.$message.success('创建项目成功');
                    if(this.$route.path=='/projects/list'){
                        this.reload()
                    }
                    this.closepopup()
                })
            }else{
                this.$message.error('请填写项目名称');
            }
        }
    }
}
</script>
<style scoped>
    .createdproject-head{
        padding: 20px;
    }
    .createdproject-head i{
        font-size: 24px;
        cursor: pointer;
        font-weight: 700;
    }
    .createdproject{
        background-color: #fff;
        width: 100%;
        height: 100%;
    }
    .createdproject-body{
        width: 900px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
    }
    .body-main{
        display: flex;
        width: 100%;
        justify-content: space-between;

    }
    .body-main>div{
        width: 100%;
    }
    .createdproject-title{
        font-size: 28px;
        font-weight: 700;
        line-height: 50px;
    }
    .item-label{
        margin: 5px 0;
    }
    .createdproject-description{
        font-size: 12px;
    }
    .item-label>span{
        color: #DE350B;
    }
    .createdproject-right{
        background-color: rgb(250, 251, 252);
        border-radius: 20px;
        padding:30px 20px;
    }
    .right-head{
        display: flex;
        justify-content: space-between;
    }
    .hover-btn{
        cursor: pointer;
    }
    .right-body{
        border-radius: 10px;
        margin-top: 20px;
        overflow: hidden;
        box-shadow: rgb(9 30 66 / 13%) 0px 1px 1px, rgb(9 30 66 / 13%) 0px 0px 1px;
    }
    .model-left{
        padding:20px 10px;
        background-color: rgb(244, 245, 247);
        box-sizing: border-box;
    }
    .model-right{
        background-color: #fff;
        padding:10px 20px;
    
    }
    .model-img img{
        width: 85px;
        height: 55px;
    }
    .project-model{
        display: flex;
    }
    .model-title{
        line-height: 30px;
    }
    .model-description{
        font-size: 12px;
        color: rgb(107, 119, 140);
    }
    .createdproject-footer{
        text-align: right;
        margin-top: 30px;
    }

    .css-s5tygj {
    -webkit-box-align: baseline;
    align-items: baseline;
    box-sizing: border-box;
    display: inline-flex;
    font-size: inherit;
    font-style: normal;
    font-family: inherit;
    font-weight: 500;
    max-width: 100%;
    position: relative;
    text-align: center;
    white-space: nowrap;
    cursor: pointer;
    height: 2.28571em;
    line-height: 2.28571em;
    vertical-align: middle;
    width: auto;
    -webkit-box-pack: center;
    justify-content: center;
    color: var(--ds-text-inverse, #FFFFFF) !important;
    border-width: 0px;
    border-radius: 3px;
    text-decoration: none;
    transition: background 0.1s ease-out 0s, box-shadow 0.15s cubic-bezier(0.47, 0.03, 0.49, 1.38) 0s;
    background: var(--ds-background-brand-bold, #0052CC);
    padding: 0px 10px;
}
.css-s5tygj[disabled] {
    cursor: not-allowed;
    color: var(--ds-text-disabled, #A5ADBA) !important;
    background: var(--ds-background-disabled, rgba(9, 30, 66, 0.04));
    text-decoration: none;
}
.css-s5tygj[disabled] > *{
  pointer-events: none;
}
.css-s5tygj:hover {
    transition-duration: 0s, 0.15s;
    color: var(--ds-text-inverse, #FFFFFF) !important;
    background: var(--ds-background-brand-bold-hovered, #0065FF);
    text-decoration: inherit;
}
.css-s5tygj:focus {
    box-shadow: 0 0 0 2px var(--ds-border-focused, #4C9AFF);
    transition-duration: 0s, 0.2s;
    color: var(--ds-text-inverse, #FFFFFF) !important;
    background: var(--ds-background-brand-bold, #0052CC);
    outline: none;
}
.css-s5tygj:active {
    transition-duration: 0s, 0s;
    color: var(--ds-text-inverse, #FFFFFF) !important;
    background: var(--ds-background-brand-bold-pressed, #0747A6);
}
.css-178ag6o {
    opacity: 1;
    transition: opacity 0.3s ease 0s;
    margin: 0px 2px;
    -webkit-box-flex: 1;
    flex-grow: 1;
    flex-shrink: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.css-1vi0drz {
    -webkit-box-align: baseline;
    align-items: baseline;
    box-sizing: border-box;
    display: inline-flex;
    font-size: inherit;
    font-style: normal;
    font-family: inherit;
    font-weight: 500;
    max-width: 100%;
    position: relative;
    text-align: center;
    white-space: nowrap;
    cursor: pointer;
    height: 2.28571em;
    line-height: 2.28571em;
    vertical-align: middle;
    width: auto;
    -webkit-box-pack: center;
    justify-content: center;
    color: var(--ds-text, #42526E) !important;
    border-width: 0px;
    border-radius: 3px;
    text-decoration: none;
    transition: background 0.1s ease-out 0s, box-shadow 0.15s cubic-bezier(0.47, 0.03, 0.49, 1.38) 0s;
    background: none;
    padding: 0px 10px;
}
.css-1vi0drz:hover {
    transition-duration: 0s, 0.15s;
    color: var(--ds-text, #42526E) !important;
    background: var(--ds-background-neutral-subtle-hovered, rgba(9, 30, 66, 0.08));
    text-decoration: inherit;
}
.css-1vi0drz:focus {
    box-shadow: 0 0 0 2px var(--ds-border-focused, #4C9AFF);
    transition-duration: 0s, 0.2s;
    color: var(--ds-text, #42526E) !important;
    background: none;
    outline: none;
}
.css-1vi0drz:active {
    transition-duration: 0s, 0s;
    color: var(--ds-text, #0052CC) !important;
    background: var(--ds-background-neutral-subtle-pressed, rgba(179, 212, 255, 0.6));
}
.rightbtn{
    float: right;
}
.createdproject-body{
    width: 100%;
    height: 100%;
}
.createdproject-head{
    padding: 10px 20px;
    /* z-index: 10; */
    position: relative;
    display: none;
}
.createdproject-head i{
    line-height: 35px;
}
</style>