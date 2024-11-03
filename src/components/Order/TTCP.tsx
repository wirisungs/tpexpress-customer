import React, { useState, useEffect } from "react";
import {
    ScrollView,
    View,
    Text,
    Alert,
    StyleSheet,
    StyleProp,
    TextStyle,
    TouchableOpacity,
    FlatList,
} from "react-native";
import { TransHeader } from "../../components/Layouts/Headers";
import Input, { InputWithIcon, PhoneInput } from "../../components/Inputs/Inputs";
import CheckboxText from "../../components/Inputs/CheckboxText";
import ButtonFill from "../../components/Buttons/Buttons";
import Marker from "../../svg/MTri/Marker";
import { NavigationProp, useIsFocused, useNavigation } from "@react-navigation/native";
import { Touchable } from "react-native";
import CancelIC from "../../svg/DucTri/Icons/Order/Cancel"
import axios from "axios";
import { RootStackParamList } from "../../../App";

const initialFormValues = {
    senderAddress: "",
    phoneNumber: "",
    receiverName: "",
    receiverAddress: "",
    packageName: "",
    weight: "",
    priceOfItem: "",
    ordernote: "",
    orderCOD: "",

};

const MAPBOX_API_KEY = "pk.eyJ1IjoiYmx1ZWR1Y2swOTA3IiwiYSI6ImNtMnI0ZWJ6aTEzengyanNibHpkanp4djEifQ.iaoeQHLQaLkNHLga6ZUffw"; // Thay bằng token Mapbox của bạn

interface Coordinates {
    latitude: number;
    longitude: number;
}

const TTCP = () => {
    const [formValues, setFormValues] = useState(initialFormValues);
    const [isChecked, setIsChecked] = useState(false);
    const [codInput, setCODInput] = useState(false);
    const [fragileInput, setFragileInput] = useState(false);
    const [inputErrors, setInputErrors] = useState({});
    const [orders, setOrders] = useState([{ id: 1 }]);
    const [showErrorNote, setShowErrorNote] = useState(false);
    // map
    const [originCoords, setOriginCoords] = useState<Coordinates | null>(null);
    const [destinationCoords, setDestinationCoords] = useState<Coordinates | null>(null);
    const [distance, setDistance] = useState<string | null>(null);

    const navigation = useNavigation<NavigationProp<RootStackParamList>>();


    const isFocused = useIsFocused();

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
            const originCoords = await getCoordinates(formValues.senderAddress);
            const destinationCoords = await getCoordinates(formValues.receiverAddress);
    
            setOriginCoords(originCoords);
            setDestinationCoords(destinationCoords);
    
            const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${originCoords.longitude},${originCoords.latitude};${destinationCoords.longitude},${destinationCoords.latitude}?access_token=${MAPBOX_API_KEY}`;
    
            const response = await axios.get(url);
            console.log("Response from Mapbox API:", response.data);
    
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
    

    const handleInputChange = (field: string, value: string) => {
        setFormValues((prev) => ({ ...prev, [field]: value }));
        setInputErrors((prev) => ({ ...prev, [field]: false }));
    };

    const renderError = (field: string) => {
        const errorMessage = inputErrors[field];
        return (
            errorMessage &&
            showErrorNote && (
                <Text className="text-primaryText-EB455F">
                    {errorMessage}
                </Text>
            )
        );
    };


    const nextToKQ = async () => {
        const calculatedDistance = await calculateDistance(); // Đợi hàm tính khoảng cách
        navigation.navigate("KQCP", {
            orders,
            COD: formValues.orderCOD || 0,
            fragileInput,
            distance: calculatedDistance, // Gửi giá trị đã tính toán
        });
    };


    const errorStyle: StyleProp<TextStyle> = { borderColor: "#EB455F" };

    return (
        <FlatList
            className="flex flex-col bg-grayBG-FCFCFC" showsVerticalScrollIndicator={false}
            data={[{ key: 'content' }]}
            renderItem={() => (
                <View className="content flex flex-col gap-6 p-6">
                    <TransHeader haveBackIcon={true} title="Tra tính cước phí" />

                    {/* Thông tin người gửi */}
                    <View className="sender-info flex flex-col gap-3">
                        <Text className="text-2xl font-bold">
                            Khoảng cách {distance} <Text className="text-primary">*</Text>
                        </Text>
                        <Text className="text-xl font-bold">
                            Nơi gửi 
                        </Text>
                        <InputWithIcon
                            placeholder="Tỉnh / Thành / Quận / Huyện"
                            value={formValues.senderAddress}
                            onChangeText={(val) => handleInputChange("senderAddress", val)}
                            style={inputErrors.senderAddress && errorStyle}
                            inputType="default"
                        />
                        {renderError("senderAddress")}
                        <Text>Vd: Người gửi ở Huyện Nhà Bè̀ thì chỉ ghi “Nha Be”</Text>
                    </View>

                    {/* Thông tin người nhận */}
                    <View className="receiver-info flex flex-col gap-3">
                        <Text className="text-xl font-bold">
                           Nơi nhận 
                        </Text>
                       
                        <InputWithIcon
                            placeholder="Địa chỉ"
                            value={formValues.receiverAddress}
                            onChangeText={(val) => handleInputChange("receiverAddress", val)}
                            style={inputErrors.receiverAddress && errorStyle}
                            inputType="default"
                        />
                        {renderError("receiverAddress")}
                        <Text>Vd: Người gửi ở Quận 5̀ thì chỉ ghi “Quan 5”</Text>
                    </View>

                    {/* Thông tin đơn hàng */}
                    <View className="receiver-info flex flex-col gap-3">
                        <Text className="text-xl font-bold">
                            Khối lượng & kích thước <Text className="text-primary">*</Text>
                        </Text>
                        <Input
                            placeholder="Nặng"
                            value={formValues.weight}
                            onChangeText={(val) => handleInputChange("weight", val)}
                            inputType="numeric"
                        />
                        {renderError("weight")}
                    </View>

                    {/* Thông tin tổng kiện hàng */}
                    <View style={styles.boxinfo} className="order-info flex flex-col gap-3">
                        

                        <CheckboxText
                            isChecked={isChecked}
                            onCheckChange={setIsChecked}
                            setCOD={setCODInput}
                        >
                            <Text>Thu hộ COD</Text>
                        </CheckboxText>
                        {codInput && (
                            <Input
                                placeholder="Phí thu hộ"
                                value={formValues.orderCOD}
                                onChangeText={(val) => handleInputChange("orderCOD", val)}
                                inputType="numeric"
                            />
                        )}
                        <ButtonFill onPress={nextToKQ}>
                            <Text className="text-white text-xl font-bold">Tra cứu</Text>
                        </ButtonFill>
       
                    </View>
                </View>
            )}
            keyExtractor={(item) => item.key}
        />

    );
};

const styles = StyleSheet.create({});

export default TTCP;
