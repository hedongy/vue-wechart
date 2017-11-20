/**
 * Created by Tuffy on 2017/10/30.
 */
'use strict';

export default {

    // 主机地址
    HOST: 'http://localhost:8080',

    // 服务器地址
    SERVICE: 'http://localhost:8080',

    // token key
    TOKEN_IN_COOKIE: 'TOKEN_IN_COOKIE',

    // 日期格式化
    DATE_FORMAT_TYPE: {
        YYY_MM_DD: 'yyyy-MM-dd',
        YYY_MM_DD_HH_MM_SS: 'yyyy-MM-dd HH:mm:ss',
        YYY_MM_DD_HH_MM: 'yyyy-MM-dd HH:mm',
        HH_MM_SS: 'HH:mm:ss',
        HH_MM: 'HH:mm'
    },

    // 本地网关模拟session 延缓 token 时间片（5分钟）
    TIME_SLICE_EXPIRES_IN: 5 * 60 * 1000,

    // 本地网关模拟session 超时 小时
    TIMEOUT_HOURS:  2,

    // alert分发key
    ALERT_EMIT_EVENT_KEY: 'ALERT_EMIT_EVENT_KEY',

    // alert配置信息
    ALERT_OPTION_EMIT_EVENT_KEY: 'ALERT_OPTION_EMIT_EVENT_KEY',

    // conform分发key
    CONFORM_EMIT_EVENT_KEY: 'CONFORM_EMIT_EVENT_KEY',

    // conform配置信息
    CONFORM_OPTION_EMIT_EVENT_KEY: 'CONFORM_OPTION_EMIT_EVENT_KEY',

    // prompt分发key
    PROMPT_EMIT_EVENT_KEY: 'PROMPT_EMIT_EVENT_KEY',

    // prompt配置信息
    PROMPT_OPTION_EMIT_EVENT_KEY: 'PROMPT_OPTION_EMIT_EVENT_KEY',

    // loading分发key
    LOADING_EMIT_EVENT_KEY: 'LOADING_EMIT_EVENT_KEY',

    // loading配置信息
    LOADING_OPTION_EMIT_EVENT_KEY: 'LOADING_OPTION_EMIT_EVENT_KEY',

    // toast分发key
    TOAST_EMIT_EVENT_KEY: 'TOAST_EMIT_EVENT_KEY',

    // toast配置信息
    TOAST_OPTION_EMIT_EVENT_KEY: 'TOAST_OPTION_EMIT_EVENT_KEY',

    // tabs分发key
    TABS_EMIT_EVENT_KEY: 'TABS_EMIT_EVENT_KEY',

    // action sheet配置信息
    ACTIONSHEET_OPTION_EMIT_EVENT_KEY: 'ACTIONSHEET_OPTION_EMIT_EVENT_KEY',

    // action sheet分发key
    ACTIONSHEET_EMIT_EVENT_KEY: 'ACTIONSHEET_EMIT_EVENT_KEY',

    // tabs高度
    TABS_DEFAULT_HEIGHT: 50,

    // 加载完毕，没有数据分发key
    SCROLL_BOTTOM_NO_DATA_EMIT_EVENT_KEY: 'SCROLL_BOTTOM_NO_DATA_EMIT_EVENT_KEY',

    // 一级路由
    LEVEL_1_ROUTERS: ['index', 'me', 'opened']
};