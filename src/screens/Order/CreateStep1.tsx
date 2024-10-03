import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
} from "react-native";;
import { LinearGradient } from "expo-linear-gradient";

interface CreateStep1Props {
  navigation: any;
}

const unitsLong = [
  { label: "cm", value: "cm" },
  { label: "dm", value: "dm" },
  { label: "m", value: "m" },
];

const unitsKL = [
  { label: "g", value: "g" },
  { label: "kg", value: "kg" },
];

export default function CreateStep1({ navigation }: CreateStep1Props) {
  const [selectedUnitKL, setSelectedUnitKL] = useState<string>("g");
  const [selectedUnitDai, setSelectedUnitDai] = useState<string>("cm");
  const [selectedUnitRong, setSelectedUnitRong] = useState<string>("cm");
  const [selectedUnitCao, setSelectedUnitCao] = useState<string>("cm");

  const [number, setNumber] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [locationsend, setLocationSend] = useState<string>("");
  const [namepro, setNamepro] = useState<string>("");
  const [kl, setKL] = useState<string>("");
  const [sl, setSL] = useState<string>("");
  const [dai, setDai] = useState<string>("");
  const [rong, setRong] = useState<string>("");
  const [cao, setCao] = useState<string>("");
  const [note, setNote] = useState<string>("");
  const [pth, setPTH] = useState<string>("");

  const changeKL = (): number | undefined => {
    let result;
    const klValue = parseFloat(kl);
    if (selectedUnitKL === "g") {
      result = klValue * 1;
    } else if (selectedUnitKL === "kg") {
      result = klValue * 1000;
    }
    return result;
  };

  const changeDai = (): number | undefined => {
    let result;
    const daiValue = parseFloat(dai);
    if (selectedUnitDai === "cm") {
      result = daiValue * 1;
    } else if (selectedUnitDai === "dm") {
      result = daiValue * 10;
    } else if (selectedUnitDai === "m") {
      result = daiValue * 100;
    }
    return result;
  };

  const changeRong = (): number | undefined => {
    let result;
    const rongValue = parseFloat(rong);
    if (selectedUnitRong === "cm") {
      result = rongValue * 1;
    } else if (selectedUnitRong === "dm") {
      result = rongValue * 10;
    } else if (selectedUnitRong === "m") {
      result = rongValue * 100;
    }
    return result;
  };

  const changeCao = (): number | undefined => {
    let result;
    const caoValue = parseFloat(cao);
    if (selectedUnitCao === "cm") {
      result = caoValue * 1;
    } else if (selectedUnitCao === "dm") {
      result = caoValue * 10;
    } else if (selectedUnitCao === "m") {
      result = caoValue * 100;
    }
    return result;
  };

  const nextpage = () => {
    if (
      !location ||
      !locationsend ||
      !number ||
      !name ||
      !namepro ||
      !kl ||
      !sl ||
      !dai ||
      !rong ||
      !cao.trim()
    ) {
      Alert.alert("Lưu ý", "Bạn cần nhập đầy đủ thông tin!");
      return;
    } else {
      navigation.navigate("TraCuocPhi", {
        location,
        locationsend,
        number,
        name,
        namepro,
        kl: changeKL(),
        sl,
        dai: changeDai(),
        rong: changeRong(),
        cao: changeCao(),
        note,
        pth: pth ? pth : 0,
      });
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
      <View style={styles.row1}>
          <Text style={styles.text1}>Thông tin người gửi *</Text>
    
          <View style={styles.inputAll}>
            <View style={styles.inputContainer}>
              <TextInput
                onChangeText={setLocationSend}
                value={locationsend}
                placeholder="Địa chỉ"
                style={styles.input}
              />
              <TouchableOpacity style={styles.imageContainer}>
                {/* <Image source={ImagesAssets.Map} style={styles.imgMap} /> */}
              </TouchableOpacity>
            </View>
            <Text style={styles.textnote}>
              Lưu ý: Không được để trống bất kì ô nào
            </Text>
          </View>
        </View>
        <View style={styles.row2}>
          <Text style={styles.text1}>Thông tin người nhận *</Text>
          <View style={styles.inputAll}>
            <TextInput
              onChangeText={setNumber}
              value={number}
              keyboardType="numeric"
              placeholder="Số điện thoại"
              style={styles.input}
            />
          </View>
          <View style={styles.inputAll}>
            <TextInput
              onChangeText={setName}
              value={name}
              placeholder="Họ tên"
              style={styles.input}
            />
          </View>
          <View style={styles.inputAll}>
            <View style={styles.inputContainer}>
              <TextInput
                onChangeText={setLocation}
                value={location}
                placeholder="Địa chỉ"
                style={styles.input}
              />
              <TouchableOpacity style={styles.imageContainer}>
                {/* <Image source={ImagesAssets.Map} style={styles.imgMap} /> */}
              </TouchableOpacity>
            </View>
            <Text style={styles.textnote}>
              Lưu ý: Không được để trống bất kì ô nào
            </Text>
          </View>
        </View>
        <View style={styles.row2}>
          <Text style={styles.text1}>Thông tin đơn hàng *</Text>
          <View style={styles.inputAll}>
            <TextInput
              onChangeText={setNamepro}
              value={namepro}
              placeholder="Tên hàng"
              style={styles.input}
            />
          </View>
          <View style={styles.inputAll}>
            <View style={styles.inputContainer}>
              <TextInput
                onChangeText={setKL}
                value={kl}
                keyboardType="numeric"
                placeholder="Khối lượng hàng"
                style={styles.input}
              />          
            </View>
          </View>
          <Text >Thêm hàng</Text>
        </View>

        <View style={styles.row1}>
          <Text style={styles.text1}>Thông tin tổng kiện hàng *</Text>
          <View style={styles.inputAll}>
            <View style={styles.inputContainer}>
              <TextInput
                onChangeText={setDai}
                value={dai}
                placeholder="Chiều dài"
                keyboardType="numeric"
                style={styles.input}
              />
              
            </View>
          </View>
          <View style={styles.inputAll}>
            <View style={styles.inputContainer}>
              <TextInput
                onChangeText={setRong}
                value={rong}
                placeholder="Chiều rộng"
                keyboardType="numeric"
                style={styles.input}
              />
          
            </View>
          </View>
          <View style={styles.inputAll}>
            <View style={styles.inputContainer}>
              <TextInput
                onChangeText={setCao}
                value={cao}
                placeholder="Chiều cao"
                keyboardType="numeric"
                style={styles.input}
              />
              
            </View>
          </View>
          <View style={styles.inputAll}>
            <TextInput
              onChangeText={setNote}
              value={note}
              placeholder="Ghi chú"
              style={styles.input}
            />
          </View>
          <Text style={styles.textnote}>
            Không bắt buộc
          </Text>
          <View style={styles.inputAll}>
            <TextInput
              onChangeText={setPTH}
              value={pth}
              keyboardType="numeric"
              placeholder="Phí thu hộ"
              style={styles.input}
            />
          </View>
        </View>
         <TouchableOpacity onPress={nextpage}>
          <LinearGradient
            colors={["#04BF45", "#1C9546"]}
            style={styles.btnnext}
          >
            <Text style={styles.textnext}>Tiếp theo</Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  row1: {
    padding: 24,
    marginTop: 36
  },
  row2: {
    padding: 24,
  },
  text1: {
    fontWeight: "bold",
    fontSize: 20,
  },
  inputAll: {
    marginTop: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#E2E2E2",
    borderRadius: 12,
    padding: 12,
    flex: 1,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  textnote: {
    marginTop: 20,
    color: "#F44336",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  // imgMap: {
  //   width: 24,
  //   height: 24,
  //   position: "absolute",
  //   right: 20,
  // },
  btnnext: {
    alignItems: "center",
    borderRadius: 20,
    padding: 16,
    marginBottom: 80,
    marginHorizontal: 20,
  },
  textnext: {
    fontWeight: "600",
    color: "#ffffff",
    fontSize: 20,
  },
});

