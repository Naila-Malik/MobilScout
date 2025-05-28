// components/CarCard.js
import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';

export default function CarCard({car}: any) {
  return (
    <View style={styles.card}>
      <Image source={car.image} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name}>{car.name}</Text>
        <Text style={styles.type}>{car.type}</Text>
        <Text style={styles.price}>{car.price}</Text>
        <TouchableOpacity>
          <Text style={styles.detailsLink}>View Details</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    elevation: 2,
  },
  image: {
    width: 100,
    height: 70,
    borderRadius: 8,
  },
  info: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  type: {
    color: '#666',
    marginTop: 2,
  },
  price: {
    fontWeight: '600',
    marginTop: 4,
  },
  detailsLink: {
    color: '#ff6600',
    marginTop: 6,
  },
});
