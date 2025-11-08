
import { View, StyleSheet, Platform, Text, TouchableOpacity, Linking } from 'react-native';

interface HighPrioProps {
    title: string;
    text: string;
    link?: string;
}

function HighPrio({ title, text, link }: HighPrioProps){
    const handleLinkPress = () => {
        if (link) {
            Linking.openURL(link);
        }
    };

    return(
        <View style={[styles.box]}>
            <Text style={styles.title}>{title}</Text>
            <View style={styles.textContainer}>
                <Text style={styles.text}>
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

export default HighPrio

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
        backgroundColor: '#ffee00ff',
        borderColor: '#ff0000'
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