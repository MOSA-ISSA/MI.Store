import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../../hooks/ThemeContext';
import TheButton from './TheButton';
import ExpandableButton from './ExpandableButton';
import { Txt } from './Elements';
import { useNavigation } from 'expo-router';
import { getAllSubjects } from '../../RES/SubjectsApi';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { getFromStorage, } from '../../constants/local';
import LanguageModal from './LanguageModal';
import STRINGS from '../Strings';
import TheContext from '../../hooks/TheContext';
// import LottieView from 'lottie-react-native';
// import animations from './../animation/_export';

export default function SliderDrawer(props) {
    const navigation = useNavigation();
    const { colorTextElement, bgcColor } = useTheme();
    const { Language } = useContext(TheContext);
    const [subjects, setSubjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modal, setModal] = useState(false);
    const [user, setUser] = useState({});

    const renderSubjects = () => {

        const navigate = (subject, lesson,) => {
            navigation.reset({
                index: 0, routes: [{ name: 'Subject', params: { name: subject.name, subject_id: subject._id, lessonData: lesson, } }]
            });
        }

        let Condition = subjects?.filter(subject => subject?.lessons?.length > 0)

        return Condition.map((subject, index) => (
            <ExpandableButton
                title={subject.name}
                key={index}
                onPress={() => navigate(subject)}
            >
                {subject.lessons.map((lesson, idx) => (
                    <TheButton
                        onPress={() => navigate(subject, lesson)}
                        buttonStyle={{ ...styles.button, backgroundColor: colorTextElement }}
                        textStyle={{ ...styles.lessons, color: bgcColor }}
                        key={idx}
                        title={lesson.name}
                    />
                ))}
            </ExpandableButton>
        ));
    };
    const LoadingView = () => {
        return (
            <View style={styles.loadingContainer}>
                <Txt>Loading subjects...</Txt>
                {/* <LottieView
                    autoPlay
                    style={{
                        width: 100,
                        height: 100,
                    }}
                    resizeMode='cover'
                    source={animations.Loading2()}
                /> */}
            </View>
        );
    };

    const renderAdminButtons = () => {
        return (
            user._isAdmin && (
                [
                    <TheButton key={0}
                        onPress={() => navigation.navigate('all-students')}
                        buttonStyle={styles.admin_button}
                    >
                        <Txt style={{ ...styles.admin_text, color: colorTextElement }}>{STRINGS.All_Students[Language]}</Txt>
                        <FontAwesome5 name="users" size={24} color={colorTextElement} />
                    </TheButton>,
                ]
            )

        )
    }
    const renderStudentButtons = () => {
        const Buttons = [
            {
                name: STRINGS.My_Tasks[Language],
                onPress: () => navigation.navigate({
                    name: 'TaskScreen',
                    params: { studentId: user._id, name: user.name },
                    option: { drawerLabel: user.name, title: user.name },
                }),
            icon: 'tasks',
            },
        {
            name: STRINGS.Upload_Task[Language],
            onPress: () => navigation.navigate('uploadTask'),
                icon: 'upload',
            }
        ]
return (
    user._level === "student" && (
        Buttons.map((button, index) => (
            <TheButton
                key={index}
                buttonStyle={styles.stButton}
                onPress={button.onPress}
            >
                <Txt style={{ ...styles.txt, color: colorTextElement }}>{button.name}</Txt>
                <FontAwesome5 name={button.icon} size={24} color={colorTextElement} />
            </TheButton>
        ))
    )
)
    }

const restoreUserData = async () => {
    const user = await getFromStorage('user');
    if (!user) {
        navigation.reset({ index: 0, routes: [{ name: 'index' }] });
        return;
    } else {
        setUser(user);
    }
}

const fetchSubjects = async () => {
    await restoreUserData();
    const group_id = await getFromStorage('group-id');
    try {
        const response = await getAllSubjects(group_id);
        const storedSubjects = await AsyncStorage.getItem('Subjects');
        setSubjects(response?.data || JSON.parse(storedSubjects) || []);
        setLoading(false);
    } catch (error) {
        console.error('Error fetching subjects from AsyncStorage', error);
    } finally {
        setLoading(false);
    }
};

useEffect(() => {
    fetchSubjects();
}, []);

return (
    <DrawerContentScrollView style={styles.view} {...props} showsVerticalScrollIndicator={false}>
        <View style={styles.hed}>
            <View style={styles.hedButtons}>
                <TheButton
                    onPress={() => props.navigation.reset({ index: 0, routes: [{ name: 'Home' }] })}
                >
                    <MaterialIcons name="home" size={20} color={colorTextElement} />
                </TheButton>
                <TheButton
                    onPress={() => props.navigation.reset({ index: 0, routes: [{ name: 'index' }] })}
                >
                    <MaterialIcons name="autorenew" size={20} color={colorTextElement} />
                </TheButton>
                <TheButton
                    onPress={() => setModal(!modal)}
                >
                    <MaterialIcons name="language" size={20} color={colorTextElement} />
                </TheButton>
            </View>
            <Txt style={styles.title}>code-zone</Txt>
        </View>
        {renderAdminButtons()}
        {renderStudentButtons()}
        <View style={{...styles.line, borderColor: bgcColor}} />
        {loading ? (
            <LoadingView />
        ) : (
            renderSubjects()
        )}
        <LanguageModal
            visible={modal}
            onClose={() => setModal(false)}
        />
    </DrawerContentScrollView>
);
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        borderTopRightRadius: 30,
        borderBottomRightRadius: 30,
    },
    lessons: {
        fontSize: 14,
        fontWeight: '600',
    },
    button: {
        marginRight: 10,
        margin: 2,
        borderWidth: 2,
        alignSelf: 'stretch',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'stretch',
    },
    hed: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
    },
    hedButtons: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        width: 200,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    btn: {
        alignSelf: 'stretch',
        alignItems: 'center',
    },
    txt: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    stButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignSelf: 'stretch',
        padding: 10,
        margin: 0,
        marginVertical: 2,
        // borderWidth: 10,
        // borderColor: 'rgba(255, 255, 255, 0.05)',
    },
    admin_button: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignSelf: 'stretch',
        padding: 5,
        margin: 0,
        marginVertical: 2,
        borderWidth: 10,
        borderColor: 'rgba(255, 255, 255, 0.05)',
    },
    admin_text: {
        fontSize: 20,
        fontWeight: 'bold',
        borderLeftWidth: 1,
        paddingLeft: 5,
        borderColor: 'gold',
    },
    line: {
        width: '100%',
        borderWidth: 1,
        borderStyle: 'dashed',
        // borderColor: 'rgba(255, 255, 255, 0.5)',
        marginVertical: 10,
    },
});
