import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { saveToStorage } from '@/constants/local';
import TheButton from '@/assets/elements/TheButton';
import { IconFeather, ThemeTextInput, ThemeView } from '@/assets/elements/Elements';
import { signup } from './../api/user.api';
import { Cover } from '../assets/elements/Elements';

const SignUp = () => {
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
    });

    const [showSecondInput, setShowSecondInput] = useState(false);
    const [errors, setErrors] = useState({});

    const validateInput = (key, value) => {
        const regexes = {
            name: /^[A-Za-z\s]{2,50}$/,
            email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            phone: /^\d{10}$/,
            password: /^[A-Za-z\d@$!%*?&]{8,16}$/,
        };

        if (!regexes[key].test(value)) {
            return `Invalid ${key}`;
        }
        return '';
    };

    const handleInputChange = (key, value) => {
        setFormData({ ...formData, [key]: value });

        if (key === 'email' || key === 'phone') {
            setShowSecondInput(true);
        }

        const error = validateInput(key, value);
        setErrors({ ...errors, [key]: error });
    };

    const handleSignUp = () => {
        const newErrors = {};
        let hasError = false;

        Object.keys(formData).forEach((key) => {
            const error = validateInput(key, formData[key]);
            if (error) {
                hasError = true;
                newErrors[key] = error;
            }
        });

        setErrors(newErrors);

        if (hasError) return;

        setLoading(true);
        signup(formData)
            .then((res) => {
                if (!res?.success) throw new Error(res.message);
                saveToStorage('user', { ...formData });
                navigation.navigate('Login');
            })
            .catch((error) => {
                console.log(error.message);
            })
            .finally(() => setLoading(false));
    };

    return (
        <Cover style={styles.container}>
            <ThemeView style={styles.card}>
                {/* Name Input */}
                <Text style={styles.errorText}>{errors.name || ' '}</Text>
                <View style={{ ...styles.inputContainer, borderColor: errors.name ? 'red' : '#ccc' }}>
                    <ThemeTextInput
                        placeholder="Full Name"
                        value={formData.name}
                        onChangeText={(text) => handleInputChange('name', text)}
                        placeholderTextColor="#888"
                        style={styles.input}
                    />
                    <IconFeather name="user" size={20} color="#888" />
                </View>

                {/* Email Input */}
                <Text style={styles.errorText}>{errors.email || ' '}</Text>
                <View style={{ ...styles.inputContainer, borderColor: errors.email ? 'red' : '#ccc' }}>
                    <ThemeTextInput
                        placeholder="Email"
                        value={formData.email}
                        onChangeText={(text) => handleInputChange('email', text)}
                        placeholderTextColor="#888"
                        style={styles.input}
                    />
                    <IconFeather name="mail" size={20} color="#888" />
                </View>

                {/* Phone Input (Conditionally Rendered) */}
                {showSecondInput && (
                    <>
                        <Text style={styles.errorText}>{errors.phone || ' '}</Text>
                        <View style={{ ...styles.inputContainer, borderColor: errors.phone ? 'red' : '#ccc' }}>
                            <ThemeTextInput
                                placeholder="Phone Number"
                                value={formData.phone}
                                onChangeText={(text) => handleInputChange('phone', text)}
                                placeholderTextColor="#888"
                                style={styles.input}
                            />
                            <IconFeather name="phone" size={20} color="#888" />
                        </View>
                    </>
                )}

                {/* Password Input */}
                <Text style={styles.errorText}>{errors.password || ' '}</Text>
                <View style={{ ...styles.inputContainer, borderColor: errors.password ? 'red' : '#ccc' }}>
                    <ThemeTextInput
                        placeholder="Password"
                        value={formData.password}
                        onChangeText={(text) => handleInputChange('password', text)}
                        placeholderTextColor="#888"
                        secureTextEntry={true}
                        style={styles.input}
                    />
                    <IconFeather name="lock" size={20} color="#888" />
                </View>

                {/* Submit Button */}
                {loading ? (
                    <ActivityIndicator size="large" />
                ) : (
                    <TheButton
                        buttonStyle={styles.button}
                        onPress={handleSignUp}
                    >
                        <Text style={styles.buttonText}>Sign Up</Text>
                    </TheButton>
                )}

                <TouchableOpacity
                    onPress={() => navigation.navigate('Login')}
                    style={styles.switchButton}
                >
                    <Text style={styles.switchText}>Already have an account? Login</Text>
                </TouchableOpacity>
            </ThemeView>
        </Cover>
    );
};

export default SignUp;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        maxWidth: 600,
        width: '100%',
        padding: 30,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
        textAlign: 'center',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    input: {
        flex: 1,
        fontSize: 16,
        padding: 10,
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
    },
    switchButton: {
        marginTop: 20,
    },
    switchText: {
        color: '#007BFF',
        fontSize: 14,
        textDecorationLine: 'underline',
        textAlign: 'center',
    },
    errorText: {
        color: 'red',
        fontSize: 12,
        alignSelf: 'flex-start',
        marginBottom: 5,
    },
});
