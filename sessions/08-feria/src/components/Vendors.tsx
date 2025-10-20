import { FlatList } from "react-native";
import { VendorCard } from "./Vendor";
import { useVendorStore } from "../store/vendorStore";
import { Vendor } from "../types";

export const Vendors = () => {
    const vendors = useVendorStore((state) => state.vendors);

    const renderItemData = ({ item }: { item: Vendor }) => (
        <VendorCard vendor={item} />
    );

    return (
        <>
            <FlatList
                data={vendors}
                renderItem={renderItemData}
                keyExtractor={(item) => item.id}
            />
        </>
    );
};
