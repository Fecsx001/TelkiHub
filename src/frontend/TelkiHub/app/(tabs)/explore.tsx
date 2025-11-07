import { StyleSheet } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function ExploreScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Explore</ThemedText>
      <ThemedText style={styles.subtitle}>Add your content here</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  subtitle: {
    fontSize: 18,
    marginTop: 10,
    textAlign: 'center',
  },
});
