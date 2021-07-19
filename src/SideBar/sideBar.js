import React from 'react'
import Item from './barItem'

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
        width:'136px',
        height: '100%',
        background: '#212226',
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
