import React from 'react';
import {connect} from 'dva';
import TheordersdetailContent from 'components/TheordersdetailContent/TheordersdetailContent';
import upload from 'upload';
import { message } from 'antd';
import formatdata from 'formatdata';
message.config({
    top: 50,
    duration: 2,
});

const Theordersdetail = ({location, dispatch, theordersdetail}) => {

    const props = {
        ...theordersdetail,
        dispatch,
        updateState(payload) {
            dispatch({
                type:'theordersdetail/updateState',
                payload:payload
            });
        },
        uploadImg(payload) {
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

                        dispatch({
                            type:'theordersdetail/updateState',
                            payload:{upLoadImgList:imgArr}
                        });

                    } else {
                        message.success('上传失败！');
                        dispatch({ type: 'spin/hideLoading' });
                    }
                }
            });
        },
        uploadSubmit(payload) {
            dispatch({
                type:'theordersdetail/uploadSubmit',
                payload:payload
            });
        },
        payforMoney(payload) {
            dispatch({
                type:'theordersdetail/payforMoney',
                payload:payload
            });
        },
        closePayForFloat(payload) {
            dispatch({
                type:'theordersdetail/closePayForFloat',
                payload:payload
            });
        },
        closeRefluah(payload) {
            dispatch({
                type:'theordersdetail/closeRefluah',
                payload:payload
            });
        },
        downloadAttachment(payload) {
            dispatch({
                type:'theordersdetail/downloadAttachment',
                payload:payload
            });
        },
        showIMG(payload) {
            console.log(payload);
            dispatch({
                type:'spin/updateState',
                payload:{
                    ...payload,
                    showimg:true
                }
            });
        }
    }

    return (
        <TheordersdetailContent {...props} />
    );

};

function mapStateToProps({ theordersdetail }) {
    return { theordersdetail };
}

export default connect(mapStateToProps)(Theordersdetail);
