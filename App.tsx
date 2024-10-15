import React from 'react';
import StackNavigation from './src/navigator/StackNavigation';
import AuthContextProvider from './src/security/AuthContext';

export default function App() {
  return (
    <AuthContextProvider>
    <StackNavigation />
    </AuthContextProvider>
  );
}
