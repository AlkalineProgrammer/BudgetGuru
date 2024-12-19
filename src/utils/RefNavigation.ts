import { NavigationContainerRef, ParamListBase } from '@react-navigation/native';
import * as React from 'react';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends ParamListBase { }
  }
}
export const navigationRef = React.createRef<NavigationContainerRef<RootParamList>>();
type Navigation = {
  name: string,
  params?: any
}
export function navigate({ name, params }: Navigation) {
  navigationRef.current?.navigate(name, params);
}
