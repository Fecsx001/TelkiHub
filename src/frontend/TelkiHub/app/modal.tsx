import { Link } from 'expo-router';
import { StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function ModalScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Modal Screen</ThemedText>
      <ThemedText style={styles.subtitle}>Add your modal content here</ThemedText>
      <Link href="/" dismissTo style={styles.link}>
        <ThemedText type="link">Go back</ThemedText>
      </Link>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  subtitle: {
    fontSize: 16,
    marginTop: 10,
    marginBottom: 20,
    textAlign: 'center',
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
