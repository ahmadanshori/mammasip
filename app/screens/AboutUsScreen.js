import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {HeaderTitle} from '../components/Headers';
import {COLORS, SIZES, ICON, FONTS} from '../constants';

const data = [
  {
    id: 1,
    name: 'dr. Farida Briani Sobri, SpB(K)Onk',
    job: 'Spesialis Konsultan Bedah Onkologi Pemilik Hak Cipta MammaSIP',
  },
  {
    id: 2,
    name: 'dr. Adang Bachtiar, MPH., DSc.',
    job: 'Pakar Ilmu Kesehatan Masyarakat Pembimbing/Promotor',
  },
  {
    id: 3,
    name: 'Dr. dr. Sonar Soni Panigoro, SpB(K)Onk., M.Epid., MARS.',
    job: 'Spesialis Konsultan Bedah Onkologi Pembimbing/Ko-Promotor',
  },
  {
    id: 4,
    name: 'Dr. dra. Dumilah Ayuningtyas, MARS.',
    job: 'Pakar Ilmu Kesehatan Masyarakat Pembimbing/Ko-Promotor',
  },
  {
    id: 5,
    name: 'dr. IGN Gunawan Wibisana, Sp.B.(K)Onk.',
    job: 'Pakar Ilmu Onkologi',
  },
  {
    id: 6,
    name: 'dr. Maelissa Pramaningasih, SpB.',
    job: 'Pakar/Praktisi Bedah Umum',
  },
  {
    id: 7,
    name: 'Dr. Zulhijrian Noor, dr. Ripandi Yuspa, dr. Shafira Diani Putri',
    job: 'Pakar/Praktisi Kedokteran Umum dan Penyuluhan',
  },
  {
    id: 9,
    name: 'Fajriati M. Badrudin, S.Psi., Psikolog',
    job: 'Pakar Psikologi',
  },
  {
    id: 10,
    name: 'Yayat Ruhiat, S.Sos',
    job: 'Pakar Komunikasi Pemasaran',
  },
  {
    id: 11,
    name: 'Dedy Aswan, S. Pd., M. Pd.',
    job: 'Pakar Ilmu Pendidikan',
  },
  {
    id: 12,
    name: 'Muhammad Khidir, Lc. MA.',
    job: 'Pakar Ilmu Agama',
  },
  {
    id: 13,
    name: 'dr. Wulyo Rajabto, Sp.PD., KHOM.',
    job: 'Pakar Materi',
  },
  {
    id: 14,
    name: 'dr. Rulliana Agustin, M.Med.Ed.',
    job: 'Pakar Desain Instruksional',
  },
  {
    id: 15,
    name: 'Dr. Cecep Kustandi, M.Pd.',
    job: 'Pakar Media',
  },
  {
    id: 16,
    name: 'PT. Saiber Dunia Imaji',
    job: 'Developer IT',
  },
  {
    id: 17,
    name: 'PT. Teknologi Informasi MEDIMEDI',
    job: 'Kreator Video Medis',
  },
  {
    id: 18,
    name: 'KutipanX',
    job: 'Videografer',
  },
  {
    id: 19,
    name: 'Kania Indriani Rosep, Faris Nabhan Fahri',
    job: 'Illustrator',
  },
];

const AboutUsScreen = () => {
  return (
    <View style={styles.container}>
      <HeaderTitle back title="Tentang Kmi" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.body}>
          <ICON.aboutus height={SIZES.width3} width={SIZES.width3} />
          <Text
            style={[FONTS.textBold18, {color: COLORS.white, marginTop: 40}]}>
            Tentang MammaSIP
          </Text>
          <Text
            style={[
              FONTS.text12,
              {color: COLORS.white, textAlign: 'center', marginVertical: 24},
            ]}>
            Website dan Aplikasi MammaSIP adalah luaran dari Disertasi S3 dr.
            Farida Briani Sobri, Sp.B.(K)Onk. di Ilmu Kesehatan Masyarakat,
            Fakultas Kesehatan Masyarakat, Universitas Indonesia (masa
            pendidikan tahun 2020-2022).
          </Text>
          <Text
            style={[FONTS.text12, {color: COLORS.white, textAlign: 'center'}]}>
            Materi-materi edukasi dalam website dan aplikasi ini disusun
            berdasarkan penelitian ilmiah, referensi-referensi ilmiah, serta
            melibatkan pakar-pakar di bidang masing-masing, sehingga isinya
            dapat dipertanggungjawabkan kebenaran dan manfaatnya.
          </Text>
          <View style={styles.row}>
            <View style={styles.side} />
            <View style={styles.text}>
              <Text style={[FONTS.textBold18, {color: COLORS.white}]}>
                Siapa Kami
              </Text>
            </View>
            <View style={styles.side} />
          </View>
          {data.map(item => (
            <View style={styles.mBottom} key={item.id}>
              <Text
                style={[
                  FONTS.textBold12,
                  {color: COLORS.white, textAlign: 'center'},
                ]}>
                {item.name}
              </Text>
              <Text
                style={[
                  FONTS.text12,
                  {color: COLORS.gray, textAlign: 'center'},
                ]}>
                {item.job}
              </Text>
            </View>
          ))}
          <View style={styles.thanks}>
            <Text
              style={[
                FONTS.text12,
                {color: COLORS.black, textAlign: 'center'},
              ]}>
              Terima kasih kepada semua pihak yang tidak dapat disebutkan satu
              persatu namanya, yang turut mendukung pembuatan dan penyusunan
              website/aplikasi MammaSIP. Semoga media edukasi ini dapat membawa
              perbaikan bagi kesehatan bangsa, serta menjadi salah satu satu
              ladang amal soleh kita semua. Aamiin.
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  body: {alignItems: 'center', paddingHorizontal: 16, paddingTop: 24},
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 53,
    marginBottom: 80,
  },
  side: {borderTopWidth: 1, width: '30%', borderColor: COLORS.white},
  text: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  mBottom: {marginBottom: 32},
  thanks: {
    padding: 16,
    backgroundColor: COLORS.white,
    marginBottom: 24,
    borderRadius: 8,
  },
});

export default AboutUsScreen;
