import React from "react";
import {
    Image,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View
} from "react-native";
import { Vendor } from "../types";

type VendorBottomSheetProps = {
    vendor: Vendor | null;
    visible: boolean;
    onClose: () => void;
};

export const VendorBottomSheet: React.FC<VendorBottomSheetProps> = ({ vendor, visible, onClose }) => {
    if (!vendor) return null;

    return (
        <View pointerEvents={visible ? "auto" : "none"} style={[styles.overlay, !visible && { opacity: 0 }]}>
            <Pressable
                style={StyleSheet.absoluteFillObject}
                accessibilityRole="button"
                accessibilityLabel="Cerrar detalles del puesto"
                onPress={onClose}
            />
            <View style={styles.sheet}>
                <View style={styles.sheetHandle} />
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.sheetContent}
                    accessibilityRole="summary"
                >
                    {vendor.imageUrl && (
                        <Image
                            source={{ uri: vendor.imageUrl }}
                            style={styles.sheetImage}
                            resizeMode="cover"
                        />
                    )}
                    <View style={styles.sheetHeader}>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.sheetTitle}>{vendor.name}</Text>
                            <Text style={styles.sheetSubtitle}>
                                {vendor.category} · {vendor.schedule.openTime} - {vendor.schedule.closedTime}
                            </Text>
                        </View>
                        <Pressable
                            onPress={onClose}
                            style={styles.closeButton}
                            accessibilityRole="button"
                            accessibilityLabel="Cerrar"
                        >
                            <Text style={styles.closeButtonLabel}>×</Text>
                        </Pressable>
                    </View>
                    {vendor.description ? (
                        <Text style={styles.sheetDescription}>{vendor.description}</Text>
                    ) : (
                        <Text style={styles.sheetDescriptionMuted}>
                            Este puesto aún no tiene una descripción detallada.
                        </Text>
                    )}
                    <View style={styles.tagRow}>
                        <View style={styles.tag}>
                            <Text style={styles.tagText}>Categoría</Text>
                            <Text style={styles.tagValue}>{vendor.category}</Text>
                        </View>
                        <View style={styles.tag}>
                            <Text style={styles.tagText}>Horario</Text>
                            <Text style={styles.tagValue}>
                                {vendor.schedule.openTime} - {vendor.schedule.closedTime}
                            </Text>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(15, 23, 42, 0.45)",
        justifyContent: "flex-end"
    },
    sheet: {
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        backgroundColor: "#ffffff",
        paddingBottom: 28,
        paddingHorizontal: 24,
        paddingTop: 12,
        shadowColor: "#0f172a",
        shadowOffset: { width: 0, height: -6 },
        shadowOpacity: 0.1,
        shadowRadius: 18,
        elevation: 14,
        maxHeight: "65%"
    },
    sheetHandle: {
        alignSelf: "center",
        width: 44,
        height: 4,
        borderRadius: 999,
        backgroundColor: "#e2e8f0",
        marginBottom: 16
    },
    sheetContent: {
        paddingBottom: 12
    },
    sheetImage: {
        width: "100%",
        height: 160,
        borderRadius: 16,
        marginBottom: 18
    },
    sheetHeader: {
        flexDirection: "row",
        alignItems: "flex-start",
        marginBottom: 12
    },
    sheetTitle: {
        fontSize: 20,
        fontWeight: "700",
        color: "#0f172a"
    },
    sheetSubtitle: {
        marginTop: 6,
        fontSize: 13,
        color: "#64748b"
    },
    sheetDescription: {
        fontSize: 14,
        color: "#334155",
        lineHeight: 20,
        marginBottom: 16
    },
    sheetDescriptionMuted: {
        fontSize: 14,
        color: "#94a3b8",
        lineHeight: 20,
        marginBottom: 16
    },
    tagRow: {
        flexDirection: "row",
        columnGap: 12
    },
    tag: {
        flex: 1,
        backgroundColor: "#f8fafc",
        borderRadius: 16,
        paddingHorizontal: 14,
        paddingVertical: 10
    },
    tagText: {
        fontSize: 11,
        color: "#94a3b8",
        textTransform: "uppercase",
        letterSpacing: 0.6,
        marginBottom: 2
    },
    tagValue: {
        fontSize: 14,
        color: "#1e293b",
        fontWeight: "600"
    },
    closeButton: {
        marginLeft: 12,
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: "#f1f5f9",
        justifyContent: "center",
        alignItems: "center"
    },
    closeButtonLabel: {
        fontSize: 22,
        lineHeight: 22,
        color: "#475569",
        fontWeight: "600"
    }
});
