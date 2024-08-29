<template>
    <div>
        <slot>请选择</slot>
        <div class="dropbtn btn">
            <el-dropdown @command="commandchange" trigger="click">
                <span class="el-dropdown-link">
                    {{value}}
                    <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item v-for="item in selectdata" :key="item.name" :command="item.label">{{item.label}}</el-dropdown-item>         
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>
<script>
import './dropbtn.css'
export default {
    data(){
        return{
        }
    },
    props:['selectdata','value'],
    methods:{
        commandchange(val){
            this.$emit('valuechange',val)
        }
    }
}
</script>
<style scoped>

</style>
