<template>
  <Editor v-model="content" :init="init" />
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
const emit = defineEmits(["input"]);


const props = defineProps({
  value: {
    type: String,
    default: "",
  },
  baseUrl: {
    type: String,
    default: "",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  placeholder: {
    type: String,
    default: false,
  },
  height: {
    type: Number,
    default: 300
  }
  // plugins: {
  //     type: [String, Array],
  //     default: "lists  table",
  // },//必填
  // toolbar: {
  //     type: [String, Array],
  //     default:
  //     "codesample bold italic underline alignleft aligncenter alignright alignjustify | undo redo | formatselect | fontselect | fontsizeselect | forecolor backcolor | bullist numlist outdent indent | lists link table code | removeformat ",
  // },//必填
});

import Editor from "@tinymce/tinymce-vue";
//引入tinymce开启本地模式
import "tinymce/tinymce";
//引入图标和主题等
import "tinymce/themes/silver/theme";
import "tinymce/icons/default/icons";
import "tinymce/models/dom";
//引入插件
import "tinymce/plugins/codesample";
import "tinymce/plugins/lists";
import "tinymce/plugins/advlist";
import "tinymce/plugins/link";
import "tinymce/plugins/autolink";
import "tinymce/plugins/charmap";
import "tinymce/plugins/emoticons";
import "tinymce/plugins/fullscreen";
import "tinymce/plugins/preview";
import "tinymce/plugins/code";
import "tinymce/plugins/searchreplace";
import "tinymce/plugins/table";
import "tinymce/plugins/visualblocks";
import "tinymce/plugins/wordcount";
import "tinymce/plugins/insertdatetime";
import "tinymce/plugins/image";

let init = reactive({
  // 选择器
  selector: "textarea",
  // 设置本地主题
  skin_url: "/tinymce/skins/ui/oxide",
  // 设置本地css
  content_css: "/tinymce/skins/content/default/content.css",
  // 设置本地语言
  language_url: "/tinymce/langs/zh_CN.js",
  // 设置本地语言
  language: "zh_CN",
  // 设置工具栏
  toolbar: [
    "bold italic hr | fontsize forecolor backcolor | blocks blockquote removeformat | undo redo ",
    "bullist table insertdatetime | link charmap wordcount searchreplace code | codesample visualblocks image fullscreen preview",
  ],
  // 设置插件
  plugins:
    "codesample lists advlist link autolink charmap fullscreen preview code searchreplace table visualblocks wordcount insertdatetime image",
  placeholder: props.placeholder,
  statusbar: false,
  promotion: false,
  height: props.height
});
let content = ref("");
watch(
  content,
  (newVal) => {
    emit("input", newVal);
  },
  { deep: true, immediate: true }
);
defineExpose({init})
</script>
