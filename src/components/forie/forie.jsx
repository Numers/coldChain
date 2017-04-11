import './style.css';
import React, {PropTypes, Component} from 'react';
export default class render extends Component {
    render() {
        return (
            <div className="forie">
                <div className="wraplsforie">
                    <div className="title">温馨提示</div>
                    <div className="body">您的浏览器版本过低，请下载Chrome浏览器后在浏览本网站，谢谢</div>
                    <div className="download">
                        <div className="godown">
                            <a href="http://dl.pconline.com.cn/download/51614-1.html">下载</a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}