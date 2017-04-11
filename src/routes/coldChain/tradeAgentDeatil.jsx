import React from 'react';
import {connect} from 'dva';
import TradeAgentDeatilContent from 'components/TradeAgentDeatilContent/TradeAgentDeatilContent';
import upload from 'upload';
import { message } from 'antd';
import formatdata from 'formatdata';
message.config({
    top: 50,
    duration: 2,
});

const TradeAgentDeatil = ({location, dispatch, tradeAgentdetail}) => {

    console.log(tradeAgentdetail,'tradeAgentdetail');

    const props = {
        ...tradeAgentdetail,
        updateState(payload) {
            dispatch({
                type:'tradeAgentdetail/updateState',
                payload:payload
            });
        },
        upload(payload) {
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
                            type:'tradeAgentdetail/updateState',
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
                type:'tradeAgentdetail/uploadSubmit',
                payload:payload
            });
        },
        uploadSubmitGH(payload) {
            dispatch({
                type:'tradeAgentdetail/uploadSubmitGH',
                payload:payload
            });
        },
        updateCI(payload) {
            dispatch({
                type:'tradeAgentdetail/updateCI',
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
        }
    }

    return (
        <TradeAgentDeatilContent {...props} />
    );

};

function mapStateToProps({ tradeAgentdetail }) {
    return { tradeAgentdetail };
}

export default connect(mapStateToProps)(TradeAgentDeatil);
