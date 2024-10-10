import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Alert,Image } from 'react-native';

export default function TestPush({ navigation }) {
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');
  const [promotions, setPromotions] = useState([]);
  const [selectedId, setSelectedId] = useState(null); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://192.168.1.20:3000/api/User'); 
        const promotionsData = await response.json();
        setPromotions(promotionsData);
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu:', error);
      }
    }; 
  

    fetchData();
  }, []);

  const handleSubmit = async () => {
    if (!text1.trim() || !text2.trim()) {
      Alert.alert('Lỗi', 'Bạn cần nhập dữ liệu!');
      return;
    }

    try {
      const response = await fetch('http://192.168.1.20:3000/api/User', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: text1, password: text2 }), 
      });

      const result = await response.json();

      if (response.ok) {
        Alert.alert('Thành công', 'Dữ liệu đã được thêm thành công!');
        const fetchData = async () => {
          try {
            const response = await fetch('http://192.168.1.20:3000/api/User');
            const promotionsData = await response.json();
            setPromotions(promotionsData);
          } catch (error) {
            console.error('Lỗi khi lấy dữ liệu:', error);
          }
        };
        fetchData();
        setText1('');
        setText2('');
      } else {
        Alert.alert('Lỗi', result.error || 'Có lỗi xảy ra khi gửi dữ liệu.');
      }
    } catch (error) {
      console.error('Lỗi khi gửi dữ liệu:', error);
      Alert.alert('Lỗi', 'Có lỗi xảy ra khi gửi dữ liệu.');
    }
  };

  const handleDelete = async () => {
    if (!selectedId) {
      Alert.alert('Lỗi', 'Bạn cần chọn một mục để xóa!');
      return;
    }

    try {
      const response = await fetch(`http://192.168.1.20:3000/api/User/${selectedId}`, {
        method: 'DELETE',
      });

      const result = await response.json();

      if (response.ok) {
        Alert.alert('Thành công', 'Dữ liệu đã được xóa thành công!');
        setPromotions(promotions.filter((item) => item._id !== selectedId));
        setSelectedId(null);
        setText1('');
        setText2('');
      } else {
        Alert.alert('Lỗi', result.error || 'Có lỗi xảy ra khi xóa dữ liệu.');
      }
    } catch (error) {
      console.error('Lỗi khi xóa dữ liệu:', error);
      Alert.alert('Lỗi', 'Có lỗi xảy ra khi xóa dữ liệu.');
    }
  };

  const handleUpdate = async () => {
    if (!selectedId) {
      Alert.alert('Lỗi', 'Bạn cần chọn một mục để cập nhật!');
      return;
    }
  
    if (!text1.trim() || !text2.trim()) {
      Alert.alert('Lỗi', 'Bạn cần nhập dữ liệu!');
      return;
    }
  
    try {
      const response = await fetch(`http://192.168.1.20:3000/api/User/${selectedId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: text1, password: text2 }),
      });
  
      const result = await response.json();
  
      if (response.ok) {
        Alert.alert('Thành công', 'Dữ liệu đã được cập nhật thành công!');
        const fetchData = async () => {
          try {
            const response = await fetch('http://192.168.1.20:3000/api/User');
            const promotionsData = await response.json();
            setPromotions(promotionsData);
          } catch (error) {
            console.error('Lỗi khi lấy dữ liệu:', error);
          }
        };
        fetchData();
        setText1('');
        setText2('');
        setSelectedId(null);
      } else {
        Alert.alert('Lỗi', result.error || 'Có lỗi xảy ra khi cập nhật dữ liệu.');
      }
    } catch (error) {
      console.error('Lỗi khi cập nhật dữ liệu:', error);
      Alert.alert('Lỗi', 'Có lỗi xảy ra khi cập nhật dữ liệu.');
    }
  };
  

  const handleEdit = (item) => {
    setText1(item.username);
    setText2(item.password);
    setSelectedId(item._id);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.imgB} onPress={() => navigation.goBack()}>
            {/* <Image
            // source={require('../../assets/muitenden.png')}
            style={styles.imgBack}
            /> */}
        </TouchableOpacity>

      {promotions.map((item, index) => (
        <TouchableOpacity key={index}  onPress={() => handleEdit(item)}>
          <View style={styles.boxC}>
            <Text>{item.username}</Text>
            <Text>{item.password}</Text>
          </View>
        </TouchableOpacity>
      ))}

      <TextInput
        onChangeText={setText1}
        value={text1}
        placeholder="Nhập tên"
        style={styles.search}
        textContentType="none"
        autoCorrect={false}
        keyboardType="default"
      />
      <TextInput
        onChangeText={setText2}
        value={text2}
        placeholder="Nhập SDT"
        style={styles.search}
        textContentType="none"
        autoCorrect={false}
        keyboardType="default"
      />
      <View style={styles.rowBtn}>
        <TouchableOpacity onPress={handleSubmit} style={styles.button}>
          <Text style={styles.buttonText}>Send</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleDelete} style={styles.button2}>
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleUpdate} style={styles.button3}>
          <Text style={styles.buttonText}>Update</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  search: {
    borderWidth: 1,
    padding: 24,
    width: '90%',
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 16,
    borderRadius: 8,
    marginHorizontal: 5,
  },
  button2: {
    backgroundColor: '#ff0000',
    padding: 16,
    borderRadius: 8,
    marginHorizontal: 5,
  },
  button3: {
    backgroundColor: '#009900',
    padding: 16,
    borderRadius: 8,
    marginHorizontal: 5,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
  },
  boxC: {
    borderWidth: 1,
    padding: 8,
  },
  rowBtn: {
    flexDirection: 'row',
  },
  imgB:{
    position:'absolute',
    top: 12,
    left: 12
  }
});
