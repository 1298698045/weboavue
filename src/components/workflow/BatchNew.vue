<template>
  <div>
    <a-modal
      v-model:open="props.isShow"
      width="900px"
      :style="setTop"
      :maskClosable="false"
      @cancel="handleCancel"
      @ok="handleSubmit"
    >
      <template #title>
        <div>批量发起事务</div>
      </template>
      <div class="modalContainer">
        <div class="modalCenter" style="height: 580px !important">
          <a-form ref="formRef" class="CreateProcess" :model="formState">
            <div class="form-tip">请输入流程事务标题，建立事务</div>
            <a-form-item label="流程：" name="ProcessName">
              <div class="ProcessName">{{ formState.ProcessName || "" }}</div>
            </a-form-item>
            <a-form-item
              class="processUser"
              label="发起用户："
              name="UserList"
              :rules="[{ required: true, message: '请选择发起用户' }]"
            >
              <div class="selectBox">
                <a-transfer
                  v-model:target-keys="formState.UserList"
                  v-model:selected-keys="selectedKeys"
                  :data-source="listData3"
                  :list-style="{
                    width: '340px',
                    height: '300px',
                  }"
                  :locale="{
                    itemUnit: '',
                    itemsUnit: '',
                    notFoundContent: '列表为空',
                    searchPlaceholder: '请输入搜索内容',
                  }"
                  show-search
                  :titles="['可选用户', '已选用户']"
                  :render="(item) => item.title"
                  :disabled="disabled"
                  @change="handleChange"
                  @selectChange="handleSelectChange"
                  @scroll="handleScroll"
                />
                <div class="sortBox">
                  <a-button
                    size="small"
                    @click="selectedKeys.length && handleMoveUp()"
                    :type="selectedKeys.length > 0 ? 'primary' : 'default'"
                    ><UpOutlined
                  /></a-button>
                  <a-button
                    size="small"
                    @click="selectedKeys.length && handleMoveDown()"
                    :type="selectedKeys.length > 0 ? 'primary' : 'default'"
                    ><DownOutlined
                  /></a-button>
                </div>
              </div>
              <!-- <a-select
                mode="multiple"
                allowClear
                v-model:value="formState.UserList"
                :default-active-first-option="false"
                :filter-option="false"
                showSearch
                @search="
                  (e) => {
                    searchlookup(e, '8', 'OwningUser');
                  }
                "
                @dropdownVisibleChange="
                  (e) => {
                    searchlookup('', '8', 'OwningUser');
                  }
                "
                :placeholder="'请选择用户'"
              >
                <template #suffixIcon></template>
                <a-select-option
                  v-for="(option, optionIdx) in OwningUserList"
                  :key="optionIdx"
                  :value="option.ID"
                  >{{ option.Name }}</a-select-option
                >
              </a-select>
              <div class="selectIcon">
                <SearchOutlined
                  class="ant-select-suffix"
                  @click="handleOpenLook('8', 'UserList')"
                />
              </div> -->
            </a-form-item>
            <!-- <a-form-item
              name="BusinessUnitId"
              label="创建身份："
              :rules="[{ required: true, message: '请选择发起部门' }]"
            >
              <a-select v-model:value="formState.BusinessUnitId">
                <a-select-option
                  v-for="(item, index) in BusinessUnitList"
                  :key="index"
                  :value="item.BusinessUnitId"
                  >{{ item.organizationIdName }}/{{
                    item.businessUnitIdName
                  }}</a-select-option
                >
              </a-select>
            </a-form-item> -->
            <a-form-item name="Priority" label="紧急程度：">
              <a-select v-model:value="formState.Priority">
                <a-select-option value="0">普通</a-select-option>
                <a-select-option value="1">紧急</a-select-option>
                <a-select-option value="2">加急</a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item label="备注：" name="Description">
              <a-textarea :rows="3" v-model:value="formState.Description" />
            </a-form-item>
          </a-form>
        </div>
      </div>
      <template #footer>
        <div>
          <a-button type="primary" @click.prevent="handleSubmit">确定</a-button>
          <a-button @click="handleCancel">取消</a-button>
        </div>
      </template>
    </a-modal>
    <MultipleUsers
      v-if="isMultipleUser"
      :isShow="isMultipleUser"
      @cancel="isMultipleUser = false"
      @select="handleSelectUsers"
    />
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
  computed,
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
  EyeOutlined,
  UpOutlined,
} from "@ant-design/icons-vue";
import { message } from "ant-design-vue";
import MultipleUsers from "@/components/commonModal/MultipleUsers.vue";
import Interface from "@/utils/Interface.js";
import dayjs from "dayjs";
import { useRouter, useRoute } from "vue-router";
import { girdFormatterValue } from "@/utils/common.js";
const route = useRoute();
const router = useRouter();
const { proxy } = getCurrentInstance();
const props = defineProps({
  isShow: Boolean,
  name: String,
  row: Object,
});
const formRef = ref();
const emit = defineEmits(["cancel", "ok"]);
const handleCancel = () => {
  emit("cancel", false);
};
const formState = reactive({
  ProcessName: "",
  BusinessUnitId: "",
  Priority: "0",
  Description: "",
  UserList: [],
});
const token = localStorage.getItem("token");
const disabled = ref(false);
const data = reactive({
  height: 150,
  row: {},
  userId: "",
  BusinessUnitList: [],
  OwningUserList: [],
  isMultipleUser: false,
  listData3: [],
  targetKeys: [],
  selectedKeys: [],
});
const {
  targetKeys,
  selectedKeys,
  height,
  row,
  userId,
  BusinessUnitList,
  OwningUserList,
  isMultipleUser,
  listData3,
} = toRefs(data);
const handleChange = (nextTargetKeys, direction, moveKeys) => {
  // console.log("targetKeys: ", nextTargetKeys);
  // console.log("direction: ", direction);
  // console.log("moveKeys: ", moveKeys);
};
const handleSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
  //console.log("sourceSelectedKeys: ", sourceSelectedKeys);
  //console.log("targetSelectedKeys: ", targetSelectedKeys);
};
const handleScroll = (direction, e) => {
  //console.log("direction:", direction);
  //console.log("target:", e.target);
};

