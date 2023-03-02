

import React from "react";
import {
  SafeAreaView,
  Image,
  StyleSheet,
  FlatList,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Dimensions,
  Button,
} from "react-native";
// import Button from "../components/Login/button";
import GoogleButton from "../components/Login/GoogleButton";

import OnboardingButton from "../components/onboarding/onboardingButton";
import OnboardingButton2 from "../components/onboarding/onboardingButton2";
import { colors } from "../theme/colors";
import { spacing } from "../theme/spacing";

const { width, height } = Dimensions.get("window");

// const COLORS = {primary: '#282534', white: '#fff'};

const slides = [
  {
    id: "1",
    image: require("../../assets/images/image1.jpg"),
    title: "Find Barbers and ",
    subtitle: "Salon easily in Your ",
    subtitle2: " Hands",
  },
  {
    id: "2",
    image: require("../../assets/images/image2.jpg"),
    title: "Book Your Favourite ",
    subtitle: " Berber And Salon",
    subtitle2: " quickly",
  },
  {
    id: "3",
    image: require("../../assets/images/image5.jpg"),
    title: "Come To handsome  ",
    subtitle: "And With beautiful",
    subtitle2: " Right Us Now!",
  },
];

const Slide = ({ item }) => {
  return (
    <View style={{ alignItems: "center", }}>
      <Image
        source={item?.image}
        style={{ height: "42%", width: '80%', resizeMode: "contain" }}
      />
      <View>
        <Text style={styles.title}>{item?.title}</Text>
        <Text style={styles.title}>{item?.subtitle}</Text>
        <Text style={styles.title}>{item?.subtitle2}</Text>
      </View>
    </View>
  );
};

const OnboardingScreen = ({ navigation }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = React.useState(0);
  const ref = React.useRef();
  // update slider index
  const updateCurrentSlideIndex = (e) => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);
    setCurrentSlideIndex(currentIndex);
  };

  // go to next slide
  const goToNextSlide = () => {
    const nextSlideIndex = currentSlideIndex + 1;
    if (nextSlideIndex != slides.length) {
      const offset = nextSlideIndex * width;
      ref?.current.scrollToOffset({ offset });
      setCurrentSlideIndex(currentSlideIndex + 1);
    }
  };

  const skip = () => {
    const lastSlideIndex = slides.length - 1;
    const offset = lastSlideIndex * width;
    ref?.current.scrollToOffset({ offset });
    setCurrentSlideIndex(lastSlideIndex);
  };
  // for indicator
  const Footer = () => {
    return (
      <View
        style={{
          height: height * 0.25,
          justifyContent: "space-between",
          paddingHorizontal: spacing[5],
        }}
      >
        {/* Indicator container */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginTop: spacing[10],
          }}
        >
          {/* Render indicator */}
          {slides.map((_, index) => (
            <View
              key={index}
              style={[
                styles.indicator,
                currentSlideIndex == index && {
                  backgroundColor: colors.white,
                  width: 25,
                },
              ]}
            />
          ))}
        </View>

        {/* Render buttons */}
        <View style={{ marginBottom: spacing[10] }}>
          {currentSlideIndex == slides.length - 1 ? (
            <View style={{ height: 50, backgroundColor: colors.darkOrange }}>
              <Button
                onPress={() => navigation.replace("Signup")}
                title={"GET STARTED"}
              />
            </View>
          ) : (
            <View style={{ flexDirection: "row" }}>
              <OnboardingButton2
                onPress={skip}
                activeOpacity={0.8}
                title={"SKIP"}
              />
              <View style={{ width: 14 }} />
              <OnboardingButton
                activeOpacity={0.8}
                onPress={goToNextSlide}
                title={"NEXT"}
              />
            </View>
          )}
        </View>
      </View>
    );
  };
  // main code
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor={colors.primary} />
      <FlatList
        ref={ref}
        onMomentumScrollEnd={updateCurrentSlideIndex}
        // we cant use style, we need to use contentContainerStyle
        contentContainerStyle={{ height: height * 0.75 }}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        data={slides}
        pagingEnabled
        renderItem={({ item }) => <Slide item={item} />}
      />
      <Footer />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  subtitle: {
    color: colors.black,
    fontSize: 10,
    marginTop: spacing[15],
    maxWidth: spacing[40],
    textAlign: "center",
    lineHeight: 25,
  },
  title: {
    color: colors.black,
    fontSize: 42,
    lineHeight: 50,
    fontWeight: "600",
    marginTop: spacing[5],
    textAlign: "center",
  },
  image: {
    height: "100%",
    resizeMode: "cover",
  },
  indicator: {
    height: 2.5,
    width: 10,
    backgroundColor: "grey",
    marginHorizontal: spacing[1],
    borderRadius: 2,
  },
  btn: {
    flex: 1,
    height: 50,
    borderRadius: 50,
    backgroundColor: colors.orange,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default OnboardingScreen;