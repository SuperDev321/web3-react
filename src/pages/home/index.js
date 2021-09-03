import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import {Modal, Button} from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { YoutubePlayer } from "reactjs-media";
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';

import './index.css'
import { prepareAndSendTransaction, getTxReceipt, getTokenImage } from "../../web3/utils"
import ElementList from '../../components/ElementList/index.js';
const Web3 = require('web3');

/* FAQ's Section */

const faqs_section = [
    {
        faq_id : "1",
        faq_name : "HOW DO I BUY A SUPREME PIZZA?",
        faq_desc : "Open Google Chrome and head to Supreme-Pizzas.com.  Use your prefered trusted wallet like MetaMask and click the mint function at the top of the website.  Be sure you have .0888 ETH as well as a little extra for gas fees.  After you mint your Supreme Pizzas it can take a little time before they show up on your account at Opensea.io.  Here’s a great video on how to buy your first NFT: <a target='_blank' href='https://youtu.be/TxQID31fOTw'>https://youtu.be/TxQID31fOTw</a>",
    },
    {
        faq_id : "2",
        faq_name : "WHAT IS SUPREME PIZZAS?",
        faq_desc : "Supreme Pizzas is a unique collection of 8,888 mouth watering pizza NFTs on the Ethereum Blockchain.  Each slice is freshly baked in our computer software which ensures that no two pizzas are ever identical.",
    },
    {
        faq_id : "3",
        faq_name : "HOW MUCH DOES EACH SUPREME PIZZA COST?",
        faq_desc : "Each slice of pizza costs .0888 Eth plus gas fees.  Hurry and get your slice before they sell out!",
    },
    {
        faq_id : "4",
        faq_name : "HOW IS EACH DELICIOUS SLICE OF PIZZA CREATED?",
        faq_desc : "Each Supreme Pizza has been baked algorithmically by mixing hundreds of unique assets in various categories such as: Backgrounds, Clothing, Eyes, Glasses, Hats, Toppings, Shoes and Special Items.",
    },
    {
        faq_id : "5",
        faq_name : "WHY CAN’T I SEE MY NFT IN MY OPENSEA ACCOUNT?",
        faq_desc : "It can take a little time for items to show up in your wallet at Opensea.  Usually this process is instant but don’t get discouraged if it takes twenty minutes.  Refresh your wallet and they will show up!",
    },
    {
        faq_id : "6",
        faq_name : "HOW MANY DIFFERENT SUPREME PIZZA TOPPINGS ARE THERE?",
        faq_desc : "There are 10 unique toppings that you can unlock.  From classic pepperoni to the controversial pineapple.  Whatever you’re favorite topping is...there’s a Supreme Pizza for you!",
    },
];

const mapDetails = [
    {
        percent: 20,
        detail: "Some of Doge NFTs will be airdropped to our early adopters and fabase We ramp up our Discord and social media management, which will include a pack of community managers and mederators to bring our Doge community to the moon."
    },
    {
        percent: 50,
        detail: "Some of Doge NFTs will be airdropped to our early adopters and fabase We ramp up our Discord and social media management, which will include a pack of community managers and mederators to bring our Doge community to the moon."
    },
    {
        percent: 70,
        detail: "Some of Doge NFTs will be airdropped to our early adopters and fabase We ramp up our Discord and social media management, which will include a pack of community managers and mederators to bring our Doge community to the moon."
    },
    {
        percent: 90,
        detail: "Some of Doge NFTs will be airdropped to our early adopters and fabase We ramp up our Discord and social media management, which will include a pack of community managers and mederators to bring our Doge community to the moon."
    },
    {
        percent: 100,
        detail: "Some of Doge NFTs will be airdropped to our early adopters and fabase We ramp up our Discord and social media management, which will include a pack of community managers and mederators to bring our Doge community to the moon."
    },
]

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}

const faqs_content = faqs_section.map((faqs, index) =>
    <Card key={faqs.faq_id}>
        <Accordion.Toggle as={Card.Header} eventKey={index + 1}> <i className="fa fa-angle-down custom_down_icon"></i> {faqs.faq_name}</Accordion.Toggle>
        <Accordion.Collapse eventKey={index + 1}>
        <Card.Body><div dangerouslySetInnerHTML={{__html: faqs.faq_desc}}></div></Card.Body>
        </Accordion.Collapse>
    </Card>
);

class Home extends Component{
    constructor(props) {
        super(props);
        this.state = {
            quantity: 1,
            show: true,
            max: 5,
            min: 0,
            txModalOpenned: false,
            transactionStatus: "",
            total_price: 0.0888,
            total_price_main: 0.0888,
        };
    }
    
