import { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner, BarCodeScannerResult } from 'expo-barcode-scanner';
import { TransHeader } from '../../components/Layouts/Headers';
import KhuonQR from "../../svg/DucTri/Icons/Wallet/KhuonQR";

export default function ScanQR() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null); // Khai báo kiểu dữ liệu rõ ràng
  const [scanned, setScanned] = useState<boolean>(false);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();
  }, []);

  // Hàm xử lý khi quét mã QR thành công
  const handleBarCodeScanned = ({ type, data }: BarCodeScannerResult) => {
    setScanned(true);
    alert(`Mã vạch với loại ${type} và dữ liệu ${data} đã được quét!`);
  };

  // Trường hợp chưa có quyền truy cập camera
  if (hasPermission === null) {
    return <Text>Đang yêu cầu quyền truy cập camera...</Text>;
  }

  // Trường hợp không có quyền truy cập camera
  if (hasPermission === false) {
    return <Text>Không có quyền truy cập camera</Text>;
  }

  return (
    <View style={styles.container}>
      <TransHeader  
        haveBackIcon={true}   
        title="Quét mã thanh toán"  
      />  
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={styles.camera}
      >
        <KhuonQR style={styles.vgqr} />
      </BarCodeScanner>
      {scanned && (
        <Button title={'Nhấn để quét lại'} onPress={() => setScanned(false)} />
      )}
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  camera: {
    flex: 1,
    alignItems: 'center',
  },
  vgqr: {
    marginTop: 36,
  },
});
