import { useInsertOrderSubscription } from '@/src/api/orders/subscriptions';
import ProductListItem from '../../../components/ProductListItem';
import { useProductList } from '@/src/api/products';
import { ActivityIndicator, Text, FlatList } from 'react-native';


export default function MenuScreen() {

  const { data: products, error, isLoading} = useProductList();
  useInsertOrderSubscription();

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>{error.message}</Text>
  }

  return (
      <FlatList 
      data={products}
      renderItem={({ item }) => <ProductListItem product={item} />}
      numColumns={2}
      contentContainerStyle={{ gap: 10, padding: 10 }}
      columnWrapperStyle={{ gap: 10 }}
      />    
  );
};

