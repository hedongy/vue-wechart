<!-- 2017/10/30-->
<template>
    <transition name="conform">
        <div class="conform-mask">
            <div class="conform-container">
                <div class="weui-dialog">
                    <div class="weui-dialog__hd"><strong class="weui-dialog__title">{{option.title}}</strong></div>
                    <div class="weui-dialog__bd">{{option.content}}</div>
                    <div class="weui-dialog__ft">
                        <a @click="clickOk(btn)" v-for="(btn, index) in option.btns" href="javascript:;" class="weui-dialog__btn" :class="getClasses(index)">{{btn.name}}</a>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>

    import Config from '../bean/Config';
    import Tools from '../bean/Tools';

    /**
     *  option {
     *      title: String,
     *      content: String,
     *      btns: [{
     *          name: String,
     *          callback(): Function
     *      }],
     *  }
     */
    export default {
        name: 'Conform',
        data() {
            return {
                option: {
                    title: '提示',
                    btns: [{
                        name: '取消'
                    }, {
                        name: '确定'
                    }],
                    content: null
                }
            };
        },
        methods: {
            clickOk(btn) {
                Tools.hideConform();
                btn.callback && btn.callback();
            },
            getClasses(index) {
                return index === 0 ? 'weui-dialog__btn_default' : 'weui-dialog__btn_info';
            }
        },
        created() {
            const that = this;
            Tools.getGlobVue().$on(Config.CONFORM_OPTION_EMIT_EVENT_KEY, (data) => {
                Object.assign(that.option, data);
            });
        }
    }
</script>

<style>
    .conform-enter {
        transform: scale(0, 0);
    }
    .conform-leave-active {
        transform: scale(0, 0);
    }
    .conform-enter .conform-container,
    .conform-leave-active .conform-container {
        opacity: 1;
    }

    .conform-mask {
        position: absolute;
        z-index: 1000;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: transparent;
        transition: all .5s;
    }

    .conform-container .weui-dialog__btn_info{
        color: #ff0000;
    }
</style>
