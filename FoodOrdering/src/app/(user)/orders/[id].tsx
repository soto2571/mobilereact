import { View, Text, FlatList } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import orders from '../../../../assets/data/orders';
import OrderListItem from '@/src/components/OrderListItem';
import OrderItemListItem from '@/src/components/OrderItemListItem';



export default function OrderDetailScreen() {
    const {id} = useLocalSearchParams();

    const order = orders.find((o) => o.id.toString() === id);

    if (!order) {
        return <Text>Not Found</Text>
    }

    return (
        <View>
            <Stack.Screen options={{ title: `Order #${id}`}} />

            <FlatList 
            data={order.order_items} 
            renderItem={({ item }) => <OrderItemListItem item={item} />}
            contentContainerStyle={{ padding: 10, gap: 10 }}
            ListHeaderComponent={() => <OrderListItem order={order} />}
            />
        </View>
    );
}