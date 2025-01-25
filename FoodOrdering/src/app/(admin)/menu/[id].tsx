import { View, Text, Image, StyleSheet, Pressable,} from 'react-native';
import { useLocalSearchParams, Stack, useRouter, Link } from 'expo-router';
import { defaultPizzaImage } from '@/src/components/ProductListItem';
import { useState } from 'react';
import { useCart } from '@/src/providers/CartProviders';
import { PizzaSize } from '@/src/types';
import { FontAwesome } from '@expo/vector-icons';
import Colors from '@/src/constants/Colors';
import { useProduct } from '@/src/api/products';
import { ActivityIndicator } from 'react-native';


const sizes: PizzaSize[] = ['S', 'M', 'L', 'XL'];

const ProductDetailScreen = () => {
  const { id: idString } = useLocalSearchParams();
  const id = parseFloat(typeof idString ===  'string' ? idString: idString[0]);

  const { data: product, error, isLoading } = useProduct(id);

  const { addItem } = useCart();
  
  const router = useRouter();

  const [selectedSize, setSelectedSize] = useState<PizzaSize>('L');


  const addToCart = () => {
    if (!product) {
      return;
    }
    addItem(product, selectedSize);
    router.push('/cart');
  };

  if (isLoading) {
    return <ActivityIndicator />;
}
  if (error) {
    return <Text>{error.message}</Text>; 
}

    return (
        <View style={styles.container}>

          <Stack.Screen 
            options={{ 
            title: 'Menu',
            headerRight: () => (
            <Link href={`/menu/create?id=${id}`} asChild>
             <Pressable>
               {({ pressed }) => (
                 <FontAwesome
                 name="pencil"
                 size={25}
                 color={Colors.light.tint}
                 style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                 />
                )}
              </Pressable>
            </Link>
            ),
          }}
        />

            <Stack.Screen options={{ title: product.name }} />
            <Image source={{ uri: product.image || defaultPizzaImage }} style={styles.image} />

           
            <Text style={styles.title}>{product.name}</Text>
            <Text style={styles.price}>${product.price}</Text>
            
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
        padding: 15,
    },
    image: {
        width: '100%',
        aspectRatio: 1,
    },
    price: {
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
    }

});

export default ProductDetailScreen;