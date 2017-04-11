import React, {PropTypes, Component} from 'react';
import AttachmentInformation from './attachmentInformation';
import AttachmentInformationShow from './AttachmentInformationShow';

class AttachmentInformationList extends Component {

    render() {

        let renderWhich = {};

        if(this.props.flag == '2' && this.props.order_type == 1) {
            renderWhich.render = true;
            renderWhich.title = '销售订单扫描附件';
            renderWhich.file_type = 6;
            renderWhich.flag = 3;
        } else if(this.props.flag == '2' && this.props.order_type == 2) {
            renderWhich.render = true;
            renderWhich.title = '销售订单扫描附件';
            renderWhich.file_type = 6;
            renderWhich.flag = 1;
        } else {
            renderWhich = {

            }
        }

        const finance_file_info = this.props.finance_file_info || [];
        const ImgList = finance_file_info.map((finance_file_infoSingle) => {
           return (
               <AttachmentInformationShow finance_file_infoSingle={finance_file_infoSingle} {...this.props} />
           )
        });

        return (
            <div className="listWrap">
                {ImgList}
                <AttachmentInformation {...this.props} renderWhich = {renderWhich}/>
            </div>
        )
    }

}


AttachmentInformationList.propTypes = {};

export default AttachmentInformationList;