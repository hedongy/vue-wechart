<!-- 2017/11/20-->
<template>
    <div class="weui-slider-box">
        <div class="weui-slider">
            <div class="weui-slider__inner" ref="sliderInner">
                <div :style="getSelectedTrack" class="weui-slider__track"></div>
                <div @touch:tap="touchStart()" @touch:swipe="touchEnd()" :style="getSelectedHandler" class="weui-slider__handler"></div>
            </div>
        </div>
        <div class="weui-slider-box__value">{{selected}}</div>
    </div>
</template>

<script>

    export default {
        name: 'Slider',
        props: {
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
            }
        },
        created() {
            this.selected = this.value;
            this.$nextTick(() => {
                this.totalLen = this.$refs.sliderInner.offsetWidth;
            });
        }
    };
</script>

<style></style>
