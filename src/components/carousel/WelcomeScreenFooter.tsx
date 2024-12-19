import { Animated, ColorValue, StatusBar, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native';
import React, { FC, useEffect, useRef, useState } from 'react';
import colors from '../../constants/colors';
import { Icon, IconButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

type WelcomeScreenFooterType = {
  color: string,
  selectedTab: ((tab: number) => void),
}
const WelcomeScreenFooter: FC<WelcomeScreenFooterType> = ({
  color,
  selectedTab
}) => {
  const [selectTab, setSelectTab] = useState(0)
  const navigation = useNavigation()
  const [enableStatusBar, setEnableStatusBar] = useState(true)
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial opacity is 0
  const slideAnim = useRef(new Animated.Value(-100)).current; // Initial position is off-screen
  useEffect(() => {
    // Start the animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1, // Animate to full opacity
        duration: 1000, // Duration of 1 second
        useNativeDriver: true, // Use native driver for better performance
      }),
      Animated.timing(slideAnim, {
        toValue: 0, // Animate to position 0 (in view)
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, slideAnim]);

  useEffect(() => {
    selectedTab(selectTab)
  }), [selectTab]

  return (
    <>
      {enableStatusBar && <StatusBar animated backgroundColor={color} barStyle={"default"} />}
      <Animated.View style={{
        opacity: fadeAnim,
        transform: [{ translateY: slideAnim }],
      }}>
        <View style={styles.flexRow}>
          <IconButton
            icon={"arrow-left-circle"}
            size={50}
            iconColor={color}
            onPress={() => {
              if (selectTab === 0) {
                return;
              }
              setSelectTab(selectTab - 1)
            }}
          />
          <TouchableOpacity activeOpacity={0.7} style={[styles.buttonStyle, { backgroundColor: `${color}` }]} onPress={(() => {
            navigation.navigate("LoginScreen")
            setEnableStatusBar(false)
          })}>
            <Text style={styles.submitButtonText}>Get Started</Text>
          </TouchableOpacity>
          {selectTab != 4 &&

            <IconButton
              icon={"arrow-right-circle"}
              iconColor={color}
              size={50}
              onPress={() => {
                if (selectTab === 6) {
                  return;
                }
                setSelectTab(selectTab + 1)
              }}
            />}
        </View>
      </Animated.View>
    </>
  );
};

export default WelcomeScreenFooter;

const styles = StyleSheet.create({
  container: {

    justifyContent: 'center',
    alignItems: 'center',
  },
  flexRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    height: 80,
    alignItems: 'center',
    width: "100%",
  },
  buttonStyle: {
    padding: 10,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10
  },
  submitButtonText: {
    color: colors.WHITE,
    fontSize: 16,
    padding: 5
  },
});