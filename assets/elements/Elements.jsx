import { Entypo, Feather } from "@expo/vector-icons";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from 'styled-components/native';

export const Screen = styled(SafeAreaView)`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
`;

export const Cover = styled(View)`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
  padding-horizontal: 10px;
`;

export const Container = styled(SafeAreaView)`
  background-color: ${({ theme }) => theme.card};
  padding: 15px;
  border-radius: 10px;
`;

export const Txt = styled(Text)`
  color: ${({ theme }) => theme.text};
`;

export const Test = styled(View)`
  height: 50;
  width: 50;
  background-color: ${({ theme }) => theme.background};
`;

export const Icon = styled(Entypo)`
  color: ${({ theme }) => theme.text};
  `;

export const IconFeather = styled(Feather)`
  color: ${({ theme }) => theme.text};
`;

export const IconFeatherButton = styled(Feather)`
  color: ${({ theme }) => theme.text};
  `;