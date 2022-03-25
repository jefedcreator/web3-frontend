import './App.css';
import Header from './components/header/Header';
import MyStake from './components/MyStake/MyStake';
import StakeHistory from './components/StakeHistory/StakeHistory';
import {useEffect, useState} from 'react'
import Footer from './components/Footer/Footer';
import { Contract, ethers } from 'ethers';
import abi from './abi.json';

function App() {

  const [connected, setConnected] = useState(false);

  const [userInfo, setUserInfo] = useState({
    matic_balance: 0,
    token_balance: 0,
    address: null
  });

  const [stakeAmount, setStakeAmount] = useState(null)
  const [rewardAmount, setRewardAmount] = useState(null)

  const [stakeInput, setStakeInput] = useState("");
  const [withdrawInput, setWithdrawInput] = useState("");

  const [stateHistory, setStakeHistory] = useState([
    {
      amount: 1000,
      account: "0xE428Db9A3B47046acb020B8B5a5B29b8792a1415",
      time: "1647975426",
      type: "stake"
    },
    {
      amount: 1000,
      account: "0xE428Db9A3B47046acb020B8B5a5B29b8792a1415",
      time: "1647975426",
      type: "stake"
    },
    {
      amount: 1000,
      account: "0xE428Db9A3B47046acb020B8B5a5B29b8792a1415",
      time: "1647975426",
      type: "unstake"
    },
    {
      amount: 1000,
      account: "0xE428Db9A3B47046acb020B8B5a5B29b8792a1415",
      time: "1647975426",
      type: "stake"
    },
    {
      amount: 1000,
      account: "0xE428Db9A3B47046acb020B8B5a5B29b8792a1415",
      time: "1647975426",
      type: "unstake"
    },
    {
      amount: 1000,
      account: "0xE428Db9A3B47046acb020B8B5a5B29b8792a1415",
      time: "1647975426",
      type: "stake"
    }
  ])

  useEffect(()=>{
    window.ethereum.on("connect",async (payload) =>{
      if(Number(payload.chainId) !== 80001) return alert("you are not on the right network, please connect to polygon");
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const account = await provider.listAccounts()
      const userMaticBal = await provider.getBalance(account[0])
      console.log(userMaticBal);
      const signer = provider.getSigner()
      const contractInstance = new Contract("0x169E82570feAc981780F3C48Ee9f05CED1328e1b", abi, provider)
      const userBalance = await contractInstance.balanceOf(account[0]);
      console.log("user balance is:",userBalance); 
      setUserInfo({
        matic_balance: userMaticBal,
        token_balance: userBalance,
        address: account[0]
      })
      setConnected(true)
    })
  })

  const connectWallet = async () => {
    // logic
    if (!!window.ethereum || !!window.web3) {
      await window.ethereum.request({method:"eth_requestAccounts"})
    } else {
      alert("please use an ethereum enabled browser")
    }

    
    }
    
    const onChangeInput = ({target}) => {
    switch (target.id) {
      case "stake":
        setStakeInput(target.value)
        break;

      case "unstake":
        setWithdrawInput(target.value);
        break;
    
      default:
        break;
    }
  }

  const onClickStake = (e) => {
    e.preventDefault()
    console.log("staking...........", stakeInput);
  }

  const onClickWithdraw = (e) => {
    e.preventDefault()
    console.log("unstaking...........", withdrawInput);
  }

  
  return (
    <div className="App">
      <Header 
        connectWallet = {connectWallet}
        connected={connected}
        userInfo = {userInfo}
      />
      <main className='main'>
        <MyStake
          stakeInput = {stakeInput}
          withdrawInput = {withdrawInput}
          onChangeInput = {onChangeInput}
          onClickStake = {onClickStake}
          onClickWithdraw = {onClickWithdraw}
          stakeAmount = {stakeAmount}
          rewardAmount = {rewardAmount}

        />
        <StakeHistory
          stakeData = {stateHistory}
        />
      </main>
      <Footer />
    </div>
  );
}

export default App;
