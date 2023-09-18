<template>
  <div>
    {{ count }}
    <input type="number" v-model="num" />{{ price }} 总价格：{{ priceTotal }}
    {{ obj.name }}
    <button @click="add5">按钮</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

import { useShop } from "@/utils/mouse";

const count = ref(0);

// function increment(){
//   count.value++
// }

const { price, num, priceTotal, add5, obj } = useShop();

onMounted(() => {
  console.log(`The initial count is ${count.value}.`);
});
</script>
