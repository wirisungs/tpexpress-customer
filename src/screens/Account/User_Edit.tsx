import React from "react";
import { StyleSheet, View, Text, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { TransHeader } from "../../components/Layouts/Headers";
import Input from "../../components/Inputs/Inputs";
import { NavigationProp, RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../../../App";
import ButtonFill from "../../components/Buttons/Buttons";

interface SenderOrderProps {
  status?: string;
}

type UserEditRouteProp = RouteProp<RootStackParamList, 'User_Edit'>;

const User_Edit: React.FC<SenderOrderProps> = () => {
  const route = useRoute<UserEditRouteProp>();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { customerData } = route.params || {};

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"} // Sử dụng "padding" cho iOS và "height" cho Android
    >
      <TransHeader haveBackIcon={true} title="Chỉnh sửa thông tin" />
      <ScrollView contentContainerStyle={styles.all}>
        <View style={styles.viewbody}>
          <Text style={styles.titlename}>Họ và tên</Text>
          <Input
            inputType="default"
            value={customerData?.cusName || ''} 
            style={styles.name} placeholder={""} 
          />
        </View>

        <View style={styles.viewbody}>
          <Text style={styles.titlename}>Số điện thoại</Text>
          <Input
            inputType="default"
            value={customerData?.cusPhone || 'Nhập số điện thoại'}
            style={styles.name} placeholder={""} 
          />
        </View>

        <View style={styles.viewbody}>
          <Text style={styles.titlename}>Email</Text>
          <Input
            inputType="default"
            value={customerData?.cusEmail || ''}
            style={styles.name} placeholder={""} 
          />
        </View>

        <View style={styles.viewbody}>
          <Text style={styles.titlename}>Địa chỉ</Text>
          <Input
            inputType="default"
            value={customerData?.cusAddress || 'Nhập địa chỉ'}
            style={styles.name} placeholder={""} 
          />
        </View>

        <View style={styles.viewbody}>
          <Text style={styles.titlename}>Giới tính</Text>
          <Input
            inputType="numeric"
            value={customerData?.cusGender != null ? customerData.cusGender.toString() : ''}
            style={styles.name} placeholder={""} 
          />
        </View>

        <View style={styles.btnedit}>
          <ButtonFill onPress={() => navigation.navigate('User_Edit', { customerData })} >
            <Text className="text-white font-bold text-lg">Sửa thông tin</Text>
          </ButtonFill>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  all: {
    padding: 24,
  },
  titlename: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 6
  },
  name: {
    fontSize: 16,
    fontWeight: 'regular',
    color: '#767676',
    marginBottom: 10
  },
  viewbody: {
    paddingVertical: 10
  },
  btnedit: {
    marginTop: 20,
  },
});

export default User_Edit;
