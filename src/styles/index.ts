import { StyleSheet } from "react-native";
import defaultTheme from "../helpers/colors";
import Metrics from "../helpers/metrics";

const appStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: defaultTheme.backgroundColor,
    paddingTop: Metrics.rfp(10),
  },
  centerItem: {
    justifyContent: "center",
    alignItems: "center",
  },
  profileStyle: {
    width: Metrics.rfv(80),
    height: Metrics.rfv(80),
    borderRadius: Metrics.rfv(40),
  },
  topInfoCard: {
    display: "flex",
    // justifyContent: "flex-end",
    width: "90%",
    height: Metrics.rfv(200),
    marginTop: Metrics.rfv(10),
    alignSelf: "center",
  },
  cardInnerCard: {
    width: "100%",
    height: Metrics.rfv(200),
    backgroundColor: defaultTheme.white,
    borderRadius: Metrics.rfv(20),
    overflow: "hidden",
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: Metrics.rfv(10),
    elevation: 3,
    zIndex: 0,
  },
  titleStyle: {
    fontSize: Metrics.rfv(20),
    fontWeight: "800",
    color: defaultTheme.black,
  },
  infoStyle: {
    fontSize: Metrics.rfv(14),
    fontWeight: "200",
    color: defaultTheme.gray,
    marginTop: Metrics.rfv(8),
  },
  line: {
    height: 1,
    backgroundColor: defaultTheme.line,
    marginHorizontal: Metrics.rfv(12),
  },
  infoCard: {
    flex: 1,
    flexDirection: "row",
    padding: Metrics.rfv(16),
  },
  personHeader: { flex: 1, flexDirection: "row", padding: Metrics.rfv(16) },

  verticalLine: {
    borderWidth: 0,
    borderRightWidth: 1,
    borderRightColor: defaultTheme.line,
  },
  containerInfoCard: {
    height: Metrics.height - Metrics.rfv(160),
  },
  containerInnerCard: {
    height: '98%',
    borderRadius: Metrics.rfv(40),
    padding: Metrics.rfv(20)
  },
  btnText: {
    fontSize: Metrics.rfv(16),
    fontWeight: "600",
    color: defaultTheme.white,
  },

});

export default appStyles;
