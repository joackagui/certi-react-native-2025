import { useMemo } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { useVendorStore } from "../store/vendorStore";
import { VendorCard } from "./Vendor";
import { Vendor } from "../types";
import { shallow } from "zustand/shallow";

export const FavoriteVendors = () => {
    const vendors = useVendorStore((state) => state.vendors, shallow);
    const favorites = useMemo(
        () => vendors.filter((vendor: Vendor) => vendor.liked),
        [vendors]
    );

    if (favorites.length === 0) {
        return (
            <View style={styles.emptyState}>
                <Text style={styles.emptyTitle}>Aún no tienes favoritos</Text>
                <Text style={styles.emptySubtitle}>
                    Explora la feria y toca el corazón para guardar tus puestos preferidos.
                </Text>
            </View>
        );
    }

    const renderItem = ({ item }: { item: Vendor }) => <VendorCard vendor={item} />;

    return (
        <FlatList
            data={favorites}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContent}
        />
    );
};

const styles = StyleSheet.create({
    emptyState: {
        flex: 1,
        paddingHorizontal: 32,
        justifyContent: "center",
        alignItems: "center"
    },
    emptyTitle: {
        fontSize: 18,
        fontWeight: "700",
        color: "#0f172a",
        marginBottom: 6
    },
    emptySubtitle: {
        fontSize: 14,
        color: "#475569",
        textAlign: "center",
        lineHeight: 20
    },
    listContent: {
        paddingVertical: 12
    }
});
