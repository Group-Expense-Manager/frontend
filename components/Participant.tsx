import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

interface ParticipantProps {
  data: {
    participantId: string;
    participantCost: string;
  };
  updateCost: (id: string, cost: string) => void;
}

const Participant: React.FC<ParticipantProps> = ({ data, updateCost }) => {
  const handleCostChange = (value: string) => {
    updateCost(data.participantId, value);
  };

  const names = ['Jakub', 'Jan', 'Paweł', 'Anna', 'Marcin', 'Kamil', 'Zofia', 'Piotr', 'Marta'];

  function getUserName(userId: string) {
    return names[hashCode(userId) % names.length];
  }

  function hashCode(str: string) {
    return str.split('').reduce(function (a, b) {
      a = (a << 5) - a + b.charCodeAt(0);
      return a & a;
    }, 0);
  }

  return (
    <View style={styles.participantContainer}>
      <Text style={styles.label}> {getUserName(data.participantId)}</Text>
      <TextInput value={String(data.participantCost)} onChangeText={handleCostChange} />
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
