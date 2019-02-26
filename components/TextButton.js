import React, { Component } from "react";
import { Text, TouchableOpacity } from "react-native";

export default function TextButton( { children, onPress}){
	return(
		<TouchableOpacity onLongPress={onPress}>
			<Text>{children}</Text>
		</TouchableOpacity>
	)
}