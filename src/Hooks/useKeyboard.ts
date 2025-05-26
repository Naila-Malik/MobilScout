import React, { useEffect, useState } from 'react'
import { Keyboard, LayoutAnimation } from 'react-native';

const useKeyboardListener = () => {
  const [keyboardObj, setKeyboardObj] = useState({
    visible: false,
    keyboardHeight: 0
  });

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      (e) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
        setKeyboardObj({
          visible: true,
          keyboardHeight: e.endCoordinates.height
        })
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setKeyboardObj({
          visible: false,
          keyboardHeight: 0
        })
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);
  return keyboardObj
}
export default useKeyboardListener