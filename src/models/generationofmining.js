import { axios } from '../services/queryData';
import { routerRedux } from 'dva/router';
import formatdata from 'formatdata';
import { message } from 'antd';

message.config({
    top: 50,
    duration: 2,
});

const initState = {
    visible:false,
    datasource:[{stateID:0,key:'0'}],
    upload:[],
    lastID:0,
    formdatain:{},
    shouldRender:true,
    render:false,
    messageCountOfDraftBox:0,
};

export default {

    namespace: 'generationofmining',

    state: initState ,

    subscriptions: {
        setup({dispatch, history}) {
            history.listen(location => {
                if (location.pathname === '/coldChain/generationofmining') {

                    dispatch({
                        type:'resetState',
                        payload:initState
                    });

                    dispatch({
                        type:'getSelectData',
                        payload:location.query || {}
                    });
                }
            });
        },
    },

    effects: {
        *getMessageCountOfDraftBox({payload},{call,put,select}) {
            yield put({ type: 'spin/showLoading' });
            const options = {
                data:{
                    code:65028,
                    msg:"web",
                    status:1,
                    data:{
                        type:2,
                    },
                },
                headers:{'Acc-Token':localStorage.getItem('token')},
                method:'post'
            }

            const {data} = yield call(axios,'/api/refll/getCount',options);
            if(data && data.status) {
                yield put({ type: 'spin/hideLoading' });
                if(data.data) {
                    const messageCountOfDraftBox = data.data.count;
                    yield put({
                        type:'updatedata',
                        payload:{
                            messageCountOfDraftBox
                        }
                    });
                } else {
                    message.error('获取列表数据失败');
                }

            } else {
                yield put({type: 'spin/hideLoading'});
                message.error('获取列表数据失败');
            }
        },

        *getSelectData({payload},{put,call}) {

            yield put({ type: 'spin/showLoading' });

            const options = {
                data:{
                    code:65004,
                    msg:"web",
                    status:1,
                },
                headers:{'Acc-Token':localStorage.getItem('token')},
                method:'post'
            }

            const { data } = yield call(axios,'/api/refll/apply',options);

            if(data && data.status) {
                yield put({ type: 'spin/hideLoading' });
                if(data.data) {
                    yield put({
                        type:'updatedata',
                        payload:{...data.data,...payload,render:true}
                    });
                } else {
                    message.error('获取列表数据失败');
                }

            } else {
                yield put({type: 'spin/hideLoading'});
                message.error('获取列表数据失败');
            }
        },
        *getDataFoods({payload},{put,call,select}) {
            yield put({ type: 'spin/showLoading' });

            const options = {
                data:{
                    code:65014,
                    msg:"web",
                    status:1,
                    data:{
                        refinance_apply_id:payload.id,
                        goods_name_cn:'',
                        page:'1',
                        per:'100'
                    }
                },
                headers:{'Acc-Token':localStorage.getItem('token')},
                method:'post'
            }

            const { data } = yield call(axios,'/api/refll/financegoodslist',options);

            if(data && data.status) {

                const dataLs = formatdata({
                    type:'datasource',
                    data:data.data && data.data.data || []
                });

                const updateFoodData = formatdata({
                    type:'formatfooddata',
                    data:dataLs || []
                });

                console.log(updateFoodData,'sss');

                yield put({ type: 'spin/hideLoading' });

                console.log(dataLs,'dataLs');

                if(data.data) {

                    yield put({
                        type:'updatedata',
                        payload:{
                            ...payload,
                            datasource:dataLs
                        }
                    });

                    yield put({
                        type:'updateFooddata',
                        payload:updateFoodData
                    });

                } else {
                    message.error('获取商品数据失败');
                    yield put({
                        type:'updatedata',
                        payload:{
                            ...payload
                        }
                    });
                }

            } else {
                yield put({type: 'spin/hideLoading'});
                message.error('获取商品数据失败');
                yield put({
                    type:'updatedata',
                    payload:{
                        ...payload
                    }
                });
            }
        },
        *setlocaldata({payload},{put,call,select}) {

            if(payload.from == 'draftbox') {
                yield put({
                    type:'getDataFoods',
                    payload:{
                        id:payload.id,
                        ...payload
                    }
                });
            }else {
                yield put({
                    type:'updatedata',
                    payload:{
                        ...payload
                    }
                });
            }
        },
        *sendAllMoney({payload},{put,call,select}) {
            const {datasource} = yield select(({generationofmining})=>{return generationofmining});
            let newdatasource = Object.assign([],datasource);
            let returnData = [];
            newdatasource.map((data) => {
                const newdata = Object.assign({},data);
                if(newdata.stateID == payload.stateID) {
                    newdata['good_total_price'] = payload.good_total_price;
                }

                returnData.push(newdata);
            });

            console.log(returnData,'returnData');

            yield put({
                type:'updatedata',
                payload:{
                    datasource:returnData
                }
            });

        },
        *Tocalculate({payload},{put,call,select}) {

            const visible = payload && payload.visible;
            const formdatain = payload && payload.formdatain;
            const submit = payload && payload.submit;

            if(!payload.money_code) {
                message.error('请填写货币代码！');
                return;
            }

            if(!payload.offer_type_id) {
                message.error('请填写报价模式！');
                return;
            }

            if(!payload.purchase_payment_term_id) {
                message.error('请填写PI付款条约！');
                return;
            }

            yield put({ type: 'spin/showLoading' });

            const options = {
                data:{
                    code:65019,
                    msg:"web",
                    status:1,
                    data:{
                        money_code:payload.money_code,
                        order_type:payload.order_type,
                        offer_type_id:payload.offer_type_id,
                        goods_data:payload.datasource,
                        purchase_payment_term_id:payload.purchase_payment_term_id,
                        refinance_apply_id:payload.refinance_apply_id
                    }
                },
                headers:{'Acc-Token':localStorage.getItem('token')},
                method:'post'
            }

            const { data } = yield call(axios,'/api/refll/moneycalculation',options);

            if(data && data.status == 1) {
                yield put({ type: 'spin/hideLoading' });
                yield put({
                    type:'updatedata',
                    payload:data.data
                });

                if(submit) {
                    yield put({
                        type:'openToSeeFloat',
                        payload:{
                            visible,
                            formdatain
                        }
                    })
                }
            } else {
                yield put({ type: 'spin/hideLoading' });
                message.error('计算失败');
            }

        },
        *submit({payload},{put,call,select}) {

            if(!payload.submitData.file_info || !payload.submitData.file_info.length && !payload.draft) {
                message.error('请上传图片');
                return;
            }

            yield put({ type: 'spin/showLoading' });

            const options = {
                data:{
                    code:65005,
                    msg:"web",
                    status:1,
                    data:{
                        ...payload.submitData
                    }
                },
                headers:{'Acc-Token':localStorage.getItem('token')},
                method:'post'
            }

            const { data } = yield call(axios,'/api/refll/savefinance',options);

            if(data && data.status == 1) {
                localStorage.removeItem('newfinancing');
                yield put({ type: 'spin/hideLoading' });

                if(payload.draft) {
                    yield put(routerRedux.push('coldChain/draftBox'));
                }else {
                    yield put(routerRedux.push('coldChain/theorders'));
                }


            } else {
                yield put({ type: 'spin/hideLoading' });
                message.error('提交失败！');
            }
        },
        *showAndCalculate({payload},{put,call,select}) {

            yield put({
                type:'Tocalculate',
                payload:payload
            });
        },
        *setrate({ payload }, { call, put ,select}) {
            const options = {
                method:'post',
                headers:{'Acc-Token':localStorage.getItem('token')},
                data:{
                    code:68001,
                    msg:"web",
                    status:1,
                    data:{
                        code:payload.search_code
                    }
                }
            }

            yield put({ type: 'spin/showLoading' });

            const { data } = yield call(axios,'/api/common/exchange_rate',options);
            if(data && data.status == 1) {
                yield put({ type: 'spin/hideLoading' });
                if(data.data) {
                    yield put({
                        type:'updatedata',
                        payload:{
                            selectRate:data.data && data.data.rate || '',
                            ...payload
                        }
                    });
                } else {
                    message.error('获取汇率失败！');
                }
            } else {
                yield put({ type: 'spin/hideLoading' });
                message.error('获取汇率失败！');
            }
        }
        // call是调用执行一个函数，而put则是相当于dispatch执行一个action
        // select则可以用来访问其它model
    },

    reducers: {
        updateFooddata(state,action) {
            let foodData = state.foodData || {};
            foodData = {...foodData,...action.payload}
            return {
                ...state ,
                foodData:foodData
            }
        },
        resetState(state,action) {
            return {
                ...action.payload
            }
        },
        updatedata(state,action) {
            return {
                ...state ,
                ...action.payload
            }
        },
        addGoods(state,action) {
            const lastID = state.datasource && state.datasource.length && state.datasource.length-1 || 0;
            const datasource = Object.assign([],state.datasource);
            datasource.push({stateID:lastID+1,key:lastID+1});
            console.log(datasource);
            return {
                ...state,
                datasource:datasource,
                lastID:lastID+1
            }
        },
        deleteGoods(state,action) {
            const stateID = action.payload.stateID;
            let datasource = Object.assign([],state.datasource);
            if(datasource && datasource.length) {
                const jystateID = datasource[datasource.length-1] && datasource[datasource.length-1].stateID;
                if(jystateID!=stateID) {
                    message.error('请先删除最后一个');
                    return {
                        ...state
                    }
                }
            }

            datasource = datasource.filter((data) => {
                if(data.stateID == stateID) {
                    return false
                }
                return true
            });
            return {
                ...state,
                datasource:datasource
            }
        },
        uploadImg(state,action) {
            return {
                ...state,
                upload:action.payload
            }
        },
        openToSeeFloat(state,action) {
            return {
                ...state,
                ...action.payload,
            }
        },
        escFn(state,action) {
            return {
                ...state
            }
        }
    }

};
