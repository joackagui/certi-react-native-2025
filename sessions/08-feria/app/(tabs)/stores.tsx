import React, { useEffect } from 'react';
import { Vendors } from '../../src/components/Vendors';
import { SafeAreaView } from 'react-native-safe-area-context';
import { fetchVendors } from '../../src/services/vendorService';

const StoreScreen = () => {
    const fetchValues = async () =>{
        const vendors = await fetchVendors();
        console.log(JSON.stringify(vendors));
    }
    useEffect(()=>{
      fetchValues();
    }, []) 
    return (
        <SafeAreaView>
            <Vendors />
        </SafeAreaView>
    );
}
export default StoreScreen;