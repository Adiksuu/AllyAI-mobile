import React from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../api/theme/colors";
import {
    EmailDisplay,
    ChangePassword,
    LogoutButton,
    DeleteAccount,
} from "../components";

const AccountManagementScreen = ({ navigation }) => {
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
                    <Text style={styles.title}>Account</Text>
                </View>

                <Text style={styles.subtitle}>
                    Manage your account settings
                </Text>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Account Information</Text>
                    <EmailDisplay />
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Security</Text>
                    <ChangePassword />
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Account Actions</Text>
                    <LogoutButton />
                    <DeleteAccount />
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
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
