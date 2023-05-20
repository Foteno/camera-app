import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import { Image, StyleSheet } from 'react-native';
import { View } from '../components/default-components/Themed';
import { getChosenMask } from '../services/dot-service';
import { djangoUrl, getInpaintingAlgorithm } from '../services/image-service';
import { getAntiCaching } from '../components/camera/PointChooser';

export default function ViewScreen() {  
  const navigation = useNavigation<NavigationProp<RootParamList>>();
  let chosenMask = getChosenMask();
  useEffect(() => {
    navigation.setOptions({ title: 'Inpainted image' });
    chosenMask = getChosenMask();
  }, []);
  
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      console.log(djangoUrl + "/choose-mask?mask_file=" + chosenMask + '&inpainting=' + getInpaintingAlgorithm() + '&' + getAntiCaching());
    });
  });
  
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{uri: djangoUrl + "/choose-mask?mask_file=" + chosenMask + '&inpainting=' + getInpaintingAlgorithm() + '&' + getAntiCaching()}}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
	image: {
		resizeMode: 'contain',
    width: '100%',
    height: '100%',
	},
});
