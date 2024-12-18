<template>
  <div class="tableGridWrap">
    <div class="data-grid">
      <div class="data-grid-table-ctr" style="width: 462px; height: 37px; z-index: 2;overflow: hidden;" :style="{width:width+'px'}">
        <table class="data-grid-table data-grid-fixed-row-column-table">
          <colgroup class="data-grid-table-colgroup">
            <col class="data-grid-table-col" v-for="(item, index) in fixedColumns" :key="index">
          </colgroup>
          <tbody>
            <tr class="data-grid-table-row data-grid-table-row-fixed-row-divider">
              <th class="data-grid-table-cell data-grid-header-cell" v-for="(item, index) in fixedColumns" :key="index">
                <div class="data-grid-table-cell-box">
                  <div class="table-cell-measure-header">
                    <span class="table-cell-measure-header-text">
                      {{ item.label }}
                    </span>
                    <span class="table-cell-measure-header-icons">
                      <div>
                        <a-dropdown :trigger="['click']">
                          <button class="fh-btn">
                            <svg aria-hidden="true" class="btn_icon" viewBox="0 0 52 52">
                              <path
                                d="M8.3 14h35.4c1 0 1.7 1.3.9 2.2L27.3 37.4c-.6.8-1.9.8-2.5 0L7.3 16.2c-.7-.9-.1-2.2 1-2.2z">
                              </path>
                            </svg>
                          </button>
                          <template #overlay>
                            <a-menu class="fh-menu" style="width: 178px;" @click="(e)=>handleActionMenu(e, item, index)">
                              <a-menu-item key="1">
                                <div class="menuItemAction">
                                  <span>
                                    <svg aria-hidden="true" class="btn_icon" viewBox="0 0 52 52">
                                      <path
                                        d="M41.4 21c.8-.8.8-1.9 0-2.7l-15-14.7c-.8-.8-2-.8-2.8 0l-15 14.7c-.8.8-.8 1.9 0 2.7l2.8 2.7c.8.8 2 .8 2.8 0l4.7-4.6c.8-.8 2.2-.2 2.2.9v27c0 1 .9 2 2 2h4c1.1 0 2-1.1 2-2V20c0-1.2 1.4-1.7 2.2-.9l4.7 4.6c.8.8 2 .8 2.8 0l2.6-2.7z">
                                      </path>
                                    </svg>
                                  </span>
                                  按升序排序
                                </div>
                              </a-menu-item>
                              <a-menu-item key="2">
                                <div class="menuItemAction">
                                  <span>
                                    <svg aria-hidden="true" class="btn_icon" viewBox="0 0 52 52">
                                      <path
                                        d="M9.6 31c-.8.8-.8 1.9 0 2.7l15 14.7c.8.8 2 .8 2.8 0l15.1-14.7c.8-.8.8-1.9 0-2.7l-2.8-2.7c-.8-.8-2-.8-2.8 0l-4.7 4.6c-.8.8-2.2.3-2.2-.9V5c0-1-.9-2-2-2h-4c-1.1 0-2 1.1-2 2v27c0 1.2-1.4 1.7-2.2.9l-4.7-4.6c-.8-.8-2-.8-2.8 0L9.6 31z">
                                      </path>
                                    </svg>
                                  </span>
                                  按降序排序
                                </div>
                              </a-menu-item>
                              <a-menu-item key="3">
                                <div class="menuItemAction">
                                  <span>
                                    <svg aria-hidden="true" class="btn_icon" viewBox="0 0 100 100">
                                      <path
                                        d="M20 24v52c0 2.2 1.8 4 4 4h52c2.2 0 4-1.8 4-4V24c0-2.2-1.8-4-4-4H24c-2.2 0-4 1.8-4 4zm54 42.5V74H40v-7.5h34zM74 53v7.5H40V53h34zm0-13.5V47H40v-7.5h34zM74 26v7.5H40V26h34z">
                                      </path>
                                    </svg>
                                  </span>
                                  按此字段分组行
                                </div>
                              </a-menu-item>
                              <a-menu-item key="4">
                                <div class="menuItemAction">
                                  <span>
                                    <svg aria-hidden="true" class="btn_icon" viewBox="0 0 100 100">
                                      <path
                                        d="M76 20H24c-2.2 0-4 1.8-4 4v52c0 2.2 1.8 4 4 4h52c2.2 0 4-1.8 4-4V24c0-2.2-1.8-4-4-4zM33.5 74H26V40h7.5v34zM47 74h-7.5V40H47v34zm13.5 0H53V40h7.5v34zM74 74h-7.5V40H74v34z">
                                      </path>
                                    </svg>
                                  </span>
                                  按此字段分组列
                                </div>
                              </a-menu-item>
                              <a-menu-item key="5">
                                <div class="menuItemAction">
                                  <span>
                                    <svg aria-hidden="true" class="btn_icon" viewBox="0 0 52 52">
                                      <path
                                        d="M49 11c0-6.2-9.8-9-19-9s-19 2.8-19 9v.4C2.4 14 1 19.5 1 22.6c0 3 1.5 6.1 4.1 8.3 2.3 1.9 5.1 3 7.9 3.1h.8c6.5-.2 12.9-2.3 14.7-5.9-.9-.7-1.5-1.9-1.5-3.1 0-2.2 1.8-4 4-4s4 1.8 4 4c0 1.7-1 3.1-2.5 3.7-2 5.6-10 9.3-19.5 9.3v6c0 3.3 7.6 6 17 6s17-2.7 17-6V15.3c1.3-1.2 2-2.6 2-4.3zM30 8c6.6 0 10.8 1.5 12.4 2.6.3.2.3.6 0 .8C40.8 12.5 36.6 14 30 14s-10.8-1.5-12.4-2.6c-.3-.2-.3-.6 0-.8C19.2 9.5 23.4 8 30 8zM7.7 27.8C6 26.4 5 24.5 5 22.6c0-4.5 4.1-6.6 7.7-7.5l.3.3V30c-1.9-.1-3.8-.9-5.3-2.2z">
                                      </path>
                                    </svg>
                                  </span>
                                  存储此列
                                </div>
                              </a-menu-item>
                              <a-menu-item key="6">
                                <div class="menuItemAction">
                                  <span>
                                    <svg aria-hidden="true" class="btn_icon" viewBox="0 0 52 52">
                                      <path
                                        d="M44.8 49.5H7.2c-2.6 0-4.7-2.1-4.7-4.7V7.2c0-2.6 2.1-4.7 4.7-4.7h37.6c2.6 0 4.7 2.1 4.7 4.7v37.6c0 2.6-2.1 4.7-4.7 4.7zm-36-39.2v31.3c0 .9.7 1.6 1.6 1.6h31.3c.9 0 1.6-.7 1.6-1.6V10.3c0-.9-.7-1.6-1.6-1.6H10.4c-.9.1-1.6.8-1.6 1.6z">
                                      </path>
                                      <path
                                        d="M36.2 20.3h-2.9l1.2-4.8v-.1c0-.2-.1-.4-.4-.4h-2.3c-.2 0-.3.1-.4.3l-1.2 4.9h-5.8l1.2-4.8v-.1c0-.2-.1-.4-.4-.4h-2.3c-.2 0-.3.1-.4.3l-1.3 4.9H18c-.2 0-.3.1-.4.3l-.6 2.2v.1c0 .2.1.4.4.4h3L19 28.7h-3.1c-.2 0-.3.1-.4.3l-.6 2.2v.1c0 .2.1.4.4.4h2.9L17 36.5v.1c0 .2.1.4.4.4h2.3c.2 0 .3-.1.4-.3l1.3-5h5.7L26 36.4v.1c0 .2.1.4.4.4h2.3c.2 0 .3-.1.4-.3l1.3-5h3.2c.2 0 .3-.1.4-.3l.6-2.2V29c0-.2-.1-.4-.4-.4h-3l1.4-5.6h3.1c.2 0 .3-.1.4-.3l.6-2.2v-.1c-.1.1-.3-.1-.5-.1zm-8.1 8.5h-5.8l1.4-5.6h5.7l-1.3 5.6z">
                                      </path>
                                    </svg>
                                  </span>
                                  显示唯一计数
                                </div>
                              </a-menu-item>
                              <a-menu-item key="deleteGroup">
                                <div class="menuItemAction">
                                  <span>
                                    <svg aria-hidden="true" class="btn_icon" viewBox="0 0 52 52"><path d="M31 25.4l13-13.1c.6-.6.6-1.5 0-2.1l-2-2.1c-.6-.6-1.5-.6-2.1 0L26.8 21.2c-.4.4-1 .4-1.4 0L12.3 8c-.6-.6-1.5-.6-2.1 0l-2.1 2.1c-.6.6-.6 1.5 0 2.1l13.1 13.1c.4.4.4 1 0 1.4L8 39.9c-.6.6-.6 1.5 0 2.1l2.1 2.1c.6.6 1.5.6 2.1 0L25.3 31c.4-.4 1-.4 1.4 0l13.1 13.1c.6.6 1.5.6 2.1 0L44 42c.6-.6.6-1.5 0-2.1L31 26.8c-.4-.4-.4-1 0-1.4z"></path></svg>
                                  </span>
                                  删除组
                                </div>
                              </a-menu-item>
                            </a-menu>
                          </template>
                        </a-dropdown>
                      </div>
                    </span>
                  </div>
                </div>
              </th>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="data-grid-table-ctr head" ref="headFiexdRef" style="height: 37px;overflow: hidden;z-index: 1;">
        <table class="data-grid-table data-grid-fixed-row-table">
          <thead>
            <tr class="data-grid-table-row data-grid-table-row-fixed-row-divider">
              <!-- <th class="data-grid-header-cell"></th> -->
              <th class="data-grid-header-cell" v-for="(item, index) in columns" :key="index">
                <div class="data-grid-table-cell-box">
                  <div class="table-cell-measure-header">
                    <span class="table-cell-measure-header-text">
                      {{ item.label }}
                    </span>
                    <span class="table-cell-measure-header-icons">
                      <div>
                        <a-dropdown :trigger="['click']">
                          <button class="fh-btn">
                            <svg aria-hidden="true" class="btn_icon" viewBox="0 0 52 52">
                              <path
                                d="M8.3 14h35.4c1 0 1.7 1.3.9 2.2L27.3 37.4c-.6.8-1.9.8-2.5 0L7.3 16.2c-.7-.9-.1-2.2 1-2.2z">
                              </path>
                            </svg>
                          </button>
                          <template #overlay>
                            <a-menu class="fh-menu" style="width: 178px;"  @click="(e)=>handleActionMenu(e, item, index)">
                              <a-menu-item key="asc" :disabled="item.sort=='asc'">
                                <div class="menuItemAction">
                                  <span>
                                    <svg aria-hidden="true" class="btn_icon" viewBox="0 0 52 52">
                                      <path
                                        d="M41.4 21c.8-.8.8-1.9 0-2.7l-15-14.7c-.8-.8-2-.8-2.8 0l-15 14.7c-.8.8-.8 1.9 0 2.7l2.8 2.7c.8.8 2 .8 2.8 0l4.7-4.6c.8-.8 2.2-.2 2.2.9v27c0 1 .9 2 2 2h4c1.1 0 2-1.1 2-2V20c0-1.2 1.4-1.7 2.2-.9l4.7 4.6c.8.8 2 .8 2.8 0l2.6-2.7z">
                                      </path>
                                    </svg>
                                  </span>
                                  按升序排序
                                </div>
                              </a-menu-item>
                              <a-menu-item key="desc" :disabled="item.sort=='desc'">
                                <div class="menuItemAction">
                                  <span>
                                    <svg aria-hidden="true" class="btn_icon" viewBox="0 0 52 52">
                                      <path
                                        d="M9.6 31c-.8.8-.8 1.9 0 2.7l15 14.7c.8.8 2 .8 2.8 0l15.1-14.7c.8-.8.8-1.9 0-2.7l-2.8-2.7c-.8-.8-2-.8-2.8 0l-4.7 4.6c-.8.8-2.2.3-2.2-.9V5c0-1-.9-2-2-2h-4c-1.1 0-2 1.1-2 2v27c0 1.2-1.4 1.7-2.2.9l-4.7-4.6c-.8-.8-2-.8-2.8 0L9.6 31z">
                                      </path>
                                    </svg>
                                  </span>
                                  按降序排序
                                </div>
                              </a-menu-item>
                              <a-menu-item key="3">
                                <div class="menuItemAction">
                                  <span>
                                    <svg aria-hidden="true" class="btn_icon" viewBox="0 0 100 100">
                                      <path
                                        d="M20 24v52c0 2.2 1.8 4 4 4h52c2.2 0 4-1.8 4-4V24c0-2.2-1.8-4-4-4H24c-2.2 0-4 1.8-4 4zm54 42.5V74H40v-7.5h34zM74 53v7.5H40V53h34zm0-13.5V47H40v-7.5h34zM74 26v7.5H40V26h34z">
                                      </path>
                                    </svg>
                                  </span>
                                  按此字段分组行
                                </div>
                              </a-menu-item>
                              <a-menu-item key="4">
                                <div class="menuItemAction">
                                  <span>
                                    <svg aria-hidden="true" class="btn_icon" viewBox="0 0 100 100">
                                      <path
                                        d="M76 20H24c-2.2 0-4 1.8-4 4v52c0 2.2 1.8 4 4 4h52c2.2 0 4-1.8 4-4V24c0-2.2-1.8-4-4-4zM33.5 74H26V40h7.5v34zM47 74h-7.5V40H47v34zm13.5 0H53V40h7.5v34zM74 74h-7.5V40H74v34z">
                                      </path>
                                    </svg>
                                  </span>
                                  按此字段分组列
                                </div>
                              </a-menu-item>
                              <a-sub-menu key="count" v-if="item.dataType=='currency'" style="padding: 0;">
                                <template #title>
                                  <div class="menuItemAction">
                                    <span>
                                      <svg aria-hidden="true" class="btn_icon" viewBox="0 0 52 52"><path d="M48.5 2h-45C2.7 2 2 2.7 2 3.5v5c0 .8.7 1.5 1.5 1.5h45c.8 0 1.5-.7 1.5-1.5v-5c0-.8-.7-1.5-1.5-1.5zM20.5 14h-7c-.8 0-1.5.7-1.5 1.5v3c0 .8.7 1.5 1.5 1.5h7c.8 0 1.5-.7 1.5-1.5v-3c0-.8-.7-1.5-1.5-1.5zM34.5 14h-7c-.8 0-1.5.7-1.5 1.5v3c0 .8.7 1.5 1.5 1.5h7c.8 0 1.5-.7 1.5-1.5v-3c0-.8-.7-1.5-1.5-1.5zM48.5 14h-7c-.8 0-1.5.7-1.5 1.5v3c0 .8.7 1.5 1.5 1.5h7c.8 0 1.5-.7 1.5-1.5v-3c0-.8-.7-1.5-1.5-1.5zM20.5 34h-7c-.8 0-1.5.7-1.5 1.5v3c0 .8.7 1.5 1.5 1.5h7c.8 0 1.5-.7 1.5-1.5v-3c0-.8-.7-1.5-1.5-1.5zM34.5 34h-7c-.8 0-1.5.7-1.5 1.5v3c0 .8.7 1.5 1.5 1.5h7c.8 0 1.5-.7 1.5-1.5v-3c0-.8-.7-1.5-1.5-1.5zM48.5 34h-7c-.8 0-1.5.7-1.5 1.5v3c0 .8.7 1.5 1.5 1.5h7c.8 0 1.5-.7 1.5-1.5v-3c0-.8-.7-1.5-1.5-1.5z"></path><path d="M48.5 44h-39c-.8 0-1.5-.7-1.5-1.5v-7c0-.8-.7-1.5-1.5-1.5h-3c-.8 0-1.5.7-1.5 1.5v13c0 .8.7 1.5 1.5 1.5h45c.8 0 1.5-.7 1.5-1.5v-3c0-.8-.7-1.5-1.5-1.5zM48.5 24h-39c-.8 0-1.5-.7-1.5-1.5v-7c0-.8-.7-1.5-1.5-1.5h-3c-.8 0-1.5.7-1.5 1.5v13c0 .8.7 1.5 1.5 1.5h45c.8 0 1.5-.7 1.5-1.5v-3c0-.8-.7-1.5-1.5-1.5z"></path></svg>
                                    </span>
                                    汇总
                                  </div>
                                </template>
                                <div class="sumBox">
                                  <ul>
                                    <li v-for="(sumItem, sumIdx) in summarys" :key="sumIdx" @click="handleSelectSum(item, sumItem)">
                                      <span>
                                        <svg v-if="item.summarys.includes(sumItem.id)" aria-hidden="true" class="btn_icon" viewBox="0 0 52 52"><path d="M19.1 42.5L2.6 25.9c-.6-.6-.6-1.6 0-2.2l2.2-2.2c.6-.6 1.6-.6 2.2 0L19.4 34c.4.4 1.1.4 1.5 0L45.2 9.5c.6-.6 1.6-.6 2.2 0l2.2 2.2c.6.6.6 1.6 0 2.2L21.3 42.5c-.6.7-1.6.7-2.2 0z"></path></svg>
                                      </span>
                                      {{sumItem.name}}
                                    </li>
                                  </ul>
                                </div>
                              </a-sub-menu>
                              <a-menu-item key="5">
                                <div class="menuItemAction">
                                  <span>
                                    <svg aria-hidden="true" class="btn_icon" viewBox="0 0 52 52">
                                      <path
                                        d="M49 11c0-6.2-9.8-9-19-9s-19 2.8-19 9v.4C2.4 14 1 19.5 1 22.6c0 3 1.5 6.1 4.1 8.3 2.3 1.9 5.1 3 7.9 3.1h.8c6.5-.2 12.9-2.3 14.7-5.9-.9-.7-1.5-1.9-1.5-3.1 0-2.2 1.8-4 4-4s4 1.8 4 4c0 1.7-1 3.1-2.5 3.7-2 5.6-10 9.3-19.5 9.3v6c0 3.3 7.6 6 17 6s17-2.7 17-6V15.3c1.3-1.2 2-2.6 2-4.3zM30 8c6.6 0 10.8 1.5 12.4 2.6.3.2.3.6 0 .8C40.8 12.5 36.6 14 30 14s-10.8-1.5-12.4-2.6c-.3-.2-.3-.6 0-.8C19.2 9.5 23.4 8 30 8zM7.7 27.8C6 26.4 5 24.5 5 22.6c0-4.5 4.1-6.6 7.7-7.5l.3.3V30c-1.9-.1-3.8-.9-5.3-2.2z">
                                      </path>
                                    </svg>
                                  </span>
                                  存储此列
                                </div>
                              </a-menu-item>
                              <a-menu-item key="6">
                                <div class="menuItemAction">
                                  <span>
                                    <svg aria-hidden="true" class="btn_icon" viewBox="0 0 52 52">
                                      <path
                                        d="M44.8 49.5H7.2c-2.6 0-4.7-2.1-4.7-4.7V7.2c0-2.6 2.1-4.7 4.7-4.7h37.6c2.6 0 4.7 2.1 4.7 4.7v37.6c0 2.6-2.1 4.7-4.7 4.7zm-36-39.2v31.3c0 .9.7 1.6 1.6 1.6h31.3c.9 0 1.6-.7 1.6-1.6V10.3c0-.9-.7-1.6-1.6-1.6H10.4c-.9.1-1.6.8-1.6 1.6z">
                                      </path>
                                      <path
                                        d="M36.2 20.3h-2.9l1.2-4.8v-.1c0-.2-.1-.4-.4-.4h-2.3c-.2 0-.3.1-.4.3l-1.2 4.9h-5.8l1.2-4.8v-.1c0-.2-.1-.4-.4-.4h-2.3c-.2 0-.3.1-.4.3l-1.3 4.9H18c-.2 0-.3.1-.4.3l-.6 2.2v.1c0 .2.1.4.4.4h3L19 28.7h-3.1c-.2 0-.3.1-.4.3l-.6 2.2v.1c0 .2.1.4.4.4h2.9L17 36.5v.1c0 .2.1.4.4.4h2.3c.2 0 .3-.1.4-.3l1.3-5h5.7L26 36.4v.1c0 .2.1.4.4.4h2.3c.2 0 .3-.1.4-.3l1.3-5h3.2c.2 0 .3-.1.4-.3l.6-2.2V29c0-.2-.1-.4-.4-.4h-3l1.4-5.6h3.1c.2 0 .3-.1.4-.3l.6-2.2v-.1c-.1.1-.3-.1-.5-.1zm-8.1 8.5h-5.8l1.4-5.6h5.7l-1.3 5.6z">
                                      </path>
                                    </svg>
                                  </span>
                                  显示唯一计数
                                </div>
                              </a-menu-item>
                              <div class="has-divider"></div>
                              <a-menu-item key="left">
                                <div class="menuItemAction">
                                  <span>
                                    <svg aria-hidden="true" class="btn_icon" viewBox="0 0 52 52"><path d="M48.6 23H15.4c-.9 0-1.3-1.1-.7-1.7l9.6-9.6c.6-.6.6-1.5 0-2.1l-2.2-2.2c-.6-.6-1.5-.6-2.1 0L2.5 25c-.6.6-.6 1.5 0 2.1L20 44.6c.6.6 1.5.6 2.1 0l2.1-2.1c.6-.6.6-1.5 0-2.1l-9.6-9.6c-.6-.7-.2-1.8.7-1.8h33.2c.8 0 1.5-.6 1.5-1.4v-3c0-.8-.6-1.6-1.4-1.6z"></path></svg>
                                  </span>
                                  向左移
                                </div>
                              </a-menu-item>
                              <a-menu-item key="right">
                                <div class="menuItemAction">
                                  <span>
                                    <svg aria-hidden="true" class="btn_icon" viewBox="0 0 52 52"><path d="M3.4 29h33.2c.9 0 1.3 1.1.7 1.7l-9.6 9.6c-.6.6-.6 1.5 0 2.1l2.2 2.2c.6.6 1.5.6 2.1 0L49.5 27c.6-.6.6-1.5 0-2.1L32 7.4c-.6-.6-1.5-.6-2.1 0l-2.1 2.1c-.6.6-.6 1.5 0 2.1l9.6 9.6c.6.7.2 1.8-.7 1.8H3.5c-.8 0-1.5.6-1.5 1.4v3c0 .8.6 1.6 1.4 1.6z"></path></svg>
                                  </span>
                                  向右移
                                </div>
                              </a-menu-item>
                              <div class="has-divider"></div>
                              <a-menu-item key="delete-column">
                                <div class="menuItemAction">
                                  <span>
                                    <svg aria-hidden="true" class="btn_icon" viewBox="0 0 52 52"><path d="M31 25.4l13-13.1c.6-.6.6-1.5 0-2.1l-2-2.1c-.6-.6-1.5-.6-2.1 0L26.8 21.2c-.4.4-1 .4-1.4 0L12.3 8c-.6-.6-1.5-.6-2.1 0l-2.1 2.1c-.6.6-.6 1.5 0 2.1l13.1 13.1c.4.4.4 1 0 1.4L8 39.9c-.6.6-.6 1.5 0 2.1l2.1 2.1c.6.6 1.5.6 2.1 0L25.3 31c.4-.4 1-.4 1.4 0l13.1 13.1c.6.6 1.5.6 2.1 0L44 42c.6-.6.6-1.5 0-2.1L31 26.8c-.4-.4-.4-1 0-1.4z"></path></svg>
                                  </span>
                                  删除列
                                </div>
                              </a-menu-item>
                            </a-menu>
                          </template>
                        </a-dropdown>
                      </div>
                    </span>
                  </div>
                </div>
              </th>
            </tr>
          </thead>
        </table>
      </div>
      <div class="data-grid-table-ctr leftFiexd" ref="leftFiexdRef" style="width: 462px;z-index: 1;overflow: hidden;" :style="{width:width+'px'}">
          <table class="data-grid-table data-grid-fixed-column-table" style="width: 462px;" :style="{width:width+'px'}">
            <colgroup class="data-grid-table-colgroup">
              <col class="data-grid-table-col" v-for="(item, index) in fixedColumns" :key="index">
            </colgroup>
            <tbody>
              <tr class="data-grid-table-row data-grid-table-row-fixed-row-divider data-grid-table-row-start data-grid-header-row">
                <th class="data-grid-table-cell data-grid-header-cell" v-for="(item, index) in fixedColumns" :key="index">
                  <div class="data-grid-table-cell-box">
                    <div class="table-cell-measure-header">
                      <span class="table-cell-measure-header-text">
                        {{ item.label }}
                      </span>
                      <span class="table-cell-measure-header-icons">
                        <div>
                          <a-dropdown :trigger="['click']">
                            <button class="fh-btn">
                              <svg aria-hidden="true" class="btn_icon" viewBox="0 0 52 52">
                                <path
                                  d="M8.3 14h35.4c1 0 1.7 1.3.9 2.2L27.3 37.4c-.6.8-1.9.8-2.5 0L7.3 16.2c-.7-.9-.1-2.2 1-2.2z">
                                </path>
                              </svg>
                            </button>
                            <template #overlay>
                              <a-menu class="fh-menu" style="width: 178px;">
                                <a-menu-item key="1">
                                  <div class="menuItemAction">
                                    <span>
                                      <svg aria-hidden="true" class="btn_icon" viewBox="0 0 52 52">
                                        <path
                                          d="M41.4 21c.8-.8.8-1.9 0-2.7l-15-14.7c-.8-.8-2-.8-2.8 0l-15 14.7c-.8.8-.8 1.9 0 2.7l2.8 2.7c.8.8 2 .8 2.8 0l4.7-4.6c.8-.8 2.2-.2 2.2.9v27c0 1 .9 2 2 2h4c1.1 0 2-1.1 2-2V20c0-1.2 1.4-1.7 2.2-.9l4.7 4.6c.8.8 2 .8 2.8 0l2.6-2.7z">
                                        </path>
                                      </svg>
                                    </span>
                                    按升序排序
                                  </div>
                                </a-menu-item>
                                <a-menu-item key="2">
                                  <div class="menuItemAction">
                                    <span>
                                      <svg aria-hidden="true" class="btn_icon" viewBox="0 0 52 52">
                                        <path
                                          d="M9.6 31c-.8.8-.8 1.9 0 2.7l15 14.7c.8.8 2 .8 2.8 0l15.1-14.7c.8-.8.8-1.9 0-2.7l-2.8-2.7c-.8-.8-2-.8-2.8 0l-4.7 4.6c-.8.8-2.2.3-2.2-.9V5c0-1-.9-2-2-2h-4c-1.1 0-2 1.1-2 2v27c0 1.2-1.4 1.7-2.2.9l-4.7-4.6c-.8-.8-2-.8-2.8 0L9.6 31z">
                                        </path>
                                      </svg>
                                    </span>
                                    按降序排序
                                  </div>
                                </a-menu-item>
                                <a-menu-item key="3">
                                  <div class="menuItemAction">
                                    <span>
                                      <svg aria-hidden="true" class="btn_icon" viewBox="0 0 100 100">
                                        <path
                                          d="M20 24v52c0 2.2 1.8 4 4 4h52c2.2 0 4-1.8 4-4V24c0-2.2-1.8-4-4-4H24c-2.2 0-4 1.8-4 4zm54 42.5V74H40v-7.5h34zM74 53v7.5H40V53h34zm0-13.5V47H40v-7.5h34zM74 26v7.5H40V26h34z">
                                        </path>
                                      </svg>
                                    </span>
                                    按此字段分组行
                                  </div>
                                </a-menu-item>
                                <a-menu-item key="4">
                                  <div class="menuItemAction">
                                    <span>
                                      <svg aria-hidden="true" class="btn_icon" viewBox="0 0 100 100">
                                        <path
                                          d="M76 20H24c-2.2 0-4 1.8-4 4v52c0 2.2 1.8 4 4 4h52c2.2 0 4-1.8 4-4V24c0-2.2-1.8-4-4-4zM33.5 74H26V40h7.5v34zM47 74h-7.5V40H47v34zm13.5 0H53V40h7.5v34zM74 74h-7.5V40H74v34z">
                                        </path>
                                      </svg>
                                    </span>
                                    按此字段分组列
                                  </div>
                                </a-menu-item>
                                <a-menu-item key="5">
                                  <div class="menuItemAction">
                                    <span>
                                      <svg aria-hidden="true" class="btn_icon" viewBox="0 0 52 52">
                                        <path
                                          d="M49 11c0-6.2-9.8-9-19-9s-19 2.8-19 9v.4C2.4 14 1 19.5 1 22.6c0 3 1.5 6.1 4.1 8.3 2.3 1.9 5.1 3 7.9 3.1h.8c6.5-.2 12.9-2.3 14.7-5.9-.9-.7-1.5-1.9-1.5-3.1 0-2.2 1.8-4 4-4s4 1.8 4 4c0 1.7-1 3.1-2.5 3.7-2 5.6-10 9.3-19.5 9.3v6c0 3.3 7.6 6 17 6s17-2.7 17-6V15.3c1.3-1.2 2-2.6 2-4.3zM30 8c6.6 0 10.8 1.5 12.4 2.6.3.2.3.6 0 .8C40.8 12.5 36.6 14 30 14s-10.8-1.5-12.4-2.6c-.3-.2-.3-.6 0-.8C19.2 9.5 23.4 8 30 8zM7.7 27.8C6 26.4 5 24.5 5 22.6c0-4.5 4.1-6.6 7.7-7.5l.3.3V30c-1.9-.1-3.8-.9-5.3-2.2z">
                                        </path>
                                      </svg>
                                    </span>
                                    存储此列
                                  </div>
                                </a-menu-item>
                                <a-menu-item key="6">
                                  <div class="menuItemAction">
                                    <span>
                                      <svg aria-hidden="true" class="btn_icon" viewBox="0 0 52 52">
                                        <path
                                          d="M44.8 49.5H7.2c-2.6 0-4.7-2.1-4.7-4.7V7.2c0-2.6 2.1-4.7 4.7-4.7h37.6c2.6 0 4.7 2.1 4.7 4.7v37.6c0 2.6-2.1 4.7-4.7 4.7zm-36-39.2v31.3c0 .9.7 1.6 1.6 1.6h31.3c.9 0 1.6-.7 1.6-1.6V10.3c0-.9-.7-1.6-1.6-1.6H10.4c-.9.1-1.6.8-1.6 1.6z">
                                        </path>
                                        <path
                                          d="M36.2 20.3h-2.9l1.2-4.8v-.1c0-.2-.1-.4-.4-.4h-2.3c-.2 0-.3.1-.4.3l-1.2 4.9h-5.8l1.2-4.8v-.1c0-.2-.1-.4-.4-.4h-2.3c-.2 0-.3.1-.4.3l-1.3 4.9H18c-.2 0-.3.1-.4.3l-.6 2.2v.1c0 .2.1.4.4.4h3L19 28.7h-3.1c-.2 0-.3.1-.4.3l-.6 2.2v.1c0 .2.1.4.4.4h2.9L17 36.5v.1c0 .2.1.4.4.4h2.3c.2 0 .3-.1.4-.3l1.3-5h5.7L26 36.4v.1c0 .2.1.4.4.4h2.3c.2 0 .3-.1.4-.3l1.3-5h3.2c.2 0 .3-.1.4-.3l.6-2.2V29c0-.2-.1-.4-.4-.4h-3l1.4-5.6h3.1c.2 0 .3-.1.4-.3l.6-2.2v-.1c-.1.1-.3-.1-.5-.1zm-8.1 8.5h-5.8l1.4-5.6h5.7l-1.3 5.6z">
                                        </path>
                                      </svg>
                                    </span>
                                    显示唯一计数
                                  </div>
                                </a-menu-item>
                              </a-menu>
                            </template>
                          </a-dropdown>
                        </div>
                      </span>
                    </div>
                  </div>
                </th>
              </tr>
              <!-- <template v-for="(item, index) in listData" :key="index">
                <tr v-for="(self, selfIdx) in item.rows">
  
                  <th rowspan="27" v-if="index==0 && selfIdx == 0"></th>
                  <th :rowspan="item.rows.length" v-if="selfIdx == 0"></th>
  
                  <th :rowspan="rowTotal" v-if="index==0 && selfIdx == 0" class="thTop">
                    <div class="data-grid-table-cell-box">
                      {{groupings.groupings[0].label}} ({{total}})
                    </div>
                  </th>
                  <th class="thTop borderRightNone" v-for="(thItem, thIdx) in fixedColumns.slice(1, fixedColumns.length)" :key="thIdx" :rowspan="item.rows.length" v-if="selfIdx==0">
                    <div class="data-grid-table-cell-box">
                      <span v-if="formState.hasRecordCount">
                        ({{item.rows.length}})
                      </span>
                    </div>
                  </th>
                </tr>
                <tr v-if="formState.showSubtotals">
                  <th class="thTop borderRightNone" style="background: #f3f3f3;vertical-align: middle;border-right: none;">
                    <div class="data-grid-table-cell-box">
                      小计
                    </div>
                  </th>
                </tr>
              </template> -->
              <template v-for="(parent, parentIdx) in groupings" :key="parentIdx">
                <template v-for="(item, index) in parent.groupings" :key="index">
                  <template v-if="fixedColumns.length == 2">
                    <tr v-for="(row, idx) in item.groupings" :key="idx">
                      <template v-for="(thItem, thIdx) in fixedColumns" :key="thIdx">
                        <th v-if="index==0&&thIdx==0&&idx==0" :rowspan="countRowspan(parent, parentIdx)">
                          <div class="data-grid-table-cell-box">
                            {{parent.label}}
                            <span v-if="formState.hasRecordCount">({{item.groupings.length}})</span>
                          </div>
                        </th>
                        <th v-if="index==0&&thIdx==1&&idx==0" :rowspan="item.groupings.length"><div class="data-grid-table-cell-box">{{item.label}}<span v-if="formState.hasRecordCount">({{item.groupings.length}})</span></div></th>
                        <th v-if="index!=0&&thIdx==1&&idx==0" :rowspan="item.groupings.length"><div class="data-grid-table-cell-box">{{item.label}}<span v-if="formState.hasRecordCount">({{item.groupings.length}})</span></div></th>
                      </template>
                    </tr>
                  </template>
  
                  <template v-if="fixedColumns.length == 3" v-for="(towItem, twoIdx) in item.groupings" :key="twoIdx">
                    <tr v-for="(row, idx) in towItem.groupings" :key="idx">
                      <template v-for="(thItem, thIdx) in fixedColumns" :key="thIdx">
                        <th v-if="index==0&&thIdx==0&&idx==0" :rowspan="countRowspan(parent, parentIdx)"><div class="data-grid-table-cell-box">{{parent.label}}<span v-if="formState.hasRecordCount">({{towItem.groupings.length}})</span></div></th>
  
                        <th v-if="index==0&&thIdx==1&&idx==0" :rowspan="formState.showSubtotals ? towItem.groupings.length+1 : towItem.groupings.length"><div class="data-grid-table-cell-box">{{item.label}}<span v-if="formState.hasRecordCount">({{towItem.groupings.length}})</span></div></th>
                        <th v-if="index!=0&&thIdx==1&&idx==0" :rowspan="formState.showSubtotals ? towItem.groupings.length+1 : towItem.groupings.length"><div class="data-grid-table-cell-box">{{item.label}}<span v-if="formState.hasRecordCount">({{towItem.groupings.length}})</span></div></th>
  
                        <th v-if="index==0&&thIdx==2&&idx==0" :rowspan="towItem.groupings.length"><div class="data-grid-table-cell-box">{{towItem.label}}<span v-if="formState.hasRecordCount">({{towItem.groupings.length}})</span></div></th>
                        <th v-if="index!=0&&thIdx==2&&idx==0" :rowspan="towItem.groupings.length"><div class="data-grid-table-cell-box">{{towItem.label}}<span v-if="formState.hasRecordCount">({{towItem.groupings.length}})</span></div></th>
                        
                      </template>
                    </tr>
                    <tr v-if="formState.showSubtotals" :style="{height:towItem.height+'px'}">
                      <th class="thTop" style="background: #f3f3f3;vertical-align: middle;">
                        <div class="data-grid-table-cell-box">
                          小计3
                        </div>
                      </th>
                    </tr>
                  </template>
  
                  <tr v-if="formState.showSubtotals" :style="{height:item.height+'px'}">
                    <th :colspan="fixedColumns.length == 3?2:1" class="thTop" style="background: #f3f3f3;vertical-align: middle;">
                      <div class="data-grid-table-cell-box">
                        小计2
                      </div>
                    </th>
                  </tr>
                </template>
                <tr v-if="formState.showSubtotals" :style="{height:parent.height+'px'}">
                  <th :colspan="fixedColumns.length" class="thTop" style="background: #f3f3f3;vertical-align: middle;">
                    <div class="data-grid-table-cell-box">
                      小计
                    </div>
                  </th>
                </tr>
              </template>
              <!-- <tr v-if="formState.showSubtotals">
                <th colspan="2" class="thTop borderRightNone" style="background: #f3f3f3;vertical-align: middle;">
                  <div class="data-grid-table-cell-box">
                    小计
                  </div>
                </th>
              </tr> -->
              <tr v-if="formState.showGrandTotal" :style="{height:grandTotalHeight+'px'}">
                <th :colspan="fixedColumns.length" class="thTop borderRightNone" style="background: #eef7fc;vertical-align: middle;border-top: 1px solid #a8b8c7;">
                  <div class="data-grid-table-cell-box">
                    合计
                  </div>
                </th>
              </tr>
            </tbody>
          </table>
      </div>
      <div class="data-grid-table-ctr" style="height: auto;" ref="gridTableRef">
        <table class="data-grid-table">
          <thead>
            <tr>
              <!-- <th class="data-grid-header-cell"></th> -->
              <th class="data-grid-header-cell" v-for="(item, index) in columns" :key="index">
                <div class="data-grid-table-cell-box">
                  <div class="table-cell-measure-header">
                    <span class="table-cell-measure-header-text">
                      {{ item.label }}
                    </span>
                    <span class="table-cell-measure-header-icons" v-if="item.isLookup">
                      <div>
                        <a-dropdown :trigger="['click']">
                          <button class="fh-btn">
                            <svg aria-hidden="true" class="btn_icon" viewBox="0 0 52 52">
                              <path
                                d="M8.3 14h35.4c1 0 1.7 1.3.9 2.2L27.3 37.4c-.6.8-1.9.8-2.5 0L7.3 16.2c-.7-.9-.1-2.2 1-2.2z">
                              </path>
                            </svg>
                          </button>
                          <template #overlay>
                            <a-menu class="fh-menu" style="width: 136px;">
                              <a-menu-item key="1">按升序排序</a-menu-item>
                              <a-menu-item key="2">添加交叉筛选器</a-menu-item>
                              <a-menu-item key="3">添加行限制</a-menu-item>
                            </a-menu>
                          </template>
                        </a-dropdown>
                      </div>
                    </span>
                  </div>
                </div>
              </th>
            </tr>
          </thead>
          <!-- <tbody>
            <tr v-for="(item, index) in listData" :key="index">
              <th rowspan="26" :style="{background:item.isCount?'#f3f3f3':'#fff'}" v-if="index==0"></th>
              <th rowspan="26" :style="{background:item.isCount?'#f3f3f3':'#fff'}" v-if="index==0">
                <span v-if="item.isCount">小计</span>
              </th>
              <td v-for="(row, idx) in item.dataCells" :key="idx" :style="{background:item.isCount?'#f3f3f3':'#fff'}">
                <div v-if="item.isCount"></div>
                <div class="data-grid-table-cell-box" v-else>
                  {{row.label}}
                </div>
              </td>
            </tr>
          </tbody> -->
          <tbody>
            <!-- <template v-for="(item, index) in listData" :key="index">
              <tr v-for="(self, selfIdx) in item.rows">

                <th rowspan="27" v-if="index==0 && selfIdx == 0"></th>
                <th :rowspan="item.rows.length" v-if="selfIdx == 0"></th>

                <th :rowspan="rowTotal" v-if="index==0 && selfIdx == 0" class="thTop">
                  <div class="data-grid-table-cell-box">
                    {{groupings.groupings[0].label}} ({{total}})
                  </div>
                </th>
                <th class="thTop borderRightNone" v-for="(thItem, thIdx) in fixedColumns.slice(1, fixedColumns.length)" :key="thIdx" :rowspan="item.rows.length" v-if="selfIdx==0">
                  <div class="data-grid-table-cell-box">
                    ({{item.rows.length}})
                  </div>
                </th>

                <td :class="{'borderLeftNone':idx==0}" class="data-grid-table-cell data-grid-table-cell-start data-grid-table-cell-odd data-grid-table-cell-wrap" v-for="(row, idx) in self.dataCells" :key="idx" :style="{background:item.isCount?'#f3f3f3':'#fff'}">
                  <div v-if="item.isCount">
                    
                  </div>
                  <div class="data-grid-table-cell-box" >
                    {{row.label}}
                  </div>
                </td>
              </tr>
              <tr v-if="formState.showSubtotals">
                <th class="thTop" style="background: #f3f3f3;vertical-align: middle;">
                  <div class="data-grid-table-cell-box">
                    小计
                  </div>
                </th>
                <td v-for="(row, idx) in columns2" :key="idx" style="background: #f3f3f3;">
                  <div class="data-grid-table-cell-box" v-if="row.field=='EXP_AMOUNT'">
                    {{item.aggregates[0].label}}
                  </div>
                </td>
              </tr>
            </template> -->
            <!-- <tr v-for="(item, index) in listData2" :key="index">
              <th v-for="(thItem, thIdx) in fixedColumns" :key="thIdx" :rowspan="rowspan2(index, thIdx)"></th>
              <td v-for="(cell, cellIdx) in item.dataCells" :key="cellIdx">
                <div class="data-grid-table-cell-box" >
                  {{cell.label}}
                </div>
              </td>
            </tr> -->
            <!-- <template v-for="(parent, parentIdx) in groupings" :key="parentIdx">
              <template v-for="(item, index) in parent.groupings" :key="index">
                <tr v-for="(row, idx) in item.groupings" :key="idx">
                  <th v-for="(thItem, thIdx) in fixedColumns" :key="thIdx" ></th>
                  <td v-for="(cell, cellIdx) in row.dataCells" :key="cellIdx">
                    <div class="data-grid-table-cell-box" >
                      {{cell.label}}
                    </div>
                  </td>
                </tr>
              </template>
            </template> -->
            <template v-for="(parent, parentIdx) in groupings" :key="parentIdx">
              <template v-for="(item, index) in parent.groupings" :key="index">
                <template v-if="fixedColumns.length == 2">
                  <tr v-for="(row, idx) in item.groupings" :key="idx">
                    <template v-for="(thItem, thIdx) in fixedColumns" :key="thIdx">
                      <th ref="thRef0" v-if="index==0&&thIdx==0&&idx==0" :rowspan="countRowspan(parent, parentIdx)">
                        <div class="data-grid-table-cell-box">{{parent.label}}</div>
                      </th>
                      <th ref="thRef1" v-if="index==0&&thIdx==1&&idx==0" :rowspan="item.groupings.length"><div class="data-grid-table-cell-box">{{item.label}}</div></th>
                      <th ref="thRef1" v-if="index!=0&&thIdx==1&&idx==0" :rowspan="item.groupings.length"><div class="data-grid-table-cell-box">{{item.label}}</div></th>
                    </template>
                    <!-- <td v-for="(cell, cellIdx) in row.dataCells" :key="cellIdx">
                      <div class="data-grid-table-cell-box" >
                        {{cell.label}}
                      </div>
                    </td> -->
                    <td v-for="(cell, cellIdx) in columns2" :key="cellIdx">
                      <div class="data-grid-table-cell-box" >
                        {{row.dataCells[cellIdx].label}}
                      </div>
                    </td>
                  </tr>
                </template>

                <template v-if="fixedColumns.length == 3" v-for="(towItem, twoIdx) in item.groupings" :key="twoIdx">
                  <tr v-for="(row, idx) in towItem.groupings" :key="idx" :ref="(e)=>setRef(e, parentIdx, index, twoIdx)">
                    <template v-for="(thItem, thIdx) in fixedColumns" :key="thIdx">
                      <th ref="thRef0" v-if="index==0&&thIdx==0&&idx==0" :rowspan="countRowspan(parent, parentIdx)">
                        <div class="data-grid-table-cell-box">
                          {{parent.label}}
                          <span v-if="formState.hasRecordCount">({{towItem.groupings.length}})</span>
                        </div>
                      </th>

                      <th ref="thRef1" v-if="index==0&&thIdx==1&&idx==0" :rowspan="formState.showSubtotals ? towItem.groupings.length+1 : towItem.groupings.length">
                        <div class="data-grid-table-cell-box">
                          {{item.label}}
                          <span v-if="formState.hasRecordCount">({{towItem.groupings.length}})</span>
                        </div>
                      </th>
                      <th ref="thRef1" v-if="index!=0&&thIdx==1&&idx==0" :rowspan="formState.showSubtotals ? towItem.groupings.length+1 : towItem.groupings.length">
                        <div class="data-grid-table-cell-box">
                          {{item.label}}
                          <span v-if="formState.hasRecordCount">({{towItem.groupings.length}})</span>
                        </div>
                      </th>

                      <th ref="thRef2" v-if="index==0&&thIdx==2&&idx==0" :rowspan="towItem.groupings.length">
                        <div class="data-grid-table-cell-box">
                          {{towItem.label}}
                          <span v-if="formState.hasRecordCount">({{towItem.groupings.length}})</span>
                        </div>
                      </th>
                      <th ref="thRef2" v-if="index!=0&&thIdx==2&&idx==0" :rowspan="towItem.groupings.length">
                        <div class="data-grid-table-cell-box">
                          {{towItem.label}}
                          <span v-if="formState.hasRecordCount">({{towItem.groupings.length}})</span>
                        </div>
                      </th>
                      
                    </template>
                    <td v-for="(cell, cellIdx) in columns2" :key="cellIdx">
                      <div class="data-grid-table-cell-box" >
                        {{row.dataCells[cellIdx].label}}
                      </div>
                    </td>
                  </tr>
                  <tr v-if="formState.showSubtotals">
                    <th class="thTop" style="background: #f3f3f3;vertical-align: middle;">
                      <div class="data-grid-table-cell-box">
                        小计3
                      </div>
                    </th>
                    <td v-for="(row, idx) in columns2" :key="idx" style="background: #f3f3f3;">
                      <div class="data-grid-table-cell-box" v-for="(countItem,countIdx) in aggregates.slice(0, aggregates.length-1)" :key="countIdx">
                        <span v-if="countItem.slice(2,countItem.length) == row.field">
                          <span v-if="countLabel(countItem)!=''">{{countLabel(countItem)}}：</span>
                          {{towItem.aggregates[countIdx].label}}
                        </span>
                      </div>
                    </td>
                  </tr>
                </template>

                <tr v-if="formState.showSubtotals" :ref="(e)=>setRef(e, parentIdx, index)">
                  <th :colspan="fixedColumns.length == 3?2:1" class="thTop" style="background: #f3f3f3;vertical-align: middle;">
                    <div class="data-grid-table-cell-box">
                      小计2
                    </div>
                  </th>
                  <td v-for="(row, idx) in columns2" :key="idx" style="background: #f3f3f3;">
                    <div class="data-grid-table-cell-box" v-for="(countItem,countIdx) in aggregates.slice(0, aggregates.length-1)" :key="countIdx">
                      <span v-if="countItem.slice(2,countItem.length) == row.field">
                        <span v-if="countLabel(countItem)!=''">{{countLabel(countItem)}}：</span>
                        {{parent.aggregates[countIdx].label}}
                      </span>
                    </div>
                  </td>
                </tr>
              </template>
              <tr v-if="formState.showSubtotals" :ref="(e)=>setRef(e, parentIdx)">
                <th :colspan="fixedColumns.length" class="thTop" style="background: #f3f3f3;vertical-align: middle;">
                  <div class="data-grid-table-cell-box">
                    小计
                  </div>
                </th>
                <td v-for="(row, idx) in columns2" :key="idx" style="background: #f3f3f3;">
                  <div class="data-grid-table-cell-box" v-for="(countItem,countIdx) in aggregates.slice(0, aggregates.length-1)" :key="countIdx">
                    <span v-if="countItem.slice(2,countItem.length) == row.field">
                      <span v-if="countLabel(countItem)!=''">{{countLabel(countItem)}}：</span>
                      {{parent.aggregates[countIdx].label}}
                    </span>
                  </div>
                </td>
              </tr>
            </template>
            <!-- <tr v-if="formState.showSubtotals">
              <th colspan="2" class="thTop" style="background: #f3f3f3;vertical-align: middle;">
                <div class="data-grid-table-cell-box">
                  小计
                </div>
              </th>
              <td v-for="(row, idx) in columns2" :key="idx" style="background: #f3f3f3; border-top:1px solid #e1e6ef;">
                <div class="data-grid-table-cell-box" v-for="(countItem,countIdx) in aggregates.slice(0, aggregates.length-1)" :key="countIdx">
                  <span v-if="countItem.slice(2,countItem.length) == row.field">
                    {{factMap['T!T'].aggregates[countIdx].label}}
                  </span>
                </div>
              </td>
            </tr> -->
            <tr v-if="formState.showGrandTotal" ref="grandTotalRef">
              <th :colspan="fixedColumns.length" class="thTop" style="background: #eef7fc;vertical-align: middle;border-top: 1px solid #a8b8c7;">
                <div class="data-grid-table-cell-box">
                  合计
                </div>
              </th>
              <td v-for="(row, idx) in columns2" :key="idx" style="background: #eef7fc;border-top: 1px solid #a8b8c7;">
                <div class="data-grid-table-cell-box" v-for="(countItem,countIdx) in aggregates.slice(0, aggregates.length-1)" :key="countIdx">
                  <span v-if="countItem.slice(2,countItem.length) == row.field">
                    <span v-if="countLabel(countItem)!=''">{{countLabel(countItem)}}：</span>
                    {{factMap['T!T'].aggregates[countIdx].label}}
                  </span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
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
  import Interface from "@/utils/Interface.js";
  const { proxy } = getCurrentInstance();
  import { useRouter, useRoute } from "vue-router";
  const router = useRouter();
  const route = useRoute();
  const headFiexdRef = ref(null);
  const leftFiexdRef = ref(null);
  const gridTableRef = ref(null);

  const thRef0 = ref(null);
  const thRef1 = ref(null);
  const thRef2 = ref(null);

  const itemRefs = {};
  const grandTotalRef = ref(null);


  const props = defineProps({
    runReportData: Object,
    formState: Object
  });

  
  const data = reactive({
    columns: [],
    listData: [],
    detailColumnInfo: {},
    fixedColumns: [],
    factMap: {},
    aggregates: [], // 合计字段
    groupingsDown: [],
    columns2: [],
    groupings: {},
    total: 0,
    rowTotal: 0,
    // summarys: ['总和','平均','最大值','最小值','中值']
    summarys:[
      {
        id: 1,
        name: '总和'
      },
      {
        id: 2,
        name: '平均'
      },
      {
        id: 3,
        name: '最大值'
      },
      {
        id: 4,
        name: '最小值'
      },
      {
        id: 5,
        name: '中值'
      },
    ],
    listData2: [],
    width: 0,
    grandTotalHeight: 0
  })

  const { columns, listData, detailColumnInfo, fixedColumns, factMap, columns2, groupings, total, rowTotal, aggregates, summarys, listData2, width, grandTotalHeight } = toRefs(data);

  watch(()=>props.formState.showSubtotals, (newVal, oldVal)=>{
    // console.log("newVal", newVal);
    if(!newVal){
      data.rowTotal = data.rowTotal - data.listData.length;
    }else {
      data.rowTotal = data.rowTotal + data.listData.length;
    }
  }, {deep: true, immediate: true});
  

  const getTableConfig = () => {
    // console.log(" props.runReportData", props.runReportData);
    let detailColumns = props.runReportData.reportMetadata.detailColumns;
    let detailColumnInfo = props.runReportData.reportExtendedMetadata.detailColumnInfo;
    data.detailColumnInfo = detailColumnInfo;
    let groupingsDown = props.runReportData.reportMetadata.groupingsDown;
    let groupingColumnInfo = props.runReportData.reportExtendedMetadata.groupingColumnInfo;
    data.aggregates = props.runReportData.reportMetadata.aggregates;
    // console.log("data.aggregates", data.aggregates);
    let columns = [];
    let fixedColumns = [];
    detailColumns.forEach(item => {
      detailColumnInfo[item].field = item;
      detailColumnInfo[item].summarys = [];
      detailColumnInfo[item].sort = 'asc';
      columns.push(detailColumnInfo[item])
    });

    groupingsDown.forEach(item => {
      fixedColumns.push(groupingColumnInfo[item.name]);
    })
    data.fixedColumns = fixedColumns;
    data.columns2 = columns;
    data.columns = [...fixedColumns, ...columns];
    // console.log("columns2",data.columns2);
    // console.log("fixedColumns", data.fixedColumns);
    // console.log("columns", data.columns);
    let groupings = props.runReportData.groupingsDown.groupings;
    data.groupings = groupings;
    let factMap = props.runReportData.factMap;
    data.factMap = factMap;
    // console.log("groupings", groupings[0].groupings);
    // console.log("factMap",factMap);

    let listData = [];
    let list2 = [];
    groupings[0].groupings.forEach(item=>{
      // console.log(factMap[item.key+'!T'])

      // factMap[item.key+'!T'].rows.push({
      //   dataCells: factMap[item.key+'!T'].rows[0].dataCells,
      //   aggregates: factMap[item.key+'!T'].aggregates,
      //   isCount: true
      // })
      
      // factMap[item.key+'!T'].rows.forEach(row=>{
      //   listData.push(row);
      // });
      data.total += Number(factMap[item.key+'!T'].rows.length) ;

      list2.push({
        rows: factMap[item.key+'!T'].rows,
        aggregates: factMap[item.key+'!T'].aggregates,
      });

    })
    data.rowTotal = data.total + list2.length;
    // console.log("rowTotal", data.rowTotal);
    // console.log("listData", listData);
    // console.log("list2:", list2);
    // data.listData = listData;
    // data.listData = list2;
    formList(data.groupings);
    // 计算固定列的宽度
    let width = 0;
    nextTick(()=>{
      if(thRef0.value){
        width += thRef0.value[0].clientWidth;
      }
      if(thRef1.value){
        width += thRef1.value[0].clientWidth;
      }
      if(thRef2.value){
        width += thRef2.value[0].clientWidth;
      }
      data.width = width + 1;
      // console.log("width:", width);
      // console.log("itemRefs:", itemRefs);

      let len = data.fixedColumns.length;
      data.groupings.forEach((parent,parentIdx)=>{
        if(Object.keys(itemRefs[parentIdx]).length){
          parent.height = itemRefs[parentIdx].el.clientHeight;
        }
        parent.groupings.forEach((item, index)=>{
          let key = parentIdx + '_' + index;
          // console.log("itemRefs[key]", itemRefs[key].el.clientHeight);
          let height = itemRefs[key].el.clientHeight;
          item.height = height;
          if(len==3){
            item.groupings.forEach((row,rowIdx)=>{
              let key = parentIdx + '_' + index + '_' + rowIdx;
              let height = itemRefs[key].el.clientHeight;
              row.height = height;
            })
          }
        })
      });
      data.grandTotalHeight = grandTotalRef.value.clientHeight;
    })
  }
  

  const formList = (list, level = 0, result = []) => {
    list.forEach(item=>{
      if(item.groupings.length){
        formList(item.groupings, level + 1, result);
      }
      let key = item.key+'!T';
      item.aggregates = data.factMap[key].aggregates;
      if(item.groupings.length == 0){
        // item.groupings.concat(data.factMap[key].rows)
        data.factMap[key].rows.forEach(row=>{
          row.level = level+1;
          data.listData2.push(row);
          item.groupings.push(row)
        })
      }
      
    })
    // console.log("data.listData2", data.listData2);

    // console.log("data.groupings2", data.groupings);
  }
  getTableConfig();

  const countRowspan = (parent, parentIdx) =>{

    let count = 0;
    if(data.groupings.length == 1){
      if(props.formState.showSubtotals){
        count = 7;
      }
      parent.groupings.forEach(item=>{
        count += item.groupings.length;
      })
    }
    if(data.fixedColumns.length == 2){
      if(data.groupings.length > 1){
        parent.groupings.forEach(item=>{
          if(props.formState.showSubtotals){
            count += item.groupings.length + 1;
          }else {
            count += item.groupings.length;
          }
        })
      }
    }
    if(data.fixedColumns.length == 3){
      // console.log("parent-3", parent);
      if(data.groupings.length > 1){
        parent.groupings.forEach(item=>{
          item.groupings.forEach(row=>{
            if(props.formState.showSubtotals){
              count += row.groupings.length + 1 + 1;
            }else {
              count += row.groupings.length;
            }
          })
        })
      }
    }
    return count;
  }

  const rowspan2 = (parentIdx, index, rowIndex, columnIndex, item) => {
    let rowspan;
    if(rowIndex % item.groupings.length === 0){
      // if(columnIndex == 1){
      //   rowspan = item.groupings.length;
      // }
      if(columnIndex == 0){
        rowspan = item.groupings.length;
      }
    }
    return rowspan;
  }

  const rowspan = (item, index, thIdx) => {
    // console.log(item, index, thIdx);
    let rowspan = data.rowTotal;
    if(index!=0){
      rowspan = item.rows.length;
    }
    return rowspan;
  }


  const countLabel = (countItem) => {
    let label;
    const type = countItem.split('!')[0];
    switch(type){
      case 's':
        // 总计-不显示
        label = '';
        break;
      case 'a':
        label = '平均值';
        break;
      case 'ma':
        label = '最大值';
        break;
      case 'm':
        label = '最新值';
        break;
    }
    return label;
  }

  onMounted(() => {
    gridTableRef.value.addEventListener("scroll", e => {
      let left = e.target.scrollLeft;
      let top = e.target.scrollTop;
      headFiexdRef.value.scrollLeft = left;
      leftFiexdRef.value.scrollTop = top;
    })
  })

  const handleSelectSum = (item, sumItem) => {
    // console.log('item, sumItem', item, sumItem);
    let index = item.summarys.findIndex(row=>row==sumItem.id);
    // console.log("index", index);
    if(index==-1){
      item.summarys.push(sumItem.id);
    }else {
      item.summarys.splice(index, 1);
    };

  }

  // 列操作
  const handleActionMenu = (e, item, index) => {
    console.log("列表操作", e, item);
    switch (e.key) {
      case 'delete-column':
        data.columns.splice(index, 1);
        let idx = data.columns2.findIndex(row=>row.field==item.field);
        data.columns2.splice(idx, 1);
        data.groupings.forEach(parent=>{
          parent.groupings.forEach(row=>{
            row.groupings.forEach(l=>{
              l.dataCells.splice(idx, 1);
            });
          })
        })
        break;
      case 'right':
        // const newIndex = index + 1;
        // if(newIndex >= 2 && newIndex < data.columns.length){
        //   [data.columns[index], data.columns[newIndex]] = [data.columns[newIndex], data.columns[index]];
        //   let idx = data.columns2.findIndex(row=>row.field==item.field);
        //   let newIdx = idx + 1;
        //   [data.columns2[idx], data.columns2[newIdx]] = [data.columns2[newIdx], data.columns2[idx]];
        //   data.groupings.forEach(parent=>{
        //     parent.groupings.forEach(row=>{
        //       row.groupings.forEach(l=>{
        //         [l.dataCells[idx], l.dataCells[newIdx]] = [l.dataCells[newIdx], l.dataCells[idx]];
        //       });
        //     })
        //   })
          
        // }
        moveColumn('right', index, item);
        break;
      case 'left':
        moveColumn('left', index, item);
        break;
      case 'desc':
        item.sort = 'desc';
        listSort('desc', index, item);
        break;
      case 'asc':
        item.sort = 'asc';
        listSort('asc', index, item);
        break;
      case 'deleteGroup':
        // 删除组

        break;
    }
  }

  // 升序/降序

  const listSort = (sort, index, item) => {
    let idx = data.columns2.findIndex(row=>row.field==item.field);
    data.groupings.forEach(parent=>{
      parent.groupings.forEach(row=>{
        if(sort=='asc'){
          row.groupings.sort((a, b) => a.dataCells[idx].value?.amount - b.dataCells[idx].value?.amount);
        }
        if(sort=='desc'){
          row.groupings.sort((a, b) => b.dataCells[idx].value?.amount - a.dataCells[idx].value?.amount);
        }
      })
    })
  }

  // 向左/向右移动
  const moveColumn = (direction, index, item) => {
    if(direction == 'left' && index > data.fixedColumns.length) {
      const newIndex = index - 1;
      [data.columns[index], data.columns[newIndex]] = [data.columns[newIndex], data.columns[index]];
      let idx = data.columns2.findIndex(row=>row.field==item.field);
      let newIdx = idx - 1;
      [data.columns2[idx], data.columns2[newIdx]] = [data.columns2[newIdx], data.columns2[idx]];
      data.groupings.forEach(parent=>{
        parent.groupings.forEach(row=>{
          row.groupings.forEach(l=>{
            [l.dataCells[idx], l.dataCells[newIdx]] = [l.dataCells[newIdx], l.dataCells[idx]];
          });
        })
      })
    }else if(direction == 'right' && index < data.columns.length - 1) {
      const newIndex = index + 1;
      [data.columns[index], data.columns[newIndex]] = [data.columns[newIndex], data.columns[index]];
      let idx = data.columns2.findIndex(row=>row.field==item.field);
      let newIdx = idx + 1;
      [data.columns2[idx], data.columns2[newIdx]] = [data.columns2[newIdx], data.columns2[idx]];
      data.groupings.forEach(parent=>{
        parent.groupings.forEach(row=>{
          row.groupings.forEach(l=>{
            [l.dataCells[idx], l.dataCells[newIdx]] = [l.dataCells[newIdx], l.dataCells[idx]];
          });
        })
      })
    }
  }

  const setRef = (el, parentIdx, index, twoIdx) => {
    // let key = parentIdx;
    // if(index != undefined && twoIdx != undefined){
    //   key = parentIdx+'_'+index+'_'+twoIdx;
    // }else if(index != undefined){
    //   key = parentIdx+'_'+index;
    // }
    // if(el && el != null) {
    //   itemRefs[key] = {
    //     name: "ref_" + key,
    //     el,
    //   }
    // }
  }

