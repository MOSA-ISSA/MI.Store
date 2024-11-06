import React, { useContext } from 'react';
import { Modal, Pressable, StyleSheet, View } from 'react-native';
import { Container, Txt } from './Elements';
import TheButton from './TheButton';
import STRINGS from '../Strings';
import { saveToStorage } from '../../constants/local';
import TheContext from '../../hooks/TheContext';

const LanguageModal = ({ visible, onClose,}) => {
    const { Language, setLanguage } = useContext(TheContext);

    const handleLanguageChange = (value) => {
        saveToStorage('language', value);
        setLanguage(value);
        onClose(); // Close the modal after selection
    };

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <Pressable style={styles.modalView} onPress={onClose}>
                <Container style={styles.modalContainer}>
                    <Txt style={styles.txt}>{STRINGS.language[Language]}</Txt>
                    <TheButton
                        onPress={() => handleLanguageChange('ar')}
                        buttonStyle={styles.btn}
                        title={STRINGS.Arabic[Language]}
                    />
                    <TheButton
                        onPress={() => handleLanguageChange('he')}
                        buttonStyle={styles.btn}
                        title={STRINGS.Hebrew[Language]}
                    />
                    <TheButton
                        onPress={() => handleLanguageChange('en')}
                        buttonStyle={styles.btn}
                        title={STRINGS.English[Language]}
                    />
                </Container>
            </Pressable>
        </Modal>
    );
};

export default LanguageModal;

const styles = StyleSheet.create({
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
        fontSize: 20,
        fontWeight: 'bold',
    },
});
