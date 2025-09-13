import React from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "../contexts/TranslationContext";
import { useTheme } from "../contexts/ThemeContext";

const { width } = Dimensions.get("window");

const NavigationBar = ({ activeTab, onTabPress }) => {
    const { t } = useTranslation();
    const { colors } = useTheme();

    const tabs = [
        {
            id: "home",
            label: t("navigation.home"),
            icon: "home-outline",
            activeIcon: "home",
        },
        {
            id: "chat",
            label: t("navigation.chat"),
            icon: "chatbubble-outline",
            activeIcon: "chatbubble",
        },
        {
            id: "settings",
            label: t("navigation.settings"),
            icon: "settings-outline",
            activeIcon: "settings",
        },
        {
            id: "profile",
            label: t("navigation.profile"),
            icon: "person-outline",
            activeIcon: "person",
        },
    ];

    const styles = getStyles(colors);

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

const getStyles = (colors) =>
    StyleSheet.create({
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
