<template>
    <div class="MessageHomeWrap" :style="{height:height+'px'}">
        <div class="messagesLayout">
            <section class="appNavbar">
                <div class="appNavbar-navHeader">
                    <div class="navHeader_avatarContainer">
                        <div class=""><span
                                class="ud__avatar ud__avatar-filled ud__avatar-circle ud__avatar-image larkc-avatar larkw-avatar navHeader_avatar"
                                style="width: 32px; height: 32px;"><img class="ud__avatar__image"
                                    src="https://s1-imfile.feishucdn.com/static-resource/v1/v3_00hq_fc6123dd-0b2d-421b-8e8f-60267cb317ag~?image_size=96x96&cut_type=&quality=_q70&format=webp&sticker_format=.webp"
                                    alt=""></span></div>
                    </div>
                    <div class="quick-jump-enter">
                        <div class="quick-jump-enter__icon"><span class="universe-icon quick-jump-enter__iconSvg"><svg
                                    width="1em" height="1em" viewBox="0 0 24 24" fill="none"
                                    xmlns="http://www.w3.org/2000/svg" data-icon="MoreAddOutlined">
                                    <path
                                        d="M11 11V8a1 1 0 1 1 2 0v3h3a1 1 0 1 1 0 2h-3v3a1 1 0 1 1-2 0v-3H8a1 1 0 1 1 0-2h3Zm1 10a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0 2C5.925 23 1 18.075 1 12S5.925 1 12 1s11 4.925 11 11-4.925 11-11 11Z"
                                        fill="currentColor"></path>
                                </svg></span></div>
                    </div>
                </div>
                <div class="appNavbar-search-input-wrapper">
                    <div class="appNavbar-search-input"><span class="universe-icon search-input-box-icon"><svg
                                width="1em" height="1em" viewBox="0 0 24 24" fill="none"
                                xmlns="http://www.w3.org/2000/svg" data-icon="SearchOutlined">
                                <path
                                    d="M16.473 17.887A9.46 9.46 0 0 1 10.5 20a9.5 9.5 0 1 1 9.5-9.5 9.46 9.46 0 0 1-2.113 5.973l3.773 3.773a.996.996 0 0 1-.007 1.407.996.996 0 0 1-1.407.007l-3.773-3.773ZM18 10.5a7.5 7.5 0 1 0-15 0 7.5 7.5 0 0 0 15 0Z"
                                    fill="currentColor"></path>
                            </svg></span>
                        <p class="search-input-box-desc">搜索</p>
                        <p class="search-input-box-shortcut">(Ctrl+K)</p>
                    </div>
                </div>
                <div class="appNavbar-navbarMenu">
                    <div class="navbarMenu navbarMenu_active" data-tip="tip-messenger"><span
                            class="universe-icon navbarMenu-icon navbarMenu-icon-active"><svg width="1em" height="1em"
                                viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M9.777 20a9.278 9.278 0 1 0-9.264-8.76 9.216 9.216 0 0 0 2.516 5.865l-.906 1.333A1 1 0 0 0 2.95 20h6.357v-.01c.146.007.294.01.443.01h.026Z"
                                    fill="#336DF4"></path>
                                <path
                                    d="M21.543 19.431a6.016 6.016 0 1 0-4.187 2.088v.012h3.731a1 1 0 0 0 .823-1.568l-.367-.532Z"
                                    fill="#33D6C0"></path>
                            </svg></span><span class="universe-icon navbarMenu-icon navbarMenu-icon-inactive"><svg
                                width="1em" height="1em" viewBox="0 0 24 24" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M9.777 20a9.278 9.278 0 1 0-9.264-8.76 9.216 9.216 0 0 0 2.516 5.865l-.906 1.333A1 1 0 0 0 2.95 20h6.357v-.01c.146.007.294.01.443.01h.026Z"
                                    fill="#336DF4"></path>
                                <path
                                    d="M21.543 19.431a6.016 6.016 0 1 0-4.187 2.088v.012h3.731a1 1 0 0 0 .823-1.568l-.367-.532Z"
                                    fill="#33D6C0"></path>
                            </svg></span><span class="navbarMenu-content">消息</span><span
                            class="ud__badge ud__badge-icon navbarMenu-badge"><sup
                                class="ud__badge__badge ud__badge-has-no-child utgm304 u1ewtqcl u1lmfglv uibjyge u1abmfm4 u9yszdx u1nbblvp uifp7yv u1ov4xf1 u1asdtw4 u1hd9hm2 u10pi13n u1wirg6b uqzzkal unmn6fi u1xvp9sr ud__badge-topRight ud__badge-red-filled">
                                <div class="ud__badge__badge__content">2</div>
                            </sup></span></div>
                    <div class="navbarMenu" data-tip="tip-videoconference" @click="handleTo('/lightning/o/Meeting/home')"><span
                            class="universe-icon navbarMenu-icon navbarMenu-icon-active"><svg width="1em" height="1em"
                                viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="m16 9.7 5.02-4.023C22.353 4.927 24 5.89 24 7.42v9.16c0 1.53-1.647 2.494-2.98 1.744L16 14.3V9.7Z"
                                    fill="#33D6C0"></path>
                                <path
                                    d="M0 5.25C0 4.007.895 3 2 3h14c1.105 0 2 1.007 2 2.25v13.5c0 1.243-.895 2.25-2 2.25H2c-1.105 0-2-1.007-2-2.25V5.25Z"
                                    fill="#336DF4"></path>
                                <path d="M6 7a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z" fill="#fff"></path>
                            </svg></span><span class="universe-icon navbarMenu-icon navbarMenu-icon-inactive"><svg
                                width="1em" height="1em" viewBox="0 0 24 24" fill="none"
                                xmlns="http://www.w3.org/2000/svg" data-icon="TabVideoFilled">
                                <path
                                    d="M2 3C.895 3 0 4.007 0 5.25v13.5C0 19.992.895 21 2 21h14c1.105 0 2-1.008 2-2.25v-2.847l3.02 2.42c1.333.75 2.98-.213 2.98-1.743V7.42c0-1.53-1.647-2.493-2.98-1.743L18 8.097V5.25C18 4.007 17.105 3 16 3H2Zm2 6a2 2 0 1 1 4 0 2 2 0 0 1-4 0Z"
                                    fill="currentColor"></path>
                            </svg></span><span class="navbarMenu-content">会议</span></div>
                    <div class="navbarMenu" data-tip="tip-calendar" @click="handleTo('/lightning/o/Event/home')"><span
                            class="universe-icon navbarMenu-icon navbarMenu-icon-active"><svg width="1em" height="1em"
                                viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2 6h20v14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6Z" fill="#336DF4"></path>
                                <path d="M2 4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v2H2V4Z" fill="#33D6C0"></path>
                                <path
                                    d="M6.226 17.5h5.4v-1.337H8.11c.073-.263.263-.505.6-.705l1.484-.863c.958-.548 1.442-1.337 1.442-2.295 0-1.316-1.02-2.421-2.653-2.421-1.673 0-2.684 1.158-2.684 2.463 0 .19.021.421.053.537l1.495.042a1.464 1.464 0 0 1-.053-.41c0-.727.463-1.222 1.19-1.222.631 0 1.073.453 1.073 1.043 0 .547-.252.894-.895 1.273l-1.231.716c-1.326.768-1.695 1.884-1.705 3.179Zm6.152 0h5.4v-1.337h-3.516c.074-.263.263-.505.6-.705l1.484-.863c.958-.548 1.442-1.337 1.442-2.295 0-1.316-1.02-2.421-2.652-2.421-1.674 0-2.684 1.158-2.684 2.463 0 .19.02.421.052.537L14 12.92a1.465 1.465 0 0 1-.053-.41c0-.727.463-1.222 1.19-1.222.631 0 1.073.453 1.073 1.043 0 .547-.252.894-.894 1.273l-1.232.716c-1.326.768-1.694 1.884-1.705 3.179Z"
                                    fill="#fff"></path>
                            </svg></span><span class="universe-icon navbarMenu-icon navbarMenu-icon-inactive"><svg
                                width="1em" height="1em" viewBox="0 0 24 24" fill="none"
                                xmlns="http://www.w3.org/2000/svg" data-icon="Calendar22Filled">
                                <path
                                    d="M2 4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v1H2V4Zm0 3h20v13a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7Zm9.626 10.5v-1.337H8.11c.074-.263.263-.505.6-.705l1.484-.863c.958-.548 1.442-1.337 1.442-2.295 0-1.316-1.02-2.421-2.652-2.421-1.674 0-2.684 1.158-2.684 2.463 0 .19.02.421.052.537l1.495.042a1.465 1.465 0 0 1-.053-.41c0-.727.463-1.222 1.19-1.222.631 0 1.073.453 1.073 1.043 0 .547-.252.894-.894 1.273l-1.232.716c-1.326.768-1.695 1.884-1.705 3.179h5.4Zm6.152 0v-1.337h-3.516c.074-.263.263-.505.6-.705l1.485-.863c.957-.548 1.442-1.337 1.442-2.295 0-1.316-1.021-2.421-2.653-2.421-1.674 0-2.684 1.158-2.684 2.463 0 .19.02.421.053.537l1.494.042a1.465 1.465 0 0 1-.052-.41c0-.727.463-1.222 1.19-1.222.63 0 1.073.453 1.073 1.043 0 .547-.253.894-.895 1.273l-1.232.716c-1.326.768-1.694 1.884-1.705 3.179h5.4Z"
                                    fill="currentColor"></path>
                            </svg></span><span class="navbarMenu-content">日历</span></div>
                    <!-- <div class="navbarMenu" data-tip="tip-space"><span
                            class="universe-icon navbarMenu-icon navbarMenu-icon-active"><svg width="1em" height="1em"
                                viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4 1a2 2 0 0 0-2 2v17a2 2 0 0 0 2 2h16V3a2 2 0 0 0-2-2H4Z" fill="#336DF4">
                                </path>
                                <path
                                    d="M6 7a1 1 0 0 1 1-1h5.8a1 1 0 1 1 0 2H7a1 1 0 0 1-1-1Zm1 3a1 1 0 1 0 0 2h1.8a1 1 0 1 0 0-2H7Z"
                                    fill="#fff"></path>
                                <path
                                    d="M19.597 22h.927c1.73 0 3.133-1.414 3.133-3.159a3.172 3.172 0 0 0-2.842-3.144c-.206-2.265-1.915-4.032-4.24-4.032-1.91 0-3.618 1.193-4.302 2.875A3.732 3.732 0 0 0 12.53 22h7.066Z"
                                    fill="#33D6C0"></path>
                            </svg></span><span class="universe-icon navbarMenu-icon navbarMenu-icon-inactive"><svg
                                width="1em" height="1em" viewBox="0 0 24 24" fill="none"
                                xmlns="http://www.w3.org/2000/svg" data-icon="SpaceFilled">
                                <path
                                    d="M2 3a2 2 0 0 1 2-2h15a2 2 0 0 1 2 2v10.423A5.678 5.678 0 0 0 17.22 12a5.724 5.724 0 0 0-5.247 3.427A4.999 4.999 0 0 0 9.996 23H4a2 2 0 0 1-2-2V3Zm3 3a1 1 0 0 0 1 1h11a1 1 0 1 0 0-2H6a1 1 0 0 0-1 1Zm1 3.5a1 1 0 1 0 0 2h4a1 1 0 1 0 0-2H6Z"
                                    fill="currentColor"></path>
                                <path
                                    d="M17.22 14a3.732 3.732 0 0 1 3.705 3.284l.075.027A2.937 2.937 0 0 1 19.977 23h-5.981a3 3 0 0 1-.44-5.968A3.731 3.731 0 0 1 17.22 14Z"
                                    fill="currentColor"></path>
                            </svg></span>
                            <span class="navbarMenu-content">云文档</span>
                        </div> -->
                    <div class="navbarMenu" data-tip="tip-contacts" @click="handleTo('/lightning/Addresslist/Org/home')"><span
                            class="universe-icon navbarMenu-icon navbarMenu-icon-active"><svg width="1em" height="1em"
                                viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M5 6.49c0 2.757 2.24 4.991 5 4.991s5-2.234 5-4.99C15 3.734 12.76 1.5 10 1.5S5 3.734 5 6.49Zm3.5 5.99c-5 0-7.5 3.68-7.5 6.988V21c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-1.532c0-3.307-2.5-6.968-7.5-6.968l-3-.02Z"
                                    fill="#336DF4"></path>
                                <path
                                    d="M17 10a1 1 0 0 1 1-1h4a1 1 0 1 1 0 2h-4a1 1 0 0 1-1-1Zm3 4a1 1 0 0 1 1-1h1a1 1 0 1 1 0 2h-1a1 1 0 0 1-1-1Z"
                                    fill="#33D6C0"></path>
                                <path
                                    d="M17 10a1 1 0 0 1 1-1h4a1 1 0 1 1 0 2h-4a1 1 0 0 1-1-1Zm3 4a1 1 0 0 1 1-1h1a1 1 0 1 1 0 2h-1a1 1 0 0 1-1-1Z"
                                    fill="#33D6C0"></path>
                            </svg></span><span class="universe-icon navbarMenu-icon navbarMenu-icon-inactive"><svg
                                width="1em" height="1em" viewBox="0 0 24 24" fill="none"
                                xmlns="http://www.w3.org/2000/svg" data-icon="TabContactsFilled">
                                <path
                                    d="M10 11.481c-2.76 0-5-2.234-5-4.99C5 3.734 7.24 1.5 10 1.5s5 2.234 5 4.99a4.996 4.996 0 0 1-5 4.991Zm-9 7.987c0-3.307 2.5-6.989 7.5-6.989l3 .021c5 0 7.5 3.66 7.5 6.968V21c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2v-1.532ZM18 9a1 1 0 1 0 0 2h4a1 1 0 1 0 0-2h-4Zm3 4a1 1 0 1 0 0 2h1a1 1 0 1 0 0-2h-1Z"
                                    fill="currentColor"></path>
                            </svg></span><span class="navbarMenu-content">通讯录</span></div>
                    <div class="navbarMenu" data-tip="tip-mail" @click="handleTo('/email')"><span
                            class="universe-icon navbarMenu-icon navbarMenu-icon-active"><svg width="1em" height="1em"
                                viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 5a2 2 0 0 1 2-2h18a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V5Z"
                                    fill="#33D6C0"></path>
                                <path
                                    d="M3 3a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2V5c0-.16-.019-.315-.054-.463l-9.717 6.625a2.182 2.182 0 0 1-2.458 0L1.055 4.538A2 2 0 0 1 3.001 3H3Z"
                                    fill="#336DF4"></path>
                            </svg></span><span class="universe-icon navbarMenu-icon navbarMenu-icon-inactive"><svg
                                width="1em" height="1em" viewBox="0 0 24 24" fill="none"
                                xmlns="http://www.w3.org/2000/svg" data-icon="TabMailFilled">
                                <path
                                    d="M10.771 11.162 1.055 4.538A2 2 0 0 1 3.001 3h18a2 2 0 0 1 1.946 1.536l-9.718 6.626a2.182 2.182 0 0 1-2.458 0Z"
                                    fill="currentColor"></path>
                                <path
                                    d="M1 19V6.821l9.281 6.329a2.713 2.713 0 0 0 3.057 0L23 6.562V19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2Z"
                                    fill="currentColor"></path>
                            </svg></span><span class="navbarMenu-content">邮箱</span></div>
                    <!-- <div class="navbarMenu" data-tip="tip-todo"><span
                            class="universe-icon navbarMenu-icon navbarMenu-icon-active"><svg width="1em" height="1em"
                                viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M20.2 3.63a1 1 0 0 0-1.415 0L6.05 16.367a1 1 0 0 0 0 1.414l2.828 2.829a1 1 0 0 0 1.414 0L23.028 7.873a1 1 0 0 0 0-1.414l-2.829-2.828Z"
                                    fill="#336DF4"></path>
                                <path
                                    d="M4.636 7.88a1 1 0 0 0-1.414 0L.393 10.71a1 1 0 0 0 0 1.413l2.829 2.829a1 1 0 0 0 1.414 0l2.829-2.829a1 1 0 0 0 0-1.414L4.636 7.881Z"
                                    fill="#33D6C0"></path>
                            </svg></span><span class="universe-icon navbarMenu-icon navbarMenu-icon-inactive"><svg
                                width="1em" height="1em" viewBox="0 0 24 24" fill="none"
                                xmlns="http://www.w3.org/2000/svg" data-icon="TabTodoFilled">
                                <path
                                    d="M20.2 3.63a1 1 0 0 0-1.415 0L6.05 16.367a1 1 0 0 0 0 1.414l2.83 2.829a1 1 0 0 0 1.414 0L23.028 7.873a1 1 0 0 0 0-1.414L20.2 3.631ZM4.636 7.88a1 1 0 0 0-1.414 0L.393 10.71a1 1 0 0 0 0 1.414l2.829 2.829a1 1 0 0 0 1.414 0l2.829-2.829a1 1 0 0 0 0-1.414L4.636 7.881Z"
                                    fill="currentColor"></path>
                            </svg></span><span class="navbarMenu-content">任务</span></div>
                    <div class="navbarMenu" data-tip="tip-openplatform"><span
                            class="universe-icon navbarMenu-icon navbarMenu-icon-active"><svg width="1em" height="1em"
                                viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M13 15a2 2 0 0 1 2-2h3a5 5 0 1 1-5 5v-3Z" fill="#33D6C0"></path>
                                <path
                                    d="M1 6a5 5 0 0 1 10 0v3a2 2 0 0 1-2 2H6a5 5 0 0 1-5-5Zm0 12a5 5 0 0 1 5-5h3a2 2 0 0 1 2 2v3a5 5 0 0 1-10 0ZM18 1a5 5 0 0 0-5 5v3a2 2 0 0 0 2 2h3a5 5 0 0 0 0-10Z"
                                    fill="#336DF4"></path>
                            </svg></span><span class="universe-icon navbarMenu-icon navbarMenu-icon-inactive"><svg
                                width="1em" height="1em" viewBox="0 0 24 24" fill="none"
                                xmlns="http://www.w3.org/2000/svg" data-icon="TabAppFilled">
                                <path
                                    d="M1 6a5 5 0 0 1 10 0v3a2 2 0 0 1-2 2H6a5 5 0 0 1-5-5Zm0 12a5 5 0 0 1 5-5h3a2 2 0 0 1 2 2v3a5 5 0 0 1-10 0ZM13 6a5 5 0 1 1 5 5h-3a2 2 0 0 1-2-2V6Zm2 7a2 2 0 0 0-2 2v3a5 5 0 1 0 5-5h-3Z"
                                    fill="currentColor"></path>
                            </svg></span><span class="navbarMenu-content">工作台</span></div> -->
                </div>
                <!-- <div class="appNavbar_bottomList">
                    <section class="navItem-userAuthList">
                        <div class="user-auth-list">
                            <div class="user-auth-list_listContent">
                                <div class="user-auth-list_item">
                                    <div class="user-auth-list_itemBox user-auth-list_itemBox-active"><span
                                            class="ud__avatar ud__avatar-filled ud__avatar-square ud__avatar-image user-auth-list_tenantAvatar"
                                            style="width: 18px; height: 18px;"><img class="ud__avatar__image"
                                                src="https://s3-imfile.feishucdn.com/static-resource/v1/v3_00hq_bd1b6883-2b90-44eb-a06f-c80677a326fg~?image_size=noop&amp;cut_type=&amp;quality=&amp;format=image&amp;sticker_format=.webp"></span>
                                        <div class="user-auth-item_border-box"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <div class="navItem-download">
                        <div class="navbarMenu"><span class="universe-icon navItem-download-icon"><svg width="1em"
                                    height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                                    data-icon="DownloadOutlined">
                                    <path
                                        d="M20 18a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-2a1 1 0 1 1 2 0v1h14v-1a1 1 0 0 1 1-1Zm-7-3.964 2.657-2.657a1 1 0 0 1 1.414 1.414c-1.414 1.415-2.828 2.83-4.244 4.244a1 1 0 0 1-1.412 0c-1.417-1.415-2.833-2.833-4.249-4.25a.993.993 0 0 1 .013-1.401.992.992 0 0 1 1.401-.013l2.42 2.42V3.5a1 1 0 1 1 2 0v10.536Z"
                                        fill="currentColor"></path>
                                </svg></span><span class="navItem-download-content">下载飞书客户端</span></div>
                    </div>
                </div> -->
            </section>
            <main class="appLayout-content">
                <div id="app-page-container">
                    <div class="page-view-messenger" style="width: 448px; display: block;">
                        <div class="page-content-messenger" style="width: 100%; height: 100%;">
                            <div class="page-content-wrapper" data-key="messenger">
                                <div style="width: 100%; height: 100%;">
                                    <div class="larklet-extension-component" style="width: 100%; height: 100%;">
                                        <div class="larklet-extension" id="root-messenger"
                                            style="background-color: rgb(55, 55, 55); width: 100%; height: 100%; border-radius: 4px; overflow: hidden;">
                                            <div class="windows" style="height: 100%;">
                                                <div class="ce86aa5b">
                                                    <div class="_7943ea2a _8593a6c8"></div>
                                                    <div class="_01cd2079" style="min-width: 288px;">
                                                        <div class="_79e103ba"><button type="button"
                                                                class="ud__button ud__button--icon ud__button--icon-default ud__button--icon-size-sm _6f5eec8c"><span
                                                                    class="universe-icon"><svg width="1em" height="1em"
                                                                        viewBox="0 0 24 24" fill="none"
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        data-icon="SideFoldOutlined">
                                                                        <path
                                                                            d="M22 4a1 1 0 0 0-1-1H3a1 1 0 0 0 0 2h18a1 1 0 0 0 1-1Zm-1.111 7c.614 0 1.111.448 1.111 1s-.497 1-1.111 1H13.11c-.613 0-1.11-.448-1.11-1s.498-1 1.111-1h7.778ZM22 20c0-.552-.497-1-1.111-1H13.11c-.614 0-1.111.448-1.111 1s.498 1 1.111 1h7.778c.614 0 1.111-.448 1.111-1ZM8.59 16.864a1.117 1.117 0 0 0 0-1.729l-4.95-3.916c-.676-.535-1.64-.027-1.64.864v7.834c0 .89.964 1.4 1.639.865l4.951-3.918Z"
                                                                            fill="currentColor"></path>
                                                                    </svg></span></button>
                                                            <div class="_415ae08a">
                                                                <div class="_2d6562fa">
                                                                    <div class="a7790e30"><span class="_8ac06fa8"><span
                                                                                class="dc56891e">消息</span></span>
                                                                        <div></div>
                                                                    </div>
                                                                    <div></div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="a83ab3c3">
                                                            <div
                                                                style="display: flex; flex-direction: column; height: 100%; overflow: hidden;">
                                                                <div class="a45b8561">
                                                                    <div></div>
                                                                    <div style="display: none;"></div>
                                                                </div>
                                                                <div class="d23b1368">
                                                                    <div style="height: 100%;">
                                                                        <div class="scroller feed-main-list a11y_feed_main_list lark_feedMainList"
                                                                            style="position: relative; height: 100%; width: 100%; overflow: hidden overlay; transform: translateY(0px); contain: strict;">
                                                                            <div class="scroller_content">
                                                                                <div
                                                                                    style="height: 1px; width: 100%; position: absolute; transform: translate(0px, 257px);">
                                                                                </div>
                                                                                <div class="list_items">
                                                                                    <div
                                                                                        style="width: 100%; top: 0px; left: 0px; position: absolute; transform: translate(0px, 0px);">
                                                                                        <div data-feed-id="7451095679830671364"
                                                                                            style="width: 100%; box-sizing: border-box; height: unset;">
                                                                                            <div class="_7cb0c5d7">
                                                                                                <div class="a11y_feed_card_item a19f79c1"
                                                                                                    data-feed-active="false"
                                                                                                    style="margin-bottom: 2px;">
                                                                                                    <div
                                                                                                        class="_28c819b9">
                                                                                                        <div
                                                                                                            class="_820b531b">
                                                                                                            <div
                                                                                                                class="f4b98803 _29f3a734">
                                                                                                                <div
                                                                                                                    class="avatarWithBadge">
                                                                                                                    <span
                                                                                                                        class="ud__avatar ud__avatar-filled ud__avatar-circle ud__avatar-image larkc-avatar larkw-avatar"
                                                                                                                        style="width: 36px; height: 36px;"><img
                                                                                                                            class="ud__avatar__image"
                                                                                                                            src="https://s1-imfile.feishucdn.com/static-resource/v1/v2_d466a5d8-dea3-47fb-8bc6-73dffb01754g~?image_size=96x96&amp;cut_type=&amp;quality=_q70&amp;format=webp&amp;sticker_format=.webp"
                                                                                                                            alt=""></span>
                                                                                                                </div>
                                                                                                            </div>
                                                                                                            <div
                                                                                                                class="c55172b6 a11y_feed_card_main">
                                                                                                                <div
                                                                                                                    class="_13748d76">
                                                                                                                    <div
                                                                                                                        class="bf344e91">
                                                                                                                        <div
                                                                                                                            class="a4c0e319">
                                                                                                                            <div class="_2b17aec6"
                                                                                                                                style="min-width: 28px;">
                                                                                                                                审批
                                                                                                                            </div>
                                                                                                                            <div
                                                                                                                                class="_65e7cb9a">
                                                                                                                            </div>
                                                                                                                            <div
                                                                                                                                class="_6f26ecc9">
                                                                                                                                <span
                                                                                                                                    class="ud__tag larkw-tag ud__tag-xs ud__tag-rect ud__tag-yellow u1ewtqcl u1lmfglv uibjyge u1abmfm4 u9yszdx u1g0x7ka u8wuabp u1qch9an uycuoez u8wkphi uwsfkhu uff7au0 u1bjk9e1 u113hnb5 utuwxu6 u122n59 uz5stix u7o03ib u15l5c9n u6dzj5z uw295qw unmn6fi ud461yt u1a3p1vp">
                                                                                                                                    <div
                                                                                                                                        class="ud__tag__content ud-typography-caption-1 utgm304 u1ewtqcl u1lmfglv uibjyge u1abmfm4 u9yszdx u1nbblvp uifp7yv u1ov4xf1 u1asdtw4 uiy7161 uz5stix u1a3p1vp u1cmbuwj u1ugzwwg ul9ro5r uee9c6b u1hsvuyd u1hd9hm2">
                                                                                                                                        机器人
                                                                                                                                    </div>
                                                                                                                                </span>
                                                                                                                            </div>
                                                                                                                        </div>
                                                                                                                    </div>
                                                                                                                    <div
                                                                                                                        class="_3766bee7">
                                                                                                                        <div
                                                                                                                            class="ea3292a0">
                                                                                                                            <span
                                                                                                                                class="_49737e67">12:56</span>
                                                                                                                        </div>
                                                                                                                    </div>
                                                                                                                </div>
                                                                                                                <div
                                                                                                                    class="_8cbe53f1">
                                                                                                                    <div
                                                                                                                        class="bea16740">
                                                                                                                        <div>
                                                                                                                            <div
                                                                                                                                class="_5dc097a3">
                                                                                                                                <div
                                                                                                                                    class="_5e10f104">
                                                                                                                                    <span
                                                                                                                                        class="_5d806a78 _8c6de8ac"><span>免费使用，快来开启审批之旅吧</span></span>
                                                                                                                                </div>
                                                                                                                            </div>
                                                                                                                        </div>
                                                                                                                    </div>
                                                                                                                </div>
                                                                                                            </div>
                                                                                                            <div
                                                                                                                class="_23908595">
                                                                                                                <div
                                                                                                                    class="_392fb85f">
                                                                                                                    <div
                                                                                                                        class="_429756d7">
                                                                                                                        <div
                                                                                                                            class="_87b3f492">
                                                                                                                            <div
                                                                                                                                class="a11y_feed_item_done">
                                                                                                                                <span
                                                                                                                                    class="universe-icon"><svg
                                                                                                                                        width="1em"
                                                                                                                                        height="1em"
                                                                                                                                        viewBox="0 0 24 24"
                                                                                                                                        fill="none"
                                                                                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                                                                                        data-icon="DoneOutlined">
                                                                                                                                        <path
                                                                                                                                            d="M9.218 17.41 19.83 6.796a.99.99 0 1 1 1.389 1.415c-3.545 3.425-4.251 4.105-11.419 11.074a.997.997 0 0 1-1.375.017c-1.924-1.8-3.709-3.567-5.573-5.428a.999.999 0 0 1 1.414-1.415l4.95 4.95Z"
                                                                                                                                            fill="currentColor">
                                                                                                                                        </path>
                                                                                                                                    </svg></span>
                                                                                                                            </div>
                                                                                                                        </div>
                                                                                                                    </div>
                                                                                                                </div>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div
                                                                                        style="width: 100%; top: 0px; left: 0px; position: absolute; transform: translate(0px, 62px);">
                                                                                        <div data-feed-id="7451094490993852435"
                                                                                            style="width: 100%; box-sizing: border-box; height: unset;">
                                                                                            <div
                                                                                                class="_7cb0c5d7 _046df368">
                                                                                                <div class="a11y_feed_card_item a19f79c1 _046df368"
                                                                                                    data-feed-active="true"
                                                                                                    style="margin-bottom: 2px;">
                                                                                                    <div
                                                                                                        class="_28c819b9">
                                                                                                        <div
                                                                                                            class="_820b531b">
                                                                                                            <div
                                                                                                                class="f4b98803 _29f3a734">
                                                                                                                <div
                                                                                                                    class="avatarWithBadge">
                                                                                                                    <span
                                                                                                                        class="ud__avatar ud__avatar-filled ud__avatar-circle ud__avatar-image larkc-avatar larkw-avatar"
                                                                                                                        style="width: 36px; height: 36px;"><img
                                                                                                                            class="ud__avatar__image"
                                                                                                                            src="https://s1-imfile.feishucdn.com/static-resource/v1/default-avatar_44ae0ca3-e140-494b-956f-78091e348435~?image_size=96x96&amp;cut_type=&amp;quality=_q70&amp;format=webp&amp;sticker_format=.webp"
                                                                                                                            alt=""></span>
                                                                                                                </div>
                                                                                                            </div>
                                                                                                            <div
                                                                                                                class="c55172b6 a11y_feed_card_main">
                                                                                                                <div
                                                                                                                    class="_13748d76">
                                                                                                                    <div
                                                                                                                        class="bf344e91">
                                                                                                                        <div
                                                                                                                            class="a4c0e319">
                                                                                                                            <div class="_2b17aec6"
                                                                                                                                style="min-width: 18.8542px;">
                                                                                                                                凤凰世纪
                                                                                                                            </div>
                                                                                                                            <div
                                                                                                                                class="_65e7cb9a">
                                                                                                                            </div>
                                                                                                                            <div
                                                                                                                                class="_6f26ecc9">
                                                                                                                                <span
                                                                                                                                    class="ud__tag larkw-tag ud__tag-xs ud__tag-rect ud__tag-blue u1ewtqcl u1lmfglv uibjyge u1abmfm4 u9yszdx u1g0x7ka u8wuabp u1qch9an uycuoez u8wkphi uwsfkhu uff7au0 u1bjk9e1 u113hnb5 utuwxu6 u122n59 uz5stix u7o03ib u15l5c9n u6dzj5z uw295qw unmn6fi ud461yt u1a3p1vp">
                                                                                                                                    <div
                                                                                                                                        class="ud__tag__content ud-typography-caption-1 utgm304 u1ewtqcl u1lmfglv uibjyge u1abmfm4 u9yszdx u1nbblvp uifp7yv u1ov4xf1 u1asdtw4 uiy7161 uz5stix u1a3p1vp u1cmbuwj u1ugzwwg ul9ro5r uee9c6b u1hsvuyd u1hd9hm2">
                                                                                                                                        全员
                                                                                                                                    </div>
                                                                                                                                </span>
                                                                                                                            </div>
                                                                                                                        </div>
                                                                                                                    </div>
                                                                                                                    <div
                                                                                                                        class="_3766bee7">
                                                                                                                        <div
                                                                                                                            class="ea3292a0">
                                                                                                                            <span
                                                                                                                                class="_49737e67">12:53</span>
                                                                                                                        </div>
                                                                                                                    </div>
                                                                                                                </div>
                                                                                                                <div
                                                                                                                    class="_8cbe53f1">
                                                                                                                    <div
                                                                                                                        class="bea16740">
                                                                                                                        <div>
                                                                                                                            <div
                                                                                                                                class="_5dc097a3">
                                                                                                                                <div
                                                                                                                                    class="_5e10f104">
                                                                                                                                    <span
                                                                                                                                        class="_5d806a78 _8c6de8ac"><span>唐元:
                                                                                                                                        </span><span>123</span></span>
                                                                                                                                </div>
                                                                                                                            </div>
                                                                                                                        </div>
                                                                                                                    </div>
                                                                                                                </div>
                                                                                                            </div>
                                                                                                            <div
                                                                                                                class="_23908595">
                                                                                                                <div
                                                                                                                    class="_392fb85f _843bbb9e">
                                                                                                                    <div
                                                                                                                        class="_429756d7">
                                                                                                                        <div
                                                                                                                            class="_87b3f492">
                                                                                                                            <div
                                                                                                                                class="a11y_feed_item_done">
                                                                                                                                <span
                                                                                                                                    class="universe-icon"><svg
                                                                                                                                        width="1em"
                                                                                                                                        height="1em"
                                                                                                                                        viewBox="0 0 24 24"
                                                                                                                                        fill="none"
                                                                                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                                                                                        data-icon="DoneOutlined">
                                                                                                                                        <path
                                                                                                                                            d="M9.218 17.41 19.83 6.796a.99.99 0 1 1 1.389 1.415c-3.545 3.425-4.251 4.105-11.419 11.074a.997.997 0 0 1-1.375.017c-1.924-1.8-3.709-3.567-5.573-5.428a.999.999 0 0 1 1.414-1.415l4.95 4.95Z"
                                                                                                                                            fill="currentColor">
                                                                                                                                        </path>
                                                                                                                                    </svg></span>
                                                                                                                            </div>
                                                                                                                        </div>
                                                                                                                    </div>
                                                                                                                </div>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div
                                                                                        style="width: 100%; top: 0px; left: 0px; position: absolute; transform: translate(0px, 124px);">
                                                                                        <div data-feed-id="7451093134433501186"
                                                                                            style="width: 100%; box-sizing: border-box; height: unset;">
                                                                                            <div class="_7cb0c5d7">
                                                                                                <div class="a11y_feed_card_item a19f79c1"
                                                                                                    data-feed-active="false"
                                                                                                    style="margin-bottom: 2px;">
                                                                                                    <div
                                                                                                        class="_28c819b9">
                                                                                                        <div
                                                                                                            class="_820b531b">
                                                                                                            <div
                                                                                                                class="f4b98803 _29f3a734">
                                                                                                                <div
                                                                                                                    class="avatarWithBadge">
                                                                                                                    <span
                                                                                                                        class="ud__badge ud__badge-icon"><span
                                                                                                                            class="gpf-biz-suite-custom-icon__icon-wrapper gpf-biz-suite-custom-icon__icon-wrapper-background"
                                                                                                                            style="--wrapper-size: 36px; --color: var(--primary-pri-50);"><span
                                                                                                                                class="universe-icon"
                                                                                                                                style="font-size: 22px;"><svg
                                                                                                                                    width="1em"
                                                                                                                                    height="1em"
                                                                                                                                    viewBox="0 0 24 24"
                                                                                                                                    fill="none"
                                                                                                                                    xmlns="http://www.w3.org/2000/svg">
                                                                                                                                    <path
                                                                                                                                        d="M2.5 2.5a1 1 0 0 1 1-1h12.865a5.24 5.24 0 0 1 3.631 1.447A4.848 4.848 0 0 1 21.5 6.441V21.5a1 1 0 0 1-1 1H7.635a5.24 5.24 0 0 1-3.63-1.447A4.849 4.849 0 0 1 2.5 17.559V2.5Z"
                                                                                                                                        fill="#336DF4">
                                                                                                                                    </path>
                                                                                                                                    <path
                                                                                                                                        d="M7 8.7a.7.7 0 0 1 .7-.7h8.6a.7.7 0 1 1 0 1.4H7.7a.7.7 0 0 1-.7-.7Zm0 3.4a.7.7 0 0 1 .7-.7h8.6a.7.7 0 1 1 0 1.4H7.7a.7.7 0 0 1-.7-.7Zm0 3.4a.7.7 0 0 1 .7-.7h4.6a.7.7 0 1 1 0 1.4H7.7a.7.7 0 0 1-.7-.7Z"
                                                                                                                                        fill="#fff">
                                                                                                                                    </path>
                                                                                                                                </svg></span></span><sup
                                                                                                                            class="ud__badge__badge utgm304 u1ewtqcl u1lmfglv uibjyge u1abmfm4 u9yszdx u1nbblvp uifp7yv u1ov4xf1 u1asdtw4 u1hd9hm2 u1euv43f u1wirg6b uqzzkal unmn6fi ud__badge-topRight ud__badge-red-filled"
                                                                                                                            style="top: 0px; right: 0px; transform: translate3d(calc(1.72792px), calc(-1.72792px), 0px);">
                                                                                                                            <div
                                                                                                                                class="ud__badge__badge__content">
                                                                                                                                1
                                                                                                                            </div>
                                                                                                                        </sup></span>
                                                                                                                </div>
                                                                                                            </div>
                                                                                                            <div
                                                                                                                class="c55172b6 a11y_feed_card_main">
                                                                                                                <div
                                                                                                                    class="_13748d76">
                                                                                                                    <div
                                                                                                                        class="bf344e91">
                                                                                                                        <div
                                                                                                                            class="a4c0e319">
                                                                                                                            <div class="_2b17aec6"
                                                                                                                                style="min-width: 30px;">
                                                                                                                                @飞书管理员，你的快速上手指南
                                                                                                                            </div>
                                                                                                                            <div
                                                                                                                                class="_65e7cb9a">
                                                                                                                            </div>
                                                                                                                            <div
                                                                                                                                class="_6f26ecc9">
                                                                                                                            </div>
                                                                                                                        </div>
                                                                                                                    </div>
                                                                                                                    <div
                                                                                                                        class="_3766bee7">
                                                                                                                        <div
                                                                                                                            class="ea3292a0">
                                                                                                                            <span
                                                                                                                                class="_49737e67">12:52</span>
                                                                                                                        </div>
                                                                                                                    </div>
                                                                                                                </div>
                                                                                                                <div
                                                                                                                    class="_8cbe53f1">
                                                                                                                    <div
                                                                                                                        class="bea16740">
                                                                                                                        <div>
                                                                                                                            <div
                                                                                                                                class="_5dc097a3">
                                                                                                                                <div
                                                                                                                                    class="_5e10f104">
                                                                                                                                    <span
                                                                                                                                        class="_5d806a78 _8c6de8ac"><span>云文档助手:
                                                                                                                                            @唐元
                                                                                                                                            关注飞书的上手指南，帮助你快速地了解和使用飞书！</span></span>
                                                                                                                                </div>
                                                                                                                            </div>
                                                                                                                        </div>
                                                                                                                    </div>
                                                                                                                    <div
                                                                                                                        class="e9ee2bc5">
                                                                                                                        <div
                                                                                                                            class="_65659341">
                                                                                                                            <div
                                                                                                                                class="_66c48198 _479e2b7b">
                                                                                                                                <span
                                                                                                                                    class="ud__avatar ud__avatar-filled ud__avatar-circle ud__avatar-image larkc-avatar larkw-avatar"
                                                                                                                                    style="width: 20px; height: 20px;"><img
                                                                                                                                        class="ud__avatar__image"
                                                                                                                                        src="https://s1-imfile.feishucdn.com/static-resource/v1/66ee2566-d3e3-4813-a364-8a339cd0ebeg~?image_size=64x64&amp;cut_type=&amp;quality=_q70&amp;format=webp&amp;sticker_format=.webp"
                                                                                                                                        alt=""></span>
                                                                                                                            </div>
                                                                                                                        </div>
                                                                                                                    </div>
                                                                                                                </div>
                                                                                                            </div>
                                                                                                            <div
                                                                                                                class="_23908595">
                                                                                                                <div
                                                                                                                    class="_392fb85f _72b89054">
                                                                                                                    <div
                                                                                                                        class="_429756d7">
                                                                                                                        <div
                                                                                                                            class="_87b3f492">
                                                                                                                            <div class="a11y_feed_item_done"
                                                                                                                                style="font-size: 16px;">
                                                                                                                                <span
                                                                                                                                    class="universe-icon"><svg
                                                                                                                                        width="1em"
                                                                                                                                        height="1em"
                                                                                                                                        viewBox="0 0 24 24"
                                                                                                                                        fill="none"
                                                                                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                                                                                        data-icon="DoneOutlined">
                                                                                                                                        <path
                                                                                                                                            d="M9.218 17.41 19.83 6.796a.99.99 0 1 1 1.389 1.415c-3.545 3.425-4.251 4.105-11.419 11.074a.997.997 0 0 1-1.375.017c-1.924-1.8-3.709-3.567-5.573-5.428a.999.999 0 0 1 1.414-1.415l4.95 4.95Z"
                                                                                                                                            fill="currentColor">
                                                                                                                                        </path>
                                                                                                                                    </svg></span>
                                                                                                                            </div>
                                                                                                                        </div>
                                                                                                                    </div>
                                                                                                                </div>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div
                                                                                        style="width: 100%; top: 0px; left: 0px; position: absolute; transform: translate(0px, 186px);">
                                                                                        <div data-feed-id="7012068918915350531"
                                                                                            style="width: 100%; box-sizing: border-box; height: unset;">
                                                                                            <div class="_7cb0c5d7">
                                                                                                <div class="a11y_feed_card_item a19f79c1"
                                                                                                    data-feed-active="false"
                                                                                                    style="margin-bottom: 2px;">
                                                                                                    <div
                                                                                                        class="_28c819b9">
                                                                                                        <div
                                                                                                            class="_820b531b">
                                                                                                            <div
                                                                                                                class="f4b98803 _29f3a734">
                                                                                                                <div
                                                                                                                    class="avatarWithBadge">
                                                                                                                    <span
                                                                                                                        class="ud__badge ud__badge-icon"><span
                                                                                                                            class="ud__avatar ud__avatar-filled ud__avatar-circle ud__avatar-image larkc-avatar larkw-avatar"
                                                                                                                            style="width: 36px; height: 36px;"><img
                                                                                                                                class="ud__avatar__image"
                                                                                                                                src="https://s1-imfile.feishucdn.com/static-resource/v1/v2_2934b1c2-bad3-4beb-8f16-1c6d0c86bbfg~?image_size=96x96&amp;cut_type=&amp;quality=_q70&amp;format=webp&amp;sticker_format=.webp"></span><sup
                                                                                                                            class="ud__badge__badge utgm304 u1ewtqcl u1lmfglv uibjyge u1abmfm4 u9yszdx u1nbblvp uifp7yv u1ov4xf1 u1asdtw4 u1hd9hm2 u1euv43f u1wirg6b uqzzkal unmn6fi ud__badge-topRight ud__badge-red-filled"
                                                                                                                            style="top: 0px; right: 0px; transform: translate3d(calc(1.72792px), calc(-1.72792px), 0px);">
                                                                                                                            <div
                                                                                                                                class="ud__badge__badge__content">
                                                                                                                                1
                                                                                                                            </div>
                                                                                                                        </sup></span>
                                                                                                                </div>
                                                                                                            </div>
                                                                                                            <div
                                                                                                                class="c55172b6 a11y_feed_card_main">
                                                                                                                <div
                                                                                                                    class="_13748d76">
                                                                                                                    <div
                                                                                                                        class="bf344e91">
                                                                                                                        <div
                                                                                                                            class="a4c0e319">
                                                                                                                            <div class="_2b17aec6"
                                                                                                                                style="min-width: 30px;">
                                                                                                                                快速开始
                                                                                                                            </div>
                                                                                                                            <div
                                                                                                                                class="_65e7cb9a">
                                                                                                                            </div>
                                                                                                                            <div
                                                                                                                                class="_6f26ecc9">
                                                                                                                                <span
                                                                                                                                    class="ud__tag larkw-tag ud__tag-xs ud__tag-rect ud__tag-blue u1ewtqcl u1lmfglv uibjyge u1abmfm4 u9yszdx u1g0x7ka u8wuabp u1qch9an uycuoez u8wkphi uwsfkhu uff7au0 u1bjk9e1 u113hnb5 utuwxu6 u122n59 uz5stix u7o03ib u15l5c9n u6dzj5z uw295qw unmn6fi ud461yt u1a3p1vp">
                                                                                                                                    <div
                                                                                                                                        class="ud__tag__content ud-typography-caption-1 utgm304 u1ewtqcl u1lmfglv uibjyge u1abmfm4 u9yszdx u1nbblvp uifp7yv u1ov4xf1 u1asdtw4 uiy7161 uz5stix u1a3p1vp u1cmbuwj u1ugzwwg ul9ro5r uee9c6b u1hsvuyd u1hd9hm2">
                                                                                                                                        应用
                                                                                                                                    </div>
                                                                                                                                </span>
                                                                                                                            </div>
                                                                                                                        </div>
                                                                                                                    </div>
                                                                                                                    <div
                                                                                                                        class="_3766bee7">
                                                                                                                        <div
                                                                                                                            class="ea3292a0">
                                                                                                                            <span
                                                                                                                                class="_49737e67">12:52</span>
                                                                                                                        </div>
                                                                                                                    </div>
                                                                                                                </div>
                                                                                                                <div
                                                                                                                    class="_8cbe53f1">
                                                                                                                    <div
                                                                                                                        class="bea16740">
                                                                                                                        <div>
                                                                                                                            <div
                                                                                                                                class="_5dc097a3">
                                                                                                                                <div
                                                                                                                                    class="_5e10f104">
                                                                                                                                    <span
                                                                                                                                        class="_5d806a78 _8c6de8ac"><span>简单几步，快速上手</span></span>
                                                                                                                                </div>
                                                                                                                            </div>
                                                                                                                        </div>
                                                                                                                    </div>
                                                                                                                </div>
                                                                                                            </div>
                                                                                                            <div
                                                                                                                class="_23908595">
                                                                                                                <div
                                                                                                                    class="_392fb85f">
                                                                                                                    <div
                                                                                                                        class="_429756d7">
                                                                                                                        <div
                                                                                                                            class="_87b3f492">
                                                                                                                            <div
                                                                                                                                class="a11y_feed_item_done">
                                                                                                                                <span
                                                                                                                                    class="universe-icon"><svg
                                                                                                                                        width="1em"
                                                                                                                                        height="1em"
                                                                                                                                        viewBox="0 0 24 24"
                                                                                                                                        fill="none"
                                                                                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                                                                                        data-icon="DoneOutlined">
                                                                                                                                        <path
                                                                                                                                            d="M9.218 17.41 19.83 6.796a.99.99 0 1 1 1.389 1.415c-3.545 3.425-4.251 4.105-11.419 11.074a.997.997 0 0 1-1.375.017c-1.924-1.8-3.709-3.567-5.573-5.428a.999.999 0 0 1 1.414-1.415l4.95 4.95Z"
                                                                                                                                            fill="currentColor">
                                                                                                                                        </path>
                                                                                                                                    </svg></span>
                                                                                                                            </div>
                                                                                                                        </div>
                                                                                                                    </div>
                                                                                                                </div>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div
                                                                                        style="width: 100%; position: absolute; transform: translate(0px, 248px); height: 1px;">
                                                                                        <div
                                                                                            class="larkc-observer-item">
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="sidebar-resizer" style="display: block;"></div>
                    <div class="page-view-messenger-chat" style="width: 1944px; display: block;">
                        <div class="page-content-messenger-chat" style="width: 100%; height: 100%;">
                            <div class="page-content-wrapper" data-key="messenger-chat">
                                <div style="width: 100%; height: 100%;">
                                    <div class="larklet-extension-component" style="width: 100%; height: 100%;">
                                        <div class="larklet-extension" id="root-messenger-chat"
                                            style="background-color: rgb(55, 55, 55); width: 100%; height: 100%; border-radius: 4px; overflow: hidden;">
                                            <div class="windows" id="messenger" style="width: 100%; height: 100%;">
                                                <div class="lark-chat main-box">
                                                    <div class="lark-chat-right-box js-lark-chat-right-box">
                                                        <div class="lark-chat-right">
                                                            <div class="chatContainer post-container">
                                                                <div style="flex: 1 1 0%;">
                                                                    <div class="chatSidebar">
                                                                        <div class="chatSidebar_content">
                                                                            <div class="chatContainer_contentWrapper">
                                                                                <div
                                                                                    class="chatContainer__headerWrapper">
                                                                                    <div class="chatWindow_tabHeader">
                                                                                        <div
                                                                                            class="chatNewWindow_undraggableArea">
                                                                                        </div>
                                                                                        <div
                                                                                            class="chatNewWindow_headerMain">
                                                                                            <div class="chatWindow_avatar_wrapper "
                                                                                                style="top: 16px;">
                                                                                                <div
                                                                                                    class="chatWindow_avatar">
                                                                                                    <span
                                                                                                        class="ud__avatar ud__avatar-filled ud__avatar-circle ud__avatar-image larkc-avatar larkw-avatar lark-drag-disable"
                                                                                                        style="width: 36px; height: 36px;"><img
                                                                                                            class="ud__avatar__image"
                                                                                                            src="https://s1-imfile.feishucdn.com/static-resource/v1/default-avatar_44ae0ca3-e140-494b-956f-78091e348435~?image_size=96x96&amp;cut_type=&amp;quality=_q70&amp;format=webp&amp;sticker_format=.webp"
                                                                                                            alt=""></span>
                                                                                                </div>
                                                                                            </div>
                                                                                            <div
                                                                                                class="chatWindow_header_wrapper">
                                                                                                <div class="chatWindow_header_content"
                                                                                                    style="margin-top: 22px;">
                                                                                                    <div class="chatWindow_header_title"
                                                                                                        style="min-width: 36px;">
                                                                                                        <span
                                                                                                            class="chatWindow_chatName lark-drag-disable">凤凰世纪</span>
                                                                                                    </div>
                                                                                                    <div class="chatWindow_header_metas"
                                                                                                        style="width: 78px;">
                                                                                                        <div
                                                                                                            class="chatNewWindow_count lark-drag-disable chat-header-meta">
                                                                                                            <button
                                                                                                                type="button"
                                                                                                                class="ud__button ud__button--text ud__button--text-default ud__button--size-sm chatWindowHeader-icon"><span
                                                                                                                    class="ud__button__icon-inline ud__button__icon-inline-start"><span
                                                                                                                        class="universe-icon"><svg
                                                                                                                            width="1em"
                                                                                                                            height="1em"
                                                                                                                            viewBox="0 0 24 24"
                                                                                                                            fill="none"
                                                                                                                            xmlns="http://www.w3.org/2000/svg"
                                                                                                                            data-icon="GroupOutlined">
                                                                                                                            <path
                                                                                                                                d="M8.5 4.5a2.5 2.5 0 1 0 .001 5.001A2.5 2.5 0 0 0 8.5 4.5ZM4 7a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0Zm1.835 7.5c-1.82 0-3.335 1.498-3.335 3.4v1.6h12v-1.6c0-1.901-1.515-3.4-3.335-3.4h-5.33ZM.5 17.9c0-2.982 2.39-5.4 5.335-5.4h5.33c2.945 0 5.335 2.418 5.335 5.4v1.6c0 1.1-.9 2-2 2h-12c-1.1 0-2-.9-2-2v-1.6Zm22 2.6h-4.135v-2H21.5v-.6c0-1.002-.845-1.9-2-1.9h-1.31a5.46 5.46 0 0 0-.985-2H19.5c2.21 0 4 1.746 4 3.9v1.6c.025.535-.49 1.02-1 1Zm-6-11a1.001 1.001 0 1 1 1 1c-.55 0-1-.447-1-1Zm1-3a3.001 3.001 0 0 0 0 6 3.001 3.001 0 0 0 0-6Z"
                                                                                                                                fill="currentColor">
                                                                                                                            </path>
                                                                                                                        </svg></span></span><span
                                                                                                                    class="chatWindowHeader__inlineDesc">1</span></button>
                                                                                                        </div>
                                                                                                        <div class="groups-container groups-container-split"
                                                                                                            style="position: relative; visibility: visible; left: 0px;">
                                                                                                            <span
                                                                                                                class="ud__tag larkw-tag ud__tag-xs ud__tag-rect ud__tag-blue u1ewtqcl u1lmfglv uibjyge u1abmfm4 u9yszdx u1g0x7ka u8wuabp u1qch9an uycuoez u8wkphi uwsfkhu uff7au0 u1bjk9e1 u113hnb5 utuwxu6 u122n59 uz5stix u7o03ib u15l5c9n u6dzj5z uw295qw unmn6fi ud461yt u1a3p1vp">
                                                                                                                <div
                                                                                                                    class="ud__tag__content ud-typography-caption-1 utgm304 u1ewtqcl u1lmfglv uibjyge u1abmfm4 u9yszdx u1nbblvp uifp7yv u1ov4xf1 u1asdtw4 uiy7161 uz5stix u1a3p1vp u1cmbuwj u1ugzwwg ul9ro5r uee9c6b u1hsvuyd u1hd9hm2">
                                                                                                                    全员
                                                                                                                </div>
                                                                                                            </span>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                    <div class="collapse-buttons chatWindow_rightOperator lark-drag-disable"
                                                                                                        style="min-width: 32px; max-width: 161px; flex-basis: 161px;">
                                                                                                        <div class="collapse-buttons__container"
                                                                                                            style="min-width: 32px; max-width: 161px; flex-basis: 161px;">
                                                                                                            <div
                                                                                                                class="header_right_icon">
                                                                                                                <button
                                                                                                                    type="button"
                                                                                                                    class="ud__button ud__button--icon ud__button--icon-default ud__button--icon-size-sm operatorIcon"><span
                                                                                                                        class="universe-icon"><svg
                                                                                                                            width="1em"
                                                                                                                            height="1em"
                                                                                                                            viewBox="0 0 24 24"
                                                                                                                            fill="none"
                                                                                                                            xmlns="http://www.w3.org/2000/svg"
                                                                                                                            data-icon="HistorySearchOutlined">
                                                                                                                            <path
                                                                                                                                d="M18.39 4.368a8.501 8.501 0 0 1 .665 11.273l3.577 3.577a1 1 0 0 1-1.415 1.414l-3.576-3.577A8.501 8.501 0 0 1 6.368 4.368a8.5 8.5 0 0 1 12.021 0Zm-1.415 10.607a6.5 6.5 0 1 0-9.193-9.193 6.5 6.5 0 0 0 9.193 9.193ZM1 18a1 1 0 0 1 1-1h2a1 1 0 1 1 0 2H2a1 1 0 0 1-1-1Zm0 4a1 1 0 0 1 1-1h8a1 1 0 1 1 0 2H2a1 1 0 0 1-1-1Z"
                                                                                                                                fill="currentColor">
                                                                                                                            </path>
                                                                                                                        </svg></span></button>
                                                                                                            </div>
                                                                                                            <div
                                                                                                                style="display: contents;">
                                                                                                                <div
                                                                                                                    class="header_right_icon">
                                                                                                                    <button
                                                                                                                        type="button"
                                                                                                                        class="ud__button ud__button--icon ud__button--icon-default ud__button--icon-size-sm operatorIcon"><span
                                                                                                                            class="universe-icon operatorIcon operator-icon video-chat-icon"><svg
                                                                                                                                width="1em"
                                                                                                                                height="1em"
                                                                                                                                viewBox="0 0 24 24"
                                                                                                                                fill="none"
                                                                                                                                xmlns="http://www.w3.org/2000/svg"
                                                                                                                                data-icon="VideoOutlined">
                                                                                                                                <path
                                                                                                                                    d="M6 7a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z"
                                                                                                                                    fill="currentColor">
                                                                                                                                </path>
                                                                                                                                <path
                                                                                                                                    d="M18 18.75v-2.125l3.02 1.698c1.333.75 2.98-.213 2.98-1.743V7.42c0-1.53-1.647-2.493-2.98-1.743L18 7.375V5.25C18 4.007 17.105 3 16 3H2C.895 3 0 4.007 0 5.25v13.5C0 19.993.895 21 2 21h14c1.105 0 2-1.007 2-2.25ZM2.07 5h13.86c.03.04.07.123.07.25v13.5a.42.42 0 0 1-.07.25H2.07a.42.42 0 0 1-.07-.25V5.25c0-.127.04-.21.07-.25ZM22 16.58l-4-2.25V9.67l4-2.25v9.16Z"
                                                                                                                                    fill="currentColor">
                                                                                                                                </path>
                                                                                                                            </svg></span></button>
                                                                                                                </div>
                                                                                                            </div>
                                                                                                            <div
                                                                                                                class="header_right_icon">
                                                                                                                <button
                                                                                                                    type="button"
                                                                                                                    class="ud__button ud__button--icon ud__button--icon-default ud__button--icon-size-sm operatorIcon "><span
                                                                                                                        class="universe-icon"><svg
                                                                                                                            width="1em"
                                                                                                                            height="1em"
                                                                                                                            viewBox="0 0 24 24"
                                                                                                                            fill="none"
                                                                                                                            xmlns="http://www.w3.org/2000/svg"
                                                                                                                            data-icon="MemberAddOutlined">
                                                                                                                            <path
                                                                                                                                d="M15.5 6.5a5 5 0 1 0-10.002.002A5 5 0 0 0 15.5 6.5Zm-5 3a3.001 3.001 0 0 1 0-6 3.001 3.001 0 0 1 0 6ZM3 19c0-.346.045-.68.125-1 .445-1.725 2.01-3 3.875-3h5.98v-2H7a6 6 0 0 0-6 6v1c0 1.1.9 2 2 2h9.954v-2H3v-1Zm15.5 3a1 1 0 0 1-1-1v-2h-2a1 1 0 1 1 0-2h2v-2a1 1 0 1 1 2 0v2h2a1 1 0 1 1 0 2h-2v2a1 1 0 0 1-1 1Z"
                                                                                                                                fill="currentColor">
                                                                                                                            </path>
                                                                                                                        </svg></span></button>
                                                                                                            </div>
                                                                                                            <div
                                                                                                                class="header_right_icon">
                                                                                                                <button
                                                                                                                    type="button"
                                                                                                                    class="ud__button ud__button--icon ud__button--icon-default ud__button--icon-size-sm operatorIcon "><span
                                                                                                                        class="universe-icon"><svg
                                                                                                                            width="1em"
                                                                                                                            height="1em"
                                                                                                                            viewBox="0 0 24 24"
                                                                                                                            fill="none"
                                                                                                                            xmlns="http://www.w3.org/2000/svg"
                                                                                                                            data-icon="NewboardsOutlined">
                                                                                                                            <path
                                                                                                                                d="M9.8 2.346 5.624 6H3a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h9v-2H3V8h18v4h2V8a2 2 0 0 0-2-2h-2.65l-4.707-3.744a3 3 0 0 0-3.843.09ZM8.66 6l2.456-2.149a1 1 0 0 1 1.28-.03L15.138 6H8.66Z"
                                                                                                                                fill="currentColor">
                                                                                                                            </path>
                                                                                                                            <path
                                                                                                                                d="M8 11a1 1 0 1 0 0 2h8a1 1 0 1 0 0-2H8Zm0 4a1 1 0 1 0 0 2h4a1 1 0 1 0 0-2H8Zm11-1a1 1 0 0 0-1 1v2h-2a1 1 0 1 0 0 2h2v2a1 1 0 1 0 2 0v-2h2a1 1 0 1 0 0-2h-2v-2a1 1 0 0 0-1-1Z"
                                                                                                                                fill="currentColor">
                                                                                                                            </path>
                                                                                                                        </svg></span></button>
                                                                                                            </div>
                                                                                                            <div
                                                                                                                class="drag-more-wrap">
                                                                                                                <div
                                                                                                                    class="_398e4e65 _8e5c5423">
                                                                                                                    <div
                                                                                                                        class="_03b9217c">
                                                                                                                        <div
                                                                                                                            class="de31a4c2">
                                                                                                                            <div
                                                                                                                                class="header_right_icon">
                                                                                                                                <button
                                                                                                                                    type="button"
                                                                                                                                    class="ud__button ud__button--icon ud__button--icon-default ud__button--icon-size-sm operatorIcon"><span
                                                                                                                                        class="universe-icon"><svg
                                                                                                                                            width="1em"
                                                                                                                                            height="1em"
                                                                                                                                            viewBox="0 0 24 24"
                                                                                                                                            fill="none"
                                                                                                                                            xmlns="http://www.w3.org/2000/svg"
                                                                                                                                            data-icon="MoreOutlined">
                                                                                                                                            <path
                                                                                                                                                d="M5.5 11.75a1.75 1.75 0 1 1-3.5 0 1.75 1.75 0 0 1 3.5 0Zm8.225 0a1.75 1.75 0 1 1-3.5 0 1.75 1.75 0 0 1 3.5 0Zm8.275 0a1.75 1.75 0 1 1-3.5 0 1.75 1.75 0 0 1 3.5 0Z"
                                                                                                                                                fill="currentColor">
                                                                                                                                            </path>
                                                                                                                                        </svg></span></button>
                                                                                                                            </div>
                                                                                                                        </div>
                                                                                                                        <div class="_4c791557"
                                                                                                                            draggable="true">
                                                                                                                            <div
                                                                                                                                class="header_right_icon">
                                                                                                                                <button
                                                                                                                                    type="button"
                                                                                                                                    class="ud__button ud__button--icon ud__button--icon-default ud__button--icon-size-sm operatorIcon"><span
                                                                                                                                        class="universe-icon"><svg
                                                                                                                                            width="1em"
                                                                                                                                            height="1em"
                                                                                                                                            viewBox="0 0 24 24"
                                                                                                                                            fill="none"
                                                                                                                                            xmlns="http://www.w3.org/2000/svg"
                                                                                                                                            data-icon="MoreOutlined">
                                                                                                                                            <path
                                                                                                                                                d="M5.5 11.75a1.75 1.75 0 1 1-3.5 0 1.75 1.75 0 0 1 3.5 0Zm8.225 0a1.75 1.75 0 1 1-3.5 0 1.75 1.75 0 0 1 3.5 0Zm8.275 0a1.75 1.75 0 1 1-3.5 0 1.75 1.75 0 0 1 3.5 0Z"
                                                                                                                                                fill="currentColor">
                                                                                                                                            </path>
                                                                                                                                        </svg></span></button>
                                                                                                                            </div>
                                                                                                                        </div>
                                                                                                                    </div>
                                                                                                                </div>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                <div class="chatMainContent">
                                                                                    <div class="chatSidebar">
                                                                                        <div
                                                                                            class="chatSidebar_content">
                                                                                            <div
                                                                                                class="chat-panel-wrapper">
                                                                                                <div
                                                                                                    class="chat-panel-content">
                                                                                                    <div
                                                                                                        class="chat-tabPanel chat-tabPanel-active">
                                                                                                        <div
                                                                                                            class="chatMainContent">
                                                                                                            <div
                                                                                                                class="larkw-drag-panel">
                                                                                                                <div
                                                                                                                    class="chatBanners optimize">
                                                                                                                </div>
                                                                                                                <div
                                                                                                                    class="chatMessageContainer">
                                                                                                                    <div
                                                                                                                        class="chatHeaderNav">
                                                                                                                    </div>
                                                                                                                    <div
                                                                                                                        class="bizChat">
                                                                                                                        <div
                                                                                                                            class="chatMessages">
                                                                                                                            <div
                                                                                                                                class="messageContainer">
                                                                                                                                <div
                                                                                                                                    class="messageTip__toNewestTip messageTip__toNewestTip--down messageTip__toNewestTip--fadeIn messageTip__toNewestTip--fadeOut">
                                                                                                                                    <span
                                                                                                                                        class="messageTip__doubleArrowIcon"><span
                                                                                                                                            class="universe-icon"><svg
                                                                                                                                                width="1em"
                                                                                                                                                height="1em"
                                                                                                                                                viewBox="0 0 24 24"
                                                                                                                                                fill="none"
                                                                                                                                                xmlns="http://www.w3.org/2000/svg"
                                                                                                                                                data-icon="DownBottomOutlined">
                                                                                                                                                <path
                                                                                                                                                    d="M17.638 13.35 12 18.988l-5.943-5.943-.84-.835a1 1 0 1 0-1.409 1.418l.667.663 6.818 6.819a1 1 0 0 0 1.414 0l6.473-6.473 1.013-1.011a.999.999 0 0 0-1.41-1.416l-1.146 1.142Z"
                                                                                                                                                    fill="currentColor">
                                                                                                                                                </path>
                                                                                                                                                <path
                                                                                                                                                    d="M17.638 4.443 12 10.08 6.058 4.136l-.84-.835A1 1 0 1 0 3.81 4.72l.667.663 6.818 6.818a1 1 0 0 0 1.414 0l6.473-6.473 1.013-1.011a.999.999 0 0 0-1.41-1.416l-1.146 1.142Z"
                                                                                                                                                    fill="currentColor">
                                                                                                                                                </path>
                                                                                                                                            </svg></span></span>
                                                                                                                                </div>
                                                                                                                                <div
                                                                                                                                    class="messageList">
                                                                                                                                    <div
                                                                                                                                        style="height: 100%;">
                                                                                                                                        <div class="scroller"
                                                                                                                                            style="position: relative; height: 100%; width: 100%; overflow: hidden overlay; transform: translateY(0px); contain: strict;">
                                                                                                                                            <div
                                                                                                                                                class="scroller_content">
                                                                                                                                                <div data-name="scroll_holder"
                                                                                                                                                    style="height: 1px; width: 100%; position: absolute; transform: translate(0px, 144px);">
                                                                                                                                                </div>
                                                                                                                                                <div
                                                                                                                                                    class="list_items">
                                                                                                                                                    <!-- <div class="messageList-row-wrapper"
                                                                                                                                                        style="width: 100%; top: 0px; left: 0px; position: absolute; transform: translate(0px, 0px);">
                                                                                                                                                        <div class="messageItem-wrapper message-last"
                                                                                                                                                            data-id="7451094630579388419">
                                                                                                                                                            <div
                                                                                                                                                                class="message-container">
                                                                                                                                                                <div id="7451094630579388419"
                                                                                                                                                                    class="js-message-item system-text-background message-not-self message-item-first"
                                                                                                                                                                    data-position="0"
                                                                                                                                                                    data-badge-count="0">
                                                                                                                                                                    <div
                                                                                                                                                                        class="system-text">
                                                                                                                                                                        <div>
                                                                                                                                                                            欢迎
                                                                                                                                                                            <span
                                                                                                                                                                                class="user-name">唐元</span>
                                                                                                                                                                            加入
                                                                                                                                                                            凤凰世纪，新成员入群可查看所有历史消息
                                                                                                                                                                        </div>
                                                                                                                                                                    </div>
                                                                                                                                                                </div>
                                                                                                                                                            </div>
                                                                                                                                                        </div>
                                                                                                                                                    </div> -->
                                                                                                                                                    <div class="messageList-row-wrapper" v-for="(item,index) in messageList" :key="index">
                                                                                                                                                        <div class="messageItem-wrapper message-last"
                                                                                                                                                            data-id="7451094876155838468">
                                                                                                                                                            <div
                                                                                                                                                                class="message-container">
                                                                                                                                                                <div id="7451094876155838468"
                                                                                                                                                                    class="js-message-item message-item message-self message-item-first message-me-read text-message"
                                                                                                                                                                    data-position="1"
                                                                                                                                                                    data-badge-count="1">
                                                                                                                                                                    <div data-im-copy-permission-invalid="false"
                                                                                                                                                                        data-im-copy-permission-invalid-toast="保密模式已开启，禁止复制、转发消息"
                                                                                                                                                                        style="display: contents;">
                                                                                                                                                                        <div
                                                                                                                                                                            class="message-left">
                                                                                                                                                                            <div
                                                                                                                                                                                class="message-avatar">
                                                                                                                                                                                <div class="cursor-pointer noselect"
                                                                                                                                                                                    data-lock-ui="true">
                                                                                                                                                                                    <span
                                                                                                                                                                                        class="ud__avatar ud__avatar-filled ud__avatar-circle ud__avatar-image larkc-avatar larkw-avatar"
                                                                                                                                                                                        style="width: 32px; height: 32px;"><img
                                                                                                                                                                                            class="ud__avatar__image"
                                                                                                                                                                                            src="https://s1-imfile.feishucdn.com/static-resource/v1/v3_00hq_fc6123dd-0b2d-421b-8e8f-60267cb317ag~?image_size=96x96&amp;cut_type=&amp;quality=_q70&amp;format=webp&amp;sticker_format=.webp"
                                                                                                                                                                                            alt=""></span>
                                                                                                                                                                                </div>
                                                                                                                                                                            </div>
                                                                                                                                                                        </div>
                                                                                                                                                                        <div class="message-right"
                                                                                                                                                                            style="position: relative;">
                                                                                                                                                                            <div class="message-info"
                                                                                                                                                                                style="width: max-content;">
                                                                                                                                                                                <div
                                                                                                                                                                                    class="message-info__inner">
                                                                                                                                                                                    <span
                                                                                                                                                                                        class="message-info-name"
                                                                                                                                                                                        data-lock-ui="true">{{item.name||''}}</span>
                                                                                                                                                                                </div>
                                                                                                                                                                                <span
                                                                                                                                                                                    class="message-timestamp noselect message-layout-time-tip"
                                                                                                                                                                                    data-lock-ui="true"
                                                                                                                                                                                    data-disable-copy="true">12:53</span>
                                                                                                                                                                            </div>
                                                                                                                                                                            <div class="message-section"
                                                                                                                                                                                style="position: relative;">
                                                                                                                                                                                <div class="NewMessageContextMenuTrigger MessageContextMenuTrigger MessageContextMenuTrigger--scene-chatSelfMessage message-section-left message-section-newFileCard"
                                                                                                                                                                                    data-element="message-section-left"
                                                                                                                                                                                    id="7451094876155838468"
                                                                                                                                                                                    receivepolicystatus="allow"
                                                                                                                                                                                    data-message-descendant-bounded="true">
                                                                                                                                                                                    <div class="MessageActionPermissionWrapper"
                                                                                                                                                                                        data-im-copy-permission-invalid="false"
                                                                                                                                                                                        data-im-copy-permission-invalid-toast="">
                                                                                                                                                                                        <div
                                                                                                                                                                                            class="message-content-container">
                                                                                                                                                                                            <div
                                                                                                                                                                                                class="catch-resize-observer-dom message-content">
                                                                                                                                                                                                <div role="text-message"
                                                                                                                                                                                                    class="MessageActionPermissionWrapper message-text"
                                                                                                                                                                                                    data-im-copy-permission-invalid="false"
                                                                                                                                                                                                    data-im-copy-permission-invalid-toast="">
                                                                                                                                                                                                    <div
                                                                                                                                                                                                        class="limit-height-container">
                                                                                                                                                                                                        <div>
                                                                                                                                                                                                            <div
                                                                                                                                                                                                                class="wrapper">
                                                                                                                                                                                                                <div class=""
                                                                                                                                                                                                                    data-message-descendant-index="0"
                                                                                                                                                                                                                    data-message-descendant-block="true">
                                                                                                                                                                                                                    <pre><div dir="auto" class="richTextContainer text-align-left"><span class="text-only" data-eleid="3" v-html="item.text"></span></div></pre>
                                                                                                                                                                                                                </div>
                                                                                                                                                                                                                <div class="height-limit-cut-modal"
                                                                                                                                                                                                                    data-disable-copy="true">
                                                                                                                                                                                                                    <div
                                                                                                                                                                                                                        class="height-limit-btn">
                                                                                                                                                                                                                        展开<span
                                                                                                                                                                                                                            class="universe-icon height-limit-btn-icon"><svg
                                                                                                                                                                                                                                width="1em"
                                                                                                                                                                                                                                height="1em"
                                                                                                                                                                                                                                viewBox="0 0 24 24"
                                                                                                                                                                                                                                fill="none"
                                                                                                                                                                                                                                xmlns="http://www.w3.org/2000/svg"
                                                                                                                                                                                                                                data-icon="DownOutlined">
                                                                                                                                                                                                                                <path
                                                                                                                                                                                                                                    d="M2.293 7.707a1 1 0 0 1 1.414 0L12 16l8.293-8.293a1 1 0 1 1 1.414 1.414l-8.293 8.293a2 2 0 0 1-2.828 0L2.293 9.121a1 1 0 0 1 0-1.414Z"
                                                                                                                                                                                                                                    fill="currentColor">
                                                                                                                                                                                                                                </path>
                                                                                                                                                                                                                            </svg></span>
                                                                                                                                                                                                                    </div>
                                                                                                                                                                                                                </div>
                                                                                                                                                                                                            </div>
                                                                                                                                                                                                        </div>
                                                                                                                                                                                                    </div>
                                                                                                                                                                                                </div>
                                                                                                                                                                                            </div>
                                                                                                                                                                                        </div>
                                                                                                                                                                                    </div>
                                                                                                                                                                                </div>
                                                                                                                                                                                <div class="message-section-right"
                                                                                                                                                                                    style="position: relative;">
                                                                                                                                                                                    <div class="message__align-to-first-bounded-container"
                                                                                                                                                                                        data-placement="inline-end-start"
                                                                                                                                                                                        style="position: absolute; left: 0px; top: 0px; transform: translate(0px, -4px); will-change: transform;">
                                                                                                                                                                                        <div
                                                                                                                                                                                            data-lock-ui="true">
                                                                                                                                                                                        </div>
                                                                                                                                                                                    </div>
                                                                                                                                                                                    <div class="message__align-to-first-bounded-container"
                                                                                                                                                                                        data-placement="inline-end-end"
                                                                                                                                                                                        style="position: absolute; left: 0px; top: 0px; transform: translate(4px, 26px); will-change: transform;">
                                                                                                                                                                                        <div
                                                                                                                                                                                            data-lock-ui="true">
                                                                                                                                                                                            <div
                                                                                                                                                                                                class="is-chat-message read-status-bar">
                                                                                                                                                                                                <div
                                                                                                                                                                                                    class="normal all-read">
                                                                                                                                                                                                    <div
                                                                                                                                                                                                        class="icon">
                                                                                                                                                                                                        <span
                                                                                                                                                                                                            class="universe-icon read-status-barRead"><svg
                                                                                                                                                                                                                width="1em"
                                                                                                                                                                                                                height="1em"
                                                                                                                                                                                                                viewBox="0 0 24 24"
                                                                                                                                                                                                                fill="none"
                                                                                                                                                                                                                xmlns="http://www.w3.org/2000/svg"
                                                                                                                                                                                                                data-icon="FeedReadOutlined">
                                                                                                                                                                                                                <path
                                                                                                                                                                                                                    d="M11.996 21.212a9.215 9.215 0 0 0 9.216-9.216 9.217 9.217 0 0 0-9.216-9.217 9.218 9.218 0 0 0-9.217 9.217 9.217 9.217 0 0 0 9.217 9.216Zm0 2.765c-6.619 0-11.982-5.364-11.982-11.98C.014 5.376 5.378.013 11.996.013c6.617 0 11.981 5.364 11.981 11.982 0 6.617-5.364 11.981-11.98 11.981Zm5.536-15.18a1.38 1.38 0 0 1 .005 1.95c-2.046 2.042-4.096 4.08-6.133 6.13a1.003 1.003 0 0 1-1.423 0c-1.173-1.179-2.351-2.352-3.529-3.527a1.373 1.373 0 0 1 .013-1.942 1.375 1.375 0 0 1 1.942-.012l2.286 2.285 4.89-4.89a1.378 1.378 0 0 1 1.949.005Z"
                                                                                                                                                                                                                    fill="currentColor">
                                                                                                                                                                                                                </path>
                                                                                                                                                                                                            </svg></span>
                                                                                                                                                                                                    </div>
                                                                                                                                                                                                </div>
                                                                                                                                                                                            </div>
                                                                                                                                                                                        </div>
                                                                                                                                                                                    </div>
                                                                                                                                                                                </div>
                                                                                                                                                                            </div>
                                                                                                                                                                            <div
                                                                                                                                                                                class="message-metas-theme message-metas-theme--default">
                                                                                                                                                                            </div>
                                                                                                                                                                        </div>
                                                                                                                                                                    </div>
                                                                                                                                                                </div>
                                                                                                                                                            </div>
                                                                                                                                                            <div class="messageList-bottomDetector"
                                                                                                                                                                style="height: calc(100% - 5px); max-height: 300px;">
                                                                                                                                                            </div>
                                                                                                                                                        </div>
                                                                                                                                                    </div>
                                                                                                                                                    <section
                                                                                                                                                        class="messageList-footer"
                                                                                                                                                        style="position: absolute; transform: translate(0px, 128px);">
                                                                                                                                                        <div
                                                                                                                                                            style="height: 17px;">
                                                                                                                                                        </div>
                                                                                                                                                    </section>
                                                                                                                                                </div>
                                                                                                                                            </div>
                                                                                                                                        </div>
                                                                                                                                    </div>
                                                                                                                                </div>
                                                                                                                            </div>
                                                                                                                        </div>
                                                                                                                    </div>
                                                                                                                </div>
                                                                                                            </div>
                                                                                                            <div
                                                                                                                class="chatEditor">
                                                                                                                <div>
                                                                                                                    <div
                                                                                                                        class="quick-reply-guide-target">
                                                                                                                    </div>
                                                                                                                    <div
                                                                                                                        class="withDuplicateWrapper">
                                                                                                                        <div
                                                                                                                            class="chatEditorContainer">
                                                                                                                            <div
                                                                                                                                class="editor__mask--default">
                                                                                                                            </div>
                                                                                                                            <div class="lark__editor--container editor__container--extension"
                                                                                                                                style="border-width: 1px;">
                                                                                                                                <div
                                                                                                                                    class="lark__editor--extension-container">
                                                                                                                                </div>
                                                                                                                                <div
                                                                                                                                    class="lark__editor--default lark__editor--new lark__editor--v2 lark__editor--simple lark__editor--chat ">
                                                                                                                                    <div class="outerdocbody editor-kit-outer-container lark__editor--showExtension"
                                                                                                                                        data-insert-enter-el="true">
                                                                                                                                        <div class="zone-container editor-kit-container innerdocbody notranslate chrome window chrome88"
                                                                                                                                            data-zone-id="0"
                                                                                                                                            data-zone-container="*"
                                                                                                                                            data-slate-editor="true"
                                                                                                                                            contenteditable="true"
                                                                                                                                            spellcheck="false">
                                                                                                                                            <div class="ace-line"
                                                                                                                                                data-node="true">
                                                                                                                                                <div data-line-wrapper="true"
                                                                                                                                                    dir="auto">
                                                                                                                                                    <!-- <span
                                                                                                                                                        data-void="true"
                                                                                                                                                        contenteditable="false"
                                                                                                                                                        style="user-select: none;"><span
                                                                                                                                                            class="editor__custom--placeholder">发送给
                                                                                                                                                            YM</span></span> -->
                                                                                                                                                            <a-input placeholder="发送到 凤凰世纪" v-model:value="messagetext" class="editor__custom--placeholder"/>
                                                                                                                                                            <span
                                                                                                                                                        class=""
                                                                                                                                                        data-leaf="true"><span
                                                                                                                                                            data-string="true"
                                                                                                                                                            data-enter="true">&ZeroWidthSpace;</span></span><span
                                                                                                                                                        data-zero-space="true"
                                                                                                                                                        style="position: absolute; width: 0px; height: 0px;">&ZeroWidthSpace;</span><span
                                                                                                                                                        data-zero-space="true"
                                                                                                                                                        style="position: absolute; width: 0px; height: 0px;">&ZeroWidthSpace;</span>
                                                                                                                                                </div>
                                                                                                                                            </div>
                                                                                                                                        </div>
                                                                                                                                    </div>
                                                                                                                                    <div class="lark__editor--footer"
                                                                                                                                        data-insert-enter-el="true">
                                                                                                                                        <div
                                                                                                                                            class="lark__editor--format toolbar-wrapper">
                                                                                                                                        </div>
                                                                                                                                        <div
                                                                                                                                            class="lark__editor--toolbar">
                                                                                                                                            <div
                                                                                                                                                class="toolbar-item">
                                                                                                                                                <div>
                                                                                                                                                    <button
                                                                                                                                                        type="button"
                                                                                                                                                        class="ud__button ud__button--icon ud__button--icon-default ud__button--icon-size-md"><span
                                                                                                                                                            class="universe-icon"><svg
                                                                                                                                                                width="1em"
                                                                                                                                                                height="1em"
                                                                                                                                                                viewBox="0 0 24 24"
                                                                                                                                                                fill="none"
                                                                                                                                                                xmlns="http://www.w3.org/2000/svg"
                                                                                                                                                                data-icon="TextAaOutlined">
                                                                                                                                                                <path
                                                                                                                                                                    d="M14.066 20.357 12.018 15H4.983l-2.049 5.357a1 1 0 1 1-1.868-.714L7.1 3.864c.492-1.285 2.31-1.285 2.802 0l6.033 15.779a1 1 0 1 1-1.868.714ZM8.5 5.8 5.747 13h5.506L8.5 5.8Zm11.436 7.302c-.587 0-1.156.205-1.608.58l-.291.24a.9.9 0 1 1-1.148-1.386l.291-.241a4.323 4.323 0 0 1 2.757-.992h.327a3.235 3.235 0 0 1 3.146 2.482c.064.266.096.54.096.813l-.003 5.502a.9.9 0 0 1-1.8 0v-.13a3.927 3.927 0 0 1-2.148.634h-.533a2.522 2.522 0 0 1-2.522-2.521 2.978 2.978 0 0 1 2.979-2.979h2.226v-.507c0-.132-.015-.264-.046-.393a1.435 1.435 0 0 0-1.395-1.102h-.328Zm1.75 3.802H19.48c-.651 0-1.179.528-1.179 1.178 0 .4.323.722.722.722h.533c1.102 0 2.01-.83 2.131-1.9Z"
                                                                                                                                                                    fill="currentColor">
                                                                                                                                                                </path>
                                                                                                                                                            </svg></span></button>
                                                                                                                                                </div>
                                                                                                                                            </div>
                                                                                                                                            <div
                                                                                                                                                class="toolbar-item">
                                                                                                                                                <div>
                                                                                                                                                    <button
                                                                                                                                                        type="button"
                                                                                                                                                        class="ud__button ud__button--icon ud__button--icon-default ud__button--icon-size-md"><span
                                                                                                                                                            class="universe-icon"><svg
                                                                                                                                                                width="1em"
                                                                                                                                                                height="1em"
                                                                                                                                                                viewBox="0 0 24 24"
                                                                                                                                                                fill="none"
                                                                                                                                                                xmlns="http://www.w3.org/2000/svg"
                                                                                                                                                                data-icon="EmojiOutlined">
                                                                                                                                                                <path
                                                                                                                                                                    d="M1 12c0 6.075 4.925 11 11 11s11-4.925 11-11S18.075 1 12 1 1 5.925 1 12Zm20 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-7-2.5a1 1 0 1 1 2 0v1a1 1 0 1 1-2 0v-1Zm-4 0a1 1 0 0 0-2 0v1a1 1 0 1 0 2 0v-1Zm5.455 4.5h1.12c.26 0 .44.268.323.502A5.5 5.5 0 0 1 12 17.5a5.5 5.5 0 0 1-4.893-2.986c-.123-.238.064-.514.332-.514h1.197c.31 0 .598.147.803.38.047.053.093.103.133.14.63.607 1.485.98 2.428.98.95 0 1.81-.378 2.441-.992.036-.034.077-.08.12-.128a1.08 1.08 0 0 1 .803-.38h.09Z"
                                                                                                                                                                    fill="currentColor">
                                                                                                                                                                </path>
                                                                                                                                                            </svg></span></button>
                                                                                                                                                </div>
                                                                                                                                            </div>
                                                                                                                                            <div
                                                                                                                                                class="toolbar-item mention-toolbar">
                                                                                                                                                <div
                                                                                                                                                    class="wrap-tip">
                                                                                                                                                    <button
                                                                                                                                                        type="button"
                                                                                                                                                        class="ud__button ud__button--icon ud__button--icon-default ud__button--icon-size-md"><span
                                                                                                                                                            class="universe-icon"><svg
                                                                                                                                                                width="1em"
                                                                                                                                                                height="1em"
                                                                                                                                                                viewBox="0 0 24 24"
                                                                                                                                                                fill="none"
                                                                                                                                                                xmlns="http://www.w3.org/2000/svg"
                                                                                                                                                                data-icon="AtOutlined">
                                                                                                                                                                <path
                                                                                                                                                                    d="M18.75 16a3.622 3.622 0 0 1-2.637-1.156A5 5 0 1 1 17 12c0 1.105.784 2 1.75 2 1.512 0 1.776-2 1.776-2 .08-.548.138-.903.138-1.568C20.664 6.997 17.164 3 12 3s-8.98 3.836-8.98 9 3.816 9.01 8.98 9.01c1.807 0 3.487-.634 4.916-1.544a.823.823 0 0 1 .853-.028l.041.024.903.519a.41.41 0 0 1 .067.682A10.953 10.953 0 0 1 12 23C5.925 23 1 18.075 1 12S5.925 1 12 1s10.657 4.265 10.657 9.432c0 .256.014.522-.136 1.794C22.296 14.326 20.75 16 18.75 16ZM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                                                                                                                                                                    fill="currentColor">
                                                                                                                                                                </path>
                                                                                                                                                            </svg></span></button>
                                                                                                                                                </div>
                                                                                                                                            </div>
                                                                                                                                            <div
                                                                                                                                                class="toolbar-item toolbar-item-more-button">
                                                                                                                                                <div>
                                                                                                                                                    <button
                                                                                                                                                        type="button"
                                                                                                                                                        class="ud__button ud__button--icon ud__button--icon-default ud__button--icon-size-md"><span
                                                                                                                                                            class="universe-icon"><svg
                                                                                                                                                                width="1em"
                                                                                                                                                                height="1em"
                                                                                                                                                                viewBox="0 0 24 24"
                                                                                                                                                                fill="none"
                                                                                                                                                                xmlns="http://www.w3.org/2000/svg"
                                                                                                                                                                data-icon="MoreAddOutlined">
                                                                                                                                                                <path
                                                                                                                                                                    d="M11 11V8a1 1 0 1 1 2 0v3h3a1 1 0 1 1 0 2h-3v3a1 1 0 1 1-2 0v-3H8a1 1 0 1 1 0-2h3Zm1 10a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0 2C5.925 23 1 18.075 1 12S5.925 1 12 1s11 4.925 11 11-4.925 11-11 11Z"
                                                                                                                                                                    fill="currentColor">
                                                                                                                                                                </path>
                                                                                                                                                            </svg></span></button>
                                                                                                                                                </div>
                                                                                                                                            </div>
                                                                                                                                            <div
                                                                                                                                                class="toolbar-item switch-change">
                                                                                                                                                <div class="open-inner-editor"
                                                                                                                                                    data-tip="postExpand">
                                                                                                                                                    <button
                                                                                                                                                        type="button"
                                                                                                                                                        class="ud__button ud__button--icon ud__button--icon-default ud__button--icon-size-md"><span
                                                                                                                                                            class="universe-icon"><svg
                                                                                                                                                                width="1em"
                                                                                                                                                                height="1em"
                                                                                                                                                                viewBox="0 0 24 24"
                                                                                                                                                                fill="none"
                                                                                                                                                                xmlns="http://www.w3.org/2000/svg"
                                                                                                                                                                data-icon="ExpandOutlined">
                                                                                                                                                                <path
                                                                                                                                                                    d="M6.4 19H9a1 1 0 1 1 0 2H4a.997.997 0 0 1-1-1v-5a1 1 0 1 1 2 0v2.571l4.486-4.486a.979.979 0 0 1 1.389 0c.393.396.4 1.04.005 1.435L6.4 19ZM18.985 6.5l-4.428 4.429a.993.993 0 0 1-1.405 0 1.006 1.006 0 0 1-.003-1.421L17.657 5h-2.672a1 1 0 1 1 0-2h5a.997.997 0 0 1 1 1v5a1 1 0 1 1-2 0V6.5Z"
                                                                                                                                                                    fill="currentColor">
                                                                                                                                                                </path>
                                                                                                                                                            </svg></span></button>
                                                                                                                                                </div>
                                                                                                                                            </div>
                                                                                                                                            <div
                                                                                                                                                class="toolbar-item toolbar-item-submit-button" :class="{'toolbar-item--disabled':!messagetext}">
                                                                                                                                                <div
                                                                                                                                                    class="submit__button">
                                                                                                                                                    <button
                                                                                                                                                    @click="sendMessage"
                                                                                                                                                        type="button"
                                                                                                                                                        class="ud__button ud__button--icon ud__button--icon-default ud__button--icon-size-md"><span
                                                                                                                                                            class="universe-icon send__button send-colorful" :class="{'send__button--disable':!messagetext}"><svg
                                                                                                                                                                width="1em"
                                                                                                                                                                height="1em"
                                                                                                                                                                viewBox="0 0 24 24"
                                                                                                                                                                fill="none"
                                                                                                                                                                xmlns="http://www.w3.org/2000/svg">
                                                                                                                                                                <path
                                                                                                                                                                    d="M21.696 13.354a1.541 1.541 0 0 0 0-2.707L3.762.937a1.515 1.515 0 0 0-1.512.03c-.469.28-.75.774-.75 1.323l1.979 7.728 8.413 1.232c.482 0 .871.335.871.75s-.39.75-.871.75a1932.6 1932.6 0 0 1-8.41 1.223L1.5 21.71c0 .548.281 1.043.75 1.324.469.279 1.034.29 1.512.03l17.934-9.71Z"
                                                                                                                                                                    fill="#1456F0">
                                                                                                                                                                </path>
                                                                                                                                                            </svg></span></button>
                                                                                                                                                </div>
                                                                                                                                            </div>
                                                                                                                                        </div>
                                                                                                                                    </div>
                                                                                                                                </div>
                                                                                                                            </div>
                                                                                                                            <div class="editor__tip--enter  editor__tip--hidden"
                                                                                                                                style="right: 20px;">
                                                                                                                                <span>Shift
                                                                                                                                    +
                                                                                                                                    Enter
                                                                                                                                    换行</span>
                                                                                                                            </div>
                                                                                                                        </div>
                                                                                                                    </div>
                                                                                                                </div>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                    <div
                                                                                                        class="chat-tabPanel">
                                                                                                    </div>
                                                                                                    <div
                                                                                                        class="chat-tabPanel">
                                                                                                    </div>
                                                                                                    <div
                                                                                                        class="chat-tabPanel">
                                                                                                    </div>
                                                                                                    <div
                                                                                                        class="chat-tabPanel">
                                                                                                    </div>
                                                                                                    <div
                                                                                                        class="chat-tabPanel">
                                                                                                    </div>
                                                                                                    <div
                                                                                                        class="chat-tabPanel">
                                                                                                    </div>
                                                                                                    <div
                                                                                                        class="chat-tabPanel">
                                                                                                    </div>
                                                                                                    <div
                                                                                                        class="chat-tabPanel">
                                                                                                    </div>
                                                                                                    <div
                                                                                                        class="chat-tabPanel">
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div class="chatSidebar_sidebar chatSidebar_invisible"
                                                                                            style="transition: none; width: 350px; margin-right: -350px; max-width: 100%; box-shadow: none;">
                                                                                            <div data-im-copy-permission-invalid="false"
                                                                                                data-im-copy-permission-invalid-toast="保密模式已开启，禁止复制、转发消息"
                                                                                                style="display: contents;">
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div class="chatSidebar_sidebar chatSidebar_invisible"
                                                                            style="transition: none; width: 350px; margin-right: -350px; max-width: 100%; box-shadow: none;">
                                                                            <div data-im-copy-permission-invalid="false"
                                                                                data-im-copy-permission-invalid-toast="保密模式已开启，禁止复制、转发消息"
                                                                                style="display: contents;"></div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="lark-chat-menu" id="lark-chat-menu"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    </div>
