import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { TransHeader } from "../../components/Layouts/Headers";
import Input from "../../components/Inputs/Inputs";

interface SenderOrderProps {
  status?: string;
}

const User_Edit: React.FC<SenderOrderProps> = () => {
  return (
    <View style={styles.container}>
        <TransHeader haveBackIcon={true} title="Chỉnh sửa thông tin" />
        <View style={styles.all}>

        <View style={styles.viewbody}>
          <Text style={styles.titlename}>Họ và tên</Text>
          <Input
              inputType="default"
              placeholder="Họ và Tên"
              style={styles.name}
            />
        </View>

        <View style={styles.viewbody}>
          <Text style={styles.titlename}>Số điện thoại</Text>
          <Input
              inputType="default"
              placeholder="Số điện thoại"
              style={styles.name}
            />
        </View>

        <View style={styles.viewbody}>
          <Text style={styles.titlename}>Email</Text>
          <Input
              inputType="default"
              placeholder="Họ và Tên"
              style={styles.name}
            />
        </View>

        <View style={styles.viewbody}>
          <Text style={styles.titlename}>Địa chỉ</Text>
          <Input
              inputType="default"
              placeholder=""
              style={styles.name}
            />
        </View>

        <View style={styles.viewbody}>
          <Text style={styles.titlename}>Giới tính</Text>
          <Input
              inputType="default"
              placeholder="Nam"
              style={styles.name}
            />
        </View>

        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  all:{
    padding: 24
  },
  titlename:{
    fontSize: 20,
    fontWeight:'bold',
    marginTop: 10,
    marginBottom: 6
  },
  name:{
    fontSize: 16,
    fontWeight:'regular',
    color:'#767676',
    marginBottom: 10
  },
  viewbody:{
    paddingVertical: 20
  },
});

export default User_Edit;
