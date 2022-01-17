import React from 'react';
import {View, Text, StyleSheet, ScrollView, Image} from 'react-native';
import {HeaderTitle} from '../components/Headers';
import {COLORS, SIZES, ICON, FONTS} from '../constants';

const data = [
  {
    name: 'dr. Farida Briani Sobri, SpB(K)Onk.',
    job: 'Spesialis Konsultan Bedah Onkologi',
    desc: 'Pemilik HAKI MammaSIP',
  },
  {
    name: 'dr. Adang Bachtiar, MPH., DSc.',
    job: 'Pakar Ilmu Kesehatan Masyarakat',
    desc: 'Pembimbing/Promotor',
  },
  {
    name: 'Dr. dr. Sonar Soni Panigoro, SpB(K)Onk., M.Epid., MARS.',
    job: 'Spesialis Konsultan Bedah Onkologi',
    desc: 'Pembimbing/Ko-Promotor',
  },
  {
    name: 'Dr. dra. Dumilah Ayuningtyas, MARS.',
    job: 'Pakar Ilmu Kesehatan Masyarakat',
    desc: 'Pembimbing/Ko-Promotor',
  },
  {
    name: 'dr. IGN Gunawan Wibisana, Sp.B.(K)Onk.',
    job: 'Pakar Ilmu Onkologi',
  },
  {
    name: 'dr. Maelissa Pramaningasih, SpB.',
    job: 'Pakar/Praktisi Bedah Umum',
  },
  {
    name: 'dr. Zulhijrian Noor',
    name2: 'dr. Ripandi Yuspa',
    name3: 'dr. Shafira Diani Putri',
    job: 'Pakar/Praktisi Kedokteran Umum dan Penyuluhan',
  },
  {
    name: 'Fajriati M. Badrudin, S.Psi., Psikolog.',
    job: 'Pakar Psikologi',
  },
  {
    name: 'Yayat Ruhiat, S.Sos.',
    job: 'Pakar Komunikasi Pemasaran',
  },
  {
    name: 'Dedy Aswan, S. Pd., M. Pd.',
    job: 'Pakar Ilmu Pendidikan',
  },
  {
    name: 'Muhammad Khidir, Lc. MA.',
    job: 'Pakar Ilmu Agama',
  },
  {
    name: 'dr. Wulyo Rajabto, Sp.PD., KHOM.',
    job: 'Pakar Materi',
  },
  {
    name: 'dr. Rulliana Agustin, M.Med.Ed.',
    job: 'Pakar Desain Instruksional',
  },
  {
    name: 'Dr. Cecep Kustandi, M.Pd.',
    job: 'Pakar Media',
  },
  {
    name: 'PT. Saiber Dunia Imaji.',
    job: 'Developer IT',
  },
  {
    name: 'dr. Hardya Gustada Hikmahrachim, M.Epid.,',
    name2: 'dr. Cita Resti Anantia Putri.,',
    name3: 'dr. Anggindita Diah Widihidayati.',
    job: 'Tim Riset dan Data',
  },
  {
    name: 'PT. Teknologi Informasi MEDIMEDI.',
    job: 'Kreator Video Medis',
  },
  {
    name: 'KutipanX.',
    job: 'Videografer',
  },
  {
    name: 'Kania Indriani Rosep.,',
    name2: 'Faris Nabhan Fahri.',
    job: 'Ilustrator',
  },
];

const AboutUsScreen = () => {
  return (
    <View style={styles.container}>
      <HeaderTitle back title="Tentang Kami" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.body}>
          <Image
            source={require('../assets/images/logo.png')}
            style={{height: SIZES.width3, width: SIZES.width3}}
          />
          {/* <ICON.aboutus height={SIZES.width3} width={SIZES.width3} /> */}
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
          <Text
            style={[FONTS.textBold18, {color: COLORS.white, marginTop: 40}]}>
            Makna MammaSIP
          </Text>
          <Text
            style={[
              FONTS.text12,
              {color: COLORS.white, textAlign: 'center', marginTop: 24},
            ]}>
            Mamma (kata benda) memiliki 2 arti: Ibu dan organ wanita yang
            menghasilkan susu.
          </Text>
          <Text
            style={[FONTS.text12, {color: COLORS.white, textAlign: 'center'}]}>
            S= Skrining; I= Intervensi; P= Prevensi.
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
          {data.map((item, index) => (
            <View style={styles.mBottom} key={Number(index + 1).toString()}>
              <Text
                style={[
                  FONTS.textBold14,
                  {color: COLORS.white, textAlign: 'center', marginBottom: 4},
                ]}>
                {item.name}
              </Text>
              {item?.name2 ? (
                <Text
                  style={[
                    FONTS.textBold14,
                    {color: COLORS.white, textAlign: 'center', marginBottom: 4},
                  ]}>
                  {item.name2}
                </Text>
              ) : null}
              {item?.name3 ? (
                <Text
                  style={[
                    FONTS.textBold14,
                    {color: COLORS.white, textAlign: 'center', marginBottom: 4},
                  ]}>
                  {item.name3}
                </Text>
              ) : null}
              <Text
                style={[
                  FONTS.text12,
                  {color: COLORS.gray, textAlign: 'center'},
                ]}>
                {item.job}
              </Text>
              {item?.desc ? (
                <Text
                  style={[
                    FONTS.text12,
                    {color: COLORS.gray, textAlign: 'center'},
                  ]}>
                  {item.desc}
                </Text>
              ) : null}
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
              perbaikan bagi kesehatan bangsa, serta menjadi salah satu ladang
              amal soleh kita semua. Aamiin.
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
