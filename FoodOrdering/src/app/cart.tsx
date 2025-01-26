import { View, Text, FlatList, Platform} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useCart } from '@/src/providers/CartProviders';
import CartListItem from '@/src/components/CartListItem';
import Button from '@/src/components/Button';


const CartScreen = () => {
    const { items, total, checkout } = useCart();

    return (
        <View style={{ padding: 10 }}>
            <FlatList 
            data={items} 
            renderItem={({ item }) => <CartListItem cartItem={item} />} 
            contentContainerStyle={{ gap: 10 }}
            />

            <Text style={{ margin: 20, fontSize: 20, fontWeight: '500' }}>
                Total : ${total}
            </Text>
            <Button text='Checkout' onPress={checkout} />

            <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
        </View>
    );
};

export default CartScreen;

