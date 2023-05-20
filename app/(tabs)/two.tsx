import { Picker } from '@react-native-picker/picker';
import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from '../../components/default-components/Themed';
import { InpaintingAlgorithm, setInpaintingAlgorithm } from '../../services/image-service';



export default function ModalScreen() {
	const [selectedValue, setSelectedValue] = useState<InpaintingAlgorithm>(InpaintingAlgorithm.TELEA);

	useEffect(() => {
		setSelectedValue(InpaintingAlgorithm.TELEA);
	}, []);

	const setPickerValue = (itemValue: InpaintingAlgorithm, itemIndex: number) => {
		setSelectedValue(itemValue)
		setInpaintingAlgorithm(itemValue);
	}

	return (
	  <View style={styles.container}>
		<Text style={styles.text}>Choose inpainting algorithm</Text>
		<Picker
		  selectedValue={selectedValue}
		  style={styles.picker}
		  onValueChange={setPickerValue}>
		  <Picker.Item label="OpenCV Telea (default)" value={InpaintingAlgorithm.TELEA} />
		  <Picker.Item label="OpenCV Navier-Stokes" value={InpaintingAlgorithm.NS} />
		  <Picker.Item label="LaMa (long)" value={InpaintingAlgorithm.LAMA} />
		  <Picker.Item label="Generative inpainting" value={InpaintingAlgorithm.GAN} />
		</Picker>
	  </View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#222',
	},
	text: {
		color: '#fff',
		fontSize: 20,
		marginTop: 20,
	},
	picker: {
		backgroundColor: '#fff',
		height: 50,
		width: '100%',
	},
});