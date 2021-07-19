import React from 'react'
import axios from 'axios'
import '../index.css'
import stringify from 'qs-stringify'
import {setSiteTheme} from "../redux/actions/index";
import {connect} from 'react-redux';

class CreateChatForm extends React.Component{
  constructor(props){
    super(props);

    this.state ={chatName:'', userName:'', errorBool: false, successesBool: false, errorName: '', chatNameMessage:'', userNameMessage:''}
    this.chatNameChanger = this.chatNameChanger.bind(this);
    this.userNameChanger = this.userNameChanger.bind(this);
    this.setError = this.setError.bind(this);
    this.setSuccesses = this.setSuccesses.bind(this);
    this.validation = this.validation.bind(this);
    this.createChate = this.createChate.bind(this);
  }

  chatNameChanger(event) {

    this.setState({chatName: event.target.value});
  }
  
  userNameChanger(event) {
  
    this.setState({userName: event.target.value});
  
  }
  
  setError(){
    this.setState({errorBool: false});
  }

  setSuccesses(){
    this.setState({successesBool: false});
  }

  validation(){
    let userName = this.state.userName;
    let chatName = this.state.chatName;

    let error = '';
    let errorBool = false;

    if(!userName){
      error = error + ' «Ім’я користувача» не може бути порожнім.';
      errorBool = true;
    }
    if(!chatName){
      error = error + ' «Ім’я чату» не може бути порожнім.';
      errorBool = true;
    }
    if(chatName.length < 7){
      error = error + ' «Ім’я чату» не може мати менше ніж 7 символів.';
      errorBool = true;
    }
    if(errorBool){
      this.setState({errorBool: true});
      this.setState({errorName: error});
      this.setState({successesBool: false});
    }
    if(!errorBool){
      this.createChate(this.state.userName, this.state.chatName);
      this.setState({userNameMessage: this.state.userName});
      this.setState({chatNameMessage: this.state.chatName});
    }
  }

  async createChate(user_id, name) {

    let current = this

    await axios({
        method: 'post',
        url: "https://chat.vallsoft.com/api/chats/create-chat" ,
        data: stringify({
         user_id: user_id, 
         name: name
        }),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
          'Authorization': 'BpvgI5T7EynnaDjDOqa7AT-gfjQNDhgM',
        }
    }).then(function (response) {
        if (response.data !== '' && response.data.constructor === Object) {  
            let event = response.data

            if(event.status){
              current.setState({errorBool: false});
              current.setState({successesBool: true});
            }
            else{
              current.setState({successesBool: false});
              current.setState({errorName: 'Error'});
              current.setState({errorBool: true});
            }
        }
    }).catch(function (error) {
        console.log(error)
    });

  } 


      render(){
          return(
            <>
            <div className='createChatForm'>

            <div className={'createChatLabel-'+ this.props.theme.siteTheme}>

              <label className='labelChat'>Назва чату:</label>
              <input type="text" value={this.state.chatName} onChange={this.chatNameChanger} placeholder='Назва чату'/>

            </div>

            <div className={'createChatLabel-'+ this.props.theme.siteTheme}>

              <label className='labelUser'>Користувач:</label>
              <input type="text" value={this.state.userName} onChange={this.userNameChanger} placeholder='Ім’я користувача'/>

            </div>

            <div className={'createChatButton-'+ this.props.theme.siteTheme}>

              <button onClick={this.validation}>Створити</button>

            </div>

          </div>
         
          <nav className={this.state.errorBool ? 'errorform active' : 'errorform'}>

            <div className='formMessageError'><h>Помилка</h></div>

            <div className='createChatFormH'><h>{this.state.errorName}</h></div>

            <div className='createChatFormButton'><button className='errorButton' onClick={this.setError}>Закрити</button></div>

          </nav>

          <nav className={this.state.successesBool ? 'successfulform active' : 'successfulform'}>

            <div className='formMessageSuccess'><h>Успіх</h></div>

            <div className='createChatFormH'>

              <h>Чат з ім’ям <em>{this.state.chatNameMessage}</em> успішно створений <br/> коистувачем <em>{this.state.userNameMessage}</em></h>

            </div>

            <div className='createChatFormButton'><button className='successButton' onClick={this.setSuccesses}>Закрити</button></div>

          </nav>
          </>
          )
      }
}

const mapStateToProps = state => ({
  theme: state.theme
});

const mapDispatchToProps = dispatch => ({
  setSiteTheme: data => dispatch(setSiteTheme(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateChatForm);