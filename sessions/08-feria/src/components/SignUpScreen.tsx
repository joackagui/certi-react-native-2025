import React, { useState } from "react";
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
    Pressable,
    ActivityIndicator,
    Alert
} from "react-native";
import Svg, { Path } from "react-native-svg";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { emailSignUp } from "../services/loginEmail";
import { createUserByUid } from "../services/userService";

export const SignUpScreen: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [secureEntry, setSecureEntry] = useState(true);
    const [secureConfirmEntry, setSecureConfirmEntry] = useState(true);
    const [message, setMessage] = useState<string | null>(null);
    const [messageTone, setMessageTone] = useState<"error" | "success">("error");
    const [submitting, setSubmitting] = useState(false);

    const handleSignUp = async () => {
        if (submitting) {
            return;
        }
        setMessage(null);

        const trimmedEmail = email.trim();
        if (!trimmedEmail || !password || !confirmPassword) {
            setMessageTone("error");
            setMessage("Todos los campos son obligatorios.");
            return;
        }

        if (password !== confirmPassword) {
            setMessageTone("error");
            setMessage("Las contraseñas no coinciden.");
            return;
        }

        try {
            setSubmitting(true);
            const credential = await emailSignUp(trimmedEmail, password);
            await createUserByUid({
                uid: credential.user.uid,
                email: credential.user.email ?? trimmedEmail,
                role: "client"
            });
            setMessageTone("success");
            setMessage("Cuenta creada con éxito.");
            router.replace("/map");
        } catch (error: any) {
            const errorMessage = error?.message ?? "No se pudo crear la cuenta.";
            setMessageTone("error");
            setMessage(errorMessage);
        } finally {
            setSubmitting(false);
        }
    };

    const goToLogin = () => {
        if (submitting) {
            Alert.alert("Espera", "Estamos creando tu cuenta.");
            return;
        }
        router.back();
    };

    return (
        <View style={{ flex: 1, backgroundColor: "#f9738f" }}>
            <SafeAreaView style={styles.safeArea} edges={["top"]}>
                <View style={styles.surface}>
                    <KeyboardAvoidingView
                        style={{ flex: 1 }}
                        behavior={Platform.OS === "ios" ? "padding" : undefined}
                    >
                        <ScrollView
                            style={styles.scroll}
                            contentContainerStyle={styles.content}
                            keyboardShouldPersistTaps="handled"
                            showsVerticalScrollIndicator={false}
                        >
                            <View style={styles.hero}>
                                <Svg width="100%" height="180" viewBox="0 0 375 180">
                                    <Path
                                        d="M0 0H375V120C281.667 180 93.3333 180 0 120V0Z"
                                        fill="#f9738f"
                                    />
                                </Svg>
                                <View style={styles.heroPattern} />
                            </View>
                            <View style={styles.formSection}>
                                <View style={styles.formWrapper}>
                                    <Text style={styles.title}>Crear cuenta</Text>
                                    <View style={styles.titleAccent} />
                                    <View style={styles.fieldContainer}>
                                        <Text style={styles.label}>Email</Text>
                                        <View style={styles.inputWrapper}>
                                            <Ionicons name="mail-outline" size={18} color="#f9738f" />
                                            <TextInput
                                                style={styles.input}
                                                value={email}
                                                onChangeText={setEmail}
                                                placeholder="tucorreo@email.com"
                                                placeholderTextColor="#cbd5f5"
                                                keyboardType="email-address"
                                                autoCapitalize="none"
                                                textContentType="emailAddress"
                                            />
                                        </View>
                                    </View>
                                    <View style={styles.fieldContainer}>
                                        <Text style={styles.label}>Contraseña</Text>
                                        <View style={styles.inputWrapper}>
                                            <Ionicons name="lock-closed-outline" size={18} color="#f9738f" />
                                            <TextInput
                                                style={styles.input}
                                                value={password}
                                                onChangeText={setPassword}
                                                placeholder="Crea tu contraseña"
                                                placeholderTextColor="#cbd5f5"
                                                secureTextEntry={secureEntry}
                                                textContentType="password"
                                            />
                                            <Pressable
                                                onPress={() => setSecureEntry((prev) => !prev)}
                                                hitSlop={8}
                                            >
                                                <Ionicons
                                                    name={secureEntry ? "eye-off-outline" : "eye-outline"}
                                                    size={18}
                                                    color="#f9738f"
                                                />
                                            </Pressable>
                                        </View>
                                    </View>
                                    <View style={styles.fieldContainer}>
                                        <Text style={styles.label}>Confirmar contraseña</Text>
                                        <View style={styles.inputWrapper}>
                                            <Ionicons name="shield-checkmark-outline" size={18} color="#f9738f" />
                                            <TextInput
                                                style={styles.input}
                                                value={confirmPassword}
                                                onChangeText={setConfirmPassword}
                                                placeholder="Repite tu contraseña"
                                                placeholderTextColor="#cbd5f5"
                                                secureTextEntry={secureConfirmEntry}
                                            />
                                            <Pressable
                                                onPress={() => setSecureConfirmEntry((prev) => !prev)}
                                                hitSlop={8}
                                            >
                                                <Ionicons
                                                    name={secureConfirmEntry ? "eye-off-outline" : "eye-outline"}
                                                    size={18}
                                                    color="#f9738f"
                                                />
                                            </Pressable>
                                        </View>
                                    </View>
                                    {message && (
                                        <Text
                                            style={[
                                                styles.feedback,
                                                messageTone === "error" ? styles.feedbackError : styles.feedbackSuccess
                                            ]}
                                        >
                                            {message}
                                        </Text>
                                    )}
                                    <Pressable
                                        style={[styles.actionButton, submitting && styles.actionButtonDisabled]}
                                        onPress={handleSignUp}
                                        disabled={submitting}
                                    >
                                        {submitting ? (
                                            <ActivityIndicator color="#ffffff" />
                                        ) : (
                                            <Text style={styles.actionLabel}>Crear cuenta</Text>
                                        )}
                                    </Pressable>
                                    <View style={styles.footerRow}>
                                        <Text style={styles.footerText}>¿Ya tienes una cuenta?</Text>
                                        <Pressable onPress={goToLogin}>
                                            <Text style={styles.linkPrimary}> Inicia sesión</Text>
                                        </Pressable>
                                    </View>
                                </View>
                            </View>
                        </ScrollView>
                    </KeyboardAvoidingView>
                </View>
            </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "transparent"
    },
    surface: {
        flex: 1,
        backgroundColor: "#ffffff"
    },
    scroll: {
        flex: 1,
        backgroundColor: "#ffffff"
    },
    content: {
        flexGrow: 1
    },
    hero: {
        position: "relative",
        backgroundColor: "#f9738f"
    },
    heroPattern: {
        ...StyleSheet.absoluteFillObject,
        opacity: 0.15,
        backgroundColor: "#f25d7e"
    },
    formSection: {
        flex: 1,
        flexGrow: 1,
        backgroundColor: "#ffffff",
        paddingBottom: 32
    },
    formWrapper: {
        marginTop: -36,
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        backgroundColor: "#ffffff",
        paddingHorizontal: 24,
        paddingVertical: 32,
        gap: 20
    },
    title: {
        fontSize: 28,
        fontWeight: "700",
        color: "#111827"
    },
    titleAccent: {
        width: 60,
        height: 4,
        borderRadius: 999,
        backgroundColor: "#f9738f",
        marginTop: 8
    },
    fieldContainer: {
        gap: 8
    },
    label: {
        fontSize: 15,
        fontWeight: "600",
        color: "#111827"
    },
    inputWrapper: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#fda4af",
        borderRadius: 14,
        paddingHorizontal: 12,
        paddingVertical: 10,
        backgroundColor: "#fff8f9",
        gap: 8
    },
    input: {
        flex: 1,
        fontSize: 15,
        color: "#1f2937"
    },
    feedback: {
        fontSize: 14,
        textAlign: "center"
    },
    feedbackError: {
        color: "#dc2626"
    },
    feedbackSuccess: {
        color: "#16a34a"
    },
    actionButton: {
        marginTop: 8,
        borderRadius: 999,
        backgroundColor: "#f9738f",
        paddingVertical: 14,
        alignItems: "center"
    },
    actionButtonDisabled: {
        opacity: 0.6
    },
    actionLabel: {
        fontSize: 16,
        fontWeight: "600",
        color: "#ffffff"
    },
    footerRow: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 12
    },
    footerText: {
        fontSize: 14,
        color: "#6b7280"
    },
    linkPrimary: {
        fontSize: 14,
        color: "#f9738f",
        fontWeight: "600"
    }
});
