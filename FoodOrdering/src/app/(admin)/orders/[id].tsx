import { View, Text, FlatList, Pressable } from 'react-native';
import { useLocalSearchParams, Stack} from 'expo-router';
import orders from '../../../../assets/data/orders';
import OrderListItem from '@/src/components/OrderListItem';
import OrderItemListItem from '@/src/components/OrderItemListItem';
import Colors from '@/src/constants/Colors';
import { OrderStatusList } from '@/src/types';



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
            ListFooterComponent={() => (
                <>
                    <Text style={{ fontWeight: 'bold' }}>Status</Text>
                    <View style={{ flexDirection: 'row', gap: 5 }}>
                        {OrderStatusList.map((status) => (
                        <Pressable
                            key={status}
                            onPress={() => console.warn('Update status')}
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