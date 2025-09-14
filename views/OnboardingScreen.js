import React, { useState, useRef } from "react";
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Dimensions,
    Image,
    TouchableOpacity,
    Animated,
} from "react-native";
import { useTheme } from "../contexts/ThemeContext";
import { useTranslation } from "../contexts/TranslationContext";
import ThemeModal from "../components/ThemeModal";
import LanguageModal from "../components/LanguageModal";

const { width, height } = Dimensions.get("window");

const OnboardingScreen = ({ onComplete }) => {
    const { colors, currentTheme, changeTheme } = useTheme();
    const { t, currentLanguage, changeLanguage } = useTranslation();

    const handleThemeSelect = async (theme) => {
        await changeTheme(theme.code);
    };

    const handleLanguageSelect = async (language) => {
        await changeLanguage(language.code);
    };
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showThemeModal, setShowThemeModal] = useState(false);
    const [showLanguageModal, setShowLanguageModal] = useState(false);
    const flatListRef = useRef(null);
    const fadeAnim = useRef(new Animated.Value(1)).current;
    const slideAnim = useRef(new Animated.Value(0)).current;

    const slides = [
        {
            id: 1,
            title: t("onboarding.slide1.title"),
            subtitle: t("onboarding.slide1.subtitle"),
            description: t("onboarding.slide1.description"),
        },
        {
            id: 2,
            title: t("onboarding.slide2.title"),
            subtitle: t("onboarding.slide2.subtitle"),
            description: t("onboarding.slide2.description"),
            hasButtons: true,
        },
        {
            id: 3,
            title: t("onboarding.slide3.title"),
            subtitle: t("onboarding.slide3.subtitle"),
            description: t("onboarding.slide3.description"),
        },
    ];

    const handleScroll = (event) => {
        const scrollPosition = event.nativeEvent.contentOffset.x;
        const index = Math.round(scrollPosition / width);
        if (index !== currentIndex) {
            animateTransition(index);
            setCurrentIndex(index);
        }
    };

    const animateTransition = (newIndex) => {
        Animated.sequence([
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 150,
                useNativeDriver: true,
            }),
            Animated.timing(slideAnim, {
                toValue: newIndex > currentIndex ? -50 : 50,
                duration: 0,
                useNativeDriver: true,
            }),
            Animated.parallel([
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true,
                }),
                Animated.timing(slideAnim, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: true,
                }),
            ]),
        ]).start();
    };

    const goToNext = () => {
        if (currentIndex < slides.length - 1) {
            flatListRef.current?.scrollToIndex({
                index: currentIndex + 1,
                animated: true,
            });
        } else {
            onComplete();
        }
    };

    const skipOnboarding = () => {
        onComplete();
    };

    const renderSlide = ({ item }) => (
        <View style={[styles.slide, { width }]}>
            <View style={styles.logoContainer}>
                <Image
                    source={require("../assets/images/logo.png")}
                    style={styles.logo}
                    resizeMode="contain"
                />
            </View>

            <Animated.View
                style={[
                    styles.content,
                    {
                        opacity: fadeAnim,
                        transform: [{ translateX: slideAnim }],
                    },
                ]}
            >
                <Text style={[styles.title, { color: colors.text.primary }]}>
                    {item.title}
                </Text>
                <Text style={[styles.subtitle, { color: colors.accent.lightBlue }]}>
                    {item.subtitle}
                </Text>
                <Text style={[styles.description, { color: colors.text.secondary }]}>
                    {item.description}
                </Text>

                {item.hasButtons && (
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={[styles.customButton, { borderColor: colors.border.primary }]}
                            onPress={() => setShowThemeModal(true)}
                        >
                            <Text style={[styles.buttonText, { color: colors.text.primary }]}>
                                {t("onboarding.slide2.themeButton")}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.customButton, { borderColor: colors.border.primary }]}
                            onPress={() => setShowLanguageModal(true)}
                        >
                            <Text style={[styles.buttonText, { color: colors.text.primary }]}>
                                {t("onboarding.slide2.languageButton")}
                            </Text>
                        </TouchableOpacity>
                    </View>
                )}
            </Animated.View>
        </View>
    );

    const renderPagination = () => (
        <View style={styles.pagination}>
            {slides.map((_, index) => (
                <View
                    key={index}
                    style={[
                        styles.dot,
                        {
                            backgroundColor:
                                index === currentIndex
                                    ? colors.accent.lightBlue
                                    : colors.border.secondary,
                        },
                    ]}
                />
            ))}
        </View>
    );

    const renderFooter = () => (
        <View style={styles.footer}>
            <TouchableOpacity onPress={skipOnboarding}>
                <Text style={[styles.skipText, { color: colors.text.secondary }]}>
                    {t("onboarding.skip")}
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.nextButton, { backgroundColor: colors.accent.lightBlue }]}
                onPress={goToNext}
            >
                <Text style={[styles.nextButtonText, { color: colors.text.primary }]}>
                    {currentIndex === slides.length - 1
                        ? t("onboarding.done")
                        : t("onboarding.next")}
                </Text>
            </TouchableOpacity>
        </View>
    );

    const styles = getStyles(colors);

    return (
        <View style={[styles.container, { backgroundColor: colors.background.primary }]}>
            <FlatList
                ref={flatListRef}
                data={slides}
                renderItem={renderSlide}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onScroll={handleScroll}
                scrollEventThrottle={16}
                keyExtractor={(item) => item.id.toString()}
            />

            {renderPagination()}
            {renderFooter()}

            <ThemeModal
                visible={showThemeModal}
                onClose={() => setShowThemeModal(false)}
                onThemeSelect={handleThemeSelect}
                currentTheme={currentTheme}
            />

            <LanguageModal
                visible={showLanguageModal}
                onClose={() => setShowLanguageModal(false)}
                onLanguageSelect={handleLanguageSelect}
                currentLanguage={currentLanguage}
            />
        </View>
    );
};

