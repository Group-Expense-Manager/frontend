import dayjs, { Dayjs } from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import { useNavigation } from 'expo-router';
import { useColorScheme } from 'nativewind';
import React, { useState, useLayoutEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal, Text, View, TouchableOpacity } from 'react-native';

import { ChevronLeft, ChevronLeftDouble, ChevronRight, ChevronRightDouble } from '@/constants/Icon';
import { IconSize } from '@/util/IconSize';

dayjs.extend(isoWeek);

interface CalendarModalProps {
  title: string;
  onDateSelected: (date: Date) => void;
  initialDate?: Date;
  isCalendarVisible: boolean;
  setCalendarVisible: (visible: boolean) => void;
}

const CalendarModal: React.FC<CalendarModalProps> = ({
  title,
  onDateSelected,
  initialDate,
  isCalendarVisible,
  setCalendarVisible,
}) => {
  const navigation = useNavigation();
  const { colorScheme } = useColorScheme();
  const { t } = useTranslation();
  const [currentDate, setCurrentDate] = useState<Dayjs>(dayjs(initialDate));
  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs(initialDate));

  useLayoutEffect(() => {
    navigation.setOptions({ presentation: 'transparentModal', animation: 'fade' });
  }, [navigation]);

  const handleSelectDate = (day: number) => {
    const newDate = currentDate.date(day);
    setSelectedDate(newDate);
    setCurrentDate(newDate);
    onDateSelected(newDate.toDate());
  };

  const handleMonthChange = (direction: number) => {
    setCurrentDate(currentDate.add(direction, 'month'));
  };

  const handleYearChange = (direction: number) => {
    setCurrentDate(currentDate.add(direction, 'year'));
  };

  const generateCalendar = () => {
    const daysInMonth = currentDate.daysInMonth();
    const firstDayOfMonth = currentDate.startOf('month').isoWeekday() - 1;
    const weeks: number[][] = [];
    let week: number[] = new Array(firstDayOfMonth).fill(0);

    for (let day = 1; day <= daysInMonth; day++) {
      week.push(day);
      if (week.length === 7 || day === daysInMonth) {
        while (week.length < 7) {
          week.push(0);
        }
        weeks.push(week);
        week = [];
      }
    }

    return weeks;
  };

  const weeks = generateCalendar();

  return (
    isCalendarVisible && (
      <Modal transparent statusBarTranslucent>
        <View className="flex-1 justify-end">
          <View className="absolute w-full h-full opacity-70 bg-ink-darkest">
            <TouchableOpacity onPress={() => setCalendarVisible(false)} className="w-full h-full" />
          </View>
          <View className="bg-sky-lightest dark:bg-ink-darker h-[500px] w-full p-4 rounded-t-2xl">
            <Text className="font-bold text-title3 text-ink-darkest dark:text-sky-lightest text-center my-2">
              {title}
            </Text>

            <View className="flex-row justify-between items-center my-4">
              <TouchableOpacity
                onPress={() => handleYearChange(-1)}
                className="flex justify-center items-center">
                <ChevronLeftDouble
                  width={IconSize.MEDIUM}
                  height={IconSize.MEDIUM}
                  stroke={colorScheme === 'dark' ? 'white' : 'black'}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleMonthChange(-1)}
                className="flex justify-center items-center">
                <ChevronLeft
                  width={IconSize.MEDIUM}
                  height={IconSize.MEDIUM}
                  stroke={colorScheme === 'dark' ? 'white' : 'black'}
                />
              </TouchableOpacity>
              <Text className="text-lg text-ink-darkest dark:text-sky-lightest w-40 text-center">
                {t(currentDate.format('MMMM'))} {currentDate.format('YYYY')}
              </Text>
              <TouchableOpacity
                onPress={() => handleMonthChange(1)}
                className="flex justify-center items-center">
                <ChevronRight
                  width={IconSize.MEDIUM}
                  height={IconSize.MEDIUM}
                  stroke={colorScheme === 'dark' ? 'white' : 'black'}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleYearChange(1)}
                className="flex justify-center items-center">
                <ChevronRightDouble
                  width={IconSize.MEDIUM}
                  height={IconSize.MEDIUM}
                  stroke={colorScheme === 'dark' ? 'white' : 'black'}
                />
              </TouchableOpacity>
            </View>

            <View className="flex-row justify-between mb-2">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                <Text
                  key={`label-${day}`}
                  className="text-center font-bold text-ink-darkest dark:text-sky-lightest w-12">
                  {t(day)}
                </Text>
              ))}
            </View>

            {weeks.map((week, weekIndex) => (
              <View key={`week-${weekIndex}`} className="flex-row justify-between mb-2">
                {week.map((day, dayIndex) => (
                  <TouchableOpacity
                    key={`day-${weekIndex}-${dayIndex}`}
                    onPress={() => day > 0 && handleSelectDate(day)}
                    className={`h-12 w-12 flex justify-center items-center border-2 ${
                      day > 0 &&
                      selectedDate.format('YYYY-MM-DD') ===
                        currentDate.date(day).format('YYYY-MM-DD')
                        ? 'bg-primary-base border-primary-base rounded-full'
                        : 'bg-transparent border-transparent'
                    }`}>
                    <Text
                      className={`text-center ${
                        day > 0 &&
                        selectedDate.format('YYYY-MM-DD') ===
                          currentDate.date(day).format('YYYY-MM-DD')
                          ? 'text-white'
                          : 'text-ink-darkest dark:text-sky-lightest'
                      }`}>
                      {day > 0 ? day : ''}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            ))}
          </View>
        </View>
      </Modal>
    )
  );
};

export default CalendarModal;
