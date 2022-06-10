/* eslint-disable camelcase */
import 'core-js/stable';
import 'regenerator-runtime/runtime';

import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';

import App from './App';
import store from './state/store';
import config from '../config/client';

// 注册 Service Worker
if (window.location.protocol === 'https:' && 'serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register(`/service-worker.js`);
    });
}

// 如果配置了前端监控, 动态加载并启动监控
if (config.frontendMonitorAppId) {
    // @ts-ignore
    import(/* webpackChunkName: "frontend-monitor" */ 'wpk-reporter').then((module) => {
        const WpkReporter = module.default;

        const __wpk = new WpkReporter({
            bid: config.frontendMonitorAppId,
            spa: true,
            rel: config.frontendMonitorAppId,
            uid: () => localStorage.getItem('username') || '',
            plugins: [],
        });

        __wpk.installAll();
    });
}

ReactDom.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app'),
);
