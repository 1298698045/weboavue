<template>
<div>
    <el-upload
        ref="upload"
        class="upload-demo"
        drag
        :on-success="uploadsuccess"
        action="#"
        :data="{
            pid:itemid,
            ObjTypeCode: 4200,
            sessionKey:sessionKey,
        }"
        :auto-upload="autoupload"
        :on-change="handleChange"
        :file-list="fileList"
        :class="objClass"
        list-type="picture-card">
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                    <template #file={file}>
                        <!-- {{file}} -->
                    <img
                        class="el-upload-list__item-thumbnail"
                        :src="''+(file&&file.url?file.url:'')" alt=""
                    />
                    <div class="filemsg">
                        {{file.name}}
                        {{file.createdOn}}
                    </div>
                    <span class="el-upload-list__item-actions">
                        <span
                        class="el-upload-list__item-preview"
                        title="预览"
                        @click="handlePictureCardPreview(file)"
                        >
                        <!-- <i class="el-icon-zoom-in"></i> -->
                        <ZoomInOutlined class="icon" />
                        </span>
                        <span
                        v-if="!disabled"
                        class="el-upload-list__item-download"
                        title="下载"
                        @click="handleDownload(file)"
                        >
                        <!-- <i class="el-icon-download"></i> -->
                        <DownloadOutlined class="icon" />
                        </span>
                        <span
                        class="el-upload-list__item-delete"
                        title="删除"
                        @click="handleDelete(file)"
                        >
                        <!-- <i class="el-icon-delete"></i> -->
                        <DeleteOutlined class="icon" />
                        </span>
                    </span>
                </template>
                </el-upload>
                <Fileview ref="fileview" v-model="dialogVisible" :value="dialogVisible" @cancel="dialogVisible=false;" :fileList="fileList"/>
                <Delete :isShow="isDelete" :desc="deleteDesc" @cancel="cancelDelete" @ok="refreshScheduleVal" :sObjectName="sObjectName" :recordId="id" :objTypeCode="objectTypeCode" :external="external" />
