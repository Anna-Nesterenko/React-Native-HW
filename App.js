import { useCallback } from "react";
import { Provider } from "react-redux";
import { useFonts } from "expo-font/build/FontHooks";
import * as SplashScreen from "expo-splash-screen";
import { store } from "./src/redux/store";
import Main from "./src/components/Main";
import "./src/firebase/config";

export default function App() {
  const [fontsLoaded] = useFonts({
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <Main onLayout={onLayoutRootView} />
    </Provider>
  );
}
