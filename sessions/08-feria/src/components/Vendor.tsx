import React from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { VENDORS} from '../data/vendors';
import { Vendor } from '../types';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useVendorStore } from '../store/vendorStore';

type VendorsProps = {
    vendor: Vendor;
}
export const VendorCard = ({vendor}: VendorsProps) => {
    const { likeVendor} = useVendorStore();
    
    const handlePress = () => {
        console.log(`Liked vendor with id: ${vendor.id}`);
        likeVendor(vendor.id);
    }

    
    return (
        <View style={styles.container}>
            
            <Image source={{ uri: vendor.imageUrl }} style={styles.image} />
            
            <View style={{flex: 1, alignItems: 'center'}}>
                <Text style={styles.name}>{vendor.name}</Text>
            <Text style={styles.description}>{vendor.description}</Text>
            <Text style={styles.description}>{vendor.lat}</Text>
            <TouchableOpacity 
                onPress={handlePress}
                style={{position: 'absolute', top: 0, right: 0}}
            >
                <Ionicons name="heart" size={24} color={vendor.liked ? "red" : "gray"} style={styles.heart}  />
            </TouchableOpacity>
            </View>
        </View>
        
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        marginHorizontal: 16,
        marginVertical: 8,
        backgroundColor: '#f9f9f9',
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
    },
    description: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
        marginTop: 5,
    },
    heart:{
        position: 'absolute',
        top: 10,
        right: 20,
    }
});

     