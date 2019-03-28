<!-- 2017/10/23-->
<template>
    <Scroll :showLoadMore="showLoadMore" :hasMore="hasMore" :loadMore="loadMore">
        <SearchBar></SearchBar>
        <Sliderbox :option="sliderboxOption"></Sliderbox>
        <div class="weui-panel weui-panel_access">
            <!--<div class="weui-panel__hd">图文组合列表</div>-->
            <div class="weui-panel__bd">
                <a @click="clickRow(item)" v-for="item in list" href="javascript: void(0);" class="weui-media-box weui-media-box_appmsg">
                    <div class="weui-media-box__hd">
                        <img class="weui-media-box__thumb title-img" :src="item.img">
                    </div>
                    <div class="weui-media-box__bd">
                        <h4 class="weui-media-box__title">{{item.title}}</h4>
                        <p class="weui-media-box__desc">
                            <div class="weui-flex">
                                <div class="weui-flex__item"><div class="placeholder">价格：{{item.price}}万</div></div>
                                <div class="weui-flex__item"><div class="placeholder">标率：{{item.usedBid / item.fullBid * 100}}%</div></div>
                            </div>
                        </p>
                    </div>

                    <div style="flex-grow: 0; min-width: 50px;">
                        <Button :option="showBtn(item)" @btnevent="bid(item)"></Button>
                    </div>
                </a>
            </div>
        </div>
    </Scroll>
</template>

<script>

    import router from '../router';
    import Request from '../bean/Request';
    import Page from '../bean/Page';
    import Tools from '../bean/Tools';
    import Config from '../bean/Config';

    export default {
        name: 'index',
        data() {
            return {
                page: new Page(),
                list: [],
                sliderboxOption: {
                    list: [],
                    timer: 3,
                    height: 100
                },
                showLoadMore: true,
                hasMore: true
            };
        },
        methods: {
            /**
             * 按钮显示
             */
            showBtn(item) {
                return {
                    type: item.isFull ? 'disable' : 'info',
                    text: item.isFull ? '等待开奖' : '即刻投标'
                };
            },

            /**
             * 查看详情
             */
            clickRow(item) {
                router.push({
                    name: 'index-detail',
                    params: {
                        id: item.id
                    }
                });
            },

            /**
             * 投标开奖
             */
            bid(item) {
                // console.log(this.sliderValue);
                if (item.isFull) {
                    return;
                }
                console.log(item);
            },

            /**
             * 加载更多
             */
            loadMore() {
                const that = this;
                that.showLoadMore = true;
                setTimeout(() => {
                    Request.all({
                        url: '/static/data/index-data.json',
                        isLocal: true
                    }).then((response = {}) => {
                        const data = response.data;
                        if (data) {
                            that.list = that.list.concat(data);
                            that.page.plusPageNum();
                            that.showLoadMore = false;
                            that.hasMore = true;
                            return;
                        }
                        that.showLoadMore = true;
                        that.hasMore = false;
                    });
                }, 1000);
            },

            /**
             * 获取图片滑动配置
             */
            getSliderboxOption() {
                const that = this;
                Request.all({
                    url: '/static/data/sliderbox-data.json',
                    isLocal: true
                }).then((response) => {
                    that.sliderboxOption.list = response.data;
                });
            }
        },
        created() {
            const that = this;
            that.loadMore();
            that.getSliderboxOption();
        }
    }
</script>

<style lang="scss">

    @import "../assets/scss/base.scss";

    .weui-media-box__thumb.title-img{
        height: 60px;
        border-radius: 3px;
        border: 1px solid #eeeeee;
    }
    .weui-flex .weui-flex__item .placeholder{
        color: #aaaaaa;
        font-size: 12px;
    }
    .rolling-box{
        color: $COLOR;
        font-size: 14px;
    }
</style>
