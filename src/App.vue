<template>
  <div id="app">
      <Layout/>
      <Alert v-show="showAlert"></Alert>
      <Conform v-show="showConform"></Conform>
      <Prompt v-show="showPrompt"></Prompt>
      <Loading v-show="showLoading"></Loading>
      <Toast v-show="showToast"></Toast>
      <Actionsheet v-show="actionsheetToast"></Actionsheet>
  </div>
</template>

<script>

    import Config from './bean/Config';
    import Tools from './bean/Tools';

    export default {
        name: 'app',
        data() {
            return {
                showAlert: false,
                showConform: false,
                showPrompt: false,
                showLoading: false,
                showToast: false,
                actionsheetToast: false
            };
        },
        created() {
            const that = this;
            const globVue = Tools.getGlobVue();
            // alert事件监听
            globVue.$on(Config.ALERT_EMIT_EVENT_KEY, (flag) => {
                that.showAlert = flag;
            });
            // conform事件监听
            globVue.$on(Config.CONFORM_EMIT_EVENT_KEY, (flag) => {
                that.showConform = flag;
            });
            // prompt事件监听
            globVue.$on(Config.PROMPT_EMIT_EVENT_KEY, (flag) => {
                that.showPrompt = flag;
            });
            // loading事件监听
            globVue.$on(Config.LOADING_EMIT_EVENT_KEY, (flag) => {
                that.showLoading = flag;
            });
            // toast事件监听
            globVue.$on(Config.TOAST_EMIT_EVENT_KEY, (flag) => {
                that.showToast = flag;
            });
            // actionsheet事件监听
            globVue.$on(Config.ACTIONSHEET_EMIT_EVENT_KEY, (flag) => {
                that.actionsheetToast = flag;
            });
        }
    }
</script>

<style>
  html, body{
    height: 100%;
  }
  #app{
    height: 100%;
  }
  .weui-picker__action{
      color: #ff0000;
  }
</style>
