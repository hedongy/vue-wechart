/**
 * Created by Tuffy on 2017/10/30.
 */
'use strict';

/**
 * 分页对象
 */
class Page {

    /**
     * 构造器
     */
    constructor() {
        this.pageNum = 1; // 页码
        this.pageSize = 10; // 页面记录数
        this.totalPage = 1; // 总页数
        this.totalSize = 0; // 总条数
    }

    /**
     * 获取当前页码
     * @return {*|number}
     */
    getPageNum() {
        return this.pageNum;
    }

    /**
     * 设置当前页码
     * @param num
     */
    setPageNum(num) {
        this.pageNum = num;
    }

    /**
     * 页码+1
     */
    plusPageNum() {
        this.pageNum += 1;
    }

    /**
     * 页码-1
     */
    minusPageNum() {
        this.pageNum -= 1;
    }

    /**
     * 获取当前页面条数
     * @return {*|number}
     */
    getPageSize() {
        return this.pageSize;
    }

    /**
     * 设置当前页面条数
     * @param size
     */
    setPageSize(size) {
        this.pageSize = size;
    }

    /**
     * 获取总页数
     * @return {number|*}
     */
    getTotalPage() {
        return this.totalPage;
    }

    /**
     * 设置总页数
     * @param total
     */
    setTotalPage(total) {
        this.totalPage = total;
    }

    /**
     * 获取总条数
     * @return {number|*}
     */
    getTotalSize() {
        return this.totalSize;
    }

    /**
     * 设置总条数
     * @param total
     */
    setTotalSize(total) {
        this.totalSize = total;
    }

    /**
     * 重置分页对象
     */
    resetPage() {
        this.pageNum = 1;
        this.pageSize = 10;
        this.totalPage = 1;
        this.totalSize = 0;
    }

    /**
     * 重置page
     * @param page
     */
    overWritePage(page = {}) {
        this.totalSize = page.totalSize || page.totalCount || 0;
        this.totalPage = Math.ceil((this.totalSize || 1) / this.pageSize);
    }

    /**
     * 获取当前分页对象属性
     * @return {{pageNum: (number|*), pageSize: (*|number), totalPage: (number|*), totalSize: (number|*)}}
     */
    getPageProprity() {
        return {
            pageNum: this.pageNum,
            pageSize: this.pageSize,
            totalPage: this.totalPage,
            totalSize: this.totalSize
        };
    }
}

export default Page;