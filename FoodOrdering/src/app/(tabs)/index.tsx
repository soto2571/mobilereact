import {View} from 'react-native';
import products from '../../../assets/data/products';
import ProductListItme from '../../components/ProductListItem';

export default function MenuScreen() {
  return (
    <View>
      <ProductListItme product={products[0]} />
      <ProductListItme product={products[1]} />
    </View>
  );
};