const handleMoveUp = () => {
  let firstSelectedIndex = formState.UserList.findIndex(
    (item) => item == data.selectedKeys[0]
  );
  if (firstSelectedIndex > 0) {
    const itemsToMove = data.selectedKeys.slice();
    console.log("itemsToMove", itemsToMove);
    for (const item of itemsToMove) {
      const currentIndex = formState.UserList.indexOf(item);
      formState.UserList.splice(currentIndex, 1);
      formState.UserList.splice(currentIndex - 1, 0, item);
    }
  }
};
const handleMoveDown = () => {
  const lastSelectedIndex = formState.UserList.indexOf(
    data.selectedKeys[data.selectedKeys.length - 1]
  );
  if (lastSelectedIndex < formState.UserList.length - 1) {
    const itemsToMove = data.selectedKeys.slice().reverse();
    for (const item of itemsToMove) {
      const currentIndex = formState.UserList.indexOf(item);
      formState.UserList.splice(currentIndex, 1);
      formState.UserList.splice(currentIndex + 1, 0, item);
    }
  }
};

const handleSubmit = () => {
  formRef.value
    .validate()
    .then(() => {
      let startUsers = [];
      // for (var i = 0; i < formState.UserList.length; i++) {
      //   for (var j = 0; j < data.OwningUserList.length; j++) {
      //     if (formState.UserList[i] === data.OwningUserList[j].ID) {
      //       startUsers.push({
      //         userId: data.OwningUserList[j].ID,
      //         name: data.OwningUserList[j].Name,
      //         //businessUnitId: formState.BusinessUnitId,
      //       });
      //     }
      //   }
      // }
      if (formState.UserList && formState.UserList.length) {
        for (var i = 0; i < formState.UserList.length; i++) {
          let item = formState.UserList[i];
          for (var j = 0; j < data.listData3.length; j++) {
            if (item == data.listData3[j].id) {
              startUsers.push({
                userId: data.listData3[j].id,
                name: data.listData3[j].name,
              });
            }
          }
        }
      }
      let obj = {
        actions: [
          {
            id: "4270;a",
            descriptor: "",
            callingDescriptor: "UNKNOWN",
            params: {
              processId: data.rowRecord.processId,
              priority: formState.Priority,
              startUsers: startUsers,
              description: formState.Description,
            },
          },
        ],
      };
      let d = {
        message: JSON.stringify(obj),
      };
      proxy.$post(Interface.workflow.batchNew, d).then((res) => {
        if (
          res &&
          res.actions &&
          res.actions[0] &&
          res.actions[0].state == "SUCCESS"
        ) {
          message.success("发起流程成功");
          let url = router.resolve({
            name: "FlowDetail",
            query: {
              id: res.actions[0].returnValue.id,
              reurl: "/lightning/o/workflow/doing",
            },
          });
          window.open(url.href);
          handleCancel();
        } else {
          if (
            res &&
            res.actions &&
            res.actions[0] &&
            res.actions[0].errorMessage
          ) {
            message.success(res.actions[0].errorMessage);
          } else {
            message.error("发起流程失败");
          }
        }
      });
    })
    .catch((err) => {
      console.log("error", err);
    });
};
const setTop = computed(() => ({
  top: `calc(50% - 360px)`,
}));
const getDeptList = () => {
  const now = new Date();
  const nowtime =
    now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate();
  let userInfo = window.localStorage.getItem("userInfo");
  if (userInfo) {
    userInfo = JSON.parse(userInfo);
    formState.BusinessUnitId = userInfo.businessUnitId;
    data.userId = userInfo.userId;
  }
  proxy.$post(Interface.user.getBusinessUnits, {}).then((res) => {
    if (
      res &&
      res.actions &&
      res.actions[0] &&
      res.actions[0].returnValue &&
      res.actions[0].returnValue.length
    ) {
      data.BusinessUnitList = res.actions[0].returnValue;
    }
  });
};
const uniqu = (array, name) => {
  var arr = [];
  for (var j = 0; j < array.length; j++) {
    if (JSON.stringify(arr).indexOf(array[j][name]) == -1) {
      arr.push(array[j]);
    }
  }
  return arr;
};
const searchlookup = (search, Lktp, fieldApiName) => {
  let obj = {
    actions: [
      {
        id: "6129;a",
        descriptor: "",
        callingDescriptor: "UNKNOWN",
        params: {
          objectApiName: "WFProcessInstance",
          fieldApiName: fieldApiName,
          pageParam: 1,
          pageSize: 25,
          q: search,
          searchType: "Recent",
          targetApiName: "SystemUser",
          body: {
            sourceRecord: {
              apiName: "ActivityPointer",
              fields: {
                Id: null,
                RecordTypeId: "",
              },
            },
          },
        },
      },
    ],
  };
  if (Lktp == "8") {
    obj.actions[0].params.targetApiName = "SystemUser";
  }
  let d = {
    message: JSON.stringify(obj),
  };
  proxy.$post(Interface.lookup, d).then((res) => {
    let list = res.actions[0].returnValue.lookupResults.records;
    let arr = [];
    list.forEach((item) => {
      arr.push({
        ID: item.fields.Id.value,
        Name: item.fields.Name.value,
      });
    });
    data[fieldApiName + "List"] = data[fieldApiName + "List"].concat(arr);
    data[fieldApiName + "List"] = uniqu(data[fieldApiName + "List"], "ID");
    //console.log(data[fieldApiName+'List'])
  });
};
const handleOpenLook = (sObjectType, fieldApiName) => {
  if (sObjectType * 1 == 8) {
    data.isMultipleUser = true;
  }
};
//多选用户
const handleSelectUsers = (params) => {
  // console.log(params);
  params.forEach((item) => {
    if (JSON.stringify(formState.UserList).indexOf(item.id) == -1) {
      formState.UserList.push(item.id);
      data.OwningUserList.push({
        ID: item.id,
        Name: item.name,
      });
      data.OwningUserList = uniqu(data.OwningUserList, "ID");
    }
  });
  data.isMultipleUser = false;
};
const getPeople = () => {
  data.listData3 = [];
  let filterQuery = "";
  proxy
    .$post(Interface.list2, {
      filterId: "",
      objectTypeCode: "8",
      entityName: "SystemUser",
      search: "",
      page: 1,
      rows: 500,
      displayColumns:
        "FullName,UserName,EmployeeId,BusinessUnitId,OrganizationId",
    })
    .then((res) => {
      if (res && res.nodes && res.nodes.length) {
        var list = [];
        for (var i = 0; i < res.nodes.length; i++) {
          var item = res.nodes[i];
          for (var cell in item) {
            if (cell != "id" && cell != "viewUrl") {
              item[cell] = girdFormatterValue(cell, item);
            }
          }
          list.push({
            id: item.id,
            key: item.id,
            name: item.FullName,
            title:
              item.FullName +
              (item.UserName ? "/" + item.UserName : "") +
              (item.EmployeeId ? "/" + item.EmployeeId : "") +
              (item.BusinessUnitId ? "/" + item.BusinessUnitId : "") +
              (item.OrganizationId ? "/" + item.OrganizationId : ""),
          });
        }
        data.listData3 = list;
      }
    });
};
onMounted(() => {
  formState.ProcessName = props.name;
  data.rowRecord = props.row;
  getPeople();
});
</script>
<style lang="less">
@import url("@/style/modal.less");
.CreateProcess {
  .ant-form-item .ant-row {
    display: flex !important;
  }
  .ant-form-item-label {
    width: 100px;
  }
  .ant-form-item {
    margin-bottom: 20px !important;
  }
  .ant-form-item {
    position: relative;
  }
  .selectIcon {
    position: absolute;
    right: 10px;
    top: 5px;
  }
  .ant-picker {
    width: 100%;
  }
  .processTitle .ant-row .ant-col .ant-form-item-required {
    color: rgba(0, 0, 0, 0.88) !important;
  }

  .processTitle .ant-row .form-tip1 {
    color: rgba(0, 0, 0, 0.88) !important;
  }

  .ProcessName {
    color: rgba(0, 0, 0, 0.88) !important;
  }

  .form-tip {
    font-size: 12px;
    margin-bottom: 12px;
    color: #606266;
  }
  .sortBox {
    display: flex;
    flex-direction: column;
    margin-left: 10px;
    gap: 5px;
  }
}
</style>
