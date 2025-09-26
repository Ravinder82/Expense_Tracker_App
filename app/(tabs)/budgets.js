import { View, Text, StyleSheet } from 'react-native';
import { COLORS, TYPOGRAPHY, SPACING } from '../../constants';

export default function BudgetsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Budgets</Text>
      <Text style={styles.subtitle}>Manage your spending limits</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    ...TYPOGRAPHY.heading.h1,
    color: COLORS.text.primary,
  },
  subtitle: {
    ...TYPOGRAPHY.body.base,
    color: COLORS.text.secondary,
    marginTop: SPACING[2],
  },
});
