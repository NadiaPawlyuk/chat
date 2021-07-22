import React from 'react'
import '../index.css'
import {useSelector} from 'react-redux'

function Home(){
    
    const theme  =  useSelector(state => state.theme);
    const userName  =  useSelector(state => state.login.stateUserName);

    const id  =  useSelector(state => state.login.stateUserId);
    return (
        <div className={'home-'+ theme.siteTheme}>
            <h1 className={'homeH-'+ theme.siteTheme}>Приємного корисування</h1>
            <h1 className={'h2-'+ theme.siteTheme}>{userName} {id}</h1>
        </div>
    )
}

export default Home;
