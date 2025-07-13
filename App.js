import { StyleSheet, Text, View } from 'react-native';
import Login from './src/screens/Login/Login';
import SignUp from './src/screens/Login/SignUp/SignUp';
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
