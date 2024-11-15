import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Modal, Dimensions } from "react-native";
import { CommonActions, NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../../App";
import { ChooseInfoBox } from "../../components/Box/InfoBox";
import MoreIC from "../../svg/MTri/MoreIC";
import CancelIC from "../../svg/DucTri/Icons/Order/Drop";
import CashIC from "../../svg/DucTri/Icons/Order/cash";
import AtmIC from "../../svg/DucTri/Icons/Order/atm";
import MomoIC from "../../svg/DucTri/Icons/Order/momo";



const Wallet = ({onSelectPayment }) => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const [isPaymentPopupVisible, setPaymentPopupVisible] = useState(false);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
    const handleOpenPaymentPopup = () => setPaymentPopupVisible(true);
    const handleClosePaymentPopup = () => setPaymentPopupVisible(false);
    const [payment, setPayment] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://tpexpress.ddns.net:3000/api/Payment');
                const promotionsData = await response.json();
                setPayment(promotionsData);
            } catch (error) {
                console.error('Lỗi khi lấy dữ liệu:', error);
            }
        };
        fetchData();
    }, []);

    const getPaymentIcon = (serviceId: any) => {
        switch (serviceId) {
            case 'P001':
                return <CashIC />;
            case 'P002':
                return <AtmIC />;
            case 'P003':
                return <MomoIC />;
            default:
                return null; // Nếu không có icon phù hợp
        }
    };


    return (
        <View style={styles.container}>
            <View className="package-info flex flex-col gap-3">
                <Text style={styles.tx1}>Hình thức thanh toán</Text>
                <TouchableOpacity
                    className="choose-input flex flex-col gap-2"
                    onPress={handleOpenPaymentPopup}
                >
                    <ChooseInfoBox
                        icon={<MoreIC />}
                        value={selectedPaymentMethod?.Pay_Name ?? "Chọn hình thức thanh toán"}
                    />
                </TouchableOpacity>

                {!selectedPaymentMethod?.Pay_Name && (
                    <Text style={styles.madon2}>Hãy chọn hình thức thanh toán</Text>
                )}
            </View>
            <Modal
                visible={isPaymentPopupVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={handleClosePaymentPopup}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.popupContent}>
                        <TouchableOpacity style={styles.dropic} onPress={handleClosePaymentPopup}>
                            <CancelIC />
                        </TouchableOpacity>

                        {payment.map((item, index) => (
                            <View key={index}>
                                <TouchableOpacity
                                    style={styles.itemservice}
                                    onPress={() => {
                                        onSelectPayment(item); 
                                        setSelectedPaymentMethod(item);
                                        handleClosePaymentPopup(); // Mở popup
                                    }}
                                >
                                    {getPaymentIcon(item.Pay_ID)}
                                    <View style={styles.textservice}>
                                        <View style={styles.row1}>
                                            <Text style={styles.popupTitle}>{item.Pay_Name}</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        ))}
                    </View>
                </View>
            </Modal>
        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    tx1: {
        color: '#111111',
        fontSize: 20,
        fontWeight: 'bold',
        paddingVertical: 12
    },
    modalContainer: {
        flex: 1,
        justifyContent: "flex-end",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    popupContent: {
        height: Dimensions.get("window").height * 0.390,
        backgroundColor: "#fff",
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        // padding: 24,
        paddingHorizontal: 24
    },
    dropic: {
        alignItems: 'center',
        marginBottom: 12
    },
    itemservice: {
        flexDirection: 'row',
        alignItems: 'center',
        // backgroundColor:'#ffff00',
        paddingVertical: 8
    },
    textservice: {
        flexDirection: 'column',
        marginLeft: 8,
        paddingHorizontal: 12,
        flex: 1,
    },
    popupTitle: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 6,
    },
    row1: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    madon2: {
        fontSize: 14,
        color: '#F44336',
        fontWeight: 'bold',
      },
});

export default Wallet;
