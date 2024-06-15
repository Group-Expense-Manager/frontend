import { Stack } from 'expo-router';

const TabLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="homef"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default TabLayout;
