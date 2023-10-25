<template>
    <div class="weekWrap">
        <div class="weekCalendar">
            <div class="weekCalendarHead">
                <div class="timeZone">
                    时间
                </div>
                <div class="calendarDayHeaders">
                    <div class="weekDayHeadItem">10月22日 (周日)</div>
                    <div class="weekDayHeadItem">10月22日 (周日)</div>
                    <div class="weekDayHeadItem">10月22日 (周日)</div>
                    <div class="weekDayHeadItem">10月22日 (周日)</div>
                    <div class="weekDayHeadItem">10月22日 (周日)</div>
                    <div class="weekDayHeadItem">10月22日 (周日)</div>
                    <div class="weekDayHeadItem">10月22日 (周日)</div>
                </div>
            </div>
            <div class="weekCalendarBody" ref="weekRef">
                <div class="timeBox">
                    <strong></strong>
                    <strong>
                        <span>06:00</span>
                    </strong>
                    <strong>
                        <span>07:00</span>
                    </strong>
                    <strong>
                        <span>08:00</span>
                    </strong>
                    <strong>
                        <span>09:00</span>
                    </strong>
                    <strong>
                        <span>10:00</span>
                    </strong>
                    <strong>
                        <span>11:00</span>
                    </strong>
                    <strong>
                        <span>12:00</span>
                    </strong>
                    <strong>
                        <span>13:00</span>
                    </strong>
                    <strong>
                        <span>14:00</span>
                    </strong>
                    <strong>
                        <span>15:00</span>
                    </strong>
                    <strong>
                        <span>16:00</span>
                    </strong>
                    <strong>
                        <span>17:00</span>
                    </strong>
                    <strong>
                        <span>18:00</span>
                    </strong>
                    <strong>
                        <span>19:00</span>
                    </strong>
                    <strong>
                        <span>20:00</span>
                    </strong>
                    <strong>
                        <span>21:00</span>
                    </strong>
                    <strong>
                        <span>22:00</span>
                    </strong>
                    <strong>
                        <span>23:00</span>
                    </strong>
                </div>
                <div class="weekRightDay">
                    <div class="calendarDay">
                        <div class="eventList" :style="{height: height+'px'}"></div>
                    </div>
                    <div class="calendarDay">
                        <div class="eventList" :style="{height: height+'px'}"></div>
                    </div>
                    <div class="calendarDay">
                        <div class="eventList" :style="{height: height+'px'}"></div>
                    </div>
                    <div class="calendarDay">
                        <div class="eventList" :style="{height: height+'px'}"></div>
                    </div>
                    <div class="calendarDay">
                        <div class="eventList" :style="{height: height+'px'}"></div>
                    </div>
                    <div class="calendarDay">
                        <div class="eventList" :style="{height: height+'px'}"></div>
                    </div>
                    <div class="calendarDay">
                        <div class="eventList" :style="{height: height+'px'}"></div>
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
        nextTick
    } from "vue";
    import { SearchOutlined, DeleteOutlined } from "@ant-design/icons-vue";
    import { message } from "ant-design-vue";
    import Interface from "@/utils/Interface.js";
    const { proxy } = getCurrentInstance();
    const data = reactive({
        height: ""
    });
    const { height } = toRefs(data);
    const weekRef = ref(null);
    onMounted(()=>{
        data.height = weekRef.value.scrollHeight;
    })
</script>
<style lang="less">
    .weekWrap{
        width: 100%;
        height: 100%;
        .weekCalendar{
            height: 100%;
            .weekCalendarHead{
                line-height: 42px;
                background: #fff;
                border-bottom: 1px solid #e5e6eb;
                display: flex;
                align-items: center;
                .timeZone{
                    width: 80px;
                    text-align: center;
                }
                .calendarDayHeaders{
                    flex: 1;
                    display: flex;
                    .weekDayHeadItem{
                        flex: 1;
                        text-align: center;
                    }
                }
            }
            .weekCalendarBody{
                height: calc(~"100% - 43px");
                overflow: auto;
                background: #fff;
                display: flex;
                .timeBox{
                    width: 80px;
                    height: 100%;
                    background: #f0f2f6;
                    text-align: center;
                    strong{
                        display: block;
                        height: 60px;
                        border-top: 1px solid rgb(221, 219, 218);
                        padding: 10px 0 0 0;
                        font-size: .8125rem;
                        color: rgb(62, 62, 60);
                        font-weight: normal;
                        box-sizing: border-box;
                        background: #f0f2f6;
                        border-right: 1px solid rgb(221, 219, 218);
                        &:first-child{
                            border-top: 0;
                        }
                        span{
                            position: relative;
                            top: -20px;
                            padding: 6px;
                            background: #f0f2f6;
                        }
                    }
                }
                .weekRightDay{
                    flex: 1;
                    display: flex;
                    .calendarDay{
                        flex: 1;
                        text-align: center;
                        .eventList{
                            height: 1000px;
                            margin: 0;
                            padding: 0;
                            position: relative;
                            box-sizing: content-box;
                            border-left: 1px solid rgb(221, 219, 218);
                            border-bottom: 1px solid rgb(221, 219, 218);
                            background: linear-gradient(rgba(0, 0, 0, .1) 1px, transparent 1.01px);
                            background-size: 100% 30px;
                            border-width: 1px;
                            border-color: #eee;
                            border-right: none;
                            &:last-child{
                                border-right: 1px solid #eee;
                            }
                            &.active{
                                background: rgb(254, 250, 230);
                            }
                        }
                    }
                }
            }
        }
    }
</style>