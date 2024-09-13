import * as ImagePicker from 'expo-image-picker';
import { router, useNavigation } from 'expo-router';
import React, { useContext, useEffect, useLayoutEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BackHandler, ScrollView, TouchableOpacity, View } from 'react-native';

import PictureUpdate from '@/components/modules/userdetails/PictureUpdate';
import Box from '@/components/ui/box/Box';
import CustomButton from '@/components/ui/button/CustomButton';
import Chip from '@/components/ui/chip/Chip';
import CustomHeader from '@/components/ui/header/CustomHeader';
import CustomImage, { ImageBase64 } from '@/components/ui/image/CustomImage';
import Loader from '@/components/ui/loader/Loader';
import MultiTextInput from '@/components/ui/text-input/MultiTextInput';
import SelectInput from '@/components/ui/text-input/select/SelectInput';
import { GlobalContext } from '@/context/GlobalContext';
import { GroupContext } from '@/context/group/GroupContext';
import { GroupUpdateContext } from '@/context/group/GroupUpdateContext';
import useGroupPicture from '@/hooks/attachment/UseGroupPicture';
import useUpdateGroupPicture from '@/hooks/attachment/UseUpdateGroupPicture';
import useGroup from '@/hooks/group/UseGroup';
import useUpdateGroup from '@/hooks/group/UseUpdateGroup';
import { handleImageChoice } from '@/util/HandleImageChoice';

export default function GroupData() {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { authState } = useContext(GlobalContext);

  const { group } = useContext(GroupContext);
  const { data: groupDetails, isFetching: isFetchingGroupDetails } = useGroup(group.groupId);
  const { data: groupPicture, isFetching: isFetchGroupPicture } = useGroupPicture(
    group.groupId,
    group.attachmentId,
  );

  const isOwner = authState.userId === groupDetails?.ownerId;
  const dataPresentAndNoFetching =
    groupDetails && groupPicture && !isFetchGroupPicture && !isFetchingGroupDetails;

  const { groupUpdate, setGroupUpdate } = useContext(GroupUpdateContext);

  useLayoutEffect(() => {
    if (isOwner && dataPresentAndNoFetching) {
      setGroupUpdate({ groupName: groupDetails.name, groupPicture, isValidGroupName: true });
    }
  }, [dataPresentAndNoFetching, isOwner]);

  const [bothRunning, setBothRunning] = useState(false);
  const {
    mutate: updateGroupPicture,
    isPending: isUpdatedGroupPicturePending,
    isSuccess: isUpdatedGroupPictureSuccess,
    isError: isUpdatedGroupPictureError,
  } = useUpdateGroupPicture(bothRunning, group.groupId, group.attachmentId);

  const {
    mutate: updateGroupDetails,
    isPending: isUpdatedGroupDetailsPending,
    isSuccess: isUpdatedGroupDetailsSuccess,
    isError: isUpdatedGroupDetailsError,
  } = useUpdateGroup(bothRunning, group.groupId);

  useEffect(() => {
    if (isUpdatedGroupDetailsSuccess && isUpdatedGroupPictureSuccess) {
      router.back();
    }
  }, [isUpdatedGroupDetailsSuccess, isUpdatedGroupPictureSuccess]);

  useEffect(() => {
    if (isUpdatedGroupDetailsError || isUpdatedGroupPictureError) {
      router.push('/(groups)/(group-data)/(modal)/error-modal');
    }
  }, [isUpdatedGroupDetailsError, isUpdatedGroupPictureError]);

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
        () => router.push('/(groups)/(group-data)/(modal)/unsupported-file-format-modal'),
        () => router.push('/(groups)/(group-data)/(modal)/image-too-large-modal'),
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
    navigation.setOptions({
      headerShown: true,

      header: () => (
        <CustomHeader
          title={t('Group data')}
          onLeftIconPress={() => {
            if (dataChanged()) {
              router.push('/(groups)/(group-data)/(modal)/exit-without-saving-modal');
            } else {
              router.back();
            }
          }}
          isLoading={isUpdatedGroupDetailsPending || isUpdatedGroupPicturePending}
        />
      ),
    });
  }, [
    navigation,
    groupUpdate,
    // userData,
    isUpdatedGroupDetailsPending,
    isUpdatedGroupPicturePending,
  ]);

  function handleBackClick() {
    if (isUpdatedGroupDetailsPending || isUpdatedGroupPicturePending) {
      return true;
    }
    if (dataChanged()) {
      router.push('/(groups)/(group-data)/(modal)/exit-without-saving-modal');
      return true;
    }
    return false;
  }
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackClick);
    return () => backHandler.remove();
  }, [
    groupUpdate,
    // userData,
    isUpdatedGroupDetailsPending,
    isUpdatedGroupPicturePending,
  ]);

  function dataChanged(): boolean {
    return groupNameChanged() || groupPictureChanged();
  }

  function groupNameChanged(): boolean {
    return groupUpdate.groupName !== groupDetails?.name;
  }

  function groupPictureChanged(): boolean {
    return groupUpdate.groupPicture !== groupPicture;
  }

  function handleSave() {
    if (groupNameChanged() && groupPictureChanged()) {
      setBothRunning(true);
      updateGroupDetails();
      updateGroupPicture();
    } else if (groupNameChanged()) {
      setBothRunning(false);
      updateGroupDetails();
    } else if (groupPictureChanged()) {
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
                <TouchableOpacity onPress={() => router.push('/group-data-group-name')}>
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
                <SelectInput
                  label={t('Group currencies')}
                  onPress={() => {}}
                  onSelect={() => {}}
                  disabled
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
          {isOwner && dataChanged() && (
            <View className="w-full py-8">
              <CustomButton
                title={t('Save changes')}
                onPress={() => {
                  handleSave();
                }}
                disabled={!groupUpdate.isValidGroupName}
              />
            </View>
          )}
        </View>
      )}
    </Box>
  );
}
