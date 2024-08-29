<template>
    <span class="copylink" @click="copylink">
        <input ref="copyinput" type="text" style="position: absolute;z-index:-1;opacity: 0">

        <slot>
            <el-tooltip class="item" effect="dark" content="复制链接" placement="top">
                <icon v-if="!copylinked" name="copylink" />
            </el-tooltip>
        </slot>
        

        <el-tooltip v-if="copylinked" class="item" effect="dark" content="已复制" placement="top">
            <icon name="success" />
        </el-tooltip>
    </span>

</template>
<script>
import icon from '@/components/schedule/detail/icon.vue'

export default {
    data(){
        return {
            copylinked:false,
        }
    },
    props:['copy','url'],
    components:{
        icon
    },
    methods:{
        copylink(){
            let href = null
            if(this.url){
                href = this.url
            }else{
                const route = this.$router.resolve({
                    path:'/projects/detail/'+this.$route.params.projectname,
                    query:{
                        id:this.$route.query.id,
                        itemid:this.copy
                    }
                })
                href = route.href
            }
            this.copylinked = true
            var input = this.$refs.copyinput
            input.value = window.location.host+href
            input.select();
            document.execCommand('Copy')
            setTimeout(() => {
                this.copylinked = false
            }, 3000);
        }
    }
}
</script>
<style scoped>

</style>