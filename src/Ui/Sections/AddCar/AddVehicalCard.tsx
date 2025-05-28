import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
  ScrollView,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Routes} from '../../../Utils/Routes';

const AddVehicalCard = ({navigation}: any) => {
  const insets = useSafeAreaInsets();
  const [cardImage, setCardImage] = useState(null);
  const [fields, setFields] = useState([]);
  const [fileName, setFileName] = useState('');
  const dummyApiCall = (imageUri: string) => {
    // Simulate API response
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({
          fileName: 'vehicle_card_2025.png',
          fields: ['ABC123', 'Honda Civic', 'White', '2025'],
        });
      }, 1500);
    });
  };

  const handleImageUpload = () => {
    launchImageLibrary(
      {mediaType: 'photo', selectionLimit: 1},
      async response => {
        if (response.didCancel || response.errorCode) return;

        const uri = response.assets?.[0]?.uri;
        if (uri) {
          setCardImage(uri);

          // Simulate API call and set fields
          const result = await dummyApiCall(uri);
          setFileName(result.fileName);
          setFields(result.fields);
        }
      },
    );
  };

  const handleRemoveImage = () => {
    setCardImage(null);
    setFileName('');
    setFields([]);
  };
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{paddingBottom: insets.bottom + 100}}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Upload Vehicle Card</Text>
      </View>

      {/* Upload Section */}
      <View style={styles.uploadBox}>
        <Image
          source={require('../../assets/images/upload-icon.png')}
          style={styles.uploadIcon}
        />
        <Text style={styles.uploadTitle}>Upload Card Image</Text>
        <Text style={styles.uploadSubtitle}>
          Select PNG, JPEG, WEBP file formats
        </Text>
        <TouchableOpacity style={styles.selectBtn} onPress={handleImageUpload}>
          <Text style={styles.selectBtnText}>Select Image</Text>
        </TouchableOpacity>
      </View>

      {/* Image Preview & File Name */}
      {cardImage && (
        <View style={styles.filePreview}>
          <Image source={{uri: cardImage}} style={styles.previewImage} />
          <Text style={styles.fileName}>{fileName}</Text>
          <TouchableOpacity onPress={handleRemoveImage}>
            <Text style={styles.deleteBtn}>🗑️</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Fields */}
      {fields.map((val, index) => (
        <View key={index} style={styles.inputGroup}>
          <Text style={styles.label}>Field 0{index + 1}</Text>
          <TextInput style={styles.input} value={val} editable={false} />
        </View>
      ))}

      {/* Next Button */}
      <TouchableOpacity
        style={styles.nextBtn}
        onPress={() => navigation.navigate(Routes.AddCarStack.carInfo)}>
        <Text style={styles.nextBtnText}>Next</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default AddVehicalCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 40,
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
  uploadBox: {
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 20,
  },
  uploadIcon: {
    width: 40,
    height: 40,
    marginBottom: 10,
  },
  uploadTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  uploadSubtitle: {
    fontSize: 12,
    color: '#888',
    marginBottom: 12,
  },
  selectBtn: {
    backgroundColor: '#ff6600',
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 8,
  },
  selectBtnText: {
    color: '#fff',
    fontWeight: '600',
  },
  filePreview: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  previewImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 12,
  },
  fileName: {
    flex: 1,
    fontWeight: '500',
  },
  deleteBtn: {
    fontSize: 20,
    color: '#e53935',
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    marginBottom: 4,
    color: '#444',
  },
  input: {
    backgroundColor: '#f7f7f7',
    borderRadius: 8,
    padding: 10,
  },
  nextBtn: {
    backgroundColor: '#ff6600',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    left: 16,
    right: 16,
  },
  nextBtnText: {
    color: '#fff',
    fontWeight: '600',
  },
});
