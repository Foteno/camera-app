import { CameraCapturedPicture } from "expo-camera";
import React, { useState } from "react";
import { Image, LayoutChangeEvent, StyleSheet, Text, useWindowDimensions } from "react-native";
import ImageZoom, { IOnClick } from 'react-native-image-pan-zoom';
import { View } from "../../components/default-components/Themed";
import { setImageDot } from "../../services/dot-service";

const ratio = 5
let antiCaching: Date;

type PointChooserProps = {
    photo: CameraCapturedPicture | undefined,
};

export type Dot = {
	x: number,
	y: number
};

export const setAntiCaching = (date: Date) => {
	antiCaching = date;
};

export const getAntiCaching = () => {
	return antiCaching;
};

export default function PointChooser(props: PointChooserProps) {
	const [dot, setDot] = useState<Dot>()
	const window = useWindowDimensions()

	const handleLayout = (event: LayoutChangeEvent) => {
		let layout = event.nativeEvent.layout
		window.height = layout.height
	};

	if (!props.photo) {
		return <View>
			<Text>Take a picture first</Text>
		</View>
	}
	let imageHeightRatio = props.photo.height / window.height
	let imageWidthRatio = props.photo.width / window.width
	let smallerRatio = imageHeightRatio < imageWidthRatio ? imageHeightRatio : imageWidthRatio

	const handlePictureTap = (event: IOnClick) => {
		const locationX = event.locationX
		const locationY = event.locationY
		const _dot: Dot = {
			x: locationX,
			y: locationY
		}
		console.log(_dot);
		setDot(_dot)

		_dot.x = _dot.x * smallerRatio
		_dot.y = _dot.y * smallerRatio
		setImageDot(_dot)

		antiCaching = new Date();
	};

	return (
		<View style={pointChooserStyles.container} onLayout={handleLayout}>
			<ImageZoom 
				style={pointChooserStyles.background}
				cropHeight={window.height}
				cropWidth={window.width}
				minScale={1}
				maxScale={5}
				imageHeight={props.photo.height/smallerRatio}
				imageWidth={props.photo.width/smallerRatio}
				onClick={handlePictureTap}
				maxOverflow={0}>
				<Image
					source={{uri: props.photo.uri}}
					style={[pointChooserStyles.background, {width: props.photo.width/smallerRatio, height: props.photo.height/smallerRatio}]}
					resizeMode="contain"/>
				{(dot ? 
					<View
						style={[pointChooserStyles.dot, { left: dot.x - ratio/2, top: dot.y - ratio/2}]}
					/> : <></>
				)}
			</ImageZoom>
		</View>
	);
};

const pointChooserStyles = StyleSheet.create({
	container: {
		backgroundColor: 'transparent',
		flex: 1,
		width: '100%',
		height: '100%'
	},
	background: {
		// flex: 1
	},
	dot: {
		position: 'absolute',
		width: ratio,
		height: ratio,
		borderRadius: 5,
		backgroundColor: 'red',
	},
});