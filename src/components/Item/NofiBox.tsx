import React from "react";
import { StyleSheet, Text, View,TouchableOpacity } from "react-native";
import BoxIC from '../../svg/DucTri/Icons/NofiIcon/BoxRed';
import WalletIC from '../../svg/DucTri/Icons/NofiIcon/Wallet';

export default function Nofibox() {

  return (
    <View style={styles.container}>
        <TouchableOpacity style={styles.boxall}>
       
            <View style={styles.viewbox}>
               <BoxIC/>
            </View>

            <View style={styles.viewtext}>
                <View style={styles.row1}>
                   <Text style={styles.orderText}>Đơn hàng</Text>
                   <Text style={styles.day}>12/07/2024</Text>
                </View>
                <View style={styles.row2}>
                <Text style={styles.textbig} numberOfLines={1} ellipsizeMode="tail">
                    Đơn hàng đã giao thành công
                </Text>
                    <Text numberOfLines={1} ellipsizeMode="tail" style={styles.textdetail}>Đơn hàng HDIW67AS của bạn đã được giao thành công</Text>
                </View>
            </View>
       
        </TouchableOpacity>
        <TouchableOpacity style={styles.boxall}>
       
       <View style={styles.viewbox}>
          <WalletIC/>
       </View>

       <View style={styles.viewtext}>
           <View style={styles.row1}>
              <Text style={styles.orderText}>Ví ThienPhuc</Text>
              <Text style={styles.day}>12/07/2024</Text>
           </View>
           <View style={styles.row2}>
               {/* <Text style={styles.textbig}>Đã nạp 100.000đ vào ví ThienPhuc</Text> */}
               <Text style={styles.textbig} numberOfLines={1} ellipsizeMode="tail">
                   Đã nạp 100.000đ vào ví ThienPhuc
               </Text>
               <Text style={styles.textdetail} numberOfLines={1} ellipsizeMode="tail">Đơn hàng HDIW67AS của bạn đã được giao thành công</Text>
           </View>
       </View>
  
   </TouchableOpacity>
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
        fontWeight:'regular',
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
    textdetail:{
        fontSize: 12,
        fontWeight:'regular',
        color:'#767676'
    },
    row2: {
        marginTop: 8,
    }
});
