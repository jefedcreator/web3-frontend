import React from 'react'
import Styles from "./Header.module.css"
import { Connected } from '../connected/Connected'

const Header = ((userInfo, )) => {
  return (
    <div className={Styles.root}>
        <span className={Styles.logo}>WEB3<span className={Styles.logo2}>FRONTEND</span></span>
        <div className="">
            <button className={Styles.connect_btn}>Connect Wallet</button>
        </div>
    </div>
  )
}

export default Header