import React from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, View } from 'react-native';

import Chip from '@/components/ui/chip/Chip';
import { ActivityFilters } from '@/hooks/finance/UseActivities';

interface FilterProps {
  activityFilters: ActivityFilters;
  setActivityFilters: (activityFilters: ActivityFilters) => void;
  onPress?: () => void;
}

const FilterChips: React.FC<FilterProps> = ({
  activityFilters,
  setActivityFilters,
  onPress = () => {},
}) => {
  const { t } = useTranslation();

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} className="w-full space-x-2">
      <View>
        <Chip text={t('Filters')} type="filter" onPress={onPress} />
      </View>

      {activityFilters.status && (
        <View>
          <Chip
            text={t(`${activityFilters.status}_FILTER`)}
            type="remove"
            onPress={() => setActivityFilters({ ...activityFilters, status: undefined })}
          />
        </View>
      )}

      {activityFilters.sorted && (
        <View>
          <Chip
            text={t(activityFilters.sorted)}
            type="remove"
            onPress={() => setActivityFilters({ ...activityFilters, sorted: undefined })}
          />
        </View>
      )}

      {activityFilters.isCreator === 'true' && (
        <View>
          <Chip
            text={t('created by me')}
            type="remove"
            onPress={() => setActivityFilters({ ...activityFilters, isCreator: undefined })}
          />
        </View>
      )}

      {activityFilters.type && (
        <View>
          <Chip
            text={t(`${activityFilters.type}_FILTER`)}
            type="remove"
            onPress={() => setActivityFilters({ ...activityFilters, type: undefined })}
          />
        </View>
      )}

      {activityFilters.currency && (
        <View>
          <Chip
            text={activityFilters.currency}
            type="remove"
            onPress={() => setActivityFilters({ ...activityFilters, currency: undefined })}
          />
        </View>
      )}
    </ScrollView>
  );
};

export default FilterChips;
