import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

import { CustomTextInput } from '@/components/index';

interface ParticipantProps {
  data: {
    participantId: string;
    participantCost: string;
  };
  updateCost: (id: string, cost: string) => void;
}

const Participant: React.FC<ParticipantProps> = ({ data, updateCost }) => {
  const handleCostChange = (value: string) => {
    updateCost(data.participantId, value.replace(/[^0-9.]/g, ''));
  };

  const names = [
    'Jakub',
    'Jan',
    'Paweł',
    'Anna',
    'Marcin',
    'Kamil',
    'Zofia',
    'Piotr',
    'Marta',
    'Adam',
    'Artur',
    'Dominik',
    'Emil',
    'Filip',
    'Grzegorz',
    'Hubert',
    'Krzysztof',
    'Łukasz',
    'Mikołaj',
    'Agnieszka',
    'Barbara',
    'Dorota',
    'Ewa',
    'Gabriela',
    'Halina',
    'Irena',
    'Jadwiga',
    'Katarzyna',
    'Lidia',
  ];

  function getUserName(id: string) {
    return names[(id.charCodeAt(0) + id.charCodeAt(1)) % names.length];
  }

  return (
    <View style={styles.participantContainer}>
      <CustomTextInput
        label={getUserName(data.participantId)}
        onChangeText={handleCostChange}
        value={String(data.participantCost)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  participantContainer: {
    marginVertical: 8,
  },
  label: {
    fontSize: 16,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 8,
    borderRadius: 4,
    marginTop: 4,
  },
});

export default Participant;
