import React from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "../contexts/TranslationContext";
import { useTheme } from "../contexts/ThemeContext";
import {
    EmailDisplay,
    ChangePassword,
    LogoutButton,
    DeleteAccount,
    LogoutModal,
    DeleteAccountModal,
} from "../components";
import { signOut, removeAccount, getCurrentUser } from "../functions/auth";

const AccountManagementScreen = ({ navigation }) => {
    const { t } = useTranslation();
    const { colors } = useTheme();
    const [userEmail, setUserEmail] = React.useState('');
    const [showLogoutModal, setShowLogoutModal] = React.useState(false);
    const [showDeleteModal, setShowDeleteModal] = React.useState(false);

    React.useEffect(() => {
        const currentUser = getCurrentUser();
        if (currentUser && currentUser.email) {
            setUserEmail(currentUser.email);
        }
    }, []);

    const handleLogout = () => {
        setShowLogoutModal(true);
    };

    const handleLogoutConfirm = async () => {
        const result = await signOut();
        if (result.success) {
            // Navigate back to the main app - authentication state will be handled by AppContainer
            navigation.goBack();
        } else {
            Alert.alert("Error", result.error);
        }
    };

    const handleDeleteAccount = () => {
        setShowDeleteModal(true);
    };

    const handleDeleteAccountConfirm = async () => {
        const result = await removeAccount();
        if (result.success) {
            Alert.alert("Success", "Your account has been deleted.");
            // Navigate back to the main app - authentication state will be handled by AppContainer
            navigation.goBack();
        } else {
            Alert.alert("Error", result.error);
        }
    };

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
                    <EmailDisplay userEmail={userEmail} />
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
                    <LogoutButton onPress={handleLogout} />
                    <DeleteAccount onPress={handleDeleteAccount} />
                </View>
            </View>

            <LogoutModal
                visible={showLogoutModal}
                onClose={() => setShowLogoutModal(false)}
                onConfirm={handleLogoutConfirm}
            />

            <DeleteAccountModal
                visible={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={handleDeleteAccountConfirm}
            />
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
