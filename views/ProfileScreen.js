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
import { useTranslation } from "../contexts/TranslationContext";

const ProfileScreen = () => {
    const { t } = useTranslation();

    const profileItems = [
        {
            icon: "person-outline",
            title: t("profile.personalInfo"),
            subtitle: t("profile.personalInfoSubtitle"),
        },
        {
            icon: "key-outline",
            title: t("profile.security"),
            subtitle: t("profile.securitySubtitle"),
        },
        {
            icon: "card-outline",
            title: t("profile.subscription"),
            subtitle: t("profile.subscriptionSubtitle"),
        },
        {
            icon: "analytics-outline",
            title: t("profile.usageStats"),
            subtitle: t("profile.usageStatsSubtitle"),
        },
        {
            icon: "download-outline",
            title: t("profile.dataExport"),
            subtitle: t("profile.dataExportSubtitle"),
        },
    ];

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
                        {t("profile.userEmail")}
                    </Text>
                </View>

                <View style={styles.statsContainer}>
                    <View style={styles.statItem}>
                        <Text style={styles.statNumber}>42</Text>
                        <Text style={styles.statLabel}>
                            {t("profile.conversations")}
                        </Text>
                    </View>
                    <View style={styles.statItem}>
                        <Text style={styles.statNumber}>1.2K</Text>
                        <Text style={styles.statLabel}>
                            {t("profile.messages")}
                        </Text>
                    </View>
                    <View style={styles.statItem}>
                        <Text style={styles.statNumber}>7</Text>
                        <Text style={styles.statLabel}>
                            {t("profile.daysActive")}
                        </Text>
                    </View>
                </View>

                <View style={styles.menuList}>
                    {profileItems.map((item, index) => (
                        <TouchableOpacity key={index} style={styles.menuItem}>
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
