<!-- 2017/11/20-->
<template>
    <div class="weui-slider-box">
        <div class="weui-slider">
            <div class="weui-slider__inner" ref="sliderInner">
                <div :style="getSelectedTrack" class="weui-slider__track"></div>
                <div ref="sliderHandler" :style="getSelectedHandler" class="weui-slider__handler"></div>
            </div>
        </div>
        <div class="weui-slider-box__value" v-show="showValue">{{selected}}</div>
    </div>
</template>

<script>

    /**
     * showValue: Boolean // 是否显示数值，默认不显示
     */
    export default {
        name: 'Slider',
        props: {
            showValue: {
                type: Boolean,
                default: false
            },
            value: {
                type: Number,
                default: 0
            }
        },
        data() {
            return {
                selected: 0,
                totalLen: 0,
                startLeft: 0,
                startX: 0
            };
        },
        computed: {
            getSelectedTrack() {
                return `width: ${this.selected}%;`;
            },
            getSelectedHandler() {
                return `left: ${this.selected}%;`;
            }
        },
        methods: {
            touchStart(e) {
                this.startLeft = Number.parseInt(this.selected) * this.totalLen / 100;
                this.startX = e.changedTouches[0].clientX;
            },

            touchEnd(e) {
                let dist = this.startLeft + e.changedTouches[0].clientX - this.startX;
                dist = dist < 0 ? 0 : dist > this.totalLen ? this.totalLen : dist;
                this.selected =  Number.parseInt(dist / this.totalLen * 100);
                e.preventDefault();
                this.$emit('input', this.selected);
            }
        },
        created() {
            const that = this;
            that.selected = that.value;
            that.$nextTick(() => {
                that.totalLen = $(that.$refs.sliderInner).width();
                const sliderHandler = $(that.$refs.sliderHandler);
                sliderHandler.on('touchstart', (e) => {
                    that.touchStart(e);
                }).on('touchmove', (e) => {
                    that.touchEnd(e);
                });
            });
        }
    };
</script>

<style lang="scss">

    @import "../assets/scss/base.scss";

    .weui-slider__track{
        background-color: $COLOR;
    }

</style>
