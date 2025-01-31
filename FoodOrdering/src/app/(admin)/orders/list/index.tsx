import { Text, FlatList, ActivityIndicator } from 'react-native';
import OrderListItem from '@/src/components/OrderListItem';
import { useAdminOrderList } from '@/src/api/orders';
import { supabase } from '@/src/lib/supabase';
import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useInsertOrderSubscription } from '@/src/api/orders/subscriptions';


export default function OrdersScreen() {

    const { 
        data: orders, 
        error, 
        isLoading 
    } = useAdminOrderList({ archive: false });

    useInsertOrderSubscription();

    if (isLoading) {
        return <ActivityIndicator />;
    }

    if (error) {
        return <Text>{error.message}</Text>
    }
    
    return (
        <FlatList
            data={orders}
            renderItem={({ item }) => <OrderListItem order={item} />}
            contentContainerStyle={{ padding: 10, gap: 10 }}
        />
    );
}