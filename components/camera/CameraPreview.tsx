import { CameraCapturedPicture } from "expo-camera";
import React from "react";
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { postPicture } from "../../services/image-service";

type CameraPreviewProps = {
    photo: CameraCapturedPicture | undefined,
    __retakePicture: () => void
}

export default function CameraPreview(props: CameraPreviewProps) {

  async function sendPhoto() {
    if (!props.photo) return
    postPicture(props.photo).then((response) => {
      console.log(response.data)
    }).catch((error) => {
      console.log(error)
    })
  }

  return (
      <View style={cameraPreviewStyles.container}>
      <ImageBackground source={{
      uri: props.photo && props.photo.uri
      }} style={cameraPreviewStyles.background}>

          <View style={cameraPreviewStyles.buttonBarContainer}>
          <View style={cameraPreviewStyles.buttonBar}>
              <TouchableOpacity onPress={props.__retakePicture} style={cameraPreviewStyles.retakeButton}>
              <Text style={cameraPreviewStyles.retakeText}>Re-take</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={sendPhoto} style={cameraPreviewStyles.sendPhotoButton}>
              <Text style={cameraPreviewStyles.sendPhotoText}>Send photo</Text>
              </TouchableOpacity>
          </View>
          </View>
      </ImageBackground>
      </View>
  )
} 

const cameraPreviewStyles = StyleSheet.create({
    container: {
      backgroundColor: 'transparent',
      flex: 1,
      width: '100%',
      height: '100%'
    },
    background: {
      flex: 1
    },
    buttonBarContainer: {
      flex: 1,
      flexDirection: 'column',
      padding: 15,
      backgroundColor: 'transparent',
      justifyContent: 'flex-end'
    },
    buttonBar: {
      flexDirection: 'row',
      backgroundColor: 'transparent',
      justifyContent: 'space-between'
    },
    retakeButton: {
      width: 130,
      height: 40,
      alignItems: 'center',
      borderRadius: 4
    },
    retakeText: {
      color: '#fff',
      fontSize: 20
    },
    sendPhotoButton: {
      width: 130,
      height: 40,
      alignItems: 'center',
      borderRadius: 4
    },
    sendPhotoText: {
      color: '#fff',
      fontSize: 20
    }
  });