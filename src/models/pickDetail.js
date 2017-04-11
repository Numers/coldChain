import { axios } from '../services/queryData';
import formatdata from 'formatdata';
import { message } from 'antd';
message.config({
    top: 50,
    duration: 2,
});

const inital = {
    goodsMessage:[],
    pickupMessage:[],
    driverMessage:[],
    imgUrl:'',
    payfordata:{
        status:'',
        bank_name:'',
        bank_number:'',
        bank_full_name:'',
        amount:'',
        fea:'',
        number:'',
        tax:'',
        amount_tariff:'',
        interest:'',
        load:''
    },
    showPayForFloat:false,
    pdfimgshow:{//pdf以及img放大的组件需要的数据
        url:'',
        visible:false
    }
};

export default {

    namespace: 'pickDetail',

    state: inital,

    subscriptions: {
        // setup({dispatch,history}) {
        //     history.listen(location => {
        //         if (location.pathname === '/coldChain/pickDetail/486') {
        //
        //         }
        //     });
        // },
    },

    effects: {
        // call是调用执行一个函数，而put则是相当于dispatch执行一个action
        // select则可以用来访问model数据
        *render({ payload }, { call, put ,select}) {

            yield put({
                type:'resetState',
                payload:inital
            });

            const options = {
                method:'post',
                headers:{'Acc-Token':localStorage.getItem('token')},
                data:{
                    code:64005,
                    msg:"web",
                    status:1,
                    data:payload,
                }
            }

            yield put({ type: 'spin/showLoading' });

            const { data } = yield call(axios,'/api/ll/get_pick_up_detail',options);
            if(data && data.status == 1) {
                yield put({ type: 'spin/hideLoading' });
                if(data.data) {
                    yield put({
                        type:'updateState',
                        payload:data.data
                    });

                    yield put({
                        type:'payforMessage',
                        payload:payload
                    });

                } else {
                    message.error('获取详情数据失败！');
                }
            } else {
                yield put({ type: 'spin/hideLoading' });
                message.error('获取详情数据失败！');
            }
        },
        *payforMessage({ payload }, { call, put ,select}) {
            yield put({ type: 'spin/showLoading' });
            const options = {
                method:'post',
                headers:{'Acc-Token':localStorage.getItem('token')},
                data:{
                    code:64007,
                    msg:"web",
                    status:1,
                    data:payload,
                }
            }

            const { data } = yield call(axios,'/api/ll/pay_detail',options);

            if(data && data.status == 1) {
                yield put({ type: 'spin/hideLoading' });
                if(data.data) {
                    yield put({
                        type:'updatePayFor',
                        payload:data.data
                    });
                } else {
                    message.error('获取支付信息失败！');
                }
            } else {
                yield put({ type: 'spin/hideLoading' });
                message.error('获取支付信息失败！');
            }
        },
        *uplaodreal({ payload }, { call, put ,select}) {

            const history = payload.history;
            yield put({ type: 'spin/showLoading' });
            const options = {
                method:'post',
                headers:{'Acc-Token':localStorage.getItem('token')},
                data:{
                    code:64006,
                    msg:"web",
                    status:1,
                    data:{
                        "id":payload.id,
                        "file_url":payload.file_url,
                    }
                }
            }

            const { data } = yield call(axios,'/api/ll/upload_memo',options);

            if(data && data.status == 1) {
                yield put({ type: 'spin/hideLoading' });
                message.success("上传成功");
                setTimeout(() => {
                    history.push('/coldChain/pickcenter');
                },1000);
            } else {
                yield put({ type: 'spin/hideLoading' });
                if(data && data.msg) {
                    message.error(data.msg);

                }else {
                    message.error("上传失败");
                }
            }
        },
        *gotopay({ payload }, { call, put ,select}) {
            yield put({ type: 'spin/showLoading' });
            const options = {
                method:'post',
                headers:{'Acc-Token':localStorage.getItem('token')},
                data:{
                    code:40003,
                    msg:"web",
                    status:1,
                    data:payload
                }
            }

            let newwindow = window.open('/jumpto','_blank');

            const {data} = yield call(axios,'/pay/web/ll/request',options);
            let msg;

            if(data && data.msg) {
                msg = data.msg;
            }

            if(data && data.status==1) {
                yield put({ type: 'spin/hideLoading' });
                if(data.data) {
                    let cashier_url = data.data.cashier_url;
                    let script = '<scr'+'ipt>document.getElementById("frmBankID").submit()</scr'+'ipt>';
                    newwindow.document.write(cashier_url+script);
                    yield put({
                        type:'showPayForFloat'
                    })
                }else {
                    message.error(msg || '付款请求失败');
                }
            } else {
                yield put({ type: 'spin/hideLoading' });
                message.error(msg || '付款请求失败');
            }
        },
        *showDetail({payload},{call,put}) {
            yield put({ type: 'spin/showLoading' });
            const options = {
                data:{
                    code:'64013',
                    msg:"web",
                    status:1,
                    data:{
                        order_id:payload
                    }
                },
                headers:{'Acc-Token':localStorage.getItem('token')},
                method:'post',
            }

            const {data} = yield call(axios,'/api/ll/get_amount_detail_url',options);

            if(data && data.status==1) {
                yield put({ type: 'spin/hideLoading' });
                if(data.data) {
                    const pdfimgshow = {//pdf以及img放大的组件需要的数据
                        url:data.data.url,
                        visible:true
                    }

                    if(data && data.data && data.data.url) {
                        window.location.href = data.data.url;
                    }

                    // yield put({
                    //     type:'handleChangeShow',
                    //     payload:pdfimgshow
                    // });

                }
            }else {
                yield put({ type: 'spin/hideLoading' });
                message.error('查看失败');
            }
        }
    },

    reducers: {
        updateState(state,action) {

            const time = formatdata({
                type:'YYMMDD',
                data:action.payload.time
            });

            const goodsMessage = action.payload.goods;
            const pickupMessage = [{
                delivery_unit:action.payload.delivery_unit,
                warehouse_name:action.payload.warehouse_name,
                time:time
            }];

            const driverMessage = action.payload.chauffeur_list;

            return {
                ...state,
                goodsMessage:goodsMessage,
                pickupMessage:pickupMessage,
                driverMessage:driverMessage
            }

        },
        resetState(state,action) {
            return {
                ...action.payload
            };
        },
        updatePayFor(state,action) {
            return {
                ...state,payfordata:action.payload
            }
        },
        uploadImgFile(state,action) {
            return{
                ...state,imgUrl:action.payload
            }
        },
        showPayForFloat(state,action) {
            return{
                ...state,showPayForFloat:true
            }
        },
        closePayForFloat(state,action) {
            window.location.reload();
            return{
                ...state,showPayForFloat:false
            }
        },
        handleChangeShow(state,action) {
            const newPdfimgshow = action.payload;
            console.log(newPdfimgshow);
            return {
                ...state,
                pdfimgshow:newPdfimgshow
            }
        }
    }

};
