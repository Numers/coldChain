import './style.css';
import React, {PropTypes, Component} from 'react';
import FormContent from './formContent';
import Driveraction from './driveraction';
import dateimg from 'public/img/date.png';
import { DatePicker , Button} from 'antd';
import OpenUrl from 'components/Common/openUrl/openUrl';
import formatdata from 'formatdata';

export default class mypickContent extends Component {

    render() {

        const  price = formatdata({
            type:'priceadd',
            data:this.props.total_money
        });

        return (
            <div className="mypickContent_daskn3248">
                <div className="mypickContent_wrap">

                    <div className="datetogo">
                        <div className="datetogowrap">
                            <div className="typename">
                                提货日期
                            </div>
                            <div className="datebody">
                                <div className="datebodywrap">
                                    <img src={dateimg} className="dateimg" />
                                    <DatePicker size="large" style={{width:'250px'}} onChange={(date,dateString)=>this.props.timer({date,dateString})}/>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="foodmessage">
                        <div className="foodmessagewrap">

                            <div className="typename">
                                提货信息
                            </div>

                            <div className="formdata">
                                <FormContent {...this.props} />
                            </div>

                            <div className="caoculate clearfix">
                                <div className="late-button">
                                    <Button onClick={() => {this.props.clickToCaoCu()}}>预计算</Button>
                                    <div className="priceall">
                                        总金额：￥{price}
                                        {this.props.total_money!="undefined"?<span className="chakan" onClick={()=>this.props.handleChange({visible:true})}>查看明细</span>:<span></span>}
                                    </div>
                                    <OpenUrl {...this.props} handleClose = {()=>this.props.handleChange()} />
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="thedriver">
                        <div className="thedriverwrap">

                            <div className="typename">
                                提货司机信息
                            </div>

                            <div className="thedriveraction">
                                <Driveraction {...this.props} />
                            </div>
                            {/*backgroundColor:'#73a253'*/}
                            <div className="submitbtn">
                                <Button type="primary" style={{width:'250px'}} size="large" onClick={()=>this.props.submitMypick()}>申请提货</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

mypickContent.propTypes = {};
