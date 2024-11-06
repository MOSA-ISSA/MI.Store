import { Button, Dimensions, Image, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useContext, useState } from 'react'
import TheButton from '../assets/elements/TheButton'
import { useNavigation } from 'expo-router';
import Images from './../assets/images/_GetImages';
import { Feather, Fontisto } from '@expo/vector-icons';
import { activateSubject } from './../RES/SubjectsApi';
import TheContext from './../hooks/TheContext';
import STRINGS from '../assets/Strings';
import { Txt } from '../assets/elements/Elements';

const { width, height } = Dimensions.get('window');

const SubjectCard = ({ subject, user }) => {
    const { AlertState, setAlertState, Language } = useContext(TheContext);
    const navigation = useNavigation();

    const handleNavigate = useCallback(
        ({ _id, name }) => navigation.navigate("Subject", { name, subject_id: _id }),
        [navigation]
    );

    const activateSubjectApi = async () => {
        const activate = () => {
            setAlertState({
                ...AlertState,
                loading: true
            })
            activateSubject(!subject?._active, subject?._id)
                .then((response) => {
                    setAlertState({ visible: false, message: "", });
                    if (response?.success) {
                        navigation.reset({ index: 0, routes: [{ name: 'Home' }] });
                    } else {
                        throw new Error(response?.message);
                    }
                })
                .catch((error) => {
                    setAlertState({
                        visible: true,
                        message: error?.message,
                        ok: () => { },
                        loading: false,
                    });
                }).finally(() => {
                    setAlertState({
                        visible: false,
                        message: "",
                        ok: false,
                        loading: false,
                    })
                })
        }
        setAlertState({
            visible: true,
            message: "do you want to activate this subject?",
            confirm: () => activate(),
            cancel: () => { },
        });
    }

    return (
        <TheButton
            buttonStyle={styles.subjectCard}
            onPress={() => handleNavigate(subject)}
        >
            <View style={styles.subjectImage}>
                <Image
                    resizeMode="contain"
                    source={subject?.image ? { uri: subject.image } : Images.icon()}
                    style={styles.image}
                />
            </View>
            <View style={[
                styles.subjectTexts,
                { alignItems: Language !== "en" ? "flex-end" : "flex-start" }
            ]}>
                <Txt style={styles.subjectText}>{STRINGS.subject[Language]} : {subject.name} </Txt>
                <Txt style={styles.subjectText}>{STRINGS.Lessons[Language]} : {subject?.lessons?.length ? `${subject.lessons.length}` : "0"}</Txt>

            </View>

            {user?._isAdmin &&
                <View style={styles.admin}>
                    <View style={styles.adminButtons}>
                        <Feather onPress={() => navigation.navigate("EditSubject", { subject_id: subject._id })} style={styles.adminButton} name="edit" size={20} color="#fff" />
                        <TheButton
                            buttonStyle={{
                                backgroundColor: subject?._active ?
                                    '#008006' : '#D32F2F'
                            }}
                            onPress={() => activateSubjectApi()}
                        >
                            <Fontisto name="radio-btn-active" size={15} color="#fff" />
                        </TheButton>
                    </View>
                    {/* <Button
                        title="test"
                        onPress={() => console.log(subject?._id)}
                    /> */}
                </View>
            }
        </TheButton>
    )
}

export default SubjectCard

const styles = StyleSheet.create({
    subjectCard: {
        maxWidth: 500,
        width: width * 0.7,
        minWidth: 120,
        maxHeight: 250,
        height: width * 0.3,
        minHeight: 120,
        margin: 10,
        padding: 2,
        flexDirection: 'row',
        // backgroundColor: 'rgba(0,0,0,0.6)',
        backgroundColor: 'transparent',
        borderRadius: 10,
        // alignSelf
    },
    subjectImage: {
        flex: 1,
        alignSelf: 'stretch',
        // marginRight: 20,
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    subjectTexts: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        paddingTop: 30,
    },
    subjectText: {
        // color: '#fff',
        textAlign: 'center',
        margin: 5,
        marginHorizontal: 20,
        fontSize: 20,
        fontWeight: 'bold',
        // backgroundColor: 'rgba(0,0,0,0.6)',
    },
    admin: {
        position: 'absolute',
        justifyContent: 'flex-end',
        padding: 5,
        borderRadius: 10,
        height: '100%',
        width: '100%',
    },
    adminText: {
        color: '#fff',
        fontWeight: 'bold',
        backgroundColor: 'rgba(0,0,0,0.6)',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.6)',
        borderRadius: 4,
        alignSelf: 'baseline',
        padding: 4,
    },
    adminButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        // alignSelf: 'flex-end',
    },
    adminButton: {
        backgroundColor: 'rgba(0,0,0,0.6)',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.6)',
        borderRadius: 4,
        alignSelf: 'baseline',
        padding: 4,
    },
})