import React, { useEffect, useState } from 'react';
import { Vendors } from '../../src/components/Vendors';
import { SafeAreaView } from 'react-native-safe-area-context';
import { fetchVendors, subscribeVendors } from '../../src/services/vendorService';

const StoreScreen = () => {
    const [vendorsTR, setVendorsTR] = useState([]);
    const fetchValues = async () =>{
        const vendors = await fetchVendors();
        console.log(JSON.stringify(vendors));
    }
    useEffect(()=>{
      fetchValues();
      const unSub = subscribeVendors( rows => {
        setVendorsTR(rows as any)
      });
     
      return () => unSub();
    }, []) 
    console.log('timereal', JSON.stringify(vendorsTR));
    return (
        <SafeAreaView>
            <Vendors />
        </SafeAreaView>
    );
}
export default StoreScreen;