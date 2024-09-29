import React, { useState } from 'react';
import { GestureResponderEvent, TouchableOpacity } from 'react-native';
import { TouchableOpacityProps } from 'react-native/Libraries/Components/Touchable/TouchableOpacity';

interface SingleClickTouchableOpacityProps extends TouchableOpacityProps {
  delay?: number;
}

export const SingleClickTouchableOpacity: React.FC<SingleClickTouchableOpacityProps> = ({
  delay = 1000,
  onPress,
  children,
  ...props
}) => {
  const [processing, setProcessing] = useState(false);

  const handlePress = (event: GestureResponderEvent) => {
    if (onPress && !processing) {
      setProcessing(true);
      onPress(event);
      setTimeout(() => setProcessing(false), delay);
    }
  };

  return (
    <TouchableOpacity onPress={handlePress} {...props}>
      {children}
    </TouchableOpacity>
  );
};

export default SingleClickTouchableOpacity;
