import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { connect } from "react-redux";
import MetricCard from "./MetricCard";
import { white } from "../utils/colors";
import TextButton from "./TextButton";
import { addEntry } from "../actions";
import { removeEntry } from "../utils/api";
import { timeToString, getDailyReminderValue } from "../utils/helpers";

class EntryDetail extends Component {
  // ... const { navigation } = props ... without .this ...
  static navigationOptions = ({ navigation }) => {
    const entryId = navigation.getParam("entryId");

    const year = entryId.slice(0, 4);
    const month = entryId.slice(5, 7);
    const day = entryId.slice(8);

    return {
      title: `${month}/${day}/${year}`
    };
  };

  shouldComponentUpdate (nextProps) {
    return nextProps.metrics !== null && !nextProps.metrics.today
  }

  remove = () => {
	const { entryId, remove, goBack, propsTest } = this.props;
	remove()
    goBack()
    removeEntry(entryId)	
  };

  render() {
    const { metrics, entryId } = this.props;
    return (
      <View style={styles.container}>
        <MetricCard metrics={metrics} />
        <Text>
          Entry Detail -{" "}
          {JSON.stringify(this.props.navigation.state.params.entryId)}
        </Text>
        {
          // or like this
        }
        <Text>
          Entry Detail -{" "}
          {JSON.stringify(this.props.navigation.getParam("entryId"))}
        </Text>
        <TextButton onPress={this.remove}>REMOVE</TextButton>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    padding: 15
  }
});

function mapStateToProps(state, { navigation }) {
  const entryId = navigation.getParam("entryId");
  return {
    entryId,
    metrics: state[entryId]
  };
}

function mapDispatchToProps(dispatch, { navigation }) {
  const entryId = navigation.getParam("entryId");
  return {
    remove: () =>
      dispatch(
        addEntry({
		  [entryId]: timeToString() === entryId 
		  ? getDailyReminderValue() 
		  : null
        })
      ),
    goBack: () => navigation.goBack(),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EntryDetail);
