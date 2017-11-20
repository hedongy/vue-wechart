<!-- 2017/10/25-->
<template>
    <div class="dh-sliderbox">
        <div class="dh-sliderbox-nav">
            <ul>
                <li v-for="item in option.list" :class="{active: item.active}"></li>
            </ul>
        </div>
        <div :style="{height: option.height ? option.height + 'px' : 'auto'}">
            <!--<img :src="option.list[0].src" v-if="option.list.length > 0" style="position: relative; z-index: -1;">-->
            <!--<img :class="item.classes" :src="item.src" v-for="(item, index) in option.list" :style="{top: 0, transform: index > 0 ? 'translate(100%, 0)' : 'translate(0, 0)', position: 'absolute', zIndex: item.zIndex}">-->
            <div @click="clickItem(item)" class="item" :class="item.classes" v-for="(item, index) in option.list" :style="{background: 'url(' + item.src + ') no-repeat center', backgroundSize: '100%', top: 0, transform: index > 0 ? 'translate(100%, 0)' : 'translate(0, 0)', position: 'absolute', zIndex: item.zIndex, height: option.height + 'px'}"></div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Sliderbox',
        props: {
            /**
             * {
             *     list: Array,
             *     height: px,
             *     timer: s
             * }
             */
            option: {
                type: Object,
                default: {
                    list: [],
                    timer: 3,
                    height: 100
                }
            }
        },
        data() {
            return {

            };
        },
        methods: {
            /**
             * 初始化
             */
            init() {
                this.changeItem();
            },
            changeItem() {
                const that = this;
                const timer = setTimeout(() => {
                    for(let i = 0; i < that.option.list.length; i++) {
                        const item = that.option.list[i];
                        // 当前显示
                        if (item.active) {
                            item.classes = 'leave';
                            item.active = false;

                            // 下一元素
                            // 如果是最后一个元素，则进入第一个元素计算
                            let lastItem = null;
                            i + 1 === that.option.list.length ? lastItem = that.option.list[0] : lastItem = that.option.list[i + 1];
                            lastItem.active = true;
                            lastItem.classes = 'active';
                            break;
                        }
                    }
                    that.changeItem();
                    clearTimeout(timer);
                }, that.option.timer * 1000);
            },
            clickItem(item) {
                item.callback && item.callback(item);
            }
        },
        created() {
            this.init();
        }
    };
</script>

<style>
    .dh-sliderbox{
        width: 100%;
        position: relative;
        overflow: hidden;
    }
    .dh-sliderbox .current-box{
        position: absolute;
        width: 100%;
        overflow: hidden;
    }
    .dh-sliderbox-nav{
        position: absolute;
        bottom: 5px;
        text-align: center;
        width: 100%;
        z-index: 1;
    }
    .dh-sliderbox-nav ul{
        text-align: center;
    }
    .dh-sliderbox-nav ul li{
        display: inline-block;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background-color: transparent;
        box-shadow: inset 0 0 0 1px #ffffff;
        margin: 0 5px;
    }
    .dh-sliderbox-nav ul li.active{
        background-color: #ffffff;
    }
    .dh-sliderbox .item{
        width: 100%;
        position: relative;
    }
    .dh-sliderbox .item.active{
        animation: active-fade-in 0.3s forwards;
    }
    .dh-sliderbox .item.leave{
        animation: leave-fade-in 0.3s forwards;
    }
    @keyframes active-fade-in {
        0% {
            transform: translate(100%, 0);
        }
        100% {
            transform: translate(0, 0);
        }
    }
    @keyframes leave-fade-in {
        0% {
            transform: translate(0, 0);
        }
        99% {
            transform: translate(-100%, 0);
        }
        100% {
            transform: translate(-100%, 0);
            transform: translate(100%, 0);
        }
    }
</style>
