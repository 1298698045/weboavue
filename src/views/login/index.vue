<template>
    <div class="loginWrap">
        <div class="loginContainer">
            <div class="loginImg">
                <img :src="require('@/assets/img/loginLogo.png')" alt="">
            </div>
            <div class="loginContent">
                <div class="loginHead">
                    账号登录
                </div>
                <div class="loginCenter">
                    <a-form>
                        <a-form-item>
                            <a-input placeholder="用户名" allow-clear>
                                <template #prefix>
                                    <UserOutlined />
                                </template>
                            </a-input>
                        </a-form-item>
                        <a-form-item>
                            <a-input type="password" placeholder="密码" allow-clear>
                                <template #prefix>
                                    <LockOutlined />
                                </template>
                            </a-input>
                        </a-form-item>
                        <a-button type="primary" block>登录到OA</a-button>
                        <a href="javascript:;" style="margin-top: 15px;display: block;" @click="handleForgot">忘记密码</a>
                    </a-form>
                </div>
            </div>
        </div>
        <div class="footer">
            <div class="footerInfo">
                <a href="http://182.92.221.64:10000/download/appsdown.htm" target="_blank">苹果客户端</a>
                <a-divider type="vertical" />
                <a href="http://182.92.221.64:10000/download/appsdown.htm" target="_blank">安卓客户端</a>
                <a-divider type="vertical" />
                <a href="http://182.92.221.64:10000/download/appsdown.docx" target="_blank">App下载安装说明</a>
                <a-divider type="vertical" />
                <a href="http://182.92.221.64:10000/download/iWebOffice2015.msi" target="_blank">OFFICE插件</a>
                <a-divider type="vertical" />
                <a href="http://182.92.221.64:10000/download/谷歌浏览器稳定版64位_89.exe" target="_blank">谷歌浏览器</a>
            </div>
            <div class="companyName">北京凤凰世纪科技有限公司技术支持</div>
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
        h,
        nextTick
    } from "vue";
    import { UserOutlined, LockOutlined } from "@ant-design/icons-vue";
    import { useRouter, useRoute } from "vue-router";
    const router = useRouter();
    const handleForgot = () => {
        router.push({
            name: "Forgotpassword",
            params: {

            }
        })
    }
</script>
<style lang="less">
    .loginWrap{
        width: 100%;
        height: 100vh;
        background: url(~@/assets/img/loginbackImg.jpg) no-repeat 100% 100%;
        position: relative;
        .loginContainer{
            width: 400px;
            position: absolute;
            top: calc(~"50% - 49px");
            left: 50%;
            transform: translate(-50%, -50%);
            .loginImg{
                height: 60px;
                margin-bottom: 49px;
                text-align: center;
                img{
                    height: 100%;
                }
            }
            .loginContent{
                width: 400px;
                height: 400px;
                box-shadow: 0px 1px 12px 0px rgba(0, 0, 0, 0.2);
                border-radius: 4px;
                padding: 0 0 30px 0;
                background: #fff;
                .loginHead{
                    text-align: center;
                    font-size: 18px;
                    color: #1d2129;
                    font-weight: bold;
                    padding: 53px 0 30px 0;
                }
                .loginCenter{
                    .ant-form{
                        width: 336px;
                        margin: 0 auto;
                        .ant-input-affix-wrapper {
                            height: 40px;
                            border-radius: 4px !important;
                            border: 1px solid #ddd;
                            background: #f4f4f4;
                            .ant-input{
                                background: transparent !important;
                            }
                        }

                        .ant-btn{
                            height: 50px;
                            margin-top: 20px;
                            font-size: 16px;
                            font-weight: bold;
                            border-radius: 4px;
                        }
                    }
                }
            }
        }
        .footer{
            width: 100%;
            height: 100px;
            background: #fff;
            position: absolute;
            bottom: 0;
            text-align: center;
            .footerInfo{
                height: 50px;
                line-height: 70px;
                a{
                    color: #4e5969;
                    padding: 0 15px;
                    &:hover{
                        color: var(--textColor);
                    }
                }
            }
            .companyName{
                padding-top: 10px;
                color: #999;
            }
        }
    }
</style>