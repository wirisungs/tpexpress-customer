import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import BoxIC from '../../svg/DucTri/Icons/NofiIcon/BoxRed';
import WalletIC from '../../svg/DucTri/Icons/NofiIcon/Wallet';

export default function Nofibox({ nofi }: { nofi: string }) {

    const formatDateString = (date: Date) => {
        return date.toLocaleDateString('vi-VN', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        });
      };

      return (
        <View style={styles.container}>
            {nofi && nofi.length > 0 ? (
                nofi.slice().reverse().map((item, index) => (
                    <TouchableOpacity key={index} style={styles.boxall}>
                        <View style={styles.viewbox}>
                            <BoxIC />
                        </View>
                        <View style={styles.viewtext}>
                            <View style={styles.row1}>
                                <Text style={styles.orderText}>Đơn hàng </Text>
                                <Text style={styles.day}>{formatDateString(new Date(item.nofiTime))}</Text>
                            </View>
                            <View style={styles.row2}>
                                <Text style={styles.textbig} numberOfLines={1} ellipsizeMode="tail">
                                    {item.nofiTitle}
                                </Text>
                                <Text numberOfLines={1} ellipsizeMode="tail" style={styles.textdetail}>{item.nofiContent}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                ))
            ) : (
                <Text>Không có thông báo nào</Text>
            )}
        </View>
    );
    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24
    },
    boxall: {
        flexDirection: 'row',
        paddingBottom: 12
    },
    viewbox: {
        paddingVertical: 12,
        paddingHorizontal: 8,
    },
    viewtext: {
        flex: 1,  // This will allow the text section to take up available space
        padding: 12,
    },
    row1: {
        flexDirection: 'row',
        justifyContent: 'space-between',  // Ensure space between 'Đơn hàng' and date
        alignItems: 'center',
    },
    orderText: {
        fontSize: 12,
        fontWeight: 'regular',
    },
    day: {
        fontSize: 14,
        color: '#495DC1',
        textAlign: 'right',
    },
    textbig: {
        fontSize: 18,
        fontWeight: '700',
        paddingBottom: 8
    },
    textdetail: {
        fontSize: 12,
        fontWeight: 'regular',
        color: '#767676'
    },
    row2: {
        marginTop: 8,
    }
});
