import { axios } from '../services/queryData';
import formatdata from 'formatdata';
import { message } from 'antd';
import React, {PropTypes, Component} from 'react';

message.config({
    top: 50,
    duration: 2,
});

const initState = {
    driveActiveId:1,
    lastId:1,
    foodListData:[],
    warehouseList:[],
    //传给接口的数据
    time:"",
    data:[],
    chauffeur_list:[{stateId:1}],
    //传给openURL的数据
    visible:'',
    dataSource:[],
    total_money:'',
    Column:[{
        title:'品名',
        dataIndex:'sku_msg',
        key:'0'
    },{
        title:'货值',
        dataIndex:'all_fee',
        key:'1',
        render:(data) => {

            const price = formatdata({
                type:'priceadd',
                data:data
            });

            return (
                <span>{price}</span>
            );

        }
    },{
        title:'融资总额',
        dataIndex:'cny_financing_amount1',
        key:'2',
        render:(data) => {

            const price = formatdata({
                type:'priceadd',
                data:data
            });

            return (
                <span>{price}</span>
            );

        }
    },{
        title:'关税',
        dataIndex:'cny_financing_amount2',
        key:'3',
        render:(data) => {

            const price = formatdata({
                type:'priceadd',
                data:data
            });

            return (
                <span>{price}</span>
            );

        }
    },{
        title:'利息（含税）',
        dataIndex:'need_return_interest',
        key:'4',
        render:(data) => {

            const price = formatdata({
                type:'priceadd',
                data:data
            });

            return (
                <span>{price}</span>
            );

        }
    },{
        title:'销项税',
        dataIndex:'tax',
        key:'5',
        render:(data) => {

            const price = formatdata({
                type:'priceadd',
                data:data
            });

            return (
                <span>{price}</span>
            );

        }
    },{
        title:'付款总额',
        dataIndex:'amount',
        key:'6',
        render:(data) => {

            const price = formatdata({
                type:'priceadd',
                data:data
            });

            return (
                <span>{price}</span>
            );

        }
    },{
        title:'开票总额',
        dataIndex:'bill',
        key:'7',
        render:(data) => {

            const price = formatdata({
                type:'priceadd',
                data:data
            });

            return (
                <span>{price}</span>
            );

        }
    }]
};

