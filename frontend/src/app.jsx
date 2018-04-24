import React from 'react'
import Showing from './showing'
import './base.styl'

import './page.styl'

function Header() {
  return (
    <header>
      <h1 className="title">CTS</h1>
      <div className="subtitle">Cinema Ticket System</div>
    </header>)
}

function LinkButton(props) {
  const { text, onClick } = props
  return <button className="link-button" onClick={onClick}>{text}</button>
}

function Navigation() {
  const navItems = ['Schedule', 'Movies', 'My Reservations']
  return (
    <nav>
      <ul className="nav-list">
        {navItems.map(item => (<li><LinkButton key={item} onClick={() => {}} text={item} /></li>))}
      </ul>
    </nav>)
}

function Footer() {
  return null
}

function Page() {
  return [
    <Header />,
    <Navigation />,
    <main><Showing /></main>,
    <Footer />,
  ]
}

export default () => <Page />
