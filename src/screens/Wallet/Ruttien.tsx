import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import TransHeader from "../../components/Layouts/Headers";
import Input, { InputWithIcon } from "../../components/Inputs/Inputs";
import CancelIC from "../../svg/DucTri/Icons/Wallet/Cancel";
import CheckboxText from "../../components/Inputs/CheckboxText";
import ButtonFill, {ButtonLine} from "../../components/Buttons/Buttons";

const Ruttien: React.FC = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [COD, setCOD] = useState(false);
  const handleCheckChange = (checked: boolean) => {
    setIsChecked(checked);
  };

  const handleOnClick = () => {
    
  };
  
  return (
    <View style={styles.container}>
       <TransHeader  
        haveBackIcon={true}   
        title="Rút tiền về ngân hàng"  
      />  
      <View style={styles.body}>
        <View style={styles.row1}>
            <Text style={styles.text1}>Nhập số tiền cần rút</Text>
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
         <View style={styles.ckbox}>
         <CheckboxText
           isChecked={isChecked}
           onCheckChange={handleCheckChange}
           setCOD={setCOD}
          >
        <Text style={styles.textyes}>Đồng ý điều khoản</Text>
      </CheckboxText>
         </View>
         <Text style={styles.text1}>Rút tiền về</Text>
      </View>
      <View style={styles.btnnap}>
      <View style={styles.total}>
          <Text style={styles.text1}>Tổng tiền:</Text>
          <Text style={styles.txmoney}>106.700đ</Text>
        </View>
      <ButtonFill  onPress={() => handleOnClick()}>
          <Text className="text-white text-xl font-bold">Rút</Text>
      </ButtonFill>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 24,
    backgroundColor:'#fcfcfc'
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
  },
  textyes:{
    color:'#B6B6B6',
    fontSize: 16,
    marginLeft: 4
  },
  ckbox:{
    marginBottom: 24
  },
  btnnap:{
    marginHorizontal: 24
  },
  total:{
    flexDirection:'row',
    justifyContent:'space-between',
    paddingVertical: 24
  },
  txmoney:{
    color:'#F9801D',
    fontSize: 20,
    fontWeight:'medium'
  }
});

export default Ruttien;
