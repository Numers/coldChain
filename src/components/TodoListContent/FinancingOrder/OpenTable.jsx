import React, {PropTypes, Component} from 'react';
import classnames from 'classnames';
import deleteTable from 'public/img/delete_table.png';
import TableDetail from './TableDetail';
import './style.css';

export default class OpenTable extends Component {
    close(e) {
        const event = e || window.e;
        const target = event.target;
        if(target.className.match('table-fixed-active') || target.className.match('ls-img-d')) {
            this.props.updateState({showtablefloat:false});
        }
    }

    render() {

        const refinance_apply_id_choose = this.props.refinance_apply_id_choose;
        const token = localStorage && localStorage.getItem('token');
        const classNames = classnames({'table-fixed table-fixed-active':this.props.showtablefloat,'table-fixed':!this.props.showtablefloat});

        return (
            <div className={classNames} onClick={(e)=>this.close(e)}>
                <div className="table-ls-wrap">
                    <div className="excle_download_new">
                        {refinance_apply_id_choose?(<a href={`/api/refll/expGoods?refinance_apply_id=${refinance_apply_id_choose}&token=${token}`}>导出excle</a>):''}
                    </div>
                    <div className="table-ls-wrap-delect">
                        <img className="ls-img-d" src={deleteTable} />
                    </div>
                    <TableDetail {...this.props} />
                </div>
            </div>
        )
    }
}

OpenTable.propTypes = {};
