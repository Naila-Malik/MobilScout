import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  Pressable,
} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {Routes} from '../../../Utils/Routes';

type FormData = {
  kilometer: string;
  color: string;
  condition: string;
  price: string;
  description: string;
  vatDeductible: string;
};

const AddCarInfo = ({navigation}: any) => {
  const {
    control,
    handleSubmit,
    setValue,
    formState: {errors},
  } = useForm<FormData>({
    defaultValues: {
      kilometer: '',
      color: '',
      condition: '',
      price: '',
      description:
        'Introducing the Turbocharged Speedster, a remarkable blend of cutting-edge technology and sleek design. This high-performance car features an aerodynamic silhouette that not only turns heads but also enhances speed and efficiency.',
      vatDeductible: 'Yes',
    },
  });

  const [vatModalVisible, setVatModalVisible] = useState(false);

  const onSubmit = (data: FormData) => {
    console.log('Form Data:', data);
    // You can use React Query's mutation here later
    navigation.navigate(Routes.AddCarStack.VehicalDetail);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Final Info</Text>

      <Text style={styles.uploadSubtitle}>Kilometer</Text>
      <FormField
        control={control}
        name="kilometer"
        placeholder="Kilometer"
        error={errors.kilometer}
      />
      <Text style={styles.uploadSubtitle}>Color</Text>
      <FormField
        control={control}
        name="color"
        placeholder="Color"
        error={errors.color}
      />
      <Text style={styles.uploadSubtitle}>Condition</Text>
      <FormField
        control={control}
        name="condition"
        placeholder="Condition"
        error={errors.condition}
      />
      <Text style={styles.uploadSubtitle}>Price</Text>
      <FormField
        control={control}
        name="price"
        placeholder="Price"
        keyboardType="numeric"
        error={errors.price}
      />
      <Text style={styles.uploadSubtitle}>Description</Text>
      <Controller
        control={control}
        name="description"
        render={({field: {onChange, value}}) => (
          <TextInput
            style={[styles.input, {height: 100, textAlignVertical: 'top'}]}
            multiline
            numberOfLines={4}
            value={value}
            onChangeText={onChange}
            placeholder="Description"
          />
        )}
      />

      <Text style={styles.label}>VAT Deductible</Text>
      <TouchableOpacity
        style={styles.dropdown}
        onPress={() => setVatModalVisible(true)}>
        <Controller
          control={control}
          name="vatDeductible"
          render={({field: {value}}) => (
            <Text style={styles.dropdownText}>{value}</Text>
          )}
        />
      </TouchableOpacity>

      {/* VAT Modal */}
      <Modal
        transparent
        animationType="fade"
        visible={vatModalVisible}
        onRequestClose={() => setVatModalVisible(false)}>
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setVatModalVisible(false)}>
          <View style={styles.modal}>
            {['Yes', 'No'].map(option => (
              <Pressable
                key={option}
                style={styles.modalOption}
                onPress={() => {
                  setValue('vatDeductible', option);
                  setVatModalVisible(false);
                }}>
                <Text style={styles.modalText}>{option}</Text>
              </Pressable>
            ))}
          </View>
        </Pressable>
      </Modal>

      <TouchableOpacity
        style={styles.submitButton}
        onPress={handleSubmit(onSubmit)}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const FormField = ({
  control,
  name,
  placeholder,
  keyboardType,
  error,
}: {
  control: any;
  name: string;
  placeholder: string;
  keyboardType?: 'default' | 'numeric';
  error?: any;
}) => (
  <>
    <Controller
      control={control}
      name={name}
      rules={{required: true}}
      render={({field: {onChange, value}}) => (
        <TextInput
          style={[styles.input, error && styles.inputError]}
          placeholder={placeholder}
          value={value}
          onChangeText={onChange}
          keyboardType={keyboardType || 'default'}
        />
      )}
    />
  </>
);

export default AddCarInfo;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  uploadSubtitle: {
    fontSize: 14,
    marginBottom: 6,
    fontWeight: '500',
  },
  header: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    marginVertical: 20,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: '#F9F9F9',
  },
  inputError: {
    borderColor: 'red',
  },
  label: {
    fontSize: 16,
    marginBottom: 6,
    fontWeight: '500',
  },

  submitButton: {
    backgroundColor: '#FF6600',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  dropdown: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
    backgroundColor: '#F9F9F9',
  },
  dropdownText: {
    fontSize: 16,
    color: '#333',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  modal: {
    backgroundColor: '#fff',
    borderRadius: 10,
    width: 250,
    paddingVertical: 20,
    alignItems: 'center',
  },
  modalOption: {
    paddingVertical: 12,
    width: '100%',
    alignItems: 'center',
  },
  modalText: {
    fontSize: 16,
  },
});
