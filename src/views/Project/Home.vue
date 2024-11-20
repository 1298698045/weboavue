<template>
  <div class="ProjectHomeWrap">
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
} from "vue";
import { EditOutlined, UnorderedListOutlined,DeleteOutlined,DownOutlined,PlusOutlined } from "@ant-design/icons-vue";
import { useRouter, useRoute } from "vue-router";
const route = useRoute();
import GroupSpace from "@/components/groupDetail/GroupSpace.vue";
import DetailInfo from "@/components/detail/DetailInfo.vue";
import Personnel from "@/components/groupDetail/Personnel.vue";
import Statistics from "@/components/groupDetail/Statistics.vue";

import Interface from "@/utils/Interface.js";
const { proxy } = getCurrentInstance();
import { girdFormatterValue } from "@/utils/common.js";
import { message } from "ant-design-vue";
import { useStore } from "vuex";
let store = useStore();
store.commit("setGroupId", route.query.GroupId);
const PersonnelLst = ref();
const data = reactive({
  height:100
});
const {
  height
} = toRefs(data);

onMounted(() => {
  let h = document.documentElement.clientHeight;
  data.height=h-302;
  window.addEventListener("resize", (e) => {
    let h = document.documentElement.clientHeight;
    data.height=h-302;
  });
})

</script>
<style lang="less" scoped>
// @import "@/style/detail.less";
// @import url("@/style/common.less");

</style>
