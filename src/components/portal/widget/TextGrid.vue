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
                            <img class="imgMore" :src="require('@/assets/img/more_wev8.png')" border="0" alt="" title="更多"  @click="gotoMore">
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
                <div class="table-container" style="height: calc(100% - 90px);">
                    <div class="oftenLinkList">
                        <div class="oftenLinkItem" v-for="(item, index) in listData" :key="index">
                            <a href="#">{{ item.Name }}</a>
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
                <div class="oftenLinkList">
                    <div class="oftenLinkItem" v-for="(item, index) in listData" :key="index">
                        <a href="#">{{ item.Name }}</a>
                    </div>
                </div>
            </div>
            <div class="card-foot"></div>
        </template>
    </div>
</template>
<script setup>
    import { ref, reactive, toRefs, defineProps } from "vue";
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
        listData: [
            {
                ID: "b8d2b3b0-3b3e-4bdc-92ce-3e493afbbf84",
                ImageUrl: "",
                LIST_RECORD_ID: "b8d2b3b0-3b3e-4bdc-92ce-3e493afbbf84",
                LinkUrl: "/email/inbox/home",
                Name: "邮件"
            },
            {
                ID: "b8d2b3b0-3b3e-4bdc-92ce-3e493afbbf84",
                ImageUrl: "",
                LIST_RECORD_ID: "b8d2b3b0-3b3e-4bdc-92ce-3e493afbbf84",
                LinkUrl: "/email/inbox/home",
                Name: "邮件2"
            }
        ]
    });
    const { listData } = toRefs(data);
    const gotoMore = () => {
        let { moreUrl } = props.item.properties;
        const url = router.resolve({path: moreUrl});
        window.open(url.href);
    }
</script>
<style lang="less" scoped>
    @import url(@/style/protal/widget.less);

    .oftenLinkList {
        display: flex;
        flex-wrap: wrap;
        padding: 10px;
        .oftenLinkItem {
            width: 48%;
            height: auto;
            padding: 8px 10px;
            box-sizing: border-box;
            color: #4e5969;
            background: #f2f3f5;
            margin-right: 10px;
            margin-bottom: 10px;
            cursor: pointer;

            &:hover {
                color: var(--textColor);
                background: rgb(229, 230, 235);
            }

            a {
                color: inherit;
                text-decoration: none;
            }
        }

        .oftenLinkItem:nth-child(2n) {
            margin-right: 0;
        }

        .oftenLinkItem1 {
            width: 33%;
            background: #fff;
            text-align: center;
            height: auto;
            margin-right: 0;

            &:hover {
                background: #fff;
            }

            .oftenLinkIcon {
                background: #f2f3f5;
                width: 32px;
                height: 32px;
                padding: 8px 0;
                margin: 0 auto;
                border-radius: 8px;
                margin-bottom: 10px;
                overflow: hidden;
            }

            .oftenLinkText {
                font-size: 14px;
            }
        }
    }
</style>