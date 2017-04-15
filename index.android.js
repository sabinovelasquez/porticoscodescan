'use strict';

import React, { Component } from 'react';
import {
  AppRegistry,
  Modal,
  Dimensions,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';
import Camera from 'react-native-camera';
import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyD2yyAV6j40TlyQgg7d8tXZq0f8yaYpCbM",
  authDomain: "porticos-18e1d.firebaseapp.com",
  databaseURL: "https://porticos-18e1d.firebaseio.com",
  projectId: "porticos-18e1d",
  storageBucket: "porticos-18e1d.appspot.com",
  messagingSenderId: "578629257790",
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
const itemsRef = firebaseApp.database().ref();

class ScanApp extends Component {
  state = {
    modalVisible: false,
  }
  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }
  render() {
    return (
      <View style={styles.container}>
        <Modal
          animationType={"slide"}
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {activeUser = {};}}
          >
         <View style={{marginTop: 22}}>
          <View>
            <Text>{activeUser.name}</Text>
            <TouchableHighlight onPress={() => {
              this.setModalVisible(!this.state.modalVisible)
            }}>
              <Text>OK</Text>
            </TouchableHighlight>

          </View>
         </View>
        </Modal>
        <View style={styles.top}></View>
        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          onBarCodeRead={this.onBarCodeRead.bind(this)}
          type={Camera.constants.Type.back}
          style={styles.scan}>
        </Camera>
        <View style={styles.bottom}></View>
      </View>
    );
  }
  onBarCodeRead(e) {
    itemsRef.child(`users/${e.data}`).once('value', (snap) => {
      activeUser = snap.val();
      this.setModalVisible(true);
    });
  }

}

let activeUser = {};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  top: {
    flex: 1,
    height: 250,
    backgroundColor:'#432234'
  },
  scan: {
    flex: 2,
    height: 350,
  },
  bottom: {
    flex: 3,
    backgroundColor:'#432234'
  }
});

AppRegistry.registerComponent('porticoscodescan', () => ScanApp);
