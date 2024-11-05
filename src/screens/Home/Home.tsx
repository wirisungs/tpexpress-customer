import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, TextInput, ScrollView, Alert, Dimensions, FlatList, Touchable, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import CaculatorIC from '../../svg/DucTri/Icons/HomeIcon/Caculator'
import LocationIC from '../../svg/DucTri/Icons/HomeIcon/Locaion'
import QuesIC from '../../svg/DucTri/Icons/HomeIcon/Ques'
import Banner from '../../svg/DucTri/Icons/HomeIcon/Banner1'
import { ImagesAssets } from "../../assets/DTri/ImageAssets";
import { InputWithIcon } from "../../components/Inputs/Inputs";
import SearchIC from '../../svg/DucTri/Icons/HomeIcon/Search'
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../../App";

interface HomeProps {
}

interface Promotion {
  orderId: string,
  receiverPhone: number,
  receiverName: string,
  receiverAddress: string,
  orderNote: string,
  orderCOD: number,
  totalPrice: number,
  orderType: string,
  orderStatusId: string,
  dservicesId: string,
  paymentId: string,
  cusId: string,
  driverId: string,
}

const bannerData = [
  { id: '1', image: <Banner />, text: 'Khuyến mãi 1' },
  { id: '2', image: <Banner />, text: 'Khuyến mãi 2' },
  { id: '3', image: <Banner />, text: 'Khuyến mãi 3' },
];

const screenWidth = Dimensions.get("window").width - 48;

const Home: React.FC<HomeProps> = () => {
  const [orderID, setOrderID] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleSearch = async () => {
    setLoading(true); // Bắt đầu tải dữ liệu
    try {
      const response = await fetch(`http://tpexpress.ddns.net:3000/api/ordersearch?orderID=${orderID.trim()}`);
      const data: Promotion[] = await response.json();

      if (data.length > 0) {
        // Nếu tìm thấy đơn hàng, chuyển đến màn hình OrderDetail
        navigation.navigate('OrderDetail', { item: data[0] });
      } else {
        Alert.alert("Thông báo", "Không tìm thấy mã đơn hàng!");
      }
    } catch (error) {
      console.error('Lỗi khi tìm kiếm:', error);
      Alert.alert("Lỗi", "Có lỗi xảy ra khi tìm kiếm. Vui lòng thử lại!");
    } finally {
      setLoading(false); // Kết thúc tải dữ liệu
    }
  };

  const handleScroll = (event: { nativeEvent: { contentOffset: { x: number; }; }; }) => {
    const slide = Math.round(event.nativeEvent.contentOffset.x / screenWidth);
    setActiveIndex(slide);
  };

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
              icon={<SearchIC />}
              value={orderID}
              // onChangeText={setOrderID}
              onChangeText={(text) => setOrderID(text.toUpperCase())}
              onIconPress={handleSearch}
              isBackground={true}
            />
          </View>
          <Image source={ImagesAssets.Xeday} style={styles.imageXe} resizeMode="contain" />
        </View>

      </LinearGradient>

      <View style={styles.body}>
        <Text style={styles.chucnang}>Chức năng</Text>
        <View style={styles.item}>

          <TouchableOpacity style={styles.item1} onPress={() => navigation.navigate('TTCP')}>
            <CaculatorIC />
            <Text style={styles.textcn}>Tra tính cước phí</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.item1} onPress={() => navigation.navigate('TestMap')}>
            <LocationIC />
            <Text style={styles.textcn}>Tra cứu bưu cục</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.item1} onPress={() => navigation.navigate('Helpdesk')}>
            <QuesIC />
            <Text style={styles.textcn}>Trợ giúp</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.news}>
          <Text style={styles.chucnang}>Tin tức</Text>

          <FlatList
            data={bannerData}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            onScroll={handleScroll}
            scrollEventThrottle={16}
            renderItem={({ item }) => (
              <View style={[styles.banner, { width: screenWidth }]}>
                {item.image}
              </View>
            )}
          />

          {/* Vòng lặp tạo các chấm tròn chỉ mục */}
          <View style={styles.dotsContainer}>
            {bannerData.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.dot,
                  { opacity: index === activeIndex ? 1 : 0.3 },
                ]}
              />
            ))}
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
    width: '100%',
    marginTop: 12
  },
  item1: {
    alignItems: 'center',
    padding: 8,
    width: 79.5,
    marginRight: 12
  },
  bannerContainer: {
    width: screenWidth,
  },
  banner: {
    marginVertical: 12,
    width: screenWidth,
    alignItems:'center'
  },
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 8,
  },
  dot: {
    height: 8,
    width: 8,
    borderRadius: 4,
    backgroundColor: "#EB455F", // Màu sắc của chấm tròn
    marginHorizontal: 4,
  },
  textcn: {
    fontSize: 12,
    textAlign: 'center',
    marginTop: 4,
  },
  viewtext: {
    justifyContent: 'center',
  },
  news: {
    marginVertical: 24
  },
  viewbanner: {
    
  },

  viewsearch: {
    flex: 1,
  },
  row: {
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
  textbanner: {
    margin: 12
  },
  imgitem: {
    height: 120
  },
  rowall: {
    paddingBottom: 12
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageXe: {
    zIndex: 1
  }
});



export default Home;
