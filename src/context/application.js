import React from "react";

const ApplicationContext = React.createContext({});

export const ApplicationProvider = ApplicationContext.Provider;
export const ApplicationConsumer = ApplicationContext.Consumer;