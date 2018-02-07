import React from 'react';
import { ButtonGroup } from 'react-native-elements';
// import { StyleSheet } from 'react-native';

export default class ButtonSet extends React.Component {
  constructor () {
    super()
    this.state = {
      selectedIndex: 0
    }
    this.updateIndex = this.updateIndex.bind(this)
  }
  
  updateIndex (selectedIndex) {
    this.setState({selectedIndex: selectedIndex})
    this.props.sortData(selectedIndex)
  }
  
  render () {
    const buttons = ['Price', '24 Hour', '7 Day']
    const { selectedIndex } = this.state
  
    return (
      <ButtonGroup
        onPress={this.updateIndex}
        selectedIndex={selectedIndex}
        buttons={buttons}
        containerStyle={{height: 40}}
        selectedTextStyle={{color: 'white'}}
        selectedBackgroundColor='#303338'
      />
    )
  }
}
