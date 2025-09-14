import React, { useEffect } from "react";
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
import PremiumModal from "../components/PremiumModal";
import { onAuthStateChanged, getCurrentUser } from "../functions/auth";
import { getUserStats } from "../functions/stats";

const ProfileScreen = ({ navigation, isAuthenticated }) => {
    const { t } = useTranslation();
    const { colors } = useTheme();
    const [showPremiumModal, setShowPremiumModal] = React.useState(false);
    const [userEmail, setUserEmail] = React.useState('');
    const [stats, setStats] = React.useState({ conversations: 0, tokens: 0, tokenLimit: 75, resetAt: null });

    const profileItems = [
        {
            icon: "card-outline",
            title: t("profile.subscription"),
            subtitle: t("profile.subscriptionSubtitle"),
        },
        {
            icon: "download-outline",
            title: t("profile.dataExport"),
            subtitle: t("profile.dataExportSubtitle"),
        },
    ];

    const loggedOutItems = [
        {
            icon: "log-in-outline",
            title: t("profile.login"),
            subtitle: t("profile.loginSubtitle"),
            action: "navigateToLogin",
        }
    ]

    const styles = getStyles(colors);

    // Note: Authentication state is now handled globally in AppContainer
    // This screen will receive the authentication state through props or context

    React.useEffect(() => {
        const currentUser = getCurrentUser();
        if (currentUser && currentUser.email) {
            setUserEmail(currentUser.email);
        }
    }, []);

    React.useEffect(() => {
        const fetchStats = async () => {
            const currentUser = getCurrentUser();
            if (currentUser && currentUser.uid) {
                const userStats = await getUserStats(currentUser.uid);
                setStats(userStats);
            }
        };
        if (isAuthenticated) {
            fetchStats();
        }
    }, [isAuthenticated]);

    const handleSubscriptionPress = () => {
        setShowPremiumModal(true);
    };

    const formatResetTime = (resetAt) => {
        if (!resetAt) return 'Unknown';
        const now = new Date();
        const reset = new Date(resetAt);
        const diff = reset - now;
        if (diff <= 0) return 'Now';
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        return `in ${hours}h ${minutes}m`;
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.content}>
                <View style={styles.profileHeader}>
                    <View style={styles.avatar}>
                        <Ionicons
                            name="person"
                            size={40}
                            color={colors.accent.lightBlue}
                        />
                    </View>
                    <Text style={styles.userName}>{t("profile.userName")}</Text>
                    <Text style={styles.userEmail}>
                        {isAuthenticated && userEmail ? userEmail : t("profile.userEmail")}
                    </Text>
                </View>

                {isAuthenticated && <View style={styles.statsContainer}>
                    <View style={styles.statItem}>
                        <Text style={styles.statNumber}>{stats.conversations}</Text>
                        <Text style={styles.statLabel}>
                            {t("profile.conversations")}
                        </Text>
                    </View>
                    <View style={styles.statItem}>
                        <Text style={styles.statNumber}>{stats.tokens}/{stats.tokenLimit}</Text>
                        <Text style={styles.statLabel}>
                            {t("profile.tokens")}
                        </Text>
                    </View>
                    <View style={styles.statItem}>
                        <Text style={styles.statNumber}>{formatResetTime(stats.resetAt)}</Text>
                        <Text style={styles.statLabel}>
                            {t("profile.tokenRefresh")}
                        </Text>
                    </View>
                </View>}

                {isAuthenticated ? <View style={styles.menuList}>
                     {profileItems.map((item, index) => (
                         <TouchableOpacity
                             key={index}
                             style={styles.menuItem}
                             onPress={
                                 index === 0
                                     ? handleSubscriptionPress
                                     : undefined
                             }
                         >
                             <View style={styles.menuIcon}>
                                 <Ionicons
                                     name={item.icon}
                                     size={24}
                                     color={colors.accent.lightBlue}
                                 />
                             </View>
                             <View style={styles.menuContent}>
                                 <Text style={styles.menuTitle}>
                                     {item.title}
                                 </Text>
                                 <Text style={styles.menuSubtitle}>
                                     {item.subtitle}
                                 </Text>
                             </View>
                             <Ionicons
                                 name="chevron-forward"
                                 size={20}
                                 color={colors.text.muted}
                             />
                         </TouchableOpacity>
                     ))}
                 </View> : <View style={styles.menuList}>
                     {loggedOutItems.map((item, index) => (
                         <TouchableOpacity
                             key={index}
                             style={styles.menuItem}
                             onPress={() => {
                                 if (item.action === "navigateToLogin") {
                                     navigation.navigate("LoginRegister");
                                 }
                             }}
                         >
                             <View style={styles.menuIcon}>
                                 <Ionicons
                                     name={item.icon}
                                     size={24}
                                     color={colors.accent.lightBlue}
                                 />
                             </View>
                             <View style={styles.menuContent}>
                                 <Text style={styles.menuTitle}>
                                     {item.title}
                                 </Text>
                                 <Text style={styles.menuSubtitle}>
                                     {item.subtitle}
                                 </Text>
                             </View>
                             <Ionicons
                                 name="chevron-forward"
                                 size={20}
                                 color={colors.text.muted}
                             />
                         </TouchableOpacity>
                     ))}
                 </View>}
            </View>
            <PremiumModal
                visible={showPremiumModal}
                onClose={() => setShowPremiumModal(false)}
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
        profileHeader: {
            alignItems: "center",
            marginBottom: 30,
        },
        avatar: {
            width: 80,
            height: 80,
            borderRadius: 40,
            backgroundColor: colors.background.secondary,
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 16,
            borderWidth: 2,
            borderColor: colors.accent.lightBlue,
        },
        userName: {
            fontSize: 24,
            fontWeight: "bold",
            color: colors.text.primary,
            marginBottom: 4,
        },
        userEmail: {
            fontSize: 16,
            color: colors.text.secondary,
        },
        statsContainer: {
            flexDirection: "row",
            justifyContent: "space-around",
            backgroundColor: colors.background.card,
            padding: 20,
            borderRadius: 12,
            borderWidth: 1,
            borderColor: colors.border.primary,
            marginBottom: 20,
        },
        statItem: {
            alignItems: "center",
        },
        statNumber: {
            fontSize: 24,
            fontWeight: "bold",
            color: colors.accent.lightBlue,
            marginBottom: 4,
        },
        statLabel: {
            fontSize: 12,
            color: colors.text.secondary,
            textAlign: "center",
        },
        menuList: {
            backgroundColor: colors.background.card,
            borderRadius: 12,
            borderWidth: 1,
            borderColor: colors.border.primary,
            marginBottom: 20,
        },
        menuItem: {
            flexDirection: "row",
            alignItems: "center",
            padding: 16,
            borderBottomWidth: 1,
            borderBottomColor: colors.border.secondary,
        },
        menuIcon: {
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: colors.background.secondary,
            alignItems: "center",
            justifyContent: "center",
            marginRight: 16,
        },
        menuContent: {
            flex: 1,
        },
        menuTitle: {
            fontSize: 16,
            fontWeight: "600",
            color: colors.text.primary,
            marginBottom: 2,
        },
        menuSubtitle: {
            fontSize: 14,
            color: colors.text.secondary,
        },
    });

export default ProfileScreen;
