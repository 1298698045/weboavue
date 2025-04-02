<template>
    <div class="file-list-container">
        <a-checkbox-group v-model:value="selectedRowKeys" @change="selectFiles">
            <div class="group-files" v-for="(parentItem, parentIdx) in listData">
                <div class="group-head">
                    {{parentItem.name}}
                </div>
                <div class="groupFile-body">
                    <div v-for="(item, index) in parentItem.children" :key="index" class="file-item" @click="handlePreview(item)">
                        <div class="file-item-top">
                            <div class="checkboxView" @click.stop>
                                <a-checkbox :value="item.id" v-if="isCheckbox"></a-checkbox>
                            </div>
                            <div class="options-icon" @click.stop>
                                <a-dropdown :trigger="['click']">
                                    <EllipsisOutlined />
                                    <template #overlay>
                                        <a-menu class="fh-menu" @click="(e)=>{handleMenuClick(e, item)}">
                                            <a-menu-item key="preview">查看</a-menu-item>
                                            <a-menu-item key="rename">重命名</a-menu-item>
                                            <a-menu-item key="delete">删除</a-menu-item>
                                            <a-menu-item key="down">下载</a-menu-item>
                                        </a-menu>
                                    </template>
                                </a-dropdown>
                            </div>
                        </div>
                        <div class="file-item-wrapper">
                            <div class="file-item-img">
                                <img :src="require('@/assets/img/filetype/doc.png')"
                                    v-if="item.fileExtension == 'ocx' || item.fileExtension == 'docx' || item.fileExtension == 'doc'" />
                                <img :src="require('@/assets/img/filetype/rar.png')"
                                    v-else-if="item.fileExtension == 'rar' || item.fileExtension == 'zip'" />
                                <img :src="require('@/assets/img/filetype/Excel.png')"
                                    v-else-if="item.fileExtension == 'xlsx' || item.fileExtension == 'xls'" />
                                <img :src="require('@/assets/img/filetype/pdf.png')" v-else-if="item.fileExtension == 'pdf'" />
                                <img :src="require('@/assets/img/filetype/TXT.png')"
                                    v-else-if="item.fileExtension == 'TXT' || item.fileExtension == 'txt'" />
                                <img :src="require('@/assets/img/filetype/PPT.png')"
                                    v-else-if="item.fileExtension == 'ppt' || item.fileExtension == 'pptx'" />
                                <img :src="require('@/assets/img/filetype/video.png')"
                                    v-else-if="item.fileExtension == 'mp4' || item.fileExtension == '.mp4'" />
                                <img :src="item.viewUrl"
                                    v-else-if="item.fileExtension == 'jpg' || item.fileExtension == 'png' || item.fileExtension == 'gif'" />
                                <img :src="require('@/assets/img/filetype/File.png')" v-else />
                            </div>
                            <div class="file-item-info">
                                <p class="file-name">{{item.name}}</p>
                                <p class="file-desc rowEllipsis">{{item.createdByName}}
                                    {{moment(item.createdOn).format("YYYY-MM-DD")}}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </a-checkbox-group>
    </div>
</template>

