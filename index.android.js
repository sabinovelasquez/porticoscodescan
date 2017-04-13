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
          onRequestClose={() => {console.log("Modal has been closed.")}}
          >
         <View style={{marginTop: 22}}>
          <View>
            <Text>{codeId}</Text>
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
    codeId = e.data;
    this.setModalVisible(true);
  }
}

const codeId = ':D';
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
