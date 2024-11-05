import React, { useState, useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  Alert,
  KeyboardAvoidingView,
  Platform,
  FlatList,
  TouchableOpacity,
  Image
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { TransHeader } from "../../components/Layouts/Headers";
import { InputWithIcon } from "../../components/Inputs/Inputs";
import SearchIC from '../../svg/DucTri/Icons/HomeIcon/Search';
import { ImagesAssets } from "../../assets/DTri/ImageAssets";

const postOffices = [
  { name: "Cô Huyền - Cửa hàng bán lẻ", district: "Quận 11", address: "390 Lạc Long Quân, Phường 5, Quận 11, TP. Hồ Chí Minh", coordinates: { latitude: 10.7699, longitude: 106.6418 } },
  { name: "Ngọc Sương - Cửa hàng bán lẻ", district: "Quận 11", address: "341/67A Lạc Long Quân, Phường 5, Quận 11, TP. Hồ Chí Minh", coordinates: { latitude: 10.7695, longitude: 106.6382 } },
  { name: "Linh Kiện Mạch Điện", district: "Quận 12", address: "735 Quốc Lộ 1A, Phường An Phú Đông, Quận 12, TP. Hồ Chí Minh", coordinates: { latitude: 10.8650, longitude: 106.6050 } },
  { name: "Cửa Hàng Minh Hy", district: "Quận 12", address: "B441 Đông Hưng Thuận 10, KP3, Phường Đông Hưng Thuận, Quận 12, TP. Hồ Chí Minh", coordinates: { latitude: 10.8660, longitude: 106.6260 } },
  { name: "Huỳnh My", district: "Quận 12", address: "500/285 Hương Lộ 80B, Phường Hiệp Thành, Quận 12, TP. Hồ Chí Minh", coordinates: { latitude: 10.8520, longitude: 106.6200 } },
  { name: "ĐTDD Cảnh Chính", district: "Quận 12", address: "331 Dương Thị Mười, Phường Tân Chánh Hiệp, Quận 12, TP. Hồ Chí Minh", coordinates: { latitude: 10.8610, longitude: 106.6200 } },
  { name: "Cửa hàng Thành Hương", district: "Quận 12", address: "15/5 Đông Hưng Thuận 3, KP5, Phường Tân Hưng Thuận, Quận 12, TP. Hồ Chí Minh", coordinates: { latitude: 10.8740, longitude: 106.6280 } },
  { name: "Cửa hàng 66", district: "Quận 12", address: "66 Nguyễn Thị Căn, Phường Tân Thới Hiệp, Quận 12, TP. Hồ Chí Minh", coordinates: { latitude: 10.8450, longitude: 106.6260 } },
  { name: "Siêu Thị Happy", district: "Quận 12", address: "149 Tân Thới Nhất 13, Phường Tân Thới Nhất, Quận 12, TP. Hồ Chí Minh", coordinates: { latitude: 10.8490, longitude: 106.6280 } },
  { name: "Viettel Xuân Vũ", district: "Quận 12", address: "300 Lê Thị Riêng, Phường Thới An, Quận 12, TP. Hồ Chí Minh", coordinates: { latitude: 10.8500, longitude: 106.6110 } },
  { name: "H phone - Cửa hàng điện thoại", district: "Quận 5", address: "39B Hùng Vương, Phường 4, Quận 5, TP. Hồ Chí Minh", coordinates: { latitude: 10.7400, longitude: 106.6890 } },
  { name: "Minh Anh", district: "Quận 5", address: "89 Bùi Hữu Nghĩa, Phường 5, Quận 5, TP. Hồ Chí Minh", coordinates: { latitude: 10.7430, longitude: 106.6860 } },
  { name: "Cửa hàng Thảo Mai", district: "Quận 5", address: "69 An Dương Vương, Phường 8, Quận 5, TP. Hồ Chí Minh", coordinates: { latitude: 10.7460, longitude: 106.6880 } },
  { name: "Thịnh Khang", district: "Quận 7", address: "695 Huỳnh Tấn Phát, Phường Phú Thuận, Quận 7, TP. Hồ Chí Minh", coordinates: { latitude: 10.7430, longitude: 106.7540 } },
  { name: "Thu Mobile - Cửa hàng điện thoại", district: "Quận 8", address: "117H/61 Hoài Thanh, Phường 14, Quận 8, TP. Hồ Chí Minh", coordinates: { latitude: 10.7240, longitude: 106.6460 } },
  { name: "Ngọc Thạch Fruit", district: "Quận 8", address: "42B Cao Lỗ, Phường 4, Quận 8, TP. Hồ Chí Minh", coordinates: { latitude: 10.7200, longitude: 106.6480 } },
  { name: "HT STORE", district: "Quận Bình Tân", address: "180 Đường 26/3, Phường Bình Hưng Hòa, Quận Bình Tân, TP. Hồ Chí Minh", coordinates: { latitude: 10.7630, longitude: 106.6100 } },
  { name: "Ngọc Châu Start", district: "Quận Bình Tân", address: "110 Kênh Nước Đen, Phường Bình Hưng Hòa A, Quận Bình Tân, TP. Hồ Chí Minh", coordinates: { latitude: 10.7680, longitude: 106.6100 } },
  { name: "Cửa hàng Subeo", district: "Quận Bình Tân", address: "133 Hồ Văn Long, Phường Bình Hưng Hòa B, Quận Bình Tân, TP. Hồ Chí Minh", coordinates: { latitude: 10.7670, longitude: 106.6080 } },
  { name: "Trà Sữa Julia", district: "Quận Bình Tân", address: "47 Đường số 3, Phường Bình Hưng Hòa B, Quận Bình Tân, TP. Hồ Chí Minh", coordinates: { latitude: 10.7630, longitude: 106.6120 } },
  { name: "Cửa hàng tiện lợi Start Life", district: "Quận Bình Thạnh", address: "41F/52 Đặng Thùy Trâm, Phường 13, Quận Bình Thạnh, TP. Hồ Chí Minh", coordinates: { latitude: 10.7820, longitude: 106.7240 } },
  { name: "Nhà Sách Tân Miền Đông", district: "Quận Bình Thạnh", address: "237 Nguyễn Xí, Phường 13, Quận Bình Thạnh, TP. Hồ Chí Minh", coordinates: { latitude: 10.7860, longitude: 106.7260 } },
  { name: "Điện thoại di động Hòa Phát", district: "Quận Bình Thạnh", address: "156 Bạch Đằng, Phường 24, Quận Bình Thạnh, TP. Hồ Chí Minh", coordinates: { latitude: 10.7780, longitude: 106.7300 } },
  { name: "Cửa hàng tiện lợi Hiếu Hà", district: "Quận Bình Thạnh", address: "46/4 Tân Cảng, Phường 25, Quận Bình Thạnh, TP. Hồ Chí Minh", coordinates: { latitude: 10.7670, longitude: 106.7200 } },
  { name: "Nhà thuốc VINA", district: "Quận Gò Vấp", address: "653/42/4 Quang Trung, Phường 11, Quận Gò Vấp, TP. Hồ Chí Minh", coordinates: { latitude: 10.8370, longitude: 106.6610 } },
  { name: "Mobifone Thành Viễn", district: "Quận Gò Vấp", address: "827 Quang Trung, Phường 12, Quận Gò Vấp, TP. Hồ Chí Minh", coordinates: { latitude: 10.8460, longitude: 106.6750 } },

];

const MapScreen = () => {
  const mapRef = useRef(null); // Tham chiếu tới MapView
  const [searchQuery, setSearchQuery] = useState("");

  // Hàm phóng to bản đồ tới tọa độ bưu cục
  const zoomToPostOffice = (coordinates) => {
    mapRef.current.animateToRegion(
      {
        ...coordinates,
        latitudeDelta: 0.005, // Điều chỉnh để phóng to hơn hoặc ít hơn
        longitudeDelta: 0.005,
      },
      1000 // Thời gian phóng to
    );
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TransHeader title="Tra cứu bưu cục" haveBackIcon={true} />
      <View style={styles.container}>
        <MapView
          ref={mapRef}
          style={styles.map}
          initialRegion={{
            latitude: 10.7769,
            longitude: 106.6951,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
          }}
        >
          {postOffices.map((postOffice, index) => (
            <Marker
            key={index}
            coordinate={postOffice.coordinates}
            title={postOffice.name}
            description={postOffice.address}
          >
            <Image
              source={ImagesAssets.Bc}         
            />
          </Marker>
          ))}
        </MapView>
        <View style={styles.boxsearch}>
          <InputWithIcon
            icon={<SearchIC />}
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Tìm bưu cục..." inputType={"numeric"} />
          <FlatList
            data={postOffices.filter(postOffice =>
              postOffice.name.toLowerCase().includes(searchQuery.toLowerCase())
            )}
            keyExtractor={(item) => item.name}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => zoomToPostOffice(item.coordinates)}>
                <View style={styles.postOfficeItem}>
                  <Text>{item.name}</Text>
                  <Text>{item.address}</Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
       

      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  map: {
    width: '100%',
    height: '50%',
  },
  postOfficeItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  boxsearch:{
    padding: 24
  }
});

export default MapScreen;
