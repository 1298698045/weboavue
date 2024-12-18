<template>
    <div class="wrapper">
        <div class="dashboard-container">
            <div class="report-header">
                <div class="page-header__row">
                    <div class="page-header__col-title">
                        <div class="media">
                            <div class="media__figure">
                                <span class="icon_container icon-standard-report">
                                    <svg aria-hidden="true" class="page-header__icon" viewBox="0 0 100 100"><path d="M39 32h22c1.1 0 2-.9 2-2v-4c0-3.3-2.7-6-6-6H43c-3.3 0-6 2.7-6 6v4c0 1.1.9 2 2 2z"></path><path d="M72 25h-2c-.6 0-1 .4-1 1v4c0 4.4-3.6 8-8 8H39c-4.4 0-8-3.6-8-8v-4c0-.6-.4-1-1-1h-2c-3.3 0-6 2.7-6 6v43c0 3.3 2.7 6 6 6h44c3.3 0 6-2.7 6-6V31c0-3.3-2.7-6-6-6zM43 66c0 1.1-.9 2-2 2h-2c-1.1 0-2-.9-2-2V56c0-1.1.9-2 2-2h2c1.1 0 2 .9 2 2v10zm10 0c0 1.1-.9 2-2 2h-2c-1.1 0-2-.9-2-2V47c0-1.1.9-2 2-2h2c1.1 0 2 .9 2 2v19zm10 0c0 1.1-.9 2-2 2h-2c-1.1 0-2-.9-2-2V51c0-1.1.9-2 2-2h2c1.1 0 2 .9 2 2v15z"></path></svg>
                                </span>
                            </div>
                            <div class="media__body">
                                <div class="page-header__name">
                                    <div class="page-header__name-title">
                                        <h1>
                                            <span>报表：{{reportMetadata.reportType.label}}</span>
                                            <span class="page-header__title" :title="reportMetadata.name">{{reportMetadata.name}}</span>
                                        </h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="page-header__col-actions">
                        <div class="action-bars">
                            <a-button class="ml10"><svg aria-hidden="true" class="btn_icon btn_icon_left" viewBox="0 0 52 52"><g><path d="M9.5 33.4l8.9 8.9c.4.4 1 .4 1.4 0L42 20c.4-.4.4-1 0-1.4l-8.8-8.8c-.4-.4-1-.4-1.4 0L9.5 32.1c-.4.4-.4 1 0 1.3zM36.1 5.7c-.4.4-.4 1 0 1.4l8.8 8.8c.4.4 1 .4 1.4 0l2.5-2.5c1.6-1.5 1.6-3.9 0-5.5l-4.7-4.7c-1.6-1.6-4.1-1.6-5.7 0l-2.3 2.5zM2.1 48.2c-.2 1 .7 1.9 1.7 1.7l10.9-2.6c.4-.1.7-.3.9-.5l.2-.2c.2-.2.3-.9-.1-1.3l-9-9c-.4-.4-1.1-.3-1.3-.1l-.2.2c-.3.3-.4.6-.5.9L2.1 48.2z"></path></g></svg>启用字段编辑</a-button>
                            <a-tooltip placement="bottom" title="搜索报表表格" color="#032d60">
                                <a-button class="ant-btn-icon ml10" title="搜索报表表格" @click="isShowChart=!isShowChart">
                                    <svg aria-hidden="true" class="btn_icon" viewBox="0 0 52 52"><path d="M49.62 45.27L36.22 32a18.9 18.9 0 10-34.1-9.2A18.91 18.91 0 0032 36.27l13.3 13.3a1.45 1.45 0 002.1 0l2.1-2.1a1.68 1.68 0 00.12-2.2zm-28.7-11.5a12.9 12.9 0 1112.9-12.9 12.87 12.87 0 01-12.9 12.9z" fill-rule="evenodd"></path></svg>
                                </a-button>
                            </a-tooltip>
                            <a-tooltip placement="bottom" title="切换图表" color="#032d60">
                                <a-button class="ant-btn-icon ml10" :type="isShowChart?'primary':'default'" title="切换图表" @click="isShowChart=!isShowChart">
                                    <svg aria-hidden="true" class="btn_icon" viewBox="0 0 52 52"><g><path d="M45.5 23.4L25 34.7c-1.4.7-3-.3-3-1.8V8.4c0-1-1-1.8-1.9-1.5-10 2.8-17.2 12.5-16 23.6 1.1 10.1 9.2 18.3 19.4 19.4C36.8 51.3 48 41 48 28c0-1.2-.1-2.4-.3-3.6-.2-1-1.3-1.5-2.2-1z"></path><path d="M27.7 28l19.7-10.5c1.2-.6 1.6-2.2.8-3.3C43.7 8 36.7 3.5 28.7 2.2 27.3 1.9 26 3 26 4.4V27c0 .9.9 1.4 1.7 1z"></path></g></svg>
                                </a-button>
                            </a-tooltip>
                            <a-tooltip placement="bottom" title="筛选器" color="#032d60">
                                <a-button class="ant-btn-icon ml10" :type="isFilterPanel?'primary':'default'" title="筛选器" @click="handleShowFilter">
                                    <svg aria-hidden="true" class="btn_icon" viewBox="0 0 52 52"><path d="M48.3 4H3.9C2.4 4 1.7 5.7 2.6 6.8L22 29.5c.6.7.9 1.7.9 2.6v14.4c0 .8.8 1.5 1.6 1.5h3c.8 0 1.4-.7 1.4-1.5V32.1c0-1 .4-1.9 1.1-2.6L49.6 6.8c.9-1.1.2-2.8-1.3-2.8z"></path></svg>
                                </a-button>
                            </a-tooltip>
                            <a-tooltip placement="bottom" title="刷新" color="#032d60">
                                <a-button class="ant-btn-icon ml10" title="刷新" @click="handleRefresh">
                                    <svg aria-hidden="true" class="btn_icon" viewBox="0 0 52 52"><path d="M46.5 4h-3c-.8 0-1.5.7-1.5 1.5v7c0 .9-.5 1.3-1.2.7-.3-.4-.6-.7-1-1-5-5-12-7.1-19.2-5.7-2.5.5-4.9 1.5-7 2.9-6.1 4-9.6 10.5-9.7 17.5-.1 5.4 2 10.8 5.8 14.7 4 4.2 9.4 6.5 15.2 6.5 5.1 0 9.9-1.8 13.7-5 .7-.6.7-1.6.1-2.2l-2.1-2.1c-.5-.5-1.4-.6-2-.1-3.6 3-8.5 4.2-13.4 3-1.3-.3-2.6-.9-3.8-1.6C11.7 36.6 9 30 10.6 23.4c.3-1.3.9-2.6 1.6-3.8C15 14.7 19.9 12 25.1 12c4 0 7.8 1.6 10.6 4.4.5.4.9.9 1.2 1.4.3.8-.4 1.2-1.3 1.2h-7c-.8 0-1.5.7-1.5 1.5v3.1c0 .8.6 1.4 1.4 1.4h18.3c.7 0 1.3-.6 1.3-1.3V5.5C48 4.7 47.3 4 46.5 4z"></path></svg>
                                </a-button>
                            </a-tooltip>
                            <div class="btnGroup ml10">
                                <a-button disabled @click="handleEdit">编辑</a-button>
                                <a-dropdown :trigger="['click']">
                                    <a-button class="ant-btn-icon">
                                        <svg aria-hidden="true" class="btn_icon" viewBox="0 0 52 52"><path d="M8.3 14h35.4c1 0 1.7 1.3.9 2.2L27.3 37.4c-.6.8-1.9.8-2.5 0L7.3 16.2c-.7-.9-.1-2.2 1-2.2z"></path></svg>
                                    </a-button>
                                    <template #overlay>
                                        <a-menu class="fh-menu" style="width: 136px;" @click="handleActionMenu">
                                          <a-menu-item key="1">另存为</a-menu-item>
                                          <a-menu-item key="save">保存</a-menu-item>
                                          <a-menu-item key="3">订阅</a-menu-item>
                                          <a-menu-item key="export">导出</a-menu-item>
                                          <a-menu-item key="delete">删除</a-menu-item>
                                          <a-menu-item key="6">添加到仪表板</a-menu-item>
                                        </a-menu>
                                      </template>
                                </a-dropdown>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="dashboard-builder-body">
                <div class="widget-grid">
                    <a-spin tip="Loading..." :spinning="isLoading" style="width: 100%;height: 100%;">
                        <div class="widgets">
                            <div class="widget-container widget-container_scroll-container" v-if="isShow">
                                <div class="dashboard-widget">
                                    <div class="widgets">
                                        <div class="widget-container widget-container_reportMetrics">
                                            <div class="widget contained-widget">
                                                <div class="dashboard-widget">
                                                    <div class="metrics-widget">
                                                        <ul>
                                                            <li v-for="(item, index) in aggregateList" :key="index">
                                                                <div class="metricsElement metricsTitle" :title="item.label">{{item.label}}</div>
                                                                <div class="metricsElement metricsValue">{{item.num}}</div>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="widget-container widget-container_chartPanel" v-if="isShowChart">
                                            <div class="widget contained-widget">
                                                <div class="chart-switcher-container">
                                                    <div class="chart-switcher">
                                                        <a-tooltip placement="left" title="图表属性" color="#032d60">
                                                            <a-button class="ant-btn-icon" @click.stop="handleShowChartConfig">
                                                                <svg aria-hidden="true" class="btn_icon" viewBox="0 0 52 52"><g><path d="M26.1 19.1c-3.9 0-7 3.1-7 7s3.1 7 7 7 7-3.1 7-7-3.1-7-7-7z"></path><path d="M47.1 32.4l-3.7-3.1c.2-1.1.3-2.3.3-3.4s-.1-2.3-.3-3.4l3.7-3.1c1.2-1 1.6-2.8.8-4.2l-1.6-2.8c-.6-1-1.7-1.6-2.9-1.6-.4 0-.8.1-1.1.2l-4.6 1.7c-1.8-1.6-3.8-2.7-5.9-3.4L31 4.6c-.3-1.6-1.7-2.5-3.3-2.5h-3.2c-1.6 0-3 .9-3.3 2.5l-.8 4.6c-2.2.7-4.2 1.9-6 3.4l-4.6-1.7c-.4-.1-.7-.2-1.1-.2-1.2 0-2.3.6-2.9 1.6l-1.6 2.8c-.8 1.4-.5 3.2.8 4.2l3.7 3.1c-.2 1.1-.3 2.3-.3 3.4 0 1.2.1 2.3.3 3.4L5 32.3c-1.2 1-1.6 2.8-.8 4.2l1.6 2.8c.6 1 1.7 1.6 2.9 1.6.4 0 .8-.1 1.1-.2l4.6-1.7c1.8 1.6 3.8 2.7 5.9 3.4l.8 4.8c.3 1.6 1.6 2.7 3.3 2.7h3.2c1.6 0 3-1.2 3.3-2.8l.8-4.8c2.3-.8 4.4-2 6.2-3.7l4.3 1.7c.4.1.8.2 1.2.2 1.2 0 2.3-.6 2.9-1.6l1.5-2.6c.9-1.1.5-2.9-.7-3.9zm-21 4.7c-6.1 0-11-4.9-11-11s4.9-11 11-11 11 4.9 11 11-4.9 11-11 11z"></path></g></svg>
                                                            </a-button>
                                                        </a-tooltip>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="widget-container widget-container_chart" v-if="isShowChart">
                                            <Chart v-if="Object.keys(runReportData).length" :runReportData="runReportData" :chartConfig="chartConfig" :yName="yName" :summarieName="summarieName" :summarieLabels="summarieLabels" />
                                        </div>
                                        <div class="widget-container widget-container_table" style="height: 100%;" v-if="isGroup">
                                            <TableGridGroup v-if="Object.keys(runReportData).length && formState.hasDetailRows" :runReportData="runReportData" :formState="formState"  @params="changeParams"  @groupRow="changeGroupRow" />
                                            <TableGridAggregates v-if="Object.keys(runReportData).length && !formState.hasDetailRows" :runReportData="runReportData" :formState="formState"  @params="changeParams"  @groupRow="changeGroupRow" />
                                        </div>
                                        <div class="widget-container widget-container_table" style="height: 100%;" v-else>
                                            <TableGrid v-if="Object.keys(runReportData).length" :runReportData="runReportData" :formState="formState"  @params="changeParams" />
                                        </div>
                                        <div class="widget-container widget-container_settings" :class="{'active':isFilterPanel}">
                                            <div class="settings-footer-widget">
                                                <div class="settings-toggle-buttons">
                                                    <div class="form-element">
                                                        <label for="">
                                                            <span class="form-element__label">行计数</span>
                                                            <a-switch v-model:checked="formState.hasRecordCount" size="small"  @change="changeHasRecordCount" />
                                                        </label>
                                                    </div>
                                                    <div class="form-element">
                                                        <label for="">
                                                            <span class="form-element__label">详细信息行</span>
                                                            <a-switch v-model:checked="formState.hasDetailRows" size="small" @change="changeHasDetailRows" />
                                                        </label>
                                                    </div>
                                                    <div class="form-element">
                                                        <label for="">
                                                            <span class="form-element__label">小计</span>
                                                            <a-switch v-model:checked="formState.showSubtotals" size="small" @change="changeShowSubtotals" />
                                                        </label>
                                                    </div>
                                                    <div class="form-element">
                                                        <label for="">
                                                            <span class="form-element__label">合计</span>
                                                            <a-switch v-model:checked="formState.showGrandTotal" size="small" @change="changeShowGrandTotal" />
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <section class="absolute-positioned popoverWrap reportEclairConfigurerContainer" v-if="isChartPopup" @click.stop>
                                    <div class="popover__body">
                                        <div class="analytics-eclair-configurer">
                                            <div class="chart-selector">
                                                <div class="chart-selector-title">
                                                    显示方式
                                                </div>
                                                <div class="config-input-chartselector">
                                                    <div class="chartTypeItem" type="hbar" :class="{'active':chartForm.chartType=='hbar'}"  @click="changeChartType('hbar')">
                                                        <svg class="icon waveChartIcon" name="chart-thumb-hbar" viewBox="0 0 100 100"><path d="M20 29.5c0-1.1.9-2 2-2h56c1.1 0 2 .9 2 2V33c0 1.1-.9 2-2 2H22c-1.1 0-2-.9-2-2v-3.5z"></path><path d="M20 42c0-1.1.9-2 2-2h41c1.1 0 2 .9 2 2v3.5c0 1.1-.9 2-2 2H22c-1.1 0-2-.9-2-2V42z" fill-opacity=".8"></path><path d="M20 54.5c0-1.1.9-2 2-2h26c1.1 0 2 .9 2 2V58c0 1.1-.9 2-2 2H22c-1.1 0-2-.9-2-2v-3.5z" fill-opacity=".6"></path><path d="M20 67c0-1.1.9-2 2-2h11c1.1 0 2 .9 2 2v3.5c0 1.1-.9 2-2 2H22c-1.1 0-2-.9-2-2V67z" fill-opacity=".4"></path></svg>
                                                        <div class="chart-type-label">条形图</div>
                                                    </div>
                                                    <div class="chartTypeItem" type="vbar" :class="{'active':chartForm.chartType=='vbar'}"  @click="changeChartType('vbar')">
                                                        <svg class="icon waveChartIcon" name="chart-thumb-vbar" viewBox="0 0 100 100"><path d="M67 80c-1.1 0-2-.9-2-2V67c0-1.1.9-2 2-2h3.5c1.1 0 2 .9 2 2v11c0 1.1-.9 2-2 2H67z" fill-opacity=".4"></path><path d="M54.5 80c-1.1 0-2-.9-2-2V52c0-1.1.9-2 2-2H58c1.1 0 2 .9 2 2v26c0 1.1-.9 2-2 2h-3.5z" fill-opacity=".6"></path><path d="M42 80c-1.1 0-2-.9-2-2V37c0-1.1.9-2 2-2h3.5c1.1 0 2 .9 2 2v41c0 1.1-.9 2-2 2H42z" fill-opacity=".8"></path><path d="M29.5 80c-1.1 0-2-.9-2-2V22c0-1.1.9-2 2-2H33c1.1 0 2 .9 2 2v56c0 1.1-.9 2-2 2h-3.5z"></path></svg>
                                                        <div class="chart-type-label">列</div>
                                                    </div>
                                                    <div class="chartTypeItem" type="stackhbar" :class="{'active':chartForm.chartType=='stackhbar'}"  @click="changeChartType('stackhbar')">
                                                        <svg class="icon waveChartIcon" name="chart-thumb-stackhbar" viewBox="0 0 100 100"><path d="M32.5 65H22c-1.1 0-2 .9-2 2v3.5c0 1.1.9 2 2 2h10.5V65zM28 27.5h-6c-1.1 0-2 .9-2 2V33c0 1.1.9 2 2 2h6v-7.5z"></path><path d="M33 27.5h-2V35h2c1.1 0 2-.9 2-2v-3.5c0-1.1-.9-2-2-2zM35.5 65h7.2v7.5h-7.2z" fill-opacity=".8"></path><path d="M48 65h-2.2v7.5H48c1.1 0 2-.9 2-2V67c0-1.1-.9-2-2-2z" fill-opacity=".6"></path><path d="M36 40H22c-1.1 0-2 .9-2 2v3.5c0 1.1.9 2 2 2h14V40z"></path><path fill-opacity=".8" d="M39 40h8v7.5h-8z"></path><path fill-opacity=".6" d="M50 40h7v7.5h-7z"></path><path d="M63 40h-3v7.5h3c1.1 0 2-.9 2-2V42c0-1.1-.9-2-2-2z" fill-opacity=".4"></path><path fill-opacity=".6" d="M54.5 52.5h8.1V60h-8.1z"></path><path d="M78 52.5h-3V60h3c1.1 0 2-.9 2-2v-3.5c0-1.1-.9-2-2-2z" fill-opacity=".2"></path><path fill-opacity=".4" d="M65.6 52.5H72V60h-6.4z"></path><path d="M39 52.5H22c-1.1 0-2 .9-2 2V58c0 1.1.9 2 2 2h17v-7.5z"></path><path fill-opacity=".8" d="M42 52.5h9.5V60H42z"></path></svg>
                                                        <div class="chart-type-label">堆叠的条形图</div>
                                                    </div>
                                                    <div class="chartTypeItem" type="stackvbar" :class="{'active':chartForm.chartType=='stackvbar'}"  @click="changeChartType('stackvbar')">
                                                        <svg class="icon waveChartIcon" name="chart-thumb-stackvbar" viewBox="0 0 100 100"><path d="M65 67.5V78c0 1.1.9 2 2 2h3.5c1.1 0 2-.9 2-2V67.5H65zM27.5 72v6c0 1.1.9 2 2 2H33c1.1 0 2-.9 2-2v-6h-7.5z"></path><path d="M27.5 67v2H35v-2c0-1.1-.9-2-2-2h-3.5c-1.1 0-2 .9-2 2zM65 57.3h7.5v7.2H65z" fill-opacity=".8"></path><path d="M65 52v2.2h7.5V52c0-1.1-.9-2-2-2H67c-1.1 0-2 .9-2 2z" fill-opacity=".6"></path><path d="M40 64v14c0 1.1.9 2 2 2h3.5c1.1 0 2-.9 2-2V64H40z"></path><path fill-opacity=".8" d="M40 53h7.5v8H40z"></path><path fill-opacity=".6" d="M40 43h7.5v7H40z"></path><path d="M40 37v3h7.5v-3c0-1.1-.9-2-2-2H42c-1.1 0-2 .9-2 2z" fill-opacity=".4"></path><path fill-opacity=".6" d="M52.5 37.4H60v8.1h-7.5z"></path><path d="M52.5 22v3H60v-3c0-1.1-.9-2-2-2h-3.5c-1.1 0-2 .9-2 2z" fill-opacity=".2"></path><path fill-opacity=".4" d="M52.5 28H60v6.4h-7.5z"></path><path d="M52.5 61v17c0 1.1.9 2 2 2H58c1.1 0 2-.9 2-2V61h-7.5z"></path><path fill-opacity=".8" d="M52.5 48.5H60V58h-7.5z"></path></svg>
                                                        <div class="chart-type-label">堆叠的列</div>
                                                    </div>
                                                    <div class="chartTypeItem" type="line" :class="{'active':chartForm.chartType=='line'}"  @click="changeChartType('line')">
                                                        <svg class="icon waveChartIcon" name="chart-thumb-line" viewBox="0 0 100 100"><path d="M23.1 76.2l-1.4-1.4c-.8-.8-.8-2 0-2.8l34.5-34.5c.8-.8 2-.8 2.8 0l19.1 19.1c.8.8.8 2 0 2.8l-1.4 1.4c-.8.8-2 .8-2.8 0L57.7 44.6 26 76.3c-.8.6-2.1.6-2.9-.1z"></path><path fill-opacity=".6" d="M56.3 61.5L41.1 46.3 26.2 61.2c-.8.8-2 .8-2.8 0L22 59.8c-.8-.8-.8-2 0-2.8l17.8-17.8c.8-.8 2-.8 2.8 0l15.2 15.2 16.1-16.1c.8-.8 2-.8 2.8 0l1.4 1.4c.8.8.8 2 0 2.8L59.2 61.4c-.9.9-2.2.9-2.9.1z"></path><path fill-opacity=".4" d="M79 25.5h-4.5V21c0-.6-.4-1-1-1h-1c-.6 0-1 .4-1 1v4.5H59.2V21c0-.6-.4-1-1-1h-1c-.6 0-1 .4-1 1v4.5H43.9V21c0-.6-.4-1-1-1h-1c-.6 0-1 .4-1 1v4.5H28.5V21c0-.6-.4-1-1-1h-1c-.6 0-1 .4-1 1v4.5H21c-.6 0-1 .4-1 1v1c0 .6.4 1 1 1h4.5v12.4H21c-.6 0-1 .4-1 1v1c0 .6.4 1 1 1h4.5v2.4l3-3 2.4-2.4h-2.4V28.5h12.4v5.1h.1c1 0 2 .2 2.9.6v-5.7h12.3v3.4c.5-.1 1-.2 1.5-.2s1 .1 1.5.2v-3.5h12.3v5.3c.9-.6 1.9-.9 3-1v-4.3H79c.6 0 1-.4 1-1v-1c0-.5-.4-.9-1-.9zm0 46h-4.5v-5.3c-1.1-.1-2.1-.5-3-1.1v6.4H59.2v-4.6c-.5.1-1 .2-1.5.2s-1-.1-1.5-.2v4.6H43.9v-6.2l-3 3v3.2h-3.2l-3 3h6.2V79c0 .6.4 1 1 1h1c.5 0 1-.4 1-1v-4.5h12.3V79c0 .6.4 1 1 1h1c.5 0 1-.4 1-1v-4.5h12.3V79c0 .6.4 1 1 1h1c.6 0 1-.4 1-1v-4.5H79c.6 0 1-.4 1-1v-1c0-.6-.4-1-1-1z"></path></svg>
                                                        <div class="chart-type-label">线条</div>
                                                    </div>
                                                    <div class="chartTypeItem" type="donut" :class="{'active':chartForm.chartType=='donut'}"  @click="changeChartType('donut')">
                                                        <svg class="icon waveChartIcon" name="chart-thumb-pie" viewBox="0 0 100 100"><path d="M45.1 20C32.3 22 22 32.3 20 45.1c-.2 1.2.8 2.3 2 2.3h11.4c.9 0 1.7-.6 1.9-1.5 1.4-5.2 5.5-9.2 10.6-10.6.9-.2 1.5-1 1.5-1.9V22c0-1.3-1.1-2.2-2.3-2z" fill-opacity=".4"></path><path d="M45.9 64.6c-5.2-1.4-9.2-5.5-10.6-10.6-.2-.9-1-1.5-1.9-1.5H22c-1.2 0-2.2 1.1-2 2.3 2 12.8 12.2 23 25.1 25.1 1.2.2 2.3-.8 2.3-2V66.5c0-.9-.6-1.7-1.5-1.9z" fill-opacity=".6"></path><path d="M64.5 54c-1.4 5.2-5.5 9.2-10.6 10.6-.9.2-1.5 1-1.5 1.9V78c0 1.2 1.1 2.2 2.3 2 12.8-2 23-12.2 25.1-25.1.2-1.2-.8-2.3-2-2.3H66.5c-.9-.1-1.7.5-2 1.4z" fill-opacity=".8"></path><path d="M52.5 22v11.4c0 .9.6 1.7 1.5 1.9 5.2 1.4 9.2 5.5 10.6 10.6.2.9 1 1.5 1.9 1.5H78c1.2 0 2.2-1.1 2-2.3-2-12.8-12.2-23-25.1-25.1-1.3-.2-2.4.7-2.4 2z"></path></svg>
                                                        <div class="chart-type-label">圈形</div>
                                                    </div>
                                                    <div class="chartTypeItem" type="funnel" :class="{'active':chartForm.chartType=='funnel'}"  @click="changeChartType('funnel')">
                                                        <svg class="icon waveChartIcon" name="chart-thumb-funnel" viewBox="0 0 100 100"><path d="M78 28H22c-1.5 0-2.5 1.7-1.7 3l2.6 4.5h54.3l2.6-4.5c.7-1.4-.3-3-1.8-3z"></path><path fill-opacity=".8" d="M74.2 40.5H25.8l4.3 7.5h39.8z"></path><path fill-opacity=".6" d="M67.3 52.5H32.7L37 60h26z"></path><path d="M60.4 64.5H39.6l3.7 6.5c.4.6 1 1 1.7 1h9.7c.7 0 1.4-.4 1.7-1l4-6.5z" fill-opacity=".4"></path></svg>
                                                        <div class="chart-type-label">漏斗</div>
                                                    </div>
                                                    <div class="chartTypeItem" type="scatter" :class="{'active':chartForm.chartType=='scatter'}"  @click="changeChartType('scatter')">
                                                        <svg class="icon waveChartIcon" name="chart-thumb-scatter" viewBox="0 0 100 100"><circle cx="58" cy="65.4" r="6"></circle><circle cx="71" cy="42.4" r="5"></circle><path d="M50.1 36c2.8 0 5-2.3 5-5s-2.3-5-5-5c-2.8 0-5 2.3-5 5s2.1 5 5 5z"></path><circle cx="34.7" cy="42.4" r="4"></circle><circle cx="27" cy="57.7" r="3"></circle><circle cx="27" cy="73" r="2"></circle><path d="M79 25.5h-4.5V21c0-.6-.4-1-1-1h-1c-.6 0-1 .4-1 1v4.5H59.2V21c0-.6-.4-1-1-1h-1c-.6 0-1 .4-1 1v2.1c.9.7 1.7 1.6 2.4 2.7 0 .1.1.1.1.2.2.3.4.6.5 1 .2.5.4 1 .5 1.6h11.8v4c1.1.1 2.1.3 3 .6v-4.6H79c.6 0 1-.4 1-1v-1c0-.7-.4-1.1-1-1.1zM43.7 41.6v1.6c0 .2 0 .4-.1.6-.3 2-1.3 3.8-2.7 5.1v7.3h-6c.1.5.1 1 .1 1.5s-.1 1-.1 1.5h6v12.3h-7.1c.1.5.2 1 .2 1.5s-.1 1-.2 1.5h7.1V79c0 .6.4 1 1 1h1c.5 0 1-.4 1-1v-4.5h8c-1.2-.8-2.2-1.8-3-3h-5V59.2h5c.8-1.2 1.8-2.2 3-3h-8V43.9h12.3v10.6c.6-.1 1.2-.2 1.8-.2.4 0 .8 0 1.2.1V43.9h1.9c-.1-.5-.1-1-.1-1.5s.1-1 .1-1.5h-1.9V35c-.7 1.5-1.7 2.8-3 3.8v2H43.6M79 56.2h-4.5v-4.4c-.9.4-1.9.6-3 .6v3.8h-7.4c1.2.8 2.2 1.8 3 3h4.4v12.3h-4.4c-.8 1.2-1.8 2.2-3 3h7.4V79c0 .6.4 1 1 1h1c.6 0 1-.4 1-1v-4.5H79c.6 0 1-.4 1-1v-1c0-.6-.4-1-1-1h-4.5V59.2H79c.6 0 1-.5 1-1v-1c0-.6-.4-1-1-1zm-22.8 20V79c0 .6.4 1 1 1h1c.5 0 1-.4 1-1v-2.7c-.4 0-.8.1-1.2.1-.6-.1-1.2-.1-1.8-.2zM25.7 42.4v-.8c0-.2 0-.4.1-.6.3-2 1.3-3.8 2.7-5.1v-7.4h11.9c.1-.5.3-1.1.5-1.6.1-.3.3-.7.5-1 0-.1.1-.1.1-.2.6-1 1.4-1.9 2.4-2.7v-2c0-.6-.4-1-1-1h-1c-.6 0-1 .4-1 1v4.5H28.5V21c0-.6-.4-1-1-1h-1c-.6 0-1 .4-1 1v4.5H21c-.6 0-1 .4-1 1v1c0 .6.4 1 1 1h4.5v12.4H21c-.6 0-1 .4-1 1v1c0 .6.4 1 1 1h4.5v5.9c.5-.1 1-.1 1.5-.1s1 .1 1.5.1v-.9c-1.4-1.3-2.4-3.1-2.7-5.1 0-.2-.1-.4-.1-.6v-.8z" fill-opacity=".4"></path></svg>
                                                        <div class="chart-type-label">散点图</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <h2 class="chart-config-title">图表属性</h2>
                                            <div class="config-selector">
                                                <div class="config-config-item-line config-input config-input-text config-input-__chartTitle__">
                                                    <label class="label item-title">图表标题</label>
                                                    <input type="text" class="config-string" maxlength="40" id="ECLAIR_CHART_CONFIG_BASE_INPUT_36" v-model="chartForm.title" @change="changeChartTitle">
                                                </div>
                                                <template v-if="chartForm.chartType == 'hbar'">
                                                    <div class="config-input config-input-dimension">
                                                        <label class="label item-title">Y 轴</label>
                                                        <div class="config-config-item-line">
                                                            <div class="config-axis-container">
                                                                <label for="ECLAIR_CHART_CONFIG_BASE_INPUT_37" class="assistive-text">组 1</label>
                                                                <select class="config-axis-selector dimension" v-model="chartForm.yVal" @change="(e)=>changeChartVal(e, 0)">
                                                                    <option :value="item.field" v-for="(item, index) in chartData.groupingList" :key="index">{{item.label}}</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div class="config-config-item-line is-optional" v-if="chartForm.isYGroup">
                                                            <div class="config-axis-container colorable">
                                                                <label for="ECLAIR_CHART_CONFIG_BASE_INPUT_27" class="assistive-text">组 2</label>
                                                                <select class="config-axis-selector dimension" v-model="chartForm.yGroupVal" @change="(e)=>changeChartVal(e, 1)">
                                                                    <option :value="item.field" v-for="(item, index) in chartData.groupingList" :key="index">{{item.label}}</option>
                                                                </select>
                                                                <div class="config-palette-select">
                                                                    <select name="" id="ECLAIR_CHART_PALETTE_INPUT_2">
                                                                        <option value="0">默认调色板</option>
                                                                        <option value="1">灰色调色板</option>
                                                                        <option value="2">安全调色板</option>
                                                                    </select>
                                                                    <label class="assistive-text" for="ECLAIR_CHART_PALETTE_INPUT_2">调色板选择器</label>
                                                                    <div>
                                                                        <div class="config-preview-swatch" style="background-color: rgb(0, 161, 224);"></div>
                                                                        <div class="config-preview-swatch" style="background-color: rgb(22, 50, 92);"></div>
                                                                        <div class="config-preview-swatch" style="background-color: rgb(118, 222, 217);"></div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="option-field-inline-minus-button">
                                                                <button class="option-field-minus" @click="chartDeleteYGroup">
                                                                    <img src="@/assets/img/close_60.png" alt="">
                                                                </button>
                                                            </div>
                                                        </div>
                                                        <div class="option-field-buttons" @click="chartAddYGroup" v-else>
                                                            <button data-type="PLUS" class="optional-field-plus">+ 组</button>
                                                        </div>
                                                    </div>
                                                    <div class="config-input config-input-measure">
                                                        <label class="label item-title">X 轴</label>
                                                        <div class="config-config-item-line">
                                                            <div class="config-axis-container colorable">
                                                                <label for="ECLAIR_CHART_CONFIG_BASE_INPUT_40" class="assistive-text">评测 1</label>
                                                                <select name="" class="config-axis-selector measure" v-model="chartForm.summarie" @change="changeChartSummarie">
                                                                    <!-- <option value="s!AMOUNT_value">金额 总和</option>
                                                                    <option value="a!AMOUNT_value">平均金额</option>
                                                                    <option value="s!EXP_AMOUNT_value">预期收入 总和</option>
                                                                    <option value="RowCount_value">记录计数</option> -->
                                                                    <option :value="item.key" v-for="(item, index) in aggregateList" :key="index">{{item.label}}</option>
                                                                </select>
                                                                <div class="config-axis-reference-line">
                                                                    <input class="config-axis-reference-line-checkbox" type="checkbox" v-model="chartForm.xRowShow" id="ECLAIR_CHART_REFERENCELINE_INPUT_14">
                                                                    <label class="label" for="ECLAIR_CHART_REFERENCELINE_INPUT_14">显示参考行</label>
                                                                    <div class="config-axis-reference-line-outerValueInputDiv" v-if="chartForm.xRowShow">
                                                                        <label class="label" for="ECLAIR_CHART_REFERENCELINE_INPUT_15">参考行值</label>
                                                                        <div class="config-axis-reference-line-innerValueInputDiv">
                                                                            <input type="number" step="any" class="config-axis-reference-line-valueInput" id="ECLAIR_CHART_REFERENCELINE_INPUT_15" v-model="chartForm.xRowVal">
                                                                            <div class="config-color-select-container">
                                                                                <el-color-picker v-model="chartForm.color1" />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="option-field-buttons"><button data-type="PLUS" class="optional-field-plus" id="ANALYTICS_ECLAIR_CONFIGURER_UTILS_PLUS_9" style="display: none;">+ 评测</button></div>
                                                    </div>
                                                    <div class="config-config-item-line config-input config-input-boolean config-input-showValues">
                                                        <input class="config-boolean-selector" type="checkbox" id="ECLAIR_CHART_CONFIG_BOOLEAN_INPUT_4" v-model="chartForm.showChartValues" @change="changeChartShowValue">
                                                        <label class="config-boolean-selector-label label" for="ECLAIR_CHART_CONFIG_BOOLEAN_INPUT_4">显示值</label>
                                                    </div>
                                                </template>
                                                <template v-if="chartForm.chartType == 'vbar'">
                                                    <div class="config-input config-input-dimension">
                                                        <label class="label item-title">X 轴</label>
                                                        <div class="config-config-item-line">
                                                            <div class="config-axis-container">
                                                                <label for="ECLAIR_CHART_CONFIG_BASE_INPUT_37" class="assistive-text">组 1</label>
                                                                <select class="config-axis-selector dimension" v-model="chartForm.yVal" @change="(e)=>changeChartVal(e, 0)">
                                                                    <option :value="item.field" v-for="(item, index) in chartData.groupingList" :key="index">{{item.label}}</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div class="config-config-item-line is-optional" v-if="chartForm.isYGroup">
                                                            <div class="config-axis-container colorable">
                                                                <label for="ECLAIR_CHART_CONFIG_BASE_INPUT_27" class="assistive-text">组 2</label>
                                                                <select class="config-axis-selector dimension" v-model="chartForm.yGroupVal" @change="(e)=>changeChartVal(e, 1)">
                                                                    <option :value="item.field" v-for="(item, index) in chartData.groupingList" :key="index">{{item.label}}</option>
                                                                </select>
                                                                <div class="config-palette-select">
                                                                    <select name="" id="ECLAIR_CHART_PALETTE_INPUT_2">
                                                                        <option value="0">默认调色板</option>
                                                                        <option value="1">灰色调色板</option>
                                                                        <option value="2">安全调色板</option>
                                                                    </select>
                                                                    <label class="assistive-text" for="ECLAIR_CHART_PALETTE_INPUT_2">调色板选择器</label>
                                                                    <div>
                                                                        <div class="config-preview-swatch" style="background-color: rgb(0, 161, 224);"></div>
                                                                        <div class="config-preview-swatch" style="background-color: rgb(22, 50, 92);"></div>
                                                                        <div class="config-preview-swatch" style="background-color: rgb(118, 222, 217);"></div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="option-field-inline-minus-button">
                                                                <button class="option-field-minus" @click="chartDeleteYGroup">
                                                                    <img src="@/assets/img/close_60.png" alt="">
                                                                </button>
                                                            </div>
                                                        </div>
                                                        <div class="option-field-buttons" @click="chartAddYGroup" v-else>
                                                            <button data-type="PLUS" class="optional-field-plus">+ 组</button>
                                                        </div>
                                                    </div>
                                                    <div class="config-input config-input-measure">
                                                        <label class="label item-title">Y 轴</label>
                                                        <div class="config-config-item-line">
                                                            <div class="config-axis-container colorable">
                                                                <label for="ECLAIR_CHART_CONFIG_BASE_INPUT_40" class="assistive-text">评测 1</label>
                                                                <select name="" class="config-axis-selector measure" v-model="chartForm.summarie" @change="changeChartSummarie">
                                                                    <option :value="item.key" v-for="(item, index) in aggregateList" :key="index">{{item.label}}</option>
                                                                </select>
                                                                <div class="config-axis-reference-line">
                                                                    <input class="config-axis-reference-line-checkbox" type="checkbox" v-model="chartForm.xRowShow" id="ECLAIR_CHART_REFERENCELINE_INPUT_14">
                                                                    <label class="label" for="ECLAIR_CHART_REFERENCELINE_INPUT_14">显示参考行</label>
                                                                    <div class="config-axis-reference-line-outerValueInputDiv" v-if="chartForm.xRowShow">
                                                                        <label class="label" for="ECLAIR_CHART_REFERENCELINE_INPUT_15">参考行值</label>
                                                                        <div class="config-axis-reference-line-innerValueInputDiv">
                                                                            <input type="number" step="any" class="config-axis-reference-line-valueInput" id="ECLAIR_CHART_REFERENCELINE_INPUT_15" v-model="chartForm.xRowVal">
                                                                            <div class="config-color-select-container">
                                                                                <el-color-picker v-model="chartForm.color1" />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="option-field-buttons"><button data-type="PLUS" class="optional-field-plus" id="ANALYTICS_ECLAIR_CONFIGURER_UTILS_PLUS_9" style="display: none;">+ 评测</button></div>
                                                    </div>
                                                    <div class="config-config-item-line config-input config-input-boolean config-input-showValues">
                                                        <input class="config-boolean-selector" type="checkbox" id="ECLAIR_CHART_CONFIG_BOOLEAN_INPUT_4" v-model="chartForm.showChartValues" @change="changeChartShowValue">
                                                        <label class="config-boolean-selector-label label" for="ECLAIR_CHART_CONFIG_BOOLEAN_INPUT_4">显示值</label>
                                                    </div>
                                                </template>
                                                <template v-if="chartForm.chartType == 'line'">
                                                    <div class="config-input config-input-dimension">
                                                        <label class="label item-title">X 轴</label>
                                                        <div class="config-config-item-line">
                                                            <div class="config-axis-container">
                                                                <label for="ECLAIR_CHART_CONFIG_BASE_INPUT_37" class="assistive-text">组 1</label>
                                                                <select class="config-axis-selector dimension" v-model="chartForm.yVal" @change="(e)=>changeChartVal(e, 0)">
                                                                    <option :value="item.field" v-for="(item, index) in chartData.groupingList" :key="index">{{item.label}}</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div class="config-config-item-line is-optional" v-if="chartForm.isYGroup">
                                                            <div class="config-axis-container colorable">
                                                                <label for="ECLAIR_CHART_CONFIG_BASE_INPUT_27" class="assistive-text">组 2</label>
                                                                <select class="config-axis-selector dimension" v-model="chartForm.yGroupVal" @change="(e)=>changeChartVal(e, 1)">
                                                                    <option :value="item.field" v-for="(item, index) in chartData.groupingList" :key="index">{{item.label}}</option>
                                                                </select>
                                                                <div class="config-palette-select">
                                                                    <select name="" id="ECLAIR_CHART_PALETTE_INPUT_2">
                                                                        <option value="0">默认调色板</option>
                                                                        <option value="1">灰色调色板</option>
                                                                        <option value="2">安全调色板</option>
                                                                    </select>
                                                                    <label class="assistive-text" for="ECLAIR_CHART_PALETTE_INPUT_2">调色板选择器</label>
                                                                    <div>
                                                                        <div class="config-preview-swatch" style="background-color: rgb(0, 161, 224);"></div>
                                                                        <div class="config-preview-swatch" style="background-color: rgb(22, 50, 92);"></div>
                                                                        <div class="config-preview-swatch" style="background-color: rgb(118, 222, 217);"></div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="option-field-inline-minus-button">
                                                                <button class="option-field-minus" @click="chartDeleteYGroup">
                                                                    <img src="@/assets/img/close_60.png" alt="">
                                                                </button>
                                                            </div>
                                                        </div>
                                                        <div class="option-field-buttons" @click="chartAddYGroup" v-else>
                                                            <button data-type="PLUS" class="optional-field-plus">+ 组</button>
                                                        </div>
                                                    </div>
                                                    <div class="config-input config-input-measure">
                                                        <label class="label item-title">Y 轴</label>
                                                        <div class="config-config-item-line">
                                                            <div class="config-axis-container colorable">
                                                                <label for="ECLAIR_CHART_CONFIG_BASE_INPUT_40" class="assistive-text">评测 1</label>
                                                                <select name="" class="config-axis-selector measure" v-model="chartForm.summarie" @change="changeChartSummarie">
                                                                    <option :value="item.key" v-for="(item, index) in aggregateList" :key="index">{{item.label}}</option>
                                                                </select>
                                                                <div class="config-axis-reference-line">
                                                                    <input class="config-axis-reference-line-checkbox" type="checkbox" v-model="chartForm.xRowShow" id="ECLAIR_CHART_REFERENCELINE_INPUT_14">
                                                                    <label class="label" for="ECLAIR_CHART_REFERENCELINE_INPUT_14">显示参考行</label>
                                                                    <div class="config-axis-reference-line-outerValueInputDiv" v-if="chartForm.xRowShow">
                                                                        <label class="label" for="ECLAIR_CHART_REFERENCELINE_INPUT_15">参考行值</label>
                                                                        <div class="config-axis-reference-line-innerValueInputDiv">
                                                                            <input type="number" step="any" class="config-axis-reference-line-valueInput" id="ECLAIR_CHART_REFERENCELINE_INPUT_15" v-model="chartForm.xRowVal">
                                                                            <div class="config-color-select-container">
                                                                                <el-color-picker v-model="chartForm.color1" />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="option-field-buttons"><button data-type="PLUS" class="optional-field-plus" id="ANALYTICS_ECLAIR_CONFIGURER_UTILS_PLUS_9" style="display: none;">+ 评测</button></div>
                                                    </div>
                                                    <div class="config-config-item-line config-input config-input-boolean config-input-showValues">
                                                        <input class="config-boolean-selector" type="checkbox" id="ECLAIR_CHART_CONFIG_BOOLEAN_INPUT_4" v-model="chartForm.showChartValues">
                                                        <label class="config-boolean-selector-label label" for="ECLAIR_CHART_CONFIG_BOOLEAN_INPUT_4">累计</label>
                                                    </div>
                                                </template>
                                                <template v-if="chartForm.chartType == 'donut'">
                                                    <div class="config-input config-input-measure">
                                                        <label class="label item-title" for="ECLAIR_CHART_CONFIG_BASE_INPUT_61">值</label>
                                                        <div class="config-config-item-line">
                                                            <div class="config-axis-container">
                                                                <label for="ECLAIR_CHART_CONFIG_BASE_INPUT_61" class="assistive-text"></label>
                                                                <select class="config-axis-selector measure" name="" v-model="chartForm.summarie" @change="changeChartSummarie">
                                                                    <option :value="item.key" v-for="(item, index) in aggregateList" :key="index">{{item.label}}</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="config-input config-input-measure">
                                                        <label class="label item-title">切换标准</label>
                                                        <div class="config-config-item-line">
                                                            <div class="config-axis-container colorable">
                                                                <label for="ECLAIR_CHART_CONFIG_BASE_INPUT_62" class="assistive-text"></label>
                                                                <select class="config-axis-selector dimension" v-model="chartForm.yVal" @change="(e)=>changeChartVal(e, 0)">
                                                                    <option :value="item.field" v-for="(item, index) in chartData.groupingList" :key="index">{{item.label}}</option>
                                                                </select>
                                                                <div class="config-palette-select">
                                                                    <select id="ECLAIR_CHART_PALETTE_INPUT_8">
                                                                        <option value="0">默认调色板</option>
                                                                        <option value="1">灰色调色板</option>
                                                                        <option value="2">安全调色板</option>
                                                                    </select>
                                                                    <label class="assistive-text" for="ECLAIR_CHART_PALETTE_INPUT_8">调色板选择器</label>
                                                                    <div>
                                                                        <div class="config-preview-swatch" style="background-color: rgb(0, 161, 224);"></div>
                                                                        <div class="config-preview-swatch" style="background-color: rgb(22, 50, 92);"></div>
                                                                        <div class="config-preview-swatch" style="background-color: rgb(118, 222, 217);"></div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="config-config-item-line config-input config-input-boolean config-input-showValues">
                                                        <input class="config-boolean-selector" type="checkbox" id="ECLAIR_CHART_CONFIG_BOOLEAN_INPUT_4" v-model="chartForm.showChartValues" @change="changeChartShowValue">
                                                        <label class="config-boolean-selector-label label" for="ECLAIR_CHART_CONFIG_BOOLEAN_INPUT_4">显示值</label>
                                                    </div>
                                                    <div class="config-config-item-line config-input config-input-boolean config-input-showPercentage">
                                                        <input class="config-boolean-selector" type="checkbox" id="ECLAIR_CHART_CONFIG_BOOLEAN_INPUT_1" v-model="chartForm.showChartPercentages" @change="changeChartPercentages">
                                                        <label class="config-boolean-selector-label label" for="ECLAIR_CHART_CONFIG_BOOLEAN_INPUT_1">显示百分比</label>
                                                    </div>
                                                    <div class="config-config-item-line config-input config-input-boolean config-input-combineSmallGroups">
                                                        <input class="config-boolean-selector" type="checkbox" id="ECLAIR_CHART_CONFIG_BOOLEAN_INPUT_2" v-model="chartForm.combineSmallGroups" @change="changeChartCombineSmallGroups">
                                                        <label class="config-boolean-selector-label label" for="ECLAIR_CHART_CONFIG_BOOLEAN_INPUT_2">将小的小组合并为“其他”</label>
                                                    </div>
                                                    <div class="config-config-item-line config-input config-input-boolean config-input-showCenterValue">
                                                        <input class="config-boolean-selector" type="checkbox" id="ECLAIR_CHART_CONFIG_BOOLEAN_INPUT_3" v-model="chartForm.showChartTotal" @change="changeChartShowTotal">
                                                        <label class="config-boolean-selector-label label" for="ECLAIR_CHART_CONFIG_BOOLEAN_INPUT_3">显示总数</label>
                                                    </div>
                                                </template>
                                                <template v-if="chartForm.chartType == 'funnel'">
                                                    <div class="config-input config-input-measure">
                                                        <label class="label item-title" for="ECLAIR_CHART_CONFIG_BASE_INPUT_61">值</label>
                                                        <div class="config-config-item-line">
                                                            <div class="config-axis-container">
                                                                <label for="ECLAIR_CHART_CONFIG_BASE_INPUT_61" class="assistive-text"></label>
                                                                <select class="config-axis-selector measure" name="" v-model="chartForm.summarie" @change="changeChartSummarie">
                                                                    <option :value="item.key" v-for="(item, index) in aggregateList" :key="index">{{item.label}}</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="config-input config-input-measure">
                                                        <label class="label item-title">颜色标准</label>
                                                        <div class="config-config-item-line">
                                                            <div class="config-axis-container colorable">
                                                                <label for="ECLAIR_CHART_CONFIG_BASE_INPUT_62" class="assistive-text"></label>
                                                                <select class="config-axis-selector dimension" v-model="chartForm.yVal" @change="(e)=>changeChartVal(e, 0)">
                                                                    <option :value="item.field" v-for="(item, index) in chartData.groupingList" :key="index">{{item.label}}</option>
                                                                </select>
                                                                <div class="config-palette-select">
                                                                    <select id="ECLAIR_CHART_PALETTE_INPUT_8">
                                                                        <option value="0">默认调色板</option>
                                                                        <option value="1">灰色调色板</option>
                                                                        <option value="2">安全调色板</option>
                                                                    </select>
                                                                    <label class="assistive-text" for="ECLAIR_CHART_PALETTE_INPUT_8">调色板选择器</label>
                                                                    <div>
                                                                        <div class="config-preview-swatch" style="background-color: rgb(0, 161, 224);"></div>
                                                                        <div class="config-preview-swatch" style="background-color: rgb(22, 50, 92);"></div>
                                                                        <div class="config-preview-swatch" style="background-color: rgb(118, 222, 217);"></div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="config-config-item-line config-input config-input-boolean config-input-showValues">
                                                        <input class="config-boolean-selector" type="checkbox" id="ECLAIR_CHART_CONFIG_BOOLEAN_INPUT_4" v-model="chartForm.showChartValues" @change="changeChartShowValue">
                                                        <label class="config-boolean-selector-label label" for="ECLAIR_CHART_CONFIG_BOOLEAN_INPUT_4">显示值</label>
                                                    </div>
                                                    <div class="config-config-item-line config-input config-input-boolean config-input-showPercentage">
                                                        <input class="config-boolean-selector" type="checkbox" id="ECLAIR_CHART_CONFIG_BOOLEAN_INPUT_1" v-model="chartForm.showChartPercentages" @change="changeChartPercentages">
                                                        <label class="config-boolean-selector-label label" for="ECLAIR_CHART_CONFIG_BOOLEAN_INPUT_1">显示百分比</label>
                                                    </div>
                                                    <div class="config-config-item-line config-input config-input-boolean config-input-combineSmallGroups">
                                                        <input class="config-boolean-selector" type="checkbox" id="ECLAIR_CHART_CONFIG_BOOLEAN_INPUT_2" @change="changeChartCombineSmallGroups">
                                                        <label class="config-boolean-selector-label label" for="ECLAIR_CHART_CONFIG_BOOLEAN_INPUT_2">将小的小组合并为“其他”</label>
                                                    </div>
                                                </template>
                        
                                                <template v-if="chartForm.chartType=='scatter'">
                                                    <div class="config-input config-input-measure config-input-x">
                                                        <label class="label item-title" for="ECLAIR_CHART_CONFIG_BASE_INPUT_36">X 轴</label>
                                                        <div class="config-config-item-line">
                                                            <div class="config-axis-container">
                                                                <label for="ECLAIR_CHART_CONFIG_BASE_INPUT_36" class="assistive-text"></label>
                                                                <select class="config-axis-selector measure" v-model="chartForm.summarie" @change="changeChartSummarie">
                                                                    <option :value="item.key" v-for="(item, index) in aggregateList" :key="index">{{item.label}}</option>
                                                                </select>
                                                                <div class="config-axis-reference-line">
                                                                    <input class="config-axis-reference-line-checkbox" type="checkbox" v-model="chartForm.xRowShow" id="ECLAIR_CHART_REFERENCELINE_INPUT_8">
                                                                    <label class="label" for="ECLAIR_CHART_REFERENCELINE_INPUT_8">显示参考行</label>
                                                                    <div class="config-axis-reference-line-outerValueInputDiv" v-if="chartForm.xRowShow">
                                                                        <label class="label" for="ECLAIR_CHART_REFERENCELINE_INPUT_9">参考行值</label>
                                                                        <div class="config-axis-reference-line-innerValueInputDiv">
                                                                            <input type="number" step="any" class="config-axis-reference-line-valueInput" id="ECLAIR_CHART_REFERENCELINE_INPUT_9" v-model="chartForm.xRowVal">
                                                                            <div class="config-color-select-container">
                                                                                <el-color-picker v-model="chartForm.color1" />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>  
                                                        </div>
                                                    </div>
                                                    <div class="config-input config-input-measure config-input-y">
                                                        <label class="label item-title" for="ECLAIR_CHART_CONFIG_BASE_INPUT_37">Y 轴</label>
                                                        <div class="config-config-item-line">
                                                            <div class="config-axis-container">
                                                                <label for="ECLAIR_CHART_CONFIG_BASE_INPUT_37" class="assistive-text"></label>
                                                                <select class="config-axis-selector measure" name="" id="" v-model="chartForm.summarie2" @change="changeChartSummarie">
                                                                    <option :value="item.key" v-for="(item, index) in aggregateList" :key="index">{{item.label}}</option>
                                                                </select>
                                                                <div class="config-axis-reference-line">
                                                                    <input class="config-axis-reference-line-checkbox" type="checkbox" v-model="chartForm.yRowShow" id="ECLAIR_CHART_REFERENCELINE_INPUT_10">
                                                                    <label class="label" for="ECLAIR_CHART_REFERENCELINE_INPUT_10">显示参考行</label>
                                                                    <div class="config-axis-reference-line-outerValueInputDiv" v-if="chartForm.yRowShow">
                                                                        <label class="label" for="ECLAIR_CHART_REFERENCELINE_INPUT_11">参考行值</label>
                                                                        <div class="config-axis-reference-line-innerValueInputDiv">
                                                                            <input type="number" step="any" class="config-axis-reference-line-valueInput" id="ECLAIR_CHART_REFERENCELINE_INPUT_11" v-model="chartForm.yRowVal">
                                                                            <div class="config-color-select-container">
                                                                                <el-color-picker v-model="chartForm.color2" />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="config-input config-input-dimension">
                                                        <label class="label item-title" for="ECLAIR_CHART_CONFIG_BASE_INPUT_38">详细信息</label>
                                                        <div class="config-config-item-line">
                                                            <div class="config-axis-container">
                                                                <label for="ECLAIR_CHART_CONFIG_BASE_INPUT_38" class="assistive-text"></label>
                                                                <select class="config-axis-selector dimension" v-model="chartForm.detailVal">
                                                                    <option :value="item.field" v-for="(item, index) in chartData.groupingList" :key="index">{{item.label}}</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="config-config-item-line config-input config-input-or">
                                                        <label class="label item-title" for="ECLAIR_CHART_CONFIG_BASE_INPUT_39">添加</label>
                                                        <div class="config-or-container">
                                                            <select class="config-or-selector" id="ECLAIR_CHART_CONFIG_BASE_INPUT_39">
                                                                <option value="NONE">--无--</option>
                                                                <option value="0">颜色标准</option>
                                                            </select>
                                                        </div>
                                                        <div class="config-or-config-area">
                                                            <div class="config-input config-input-dimension config-input-color">
                                                                <label class="label item-title" for="ECLAIR_CHART_CONFIG_BASE_INPUT_40">颜色标准</label>
                                                                <div class="config-config-item-line">
                                                                    <div class="config-axis-container colorable">
                                                                        <label for="ECLAIR_CHART_CONFIG_BASE_INPUT_40" class="assistive-text"></label>
                                                                        <select class="config-axis-selector dimension" v-model="chartForm.colorStandardVal">
                                                                            <option :value="item.field" v-for="(item, index) in chartData.groupingList" :key="index">{{item.label}}</option>
                                                                        </select>
                                                                        <div class="config-palette-select">
                                                                            <select name="" id="ECLAIR_CHART_PALETTE_INPUT_7">
                                                                                <option value="0">默认调色板</option>
                                                                                <option value="1">灰色调色板</option>
                                                                                <option value="2">安全调色板</option>
                                                                            </select>
                                                                            <label class="assistive-text" for="ECLAIR_CHART_PALETTE_INPUT_7">调色板选择器</label>
                                                                            <div>
                                                                                <div class="config-preview-swatch" style="background-color: rgb(0, 161, 224);"></div>
                                                                                <div class="config-preview-swatch" style="background-color: rgb(22, 50, 92);"></div>
                                                                                <div class="config-preview-swatch" style="background-color: rgb(118, 222, 217);"></div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </template>
                                                <div class="config-config-item-line config-input config-input-enum config-input-legendPosition" v-if="['hbar','vbar','stackhbar','stackvbar','donut','funnel','scatter'].includes(chartForm.chartType)">
                                                    <label class="label item-title">图列位置</label>
                                                    <select class="config-enum-selector" id="ECLAIR_CHART_CONFIG_BASE_INPUT_41" v-model="chartForm.legendPosition" @change="changeChartPosition">
                                                        <option value="Right">右侧</option>
                                                        <option value="Bottom">底部</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="remove-chart-container">
                                                <a-button>移除图表</a-button>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </div>
                            <div class="widget-container widget-container_reportChatter" v-if="isShow && isFilterPanel"></div>
    
                            <div class="widget-container widget-container_queryBuilder" v-if="isShow && isFilterPanel">
                                <Filter :record="record" :categories="categories" :describeReport="describeReport" @params="changeParams" @close="closeFilter" />
                            </div>
                        </div>
                    </a-spin>
                </div>
            </div>
        </div>
        <SaveAsReport v-if="isSaveAs" :isShow="isSaveAs" @cancel="isSaveAs=false" />
        <Message v-if="isMessage" :messageText="reportMetadata.name" />
        <Export :isShow="isExport" v-if="isExport"  @cancel="isExport=false" />
        <Delete :isShow="isDelete" v-if="isDelete" desc="是否确定要删除此报表？" :recordId="id" sObjectName="report" :objTypeCode="9100" @cancel="isDelete=false" @ok="deleteSuccess" />
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
    nextTick,
    computed
  } from "vue";
  import {
    SearchOutlined,
    DownOutlined,
    UserOutlined,
  } from "@ant-design/icons-vue";
  import { message } from "ant-design-vue";

  import Field from "@/components/report/reportDesign/Field.vue";
  import Summary from "@/components/report/reportDesign/Summary.vue";
  import Filter from "@/components/report/reportRunHome/Filter.vue";
  import SaveAsReport from "@/components/report/reportRunHome/SaveAsReport.vue";
  import TableGrid from "@/components/report/reportDesign/TableGrid.vue";
  import TableGridGroup from "@/components/report/reportDesign/TableGrid2.vue";
  import TableGridAggregates from "@/components/report/reportDesign/TableGridAggregates.vue";
  import Chart from "@/components/report/reportDesign/Chart.vue";
  import Message from "@/components/report/Message.vue";
  import Delete from "@/components/listView/Delete.vue";
  import Export from "@/components/report/reportRunHome/ExportReport.vue";
  
  import Interface from "@/utils/Interface.js";
  const { proxy } = getCurrentInstance();
  import { useRouter, useRoute } from "vue-router";
  const router = useRouter();
  const route = useRoute();

  const nameRef = ref(null);
  const formState = reactive({
    autoPreview: false,
    hasRecordCount: false, // 行计数
    hasDetailRows: false, // 详细
    showSubtotals: false, // 小计
    showGrandTotal: false, // 总计
  })

  const data = reactive({
    isFormat: false,
    isNameFocus: false,
    name: "我的客户联系人",
    tabCurrent: 0,
    record: {},
    isShow: false,
    isField: true,
    id: route.query.id,
    reportMetadata: {
        aggregates: [],
        chart: {},
        crossFilters: [],
        currency: null,
        dashboardSetting: null,
        description: null,
        detailColumns: [],
        developerName: "",
        division: null,
        folderId: "",
        groupingsAcross: [],
        groupingsDown: [],
        hasDetailRows: true,
        hasRecordCount: true,
        historicalSnapshotDates: [],
        id: route.query.id,
        name: "",
        presentationOptions: {
            hasStackedSummaries: false
        },
        reportBooleanFilter: null,
        reportFilters: [], // 筛选器
        reportFormat: "",
        reportType: {

        },
        saveRoleHierarchy: true,
        scope: "organization",
        showGrandTotal: true,
        showSubtotals: true,
        sortBy: [],
        standardDateFilter: {

        },
        standardFilters: [],
        supportsRoleHierarchy: true,
        userOrHierarchyFilterId: null,
        customSummaryFormula: {},
        customDetailFormula: {},
        buckets: [],
        userOrHierarchyFilterName: null,
        dataCategoryFilters: [],
        aggregateFilters: []
    },
    runReportData: {},
    chartConfig: {
        title: "",
        showChartValues: false,
        showChartPercentages: false, // 显示百分比
        showChartTotal: false, // 显示总数
        combineSmallGroups: false, // 将小的小组合并为“其他”
        chartType: "",
        groupings: [],
        groupingColorPalette: "",
        summaries: [],
        summaryColors: [],
        referenceLineValues: [],
        referenceLineColors: [],
        summaryAxisLocations: ["Y"],
        legendPosition: ""
    },
    checked: false,
    color1: "",
    isChartPopup: false,
    chartData: {
        groupingList: [],
        groupings: [], // chart
    },
    aggregateList: [],
    isShowChart: true, // 是否显示图表
    isFilterPanel: false,
    isSaveAs: false,

    recordData: {},
    categories: [],
    count: 0,


    describeReport: {}, // 元数据

    isGroup: false, // 是否是分组列表
    isSaveChart: false,
    isMessage: false,
    isDelete: false,
    isExport: false,
    isLoading: false,
    queryScope: route.query.queryScope
  })

  const { isFormat, isNameFocus, name, tabCurrent, record, isShow,
     isField, id, reportMetadata, runReportData, chartConfig, checked,
      color1, isChartPopup, chartData, aggregateList, isShowChart, isFilterPanel,
       isSaveAs, recordData, categories, describeReport, isGroup, isSaveChart, isMessage, isDelete, isExport, isLoading, queryScope } = toRefs(data);

  const chartForm = reactive({
    title: "",
    chartType: "hbar",
    yVal: "", // Y轴值
    yGroupVal: "", // Y轴组
    xVal: "", // X轴值
    xGroupVal: "", // X轴组

    isYGroup: false, // y轴组是否显示
    isXGroup: false, // x轴组是否显示

    yRowShow: false, // y轴行是否显示
    xRowShow: false, // x轴行是否显示

    yRowVal: "",
    xRowVal: "",

    referenceLineValues: "", // 组行

    showChartValues: false, // 显示值
    showChartPercentages: false, // 显示百分比
    showChartTotal: false, // 显示总数
    combineSmallGroups: false, // 将小的小组合并为“其他”

    color1: "#3399ff",

    legendPosition: "", // 图列位置
    groupings: [],

    switchVal: "", // 切换标准
    colorStandardVal: "", // 颜色标准
    detailVal: "", // 详细信息
    summarie: "",
    summarie2: "",
    yName: "",
    summarieName: ""
  });

