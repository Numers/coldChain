import React, {PropTypes, Component} from 'react';
import InvoiceUpload from './InvoiceUpload';
import InvoiceShow from './InvoiceShow';

class InvoiceList extends Component {

    render() {
        const finance_file_info = this.props.finance_file_info || [];

        const InvoiceShowList = finance_file_info.map((data) => {
            return (
                <InvoiceShow {...this.props} dataShowListSingle={data} />
            )
        });


        let renderWhich = {};

        if(this.props.flag == '2') {
            renderWhich.render = true;
            renderWhich.title = '采购单';
            renderWhich.file_type = 9;
            renderWhich.flag = '2';
        } else if(this.props.flag == '6') {
            renderWhich.render = true;
            renderWhich.title = 'CI文件';
            renderWhich.file_type = 2;
        } else if(this.props.flag == '12') {
            renderWhich.render = true;
            renderWhich.title = '关税/增值税';
            renderWhich.file_type = 3;
        } else if(this.props.flag == '13') {
            renderWhich.render = true;
            renderWhich.title = '报关单／检疫证';
            renderWhich.file_type = 5;
        } else {
            renderWhich = {}
        }

        return (
            <div className="listpart">
                {InvoiceShowList}
                <InvoiceUpload {...this.props} renderWhich = {renderWhich} />
            </div>
        )
    }

}

InvoiceList.propTypes = {};

export default InvoiceList;