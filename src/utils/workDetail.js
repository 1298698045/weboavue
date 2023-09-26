import { ref, toRefs, computed, watch, watchEffect, reactive, onMounted } from "vue";
import { $get } from "./request.js";
import Interface from "./Interface.js";
export default function useWrokDetail() {
    const obj = reactive({
        relatedList: [],
        files: []
    });
    const { relatedList, files } = toRefs(obj);

    // 获取相关事务
    const getRelatedWork = async () => {
        try {
            const response = await $get(Interface.instanceList,{});
            // console.log("response", response)
            obj.relatedList = response.rows;
        } catch (error) {
            
        }   
    }
    // 获取附件
    const getFilesWork = async () => {
        try {
            const res = await $get(Interface.files,{});
            obj.files = res.CategoryFiles[0].Files;
        } catch (error) {
            
        }
    }
    return { relatedList, getRelatedWork, files, getFilesWork };
}