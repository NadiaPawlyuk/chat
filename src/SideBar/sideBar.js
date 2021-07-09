import React from 'react'
import Item from './barItem'
import {Link} from 'react-router-dom'

let styles = {
    ul: {
        listStyle: 'none',
        margin: 0,
        padding: 0,
        width:'10vw',
        height: '80vh',
        textAlign: 'center',
        marginBottom: '10vh'

    },

    div:{
        width:'10vw',
        height: '100vh',
        background: '#003049',
        margin: 0,
        padding: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'fixed'
    }
}

export default function Side(props){
    return(
        <nav style={styles.div}>
            

                <ul style={styles.ul}>
                    { props.items.map(item =>{
                        return <Item item={item}/>
                    }) }
                </ul>


        </nav>
    );
}
