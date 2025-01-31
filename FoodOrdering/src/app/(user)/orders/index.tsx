import { Text, FlatList, ActivityIndicator } from 'react-native';
import OrderListItem from '@/src/components/OrderListItem';
import { useMyOrderList } from '@/src/api/orders';
import { useInsertOrderSubscription } from '@/src/api/orders/subscriptions';

export default function OrdersScreen() {

    const { data: orders, error, isLoading } = useMyOrderList();

    if (isLoading) {
        return <ActivityIndicator />;
    }
    if (error) {
        return <Text>{error.message}</Text>;
    }

    return (
        <FlatList
            data={orders}
            renderItem={({ item }) => <OrderListItem order={item} />}
            contentContainerStyle={{ padding: 10, gap: 10 }}
        />
    );
}