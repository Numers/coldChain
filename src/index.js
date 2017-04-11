import React from 'react';
import dva from 'dva';
import router from './router';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
import 'public/css/_reset.css';

//import { browserHistory } from 'dva/router';
//const app = dva({ history: browserHistory });

const app = dva();

app.model(require('models/loginregforget'));
app.model(require('models/reg'));
app.model(require('models/Spin'));
app.model(require('models/mypick'));
app.model(require('models/pickcenter'));
app.model(require('models/ontheway'));
app.model(require('models/pickDetail'));
app.model(require('models/businessTypes'));
app.model(require('models/generationofmining'));
app.model(require('models/theorders'));
app.model(require('models/theordersdetail'));
app.model(require('models/tradeAgent'));
app.model(require('models/tradeAgentdetail'));
app.model(require('models/TodoList'));
app.model(require('models/DraftBox'));
app.router(router);
app.start('body');
