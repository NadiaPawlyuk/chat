import './index.css'
import React from 'react'
import SideBar from './SideBar/sideBar'
import * as AiIcons from 'react-icons/ai'
import * as RiIcons from 'react-icons/ri'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from './pages/home'
import AllChats from './pages/allChats'
import CreateChat from './pages/createChat'
import Setting from './pages/settings'

let styles = {
   
    div:{
      background: '#ccdbdc',
      margin: 0,
      padding: 0,
      width:'100vw',
      height: '100vh'
    },

    h:{
      margin: 0,
      padding: 0,
      position: 'absolute',
      left: '27vw',
      top: '38vh',
      fontSize: '60px',
      color:'#001219'
    },

    img:{
      width:'40',
      height: '40'
    },

    img2:{
      width:'47',
      height: '47'
    }
}

function App() {

  
  const items = [
    {id: 1, title: 'Головна', path: '/', icons:<AiIcons.AiOutlineHome style={styles.img}/>},
    {id: 2, title: 'Усі чати', path: '/allchats', icons:<RiIcons.RiWechatLine style={styles.img2}/>},
    {id: 3, title: 'Створити чат', path: '/createchat', icons:<RiIcons.RiChat3Line style={styles.img}/>},
    {id: 4, title: 'Налаштування', path: '/settings', icons:<AiIcons.AiOutlineSetting style={styles.img}/>}
  ]

  return (
    <div style={styles.div}>
        <Router>
          <SideBar items={items}>
          </SideBar> 
          
          <Switch>
            <Route path='/' exact component={Home}></Route>
            <Route path='/allchats' component={AllChats}></Route>
            <Route path='/createchat' component={CreateChat}></Route>
            <Route path='/settings' component={Setting}></Route>
          </Switch>
        </Router>
        
         
    </div>
  );
}

export default App;
