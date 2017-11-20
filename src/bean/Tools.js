/**
 * Created by Tuffy on 2017/10/30.
 */
'use strict';

let globVue = null;
let toastTimerHandler = null;

import Vue from 'vue';
import Config from './Config';

class Tools {

    /**
     * 格式化日期
     * @param date
     * @param format
     * @return {string}
     */
    static formatDate(date, format = Config.DATE_FORMAT_TYPE.YYY_MM_DD) {
        const o = {
            'M+': date.getMonth() + 1, //月份
            'd+': date.getDate(), //日
            'H+': date.getHours(), //小时
            'm+': date.getMinutes(), //分
            's+': date.getSeconds(), //秒
            'q+': Math.floor((date.getMonth() + 3) / 3), //季度
            'S': date.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(format)) format = format.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp('(' + k + ')').test(format)) format = format.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
        return format;
    }

    /**
     * 获取token
     * @return {null} token
     */
    static getToken() {
        const tokenObj = JSON.parse(Tools.getCookie(Config.TOKEN_IN_COOKIE));
        let target = {
            timer: 0,
            token: null
        };
        Object.assign(target, tokenObj);
        const newTimer = +new Date();
        const token = target.token;
        // 判断token 是否超过写入时间片（顺延token）
        if (token && newTimer - target.timer > Config.TIME_SLICE_EXPIRES_IN) {
            Tools.setToken(token);
        }
        return token;
    }

    /**
     * 设置token，默认为两小时
     * @param token
     */
    static setToken(token) {
        Tools.setCookie(Config.TOKEN_IN_COOKIE, JSON.stringify({
            timer: +new Date(),
            token: token
        }), Config.TIMEOUT_HOURS);
    }

    /**
     * 获取uuid
     * @param len 长度
     * @param radix 进制
     * @return {string} uuid
     */
    static getUUID(len = 32, radix = 10) {
        const chars = Array.from('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz');
        let uuid = Array.of();
        for (let i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix];
        return uuid.join('');
    }

    /**
     * 数字转换为数组，0位分界点，负数到0结束；正数从0开始
     * @param number 数字
     * @param cutoff 分界点，默认为0
     * @param step 步幅
     * @return {Array} 数组
     */
    static number2Array(number = 0, cutoff = 0, step = 1) {
        let numberArray = [];
        const max = number > 0 ? number : cutoff;
        const min = number < 0 ? number : cutoff;
        let pointer = min;
        for (pointer; pointer <= max; pointer += step) {
            numberArray.push(pointer);
        }
        return numberArray;
    }

    /**
     * 获取cookie值
     * @param name cookie名称
     * @returns {null} cookie值
     */
    static getCookie(name) {
        const arr = document.cookie.match(new RegExp(`(^| )${name}=([^;]*)(;|$)`));
        if (arr != null)
            return unescape(arr[2]);
        return null;
    }

    /**
     * 设置cookie
     * @param name key值
     * @param value value
     * @param hours 失效时间
     */
    static setCookie(name, value, hours) {
        const d = new Date();
        const offset = 8;
        const utc = d.getTime() + (d.getTimezoneOffset() * 60000);
        const nd = utc + (3600000 * offset);
        const exp = new Date(nd);
        exp.setTime(exp.getTime() + hours * 60 * 60 * 1000);
        document.cookie = `${name}=${escape(value)};path=/;expires=${exp.toGMTString()}`;
    }

    /**
     * 显示alert
     * @param option
     */
    static showAlert(option = {}) {
        const globVue = Tools.getGlobVue();
        globVue.$emit(Config.ALERT_OPTION_EMIT_EVENT_KEY, option);
        globVue.$emit(Config.ALERT_EMIT_EVENT_KEY, true);
    }

    /**
     * 隐藏alert
     */
    static hideAlert() {
        Tools.getGlobVue().$emit(Config.ALERT_EMIT_EVENT_KEY, false);
    }

    /**
     * 显示conform
     * @param option
     */
    static showConform(option = {}) {
        const globVue = Tools.getGlobVue();
        globVue.$emit(Config.CONFORM_OPTION_EMIT_EVENT_KEY, option);
        globVue.$emit(Config.CONFORM_EMIT_EVENT_KEY, true);

    }

    /**
     * 隐藏conform
     */
    static hideConform() {
        Tools.getGlobVue().$emit(Config.CONFORM_EMIT_EVENT_KEY, false);
    }

    /**
     * 显示prompt
     * @param option
     */
    static showPrompt(option = {}) {
        const globVue = Tools.getGlobVue();
        globVue.$emit(Config.PROMPT_OPTION_EMIT_EVENT_KEY, option);
        globVue.$emit(Config.PROMPT_EMIT_EVENT_KEY, true);

    }

    /**
     * 隐藏prompt
     */
    static hidePrompt() {
        Tools.getGlobVue().$emit(Config.PROMPT_EMIT_EVENT_KEY, false);
    }

    /**
     * 显示loading
     * @param content
     */
    static showLoading(content) {
        const globVue = Tools.getGlobVue();
        globVue.$emit(Config.LOADING_OPTION_EMIT_EVENT_KEY, content);
        globVue.$emit(Config.LOADING_EMIT_EVENT_KEY, true);

    }

    /**
     * 隐藏loading
     */
    static hideLoading() {
        Tools.getGlobVue().$emit(Config.LOADING_EMIT_EVENT_KEY, false);
    }

    /**
     * 显示toast
     * @param callback
     * @param timer
     */
    static showToast(option = {}) {
        toastTimerHandler ? clearTimeout(toastTimerHandler) : null;
        const globVue = Tools.getGlobVue();
        globVue.$emit(Config.TOAST_OPTION_EMIT_EVENT_KEY, option);
        globVue.$emit(Config.TOAST_EMIT_EVENT_KEY, true);
        toastTimerHandler = setTimeout(() => {
            Tools.hideToast();
            option.callback && option.callback();
            clearTimeout(toastTimerHandler);
        }, (option.timer || 3) * 1000);
    }

    /**
     * 隐藏toast
     */
    static hideToast() {
        Tools.getGlobVue().$emit(Config.TOAST_EMIT_EVENT_KEY, false);
    }

    /**
     * 显示actionsheet
     * @param option
     */
    static showActionsheet(option = {}) {
        const globVue = Tools.getGlobVue();
        globVue.$emit(Config.ACTIONSHEET_OPTION_EMIT_EVENT_KEY, option);
        globVue.$emit(Config.ACTIONSHEET_EMIT_EVENT_KEY, true);
    }

    /**
     * 隐藏actionsheet
     */
    static hideActionsheet() {
        Tools.getGlobVue().$emit(Config.ACTIONSHEET_EMIT_EVENT_KEY, false);
    }

    /**
     * 获取全局vue线程句柄
     * @return {*}
     */
    static getGlobVue() {
        globVue ? null : globVue = new Vue();
        return globVue;
    }

    /**
     * 显示单选择列表
     * @param option {
     *      list: [{
     *          label: String,
                value: any,
                disabled: boolean
     *      }],
     *      confirmed(result): Function,
     *      changed(result): Function
     * }
     */
    static showSelector(option = {}) {
        weui.picker(option.list, {
            onChange: function (result) {
                option.changed && option.changed(result);
            },
            onConfirm: function (result) {
                option.confirmed && option.confirmed(result);
            }
        });
    }

    /**
     * 显示日期选择
     * @param option {
     *     start: Number, // 年份
     *     end: Number, // 年份
     *     confirmed(result): Function,
     *      changed(result): Function
     * }
     */
    static showDatePicker(option = {}) {
        // 默认配置
        const optionObj = {
            onChange: function (result) {
                option.changed && option.changed(result);
            },
            onConfirm: function (result) {
                option.confirmed && option.confirmed(result);
            }
        };
        option.start ? optionObj.start = option.start : null;
        option.end ? optionObj.end = option.end : null;
        weui.datePicker(optionObj);
    }
}

export default Tools;