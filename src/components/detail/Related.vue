<template>
    <div class="relatedWrap">
        <div class="panel">
            <div class="panel-head">
                <div class="panel-title">
                    关联事务
                </div>
                <div class="panel-btn">
                    <a-button type="primary">添加关联</a-button>
                </div>
            </div>
            <div class="panel-bd">
                <a-table :columns="columns" :data-source="relatedList"
                 :row-selection="{ selectedRowKeys: data.selectedRowKeys, onChange: onSelectChange }">
                 <template #bodyCell="{ column }">
                    <template v-if="column.key === 'Action'">
                      <a-button type="text" size="small">查看</a-button>
                      <a-button type="text" size="small">删除</a-button>
                    </template>
                  </template>
                </a-table>
            </div>
        </div>
        <div class="panel">
            <div class="panel-head">
                <div class="panel-title">
                    备注和附件
                </div>
                <div class="panel-btn">
                    <a-button type="primary">添加附件</a-button>
                </div>
            </div>
            <div class="panel-bd">
                <a-table :columns="filesColumns" :data-source="files"
                :row-selection="{ selectedRowKeys: data.selectedRowKeys, onChange: onSelectChange }">
                    <template #bodyCell="{ column }">
                        <template v-if="column.key === 'Action'">
                            <a-button type="text" size="small">编辑</a-button>
                            <a-button type="text" size="small">重命名</a-button>
                            <a-button type="text" size="small">查看</a-button>
                            <a-button type="text" size="small">删除</a-button>
                            <a-button type="text" size="small">下载</a-button>
                        </template>
                    </template>
                </a-table>
            </div>
        </div>
    </div>
</template>
<script setup>
    import "@/style/common.less";
    import { ref, toRefs, reactive, toRaw, onMounted, watch } from "vue";
    import useWrokDetail from "@/utils/workDetail";
    const { relatedList, getRelatedWork, files, getFilesWork } = useWrokDetail();

    var columns = [
        {
            title: "关联事务",
            dataIndex: "Name"
        },
        {
            title: "关联时间",
            dataIndex: "CreatedOn"
        },
        {
            title: "操作",
            key: 'Action',
            width: 150
        }
    ]
    var filesColumns = [
        {
            title: "类型",
            dataIndex: "FileExtension"
        },
        {
            title: "标题",
            dataIndex: "Name"
        },
        {
            title: "关联时间",
            dataIndex: "CreatedOn"
        },
        {
            title: "创建人",
            dataIndex: "createdByName"
        },
        {
            title: "操作",
            key: 'Action',
            width: 300
        },
    ]
    const data = reactive({
        list: [],
        selectedRowKeys: [],
        loading: false,
    })
    const columnList = toRaw(columns);
    const columnList2 = toRaw(filesColumns);
    const onSelectChange = selectedRowKeys => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        data.selectedRowKeys = selectedRowKeys;
    };
    onMounted(()=>{
        loadList();
    })
    const loadList = async () => {
      try {
        await getRelatedWork();
        await getFilesWork();
      } catch (err) {
        // 处理加载错误
        console.error('Error loading data:', err);
      }
    };
</script>
<style lang="less">
    .relatedWrap{
        width: 100%;
    }
    .ant-btn.ant-btn-text,.ant-btn.ant-btn-text:hover{
        color: var(--textColor);
    }
</style>