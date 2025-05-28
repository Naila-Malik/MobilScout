import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';

const images = [
  {id: '1', uri: 'https://i.pravatar.cc/100'},
  {id: '2', uri: 'https://i.pravatar.cc/100'},
  {id: '3', uri: 'https://i.pravatar.cc/100'},
];

const {width} = Dimensions.get('window');

const VehicalDetail = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [readMore, setReadMore] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  const handleThumbnailPress = (index: number) => {
    setActiveIndex(index);
    flatListRef.current?.scrollToIndex({index});
  };

  return (
    <View style={styles.container}>
      {/* Image Carousel */}
      <FlatList
        ref={flatListRef}
        data={images}
        keyExtractor={item => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={e => {
          const newIndex = Math.round(e.nativeEvent.contentOffset.x / width);
          setActiveIndex(newIndex);
        }}
        renderItem={({item}) => (
          <Image source={{uri: item.uri}} style={styles.mainImage} />
        )}
      />

      {/* Thumbnail Images */}
      <View style={styles.thumbnailContainer}>
        {images.map((item, index) => (
          <TouchableOpacity
            key={item.id}
            onPress={() => handleThumbnailPress(index)}
            style={[
              styles.thumbnail,
              index === activeIndex && styles.activeThumbnail,
            ]}>
            <Image source={{uri: item.uri}} style={styles.thumbnailImage} />
          </TouchableOpacity>
        ))}
      </View>

      {/* Car Details */}
      <ScrollView style={styles.detailsContainer}>
        <Text style={styles.carName}>Car Name</Text>
        <Text style={styles.carPrice}>$1,500</Text>

        <View style={styles.divider} />

        <Text style={styles.sectionTitle}>Product Description</Text>
        <Text style={styles.descriptionText}>
          {readMore
            ? 'Introducing the Turbocharged Speedster, a remarkable blend of cutting-edge technology and sleek design. This high-performance car features an aerodynamic silhouette that not only turns heads but also enhances speed and efficiency.'
            : 'Introducing the Turbocharged Speedster, a remarkable blend of cutting-edge technology and sleek design...'}
          <Text style={styles.readMore} onPress={() => setReadMore(!readMore)}>
            {readMore ? ' Read Less' : ' Read More'}
          </Text>
        </Text>

        <View style={styles.divider} />

        <Text style={styles.sectionTitle}>Other Details</Text>
        <View style={styles.detailRow}>
          <View style={styles.detailBox}>
            <Text style={styles.detailHeading}>Heading</Text>
            <Text style={styles.detailContent}>Content</Text>
          </View>
          <View style={styles.detailBox}>
            <Text style={styles.detailHeading}>Heading</Text>
            <Text style={styles.detailContent}>Content</Text>
          </View>
          <View style={styles.detailBox}>
            <Text style={styles.detailHeading}>Heading</Text>
            <Text style={styles.detailContent}>Content</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default VehicalDetail;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff'},
  mainImage: {
    width: width,
    height: 250,
    resizeMode: 'cover',
  },
  thumbnailContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 10,
    backgroundColor: '#fff',
  },
  thumbnail: {
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'transparent',
    marginHorizontal: 5,
  },
  activeThumbnail: {
    borderColor: '#FF6600',
  },
  thumbnailImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
  },
  detailsContainer: {
    padding: 20,
    backgroundColor: '#fff',
  },
  carName: {
    fontSize: 18,
    fontWeight: '600',
  },
  carPrice: {
    fontSize: 18,
    color: '#FF6600',
    marginVertical: 8,
  },
  sectionTitle: {
    fontWeight: '600',
    fontSize: 16,
    marginVertical: 10,
  },
  descriptionText: {
    fontSize: 14,
    color: '#333',
  },
  readMore: {
    color: '#FF6600',
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 16,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailBox: {
    backgroundColor: '#FAFAFA',
    padding: 10,
    borderRadius: 10,
    width: '30%',
  },
  detailHeading: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
    color: '#FF6600',
  },
  detailContent: {
    fontSize: 13,
    color: '#333',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderColor: '#eee',
    paddingVertical: 10,
    backgroundColor: '#fff',
  },
  navItem: {
    fontSize: 12,
    color: '#444',
  },
});
