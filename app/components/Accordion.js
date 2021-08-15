import React, {useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {COLORS, FONTS} from '../constants';

const Accordion = ({title}) => {
  const [isSelected, setIsSelected] = useState(false);

  const handleButton = () => {
    setIsSelected(state => !state);
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={handleButton}
        activeOpacity={1}>
        <Text style={[FONTS.text12, {color: COLORS.black, marginRight: 8}]}>
          {title}
        </Text>
        <Icon
          name={isSelected ? 'up' : 'down'}
          size={14}
          color={COLORS.black}
          style={styles.icon}
        />
      </TouchableOpacity>
      {isSelected ? (
        <View style={styles.answerWrapper}>
          <Text
            style={[FONTS.textBold12, {color: COLORS.black, marginBottom: 16}]}>
            {title}
          </Text>
          <Text style={[FONTS.text12, {color: COLORS.black}]}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Purus
            mattis dictumst ac nisl, tincidunt consequat, est purus in. Facilisi
            ridiculus sed enim morbi pretium cum eget quisque. At at auctor
            nulla felis. Arcu in quis pulvinar dui. Diam neque lorem mattis et
            facilisis sed nisi, pellentesque eget. Senectus eleifend morbi ipsum
            eget consectetur viverra facilisi. Tristique id quis nulla in
            sapien, neque. Mauris erat non integer sit eu, dignissim orci diam
            commodo. Leo nunc, mi est ut felis, nibh integer tortor lorem.
            Mauris amet. Vitae vivamus nulla malesuada morbi est nulla pharetra
            lorem aenean. Euismod ligula euismod vehicula amet, sed id mauris
            aliquet purus. Amet, sed massa blandit sit tellus convallis semper
            at tortor. Blandit mauris fames fames ornare. Nulla massa praesent
            faucibus viverra aliquet scelerisque gravida blandit.
          </Text>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {marginTop: 12},
  button: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.darkWhite,
    padding: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  answerWrapper: {
    borderWidth: 1,
    borderRadius: 4,
    marginTop: 12,
    padding: 12,
    backgroundColor: COLORS.lightGray,
    borderColor: COLORS.border,
  },
  icon: {marginRight: 8},
});

export default Accordion;
