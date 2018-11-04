import React, { Component } from 'react';
import { Accounts } from 'meteor/accounts-base';

export default class LoginForm extends Component {
  login = e => {
    e.preventDefault();
    Meteor.loginWithPassword(this.userEmail.value, this.userPassword.value, error => {
      if (error) {
        console.log(error);
        return;
      }
      this.props.client.resetStore();
    });
  }

  render() {
    return (
      <form onSubmit={this.login}>
        <input type="email" ref={input => (this.userEmail = input) }/>
        <input type="password" ref={input => (this.userPassword = input)}/>
        <button>Acessar</button>
      </form>
    )
  }
}
