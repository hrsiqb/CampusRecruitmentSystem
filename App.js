import React, { useState } from 'react';
import {
  StatusBar,
} from 'react-native';
import Navigation from './Config/Navigation'

const App = () => {
  return (
    <>
      <StatusBar backgroundColor='white' barStyle="dark-content" />
      <Navigation />
    </>
  );
};

export default App;
