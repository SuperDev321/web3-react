import React, {Component} from 'react';

import './index.css';

class Element extends Component{
    constructor(props) {
        super(props);
    }
    render(){
        return(
            <div className="map-element-root">
                <div className="map-element-percent">
                    {this.props.percent}%
                </div>
                <div  className="map-element-detail">
                    <div style={{'padding': '25px 70px 25px 35px','background':'#423c3c52','border-radius': '14px'}}>
                        <div style={{'fontSize':"14px",'color':"white"}}>
                           {this.props.detail}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Element;