import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Animated,
  TextInput,
  Keyboard,
} from 'react-native';

import { ChevronDownIcon, CloseIcon, SearchIcon } from '@/constants/Icon';

interface SelectListProps {
  name: string;
  setSelected: Function;
  data: object[];
}

type L1Keys = { key?: any; value?: any; disabled?: boolean | undefined };

const SelectList: React.FC<SelectListProps> = ({ setSelected, data, name }) => {
  const { t } = useTranslation();

  const [dropdown, setDropdown] = React.useState<boolean>(false);
  const [selectedVal, setSelectedVal] = React.useState<any>('');

  const animatedValue = React.useRef(new Animated.Value(0)).current;
  const [filteredData, setFilteredData] = React.useState(data);

  const slideDown = () => {
    setDropdown(true);
    Animated.timing(animatedValue, {
      toValue: 200,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };
  const slideUp = () => {
    Animated.timing(animatedValue, {
      toValue: 0,
      duration: 500,
      useNativeDriver: false,
    }).start(() => setDropdown(false));
  };

  React.useEffect(() => {
    setFilteredData(data);
  }, [data]);

  return (
    <View>
      {dropdown ? (
        <View style={[styles.wrapper]}>
          <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
            <SearchIcon width={20} height={20} />
            <TextInput
              placeholder={t('Search')}
              onChangeText={(val) => {
                const result = data.filter((item: L1Keys) => {
                  val.toLowerCase();
                  const row = item.value.toLowerCase();
                  return row.search(val.toLowerCase()) > -1;
                });
                setFilteredData(result);
              }}
              style={[{ padding: 0, height: 20, flex: 1 }]}
            />
            <TouchableOpacity onPress={() => slideUp()}>
              <CloseIcon width={20} height={20} />
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <TouchableOpacity
          style={[styles.wrapper]}
          onPress={() => {
            if (!dropdown) {
              Keyboard.dismiss();
              slideDown();
            } else {
              slideUp();
            }
          }}>
          <Text>{selectedVal === '' ? t(name) : selectedVal}</Text>
          <ChevronDownIcon width={20} height={20} />
        </TouchableOpacity>
      )}

      {dropdown ? (
        <Animated.View style={[{ maxHeight: animatedValue }, styles.dropdown]}>
          <ScrollView
            contentContainerStyle={{ paddingVertical: 10, overflow: 'hidden' }}
            nestedScrollEnabled>
            {filteredData.length >= 1 ? (
              filteredData.map((item: L1Keys, index: number) => {
                const key = item.key ?? item.value ?? item;
                const value = item.value ?? item;
                const disabled = item.disabled ?? false;
                if (disabled) {
                  return (
                    <TouchableOpacity
                      style={[styles.disabledoption]}
                      key={index}
                      onPress={() => {}}>
                      <Text>{value}</Text>
                    </TouchableOpacity>
                  );
                } else {
                  return (
                    <TouchableOpacity
                      style={[styles.option]}
                      key={index}
                      onPress={() => {
                        setSelected(key);
                        setSelectedVal(value);
                        slideUp();
                        setTimeout(() => {
                          setFilteredData(data);
                        }, 800);
                      }}>
                      <Text>{value}</Text>
                    </TouchableOpacity>
                  );
                }
              })
            ) : (
              <TouchableOpacity
                style={[styles.option]}
                onPress={() => {
                  setSelected(undefined);
                  slideUp();
                  setTimeout(() => setFilteredData(data), 800);
                }}
              />
            )}
          </ScrollView>
        </Animated.View>
      ) : null}
    </View>
  );
};

export default SelectList;

const styles = StyleSheet.create({
  wrapper: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'gray',
    paddingHorizontal: 20,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dropdown: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'gray',
    marginTop: 10,
    overflow: 'hidden',
  },
  option: { paddingHorizontal: 20, paddingVertical: 8, overflow: 'hidden' },
  disabledoption: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'whitesmoke',
    opacity: 0.9,
  },
});
