
import React, { useState, useEffect } from 'react';
import {
    ActivityIndicator,
    View,
    TouchableNativeFeedback,
    Text,
    ScrollView,
} from 'react-native';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCalendarAlt, faPhoneAlt, faCity, faWeight, faTransgender, faUserGraduate } from '@fortawesome/free-solid-svg-icons'
import { Item, Input, Switch, Picker } from 'native-base';
import ms from '../styles'
import BootstrapStyleSheet from 'react-native-bootstrap-styles';
import { signOut, disableStudent, updateUserInfo } from '../Config/firebase';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { EditStudentDialog } from '../Components/Dialog';

const bootstrapStyleSheet = new BootstrapStyleSheet();
const { s, c } = bootstrapStyleSheet;

const UserDetails = ({ navigation, route }) => {
    const [loading, setLoading] = useState(false)
    const [editStudentDialogVisibility, setEditStudentDialogVisibility] = useState(false)
    const handleStudentDisable = () => {
        setLoading(true)
        new Promise((res, rej) => disableStudent(res, rej, route.params.userInfo.uId))
            .then(() => {
                setLoading(false)
                alert("Disabled Student Successfully")
                navigation.navigate("Dashboard")
            })
            .catch(error => {
                setLoading(false)
                alert(error.message)
            })
    }
    const closeDialog = () => setEditStudentDialogVisibility(false)
    return (
        <>
            {loading &&
                <View style={[ms.pos_ab, ms.w_112, ms.h_116, ms.bc_blk_5, ms.zInd_1, ms.jc_c, ms.ai_c]} >
                    <View style={[ms.bRad_50, ms.jc_c, ms.bc_w]}>
                        <ActivityIndicator color="blue" size={60} />
                    </View>
                </View>
            }
            <EditStudentDialog visible={editStudentDialogVisibility} userInfo={route.params.userInfo} closeDialog={() => closeDialog()} />

            <View style={[ms.fl_1]}>
                <Item style={[s.p3, ms.h_70p]}>
                    <Icon name="mail" size={25} color="#000" style={ms.mr_18} />
                    <Text style={[ms.fs_25, ms.fc_blk]}>{route.params.userInfo.Email}</Text>
                </Item>
                <Item style={[s.p3, ms.h_70p]}>
                    <FontAwesomeIcon icon={faPhoneAlt} size={20} style={[s.mr4, ms.fc_blk]} />
                    <Text style={[ms.fs_25, ms.fc_blk]}>{route.params.userInfo.Phone}</Text>
                </Item>
                <Item style={[s.p3, ms.h_70p]}>
                    <FontAwesomeIcon icon={faTransgender} size={25} style={[s.mr4, ms.fc_blk]} />
                    <Text style={[ms.fs_25, ms.fc_blk]}>{route.params.userInfo.Gender}</Text>
                </Item>
                <Item style={[s.p3, ms.h_70p]}>
                    <FontAwesomeIcon icon={faUserGraduate} size={20} style={[s.mr4, ms.fc_blk]} />
                    <Text style={[ms.fs_25, ms.fc_blk]}>{route.params.userInfo.DegreeName}</Text>
                </Item>
                <Item style={[s.p3, ms.h_70p]}>
                    <FontAwesomeIcon icon={faCalendarAlt} size={20} style={[s.mr4, ms.fc_blk]} />
                    <Text style={[ms.fs_25, ms.fc_blk]}>{route.params.userInfo.Age}</Text>
                </Item>
                <Item style={[s.p3, ms.h_70p]}>
                    <FontAwesomeIcon icon={faWeight} size={20} style={[s.mr4, ms.fc_blk]} />
                    <Text style={[ms.fs_25, ms.fc_blk]}>{route.params.userInfo.Grade} CGPA</Text>
                </Item>
                <Item style={[s.p3, ms.h_70p]}>
                    <FontAwesomeIcon icon={faCity} size={20} style={[s.mr4, ms.fc_blk]} />
                    <Text style={[ms.fs_25, ms.fc_blk]}>{route.params.userInfo.City}</Text>
                </Item>
                {route.params.type === "Admin" &&
                    <View style={[ms.fd_r, ms.jc_c]}>
                        <TouchableNativeFeedback onPress={() => setEditStudentDialogVisibility(true)}>
                            <View style={[s.m3, s.p3, ms.bc_blu, ms.bRad_50, ms.w_150p, ms.as_c]}>
                                <Text style={[ms.fc_w, ms.fs_17, ms.ta_c]}>Edit</Text>
                            </View>
                        </TouchableNativeFeedback>
                        <TouchableNativeFeedback onPress={() => handleStudentDisable()}>
                            <View style={[s.m3, s.p3, ms.bc_blu, ms.bRad_50, ms.w_150p, ms.as_c]}>
                                <Text style={[ms.fc_w, ms.fs_17, ms.ta_c]}>Disable</Text>
                            </View>
                        </TouchableNativeFeedback>
                    </View>
                }
            </View>
        </>
    );
};

export default UserDetails;
