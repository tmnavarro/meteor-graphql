import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

class ResolutionForm extends Component {

  submitForm = () => {
    this.props
      .createResolution({
        variables: {
          name: this.name.value
        }
      }).then(() => {
        this.name.value = ''
      }).catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        <input type="text" ref={input => (this.name = input)}/>
        <button onClick={this.submitForm}>Salvar</button>
      </div>
    )
  }
}

const createResolution = gql`
  mutation createResolution($name: String!) {
    createResolution(name: $name) {
      _id
    }
  }
`;

export default graphql(createResolution, {
  name: 'createResolution',
  options: {
    refetchQueries: [
      'Resolutions'
    ]
  }
})(ResolutionForm);
