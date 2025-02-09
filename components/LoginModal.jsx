import React, { useContext, useState } from 'react';
import {
    Modal,
    StyleSheet,
    Text,
    Pressable,
    View,
    ActivityIndicator,
    Linking,
} from 'react-native';
import TheContext from '@/hooks/TheContext';
import TheButton from '@/assets/elements/TheButton';
import { IconFeather, ThemeTextInput, ThemeView, Txt } from '@/assets/elements/Elements';
import { createUser, login, sendVerification } from './../api/user.api';
import { saveToStorage } from '@/constants/local';

const LoginModal = () => {
    const { LoginState, setLoginState, setUser } = useContext(TheContext);
    const [form, setForm] = useState('Login');
    const [Loading, setLoading] = useState(false)
    const [name, setName] = useState({
        value: '',
        state: 'name',
        error: '',
        focus: false,
    });
    const [mail, setMail] = useState({
        value: '',
        state: 'mail',
        error: '',
        focus: false,
    });
    const [password, setPassword] = useState({
        value: '',
        state: 'password',
        error: '',
        focus: false,
        lock: true
    });


    const handleSignUp = () => {
        const body = {
            name: name.value,
            password: password.value,
            email: mail.value,
        };
        console.log(body);
        createUser(body)
            .then((res) => {
                // console.log(res);
                if (!res?.success) throw new Error(res.message);
                handelLogInSuccess(res?.data);
            })
            .catch((error) => {
                console.log("error.message".includes);
                console.log(error.message);
            })
        // .finally(() => {
        //     setLoading(false);
        //     setName({ ...name, value: '' });
        //     setMail({ ...mail, value: '' });
        //     setPassword({ ...password, value: '' });
        //     setForm('Login');
        // })
    };

    const handelLogInSuccess = (user) => {
        console.log("Success");
        if (user?._active) {
            saveToStorage('user', { ...user });
            setUser(user);
            setLoginState(false);
            setName({ ...name, error: '', focus: false, value: '' });
            setMail({ ...mail, error: '', focus: false, value: '' });
            setPassword({ ...password, error: '', focus: false, value: '', lock: true });
            setForm('Login');
        }
        else {
            setForm('Active');
        }
    }

    const handelLogIn = () => {
        setLoading(true)
        login({ password: password.value, access: mail.value })
            .then((res) => {
                console.log(res);
                if (!res?.success) throw new Error(res.error);
                handelLogInSuccess(res?.data);
            })
            .catch((error) => {
                console.log(error.message);
                error.message === "password" ?
                    setPassword({ ...password, error: "Invalid Password", focus: false }) :
                    setMail({ ...mail, error: error.message + " " + mail.state, focus: false });
            })
            .finally(() => setLoading(false));
    };

    const validateInput = (type) => {
        const { state, value } = type;
        const regex = {
            mail: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            password: /^[A-Za-z\d@$!%*?&]{8,16}$/,
            name: /^[a-zA-Z]+( [a-zA-Z]+)*$/,
        }
        console.log(state, value, !regex[state]?.test(value));
        const error = !regex[state]?.test(value) && value ? 'Invalid ' + (state) : '';
        return error;
    };

    const onBlur = (type, setState,) => {
        const error = validateInput(type);
        setState((prev) => {
            return { ...prev, error, focus: false }
        });
    };

    const sendVerificationApi = () => {
        console.log("sendVerification");
        setLoading(true);
        sendVerification({ email: mail.value })
            .then((res) => {
                console.log(res);
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() =>
                setLoading(false)
            );
    }

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={LoginState}
            onRequestClose={() => setLoginState(false)}
        >
            <Pressable onPress={() => setLoginState(false)} style={styles.centeredView}>
                <Pressable style={styles.containerView}>
                    <ThemeView style={styles.modalView}>
                        <Text style={styles.title}>{form}</Text>

                        <Text style={styles.errorText}>{name.error || ' '}</Text>
                        {
                            form === 'Sign Up' &&
                            <View
                                style={{
                                    ...styles.inputContainer,
                                    borderColor: name.error ? 'red' : name.focus ? '#4CAF50' : '#ccc',
                                }}>
                                <ThemeTextInput
                                    onFocus={() => setName({ ...name, focus: true })}
                                    onBlur={() => onBlur(name, setName)}
                                    placeholder="name"
                                    value={name.value}
                                    onChangeText={(text) => setName({ ...name, value: text })}
                                    placeholderTextColor="#888"
                                    style={styles.input}
                                />
                                <IconFeather name="user" size={20} color="#888" />
                            </View>
                        }
                        {
                            form !== 'Active' &&
                            <View style={{ flexGrow: 1, width: '100%' }}>
                                <Text style={styles.errorText}>{mail.error || " "}</Text>
                                <View style={{ ...styles.inputContainer, borderColor: mail.error ? 'red' : mail.focus ? '#4CAF50' : '#ccc' }}>
                                    <ThemeTextInput
                                        style={styles.input}
                                        onFocus={() => setMail({ ...mail, focus: true })}
                                        onBlur={() => onBlur(mail, setMail)}
                                        placeholder="mail"
                                        value={mail.value}
                                        onChangeText={(text) => setMail({ ...mail, value: text })}
                                        placeholderTextColor="#888"
                                    />
                                    <IconFeather name="mail" size={20} color="#888" />
                                </View>
                                <Text style={styles.errorText}>{password.error || " "}</Text>
                                <View style={{ ...styles.inputContainer, borderColor: password.error ? 'red' : password.focus ? '#4CAF50' : '#ccc' }}>
                                    <ThemeTextInput
                                        onFocus={() => setPassword({ ...password, focus: true })}
                                        onBlur={() => onBlur(password, setPassword)}
                                        style={styles.input}
                                        placeholder="Password"
                                        value={password.value}
                                        onChangeText={(text) => setPassword({ ...password, value: text })}
                                        placeholderTextColor="#888"
                                        secureTextEntry={password.lock}
                                    />
                                    <IconFeather onPress={() => setPassword({ ...password, lock: !password.lock })} name={password.lock ? "lock" : "unlock"} size={20} color="#888" />
                                </View>
                            </View>
                        }
                        {
                            form === 'Active' &&
                            <Txt style={styles.verification}>A verification link has been sent to your email address. Please check your inbox (and spam/junk folder, if necessary) and click on the link to verify your account.</Txt>
                        }

                        {Loading ? <ActivityIndicator size={"large"} /> :
                            <TheButton
                                buttonStyle={styles.button}
                                onPress={form === 'Login' ? handelLogIn : form === 'Sign Up' ? handleSignUp : handelLogIn}
                            >
                                <Text style={styles.buttonText}>{form === "Active" ? "🔑 Verification Complete? press here" : form}</Text>
                            </TheButton>
                        }
                        {
                            form === 'Active' &&
                            <>
                                <TheButton
                                    buttonStyle={styles.verificationBtn}
                                    onPress={sendVerificationApi}
                                >
                                    <Text style={styles.verificationText}>send verification link again</Text>
                                </TheButton>
                                <TheButton
                                    buttonStyle={{ backgroundColor: '#4545' }}
                                    title='change mail'
                                    onPress={() => setForm('Sign Up')}
                                >
                                </TheButton>
                            </>
                        }

                        {
                            form === 'Login' && mail.error == 'user not active mail' &&
                            <TheButton
                                buttonStyle={{ backgroundColor: '#4545' }}
                                title='send verification link'
                                onPress={() => {
                                    console.log("sendVerification")
                                    setForm('Active')
                                }}
                            >
                            </TheButton>
                        }

                        <Pressable
                            onPress={() => {
                                form === 'Login' ? setForm('Sign Up') : form === 'Sign Up' ? setForm('Login') :
                                    Linking.openURL(`https://mail.google.com/mail/u/0/#inbox`);
                            }}
                            style={styles.switchButton}
                        >
                            <Text style={styles.switchText}>
                                {
                                    form === 'Login' ?
                                        "Don't have an account? Sign Up" :
                                        form === 'Sign Up' ?
                                            "Already have an account? Login" :
                                            mail.value
                                }
                            </Text>
                        </Pressable>

                        {
                            form === 'Active' &&
                            <TheButton
                                buttonStyle={{ backgroundColor: 'transparent' }}
                                textStyle={{ color: '#888' }}
                                title='back to login'
                                onPress={() => setForm('Login')}
                            >
                            </TheButton>
                        }


                    </ThemeView>
                </Pressable>
            </Pressable>
        </Modal>
    );
};

