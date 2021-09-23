import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {COLORS, FONTS, SIZES} from '../../constants';

const SearchHeader = ({
  onChange,
  value,
  data,
  selected,
  onCategory,
  loading,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.justify}>
        <Text style={FONTS.textBold20}>Telusuri</Text>
        <Icon name="bookmark-outline" size={20} />
      </View>
      {!loading ? (
        <>
          <View style={styles.search}>
            <TextInput
              onChange={onChange}
              value={value}
              style={styles.input}
              placeholder="Cari judul artikel, video atau buku"
            />
            <Icon name="search" size={18} color={COLORS.gray} />
          </View>
          <ScrollView
            horizontal
            contentContainerStyle={styles.categoryWrapper}
            showsHorizontalScrollIndicator={false}>
            {data.map(item => (
              <TouchableOpacity
                activeOpacity={SIZES.opacity}
                onPress={() => onCategory(item)}
                key={item.id}
                style={[
                  styles.category,
                  item.id === selected?.id ? styles.active : styles.inActive,
                ]}>
                <Text
                  style={[
                    FONTS.text10,
                    {
                      color:
                        item.id === selected?.id ? COLORS.white : COLORS.black,
                    },
                  ]}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </>
      ) : null}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {padding: 16},
  justify: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  search: {
    borderWidth: 1,
    marginTop: 16,
    paddingHorizontal: 16,
    borderRadius: 6,
    borderColor: COLORS.border,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {height: 44, flex: 1},
  categoryWrapper: {marginTop: 16},
  category: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderRadius: 30,
    marginRight: 8,
  },
  active: {backgroundColor: COLORS.primary, borderColor: COLORS.primary},
  inActive: {borderColor: COLORS.border},
});

export default SearchHeader;
