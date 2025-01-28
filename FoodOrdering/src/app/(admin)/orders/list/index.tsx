import { Text, FlatList, ActivityIndicator } from 'react-native';
import OrderListItem from '@/src/components/OrderListItem';
import { useAdminOrderList } from '@/src/api/orders';
import { supabase } from '@/src/lib/supabase';
import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';

export default function OrdersScreen() {

    const { 
        data: orders, 
        error, 
        isLoading 
    } = useAdminOrderList({ archive: false });

    const queryClient = useQueryClient();

    useEffect(() => {
        const orders = supabase
        
    const channels = supabase.channel('custom-insert-channel')
    .on(
    'postgres_changes',
    { event: 'INSERT', schema: 'public', table: 'orders' },
    (payload) => {
        console.log('Change received!', payload);
        queryClient.invalidateQueries(['orders']);
    }
    )
    .subscribe();
}, []);

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