
import React, { useEffect, useState } from 'react';
import {
    TouchableOpacity,
    TouchableNativeFeedback,
    StyleSheet,
    View,
    ScrollView,
    Text,
    TextInput,
    Image,
    Alert,
    ActivityIndicator,
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import {
    faTimes, faCalendarAlt, faPhoneAlt, faCity, faWeight, faTransgender, faUser,
    faKey, faEye, faIndustry, faUniversity, faUserGraduate
} from '@fortawesome/free-solid-svg-icons'
import Dialog from "react-native-dialog";
import { Container, Header, Content, Item, Input, Switch, Picker, Button } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { registerUser, loginUser, postJob, updateStudentInfo } from '../Config/firebase'
import ms from '../styles'
import BootstrapStyleSheet from 'react-native-bootstrap-styles';


const bootstrapStyleSheet = new BootstrapStyleSheet();
const { s, c } = bootstrapStyleSheet;


const LoginDialog = props => {
    const [userInfo, setUserInfo] = useState({})
    const [loading, setLoading] = useState(false)

    const handleChange = (type, value) => setUserInfo({ ...userInfo, [type]: value })

    const validateLogin = () => {
        if (userInfo.Email && userInfo.Password) handleLogin(userInfo)
        else alert('Please fill in all the fields')
    }

    const handleLogin = data => {
        setLoading(true)
        new Promise((resolve, reject) => loginUser(resolve, reject, data))
            .then(() => {
                alert("You are Signed In!")
                props.closeDialog()
                setLoading(false)
            })
            .catch(error => {
                alert(error)
                setLoading(false)
            })
    }
    return (
        <Dialog.Container visible={props.visible}>
            {loading &&
                <View style={[ms.pos_ab, ms.w_112, ms.h_116, ms.bc_blk_5, ms.zInd_1, ms.jc_c, ms.ai_c]} >
                    <View style={[ms.bRad_50, ms.jc_c, ms.bc_w]}>
                        <ActivityIndicator color="blue" size={60} />
                    </View>
                </View>
            }
            <TouchableNativeFeedback onPress={props.closeDialog}>
                <View style={[ms.pos_ab, ms.rit_0, ms.top_0, ms.jc_c, ms.ai_c, ms.w_40p, ms.h_40p, ms.jc_c, ms.ai_c]}>
                    <FontAwesomeIcon icon={faTimes} size={15} />
                </View>
            </TouchableNativeFeedback>
            <Dialog.Title style={[ms.ta_c, ms.fw_b, ms.fs_25]}>Login</Dialog.Title>
            <View style={[ms.bbw_1, ms.bd_c_gry]}></View>
            <Item>
                <Icon name="mail" size={17} color="#000" style={s.mr3} />
                <Input placeholder='Email' defaultValue={userInfo.Email} keyboardType='email-address' onChangeText={value => handleChange("Email", value)} />
            </Item>
            <Item>
                <FontAwesomeIcon icon={faKey} size={15} style={[s.mr3]} />
                <Input placeholder='Password' secureTextEntry={userInfo.passwordVisibility}
                    onChangeText={value => handleChange("Password", value)} />
                <TouchableNativeFeedback onPress={() => setUserInfo({ ...userInfo, passwordVisibility: !userInfo.passwordVisibility })}>
                    <View style={[ms.w_40p, ms.h_40p, ms.jc_c, ms.ai_c, s.mr2]}>
                        <FontAwesomeIcon icon={faEye} size={18} />
                    </View>
                </TouchableNativeFeedback>
            </Item>
            <View style={[ms.fd_r, ms.jc_sa, s.mt3]}>
                <Dialog.Button label="Login" style={[ms.bc_grn, ms.bRad_50, ms.fc_w, ms.w_100p]} onPress={validateLogin} />
            </View>
        </Dialog.Container >
    )
}


const RegisterDialog = props => {
    const [userInfo, setUserInfo] = useState({
        Type: 'Student',
        Gender: "male",
    })

    const [passwords, setPasswords] = useState({ visibility: true })
    const [loading, setLoading] = useState(false)

    const handleChange = (type, value) => {
        console.log(type, value)
        setUserInfo({ ...userInfo, [type]: value })
        if (userInfo.Type === "Student") delete userInfo.CompanyName
        else if (userInfo.Type === "Company") {
            delete userInfo.FullName
            delete userInfo.Phone
            delete userInfo.Gender
            delete userInfo.CollegeName
            delete userInfo.DegreeName
            delete userInfo.Age
            delete userInfo.Grade
        }
        else if (userInfo.Type === "Admin") {
            delete userInfo.CompanyName
            delete userInfo.Phone
            delete userInfo.Gender
            delete userInfo.CollegeName
            delete userInfo.Age
            delete userInfo.Grade
        }
    }

    const handleSignup = () => {
        if (userInfo.Type === "Student") {
            if (userInfo.FullName && userInfo.Email && userInfo.CollegeName && userInfo.DegreeName &&
                userInfo.Phone && userInfo.Age && userInfo.Grade && passwords.password && userInfo.City) handleRegister({ userInfo, password: passwords.password })
            else alert('Please fill in all the fields')
        }
        else if (userInfo.Type === "Company") {
            if (userInfo.CompanyName && userInfo.City && userInfo.Email && passwords.password) handleRegister({ userInfo, password: passwords.password })
            else alert('Please fill in all the fields')
        }
        else if (userInfo.Type === "Company") {
            if (userInfo.CompnayName && userInfo.Email && userInfo.City && passwords.password) handleRegister({ userInfo, password: passwords.password })
            else alert('Please fill in all the fields')
        }
        else {
            if (passwords.cPassword === passwords.password) handleRegister({ userInfo, password: passwords.password })
            else alert('Passwords must match')
        }
    }

    const handleRegister = data => {
        setLoading(true)
        new Promise((resolve, reject) => registerUser(resolve, reject, data))
            .then(() => {
                alert("You are Signed Up!")
                props.closeDialog()
                setLoading(false)
            })
            .catch(error => {
                alert(error)
                setLoading(false)
            })
    }
    var userTypes = ["Student", "Company", "Admin"]
    var userTypeButtons = []
    for (var i = 0; i < 3; i++) {
        let bc
        let fc
        let text = userTypes[i]
        if (userTypes[i] === userInfo.Type) {
            bc = ms.bc_blu
            fc = ms.fc_w
        }
        else {
            bc = ms.bc_w
            fc = ms.fc_blu
        }
        userTypeButtons.push(
            <TouchableNativeFeedback onPress={() => handleChange("Type", text)}>
                <View style={[ms.w_100p, ms.h_40p, ms.jc_c, ms.ai_c, s.mr2, ms.bd_c_blu, bc, ms.bw_1, ms.bRad_50]}>
                    <Text style={[fc]}>{text}</Text>
                </View>
            </TouchableNativeFeedback>)
    }
    return (
        <Dialog.Container visible={props.visible}>
            {loading &&
                <View style={[ms.pos_ab, ms.w_111_5, ms.h_105_5, ms.bc_blk_5, ms.zInd_1, ms.jc_c, ms.ai_c]} >
                    <View style={[ms.bRad_50, ms.jc_c, ms.bc_w]}>
                        <ActivityIndicator color="blue" size={60} />
                    </View>
                </View>
            }
            <TouchableNativeFeedback onPress={() => props.closeDialog()}
                onPress={props.closeDialog}>
                <View style={[ms.pos_ab, ms.rit_0, ms.top_0, ms.jc_c, ms.ai_c, ms.w_40p, ms.h_40p, ms.jc_c, ms.ai_c]}>
                    <FontAwesomeIcon icon={faTimes} size={15} />
                </View>
            </TouchableNativeFeedback>
            <Dialog.Title style={[ms.ta_c, ms.fw_b, ms.fs_25]}>Register</Dialog.Title>
            <ScrollView>
                <View style={[ms.bbw_1, ms.bd_c_gry]}></View>
                <View style={[ms.fd_r, ms.jc_c, s.m3]}>
                    {userTypeButtons}
                </View>
                <View style={[ms.bbw_1, ms.bd_c_gry, s.ml5, s.mr5]}></View>
                {(userInfo.Type === "Student" || userInfo.Type === "Admin") &&
                    <Item>
                        <FontAwesomeIcon icon={faUser} size={15} style={[s.mr3]} />
                        <Input placeholder='Full Name' defaultValue={userInfo.FullName} onChangeText={value => handleChange("FullName", value)} />
                    </Item>
                }
                {userInfo.Type === "Company" &&
                    <Item>
                        <FontAwesomeIcon icon={faIndustry} size={15} style={[s.mr3]} />
                        <Input placeholder='Company Name' defaultValue={userInfo.Email} keyboardType='email-address' onChangeText={value => handleChange("CompanyName", value)} />
                    </Item>
                }
                <Item>
                    <Icon name="mail" size={17} color="#000" style={s.mr3} />
                    <Input placeholder='Email' defaultValue={userInfo.Email} keyboardType='email-address' onChangeText={value => handleChange("Email", value)} />
                </Item>
                {(userInfo.Type === "Student" || userInfo.Type === "Admin") &&
                    <Item>
                        <FontAwesomeIcon icon={faUniversity} size={15} style={[s.mr3]} />
                        <Input placeholder='College Name' defaultValue={userInfo.CollegeName} keyboardType='email-address' onChangeText={value => handleChange("CollegeName", value)} />
                    </Item>
                }
                {userInfo.Type === "Student" &&
                    <>
                        <Item>
                            <FontAwesomeIcon icon={faUserGraduate} size={15} style={[s.mr3]} />
                            <Input placeholder='Degree Name' defaultValue={userInfo.DegreeName} keyboardType='email-address' onChangeText={value => handleChange("DegreeName", value)} />
                        </Item>
                        <Item>
                            <FontAwesomeIcon icon={faPhoneAlt} size={15} style={[s.mr3]} />
                            <Input placeholder='Phone' defaultValue={userInfo.Phone} keyboardType='numeric' onChangeText={value => handleChange("Phone", value)} />
                        </Item>
                        <Item>
                            <FontAwesomeIcon icon={faTransgender} size={17} style={[s.mr4]} />
                            <Text style={[ms.fs_17, ms.w_45]}>Gender</Text>
                            <Picker
                                note
                                mode="dropdown"
                                style={[ms.fc_blk]}
                                selectedValue={userInfo.Gender}
                                onValueChange={value => handleChange("Gender", value)}
                            >
                                <Picker.Item label="Male" value={"Male"} />
                                <Picker.Item label="Female" value={"Female"} />
                            </Picker>
                        </Item>
                        <Item>
                            <FontAwesomeIcon icon={faCalendarAlt} size={15} style={[s.mr3]} />
                            <Input placeholder='Age' defaultValue={userInfo.Age} keyboardType='numeric' onChangeText={value => handleChange("Age", value)} />
                        </Item>
                        <Item>
                            <Icon name="grading" size={17} color="#000" style={s.mr3} />
                            <Input placeholder='Grade' defaultValue={userInfo.Grade} keyboardType='numeric' onChangeText={value => handleChange("Grade", value)} />
                            <Text style={[s.mr3]}>CGPA</Text>
                        </Item>
                    </>
                }
                {(userInfo.Type === "Company" || userInfo.Type === "Student") &&
                    <Item>
                        <FontAwesomeIcon icon={faCity} size={15} style={[s.mr3]} />
                        <Input placeholder='City' defaultValue={userInfo.City} onChangeText={value => handleChange("City", value)} />
                    </Item>
                }
                <Item>
                    <FontAwesomeIcon icon={faKey} size={15} style={[s.mr3]} />
                    <Input placeholder='Password' secureTextEntry={passwords.visibility}
                        onChangeText={value => setPasswords({ ...passwords, password: value })} />
                    <TouchableNativeFeedback onPress={() => setPasswords({ ...passwords, visibility: !passwords.visibility })}>
                        <View style={[ms.w_40p, ms.h_40p, ms.jc_c, ms.ai_c, s.mr2]}>
                            <FontAwesomeIcon icon={faEye} size={18} />
                        </View>
                    </TouchableNativeFeedback>
                </Item>
                <Item>
                    <FontAwesomeIcon icon={faKey} size={15} style={[s.mr3]} />
                    <Input placeholder='Confirm Password' secureTextEntry={passwords.visibility}
                        onChangeText={value => setPasswords({ ...passwords, cPassword: value })} />
                    <TouchableNativeFeedback onPress={() => setPasswords({ ...passwords, visibility: !passwords.visibility })}>
                        <View style={[ms.w_40p, ms.h_40p, ms.jc_c, ms.ai_c, s.mr2]}>
                            <FontAwesomeIcon icon={faEye} size={18} />
                        </View>
                    </TouchableNativeFeedback>
                </Item>
                <View style={[ms.fd_r, ms.jc_sa, s.mt3]}>
                    <Dialog.Button label="Sign Up" style={[ms.bc_grn, ms.fc_w, ms.bRad_50, ms.w_100p]} onPress={handleSignup} />
                </View>
            </ScrollView>
        </Dialog.Container >
    )
}
const EditStudentDialog = props => {
    const [userInfo, setUserInfo] = useState({})

    const [loading, setLoading] = useState(false)
    useEffect(() => {
        setUserInfo(props.userInfo)
    }, [])
    const handleChange = (type, value) => {
        setUserInfo({ ...userInfo, [type]: value })
        console.log(userInfo)
    }

    const handleUpdate = () => {
        if (userInfo.FullName && userInfo.Email && userInfo.CollegeName && userInfo.DegreeName &&
            userInfo.Phone && userInfo.Age && userInfo.Grade && userInfo.City) {

            setLoading(true)
            new Promise((res, rej) => updateStudentInfo(res, rej, userInfo))
            .then(() => {
                setLoading(false)
                alert("User Updated Successfully")
                props.closeDialog()
            })
            .catch(error => {
                setLoading(false)
                alert(error.message)
            })
        }
        else alert('Please fill in all the fields')
    }
    return (
        <Dialog.Container visible={props.visible}>
            {loading &&
                <View style={[ms.pos_ab, ms.w_111_5, ms.h_105_5, ms.bc_blk_5, ms.zInd_1, ms.jc_c, ms.ai_c]} >
                    <View style={[ms.bRad_50, ms.jc_c, ms.bc_w]}>
                        <ActivityIndicator color="blue" size={60} />
                    </View>
                </View>
            }
            <TouchableNativeFeedback onPress={() => props.closeDialog()}
                onPress={props.closeDialog}>
                <View style={[ms.pos_ab, ms.rit_0, ms.top_0, ms.jc_c, ms.ai_c, ms.w_40p, ms.h_40p, ms.jc_c, ms.ai_c]}>
                    <FontAwesomeIcon icon={faTimes} size={15} />
                </View>
            </TouchableNativeFeedback>
            <Dialog.Title style={[ms.ta_c, ms.fw_b, ms.fs_25]}>Edit Student Data</Dialog.Title>
            <ScrollView>
                <View style={[ms.bbw_1, ms.bd_c_gry]}></View>
                <Item>
                    <FontAwesomeIcon icon={faUser} size={15} style={[s.mr3]} />
                    <Input placeholder='Full Name' defaultValue={props.userInfo.FullName} onChangeText={value => handleChange("FullName", value)} />
                </Item>
                <Item>
                    <Icon name="mail" size={17} color="#000" style={s.mr3} />
                    <Input placeholder='Email' defaultValue={props.userInfo.Email} keyboardType='email-address' onChangeText={value => handleChange("Email", value)} />
                </Item>
                <Item>
                    <FontAwesomeIcon icon={faUniversity} size={15} style={[s.mr3]} />
                    <Input placeholder='College Name' defaultValue={props.userInfo.CollegeName} keyboardType='email-address' onChangeText={value => handleChange("CollegeName", value)} />
                </Item>
                <Item>
                    <FontAwesomeIcon icon={faUserGraduate} size={15} style={[s.mr3]} />
                    <Input placeholder='Degree Name' defaultValue={props.userInfo.DegreeName} keyboardType='email-address' onChangeText={value => handleChange("DegreeName", value)} />
                </Item>
                <Item>
                    <FontAwesomeIcon icon={faPhoneAlt} size={15} style={[s.mr3]} />
                    <Input placeholder='Phone' defaultValue={props.userInfo.Phone} keyboardType='numeric' onChangeText={value => handleChange("Phone", value)} />
                </Item>
                <Item>
                    <FontAwesomeIcon icon={faTransgender} size={17} style={[s.mr4]} />
                    <Text style={[ms.fs_17, ms.w_45]}>Gender</Text>
                    <Picker
                        note
                        mode="dropdown"
                        style={[ms.fc_blk]}
                        selectedValue={props.userInfo.Gender}
                        onValueChange={value => handleChange("Gender", value)}
                    >
                        <Picker.Item label="Male" value={"Male"} />
                        <Picker.Item label="Female" value={"Female"} />
                    </Picker>
                </Item>
                <Item>
                    <FontAwesomeIcon icon={faCalendarAlt} size={15} style={[s.mr3]} />
                    <Input placeholder='Age' defaultValue={props.userInfo.Age} keyboardType='numeric' onChangeText={value => handleChange("Age", value)} />
                </Item>
                <Item>
                    <Icon name="grading" size={17} color="#000" style={s.mr3} />
                    <Input placeholder='Grade' defaultValue={props.userInfo.Grade} keyboardType='numeric' onChangeText={value => handleChange("Grade", value)} />
                    <Text style={[s.mr3]}>CGPA</Text>
                </Item><Item>
                    <FontAwesomeIcon icon={faCity} size={15} style={[s.mr3]} />
                    <Input placeholder='City' defaultValue={props.userInfo.City} onChangeText={value => handleChange("City", value)} />
                </Item>
                <View style={[ms.fd_r, ms.jc_se]}>
                    <View style={[ms.fd_r, ms.jc_sa, s.mt3]}>
                        <Dialog.Button label="Save" style={[ms.bc_grn, ms.fc_w, ms.bRad_50, ms.w_100p]} onPress={() => handleUpdate()} />
                    </View>
                    <View style={[ms.fd_r, ms.jc_sa, s.mt3]}>
                        <Dialog.Button label="Cancel" style={[ms.bc_red, ms.fc_w, ms.bRad_50, ms.w_100p]} onPress={() => props.closeDialog()} />
                    </View>
                </View>
            </ScrollView>
        </Dialog.Container >
    )
}

const JobPostDialog = props => {
    const [jobInfo, setJobInfo] = useState({})

    const [loading, setLoading] = useState(false)

    const handleChange = (type, value) => {
        console.log(type, value)
        setJobInfo({ ...jobInfo, [type]: value })
    }

    const handleJobPost = () => {
        if (jobInfo.Title && jobInfo.Designation && jobInfo.Salary && jobInfo.Location &&
            jobInfo.Education && jobInfo.Experience) {
            setLoading(true)
            new Promise((resolve, reject) => postJob(resolve, reject, { ...jobInfo, CompanyName: props.cName }))
                .then(() => {
                    alert("Job posted successfully!")
                    setLoading(false)
                    props.closeDialog()
                })
                .catch(error => {
                    alert(error)
                    setLoading(false)
                })
        }
        else alert('Please fill in all the fields')
    }
    return (
        <Dialog.Container visible={props.visible}>
            {loading &&
                <View style={[ms.pos_ab, ms.w_111_5, ms.h_105_5, ms.bc_blk_5, ms.zInd_1, ms.jc_c, ms.ai_c]} >
                    <View style={[ms.bRad_50, ms.jc_c, ms.bc_w]}>
                        <ActivityIndicator color="blue" size={60} />
                    </View>
                </View>
            }
            <TouchableNativeFeedback onPress={() => props.closeDialog()}
                onPress={props.closeDialog}>
                <View style={[ms.pos_ab, ms.rit_0, ms.top_0, ms.jc_c, ms.ai_c, ms.w_40p, ms.h_40p, ms.jc_c, ms.ai_c]}>
                    <FontAwesomeIcon icon={faTimes} size={15} />
                </View>
            </TouchableNativeFeedback>
            <Dialog.Title style={[ms.ta_c, ms.fw_b, ms.fs_25]}>Post a Job</Dialog.Title>
            <ScrollView>
                <View style={[ms.bbw_1, ms.bd_c_gry]}></View>
                <Item>
                    <Text style={[ms.fw_b, ms.fs_18]}>Title: </Text>
                    <Input placeholder='Web Developer Needed' defaultValue={jobInfo.Title} onChangeText={value => handleChange("Title", value)} />
                </Item>
                <Item>
                    <Text style={[ms.fw_b, ms.fs_18]}>Designation: </Text>
                    <Input placeholder='Sr. Web Developer' defaultValue={jobInfo.Designation} onChangeText={value => handleChange("Designation", value)} />
                </Item>
                <Item>
                    <Text style={[ms.fw_b, ms.fs_18]}>Salary: </Text>
                    <Input placeholder='60000-90000' defaultValue={jobInfo.Salary} onChangeText={value => handleChange("Salary", value)} />
                </Item>
                <Item>
                    <Text style={[ms.fw_b, ms.fs_18]}>Location: </Text>
                    <Input placeholder='F-9 Islamabad' defaultValue={jobInfo.Location} onChangeText={value => handleChange("Location", value)} />
                </Item>
                <Item>
                    <Text style={[ms.fw_b, ms.fs_18]}>Education: </Text>
                    <Input placeholder='BS(CS)' defaultValue={jobInfo.Education} onChangeText={value => handleChange("Education", value)} />
                </Item>
                <Item>
                    <Text style={[ms.fw_b, ms.fs_18]}>Experience: </Text>
                    <Input placeholder='2 Years' defaultValue={jobInfo.Experience} onChangeText={value => handleChange("Experience", value)} />
                </Item>
                <View style={[ms.fd_r, ms.jc_sa, s.mt3]}>
                    <Dialog.Button label="Post" style={[ms.bc_grn, ms.fc_w, ms.bRad_50, ms.w_150p]} onPress={() => handleJobPost()} />
                </View>
            </ScrollView>
        </Dialog.Container >
    )
}
export { LoginDialog, RegisterDialog, JobPostDialog, EditStudentDialog }