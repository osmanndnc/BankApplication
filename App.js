import 'react-native-gesture-handler';
import { StyleSheet, Text, View } from 'react-native';
import RootNavigation from './src/navigation/RootNavigation';
import { AuthProvider } from './src/context/AuthContex';

export default function App() {
  return (
<AuthProvider>   
    <RootNavigation />
    </AuthProvider>
  );
}

const styles = StyleSheet.create({});
