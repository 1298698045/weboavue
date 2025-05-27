<template>
  <div class="loginWrap">
    <div class="loginContainer">
      <!-- <div class="loginImg">
                <img :src="require('@/assets/img/loginLogo.png')" alt="">
            </div> -->
      <div class="loginContent">
        <!-- <div class="loginHead">
                    账号登录
                </div> -->
        <div class="hello">您好！</div>
        <div class="use-wifi">欢迎使用协同办公</div>
        <div class="tips" v-if="route.query.t * 1 == 1" style="color: red">
          用户已注销!
        </div>
        <div class="error" style="color: red" v-if="formState.errorText">
          {{formState.errorText}}
        </div>
        <div class="loginCenter">
          <a-form
            ref="formRef"
            :model="formState"
            @submit.prevent="handleLogin"
          >
            <template v-if="current == 0">
              <a-form-item
                name="userName"
                :rules="[{ required: true, message: '请输入用户名!' }]"
              >
                <a-input
                  v-model:value="formState.userName"
                  placeholder="用户名"
                  allow-clear
                >
                  <template #prefix>
                    <UserOutlined />
                  </template>
                </a-input>
              </a-form-item>
              <a-form-item
                name="password"
                :rules="[{ required: true, message: '请输入密码!' }]"
              >
                <a-input
                  v-model:value="formState.password"
                  type="password"
                  placeholder="密码"
                  allow-clear
                >
                  <template #prefix>
                    <LockOutlined />
                  </template>
                </a-input>
              </a-form-item>
              <a-form-item
                name="captureId"
                :rules="[{ required: true, message: '请输入验证码!' }]"
              >
                <a-input
                  v-model:value="formState.captureId"
                  placeholder="验证码"
                >
                  <template #prefix>
                    <CheckCircleOutlined />
                  </template>
                  <template #suffix>
                    <img
                      class="validate"
                      :src="'data:image/png;base64,' + validateImg"
                      alt=""
                      @click.stop="changeValidate"
                    />
                  </template>
                </a-input>
              </a-form-item>
            </template>
            <template v-if="current == 1">
              <a-form-item
                name="phone"
                :rules="[{ required: true, message: '手机号!' }]"
              >
                <a-input
                  v-model:value="formState.phone"
                  placeholder="手机号"
                  allow-clear
                >
                  <template #prefix>
                    <UserOutlined />
                  </template>
                </a-input>
              </a-form-item>
              <a-form-item
                name="captureId"
                :rules="[{ required: true, message: '请输入验证码!' }]"
              >
                <a-input
                  v-model:value="formState.captureId"
                  placeholder="验证码"
                >
                  <template #prefix>
                    <CheckCircleOutlined />
                  </template>
                  <template #suffix>
                    <img
                      class="validate"
                      :src="'data:image/png;base64,' + validateImg"
                      alt=""
                      @click.stop="changeValidate"
                    />
                  </template>
                </a-input>
              </a-form-item>
              <a-form-item
                name="smsCode"
                :rules="[{ required: true, message: '请输入短信验证码!' }]"
              >
                <a-input
                  v-model:value="formState.smsCode"
                  placeholder="短信验证码"
                >
                  <template #prefix>
                    <CheckCircleOutlined />
                  </template>
                  <template #suffix>
                    <span
                      class="send"
                      v-if="!isSendCode"
                      @click="handleSendCode"
                      >发送验证码</span
                    >
                    <span class="buttonText" v-else>{{ buttonText }}</span>
                  </template>
                </a-input>
              </a-form-item>
            </template>
            <a-button type="primary" block @click="handleLogin"
              >登录到OA</a-button
            >
            <!-- <a
              v-if="current == 0"
              href="javascript:;"
              style="margin-top: 15px; display: block"
              @click="handleForgot"
              >忘记密码</a
            > -->
            <div class="other-login-divider" style="margin-top: 15px; display: block">
              <span>或</span>
            </div>
            <div class="switch-account">
              <div
                class="switch-item"
                :class="{ active: current == 0 }"
                @click="changeMethod(0)"
              >
                <img src="@/assets/img/password.svg" alt="" />
                密码登录
              </div>
              <div
                class="switch-item"
                :class="{ active: current == 1 }"
                @click="changeMethod(1)"
              >
                <img src="@/assets/img/sms.svg" alt="" />
                验证码登录
              </div>
              <!-- <div
                class="switch-item"
                :class="{ active: current == 2 }"
                @click="changeMethod(2)"
              >
                <img src="@/assets/img/code.svg" alt="" />
                扫码登录
              </div> -->
            </div>
          </a-form>
        </div>
      </div>
    </div>
    <div class="footer">
      <!-- <div class="footerInfo">
        <a
          href="http://182.92.221.64:10000/download/appsdown.htm"
          target="_blank"
          >苹果客户端</a
        >
        <a-divider type="vertical" />
        <a
          href="http://182.92.221.64:10000/download/appsdown.htm"
          target="_blank"
          >安卓客户端</a
        >
        <a-divider type="vertical" />
        <a
          href="http://182.92.221.64:10000/download/appsdown.docx"
          target="_blank"
          >App下载安装说明</a
        >
        <a-divider type="vertical" />
        <a
          href="http://182.92.221.64:10000/download/iWebOffice2015.msi"
          target="_blank"
          >OFFICE插件</a
        >
        <a-divider type="vertical" />
        <a
          href="http://182.92.221.64:10000/download/谷歌浏览器稳定版64位_89.exe"
          target="_blank"
          >谷歌浏览器</a
        >
      </div> -->
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
  toRef,
  onUnmounted,
  computed,
} from "vue";
import {
  UserOutlined,
  LockOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons-vue";
const { proxy } = getCurrentInstance();
import { message } from "ant-design-vue";
import Toast from "@/utils/toast.js";
import { compareIgnoreCase } from "@/utils/common.js";
import { useRouter, useRoute } from "vue-router";
import Interface from "@/utils/Interface.js";
const router = useRouter();
const route = useRoute();
import { useStore } from "vuex";
const store = useStore();
console.log("store", store);
import md5 from "js-md5";
const formRef = ref(null);
const formState = reactive({
  userName: "jackliu",
  password: "Hospital@80",
  captureId: "",
  phone: "",
  smsCode: "",
  errorText: ""
});
const phoneRegex = /^1[3-9]\d{9}$/;
const current = ref(0);
const isSendCode = ref(false);
const countdown = ref(180);
let timer = null;

const validateImg = ref(require("@/assets/img/twoDimensionalStats-thumb.png"));
const captchaId = ref();
const changeValidate = () => {
  getValidate();
};
const changeMethod = (e) => {
  current.value = e;
};
const handleSendCode = async () => {
  if (!phoneRegex.test(formState.phone)) {
    Toast.error("请输入有效手机号!");
    return false;
  }
  if (!compareIgnoreCase(formState.captureId, captchaId.value)) {
    Toast.error("请输入正确验证码!");
    return false;
  }
  isSendCode.value = true;
  timer = setInterval(() => {
    countdown.value--;
    if (countdown.value <= 0) {
      clearInterval(timer);
      isSendCode.value = false;
      countdown.value = 60;
    }
  }, 1000);
};
const handleLogin = () => {
  //console.log("123", md5(formState.password));
  formRef.value
    .validate()
    .then(() => {
      //console.log('values', formState, toRaw(formState));
      if (compareIgnoreCase(formState.captureId, captchaId.value)) {
        proxy
          .$post(Interface.login, {
            userName: formState.userName,
            //password: md5(formState.password),
            password: btoa(formState.password),
            //captureId: formState.captureId
          })
          .then((res) => {
            if (res && res.state === 200) {
              let token = res.token;
              let userInfo = res.user ? JSON.stringify(res.user) : "";
              window.localStorage.setItem("token", token);
              window.localStorage.setItem("userInfo", userInfo);
              // Toast.success(res.msg || "登录成功！");
              store.dispatch("getModules");
              // router.push('/lightning/o/workspace/home');
            } else {
              if (res && res.msg) {
                // Toast.error("登录失败," + res.msg);
                formState.errorText = res.msg;
              } else {
                // Toast.error("登录失败！");
                formState.errorText = "登录失败!";
              }
              changeValidate();
            }
          });
      } else {
        Toast.error("验证码错误！");
        changeValidate();
      }
    })
    .catch((error) => {
      console.log("error", error);
    });
};
const getValidate = () => {
  proxy.$get(Interface.validate, {}).then((res) => {
    // console.log('res', res.image)
    // console.log("validateImg", validateImg);
    captchaId.value = res.captchaId;
    validateImg.value = res.image;
  });
};
const handleForgot = () => {
  router.push({
    name: "Forgotpassword",
    params: {},
  });
};
getValidate();

onUnmounted(() => {
  clearInterval(timer);
});
const buttonText = computed(() => {
  return isSendCode.value ? `${countdown.value}秒后重新发送` : "获取验证码";
});
</script>
<style lang="less" scoped>
.loginWrap {
  width: 100%;
  height: 100vh;
  background: url(~@/assets/img/loginbackImg.jpg) no-repeat 100% 100%;
  position: relative;
  background-size: cover;
  .loginContainer {
    width: 450px;
    position: absolute;
    top: calc(~"50% - 49px");
    /* left: 70%; */
    right: 150px;
    transform: translate(0, -50%);

    .loginImg {
      height: 60px;
      margin-bottom: 49px;
      text-align: center;

      img {
        height: 100%;
      }
    }

    .loginContent {
      width: 450px;
      min-height: 596px;
      box-shadow: 0px 1px 12px 0px rgba(0, 0, 0, 0.2);
      border-radius: 10px;
      /* padding: 0 0 30px 0; */
      padding: 60px 45px 50px;
      background: #fff;

      .loginHead {
        text-align: center;
        font-size: 18px;
        color: #1d2129;
        font-weight: bold;
        padding: 53px 0 30px 0;
      }

      .hello {
        font-size: 25px;
        font-weight: 600;
        margin-bottom: 4px;
      }

      .use-wifi {
        width: 100%;
        height: 28px;
        font-size: 20px;
        font-weight: 400;
        color: #333;
        line-height: 28px;
      }

      .loginCenter {
        .ant-form {
          width: 336px;
          margin: 30px auto 0;

          .ant-input-affix-wrapper {
            height: 40px;
            border-radius: 4px !important;
            border: 1px solid #ddd;

            /* background: #f4f4f4; */
            .ant-input {
              /* background: transparent !important; */
            }
          }

          .ant-btn {
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

  .footer {
    width: 100%;
    height: 100px;
    background: #fff;
    position: absolute;
    bottom: 0;
    text-align: center;

    .footerInfo {
      height: 50px;
      line-height: 70px;

      a {
        color: #4e5969;
        padding: 0 15px;

        &:hover {
          color: var(--textColor);
        }
      }
    }

    .companyName {
      padding-top: 10px;
      color: #999;
    }
  }
}

.validate {
  width: 105px;
  height: 35px;
  cursor: pointer;
}

/* /deep/ :where(.css-dev-only-do-not-override-kqecok).ant-input{
        background: #f4f4f4;
    } */
.switch-account {
  display: flex;
  justify-content: center;
  margin-top: 20px;

  .switch-item {
    font-size: 13px;
    color: #8b8b8b;
    font-weight: bold;
    border-bottom: 2px solid transparent;
    margin-right: 10px;
    cursor: pointer;
    display: flex;
    align-items: center;
    padding-bottom: 4px;

    &:hover,
    &.active {
      color: #0176d3;
      border-color: #0176d3;
    }

    img {
      width: 24px;
      height: 24px;
      fill: #0176d3;
      margin-right: 5px;
    }
  }
}

.send {
  color: #0176d3;
  cursor: pointer;
}

.other-login-divider {
  color: #b5b8be;
  font-size: 12px;
  font-weight: 400;
  line-height: 16px;
  position: relative;
  text-align: center;
  width: 100%;

  &::before,
  &::after {
    background: #ebecee;
    border-radius: 2px;
    content: "";
    display: block;
    height: 1px;
    position: absolute;
    top: 50%;
    width: 45%;
  }

  &::before {
    right: 0;
  }
}
</style>
