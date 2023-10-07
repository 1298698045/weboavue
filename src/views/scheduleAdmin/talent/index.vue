<template>
    <div class="wrapper">
        <div class="headerTop">
            <div class="leftAll">
                全部
            </div>
            <div class="rightBtns">
                <a-button type="primary">新建</a-button>
                <a-button class="ml10" type="primary">导入</a-button>
            </div>
        </div>
        <div class="center">
            <div class="bd">
                <div class="saerchWrap"></div>
                <div class="gridWrap">
                    
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
    
</script>
<style lang="less">
    .wrapper{
        width: 100%;
        height: 100%;
        background: #fff;
        border-radius: 3px;
        padding: 15px;
        box-sizing: border-box;
        .headerTop{
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid #e2e3e5;
            padding-bottom: 10px;
        }
    }
</style>