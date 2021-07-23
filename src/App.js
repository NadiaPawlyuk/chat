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
import LogReg from './pages/loginRegistration'
import {useSelector} from 'react-redux'
import "./index.css"

let styles = {
   
    div:{
      background: '#ccdbdc',
      margin: 0,
      padding: 0,
      width:'100vw',
      height: '100vh'
    }
}

function App() {

  const id  =  useSelector(state => state.login.stateUserId);
  let items = []

  if(id){
    items = [
      {id: 1, title: 'Головна', path: '/home', icons:<AiIcons.AiOutlineHome className="img"/>},
      {id: 2, title: 'Усі чати', path: '/allchats', icons:<RiIcons.RiWechatLine className='img2'/>},
      {id: 3, title: 'Створити чат', path: '/createchat', icons:<RiIcons.RiChat3Line className='img'/>},
      {id: 4, title: 'Налаштування', path: '/settings', icons:<AiIcons.AiOutlineSetting className='img'/>}
    ]
  }
  else{
    items = [
    {id: 1, title: 'Головна', path: '/home', icons:<AiIcons.AiOutlineHome className='img'/>},
    {id: 2, title: 'Налаштування', path: '/settings', icons:<AiIcons.AiOutlineSetting className='img'/>},
    {id: 3, title: 'Увійти/Зареєструватися', path: '/', icons:<RiIcons.RiAccountBoxLine className='img'/>}
  ]

  }
  
  return (
    <div style={styles.div}>
        <Router>
          <SideBar items={items}/>
          
          <Switch>
            <Route path='/home' exact component={Home}></Route>
            <Route path='/allchats' component={AllChats}></Route>
            <Route path='/createchat' component={CreateChat}></Route>
            <Route path='/settings' component={Setting}></Route>
            <Route path='/' component={LogReg}></Route>
          </Switch>
        </Router>
        
         
    </div>
  );
}

export default App;
