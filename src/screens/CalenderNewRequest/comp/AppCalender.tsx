import React, { memo, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  ListRenderItem,
  ListRenderItemInfo,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
} from "react-native";
import defaultTheme from "../../../helpers/colors";
import {
  getDaysInMonth,
  getDaysInMonthCalender,
  getRemainingMonths,
  months,
  weekDays,
} from "../../../helpers/dateHelper";
import Metrics from "../../../helpers/metrics";
import appStyles from "../../../styles";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation, useRoute } from "@react-navigation/native";
import { showToast } from "../../../helpers/appHelper";

interface IDayProps {
  day: string;
  containerStyle?: StyleProp<ViewStyle>;
  setDate: (day: string, monthIndex: number) => void;
  isDateSelected: (day: string, monthIndex: number) => boolean;
  monthIndex: number;
  // any other props that come into the component
}

const DayItem = (props: IDayProps) => {
  const { day, isDateSelected, setDate, monthIndex } = props;
  return (
    <TouchableOpacity
      style={[styles.days]}
      onPress={() => {
        setDate(day, monthIndex);
      }}
    >
      <View
        style={{
          width: Metrics.rfv(40),
          height: Metrics.rfv(40),
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: isDateSelected(day, monthIndex)
            ? defaultTheme.primay
            : defaultTheme.transparent,
          borderRadius: Metrics.rfv(20),
        }}
      >
        <Text
          style={[
            styles.title,
            isDateSelected(day, monthIndex) && { color: defaultTheme.white },
          ]}
        >
          {day}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const AppCalender = memo(() => {
  const remainingMonths = getRemainingMonths();
  const year = new Date().getFullYear();
  const [formDate, setFormDate] = useState<string | undefined>();
  const [toDate, setToDate] = useState<string | undefined>();
  const [monthIndex, setMonthIndex] = useState<number | undefined>();
  const { params } = useRoute();
  const { onGetDate } = params as any;
  const { goBack } = useNavigation();

  const setDate = (dateIndex: string, _monthIndex: number) => {
    if (formDate && toDate) {
      setFormDate(dateIndex);
      setMonthIndex(_monthIndex);
      setToDate(undefined);
    } else if (!formDate) {
      setFormDate(dateIndex);
      setMonthIndex(_monthIndex);
      setToDate(undefined);
    } else if (formDate) {
      if (_monthIndex == monthIndex) {
        setToDate(dateIndex);
      } else {
        setFormDate(dateIndex);
        setMonthIndex(_monthIndex);
        setToDate(undefined);
      }
    }
  };

  const isDateSelected = (item: string, _monthIndex: number) => {
    if (_monthIndex != monthIndex) return false;
    if (item == " ") return false;
    const itemIndex = parseInt(item);
    if (formDate && !toDate && itemIndex == parseInt(formDate)) return true;

    if (
      formDate &&
      toDate &&
      itemIndex >= parseInt(formDate) &&
      itemIndex <= parseInt(toDate)
    ) {
      return true;
    }
    return false;
  };

  const renderItem: ListRenderItem<number> = ({
    item: monthIndex,
  }: ListRenderItemInfo<number>) => {
    const daysInMonth = getDaysInMonthCalender(monthIndex - 1);
    return (
      <View style={styles.calenderMonthContainer}>
        <Text style={styles.monthName}>
          {`${months[monthIndex - 1]}`} {year}
        </Text>
        <View>
          <FlatList
            data={daysInMonth}
            renderItem={({ item }) => (
              <DayItem
                day={item}
                isDateSelected={isDateSelected}
                setDate={setDate}
                monthIndex={monthIndex}
              />
            )}
            keyExtractor={(_: string, index: number) => `${index}`}
            numColumns={7}
          />
        </View>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <View style={styles.flexRow}>
          {weekDays.map((day) => (
            <View style={styles.days}>
              <Text style={styles.title}>{day}</Text>
            </View>
          ))}
        </View>
        <View style={styles.container}>
          <FlatList
            data={remainingMonths}
            renderItem={renderItem}
            keyExtractor={(item: number) => `${item}`}
            style={{
              marginTop: Metrics.rfv(10),
            }}
          />
        </View>
      </View>
      <View
        style={{
          justifyContent: "flex-end",
          alignItems: "flex-end",
        }}
      >
        <LinearGradient
          // Background Linear Gradient
          colors={[defaultTheme.backgroundColor, defaultTheme.primay]}
          style={{
            width: Metrics.width / 3,
            height: Metrics.rfv(50),
            justifyContent: "center",
            alignItems: "center",
            borderRadius: Metrics.rfv(10),
            overflow: "hidden",
          }}
        >
          <TouchableOpacity
            onPress={() => {
              if (!toDate) {
                showToast("Please select Date")
                return;
              }
              onGetDate(formDate, toDate, monthIndex);
              goBack();
            }}
          >
            <Text style={styles.btnText}>Select</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flexRow: {
    flexDirection: "row",
  },
  days: {
    width: `${100 / 7}%`,
    height: Metrics.rfv(50),
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: Metrics.rfv(14),
    fontWeight: "400",
    color: defaultTheme.gray,
  },
  monthName: {
    fontSize: Metrics.rfv(16),
    fontWeight: "600",
    color: defaultTheme.black,
  },
  calenderMonthContainer: {
    marginTop: Metrics.rfv(16),
  },
  btnText: {
    fontSize: Metrics.rfv(16),
    fontWeight: "600",
    color: defaultTheme.white,
  },
});

export default AppCalender;
