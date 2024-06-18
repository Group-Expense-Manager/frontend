import { router } from 'expo-router';
import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, ScrollView, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { CustomButton, CustomTextInput } from '@/components';
import Participant from '@/components/Participant';
import SafeView from '@/components/SafeView';
import { LogoIcon } from '@/constants/Icon';
import { ExpenseCreationContext, ExpenseParticipant } from '@/context/ExpenseCreationContext';

export default function ExpenseCostDivision() {
  const { t } = useTranslation();
  const { expenseCreationProps, setExpenseCreationProps } = useContext(ExpenseCreationContext);

  type Participant = {
    participantId: string;
    participantCost: string;
  };

  function getInitialValue(expenseParticipants: ExpenseParticipant[]): Participant[] {
    return expenseParticipants.map((ex) => ({
      participantId: ex.participantId,
      participantCost: '',
    }));
  }

  const [participants, setParticipants] = useState<Participant[]>(
    getInitialValue(expenseCreationProps.expenseParticipants),
  );

  const updateCost = (id: string, cost: string) => {
    setParticipants((prev) =>
      prev.map((p) => (p.participantId === id ? { ...p, participantCost: cost } : p)),
    );
  };
  const save = () => {
    console.log(participants);
  };

  function mapToExpenseParticipants(participants: Participant[]): ExpenseParticipant[] {
    return participants.map((p) => ({
      participantId: p.participantId,
      participantCost: Number(p.participantCost),
    }));
  }

  useEffect(() => {
    setExpenseCreationProps({
      groupId: expenseCreationProps.groupId,
      title: expenseCreationProps.title,
      cost: expenseCreationProps.cost,
      baseCurrency: expenseCreationProps.baseCurrency,
      targetCurrency: expenseCreationProps.targetCurrency,
      expenseDate: expenseCreationProps.expenseDate,
      expenseParticipants: mapToExpenseParticipants(participants),
      message: expenseCreationProps.message,
      attachmentId: expenseCreationProps.attachmentId,
    });
  }, [participants]);

  return (
    <SafeView>
      <ScrollView
        contentContainerStyle={{
          height: '100%',
        }}>
        <View className="py-[32px] w-full h-full flex flex-col justify-between items-center">
          <View className="w-full flex justify-center items-center">
            <LogoIcon width="150px" height="150px" />
          </View>
          <View className="py-[32px] w-full flex flex-col space-y-[32px]">
            <ScrollView className="mt-10">
              {participants.map((participant) => (
                <Participant
                  key={participant.participantId}
                  data={participant}
                  updateCost={updateCost}
                />
              ))}
            </ScrollView>
          </View>
          <View className="py-[32px] w-full flex flex-col justify-center items-center space-y-[32px]">
            <View className="w-full">
              <CustomButton
                title={t('Next')}
                onPress={() => router.navigate('(stepper)/(expense-creation)/expense-message')}
              />
            </View>
            <View className="w-full">
              <CustomButton
                title={t('Back')}
                onPress={() => router.navigate('(stepper)/(expense-creation)/expense-participants')}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeView>
  );
}
