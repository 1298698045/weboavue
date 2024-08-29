export default {
    init: {
        menu:'',
        menubar:'',
        plugins: 'lists,advlist,codesample,emoticons,table,image,link',
        toolbar: 'styleselect | bold italic | forecolor backcolor | bullist numlist |link image emoticons table',
        height: 240,
        language_url: "/static/tinymce/zh_CN.js",
        language: "zh_CN",
        skin_url: "/static/tinymce/skins/ui/oxide",
        emoticons_database_url: '/static/tinymce/plugins/emoticons/js/emojis.js',
        images_upload_url: 'https://wx.phxinfo.com.cn/rest',
        paste_data_images:true,
        images_upload_handler:function(blobInfo,success,failure){
          let reader = new FileReader()
          reader.readAsDataURL(blobInfo.blob())
          reader.onload=function(){
            success(this.result)
          }
        },
        paste_preprocess(editor, args){
          console.log(editor)
          console.log(args)
        }
      }
}