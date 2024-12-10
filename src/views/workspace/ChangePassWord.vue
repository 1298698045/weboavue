<template>
    <div class="ChangePassWordWrap">
      <div class="preview-header">
        <div class="icon-circle-base">
            <img :src="require('@/assets/img/rightMenu/youcemoren.png')" alt="">
        </div>
        <div class="leftBox">
          <div class="title">
            <div>
              <span class="doc-title">
                {{ title }}
              </span>
            </div>
          </div>
        </div>
        <div class="rightBox">
        </div>
      </div>
      <div class="detail-scroll">
        <div class="detail-bd">
          <div class="tabContainer containerForm">
            <div class="form-legend-desktop"><abbr class="required">*</abbr> = 必填信息 </div>
            <div class="tableBox">
              <a-form :model="formState" ref="formRef">
                <div class="section">
                  <div class="sectionTitle">密码信息</div>
                  <div class="sectionRow">
                      <div class="sectionItem">
                          <a-form-item name="userName" label="用户名">
                              {{data.userName||''}}
                          </a-form-item>
                      </div>
                  </div>
                  <div class="sectionRow">
                      <div class="sectionItem">
                          <a-form-item name="oldpass" label="旧密码" :rules="[{ required: true, message: '旧密码不能为空' }]">
                              <a-input :type="isShow1?'text':'password'" v-model:value="formState.oldpass" class="ChangePassWordName" @change="checkIsSave"></a-input>
                              <EyeOutlined v-if="isShow1" @click="isShow1=false" title="点击隐藏密码" />
                              <EyeInvisibleOutlined v-if="!isShow1" @click="isShow1=true" title="点击显示密码" />
                              <!-- <CheckCircleOutlined class="passwordsuccess" v-if="isSave1" /> -->
                          </a-form-item>
                      </div>
                  </div>
                  <div class="sectionRow">
                      <div class="sectionItem">
                          <a-form-item name="newpass" label="新密码" :rules="[{ required: true, message: '新密码不能为空' },{validator:checkLength}]">
                              <a-input :type="isShow2?'text':'password'" v-model:value="formState.newpass" class="ChangePassWordName" @change="checkIsSave"></a-input>
                              <EyeOutlined v-if="isShow2" @click="isShow2=false" title="点击隐藏密码" />
                              <EyeInvisibleOutlined v-if="!isShow2" @click="isShow2=true" title="点击显示密码" />
                              <a-tooltip v-if="!isSave2">
                                  <template #title>请使用至少8个字符并包含大小写字母、数字和特殊字符( ` ~ &lt; &gt; , & # ' " 除外)的组合，且密码长度不能超过18位</template>
                                  <InfoCircleOutlined title="密码规则" class="passwordrule" />
                              </a-tooltip>
                              <CheckCircleOutlined class="passwordsuccess" v-if="isSave2" />
                          </a-form-item>
                      </div>
                  </div>
                  <div class="sectionRow">
                      <div class="sectionItem">
                          <a-form-item name="newpass2" label="验证新密码" :rules="[{ required: true, message: '请输入第二次新密码' },{validator:checkLength}]">
                              <a-input :type="isShow3?'text':'password'" v-model:value="formState.newpass2" class="ChangePassWordName" @change="checkIsSave"></a-input>
                              <EyeOutlined v-if="isShow3" @click="isShow3=false" title="点击隐藏密码" />
                              <EyeInvisibleOutlined v-if="!isShow3" @click="isShow3=true" title="点击显示密码" />
                              <CheckCircleOutlined class="passwordsuccess" v-if="isSave3" />
                          </a-form-item>
                      </div>
                  </div>
                  <div class="sectionRow">
                      <div class="sectionItem">
                          <a-form-item name="question" label="问题">
                            <a-select v-model:value="formState.question">
                                <a-select-option v-for="(item,index) in listData" :key="index" :value="item.label">{{ item.label }}</a-select-option>
                            </a-select>
                          </a-form-item>
                      </div>
                  </div>
                  <div class="sectionRow">
                      <div class="sectionItem">
                          <a-form-item name="Name" label="答案">
                              <a-input v-model:value="formState.answer" class="ChangePassWordName"></a-input>
                          </a-form-item>
                      </div>
                  </div>
                </div>
               </a-form>
            </div>
            <div class="footerWrap"> 
                <a-button type="primary" class="ml10" @click="handleSave" :disabled="!isSave">保存</a-button>
                <a-button class="ml10" @click="closeChange">取消</a-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  <script setup>
  import {
    ref,
    reactive,
    onMounted,
    toRefs,
    getCurrentInstance,
    defineEmits,
    toRaw,
  } from "vue";
  import dayjs from 'dayjs';
  import 'dayjs/locale/zh-cn';
  import locale from 'ant-design-vue/es/date-picker/locale/zh_CN';
  dayjs.locale('zh-cn');
  import calendar from 'dayjs/plugin/calendar';
  import weekday from 'dayjs/plugin/weekday';
  import localeData from 'dayjs/plugin/localeData';
  dayjs.extend(calendar);
  dayjs.extend(weekday);
  dayjs.extend(localeData);
  import {
    UnorderedListOutlined,
    DownOutlined,
    CaretDownOutlined,
    DeleteFilled,
    DeleteOutlined,
    PlusOutlined,
    LikeOutlined,
    TagOutlined,
    FileTextOutlined,
    NodeIndexOutlined,
    UserOutlined,
    ProfileOutlined,
    CarryOutOutlined,
    PaperClipOutlined,
    SearchOutlined,
    EyeOutlined,
    EyeInvisibleOutlined,
    InfoCircleOutlined,
    CheckCircleOutlined
  } from "@ant-design/icons-vue";
  import { useRouter, useRoute } from "vue-router";
  import Interface from "@/utils/Interface.js";
  import { message } from "ant-design-vue";
  import { girdFormatterValue } from "@/utils/common.js";
  const { proxy } = getCurrentInstance();
  const editorRef = ref();
  const route = useRoute();
  const router = useRouter();
  const data = reactive({
    listData: [
        {label:'您宠物的名字？'},
        {label:'您出生于哪个城市？'},
        {label:'您第一份工作在哪个城市？'},
        {label:'您小时候喜欢的朋友名字是什么？'},
        {label:'您在哪个城市遇到您的配偶/另一半？'},
        {label:'您小时候的绰号是什么？'},
    ],
    height: 0,
    title:'修改密码',
    userId:'',
    userName:'',
    isSave:false,
    isShow1:false,
    isShow2:false,
    isShow3:false,
    isSave1:false,
    isSave2:false,
    isSave3:false,
  });
  const {
    listData,
    height,
    title,
    userId,
    userName,
    isSave,
    isShow1,
    isShow2,
    isShow3,
    isSave1,
    isSave2,
    isSave3,
  } = toRefs(data);
