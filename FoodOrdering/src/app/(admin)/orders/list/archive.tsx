import { Text, FlatList, ActivityIndicator } from 'react-native';
import OrderListItem from '@/src/components/OrderListItem';
import { useAdminOrderList } from '@/src/api/orders';

export default function OrdersScreen() {

    const { data: orders, error, isLoading } = useAdminOrderList({ archive: true });

    if (isLoading) {
        return <ActivityIndicator />;
    }
    if (error) {
        return <Text>Failded to fetch</Text>
    }

    return (
        <FlatList
            data={orders}
            renderItem={({ item }) => <OrderListItem order={item} />}
            contentContainerStyle={{ padding: 10, gap: 10 }}
        />
    );
}