import { SafeAreaView } from "react-native-safe-area-context";
import { Button, Text } from "react-native";
import { useAuth } from "@/hooks/AuthContext";

export default function Homef() {
  const {onLogout} = useAuth()
  return(
    <SafeAreaView className="flex-1 justify-center">
      <Text className="text-center">Home</Text>
      <Button title="Logout" onPress={onLogout}/>
    </SafeAreaView>
  )
}