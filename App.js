import 'react-native-gesture-handler';
import { StyleSheet, Text, View } from 'react-native';
import RootNavigation from './src/navigation/RootNavigation';
import { AuthProvider } from './src/context/AuthContex';
import { StepProvider } from './src/context/StepContext';

export default function App() {
  return (
    <AuthProvider>   
      <StepProvider>
        <RootNavigation />
      </StepProvider>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({});
