import { useIsFocused } from '@react-navigation/native';
import { Camera, CameraCapturedPicture } from 'expo-camera';
import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import CameraPreview from '../../components/camera/CameraPreview';
import CameraWrapper from '../../components/camera/CameraWrapper';
import { Text, View } from '../../components/default-components/Themed';

export default function TabOneScreen() {
  const [permission, setPermission] = Camera.useCameraPermissions()
  const [previewVisible, setPreviewVisible] = useState(false)
  const [capturedImage, setCapturedImage] = useState<CameraCapturedPicture>()
  const [cameraReady, setCameraReady] = useState(false)

  let camera: Camera | null = null
  const focused = useIsFocused();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
    })();
  }, []);

  function __setCamera(cameraToSet: Camera | null): void {
    camera = cameraToSet
  }

  function __retakePicture(): void {
    setPreviewVisible(false)
    setCapturedImage(undefined)
  }

  async function __takePicture() {
    if (!camera) return
    if (!cameraReady) return
    const photo: CameraCapturedPicture = await camera.takePictureAsync()
    console.log(photo)
    setPreviewVisible(true)
    setCapturedImage(photo)
  }

  if (permission) {
    if (previewVisible && capturedImage) {
      return (
        <CameraPreview photo={capturedImage} __retakePicture={__retakePicture}/>
      )
    } else if (focused) {
      return (
        <CameraWrapper __setCameraCallback={__setCamera} __setCameraReady={setCameraReady} __takePicture={__takePicture}/>
      )
    }
  }

  if (!permission) {
    return (
      <View style={permissionStyles.container}>
        <TouchableOpacity onPress={() => { }}
          style={permissionStyles.button}>

          <Text style={permissionStyles.buttonText}>Take picture</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const permissionStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    width: 130,
    borderRadius: 4,
    backgroundColor: '#14274e',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center'
  }
});