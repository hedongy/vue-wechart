<!-- 2017/10/30-->
<template>
    <transition name="modal">
        <div class="modal-mask">
            <div class="modal-container">
                <div class="header">
                    <slot name="header"></slot>
                </div>
                <div class="content">
                    <slot name="content"></slot>
                    <slot></slot>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    export default {
        name: 'Modal'
    };
</script>

<style>
    .modal-enter {
        transform: translate(0, 100%);
    }
    .modal-leave-active {
        transform: translate(0, 100%);
    }
    .modal-enter .modal-container,
    .modal-leave-active .modal-container {
        transform: translate(0, 0);
    }
    .modal-mask {
        position: absolute;
        z-index: 999;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, .3);
        transition: all .5s;
    }
    .modal-container{
        display: flex;
        flex-direction: column;
        height: 100%;
    }
    .modal-container .header{
        flex-grow: 0;
        min-height: 60px;
    }
    .modal-container .content{
        flex-grow: 1;
        overflow-y: auto;
        overflow-x: hidden;
    }
</style>