//   watch(()=>chartForm, (newVal, oldVal) => {
//     // console.log("watch-chartForm:", newVal);
//     data.chartConfig.chartType = newVal.chartType;
//     data.chartConfig.title = newVal.title;
//     data.chartConfig.groupings = newVal.groupings;
//     if(newVal.chartType!='scatter'){
//         data.chartConfig.summaries = [newVal.summarie];
//         data.chartConfig.referenceLineValues = [newVal.xRowVal];
//         data.chartConfig.referenceLineColors = [newVal.color1];
//     }else {
//         data.chartConfig.summaries = [newVal.summarie, newVal.summarie2];
//         data.chartConfig.referenceLineValues = [newVal.xRowVal, newVal.yRowVal];
//         data.chartConfig.referenceLineColors = [newVal.color1, newVal.color2];
//     }
//     data.chartConfig.showChartValues = newVal.showChartValues;
//     data.chartConfig.showChartPercentages = newVal.showChartPercentages;
//     data.chartConfig.combineSmallGroups = newVal.combineSmallGroups;
//     data.chartConfig.showChartTotal = newVal.showChartTotal;
//     data.chartConfig.legendPosition = newVal.legendPosition;
//   }, {deep: true, immediate: true});

  
  watch(()=>chartForm.isYGroup, (newVal,oldVal)=>{
    if(newVal){
        chartForm.groupings = [chartForm.yVal, chartForm.yGroupVal];
    }else {
        chartForm.groupings = [chartForm.yVal];
    }
    data.chartConfig.groupings = chartForm.groupings;
    data.reportMetadata.chart = data.chartConfig;
    data.isSaveChart = true;
  }, {deep: true, immediate: false});


  // y添加组2
  const chartAddYGroup = () => {
    chartForm.isYGroup = true;
  };
  const chartDeleteYGroup = () => {
    chartForm.isYGroup = false;
  }

  const changeChartType = (type) => {
    chartForm.chartType = type;
    data.chartConfig.chartType = type;
    data.reportMetadata.chart = data.chartConfig;
    data.isSaveChart = true;
    setChartVal();
  }

  const changeParams = (name, val) => {
    // console.log('name',name, val);
    data.reportMetadata[name] = val;
    // console.log("reportMetadata:", data.reportMetadata);
  }

  // 分组行
  const changeGroupRow = (item) => {
    let reportMetadata = JSON.parse(JSON.stringify(data.reportMetadata));
    let index = reportMetadata.detailColumns.findIndex(row=>row==item.field);
    reportMetadata.detailColumns.splice(index, 1);
    reportMetadata.groupingsDown.push({
        dateGranularity: "None",
        name: item.field,
        sortAggregate: null,
        sortOrder: "Desc"
    });
    // console.log("reportMetadata", reportMetadata);
    data.reportMetadata = reportMetadata;
  }
  
    // 列
    watch(()=>data.reportMetadata.detailColumns, (newVal,oldVal)=>{
        let newStr = JSON.stringify(newVal);
        let oldStr = JSON.stringify(oldVal);
        if(newStr==oldStr){

        }else if(oldVal.length==0){

        }else {
            handleSaveReport();
        }
    },{deep: true});

      // 组行
  watch(()=>data.reportMetadata.groupingsDown, (newVal,oldVal)=>{
    // console.log("组行watch", newVal,oldVal);
    let newStr = JSON.stringify(newVal);
    let oldStr = JSON.stringify(oldVal);
    if(newStr==oldStr){

    }else if(oldVal.length==0){

    }else {
        handleSaveReport();
    }
  },{deep: true});

  watch(()=> data.reportMetadata.reportFilters, (newVal, oldVal)=> {
    // console.log('watch-reportFilters:', newVal, oldVal);
    let newStr = JSON.stringify(newVal);
    let oldStr = JSON.stringify(oldVal);
    if(newStr==oldStr){

    }else if(oldVal.length==0){

    }else {
        handleSaveReport();
    }
  }, {deep: true});

    // 排序
    watch(()=> data.reportMetadata.sortBy, (newVal, oldVal)=> {
        console.log('watch-sortBy:', newVal, oldVal);
        let newStr = JSON.stringify(newVal);
        let oldStr = JSON.stringify(oldVal);
        if(newStr==oldStr){

        }else if(oldVal.length==0){

        }
        else {
            handleSaveReport();
        }
    },{deep: true});

    // 汇总
    watch(()=> data.reportMetadata.aggregates, (newVal, oldVal)=>{
        // console.log('aggregates:', newVal, oldVal);
        let newStr = JSON.stringify(newVal);
        let oldStr = JSON.stringify(oldVal);
        if(newStr==oldStr){

        }else if(oldVal.length==0){

        }else {
            handleSaveReport();
        }
    });

    watch(()=> data.isSaveChart, (newVal, oldVal)=>{
        console.log("watch-data.isSaveChart",newVal, oldVal);
        if(newVal){
            handleSaveReport();
        }
    })

    const changeChartTitle = () => {
        data.chartConfig.title = chartForm.title;
        data.reportMetadata.chart = data.chartConfig;
        data.isSaveChart = true;
    }

    const changeChartSummarie = (e) => {
        if(chartForm.chartType!='scatter'){
            data.chartConfig.summaries = [chartForm.summarie];
            data.chartConfig.referenceLineValues = [chartForm.xRowVal];
            data.chartConfig.referenceLineColors = [chartForm.color1];
        }else {
            data.chartConfig.summaries = [chartForm.summarie, chartForm.summarie2];
            data.chartConfig.referenceLineValues = [chartForm.xRowVal, chartForm.yRowVal];
            data.chartConfig.referenceLineColors = [chartForm.color1, chartForm.color2];
        }
        data.reportMetadata.chart = data.chartConfig;
        data.isSaveChart = true;
    }

    const changeChartShowValue = () => {
        data.chartConfig.showChartValues = chartForm.showChartValues;
        data.reportMetadata.chart = data.chartConfig;
        data.isSaveChart = true;
    }

    const changeChartPercentages = () => {
        data.chartConfig.showChartPercentages = chartForm.showChartPercentages;
        data.reportMetadata.chart = data.chartConfig;
        data.isSaveChart = true;
    }

    const changeChartCombineSmallGroups = () => {
        data.chartConfig.combineSmallGroups = chartForm.combineSmallGroups;
        data.reportMetadata.chart = data.chartConfig;
        data.isSaveChart = true;
    }

    const changeChartShowTotal = () => {
        data.chartConfig.showChartTotal = chartForm.showChartTotal;
        data.reportMetadata.chart = data.chartConfig;
        data.isSaveChart = true;
    }


    const changeChartPosition = () => {
        data.chartConfig.legendPosition = chartForm.legendPosition;
        data.reportMetadata.chart = data.chartConfig;
        data.isSaveChart = true;
        // console.log("data.reportMetadata.chart", data.reportMetadata.chart);
    }

    const handleShowFilter = () => {
        data.isFilterPanel = !data.isFilterPanel;
        runReport();
    }
    // 关闭筛选器
    const closeFilter = () => {
        data.isFilterPanel = false;
    }

  onMounted(()=>{
    window.addEventListener("click", (e)=>{
        e.stopPropagation();
        data.isFormat = false;
        data.isChartPopup = false;
    })
  })
  const getMetaData = () => {
    let obj = {
        actions: [{
            id: "3514;a",
            descriptor: "",
            callingDescriptor: "UNKNOWN",
            params: {
                reportId: data.id
            }
        }]
    }
    let d = {
        message: JSON.stringify(obj)
    }
    proxy.$post(Interface.report.reportDesign.describeReport, d).then(res=>{
      let record = JSON.parse(JSON.stringify(res.actions[0].returnValue));
      data.categories = record.reportTypeMetadata.categories;
      data.record = JSON.parse(JSON.stringify(res.actions[0].returnValue));
      data.describeReport = JSON.parse(JSON.stringify(res.actions[0].returnValue));

      
      let { reportType, reportFormat, standardDateFilter, standardFilters,
         hasRecordCount, hasDetailRows, showSubtotals, showGrandTotal, name, groupingsDown } = record.reportMetadata;
        //  if(record.reportMetadata.chart.groupings.length == 0 && record.reportMetadata.groupingsDown.length){
        //     record.reportMetadata.chart.groupings = record.reportMetadata.groupingsDown.map(item=>item.name);
        // }

      let datareportMetadata = JSON.parse(JSON.stringify(data.reportMetadata))
      for(let key in datareportMetadata){
        if(record.reportMetadata[key]!=undefined){
            data.reportMetadata[key] = record.reportMetadata[key];
        }
      }
      
      formState.hasRecordCount = hasRecordCount; // 行计数
      formState.hasDetailRows = hasDetailRows;
      formState.showSubtotals = showSubtotals; // 小计
      formState.showGrandTotal = showGrandTotal; // 合计
      data.isShow = true;
      runReport();
    })
  }
  getMetaData();


  watch(()=>data.reportMetadata.groupingsDown, (newVal, oldVal)=>{
    if(newVal.length>=1){
        data.reportMetadata.reportFormat = "SUMMARY";
        data.isGroup = true;
    }else {
        data.reportMetadata.reportFormat = "TABULAR";
    }
  }, {deep: true})

  
  const runReport = () => {
    data.isLoading = true;
    let obj = {
        actions:[{
            id: "2309;a",
            descriptor: "",
            callingDescriptor: "UNKNOWN",
            params: {
                reportId: data.id,
                reportMetadata: JSON.stringify(data.reportMetadata),
                isPreview: formState.isPreview,
                createReportInstance: false,
                fastCsv: false,
                requestOrigin: "rbpv",
                includeChartData: false,
                skipReportResult: false
            },
            storable: true
        }]
    }
    let d = {
        message: JSON.stringify(obj)
    }
    proxy.$post(Interface.report.reportDesign.runReportNew, d).then(res=>{

        let state;
        if(res && res.actions[0].state){
            state = res.actions[0].state;
        }

        if(state=='SUCCESS'){
            data.isSaveChart = false;
            let groupingList = [];
            let runReportData = JSON.parse(JSON.stringify(res.actions[0].returnValue));
            data.runReportData = JSON.parse(JSON.stringify(runReportData));
            data.record = JSON.parse(JSON.stringify(res.actions[0].returnValue));
            let { reportType, reportFormat, standardDateFilter, standardFilters, hasRecordCount, hasDetailRows, showSubtotals, showGrandTotal, groupingsDown } = runReportData.reportMetadata;
            let factMap = runReportData.factMap;
            data.reportMetadata.reportType = reportType;
            data.reportMetadata.reportFormat = reportFormat;
            data.reportMetadata.standardDateFilter = standardDateFilter;
            data.reportMetadata.standardFilters = standardFilters;
            formState.hasRecordCount = hasRecordCount;
            formState.hasDetailRows = hasDetailRows;
            formState.showSubtotals = showSubtotals;
            formState.showGrandTotal = showGrandTotal;
            data.isShow = true;
            let { reportExtendedMetadata, reportMetadata, chartData } = runReportData;
            data.reportMetadata.aggregates = reportMetadata.aggregates;
            
            let aggregates = [];
            reportMetadata.aggregates.forEach((item, index)=>{
                let num;
                let label;
                if(item.indexOf('!')!=-1){
                    let type = item.split('!')[0];
                    let field = item.split('!')[1];
                    let typeLabel;
                    let fieldLabel = reportExtendedMetadata.detailColumnInfo[field].label;
                    switch(type){
                    case 's':
                        typeLabel = '总和';
                        break;
                    case 'a':
                        typeLabel = '平均';
                        break;
                    case 'mx':
                        typeLabel = '最大值';
                        break;
                    case 'm':
                        typeLabel = '最新值';
                        break;
                    }
                    label = fieldLabel + ' ' + typeLabel;
                }else if(item == 'RowCount'){
                    label = '记录计数';
                }
                num = factMap['T!T'].aggregates[index].value;
                aggregates.push({
                    key: item,
                    label: label,
                    num: num
                })
            });
            data.aggregateList = aggregates;
            console.log('aggregateList', aggregates)
            chartForm.summarie = aggregates[0].key;
            chartForm.summarie2 = aggregates[0].key;
            let groupingColumnInfo = reportExtendedMetadata.groupingColumnInfo;
            let chart = reportMetadata.chart;


            if(chart.summaries.length){
                chartForm.summarie = chart.summaries[0];
                if(chart.summaries.length>1){
                    chartForm.summarie2 = chart.summaries[1];
                }else {
                    chartForm.summarie2 = chart.summaries[0];
                }
            }
            chartForm.title = chart.title;
            chartForm.chartType = chart.chartType;
            chartForm.legendPosition = chart.legendPosition;
            chartForm.showChartValues = chart.showChartValues;
            chartForm.showChartPercentages = chart.showChartPercentages;
            chartForm.combineSmallGroups = chart.combineSmallGroups;
            chartForm.showChartTotal = chart.showChartTotal;

            if(chart.groupings.length){
                chartForm.yVal = chart.groupings[0];
                if(chart.groupings.length>1){
                    chartForm.yGroupVal = chart.groupings[1];
                }
            }

            // chart.groupings.forEach(item=>{
            //     if(groupingColumnInfo[item]){
            //         groupingColumnInfo[item].field = item;
            //         groupingList.push(groupingColumnInfo[item])
            //     }
            // });
            groupingsDown.forEach(item=>{
                if(groupingColumnInfo[item.name]){
                    groupingColumnInfo[item.name].field = item.name;
                    groupingList.push(groupingColumnInfo[item.name]);
                }
            });
            data.chartData.groupingList = groupingList;
            data.chartData.groupings = chart.groupings;
            setChartVal();
            // console.log("groupingList:", groupingList);
            data.isLoading = false;
        }

    })
  }
  const setChartVal = () => {
    if(chartForm.yVal==''){
        chartForm.yVal =  data.chartData.groupingList[0]?.field;
    }
    chartForm.yGroupVal = data.chartData.groupingList.filter(item=>item.field!=chartForm.yVal)[0]?.field;
    if(chartForm.chartType == 'donut'){
        chartForm.switchVal =  data.chartData.groupings[0];
    }else if(chartForm.chartType == 'funnel'){
        chartForm.colorStandardVal =  data.chartData.groupings[0];
    }else if(chartForm.chartType == 'scatter'){
        chartForm.detailVal =  data.chartData.groupings[0];
        chartForm.colorStandardVal =  data.chartData.groupings[0];
    }

    if(chartForm.isYGroup){
        chartForm.groupings = [chartForm.yVal, chartForm.yGroupVal];
    }else {
        chartForm.groupings = [chartForm.yVal];
    }

    data.chartConfig.chartType = chartForm.chartType;
    data.chartConfig.title = chartForm.title;
    data.chartConfig.groupings = chartForm.groupings;
    if(chartForm.chartType!='scatter'){
        data.chartConfig.summaries = [chartForm.summarie];
        data.chartConfig.referenceLineValues = [chartForm.xRowVal];
        data.chartConfig.referenceLineColors = [chartForm.color1];
    }else {
        data.chartConfig.summaries = [chartForm.summarie, chartForm.summarie2];
        data.chartConfig.referenceLineValues = [chartForm.xRowVal, chartForm.yRowVal];
        data.chartConfig.referenceLineColors = [chartForm.color1, chartForm.color2];
    }
    data.chartConfig.showChartValues = chartForm.showChartValues;
    data.chartConfig.showChartPercentages = chartForm.showChartPercentages;
    data.chartConfig.combineSmallGroups = chartForm.combineSmallGroups;
    data.chartConfig.showChartTotal = chartForm.showChartTotal;
    data.chartConfig.legendPosition = chartForm.legendPosition;
    // console.log('chartform', chartForm);
  }
  

  const changeChartVal = (e, index) => {
    var name;
    if(index == 0){
        name = chartForm.yVal;
    }else {
        name = chartForm.yGroupVal;
    }
    // console.log("name", name);
    
    if( chartForm.isYGroup && chartForm.yVal == chartForm.yGroupVal){
        let arr =  data.chartData.groupings.filter(item=>item!=name);
        if(index==0){
            chartForm.yGroupVal = arr[0];
        }
        if(index==1){
            chartForm.yVal = arr[0];
        }
    }
    if(chartForm.isYGroup){
        chartForm.groupings = [chartForm.yVal, chartForm.yGroupVal];
    }else {
        chartForm.groupings = [chartForm.yVal];
    }
    data.chartConfig.groupings = chartForm.groupings;
    data.reportMetadata.chart = data.chartConfig;
    data.isSaveChart = true;
  }

  const yName = computed(()=>{
    let row = data.chartData.groupingList.find(item=>item.field==chartForm.yVal);
    let label = row && row.label;
    return label;
  });
  const summarieName = computed(()=>{
    let row = data.aggregateList.find(item=>item.key==chartForm.summarie);
    let label = row && row.label;
    return label;
  });

  const summarieLabels = computed(()=>{
    // let arr = data.aggregateList.filter(item=>{
    //     return data.chartConfig.summaries.find(row=>{
    //         return row == item.key;
    //     });
    // });
    let list = [];
    data.chartConfig.summaries.forEach(item=>{
        let row = data.aggregateList.find(row=>row.key==item);
        if(row){
            list.push(row.label);
        }
    })
    // let list = arr.map(item=>item.label);
    return list;
  })
  // 图表属性
  const handleShowChartConfig = () => {
    data.isChartPopup = !data.isChartPopup;
  }

  const handleActionMenu = (e) => {
    switch(e.key){
        case '1':
            data.isSaveAs = true;
            break;
        case 'save':
            handleSaveReport();
            break;
        case 'export':
            data.isExport = true;
            break;
        case 'delete':
            data.isDelete = true;
            break;
    }
  }

  const handleRefresh = () => {
    runReport();
  }

  const deleteSuccess = () => {
    router.push({
        name: "ReportHome",
        query: {
            queryScope: data.queryScope
        }
    })
  }

  const handleEdit = () =>{
    router.push({
        name: 'ReportDesign',
        query: {
            id: data.id,
            queryScope: data.queryScope
        }
    })
  }

  const handleSaveReport = () => {
    let obj = {
        actions:[{
            id: "577;a",
            descriptor: "",
            callingDescriptor: "UNKNOWN",
            params: {
                reportId: data.id,
                reportMetadata: JSON.stringify(data.reportMetadata),
                isPreview: formState.isPreview,
                createReportInstance: false,
                fastCsv: false,
                requestOrigin: "rbpv",
                includeChartData: false,
                skipReportResult: false
            },
            storable: true
        }]
    }
    let d = {
        message: JSON.stringify(obj)
    }
    proxy.$post(Interface.report.reportDesign.saveReport, d).then(res=>{
        data.isMessage = true;
        setTimeout(() => {
            data.isMessage = false;
        }, 2000);
        runReport();
    })
  }

  //行计数
  const changeHasRecordCount = () => {
    // console.log("hasRecordCount", formState.hasRecordCount);
    // console.log("aggregates", data.reportMetadata.aggregates)
    let index = data.reportMetadata.aggregates.findIndex(item=>item=='RowCount');
    data.reportMetadata.hasRecordCount = formState.hasRecordCount;
    if(formState.hasRecordCount){
        if(index==-1){
            data.reportMetadata.aggregates.push('RowCount')
        }
    }else {
        if(index!=-1){
            data.reportMetadata.aggregates.splice(index, 1);
        }
    }
    handleSaveReport();
  };

  // 详细信息行
  const changeHasDetailRows = () => {
    data.reportMetadata.hasDetailRows = formState.hasDetailRows;
    handleSaveReport();
  }

  // 小计
  const changeShowSubtotals = () => {
    data.reportMetadata.showSubtotals = formState.showSubtotals;
    handleSaveReport();
  }
  // 合计
  const changeShowGrandTotal = () => {
    data.reportMetadata.showGrandTotal = formState.showGrandTotal;
    handleSaveReport();
  }
