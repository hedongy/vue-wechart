<!-- 2017/10/31-->
<template>
    <transition name="prompt">
        <div class="prompt-mask">
            <div class="prompt-container">
                <div class="weui-dialog">
                    <div class="weui-dialog__hd"><strong class="weui-dialog__title">{{option.title}}</strong></div>
                    <div class="weui-dialog__bd">
                        <div class="input-content">
                            <input class="weui-input" :type="option.type" v-model="modelVal" placeholder="请输入数据">
                        </div>
                    </div>
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

    export default {
        name: 'Prompt',
        data() {
            return {
                option: {
                    title: '提示',
                    btns: [{
                        name: '取消'
                    }, {
                        name: '确定'
                    }],
                    type: 'text'
                },
                modelVal: null
            };
        },
        methods: {
            clickOk(btn) {
                Tools.hidePrompt();
                btn.callback && btn.callback(this.modelVal);
                this.modelVal = null;
            },
            getClasses(index) {
                return index === 0 ? 'weui-dialog__btn_default' : 'weui-dialog__btn_info';
            }
        },
        created() {
            const that = this;
            Tools.getGlobVue().$on(Config.PROMPT_OPTION_EMIT_EVENT_KEY, (data) => {
                Object.assign(that.option, data);
            });
        }
    }
</script>

<style>
    .prompt-enter {
        transform: scale(0, 0);
    }
    .prompt-leave-active {
        transform: scale(0, 0);
    }
    .prompt-enter .prompt-container,
    .prompt-leave-active .prompt-container {
        opacity: 1;
    }

    .prompt-mask {
        position: absolute;
        z-index: 1000;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: transparent;
        transition: all .5s;
    }
    .prompt-container .weui-dialog__btn_info{
        color: #ff0000;
    }
    .prompt-container .input-content{
        border: 1px solid #eeeeee;
        height: 35px;
        padding: 3px 5px;
        border-radius: 6px
    }
    .prompt-container .input-content input{
        height: 35px;
        font-size: 15px;
    }
</style>
