import { Camera, CameraType } from "expo-camera";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

type CameraWrapperProps = {
    __setCameraCallback: (ref: Camera | null) => void,
    __setCameraReady: (ready: boolean) => void,
    __takePicture: () => void
}



export default function CameraPreview (props: CameraWrapperProps) {
  return (
    <Camera
      style={cameraStyles.camera}
      type={CameraType.back}
      ratio="16:9"
      useCamera2Api={true}
      ref={(ref) => props.__setCameraCallback(ref)}
      onCameraReady={() => props.__setCameraReady(true)}>
      <View style={cameraStyles.takePictureBar}>
        <View style={cameraStyles.takePictureButtonContainer}>
          <TouchableOpacity
            onPress={props.__takePicture}
            style={cameraStyles.takePictureButton} />
        </View>
      </View>
    </Camera>
  )
} 

const cameraStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    justifyContent: 'center'
  },
  camera: {
    flex: 1
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%'
  },
  takePictureBar: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    flex: 1,
    padding: 10,
  },
  takePictureButton: {
    width: 70,
    height: 70,
    borderRadius: 20,
    backgroundColor: '#eee'
  },
  takePictureButtonContainer: {
    flex: 1,
    alignItems: 'center'
  }
});