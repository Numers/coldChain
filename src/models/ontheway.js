import { axios } from '../services/queryData';
import formatdata from 'formatdata';
import { message } from 'antd';

message.config({
    top: 50,
    duration: 2,
});

const initState = {
    dataSource:[],

    total:'',
    current:'1',//current和last_id保持一致 current展示用 last_id请求用

    pi:'',
    per:20,
    page:1//current和last_id保持一致 current展示用 last_id请求用

};

export default {

    namespace: 'ontheway',

    state: initState,

    subscriptions: {
        setup({dispatch, history}) {
            history.listen(location => {
                if (location.pathname === '/coldChain/ontheway') {

                    dispatch({
                        type:'resetState',
                        payload:{}
                    });

                    dispatch({
                        type:'getTableDataSource',
                        payload:{
                            "per":10,
                            "page":1,
                            "pi":''
                        }
                    });

                }
            });
        },
    },

    effects: {
        // call是调用执行一个函数，而put则是相当于dispatch执行一个action
        // select则可以用来访问model数据
        *setTableParams({ payload }, { call, put ,select}) {
            yield put({
                type:'getTableDataSource',
                payload:payload
            })
        },
        *getTableDataSource({ payload }, { call, put ,select}) {
            yield put({
                type:'savepayload',
                payload:payload
            });
            yield put({ type: 'spin/showLoading' });
            const options = {
                data:{
                    code:64014,
                    msg:"web",
                    status:1,
                    data:payload,
                },
                headers:{'Acc-Token':localStorage.getItem('token')},
                method:'post'
            }
            const { data } = yield call(axios,'/api/ll/get_on_way_goods_info',options);

            if(data && data.status) {
                yield put({ type: 'spin/hideLoading' });
                if(data.data) {
                    yield put({
                        type:'updateTableData',
                        payload:data.data
                    });
                } else {
                    message.error('获取列表数据失败');
                }

            }else {
                yield put({ type: 'spin/hideLoading' });
                message.error('获取列表数据失败');
            }
        },
        *tableOnChange({ payload }, { call, put ,select}) {
            const ontheway = yield select(({ ontheway }) =>  {
                return {...ontheway}
            });

            const pi = ontheway.pi;
            const per = ontheway.per;
            const page = payload.current;

            yield put({
                type:'getTableDataSource',
                payload:{
                    pi,
                    per,
                    page
                }
            });
        }
    },

    reducers: {
        resetState(state,action){
            return {
                ...action.payload
            }
        },
        updatedata(state,action) {
            return {
                ...state,
                ...action.payload
            }
        },
        updateTableData(state,action) {
            const dataSource = action.payload.content;
            const current = action.payload.current;
            const total = action.payload.total;
            return {...state,dataSource:dataSource,current:current,total:total}
        },
        savepayload(state,action) {
            return {...state,...action.payload}
        }
    }

};
