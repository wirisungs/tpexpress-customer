import React from "react";
import { StyleSheet, Text, View,Image,TextInput, ScrollView, Alert } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import CaculatorIC from '../../svg/DucTri/Icons/HomeIcon/Caculator'
import LocationIC from '../../svg/DucTri/Icons/HomeIcon/Locaion'
import PromotionIC from '../../svg/DucTri/Icons/HomeIcon/Promotion'
import QuesIC from '../../svg/DucTri/Icons/HomeIcon/Ques'
import Banner from '../../svg/DucTri/Icons/HomeIcon/Banner1'
import { ImagesAssets } from "../../assets/DTri/ImageAssets";
import { InputWithIcon } from "../../components/Inputs/Inputs";
import SearchIC from '../../svg/DucTri/Icons/HomeIcon/Search'

interface HomeProps {
  
}

const Home: React.FC<HomeProps> = () => {
  return (
    <ScrollView style={styles.container}>
      <LinearGradient colors={["#F9801D", "#F44336"]} style={styles.topliner}>
          <View style={styles.top}>
              <Text style={styles.title}>Theo dõi đơn hàng của bạn</Text>
              <Text style={styles.title1}>Hãy chắc chắn rằng Mã đơn hàng của bạn chính xác</Text>
              
              <View style={styles.viewsearch}>
                <InputWithIcon
                  placeholder="Nhập mã đơn vận chuyển"
                  inputType="default"
                  icon = {<SearchIC/>}
                  onIconPress={() => Alert.alert("Icon được nhấn!")}
                />
              </View>
              <Image source={ImagesAssets.Xeday} style={styles.imageXe} resizeMode="contain" />
          </View>
        
      </LinearGradient>

      <View style={styles.body}>
            <Text style={styles.chucnang}>Chức năng</Text>
            <View style={styles.item}>
              <View style={styles.item1}>
                <CaculatorIC/>
                <Text style={styles.textcn}>Tra tính cước phí</Text>        
              </View>
              <View style={styles.item1}>
                <LocationIC/>
                <Text style={styles.textcn}>Tra cứu bưu cục</Text>
              </View>
              <View style={styles.item1}>
                <PromotionIC/>
                <Text style={styles.textcn}>Mã ưu đãi</Text>
              </View>
              <View style={styles.item1}>
                <QuesIC/>
                <Text style={styles.textcn}>Trợ giúp</Text>
              </View>
            </View>
            <View style={styles.news}>
              <Text style={styles.chucnang}>Tin tức</Text>
              <View style={styles.viewbanner}>
                 <Banner style={styles.banner}/>
              </View>
            </View>
            <View style={styles.news}>
              <Text style={styles.chucnang}>Ưu đãi</Text>

              <View style={styles.rowall}>

                 <View style={styles.row}>

                   <View style={styles.itemrow}>

                     <View style={styles.imgitem}>
                         <Image source={ImagesAssets.Itembox} style={styles.image} resizeMode="contain" />
                     </View>

                     <Text style={styles.textbanner}>Giảm 10% cho những đơn hàng...</Text>
                   </View>

                   <View style={styles.itemrow}>
                     <View style={styles.imgitem}>
                         <Image source={ImagesAssets.Itembox} style={styles.image} resizeMode="contain" />
                     </View>
                     <Text style={styles.textbanner}>Giảm 10% cho những đơn hàng...</Text>
                   </View>

                 </View>
                 
              </View>
            </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fcfcfc",
    flex: 1,
  },
  topliner: {
    height: 335,
    width: '100%',
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    padding: 24,
  },
  top: {
    alignItems: 'center', // ngang
    marginTop: 57,
  },
  title: {
    fontSize: 24,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  title1: {
    fontSize: 14,
    color: '#ffffff',
    fontWeight: 'medium',
    paddingVertical: 10,
  },
  car: {
    width: '100%',
    marginTop: 100
  },
  body: {
    padding: 24,
    // marginBottom: 24
  },
  chucnang: {
    fontSize: 28,
    fontWeight: '700',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Chia đều không gian giữa các item1
    width: '100%',
    marginTop: 12
  },
  item1: {
    flex: 1, // Cho phép mỗi item chiếm đều không gian
    alignItems: 'center',
    padding: 4,
  },
  textcn: {
    fontSize: 12,
    textAlign: 'center',
    marginTop: 4,
  },
  viewtext: {
    justifyContent: 'center',
  },
  news:{
    marginVertical: 24
  },
  viewbanner:{
     alignItems:'center'
  },
  banner:{
    marginVertical: 12
  },
  viewsearch:{
    flex:1, 
  },
  row:{
    flexDirection: 'row',
    justifyContent: 'space-between', 
    width: '100%',
    marginTop: 12,
  },
  itemrow: {
    width: 165,
    height: 173,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  textbanner:{
    margin: 12
  },
  imgitem:{
    height: 120
  },
  rowall:{
    paddingBottom: 12
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageXe:{
    zIndex: -1
  }
});



export default Home;
