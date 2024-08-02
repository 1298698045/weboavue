<template>
    <div>
        <div class="panel">
            <div class="panel-head">
                <div class="panel-title">
                    附件 (0)
                </div>
            </div>
            <div class="panel-bd">
                <div class="collapse">
                    <div class="collapseItem" v-for="(item, index) in categoryFiles" :key="index">
                        <div class="collapseHead" v-if="item.CategoryName && item.CategoryName!='null'">
                            <span class="collapseItemIcon">
                                <!-- <DownOutlined /> -->
                                <UpOutlined />
                            </span>
                            <span class="collapseItemName">
                                {{item.CategoryName}}
                            </span>
                            <span class="addIcon">
                                <PlusOutlined style="color: #3399ff;" />
                            </span>
                        </div>
                        <div class="collapseBd">
                            <div class="files">
                                <div class="fileItem" v-for="(row, idx) in item.Files" :key="row.Id">
                                    <div class="fileItemImg">
                                        <img :src="require('@/assets/img/filetype/doc.png')" v-if="row.FileExtension == 'ocx' || 
                                        row.FileExtension == 'docx' || row.FileExtension == 'doc'" />
                                        <img :src="require('@/assets/img/filetype/rar.png')" v-else-if="row.FileExtension == 'rar' || 
                                        row.FileExtension == 'zip'" />
                                        <img :src="require('@/assets/img/filetype/Excel.png')" v-else-if="row.FileExtension == 'xlsx' || 
                                        row.FileExtension == 'xls'" />
                                        <img :src="require('@/assets/img/filetype/pdf.png')"
                                            v-else-if="row.FileExtension == 'pdf'" />
                                        <img :src="require('@/assets/img/filetype/TXT.png')"
                                            v-else-if="row.FileExtension == 'TXT'||row.FileExtension == 'txt'" />
                                        <img :src="require('@/assets/img/filetype/PPT.png')"
                                            v-else-if="row.FileExtension == 'ppt'||row.FileExtension == 'pptx'" />
                                        <img :src="require('@/assets/img/filetype/video.png')"
                                            v-else-if="row.FileExtension == 'mp4'||row.FileExtension == '.mp4'" />
                                        <img :src="require('@/assets/img/filetype/defaultImg.png')"
                                            v-else-if="row.FileExtension == 'jpg'||row.FileExtension == 'png'||row.FileExtension == 'gif'" />
                                        <img :src="require('@/assets/img/filetype/File.png')" v-else />
                                    </div>
                                    <div class="fileItemInfo">
                                        <p class="name">{{row.Name}}</p>
                                        <p class="link">
                                            <a href="javascript:;">查看</a>
                                            ·
                                            <a href="javascript:;">下载</a>
                                        </p>
                                        <p class="time">
                                            <span>{{row.CreatedOn}}&nbsp;·</span>
                                            &nbsp;
                                            <span>{{row.FileSize}}</span>
                                        </p>
                                    </div>
                                    <div class="iconOpera">
                                        <a-dropdown trigger="click">
                                            <DownOutlined style="font-size: 12px;" />
                                            <template #overlay>
                                                <a-menu>
                                                    <a-menu-item>
                                                        <a href="javascript:;">查看</a>
                                                    </a-menu-item>
                                                    <a-menu-item>
                                                        <a href="javascript:;">删除</a>
                                                    </a-menu-item>
                                                </a-menu>
                                            </template>
                                        </a-dropdown>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
    import { ref, reactive, onMounted, toRefs, getCurrentInstance, defineProps, defineEmits, toRaw } from "vue";
    import {
        UnorderedListOutlined,
        DownOutlined,
        CaretDownOutlined,
        DeleteFilled,
        DeleteOutlined,
        UpOutlined,
        PlusOutlined
    } from "@ant-design/icons-vue";
    import Interface from "@/utils/Interface.js";
    const { proxy } = getCurrentInstance();

    const data = reactive({
        categoryFiles: []
    });
    const { categoryFiles } = toRefs(data);

    const getFiles = () => {
        proxy.$get(Interface.flow.files, {
            InstanceId: "",
            InstanceState: 1,
            right: 16
        }).then(res=>{
            data.categoryFiles = res.CategoryFiles
        })
    };
    getFiles();
</script>
<style lang="less" scoped>
    .collapse {
        .collapseItem {
            margin: 5px;

            .collapseHead {
                height: 32px;
                background: #f3f2f2;
                color: #4e5969;
                border-radius: 4px;
                font-size: 13px;
                padding: 0 10px;
                display: flex;
                align-items: center;

                .collapseItemName {
                    flex: 1;
                    padding-left: 10px;
                }
            }

            .collapseBd {
                background: #fff;

                .files {
                    .fileItem {
                        display: flex;
                        padding: 10px;
                        border-bottom: 1px solid #e5e6eb;

                        .fileItemImg {
                            width: 40px;
                            height: 40px;

                            img {
                                width: 100%;
                                height: 100%;
                            }
                        }

                        .fileItemInfo {
                            flex: 1;
                            font-size: 14px;
                            margin-left: 10px;

                            .link {
                                a {
                                    color: #3399ff;
                                }
                            }

                            .time {
                                font-size: 12px;
                                color: #b8bbcc;
                            }
                        }

                        .iconOpera {}
                    }
                }
            }
        }
    }
</style>