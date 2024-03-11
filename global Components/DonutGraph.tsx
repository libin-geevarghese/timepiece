import React from 'react';
import {View, StyleSheet} from 'react-native';
import Svg, {G, Circle, Text} from 'react-native-svg';

const DonutGraph = ({totalCount, completed}) => {
  const radius = 120;
  const strokeWidth = 70;

  const completionPercentage = (completed / totalCount) * 100;
  const circleCircumference = 2 * Math.PI * radius;
  const halfCircle = radius + strokeWidth;
  return (
    <View style={styles.container}>
      <Svg
        height={radius * 2}
        width={radius * 2}
        viewBox={`0 0 ${halfCircle * 2} ${halfCircle * 2}`}>
        <G>
          {/* outer Circle */}
          <Circle
            cx={'50%'}
            cy={'50%'}
            r={radius}
            fill="transparent"
            stroke="#aea9c5"
            strokeWidth={strokeWidth}
            strokeOpacity={0.6}
          />

          {/* outer circle */}
          <Circle
            cx={'50%'}
            cy={'50%'}
            r={radius}
            fill="transparent"
            stroke="#04b3a7" //color of fill in outer circle
            strokeWidth={strokeWidth} // thickness
            strokeDasharray={circleCircumference}
            strokeDashoffset={
              circleCircumference -
              (completionPercentage / 100) * circleCircumference
            }
            strokeLinecap="round"
          />

          {/* center texts */}
          <Text
            allowFontScaling={false}
            x={'50%'}
            y={'50%'}
            fontSize={radius / 3}
            fontWeight={'bolder'}
            textAnchor="middle"
            fill="#333333">
            {(completed / totalCount) * 100 + '%'}
          </Text>
          <Text
            allowFontScaling={false}
            x={'50%'}
            y={'60%'}
            fontSize={20}
            fontWeight={'bolder'}
            textAnchor="middle"
            fill="#333333">
            {'completed'}
          </Text>
        </G>
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default DonutGraph;
