
import React, { useState, useEffect } from 'react';
import {
    TouchableOpacity,
    StyleSheet,
    View,
    ActivityIndicator,
    Text,
    TextInput,
    Image,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import { LoginDialog, RegisterDialog } from '../Components/Dialog'
import ms from '../styles'
import BootstrapStyleSheet from 'react-native-bootstrap-styles';

const bootstrapStyleSheet = new BootstrapStyleSheet();
const { s, c } = bootstrapStyleSheet;

const Login = ({ navigation }) => {
    const [loginDialogVisibility, setLoginDialogVisibility] = useState(false)
    const [registerDialogVisibility, setRegisterDialogVisibility] = useState(false)

    const closeDialog = () => {
        setLoginDialogVisibility(false)
        setRegisterDialogVisibility(false)
    }
    const isSignedIn = () => {
        auth().onAuthStateChanged(
            user => {
                if (user) {
                    closeDialog()
                    console.log("uid==>", user)
                    navigation.navigate('Dashboard', { uid: user.uid })
                }
            }
        )
    }

    useEffect(() => {
        isSignedIn()
    }, [])
    return (
        <>
            <LoginDialog visible={loginDialogVisibility} closeDialog={closeDialog} />
            <RegisterDialog visible={registerDialogVisibility} closeDialog={closeDialog} />
            <View style={[ms.fl_1]}>
                <View style={[ms.fl_1, ms.w_100, ms.jc_c]}>
                    <Text style={[ms.fc_gry, ms.fw_b, ms.fs_30, ms.ff_s, s.p2, s.mb5, ms.ta_c]}>Welcome to our Campus Recruitment System</Text>
                    <TouchableOpacity style={[s.m3, s.p3, ms.bc_blu, ms.bRad_50, ms.w_70, ms.as_c]}
                        onPress={() => setLoginDialogVisibility(true)} >
                        <Text style={[ms.fc_w, ms.fs_17, ms.ta_c, ms.fw_b, ms.fs_25]}>Login</Text>
                    </TouchableOpacity>
                    <View style={[ms.fd_r, ms.w_100, ms.jc_c, s.mt4, s.mb4]}>
                        <View style={[ms.bbw_2, ms.bd_c_gry, ms.w_35, ms.h_13p]}></View>
                        <Text style={[ms.fc_gry, ms.fw_b, ms.fs_20, s.mr2, s.ml2]}>OR</Text>
                        <View style={[ms.bbw_2, ms.bd_c_gry, ms.w_35, ms.h_13p]}></View>
                    </View>
                    <TouchableOpacity style={[s.m3, s.p3, ms.bc_blu, ms.bRad_50, ms.w_70, ms.as_c]}
                        onPress={() => setRegisterDialogVisibility(true)} >
                        <Text style={[ms.fc_w, ms.fs_17, ms.ta_c, ms.fw_b, ms.fs_25]}>Register</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    );
};

export default Login;
