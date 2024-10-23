import React from "react";
import { StyleSheet, View, Text } from "react-native";
import SuccessIC from "../../svg/MTri/SuccessIC";
import ButtonFill from "../../components/Buttons/Buttons";
import { CommonActions, NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../../App";

const SuccessStep = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleOnClick = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0, // Trả về tab thứ 0
        routes: [{ name: "HomePage" }],
      })
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.noticeBox}>
        <SuccessIC />
        <Text style={styles.successText}>Hoàn tất đặt hàng</Text>
      </View>
      <View style={styles.buttonContainer}>
        <ButtonFill onPress={handleOnClick}>
          <Text className="text-white text-xl font-bold">Hoàn tất</Text>
        </ButtonFill>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    padding: 24,
  },
  noticeBox: {
    flex: 1, 
    alignItems: 'center',
    marginTop: 128
  },
  successText: {
    color: '#5DC061',
    fontWeight:'bold',
    fontSize: 32
  },
  buttonContainer: {
    justifyContent: 'flex-end',
    marginBottom: 16, 
  },
});

export default SuccessStep;