export default LoginModal;

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    containerView: {
        // flex: 1,
        minWidth: 150,
        maxWidth: 600,
        width: '90%',
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor:'#ffffff50'
    },
    modalView: {
        maxWidth: 500,
        width: '100%',
        padding: 30,
        borderRadius: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    slash: {
        color: '#888',
        fontWeight: 'bold',
        fontSize: 15
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
    },
    inputContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        height: 45,
        borderRadius: 8,
        paddingHorizontal: 10,
    },
    input: {
        flexGrow: 1,
        alignSelf: 'stretch',
        fontSize: 16,
        // paddingHorizontal: 10,
        // height: 45,
    },
    button: {
        alignSelf: 'center',
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 8,
        marginVertical: 10,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center',
    },
    switchButton: {
        marginTop: 20,
    },
    switchText: {
        color: '#007BFF',
        fontSize: 14,
        textDecorationLine: 'underline',
    },
    errorText: {
        alignSelf: 'flex-start',
        color: 'red',
        fontSize: 12,
        marginTop: 5,
    },
    verification: {
        marginVertical: 10,
        fontSize: 16,
        textAlign: 'center',
    },
    verificationBtn: {
        paddingHorizontal: 10,
        backgroundColor: '#007BFF',
    },
    verificationText: {
        color: '#fff',
        fontSize: 14,
    }
});
