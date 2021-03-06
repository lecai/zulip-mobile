/* @flow */
import React, { PureComponent } from 'react';
import { StyleSheet, ScrollView, TextInput } from 'react-native';

import type { LocalizableText, StyleObj } from '../types';
import { Input } from '../common';

const MIN_HEIGHT = 34;
const MAX_HEIGHT = 200;

const componentStyles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: 'column',
  },
});

export default class MultilineInput extends PureComponent {
  props: {
    style?: StyleObj,
    placeholder: LocalizableText,
    onChange?: (text: string) => void,
  };

  static defaultProps = {
    placeholder: {},
  };

  textInput: TextInput;

  state: {
    contentHeight: number,
  };

  state = {
    contentHeight: MIN_HEIGHT,
  };

  handleOnContentSizeChange = (event: Object) => {
    this.setState({ contentHeight: event.nativeEvent.contentSize.height });
  };

  render() {
    const { placeholder, style, onChange } = this.props;
    const { contentHeight } = this.state;
    const height = Math.min(Math.max(MIN_HEIGHT, contentHeight), MAX_HEIGHT);

    return (
      <ScrollView style={{ height }} contentContainerStyle={componentStyles.wrapper}>
        <Input
          style={style}
          textInputRef={component => {
            this.textInput = component;
          }}
          multiline
          underlineColorAndroid="transparent"
          height={height}
          onContentSizeChange={this.handleOnContentSizeChange}
          onTextChange={onChange}
          placeholder={placeholder}
        />
      </ScrollView>
    );
  }
}
