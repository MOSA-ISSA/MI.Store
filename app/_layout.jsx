import "./_.css";
import React from 'react';
import { SafeAreaProvider, } from 'react-native-safe-area-context';
import { ThemeProviderWrapper } from '@/hooks/ThemeContext';
import StackRout from './_StackRout';
import TheProvider from '../hooks/TheProvider';
import Alert from '@/components/Alert';
import LoginModal from './../components/LoginModal';

export default function _layout() {
  return (
    <SafeAreaProvider>
      <ThemeProviderWrapper>
        <TheProvider >
          <StackRout />
          <Alert/>
          <LoginModal/>
        </TheProvider>
      </ThemeProviderWrapper>
    </SafeAreaProvider>
  );
}
