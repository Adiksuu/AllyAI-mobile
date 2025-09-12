import React from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../api/theme/colors";

const { width } = Dimensions.get("window");

const NavigationBar = ({ activeTab, onTabPress }) => {
    const tabs = [
        { id: "home", label: "Home", icon: "home-outline", activeIcon: "home" },
        {
            id: "chat",
            label: "Chat",
            icon: "chatbubble-outline",
            activeIcon: "chatbubble",
        },
        {
            id: "settings",
            label: "Settings",
            icon: "settings-outline",
            activeIcon: "settings",
        },
        {
            id: "profile",
            label: "Profile",
            icon: "person-outline",
            activeIcon: "person",
        },
    ];

    return (
        <View style={styles.container}>
            <View style={styles.navBar}>
                {tabs.map((tab) => (
                    <TouchableOpacity
                        key={tab.id}
                        style={[
                            styles.tab,
                            activeTab === tab.id && styles.activeTab,
                        ]}
                        onPress={() => onTabPress(tab.id)}
                        activeOpacity={0.7}
                    >
                        <Ionicons
                            name={
                                activeTab === tab.id ? tab.activeIcon : tab.icon
                            }
                            size={24}
                            color={
                                activeTab === tab.id
                                    ? colors.accent.lightBlue
                                    : colors.text.muted
                            }
                        />
                        <Text
                            style={[
                                styles.tabLabel,
                                activeTab === tab.id && styles.activeTabLabel,
                            ]}
                        >
                            {tab.label}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: colors.navigation.background,
    },
    navBar: {
        flexDirection: "row",
        height: 70,
        paddingHorizontal: 10,
        paddingTop: 8,
        paddingBottom: 8,
    },
    tab: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 8,
        borderRadius: 8,
        marginHorizontal: 2,
    },
    activeTab: {
        backgroundColor: colors.background.secondary,
    },
    tabLabel: {
        fontSize: 12,
        color: colors.text.muted,
        marginTop: 4,
        fontWeight: "500",
    },
    activeTabLabel: {
        color: colors.accent.lightBlue,
        fontWeight: "600",
    },
});

export default NavigationBar;
