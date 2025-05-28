import React from 'react';
import {
  FlatList,
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import Icon from '@react-native-vector-icons/ionicons';
import CarCard from './Components/CarCard';

const carData = [
  {
    id: '1',
    name: 'Tesla Model 3',
    type: 'Electric',
    price: '₹45,00,000',
    image: require('../../assets/images/tesla.png'),
  },
  {
    id: '2',
    name: 'BMW X5',
    type: 'SUV',
    price: '₹62,00,000',
    image: require('../../assets/images/bmw.png'),
  },
  {
    id: '3',
    name: 'Mercedes C-Class',
    type: 'Sedan',
    price: '₹55,00,000',
    image: require('../../assets/images/mercedes.png'),
  },
];
const categoryData = [
  {
    id: '1',
    label: 'SUV',
    subtitle: '24 Available',
    image: require('../../assets/images/suv.png'),
  },
  {
    id: '2',
    label: 'Sedans',
    subtitle: '18 Available',
    image: require('../../assets/images/electric.png'),
  },
  {
    id: '3',
    label: 'Electric',
    subtitle: '15 Available',
    image: require('../../assets/images/electric.png'),
  },
  {
    id: '4',
    label: 'SUV',
    subtitle: '24 Available',
    image: require('../../assets/images/suv.png'),
  },
];

const HomeScreen = () => {
  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <View style={styles.logoContainer}>
        <>
          <Text style={styles.logoText}>
            mobil<Text style={styles.orange}>scout</Text>
          </Text>
        </>
        <>
          <Icon name="search" size={18} color="#888" />
        </>
      </View>
      {/* Search */}
      <View style={styles.searchRow}>
        <View style={styles.searchBox}>
          <Icon name="search" size={18} color="#888" />
          <TextInput
            placeholder="Search by car model, number plate..."
            style={styles.searchInput}
            placeholderTextColor="#aaa"
          />
        </View>
        <TouchableOpacity style={styles.filterButton}>
          <Icon name="options-outline" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Heading */}
      <Text style={styles.headingText}>
        Discover, Verify, And Compare Cars Effortlessly.
      </Text>

      {/* Featured Picks */}
      <View style={styles.featuredCard}>
        <Image
          source={require('../../assets/images/suv.png')}
          style={styles.featuredImage}
        />
        <View style={styles.featuredOverlay}>
          <Text style={styles.featuredTitle}>Latest Models</Text>
          <Text style={styles.featuredSubtitle}>
            Explore the newest arrivals with verified histories.
          </Text>
          <TouchableOpacity style={styles.exploreButton}>
            <Text style={styles.exploreButtonText}>Explore Now</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Category Scroll */}
      <Text style={styles.sectionTitle}>Browse Categories</Text>
      <FlatList
        data={categoryData}
        keyExtractor={item => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{paddingVertical: 10}}
        renderItem={({item}) => (
          <View style={styles.categoryCard}>
            <Image source={item.image} style={styles.categoryImage} />
            <Text style={styles.categoryLabel}>{item.label}</Text>
            <Text style={styles.categorySubtitle}>{item.subtitle}</Text>
          </View>
        )}
      />

      <Text style={styles.sectionTitle}>Popular Cars</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={carData}
        keyExtractor={item => item.id}
        renderItem={({item}) => <CarCard car={item} />}
        ListHeaderComponent={renderHeader}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 40,
  },
  headerContainer: {
    marginBottom: 20,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  searchBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    borderRadius: 12,
    paddingHorizontal: 10,
    height: 40,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 14,
  },
  filterButton: {
    backgroundColor: '#ff6600',
    borderRadius: 12,
    marginLeft: 10,
    padding: 10,
  },
  headingText: {
    fontSize: 20,
    fontWeight: 'bold',
    lineHeight: 28,
    color: '#222',
    marginBottom: 16,
  },
  featuredCard: {
    height: 160,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
  },
  featuredImage: {
    width: '100%',
    height: '100%',
  },
  featuredOverlay: {
    position: 'absolute',
    top: 20,
    left: 16,
    right: 16,
  },
  featuredTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  featuredSubtitle: {
    fontSize: 13,
    color: '#eee',
    marginTop: 4,
    marginBottom: 10,
  },
  exploreButton: {
    backgroundColor: '#fff',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  exploreButtonText: {
    color: '#000',
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 6,
  },
  categoryCard: {
    backgroundColor: '#f2f2f2',
    borderRadius: 12,
    padding: 10,
    marginRight: 12,
    alignItems: 'center',
    width: 120,
  },
  categoryImage: {
    width: '100%',
    height: 60,
    borderRadius: 8,
    marginBottom: 8,
  },
  categoryLabel: {
    fontWeight: 'bold',
  },
  categorySubtitle: {
    fontSize: 12,
    color: '#888',
  },
  logoContainer: {
    // alignItems: 'center',
    marginBottom: 20,
    justifyContent: 'space-between',
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  orange: {
    color: '#FF6C00',
  },
});
