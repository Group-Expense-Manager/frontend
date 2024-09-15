import * as ImagePicker from 'expo-image-picker';
import { router, useLocalSearchParams, useNavigation } from 'expo-router';
import React, {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { BackHandler, ScrollView, TouchableOpacity, View } from 'react-native';

import PictureUpdate from '@/components/modules/userdetails/PictureUpdate';
import Box from '@/components/ui/box/Box';
import CustomButton from '@/components/ui/button/CustomButton';
import Chip from '@/components/ui/chip/Chip';
import CustomHeader from '@/components/ui/header/CustomHeader';
import CustomImage from '@/components/ui/image/CustomImage';
import Loader from '@/components/ui/loader/Loader';
import MultiTextInput from '@/components/ui/text-input/MultiTextInput';
import MultiSelectInput from '@/components/ui/text-input/select/MultiSelectInput';
import SelectInput from '@/components/ui/text-input/select/SelectInput';
import { GlobalContext } from '@/context/GlobalContext';
import { GroupUpdateContext } from '@/context/group/GroupUpdateContext';
import { SelectInputData, SelectInputProvider } from '@/context/utils/SelectInputContext';
import useGroupPicture from '@/hooks/attachment/UseGroupPicture';
import useUpdateGroupPicture from '@/hooks/attachment/UseUpdateGroupPicture';
import useAvailableCurrencies from '@/hooks/currency/UseAvailableCurrencies';
import useGroup from '@/hooks/group/UseGroup';
import useUpdateGroup from '@/hooks/group/UseUpdateGroup';
import { handleImageChoice } from '@/util/HandleImageChoice';

export default function Index() {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { authState } = useContext(GlobalContext);

  const params = useLocalSearchParams<{ groupId: string }>();
  const { data: groupDetails, isFetching: isFetchingGroupDetails } = useGroup(params.groupId);
  const { data: groupPicture, isFetching: isFetchGroupPicture } = useGroupPicture(
    params.groupId,
    groupDetails?.attachmentId,
  );
  const isOwner = authState.userId === groupDetails?.ownerId;

  const dataPresentAndNoFetching =
    groupDetails && groupPicture && !isFetchGroupPicture && !isFetchingGroupDetails;

  const { groupUpdate, setGroupUpdate } = useContext(GroupUpdateContext);

  // TODO remove that and add that to above group update
  const [selectedCurrencies, setSelectedCurrencies] = useState<SelectInputData<string>[]>(
    groupDetails?.groupCurrencies.map((currency) => ({
      name: t(currency.code),
      value: currency.code,
    })) || [],
  );
  const { data: availableCurrencies } = useAvailableCurrencies();

  const [bothRunning, setBothRunning] = useState(false);
  const {
    mutate: updateGroupPicture,
    isPending: isUpdatedGroupPicturePending,
    isSuccess: isUpdatedGroupPictureSuccess,
    isError: isUpdatedGroupPictureError,
  } = useUpdateGroupPicture(bothRunning, params.groupId, groupDetails?.attachmentId);

  const {
    mutate: updateGroupDetails,
    isPending: isUpdatedGroupDetailsPending,
    isSuccess: isUpdatedGroupDetailsSuccess,
    isError: isUpdatedGroupDetailsError,
  } = useUpdateGroup(bothRunning, params.groupId);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      handleImageChoice(
        result.assets[0],
        () =>
          router.push(`/groups/${params.groupId}/details/(modal)/unsupported-file-format-modal`),
        () => router.push(`/groups/${params.groupId}/details/(modal)/image-too-large-modal`),
        () =>
          setGroupUpdate({
            ...groupUpdate,
            groupPicture: {
              uri: `data:${result.assets[0].mimeType};base64,${result.assets[0].base64}`,
            },
          }),
      );
    }
  };

  useLayoutEffect(() => {
    if (isOwner && dataPresentAndNoFetching) {
      setGroupUpdate({ groupName: groupDetails.name, groupPicture, isValidGroupName: true });
    }
  }, [dataPresentAndNoFetching, isOwner]);

  useEffect(() => {
    if (isUpdatedGroupDetailsSuccess && isUpdatedGroupPictureSuccess) {
      router.back();
    }
  }, [isUpdatedGroupDetailsSuccess, isUpdatedGroupPictureSuccess]);

  useEffect(() => {
    if (isUpdatedGroupDetailsError || isUpdatedGroupPictureError) {
      router.push(`/groups/${params.groupId}/details/(modal)/error-modal`);
    }
  }, [isUpdatedGroupDetailsError, isUpdatedGroupPictureError]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,

      header: () => (
        <CustomHeader
          title={t('Group data')}
          onLeftIconPress={() => {
            if (isOwner && hasGroupDataChanged()) {
              router.push(`/groups/${params.groupId}/details/(modal)/exit-without-saving-modal`);
            } else {
              router.back();
            }
          }}
          isLoading={isUpdatedGroupDetailsPending || isUpdatedGroupPicturePending}
        />
      ),
    });
  }, [navigation, groupUpdate, isUpdatedGroupDetailsPending, isUpdatedGroupPicturePending]);

  function shouldBlockHardWareBackPress(): boolean {
    if (isUpdatedGroupDetailsPending || isUpdatedGroupPicturePending) {
      return true;
    }
    if (isOwner && hasGroupDataChanged()) {
      router.push(`/groups/${params.groupId}/details/(modal)/exit-without-saving-modal`);
      return true;
    }
    return false;
  }

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      shouldBlockHardWareBackPress,
    );
    return () => backHandler.remove();
  }, [groupUpdate, isUpdatedGroupDetailsPending, isUpdatedGroupPicturePending]);

  function hasGroupDataChanged(): boolean {
    return hasGroupNameChanged() || hasGroupPictureChanged();
  }

  function hasGroupNameChanged(): boolean {
    return groupUpdate.groupName !== groupDetails?.name;
  }

  function hasGroupPictureChanged(): boolean {
    return groupUpdate.groupPicture !== groupPicture;
  }

  function handleSave(): void {
    if (hasGroupNameChanged() && hasGroupPictureChanged()) {
      setBothRunning(true);
      updateGroupDetails();
      updateGroupPicture();
    } else if (hasGroupNameChanged()) {
      setBothRunning(false);
      updateGroupDetails();
    } else if (hasGroupPictureChanged()) {
      setBothRunning(false);
      updateGroupPicture();
    }
  }

  return (
    <Box>
      {!dataPresentAndNoFetching ? (
        <Loader />
      ) : (
        <View className="w-full h-full flex-col justify-between">
          <View className="w-full flex-col space-y-[28px] items-center">
            {isOwner ? (
              <PictureUpdate image={groupUpdate.groupPicture} onPress={pickImage} />
            ) : (
              <CustomImage image={groupPicture} size="colossal" />
            )}

            <View className="w-full space-y-3">
              {isOwner ? (
                <TouchableOpacity
                  onPress={() => router.push(`/groups/${params.groupId}/details/group-name`)}>
                  <View pointerEvents="none">
                    <MultiTextInput
                      label={t('Group name')}
                      value={groupUpdate.groupName}
                      showErrors={!groupUpdate.isValidGroupName}
                    />
                  </View>
                </TouchableOpacity>
              ) : (
                <MultiTextInput label={t('Group name')} value={groupDetails.name} disabled />
              )}

              <View className="w-full">
                <MultiSelectInput
                  label={t('Group currencies')}
                  type="normal"
                  onPress={() =>
                    router.navigate(`/groups/${params.groupId}/details/group-currencies`)
                  }
                  values={selectedCurrencies}
                  setValues={setSelectedCurrencies}
                  data={availableCurrencies?.currencies.map(
                    (currency): SelectInputData<string> => ({
                      name: t(currency.code),
                      value: currency.code,
                      isDisabled: groupDetails?.groupCurrencies?.some(
                        (groupCurrency) => groupCurrency.code === currency.code,
                      ),
                    }),
                  )}
                />
              </View>

              <ScrollView horizontal className="flex-row space-x-2 w-full">
                {groupDetails.groupCurrencies.map((currency) => (
                  <View key={currency.code}>
                    <Chip text={currency.code} type="normal" />
                  </View>
                ))}
              </ScrollView>

              <View />
            </View>
          </View>
          {isOwner && hasGroupDataChanged() && (
            <View className="w-full py-8">
              <CustomButton
                title={t('Save changes')}
                onPress={() => handleSave}
                disabled={!groupUpdate.isValidGroupName}
              />
            </View>
          )}
        </View>
      )}
    </Box>
  );
}
