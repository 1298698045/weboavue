<template>
    <div class="summary">
        <div class="sectionable-table top-panel">
            <div class="sectionable-table-section">
                <div class="sectionable-table-section-title">
                    <div class="sectionable-table-section-title-label">组</div>
                    <div class="sectionable-table-section-actions">
                        <div class="query-builder-widget-icon-wrapper">
                            <a-tooltip title="交换行和列" color="#032d60">
                                <button class="fh-btn-icon">
                                    <svg aria-hidden="true" class="btn_icon" viewBox="0 0 100 100"><path d="M36 43.5c0-.8-.7-1.5-1.5-1.5h-13c-.8 0-1.5.7-1.5 1.5v35c0 .8.7 1.5 1.5 1.5h13c.8 0 1.5-.7 1.5-1.5v-35zM78.5 36c.8 0 1.5-.7 1.5-1.5v-13c0-.8-.7-1.5-1.5-1.5h-35c-.8 0-1.5.7-1.5 1.5v13c0 .8.7 1.5 1.5 1.5h35zM42.1 70.4l1.3 1.2 8.1 8.1c.4.4.9.4 1.3 0l1.3-1.3c.4-.4.4-.9 0-1.3l-5.7-5.7s12.3 1 18.1-4.8c5.8-5.8 5-18 5-18l5.6 5.6c.4.4.9.4 1.3 0l1.3-1.3c.4-.4.4-.9 0-1.3l-8.2-8.1-1.3-1.3c-.4-.4-.9-.4-1.3 0l-1.2 1.3-8.1 8.1c-.4.4-.4.9 0 1.3l1.3 1.3c.4.4.9.4 1.3 0l5.6-5.6s.8 10.9-3.8 15.5-15.5 3.8-15.5 3.8l5.6-5.6c.4-.4.4-.9 0-1.3l-1.3-1.3c-.4-.4-.9-.4-1.3 0l-8.1 8.2-1.3 1.3c-.4.3-.4.8 0 1.2z"></path></svg>
                                </button>
                            </a-tooltip>
                            <a-tooltip title="删除所有组" color="#032d60">
                                <button class="fh-btn-icon ml10">
                                    <svg aria-hidden="true" class="btn_icon" viewBox="0 0 52 52"><g><path d="M45.5 10H33V6c0-2.2-1.8-4-4-4h-6c-2.2 0-4 1.8-4 4v4H6.5c-.8 0-1.5.7-1.5 1.5v3c0 .8.7 1.5 1.5 1.5h39c.8 0 1.5-.7 1.5-1.5v-3c0-.8-.7-1.5-1.5-1.5zM23 7c0-.6.4-1 1-1h4c.6 0 1 .4 1 1v3h-6V7zM41.5 20h-31c-.8 0-1.5.7-1.5 1.5V45c0 2.8 2.2 5 5 5h24c2.8 0 5-2.2 5-5V21.5c0-.8-.7-1.5-1.5-1.5zM23 42c0 .6-.4 1-1 1h-2c-.6 0-1-.4-1-1V28c0-.6.4-1 1-1h2c.6 0 1 .4 1 1v14zm10 0c0 .6-.4 1-1 1h-2c-.6 0-1-.4-1-1V28c0-.6.4-1 1-1h2c.6 0 1 .4 1 1v14z"></path></g></svg>
                                </button>
                            </a-tooltip>
                        </div>
                    </div>
                </div>
                <div class="sectionable-table-section-content">
                    <div class="sectionable-table-group">
                        <div class="sectionable-table-group-title">
                            <div class="sectionable-table-group-title-label">
                                <svg aria-hidden="true" class="btn_icon" viewBox="0 0 100 100"><path d="M20 24v52c0 2.2 1.8 4 4 4h52c2.2 0 4-1.8 4-4V24c0-2.2-1.8-4-4-4H24c-2.2 0-4 1.8-4 4zm54 42.5V74H40v-7.5h34zM74 53v7.5H40V53h34zm0-13.5V47H40v-7.5h34zM74 26v7.5H40V26h34z"></path></svg>
                                <span class="assistive-text">组行</span>
                            </div>
                            <!-- <a-input placeholder="添加组...">
                                <template #suffix>
                                    <svg class="fh-input__icon fh-input__icon_left" focusable="false" data-key="search" aria-hidden="true" viewBox="0 0 520 520" part="icon"><g><path d="M496 453L362 320a189 189 0 10-340-92 190 190 0 00298 135l133 133a14 14 0 0021 0l21-21a17 17 0 001-22zM210 338a129 129 0 11130-130 129 129 0 01-130 130z"></path></g></svg>
                                </template>
                            </a-input> -->
                            <a-select placeholder="添加组..." show-search :filterOption="filterOptionGroup" style="width: 100%;" @change="handleAddGroupRow">
                                <template #suffixIcon>
                                    <svg class="fh-input__icon fh-input__icon_left" focusable="false" data-key="search" aria-hidden="true" viewBox="0 0 520 520" part="icon"><g><path d="M496 453L362 320a189 189 0 10-340-92 190 190 0 00298 135l133 133a14 14 0 0021 0l21-21a17 17 0 001-22zM210 338a129 129 0 11130-130 129 129 0 01-130 130z"></path></g></svg>
                                </template>
                                <a-select-opt-group v-for="(item, index) in categories" :label="item.label">
                                    <a-select-option  v-for="(row, key, idx) in item.columns" :key="idx" :value="key" :label="item.columns[key].label"> {{item.columns[key].label}}</a-select-option>
                                </a-select-opt-group>
                            </a-select>
                        </div>
                        <div class="sectionable-table-group-content">
                            <ul class="section-table-rows-container">
                                <draggable class="list-group" ghost-class="ghost" :component-data="{ name: 'fade' }" :list="groupingsDown" group="gourp" itemKey="name">
                                    <template #item="{ element, index }">
                                        <li class="sectionable-table-row draggable">
                                            <span class="sectionable-table-row-container">
                                                <span class="slds-pill__label column-label" :title="'业务机会信息 : '+element.label">
                                                    <span class="column-name">{{element.label}}</span>
                                                </span>
                                                <span class="sectionable-table-row-actions">
                                                    <a-tooltip placement="right" :title="'删除列：'+element.label" color="#032d60">
                                                        <button class="fh-btn-icon" @click="handleDeleteGroupRow(element, index)">
                                                            <svg aria-hidden="true" class="btn_icon" viewBox="0 0 52 52"><path d="M31 25.4l13-13.1c.6-.6.6-1.5 0-2.1l-2-2.1c-.6-.6-1.5-.6-2.1 0L26.8 21.2c-.4.4-1 .4-1.4 0L12.3 8c-.6-.6-1.5-.6-2.1 0l-2.1 2.1c-.6.6-.6 1.5 0 2.1l13.1 13.1c.4.4.4 1 0 1.4L8 39.9c-.6.6-.6 1.5 0 2.1l2.1 2.1c.6.6 1.5.6 2.1 0L25.3 31c.4-.4 1-.4 1.4 0l13.1 13.1c.6.6 1.5.6 2.1 0L44 42c.6-.6.6-1.5 0-2.1L31 26.8c-.4-.4-.4-1 0-1.4z"></path></svg>
                                                        </button>
                                                    </a-tooltip>
                                                </span>
                                            </span>
                                        </li>
                                    </template>
                                </draggable>
                                <!-- <li class="sectionable-table-row draggable" v-for="(item, index) in groupingsDown" :key="index">
                                    <span class="sectionable-table-row-container">
                                        <span class="slds-pill__label column-label" :title="'业务机会信息 : '+groupingColumnInfo[item.name].label">
                                            <span class="column-name">{{groupingColumnInfo[item.name].label}}</span>
                                        </span>
                                        <span class="sectionable-table-row-actions">
                                            <a-tooltip placement="right" :title="'删除列：'+groupingColumnInfo[item.name].label" color="#032d60">
                                                <button class="fh-btn-icon">
                                                    <svg aria-hidden="true" class="btn_icon" viewBox="0 0 52 52"><path d="M31 25.4l13-13.1c.6-.6.6-1.5 0-2.1l-2-2.1c-.6-.6-1.5-.6-2.1 0L26.8 21.2c-.4.4-1 .4-1.4 0L12.3 8c-.6-.6-1.5-.6-2.1 0l-2.1 2.1c-.6.6-.6 1.5 0 2.1l13.1 13.1c.4.4.4 1 0 1.4L8 39.9c-.6.6-.6 1.5 0 2.1l2.1 2.1c.6.6 1.5.6 2.1 0L25.3 31c.4-.4 1-.4 1.4 0l13.1 13.1c.6.6 1.5.6 2.1 0L44 42c.6-.6.6-1.5 0-2.1L31 26.8c-.4-.4-.4-1 0-1.4z"></path></svg>
                                                </button>
                                            </a-tooltip>
                                        </span>
                                    </span>
                                </li> -->
                            </ul>
                        </div>
                    </div>
                    <div class="sectionable-table-group">
                        <div class="sectionable-table-group-title">
                            <div class="sectionable-table-group-title-label">
                                <svg aria-hidden="true" class="btn_icon" viewBox="0 0 100 100"><path d="M76 20H24c-2.2 0-4 1.8-4 4v52c0 2.2 1.8 4 4 4h52c2.2 0 4-1.8 4-4V24c0-2.2-1.8-4-4-4zM33.5 74H26V40h7.5v34zM47 74h-7.5V40H47v34zm13.5 0H53V40h7.5v34zM74 74h-7.5V40H74v34z"></path></svg>
                                <span class="assistive-text">组列</span>
                            </div>
                            <!-- <a-input placeholder="添加组...">
                                <template #suffix>
                                    <svg class="fh-input__icon fh-input__icon_left" focusable="false" data-key="search" aria-hidden="true" viewBox="0 0 520 520" part="icon"><g><path d="M496 453L362 320a189 189 0 10-340-92 190 190 0 00298 135l133 133a14 14 0 0021 0l21-21a17 17 0 001-22zM210 338a129 129 0 11130-130 129 129 0 01-130 130z"></path></g></svg>
                                </template>
                            </a-input> -->
                            <a-select placeholder="添加组..." show-search :filterOption="filterOptionGroup" style="width: 100%;">
                                <template #suffixIcon>
                                    <svg class="fh-input__icon fh-input__icon_left" focusable="false" data-key="search" aria-hidden="true" viewBox="0 0 520 520" part="icon"><g><path d="M496 453L362 320a189 189 0 10-340-92 190 190 0 00298 135l133 133a14 14 0 0021 0l21-21a17 17 0 001-22zM210 338a129 129 0 11130-130 129 129 0 01-130 130z"></path></g></svg>
                                </template>
                                <a-select-opt-group v-for="(item, index) in categories" :label="item.label">
                                    <a-select-option  v-for="(row, key, idx) in item.columns" :key="idx" :value="key"> {{item.columns[key].label}}</a-select-option>
                                </a-select-opt-group>
                            </a-select>
                        </div>
                        <div class="sectionable-table-group-content">
                            <ul class="section-table-rows-container">
                                <draggable class="list-group" ghost-class="ghost" :component-data="{ name: 'fade' }" :list="groupingsAcross" :group="gourpColumn" itemKey="name">
                                    <template #item="{ element, index }">
                                        <li class="sectionable-table-row draggable">
                                            <span class="sectionable-table-row-container">
                                                <span class="slds-pill__label column-label" :title="'业务机会信息 : '+element.label">
                                                    <span class="column-name">{{element.label}}</span>
                                                </span>
                                                <span class="sectionable-table-row-actions">
                                                    <a-tooltip placement="right" :title="'删除列：'+element.label" color="#032d60">
                                                        <button class="fh-btn-icon" @click="handleDeleteGroupColumn(element, index)">
                                                            <svg aria-hidden="true" class="btn_icon" viewBox="0 0 52 52"><path d="M31 25.4l13-13.1c.6-.6.6-1.5 0-2.1l-2-2.1c-.6-.6-1.5-.6-2.1 0L26.8 21.2c-.4.4-1 .4-1.4 0L12.3 8c-.6-.6-1.5-.6-2.1 0l-2.1 2.1c-.6.6-.6 1.5 0 2.1l13.1 13.1c.4.4.4 1 0 1.4L8 39.9c-.6.6-.6 1.5 0 2.1l2.1 2.1c.6.6 1.5.6 2.1 0L25.3 31c.4-.4 1-.4 1.4 0l13.1 13.1c.6.6 1.5.6 2.1 0L44 42c.6-.6.6-1.5 0-2.1L31 26.8c-.4-.4-.4-1 0-1.4z"></path></svg>
                                                        </button>
                                                    </a-tooltip>
                                                </span>
                                            </span>
                                        </li>
                                    </template>
                                </draggable>
                                <!-- <li class="sectionable-table-row draggable" v-for="(item, index) in groupingsAcross" :key="index">
                                    <span class="sectionable-table-row-container">
                                        <span class="slds-pill__label column-label" :title="'业务机会信息 : '+groupingColumnInfo[item.name].label">
                                            <span class="column-name">{{groupingColumnInfo[item.name].label}}</span>
                                        </span>
                                        <span class="sectionable-table-row-actions">
                                            <a-tooltip placement="right" :title="'删除列：'+groupingColumnInfo[item.name].label" color="#032d60">
                                                <button class="fh-btn-icon">
                                                    <svg aria-hidden="true" class="btn_icon" viewBox="0 0 52 52"><path d="M31 25.4l13-13.1c.6-.6.6-1.5 0-2.1l-2-2.1c-.6-.6-1.5-.6-2.1 0L26.8 21.2c-.4.4-1 .4-1.4 0L12.3 8c-.6-.6-1.5-.6-2.1 0l-2.1 2.1c-.6.6-.6 1.5 0 2.1l13.1 13.1c.4.4.4 1 0 1.4L8 39.9c-.6.6-.6 1.5 0 2.1l2.1 2.1c.6.6 1.5.6 2.1 0L25.3 31c.4-.4 1-.4 1.4 0l13.1 13.1c.6.6 1.5.6 2.1 0L44 42c.6-.6.6-1.5 0-2.1L31 26.8c-.4-.4-.4-1 0-1.4z"></path></svg>
                                                </button>
                                            </a-tooltip>
                                        </span>
                                    </span>
                                </li> -->
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div class="sectionable-table-section">
                <div class="sectionable-table-section-title">
                    <div class="sectionable-table-section-title-label">列</div>
                    <div class="sectionable-table-section-actions">
                        <a-dropdown :trigger="['click']">
                            <a-button class="ant-btn-icon">
                                <svg aria-hidden="true" class="btn_icon" viewBox="0 0 52 52"><path d="M8.3 14h35.4c1 0 1.7 1.3.9 2.2L27.3 37.4c-.6.8-1.9.8-2.5 0L7.3 16.2c-.7-.9-.1-2.2 1-2.2z"></path></svg>
                            </a-button>
                            <template #overlay>
                                <a-menu class="fh-menu" style="width: 136px;" @click="handleColumnActions">
                                  <a-menu-item key="1">添加存储器列</a-menu-item>
                                  <a-menu-item key="2">添加汇总公式</a-menu-item>
                                  <a-menu-item key="3">添加行级公式</a-menu-item>
                                  <a-menu-item key="4">删除所有列</a-menu-item>
                                </a-menu>
                            </template>
                        </a-dropdown>
                    </div>
                </div>
                <div class="sectionable-table-section-content">
                    <div class="sectionable-table-group">
                        <div class="sectionable-table-group-title">
                            <!-- <a-input placeholder="添加列...">
                                <template #suffix>
                                    <svg class="fh-input__icon fh-input__icon_left" focusable="false" data-key="search" aria-hidden="true" viewBox="0 0 520 520" part="icon"><g><path d="M496 453L362 320a189 189 0 10-340-92 190 190 0 00298 135l133 133a14 14 0 0021 0l21-21a17 17 0 001-22zM210 338a129 129 0 11130-130 129 129 0 01-130 130z"></path></g></svg>
                                </template>
                            </a-input> -->
                            <a-select placeholder="添加列..." show-search :filterOption="filterOptionGroup" style="width: 100%;" @change="handleAddColumn">
                                <template #suffixIcon>
                                    <svg class="fh-input__icon fh-input__icon_left" focusable="false" data-key="search" aria-hidden="true" viewBox="0 0 520 520" part="icon"><g><path d="M496 453L362 320a189 189 0 10-340-92 190 190 0 00298 135l133 133a14 14 0 0021 0l21-21a17 17 0 001-22zM210 338a129 129 0 11130-130 129 129 0 01-130 130z"></path></g></svg>
                                </template>
                                <a-select-opt-group v-for="(item, index) in categories" :label="item.label">
                                    <a-select-option  v-for="(row, key, idx) in item.columns" :key="idx" :value="key"> {{item.columns[key].label}}</a-select-option>
                                </a-select-opt-group>
                            </a-select>
                        </div>
                        <div class="sectionable-table-group-content">
                            <ul class="section-table-rows-container">
                                <draggable class="list-group" ghost-class="ghost" :component-data="{ name: 'fade' }" :list="detailColumns" group="gourp" itemKey="label" @change="changeColumn" @start="startColumn">
                                    <template #item="{ element, index }">
                                        <li class="sectionable-table-row draggable"  :class="{'aggregatecolumn-row':element?.dataType=='currency'||element?.dataType=='percent'||element?.dataType=='double'}">
                                            <span class="sectionable-table-row-container">
                                                <span class="slds-pill__label column-label" :title="'业务机会信息: '+element.label">
                                                    <div class="aggregate-icon" v-if="element?.dataType=='currency'||element?.dataType=='percent'||element?.dataType=='double'">
                                                        <span>
                                                            <svg aria-hidden="true" class="iconSvg" viewBox="0 0 52 52"><path d="M49.2 13.3h-6.5l2.8-10.7v-.2c0-.4-.3-.8-.8-.8h-5.2c-.4 0-.7.3-.8.7l-2.8 11.1h-13l2.8-10.7v-.3c0-.4-.3-.8-.8-.8h-5.2c-.4 0-.7.3-.8.7l-2.9 11H8.8c-.4 0-.7.2-.8.6l-1.3 4.9v.2c0 .4.3.8.8.8h6.8l-3.2 12.5h-7c-.4 0-.7.2-.8.6L2 37.6v.2c0 .4.3.8.8.8h6.6L6.6 49.5v.2c0 .4.3.8.8.8h5.2c.4 0 .7-.2.8-.7l2.9-11.2h12.9l-2.8 10.8v.2c0 .4.3.8.8.8h5.2c.4 0 .7-.2.8-.7L36 38.5h7.1c.4 0 .7-.2.8-.7l1.3-4.9v-.2c0-.4-.3-.8-.8-.8h-6.7L41 19.4h6.9c.4 0 .7-.2.8-.7l1.3-4.9v-.2s-.4-.3-.8-.3zm-18.3 19H18l3.2-12.5h12.9l-3.2 12.5z"></path></svg>
                                                        </span>
                                                    </div>
                                                    <span class="column-name">{{element.label}}</span>
                                                </span>
                                                <span class="sectionable-table-row-actions">
                                                    <a-tooltip placement="right" :title="'删除列：'+element.label" color="#032d60">
                                                        <button class="fh-btn-icon" @click="handleDeleteColumn(element, index)">
                                                            <svg aria-hidden="true" class="btn_icon" viewBox="0 0 52 52"><path d="M31 25.4l13-13.1c.6-.6.6-1.5 0-2.1l-2-2.1c-.6-.6-1.5-.6-2.1 0L26.8 21.2c-.4.4-1 .4-1.4 0L12.3 8c-.6-.6-1.5-.6-2.1 0l-2.1 2.1c-.6.6-.6 1.5 0 2.1l13.1 13.1c.4.4.4 1 0 1.4L8 39.9c-.6.6-.6 1.5 0 2.1l2.1 2.1c.6.6 1.5.6 2.1 0L25.3 31c.4-.4 1-.4 1.4 0l13.1 13.1c.6.6 1.5.6 2.1 0L44 42c.6-.6.6-1.5 0-2.1L31 26.8c-.4-.4-.4-1 0-1.4z"></path></svg>
                                                        </button>
                                                    </a-tooltip>
                                                </span>
                                            </span>
                                        </li>
                                    </template>
                                </draggable>
                                <!-- <li class="sectionable-table-row draggable" :class="{'aggregatecolumn-row':detailColumnInfo[item].isLookup==true}" v-for="(item, index) in detailColumns" :key="index">
                                    <span class="sectionable-table-row-container">
                                        <span class="slds-pill__label column-label" :title="'业务机会信息: '+detailColumnInfo[item].label">
                                            <span class="column-name">{{detailColumnInfo[item].label}}</span>
                                        </span>
                                        <span class="sectionable-table-row-actions">
                                            <a-tooltip placement="right" :title="'删除列：'+detailColumnInfo[item].label" color="#032d60">
                                                <button class="fh-btn-icon">
                                                    <svg aria-hidden="true" class="btn_icon" viewBox="0 0 52 52"><path d="M31 25.4l13-13.1c.6-.6.6-1.5 0-2.1l-2-2.1c-.6-.6-1.5-.6-2.1 0L26.8 21.2c-.4.4-1 .4-1.4 0L12.3 8c-.6-.6-1.5-.6-2.1 0l-2.1 2.1c-.6.6-.6 1.5 0 2.1l13.1 13.1c.4.4.4 1 0 1.4L8 39.9c-.6.6-.6 1.5 0 2.1l2.1 2.1c.6.6 1.5.6 2.1 0L25.3 31c.4-.4 1-.4 1.4 0l13.1 13.1c.6.6 1.5.6 2.1 0L44 42c.6-.6.6-1.5 0-2.1L31 26.8c-.4-.4-.4-1 0-1.4z"></path></svg>
                                                </button>
                                            </a-tooltip>
                                        </span>
                                    </span>
                                </li> -->
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
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
        inject,
        nextTick
    } from "vue";
    import {
        SearchOutlined,
        DownOutlined,
        UserOutlined,
    } from "@ant-design/icons-vue";
    import { message } from "ant-design-vue";
    import draggable from "vuedraggable";
    import Interface from "@/utils/Interface.js";
    const { proxy } = getCurrentInstance();
    import { useRouter, useRoute } from "vue-router";
    const router = useRouter();
    const route = useRoute();

    const props = defineProps({
        record: Object,
        categories: Array
    });
    const data = reactive({
        detailColumnInfo: {},
        detailColumns: [], // 列
        groupingsDown: [], // 组行
        groupingsAcross: [], // 组列
        groupingColumnInfo: {}, // 组行组列 数据
        categories: [],
        gourpColumn: {
            name: "gourp",
            pull: true,
            put: true,
        },
    });

    const { detailColumnInfo, detailColumns, groupingsDown, groupingColumnInfo, groupingsAcross, categories,
        gourpColumn
    } = toRefs(data);

    const emit = defineEmits(['params']);

    watch(()=>data.groupingsDown, (newVal, oldVal)=>{
        // console.log("groupingsDown:", props.record.reportMetadata.groupingsDown);
        // let arr = props.record.reportMetadata.groupingsDown.filter(item=>{
        //     return newVal.find(row=>{
        //         return row.key == item.name;
        //     })
        // });
        if(newVal.length>3){
            data.groupingsDown.pop();
        }
        let arr = [];
        newVal.forEach(item=>{
            arr.push({
                dateGranularity: "None",
                name: item.key,
                sortAggregate: null,
                sortOrder: "Desc"
            })
        })
        emit("params", 'groupingsDown', arr);
    }, {deep: true, immediate: false});

    watch(()=>data.groupingsAcross, (newVal, oldVal)=>{
        let arr = props.record.reportMetadata.groupingsAcross.filter(item=>{
            return newVal.find(row=>{
                return row.key == item.name;
            })
        });
        emit("params", 'groupingsAcross', arr);
    }, {deep: true, immediate: false});

    watch(()=>data.detailColumns, (newVal, oldVal)=>{
        let arr = newVal.map(item=>item.key);
        emit("params", 'detailColumns', arr);
    }, {deep: true, immediate: false});

    const loadFn = () => {
        if(props.record){
            // data.detailColumnInfo = props.record.reportExtendedMetadata.detailColumnInfo;
            // data.detailColumns = props.record.reportMetadata.detailColumns;
            data.categories = JSON.parse(JSON.stringify(props.categories));
    
            let arrColumn = [];
            let detailColumns = props.record.reportMetadata.detailColumns;
            let detailColumnInfo = props.record.reportExtendedMetadata.detailColumnInfo;
    
            detailColumns.forEach((item,index)=>{
                if(detailColumnInfo[item]){
                    arrColumn.push({
                        key: item,
                        label: detailColumnInfo[item].label,
                        isLookup: detailColumnInfo[item].isLookup,
                        dataType: detailColumnInfo[item].dataType,
                    })
                }
            });
            data.detailColumns = arrColumn;
    
    
            // data.groupingsDown = props.record.reportMetadata.groupingsDown;
            // data.groupingsAcross = props.record.reportMetadata.groupingsAcross;
            let groupingsDownArr = [];
            let groupingsAcrossArr = [];
            let { groupingsDown, groupingsAcross } = props.record.reportMetadata;
            data.groupingColumnInfo = props.record.reportExtendedMetadata.groupingColumnInfo;
    
            groupingsDown.forEach(item=>{
                groupingsDownArr.push({
                    key: item.name,
                    label: data.groupingColumnInfo[item.name] && data.groupingColumnInfo[item.name].label,
                    dataType: data.groupingColumnInfo[item.name] && data.groupingColumnInfo[item.name].dataType,
                })
            })
            groupingsAcross.forEach(item=>{
                groupingsAcrossArr.push({
                    key: item.name,
                    label: data.groupingColumnInfo[item.name].label,
                    dataType: data.groupingColumnInfo[item.name].dataType,
                })
            })
            data.groupingsDown = groupingsDownArr;
            data.groupingsAcross = groupingsAcrossArr;
        }
    }

    watch(()=>props.record, (newVal, oldVal)=>{
        loadFn();
    }, {deep: true, immediate: true});
    // loadFn();
    // const getTree = () => {
    //     proxy.$get(Interface.report.reportDesign.tree, {}).then(res=>{
    //         let { reportTypeMetadata } = res.actions[0].returnValue;
    //         data.categories = JSON.parse(JSON.stringify(reportTypeMetadata.categories));
    //     })
    // }
    // getTree();

    // 移动列
    const changeColumn = (e) => {
        // console.log('move', e);
        // if(e.added){
        //     let { newIndex, element} = e.added;
        //     if(element.key){
        //         let idx = data.detailColumns.findIndex(item=>item==element.key);
        //         if(idx==-1){
        //             data.detailColumns[newIndex] = element.key;
        //             data.detailColumnInfo[element.key] = {
        //                 label: element.label,
        //                 isLookup: true
        //             }
        //             data.detailColumns.splice(newIndex, 1, element.key);
        //         }else {
        //             data.detailColumns.splice(newIndex, 1);
        //         }
        //     }
        //     if(element.name){
        //         let idx = data.detailColumns.findIndex(item=>item==element.name);
        //         if(idx==-1){
        //             data.detailColumns[newIndex] = element.name;
        //             data.detailColumnInfo[element.name] = {
        //                 label: data.groupingColumnInfo[element.name].label,
        //                 isLookup: true
        //             }
        //         }else {
        //             data.detailColumns.splice(newIndex, 1)
        //         }
        //     }
        // }
    }
    const startColumn = (e) => {
    }

    // 删除组行
    const handleDeleteGroupRow = (item, index) => {
        data.groupingsDown.splice(index, 1);
    }
    // 删除组列
    const handleDeleteGroupColumn = (item, index) => {
        data.groupingsAcross.splice(index, 1);
    }
    // 删除列
    const handleDeleteColumn = (item, index) => {
        data.detailColumns.splice(index, 1);
    }
    // 删除所有列
    const handleColumnActions = (item) => {
        // console.log("item:", item);
        switch(item.key){
            case '4':
                data.detailColumns = [];
                break;
        }
    }
    // watch(()=>data.groupingsDown, (newVal, oldVal)=>{
    //     if(newVal.length>3){
    //         data.groupingsDown.pop();
    //     }
    // },{deep: true});
    watch(()=>data.groupingsAcross, (newVal, oldVal)=>{
        if(newVal.length>2){
            data.groupingsAcross.pop();
        }
    },{deep: true});

    // 搜索-添加组行
    const handleAddGroupRow = (e) => {
        let record = convertColumn(e);
        let index = data.groupingsDown.findIndex(item=>item.key==e);
        if(index==-1){
            data.groupingsDown.push({
                key: e,
                label: record.label,
                dataType: record.dataType
            })
        }
    }
    // 搜索-添加列
    const handleAddColumn = (e) => {
        let record = convertColumn(e);
        let index = data.detailColumns.findIndex(item=>item.key==e);
        if(index==-1){
            data.detailColumns.push({
                key: e,
                label: record.label,
                dataType: record.dataType
            })
        }
    }



    // 取字段对应的数据
    const convertColumn = (column) => {
        let fieldData = {};
        for(let i=0; i < data.categories.length; i++){
            let item = data.categories[i];
            for(let key in item.columns){
                // console.log(key, column);
                if(key==column){
                    fieldData = item.columns[column];
                    break;
                }
            }
        }
        return fieldData;
    }   

    const filterOptionGroup = (inputValue, option) => {
        if (option.options) {  
            return option.options.some(child => {  
                return child.label && child.label.toLowerCase().includes(inputValue.toLowerCase());  
            });  
        }
        return option.label && option.label.toLowerCase().includes(inputValue.toLowerCase());  
    }
    
