
<template>
    <div>
        <editor @onpaste="onpaste" @input="change" :value="value" :init="editdescribe.init"></editor>
    </div>
</template>
<script>
import tinymce from "tinymce";
import Editor from "@tinymce/tinymce-vue";
import 'tinymce/themes/silver/theme'
import 'tinymce/icons/default'
// import plugins from "tinymce/plugins"
import tinymceinit from "@/utils/tinymceinit.js"
export default {
    data(){
        return{
            editdescribe:{
                show:false,
                init: tinymceinit.init
            },
        }
    },
    props:['value'],
    components:{
        Editor
    },
    methods:{
        change(val){
            this.$emit('input',val)
        },
        onpaste(e,editor){
            if(e.clipboardData.types[0]=='Files') {
                let items = e.clipboardData.items;
                let file = items[0].getAsFile();
                let reader = new FileReader()
                reader.readAsDataURL(file)
                reader.onload=function(){
                let node = document.createElement('img')
                node.setAttribute('src',this.result)
                // console.log(editor.contentWindow.getSelection())
                let selection = editor.contentWindow.getSelection()
                if(selection.focusNode){
                    let RangeAt = editor.contentWindow.getSelection().getRangeAt(0)
                    const focusNode = RangeAt.commonAncestorContainer
                    const startOffset = RangeAt.startOffset
                    let parent = focusNode.parentNode

                    //文本节点的处理
                    if(focusNode.nodeType==3){
                        let nodeValue = focusNode.nodeValue
                        let startstr = nodeValue.slice(0,startOffset)
                        let endtstr = nodeValue.slice(startOffset)
                        const startnode = document.createElement('span')
                        startnode.innerHTML = startstr
                        const endnode = document.createElement('span')
                        endnode.innerHTML = endtstr

                        //节点属于父元素的第几个子节点
                        const focuseindex = Array.from(parent.childNodes).findIndex((item)=>{
                            return item ==focusNode
                        })

                        //拆分当前文本节点
                        parent.insertBefore(startnode,focusNode)
                        parent.insertBefore(node,focusNode)
                        parent.insertBefore(endnode,focusNode)
                        parent.removeChild(focusNode)

                        //重置光标位置
                        RangeAt.setStart(parent,focuseindex+2)
                        RangeAt.setEnd(parent,focuseindex+2)
                    }else{
                        focusNode.insertBefore(node,focusNode.childNodes[startOffset])
                        RangeAt.setStart(focusNode,startOffset+1)
                        RangeAt.setEnd(focusNode,startOffset+1)
                    }
                }
            }
            e.preventDefault();
        }
    }
    }
}
</script>