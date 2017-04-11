import React, {PropTypes, Component} from 'react';
import { Select } from 'antd';
import { Link } from 'dva/router';
const Option = Select.Option;

const changTime = (data) => {
    const date = new Date(data);
    return `${date.getFullYear()}-${date.getMonth() + 1 > 9 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1)}-${date.getDate() > 9 ? date.getDate() : '0' + date.getDate()}`
};

//根据status渲染不同的文案
const changeStatus = (data) => {
    if(data == 1) {
        return '仓库分拣中';
    } else if(data == 2) {
        return '取消订单';
    } else if(data == 3) {
        return '抄码完成 等待付款';
    } else if(data == 4) {
        return '取消订单';
    } else if(data == 5) {
        return '付款完成 等待确认';
    } else if(data == 6) {
        return '付款成功 出库完成';
    }
    return data;
}

const haveReloadData = (data) => {
    const renderReloadImg = data.renderReloadImg;
    const key = data.key;
    if(renderReloadImg[key]) {
        return renderReloadImg[key]
    }else {
        return []
    }
}

const judyData = (data) => {

    const re = ['box_num','goods_id','goods_name_en','goods_name_cn','specification','factory_no','tax_point','unit','tax_point_name','unit_name','num_pi','price_pi','goods_total_price_pi','num_ci','price_ci','goods_total_price_ci','cabinet_no','tariff','import_vat','box_num_ci'];

    if(data && data.data) {
        const i = data.data && data.data.split('-');
        const key = i[0];
        const stateID = i[1];

        for(let a=0;a<re.length;a++) {
            if(re[a] == key) {
                return {
                    stateID:stateID,
                    key:key
                }
                break;
            }
        }
    }
    return false;
}

