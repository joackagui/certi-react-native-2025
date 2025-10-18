import React from 'react';
import { View, Text } from 'react-native';
import { Vendors } from '../../src/components/Vendors';
import { SafeAreaView } from 'react-native-safe-area-context';

const StoreScreen = () => {
    return (
        <SafeAreaView>
            <Vendors />
        </SafeAreaView>
    );
}
export default StoreScreen;