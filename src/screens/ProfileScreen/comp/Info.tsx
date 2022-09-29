import React, { memo } from "react";
import { View, StyleSheet, Text, StyleProp, ViewStyle } from "react-native";
import defaultTheme from "../../../helpers/colors";
import Metrics from "../../../helpers/metrics";

interface IInfoProps {
  title: string;
  info: string;
  containerStyle?: StyleProp<ViewStyle>,

  // any other props that come into the component
}

const Info = memo((props: IInfoProps) => {
  const { title, info, containerStyle } = props;
  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.info}>{info}</Text>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: Metrics.rfv(16),
    fontWeight: "400",
    color: defaultTheme.gray,
  },
  info: {
    fontSize: Metrics.rfv(12),
    fontWeight: "200",
    color: defaultTheme.black,
    marginTop: Metrics.rfv(8),
  },
});

export default Info;
