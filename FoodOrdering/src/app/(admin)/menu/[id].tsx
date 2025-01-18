import { View, Text, Image, StyleSheet, Pressable,} from 'react-native';
import { useLocalSearchParams, Stack, useRouter, Link } from 'expo-router';
import products from 'assets/data/products';
import { defaultPizzaImage } from '@/src/components/ProductListItem';
import { useState } from 'react';
import { useCart } from '@/src/providers/CartProviders';
import { PizzaSize } from '@/src/types';
import { FontAwesome } from '@expo/vector-icons';
import Colors from '@/src/constants/Colors';

const sizes: PizzaSize[] = ['S', 'M', 'L', 'XL'];

const ProductDetailScreen = () => {
  const { id } = useLocalSearchParams();
  const { addItem } = useCart();
  
  const router = useRouter();

  const [selectedSize, setSelectedSize] = useState<PizzaSize>('L');

  const product = products.find((p) => p.id.toString() === id);

  const addToCart = () => {
    if (!product) {
      return;
    }
    addItem(product, selectedSize);
    router.push('/cart');
  };

  if (!product) {
    return <Text>Product not found</Text>;
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