</template>
  <script setup>
  import "@/style/common.less";
  import "@/style/icon/iconfont.css";
  import {
    ref,
    toRefs,
    reactive,
    toRaw,
    onMounted,
    watch,
    getCurrentInstance,
    defineEmits,
    defineExpose,
    defineProps,
  } from "vue";
  import {
    SwapLeftOutlined,
    SwapRightOutlined,
    ArrowUpOutlined,
    ArrowDownOutlined,
  } from "@ant-design/icons-vue";
  import Interface from "@/utils/Interface.js";
  import { girdFormatterValue } from "@/utils/common.js";
  import { message } from "ant-design-vue";
  import RadioUser from "@/components/commonModal/MultipleUser.vue";
  import Delete from "@/components/listView/Delete.vue";
  const { proxy } = getCurrentInstance();
  const PersonnelLst = ref();
  import { useRouter, useRoute } from "vue-router";
  const route = useRoute();
  const router = useRouter();
  const props = defineProps({
    id: String,
  });
  const emit = defineEmits(["load"]);
  const data = reactive({
    loading: false,
    listData: [],
    listDataDetail: {},
    height:100,
    id: route.query.id,
    ParentSubjectName:'',
    Description:'',
  
    record: {
        DeptId: {}
    },
    list: {
        sections: []
    },
    detailviewloading: true,
    activesections: [],
    relatedLists: [],
    listItems: {},
    recordIds: {},
    records: {},
    messagetext:'',
    messageList:[{
        name:'管理员',
        text:'测试'
    }]
  });
  const { messageList,messagetext,record,list,detailviewloading,activesections,relatedLists,listItems,recordIds,records,id,height,listData,loading,listDataDetail,ParentSubjectName,Description} = toRefs(data);
  const getQuery = () => {
    data.listData=[];
    let filterQuery='\nParentSubject\teq\t'+data.id;
    proxy.$post(Interface.list2, {
        filterId:'',
        objectTypeCode:'100310',
        entityName:'KbSubject',
        filterQuery:filterQuery,
        search:'',
        page: 1,
        rows: 100,
        sort:'DisplayOrder',
        order:'ASC',
        displayColumns:'Name,ParentSubject,Description'
    }).then(res => {
        var list = [];
        if(res&&res.nodes&&res.nodes.length){
          for (var i = 0; i < res.nodes.length; i++) {
              var item = res.nodes[i];
              for(var cell in item){
                  if(cell!='id'&&cell!='nameField'){
                      item[cell]=girdFormatterValue(cell,item);
                  }
              }
              list.push(item);
              getArticle(item.id);
          }
        }
        data.listData = list;
        
    })
  };
  const getArticle=(id)=>{
      data.listDataDetail[id] = [];
      let filterQuery='\nSubjectId\teq\t'+id;
          proxy.$post(Interface.list2, {
              filterId:'',
              objectTypeCode:'100311',
              entityName:'KbSubjectContent',
              filterQuery:filterQuery,
              search:'',
              page: 1,
              rows: 100,
              sort:'DisplayOrder',
              order:'asc',
              displayColumns:'Name'
          }).then(res => {
              if(res&&res.nodes&&res.nodes.length){
                var list = [];
                for (var i = 0; i < res.nodes.length; i++) {
                    var item = res.nodes[i];
                    for(var cell in item){
                        if(cell!='id'&&cell!='nameField'&&cell!='ContentId'&&cell!='SubjectId'){
                            item[cell]=girdFormatterValue(cell,item);
                        }
                        // if(cell=='ContentId'||cell=='SubjectId'){
                        //   item[cell+'Value']=item[cell].lookupValue.value;
                        //   item[cell]=girdFormatterValue(cell,item);
                        // }
                        // if(cell=='CreatedOn'||cell=='ModifiedOn'){
                        //     item[cell]=item[cell]?dayjs(item[cell]).format("YYYY-MM-DD HH:mm"):'';
                        // }
                    }
                    list.push(item)
                }
                data.listDataDetail[id] = list;
              }
          })
    }
  const onSearch = (e) => {
    getQuery();
  };
  const onClear = (e) => {
    data.searchVal='';
    getQuery();
  };
  const getDetail = () => {
      let d = {
          actions:[{
              id: "4270;a",
              descriptor: "aura://RecordUiController/ACTION$getRecordWithFields",
              callingDescriptor: "UNKNOWN",
              params: {
                recordId: data.id,
                apiName: 'KbSubject',
                objTypeCode: '100310',
              }
          }]
      };
      let obj = {
          message: JSON.stringify(d)
      }
      proxy.$post(Interface.detail,obj).then(res=>{
          if(res&&res.actions&&res.actions[0]){
            let record = res.actions[0].returnValue.fields;
            data.ParentSubjectName=record.Name?record.Name.displayValue:'';
            data.Description=record.Description?record.Description.value:'';
          }
      })
      
    }
    const getData = () => {
      
    }
    const appendText=(e)=>{
        console.log(e)
    }
    const sendMessage=()=>{
        if(data.messagetext){
            data.messageList.push({
                name:'管理员',
                text:data.messagetext
            })
            message.success("发送成功！");
            data.messagetext='';
        }
        else{
            message.error("消息内容不能为空！");
        }
    }
    const handleTo=(name)=> {
        let url = router.resolve({
            path: name,
            query: {
                
            }
        })
        window.open(url.href);

    }
  onMounted(() => {
    let h = document.documentElement.clientHeight;
        data.height=h;
        window.addEventListener("resize", (e) => {
          let h = document.documentElement.clientHeight;
          data.height=h;
        });
        getData();
  })
  </script>
  <style lang="less">
  @import url("@/style/messagehome/color.css");
  </style>
  <style lang="less" scoped>
  @import url("@/style/messagehome/home.css");
  .MessageHomeWrap {
    width: 100%;
    font-family: LarkHackSafariFont, LarkEmojiFont, LarkChineseQuote, -apple-system, BlinkMacSystemFont, Helvetica Neue, Tahoma, PingFang SC, Microsoft Yahei, Arial, Hiragino Sans GB, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji;
    .messagesLayout{
        height: calc(~'100% - 0px');
    }
    .a11y_feed_card_item:hover{
        background-color:var(--imtoken-feed-fill-active);
    }
    .appNavbar-navHeader{
        height: auto;
    }
    .gpf-biz-suite-custom-icon__icon-wrapper {
        display: inline-flex;
        flex: none;
        justify-content: center;
        align-items: center;
        width: var(--wrapper-size);
        height: var(--wrapper-size);
    }
    .gpf-biz-suite-custom-icon__icon-wrapper-background {
        border-radius: 50%;
        background-color: var(--color);
    }
    .gpf-biz-suite-custom-icon__icon-wrapper-shortcut {
        position: relative;
    }
    .gpf-biz-suite-custom-icon__icon-default {
        width: var(--icon-size);
        height: var(--icon-size);
    }
    .gpf-biz-suite-custom-icon__icon-default--link {
        color: var(--text-link-normal);
    }
    .gpf-biz-suite-custom-icon__icon-default--disabled {
        color: var(--N600);
    }
    .message-item .message-info{
        height: auto;
    }
    .lark__editor--default .editor-kit-container{
        background: transparent;
    }
    
    .lark__editor--simple .editor__custom--placeholder{
        color: #333 !important;
        opacity: 1;
        width: 100% !important;
        border: none !important;
        box-shadow: none !important;
    }
    .messageList-row-wrapper{
        position: relative !important;
    }
    .messageList .scroller_content{
        height: 100%;
        overflow:visible;
    }
    .list_items{
        padding-top: 10px;
        height: calc(~'100% - 10px');
    }
    // ._2b17aec6,.dc56891e{
    //     color: var(--static-white-90);
    // }
  }
  </style>