<template>
  <div>
    <a-modal
      v-model:open="props.isShow"
      width="550px"
      :style="{ top: top + 'px' }"
      :maskClosable="false"
      @cancel="handleCancel"
      @ok="handleSubmit"
    >
      <template #title>
        <div>
          {{ ModalTitle }}
        </div>
      </template>
      <div class="modalContainer NewInfoWrap">
        <div class="modalCenter">
          <a-form ref="formRef" :model="formState" :label-col="labelCol">
            <a-form-item
              label="标题"
              name="name"
              :rules="[{ required: true, message: '请输入标题!' }]"
            >
              <a-input
                v-model:value="formState.name"
                placeholder="请输入标题"
              />
            </a-form-item>
            <a-form-item
              label="目录"
              name="column"
              :rules="[{ required: true, message: '请选择目录!' }]"
            >
              <a-tree-select
                v-if="props.objectTypeCode != '20021'"
                v-model:value="formState.column"
                show-search
                style="width: 100%"
                :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
                placeholder="请选择目录"
                allow-clear
                tree-default-expand-all
                :tree-data="treeData"
                tree-node-filter-prop="name"
                :disabled="
                  formState.column == '00000000-0000-0000-0000-000000002000' ||
                  props.objectTypeCode == '100311' ||
                  props.objectTypeCode == '100201'
                "
              >
                <template #title="{ name }">
                  <span>{{ name }}</span>
                </template>
              </a-tree-select>
              <a-tree
                v-if="props.objectTypeCode == '20021'"
                :expanded-keys="expandedKeys"
                :auto-expand-parent="autoExpandParent"
                :tree-data="treeData"
                block-node
                :fieldNames="fieldNames"
                :selectedKeys="selectedKeys"
                @select="onSelect"
                @expand="onExpand"
              >
                <template #switcherIcon="{ switcherCls }">
                  <CaretDownOutlined
                    :class="switcherCls"
                    style="color: rgb(163, 163, 163); font-size: 14px"
                  ></CaretDownOutlined>
                </template>
                <template #title="{ name }">
                  <span>{{ name }}</span>
                </template>
              </a-tree>
            </a-form-item>
            <a-form-item
              name="TemplateId"
              label="模板"
              :rules="[{ required: true, message: '请选择模板' }]"
            >
              <a-select
                v-model:value="formState.TemplateId"
                placeholder="请选择模板"
                filterable
              >
                <a-select-option
                  v-for="(item, index) in TemplateList"
                  :value="item.value"
                  :key="index"
                  >{{ item.label }}</a-select-option
                >
              </a-select>
            </a-form-item>
          </a-form>
        </div>
      </div>
      <template #footer>
        <div>
          <a-button @click="handleCancel">取消</a-button>
          <a-button type="primary" @click.prevent="handleSubmit">保存</a-button>
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
} from "vue";
import {
  SearchOutlined,
  DownOutlined,
  UserOutlined,
  CaretDownOutlined,
} from "@ant-design/icons-vue";
import Interface from "@/utils/Interface.js";
const { proxy } = getCurrentInstance();
import { useRouter, useRoute } from "vue-router";
import { girdFormatterValue } from "@/utils/common.js";
const router = useRouter();
const formRef = ref();
const labelCol = ref({ style: { width: "60px" } });
const props = defineProps({
  isShow: Boolean,
  treeData: Array,
  objectTypeCode: String,
  RegardingObjectId: String,
  RegardingObjectTypeCode: String,
  FolderId: String,
  RegardingObjectName: String,
  name: String,
});
import { message } from "ant-design-vue";

