import React from 'react'
import Navigation from './Navigation'
import Home from './Home'
import About from './About'
import Contact from './Contact'

function Dashboard() {
  
  return <>
   <div className="home">
      <Navigation />
      <Home/>
      <About/>
      <Contact/>
      </div>
  </>
}

export default Dashboard