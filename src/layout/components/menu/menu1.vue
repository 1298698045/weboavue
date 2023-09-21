<template>
  <div class="menu-container">
    <div
      class="menu-item"
      v-for="(item, index) in items"
      :key="index"
      @click="handleMenuRoute(item)"
    >
      <span class="icon"></span>
      <span class="name">{{ item.name }}</span>
    </div>
  </div>
</template>
<script setup>
import { ref, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
const router = useRouter();
const items = [
  {
    path: "/about",
    name: "关于我们",
    icon: "",
  },
];
const handleMenuRoute = (item) => {
  router.push({
    path: item.path,
  });
};
</script>
