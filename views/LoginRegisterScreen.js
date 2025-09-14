import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "../contexts/TranslationContext";
import { useTheme } from "../contexts/ThemeContext";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";

const LoginRegisterScreen = ({ navigation }) => {
    const { t } = useTranslation();
    const { colors } = useTheme();
    const [isLogin, setIsLogin] = useState(true);

    const handleLogin = (user) => {
        console.log("Login successful for user:", user.email);
        // Here you could store user data in context or AsyncStorage
        // For now, just navigate back
        navigation.goBack();
    };

    const handleRegister = (user) => {
        console.log("Registration successful for user:", user.email);
        // User data is already created in Firebase database
        // Here you could store user data in context or AsyncStorage
        // For now, just navigate back
        navigation.goBack();
    };


    const styles = getStyles(colors);

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <View style={styles.content}>
                <View style={styles.header}>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => navigation.goBack()}
                    >
                        <Ionicons
                            name="arrow-back"
                            size={24}
                            color={colors.text.primary}
                        />
                    </TouchableOpacity>
                </View>

                <View style={styles.titleContainer}>
                    <Text style={styles.title}>
                        {isLogin ? t("auth.title") : t("auth.registerTitle")}
                    </Text>
                    <Text style={styles.subtitle}>
                        {isLogin ? t("auth.subtitle") : t("auth.registerSubtitle")}
                    </Text>
                </View>

                <View style={styles.formContainer}>
                    {isLogin ? (
                        <LoginForm
                            onLogin={handleLogin}
                            onSwitchToRegister={() => setIsLogin(false)}
                        />
                    ) : (
                        <RegisterForm
                            onRegister={handleRegister}
                            onSwitchToLogin={() => setIsLogin(true)}
                        />
                    )}
                </View>

            </View>
        </ScrollView>
    );
};

const getStyles = (colors) =>
    StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colors.background.primary,
        },
        content: {
            flex: 1,
            padding: 20,
            paddingTop: 60,
            paddingBottom: 100, // Space for navigation bar
        },
        header: {
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 20,
        },
        backButton: {
            padding: 8,
        },
        titleContainer: {
            alignItems: "center",
            marginBottom: 40,
        },
        title: {
            fontSize: 32,
            fontWeight: "bold",
            color: colors.text.primary,
            marginBottom: 8,
            textAlign: "center",
        },
        subtitle: {
            fontSize: 18,
            color: colors.text.secondary,
            textAlign: "center",
        },
        formContainer: {
            marginBottom: 20,
        },
    });

export default LoginRegisterScreen;