const getStyles = (colors) =>
    StyleSheet.create({
        container: {
            flex: 1,
        },
        slide: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: 40,
        },
        logoContainer: {
            alignItems: "center",
            marginBottom: 30,
        },
        logo: {
            width: 120,
            height: 120,
        },
        content: {
            alignItems: "center",
            maxWidth: width * 0.8,
        },
        title: {
            fontSize: 32,
            fontWeight: "bold",
            textAlign: "center",
            // marginBottom: 16,
        },
        subtitle: {
            fontSize: 20,
            fontWeight: "600",
            textAlign: "center",
            marginBottom: 24,
        },
        description: {
            fontSize: 16,
            textAlign: "center",
            lineHeight: 24,
            // marginBottom: 40,
        },
        buttonContainer: {
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
            marginTop: 20,
        },
        customButton: {
            flex: 1,
            paddingVertical: 12,
            paddingHorizontal: 20,
            borderRadius: 8,
            borderWidth: 1,
            marginHorizontal: 8,
            alignItems: "center",
        },
        buttonText: {
            fontSize: 14,
            fontWeight: "600",
        },
        pagination: {
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            bottom: 120,
            left: 0,
            right: 0,
        },
        dot: {
            width: 8,
            height: 8,
            borderRadius: 4,
            marginHorizontal: 4,
        },
        footer: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            position: "absolute",
            bottom: 50,
            left: 40,
            right: 40,
        },
        skipText: {
            fontSize: 16,
            fontWeight: "500",
        },
        nextButton: {
            paddingVertical: 12,
            paddingHorizontal: 24,
            borderRadius: 25,
            minWidth: 100,
            alignItems: "center",
        },
        nextButtonText: {
            fontSize: 16,
            fontWeight: "600",
        },
    });

export default OnboardingScreen;