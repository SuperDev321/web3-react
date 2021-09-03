let ovenAbi = require('./PizzaOven.json');
let supremeAbi = require('./PizzaSupreme.json');
const Web3 = require('web3');
const fetch = require('node-fetch');

export const loadWeb3 = async () => {
    if (window.ethereum) {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
        return accounts
    } else {
        window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
        return null
    }
}

export const getTxReceipt = async (transactionHash) => {
    const web3 = new Web3(window.ethereum)
    return web3.eth.getTransactionReceipt(transactionHash)
}

export const prepareAndSendTransaction = async (amount, callback) => {
    const web3 = new Web3(window.ethereum)
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
    var ovenContract = new web3.eth.Contract(ovenAbi.abi, process.env.REACT_APP_FACTORY_ADDRESS);

    window.ethereum.request({
        method: "eth_sendTransaction",
        params: [
            {
                from: accounts[0], 
                // target address, this could be a smart contract address
                to: process.env.REACT_APP_FACTORY_ADDRESS, 
                // optional if you are invoking say a payable function 
                value: parseInt(web3.utils.toWei("" + (0.0888 * amount), "ether")).toString(16),
                // this encodes the ABI of the method and the arguements
                data: ovenContract.methods.mint(amount, accounts[0]).encodeABI() 
            }
        ]}
    ).then((transactionHash) => {
        callback(transactionHash)
    })

}

export const getTokenImage = async (tokenId) => {
    const web3 = new Web3(window.ethereum)
    var supremeContract = new web3.eth.Contract(supremeAbi.abi, process.env.REACT_APP_COLLECTION_ADDRESS);
    let lastMintedJson = await supremeContract.methods.tokenURI(web3.utils.hexToNumber(tokenId)).call()
    
    let jsonDataResponse = await fetch(lastMintedJson)
    let jsonData = await jsonDataResponse.json()
    return jsonData.image

}



// <Modal className="commen_model" size="lg" show={true} onHide={() => this.handleClose()} aria-labelledby="example-modal-sizes-title-lg">
// <Modal.Header closeButton>
//     <Modal.Title></Modal.Title>
// </Modal.Header>
// <Modal.Body style={{ backgroundImage: `url("../assets/images/cong-1-bg.png")`}}>
//     <div class="success_main_box">
//             {/* <img src="../assets/images/cong-1-t.png" alt="Congratulations!" /> */}
//             <img src="../assets/images/cong-1-text-1.png" alt="Congratulations!" className="tz_pizza_title" />
//             <a href="https://opensea.io/" target="_blank">
//                 <img src="https://storage.googleapis.com/example_bucket_name5000/Pizza110.png" alt="Congratulations!" className="tz_pizza_icon" />
//             </a>
//             <center><img src="../assets/images/cong-1-image-1.png" alt="Congratulations!" className="tz_pizza_icon_box" /></center>

//             <p className="tz_poup_text">* if you minted more then one the rest will show up in your Opensea collection. </p>
//         </div>
// </Modal.Body>
// </Modal>