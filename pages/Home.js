import React from 'react';
import axios from 'axios';
import { View, ScrollView, StyleSheet,RefreshControl } from 'react-native';
import Search from '../components/Search';
import Cards from '../components/Cards';
import ButtonSet from '../components/ButtonSet';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      text: '',
      chosenIndex: 0,
      refreshing: false
    };
    this.clearText = this.clearText.bind(this);
    this.updateFilter = this.updateFilter.bind(this);
    this.sortData = this.sortData.bind(this);
  }

  componentDidMount() {
    this.refreshList();
  }

  refreshList() {
    this.setState({ refreshing: true });
    axios.get('https://api.coinmarketcap.com/v1/ticker/')
    .then((response) => {
      this.setState({ data: response.data, refreshing: false });
      this.sortData(this.state.chosenIndex);
    });
  }

  clearText() {
    this.setState({
      text: ''
    });
  }

  updateFilter(text) {
    this.setState({ text });
  }

  sortData(index) {
    this.setState({
      chosenIndex: index
    })
    const sorted = this.state.data;
    sorted.sort(function(a, b) {
      switch (index){
        case 0: return parseFloat(b.price_usd) - parseFloat(a.price_usd);
        case 1: return parseFloat(b.percent_change_24h) - parseFloat(a.percent_change_24h);
        case 2: return parseFloat(b.percent_change_7d) - parseFloat(a.percent_change_7d);
        default: return parseFloat(b.price_usd) - parseFloat(a.price_usd);
      }
    });
    this.setState({
      data: sorted
    })
  }
  
  render() {
    return (
        <View>
          <Search 
            updateFilter={this.updateFilter} 
            clearText={this.clearText}
          />
          <ButtonSet 
            sortData={this.sortData}
          />
          <ScrollView 
            style={styles.mainList} 
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this.refreshList.bind(this)}
              />
            }
          >
            <Cards 
              data={this.state.data} 
              text={this.state.text} 
              navigation={this.props.navigation}
            />
          </ScrollView>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  mainList: {
    marginBottom: 30
  }
})
