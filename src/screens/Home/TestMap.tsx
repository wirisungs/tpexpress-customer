import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import axios from "axios";

const MAPBOX_API_KEY = "pk.eyJ1IjoiYmx1ZWR1Y2swOTA3IiwiYSI6ImNtMnI0ZWJ6aTEzengyanNibHpkanp4djEifQ.iaoeQHLQaLkNHLga6ZUffw"; // Thay bằng token Mapbox của bạn

interface Coordinates {
    latitude: number;
    longitude: number;
}

const DistanceCalculator = () => {
    const [senderAddress, setSenderAddress] = useState("");
    const [receiverAddress, setReceiverAddress] = useState("");
    const [distance, setDistance] = useState<string | null>(null);
    const [addressSuggestions, setAddressSuggestions] = useState<any[]>([]);

    // Hàm lấy tọa độ của địa chỉ
    const getCoordinates = async (address: string) => {
        try {
            const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json&addressdetails=1&limit=1`; // Giới hạn kết quả chỉ 1
            const response = await axios.get(url);
            if (response.data.length === 0) {
                Alert.alert("Lỗi", `Không thể tìm thấy tọa độ cho địa chỉ: ${address}`);
                return null; // Nếu không có kết quả, trả về null
            }
            const { lat, lon } = response.data[0]; // Lấy tọa độ đầu tiên tìm thấy
            return { latitude: parseFloat(lat), longitude: parseFloat(lon) };
        } catch (error) {
            console.error(error);
            Alert.alert("Lỗi", `Không thể tìm thấy tọa độ cho địa chỉ: ${address}`);
            throw error;
        }
    };

    // Hàm tìm kiếm gợi ý địa chỉ
    const searchAddress = async (query: string) => {
        try {
            if (!query) {
                setAddressSuggestions([]); // Nếu không có gì để tìm kiếm, xóa gợi ý
                return;
            }

            const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&addressdetails=1&limit=5`; // Lấy tối đa 5 gợi ý
            const response = await axios.get(url);

            setAddressSuggestions(response.data); // Cập nhật gợi ý với kết quả trả về
        } catch (error) {
            console.error(error);
            Alert.alert("Lỗi", "Không thể tìm thấy gợi ý địa chỉ.");
        }
    };

    // Hàm tính khoảng cách giữa hai tọa độ bằng Mapbox Directions API
    const calculateDistance = async () => {
        if (!senderAddress || !receiverAddress) {
            Alert.alert("Lỗi", "Vui lòng nhập đầy đủ địa chỉ người gửi và người nhận.");
            return;
        }

        try {
            const originCoords = await getCoordinates(senderAddress);
            const destinationCoords = await getCoordinates(receiverAddress);

            if (!originCoords || !destinationCoords) {
                // Nếu không tìm được tọa độ, không tính khoảng cách
                return;
            }

            const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${originCoords.longitude},${originCoords.latitude};${destinationCoords.longitude},${destinationCoords.latitude}?access_token=${MAPBOX_API_KEY}`;

            const response = await axios.get(url);
            if (!response.data.routes || response.data.routes.length === 0) {
                Alert.alert("Lỗi", "Không tìm thấy tuyến đường hợp lệ.");
                setDistance(null); // Reset distance
                return;
            }

            const distanceMeters = response.data.routes[0].distance;
            const distanceKm = (distanceMeters / 1000).toFixed(2); // Đổi sang km

            setDistance(`${distanceKm} km`); // Cập nhật giá trị distance trong state
        } catch (error) {
            console.error(error);
            Alert.alert("Lỗi", "Có lỗi xảy ra khi tính khoảng cách.");
            setDistance(null); // Reset distance
        }
    };

    // Hàm xử lý khi chọn gợi ý địa chỉ
    const handleAddressSelect = (address: string) => {
        setSenderAddress(address); // Cập nhật ô nhập địa chỉ người gửi
        setAddressSuggestions([]); // Ẩn danh sách gợi ý
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Tính khoảng cách</Text>

            <Text>Địa chỉ người gửi:</Text>
            <TextInput
                style={styles.input}
                placeholder="Nhập địa chỉ người gửi"
                value={senderAddress}
                onChangeText={text => {
                    setSenderAddress(text);
                    searchAddress(text); // Tìm kiếm gợi ý khi người dùng nhập
                }}
            />

            {addressSuggestions.length > 0 && (
                <FlatList
                    data={addressSuggestions}
                    keyExtractor={(item) => item.place_id}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => handleAddressSelect(item.display_name)}>
                            <Text style={styles.suggestionItem}>{item.display_name}</Text>
                        </TouchableOpacity>
                    )}
                />
            )}

            <Text>Địa chỉ người nhận:</Text>
            <TextInput
                style={styles.input}
                placeholder="Nhập địa chỉ người nhận"
                value={receiverAddress}
                onChangeText={setReceiverAddress}
            />

            <Button title="Tính khoảng cách" onPress={calculateDistance} />

            {distance && (
                <Text style={styles.result}>
                    Khoảng cách: {distance}
                </Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
    input: {
        height: 40,
        borderColor: "#ccc",
        borderWidth: 1,
        marginBottom: 15,
        paddingLeft: 10,
        width: "80%",
    },
    result: {
        marginTop: 20,
        fontSize: 18,
        fontWeight: "bold",
    },
    suggestionItem: {
        padding: 10,
        backgroundColor: "#f8f8f8",
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
        width: "80%",
    },
});

export default DistanceCalculator;
