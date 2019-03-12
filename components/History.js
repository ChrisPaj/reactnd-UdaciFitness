import React, { Component } from "react";
import { View, Text, TouchableOpacity, AsyncStorage } from "react-native";
import { connect } from "react-redux";
import { receiveEntries, addEntry } from "../actions";
import { timeToString, getDailyReminderValue } from "../utils/helpers";
import { fetchCalendarResults } from "../utils/api";

class History extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    fetchCalendarResults()
      .then(entries => dispatch(receiveEntries(entries)))
      .then(({ entries }) => {
        if (!entries[timeToString()]) {
          dispatch(addEntry({ [timeToString()]: getDailyReminderValue() }));
        }
      });
  }

  clearAsyncStorage() {
    AsyncStorage.clear();
  }

  render() {
    return (
      <View>
        <TouchableOpacity onPress={this.clearAsyncStorage}>
          <Text>Reset AsyncStorage</Text>
        </TouchableOpacity>
        <Text>{JSON.stringify(this.props)}</Text>
      </View>
    );
  }
}

function mapStateToProps(entries) {
  return {
    entries
  };
}

export default connect(mapStateToProps)(History);
