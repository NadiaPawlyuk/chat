import React from 'react'
import { Link } from 'react-router-dom'
import '../index.css'

export default function Item({item}){
    return(
                <Link style={{textDecoration:"none"}} to={item.path}>
                        <li className='li'>{item.icons}<br/><h className='itemH'>{item.title}</h></li>
                </Link>
    );
}