    IncrementItem = () => {
        this.setState(prevState => {
            return {
                quantity: prevState.quantity + 1,
                total_price: prevState.total_price_main * (prevState.quantity + 1),
            }
        });
    }
    DecreaseItem = (TotalCount) => {
        this.setState(prevState => {
            if(prevState.quantity > 1) {
                return {
                    quantity: prevState.quantity - 1,
                    total_price: prevState.total_price_main * (prevState.quantity - 1),
                }
            }
            else {
                return null;
            }
        });
    }
    ToggleClick = () => {
        this.setState({
            show: !this.state.show
        });
    }
    handleChange = (event) => {
        this.setState({quantity: event.target.value});
    }

    handleClose = () => {
        let txModalOpenned = this.state
        this.setState({txModalOpenned: !txModalOpenned, tokenImage: undefined})
    }

    thingsToDoAfterTransactionIsSent = async (transactionHash) => {
        let txModalOpenned = true
        this.setState({txModalOpenned})
        let transactionReceipt = null
        
        this.setState({transactionStatus: "Transaction pending"})
        while ( txModalOpenned && transactionReceipt == null) { 
            await sleep(1000)
            transactionReceipt = await getTxReceipt(transactionHash);
            txModalOpenned = this.state
        }

        if (transactionReceipt && transactionReceipt.status == false) {
            this.setState({transactionStatus: "The transaction has failed, please try again or contact support"})
        } else {
            let tokenImage = getTokenImage(transactionReceipt.logs[transactionReceipt.logs.length-1].topics[3])
            this.setState({transactionStatus: "Congratulations!", tokenImage})
        }
    }