const formRef = ref();
const formState = reactive({
    userName:'',
    oldpass:'',
    newpass:'',
    newpass2:'',
    question:'',
    answer:''
  });
const checkIsSave=()=>{
    if(formState.oldpass&&formState.newpass&&formState.newpass2){
            if(formState.newpass.length<8||formState.newpass2.length<8){
                data.isSave=false;
                if(formState.newpass.length<8){
                    data.isSave2=false;
                }
                if(formState.newpass2.length<8){
                    data.isSave3=false;
                }
            }
            else{
                var value=formState.newpass;
                var p1 = /[0-9]/;
                var p12 = /[A-Z]/;
                var p13 = /[a-z]/;
                var p2 = /[^a-zA-Z0-9]/;
                if (p1.test(value) && p12.test(value) && p13.test(value)) {
                    data.isSave2=true;
                    if(formState.newpass==formState.newpass2){
                        data.isSave=true;
                        data.isSave3=true;
                    }
                    else{
                        message.error("新密码和验证新密码不一致！");
                        data.isSave=false;
                        data.isSave3=false;
                    }
                }
                else{
                    message.error("至少需要包含一个大小写字母、数字和特殊字符！");
                    data.isSave=false;
                    data.isSave2=false;
                    data.isSave3=false;
                }
                
            }
    }
    else{
        data.isSave=false;
        data.isSave2=false;
        data.isSave3=false;
    }
}
  const getDetail = () => {
    let d = {
              actions:[{
                  id: "4270;a",
                  descriptor: "aura://RecordUiController/ACTION$getRecordWithFields",
                  callingDescriptor: "UNKNOWN",
                  params: {
                  recordId: data.id,
                  apiName:data.sObjectName,
                  objTypeCode: data.objectTypeCode
                  }
              }]
          };
          let obj = {
              message: JSON.stringify(d)
          }
          proxy.$post(Interface.detail,obj).then(res=>{
              if(res&&res.actions&&res.actions[0]&&res.actions[0].returnValue&&res.actions[0].returnValue.fields){
                let fields=res.actions[0].returnValue.fields;
                formState.Name=fields.Name.value;
                //formState.Content=fields.Body.value?htmlDecode(fields.Body.value):'';
              }
              // if(editorRef&&editorRef.value){
              //       if(formState.Content){
              //         editorRef.value.content=formState.Content;
              //       }
              //       else{
              //         formState.Content=defaultContent;
              //         editorRef.value.content=formState.Content;
              //       }
              //   }
          })
  };
