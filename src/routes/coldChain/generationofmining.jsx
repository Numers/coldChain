import React from 'react';
import {connect} from 'dva';
import GenerationofminingContent from 'components/GenerationofminingContent/GenerationofminingContent';
import upload from 'upload';
import { message } from 'antd';
import formatdata from 'formatdata';

message.config({
    top: 50,
    duration: 2,
});

const Generationofmining = ({location, dispatch, generationofmining}) => {

    const props = {
        ...generationofmining,
        addGoods(payload) {
            dispatch({
                type:'generationofmining/addGoods',
                payload:payload
            });
        },
        deleteGoods(payload) {
            dispatch({
                type:'generationofmining/deleteGoods',
                payload:payload
            })
        },
        uploadimg(payload) {

            const event = payload || window.event;
            const target = event.target;
            dispatch({ type: 'spin/showLoading' });

            if(!target || !target.files || target.files.length<=0) {
                dispatch({ type: 'spin/hideLoading' });
                message.error('请选择文件');
                return;
            }

            upload({
                target:target,
                url:'api/public/upload_file',
                success:(data) => {
                    if(data && data.status == 1) {
                        message.success('上传成功！');
                        dispatch({ type: 'spin/hideLoading' });
                        const imgfile = data.data || {};
                        const imgArr = formatdata({
                            type:'imgurl',
                            data:imgfile
                        });
                        console.log(imgArr);
                        dispatch({
                            type:'generationofmining/uploadImg',
                            payload:imgArr
                        });

                    }else {
                        message.success('上传失败！');
                        dispatch({ type: 'spin/hideLoading' });
                    }
                }
            });
        },
        sendEXCLE(payload) {
            const event = payload || window.event;
            const target = event.target;
            dispatch({ type: 'spin/showLoading' });

            if(!target || !target.files || target.files.length<=0) {
                dispatch({ type: 'spin/hideLoading' });
                message.error('请选择文件');
                return;
            }
            upload({
                target:target,
                url:`/api/refll/importgoods?order_type=${generationofmining.order_type}`,
                success:(data) => {
                    if(data && data.status == 1) {
                        message.success('导入成功!');
                        dispatch({ type: 'spin/hideLoading' });
                        if(data.data) {

                            dispatch({
                                type:'generationofmining/updatedata',
                                payload:{datasource:data.data}
                            });

                        }else {
                            message.error('导入失败!');
                        }
                    }else {
                        message.error('导入失败!');
                    }
                }
            });
        },
        sendAllMoney(payload) {
            dispatch({
                type:'generationofmining/sendAllMoney',
                payload:payload
            });
        },
        openToSeeFloat(payload) {
            dispatch({
                type:'generationofmining/openToSeeFloat',
                payload:payload
            });
        },
        Tocalculate(payload) {
            dispatch({
                type:'generationofmining/Tocalculate',
                payload:payload
            });
        },
        submit(payload) {
            dispatch({
                type:'generationofmining/submit',
                payload:payload
            });
        },
        updatedata(payload) {
            dispatch({
                type:'generationofmining/updatedata',
                payload:payload
            });
        },
        showIMG(payload) {
            dispatch({
                type:'spin/updateState',
                payload:{
                    ...payload,
                    showimg:true
                }
            });
        },
        updateFooddata(payload) {
            dispatch({
                type:'generationofmining/updateFooddata',
                payload:payload
            });
        },
        showAndCalculate(payload) {
            dispatch({
                type:'generationofmining/showAndCalculate',
                payload:payload
            });
        },
        setrate(payload) {
            dispatch({
                type:'generationofmining/setrate',
                payload:payload
            });
        },
        setlocaldata(payload) {
            dispatch({
                type:'generationofmining/setlocaldata',
                payload:payload
            });
        },
        getMessageCountOfDraftBox(payload) {
            dispatch({
                type:'generationofmining/getMessageCountOfDraftBox',
                payload:payload
            });
        }
    }

    return (
        <GenerationofminingContent {...props}/>
    );

};

function mapStateToProps({ generationofmining }) {
    return { generationofmining };
}

export default connect(mapStateToProps)(Generationofmining);