</script>
<style lang="less" scoped>
    .sectionable-table{
        .sectionable-table-section{
            padding-bottom: 14px;
            padding: 14px 16px;
            display: flex;
            flex-direction: column;
            .sectionable-table-section-title{
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 8px;
                .sectionable-table-section-title-label{
                    font-size: 14px;
                    color: #747474;
                    font-weight: bold;
                }
                .sectionable-table-section-actions{
                    .ant-btn-icon{
                        transform: scale(.7, .7);
                    }
                }
            }
            .sectionable-table-section-content{
                .sectionable-table-group{
                    .sectionable-table-group-title{
                        .sectionable-table-group-title-label{
                            display: flex;
                            align-items: center;
                            margin-bottom: 4px;
                            .btn_icon{
                                width: 20px;
                                height: 20px;
                                fill: #747474;
                            }
                            .assistive-text{
                                color: #747474;
                                font-size: 12px;
                            }
                        }
                    }
                    .sectionable-table-group-content{
                        display: flex;
                        flex-direction: column;
                        flex-grow: 1;
                        .section-table-rows-container{
                            flex-grow: 1;
                            min-height: 30px;
                            position: relative;
                            .sectionable-table-row{
                                width: 100%;
                                transition: transform .2s cubic-bezier(.2,0,0,1);
                                margin-top: 4px;
                                transform: initial;
                                &.draggable{
                                    cursor: move;
                                }
                                
                                .sectionable-table-row-container{
                                    width: 100%;
                                    display: flex;
                                    align-items: center;
                                    justify-content: space-between;
                                    line-height: 1.5;
                                    max-width: 100%;
                                    position: relative;
                                    min-height: 26px;
                                    border: 1px solid #f3f3f3;
                                    border-radius: 4px;
                                    background-color: #f3f3f3;
                                    margin-bottom: 0;
                                    padding: 0;
                                    height: auto;
                                    max-height: none;
                                    .column-label{
                                        color: #032d60;
                                        font-size: 13px;
                                        text-decoration: none;
                                        display: flex;
                                        max-width: 100%;
                                        font-weight: normal;
                                        line-height: 24px;
                                        padding-left: 6px;
                                    }
                                    .sectionable-table-row-actions{
                                        display: flex;
                                        padding-right: 6px;
                                        width: 16px;
                                        height: 16px;
                                        align-items: center;
                                        justify-content: center;
                                        border-radius: 4px;
                                        padding: 4px;
                                        box-sizing: content-box;
                                        .fh-btn-icon{
                                            color: #333;
                                        }
                                    }
                                }
                                
                                &.aggregatecolumn-row{
                                    .sectionable-table-row-container{
                                        background-color: #eef7fc;
                                        .aggregate-icon{
                                            width: 12px;
                                            margin-right: 2px;
                                            color: #747474;
                                            .iconSvg{
                                                width: 10px;
                                                height: 10px;
                                                fill: currentColor;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                .sectionable-table-group:not(:first-child){
                    margin-top: 20px;
                }
            }
        }
        .sectionable-table-section:not(:first-child){
            border-top: 1px solid #c9c9c9;
        }
    }
</style>