</script>
<style lang="less" scoped>
    .wrapper{
        height: 100vh;
        padding: 12px 12px 0 12px;
        background: #b0c4df;
        position: relative;
        z-index: 1;
        /* &::before{
            position: fixed;
            top: 5.625rem;
            height: 12.5rem;
            content: '';
            display: block;
            right: 0;
            bottom: 0;
            left: 0;
            background-image: url("~@/assets/img/lightning_blue_background.png");
            background-position: top left;
            background-repeat: no-repeat;
            background-size: cover;
        } */
        .dashboard-container{
            width: 100%;
            height: 100%;
            position: relative;
            .report-header{
                padding: 8px 16px;
                border-bottom: 1px solid #c9c9c9;
                background: #f3f3f3;
                background-clip: padding-box;
                border: 1px solid #c9c9c9;
                z-index: 5;
                position: relative;
                height: 66px;
                border-radius: 0;
                box-shadow: none;
                border-radius: 4px 4px 0 0;
                .page-header__row{
                    display: flex;
                    .page-header__col-title{
                        flex: 1 1 0%;
                        min-width: 0;
                        .media{
                            display: flex;
                            align-items: flex-start;
                            .media__figure{
                                margin-right: 12px;
                                .icon_container{
                                    display: inline-block;
                                    border-radius: 4px;
                                    line-height: 1;
                                    &.icon-standard-report{
                                        background: #06a59a;
                                    }
                                    .page-header__icon{
                                        width: 36px;
                                        height: 36px;
                                        fill: #fff;
                                    }
                                }
                            }
                            .media__body{
                                flex: 1;
                                min-width: 0;
                                .page-header__name{
                                    display: inline-block;
                                    padding-right: 8px;
                                    max-width: 100%;
                                    .page-header__name-title{
                                        h1{
                                            font-size: 14px;
                                            line-height: 1;
                                            font-weight: inherit;
                                            .page-header__title{
                                                max-width: 100%;
                                                overflow: hidden;
                                                text-overflow: ellipsis;
                                                white-space: nowrap;
                                                font-weight: 700;
                                                line-height: 1.25;
                                                display: block;
                                                font-size: 18px;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    .page-header__col-actions{
                        vertical-align: middle;
                        align-self: center;
                        .action-bars{
                            display: flex;
                        }
                    }
                }
            }
            .dashboard-builder-body{
                width: 100%;
                height: calc(~"100% - 66px");
                background: #fff;
                /* border-radius: 0 0 4px 4px;
                overflow: hidden; */
                .widget-grid{
                    width: 100%;
                    height: 100%;
                    .widgets{
                        width: 100%;
                        height: 100%;
                        display: flex;
                        flex-direction: row;
                        .widget-container_scroll-container{
                            width: 100%;
                            height: 100%;
                            position: relative;
                            padding-bottom: 27px;
                            .dashboard-widget{
                                width: 100%;
                                height: 100%;
                                .widgets{
                                    display: flex;
                                    flex-direction: column;
                                    position: static;
                                    overflow: auto;
                                    .widget-container{
                                        height: auto;
                                        &.widget-container_chart{
                                            height: 90%;
                                            max-height: 350px;
                                            border-bottom: 1px solid #c9c9c9;
                                        }
                                        &.widget-container_table{
                                            width: auto;
                                            position: static;
                                            display: block;
                                        }
                                        &.widget-container_settings{
                                            position: absolute;
                                            z-index: 4;
                                            bottom: 0;
                                            width: 100%;
                                            /* width: calc(~"100% - 24px"); */
                                            &.active{
                                                width: calc(~"100% - 254px");
                                            }
                                            .settings-footer-widget{
                                                background: #f3f3f3;
                                                display: flex;
                                                align-items: center;
                                                bottom: 0;
                                                border-top: 1px solid #c9c9c9;
                                                .settings-toggle-buttons{
                                                    display: flex;
                                                    .form-element{
                                                        display: flex;
                                                        padding: 4px 8px;
                                                        .form-element__label{
                                                            padding-right: 8px;
                                                        }
                                                    }
                                                }
                                                .conditional-formatting-button{
                                                    margin-left: auto;
                                                    display: flex;
                                                    align-items: center;
                                                    color: #444;
                                                    border-left: 1px solid #c9c9c9;
                                                    border-right: 1px solid #c9c9c9;
                                                    border-radius: 0;
                                                    padding-left: 6px;
                                                    padding-right: 8px;
                                                    white-space: normal;
                                                    cursor: pointer;
                                                    height: 33px;
                                                    line-height: 33px;
                                                    .btn_icon{
                                                        width: 18px;
                                                        height: 18px;
                                                    }
                                                }
                                            }
                                        }
                                    }
                                    .widget-container_reportMetrics{
                                        .metrics-widget{
                                            overflow: visible;
                                            height: 100%;
                                            border-bottom: 1px solid #c9c9c9;
                                            padding-bottom: 12px;
                                            li{
                                                display: inline-block;
                                                padding-left: 24px;
                                                .metricsElement{
                                                    white-space: nowrap;
                                                }
                                                .metricsTitle{
                                                    font-size: 12px;
                                                    padding-top: 12px;
                                                    padding-bottom: 4px;
                                                    color: #747474;
                                                    max-width: 192px;
                                                    overflow: hidden;
                                                    text-overflow: ellipsis;
                                                }
                                                .metricsValue{
                                                    font-size: 16px;
                                                    color: #032d60;
                                                }
                                            }
                                        }
                                    }
                                    .widget-container_chartPanel{
                                        .chart-switcher-container{
                                            display: flex;
                                            justify-content: flex-end;
                                            margin: 8px 8px 0 8px;
                                            padding: 8px 8px 0 8px;
                                            align-items: center;
                                        }
                                    }
                                }
                            }
                        }
                        .widget-container_reportChatter{

                        }
                        .widget-container_queryBuilder{
                            width: 275px;
                            border-left: 1px solid #c7d4e1;
                            position: initial;
                        }
                    }
                }
            }
        }
    }
    .popoverWrap{
        border-radius: 4px;
        width: 320px;
        min-height: 32px;
        z-index: 6000;
        background: #fff;
        display: inline-block;
        box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.16);
        border: 1px solid #c9c9c9;
        outline: 0px;
        position: absolute;
        top: 125px;
        right: 22px;
        &::before{
            width: 16px;
            height: 16px;
            position: absolute;
            transform: rotate(45deg);
            content: '';
            background-color: inherit;
            left: 50%;
            top: -8px;
            margin-left: -8px;
        }
        &::after{
            width: 16px;
            height: 16px;
            position: absolute;
            transform: rotate(45deg);
            content: '';
            background-color: inherit;
            left: 50%;
            top: -8px;
            margin-left: -8px;
        }
        .popover__body{
            padding: 12px;
        }
    }
    .popoverWrap.reportEclairConfigurerContainer{
        &::before{
            left: auto;
            right: 24px;
            top: -8px;
            margin-right: -8px;
        }
        &::after{
            box-shadow: -1px -1px 0 0 rgba(0, 0, 0, 0.16);
            z-index: -1;
            left: auto;
            right: 24px;
            top: -8px;
            margin-right: -8px;
        }
        .popover__body{
            padding: 0;
        }
    }
    .analytics-eclair-configurer{
        background-color: #fff;
        display: flex;
        flex-direction: column;
        max-height: calc(~"100vh - 300px");
        overflow: auto;
        .chart-selector{
            min-width: 287px;
            border-bottom: 1px solid #f3f3f3;
            margin: 0 16px;
            padding-bottom: 8px;
            .chart-selector-title{
                padding: 16px 16px 8px 0;
                color: #747474;
            }
            .config-input-chartselector{
                display: flex;
                flex-wrap: wrap;
                .chartTypeItem{
                    margin: 0 5px 5px 0;
                    border-radius: 4px;
                    display: inline-block;
                    vertical-align: top;
                    width: 68px;
                    height: 75px;
                    text-align: center;
                    cursor: pointer;
                    background: #fff;
                    
                    .icon{
                        width: 48px;
                        height: 48px;
                        fill: #5c7a99;
                    }
                    .chart-type-label{
                        font-size: 10px;
                        position: relative;
                        top: -3px;
                        padding: 0 2px;
                        height: 20px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }
                    &:hover{
                        background: #f3f3f3;
                    }
                    &.active{
                        background-color: #1b96ff;
                        .icon{
                            fill: #fff;
                        }
                        .chart-type-label{
                            color: #fff;
                        }
                    }
                }
                .chartTypeItem:nth-child(4n){
                    margin-right: 0;
                }
            }
        }
        .chart-config-title{
            padding: 16px 16px 0 16px;
            font-size: 14px;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
            font-weight: inherit;
            color: #747474;
        }
        .config-selector{
            padding: 0 0 0 5%;
            width: 95%;
            font-size: 14px;
            .label{
                font-size: 12px;
                color: #747474;
            }
            select{
                color: inherit;
                font: inherit;
                margin: 0;
                appearance: none;
                background: #fff;
                &:focus{
                    background-color: #fff;
                    box-shadow: 0 0 3px #0176d3;
                    border-color: #0176d3;
                    border-radius: 4px;
                    outline: none;
                }
            }
            .config-axis-selector{
                width: 100%;
                border-radius: .25rem;
                border: 1px solid #c9c9c9;
                padding: 8px 10% 8px 8px;
                display: inline-block;
            }
            .config-input{
                .item-title{
                    display: inline-block;
                    width: 100%;
                    padding: 16px 0 8px 0;
                }
                .config-string{
                    line-height: 30px;
                    transition: border .1s linear, background-color .1s linear;
                    width: 100%;
                    border: 1px solid #c9c9c9;
                    border-radius: 4px;
                    background-color: #fff;
                    padding: 8px;
                    &:focus{
                        background-color: #fff;
                        box-shadow: 0 0 3px #0176d3;
                        border-color: #0176d3;
                        border-radius: .25rem;
                        outline: none;
                    }
                }
                .config-boolean-selector{
                    float: left;
                    margin: 2px 8px 0 0;
                }
            }
            .config-input-boolean{
                margin: 16px 0 8px 0;
            }
            .config-config-item-line:not(:first-child){
                margin-top: 4px;
            }
            .config-config-item-line{
                display: flex;
                .config-axis-container{
                    display: flex;
                    flex-flow: row wrap;
                    flex-grow: 1;
                    flex-basis: 0%;
                    .left_inp{
                        width: 100%;
                        flex: 1 0 0;
                    }
                    .config-color-select-container{
                        width: 20px;
                        height: 20px;
                        margin: 1px 3px 0 4px;
                    }
                    .config-axis-reference-line{
                        padding: .5rem 0 0 0;
                        flex-basis: 100%;
                    }
                    .assistive-text{
                        position: absolute;
                        border: 0;
                        clip: rect(0, 0, 0, 0);
                        width: 1px;
                        height: 1px;
                        margin: -1px;
                        padding: 0;
                        overflow: hidden;
                    }
                    label{
                        color: #747474;
                        font-size: 12px;
                    }
                    .config-axis-selector{
                        flex: 1 0 0;
                    }
                }
            }
            .config-input-text{
                width: 100%;
                display: inline-block;
            }
            .option-field-buttons{
                margin-top: 4px;
                .optional-field-plus{
                    border: none;
                    background-color: transparent;
                    height: 39px;
                    display: block;
                    cursor: pointer;
                }
            }
            .config-palette-select{
                width: 12px;
                height: 100%;
                margin: 1px 3px 0 4px;
                position: relative;
                &>div{
                    display: flex;
                    flex-direction: column;
                    width: 1rem;
                    height: 94%;
                    padding-left: 0;
                }
                select{
                    appearance: none;
                    opacity: .0001;
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    &:focus{
                        background-color: #fff;
                        box-shadow: 0 0 3px #0176d3;
                        border-color: #0176d3;
                        border-radius: 4px;
                        outline: none;
                    }
                }
                .config-preview-swatch{
                    width: 12px;
                    height: 12px;
                    display: inline-block;
                    &:first-child{
                        border-radius: 2px 2px 0 0;
                    }
                    &:last-child{
                        border-radius: 0 0 2px 2px;
                    }
                }
            }
            .option-field-minus{
                border: none;
                background-color: transparent;
                height: 39px;
                cursor: pointer;
                img{
                    height: 20px;
                    width: 20px;
                    left: 50%;
                    top: 50%;
                    margin: 0 -4px -4px 4px;
                    vertical-align: middle;
                }
            }
            .config-input-or,.config-input-enum{
                display: inline;
            }
            .config-or-selector,.config-enum-selector{
                display: block;
                border-radius: 4px;
                border: 1px solid #c9c9c9;
                padding: 8px 10% 8px 8px;
                flex-grow: 1;
                flex-shrink: 0;
                flex-basis: 0;
                width: 100%;
                line-height: 16px;
            }
            .config-axis-reference-line{
                padding: 8px 0 0 0;
                flex-basis: 100%;
                .config-axis-reference-line-checkbox{
                    margin-right: 8px;
                }
                .config-axis-reference-line-outerValueInputDiv{
                    display: block;
                    label{
                        display: block;
                        padding: 8px 0;
                        color: #747474;
                        font-size: 12px;
                    }
                    .config-axis-reference-line-innerValueInputDiv{
                        display: flex;
                        input[type=number]{
                            max-width: 89%;
                            width: 100%;
                            border-radius: 4px;
                            border: 1px solid #eaeaea;
                            padding: 4px;
                            &:focus{
                                background-color: #fff;
                                box-shadow: 0 0 3px #0176d3;
                                outline: none;
                            }
                        }
                        .config-color-select-container{
                            width: 20px;
                            height: 20px;
                            margin: 1px 3px 0 4px;
                        }
                    }
                }
            }
            .config-or-config-area{
                position: relative;
            }
        }
        .remove-chart-container{
            border-top: 1px solid #c9c9c9;
            margin: 16px 5%;
            padding-top: 16px;
            text-align: center;
        }
    }
</style>
<style lang="less">
    .el-color-dropdown{
        z-index: 99999 !important;
    }
    .el-color-picker__trigger{
        width: 20px !important;
        height: 20px !important;
        padding: 0 !important;
        border: none !important;
        border-radius: 4px;
    }
    .el-color-picker__color{
        border: none !important;
    }
    .ant-btn-icon.ant-btn-primary{
        .btn_icon{
            fill: #fff;
        }
    }
    .pageHeaderWrap{
        z-index: 1 !important;
    }
    .ant-spin-nested-loading,.ant-spin-container{
        width: 100%;
        height: 100% !important;
    }
    .btn_icon {
        width: 14px;
        height: 14px;
        fill: currentColor;
        vertical-align: middle;
    }
    .btn_icon.btn_icon_left {
        margin-right: 8px;
        vertical-align: middle;
    }
    .fh-btn-icon {
        display: inline-flex;
        color: #747474;
        align-items: center;
        cursor: pointer;
        background: transparent;
    }
</style>