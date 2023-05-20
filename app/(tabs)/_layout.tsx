import FontAwesome from '@expo/vector-icons/FontAwesome';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Tabs } from 'expo-router';
import { useLayoutEffect } from 'react';
import { Pressable, StyleSheet, useColorScheme } from 'react-native';
import { View } from '../../components/default-components/Themed';
import Colors from '../../constants/Colors';
import { getImage, getInpaintingAlgorithm, postPicture, setMasks } from '../../services/image-service';

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const navigation = useNavigation<NavigationProp<RootParamList>>();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (<View style={{backgroundColor: 'transparent'}}></View>)
    });
  }, [navigation]);

  const loadMasks = () => {
    postPicture(getImage(), getInpaintingAlgorithm()).then((response) => {
      setMasks(response.data["masks"]);
      navigation.navigate('upload', { headerTitle: 'Masks' });
    });
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
      }}>
        
        <Tabs.Screen
          name="index"
          options={{
            title: 'Camera',
            tabBarIcon: ({ color }) => <TabBarIcon name="camera" color={color} />,
            headerRight: () => (
              <Pressable onPress={() => loadMasks()} style={{ marginRight: 15 }}>
                {({ pressed }) => (
                    <FontAwesome size={25} name="upload" style={[styles.maskButton, { opacity: pressed ? 0.5 : 1 }]}></FontAwesome>
                )}
              </Pressable>
            ),
            unmountOnBlur: true,
          }}
        />
      <Tabs.Screen
        name="two"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => <TabBarIcon name="gear" color={color} />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  maskButton: {
    color: 'white',
  }
});