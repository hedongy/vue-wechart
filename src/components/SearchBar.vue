<!-- 2017/10/24-->
<template>
    <div style="position: relative;">
        <div class="weui-search-bar" :class="searchBarClass" @click="clickInput()">
            <form class="weui-search-bar__form">
                <div class="weui-search-bar__box">
                    <i class="weui-icon-search"></i>
                    <input @input="inputting()" ref="input" v-model="inputVal" type="search" class="weui-search-bar__input" placeholder="搜索" required/>
                    <a href="javascript:" class="weui-icon-clear" @click.stop="cancelSearch()"></a>
                </div>
                <label class="weui-search-bar__label">
                    <i class="weui-icon-search"></i>
                    <span>搜索</span>
                </label>
            </form>
            <a href="javascript:" class="weui-search-bar__cancel-btn" @click.stop="cancelSearch()">取消</a>
        </div>
        <div class="weui-cells searchbar-result searchbar-result-list" v-show="hasResult">
            <div @click="clickItem(item)" v-for="item in list" class="weui-cell weui-cell_access">
                <div class="weui-cell__bd weui-cell_primary">
                    <p>{{item.title}}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'SearchBar',
        data() {
            return {
                list: [{
                    title: '实时搜索文本1'
                }, {
                    title: '实时搜索文本2'
                }],
                searchBarClass: '',
                hasResult: false,
                inputVal: null
            };
        },
        methods: {
            clickItem(item) {
                console.log(item);
                this.$emit('searchbar', item);
            },
            cancelSearch() {
                this.hasResult = false;
                this.searchBarClass = '';
                this.inputVal = null;
            },
            clickInput() {
                this.searchBarClass = 'weui-search-bar_focusing';
                this.$refs.input.focus();
            },
            inputting() {
                this.hasResult = true;
            }
        }
    };
</script>

<style lang="scss">

    @import "../assets/scss/base.scss";

    .searchbar-result-list{
        position: absolute;
        width: 100%;
        margin-top: 0;
        color: #aaaaaa;
        font-size: 15px;
        z-index: 1;
    }
    .weui-search-bar__cancel-btn{
        color: $COLOR;
    }
</style>
