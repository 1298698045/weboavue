<template>
  <div>
    <a-modal v-model:open="props.isShow" width="850px" :style="setTop" :maskClosable="false" @cancel="handleCancel"
      @ok="handleSubmit">
      <template #title>
        <div>
          {{ title }}
        </div>
      </template>
      <div class="modalContainer">
        <div class="modalCenter" :style="{ height: height + 'px!important' }">
          <a-form :model="formState" ref="formRef">
            <div class="section">
              <div class="sectionRow">
                <div class="sectionItem">
                  <a-form-item name="stamp" label="水印文字" :rules="[{ required: true, message: '请输入水印文字' }]">
                    <a-input v-model:value="formState.stamp" class="ApprovedByName"></a-input>
                  </a-form-item>
                </div>
              </div>
            </div>
          </a-form>
        </div>
      </div>
      <template #footer>
        <div>
          <a-button @click="handleCancel">取消</a-button>
          <a-button type="primary" @click.prevent="handleSubmit">确定</a-button>
        </div>
      </template>
    </a-modal>
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
  h,
  nextTick,
  computed
} from "vue";
import {
  SearchOutlined,
  DownOutlined,
  DownloadOutlined,
  ZoomInOutlined,
  UserOutlined,
  InboxOutlined,
  DeleteOutlined,
  VerticalAlignBottomOutlined,
  CloseOutlined,
  EyeOutlined
} from "@ant-design/icons-vue";
import { message } from "ant-design-vue";
import Interface from "@/utils/Interface.js";
import dayjs from 'dayjs';
const { proxy } = getCurrentInstance();
console.log(document.documentElement.clientHeight);
const labelCol = ref({ style: { width: "100px" } });
const props = defineProps({
  isShow: Boolean,
  ids: String,
  FolderId: String
});
const formRef = ref();
const emit = defineEmits(["cancel", "ok"]);
const handleCancel = () => {
  emit("cancel", false);
};
const formState = reactive({
  stamp: ''
});
const token = localStorage.getItem("token");
const data = reactive({
  title: "批量添加水印",
  height: 150
});
const { title, height } = toRefs(data);

onMounted(() => {
  let userInfo = window.localStorage.getItem('userInfo');
  if (userInfo) {
    userInfo = JSON.parse(userInfo);
    var userId = userInfo.userId;
    var userName = userInfo.fullName;
    if (userId == 'jackliu') {
      userId = '2EC00CF2-A484-4136-8FEF-E2A2719C5ED6'
    }
  }
  if (props.FolderId == '10010000-0000-0000-0000-000000007002,ec230bb1-b9a5-42eb-83fc-4b6410038f57,61f0d939-2474-4c29-b47e-fb700d6ef4c3,c141ce85-126f-4771-9f7a-8023dec67493') {
    formState.stamp = '制度文件';
  } else if (props.FolderId == 'ec230bb1-b9a5-42eb-83fc-4b6410038f57') {
    formState.stamp = '讨论稿';
  } else if (props.FolderId == '61f0d939-2474-4c29-b47e-fb700d6ef4c3') {
    formState.stamp = '暂行稿';
  } else if (props.FolderId == 'c141ce85-126f-4771-9f7a-8023dec67493') {
    formState.stamp = '实施稿';
  }
});
const setTop = computed(() => ({
  top: `calc(50% - 150px)`
}));
const handleSubmit = () => {
  formRef.value
    .validate()
    .then(() => {
      let url = Interface.rulearticle.batchAddStamp;
      let ids=[];
      if(props.ids&&props.ids.length){
        for(var i=0;i<props.ids.length;i++){
          ids.push(props.ids[i].id);
        }
      }
      ids=ids.join(',');
      let d = {
        actions: [{
          id: "4105;a",
          descriptor: "",
          callingDescriptor: "UNKNOWN",
          params: {
            ids: ids,
            stampText: formState.stamp
          }
        }]
      };
      let obj = {
        message: JSON.stringify(d)
      }
      proxy.$post(url, obj).then(res => {
        if (res && res.actions && res.actions[0] && res.actions[0].state && res.actions[0].state == 'SUCCESS') {
          formRef.value.resetFields();
          message.success("添加成功！");
          emit("cancel", false);
          emit("ok", '');
        }
        else{
          message.error("添加失败！");
        }
      });

    })
    .catch((err) => {
      console.log("error", err);
    });
};
</script>
<style lang="less">
@import url("@/style/modal.less");

