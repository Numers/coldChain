import React from 'react';
import {connect} from 'dva';
import PickDetailContent from 'components/pickDetail/pickDetailContent';
import uploadfile from 'upload';

import { message } from 'antd';
message.config({
    top: 50,
    duration: 2,
});

const PickDetail = ({location, dispatch, pickDetail ,params , history}) => {
    const props = {
        ...pickDetail,
        ...params,
        render() {
            dispatch({
                type:'pickDetail/render',
                payload:{...params}
            })
        },
        showDetail(payload) {
            console.log(payload);
            dispatch({
                type:'pickDetail/showDetail',
                payload:payload
            });
        },
        uplaodreal(payload) {
            dispatch({
                type:'pickDetail/uplaodreal',
                payload:{
                    "id":params.id,
                    "file_url":payload,
                    "history":history
                }
            });
        },
        gotopay(payload) {
            dispatch({
                type:'pickDetail/gotopay',
                payload:{
                    id:params.id,
                    money:payload.amount,
                    number:payload.number
                }
            });
        },
        closePayForFloat() {
            dispatch({
                type:'pickDetail/closePayForFloat'
            });
        },
        uploadImgFile(payload) {
            const event = payload || window.event || '';
            const target = event && event.target;

            uploadfile({
                url:'/api/public/upload_file',
                target:target,
                success:(res) => {
                    if(res && res.data) {
                        if(res.data.file) {

                            dispatch({
                                type:'pickDetail/uploadImgFile',
                                payload:res.data.file
                            });

                        } else {
                            message.error('本地上传失败');
                        }
                    }else {
                        message.error('本地上传失败');
                    }
                }
            });


        },
        handleChangeShow(payload) {
            console.log(payload);
            dispatch({
                type:'pickDetail/handleChangeShow',
                payload:payload
            })
        }
    }

    return (
        <PickDetailContent {...props}/>
    );

};

function mapStateToProps({ pickDetail }) {
    return { pickDetail };
}

export default connect(mapStateToProps)(PickDetail);
