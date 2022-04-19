import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Navbar extends Component {
  render() {
    return (
      <div style={{display:'flex'}}>
        <Link to="/" style={{textDecoration:'none'}}><h1 style={{marginLeft:'1rem'}}>Movies App</h1></Link>
        <Link to="/favourite" style={{textDecoration:'none'}}><h2 style={{marginLeft:'2rem',
          marginTop:'0.7rem'}}>favourite</h2></Link>

       
          
      </div>
    )
  }
}
