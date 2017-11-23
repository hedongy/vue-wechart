<!-- 2017/11/21-->
<template>
    <div class="navbar-container">
        <ul>
            <li @click="clickItem(index, item)" v-for="(item, index) in list" :class="{active: item.active}">{{item.label}}</li>
        </ul>
    </div>
</template>

<script>

    /**
     * list: [{
     *     label: String
     * }],
     * callback(index, item): Function
     */
    export default {
        name: 'Navbar',
        props: {
            list: {
                type: Array,
                default: Array.of()
            },
            callback: {
                type: Function,
                default: null
            }
        },
        methods: {

            /**
             * 点击项目
             * @param index
             * @param item
             */
            clickItem(index, item) {
                for (let i = 0; i < this.list.length; i++) {
                    const currentItem = this.list[i];
                    if (i === index) {
                        currentItem.active = true;
                    } else {
                        currentItem.active = false;
                    }
                    this.list.splice(i, 1, currentItem);
                }
                this.callback && this.callback(index, item);
            }
        },
        created() {
            for (let i = 0; i < this.list.length; i++) {
                const item = this.list[i];
                if (i === 0) {
                    item.active = true;
                } else {
                    item.active = false;
                }
            }
        }
    };
</script>

<style lang="scss">

    @import "../assets/scss/base.scss";

    .navbar-container ul{
        display: flex;
    }
    .navbar-container ul li{
        flex: 1;
        padding: 5px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-bottom: 3px solid transparent;
    }
    .navbar-container ul li.active{
        color: $COLOR;
        border-bottom: 3px solid $COLOR;
    }
</style>
