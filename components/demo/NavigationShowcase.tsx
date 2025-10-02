import React, { useState } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  StyleSheet, 
  Dimensions,
  ImageBackground 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { GlassBottomNav } from '../navigation/GlassBottomNav';
import { GlassContainer } from '../glassmorphic/GlassContainer';
import { BOTTOM_NAV_VARIANTS } from '../../constants/navigationVariants';
import { GLASS_VARIANTS } from '../../constants/glassmorphic';

const { width, height } = Dimensions.get('window');

export const NavigationShowcase: React.FC = () => {
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [activeRoute, setActiveRoute] = useState('/');

  const currentVariant = BOTTOM_NAV_VARIANTS[selectedVariant];

  return (
    <View style={styles.container}>
      {/* Background with gradient */}
      <LinearGradient
        colors={[
          '#667eea',
          '#764ba2',
          '#f093fb',
          '#f5576c',
        ]}
        style={styles.background}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />

      {/* Content Area */}
      <ScrollView 
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <GlassContainer
          variant={GLASS_VARIANTS.BALANCED}
          style={styles.header}
        >
          <Text style={styles.title}>Glassmorphic Navigation</Text>
          <Text style={styles.subtitle}>
            Premium frosted glass bottom navigation variations
          </Text>
        </GlassContainer>

        {/* Current Variant Info */}
        <GlassContainer
          variant={GLASS_VARIANTS.MINIMAL}
          style={styles.variantInfo}
        >
          <Text style={styles.variantName}>{currentVariant.name}</Text>
          <Text style={styles.variantDescription}>
            {currentVariant.glassConfig.description}
          </Text>
          <View style={styles.variantDetails}>
            <Text style={styles.detailText}>
              Layers: {currentVariant.glassConfig.layers.length}
            </Text>
            <Text style={styles.detailText}>
              Icon Style: {currentVariant.iconStyle}
            </Text>
            <Text style={styles.detailText}>
              Active Indicator: {currentVariant.activeIndicator}
            </Text>
          </View>
        </GlassContainer>

        {/* Variant Selector */}
        <GlassContainer
          variant={GLASS_VARIANTS.CRYSTALLINE}
          style={styles.selectorContainer}
        >
          <Text style={styles.selectorTitle}>Choose Variant</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.variantSelector}
          >
            {BOTTOM_NAV_VARIANTS.map((variant, index) => (
              <TouchableOpacity
                key={variant.id}
                style={[
                  styles.variantButton,
                  selectedVariant === index && styles.selectedVariant,
                ]}
                onPress={() => setSelectedVariant(index)}
              >
                <Text style={[
                  styles.variantButtonText,
                  selectedVariant === index && styles.selectedVariantText,
                ]}>
                  {variant.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </GlassContainer>

        {/* Demo Cards */}
        <View style={styles.demoCards}>
          {['Dashboard', 'Transactions', 'Budgets', 'Reports'].map((card, index) => (
            <GlassContainer
              key={card}
              variant={GLASS_VARIANTS.ETHEREAL}
              style={[
                styles.demoCard,
                { 
                  transform: [{ 
                    translateY: Math.sin(Date.now() / 1000 + index) * 2 
                  }] 
                }
              ]}
            >
              <Text style={styles.cardTitle}>{card}</Text>
              <Text style={styles.cardSubtitle}>
                {card === 'Dashboard' && 'Overview & Quick Actions'}
                {card === 'Transactions' && 'Expense & Income History'}
                {card === 'Budgets' && 'Budget Management'}
                {card === 'Reports' && 'Analytics & Insights'}
              </Text>
            </GlassContainer>
          ))}
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <GlassBottomNav
        variant={currentVariant}
        activeRoute={activeRoute}
        onRouteChange={setActiveRoute}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 120, // Space for bottom nav
  },
  header: {
    padding: 24,
    borderRadius: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    marginTop: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  variantInfo: {
    padding: 20,
    borderRadius: 16,
    marginBottom: 20,
  },
  variantName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  variantDescription: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 16,
    lineHeight: 20,
  },
  variantDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  detailText: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginBottom: 4,
  },
  selectorContainer: {
    padding: 16,
    borderRadius: 16,
    marginBottom: 20,
  },
  selectorTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
    marginBottom: 12,
  },
  variantSelector: {
    flexDirection: 'row',
  },
  variantButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginRight: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  selectedVariant: {
    backgroundColor: 'rgba(138, 43, 226, 0.3)',
    borderColor: 'rgba(138, 43, 226, 0.5)',
  },
  variantButtonText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
    fontWeight: '500',
  },
  selectedVariantText: {
    color: 'white',
    fontWeight: '600',
  },
  demoCards: {
    gap: 12,
  },
  demoCard: {
    padding: 16,
    borderRadius: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
  },
});
