<!-- 2017/11/21-->
<template>
    <div class="weui-form-preview">
        <div class="weui-form-preview__hd">
            <label class="weui-form-preview__label">{{header.label}}</label>
            <em class="weui-form-preview__value">{{header.value}}</em>
        </div>
        <div class="weui-form-preview__bd">
            <div class="weui-form-preview__item" v-for="(item, index) in list">
                <label class="weui-form-preview__label">{{item.label}}</label>
                <span class="weui-form-preview__value">{{item.value}}</span>
            </div>
        </div>
        <div class="weui-form-preview__ft">
            <a :class="getBtnClasses(item)" href="javascript:" @click="clickEvent(index, item)" v-for="(item, index) in events">{{item.label}}</a>
        </div>
    </div>
</template>

<script>

    /**
     * header: {
     *     label: String,
     *     value: String
     * },
     * list: [{
     *     label: String,
     *     value: String
     * }],
     * events: [{
     *     label: String,
     *     default: Boolean,
     *     callback(index, eventItem): Function
     * }]
     */
    export default {
        name: 'Preview',
        props: {
            header: {
                type: Object,
                default: {
                    label: null,
                    value: null
                },
            },
            list: {
                type: Array,
                default: Array.of()
            },
            events: {
                type: Array,
                default: Array.of()
            }
        },
        methods: {

            /**
             * 获取按钮图标
             */
            getBtnClasses(item) {
                return `weui-form-preview__btn weui-form-preview__btn_${item.default ? 'default' : 'primary'}`;
            },

            /**
             * 点击事件
             * @param index
             * @param eventItem
             */
            clickEvent(index, eventItem) {
                eventItem.callback && eventItem.callback(index, eventItem);
            }
        }
    };
</script>

<style lang="scss">

    @import "../assets/scss/base.scss";

    .weui-form-preview__btn_primary{
        color: $COLOR;
    }

</style>
