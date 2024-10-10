import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import TransHeader from "../../components/Layouts/Headers";
import Input, { InputWithIcon } from "../../components/Inputs/Inputs";
import CancelIC from "../../svg/DucTri/Icons/Wallet/Cancel";

const Ruttien: React.FC = () => {
  
  return (
    <View style={styles.container}>
       <TransHeader  
        haveBackIcon={true}   
        title="Rút tiền về ngân hàng"  
      />  
      <View style={styles.body}>
        <View style={styles.row1}>
            <Text style={styles.text1}>Nhập số tiền cần nạp</Text>
            <Text style={styles.text2}>(Số dư: 0đ)</Text>
        </View>      
         <InputWithIcon inputType="numeric" placeholder="100.000" icon={<CancelIC />} />  
         <View style={styles.viewmoney}>
           <TouchableOpacity style={styles.btnmoney}>
              <Text style={styles.textmoney}>50.000đ</Text>
           </TouchableOpacity> 
           <TouchableOpacity style={styles.btnmoney}>
              <Text  style={styles.textmoney}>50.000đ</Text>
           </TouchableOpacity>
           <TouchableOpacity style={styles.btnmoney}>
              <Text  style={styles.textmoney}>50.000đ</Text>
           </TouchableOpacity>
         </View>
         
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body:{
    backgroundColor:'#fcfcfc',
    flex: 1,
    padding: 24
  },
  row1:{
    flexDirection: 'row' ,
    alignItems: 'center',
    marginBottom: 16
  },
  text1:{
    fontSize: 20,
    fontWeight:'bold'
  },
  text2:{
    color:'#F9801D',
    marginLeft: 4
  },
  viewmoney:{
    flexDirection: 'row',
    paddingVertical: 24,
    justifyContent: "space-between", 
  },
  btnmoney:{
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor:'#767676'
  },
  textmoney:{
    fontSize: 16,
    fontWeight:'regular',
    color:'#767676'
  }
});

export default Ruttien;
