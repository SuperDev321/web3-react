import React, {Component} from 'react';

class Element extends Component{
    constructor(props) {
        super(props);
    }
    render(){
        return(
            <div style={{'position':"relative"}}>
                <div style={{"padding":"6px","font-size":"16px","font-weight":"700","color":"white",'width':' 50px',   'height': '50px','background': '#1a2bf8','border-radius': '50%','position': 'absolute','z-index': '10','top':'-7px',   'left': '-11px','border': '5px solid #fff'}}>
                    {this.props.percent}%
                </div>
                <div style={{'position':'absolute','border-left': '4px solid #ff0','padding': '0px 0px 15px 0px'}}>
                    <div style={{'padding': '25px 70px 25px 35px','background':'black','border-radius': '14px','opacity':"0.3"}}>
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