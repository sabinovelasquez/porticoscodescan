'use strict';

import React, { Component } from 'react';
import {
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
const itemsRef = firebaseApp.database().ref();

let info = {};
let activeUser = {};

itemsRef.child(`settings`).on('value', (snap) => {
  info = snap.val();
});

class ScanApp extends Component {
  state = {open: false, active: true};
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
          type={Camera.constants.Type.back}
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
            <Text style={styles.noteNormal}>Para registrar su horario, presente su invitación frente a esta pantalla.</Text>
          </View>
        </View>
        <Modal
          offset={this.state.offset}
          open={this.state.open}
          animationDuration={500}
          animationTension={50}
          modalDidOpen={() => undefined}
          modalDidClose={() => this.setState({open: false, active: true})}
          style={styles.modal}
          overlayBackground={'rgba(69, 66, 84, 0.85)'}
          >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Bienvenido {activeUser.name}</Text>
            <Text style={styles.modalSubtitle}>{activeUser.title}</Text>
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
  //render Ends

  onBarCodeRead(e) {
    if(this.state.active) {
      itemsRef.child(`users/${e.data}`).once('value', (snap) => {
        this.setState({open: true});
        activeUser = snap.val();  
      });
    }
    this.setState({active: false});
  }
}

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: '#eee'
  },
  modalContent: {
    justifyContent: 'center',
  },
  modalTitle: {
    justifyContent: 'center',
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
    height: 340,
    width: '100%',
    backgroundColor:'#454254'
  },
  backgroundImage: {
    alignItems: 'center',
    resizeMode: 'cover',
    height: 200,
    width: '100%',
  },
  scan: {
    height: 550,
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
    height: 175,
    backgroundColor: '#000'
  },
  squareLeft: {
    opacity: 0.4,
    width: 300,
    height: 200,
    backgroundColor: '#000'
  },
  squareRight: {
    opacity: 0.4,
    width: 300,
    height: 200,
    backgroundColor: '#000'
  },
  squareBottom: {
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
    marginTop: 100,
    borderBottomColor: '#00B9E6',
    borderBottomWidth: 0.5,
    marginLeft: 50,
    marginRight: 50,
  },
  noteBold: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 30,
    color: '#00B9E6',
  },
  noteNormal: {
    marginBottom: 20,
    fontFamily: 'Montserrat-Light',
    fontSize: 25,
    color: '#333',
  },
  title: {
    marginLeft: 50,
    fontFamily: 'Montserrat-Bold',
    fontSize: 40,
    color: '#fff'
  },
  subTitle: {
    marginLeft: 50,
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