//getDetail();
  // 保存
  const handleSave = (type) => {
        let url=Interface.user.changePwd;
        let pwd=btoa(formState.newpass);
        let confirmpwd=btoa(formState.newpass);
        let d = {
            actions:[{
                id: "2919;a",
                descriptor: "",
                callingDescriptor: "UNKNOWN",
                params: {
                  pwd: pwd,
                  confirmpwd: confirmpwd
                }
            }]
        };
        let obj = {
            message: JSON.stringify(d)
        }
        proxy.$post(url,obj).then(res=>{
          if(res&&res.actions&&res.actions[0]&&res.actions[0].state&&res.actions[0].state=='SUCCESS'){
                message.success("密码修改成功！");
                formRef.value.resetFields();
          }
          else{
            if(res&&res.actions&&res.actions[0]&&res.actions[0].state&&res.actions[0].errorMessage){
                message.error(res.actions[0].errorMessage);
            }
            else{
                message.error("密码修改失败！");
            }
          }
        });
    }
    const checkLength = (_, value) => {
        if (!value || value.length < 8) {
        return Promise.reject(new Error('密码长度不得小于8位'));
        }
        return Promise.resolve();
    };
    const closeChange=()=>{
        router.push({
            path: "/workspace/personal/home",
            query: {
            name: "123"
            }
        })
    }
    onMounted(() => {
      let userInfo=window.localStorage.getItem('userInfo');
      if(userInfo){
            userInfo=JSON.parse(userInfo);
            data.userId=userInfo.userId;
            data.userName=userInfo.fullName;
            if(data.userId=='jackliu'){
                data.userId='2EC00CF2-A484-4136-8FEF-E2A2719C5ED6'
            }
      }
      //getDetail();
        let h=document.documentElement.clientHeight;
        data.height = h-300;
        window.addEventListener("resize", () => {
            let h=document.documentElement.clientHeight;
            data.height = h-300;
        })
    })
  </script>
  <style lang="less" scoped>
  .ChangePassWordWrap{
    width: 100%;
    height: 100%;
    background: #fff;
    overflow: hidden;
    .preview-header{
        width: 100%;
        height: 50px;
        position: relative;
        top: 0;
        background: #fff;
        display: flex;
        justify-content: space-between;
        box-sizing: border-box;
        border-bottom: 1px solid #e5e6eb;
        box-shadow: 0px 2px 8px 0px rgba(237, 239, 243, 1);
        z-index: 99 !important;
        padding: 8px 20px 0 20px;
        .icon-circle-base {
            width: 35px;
            height: 35px;
            background: #0079de;
            border-radius: 50%;
            margin-right: 0px;
            color: #fff;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            top: 0px;
            img {
                width: 20px;
                height: 20px;
            }
        }
        .ant-tabs-nav{
            margin: 0;
        }
        .leftBox {
            min-width: 695px;
            flex: 1;
            .backText{
                color: var(--textColor);
                font-weight: bold;
                font-size: 14px;
                cursor: pointer;
                padding-right: 10px;
            }
            .title{
                // margin-top: 5px;
                // height: 48px;
                display: flex;
                align-items: center;
                color: #1d2129;
                font-size: 14px;
                font-weight: normal;
                margin:6px 0 3px 18px;
            }
            .ant-tabs .ant-tabs-nav::before{
                display: none;
            }
            .ant-tabs-tab{
                padding: 9px 8px !important;
                margin-right: 24px !important;
            }
        }
        
    }
    .detail-scroll{
        overflow: auto;
        height: calc(~"100% - 50px") !important;
        overflow: auto;
        .detail-bd{
            // padding: 24px;
            height: 100%;
        }
        .tabContainer{
            min-height: 197px;
            height: auto;
            background: #fff !important;
            //display: flex;
            padding-bottom: 20px;
            position: relative;
            padding: 24px;
            .tableBox{
                // flex: 1;
                background: #fff;
                border-radius: 4px;
                margin-right: 12px;
                width: calc(~"100% - 0px");
                //overflow: auto;
                padding: 20px 15px;
                margin-right: 5px;
                .sectionItem1{
                  //border: 1px solid #dedede;
                  .ant-form-item{
                    margin-bottom: 10px;
                  }
                }
                .ChangePassWordContent{
                  display: flex;
                  .wea-doc-mould-rich-text-right-list{
                    width: 180px;
                    right: 0;
                    top: 0;
                    bottom: 0;
                    display: inline-block;
                    position: absolute;
                    height: calc(~'100% + 0px');
                  }
                  .wea-doc-mould-rich-text-right-list .special-field-wrapper>div{
                    height: 100%;
                  }
                  .wea-input-focus {
                      height: 30px;
                      line-height: 32px;
                      position: relative;
                      background-color: #fff;
                      display: inline-block;
                      width: 100%;
                  }
                  .ant-input-wrapper {
                      width: 100%;
                      display: inline-block;
                      height: 100%;
                      .ant-input-affix-wrapper{
                        padding-left: 8px !important;
                        :deep #form_item_Content{
                          border:none !important;
                          font-size: 12px;
                          width: 114px !important;
                        }
                        :deep .ant-input-clear-icon{
                          position: relative;
                          right: 0px;
                        }
                      } 
                  }
                  .special-field-wrapper{
                    height: 100%;
                  }
                  .wea-input-focus .ant-input-wrapper>input {
                    width: 100%;
                    display: inline-block;
                      //padding-right: 45px;
                      -webkit-box-shadow: none;
                      box-shadow: none;
                      //border: 1px solid #d9d9d9;
                      height: 30px;
                      // position: relative;
                      // top: 1px;
                      //text-indent: 10px;
                      font-size: 12px;
                  }
                  .wea-input-focus>.wea-input-focus-btn {
                        position: absolute;
                        top: 2px;
                        right: 2px;
                        height: 24px;
                        line-height: 34px;
                        padding-top: 0;
                        padding-bottom: 0;
                        padding-left: 5px !important;
                        border: 0;
                        padding-right: 5px;
                        background: #fff;
                        z-index: 2;
                    }
                    .wea-input-focus>.wea-input-focus-btn .anticon-search {
                        display: inline-block;
                        font-style: normal;
                        vertical-align: baseline;
                        text-align: center;
                        text-transform: none;
                        text-rendering: auto;
                        line-height: 1;
                        text-rendering: optimizeLegibility;
                        -webkit-font-smoothing: antialiased;
                        color: #b2b2b2;
                        font-size: 14px !important;
                      }
                      .wea-input-focus>.wea-input-focus-btn .anticon-search {
                          color: #b2b2b2;
                          font-size: 12px;
                      }
                      
                        .special-field-wrapper-single {
                          display: inline-block;
                          width: 100%;
                          padding-bottom: 4px;
                          height: calc(~'100% - 36px');
                          overflow-y: auto;
                          overflow-x: hidden;
                      }
                      .wea-new-scroll {
                        height: 100% !important;
                        .clipper {
                            overflow: hidden;
                            height: 100%;
                            width: 100%;
                            position: relative;
                        }
                        .scroller {
                                overflow-y: scroll;
                                overflow-x: hidden;
                                height: 100%;
                            }
                      }
                      .special-field-wrapper .special-field-item {
                          height: 30px;
                          line-height: 30px;
                          padding-left: 15px;
                          font-size: 12px;
                          cursor: pointer;
                      }
                      .special-field-wrapper .special-field-item:hover{
                        background-color: #e9f7fe;
                      }
                      .special-field-wrapper .special-field-item.actived {
                        background-color: #e9f7fe;
                      }
                      
                }
            }
            .tableBox.active{
                width: 100%;
            }
        }
        .wea-doc-detail-content-text-sub {
            color: #999;
            position: absolute;
            bottom: 13px;
            right: 40px;
            font-size: 13px;
        }
    }
    .detail-footer{
        width: 100%;
        position: fixed;
        bottom: 0;
        background: #fff;
        height: 64px;
        box-shadow: 0px -2px 6px 0px rgba(0, 0, 0, 0.1);
        z-index: 99;
        .flexEnd{
            display: flex;
            justify-content: flex-end;
            padding-right: 10px;
        }
    }
    :deep .ant-tabs-tab{
        padding: 10px 8px !important;
        font-size: 12px !important;
        margin-left: 10px !important;
        margin-right: 12px !important;
    }
    :deep .ant-tabs-nav::before{
        display: none;
    }
}
.rightBox{
    display: flex;
    align-items: end;
    height: 35px;
    .btn-drop{
        width: 32px;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        margin-top: 12px;
        color: #999999;
    }
    .btn-drop:hover{
        color: rgb(78,89,105);
        background: #f2f3f5;
    }
    .ant-btn{
        margin-top: 12px;
    }
}

