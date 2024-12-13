<template>
    <div class="d-modal" v-if="isShow">
        <div class="dModal-box">
            <div class="d-content">
                <div class="photoWrap">
                    <div class="swiper-container" ref="swiperRef">
                        <div class="swiper-wrapper">
                            <div class="swiper-slide" v-for="(item, index) in items" :key="index">
                                <!-- 这里是每个幻灯片的内容 -->
                                <!-- <img :src="item.image" alt="Slide Image"> -->
                                <div>{{ item.description }}</div>
                            </div>
                        </div>
                        <div class="swiper-button-next" ref="nextButton"  @click="next"></div>
                        <div class="swiper-button-prev" ref="prevButton" @click="prev"></div>
                        <div class="swiper-pagination"></div>
                    </div>
                </div>
                <div class="info-box">
                    <div class="personHead">
                        <div class="avatar">
                            <img :src="require('@/assets/img/avatar-r.png')" alt="" />
                        </div>
                        <div class="personalInfo">
                            <p class="name">jackliu3</p>
                            <p class="time">2021-10-10</p>
                        </div>
                    </div>
                    <div class="fileName">名称：微信图片_20210702134409_jpg</div>
                    <div class="optionLike">
                        <div class="optionItem">
                            <i class="iconfont icon-pinglun"></i>
                            <span class="num">1</span>
                        </div>
                        <div class="optionItem">
                            <svg viewBox="0 0 24 24" aria-hidden="true"
                                class="r-4qtqp9 r-yyyyoo r-1xvli5t r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-1hdv0qi">
                                <g>
                                    <path
                                        d="M16.697 5.5c-1.222-.06-2.679.51-3.89 2.16l-.805 1.09-.806-1.09C9.984 6.01 8.526 5.44 7.304 5.5c-1.243.07-2.349.78-2.91 1.91-.552 1.12-.633 2.78.479 4.82 1.074 1.97 3.257 4.27 7.129 6.61 3.87-2.34 6.052-4.64 7.126-6.61 1.111-2.04 1.03-3.7.477-4.82-.561-1.13-1.666-1.84-2.908-1.91zm4.187 7.69c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01.896 1.81.846 4.17-.514 6.67z">
                                    </path>
                                </g>
                            </svg>
                            <span class="num">1</span>
                        </div>
                    </div>
                    <div class="fileCommentBox">
                        <div class="commentList">
                            <div class="commentItem">
                                <p class="commentName">jackliu4：</p>
                                <p class="desc">123</p>
                                <div class="bottomInfo">
                                    <span class="time">2023-11-09 18:07:17</span>
                                    <div class="icons">
                                        <span class="icon">
                                            <i class="iconfont icon-pinglun"></i>
                                        </span>
                                        <span class="icon">
                                            <svg viewBox="0 0 24 24" aria-hidden="true"
                                                class="r-4qtqp9 r-yyyyoo r-1xvli5t r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-1hdv0qi">
                                                <g>
                                                    <path
                                                        d="M16.697 5.5c-1.222-.06-2.679.51-3.89 2.16l-.805 1.09-.806-1.09C9.984 6.01 8.526 5.44 7.304 5.5c-1.243.07-2.349.78-2.91 1.91-.552 1.12-.633 2.78.479 4.82 1.074 1.97 3.257 4.27 7.129 6.61 3.87-2.34 6.052-4.64 7.126-6.61 1.111-2.04 1.03-3.7.477-4.82-.561-1.13-1.666-1.84-2.908-1.91zm4.187 7.69c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01.896 1.81.846 4.17-.514 6.67z">
                                                    </path>
                                                </g>
                                            </svg>
                                        </span>
                                        <span class="icon">
                                            <i class="iconfont icon-yishanchu"></i>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="inpRow">
                            <a-input placeholder="输入评论内容"></a-input>
                        </div>
                        <div class="btnRow">
                            <a-button type="primary">评论</a-button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="closeIcon" @click="handleClose">
                <CloseOutlined />
            </div>
        </div>
    </div>
