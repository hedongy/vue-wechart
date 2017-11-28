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
            <div v-show="showFlag" class="weui-uploader__input-box" :id="inputContainerId">
                <input :id="inputId" class="weui-uploader__input" type="file" accept="image/*" v-if="!multiple">
                <input :id="inputId" class="weui-uploader__input" type="file" accept="image/*" v-else-if="multiple" multiple>
            </div>
        </div>
    </div>
</template>

<script>

    import Tools from '../bean/Tools';

    /**
     *  option {
     *      title: String,
     *      fileName: String,
     *      multiple: Boolean,
     *      maxSize: Number,
     *      callback(inputElementId, hooks): Function
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
                showFlag: true,
                optionObject: {
                    title: '文件上传',
                    fileName: 'file',
                    multiple: false,
                    maxSize: 0
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
                return `background-image: url(${item});`;
            },

            /**
             * 上传事件
             */
            uploadEvent() {
                this.optionObject.callback && this.optionObject.callback(this.inputId, this.hooks);
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
            },

            /**
             * 列表钩子
             * @param list
             */
            hooks(list) {
                if (!this.maxSize || (this.maxSize && list && this.maxSize >= list.length)) {
                    this.list = list;
                } else if (!list) {
                    Tools.showToast({
                        content: '传入数据列表不能为空'
                    });
                } else if (this.maxSize && this.maxSize < list.length) {
                    Tools.showToast({
                        content: `传入数据列表最大长度为${this.maxSize}`
                    });
                } else {
                    Tools.showToast({
                        content: '未知错误'
                    });
                }
                this.resetFileInputElement();
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
