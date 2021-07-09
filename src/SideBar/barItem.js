import React from 'react'
import { Link } from 'react-router-dom'
import '../index.css'




export default function Item({item}){
    return(
            
           
                <Link to={item.path}>
                        <li className='li'>{item.icons}<br/><a>{item.title}</a></li>
                </Link>
               
            
    );
}
