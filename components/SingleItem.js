import React from 'react';
import { Text, View, Image, StyleSheet, ScrollView, Button } from 'react-native';
import { Card } from 'react-native-elements';
import axios from 'axios';
import loader from '../loader/loader.gif';

export default class SingleItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      loading: true
    };
  }

  componentDidMount() {
    axios.get(`https://api.coinmarketcap.com/v1/ticker/${this.props.id}`)
    .then((response) => {
      this.setState({ data: response.data[0], loading: false });
    });
  }

  render() {
    const getColor = (value) => ({ color: (value > 0 ? 'green' : 'red') });
    return (
      <ScrollView>
        <View style={styles.loader}>
          {
            this.state.loading ? 
            <Image source={loader} style={{ width: 30, height: 30 }} /> : 
            null
          }
        </View>
        {
          this.state.loading ? 
          null : 
          <Card
            title={`${this.state.data.name} (${this.state.data.symbol})`}
            titleStyle={{ justifyContent: 'center' }}
            style={{ width: '100%' }}
          >
            <View containerStyle={{ marginBottom: 15 }}>
              <Text 
                style={{ textAlign: 'center', marginTop: 10, marginBottom: 10, fontWeight: '700', fontSize: 16 }}
              >
                Current Price: 
                <Text style={{ fontWeight: '100' }}> ${this.state.data.price_usd} USD</Text>
              </Text>
            </View>
            <TextBlock
              leftHead="Last Hour"
              leftText={`${this.state.data.percent_change_1h} %`}
              leftColor={getColor(this.state.data.percent_change_1h)}
              rightHead="Last 24 Hours"
              rightText={`${this.state.data.percent_change_24h} %`}
              rightColor={getColor(this.state.data.percent_change_24h)}
            />
            <TextBlock
              leftHead="Last 7 Days"
              leftText={`${this.state.data.percent_change_7d} %`}
              leftColor={getColor(this.state.data.percent_change_7d)}
              rightHead="Market Cap"
              rightText={`$${this.state.data.market_cap_usd}`}
              rightColor={{ color: 'black' }}
            />
            <TextBlock
              leftHead="Total Supply"
              leftText={this.state.data.total_supply}
              leftColor={{ color: 'black' }}
              rightHead="Max Supply"
              rightText={this.state.data.max_supply}
              rightColor={{ color: 'black' }}
            />
            <Button
              onPress={this.props.closeModal}
              title="Go Back"
              style={styles.returnButton}
            />
          </Card>
        }
      </ScrollView>
    );
  }
}

class TextBlock extends React.Component {
  render() {
    return (
      <View style={{ flexDirection: 'row' }}>
        <View style={styles.flexy}>
          <Text style={styles.heading}>{this.props.leftHead}</Text>
          <Text style={this.props.leftColor}>{this.props.leftText}</Text>
        </View>
        <View style={styles.flexy}>
          <Text style={styles.heading}>{this.props.rightHead}</Text>
          <Text style={this.props.rightColor}>{this.props.rightText}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  loader: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10
  },
  flexy: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
    flex: 1    
  },
  heading: {
    fontWeight: '700',
    fontSize: 16,
    marginBottom: 10
  },
  returnButton: {
    color: '#7fadf2',
    marginBottom: 20
  }
});
