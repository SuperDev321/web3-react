import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { loadWeb3 } from "../web3/utils"

class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
          connected_address: undefined
        };
    }

    connectWallet = async () => {
        let accounts = await loadWeb3()

        if (accounts && accounts[0] && accounts[0].length > 0) {
            this.setState({connected_address: accounts[0]})
        }
    }

    render() {
        const {connected_address} = this.state
        console.log(connected_address)
       return <header id="header">
            <Navbar collapseOnSelect expand="lg">
                <Container>
                    <Navbar.Brand><Link to="/"><img src="../assets/images/logo.jpg" style={{'width':'160px','margin-left':"40px"}} alt="Congratulations!" /></Link></Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <ul className="me-auto">
                            <li><Nav.Link href="javascript:;"  id="merch_click" className="nav-link">Merch</Nav.Link></li>                          
                            <li><Nav.Link href="javascript:;" id="faqs_click" className="nav-link" >FAQ</Nav.Link></li>
                            <li><Link to="#" onClick={this.connectWallet} id="connect_wallet" className="nav-link">{connected_address ? connected_address.substring(0, 5) + "..." + connected_address.substring(connected_address.length - 4) : "Connect Wallet"}</Link></li>
                            <li><img src="../assets/images/img-discord.png" style={{'width':"40px"}} alt="Nft Mouth" /></li>
                        </ul>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    }
}
export default Header