</div>
</template>
<script>
import { getCurrentInstance,nextTick } from "vue";
import { ZoomInOutlined,DownloadOutlined,DeleteOutlined } from "@ant-design/icons-vue";
import commonapi from '@/utils/commonapi.js'
import axios from 'axios'
import { getToken } from '@/utils/auth'
//import icon from '@/components/schedule/detail/icon.vue'
import {baseURL} from '@/utils/request.js'
import Fileview from '@/components/schedule/detail/fileview.vue'
import Interface from "@/utils/Interface.js";
import Delete from "@/components/listView/Delete.vue";
import { girdFormatterValue } from "@/utils/common.js";
import { message } from "ant-design-vue";
import dayjs from 'dayjs';
export default {
    data(){
        return {
            baseURL:baseURL,
            fileList:[],
            dialogVisible:false,
            objClass: {
                upLoadShow: true,
                upLoadHide: false,
            },
            proxy:null,
            objectTypeCode:'1001',
            sObjectName:'RelatedAttachment',
            isDelete: false,
            deleteDesc: '确定要删除吗？',
            external:false,
            id:''
        }
    },
    created(){
        const { proxy } = getCurrentInstance();
        this.proxy=proxy;
        this.getfile()
    },
    computed:{
        sessionKey(){
            let userInfo=window.localStorage.getItem('userInfo');
            let userId='';
            if(userInfo){
                userInfo=JSON.parse(userInfo);
                userId=userInfo.userId||'';
            }
            return userId
        }
    },
    components:{
        //icon,
        Fileview,ZoomInOutlined,DownloadOutlined,DeleteOutlined,Delete
    },
    watch:{
        itemid(){
            this.getfile()
        }
    },
    props:['itemid','autoupload','disabled'],
    methods:{
        handleDelete(e){
            this.id=e.id;
            this.isDelete = true;
        },
        cancelDelete(){
            this.isDelete = false;
        },
        refreshScheduleVal(e){
            var that=this;
            this.isDelete = false;
            nextTick(()=>{
                that.getfile()
            })
        },
        handleDownload(file){
            window.open(file.url);
        },
        handleRemove(file,fileList) {
            //if(!this.disabled){
                // commonapi.fileattachmentdelete(file.id).then((res)=>{
                //  this.getfile()
                // })
            //}else{
                //this.$refs.upload.uploadFiles.splice(this.$refs.upload.uploadFiles.findIndex((item)=>{return item.url==file.url}),1)
            //}
        },
        handlePictureCardPreview(file){
            this.dialogVisible = true
            this.$refs.fileview.handlePictureCardPreview(file)
            //console.log(this.dialogVisible)
        },
        getfile(){
            // commonapi.getfilelist(this.itemid).then((res)=>{
            //      this.fileList = res.listData
            // })
            var that=this;
            var filterQuery = '\nParentId\teq\t'+this.itemid
            this.proxy.$post(Interface.list2, {
                filterId:'',
                objectTypeCode:'1001',
                entityName:'RelatedAttachment',
                filterQuery:filterQuery,
                search:'',
                page: 1,
                rows: 100,
                sort:'Position',
                order:'asc',
                displayColumns:'Name,CreatedBy,CreatedOn,FileExtension,StorageNode,FileLocation,FileSize,Position,ParentId,AccessRight'
            }).then(res => {
                var list = [];
                for (var i = 0; i < res.nodes.length; i++) {
                    var item = res.nodes[i];
                    for(var cell in item){
                        if(cell!='id'&&cell!='nameField'){
                            item[cell]=girdFormatterValue(cell,item);
                        }
                        if(cell=='CreatedOn'){
                            item[cell]=item[cell]?dayjs(item[cell]).format("YYYY-MM-DD"):'';
                        }
                    }
                    var item0={
                        id:item.id||'',
                        name:item.Name||'',
                        viewLink:item.FileLocation||'',
                        link:item.FileLocation||'',
                        shareUrl:item.FileLocation||'',
                        url:item.FileLocation||'',
                        isAttach: true,
                        isFromFile: false,
                        isMainText: false,
                        fileSize:item.FileSize,
                        fileExtension:item.FileExtension,
                        createdOn:item.CreatedOn||'',
                        createdByName:item.CreatedBy||'',
                        date:item.CreatedOn||'',
                    }
                    list.push(item0)
                }
                that.fileList=list;
                
            })
        },
        uploadsuccess(){
            if(this.autoupload){
                //this.getfile()
            }else{
                //this.$refs.upload.uploadFiles = []
                //this.$emit('finish')
            }
        },
        submit(){
            this.$nextTick(()=>{
                this.$refs.upload._props.data.pid=this.itemid
                this.$refs.upload.submit()
            })
        },
        getfilelength(){
            return this.$refs.upload.uploadFiles.length
        },
        handleChange(file, fileList) {
            this.objClass.upLoadHide = false;
            this.objClass.upLoadShow = true;
        },
    }
}           
</script>
<style scoped>

.upload-demo{
    display: flex;
    flex-direction: column-reverse
}
:deep .el-upload-list--picture-card{
    flex-wrap: wrap-reverse !important;
}
.upload-demo>>>.el-upload--picture-card{
    border: 0;
    width: 100%;
    height:50px;
    margin-bottom: 10px;
}
.upload-demo>>>.el-upload-dragger{
    width: 100%;
    height: 50px;
    line-height: 50px;
    box-sizing: border-box;
    padding: 0px;
}
.upload-demo>>>.el-upload-dragger>*{
    display: inline-block;
    margin: 0 5px;
    vertical-align: middle;
}
.upload-demo>>>.el-icon-upload{
    font-size: 35px;
    position: relative;
    top: -3px;
}
.filemsg{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 100%;
    position: absolute;
    width: 100%;
    top: 40%;
    text-align: center;
}
:deep .el-upload-list--picture-card .el-upload-list__item-actions span{
    width: 20px;
    height: 20px;
}
:deep .el-upload-list--picture-card .el-upload-list__item-actions span .icon{
    width: 100%;
    height: 100%;
}
</style>