import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  FlatList,
  Alert,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {Routes} from '../../../Utils/Routes';

const MAX_IMAGES = 6;
const AddCarScreen = () => {
  const [carType, setCarType] = useState('Private');
  const [images, setImages] = useState(Array(MAX_IMAGES).fill(null));
  const navigation = useNavigation();

  const handleSelectImage = (index: any) => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        selectionLimit: 1,
      },
      response => {
        if (response.didCancel || response.errorCode) {
          return;
        }
        const uri = response.assets?.[0]?.uri;
        if (uri) {
          const updatedImages = [...images];
          updatedImages[index] = uri;
          setImages(updatedImages);
        }
      },
    );
  };

  const handleRemoveImage = (index: number) => {
    const updatedImages = [...images];
    updatedImages[index] = null;
    setImages(updatedImages);
  };

  const renderImageSlot = (item: any, index: number) => (
    <TouchableOpacity
      style={styles.imageSlot}
      onPress={() => handleSelectImage(index)}
      activeOpacity={0.8}>
      {item ? (
        <>
          <Image source={{uri: item}} style={styles.uploadedImage} />
          <TouchableOpacity
            style={styles.removeButton}
            onPress={() => handleRemoveImage(index)}>
            <Text style={styles.removeText}>×</Text>
          </TouchableOpacity>
        </>
      ) : (
        <Image
          source={require('../../assets/images/image-placeholder.jpg')} // placeholder icon
          style={styles.placeholderImage}
        />
      )}
    </TouchableOpacity>
  );
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Text style={styles.backArrow}>{'←'}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add New Car</Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, carType === 'Private' && styles.activeTab]}
          onPress={() => setCarType('Private')}>
          <Text
            style={
              carType === 'Private' ? styles.activeTabText : styles.tabText
            }>
            Private
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, carType === 'Business' && styles.activeTab]}
          onPress={() => setCarType('Business')}>
          <Text
            style={
              carType === 'Business' ? styles.activeTabText : styles.tabText
            }>
            Business
          </Text>
        </TouchableOpacity>
      </View>

      {/* Upload Card */}
      <View style={styles.uploadBox}>
        <View style={styles.uploadHeader}>
          <Image
            source={require('../../assets/images/upload-icon.png')} // your upload icon
            style={styles.uploadIcon}
          />
          <Text style={styles.uploadTitle}>Upload Car Images</Text>
          <Text style={styles.uploadSubtitle}>
            Select PNG, JPEG, WEBP file formats
          </Text>
        </View>

        {/* 6 Image Slots */}
        <View style={styles.imageGrid}>
          {images.map((img, index) => renderImageSlot(img, index))}
        </View>

        <TouchableOpacity
          style={styles.selectButton}
          onPress={() => {
            const firstEmpty = images.findIndex(i => i === null);
            if (firstEmpty === -1) {
              return navigation.navigate(Routes.AddCarStack.vehicalCard);
            } else {
              handleSelectImage(firstEmpty);
            }
          }}>
          <Text style={styles.selectButtonText}>Select Images</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddCarScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 20,
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backArrow: {
    fontSize: 24,
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 10,
  },
  activeTab: {
    backgroundColor: '#fff',
    elevation: 2,
  },
  tabText: {
    color: '#aaa',
  },
  activeTabText: {
    color: '#000',
    fontWeight: '600',
  },
  uploadBox: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#eee',
    padding: 16,
  },
  uploadHeader: {
    alignItems: 'center',
    marginBottom: 12,
  },
  uploadIcon: {
    width: 40,
    height: 40,
    marginBottom: 8,
  },
  uploadTitle: {
    fontWeight: '600',
    fontSize: 16,
  },
  uploadSubtitle: {
    fontSize: 12,
    color: '#888',
  },
  imageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginVertical: 12,
  },
  imageSlot: {
    width: '30%',
    height: 80,
    backgroundColor: '#f4f4f4',
    borderRadius: 8,
    marginBottom: 12,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  placeholderImage: {
    width: 40,
    height: 40,
    opacity: 0.3,
  },
  uploadedImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  removeButton: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 2,
    elevation: 2,
  },
  removeText: {
    fontSize: 14,
    color: '#000',
  },
  selectButton: {
    backgroundColor: '#ff6600',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  selectButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
});
