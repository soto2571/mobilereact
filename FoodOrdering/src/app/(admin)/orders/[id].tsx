import { View, Text, FlatList, Pressable, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, Stack} from 'expo-router';
import OrderListItem from '@/src/components/OrderListItem';
import OrderItemListItem from '@/src/components/OrderItemListItem';
import Colors from '@/src/constants/Colors';
import { OrderStatusList } from '@/src/types';
import { useOrderDetails, useUpdateOrder} from '@/src/api/orders';


export default function OrderDetailScreen() {
    const { id: idString } = useLocalSearchParams();
    const id = parseFloat(typeof idString ===  'string' ? idString: idString[0]);
    
    const {data: order, error, isLoading} = useOrderDetails(id);
    const { mutate: updateOrder } = useUpdateOrder();

    const updateStatus = (status: string) => {
        updateOrder({id: id, updatedFields: { status }});
    }

    if (isLoading) {
        return <ActivityIndicator/>;
    }

    if (error || !order) {
        return <Text>Failed to fetch</Text>;
    }

    return (
        <View>
            <Stack.Screen options={{ title: `Order #${id}`}} />

            <FlatList 
            data={order.order_items} 
            renderItem={({ item }) => <OrderItemListItem item={item} />}
            contentContainerStyle={{ padding: 10, gap: 10 }}
            ListHeaderComponent={() => <OrderListItem order={order} />}
            ListFooterComponent={() => (
                <>
                    <Text style={{ fontWeight: 'bold' }}>Status</Text>
                    <View style={{ flexDirection: 'row', gap: 5 }}>
                        {OrderStatusList.map((status) => (
                        <Pressable
                            key={status}
                            onPress={() => updateStatus(status)}
                            style={{
                            borderColor: Colors.light.tint,
                            borderWidth: 1,
                            padding: 10,
                            borderRadius: 5,
                            marginVertical: 10,
                            backgroundColor:
                                order.status === status
                                ? Colors.light.tint
                                : 'transparent',
                            }}
                        >
                            <Text
                            style={{
                                color:
                                order.status === status ? 'white' : Colors.light.tint,
                            }}
                            >
                            {status}
                            </Text>
                        </Pressable>
                        ))}
                    </View>
                    </>

            )}
            />
        </View>
    );
}