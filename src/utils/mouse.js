import { ref, computed, watch, watchEffect, reactive } from "vue";
export function useShop() {
  const obj = reactive({ name: "你好" });
  const price = ref(10);
  const num = ref(1);
  const priceTotal = computed(() => {
    return price.value * num.value;
  });
  function add5() {
    num.value = 20;
  }
  watch(
    [num, priceTotal],
    (newVal, oldVal) => {
      console.log(newVal, oldVal);
    },
    { deep: true, immediate: true }
  );

  watchEffect((onInvalidate) => {
    console.log("12313", obj.name);
  });
  return { price, num, priceTotal, add5, obj };
}
