<template>
    <div class="cardItem widgetItem card-header" :class="themeType">
        <!-- <div class="card-header">
            <div class="header-title">{{item.name}}</div>
        </div> -->
        <div class="statsCard_content">
            <div class="stats-card-container" @click="gotoPage">
                <template v-if="imgPosition=='right'">
                    <div class="stats-card-left">
                        <h3 style="color: rgb(47, 90, 165); font-weight: 500; font-size: 30px;">{{num}}</h3>
                        <span class="text">{{item.properties.title}}</span>
                    </div>
                    <div class="stats-card-right">
                        <div class="img-container">
                            <img :src="item.properties.img.src" alt="">
                        </div>
                    </div>
                </template>
                <template v-else>
                    <div class="stats-card-left">
                        <div class="img-container">
                            <img :src="item.properties.img.src" alt="">
                        </div>
                    </div>
                    <div class="stats-card-right">
                        <div>
                            <h3 style="color: rgb(47, 90, 165); font-weight: 500; font-size: 30px;">{{num}}</h3>
                            <span class="text">{{item.properties.title}}</span>
                        </div>
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>
<script setup>
    import { ref, reactive, toRefs, defineProps, onMounted, nextTick, computed, getCurrentInstance } from "vue";
    import * as echarts from "echarts";
    import Interface from "@/utils/Interface.js";
    import { useRoute, useRouter } from "vue-router";
    const { proxy } = getCurrentInstance();
    import { useStore } from "vuex";
    const store = useStore();
    const router= useRouter();
    const props = defineProps({
        item: {
            type: Object,
            default: {}
        },
        themeType: String
    });
    const data = reactive({
        num: 0
    });
    const { num } = toRefs(data);

    onMounted(()=>{

    })

    const imgPosition = computed(()=>{
        return props.item.properties.img.position || '';
    });

    const getQuery = async () => {
        let obj = {
            actions:[{
                id: "",
                descriptor: "",
                callingDescriptor: "UNKNOWN",
                params: {
                    dashboardId: props.dashboardId,
                    componentId: props.item.id
                }
            }]
        };
        let d = {
            message: JSON.stringify(obj)
        };
        proxy.$post(Interface.portal.loadComponents, d).then(res=>{
            let { componentData, dashboardComponentMetadata } = res.actions[0].returnValue;
            data.num = componentData.value;
        });
    };
    getQuery();

    const gotoPage = () => {
        let { drillUrl, drillType } = props.item.properties;
        if(drillType == 3){
            router.push({ path: drillUrl });
        }else if(drillType == 2){
            const url = router.resolve({path: drillUrl});
            window.open(url.href);
        }
    }

</script>
<style lang="less" scoped>
    @import url(@/style/protal/widget.less);
    .widgetItem{
        &:hover{
            /* background: rgba(0,0,0,0.08); */
            box-shadow: 0 2px 10px 0 rgba(0, 0, 0, .5);
        }
    }
    .statsCard_content{
        padding: 5px 10px;
        flex: 1 1 auto;
        height: 100%;
        overflow: auto;
        cursor: pointer;
        .stats-card-container{
            height: 100%;
            width: 100%;
            display: flex;
            align-items: center;
            /* background-color: #fff; */
            color: #666666;
            .stats-card-left{
                flex: 3 1;
                display: flex;
                flex-direction: column;
                margin: 6px 0 0 10px;
            }
            .stats-card-right{
                flex: 1 1;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 12px;
            }
            img{
                width: 100%;
                /* height: 100%; */
            }
            .text{
                white-space: nowrap;
            }
        }
    }
    .img-container{
        width: 48px;
        height: 48px;
        border-radius: 12px;
        overflow: hidden;
    }
</style>