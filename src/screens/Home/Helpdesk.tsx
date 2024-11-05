import React from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import { TransHeader } from "../../components/Layouts/Headers";
import { CommonActions, NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../../App";
import Chat from "../../svg/DucTri/Icons/Helpdesk/chat"
import Chinhsach from "../../svg/DucTri/Icons/Helpdesk/chinhsach"
import Info from "../../svg/DucTri/Icons/Helpdesk/infoapp"

const Helpdesk = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    return (
        <ScrollView style={styles.container}>
            <TransHeader haveBackIcon={true} title="Trợ giúp" />
            <View style={styles.boxall}>
                <View style={styles.boxall1}>
                    <View style={styles.box1}>
                        <Chinhsach style={styles.icon}/>
                        <Text style={styles.txt}>Chính sách</Text>
                    </View>
                    <View style={styles.box2}>
                        <Info style={styles.icon}/>
                        <Text style={styles.txt}>Thông tin ứng dụng</Text>
                    </View>

                </View>
                <View style={styles.box3}>
                    <Chat style={styles.icon}/>
                    <Text style={styles.txt}>Nhắn tin với nhân viên hỗ trợ</Text>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    box1: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor:'#ffffff',
        paddingVertical: 20,
        paddingHorizontal: 10,
        flex: 1,
        borderTopLeftRadius: 12
    },
    box2: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor:'#ffffff',
        paddingVertical: 20,
        flex: 2,
        paddingHorizontal: 10,
        borderTopRightRadius: 12
    },
    box3: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor:'#ffffff',
        marginTop: 8,
        paddingVertical: 20,
        paddingHorizontal: 16,
        borderBottomLeftRadius: 12,
        borderBottomRightRadius: 12
    },
    boxall:{
        backgroundColor:'#EF8C96',
        padding: 24,
        alignContent:'space-between'
    },
    boxall1:{
        backgroundColor:'#EF8C96',
        flexDirection:'row',
        alignItems:'center',
        gap: 8
    },
    txt:{
        fontSize:15,
        color:'#F9801D'
    },
    icon:{
        marginRight: 8
    }
});

export default Helpdesk;
