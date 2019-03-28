// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';

import Tabs from './components/Tabs';
import Layout from './components/Layout';
import Button from './components/Button';
import SearchBar from './components/SearchBar';
import Sliderbox from './components/Sliderbox';
import Modal from './components/Modal';
import Alert from './components/Alert';
import Conform from './components/Conform';
import Prompt from './components/Prompt';
import Loading from './components/Loading';
import Toast from './components/Toast';
import LoadMore from './components/LoadMore';
import Scroll from './components/Scroll';
import Actionsheet from './components/Actionsheet';
import Slider from './components/Slider';
import Progress from './components/Progress';
import Preview from './components/Preview';
import Navbar from './components/Navbar';
import Switchs from './components/Switchs';
import Upload from './components/Upload';
import Radio from './components/Radio';

Vue.config.productionTip = false;

const components = [
    Tabs,
    Layout,
    Button,
    SearchBar,
    Sliderbox,
    Modal,
    Alert,
    Conform,
    Prompt,
    Loading,
    Toast,
    LoadMore,
    Scroll,
    Actionsheet,
    Slider,
    Progress,
    Preview,
    Navbar,
    Switchs,
    Upload,
    Radio
];

components.map(component => {
    Vue.component(component.name, component);
});

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: {App}
});