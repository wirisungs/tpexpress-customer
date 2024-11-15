import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import Nofibox from '../../../components/Items/NofiBox';
import { TransHeader } from '../../../components/Layouts/Headers';

interface Nofi {
  nofiId: string;
  nofiTitle: string;
  nofiContent: string;
  nofiType: string;
  nofiTime: Date;
  cusId: string;
}

const NotificationButton = ({ cus }: { cus: { cusId: string } }) => {
  const [notifications, setNotifications] = useState<Nofi[]>([]);

  // useEffect để tự động gọi hàm tìm kiếm khi component được render
  useEffect(() => {
    const handleSearch = async () => {
      try {
        const response = await fetch(`http://tpexpress.ddns.net:3000/api/NofiS?cusId=${cus.cusId.trim()}`);
        const data: Nofi[] = await response.json();
        
        if (data.length > 0) {
          setNotifications(data); // Cập nhật state notifications với dữ liệu nhận được
        } else {
          Alert.alert("Thông báo", "Không tìm thấy thông báo!");
        }
      } catch (error) {
        console.error('Lỗi khi tìm kiếm:', error);
        Alert.alert("Lỗi", "Có lỗi xảy ra khi tìm kiếm. Vui lòng thử lại!");
      }
    };

    // Gọi hàm handleSearch khi component được render
    handleSearch();
  }, [cus]); // Chỉ gọi lại hàm khi `cus` thay đổi

  return (
    <ScrollView style={styles.container}>
      <TransHeader haveBackIcon={true} title="Thông báo" />
      {/* <Text>cusID: {cus.cusId}</Text> */}
      {/* Truyền dữ liệu thông báo vào Nofibox */}
      <Nofibox nofi={notifications} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});

export default NotificationButton;
