import React from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "../contexts/TranslationContext";
import { useTheme } from "../contexts/ThemeContext";
import {
    EmailDisplay,
    ChangePassword,
    LogoutButton,
    DeleteAccount,
} from "../components";

const AccountManagementScreen = ({ navigation }) => {
    const { t } = useTranslation();
    const { colors } = useTheme();

    const styles = getStyles(colors);

    return (
        <ScrollView style={styles.container}>
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
                    <Text style={styles.title}>
                        {t("accountManagement.title")}
                    </Text>
                </View>

                <Text style={styles.subtitle}>
                    {t("accountManagement.subtitle")}
                </Text>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>
                        {t("accountManagement.accountInfo")}
                    </Text>
                    <EmailDisplay />
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>
                        {t("accountManagement.security")}
                    </Text>
                    <ChangePassword />
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>
                        {t("accountManagement.accountActions")}
                    </Text>
                    <LogoutButton />
                    <DeleteAccount />
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
            marginRight: 16,
            padding: 8,
        },
        title: {
            fontSize: 32,
            fontWeight: "bold",
            color: colors.text.primary,
        },
        subtitle: {
            fontSize: 18,
            color: colors.text.secondary,
            marginBottom: 30,
        },
        section: {
            marginBottom: 30,
        },
        sectionTitle: {
            fontSize: 20,
            fontWeight: "600",
            color: colors.text.primary,
            marginBottom: 16,
        },
    });

export default AccountManagementScreen;
