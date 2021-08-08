// import React, {Component} from 'react';
// import {View, StyleSheet} from 'react-native';
// import Animation from 'lottie-react-native';
// import checkmark from '../../assets/animations/loading.json';
// import {COLORS, SIZES} from '../../constants';

// class LoadingView extends Component {
//   componentDidMount = () => {
//     this.animation.play();
//   };
//   render() {
//     return (
//       <View style={styles.container}>
//         <Animation
//           ref={animation => {
//             this.animation = animation;
//           }}
//           source={checkmark}
//         />
//       </View>
//     );
//   }
// }
// const styles = StyleSheet.create({
//   container: {
//     height: SIZES.height,
//     width: SIZES.width,
//     position: 'absolute',
//     zIndex: 99999,
//     backgroundColor: COLORS.shadowWhite,
//   },
// });
// export default LoadingView;
