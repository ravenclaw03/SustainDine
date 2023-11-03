import React from "react";
import { Text, StyleSheet, View } from "react-native";
import IconButton from "../../UI/IconButton";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function TrackScreenNGO() {
  return (
    <View style={styles.outerCont}>
      <View style={styles.cont}>
        <Text style={styles.text}>No active order to track! </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outerCont: {
    flex: 1,
    alignItems: 'center',
  },
  cont: {
    height: hp('6%'),
    width: wp('75%'),
    marginTop: hp('40%'),
    borderRadius: wp('10%'),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#50C878',
  },
  text: {
    marginLeft: wp('18%'),
    fontSize: hp('2%'),
  },


});