.rightAside{
    min-width: 20%;
    max-width: 20%;
    position: absolute;
    height: 100%;
    right: 0;
    // background: #fff;
    padding: 0 10px;
    // overflow-y: auto;
    .panel{
        padding: 20px;
        background: #fff;
        border-radius: 4px;
        margin-bottom: 16px;
        cursor: pointer;
        overflow: auto;
        .panel-head{
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 19px;
            .panel-title{
                font-size: 16px;
                color: #1d2129;
                font-weight: bold;
            }
        }
        .panel-bd{
            .empty {
                height: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                flex-direction: column;
                text-align: center;
                color: #666;
                img{
                    width: 50px;
                }
                .emptyDesc{
                    font-size: 14px;
                }
            }
            .relevantList{
                .relevantItem{
                    width: 100%;
                    position: relative;
                    padding: 13px 8px;
                    border-bottom: 1px solid #e5e6eb;
                    .relevantTitle{
                        width: 75%;
                        font-size: 14px;
                        color: #1d2129;
                    }
                    .relevantTimerInfo{
                        font-size: 12px;
                        color: #86909c;
                        padding-top: 10px;
                    }
                    .anticon-delete{
                        position: absolute;
                        right: 10px;
                        top: 25px;
                        font-size: 16px;
                    }
                }
                .relevantItem:hover{
                    background: #f2f3f5 !important;
                }
            }
        }
    }
    .asideScroll{
        height: 100%;
        overflow-y: auto;
    }
    .arrowIcon{
        position: absolute;
        top: 50%;
        z-index: 999;
        width: 16px;
        height: 60px;
        background: url("~@/assets/img/right.png") center center no-repeat;
        cursor: pointer;
        left: 1px;
    }
    .arrowIcon.rightIcon:hover{
        background: url("~@/assets/img/right_hover.png") center center no-repeat;
    }
    .arrowIcon.leftIcon{
        top: 50%;
        left: inherit !important;
        right: 0;
        background: url("~@/assets/img/left.png") center center no-repeat;
        &:hover{
            background: url("~@/assets/img/left_hover.png") center center no-repeat;
        }
    }
}
.leftContent{
    width: calc(~"80% - 5px");
    height: 100%;
    border-right: 1px solid #e2e3e5;
    overflow: hidden;
    overflow-y: auto;
    &.active{
        width: calc(~"100% - 24px");
    }
}

  :where(.css-dev-only-do-not-override-kqecok).ant-collapse {
    border: none !important;
    background: #fff;
  }
  :where(.css-dev-only-do-not-override-kqecok).ant-collapse > .ant-collapse-item {
    border-bottom: none !important;
    background: #f3f2f2;
    margin-bottom: 8px;
  }
  :deep
    :where(.css-dev-only-do-not-override-kqecok).ant-collapse
    .ant-collapse-content {
    border-top: none !important;
  }
  :deep
    :where(.css-dev-only-do-not-override-kqecok).ant-collapse
    > .ant-collapse-item
    > .ant-collapse-header {
    padding: 6px 16px !important;
  }
  :deep
    :where(.css-dev-only-do-not-override-kqecok).ant-collapse
    .ant-collapse-content
    > .ant-collapse-content-box {
    padding: 0 !important;
  }
  :deep
    :where(.css-dev-only-do-not-override-kqecok).ant-collapse
    > .ant-collapse-item:last-child,
  :where(.css-dev-only-do-not-override-kqecok).ant-collapse
    > .ant-collapse-item:last-child
    > .ant-collapse-header {
    border-radius: 0 !important;
  }
  // :deep .panel {
  //   overflow: hidden;
  //   height: 100%;
  // }
  .files {
    width: 100%;
    .fileItem {
      width: 100%;
      display: flex;
      padding: 10px 5px;
      &:hover {
        cursor: pointer;
        background: #eee;
      }
      .lImg {
        width: 40px;
        height: 40px;
        min-width: 40px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .rInfo {
        flex: 1;
        margin-left: 10px;
        overflow: hidden;
        .name {
          width: 60%;
          font-size: 14px;
        }
        .optionLink {
          .link {
            color: var(--textColor);
          }
        }
        .time {
          font-size: 12px;
          color: #b8bbcc;
        }
      }
    }
  }
  .ChangePassWordWrap .detail-scroll{
    height: calc(~"100% - 45px");
  }
  .ChangePassWordWrap .detailContent{
      width: 100%;
      padding: 20px;
      border-radius: 4px;
      overflow: auto;
  }
  .ChangePassWordWrap .tableBoxContent{
    white-space: pre-wrap;
    word-break: break-all;
    padding-top: 20px;
  }
  .tableBoxWrap{
    background: rgb(233, 233, 233); 
    margin: 0px auto; padding: 4px; 
    border: 1px solid rgb(194, 194, 194); 
    width: 950px; 
    line-height: 22px;
    margin-top: 8px;
    .tableBoxDiv{
        background: url(&quot;Six_01.gif&quot;) repeat-x 50% top rgb(255, 255, 255); 
        padding: 20px 40px; 
        border: 1px solid rgb(255, 255, 255);
    }
    .tableBoxTop{
        text-align: left; 
        color: rgb(128, 128, 128); 
        padding-bottom: 10px; 
        font-size: 12px; 
        border-bottom-color: rgb(216, 216, 216); 
        border-bottom-width: 1px; 
        border-bottom-style: dashed;
    }
    .tableBoxTitle{
        color: rgb(0, 0, 0); 
        line-height: 85px; 
        font-size: 24px; 
        text-align: center;
        font-family: 仿宋_GB2312,FangSong_GB2312 !important;
    }
    .tableBoxp1{
        text-align: center; 
        color: rgb(128, 128, 128); 
        font-family: 宋体 !important; 
        font-size: 12px; 
        font-weight: normal;
    }
    .tableBoxp2{
        height: 1px; 
        line-height: 1px; 
        text-indent: 2em; 
        font-size: 0px; 
        border-top-color: rgb(191, 191, 191); 
        border-bottom-color: rgb(216, 216, 216); 
        border-top-width: 1px; 
        border-bottom-width: 1px; 
        border-top-style: solid; 
        border-bottom-style: solid;
    }
  }
  .ChangePassWordWrap{
    .preview-header .icon-circle-base{
      background: #df583a;
    }
    .title{
      color: #333;
    }
    .wea-doc-detail-content-text-sub span{
      font-size: 12px;
    }
    .doc-like .anticon{
      color: rgb(178, 178, 178);
      margin-left: 8px;
      margin-right: 4px;
      font-size: 16px;
      cursor: pointer;
    }
    .doc-like.active,.doc-like.active .anticon{
      color: rgb(255, 159, 1);
    }
    .doc-label{
      color: #999;
      margin-left: 10px;
      font-size: 16px;
      font-weight: normal;
      position: absolute;
      cursor: pointer;
    }
    .detail-scroll .tabContainer .tableBox{
        padding:0;
        //width: 835px;
        //margin: 0 auto;
    }
    :deep .tox-tinymce{
        width: calc(~'100% - 180px') !important;
        border: none;
        border-radius: 0;
        .tox-editor-container{
            //background: #f0f2f6;
            .tox-toolbar__primary{
                //display: flex;
                //justify-content: center;
                border-radius: 0;
            }
            .tox-editor-header{
                //border:none;
                background: #f8f8f8;
                border-radius: 0;
                box-shadow: none;
                padding: 0;
                border-bottom: 1px solid #eaeaea;
                //position: relative;
                //top: -12px;
            }
            .tox-toolbar__primary{
                background: #f8f8f8;
                border-radius: 0;
                //zoom: 0.9;
            }
            .tox-toolbar-overlord{
                border:none;
                background: #f8f8f8;
                border-radius: 0;
            }
            .tox-tbtn--bespoke{
                background: #f8f8f8;
                width: 87px !important;
            }
            .tox-toolbar__group{
                padding: 0 0px 0 8px;
            }
        }
       .tox-edit-area::before{
            border: none !important;
        }
    }
    .preview-header .leftBox .title{
        margin: 7px 0 0px 13px;
        .doc-title{
            width: 455px;
            display: block;
        }
    }
    :deep .ant-tabs-tab{
        margin-left: 20px !important;
        margin-right: 4px !important;
        padding: 6px 8px !important;
    }
    .require{
        font-size: 24px;
        margin-left: 5px;
        color: red;
        position: relative;
        top: 4px;
    }
    .btn-drop{
        font-size: 18px !important;
    }
    .tableBox-Bottom{
        height: 45px;
        background: #fff;
        display: flex;
        align-items: center;
        border-top: 1px solid #eaeaea;
        padding-left: 10px;
        .tableBox-Bottom-Btn{
            padding: 0 10px;
            cursor: pointer;
        }
        .tableBox-Bottom-Btn-Icon{
            position: relative;
            top: 1px;
            margin-right: 1px;
        }
    }
    .IsReply{
        margin: 0 5px 0 15px;
        :deep .el-checkbox__label{
            padding-left: 5px;
        }
    }
    .replyInfo{
        color: #fff;
        width: 17px;
        height: 17px;
        background: #faa825;
        border-radius: 50%;
        text-align: center;
        position: relative;
        top: -1px;
    }
    .ChangePassWordContent{
      .panel{
        padding: 0 !important;
        margin-bottom:0 !important;
      }
      .panel-head{
        margin:0px 5px 10px;
      }
      .pageWrap{
        text-align: right;
        padding: 15px;
      }
    }
    .tabContainer{
      background: #e8edf4 !important;
      padding: 24px 20px !important;
      padding-right: 20px !important;
      .tableBox{
        margin-right: 0 !important;
        padding: 0px !important;
        .section .sectionRow{
          padding: 0 10px !important;
        }
      }
    }
    .panel-bd2{
      height: calc(~'100% - 105px') !important;
    }
    :deep .ant-table-body{
      height: calc(~'100% - 35px') !important;
    }
    .ant-table-wrapper,.ant-spin-nested-loading,.ant-spin-nested-loading .ant-spin-container,.ant-table-wrapper .ant-table,.ant-table-wrapper .ant-table-container{
            height: 100% !important;
        }
    .iconBox .moreaction {
        padding: 0px 1px;
        width: 18px;
        border: 1px solid #dedede;
        border-radius: 4px;
        position: relative;
        top: 1px;
    }
    .iconBox .popup{
        top: 25px;
        right: 0;
        width: max-content;
        min-width: 88px;
    }
  }
  :where(.css-dev-only-do-not-override-kqecok).ant-table-wrapper,:where(.css-dev-only-do-not-override-kqecok).ant-spin-nested-loading,:where(.css-dev-only-do-not-override-kqecok).ant-spin-nested-loading .ant-spin-container,:where(.css-dev-only-do-not-override-kqecok).ant-table-wrapper .ant-table,:where(.css-dev-only-do-not-override-kqecok).ant-table-wrapper .ant-table-container{
      height: 100% !important;
    }
  body .ant-table-tbody td{
      padding: 6.5px 16px !important;
    }
    body .ant-table-measure-row td{
      padding: 0 !important;
    }
    body .ant-table-wrapper .ant-table-thead >tr>th{
      background-color: #f7fbfe !important;
      padding: 8.5px 16px !important;
    }
    body .ant-table-tbody tr:hover,body .ant-table-tbody tr:hover td{
      background-color: #e9f7ff !important;
      color: #108def !important;
    }
    body .ant-table-tbody tr:nth-child(odd) {
      background-color: rgb(250, 250, 250) !important; /* 奇数行背景色 */
    }
    body .ant-table-tbody tr:nth-child(even) {
      background-color: #fff !important; /* 偶数行背景色 */
    }
    .ant-pagination{
        .ant-pagination-item{
            border: 1px solid #d9d9d9;
        }
        .ant-pagination-item:hover{
            border: 1px solid #1677ff;
            background: #fff !important;
        }
        .ant-pagination-item-active,.ant-pagination-item-active:hover{
            border: 1px solid #1677ff;
            background: #1677ff !important;
            a{
                color: #fff;
            }
        }
    } 
    :deep .ant-table-wrapper .ant-table-tbody >tr >td >.ant-table-wrapper:only-child .ant-table, :deep .ant-table-wrapper .ant-table-tbody >tr >td >.ant-table-expanded-row-fixed>.ant-table-wrapper:only-child .ant-table{
      margin-block: 0px;
      margin-inline: 50px 50px;
      .ant-table-thead th {
        padding: 4.5px 16px !important;
        font-size: 12px !important;
      }
      .ant-table-tbody td{
        padding: 3.5px 16px !important;
        font-size: 12px !important;
      }
    }
    .ChangePassWordWrap{
        .form-legend-desktop {
            text-align: right;
            margin-bottom: 8px;
        }
        .required {
            color: red;
        }
        .footerWrap{
            text-align: center;
            .ml10 {
                margin-left: 12px;
            }
        }
        .section .sectionTitle {
            height: 30px;
            background-color: #f3f2f2;
            line-height: 30px;
            border-radius: 4px;
            padding-left: 15px;
            margin-bottom: 20px;
        }
        :deep .ant-form-item-label{
            min-width: 100px;
            margin-right: 5px;
        }
        .tabContainer{
            padding: 20px 30px !important;
        }
        :deep .ant-row{
            justify-content: center;
            position: relative;
            left: -50px;
            display: flex !important;
        }
        :deep .section .sectionRow .sectionItem .ant-row{
            display: flex !important;
        }
        :deep .ant-form-item-control{
            max-width: 45%;
        }
        :deep .ant-form-item{
            margin-bottom: 20px;
        }
        :deep .ant-input,:deep .ant-select-selector{
            border-radius: 4px !important;
        }
        .sectionRow .sectionItem{
            position: relative;
            .anticon{
                cursor: pointer;
                position: absolute;
                right: 10px;
                top: 8px;
                font-size: 16px;
                color: #999;
            };
            .passwordrule{
                right: -25px;
                color: #1055BC;
            }
            .passwordsuccess{
                right: -25px;
                color: green;
            }
        }
    }
  </style>
  