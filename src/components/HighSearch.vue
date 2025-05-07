<template>
  <div class="HighSearchWrap">
    <div class="opera-btn">
      <a-input-group compact>
        <a-input v-model:value="search" @change="loadGrid" allowClear />
        <!-- <a-tooltip placement="topLeft" title="高级搜索">
                    <a-button class="ant-btn-icon" :class="{ active: isSearchModal }" @click="handleShowSearch">
                        高级搜索
                    </a-button>
                </a-tooltip> -->
        <a-button
          class="ant-btn-icon"
          :class="{ active: isSearchModal }"
          @click="handleShowSearch"
        >
          高级搜索
        </a-button>
      </a-input-group>
    </div>
    <div class="listRightModal searchModalWrap" v-if="isSearchModal">
      <SearchQuery
        :sObjectName="props.entityApiName"
        filterId=""
        @cancel="isSearchModal = false"
        @load="loadSearchQuery"
      >
      </SearchQuery>
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
  defineExpose,
  nextTick,
  defineProps,
  watch,
} from "vue";
import {
  SearchOutlined,
  DownOutlined,
  UserOutlined,
} from "@ant-design/icons-vue";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import locale from "ant-design-vue/es/date-picker/locale/zh_CN";
dayjs.locale("zh-cn");
import moment from "moment";
import RadioDept from "@/components/commonModal/RadioDept.vue";
import RadioUser from "@/components/commonModal/RadioUser.vue";
import LookupFilter from "@/components/commonModal/LookupFilter.vue";
import Interface from "@/utils/Interface.js";
import SearchQuery from "@/components/listView/SearchQuery.vue";
const { proxy } = getCurrentInstance();
const formRef = ref();
const formState = reactive({});
const props = defineProps({
  entityApiName: {
    type: String,
    default: "HREmployee",
  },
});
const data = reactive({
  search: "",
  isSearchModal: false,
  filterCondition: "",
});

const { isSearchModal, search, filterCondition } = toRefs(data);
const formSearchRef = ref();
const emit = defineEmits(["update-height", "search"]);
const handleShowSearch = () => {
  data.isSearchModal = true;
};
const loadSearchQuery = (e) => {
  data.isSearchModal = false;
  data.filterCondition = e ? JSON.stringify(e) : "";
  let obj = {
    search: data.search,
    filterCondition: data.filterCondition,
  };
  emit("search", obj);
};
const loadGrid = () => {
  let obj = {
    search: data.search,
    filterCondition: data.filterCondition,
  };
  emit("search", obj);
};
const getSearchLayout = () => {
  emit("update-height", 50);
};
// 重置
const resetForm = () => {
  emit("search", "");
};
onMounted(() => {
  nextTick(() => {
    emit("update-height", 50);
  });
});
defineExpose({ resetForm, getSearchLayout });
</script>
<style lang="less" scoped>
.HighSearchWrap {
  :deep .ant-row {
    .ant-input {
      max-width: 100% !important;
      width: 100% !important;
    }

    .ant-select {
      max-width: 100% !important;
      width: 100% !important;
      flex: 1;
    }

    .time-box {
      display: flex;
      .date {
        margin-top: 0px !important;
        margin-left: 10px !important;
      }
    }
  }

  :deep .ant-btn.ant-btn-icon {
    color: rgba(0, 0, 0, 0.88);
  }
}
</style>
<style lang="less">
.HighSearchWrap {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 16px;
  //border-bottom: 1px solid #dedede !important;
  margin-bottom: -1px;
  height: 46px;
  flex-direction: row-reverse;

  .opera-btn {
    width: 280px;

    .ant-input-group-compact {
      display: flex;
    }

    .ant-input-affix-wrapper {
      border-radius: 0;
    }

    .ant-input-suffix .anticon-close-circle {
      right: 0px !important;
      position: relative !important;
    }
  }

  .listRightModal {
    position: absolute;
    top: 0;
    right: 0;
    width: 500px;
    height: 100%;
    background: #fff;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.4);
    border: 1px solid #dddddd;
    border-left: none;
    z-index: 1;
  }
}
</style>