</template>
<script setup>
    import {
        ref,
        watch,
        reactive,
        toRefs,
        onMounted,
        getCurrentInstance,
        onUpdated,
        defineProps,
        defineExpose,
        defineEmits,
        toRaw,
        computed
    } from "vue";
    import {
        SearchOutlined,
        DownOutlined,
        UserOutlined,
        CloseOutlined,
    } from "@ant-design/icons-vue";
    import Swiper from 'swiper';
    import 'swiper/swiper-bundle.css'; // 导入 Swiper 样式
    const emit = defineEmits(["cancel"]);

    import { message } from "ant-design-vue";
    import Interface from "@/utils/Interface.js";
    const { proxy } = getCurrentInstance();
    const labelCol = ref({ style: { width: "100px" } });
    const props = defineProps({
        isShow: Boolean,
    });
    const nextButton = ref();
    const prevButton = ref();
    const swiperRef = ref();

    const data = reactive({
        items: [
            {
                description: 123
            },
            {
                description: 456
            }
        ],
        mySwiper: null,
    })
    const { items, mySwiper } = toRefs(data);
    const handleClose = () => {
        emit("cancel", false);
    };
    const swiper = computed(()=>{
        return swiperRef.value.$swiper;
    })
    console.log("swiper", swiper)
    onMounted(() => {
        initSwiper();
    })
    const initSwiper = () => {
        data.mySwiper = new Swiper('.swiper-container', {
            loop: true,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
        });
    }
    const next = () => {

    }
    const prev = () => {
        
    }
</script>
<style lang="less" scoped>
    .d-modal {
        position: fixed;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        background: rgba(0, 0, 0, 0.3);
        z-index: 9999;

        .dModal-box {
            background: rgba(64, 52, 51, 0.9);
            width: 95%;
            height: calc(~"100% - 40px");
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);

            .closeIcon {
                position: absolute;
                right: -15px;
                top: -15px;
                font-size: 30px;
                color: #ccc;
                cursor: pointer;
            }

            .d-content {
                width: 100%;
                height: 100%;
                margin-right: 16px;
                display: flex;

                .photoWrap {
                    width: calc(~"100% - 350px");
                    flex: 1;
                    overflow: hidden;
                    position: relative;
                }

                .info-box {
                    width: 350px;
                    height: 100%;
                    padding: 16px;
                    box-sizing: border-box;
                    overflow: hidden;
                    background: #fff;

                    .personHead {
                        display: flex;

                        .avatar {
                            width: 50px;
                            height: 50px;
                            border-radius: 50%;
                            margin-right: 10px;

                            img {
                                width: 100%;
                                height: 100%;
                            }
                        }

                        .personalInfo {
                            flex: 1;

                            .name {
                                color: var(--textColor);
                                font-size: 14px;
                                font-weight: bold;
                            }

                            .time {
                                margin-top: 5px;
                            }
                        }
                    }

                    .fileName {
                        padding: 10px 0 5px 0;
                        border-bottom: 1px solid #e2e3e5;
                    }

                    .optionLike {
                        display: flex;
                        justify-content: center;
                        padding: 15px;

                        .optionItem {
                            display: flex;
                            align-items: center;
                            margin: 0 10px;
                            cursor: pointer;

                            svg {
                                width: 17px;
                                fill: #333;
                            }

                            .num {
                                padding-left: 5px;
                            }
                        }
                    }

                    .fileCommentBox {
                        height: calc(~"100% - 150px");
                        background: #f4f4f4;
                        padding: 10px;

                        .commentList {
                            height: calc(~"100% - 110px");
                        }

                        .commentItem {
                            border-bottom: 1px solid #e2e3e5;

                            .commentName {
                                color: var(--textColor);
                            }

                            .desc {
                                line-height: 1.5;
                            }
                        }

                        .bottomInfo {
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            padding-bottom: 5px;

                            svg {
                                width: 17px;
                            }

                            .icons {
                                display: flex;
                                align-items: center;
                            }

                            .icon {
                                display: inline-block;
                                padding: 0 5px;
                                cursor: pointer;
                            }
                        }

                        .btnRow {
                            text-align: right;
                            margin-top: 20px;
                        }
                    }
                }
            }
        }
    }
    /* 在需要的地方自定义样式 */
    .swiper-container {
        width: 100%;
        height: 100%;
    }

    .swiper-slide {
        text-align: center;
        font-size: 18px;
        /* background: #fff; */
    }
</style>