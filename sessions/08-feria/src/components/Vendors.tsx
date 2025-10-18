import { FlatList } from "react-native"
import { VENDORS } from "../data/vendors"
import { VendorCard } from "./Vendor"

export const Vendors = () => {
    const renderItemData = ({item}: {item: typeof VENDORS[0]}) => (
        <VendorCard vendor={item} />
    )

    return (
        <>
            <FlatList
                data={VENDORS}
                renderItem={renderItemData}
                keyExtractor={item => item.id}
            />
        </>
    )
}