
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
import { signOut, getUserInfo, updateUserInfo } from '../Config/firebase';
import Icon from 'react-native-vector-icons/MaterialIcons';
import auth from '@react-native-firebase/auth';

const bootstrapStyleSheet = new BootstrapStyleSheet();
const { s, c } = bootstrapStyleSheet;

const JobDetails = ({ navigation, route }) => {
    return (
        <View style={[ms.fl_1]}>
            <Item style={[s.p3, ms.h_70p]}>
                <Text style={[ms.fw_b, ms.fs_22]}>Title:   </Text>
                <Text style={[ms.fs_20, ms.fc_blk]}>{route.params.vacancy.Title}</Text>
            </Item>
            <Item style={[s.p3, ms.h_70p]}>
                <Text style={[ms.fw_b, ms.fs_22]}>Designation:   </Text>
                <Text style={[ms.fs_20, ms.fc_blk]}>{route.params.vacancy.Designation}</Text>
            </Item>
            <Item style={[s.p3, ms.h_70p]}>
                <Text style={[ms.fw_b, ms.fs_22]}>Education:   </Text>
                <Text style={[ms.fs_20, ms.fc_blk]}>{route.params.vacancy.Education}</Text>
            </Item>
            <Item style={[s.p3, ms.h_70p]}>
                <Text style={[ms.fw_b, ms.fs_22]}>Experience:   </Text>
                <Text style={[ms.fs_20, ms.fc_blk]}>{route.params.vacancy.Experience}</Text>
            </Item>
            <Item style={[s.p3, ms.h_70p]}>
                <Text style={[ms.fw_b, ms.fs_22]}>Location:   </Text>
                <Text style={[ms.fs_20, ms.fc_blk]}>{route.params.vacancy.Location}</Text>
            </Item>
            <Item style={[s.p3, ms.h_70p]}>
                <Text style={[ms.fw_b, ms.fs_22]}>Salary:   </Text>
                <Text style={[ms.fs_20, ms.fc_blk]}>{route.params.vacancy.Salary}</Text>
            </Item>
        </View>
    );
};

export default JobDetails;
