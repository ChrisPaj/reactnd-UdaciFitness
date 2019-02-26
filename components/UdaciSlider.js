import React from 'react'
import { View, Text, Slider } from 'react-native'

export default function UdaciSlider ({ max, step, onChange, value, unit }) {
  return (
    <View>
      <Slider
	  maximumValue={max}
	  minimumValue={0}
	  step={step}
	  onValueChange={onChange}/>
	  <View>
        <Text>{value}</Text>
        <Text>{unit}</Text>
      </View>
    </View>
  )
}