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

import "tinymce/themes/silver";
import "tinymce/plugins/media";
import "tinymce/plugins/directionality";
import "tinymce/plugins/visualchars";
import "tinymce/plugins/anchor";
import "tinymce/plugins/nonbreaking";
import "tinymce/plugins/autosave";
import "tinymce/plugins/autoresize"; 
import 'tinymce/plugins/pagebreak'
import tinymce from "tinymce/tinymce";

const DefaultToolBar='undo redo removeformat bold italic Alignleft Aligncenter Alignright Alignjustify lineheight forecolor backcolor bullist numlist link image table blocks fontsize fontfamily';
const DocToolBar='code newdocument Preview Print | bold italic Underline Strikethrough | blocks fontfamily fontsize | lineheight forecolor backcolor | Cut Copy Paste | undo redo | bullist numlist | Increaseindent Decreaseindent | Alignleft Aligncenter Alignright Alignjustify | removeformat Find replace Selectall | link anchor | table Emoticons Special pagebreak fullscreen | media image';

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
    toolbar: props.mode == 'simple' ? false :(props.mode == 'doc' ? DocToolBar : DefaultToolBar),
    font_size_formats: '初号=44pt 小初=36pt 一号=26pt 小一=24pt 二号=22pt 小三=18pt 三号=16pt 小四=14pt 四号=12pt 五号=10.5pt 小五=9pt 12px 14px 16px 18px 20px 22px 24px 30px 36px 48px',
    font_family_formats: "微软雅黑='微软雅黑';宋体='宋体';黑体='黑体';仿宋='仿宋';楷体='楷体';隶书='隶书';幼圆='幼圆';Andale Mono=andale mono,times;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;Comic Sans MS=comic sans ms,sans-serif;Courier New=courier new,courier;Georgia=georgia,palatino;Helvetica=helvetica;Impact=impact,chicago;Symbol=symbol;Tahoma=tahoma,arial,helvetica,sans-serif;Terminal=terminal,monaco;Times New Roman=times new roman,times;Trebuchet MS=trebuchet ms,geneva;Verdana=verdana,geneva;Webdings=webdings;Wingdings=wingdings",
    menubar: props.mode == 'simple' ? 'edit custom' : '',
    line_height_formats:'1 1.1 1.2 1.3 1.4 1.5 2 28pt 30pt 31pt 32pt',
    // 设置插件
    plugins:"codesample lists advlist pagebreak link autolink charmap media emoticons anchor fullscreen preview code searchreplace table visualblocks wordcount insertdatetime image",
    placeholder: props.placeholder,
    statusbar: false,
    promotion: false,
    height: height.value,
    emoticons_database_url: '/tinymce/plugins/emoticons/js/emojis.js',
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
