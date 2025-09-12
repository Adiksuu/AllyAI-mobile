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

const ProfileScreen = () => {
    const profileItems = [
        {
            icon: "person-outline",
            title: "Personal Information",
            subtitle: "Update your details",
        },
        {
            icon: "key-outline",
            title: "Security",
            subtitle: "Password and security",
        },
        {
            icon: "card-outline",
            title: "Subscription",
            subtitle: "Manage your plan",
        },
        {
            icon: "analytics-outline",
            title: "Usage Stats",
            subtitle: "View your activity",
        },
        {
            icon: "download-outline",
            title: "Data Export",
            subtitle: "Download your data",
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
                    <Text style={styles.userName}>AllyAI User</Text>
                    <Text style={styles.userEmail}>user@allyai.com</Text>
                </View>

                <View style={styles.statsContainer}>
                    <View style={styles.statItem}>
                        <Text style={styles.statNumber}>42</Text>
                        <Text style={styles.statLabel}>Conversations</Text>
                    </View>
                    <View style={styles.statItem}>
                        <Text style={styles.statNumber}>1.2K</Text>
                        <Text style={styles.statLabel}>Messages</Text>
                    </View>
                    <View style={styles.statItem}>
                        <Text style={styles.statNumber}>7</Text>
                        <Text style={styles.statLabel}>Days Active</Text>
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

                <TouchableOpacity style={styles.logoutButton}>
                    <Ionicons
                        name="log-out-outline"
                        size={24}
                        color={colors.status.error}
                    />
                    <Text style={styles.logoutText}>Sign Out</Text>
                </TouchableOpacity>
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
    logoutButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
        backgroundColor: colors.background.card,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: colors.border.primary,
    },
    logoutText: {
        fontSize: 16,
        fontWeight: "600",
        color: colors.status.error,
        marginLeft: 8,
    },
});

export default ProfileScreen;
