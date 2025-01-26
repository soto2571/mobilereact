import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import OrderListItem from '@/src/components/OrderListItem';
import OrderItemListItem from '@/src/components/OrderItemListItem';
import { useOrderDetails } from '@/src/api/orders';



export default function OrderDetailScreen() {
    const { id: idString } = useLocalSearchParams();
    const id = parseFloat(typeof idString ===  'string' ? idString: idString[0]);
    const {data: order, error, isLoading} = useOrderDetails(id);

    if (isLoading) {
        return <ActivityIndicator/>;
    }

    if (error) {
        return <Text>{error.message}</Text>;
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