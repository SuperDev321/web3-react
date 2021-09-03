import React,{Component} from 'react';
import Element from '../Element/index.js';
import Row from 'react-bootstrap/Row';
import './index.css';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

const mapDetails = [
    {
        percent: 20,
        detail: "We ramp up our Discord and social media management, which will include a pack of community managers and moderators. "
    },
    {
        percent: 50,
        detail: "Donation fund will be established in coordination with BarstoolFund.com to give back to restaurants in need."
    },
    {
        percent: 70,
        detail: "An exclusive merch line is dropped."
    },
    {
        percent: 90,
        detail: "A limited edition Supreme Pizzas comic book will be created - randomly selected Supreme Pizza owners will receive physical and digital copies, and all owners will be entitled to claim tokenized versions."
    },
    {
        percent: 100,
        detail: "Companion NFT is released!  Everyone that is a holder will get another NFT as a free mint!"
    },
]

class Elements extends Component{

    constructor (props) {
        super(props);
        this.state = {
            isMobile: false
        }
        this.updatePredicate = this.updatePredicate.bind(this);
    };

    componentDidMount() {
        this.updatePredicate();
        window.addEventListener("resize", this.updatePredicate);
      }
    
    componentWillUnmount() {
        window.removeEventListener("resize", this.updatePredicate);
    }
    
    updatePredicate() {
        const mql = window.matchMedia('(max-width: 600px)');
        this.setState({ isMobile: mql.matches });
      }

    render(){
        return(
            <>
            {this.state.isMobile?
                <Carousel showStatus={false} showArrows={false}>
                    {mapDetails.map(({percent, detail}) =>
                        <Row className="roadmap-item item-20" key={percent}> 
                            <Element percent={percent} detail={detail}/>                
                        </Row>
                    )}
                </Carousel>
                :
                <div className='map-list-root'>
                    {mapDetails.map(({percent, detail}) =>
                        <Row className="roadmap-item item-20" key={percent}> 
                            <Element percent={percent} detail={detail}/>                
                        </Row>
                    )}
                </div>
            }
            </>
        )
    }
}
export default Elements;