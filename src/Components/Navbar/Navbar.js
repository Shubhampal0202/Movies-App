import React, { Component } from 'react'
import styles from "./Navbar.module.css"
import { Link } from 'react-router-dom'
export default class Navbar extends Component {
  render() {
    return (
     
        <div className={`${styles.container}`}>
          <Link to="/" style={{textDecoration:"none"}} ><h1 >Movies App</h1></Link>
           <Link to="/favourites" style={{textDecoration:"none"}}><h3>Favourites</h3></Link>
        </div>
    )
  }
}