.section {
  .sectionTitle {
    height: 30px;
    background-color: rgb(243, 242, 242);
    line-height: 30px;
    border-radius: 4px;
    padding-left: 15px;
    margin-bottom: 12px;
    /* margin: 2rem 2rem 0.5rem 2rem; */
  }

  .sectionRow {
    padding: 0 10px;
    box-sizing: border-box;
    display: flex;

    .sectionItem {
      flex: 1;
      margin-right: 20px;

      .ant-row {
        display: block !important;
      }
    }

    .sectionItem:last-child {
      margin-right: 0;
    }
  }
}

:where(.css-dev-only-do-not-override-kqecok).ant-picker {
  width: 100%;
}

.ant-form-item {
  position: relative;
}

.selectIcon {
  position: absolute;
  right: 10px;
  top: 5px;
}

.uploadRow {
  display: flex;
  align-items: center;
  justify-content: center;
  align-items: center;

  p {
    margin: 0 !important;
  }
}

:where(.css-dev-only-do-not-override-kqecok).ant-upload-wrapper .ant-upload-drag p.ant-upload-drag-icon {
  margin-bottom: 0 !important;
}

:where(.css-dev-only-do-not-override-kqecok).ant-upload-wrapper .ant-upload-drag .ant-upload {
  padding: 0 !important;
}

.ant-upload-list {
  display: flex;
  flex-wrap: wrap;

  .ant-upload-list-item-container {
    width: 148px;
    height: 148px;
    margin-right: 10px;
  }
}

.uploadItem {
  overflow: hidden;
  background-color: #fff;
  border: 1px solid #c0ccda;
  border-radius: 6px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  width: 148px;
  height: 148px;
  margin: 0 8px 8px 0;
  display: inline-block;
  position: relative;
  cursor: pointer;

  img {
    width: 125px;
  }

  &:hover .uploadAction {
    opacity: 1;
  }

  .uploadAction {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    cursor: default;
    text-align: center;
    color: #fff;
    opacity: 0;
    font-size: 20px;
    background-color: rgba(0, 0, 0, .5);
    -webkit-transition: opacity .3s;
    transition: opacity .3s;
    display: flex;
    align-items: center;
    justify-content: center;

    .icons {
      display: flex;

      .icon {
        display: inline-block;
        width: 30px;
        cursor: pointer;

        &:hover {
          color: var(--textColor);
        }
      }
    }
  }
}

.sectionItem .ApprovedByName {
  border-radius: 4px !important;
}

:where(.css-dev-only-do-not-override-kqecok).ant-tree-select-dropdown .ant-select-tree .ant-select-tree-treenode {
  width: 100%;
}

:where(.css-dev-only-do-not-override-kqecok).ant-upload-wrapper .ant-upload-drag p.ant-upload-text {
  font-size: 14px;
}

.section .sectionTitle2 {
  margin-top: 10px;
  margin-bottom: 20px;
}

.uploadPanel {
  .inboxFileList {
    display: flex;
    flex-wrap: wrap;
    margin-top: 20px;

    .ant-btn.ant-btn-text,
    .ant-btn.ant-btn-text:hover {
      color: #000 !important;
    }

    .inboxFileItem {
      width: 266px;
      border-radius: 2px;
      background: #f2f3f5;
      padding: 10px;
      box-sizing: border-box;
      margin-right: 16px;
      margin-bottom: 16px;
      cursor: pointer;
      display: flex;
      overflow: hidden;
      position: relative;

      .leftImg {
        width: 32px;
        height: 32px;
        position: relative;
        top: 5px;

        img {
          width: 100%;
          height: 100%;
        }
      }

      .rightFileInfo {
        flex: 1;
        margin-left: 14px;
        overflow: hidden;
        color: #1d2129;

        .fileSize {
          color: #4e5969;
          padding-top: 4px;
        }

        .fileOptionShow {
          position: absolute;
          width: calc(~"100% - 36px");
          height: 100%;
          left: 42px;
          top: 0;
          background: rgba(242, 243, 245, .8);
          display: none;

          .btns {
            display: flex;
            align-items: center;
            height: 100%;
            justify-content: flex-end;
            padding-right: 20px;
            box-sizing: border-box;
          }
        }
      }

      &:hover .fileOptionShow {
        display: block;
      }
    }
  }
}
</style>