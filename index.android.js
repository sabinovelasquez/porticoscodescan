'use strict';
import React, { Component } from 'react';
import {
  AppRegistry,
  Dimensions,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';
import Camera from 'react-native-camera';

class ScanApp extends Component {
  render() {
    return (
      <View style={styles.container}>
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
    alert(
        e.data
    );
  }
}

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
