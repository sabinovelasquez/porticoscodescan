'use strict';

import React, { Component } from 'react';
import {
  ActivityIndicator,
  AppRegistry,
  Dimensions,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  View,
  StatusBar
} from 'react-native';
import Camera from 'react-native-camera';
import * as firebase from 'firebase';
import Modal from 'react-native-simple-modal';

const firebaseConfig = {
  apiKey: "AIzaSyD2yyAV6j40TlyQgg7d8tXZq0f8yaYpCbM",
  authDomain: "porticos-18e1d.firebaseapp.com",
  databaseURL: "https://porticos-18e1d.firebaseio.com",
  projectId: "porticos-18e1d",
  storageBucket: "porticos-18e1d.appspot.com",
  messagingSenderId: "578629257790",
};
const firebaseApp = firebase.initializeApp(firebaseConfig);

class ScanApp extends Component {
  constructor(props) {
    super(props);
    this.itemsRef = firebaseApp.database().ref();
    this.state = {
      //dummy:
      open: true,
      userName: 'Sabino Velásquez',
      userTitle: 'Médico General',
      //real thing:
      //open: false,
      capType: Camera.constants.Type.back
    };
  }

  componentDidMount() {
    this.itemsRef.child(`settings`).on('value', (snap) => {
      const info = snap.val();
      this.setState({
        note: info.note
      });
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar hidden />
        <View style={styles.top}>
          <Image source={require('./img/background.png')} style={styles.backgroundImage}>
            <Text style={styles.title}>SOCHEG</Text>
            <Text style={styles.subTitle}>Sala 1</Text>
          </Image>
          <Text style={styles.event}>Nombre de la Charla o Evento</Text>
          <Text style={styles.eventDate}>Mayo 4 - 11:00am</Text>
        </View>
        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          aspect={Camera.constants.Aspect.fill}
          onBarCodeRead={this.onBarCodeRead.bind(this)}
          type={this.state.capType}
          mirrorImage={true}
          style={styles.scan}>
          <View style={styles.squareTop}></View>
          <View style={styles.squareMidC}>
            <View style={styles.squareLeft}></View>
            <View style={styles.square}></View>
            <View style={styles.squareRight}></View>
          </View>
          <View style={styles.squareBottom}></View>
        </Camera>
        <View style={styles.bottom}>
          <View style={styles.note}>
            <Text style={styles.noteBold}>Nota</Text>
            <ActivityIndicator size='large' style={{opacity: !this.state.note ? 1.0 : 0.0}}/>
            <Text style={styles.noteNormal}>{this.state.note}</Text>
          </View>
        </View>
        <Modal
          offset={this.state.offset}
          open={this.state.open}
          animationDuration={500}
          animationTension={50}
          modalDidOpen={() => undefined}
          modalDidClose={() => this.setState({open: false, userName: null, capType: Camera.constants.Type.back})}
          modalStyle={styles.modal}
          overlayBackground={'rgba(69, 66, 84, 0.85)'}
          >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Bienvenido</Text>
            <ActivityIndicator size='large' style={{opacity: !this.state.userName ? 1.0 : 0.0}}/>
            <Text style={styles.modalTitle}>{this.state.userName}</Text>
            <Text style={styles.modalSubtitle}>{this.state.userTitle}</Text>
            <TouchableOpacity
              style={{margin: 50}}
              onPress={() => this.setState({open: false})}>
              <Text>OK</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    );
  }
  /////render Ends

  onBarCodeRead(e) {
    const fbchecker = e.data;
    if(fbchecker.substring(0, 4) == '-KiM') {
      this.setState({open:true, capType: Camera.constants.Type.front});
      this.itemsRef.child(`users/${fbchecker}`).once('value', (snap) => {
        const info = snap.val();
        this.setState({
          userName: info.name,
          userTitle: info.title
        });
      });
    }
  }
}

const styles = StyleSheet.create({
  modal: {
    borderRadius: 10,
    justifyContent: 'center',
    margin: 20,
    padding: 10,
    backgroundColor: '#eee'
  },
  modalContent: {
  },
  modalTitle: {
    textAlign: 'center',
    fontFamily: 'Montserrat-Regular',
    fontSize: 40,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
  },
  top: {
    height: 280,
    width: '100%',
    backgroundColor:'#454254'
  },
  backgroundImage: {
    alignItems: 'center',
    resizeMode: 'cover',
    height: 150,
    width: '100%',
  },
  scan: {
    height: 360,
    width: '100%',
  },
  square: {
    height: 200,
    width: 200,
    borderWidth: 0.5,
    borderColor:'#fff'
  },
  squareMidC: {
    flexDirection: 'row'
  },
  squareTop: {
    opacity: 0.4,
    width: '100%',
    height: 80,
    backgroundColor: '#000'
  },
  squareLeft: {
    marginTop:-1,
    opacity: 0.4,
    width: 200,
    height: 200,
    backgroundColor: '#000'
  },
  squareRight: {
    marginTop:-1,
    opacity: 0.4,
    width: 200,
    height: 200,
    backgroundColor: '#000'
  },
  squareBottom: {
    marginTop: -0.5,
    opacity: 0.4,
    width: '100%',
    height: 175,
    backgroundColor: '#000'
  },
  bottom: {
    flex: 4,
    backgroundColor:'#EEEEEE',
    width: '100%'
  },
  note: {
    marginTop: 50,
    marginBottom: 10,
    borderBottomColor: '#00B9E6',
    borderBottomWidth: 0.5,
    marginLeft: 50,
    marginRight: 50,
  },
  noteBold: {
    marginTop: 5,
    fontFamily: 'Montserrat-Regular',
    fontSize: 30,
    color: '#00B9E6',
  },
  noteNormal: {
    marginTop: -20,
    marginBottom: 20,
    fontFamily: 'Montserrat-Light',
    fontSize: 22,
    color: '#333',
  },
  title: {
    textAlign: 'center',
    width: '100%',
    fontFamily: 'Montserrat-Bold',
    fontSize: 40,
    color: '#fff'
  },
  subTitle: {
    textAlign: 'center',
    width: '100%',
    fontFamily: 'Montserrat-Light',
    fontSize: 32,
    color: '#fff'
  },
  event: {
    marginLeft: 50,
    marginTop: 20,
    fontFamily: 'Montserrat-Regular',
    fontSize: 30,
    color: '#fff'
  },
  eventDate: {
    marginLeft: 50,
    marginTop: 0,
    fontFamily: 'Montserrat-Regular',
    fontSize: 25,
    opacity: 0.7,
    color: '#fff'
  },
  fontLight: {
    fontFamily: 'Montserrat-Light',
  },
  fontRegular: {
    fontFamily: 'Montserrat-Regular',
  }
});

AppRegistry.registerComponent('porticoscodescan', () => ScanApp);
