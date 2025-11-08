import { View, Text, StyleSheet, Platform } from 'react-native';

interface DeltaBoxProps {
    endpoint: string;
    number?: number;
}

function DeltaBox({ number = 60, endpoint}:DeltaBoxProps){

    const getColorForNumber = (value: number) => {
        // Clamp the value between 30 and 60
        const clampedValue = Math.max(30, Math.min(60, value));
        const ratio = (clampedValue - 30) / (60 - 30);
        
        // Interpolate between green and red
        const red = Math.round(0 + (255 - 0) * ratio);
        const green = Math.round(255 - (255 - 0) * ratio);
        const blue = 0;
        return `rgb(${red}, ${green}, ${blue})`;
    };
    
    const backgroundColor = getColorForNumber(number);
    const borderColor = getColorForNumber(number - 20); 
    
    // Get text color based on background brightness
    const getTextColor = (bgColor: string) => {
        // Extract RGB values from rgb string
        const rgbMatch = bgColor.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
        if (rgbMatch) {
            const r = parseInt(rgbMatch[1]);
            const g = parseInt(rgbMatch[2]);
            const b = parseInt(rgbMatch[3]);
            
            // Calculate luminance (brightness)
            const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
            
            // Return white for dark backgrounds, black for light backgrounds
            return luminance > 0.5 ? '#000000' : '#FFFFFF';
        }
        return '#FFFFFF'; // Default to white
    };
    
    const textColor = getTextColor(backgroundColor);
    
    return(
        <View style={[styles.box, { backgroundColor, borderColor }]}>
            <Text style={[styles.text, { color: textColor }]}>{number} perc a {endpoint}ig</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    box: {
        width: Platform.OS === 'web' ? '45%' : '70%',
        height: 80,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
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
    },
    text: {
        fontSize: Platform.OS === 'web' ? 18 : 16,
        fontWeight: 'bold',
        color: '#FFFFFF',
        textAlign: 'center',
        paddingHorizontal: 10,
    }
})

export default DeltaBox