    render(){
        let {quantity, transactionStatus, txModalOpenned, tokenImage, total_price} = this.state

        return(
            <main id="main">
                <section id="home_section_one" className="bg_cover" style={{ backgroundImage: `url("../assets/images/2.png")`}}>
                    <Container>
                        <Row style={{justifyContent: 'center',alignItems: 'center', flex:1}}>

                            <Modal className="commen_model" size="lg" show={txModalOpenned} onHide={() => this.handleClose()} aria-labelledby="example-modal-sizes-title-lg">
                                <Modal.Header closeButton>
                                    <Modal.Title></Modal.Title>
                                </Modal.Header>
                                <Modal.Body style={{ backgroundImage: `url("../assets/images/cong-1-bg.png")`}}>
                                    {transactionStatus == 'Congratulations!' && 
                                        <div className="success_main_box">

                                        <img src="../assets/images/cong-1-text-1.png" alt="Congratulations!" className="tz_pizza_title" />
                                        <a href="https://opensea.io/" target="_blank">
                                            <img href="https://opensea.io/" src={tokenImage} alt="Congratulations!" className="tz_pizza_icon" />
                                            </a>     
                                        
                                        <center>
                                        <a href="https://opensea.io/" target="_blank" className="congrats_href">
                                            <img src="../assets/images/cong-1-image-1.png" alt="Congratulations!" className="tz_pizza_icon_box" />
                                            </a>     
                                        </center>
                                         
                                        

                                        <p className="tz_poup_text">* if you minted more then one the rest will show up in your Opensea collection. </p>
                                        
                                    </div>
                                    }

                                    {transactionStatus == 'The transaction has failed, please try again or contact support' && (
                                        <img src="../assets/images/error-1-t.png" alt="Congratulations!" />
                                    )}
                                </Modal.Body>
                            </Modal>

                            <Col xs={12} md={6} lg={8}>
                                <div className="top_img_sec">
                                    <img src="../assets/images/1.png" alt="Nft Mouth" />
                                </div>
                            </Col>

                            <Col xs={12} md={6} lg={4}>
                                <div className="top_side_form" style={{ backgroundImage: `url("../assets/images/10.png")`}}>
                                    <h3>8,888 NFT's</h3>
                                    <div className="divider"></div>
                                    <div className="form_field_sec">
                                        <p>Price</p>
                                        <p>.0888 Eth</p>
                                        <p>Amount</p>
                                        <p className="input_quantity">
                                            <button onClick = {this.DecreaseItem}>-</button>
                                            <input className="inputne" value={this.state.quantity} onChange={this.handleChange}/>
                                            <button onClick={this.IncrementItem}>+</button>
                                        </p>
                                    </div>

                                    <div className="divider"></div>

                                    <div className="form_field_sec">
                                        <p>Total Price</p>
                                        <p>{this.state.total_price} Eth</p>
                                    </div>

                                    <center><button onClick={() => prepareAndSendTransaction(quantity, this.thingsToDoAfterTransactionIsSent)} className="top_form_submit">Mint Now</button></center>

                                </div>
                            </Col>
                        </Row>
                    </Container>
                </section>

                <section id="home_section_two" className="bg_cover" style={{ backgroundImage: `url("../assets/images/4.png")`}}>
                    <Container> 
                        <Row style={{justifyContent: 'center',alignItems: 'center', flex:1 }}>
                           <Col md={1}>
                            </Col>
                            <Col md={6}>
                                <div className="tz_sec_two_text">
                                    <h3 >What <span className="span_1">Supreme<br /></span> <span className="span_2">Pizzas</span><br /> <span className="span_3">Will You Get?</span></h3>
                                </div>
                            </Col>
                            <Col md={4}  >
                                <img src="../assets/images/kopya.png" alt="Nft Mouth" />
                            </Col>
                            <Col md={1}>
                            </Col>
                        </Row>
                        <Row style={{justifyContent: 'center',alignItems: 'center', flex:1 }}>
                           <Col md={1}>
                            </Col>
                            <Col md={10}>
                                <div style={{justifyContent: 'flex-start',alignItems: 'center', display: 'flex', maxWidth: '330px'}}>
                                    <img src="../assets/images/img-house.png" style={{'width':"80px"}}alt="Nft Mouth" />
                                    <div>
                                    <span style={{fontSize: 16, fontWeight: 'bold', color: 'white'}}>A Portion Of All Proceeds Will Goto BarStoolFund.com</span>
                                    </div>
                                </div>
                            </Col>
                            <Col md={1}>
                            </Col>
                        </Row>
                        
                    </Container>
                </section>

                <section id="home_section_three" className="bg_cover" style={{ backgroundImage: `url("../assets/images/bg-red.png")`}}>
                  <Container>
                    <img src="../assets/images/img-road.png" style={{'position': 'absolute',   'width': '266px',    'left': '50px',   'top': '1382px'}}alt="Nft Mouth" />
                    <Row style={{justifyContent: 'center',alignItems: 'center', flex:1}}>
                      <img src="../assets/images/text-roadmap.png" style={{'width':"230px"}}alt="Nft Mouth" />
                      <h6 style={{'fontSize':"20px",'color':"white"}}>Supreme Pizzas is a full time project for us now and it will continue to be after the public sale.  Below is what we’re working towards in the short term.  Each milestone unlocks when a certain % of Supreme Pizzas have been minted.  Future developments will be decided and voted upon by the community.
                      </h6>
                    </Row>
                    <ElementList />
                  </Container>
                </section>
                
                <section id="home_section_five" className="bg_cover" style={{ backgroundImage: `url("../assets/images/bg-yy.jpg")`}}>
                    <Container>
                    
                        <Row style={{justifyContent: 'center',alignItems: 'center', flex:1}}>
                           <img src="../assets/images/text-merch.png" style={{'width':"300px"}}alt="Nft Mouth" />
                           <div className="bg_cover"
                        //    style={{ 'width':"1000px","height":"780px",backgroundImage: `url("../assets/images/img-pattern-pizza.png")`, backgroundPosition: 'center',backgroundSize: '100%'}}
                           >
                               <img src="../assets/images/img-pattern-pizza.png" alt="pizza" style={{width: '100%'}} />
                           </div>
                           <img src="../assets/images/btn-shop.png" style={{'width':"250px"}} alt="Nft Mouth" />
                        </Row>
                    </Container>
                </section>
                <section id="home_section_four" className="bg_cover" >
                    <Container>
                    <Row style={{justifyContent: 'center',alignItems: 'center', flex:1,}}>
                           <Col md={4}>
                            </Col>
                           <Col md={8} style={{textAlign:"center"}}>
                           <h3 style={{'color':"white"}}>FAQ</h3>
                            </Col>      
                       
                    </Row>
                        <Row style={{justifyContent: 'center',alignItems: 'center', flex:1,'margin-top':"20px"}}>
                        
                            <Col md={4}>
                                <img src="../assets/images/pizza-software-test-revised.png" alt="Nft Mouth" />
                            </Col>
                            <Col md={8}>
                                <Accordion>
                                    {faqs_content}
                                </Accordion>
                            </Col>
                        </Row>
                    </Container>
                </section>
            </main>
        )
    }
}
export default Home