import { ActivityIndicator, Alert, Platform, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import WebView from 'react-native-webview'
import { useTheme } from '../hooks/ThemeContext';

const PdfView = ({ pdf, reloadKey, }) => {
    // console.log(pdf);

    // const [PDF, setPDF] = useState('');
    const [loading, setLoading] = useState(true);
    const [loadingState, setLoadingState] = useState(0);
    const { bgcColor } = useTheme();


    const WebIframe = () => {
        return (
            <iframe
                style={styles.webview}
                src={`https://mozilla.github.io/pdf.js/web/viewer.html?file=${pdf}`}
                // src={pdf}
                width="99%"
                height="100%"
                onLoadStart={() => {
                    console.log("loading");
                }}
                onLoad={() => {
                    console.log("loaded");
                    setLoading(false);
                }}
                onError={() => setLoading(false)}
            />
        )
    }

    useEffect(() => {
        // setLoading(true);
        setLoadingState(0);
        // setPDF(pdf);
    }, [reloadKey, pdf]);

    return (
        <View style={styles.view}>
            {loading &&
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#00f" style={styles.loading} />
                    <Text style={[styles.loadingText, { color: bgcColor }]}>{loadingState * 100}% Loading...</Text>
                </View>
            }
            {
                Platform.OS === 'web' ?
                    <WebIframe /> :
                    <WebView
                        key={reloadKey}
                        style={styles.webview}
                        originWhitelist={['*']}
                        source={{
                            html: `<iframe src="https://mozilla.github.io/pdf.js/web/viewer.html?file=${pdf}" width="100%" height="100%"></iframe>`,
                        }}
                        // source={{
                        //     uri: Platform.OS === 'ios' ?
                        //         `${pdf}` :
                        //         `https://docs.google.com/gview?embedded=true&url=${pdf}`,
                        //     method: 'GET',
                        //     headers: {
                        //         'Content-Type': 'application/pdf',
                        //     }
                        // }}
                        onLoadProgress={({ nativeEvent }) => {
                            setLoadingState(nativeEvent.progress.toFixed(2));
                            if (nativeEvent.progress === 1) {
                                setLoading(false);
                            }
                        }}
                        onLoadStart={() => {
                            console.log("loading");
                        }}
                        onLoad={() => {
                            console.log("loaded");
                            setLoading(false);
                        }}
                        onError={() => {
                            setLoading(false)
                            Alert.alert('Error',
                                'Could not load document'
                            );
                        }
                        }
                        androidLayerType='hardware'
                        renderToHardwareTextureAndroid={true}
                    />
            }
            <View style={styles.reload}>
                <Text style={[styles.text, { color: bgcColor }]}>
                    Try reload the document or download it.
                </Text>
            </View>
        </View>
    )
}

export default PdfView

const styles = StyleSheet.create({
    view: {
        flex: 1,
        width: '100%',
        minHeight: 100,
    },
    webview: {
        flex: 1,
        width: '98%',
        alignSelf: 'center',
        backgroundColor: '#4545',
        borderRadius: 10,
        margin: 10,
        overflow: 'hidden',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    },
    loadingContainer: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: [{ translateX: -50 }, { translateY: -50 }],
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10,
    },
    loading: {
        marginBottom: 10, // Space between loading spinner and text
    },
    loadingText: {
        fontSize: 25,
    },
    reload: {
        position: 'absolute',
        bottom: 10,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: -1,
    },
    text: {
        fontSize: 16,
    }
})