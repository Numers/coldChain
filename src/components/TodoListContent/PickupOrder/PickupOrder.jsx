import React from 'react'
import './style.css'
import SearchOrder from './SearchOrder'
import PickupOrderTable from './PickupOrderTable'

export default class PickupOrder extends React.Component {
    render()
    {
        return (<div className="PickupOrderContentWrap">
                    <div className="SearchOrderWrap">
                        <div className="SearchOrderContentWrap">
                            <SearchOrder {...this.props}/>
                        </div>
                    </div>
                    <div className="PickupOrderTableWrap">
                        <div className="PickupOrderTableContentWrap">
                            <PickupOrderTable {...this.props}/>
                        </div>
                    </div>
                </div>);
    }
}