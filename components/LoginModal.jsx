import React, { useContext, useState } from 'react';
import {
    Modal,
    StyleSheet,
    Text,
    Pressable,
    View,
    ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import TheContext from '@/hooks/TheContext';
import TheButton from '@/assets/elements/TheButton';
import { IconFeather, ThemeTextInput, ThemeView } from '@/assets/elements/Elements';
import { createUser, login } from './../api/user.api';
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
    const [access, setAccess] = useState({
        value: '',
        state: '',
        error: '',
        focus: false,
    });
    const [access2, setAccess2] = useState({
        value: '',
        state: '',
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
            [access.state === 'mail' ? "email" : "phone"]: access.value,
            [access2.state === 'mail' ? "email" : "phone"]: access2.value
        };
        console.log(body);
        createUser(body)
            .then((res) => {
                // console.log(res);
                if (!res?.success) throw new Error(res.message);
                handelLogInSuccess(res?.data);
            })
            .catch((error) => {
                console.log("error.message");
                console.log(error.message);
                setName({ ...name, error: error.message, focus: false });
            })
            .finally(() => {
                setLoading(false);
                // setName({ ...name, value: '' });
                // setAccess({ ...access, value: '' });
                // setAccess2({ ...access2, value: '' });
                // setPassword({ ...password, value: '' });
                // setForm('Login');
            })
    };

    const handelLogInSuccess = (user) => {
        console.log("Success");
        saveToStorage('user', { ...user, password: password.value });
        setUser(user);
        setLoginState(false);
        setName({ state: '', error: '', focus: false, value: '' });
        setAccess({ state: '', error: '', focus: false, value: '' });
        setAccess2({ state: '', error: '', focus: false, value: '' });
        setPassword({ state: '', error: '', focus: false, value: '' });
        setForm('Login');
    }

    const handelLogIn = () => {
        setLoading(true)
        login({ password: password.value, access: access.value })
            .then((res) => {
                // console.log(res);
                if (!res?.success) throw new Error(res.type);
                handelLogInSuccess(res?.data);
            })
            .catch((error) => {
                console.log(error.message);
                error.message === "password" ?
                    setPassword({ ...password, error: "Invalid Password", focus: false }) :
                    setAccess({ ...access, error: "Invalid " + access.state, focus: false });
            })
            .finally(() => setLoading(false));
    };

    const validateInput = (type) => {
        const { state, value } = type;
        const regex = {
            mail: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            phone: /^\d{10}$/,
            password: /^[A-Za-z\d@$!%*?&]{8,16}$/,
            name: /^[A-Za-z\s]{2,50}$/
        }
        console.log(state, value, !regex[state]?.test(value));
        const error = !regex[state]?.test(value) && value ? 'Invalid ' + (state) : '';
        return error;
    };

    const mailOrPhone = (text) => {
        if (text === '') return '';
        const regex = /[a-zA-Z]/;
        return regex.test(text.charAt(0)) ? 'mail' : 'phone';
    };

    const onAccessChange = (text) => {
        const state = mailOrPhone(text);
        setAccess({
            value: text,
            state,
            error: ''
        });
    };

    const onBlur = (type, setState, setState2) => {
        const error = validateInput(type);
        setState((prev) => {
            if (setState2) {
                setState2((prevValue) => { return { ...prevValue, state: access.state === "phone" ? "mail" : "phone" } })
            }
            return { ...prev, error, focus: false }
        });
    };

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
                            <View style={{ ...styles.inputContainer, borderColor: name.error ? 'red' : name.focus ? '#4CAF50' : '#ccc' }}>
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

                        <Text style={styles.errorText}>{access.error || " "}</Text>
                        <View style={{ ...styles.inputContainer, borderColor: access.error ? 'red' : access.focus ? '#4CAF50' : '#ccc' }}>
                            <ThemeTextInput
                                onFocus={() => setAccess({ ...access, focus: true })}
                                onBlur={() => onBlur(access, setAccess, setAccess2)}
                                style={styles.input}
                                placeholder="Email or Phone Number"
                                value={access.value}
                                onChangeText={onAccessChange}
                                placeholderTextColor="#888"
                            />
                            {access.state === '' ?
                                <>
                                    <IconFeather name="mail" size={20} color="#888" />
                                    <Text style={styles.slash}> / </Text>
                                    <IconFeather name="phone" size={20} color="#888" />
                                </> :
                                <IconFeather name={access.state} size={20} color="#4CAF50" />
                            }
                        </View>

                        {form === 'Sign Up' && access.state !== '' &&
                            <>
                                <Text style={styles.errorText}>{access2.error || "optional"}</Text>
                                <View
                                    style={{
                                        ...styles.inputContainer,
                                        borderColor: access2.error ? 'red' :
                                            access2.focus ? '#4CAF50' : '#ccc'
                                    }}
                                >
                                    <ThemeTextInput
                                        onFocus={() => setAccess2({ ...access2, focus: true })}
                                        onBlur={() => onBlur(access2, setAccess2)}
                                        style={styles.input}
                                        placeholder={access.state === "phone" ? "mail" : "phone"}
                                        value={access2.value}
                                        onChangeText={(text) => setAccess2({ ...access2, value: text })}
                                        placeholderTextColor="#888"
                                    />
                                    <IconFeather name={access.state === "phone" ? "mail" : "phone"} size={20} color="#4CAF50" />
                                </View>
                            </>
                        }

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

                        {Loading ? <ActivityIndicator size={"large"} /> :
                            <TheButton
                                buttonStyle={styles.button}
                                onPress={form === 'Login' ? handelLogIn : handleSignUp}
                            >
                                <Text style={styles.buttonText}>{form}</Text>
                            </TheButton>
                        }

                        <Pressable
                            onPress={() => {
                                form === 'Login' ? setForm('Sign Up') : setForm('Login');
                            }}
                            style={styles.switchButton}
                        >
                            <Text style={styles.switchText}>
                                {form === 'Login' ?
                                    "Don't have an account? Sign Up" :
                                    "Already have an account? Login"
                                }
                            </Text>
                        </Pressable>
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
        minWidth:300,
        maxWidth: 600,
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor:'#ffffff50'
    },
    modalView: {
        maxWidth: 600,
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
        width: '100%',
        fontSize: 16,
        paddingHorizontal: 10,
        height: 45,
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
});
