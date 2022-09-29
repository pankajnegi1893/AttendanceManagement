import PropTypes from "prop-types";
import React, { memo } from "react";
import { Image, View, Text } from "react-native";
import appStyles from "../../styles";
import AppCalender from "./comp/AppCalender";

const CalenderNewRequest = memo(() => {
  const renderTopCard = () => {
    return (
      <View style={[appStyles.topInfoCard, appStyles.containerInfoCard]}>
        <View style={[appStyles.cardInnerCard, appStyles.containerInnerCard]}>
          <Text style={appStyles.titleStyle}>New Request</Text>

          <AppCalender />
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
    </View>
  );
});

export default CalenderNewRequest;
