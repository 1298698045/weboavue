<template>
  <div class="page">
    <ListPage pageTitle="仪表板" :objectTypeCode="objectTypeCode" :entityType="entityType" />
  </div>
</template>
<script setup>
  import ListPage from "@/components/ListPage.vue";
  import {
    ref,
    watch,
    reactive,
    toRefs,
    onMounted,
    getCurrentInstance,
    onUpdated,
    h,
  } from "vue";
  const data = reactive({
    objectTypeCode: 9170,
    entityType: "0D0"
  });
  const { objectTypeCode, entityType } = toRefs(data);
</script>
<style scoped>
  .page{
    height: 100%;
  }
</style>