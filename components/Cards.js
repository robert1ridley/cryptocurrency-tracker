import React, { Component } from 'react';
import { View, StyleSheet, Image, Modal } from 'react-native';
import { ListItem } from 'react-native-elements';
import { createFilter } from 'react-search-input';
import { images } from '../images/images';
import loader from '../loader/loader.gif';
import SingleItem from './SingleItem';

const KEYS_TO_FILTERS = ['name'];

export default class Cards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      chosenId: null
    };
    this.openModal = this.openModal.bind(this);
  }

  openModal(id) {
    this.setState({ modalVisible: true, chosenId: id });
  }

  closeModal() {
    this.setState({ modalVisible: false });
  }

  render() {
    const Itemslist = this.props.data === [] ? null : this.props.data;
    const Items = Itemslist
    .filter(createFilter(this.props.text, KEYS_TO_FILTERS))
    .map(Item => 
      <ListItem
        roundAvatar
        avatar={images[Item.symbol] ? images[Item.symbol] : 'https://tse4.mm.bing.net/th?id=OIP.In5TQXRQmhNWUHxo0JOCvAHaHa&pid=Api'}
        key={Item.id}
        title={Item.name}
        subtitle={`$${Item.price_usd}`}
        rightTitle={Item.symbol}
        onPress={() => this.openModal(Item.id)}
      />
    );
    return (
      <View style={styles.mainView}>
        {this.props.data !== [] ? Items : null}
        <View style={{height:70}} />
        <View style={styles.container}>
          <Modal
            visible={this.state.modalVisible}
            animationType={'slide'}
            onRequestClose={() => this.closeModal()}
          >
            <View style={styles.modalContainer}>
              <View style={styles.innerContainer}>
                <SingleItem id={this.state.chosenId} closeModal={() => this.closeModal()} />
              </View>
            </View>
          </Modal>
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
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  modalContainer: {
    justifyContent: 'center',
    backgroundColor: '#7fadf2',
  },
  innerContainer: {
    marginTop: 80,
    height: '100%'
  }
});

