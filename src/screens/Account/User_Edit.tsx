import React, { useState } from "react";
import { StyleSheet, View, Text, KeyboardAvoidingView, Platform, Alert, FlatList } from "react-native";
import { TransHeader } from "../../components/Layouts/Headers";
import Input from "../../components/Inputs/Inputs";
import { CommonActions, NavigationProp, RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../../../App";
import ButtonFill from "../../components/Buttons/Buttons";
import DropDownPicker from "react-native-dropdown-picker";
import { useTheme } from "../../components/Darkmode/ThemeContext";

interface SenderOrderProps { }


type UserEditRouteProp = RouteProp<RootStackParamList, 'User_Edit'>;

const User_Edit: React.FC<SenderOrderProps> = () => {
  const route = useRoute<UserEditRouteProp>();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { customerData } = route.params || {};
  const { isDarkMode } = useTheme();
  const [cusName, setCusName] = useState(customerData?.cusName || '');
  const [cusPhone, setCusPhone] = useState(customerData?.cusPhone || '');
  const [cusAddress, setCusAddress] = useState(customerData?.cusAddress || '');
  const [cusGender, setCusGender] = useState(customerData?.cusGender != null ? customerData.cusGender.toString() : '');
  const [open, setOpen] = useState(false);

  const handleUpdate = async () => {
    if (!cusPhone.trim() || !cusAddress.trim() || !cusName.trim()) {
      return;
    }
    if (cusAddress.length > 255) {
      return;
    }
    const phoneRegex = /^0\d{9}$/; 
    if (!phoneRegex.test(cusPhone)) {
      return;
    }

    try {
      const response = await fetch(`http://tpexpress.ddns.net:3000/api/cusA/${customerData._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cusName: cusName,
          cusPhone: cusPhone,
          cusAddress: cusAddress,
          cusGender: cusGender
        }),
      });

      const result = await response.json();

      if (response.ok) {
        // Alert.alert('Thành công', 'Dữ liệu đã được cập nhật thành công!');
        navigation.navigate('HomePage', { emailE: customerData.cusEmail });
      } else {
        Alert.alert('Lỗi', result.error || 'Có lỗi xảy ra khi cập nhật dữ liệu.');
      }
    } catch (error) {
      console.error('Lỗi khi cập nhật dữ liệu:', error);
      Alert.alert('Lỗi', 'Có lỗi xảy ra khi cập nhật dữ liệu.');
    }
  };


  // Thay ScrollView bằng FlatList
  const renderItem = ({ item }: { item: any }) => {
    switch (item.key) {
      case 'cusName':
        return (
          <View style={styles.viewbody}>
            <Text style={styles.titlename}>Họ và tên</Text>
            <Input
              inputType="default"
              value={cusName}
              onChangeText={setCusName}
              style={styles.name}
              placeholder="Nhập họ và tên"
            />
            {!cusName.trim() && (
              <Text style={styles.madon2}>Vui lòng tên</Text>
            )}
          </View>
        );
      case 'cusPhone':
        return (
          <View style={styles.viewbody}>
            <Text style={styles.titlename}>Số điện thoại</Text>
            <Input
              inputType="numeric"
              value={cusPhone}
              onChangeText={setCusPhone}
              style={styles.name}
              placeholder="Nhập số điện thoại"
            />
            {!cusPhone.trim() ? (
              <Text style={styles.madon2}>Vui lòng nhập số điện thoại</Text>
            ) : cusPhone.length !== 10 || cusPhone[0] !== '0' ? (
              <Text style={styles.madon2}>Vui lòng nhập đủ 10 số và bắt đầu bằng 0</Text>
            ) : null}
          </View>
        );
      case 'cusAddress':
        return (
          <View style={styles.viewbody}>
            <Text style={styles.titlename}>Địa chỉ</Text>
            <Input
              inputType="default"
              value={cusAddress}
              onChangeText={setCusAddress}
              style={styles.name}
              placeholder="Nhập địa chỉ"
            />
            {!cusAddress.trim() && (
              <Text style={styles.madon2}>Vui lòng nhập địa chỉ</Text>
            )}
            {cusAddress.length > 255 && (
              <Text style={styles.madon2}>Địa chỉ không được vượt quá 255 ký tự</Text>
            )}
          </View>
        );
      case 'cusGender':
        return (
          <View style={styles.viewbody}>
            <Text style={styles.titlename}>Giới tính</Text>
            <DropDownPicker
              open={open}
              value={cusGender}
              items={[
                { label: "Nam", value: "0" },
                { label: "Nữ", value: "1" },
              ]}
              setOpen={setOpen}
              setValue={setCusGender}
              placeholder="Chọn giới tính"
              style={styles.dropdown}
              dropDownContainerStyle={styles.dropdownContainer}
            />
          </View>
        );
      default:
        return null;
    }
  };

  const data = [
    { key: 'cusName' },
    { key: 'cusPhone' },
    { key: 'cusAddress' },
    { key: 'cusGender' },
  ];

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: isDarkMode ? "#202020" : "#fff" }]} // Áp dụng màu nền theo chế độ
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TransHeader haveBackIcon={true} title="Chỉnh sửa thông tin" />
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.key}
        contentContainerStyle={styles.scrollContent}
      />

      <View style={styles.btnedit}>
        <ButtonFill onPress={handleUpdate}>
          <Text className="text-white font-bold text-lg">Lưu thông tin</Text>
        </ButtonFill>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 80,
    padding: 24
  },
  dropdown: {
    backgroundColor: "#ffffff",
    borderColor: "#E0E0E0",
    borderWidth: 1,
    height: 50,
  },
  dropdownContainer: {
    backgroundColor: "#fcfcfc",
    borderColor: "#E0E0E0",
  },
  titlename: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 6,
  },
  name: {
    fontSize: 16,
    color: '#767676',
    marginBottom: 10,
  },
  viewbody: {
    paddingVertical: 10,
  },
  btnedit: {
    padding: 24
  },
  madon2: {
    fontSize: 14,
    color: '#F44336',
    fontWeight: 'bold',
  },
});

export default User_Edit;
