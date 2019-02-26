import React from 'react'
import { View, TouchableOpacity, Text } from 'react-native'
import { FontAwesome, Entypo } from '@expo/vector-icons'

export default function UdaciSteppers ({ max, unit, step, value, onIncrement, onDecrement }) {
  return (
    <View>
      <View>
		  <TouchableOpacity onPress={onIncrement}>
			<FontAwesome name="plus" color="black" size={30}/>
		  </TouchableOpacity>
		  <TouchableOpacity onPress={onDecrement}>
			<FontAwesome name="minus" color="black" size={30}/>
		  </TouchableOpacity>
	  </View>
	  <View>
        <Text>{value}</Text>
        <Text>{unit}</Text>
      </View>
    </View>
  )
}