import React from 'react';
import { View, Text } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { Stack, useTheme } from 'tamagui';

type PercentageCircleProps = {
  percentage: number;
};

const PercentageCircle: React.FC<PercentageCircleProps> = ({ percentage }) => {
  const theme = useTheme();

  const radius = 22;
  const strokeWidth = 3;
  const normalizedRadius = radius - strokeWidth / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const angle = (percentage / 100) * 0;

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
      style={{
        position: 'relative',
        width: radius * 2,
        height: radius * 2,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.blue4.get(),
        borderRadius: radius,
        top: -20,
        left: 10,
      }}>
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
          transform={`rotate(-90 ${radius} ${radius}) rotate(${angle} ${radius} ${radius})`}
        />
      </Svg>

      <Text
        style={{
          color: '#fff',
          position: 'absolute',
          fontSize: 12,
          fontWeight: 'bold',
        }}>
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