</script>
<style lang="less" scoped>
  .tableGridWrap {
    width: 100%;
    height: 100%;

    .data-grid {
      width: 100%;
      height: 100%;
      position: relative;

      .data-grid-table-ctr {
        /* width: 100%; */
        height: 100%;
        position: absolute;
        overflow: auto;
        background: #fff;

        &.head {
          /* width: calc(~"100% - 17px"); */
        }

        &.leftFiexd {
          /* height: calc(~"100% - 18px"); */
            tr{
              border-right: 1px solid #a8b8c7;
              th.borderRightNone{
                border-right: none;
              }
            }
        }
      }

      .data-grid-table.data-grid-fixed-row-column-table {
        width: 100%;
        tr{
          th:last-child{
            border-right:1px solid #a8b8c7;
          }
        }
      }

      .data-grid-table.data-grid-fixed-row-table {
        width: 3225px;
        table-layout: fixed;
        border-collapse: collapse;
      }

      .data-grid-table.data-grid-fixed-column-table {
        width: 40px;
      }

      .data-grid-table {
        /* width: 100%; */
        width: 3241px;
        table-layout: fixed;
        border-collapse: collapse;
        thead {
          tr {
            th {
              /* min-width: 400px; */
              background-color: #f3f3f3;
              color: #444;
              vertical-align: middle;
              font-weight: bold;
              cursor: pointer;
              fill: #747474;
              border-left: 1px solid #e1e6ef;
              border-color: #c7d4e1;
              text-align: left;
              font-size: 13px;
              border-bottom: none;
              height: 36px;

              &:first-child {
                border-left: none;
              }

              &:hover {
                color: #0176d3;
                /* border-right: 3px solid #dddbda; */
              }

              .data-grid-table-cell-box {
                padding: 6px;

                .table-cell-measure-header {
                  display: flex;
                  align-items: center;
                  overflow: hidden;
                  line-height: 16px;
                  justify-content: space-between;

                  .table-cell-measure-header-icons {
                    .fh-btn {
                      width: 16px;
                      height: 16px;
                      padding: 0;
                      border-color: #c9c9c9;
                      background: #f3f3f3;
                      border-radius: 2px;
                      color: #7d98b3;

                      .btn_icon {
                        /* fill: #7d98b3; */
                        transform: scale(.76);
                        fill: currentColor;
                      }

                      &:hover {
                        border-color: #7d98b3;
                        color: #747474;
                      }
                    }
                  }
                }
              }
            }

            /* th:first-child{
                width: 41px;
                height: 36px;
              } */
          }
        }

        tbody {
          tr {
            border-top: 1px solid #e1e6ef;
            height: 36px;

            th {
              min-width: 40px;
              font-size: 13px;
              color: #444;
              line-height: 36px;
              font-weight: bold;
              border-right: 1px solid #e1e6ef;
              .data-grid-table-cell-box{
                font-size: 12px;
              }
            }
            th.thTop{
              line-height: inherit;
              vertical-align: top;
              text-align: left;
              .data-grid-table-cell-box{
                padding: 6px;
              }
            }
            th.borderRightNone{
              border-right: none;
            }

            td {
              overflow: hidden;
              position: relative;
              background-clip: padding-box;
              font-size: 12px;
              font-weight: 400;
              color: #16315a;
              fill: #16315a;
              line-height: 1;
              background: #fff;
              white-space: normal;
              word-break: break-word;
              vertical-align: top;
              border-left: 1px solid #e1e6ef;

              .data-grid-table-cell-box {
                height: 18px;
                padding: 8px;
              }
            }
            td.borderLeftNone {
              border-left: none;
            }
          }
        }

        .data-grid-table-cell.data-grid-header-cell {
          color: #444;
          background-color: #f3f3f3;
          /* border-bottom: 2px solid #c9c9c9; */
          vertical-align: top;
          /* border-right: 1px solid #a8b8c7; */
        }

        .data-grid-table-cell.data-grid-table-cell-fixed-column-divider {
          border-right: 1px solid #a8b8c7;
        }

        .data-grid-table-row.data-grid-table-row-fixed-row-divider {
          border-bottom: 1px solid #a8b8c7;
        }
      }
    }
  }

  .menuItemAction {
    white-space: nowrap;

    .btn_icon {
      width: 16px;
      height: 16px;
      transform: scale(.875, .875);
      margin-right: 8px;
      fill: #706d6b;
    }
  }

  .data-grid-table-cell-box {
    padding: 6px;

    .table-cell-measure-header {
      display: flex;
      align-items: center;
      overflow: hidden;
      line-height: 16px;
      justify-content: space-between;

      .table-cell-measure-header-icons {
        .fh-btn {
          width: 16px;
          height: 16px;
          padding: 0;
          border-color: #c9c9c9;
          background: #f3f3f3;
          border-radius: 2px;
          color: #7d98b3;

          .btn_icon {
            /* fill: #7d98b3; */
            transform: scale(.76);
            fill: currentColor;
          }

          &:hover {
            border-color: #7d98b3;
            color: #747474;
          }
        }
      }
    }
  }
  .menuItemAction{
    display: flex;
    align-items: center;
  }
  .has-divider{
    margin-top: 8px;
    padding-top: 8px;
    border-top: 1px solid #c9c9c9;
  }
  .sumBox{
    padding: 4px 0;
    li{
      line-height: 33px;
      cursor: pointer;
      padding: 0 4px;
      &:hover{
        background: #f3f3f3;
      }
      span{
        display: inline-block;
        min-width: 20px;
      }
    }
  }
  tbody{
    tr{
      th{
        background: #f3f3f3;
        text-align: left;
        vertical-align: top;
        .data-grid-table-cell-box{
          padding: 6px;
        }
        td{
          max-height: 36px;
        }
      }
    }
  }
</style>
<style lang="less">
  .fh-menu {
    max-height: 500px !important;
  }
  .fh-menu .ant-dropdown-menu-item{
    height: 33px;
    line-height: 33px;
  }
  .ant-dropdown-menu-submenu.ant-dropdown-menu-submenu-popup{
    width: 96px;
    border: 1px solid #747474;
    background: #fff;
    box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.16);
    color: #181818;
    border-radius: 4px;
    padding: 0;
  }
  .ant-dropdown-menu.ant-dropdown-menu-sub{
    padding: 0 !important;
    margin: 0 !important;
    ul{
      padding: 0;
      margin: 0;
    }
  }
  ul.ant-dropdown-menu-sub{
    padding: 0;
  }
  .ant-dropdown-menu-submenu-title{
    display: flex;
  }
</style>