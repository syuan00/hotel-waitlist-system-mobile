import React, { Component } from 'react'
import { TouchableHighlight, View, Text, TextInput, Button, StyleSheet } from 'react-native'

import { graphql } from 'react-apollo';
import gql from 'graphql-tag'

export default class RNApp extends Component {

  constructor() {
    super()
    this.state = {
      id: 1,
    }
    this.updateId = this.updateId.bind(this)
  }

  updateId(id) {
    if(!id){
      id = 1
    }
    id = parseInt(id);
    this.setState({
      id
    })
  }

  render () {
    const GET_CUSTOMER = gql`query GetCustomerById($id: Int!) {
                        customer(id: $id) {
                          id
                          name
                          phone
                          timestamp
                        }
                      }`

    const Customer = ({ data }) => (
      <View style={{padding: 20}}>
        <Text>Serial No.: {data.customer && parseInt(data.customer.id)}</Text>
        <Text>Name: {data.customer && data.customer.name}</Text>
        <Text>Phone Number: {data.customer && data.customer.phone}</Text>
      </View>
    )
    
    const ViewWithData = graphql(GET_CUSTOMER, {
      options: { variables: { id: this.state.id } }
    })(Customer)

    const DELETE_CUSTOMER = gql`mutation DeleteCustomerById($id: Int!){
      customerDelete(id: $id)
    }`;

    function DeleteButton({ mutate }) {
      return (
        <Button
          title="Delete"
          onPress={() => {mutate()}}
        />
      );
    }

    const ViewDeleteButton = graphql(DELETE_CUSTOMER, {
      options: { variables: { id: this.state.id } }
    })(DeleteButton)

    return (
      <View style={styles.container}>
        <Text style={{textAlign: 'center'}}>Find Customer Info & Delete</Text>
        <TextInput
          onChangeText={this.updateId}
          style={styles.input} />
        <ViewWithData />
        <ViewDeleteButton />
      </View>
    )
  }
}

styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  input: {
    backgroundColor: '#dddddd',
    height: 50,
    margin: 20,
    marginBottom: 0,
    paddingLeft: 10
  }
})