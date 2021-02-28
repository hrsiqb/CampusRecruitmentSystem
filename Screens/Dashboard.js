
import React, { useState, useEffect } from 'react';
import {
    TouchableOpacity,
    TouchableNativeFeedback,
    View,
    ScrollView,
    Text,
    ActivityIndicator,
    Image,
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import ms from '../styles'
import BootstrapStyleSheet from 'react-native-bootstrap-styles';
import UserCard from '../Components/UserCard';
import VacancyCard from '../Components/VacancyCard';
import { getAllStudents, getUserInfo, getAllVacancies } from '../Config/firebase';

const bootstrapStyleSheet = new BootstrapStyleSheet();
const { s, c } = bootstrapStyleSheet;

const Dashboard = ({ navigation, route }) => {
    const [loading, setLoading] = useState(true)
    const [userInfo, setUserInfo] = useState({})
    const [vacancies, setVacancies] = useState([])
    const [noVacancies, setNoVacancies] = useState(false)
    const [usersData, setUsersData] = useState([])

    // Prevent going back
    navigation.addListener('focus', e => navigation.addListener('beforeRemove', e => e.preventDefault()))
    // Enable going back on screen blur
    navigation.addListener('blur', e => navigation.removeListener('beforeRemove'))

    var noUsers = false
    useEffect(() => {
        var datas = []
        var totalVacancies = 0
        var loadedVacancies = 0
        var totalUsers = 0
        var loadedUsers = 0
        console.log(route.params.uid)
        new Promise((res, rej) => getUserInfo(res, rej, route.params.uid))
            .then(user => {
                setUserInfo(user)
                if (user.Type === "Company" || user.Type === "Admin") {
                    new Promise((res, rej) => getAllStudents(res, rej))
                        .then(students => {
                            if (!students) {
                                noUsers = true
                                setLoading(false)
                            }
                            else {
                                totalUsers = Object.keys(students).length
                                Object.keys(students).map((uId, key) => {
                                    new Promise((res, rej) => getUserInfo(res, rej, uId))
                                        .then(data => {
                                            loadedUsers++
                                            datas.push(<UserCard navigation={navigation} type={user.Type} key={uId} userInfo={data} />)
                                            if (loadedUsers === totalUsers) {
                                                setUsersData(datas)
                                                setLoading(false)
                                            }
                                        })
                                        .catch(error => {
                                            setLoading(false)
                                            alert(error.message)
                                        })
                                })
                            }
                        })
                        .catch(error => {
                            setLoading(false)
                            alert(error.message)
                        })
                }
                else {
                    new Promise((res, rej) => getAllVacancies(res, rej))
                        .then(allVacancies => {
                            if (!allVacancies) {
                                setNoVacancies(true)
                                setLoading(false)
                            }
                            else {
                                let vacancy = Object.values(allVacancies)
                                setVacancies(vacancy)
                                setLoading(false)
                            }
                        })
                        .catch(error => {
                            alert(error.message)
                            setLoading(false)
                        })
                }
            })
            .catch(error => {
                alert(error.message)
            })
    }, [])

    var vacanciesComp = []
    vacancies.map(vacancy => {
        vacanciesComp.push(
            <VacancyCard navigation={navigation} vacancy={vacancy} />
        )
    })
    return (
        <View style={[ms.fl_1]}>
            {loading &&
                <View style={[ms.pos_ab, ms.w_112, ms.h_116, ms.bc_blk_5, ms.zInd_1, ms.jc_c, ms.ai_c]} >
                    <View style={[ms.bRad_50, ms.jc_c, ms.bc_w]}>
                        <ActivityIndicator color="blue" size={60} />
                    </View>
                </View>
            }
            <ScrollView contentContainerStyle={[ms.ai_c]}>
                {userInfo.Type === "Student" ? noVacancies ? <Text>No Vacancies Yet</Text> : vacanciesComp
                    : noUsers ? <Text>No Students Registered Yet</Text> : usersData
                }
            </ScrollView>
            <TouchableNativeFeedback onPress={() => navigation.navigate("Menu")}>
                <View style={[ms.w_65p, ms.h_65p, ms.jc_c, ms.ai_c, ms.bc_blu, ms.bRad_50,
                ms.pos_ab, ms.bot_20, ms.rit_15]}>
                    <FontAwesomeIcon icon={faBars} color={'white'} size={30} />
                </View>
            </TouchableNativeFeedback>
        </View>
    );
};

export default Dashboard;