const formatType = {
    "getFloat"(data) {

        if(!data) {
            return ''
        }

        let number = data.number;
        let n = data.n;
        n = n ? parseInt(n) : 0;
        if (n <= 0) return Math.round(number);
        number = Math.round(number * Math.pow(10, n)) / Math.pow(10, n);
        return number;

    },
    'formatfooddata'(data) {

        if(!data || !data.length) {
            return {}
        }

        let returnjson = {};

        data.map((d) => {
            const attr = `unit_name-${d.stateID}`;
            returnjson[attr] = d.unit_name
        });

        return returnjson;
    },
    'fomatgoodsinfo'(data) {
        let newarr = [];

        data.map((d) => {
            d.unit = d.unit_id;
            newarr.push(d);
        });

        return newarr;
    },
    'datasource'(data) {
        console.log(data,"list");
        if(!data || !data.length) {
            return [{stateID:0,key:'0'}];
        }

        let newarr = [];
        data.map((data,index) => {
            let json = Object.assign({},data);
            json['stateID'] = index;
            json['unit'] = json['unit_id'];
            json['good_total_price'] = json['goods_total_price_pi'];
            // json['unit_name'] = json['unit'];
            newarr.push(json)
        });

        return newarr;
    },
    'pricesavetwo'(data) {

        if(!data) {
            return;
        }

        console.log(data);

        const splitls = data && data.split('.');
        const splitls_0 = splitls && splitls[0];
        const splitls_1 = splitls && splitls[1];

        if(!splitls_1) {
            return `${splitls_0}.00`
        } else if(splitls_1.length == 1) {
            return `${splitls_0}.${splitls_1}000`
        } else if(splitls_1.length == 2) {
            return `${splitls_0}.${splitls_1}00`
        } else if(splitls_1.length == 3) {
            return `${splitls_0}.${splitls_1}0`
        } else if(splitls_1.length == 4) {
            return `${splitls_0}.${splitls_1}`
        } else if(splitls_1.length > 4) {
            return `${splitls_0}.${splitls_1.slice(0,4)}`
        }

    },
    'moneyformat'(data) {
        const datasource = data.datasource;
        const money_cn = data.money_cn;
        const money = data.money;
        const money_code = data.money_code;
        if(money) {
            if(datasource && datasource[money_cn] && datasource[money_cn]!='/') {
                const price1 = this.priceadd(datasource && datasource[money_cn] || 0);
                const price2 = this.priceadd(datasource && datasource[money] || 0);
                return `￥${price1}( ${datasource[money_code]} ${price2} )`;
            }else {
                if(datasource && datasource[money] && datasource[money]!='/') {
                    const price2 = this.priceadd(datasource && datasource[money] || 0);
                    return `${datasource[money_code]} ${price2}`;
                }else {
                    return '/'
                }

            }
        }else {
            if(datasource && datasource[money_cn] && datasource[money_cn]!='/') {
                const price1 = this.priceadd(datasource && datasource[money_cn] || 0);
                return `￥${price1}`
            }else {
                return '/';
            }
        }
    },
    'StatusForForeignTrade':(data) => {
        if(!data) {
            return 0;
        }

        let ls = 0;

        switch (data) {
            case '1':
                ls = 0;
                break;
            case '2':
                ls = 1;
                break;
            case '3':
                ls = 2;
                break;
            case '4':
                ls = 3;
                break;
            case '5':
                ls = 4;
                break;
            case '9':
                ls = 4;
                break;
            case '6':
                ls = 5;
                break;
            case '7':
                ls = 5;
                break;
            case '8':
                ls = 7;
                break;
            case '10':
                ls = 8;
                break;
            case '11':
                ls = 8;
                break;
            case '12':
                ls = 9;
                break;
            case '13':
                ls = 10;
                break;
            case '14':
                ls = 11;
                break;
            case '15':
                ls = 11;
                break;
            case '17':
                ls = 11;
                break;
            default:
                ls = 0;
        }

        return ls;
    },
    'StatusForDomesticTrade':(data) => {

        if(!data) {
            return 0;
        }

        let ls = 0;

        switch (data) {
            case '1':
                ls = 0;
                break;
            case '2':
                ls = 1;
                break;
            case '3':
                ls = 2;
                break;
            case '4':
                ls = 3;
                break;
            case '5':
                ls = 4;
                break;
            case '9':
                ls = 5;
                break;
            case '10':
                ls = 6;
                break;
            case '11':
                ls = 7;
                break;
            case '17':
                ls = 8;
                break;
            default:
                ls = 0;
        }

        return ls;
    },
    'tradeStatus':(data)=>{
        if(!data) {
            return 0;
        }
        let ls = 0;
        switch (data) {
            case "2":
                ls = 1
                break;
            case "3":
                ls = 1
                break;
            case "4":
                ls = 1
                break;
            case "5":
                ls = 1
                break;
            case "6":
                ls = 3
                break;
            case "7":
                ls = 4
                break;
            case "8":
                ls = 4
                break;
            case "9":
                ls = 2
                break;
            case "10":
                ls = 4
                break;
            case "11":
                ls = 5
                break;
            case "12":
                ls = 6
                break;
            case "13":
                ls = 7
                break;
            case "14":
                ls = 8
                break;
            case "15":
                ls = 8
                break;
            case "16":
                ls = 8
                break;
            case "17":
                ls = 8
                break;
            case "18":
                ls = 8
                break;
            default:
                ls = 0;
        }

        return ls;
    },
    'foodData'(data) {

        if(!data) {
            return ;
        }

        let newJson = {};
        const judydata = Object.assign({},data.judydata|| {});
        const datasource = data.datasource;

        for(let i in judydata) {
            const stateID = i && i.split('-') && i.split('-')[1];
            datasource.map((data)=>{
                if(data.stateID == stateID) {
                    newJson[i] = judydata[i];
                }
            })
        }

        return newJson;
    },
    'file_url':(data) => {

        if(!data) {
            return [];
        }
        let newData = Object.assign([],data);
        let file_info = [];
        file_info = newData.map((data) => {
            return {
                file_url:data
            }
        });
        return file_info;

    },
    activeKeyForTrade:(flag) => {
        if(flag == 2) {
            return '2'
        }else if(flag == 3) {
            return '2'
        }else if(flag == 4) {
            return '2'
        }else if(flag == 5) {
            return '2'
        }else if(flag == 6) {
            return '1'
        }else if(flag == 7) {
            return '2'
        }else if(flag == 8) {
            return '2'
        }else if(flag == 9) {
            return '3'
        }else if(flag == 10) {
            return '3'
        }else if(flag == 11) {
            return '3'
        }else if(flag == 12) {
            return '1'
        }else if(flag == 13) {
            return '2'
        }else if(flag == 14) {
            return '2'
        }else if(flag == 15) {
            return '2'
        }else if(flag == 16) {
            return '2'
        }else if(flag == 17) {
            return '2'
        }
    },
    'activeKey':({flag,order_type}) => {
        if(order_type == 1) {
            if(flag == 1) {
                return '1'
            }else if(flag == 2) {
                return '2'
            }else if(flag == 3) {
                return '2'
            }else if(flag == 4) {
                return '3'
            }else if(flag == 5) {
                return '3'
            }else if(flag == 9) {
                return '4'
            }else if(flag == 10) {
                return '4'
            }else if(flag == 11) {
                return '5'
            }else if(flag == 12) {
                return '5'
            }else if(flag == 13) {
                return '2'
            }else if(flag == 14) {
                return '2'
            }else if(flag == 15) {
                return '2'
            }else if(flag == 17) {
                return '1'
            }
        }

        if(flag == 1) {
            return '1'
        }else if(flag == 2) {
            return '2'
        }else if(flag == 3) {
            return '2'
        }else if(flag == 4) {
            return '3'
        }else if(flag == 5) {
            return '3'
        }else if(flag == 9) {
            return '2'
        }else if(flag == 6) {
            return '5'
        }else if(flag == 7) {
            return '5'
        }else if(flag == 8) {
            return '4'
        }else if(flag == 10) {
            return '4'
        }else if(flag == 11) {
            return '4'
        }else if(flag == 12) {
            return '5'
        }else if(flag == 13) {
            return '2'
        }else if(flag == 14) {
            return '2'
        }else if(flag == 15) {
            return '2'
        }else if(flag == 17) {
            return '1'
        }
    },
    'tradeTable':(data) => {
        if(!data) {
            return;
        }

        if(!data) {
            return;
        }

        return (
            <Link to={{pathname:'/coldChain/tradeAgentDeatil',query:{id:data.id,flag:data.flag,order_type:data.order_type_id}}} >{data.operate}</Link>
        )

    },
    'operateInTheOrders':(data) => {
        if(!data) {
            return;
        }

        if(data && data.flag == '17') {
            return (
                <div>
                    <Link to={{pathname:'/coldChain/theordersdetail',query:{id:data.id,flag:data.flag,order_type:data.order_type_id}}} >查看&nbsp;</Link>
                    <Link to={{pathname:'/coldChain/mypick'}} >{data.operate}</Link>
                </div>
            )
        }

        return (
            <Link to={{pathname:'/coldChain/theordersdetail',query:{id:data.id,flag:data.flag,order_type:data.order_type_id}}} >{data.operate}</Link>
        )

    },
    'operateInTodoList':(data) => {
        if(!data) {
            return;
        }

        if(data && data.flag == '17') {
            return (
                <div>
                <Link to={{pathname:'/coldChain/theordersdetail',query:{id:data.id,flag:data.flag,order_type:data.order_type_id}}} >查看&nbsp;</Link>
            <Link to={{pathname:'/coldChain/mypick'}} >{data.operate}</Link>
            </div>
        )
        }
    },
    'imgformat':(data) => {
        const returnArr = data.map((d)=>{
            return {
                file_url:d
            }
        });
        return returnArr;
    },
    'formdatain':(data) => {
        if(!data) {
            return;
        }
        let returnData = {};
        let goods_info = [];
        for(let i in data) {
            const judyin = judyData({data: i});
            if(!judyin) {
                returnData[i] = data[i]
            } else {
                const stateID = judyin.stateID || 0;
                const key = judyin.key;
                if(goods_info && goods_info[stateID]) {
                    goods_info[stateID][key] = data[i];
                }else {
                    goods_info[stateID] = {};
                    goods_info[stateID][key] = data[i];
                }
            }
        }

        returnData.goods_info = Object.assign([],goods_info);

        return returnData;
    },
    'imgurl':(data) => {
        let returnArr = [];
        for(let i in data) {
            returnArr.push(data[i]);
        }
        return returnArr;
    },
    'select':(data) => {
        const datasource = data.datasource || [];
        const rz = data.placeholder == '请选择融资期限';
        // const shuilv = data.placeholder == '请选择销项税率';
        const huilv = data.placeholder == '汇率';
        const Options = datasource.map((data,index) => {
            if(huilv) {
                return (
                    <Option value={data.code} key={data.code} > {`${data.code}-${data.rate}`}</Option>
                )
            } else if(rz) {
                return (
                    <Option value={data.name} key={data.name} title={data.name+'天'}> {data.name+'天'} </Option>
                )
            }
            // else if(shuilv) {
            //     return (
            //         <Option value={data.name} key={data.name} title={data.name}> {data.name} </Option>
            //     )
            // }
            else {
                return (
                    <Option value={data.value} key={data.value}> {data.name} </Option>
                )
            }

        });

        return Options;

     },
    'priceadd':(x) => {

        if(!x)return '/';
        let a = x.toString();
        let index = a.indexOf('.');
        let fl;
        if(index>=0){
            fl = a.split('.')[1];
        };
        let b=parseInt(x).toString();
        let len=b.length;
        if(len<=3){return a;}
        let r=len%3;
        return ((r>0?b.slice(0,r)+","+b.slice(r,len).match(/\d{3}/g).join(","):b.slice(r,len).match(/\d{3}/g).join(","))||'0')
            +(index>=0?('.'+fl):'');

    },
    'isJsonEmpty':(data)=> {
      //判断json是否为空
        if(!data) {
            return false;
        }
        let isEmpty = true;
        for(var i in data) {
            if(data[i]) {
                isEmpty = false;
            }
        }
        return isEmpty;
    },
    'projectData':(data) => {
        const returnData = [];
        for(let i in data) {
            let obj = {};
            obj.name = data[i];
            obj.id = i;
            returnData.push(obj);
        }

        return returnData;
    },
    'businessData':(data) => {
        const returnData = [];
        for(let i in data) {
            let obj = {};
            obj.name = data[i];
            obj.id = i;
            returnData.push(obj);
        }

        return returnData;
    },
    'updateTableData':(data) => {
        const returnData = data.filter((data) => {
            data.time = changTime((data.time)*1000);
            data.take_time = changTime((data.take_time)*1000);
            data.status = changeStatus(data.status);
            return true;
        });

        return returnData;
    },
    'YYMMDD':(data) => {
        return changTime(data*1000);
    },
    'errorImgGloup':(data) => {
        // if(!data) {
        //     return []
        // }
        // const rejectedMessImg = data && data.deny_detail && typeof(data.deny_detail.rejectedMessImg) == 'object' && JSON.parse(data.deny_detail.rejectedMessImg) || [];
        // const newrejectedMessImg = rejectedMessImg.concat([]);
        // const newList = [];
        // newrejectedMessImg.map((data) => {
        //     newList.push({
        //         id:data,
        //         ischange:false
        //     });
        // });
        // return newList;
    }
}

const formatdata = (params) => {
    let data = params.data;
    let type = params.type;
    if(formatType[type]) {
        return formatType[type](data);
    }

}


export default formatdata;