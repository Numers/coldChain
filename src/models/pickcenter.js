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
    current:'',//current和last_id保持一致 current展示用 last_id请求用

    pi:'',
    sku_name:'',
    pagesize:10,
    last_id:1//current和last_id保持一致 current展示用 last_id请求用
};

export default {

    namespace: 'pickcenter',

    state: initState,

    subscriptions: {
        setup({dispatch, history}) {
            history.listen(location => {
                if (location.pathname === '/coldChain/pickcenter') {
                    dispatch({
                        type:'resetState',
                        payload:{}
                    });

                    dispatch({
                        type:'getTableDataSource',
                        payload:{
                            "pagesize":10,
                            "last_id":1,
                            "sku_name":'',
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
                    code:64004,
                    msg:"web",
                    status:1,
                    data:payload,
                },
                headers:{'Acc-Token':localStorage.getItem('token')},
                method:'post'
            }
            const { data } = yield call(axios,'/api/ll/get_pick_up_list',options);

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
            const pickcenter = yield select(({ pickcenter }) =>  {
                return {...pickcenter}
            });

            const sku_name = pickcenter.sku_name;
            const pi = pickcenter.buy_order_number;
            const pagesize = pickcenter.pagesize;
            const last_id = payload.current;

            yield put({
                type:'getTableDataSource',
                payload:{
                    sku_name,
                    pi,
                    pagesize,
                    last_id
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
            const dataSource = formatdata({
                type:'updateTableData',
                data:action.payload.data
            });
            const current = action.payload.current;
            const total = action.payload.total;
            return {...state,dataSource:dataSource,current:current,total:total}
        },
        savepayload(state,action) {
            return {...state,...action.payload}
        }

    }

};
