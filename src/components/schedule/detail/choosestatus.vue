<template>
    <div>
        <a-dropdown>
                <span class="el-dropdown-link">
                    {{label}}
                <!-- <i class="el-icon-arrow-down el-icon--right"></i> -->
                <DownOutlined class="el-icon-arrow-down el-icon--right" />
            </span>
            <template #overlay>
                <a-menu ref="elDropdown" class="lang-select-dropdown">
                    <a-menu-item :command="item.statusId+'&'+item.name+'&'+item.statusCategoryId" v-for="(item,index) in statusdata" :key="index" :class="{'selected':item.statusId==statusId}" @click="changeData(item.statusId)">
                    <el-tag v-if="item.statusCategoryId == 1" type="info" size="mini">
                        {{item.name}}
                    </el-tag>
                    <el-tag v-if="item.statusCategoryId == 2" size="mini">{{item.name}}</el-tag>
                    <el-tag v-if="item.statusCategoryId == 3" type="success" size="mini">{{item.name}}</el-tag>
                    </a-menu-item>
                    <!-- <a-menu-item divided @click="showWorkflow">
                        <span class="bottombtn1">查看工作流</span>
                    </a-menu-item> -->
                </a-menu>
            </template>
        </a-dropdown>
    </div>
</template>
<script>
import {
    DownOutlined
    } from "@ant-design/icons-vue";
import commonapi from '@/utils/commonapi.js'
export default {
    components: {
        DownOutlined
    },
    data(){
        return {
            
        }
    },
    props:['statusdata','value','label','rowid','statusId','showWorkflow'],
    mounted(){
        const dropdownMenu = this.$refs['elDropdown'] // 找到dropdown下面的dropdownMenu
        //dropdownMenu.$data.currentPlacement = 'bottom-start'
    },
    watch:{
        label(){
            console.log(this.statusId)
        }
    },
    created(){
    },
    methods:{
        visiblechange(val){
            this.$emit('visiblechange',val)
        },
        handleCommand(val,rowid){
            if(val){}else{return}
            const statusId = val.split('&')[0]
            const name = val.split('&')[1]
            const statusCategoryId = val.split('&')[2]
            commonapi.entitysaverecord({
                StateCode:statusId
            },4200,rowid).then(()=>{
                this.$message.success('保存成功')
                this.$emit('change',statusId,name,statusCategoryId,rowid)
            })
        },
        getdata(type){
            if(type==true){

            }  
        },
        changeData(id){
            this.$emit('change','StateCode',id)
        }
    }

}
</script>
<style scoped>
.lang-select-dropdown {
    margin-left: -10px !important;
    min-width: 240px;
    border: 1px solid #ddd;
}
.bottombtn1{
    color: #091E42;
    font-size: 14px;
}
.el-dropdown-menu--small .el-dropdown-menu__item{
    line-height: 33px;
}
.el-dropdown-menu__item--divided{
    border-top: 1px solid #ddd;
}
.el-dropdown-menu__item{
    padding-left: 15px;
}
:deep .selected,:deep .el-dropdown-menu__item:hover {
    border-left: 2px solid #0052cc;
    background-color: #EBECF0;
    padding-left: 13px !important;
}
.el-dropdown-link .el-icon--right{
    color: inherit;
    font-size: 11px !important;
}
:deep .ant-dropdown-menu-item{
    border-radius:0 !important;
    transition: none !important;
}
:deep .ant-dropdown-menu-item:hover,:deep .ant-dropdown-menu-item.selected,:deep .ant-dropdown-menu-item.hover{
    color:#606266;
    font-weight: normal !important;
    background-color: #ecf5ff !important;
    border-left: 2px solid #0052cc !important;
    padding-left: 10px !important;
    transition: none !important;
}
</style>