import { axios } from '../services/queryData';
import formatdata from 'formatdata';
import { message } from 'antd';

message.config({
    top: 50,
    duration: 2,
});

export default {

    namespace: 'reg',

    state: {
        success:false,
        passwordDirty:false,
        userTypeData:[{name:'公司',id:"2"},{name:'个人',id:"1"}],
        projectTypeData:[],
        uptoUsertype:{isShow:false},
        uptoProjectType:{isShow:false,data:[]},
        checklist:['type','name','project_id','mobile','verify_code','password','confirm'],
        regData:{
        }
    },

    subscriptions: {
        setup({dispatch, history}) {
            history.listen(location => {
                if (location.pathname === '/loginRegForget/reg') {

                    dispatch({
                        type:'resetReg'
                    });

                }
            });
        },
    },

    effects: {
        // call是调用执行一个函数，而put则是相当于dispatch执行一个action
        // select则可以用来访问model数据
        *resetReg({ payload }, { call, put ,select}) {
            yield put({ type: 'spin/showLoading' });
            const options = {
                data:{
                    code:10011,
                    msg:"web",
                    status:1,
                    data:{"business_id":0}
                },
                method:'post'
            };
            yield put({type: 'resetSuccess'});
            const {data} = yield call(axios,'/api/member/get_project_list',options);
            if(data && data.status == 1) {
                yield put({ type: 'spin/hideLoading' });
                if(data.data) {
                    yield put({
                        type:'setProjectTypeState',
                        payload:formatdata({type:'projectData',data:data.data})
                    });
                } else {
                    message.error('获取项目类型接口请求失败！');
                }
            }else {
                yield put({ type: 'spin/hideLoading' });
                message.error('获取项目类型接口请求失败！');
            }
        },
        *userTypeChange({ payload }, { call, put ,select}) {

            yield put({
                type:'changeUptoUsertype',
                payload:{name:'c_name',id:payload}
            });

        },
        *projectTypeChange({ payload }, { call, put ,select}) {
            yield put({ type: 'spin/showLoading' });
            const options = {
                data:{
                    code:10011,
                    msg:"web",
                    status:1,
                    data:{"business_id":payload}
                },
                method:'post'
            };

            const {data} = yield call(axios,'/api/member/get_project_list',options);

            if(data && data.status == 1) {
                yield put({ type: 'spin/hideLoading' });
                if(data.data) {
                    yield put({
                        type:'changeUptoProjectType',
                        payload:{name:'business_id',data:formatdata({type:'businessData',data:data.data})}
                    });
                } else {
                    message.error('获取业务类型接口请求失败');
                }
            } else {
                yield put({ type: 'spin/hideLoading' });
                message.error('获取业务类型接口请求失败');
            }

        },
        *captcha({ payload }, { call, put ,select}) {
            yield put({ type: 'spin/showLoading' });
            const options = {
                data:{
                    code:10010,
                    msg:"web",
                    status:1,
                    data:payload
                },
                method:'post'
            };

            const {data} = yield call(axios,'/api/member/get_verify_code',options);

            if(data && data.status == 1) {
                yield put({ type: 'spin/hideLoading' });
                message.success('验证码发送成功');
            } else {
                yield put({ type: 'spin/hideLoading' });
                message.error('验证码发送失败');
            }
        },
        *submit({ payload }, { call, put ,select}) {
            yield put({ type: 'spin/showLoading' });
            const options = {
                data:{
                    code:10005,
                    msg:"web",
                    status:1,
                    data:payload.payload
                },
                method:'post'
            };

            const {data} = yield call(axios,'/api/member/register',options);
            if(data && data.status == 1) {
                yield put({ type: 'spin/hideLoading' });
                message.success('注册成功，2秒后跳转登陆页！');
                setTimeout(() => {
                    payload.history.push('/loginRegForget/login');
                },2000);
            }else {
                yield put({ type: 'spin/hideLoading' });
                message.error('注册失败！');
            }
        }
    },

    reducers: {
        resetState(state,action){
            return {
                ...action.payload
            }
        },
        regsuccess(state,action) {
            return {...state,success:true}
        },
        updateState(state,action) {
            return {...state,loginData:action.payload,isLogin:true}
        },
        resetSuccess(state,action) {
            return {...state,success:false}
        },
        setProjectTypeState(state,action) {
            return {...state,projectTypeData:action.payload}
        },
        changeUptoUsertype(state,action) {
            if(action.payload.id == 2) {

                let newCheckList;
                newCheckList = state.checklist.push(action.payload.name);
                state.checklist.map((data)=>{
                    if(data == action.payload.name) {
                        newCheckList = state.checklist;
                    }
                });

                return {...state,uptoUsertype:{isShow:true},checklist:newCheckList}
            } else {
                 let newCheckList = [];
                 state.checklist.map((data)=>{
                    if(data !=action.payload.name) {
                        newCheckList.push(data);
                    }
                 });
                console.log(newCheckList);
                return {...state,uptoUsertype:{isShow:false},checklist:newCheckList}
            }

        },
        changeUptoProjectType(state,action) {
            const name = action.payload.name;
            const data = action.payload.data;
            if(data && data.length) {

                let newCheckList;
                newCheckList = state.checklist.push(action.payload.name);
                state.checklist.map((data)=>{
                    if(data == action.payload.name) {
                        newCheckList = state.checklist;
                    }
                });

                return {...state,uptoProjectType:{isShow:true,data:data},checklist:newCheckList}

            } else {

                let newCheckList = [];

                state.checklist.map((data) => {
                    if(data !=action.payload.name) {
                        newCheckList.push(data);
                    }
                });

                return {...state,uptoProjectType:{isShow:false,data:[]},checklist:newCheckList}
            }
        }
    }

};
