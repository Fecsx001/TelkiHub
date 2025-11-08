
import { View, StyleSheet, Platform, Text, TouchableOpacity, Linking } from 'react-native';

interface NormalProps {
    title: string;
    text: string;
    link?: string;
    isDarkMode?: boolean;
    isHighContrast?: boolean;
}

function Normal({ title, text, link, isDarkMode = false, isHighContrast = false }: NormalProps){
    const handleLinkPress = () => {
        if (link) {
            Linking.openURL(link);
        }
    };

    const getThemeStyles = () => {
        if (isHighContrast) {
            return {
                backgroundColor: '#000000',
                textColor: '#FFFFFF',
                borderColor: '#FFFFFF'
            };
        } else if (isDarkMode) {
            return {
                backgroundColor: '#2e2e2eff', // Gray background for dark mode
                textColor: '#FFFFFF',
                borderColor: '#FFFFFF'
            };
        } else {
            return {
                backgroundColor: '#ffffff',
                textColor: '#000000',
                borderColor: '#000000'
            };
        }
    };

    const themeStyles = getThemeStyles();

    return(
        <View style={[styles.box, { 
            backgroundColor: themeStyles.backgroundColor, 
            borderColor: themeStyles.borderColor 
        }]}>
            <Text style={[styles.title, { color: themeStyles.textColor }]}>{title}</Text>
            <View style={styles.textContainer}>
                <Text style={[styles.text, { color: themeStyles.textColor }]}>
                    {text}
                </Text>
            </View>
            {link && (
                <TouchableOpacity onPress={handleLinkPress} style={styles.linkContainer}>
                    <Text style={styles.linkText}>🔗 Open Link</Text>
                </TouchableOpacity>
            )}
        </View>
    );
}

export default Normal

const styles = StyleSheet.create({
    box: {
        width: '90%',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        borderWidth: 2,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        margin: 5,
        backgroundColor: '#ffffff',
        borderColor: '#000000'
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 5,
    },
    textContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10
    },
    text: {
        fontSize: 14,
        textAlign: 'center',
        color: '#666',
    },
    linkContainer: {
        marginTop: 10,
        marginBottom: 20,
        paddingVertical: 8,
        paddingHorizontal: 16,
        backgroundColor: '#007AFF',
        borderRadius: 6,
        alignSelf: 'center',
    },
    linkText: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: '600',
        textAlign: 'center',
    },
})