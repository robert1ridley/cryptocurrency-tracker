import React from 'react';
import { SearchBar } from 'react-native-elements';

export default class Search extends React.Component {
  render() {
    return (
      <SearchBar
        onChangeText={this.props.updateFilter.bind(this)}
        onClearText={this.props.clearText}
        placeholder='Search for a coin …' 
      />
    );
  }
}
