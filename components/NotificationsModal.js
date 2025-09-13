import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Modal,
    Animated,
    Dimensions,
    PanResponder,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../api/theme/colors";

const { height: screenHeight } = Dimensions.get("window");

const NotificationsModal = ({ visible, onClose, onEnable }) => {
    const slideAnim = React.useRef(new Animated.Value(screenHeight)).current;
    const isDragging = React.useRef(false);

    React.useEffect(() => {
        if (visible) {
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }).start();
        } else {
            Animated.timing(slideAnim, {
                toValue: screenHeight,
                duration: 300,
                useNativeDriver: true,
            }).start();
        }
    }, [visible, slideAnim]);

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: (_, gestureState) => {
            // Only respond to downward swipes
            return gestureState.dy > 0;
        },
        onPanResponderGrant: () => {
            isDragging.current = true;
            slideAnim.setOffset(slideAnim._value);
            slideAnim.setValue(0);
        },
        onPanResponderMove: (_, gestureState) => {
            // Only allow downward movement
            if (gestureState.dy > 0) {
                slideAnim.setValue(gestureState.dy);
            }
        },
        onPanResponderRelease: (_, gestureState) => {
            isDragging.current = false;
            slideAnim.flattenOffset();

            const shouldClose = gestureState.dy > 100 || gestureState.vy > 0.5;

            if (shouldClose) {
                // Close the modal
                Animated.timing(slideAnim, {
                    toValue: screenHeight,
                    duration: 200,
                    useNativeDriver: true,
                }).start(() => {
                    onClose();
                });
            } else {
                // Snap back to original position
                Animated.spring(slideAnim, {
                    toValue: 0,
                    tension: 100,
                    friction: 8,
                    useNativeDriver: true,
                }).start();
            }
        },
    });

    const handleEnable = () => {
        onEnable();
        onClose();
    };

    const handleNotNow = () => {
        onClose();
    };

    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType="none"
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>
                <TouchableOpacity
                    style={styles.backdrop}
                    activeOpacity={1}
                    onPress={onClose}
                />
                <Animated.View
                    style={[
                        styles.modal,
                        {
                            transform: [{ translateY: slideAnim }],
                        },
                    ]}
                    {...panResponder.panHandlers}
                >
                    <View style={styles.handle} />

                    <View style={styles.content}>
                        <Text style={styles.introducingLabel}>MANAGE THE</Text>
                        <Text style={styles.title}>Notifications</Text>

                        <View style={styles.featuresList}>
                            <View style={styles.featureItem}>
                                <View style={styles.featureIcon}>
                                    <Ionicons
                                        name="time-outline"
                                        size={24}
                                        color={colors.accent.lightBlue}
                                    />
                                </View>
                                <View style={styles.featureContent}>
                                    <Text style={styles.featureTitle}>
                                        Stay Tuned
                                    </Text>
                                    <Text style={styles.featureDescription}>
                                    Receive information about a possible app update
                                    </Text>
                                </View>
                            </View>

                            <View style={styles.featureItem}>
                                <View style={styles.featureIcon}>
                                    <Ionicons
                                        name="flash-outline"
                                        size={24}
                                        color={colors.accent.lightBlue}
                                    />
                                </View>
                                <View style={styles.featureContent}>
                                    <Text style={styles.featureTitle}>
                                        Instant Insights
                                    </Text>
                                    <Text style={styles.featureDescription}>
                                        Get immediate AI-driven insights and
                                        recommendations tailored to your needs
                                    </Text>
                                </View>
                            </View>
                        </View>

                        <View style={styles.buttonsContainer}>
                            <TouchableOpacity
                                style={styles.enableButton}
                                onPress={handleEnable}
                            >
                                <Ionicons
                                    name="notifications"
                                    size={20}
                                    color={colors.primary.black}
                                />
                                <Text style={styles.enableButtonText}>
                                    Enable
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.notNowButton}
                                onPress={handleNotNow}
                            >
                                <Text style={styles.notNowButtonText}>
                                    Not Now
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Animated.View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "flex-end",
    },
    backdrop: {
        flex: 1,
    },
    modal: {
        backgroundColor: colors.background.primary,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingTop: 12,
        paddingBottom: 34,
        maxHeight: screenHeight * 0.8,
    },
    handle: {
        width: 40,
        height: 4,
        backgroundColor: colors.border.secondary,
        borderRadius: 2,
        alignSelf: "center",
        marginBottom: 20,
        marginTop: 8,
    },
    content: {
        paddingHorizontal: 24,
    },
    introducingLabel: {
        fontSize: 14,
        fontWeight: "600",
        color: colors.text.secondary,
        textAlign: "center",
        letterSpacing: 1,
        marginBottom: 8,
    },
    title: {
        fontSize: 32,
        fontWeight: "bold",
        color: colors.text.primary,
        textAlign: "center",
        marginBottom: 32,
    },
    featuresList: {
        marginBottom: 32,
    },
    featureItem: {
        flexDirection: "row",
        alignItems: "flex-start",
        marginBottom: 24,
    },
    featureIcon: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: colors.background.secondary,
        alignItems: "center",
        justifyContent: "center",
        marginRight: 16,
    },
    featureContent: {
        flex: 1,
    },
    featureTitle: {
        fontSize: 18,
        fontWeight: "600",
        color: colors.text.primary,
        marginBottom: 4,
    },
    featureDescription: {
        fontSize: 14,
        color: colors.text.secondary,
        lineHeight: 20,
    },
    buttonsContainer: {
        gap: 12,
    },
    enableButton: {
        backgroundColor: colors.text.primary,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 16,
        paddingHorizontal: 24,
        borderRadius: 12,
        gap: 8,
    },
    enableButtonText: {
        fontSize: 16,
        fontWeight: "600",
        color: colors.primary.black,
    },
    notNowButton: {
        alignItems: "center",
        paddingVertical: 12,
    },
    notNowButtonText: {
        fontSize: 16,
        fontWeight: "500",
        color: colors.text.secondary,
    },
});

export default NotificationsModal;
