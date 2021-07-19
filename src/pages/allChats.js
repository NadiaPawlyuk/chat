import React from 'react'
import '../index.css'
import {useSelector} from 'react-redux'

function AllChats(){
    
    const theme  =  useSelector(state => state.theme);

    return (
        <div className={'allchats-' + theme.siteTheme}>
        <h1 className='text'>Чати</h1>
        </div>
    )
}

export default AllChats;