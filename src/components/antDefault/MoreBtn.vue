<template>
    <div class="moreMenuBox" :class="{'active':isMenu}" @click.stop="handleMenu">
        <div class="moreBtn">
          <i class="iconfont icon-mulugengduo"></i>
        </div>
        <slot></slot>
      </div>
</template>
<script setup>
    import { ref, watch, reactive, toRefs, onMounted, getCurrentInstance, onUpdated, defineProps, defineEmits } from "vue";
    const props = defineProps({
        isMenu: Boolean
    })
    const data = reactive({
        isShow: false
    });
    const emit = defineEmits(['change']);
    const handleMenu = () => {
      data.isShow = !data.isShow;
      emit('change', data.isShow);
    };
    onMounted(()=>{
      window.addEventListener('click',()=>{
        data.isShow = false;
        emit('change', false);
      })
    })
</script>