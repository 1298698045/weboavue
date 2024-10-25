<template>
  <Editor key="index" v-model="content" :init="init" ref="editorRef" />
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
const height = ref(props.height);
const editorRef = ref();
const index = ref(1);
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
  },
  mode: {
    type: [String],
    default: ""
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
import tinymce from "tinymce/tinymce";

const initializeEditor = () => {
  return reactive({
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
    // toolbar: props.mode == 'simple' ? false : [
    //   "bold italic hr | fontsize forecolor backcolor | blocks blockquote removeformat | undo redo ",
    //   "bullist table insertdatetime | link charmap wordcount searchreplace code | codesample visualblocks image fullscreen preview",
    // ],
    toolbar: props.mode == 'simple' ? false :'blocks | bold italic forecolor backcolor bullist numlist | undo redo | link image table fontsize',
    menubar: props.mode == 'simple' ? 'edit custom' : '',
    // 设置插件
    plugins:"codesample lists advlist link autolink charmap fullscreen preview code searchreplace table visualblocks wordcount insertdatetime image",
    placeholder: props.placeholder,
    statusbar: false,
    promotion: false,
    height: height.value,
    //emoticons_database_url: '/tinymce/plugins/emoticons/js/emojis.js',
    images_upload_url: 'https://wx.phxinfo.com.cn/rest',
    paste_data_images:true,
    images_upload_handler:function(blobInfo,success,failure){
      // let reader = new FileReader()
      // reader.readAsDataURL(blobInfo.blob())
      // reader.onload=function(){
      //   success(this.result)
      // }
    },
    paste_preprocess(editor, args){
      console.log(editor)
      console.log(args)
    }
  });
};
let init = initializeEditor();
// let init = reactive({
//   // 选择器
//   selector: "textarea",
//   // 设置本地主题
//   skin_url: "/tinymce/skins/ui/oxide",
//   // 设置本地css
//   content_css: "/tinymce/skins/content/default/content.css",
//   // 设置本地语言
//   language_url: "/tinymce/langs/zh_CN.js",
//   // 设置本地语言
//   language: "zh_CN",
//   // 设置工具栏
//   toolbar: [
//     "bold italic hr | fontsize forecolor backcolor | blocks blockquote removeformat | undo redo ",
//     "bullist table insertdatetime | link charmap wordcount searchreplace code | codesample visualblocks image fullscreen preview",
//   ],
//   // 设置插件
//   plugins:
//     "codesample lists advlist link autolink charmap fullscreen preview code searchreplace table visualblocks wordcount insertdatetime image",
//   placeholder: props.placeholder,
//   statusbar: false,
//   promotion: false,
//   height: height
// });
let content = ref("");
watch(
  content,
  (newVal) => {
    emit("input", newVal);
  },
  { deep: true, immediate: true }
);

watch(()=>props.height,(newVal,oldVal)=>{
  // console.log("newVAL",newVal);
  // console.log("editor", tinymce.DOM)
  // console.log("editorRef", editorRef);
  height.value = newVal;
  // // if (editorRef.value && newVal !== oldVal) {
  //   // tinymce.execCommand("mceSetHeight", false, newVal)
  //   if(editorRef.value && editorRef.value.editor){
  //     // editorRef.value.execCommand('mceSetHeight', false, newVal);
  //     // editorRef.value.editor.editorContainer.style.height = newVal;
  //     // editorRef.value.editor.resize();
  //   }

  // }
},{ deep: true, immediate: true })
defineExpose({init,content})
</script>
