import "react-native-gesture-handler";
import { StyleSheet, Text, View } from "react-native";
import RootNavigation from "./src/navigation/RootNavigation";
import { AuthProvider } from "./src/context/AuthContex";
import { StepProvider } from "./src/context/StepContext";
import { UserProvider } from "./src/context/UserContext";
import Loading from "./src/components/LoadingUI/Loading";

export default function App() {
  return (
    <AuthProvider>
      <UserProvider>
        <StepProvider>
          <RootNavigation/>
        </StepProvider>
      </UserProvider>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({});
