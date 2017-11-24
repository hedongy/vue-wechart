/**
 * Created by Tuffy on 2017/10/30.
 */
'use strict';

import axios from 'axios';

import Config from './Config';
import Tools from './Tools';

/**
 * 请求类
 */
class Request {

    /**
     * 请求
     * @param option {
     *    url: url,
     *    params: {},
     *    method: get[post|put,],
     *    isLocal: false, // 是否本域访问，默认不是
     * }
     */
    static all(option = {}) {
        const defaultMethod = 'get';
        let $option = {
            method: defaultMethod,
            params: {}
        };
        Object.assign($option, option);
        formatParams($option.params);
        $option.method !== defaultMethod ? $option.data = $option.params : null;
        $option.isLocal ? $option.url = `${Config.HOST}${$option.url}` : $option.url = `${Config.SERVICE}${$option.url}`;
        return new Promise((resolve, reject) => {
            // headers
            $option.headers = {
                Authorization: Tools.getToken()
            };
            axios($option).then((data) => {
                resolve(data);
                Tools.hideLoading();
            }).catch((error) => {
                reject(error);
                Tools.hideLoading();
            });
        });
    }

    /**
     * 上传
     * @param option {
     *     url: String,
     *     fileElementId: String,
     *     callback(err, data): Function
     * }
     */
    static upload(option) {
        Tools.showLoading();
        const url = `${Config.SERVICE}${option.url}`;
        const xhr = new XMLHttpRequest();
        const fd = new FormData();
        xhr.open('POST', url, true);
        xhr.onreadystatechange = () => {
            if (xhr.readyState == 4 && xhr.status == 200) {
                Tools.hideLoading();
                const responseText = xhr.responseText || '{}';
                const responseJson = JSON.parse(responseText);
                option.callback && option.callback(null, responseJson);
            }
        };
        xhr.onerror = (err) => {
            Tools.hideLoading();
            option.callback && option.callback(err);
        };
        const fileInputEle = document.getElementById(option.fileElementId);
        for (let i = 0; i < fileInputEle.files.length; i++) {
            fd.append(option.fileName, fileInputEle.files[i]);
        }
        xhr.send(fd);
    }
}

/**
 * 获取get请求参数
 * @param url
 * @param params
 * @return {string}
 */
function params2Url(url = '', params = {}) {
    let retUrl = '';
    let paramsArray = [];
    for (let i in params) {
        paramsArray.push(`${i}=${params[i]}`);
    }
    const paramsString = paramsArray.join('&');
    if (url.includes('?')) {
        retUrl = `${url}&${paramsString}`;
    } else {
        retUrl = `${url}?${paramsString}`;
    }
    return retUrl;
}

/**
 * 格式化请求参数
 * @param params
 */
function formatParams(params = {}) {
    const keys = Object.keys(params);
    keys.map(key => {
        params[key] ? null : delete params[key];
    });
}

export default Request;