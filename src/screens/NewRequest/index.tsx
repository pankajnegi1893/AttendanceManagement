import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { LinearGradient } from "expo-linear-gradient";
import PropTypes from "prop-types";
import React, { memo, useState } from "react";
import {
  FlatList,
  Image,
  ListRenderItem,
  ListRenderItemInfo,
  StyleProp,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
  ScrollView
} from "react-native";
import { useDispatch } from "react-redux";
import { showToast } from "../../helpers/appHelper";
import defaultTheme from "../../helpers/colors";
import { months } from "../../helpers/dateHelper";
import Metrics from "../../helpers/metrics";
import { RootNavigationParamList } from "../../navigation";
import { CALENDER_NEW_REQUEST } from "../../navigation/navConst";
import { applyLeave } from "../../reducer/personSlice";
import { AppDispatch } from "../../reducer/store";
import appStyles from "../../styles";
import Images from "../../assets";

interface ILeaveType {
  id: number;
  title: string;
  image: any;
  checked?: boolean;
}

interface IDateInputProps {
  title: string;
  value?: string;
  onPress: () => void;
  containerStyle?: StyleProp<ViewStyle>;
}

const DateInput = (props: IDateInputProps) => {
  const { title, value, onPress, containerStyle } = props;
  return (
    <View>
      <TouchableOpacity
        style={[
          {
            marginVertical: Metrics.rfv(10),
          },
          containerStyle,
        ]}
        onPress={() => onPress()}
      >
        <Text
          style={{
            fontSize: Metrics.rfv(16),
            fontWeight: "200",
            color: defaultTheme.gray,
            marginVertical: Metrics.rfv(4),
            paddingHorizontal: Metrics.rfv(8),
          }}
        >
          {title}
        </Text>
        {value && (
          <Text
            style={{
              fontSize: Metrics.rfv(16),
              fontWeight: "400",
              color: defaultTheme.black,
              marginVertical: Metrics.rfv(4),
              paddingHorizontal: Metrics.rfv(8),
            }}
          >
            {value}
          </Text>
        )}
      </TouchableOpacity>
      <View style={appStyles.line}></View>
    </View>
  );
};

export const LEAVES_TYPE: ILeaveType[] = [
  {
    id: 1,
    title: "Annual",
    image: Images.annual,
  },
  {
    id: 2,
    title: "Parential",
    image: Images.parential,
  },
  {
    id: 3,
    title: "Unpaid",
    image: Images.unpaid,
  },
  {
    id: 4,
    title: "Special",
    image: Images.special,
  },
];

interface ILeaveCardProps {
  id: number;
  title: string;
  image: any;
  onPress: (id: number) => void;
  containerStyle?: StyleProp<ViewStyle>;
  checked?: boolean;

  // any other props that come into the component
}

const LeaveCard = (props: ILeaveCardProps) => {
  const { id, title, containerStyle, onPress, checked = false, image } = props;
  return (
    <TouchableOpacity
      key={`${id}`}
      style={[
        {
          flex: 1,
          height: Metrics.rfv(100),
          justifyContent: "center",
          //alignItems: "center",
          marginHorizontal: Metrics.rfv(4),
          marginVertical: Metrics.rfv(2),
          paddingLeft: Metrics.rfv(20),
          backgroundColor: checked
            ? defaultTheme.black
            : defaultTheme.lightGray,
          borderRadius: Metrics.rfv(20),
        },
        containerStyle,
      ]}
      onPress={() => {
        onPress(id);
      }}
    >
      <View
        style={{
          width: Metrics.rfv(40),
          height: Metrics.rfv(40),
          borderRadius: Metrics.rfv(20),
          backgroundColor: defaultTheme.white,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          style={{
            width: Metrics.rfv(20),
            height: Metrics.rfv(20),
            resizeMode: "contain",
          }}
          source={image}
        />
      </View>
      <Text
        style={{
          fontSize: Metrics.rfv(16),
          fontWeight: "400",
          color: checked ? defaultTheme.white : defaultTheme.gray,
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const NewRequest = memo(() => {
  const [leaveTypes, setLeaveTypes] = useState(LEAVES_TYPE);
  const [formDate, setFormDate] = useState<string | undefined>();
  const [toDate, setToDate] = useState<string | undefined>();
  const [totalLeaves, setTotalLevels] = useState<number | undefined>();
  const dispatch: AppDispatch = useDispatch();
  const { goBack } = useNavigation();

  const { navigate } =
    useNavigation<NativeStackNavigationProp<RootNavigationParamList>>();
  const renderItem: ListRenderItem<ILeaveType> = ({
    item,
  }: ListRenderItemInfo<ILeaveType>) => (
    <LeaveCard
      id={item.id}
      title={item.title}
      checked={item.checked}
      image={item.image}
      onPress={(id) => {
        setLeaveTypes(
          leaveTypes.map((l) => {
            return {
              ...l,
              checked: l.id == id ? !item.checked : false,
            };
          })
        );
      }}
    />
  );

  const onGetDate = (
    _fromDate: string,
    _toDate: string,
    monthIndex: number
  ) => {
    const year = new Date().getFullYear();
    const fD = parseInt(_fromDate);
    const tD = parseInt(_toDate);
    setFormDate(
      `${fD > 9 ? _fromDate : `0${_fromDate}`} ${months[monthIndex]} ${year}`
    );
    setToDate(
      `${tD > 9 ? _toDate : `0${_toDate}`} ${months[monthIndex]} ${year}`
    );
    setTotalLevels((fD > tD ? fD - tD : tD - fD) + 1);
  };

  const navigateToCalender = () => {
    navigate(CALENDER_NEW_REQUEST, {
      onGetDate: onGetDate,
    });
  };

  const renderTopCard = () => {
    return (
      <View style={{ flex: 1 }}>
        <Text style={appStyles.titleStyle}>New Request</Text>

        <View>
          <FlatList
            data={leaveTypes}
            renderItem={renderItem}
            keyExtractor={(item: ILeaveType) => `${item.id}`}
            numColumns={2}
            style={{
              marginVertical: Metrics.rfv(8),
            }}
          />
        </View>

        <DateInput
          title="From"
          onPress={() => {
            navigateToCalender();
          }}
          containerStyle={{}}
          value={formDate}
        />
        <DateInput
          title="To"
          onPress={() => {
            navigateToCalender();
          }}
          value={toDate}
        />
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
        
        <View style={[appStyles.topInfoCard, appStyles.containerInfoCard]}>
          <View style={[appStyles.cardInnerCard, appStyles.containerInnerCard]}>
            {renderTopCard()}
            <LinearGradient
              // Background Linear Gradient
              colors={[defaultTheme.backgroundColor, defaultTheme.primay]}
              style={{
                borderRadius: Metrics.rfv(10),
                overflow: "hidden",
              }}
            >
              <TouchableOpacity
                style={{
                  width: "100%",
                  height: Metrics.rfv(50),
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={() => {
                  const leaveType = leaveTypes.find((l) => l.checked);
                  if (!leaveType) {
                    showToast("Please select leave type");
                    return;
                  }
                  if (formDate && toDate) {
                    dispatch(
                      applyLeave({
                        leaves: totalLeaves,
                      })
                    );
                    goBack();
                  } else {
                    showToast("Please select Form and To Date");
                  }
                }}
              >
                <Text style={appStyles.btnText}>Confirm</Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </View>
      </View>
    </View>
  );
});

export default NewRequest;
