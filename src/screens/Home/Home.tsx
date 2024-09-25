import React from "react";
import { StyleSheet, Text, View,Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { ImagesAssets } from "../../assets/DTri/ImageAssets";

interface HomeProps {
  // Định nghĩa props nếu cần
}

const Home: React.FC<HomeProps> = () => {
  return (
    <View style={styles.container}>
      <LinearGradient colors={["#F9801D", "#F44336"]} style={styles.topliner}>
          <View style={styles.top}>
              <Text style={styles.title}>Theo dõi đơn hàng của bạn</Text>
              <Text style={styles.title1}>Hãy chắc chắn rằng Mã đơn hàng của bạn chính xác</Text>
              <Image source={ImagesAssets.CarOrder} style={styles.car} />
          </View>
      </LinearGradient>
    
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    flex: 1,
    // justifyContent: "center",
    alignItems: "center", // ngang
    
  },
  topliner:{
     height: 335,
     width: '100%',
     borderBottomLeftRadius: 32,
     borderBottomRightRadius: 32,
     padding: 24
  },
  top:{
     alignItems: "center", // ngang
     marginTop: 57
  },
  title:{
    fontSize: 24,
    color:'#ffffff',
    fontWeight:'bold',
  },
  title1:{
    fontSize: 14,
    color:'#ffffff',
    fontWeight:'medium',
    paddingVertical: 10
  },
  car:{
    width:'100%'
  }
});

export default Home;
