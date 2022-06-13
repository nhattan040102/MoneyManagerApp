import * as Font from "expo-font";

export default useFonts = async () =>
  await Font.loadAsync({
    RobotoRegular: require("../assets/fonts/Roboto-Regular.ttf"),
    RobotoBlack: require("../assets/fonts/Roboto-Black.ttf"),
    RobotoBold: require("../assets/fonts/Roboto-Bold.ttf"),
  });
