import { StatusBar } from 'expo-status-bar';
import { Image, Platform, StyleSheet } from 'react-native';

import EditScreenInfo from '../components/default-components/EditScreenInfo';
import { Text, View } from '../components/default-components/Themed';
import { djangoUrl, getImage } from '../services/image-service';
import { NavigationProp, useLinkProps, useNavigation, useRoute } from '@react-navigation/native';
import { useEffect } from 'react';
import { getChosenMask } from '../services/dot-service';


export default function ViewScreen() {  
  const navigation = useNavigation<NavigationProp<RootParamList>>();
  let chosenMask = getChosenMask();
  useEffect(() => {
    navigation.setOptions({ title: 'Inpainted image' });
    chosenMask = getChosenMask();
  }, []);
  
  
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{uri: djangoUrl + "/choose-mask?mask_file=" + chosenMask + '&' + new Date()}}/>
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
