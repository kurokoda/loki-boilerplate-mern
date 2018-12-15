import React from 'react';

export const ApplicationContext = React.createContext({ foo: 'bar' });

export const ApplicationProvider = ApplicationContext.Provider;
