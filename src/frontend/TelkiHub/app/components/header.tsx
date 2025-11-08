import { View, StyleSheet, Platform } from 'react-native';
import { useState, useEffect } from 'react';
import DeltaBox from '../components/time_to_delta_box'

function Header() {
    const [travelTimes, setTravelTimes] = useState({
        'Széll Kálmán tér': 30,
        'Kelenföld vasútállomás': 30
    });

    const fetchTravelTimes = async () => {
        try {

            const baseUrl = 'http://192.168.0.67:9000'
            
            const szellResponse = await fetch(`${baseUrl}/timetoSzell`);

            const kelenResponse = await fetch(`${baseUrl}/timetoKelen`);

            
            if (szellResponse.ok) {
                const szellData = await szellResponse.json();
                if (szellData.routes?.[0]?.duration) {
                    const seconds = parseInt(szellData.routes[0].duration.replace('s', ''), 10);
                    setTravelTimes(prev => ({ ...prev, 'Széll Kálmán tér': Math.round(seconds / 60) }));
                }
            }
            
            if (kelenResponse.ok) {
                const kelenData = await kelenResponse.json();
                if (kelenData.routes?.[0]?.summary?.travelTimeInSeconds) {
                    const seconds = kelenData.routes[0].summary.travelTimeInSeconds;
                    setTravelTimes(prev => ({ ...prev, 'Kelenföld vasútállomás': Math.round(seconds / 60) }));
                }
            }
        } catch (error) {
            console.log('API fetch failed:', error);
        }
    };

    useEffect(() => {
        fetchTravelTimes();
        const interval = setInterval(fetchTravelTimes, 5 * 60 * 1000);
        return () => clearInterval(interval);
    }, []);

    return(
        <View style={styles.container}>
            <DeltaBox 
                endpoint="Széll Kálmán tér" 
                number={travelTimes['Széll Kálmán tér']}
            />
            <DeltaBox 
                endpoint='Kelenföld vasútállomás'
                number={travelTimes['Kelenföld vasútállomás']}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: Platform.OS === 'web' ? 10 : 50,
    }
});

export default Header