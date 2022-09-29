import PropTypes from "prop-types";
import React, { memo } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import appStyles from "../../styles";
import { useSelector } from "react-redux";
import { RootState } from "../../reducer/store";
import Metrics from "../../helpers/metrics";
import Ionicons from "@expo/vector-icons/Ionicons";
import defaultTheme from "../../helpers/colors";
import Info from "./comp/Info";
import { useNavigation } from "@react-navigation/native";
import { NEW_REQUEST } from "../../navigation/navConst";
import { RootNavigationParamList } from "../../navigation";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

const ProfileScreen = memo(() => {
  const name = useSelector((state: RootState) => state.person.name);
  const role = useSelector((state: RootState) => state.person.role);
  const allDays = useSelector((state: RootState) => state.person.all);
  const usedDays = useSelector((state: RootState) => state.person.used);
  const availableDays = allDays - usedDays;

  const { navigate } =
    useNavigation<NativeStackNavigationProp<RootNavigationParamList>>();

  const navigateToNewRequest = () => {
    navigate(NEW_REQUEST, {});
  };

  const renderTopCard = () => {
    return (
      <View style={appStyles.topInfoCard}>
        <View style={appStyles.cardInnerCard}>
          <View style={appStyles.personHeader}>
            <View style={{ flex: 1 }}>
              <Text style={appStyles.titleStyle}>{name}</Text>
              <Text style={appStyles.infoStyle}>{role}</Text>
            </View>
            <View>
              <TouchableOpacity onPress={() => navigateToNewRequest()}>
                <Ionicons
                  name="add-circle"
                  size={Metrics.rfv(40)}
                  color={defaultTheme.black}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={appStyles.line}></View>
          <View style={appStyles.infoCard}>
            <Info
              title={"Available"}
              info={`${availableDays} Days`}
              containerStyle={appStyles.verticalLine}
            />
            <Info
              title={"All"}
              info={`${allDays} Days`}
              containerStyle={appStyles.verticalLine}
            />
            <Info title={"Used"} info={`${usedDays} Days`} />
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={[appStyles.container]}>
      <View style={appStyles.centerItem}>
        <Image
          style={[appStyles.profileStyle]}
          source={{
            uri: "https://reactnative.dev/img/tiny_logo.png",
          }}
        />
        {renderTopCard()}
      </View>
      <View
        style={[
          appStyles.container,
          { backgroundColor: defaultTheme.white, margin: Metrics.rfv(16) },
        ]}
      >
        <View style={appStyles.centerItem}></View>
      </View>
    </View>
  );
});

export default ProfileScreen;