export default {

    namespace: 'mypick',

    state: initState,
    subscriptions: {
        setup({dispatch, history}) {
            history.listen(location => {
                if (location.pathname == '/coldChain/mypick') {
                    dispatch({
                        type:'resetState',
                        payload:initState
                    });

                    dispatch({
                        type:'resetMypick'
                    });

                }
            });
        },
    },

    effects: {
        // call是调用执行一个函数，而put则是相当于dispatch执行一个action
        // select则可以用来访问model数据

        *resetMypick({ payload }, { call, put ,select}) {
            const options = {
                data:{
                    code:30001,
                    msg:"web",
                    status:1
                },
                headers:{'Acc-Token':localStorage.getItem('token')},
                method:'post'
            };

            const optionsWarehouse = {
                data:{
                    code:30001,
                    msg:"web",
                    status:1
                },
                headers:{'Acc-Token':localStorage.getItem('token')},
                method:'post'
            };

            yield put({ type: 'spin/showLoading' });
            {
                const {data} = yield call(axios,'/api/ll/get_inventory_info',options);
                if(data && data.status) {
                    yield put({
                        type:'changeFoodListData',
                        payload:data.data
                    });
                    yield put({ type: 'hide/showLoading' });
                } else {
                    message.error('获取货物信息失败！');
                    yield put({ type: 'spin/hideLoading' });
                }
            }

            {
                const {data} = yield call(axios,'/api/ll/get_warehouse_list',optionsWarehouse);
                if(data && data.status==1) {
                    yield put({ type: 'spin/hideLoading' });
                    yield put({
                        type:'changeWarehouseList',
                        payload:data.data
                    });
                } else {
                    yield put({ type: 'spin/hideLoading' });
                    message.error('获取仓库信息失败！');
                }
            }

        },
        *submitMypick({ payload }, { call, put ,select}) {
            const history = payload.history;
            const {time,data,chauffeur_list} = yield select(({ mypick }) => {
                mypick.data = mypick.data.filter((data) => {
                    if(data.number) {
                        return true;
                    }
                });
                return mypick;
            });
            yield put({ type: 'spin/showLoading' });
            const options = {
                data:{
                    code:30002,
                    msg:"web",
                    status:1,
                    data:{
                        time:time,
                        data:data,
                        chauffeur_list:chauffeur_list
                    }
                },
                headers:{'Acc-Token':localStorage.getItem('token')},
                method:'post'
            };

            if(time && data.length) {
                const {data} = yield call(axios,'/api/ll/submit_expect_delivery',options);

                if(data && data.status == 1) {
                    yield put({ type: 'spin/hideLoading' });
                    message.success('申请提货成功！');
                    setTimeout(() => {
                        history.push('/coldChain/pickcenter');
                    },1000);

                } else {
                    message.error('申请提货失败！');
                }
            } else {
                yield put({ type: 'spin/hideLoading' });
                if(!time) {
                    message.error('请选择日期！');
                } else if(!data || !data.length) {
                    message.error('请选择货物！');
                }
            }
        },
        *clickToCaoCu({ payload }, { call, put ,select}) {
            yield put({ type: 'spin/showLoading' });
            const {time,data} = yield select(({ mypick }) => {
                mypick.data = mypick.data.filter((data) => {
                    if(data.number) {
                        return true;
                    }
                });
                return mypick;
            });

            const options = {
                data:{
                    code:64015,
                    msg:"web",
                    status:1,
                    data:{
                        deliverydate:time,
                        data_info:data,
                    }
                },
                headers:{'Acc-Token':localStorage.getItem('token')},
                method:'post'
            };

            if(time && data.length) {

                const {data} = yield call(axios,'/api/ll/pre_calculate',options);

                if(data && data.status == 1) {
                    yield put({ type: 'spin/hideLoading' });

                    yield put({
                        type:'setYData',
                        payload:data.data
                    });

                } else {
                    yield put({ type: 'spin/hideLoading' });
                    message.error('计算失败！');
                }

            } else {
                yield put({ type: 'spin/hideLoading' });
                if(!time) {
                    message.error('请选择日期！');
                }else if(!data || !data.length) {
                    message.error('请选择货物！');
                }
            }

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
        addDrive(state,action) {
            const lastId = action.payload;
            if(state.chauffeur_list.length) {
                const chauffeur_listSingle = state.chauffeur_list[state.chauffeur_list.length-1];
                let empty = true;
                for(var i in chauffeur_listSingle) {
                    console.log(chauffeur_listSingle[i],i)
                    if(chauffeur_listSingle[i] && i!='stateId') {
                        empty = false
                    }
                }

                if(empty) {
                    message.error('请先填写前一个信息！');
                    return {...state}
                }

            }

            const newList = state.chauffeur_list.concat([]);
            newList.push({stateId:(lastId+1)});
            return {...state,chauffeur_list:newList,lastId:lastId+1}
        },
        removeDrive(state,action) {
            const stateId = action.payload;
            const newList = state.chauffeur_list.filter(data => data.stateId !== stateId);
            return {...state,chauffeur_list:newList};
        },
        changeFoodListData(state,action) {
            return {
                ...state,
                foodListData:action.payload,
                data:action.payload
            }
        },
        changeWarehouseList(state,action) {
            return {
                ...state,
                warehouseList:action.payload
            }
        },
        driverSubmit(state,action) {
            //console.log(action.payload);
            const stateId = action.payload.stateId;
            const dataValue = action.payload.values;
            const newList = state.chauffeur_list.filter((data) => {
                if(data.stateId == stateId) {
                    for(var i in dataValue) {
                        data[i] = dataValue[i]
                    }
                }

                return true;
            });
            return {
                ...state,
                chauffeur_list:newList
            }
        },
        timer(state,action) {
            const date = action.payload.dateString;

            if(date) {
                const time = new Date(date).getTime();
                return {...state,time:time}
            } else {
                return {...state,time:''}
            }


        },
        getQuantity(state,action) {
            console.log(action.payload);
            const record = action.payload.record;
            const number = action.payload.number;
            const index = action.payload.index;

            const newList = state.foodListData.filter((data,i)=> {
                if(i==index) {
                    data.number = number;
                }
                return true;
            });
            return {...state,foodListData:newList,data:newList}
        },
        setYData(state,action) {
            const dataSource = action.payload.data_info;
            const total_money = action.payload.total_money;

            return {...state,dataSource:dataSource,total_money:total_money};
        },
        handleChange(state,action) {
            console.log(state);
            const visible = action.payload && action.payload.visible || false;

            return {...state,visible:visible}

        }
    }

};
