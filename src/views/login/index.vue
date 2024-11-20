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
                    <a-form ref="formRef" :model="formState" @submit.prevent="handleLogin">
                        <a-form-item name="userName" :rules="[{ required: true, message: '请输入用户名!' }]">
                            <a-input v-model:value="formState.userName" placeholder="用户名" allow-clear>
                                <template #prefix>
                                    <UserOutlined />
                                </template>
                            </a-input>
                        </a-form-item>
                        <a-form-item name="password" :rules="[{ required: true, message: '请输入密码!' }]">
                            <a-input v-model:value="formState.password" :type="passwordType" placeholder="密码" allow-clear>
                                <template #prefix>
                                    <LockOutlined />
                                </template>
                            </a-input>
                            <div class="passwordTypeChange">
                                <EyeOutlined @click="passwordTypeChange('password')" title="隐藏密码" v-if="passwordType=='text'" />
                                <EyeInvisibleOutlined @click="passwordTypeChange('text')" title="显示密码" v-if="passwordType=='password'" />
                            </div>
                        </a-form-item>
                        <a-form-item name="captureId" :rules="[{ required: true, message: '请输入验证码!' }]">
                            <a-input v-model:value="formState.captureId" placeholder="验证码">
                                <template #prefix>
                                    <CheckCircleOutlined />
                                </template>
                                <template #suffix>
                                    <img class="validate" :src="'data:image/png;base64,'+validateImg" alt="" @click.stop="changeValidate">
                                </template>
                            </a-input>
                        </a-form-item>
                        <a-button type="primary" block @click="handleLogin">登录到OA</a-button>
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
        nextTick,
        toRaw,
        toRef
    } from "vue";
    import { UserOutlined, LockOutlined, CheckCircleOutlined,EyeOutlined,EyeInvisibleOutlined } from "@ant-design/icons-vue";
    const { proxy } = getCurrentInstance();
    import { message } from "ant-design-vue";
    import { compareIgnoreCase } from "@/utils/common.js";
    import { useRouter, useRoute } from "vue-router";
    import Interface from "@/utils/Interface.js";
    const router = useRouter();
    import md5 from "js-md5";
    const data = reactive({
        passwordType:'password'
    });
    const { passwordType } = toRefs(data);
    const passwordTypeChange=(e)=>{
        data.passwordType=e;
    }
    const formRef = ref(null);
    const formState = reactive({
        userName: "",
        password: "",
        captureId: ""
    });
    //const validateImg = ref(require("@/assets/img/twoDimensionalStats-thumb.png"));
    const validateImg = ref(null);
    const captchaId = ref();
    const changeValidate = () => {
        //console.log('更换验证码');
        getValidate();
    }
    const handleLogin = () => {
        //console.log("123", md5(formState.password));
        formRef.value.validate().then(()=>{
            //console.log('values', formState, toRaw(formState));
            if(compareIgnoreCase(formState.captureId, captchaId.value)){
                proxy.$post(Interface.login, {
                    userName: formState.userName,
                    //password: md5(formState.password),
                    password: btoa(formState.password),
                    //captureId: formState.captureId
                }).then(res=>{
                    if(res&&res.state===200){
                        let token = res.token;
                        let userInfo=res.user?JSON.stringify(res.user):'';
                        window.localStorage.setItem('token', token);
                        window.localStorage.setItem('userInfo', userInfo);
                        message.success(res.msg||'登录成功！');
                        router.push('/lightning/o/workspace/home');
                    }else {
                        if(res&&res.msg){
                            message.error(res.msg);
                        }
                        else{
                            message.error('登录失败！');
                        }
                        changeValidate();
                    }
                })
            }else {
                message.error("验证码错误！");
                changeValidate();
            }
        }).catch(error=>{
            console.log('error', error);
        })
    };
    const getValidate = () => {
        proxy.$get(Interface.validate, {
        }).then(res=>{
            // console.log('res', res.image)
            // console.log("validateImg", validateImg);
            captchaId.value = res.captchaId;
            validateImg.value = res.image;
        })
    }
    const handleForgot = () => {
        router.push({
            name: "Forgotpassword",
            params: {

            }
        })
    };
    getValidate();
</script>
<style lang="less" scoped>
    .loginWrap{
        width: 100%;
        height: 100vh;
        background: url(~@/assets/img/loginbackImg.jpg) no-repeat 100% 100%;
        position: relative;
        .loginContainer{
            width: 400px;
            position: absolute;
            top: calc(~"50% - 49px");
            left: 70%;
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
                min-height: 400px;
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
    .passwordTypeChange{
        position: absolute;
        right: 35px;
        top: 10px;
        font-size: 15px;
        color: #999;
        z-index: 10000;
    }
    .validate{
        width: 105px;
        height: 35px;
        cursor: pointer;
    }
    /deep/ :where(.css-dev-only-do-not-override-kqecok).ant-input{
        background: #f4f4f4;
    }
</style>