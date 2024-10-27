import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput, Button, Alert, KeyboardAvoidingView, Platform } from "react-native";
import MapView, { Marker } from "react-native-maps";
import axios from "axios";

const MAPBOX_API_KEY = "pk.eyJ1IjoiYmx1ZWR1Y2swOTA3IiwiYSI6ImNtMnI0ZWJ6aTEzengyanNibHpkanp4djEifQ.iaoeQHLQaLkNHLga6ZUffw"; // Thay bằng token Mapbox của bạn

interface Coordinates {
  latitude: number;
  longitude: number;
}

const TestMap = () => {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [originCoords, setOriginCoords] = useState<Coordinates | null>(null);
  const [destinationCoords, setDestinationCoords] = useState<Coordinates | null>(null);
  const [distance, setDistance] = useState<string | null>(null);

  // Hàm chuyển địa chỉ thành tọa độ bằng Nominatim API
  const getCoordinates = async (address: string) => {
    try {
      const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json`;
      const response = await axios.get(url);
      const { lat, lon } = response.data[0]; // Lấy tọa độ đầu tiên tìm thấy
      return { latitude: parseFloat(lat), longitude: parseFloat(lon) };
    } catch (error) {
      console.error(error);
      Alert.alert("Lỗi", `Không thể tìm thấy tọa độ cho địa chỉ: ${address}`);
      throw error;
    }
  };

  // Hàm tính khoảng cách giữa hai tọa độ bằng Mapbox Directions API
  const calculateDistance = async () => {
    try {
      const originCoords = await getCoordinates(origin);
      const destinationCoords = await getCoordinates(destination);

      setOriginCoords(originCoords);
      setDestinationCoords(destinationCoords);

      const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${originCoords.longitude},${originCoords.latitude};${destinationCoords.longitude},${destinationCoords.latitude}?access_token=${MAPBOX_API_KEY}`;

      const response = await axios.get(url);
      console.log("Response from Mapbox API:", response.data);

      if (!response.data.routes || response.data.routes.length === 0) {
        Alert.alert("Lỗi", "Không tìm thấy tuyến đường hợp lệ.");
        return;
      }

      const distanceMeters = response.data.routes[0].distance;
      const distanceKm = (distanceMeters / 1000).toFixed(2); // Đổi sang km

      setDistance(`${distanceKm} km`);
    } catch (error) {
      console.error(error);
      Alert.alert("Lỗi", "Có lỗi xảy ra khi tính khoảng cách.");
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={100} // Thay đổi giá trị nếu cần thiết
    >
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 10.762622,
          longitude: 106.660172,
          latitudeDelta: 0.5,
          longitudeDelta: 0.5,
        }}
      >
        {originCoords && (
          <Marker
            coordinate={originCoords}
            title="Điểm đi"
            pinColor="green"
          />
        )}
        {destinationCoords && (
          <Marker
            coordinate={destinationCoords}
            title="Điểm đến"
            pinColor="red"
          />
        )}
      </MapView>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nhập địa chỉ điểm đi"
          value={origin}
          onChangeText={setOrigin}
        />
        <TextInput
          style={styles.input}
          placeholder="Nhập địa chỉ điểm đến"
          value={destination}
          onChangeText={setDestination}
        />
        <Button title="Tính khoảng cách" onPress={calculateDistance} />
        {distance && <Text style={styles.result}>Khoảng cách: {distance}</Text>}
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  inputContainer: {
    padding: 10,
    backgroundColor: "#fff",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  result: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default TestMap;
