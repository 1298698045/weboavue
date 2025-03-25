<template>
    <div class="cardItem widgetItem" :class="themeType">
        <div class="card-header" v-if="themeType=='modern'">
            <div class="header-title">{{item.name}}</div>
        </div>
        <div class="item-default-header" v-if="themeType=='default'">
            <span class="item-default-header-title">
                <span class="title-font">{{item.name}}</span>
            </span>
            <span class="toolbar">
                <ul>
                    <li>
                        <a href="javascript:void(0);" name="refreshbtn" title="刷新">
                            <img :src="require('@/assets/img/refresh_wev8.png')" border="0" alt="">
                        </a>
                    </li>
                    <li style="width: 34px;">
                        <a href="javascript:void(0);">
                            <img class="imgMore" :src="require('@/assets/img/more_wev8.png')" border="0" alt="" title="更多" @click="gotoMore">
                        </a>
                    </li>
                </ul>
            </span>
        </div>
        <template v-if="themeType=='light'">
            <div class="dashGridItem">
                <h2 class="defaultHeading">
                    <div class="gridHeader truncation" :title="item.name">{{item.name}}</div>
                    <div class="gridTitle truncation"></div>
                </h2>
                <div class="table-container" style="height: calc(100% - 90px);overflow-y: auto">
                    <div class="quick-wrapper">
                        <div class="quick-item" v-for="(item, index) in listData" :key="index" @click="handleDetail(item)">
                            <div class="quick-item-content">
                                <div class="quick-item-icon">
                                    <img :src="item.icon" alt="">
                                </div>
                                <div class="quick-item-name rowEllipsis">
                                    <!-- 供应商考核 -->
                                     <div v-html="item.label"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="actions">
                    <span>
                        <svg aria-hidden="true" class="btn_icon" viewBox="0 0 52 52"><path d="M48.8 2H33.3c-1 0-1.3.9-.5 1.7l4.9 4.9-9 9c-.5.5-.5 1.3 0 1.9l3.7 3.7c.5.5 1.3.5 1.9 0l9.1-9.1 4.9 4.9c.8.8 1.7.5 1.7-.5V3.1c0-.6-.6-1.1-1.2-1.1zM3.5 50h15.4c1 0 1.3-1.1.5-1.9l-4.9-5 9-9.1c.5-.5.5-1.4 0-1.9l-3.7-3.7c-.5-.5-1.3-.5-1.9 0l-9 9-5-4.9C3 31.7 2 32 2 33v15.4c0 .7.8 1.6 1.5 1.6zM50 48.8V33.3c0-1-.9-1.3-1.7-.5l-4.9 4.9-9-9c-.5-.5-1.3-.5-1.9 0l-3.7 3.7c-.5.5-.5 1.3 0 1.9l9.1 9.1-4.9 4.9c-.8.8-.5 1.7.5 1.7h15.4c.6 0 1.1-.6 1.1-1.2zM2 3.5v15.4c0 1 1.1 1.3 1.9.5l5-4.9 9.1 9c.5.5 1.4.5 1.9 0l3.7-3.7c.5-.5.5-1.3 0-1.9l-9-9 4.9-5C20.3 3 20 2 19 2H3.6C2.9 2 2 2.8 2 3.5z"></path></svg>
                    </span>
                </div>
            </div>
        </template>
        <template v-else>
            <div class="card-body">
                <div class="quick-wrapper">
                    <div class="quick-item" v-for="(item, index) in listData" :key="index" @click="handleDetail(item)">
                        <div class="quick-item-content">
                            <div class="quick-item-icon">
                                <img :src="item.icon" alt="">
                            </div>
                            <div class="quick-item-name rowEllipsis">
                                <div v-html="item.label"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card-foot"></div>
        </template>
    </div>
</template>
<script setup>
    import { ref, reactive, toRefs, defineProps, getCurrentInstance } from "vue";
    import { useStore } from "vuex";
    import Interface from "@/utils/Interface.js";
    const { proxy } = getCurrentInstance();
    const store = useStore();
    import { useRoute, useRouter } from "vue-router";
    const router = useRouter();
    const props = defineProps({
        item: {
            type: Object,
            default: {}
        },
        themeType: String
    });


    const data = reactive({
        listData: []
    });
    const { listData } = toRefs(data);

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
            let { rows, rowCount } = componentData;
            data.listData = rows;
        });
    };
    getQuery();

    const gotoMore = () => {
        let { moreUrl } = props.item.properties;
        const url = router.resolve({path: moreUrl});
        window.open(url.href);
    }

    const handleDetail = (item) => {
        const url = router.resolve({path: item.url});
        window.open(url.href);
    }


</script>
<style lang="less" scoped>
    @import url(@/style/protal/widget.less);

    .quick-wrapper{
        display: flex;
        flex-wrap: wrap;
        .quick-item{
            position: relative;
            flex-basis: calc(25% - 10px);
            height: 105px;
            padding: 0;
            background: #fff;
            transition: all .3s;
            border: 1px solid transparent;
            text-align: center;
            display: flex;
            justify-content: center;
            .quick-item-content{
                /* width: 100%; */
                display: flex;
                align-items: center;
                padding: 0;
                /* height: 100%; */
                border: none;
                border-radius: 0;
                position: absolute;
                flex-direction: column;
                justify-content: center;
                padding: 10px 20px;
                &:hover{
                    cursor: pointer;
                    background: rgba(0,0,0,0.08);
                }
                .quick-item-icon{
                    img{
                        width: 46px;
                        height: 46px;
                    }
                }
                .quick-item-name{
                    padding: 0 2px;
                    transition: all .3s;
                    text-align: center;
                    font-size: 12px;
                }
            }
            
        }
    }
</style>