import React from 'react';
import {connect} from 'dva';
import BusinessTypesContent from 'components/BusinessTypesContent/BusinessTypesContent';

const BusinessTypes = ({location, dispatch, businessTypes}) => {
    const props = {
        ...BusinessTypes,
    }

    return (
        <BusinessTypesContent {...props}/>
    );

};

function mapStateToProps({ businessTypes }) {
    return { businessTypes };
}

export default connect(mapStateToProps)(BusinessTypes);
