import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Animated,
  Keyboard,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { CheckIcon, ChevronDownIcon, CloseIcon, SearchIcon } from '@/constants/Icon';

interface MultipleSelectListProps {
  name: string;
  label: string;
  setSelected: Function;
  data: object[];
}

type L1Keys = { key?: any; value?: any; disabled?: boolean | undefined };

const MultipleSelectList: React.FC<MultipleSelectListProps> = ({
  setSelected,
  data,
  name,
  label,
}) => {
  const { t } = useTranslation();

  const [dropdown, setDropdown] = React.useState<boolean>(false);
  const [selectedVal, setSelectedVal] = React.useState<any>([]);

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
            <TouchableOpacity
              onPress={() => {
                slideUp();
              }}>
              <CloseIcon width={20} height={20} />
            </TouchableOpacity>
          </View>
        </View>
      ) : selectedVal?.length > 0 ? (
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
          <View>
            <Text style={[{ fontWeight: '600' }]}>{label}</Text>
            <View style={{ flexDirection: 'row', marginBottom: 8, flexWrap: 'wrap' }}>
              {selectedVal?.map((item: any, index: number) => {
                return (
                  <View
                    key={index}
                    style={[
                      {
                        backgroundColor: 'gray',
                        paddingHorizontal: 20,
                        paddingVertical: 5,
                        borderRadius: 50,
                        marginRight: 10,
                        marginTop: 10,
                      },
                    ]}>
                    <Text style={[{ color: 'white' }]}>{item}</Text>
                  </View>
                );
              })}
            </View>
          </View>
        </TouchableOpacity>
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
          <View>
            <ScrollView contentContainerStyle={{ paddingVertical: 10 }} nestedScrollEnabled>
              {filteredData.length >= 1 ? (
                filteredData.map((item: L1Keys, index: number) => {
                  const key = item.key ?? item.value ?? item;
                  const value = item.value ?? item;
                  const disabled = item.disabled ?? false;
                  if (disabled) {
                    return (
                      <TouchableOpacity style={[styles.disabledoption]} key={index}>
                        <View
                          style={[
                            {
                              width: 15,
                              height: 15,
                              marginRight: 10,
                              borderRadius: 3,
                              justifyContent: 'center',
                              alignItems: 'center',
                              backgroundColor: '#c4c5c6',
                            },
                          ]}>
                          {selectedVal?.includes(value) ? <CheckIcon width={8} height={8} /> : null}
                        </View>
                        <Text style={[{ color: '#c4c5c6' }]}>{value}</Text>
                      </TouchableOpacity>
                    );
                  } else {
                    return (
                      <TouchableOpacity
                        style={[styles.option]}
                        key={index}
                        onPress={() => {
                          const existing = selectedVal?.indexOf(value);
                          if (existing !== -1 && existing !== undefined) {
                            const sv = [...selectedVal];
                            sv.splice(existing, 1);
                            setSelectedVal(sv);

                            setSelected((val: any) => {
                              const temp = [...val];
                              temp.splice(existing, 1);
                              return temp;
                            });
                          } else {
                            setSelected((val: any) => {
                              return [...new Set([...val, key])];
                            });

                            setSelectedVal((val: any) => {
                              return [...new Set([...val, value])];
                            });
                          }
                        }}>
                        <View
                          style={[
                            {
                              width: 15,
                              height: 15,
                              borderWidth: 1,
                              marginRight: 10,
                              borderColor: 'gray',
                              borderRadius: 3,
                              justifyContent: 'center',
                              alignItems: 'center',
                            },
                          ]}>
                          {selectedVal?.includes(value) ? <CheckIcon width={8} height={8} /> : null}
                        </View>
                        <Text>{value}</Text>
                      </TouchableOpacity>
                    );
                  }
                })
              ) : (
                <TouchableOpacity
                  style={[styles.option]}
                  onPress={() => {
                    setSelected([]);
                    setSelectedVal([]);
                    slideUp();
                    setTimeout(() => setFilteredData(data), 800);
                  }}
                />
              )}
            </ScrollView>

            {selectedVal?.length > 0 ? (
              <Pressable>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingLeft: 20,
                  }}>
                  <Text style={{ marginRight: 20, fontWeight: '600' }}>Selected</Text>
                  <View style={{ height: 1, flex: 1, backgroundColor: 'gray' }} />
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    paddingHorizontal: 20,
                    marginBottom: 20,
                    flexWrap: 'wrap',
                  }}>
                  {selectedVal?.map((item: any, index: number) => {
                    return (
                      <View
                        key={index}
                        style={[
                          {
                            backgroundColor: 'gray',
                            paddingHorizontal: 20,
                            paddingVertical: 5,
                            borderRadius: 50,
                            marginRight: 10,
                            marginTop: 10,
                          },
                        ]}>
                        <Text style={[{ color: 'white', fontSize: 12 }]}>{item}</Text>
                      </View>
                    );
                  })}
                </View>
              </Pressable>
            ) : null}
          </View>
        </Animated.View>
      ) : null}
    </View>
  );
};

export default MultipleSelectList;

const styles = StyleSheet.create({
  wrapper: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'gray',
    paddingHorizontal: 20,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  dropdown: { borderWidth: 1, borderRadius: 10, borderColor: 'gray', overflow: 'hidden' },
  option: { paddingHorizontal: 20, paddingVertical: 8, flexDirection: 'row', alignItems: 'center' },
  disabledoption: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'whitesmoke',
  },
});
