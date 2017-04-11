import './style.css';
import React, {PropTypes, Component} from 'react';

import MianbaoNavTop from './mianbaoNavTop';
import Steps from './steps';
import UploadWaterbills from './uploadWaterbills';
import CargoInformation from './CargoInformation';
import PickupGoodsInformation from './PickupGoodsInformation';
import DriverInformation from './driverInformation';
import PayContent from './PayContent';
import OpenUrl from 'components/Common/openUrl/openUrl';
export default class pickDetailContent extends Component {
    componentDidMount() {
        this.props.render();
    }

    render() {
        return (
            <div className="pickdetailContent_hdjak239">
                <div className="pickdetailContentWrap">
                    <MianbaoNavTop {...this.props} />
                    <Steps {...this.props} />
                    <UploadWaterbills {...this.props} />
                    <CargoInformation {...this.props} />
                    <PickupGoodsInformation {...this.props} />
                    <DriverInformation {...this.props} />
                    <PayContent {...this.props} />
                    <OpenUrl url={this.props.pdfimgshow.url} visible={this.props.pdfimgshow.visible} handleClose={()=>this.props.handleChangeShow({visible:false})}/>
                </div>
            </div>
        )
    }
}

pickDetailContent.propTypes = {};
