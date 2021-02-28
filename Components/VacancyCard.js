
import React from 'react';
import {
    TouchableNativeFeedback,
    View,
    Text,
} from 'react-native';
import ms from '../styles'
import BootstrapStyleSheet from 'react-native-bootstrap-styles';

const bootstrapStyleSheet = new BootstrapStyleSheet();
const { s, c } = bootstrapStyleSheet;

const VacancyCard = props => {
    return (
        <TouchableNativeFeedback key={props.vacancy.vId} onPress={() => props.navigation.navigate("Job Details", { vacancy: props.vacancy })}>
            <View style={[ms.bc_blu, s.mt3, s.p3, s.pt2, ms.bRad_20, ms.w_90]}>
                <Text style={[ms.fc_w, ms.fs_25, ms.fw_b, ms.as_c, s.mb3]}>{props.vacancy.CompanyName}</Text>
                {/* <View style={[]}> */}
                    <View>
                        <Text style={[ms.fc_w, ms.fs_20]}>Education:    {props.vacancy.Education}</Text>
                        <Text style={[ms.fc_w, ms.fs_20]}>Experience:    {props.vacancy.Experience}</Text>
                    </View>
                    <View>
                        <Text style={[ms.fc_w, ms.fs_20]}>Location:    {props.vacancy.Location}</Text>
                        <Text style={[ms.fc_w, ms.fs_20]}>Designation:    {props.vacancy.Designation}</Text>
                    </View>
                {/* </View> */}
            </View>
        </TouchableNativeFeedback>
    );
};

export default VacancyCard;
