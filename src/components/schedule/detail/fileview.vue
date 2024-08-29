<template>
    <div class="imgviewdialog" 
    v-if="value">
                    <div>
                        <div class="imgviewdialog-head">
                            <div class="imgviewdialog-head-left">
                                <div class="imgviewdialog-head-type">
                                    <icon name="img"/>
                                </div>
                                <div class="imgviewdialog-head-msg">
                                    <div class="imgviewdialog-head-msg-title">{{dialogImageitem.name}}</div>
                                    <div class="imgviewdialog-head-msg-size">{{parseInt(dialogImageitem.fileSize/1024)}}kb</div>
                                </div>
                            </div>
                            <div class="imgviewdialog-head-right">
                                    <div class="hover-iconbtn" @click="handleDownload(dialogImageitem)"><icon name="xiazai"/></div>
                                    <div class="hover-iconbtn" @click="$emit('input',false)"><icon name="guanbi"/></div>                                    
                            </div>
                        </div>
                        <div class="imgviewdialog-bottom" v-if="showimg">
                            <div></div>
                            <div>
                                <div class="hover-iconbtn" @click="suoxiao"><icon name="suoxiao"/></div> 
                                <div class="hover-iconbtn" @click="fangda"><icon name="fangda"/></div> 
                            </div>
                            <div>{{imgzoom}}%</div>
                        </div>
                        <div class="imgviewdialog-left">
                            <div class="hover-iconbtn" v-if="dialogImageitemindex!=0" @click="dialogImageitemindex--;handlePictureCardPreview(fileList[dialogImageitemindex])"><icon name="Previous"/></div> 
                        </div>
                        <div class="imgviewdialog-right">
                            <div class="hover-iconbtn" v-if="dialogImageitemindex!=fileList.length-1" @click="dialogImageitemindex++;handlePictureCardPreview(fileList[dialogImageitemindex])"><icon name="Nextious"/></div> 
                        </div>
                        <div class="showimg" v-if="showimg">
                            <img  :style="{height:imgheight+'px',width:imgwidth+'px'}"  :src="dialogImageUrl" alt="">

                        </div>  
                        <div v-if="showpdf" class="openpdf">
                            <div @click="openpdf">点此查看</div>
                        </div>
                        <div v-if="showother" class="showother">
                            <div><img class="sc-17tkzyv-12 dTZuRk" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTIwcHgiIGhlaWdodD0iMTA4cHgiIHZpZXdCb3g9IjAgMCAxMjAgMTA4IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPgogICAgPCEtLSBHZW5lcmF0b3I6IFNrZXRjaCA1MC4yICg1NTA0NykgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+CiAgICA8dGl0bGU+RXJyb3IgTG9hZGluZyBGaWxlPC90aXRsZT4KICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPgogICAgPGRlZnM+CiAgICAgICAgPGxpbmVhckdyYWRpZW50IHgxPSIxMi4yODkzNjE3JSIgeTE9Ijk0LjQzNjI0NzclIiB4Mj0iODMuMzE0ODkzNiUiIHkyPSIxNC45OTY5MDY0JSIgaWQ9ImxpbmVhckdyYWRpZW50LTEiPgogICAgICAgICAgICA8c3RvcCBzdG9wLWNvbG9yPSIjQzFDN0QwIiBvZmZzZXQ9IjEwJSI+PC9zdG9wPgogICAgICAgICAgICA8c3RvcCBzdG9wLWNvbG9yPSIjRUJFQ0YwIiBzdG9wLW9wYWNpdHk9IjAuNSIgb2Zmc2V0PSIxMDAlIj48L3N0b3A+CiAgICAgICAgPC9saW5lYXJHcmFkaWVudD4KICAgICAgICA8bGluZWFyR3JhZGllbnQgeDE9Ii0xLjkzNzE3Mjc3JSIgeTE9Ijk2LjQwNDI3NiUiIHgyPSIxMDMuODQ4MTY4JSIgeTI9Ii05OS45NTE0MDkxJSIgaWQ9ImxpbmVhckdyYWRpZW50LTIiPgogICAgICAgICAgICA8c3RvcCBzdG9wLWNvbG9yPSIjQTVBREJBIiBzdG9wLW9wYWNpdHk9IjAiIG9mZnNldD0iMCUiPjwvc3RvcD4KICAgICAgICAgICAgPHN0b3Agc3RvcC1jb2xvcj0iI0E1QURCQSIgb2Zmc2V0PSIxMDAlIj48L3N0b3A+CiAgICAgICAgPC9saW5lYXJHcmFkaWVudD4KICAgICAgICA8bGluZWFyR3JhZGllbnQgeDE9Ii0xLjkzNzE3Mjc3JSIgeTE9Ijk2LjQwNDI3NiUiIHgyPSIxMDMuODQ4MTY4JSIgeTI9Ii05OS45NTE0MDkxJSIgaWQ9ImxpbmVhckdyYWRpZW50LTMiPgogICAgICAgICAgICA8c3RvcCBzdG9wLWNvbG9yPSIjQTVBREJBIiBzdG9wLW9wYWNpdHk9IjAiIG9mZnNldD0iMCUiPjwvc3RvcD4KICAgICAgICAgICAgPHN0b3Agc3RvcC1jb2xvcj0iI0E1QURCQSIgc3RvcC1vcGFjaXR5PSIwLjA3IiBvZmZzZXQ9IjExJSI+PC9zdG9wPgogICAgICAgICAgICA8c3RvcCBzdG9wLWNvbG9yPSIjQTVBREJBIiBzdG9wLW9wYWNpdHk9IjAuMjQiIG9mZnNldD0iMzIlIj48L3N0b3A+CiAgICAgICAgICAgIDxzdG9wIHN0b3AtY29sb3I9IiNBNUFEQkEiIHN0b3Atb3BhY2l0eT0iMC41MiIgb2Zmc2V0PSI2MCUiPjwvc3RvcD4KICAgICAgICAgICAgPHN0b3Agc3RvcC1jb2xvcj0iI0E1QURCQSIgc3RvcC1vcGFjaXR5PSIwLjkxIiBvZmZzZXQ9IjkzJSI+PC9zdG9wPgogICAgICAgICAgICA8c3RvcCBzdG9wLWNvbG9yPSIjQTVBREJBIiBvZmZzZXQ9IjEwMCUiPjwvc3RvcD4KICAgICAgICA8L2xpbmVhckdyYWRpZW50PgogICAgPC9kZWZzPgogICAgPGcgaWQ9Ik1WUC0oU3RyaWRlKSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9Ik1WLS0tcHJvY2Vzc2luZy0tLWVycm9yIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtNjYwLjAwMDAwMCwgLTM0MC4wMDAwMDApIiBmaWxsLXJ1bGU9Im5vbnplcm8iPgogICAgICAgICAgICA8ZyBpZD0iRXJyb3ItTG9hZGluZy1GaWxlIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg2NjAuMDAwMDAwLCAzNDAuMDAwMDAwKSI+CiAgICAgICAgICAgICAgICA8cGF0aCBkPSJNOTEuNzM2MTcwMiw4NC42NTM2MTcgTDkxLjczNjE3MDIsNzcuODcyMzQwNCBMMTAzLjY1OTU3NCw3Ny44NzIzNDA0IEwxMDMuNjU5NTc0LDcxLjA4NTk1NzQgTDExNy4wNDM0MDQsNzEuMDg1OTU3NCBMMTE3LjA0MzQwNCw2NC4yOTk1NzQ1IEwxMDMuNjU5NTc0LDY0LjI5OTU3NDUgTDEwMy42NTk1NzQsMTkuNzgyMTI3NyBMODMuODg3NjU5NiwxOS43ODIxMjc3IEw4My44ODc2NTk2LDAgTDIwLjcxNjU5NTcsMCBMMjAuNzE2NTk1NywyMi45MDIxMjc3IEwzNS4zOTc0NDY4LDIyLjkwMjEyNzcgTDM1LjM5NzQ0NjgsMjkuNjg4NTEwNiBMMi4xMTkxNDg5NCwyOS42ODg1MTA2IEwyLjExOTE0ODk0LDM2LjQ3NDg5MzYgTDEzLjUxNjU5NTcsMzYuNDc0ODkzNiBMMTMuNTE2NTk1Nyw0My4yNTYxNzAyIEwzMC4xOTkxNDg5LDQzLjI1NjE3MDIgTDMwLjE5OTE0ODksNTAuMDQyNTUzMiBMMCw1MC4wNDI1NTMyIEwwLDU2LjgyODkzNjIgTDIwLjcxNjU5NTcsNTYuODI4OTM2MiBMMjAuNzE2NTk1NywxMDcuMjkwMjEzIEwxMDMuNjU5NTc0LDEwNy4yOTAyMTMgTDEwMy42NTk1NzQsOTguMjI2MzgzIEw3OS4wNDY4MDg1LDk4LjIyNjM4MyBMNzkuMDQ2ODA4NSw5MS40NCBMMTIwLDkxLjQ0IEwxMjAsODQuNjUzNjE3IEw5MS43MzYxNzAyLDg0LjY1MzYxNyBaIE02MC42ODQyNTUzLDI5LjI4NTEwNjQgQzYyLjIyMzk0NDEsMjkuMjgzMTgwNSA2My42OTY5MjQyLDI5LjkxMzM2NzYgNjQuNzU4Nzc5NCwzMS4wMjgzMTU1IEM2NS44MjA2MzQ1LDMyLjE0MzI2MzQgNjYuMzc4MjYyMywzMy42NDUyMTQ2IDY2LjMwMTI3NjYsMzUuMTgyOTc4NyBMNjUuMDA5MzYxNyw2MS4yMjU1MzE5IEM2NC44OTUwMzkyLDYzLjUzMDkyNDIgNjIuOTkyNDgwNCw2NS4zNDEzODc1IDYwLjY4NDI1NTMsNjUuMzQxMjc2NiBDNTguMzc2MDMwMiw2NS4zNDEzODc1IDU2LjQ3MzQ3MTQsNjMuNTMwOTI0MiA1Ni4zNTkxNDg5LDYxLjIyNTUzMTkgTDU1LjA2NzIzNCwzNS4xODI5Nzg3IEM1NC45OTAyNDgzLDMzLjY0NTIxNDYgNTUuNTQ3ODc2MSwzMi4xNDMyNjM0IDU2LjYwOTczMTMsMzEuMDI4MzE1NSBDNTcuNjcxNTg2NCwyOS45MTMzNjc2IDU5LjE0NDU2NjYsMjkuMjgzMTgwNSA2MC42ODQyNTUzLDI5LjI4NTEwNjQgWiBNNjAuNjg0MjU1Myw3OS40OTYxNzAyIEM1Ny43NjI1NTE1LDc5LjQ5NjE3MDIgNTUuMzk0MDQyNiw3Ny4xMjc2NjEzIDU1LjM5NDA0MjYsNzQuMjA1OTU3NCBDNTUuMzk0MDQyNiw3MS4yODQyNTM2IDU3Ljc2MjU1MTUsNjguOTE1NzQ0NyA2MC42ODQyNTUzLDY4LjkxNTc0NDcgQzYzLjYwNTk1OTIsNjguOTE1NzQ0NyA2NS45NzQ0NjgxLDcxLjI4NDI1MzYgNjUuOTc0NDY4MSw3NC4yMDU5NTc0IEM2NS45NzQ0NjgxLDc3LjEyNzY2MTMgNjMuNjA1OTU5Miw3OS40OTYxNzAyIDYwLjY4NDI1NTMsNzkuNDk2MTcwMiBaIiBpZD0iU2hhcGUiIGZpbGw9InVybCgjbGluZWFyR3JhZGllbnQtMSkiPjwvcGF0aD4KICAgICAgICAgICAgICAgIDxwb2x5Z29uIGlkPSJTaGFwZSIgZmlsbD0idXJsKCNsaW5lYXJHcmFkaWVudC0yKSIgb3BhY2l0eT0iMC42IiBzdHlsZT0ibWl4LWJsZW5kLW1vZGU6IG11bHRpcGx5OyIgcG9pbnRzPSI4NC4wMjU1MzE5IDMwLjI5MTA2MzggMTAzLjUzMTkxNSAxOS43ODIxMjc3IDg0LjAyNTUzMTkgMTkuNzgyMTI3NyI+PC9wb2x5Z29uPgogICAgICAgICAgICAgICAgPHBvbHlnb24gaWQ9IlNoYXBlIiBmaWxsPSIjRTdFOEVDIiBwb2ludHM9IjEwMy42Njk3ODcgMTkuNzY2ODA4NSAxMDMuNjU0NDY4IDE5Ljc2NjgwODUgMTAzLjY2OTc4NyAxOS43ODIxMjc3Ij48L3BvbHlnb24+CiAgICAgICAgICAgICAgICA8cG9seWdvbiBpZD0iU2hhcGUiIGZpbGw9InVybCgjbGluZWFyR3JhZGllbnQtMykiIG9wYWNpdHk9IjAuNiIgc3R5bGU9Im1peC1ibGVuZC1tb2RlOiBtdWx0aXBseTsiIHBvaW50cz0iODQuMDI1NTMxOSAzMC4yOTEwNjM4IDEwMy41MzE5MTUgMTkuNzgyMTI3NyA4NC4wMjU1MzE5IDE5Ljc4MjEyNzciPjwvcG9seWdvbj4KICAgICAgICAgICAgICAgIDxwb2x5Z29uIGlkPSJTaGFwZSIgZmlsbD0iI0VCRUNGMCIgb3BhY2l0eT0iMC4yIiBwb2ludHM9Ijg0LjAyNTUzMTkgMTkuNzgyMTI3NyAxMDMuNTMxOTE1IDE5Ljc4MjEyNzcgMTAzLjY2OTc4NyAxOS43ODIxMjc3IDEwMy42Njk3ODcgMTkuNzgyMTI3NyAxMDMuNjY5Nzg3IDE5Ljc4MjEyNzcgMTAzLjY1NDQ2OCAxOS43NjY4MDg1IDgzLjg4NzY1OTYgMCA4My44ODc2NTk2IDAgODMuODg3NjU5NiAxOS43ODIxMjc3Ij48L3BvbHlnb24+CiAgICAgICAgICAgIDwvZz4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg==" alt="加载文件时出现错误"><p>出错了。</p><p>我们无法为此文件生成预览。</p></div>
                        </div>
                    </div>
                </div>