const emit = defineEmits(["cancel"]);
const handleCancel = () => {
  emit("cancel", false);
};
const data = reactive({
  listData: [],
  menus: [
    {
      key: 1,
      name: "角色",
    },
    {
      key: 2,
      name: "小组",
    },
    {
      key: 3,
      name: "部门",
    },
    {
      key: 4,
      name: "用户",
    },
  ],
  currentMenu: "角色",
  ModalTitle: "新建信息",
  sObjectName: "Content",
  userId: "",
  userName: "",
  fieldNames: {
    children: "children",
    title: "name",
    key: "id",
  },
  selectedKeys: [],
  TemplateList: [],
  businessUnitId: "",
  top: (document.documentElement.clientHeight - 440) / 2,
});
const {
  businessUnitId,
  TemplateList,
  fieldName,
  selectedKeys,
  listData,
  menus,
  currentMenu,
  ModalTitle,
  sObjectName,
  userId,
  userName,
  top,
} = toRefs(data);
const formState = reactive({
  name: "",
  column: "",
  TemplateId: "",
});
const handleMenu = (e) => {
  console.log("e", e);
  data.currentMenu = data.menus.find((item) => item.key == e.key).name;
};
const handleSearch = (val) => {
  console.log("val", val);
};
const handleChange = (e) => {};
const expandedKeys = ref([]);
const autoExpandParent = ref(true);
const onExpand = (keys) => {
  expandedKeys.value = keys;
  autoExpandParent.value = false;
};
const onSelect = (keys, { node }) => {
  if (keys && keys.length) {
    data.selectedKeys = [node.id];
    formState.column = node.id;
  }
};
const getTemplateList = () => {
  let d = {
    filterId: "",
    objectTypeCode: 5081,
    entityName: "ContentViewTemplate",
    filterQuery: "",
    page: 1,
    rows: 100,
    displayColumns: "Name",
  };
  proxy.$get(Interface.list2, d).then((res) => {
    var list = [];
    if (res && res.nodes) {
      for (var i = 0; i < res.nodes.length; i++) {
        var item = res.nodes[i];
        for (var cell in item) {
          if (cell != "id" && cell != "nameField") {
            item[cell] = girdFormatterValue(cell, item);
          }
        }
        item.label = item.Name || "";
        item.value = item.id;
        list.push(item);
      }
      formState.TemplateId=list[0].value;
    }
    data.TemplateList = list;
  });
};
const handleSubmit = () => {
  formRef.value
    .validate()
    .then(() => {
      console.log("values", formState, toRaw(formState));
      let url = Interface.create;
      let d = {
        actions: [
          {
            id: "2919;a",
            descriptor: "",
            callingDescriptor: "UNKNOWN",
            params: {
              recordInput: {
                allowSaveOnDuplicate: false,
                apiName: data.sObjectName,
                objTypeCode: props.objectTypeCode,
                fields: {
                  ContentTypeCode: 1,
                  Title: formState.name,
                  FolderId: formState.column,
                  CreatedBy: data.userId,
                  OwningUser: data.userId,
                  TemplateId: formState.TemplateId || null,
                  BusinessUnitId: data.businessUnitId,
                },
              },
            },
          },
        ],
      };
      if (props.id) {
        d.actions[0].params.recordId = props.id;
        url = Interface.edit;
      }
      if (props.RegardingObjectId) {
        d.actions[0].params.recordInput.fields.RegardingObjectId =
          props.RegardingObjectId;
        d.actions[0].params.recordInput.fields.RegardingObjectTypeCode =
          props.RegardingObjectTypeCode;
      }
      if (props.objectTypeCode == "100311") {
        d.actions[0].params.recordInput.fields = {
          SubjectId: formState.column,
          Name: formState.name,
          CreatedBy: data.userId,
        };
      }
      let obj = {
        message: JSON.stringify(d),
      };
      var formState1 = formState;
      proxy.$post(url, obj).then((res) => {
        formRef.value.resetFields();
        message.success("保存成功！");
        emit("cancel", false);
        if (
          res &&
          res.actions &&
          res.actions[0] &&
          res.actions[0].returnValue
        ) {
          let reUrl = router.resolve({
            name: "visualEditor",
            query: {
              id: res.actions[0].returnValue.id,
              objectTypeCode: props.objectTypeCode,
              //FolderId: res.actions[0].returnValue&&res.actions[0].returnValue.fields&&res.actions[0].returnValue.fields.FolderId?res.actions[0].returnValue.fields.FolderId:''
              FolderId: formState1.column,
              RegardingObjectId: props.RegardingObjectId || "",
              RegardingObjectTypeCode: props.RegardingObjectTypeCode || "",
            },
          });
          if (props.objectTypeCode == "100311") {
            reUrl = router.resolve({
              name: "visualEditor",
              query: {
                id: res.actions[0].returnValue.ContentId,
                objectTypeCode: "100201",
                FolderId: formState1.column,
                RegardingObjectId: props.RegardingObjectId || "",
                RegardingObjectTypeCode: props.RegardingObjectTypeCode || "",
              },
            });
          }
          window.open(reUrl.href);
        }
      });
    })
    .catch((error) => {
      console.log("error", error);
    });
};

onMounted(() => {
  getTemplateList();
  if (props.RegardingObjectTypeCode == "5000") {
    data.ModalTitle = "新建会议纪要";
    formState.column = props.FolderId;
    formState.name = props.RegardingObjectName;
    data.sObjectName = "Content";
  } else if (props.objectTypeCode == "100311") {
    data.ModalTitle = "新建知识文章";
    formState.column = props.FolderId;
    data.sObjectName = "KbSubjectContent";
  } else if (props.objectTypeCode == "100201") {
    data.ModalTitle = "新建文档";
    formState.column = props.FolderId;
    data.sObjectName = "Content";
  } else if (props.objectTypeCode == "100202") {
    data.ModalTitle = "新建通知";
    formState.column = props.FolderId;
    data.sObjectName = "Notice";
  } else if (props.objectTypeCode == "20021") {
    data.ModalTitle = "保存到文档";
    data.sObjectName = "Content";
    if (props.FolderId) {
      formState.column = props.FolderId;
      data.selectedKeys = [props.FolderId];
    }
    if (props.name) {
      formState.name = props.name;
    }
  }
  let userInfo = window.localStorage.getItem("userInfo");
  if (userInfo) {
    userInfo = JSON.parse(userInfo);
    data.userId = userInfo.userId;
    data.userName = userInfo.fullName;
    data.businessUnitId = userInfo.businessUnitId;
    if (data.userId == "jackliu") {
      data.userId = "2EC00CF2-A484-4136-8FEF-E2A2719C5ED6";
    }
  }
  window.addEventListener("resize", (e) => {
    data.top = (document.documentElement.clientHeight - 440) / 2;
  });
});
</script>
<style lang="less" scoped>
@import url("@/style/modal.less");

.ant-radio-wrapper {
  display: flex;
  align-items: center;
  margin-top: 10px;
}

.NewInfoWrap {
  :deep .ant-form-item-label {
    text-align: left;
  }

  .modalCenter {
    padding: 10px 45px !important;
  }

  .ant-form-item {
    margin-bottom: 30px !important;
    margin-top: 10px !important;
  }

  .ant-tree-switcher {
    .ant-tree-switcher-icon {
      position: relative;
      top: 2px;
    }
  }
}

//解决aria-hidden属性报错
input[aria-hidden="true"] {
  display: none !important;
}
</style>
