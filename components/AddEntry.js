import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { getMetricMetaInfo, timeToString } from "../utils/helpers";
import UdaciSlider from "./UdaciSlider";
import UdaciSteppers from "./UdaciSteppers";
import DateHeader from "./DateHeader";
import { Ionicons } from "@expo/vector-icons";
import TextButton from "./TextButton";

function SubmitBtn({onPress}){
	return(
		<TouchableOpacity onPress={onPress}>
			<Text>Submit</Text>
		</TouchableOpacity>
	)
}

export default class AddEntry extends Component {
  state = {
    run: 0,
    bike: 0,
    swim: 0,
    sleep: 0,
    eat: 0
  };

  increment = metric => {
    const { step, max } = getMetricMetaInfo(metric);
    const count = this.state[metric] + step;
    this.setState(state => {
      return {
        ...state,
        [metric]: count > max ? max : count
      };
    });
  };

  decrement = metric => {
    const { step } = getMetricMetaInfo(metric);
    this.setState(state => {
      return {
        ...state,
        [metric]: state[metric] - step < 0 ? 0 : state[metric] - step
      };
    });
  };

  slide = (metric, value) => {
    this.setState(() => ({
      [metric]: value
    }));
  };

  submit = () => {
    const key = timeToString()
    const entry = this.state

    // Update Redux

    this.setState(() => ({ run: 0, bike: 0, swim: 0, sleep: 0, eat: 0 }))

    // Navigate to home

    // Save to "DB"

    // Clear local notification
  }

  reset = () => {
    const key = timeToString();

    // Update Redux

    // Route to Home

    // Update "DB"
  };
  render() {
	const metaInfo = getMetricMetaInfo();	
	if (this.props.alreadyLogged) {
		return (
		  <View>
			<Ionicons name={"ios-happy"} size={100} />
			<Text>You already logged your information for today.</Text>
			<TextButton onPress={this.reset}>Reset</TextButton>
		  </View>
		);
	  }
    return (
      <View>
        <DateHeader date={new Date().toLocaleDateString()} />
		<DateHeader date={new Date().toLocaleDateString()} />
		<DateHeader date={new Date().toLocaleDateString()} />
        {Object.keys(metaInfo).map(key => {
          const { type, getIcon, ...rest } = metaInfo[key];
          const value = this.state[key];
          return (
            <View key={key}>
              {getIcon()}
              {type === "steppers" ? (
                <UdaciSteppers
                  value={value}
                  onIncrement={() => this.increment(key)}
                  onDecrement={() => this.decrement(key)}
                  {...rest}
                />
              ) : (
                <UdaciSlider
                  value={value}
                  onChange={value => this.slide(key, value)}
                  {...rest}
                />
              )}
            </View>
          );
        })}
		<SubmitBtn onPress={this.submit}/>
      </View>
    );
  }
}
