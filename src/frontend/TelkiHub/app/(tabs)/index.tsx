
import { View, Text, StyleSheet, ScrollView, Platform, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';
import { API_BASE_URL, APP_NAME } from '../../constants';
import Header from '../components/header'
import HighPrio from '../components/high_prio_item'
import Normal from '../components/normal_wall_item'

interface DataItem {
  id: string;
  title: string;
  text: string;
  link?: string;
}

function HomeScreen() {
  const [highPriorityData, setHighPriorityData] = useState<DataItem[]>([]);
  const [normalData, setNormalData] = useState<DataItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isHighContrast, setIsHighContrast] = useState(false);

  const fetchRelevantData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/getrelevant`);
      
      if (response.ok) {
        const data = await response.json();
        console.log('API Response:', data);
        
        // Assuming the API returns data in format: { high: [...], normal: [...] }
        // Adjust this based on your actual API response structure
        if (data.high && Array.isArray(data.high)) {
          setHighPriorityData(data.high);
        }
        if (data.normal && Array.isArray(data.normal)) {
          setNormalData(data.normal);
        }
        
        // If API returns a single array, split it or use fallback
        if (Array.isArray(data) && !('high' in data)) {
          setHighPriorityData(data.slice(0, Math.ceil(data.length / 2)));
          setNormalData(data.slice(Math.ceil(data.length / 2)));
        }
      } else {
        console.error('API Error:', response.status);
        setHighPriorityData(fallbackData);
        setNormalData([]);
      }
    } catch (error) {
      console.error('Fetch error:', error);
      setHighPriorityData(fallbackData);
      setNormalData([]);
    } finally {
      setLoading(false);
    }
  };

  // Fallback data
  const fallbackData: DataItem[] = [
    {
      id: 'fallback-1',
      title: 'Sample High Priority Item',
      text: 'This is sample content for a high priority item with a link',
      link: 'https://www.example.com'
    },
    {
      id: 'fallback-2',
      title: 'Sample Item Without Link',
      text: 'This is sample content for an item without any link'
    }
  ];

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (isHighContrast) setIsHighContrast(false); // Reset high contrast when toggling dark mode
  };

  const toggleHighContrast = () => {
    setIsHighContrast(!isHighContrast);
    if (isDarkMode) setIsDarkMode(false); // Reset dark mode when toggling high contrast
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
        backgroundColor: '#1a1a1a',
        textColor: '#FFFFFF',
        borderColor: '#444444'
      };
    } else {
      return {
        backgroundColor: '#ffffff',
        textColor: '#000000',
        borderColor: '#363030ff'
      };
    }
  };

  const themeStyles = getThemeStyles();

  useEffect(() => {
    fetchRelevantData();
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: themeStyles.backgroundColor }]}>
      <View style={[styles.headerContainer, { backgroundColor: themeStyles.backgroundColor, borderBottomColor: themeStyles.borderColor }]}>
        <Header/>
      </View>

      <ScrollView style={[styles.scrollContainer, { backgroundColor: themeStyles.backgroundColor }]} contentContainerStyle={styles.contentContainer}>
        <Text style={[styles.text, { color: themeStyles.textColor }]}>{APP_NAME}</Text>
        
        {loading ? (
          <Text style={[styles.loadingText, { color: themeStyles.textColor }]}>Loading data...</Text>
        ) : (
          <>
            <Text style={[styles.sectionTitle, { color: themeStyles.textColor }]}>High Priority</Text>
            {highPriorityData.map((item) => (
              <HighPrio key={item.id} title={item.title} text={item.text} link={item.link}/>
            ))}
            
            <Text style={[styles.sectionTitle, { color: themeStyles.textColor }]}>Normal Items</Text>
            {normalData.map((item) => (
              <Normal 
                key={`normal-${item.id}`} 
                title={item.title} 
                text={item.text} 
                link={item.link}
                isDarkMode={isDarkMode}
                isHighContrast={isHighContrast}
              />
            ))}
          </>
        )}

      </ScrollView>
      
      {/* Theme Toggle Buttons */}
      <View style={styles.themeToggleContainer}>
        <TouchableOpacity 
          style={[styles.toggleButton, isDarkMode && styles.activeButton]} 
          onPress={toggleDarkMode}
        >
          <Text style={[styles.toggleButtonText, isDarkMode && styles.activeButtonText]}>
            {isDarkMode ? '☀️' : '🌙'}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.toggleButton, isHighContrast && styles.activeButton]} 
          onPress={toggleHighContrast}
        >
          <Text style={[styles.toggleButtonText, isHighContrast && styles.activeButtonText]}>
            ⚡
          </Text>
        </TouchableOpacity>
      </View>
      
    </View>
  );
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff'
  },
  headerContainer: {
    paddingTop: Platform.OS === 'web' ? 10 : 50,
    paddingHorizontal: 20,
    paddingBottom: 10,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#363030ff',
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: '#ffffff'
  },
  contentContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  text: {
    fontSize: 50,
    marginBottom: 20,
    color: '#000000',
    textAlign: 'center'
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    marginHorizontal: 20,
    color: '#000000',
    textAlign: 'center'
  },
  loadingText: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    marginTop: 50,
  },
  themeToggleContainer: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    flexDirection: 'column',
    gap: 10,
  },
  toggleButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderWidth: 2,
    borderColor: '#ddd',
  },
  activeButton: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  toggleButtonText: {
    fontSize: 20,
    color: '#333',
  },
  activeButtonText: {
    color: '#FFFFFF',
  },
});