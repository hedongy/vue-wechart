<!-- 2017/11/23-->
<template>
    <div class="weui-uploader">
        <div class="weui-uploader__hd">
            <p class="weui-uploader__title">{{optionObject.title}}</p>
            <div class="weui-uploader__info">{{list.length}}</div>
        </div>
        <div class="weui-uploader__bd">
            <ul class="weui-uploader__files">
                <li class="weui-uploader__file" :style="getBackgroundImage(item)" v-for="item in list"></li>
            </ul>
            <div class="weui-uploader__input-box" :id="inputContainerId">
                <input :id="inputId" class="weui-uploader__input" type="file" accept="image/*" v-if="!multiple">
                <input :id="inputId" class="weui-uploader__input" type="file" accept="image/*" v-else-if="multiple" multiple>
            </div>
        </div>
    </div>
</template>

<script>

    import Tools from '../bean/Tools';
    import Request from '../bean/Request';

    /**
     *  option {
     *      url: String,
     *      title: String,
     *      fileName: String,
     *      multiple: Boolean,
     *      urlKey: String,
     *      formatDate(data): Function,
     *      callback(err, data): Function
     *  }
     */
    export default {
        name: 'Upload',
        props: {
            option: {
                type: Object,
                default: {}
            }
        },
        data() {
            return {
                list: Array.of(),
                optionObject: {
                    title: '文件上传',
                    fileName: 'file',
                    multiple: false,
                    urlKey: 'url'
                },
                inputContainerId: Tools.getUUID(),
                inputId: Tools.getUUID()
            };
        },
        methods: {

            /**
             * 获取背景图片
             */
            getBackgroundImage(item) {
                return `background-image: url(${item[this.optionObject.urlKey]});`;
            },

            /**
             * 上传事件
             */
            uploadEvent() {
                const that = this;
                Request.upload({
                    url: that.optionObject.url,
                    fileElementId: that.inputId,
                    fileName: that.optionObject.fileName,
                    callback(err, data) {
                        // 成功
                        if (!err) {
                            that.optionObject.formatDate && that.optionObject.formatDate(data);
                            that.optionObject.callback && that.optionObject.callback(null, data);
                            that.list = that.list.concat(data);
                            return;
                        }
                        // 失败
                        that.optionObject.callback && that.optionObject.callback(err);
                    }
                });
            },

            /**
             * 重置文件输入框
             */
            resetFileInputElement() {
                $(`#${this.inputId}`).remove();
                let inputHtml = null;
                const fileName = this.optionObject.fileName;
                const inputId = this.inputId;
                if (this.optionObject.multiple) {
                    inputHtml = `<input type="file" name="${fileName}" id="${inputId}" multiple>`;
                } else {
                    inputHtml = `<input type="file" name="${fileName}" id="${inputId}">`;
                }
                $(`#${this.inputContainerId}`).append(inputHtml);
                $(`#${this.inputId}`).on('change', () => {
                    this.uploadEvent();
                });
            }
        },
        created() {
            Object.assign(this.optionObject, this.option);
            this.$nextTick(() => {
                $(`#${this.inputId}`).on('change', () => {
                    this.uploadEvent();
                });
            });
        }
    }
</script>

<style></style>
