import {
    getUserInfo
} from './api/http';

import str from './hotmodule';

getUserInfo().then(() => {}, err => {
    console.log(err);
});

if (module.hot) {
    // 当 hotmodule 模块内容变化时会触发回调
    module.hot.accept('./hotmodule.js', () => require('./hotmodule'));
}