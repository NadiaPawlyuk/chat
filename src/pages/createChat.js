import React from 'react'
import '../index.css'
import ChatForm from '../CreateChat/createChatForm'
import {setSiteTheme} from "../redux/actions/index";
import {connect} from 'react-redux';

class CreateChat extends React.Component{
    render(){
        return (
            <div className={'createChat-' + this.props.theme.siteTheme}>
                <ChatForm/>
            </div>
        )   
    }
    
}

const mapStateToProps = state => ({
    theme: state.theme
});

const mapDispatchToProps = dispatch => ({
    setSiteTheme: data => dispatch(setSiteTheme(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateChat);