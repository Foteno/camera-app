import { StyleSheet } from 'react-native';

import { useWindowDimensions } from 'react-native';
import Swiper from 'react-native-swiper';

import { Text, View } from '../../components/default-components/Themed';


export default function ModalScreen() {
	// const [selectedInpainting, setSelectedInpainting] = useState();
	const window = useWindowDimensions()


	return (
		<Swiper style={styles.wrapper} showsButtons={true}>
			<View style={styles.slide1}>
				{/* <Image style={styles.image} source={}></Image> */}
			</View>
			<View style={styles.slide2}>
				<Text style={styles.text}>We want you to have a great experience</Text>
			</View>
			<View style={styles.slide3}>
				<Text style={styles.text}>That is why we created this elegant intro</Text>
			</View>
			<View style={styles.slide4}>
				<Text style={styles.text}>We hope that you enjoy your day</Text>
			</View>
    </Swiper>
	);

}

const styless = StyleSheet.create({
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
});

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
		backgroundColor: 'red'
	},
	slide2: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'orange'
	},
	slide3: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'lightblue'
	},
	slide4: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'blue'
	},
	slide5: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'lightgreen'
	},
	image: {
		width: 50,
		height: 50,
		margin: 20
	},
	text: {
		color: '#fff',
		fontSize: 30,
		fontWeight: 'bold'
	}
});