</template>
<script>
import icon from '@/components/schedule/detail/icon.vue'
export default {
    data() {
        return {
            dialogImageUrl:'',
            dialogfilename:'',
            imgwidth:'',
            imgheight:'',
            dialogImageitem:null,
            dialogImageitemindex:null,
            showimg:false,
            showpdf:false,
            showother:false,
            imgzoom:'100'
        }
    },
    components:{
        icon,
    },
    props:['value','fileList'],
    methods:{
        handlePictureCardPreview(file) {
            const index = this.fileList.findIndex((item)=>{return item.id==file.id})
            this.dialogImageitemindex = index
            this.dialogImageitem = file

            this.showpdf = false
            this.showother = false
            this.showimg = false

            if(file.fileExtension=='pdf'){
                // window.open(file.viewLink)
                this.showpdf = true
            }else if(file.fileExtension=='png'||file.fileExtension=='jpg'){
                this.dialogImageUrl = file.shareUrl?file.shareUrl:file.url;
                this.showimg = true
            }else{
                this.showother = true
            }

            const img = new Image()
            img.src = this.dialogImageUrl
            img.onload=()=>{
                const a = window.innerHeight/window.innerWidth
                const b = img.naturalHeight/img.naturalWidth
                this.naturalHeight = img.naturalHeight
                this.naturalWidth = img.naturalWidth
                if(img.naturalHeight>window.innerHeight||img.naturalWidth>window.innerWidth){
                    if(a>b){
                        this.imgwidth = window.innerWidth
                        this.imgheight = ''
                        this.imgzoom = parseInt(this.imgwidth/img.naturalWidth*100)
                    }else{
                        this.imgwidth = ''
                        this.imgheight = window.innerHeight
                        this.imgzoom = parseInt(this.imgheight/img.naturalHeight*100)
                    }
                }else{
                    this.imgwidth = img.naturalWidth
                }
                
            }
        },
        suoxiao(){
            if(this.imgzoom>10){
                this.imgzoom -= 10
                if(this.imgheight!=''){
                    this.imgheight -= this.naturalHeight/10
                }else{
                    this.imgwidth -= this.naturalWidth/10
                }
            }
        },
        fangda(){
            this.imgzoom += 10
            if(this.imgheight!=''){
                    this.imgheight += this.naturalHeight/10
                }else{
                    this.imgwidth += this.naturalWidth/10
                }
        },
        openpdf(){
            console.log(this.dialogImageitem)
            window.open(this.dialogImageitem.viewLink||this.dialogImageitem.shareUrl)
        },
        handleDownload(file) {
            window.open(file.link)
        },
    }
}
</script>
<style scoped>
.imgviewdialog{
    position: fixed;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    z-index: 999;
    display: flex;
    align-items: center;
    justify-content: center;
}
.imgviewdialog{
    position: fixed;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    z-index: 999;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgb(27, 38, 56);
}
.imgviewdialog-head{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    display: flex;
    justify-content: space-between;
    color: rgb(184, 199, 224);
    padding:20px;
    box-sizing: border-box;
    background-image: linear-gradient(rgb(14, 22, 36), rgba(14, 22, 36, 0));
}
.imgviewdialog-head-left{
    display: flex;
    align-items: center;
}
.imgviewdialog-head-left>div{
    margin: 0 8px;
}
.imgviewdialog-head-right{
    display: flex;
}
.imgviewdialog-bottom{
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    display: flex;
    justify-content: space-between;
    color: rgb(184, 199, 224);
    padding: 10px;
    box-sizing: border-box;
    background-image: linear-gradient(to top, rgb(14, 22, 36), rgba(14, 22, 36, 0));
}
.imgviewdialog-left{
    position: absolute;
    left: 50px;
    top: 50%;
    transform: translateY(-50%);
}
.imgviewdialog-right{
    position: absolute;
    right: 50px;
    top: 50%;
    transform: translateY(-50%);
}
.imgviewdialog-bottom>div{
    display: flex;
    margin: 0 30px;
}
.imgviewdialog>>>svg{
    color: rgb(184, 199, 224);
    cursor: pointer;
}
.imgviewdialog-left>>>svg,.imgviewdialog-right>>>svg{
    fill: #fff;
    color: #172B4D;
    font-weight: 700;
    width: 48px;
    height: 48px;
}
.hover-iconbtn:hover{
    background-color: rgb(49, 61, 82) !important;
}
.showother{
    color: rgb(184, 199, 224);
    line-height: 25px;
}
.openpdf{
    color: #108def;
    cursor: pointer;
}
.showimg{
    width: 100vw;
    height: 100vh;
    overflow: auto;
    display: flex;
    align-items: center;
    justify-content: center;
}
.imgviewdialog-bottom{
    pointer-events: none;
}
.imgviewdialog-bottom>div{
    pointer-events: initial;
}
</style>