import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {View} from 'react-native';
import DropdownAlert from 'react-native-dropdownalert';
import {COLORS} from '../constants';
export let dropdownalert;

class AlertProvider extends Component {
  static get childContextTypes() {
    return {
      alertWithType: PropTypes.func,
      alert: PropTypes.func,
    };
  }
  componentDidMount() {
    dropdownalert = this.dropdown;
  }
  static get propTypes() {
    return {
      children: PropTypes.any,
    };
  }
  getChildContext() {
    return {
      alert: (...args) => this.dropdown.alert(...args),
      alertWithType: (...args) => this.dropdown.alertWithType(...args),
    };
  }
  render() {
    const {children} = this.props;
    return (
      <View style={{flex: 1}}>
        {React.Children.only(children)}
        <DropdownAlert
          inactiveStatusBarStyle="light-content"
          inactiveStatusBarBackgroundColor={COLORS.primary}
          ref={ref => {
            this.dropdown = ref;
          }}
          updateStatusBar={false}
        />
      </View>
    );
  }
}

export default AlertProvider;
