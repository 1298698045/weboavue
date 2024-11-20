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
                            <img class="imgMore" :src="require('@/assets/img/more_wev8.png')" border="0" alt="" title="更多">
                        </a>
                    </li>
                </ul>
            </span>
        </div>
        <template v-if="themeType=='light'">
            <div class="dashGridItem">
                <h2 class="defaultHeading">
                    <div class="gridHeader truncation" title="商业机会阶段数量">{{item.name}}</div>
                    <div class="gridTitle truncation"></div>
                </h2>
                <div class="table-container">
                    <div class="swiper-wrapper" style="padding: 0;">
                        <a-carousel dots-class="slick-dots slick-thumb" autoplay>
                            <div v-for="(listItem, listitemIdx) in list" :key="listitemIdx">
                                <img :src="listItem.ImgUrl" alt="" />
                            </div>
                        </a-carousel>
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
                <div class="swiper-wrapper">
                    <a-carousel dots-class="slick-dots slick-thumb" autoplay>
                        <div v-for="(listItem, listitemIdx) in list" :key="listitemIdx">
                            <img :src="listItem.ImgUrl" alt="" />
                        </div>
                    </a-carousel>
                </div>
            </div>
            <div class="card-foot"></div>
        </template>
    </div>
</template>
<script setup>
    import { ref, reactive, toRefs, defineProps } from "vue";
    import Table from "./Table.vue";
    const props = defineProps({
        item: {
            type: Object,
            default: {}
        },
        themeType: String
    });
    const data = reactive({
        list: [
            {
                ImgUrl: "1"
            },
            {
                ImgUrl: "2"
            },
            {
                ImgUrl: "2"
            }
        ]
    });
    const { list } = toRefs(data);
</script>
<style lang="less" scoped>
    @import url(@/style/protal/widget.less);
    .swiper-wrapper {
        width: 100%;
        height: 100%;
        padding: 20px;
    }

    .ant-carousel {
        width: 100%;
        height: 100%;
    }
</style>
<style lang="less">
    :deep :where(.css-dev-only-do-not-override-kqecok).ant-carousel .slick-slider {
        height: 100%;
    }

    :where(.css-dev-only-do-not-override-kqecok).ant-carousel .slick-slider .slick-track,
    :where(.css-dev-only-do-not-override-kqecok).ant-carousel .slick-slider .slick-list {
        height: 100% !important;
        background: #364d79 !important;
    }

    :deep :where(.css-dev-only-do-not-override-kqecok).ant-carousel .slick-list {
        height: 100% !important;

        .slick-track {
            height: 100%;
        }
    }

    .slick-slider {
        height: 100%;

        img {
            width: 100%;
            height: 100%;
        }
    }

    :deep(.slick-slide) {
        text-align: center;
        height: 100%;
        background: #364d79;
        overflow: hidden;
    }

    :deep(.slick-slide h3) {
        color: #fff;
    }
</style>