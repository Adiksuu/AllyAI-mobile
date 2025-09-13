import React from "react";
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Modal,
    Animated,
    Dimensions,
    PanResponder,
} from "react-native";
import { colors } from "../api/theme/colors";

const { height: screenHeight } = Dimensions.get("window");

const BottomSheetModal = ({
    visible,
    onClose,
    children,
    showHandle = true,
    maxHeight = screenHeight * 0.8,
    animationDuration = 300,
    closeThreshold = 100,
    velocityThreshold = 0.5,
}) => {
    const slideAnim = React.useRef(new Animated.Value(screenHeight)).current;
    const isDragging = React.useRef(false);

    React.useEffect(() => {
        if (visible) {
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: animationDuration,
                useNativeDriver: true,
            }).start();
        } else {
            Animated.timing(slideAnim, {
                toValue: screenHeight,
                duration: animationDuration,
                useNativeDriver: true,
            }).start();
        }
    }, [visible, slideAnim, animationDuration]);

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

            const shouldClose =
                gestureState.dy > closeThreshold ||
                gestureState.vy > velocityThreshold;

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
                            maxHeight,
                        },
                    ]}
                    {...panResponder.panHandlers}
                >
                    {showHandle && <View style={styles.handle} />}
                    {children}
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
});

export default BottomSheetModal;