<script setup>
    import { ref, watch, reactive, toRefs, onMounted, getCurrentInstance, onUpdated, h, defineProps, defineEmits, defineExpose } from "vue";
    import { EllipsisOutlined } from "@ant-design/icons-vue";
    import Interface from "@/utils/Interface.js";
    const { proxy } = getCurrentInstance();
    import { useRouter, useRoute } from "vue-router";
    const router = useRouter();
    import moment from "moment";

    const props = defineProps({
        parentId: String,
        isCheckbox: Boolean
    });
    const emit = defineEmits(['change','preview','rename','delete','down']);

    const data = reactive({
        listData: [],
        pageNumber: 1,
        pageSize: 10,
        total: 0,
        imageList: [],
        flatListData: [],
        selectedRowKeys: []
    });
    const { listData, pageNumber, pageSize, total, imageList, flatListData, selectedRowKeys } = toRefs(data);

    const getQuery = () => {
        let url = Interface.getFiles;
        let d = {
            parentId: props.parentId,
            page: data.pageNumber,
            rows: data.pageSize,
        }
        proxy.$post(url, d).then(res => {
            if (res && res.actions && res.actions[0] && res.actions[0].returnValue) {
                const rawData = res.actions[0].returnValue;
                const processedData = rawData.map(item => {
                    let size = item.fileSize ? (item.fileSize / 1024).toFixed(2) + 'kb' : '0kb';
                    let name = item.name ? item.name.replace(`.${item.fileExtension}`, '') : '';

                    return {
                        ...item,
                        key: item.id,
                        size: size,
                        // url: `/${props.entityName}/${item.id}/${name}`
                    };
                });
                const categoryMap = {};
                processedData.forEach(item => {
                    // 获取分类名称，处理空值情况
                    const categoryName = item.category?.trim() || '未知';
                    if (!categoryMap[categoryName]) {
                        categoryMap[categoryName] = {
                            name: categoryName,
                            children: []
                        };
                    }
                    categoryMap[categoryName].children.push(item);
                });
                
                const categorizedData = Object.values(categoryMap).sort((a, b) => {
                    if (a.name === '未知') return 1;
                    if (b.name === '未知') return -1;
                    return a.name.localeCompare(b.name);
                });

                // 合并到最终数据结构
                data.total = rawData.length;
                data.listData = categorizedData;
                console.log("data.listData", data.listData);
                // 如果需要保留原始列表数据（非分类结构）
                data.flatListData = processedData; 
            }
            data.imageList = res.actions[0].returnValue.filter(item => {
                return item.fileExtension == 'jpg' || item.fileExtension == 'jpeg' || item.fileExtension == 'png';
            });
        })
    };
    getQuery();

    const selectFiles = (e) => {
        emit("change", data.selectedRowKeys);
    };

    const handleMenuClick = (e, item) => {
        emit(e.key, item);
    };
    const handlePreview = (item) => {
        console.log("item", item);
        emit("preview", item);
    };
    defineExpose({getQuery})
</script>

<style scoped>
    .file-list-container {
        width: 100%;
        .groupFile-body{
            width: 100%;
            display: flex;
            flex-wrap: wrap;
        }
        .group-files{
            .group-head{
                height: 30px;
                line-height: 30px;
                /* background: #f3f3f3; */
                padding: 0 10px;
                border-radius: 4px;
                cursor: pointer;
                font-weight: bold;
                color: #666;
                font-size: 14px;
            }
        }
        .file-item {
            display: inline-block;
            width: 168px;
            margin: 0 0 24px 32px;
            padding: 4px;
            border-radius: 8px;
            vertical-align: top;

            /* text-align: center; */
            &:hover {
                background-color: #f7f9fc;
                cursor: pointer;
            }

            .file-item-top {
                height: 26px;
                text-align: left;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }

            .file-item-wrapper {
                width: 160px;
                padding: 2px 8px 0;
                position: relative;
                text-align: center;

                .file-item-img {
                    position: relative;
                    display: inline-block;
                    width: 128px;
                    height: 128px;

                    img {
                        width: 128px;
                        height: 128px;
                    }
                }

                .file-item-info {
                    position: relative;
                    padding-bottom: 24px;

                    .file-name {
                        max-width: 100%;
                        line-height: 18px;
                        font-size: 12px;
                        margin-top: 8px;
                        color: #03081a;
                        overflow: hidden;
                        max-height: 36px;
                        word-break: break-all;
                    }

                    .file-desc {
                        max-width: 100%;
                        font-size: 12px;
                        color: #818999;
                        line-height: 18px;
                        margin-top: 2px;
                    }
                }
            }
        }
    }
</style>