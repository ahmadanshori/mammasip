import React from 'react';
import {
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {AnswerComponent} from '.';
import {COLORS, FONTS, SIZES} from '../../constants';
import Divider from '../Divider';

const Answer = ({data, imt, activity, onRefresh}) => {
  return (
    <ScrollView>
      <AnswerComponent
        number="1"
        title="Apakah Anda merokok?"
        source={require('../../assets/images/roko.png')}
        isTrue={data.page1}
        answer={data.page1 ? 'Iya' : 'Tidak'}
        condition={
          <Text style={styles.text}>
            Sebaiknya Sahabat MammaSIP {'\n'}- Jangan merokok. {'\n'}- Hindari
            paparan terhadap asap dan residu rokok untuk menurunkan risiko
            kanker.
          </Text>
        }
      />
      <Divider />
      <AnswerComponent
        number="2"
        title="Apakah Anda mengkonsumsi minuman beralkohol?"
        source={require('../../assets/images/DrinkAnswer.png')}
        isTrue={data.page2}
        answer={
          data.page2
            ? 'Tidak Sama Sekali atau Tidak Melebihi Standard'
            : 'Ya, Melebihi Standard'
        }
        condition={
          <Text style={styles.text}>
            Jika mengonsumsi alkohol :{'\n'}- Laki-laki : tidak melebihi 2
            ukuran standar/hari.{'\n'}- Wanita : tidak melebihi 1 ukuran
            standar/hari.{'\n'}
            {'\n'}
            Untuk mengurangi risiko kanker:{'\n'}- Lebih aman lagi jika Sahabat
            MammaSIP tidak memiliki kebiasaan mengonsumsi alkohol.
          </Text>
        }
      />
      <Divider />
      <AnswerComponent
        number="3"
        title="Berapa banyak buah yang rata-rata Anda konsumsi dalam sehari?"
        source={require('../../assets/images/fruit.png')}
        isTrue={data.page3}
        answer={
          data.page3 ? '2 atau lebih buah per hari' : '0 hingga 1 buah per hari'
        }
        condition={
          <Text style={styles.text}>
            Rekomendasi MammaSIP {'\n'}- Upayakan Sahabat MammaSIP tiap harinya
            mengonsumsi minimal 2 porsi standar buah.{'\n'}- Perbanyak makanan
            berserat tinggi seperti beras yang masih ada kulit pelindung,
            oatmeal.{'\n'} - Konsumsi daging merah tidak dilarang selama dalam
            porsi cukup : 65 gram/hari atau 135 gram/hari jika dimakan
            3x/minggu.{'\n'}- Hindari daging olahan (contoh : sosis)
          </Text>
        }
      />
      <Divider />
      <AnswerComponent
        number="4"
        title="Berapa banyak sayur yang rata-rata Anda konsumsi dalam sehari?"
        source={require('../../assets/images/sayuran.png')}
        isTrue={data.page4}
        answer={
          data.page4
            ? '2 porsi atau lebih per hari'
            : '0 hingga 1 porsi per hari'
        }
        condition={
          <Text style={styles.text}>
            Rekomendasi MammaSIP {'\n'}- Upayakan Sahabat MammaSIP tiap harinya
            mengonsumsi minimal 2 porsi standar sayur .{'\n'}- Perbanyak makanan
            berserat tinggi seperti beras yang masih ada kulit pelindung,
            oatmeal.{'\n'} - Konsumsi daging merah tidak dilarang selama dalam
            porsi cukup : 65 gram/hari atau 135 gram/hari jika dimakan
            3x/minggu.{'\n'}- Hindari daging olahan (contoh : sosis)
          </Text>
        }
      />
      <Divider />
      <AnswerComponent
        number="5"
        title="Menghitung masa indeks tubuh"
        source={require('../../assets/images/timbang.png')}
        isTrue={imt.page5}
        imt={`Indeks Massa Tubuh Anda adalah = ${imt.bmi}`}
        condition={
          <Text style={styles.text}>
            Rekomendasi MammaSIP {'\n'}- Upayakan berat badan Sahabat MammaSIP
            berada pada kisaran 18,5-22,9 untuk mengurangi risiko terkena
            kanker.
          </Text>
        }
      />
      <Divider />
      <AnswerComponent
        number="6"
        title="Berapa lama Anda olahraga dalam seminggu?"
        source={require('../../assets/images/lari.png')}
        isTrue={imt.page6}
        activity={activity?.activity}
        imt={`Durasi : ${activity?.time} Menit/minggu`}
        condition={
          <Text style={styles.text}>
            Untuk mengurangi risiko kanker, Sahabat MammaSIP perlu melakukan
            olah raga:{'\n'}- 150-300 menit/minggu aktivitas level sedang ATAU
            {'\n'} - 75-150 menit/minggu aktivitas level tinggi {'\n'}
            {'\n'}Kurangi kegiatan yang membuat Sahabat MammaSIP menjadi mager
            (malas gerak). Contoh : menonton televisi, main game komputer.
          </Text>
        }
      />
      <Divider />
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.refreshButton}
          activeOpacity={SIZES.opacity}
          onPress={onRefresh}>
          <Icon name="refresh" size={18} color={COLORS.white} />
          <Text
            style={[FONTS.textBold12, {color: COLORS.white, marginLeft: 6}]}>
            Hitung Ulang Yuk
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  text: {
    ...FONTS.text14,
    color: COLORS.black,
  },
  footer: {alignItems: 'center', marginBottom: 24, paddingHorizontal: 16},
  refreshButton: {
    flexDirection: 'row',
    borderWidth: 1,
    width: '100%',
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
    marginTop: 24,
  },
});

export default Answer;
