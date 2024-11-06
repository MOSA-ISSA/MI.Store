import { Modal, StyleSheet, Text, View, TouchableOpacity, Pressable, ActivityIndicator } from 'react-native'
import React, { useContext } from 'react'
import TheContext from '@/hooks/TheContext';
import TheButton from '@/assets/elements/TheButton';

const Alert = () => {
    const { AlertState, setAlertState, } = useContext(TheContext);
    const { visible, message, cancel, confirm, ok , loading } = AlertState;
    const close = () => setAlertState({ visible: false, message: "", cancel: false, confirm: false, ok: false });
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={() => close()}
        >
            <Pressable onPress={() => close()} style={styles.centeredView}>
                <Pressable style={styles.modalView}>
                    <Text style={styles.modalText}>{message}</Text>
                    <View style={styles.buttonRow}>
                        {
                            ok && <TheButton
                                buttonStyle={[styles.button, styles.buttonOk]}
                                onPress={() => {
                                    close();
                                    if (ok) ok?.();
                                }}
                            >
                                <Text style={styles.textStyle}>ok</Text>
                            </TheButton>

                        }
                        {
                            cancel && <TheButton
                                buttonStyle={styles.buttonClose}
                                onPress={() => {
                                    close();
                                    if (cancel) cancel?.();
                                }}
                            >
                                <Text style={styles.textStyle}>Cancel</Text>
                            </TheButton>
                        }
                        {
                            confirm && <TheButton
                                style={[styles.button, styles.buttonConfirm]}
                                onPress={() => {
                                    if (confirm) confirm?.();
                                }}
                            >
                                <Text style={styles.textStyle}>Confirm</Text>
                            </TheButton>
                        }
                    </View>
                    {loading && <ActivityIndicator size="large" />}
                </Pressable>
            </Pressable>
        </Modal>
    )
}

export default Alert

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 25,
        padding: 10,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    modalText: {
        marginBottom: 20,
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    button: {
        borderRadius: 30,
        paddingVertical: 12,
        paddingHorizontal: 25,
        elevation: 2,
        marginHorizontal: 10,
    },
    buttonConfirm: {
        backgroundColor: '#4CAF50',
    },
    buttonClose: {
        backgroundColor: '#D32F2F',
    },
    textStyle: {
        color: 'white',
        fontWeight: '600',
        textAlign: 'center',
        fontSize: 16,
    },
    buttonOk: {
        backgroundColor: '#2196F3',
    },
});