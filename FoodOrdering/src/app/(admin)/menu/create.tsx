import { Text, View, StyleSheet, TextInput, Image, Alert } from 'react-native'
import Button from '../../../components/Button'
import { useEffect, useState } from 'react'
import { defaultPizzaImage } from '../../../components/ProductListItem'
import Colors from '../../../constants/Colors'
import * as ImagePicker from 'expo-image-picker'
import { Stack, useLocalSearchParams } from 'expo-router'
import { useInsertProduct, useProduct, useUpdateProduct } from '@/src/api'
import { useRouter } from 'expo-router'


const CreateProductScreen = () => {
const [name, setName] = useState('');
const [price, setPrice] = useState('');
const [errors, setErrors] = useState('');
const [image, setImage] = useState<string | null>(null);

const { id: idString } = useLocalSearchParams();
const id = parseFloat(typeof idString === 'string' ? idString : idString[0]);

const isUpdating = !!id;

const { mutate: insertProduct } = useInsertProduct();
const { mutate: updateProduct } = useUpdateProduct();
const { data: updatingProduct } = useProduct(id);


const router = useRouter();

useEffect(() => {
    if (updatingProduct) {
        setName(updatingProduct.name);
        setPrice(updatingProduct.price.toString());
        setImage(updatingProduct.image);
    }
}, [updatingProduct]);

const resetFields = () => {
    setName('');
    setPrice('');
};

const validateInput = () => {
    setErrors('');
    if (!name) {
        setErrors('Name is required');
        return false;
    }
    if (!price) {
        setErrors('Price is required');
        return false;
    }

    if (isNaN(parseFloat(price))){
        setErrors('Price is invalid');
        return false;
    }
    return true;
 };

const onSubmit = () => {
    if (isUpdating) {
        onUpdate();
    } else {
        onCreate();
    }
    }

const onCreate = () => {
    if (!validateInput()) {
        return;
    }
    insertProduct({ name, price: parseFloat(price), image }, {
        onSuccess: () => {
         resetFields();
         router.back();
        }
    }); 
};

const onUpdate = () => {
    if (!validateInput()) {
        return;
    }
updateProduct({ id, name, price: parseFloat(price), image }, {
        onSuccess: () => {
            resetFields();
            router.back();
        }
    });
};

const confirmDelete = () => {
    Alert.alert("Confirm", "Are you sure you want to delete this product?", [
        {
            text: 'Cancel',
            style: 'cancel',
        },
        {
            text: 'Delete',
            style: 'destructive',
            onPress: onDelete,
        },
    ]);
}

const onDelete = () => {
    console.warn('DELETE!!!!!!')}


const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
    })

    if (!result.canceled){
        setImage(result.assets[0].uri);
    
    }
};

    return (
        <View style={styles.container}>
            <Stack.Screen options={{ title: isUpdating ? 'Update Product' : 'Create Product'} }/>
        
            <Image 
            source={{ uri: image || defaultPizzaImage }} 
            style={styles.image} />
            <Text onPress={pickImage} style={styles.textButton}>
                select image
            </Text>

            <Text style={styles.label}>create</Text>
            <TextInput 
            value={name}
            placeholder='Name' 
            onChangeText={setName}
            style={styles.input}
            
            />

            <Text style={styles.label}>Price ($)</Text>
            <TextInput 
            placeholder='9.99' 
            style={styles.input}
            keyboardType="numeric"
            value={price}
            onChangeText={setPrice}
            />


            <Text style={{ color: 'red'}}>{errors}</Text>
            <Button onPress={onSubmit} text={isUpdating ? "Update" : "Create"} />
            {isUpdating && (
                <Text onPress={confirmDelete} style={styles.textButton}>
                    Delete
                </Text>
            )}
        </View>
    
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 10,
    },

    input: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
        marginTop: 5,
        marginBottom: 5,
    },
    label: {
        fontSize: 16,
        color: 'gray',
    },
    image: {
        width: '50%',
        aspectRatio: 1,
        alignSelf: 'center',
    },
    textButton: {
        alignSelf: 'center',
        fontWeight: 'bold',
        color: Colors.light.tint,
        marginVertical: 10,
    }
})

export default CreateProductScreen