import { View, Text, FlatList, Platform} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useCart } from '@/src/providers/CartProviders';
import CartListItem from '@/src/components/CartListItem';


const CartScreen = () => {
    const { items } = useCart();

    return (
        <View>
            <FlatList 
            data={items} 
            renderItem={({ item }) => <CartListItem cartItem={item} />} 
            contentContainerStyle={{ padding: 10, gap: 10 }}
            />

            <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
        </View>
    );
};

export default CartScreen;

