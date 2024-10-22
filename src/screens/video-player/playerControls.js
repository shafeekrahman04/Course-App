import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import VideoPause from '../../utilities/svg/VideoPause';
import VideoPlay from '../../utilities/svg/VideoPlay';
import VideoForward from '../../utilities/svg/VideoForward';
import VideoBackward from '../../utilities/svg/VideoBackward';


const PlayerControls = props => {
  const {playing, onPlay, onPause, skipForwards, skipBackwards} = props;

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity style={styles.touchable} onPress={skipBackwards}>
        <VideoBackward />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.touchable}
        onPress={playing ? onPause : onPlay}>
        {playing ? (
          <VideoPause height="50" width="50" />
        ) : (
          <VideoPlay height="50" width="50" />
        )}
      </TouchableOpacity>

      <TouchableOpacity style={styles.touchable} onPress={skipForwards}>
        <VideoForward />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flex: 3,
  },
  touchable: {
    padding: 5,
  },
  touchableDisabled: {
    opacity: 0.3,
  },
});

export default PlayerControls;
