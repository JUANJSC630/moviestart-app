import React from 'react';
import { View, Text, ViewStyle, TextStyle } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { useTheme } from 'tamagui';

type PercentageCircleProps = {
  percentage: number;
  containerStyle?: ViewStyle;
  textStyle?: TextStyle;
  radius?: number;
  strokeWidth?: number;
};

const PercentageCircle: React.FC<PercentageCircleProps> = ({ percentage, containerStyle, textStyle, radius, strokeWidth }) => {
  const theme = useTheme();

  radius = radius || 22;
  strokeWidth = strokeWidth || 3;
  const normalizedRadius = radius - strokeWidth / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const getColor = (percentage: number) => {
    if (percentage > 90) return 'green';
    if (percentage > 75) return 'yellowgreen';
    if (percentage > 50) return 'yellow';
    if (percentage > 25) return 'orange';
    if (percentage > 0) return 'red';
    return 'red';
  };

  return (
    <View
      style={[
        {
          position: 'relative',
          width: radius * 2,
          height: radius * 2,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: theme.blue4.get(),
          borderRadius: radius,
        },
        containerStyle,
      ]}>
      <Svg height={radius * 2} width={radius * 2}>
        <Circle
          stroke={getColor(percentage)}
          fill="none"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          cx={radius}
          cy={radius}
          r={normalizedRadius}
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={strokeDashoffset}
          transform={`rotate(-90 ${radius} ${radius})`}
        />
      </Svg>

      <Text
        style={[
          {
            color: '#fff',
            position: 'absolute',
            fontSize: 12,
            fontWeight: 'bold',
          },
          textStyle,
        ]}>
        {`${Math.round(percentage)}`}
        <Text
          style={{
            fontSize: 8,
          }}>
          %
        </Text>
      </Text>
    </View>
  );
};

export default PercentageCircle;
