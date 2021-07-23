import React from 'react'
import Item from './barItem'
import "../index.css"

let styles = {
    ul: {
        listStyle: 'none',
        margin: 0,
        padding: 0,
        width:'10vw',
        height: '80vh',
        textAlign: 'center',
        marginBottom: '10vh'

    }
}

export default function Side(props){
    return(
        <nav className="sideBar">
                <ul style={styles.ul}>
                    { props.items.map(item =>{
                        return <Item item={item}/>
                    }) }
                </ul>


        </nav>
    );
}
