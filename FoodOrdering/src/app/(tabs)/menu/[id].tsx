import { View, Text } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';

const ProductDetailScreen = () => {
  const { id } = useLocalSearchParams();

    return (
        <View>
            <Stack.Screen options={{ title: 'Details: ' + id}}/>
            <Text style={{ fontSize: 20 }}>ProductDetailScreen for id: {id}</Text>
        </View>
    );
}

export default ProductDetailScreen;