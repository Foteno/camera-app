import { StyleSheet } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { Image, TouchableOpacity, useWindowDimensions } from 'react-native';
import Swiper from 'react-native-swiper';
import { Text, View } from '../components/default-components/Themed';
import { djangoUrl, getMasks } from '../services/image-service';
import { useEffect } from 'react';

import { NavigationProp } from '@react-navigation/native';
import { getChosenMask, setChosenMask } from '../services/dot-service';

const imageUrl = "/get-mask?mask_file="

export default function MaskScreen() {
	const [selectedInpainting, setSelectedInpainting] = useState<string>("");
	const [index, setIndex] = useState<number>(0);
	const navigation = useNavigation<NavigationProp<RootParamList>>();

	const masks = getMasks();
	const window = useWindowDimensions()
	
	useEffect(() => {
		navigation.setOptions({ title: 'Choose mask' });
		setSelectedInpainting(masks[index]);
	}, []);

	const indexChanged = (_index: number) => {
		setSelectedInpainting(masks[_index]);
		setIndex(_index);
	}

	const __chooseMask = () => {
		setChosenMask(selectedInpainting);
		navigation.navigate('view', { mask: selectedInpainting });
	}

	return (
		<View style={{flex: 1}}> 
			<Swiper style={styles.wrapper} showsButtons={true} loop={false} onIndexChanged={indexChanged}>
				{masks.map((mask: any) => (
					<View key={mask} style={styles.slide1}>
						<Image style={styles.image} source={{uri: djangoUrl + imageUrl + mask + '&' + new Date()}} ></Image>
					</View>
				))}
			</Swiper>
			<TouchableOpacity style={{height: 50, justifyContent: 'center', backgroundColor: '#823CDF'}} onPress={__chooseMask}>
				<Text style={{fontSize: 20, textAlign: 'center'}}>Choose mask</Text>
			</TouchableOpacity>
		</View>
	);

}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
	wrapper: {},
	slide1: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#888'
	},
	image: {
		width: 600,
		height: 600,
		marginTop: 50,
		marginBottom: 50,
		resizeMode: 'contain'
	},
	text: {
		color: '#fff',
		fontSize: 30,
		fontWeight: 'bold'
	}
});