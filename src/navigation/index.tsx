import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CALENDER_NEW_REQUEST, NEW_REQUEST, PROFILE_SCREEN } from "./navConst";
import ProfileScreen from "../screens/ProfileScreen";
import NewRequest from "../screens/NewRequest";
import CalenderNewRequest from "../screens/CalenderNewRequest";

export type RootNavigationParamList = {
  [PROFILE_SCREEN]: {};
  [NEW_REQUEST]: {};
  [CALENDER_NEW_REQUEST]: {
    onGetDate: (formDate: string, toDate:string, monthIndex: number) => void;
  };
};

const Stack = createNativeStackNavigator<RootNavigationParamList>();

const NavigationStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={PROFILE_SCREEN} component={ProfileScreen} />
      <Stack.Screen name={NEW_REQUEST} component={NewRequest} />
      <Stack.Screen
        name={CALENDER_NEW_REQUEST}
        component={CalenderNewRequest}
      />
    </Stack.Navigator>
  );
};

export default NavigationStack;
