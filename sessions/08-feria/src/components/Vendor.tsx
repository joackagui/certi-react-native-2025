import React from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { Vendor } from '../types';
import { StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useVendorStore } from '../store/vendorStore';

type VendorsProps = {
    vendor: Vendor;
}
export const VendorCard = ({vendor}: VendorsProps) => {
    const { likeVendor, dislikeVendor, vendors } = useVendorStore();
    const liked = vendors.find((item) => item.id === vendor.id)?.liked ?? false;

    const toggleLike = () => {
        if (liked) {
            dislikeVendor(vendor.id);
            return;
        }
        likeVendor(vendor.id);
    };
    
    return (
        <View style={styles.card}>
            <Image source={{ uri: vendor.imageUrl }} style={styles.image} />
            <View style={styles.content}>
                <View style={styles.headerRow}>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.name}>{vendor.name}</Text>
                        <View style={styles.categoryPill}>
                            <Text style={styles.categoryText}>{vendor.category}</Text>
                        </View>
                    </View>
                    <TouchableOpacity onPress={toggleLike} hitSlop={8}>
                        <Ionicons
                            name={liked ? 'heart' : 'heart-outline'}
                            size={24}
                            color={liked ? '#ef4444' : '#94a3b8'}
                        />
                    </TouchableOpacity>
                </View>
                <Text style={styles.description}>{vendor.description}</Text>
                <Text style={styles.schedule}>
                    Horario: {vendor.schedule.openTime} - {vendor.schedule.closedTime}
                </Text>
            </View>
        </View>
        
    )
}

const styles = StyleSheet.create({
    card: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-start',
        padding: 14,
        marginHorizontal: 16,
        marginVertical: 8,
        backgroundColor: '#ffffff',
        borderRadius: 16,
        shadowColor: '#0f172a',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
        elevation: 3,
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 12,
        marginRight: 16,
    },
    content: { flex: 1 },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 8
    },
    name: {
        fontSize: 17,
        fontWeight: '700',
        color: '#0f172a'
    },
    categoryPill: {
        alignSelf: 'flex-start',
        marginTop: 6,
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 999,
        backgroundColor: '#e0f2fe'
    },
    categoryText: {
        fontSize: 11,
        fontWeight: '600',
        color: '#0284c7',
        letterSpacing: 0.2
    },
    description: {
        fontSize: 13,
        color: '#475569',
        marginBottom: 8,
        lineHeight: 18
    },
    schedule: {
        fontSize: 12,
        color: '#0f172a',
        fontWeight: '500'
    }
});

     
