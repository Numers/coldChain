import { axios } from '../services/queryData';
import formatdata from 'formatdata';
import { message } from 'antd';
import { routerRedux } from 'dva/router'
message.config({
    top: 50,
    duration: 2,
});

const initState = {
    goodsMessage:[],
    upLoadImgList:[]
}

export default {

    namespace: 'theordersdetail',

    state: initState,

    subscriptions: {
        setup({dispatch,history}) {
            history.listen(location => {

                if (location.pathname === '/coldChain/theordersdetail') {
                    dispatch({
                        type:'resetState',
                        payload:{}
                    });

                    dispatch({
                        type:'FinanceInformationFnRender',
                        payload:{
                            ...location.query
                        }
                    });
                }

            });
        },
    },

    effects: {
        // call是调用执行一个函数，而put则是相当于dispatch执行一个action
        // select则可以用来访问model数据
        *FinanceInformationFnRender({ payload }, { call, put ,select}) {
            const options = {
                method:'post',
                headers:{'Acc-Token':localStorage.getItem('token')},
                data:{
                    code:65007,
                    msg:"web",
                    status:1,
                    data:{id:payload.id},
                }
            }

            yield put({ type: 'spin/showLoading' });

            const { data } = yield call(axios,'/api/refll/financeinfo',options);

            const activeKey = formatdata({
                type:'activeKey',
                data:{...payload}
            });

            if(data && data.status == 1) {
                yield put({ type: 'spin/hideLoading' });

                if(data.data) {
                    const flag = data.data && data.data.flag;
                    const id = payload.id;
                    if(payload.flag!=flag && flag == 5) {
                        yield put(routerRedux.push({pathname:'/coldChain/theordersdetail',query:{
                            flag:5,
                            id:id,
                            order_type:payload.order_type
                        }}));
                    }else if(payload.flag!=flag && flag == 10) {
                        yield put(routerRedux.push({pathname:'/coldChain/theordersdetail',query:{
                            flag:10,
                            id:id,
                            order_type:payload.order_type
                        }}));
                    }

                    // else if(payload.flag!=flag) {
                    //     yield put(routerRedux.push({pathname:'/coldChain/theordersdetail',query:{
                    //         flag:flag,
                    //         id:id,
                    //         order_type:payload.order_type
                    //     }}));
                    // }


                    let statusForTrade = 0;
                    if(payload.order_type == 1) {
                        //内贸
                        statusForTrade = formatdata({
                            type:'StatusForDomesticTrade',
                            data:payload && payload.flag
                        });

                    } else if(payload.order_type == 2) {
                        //外贸
                        statusForTrade = formatdata({
                            type:'StatusForForeignTrade',
                            data:payload && payload.flag
                        });
                    }

                    yield put({
                        type:'updateState',
                        payload:{
                            ...data.data,
                            ...payload,
                            activeKey:activeKey,
                            statusForTrade:statusForTrade
                        }
                    });

                } else {
                    message.error('获取详情数据失败！');
                }
            } else {
                yield put({ type: 'spin/hideLoading' });
                message.error('获取详情数据失败！');
            }
        },
        *uploadSubmit({ payload }, { call, put ,select}) {

            const options = {
                method:'post',
                headers:{'Acc-Token':localStorage.getItem('token')},
                data:{
                    code:65016,
                    msg:"web",
                    status:1,
                    data:payload
                }
            }

            yield put({ type: 'spin/showLoading' });

            const { data } = yield call(axios,'/api/refll/savefile',options);

            if(data && data.status == 1) {

                yield put({ type: 'spin/hideLoading' });
                message.success('提交成功！');
                yield put(routerRedux.push('/coldChain/theorders'));

            } else {

                yield put({ type: 'spin/hideLoading' });
                message.error('获取详情数据失败！');

            }
        },
        *payforMoney({ payload }, { call, put ,select}) {
            const options = {
                method:'post',
                headers:{'Acc-Token':localStorage.getItem('token')},
                data:{
                    code:65009,
                    msg:"web",
                    status:1,
                    data:{
                        ...payload
                    }
                }
            }

            yield put({ type: 'spin/showLoading' });
            let newwindow = window.open('/jumpto','_blank');
            const { data } = yield call(axios,'/api/refll/userpayment',options);

            if(data && data.status == 1) {

                yield put({ type: 'spin/hideLoading' });

                if(data.data) {
                    let cashier_url = data.data.cashier_url;
                    let script = '<scr'+'ipt>document.getElementById("frmBankID").submit()</scr'+'ipt>';
                    newwindow.document.write(cashier_url+script);
                    yield put({
                        type:'updateState',
                        payload:{
                            showfloat:true
                        }
                    })
                }else {
                    message.error(data.msg || '付款请求失败');
                }

            } else {

                yield put({ type: 'spin/hideLoading' });
                message.error(data.msg || '支付失败！');

            }

        },
        *closePayForFloat({ payload }, { call, put ,select}) {
            yield put({
                type:'updateState',
                payload:{
                    showfloat:false
                }
            });
            // const flag = payload.flag && Number(payload.flag) && Number(payload.flag)+1;
            //
            // yield put({
            //     type:'updateState',
            //     payload:{
            //         showfloat:false
            //     }
            // });
            //
            // yield put({
            //     type:'updateState',
            //     payload:initState
            // });
            //
            // yield put(routerRedux.push({pathname: '/coldChain/theordersdetail', query: {...payload,flag:flag}}));

        },
        *downloadAttachment({ payload }, { call, put ,select}) {
            const aaa = window.open();
            const options = {
                method:'post',
                headers:{'Acc-Token':localStorage.getItem('token')},
                data:{
                    code:65022,
                    msg:"web",
                    status:1,
                    data:{
                        ...payload
                    }
                }
            }

            yield put({ type: 'spin/showLoading' });

            const { data } = yield call(axios,'/api/refll/updpdf',options);
            aaa.innerHTML = data;
            if(data && data.status == 1) {

                yield put({ type: 'spin/hideLoading' });
                message.success('下载成功！');

            } else {

                yield put({ type: 'spin/hideLoading' });
                message.error('下载失败！');

            }
        },
        *closeRefluah({ payload }, { call, put ,select}) {
            window.location.reload()
        }
    },

    reducers: {
        resetState(state,action){
            return {
                ...action.payload
            }
        },
        updateState(state,action) {
            return {
                ...state,
                ...action.payload
            }
        }
    }

};
