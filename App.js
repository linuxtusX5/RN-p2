import { useState, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Images from './assets/undraw_doctor_kw5l.png'
import ImageViewer from './ImageViewer';
import Button from './Button';
import CircleButton from './CircleButton';
import IconButton from './IconButton';
import EmojiPicker from './EmojiPicker';
import EmojiList from './EmojiList';
import EmojiSticker from './EmojiSticker';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as MediaLibrary from 'expo-media-library';
import { captureRef } from 'react-native-view-shot';
// import domToImage from 'dom-to-image';


export default function App() {
  const [status, requestPermission] = MediaLibrary.usePermissions();
  const [pickedEmoji, setPickedEmoji] = useState(null)
  const [selectedImg, setSelectedImg] = useState(null);
  const [isModelVisible, setIsModalVisible] = useState(false);
  const [showOption, setShowOption] = useState(false);
  const imageRef = useRef();
  
  if(status == null){
    requestPermission();
  }
  const onReset = () => {
    setShowOption(false)
  }
  const onAddSticker = () => {
    setIsModalVisible(true)
  }
  const onModalClose = () => {
    setIsModalVisible(false)
  }
  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });
    if(!result.canceled){
      setSelectedImg(result.assets[0].uri)
      setShowOption(true)
    }else{
      alert('You did not select any image.')
    }
  }

const onSaveImageAsync = async () => {
  try {
    if (Platform.OS !== 'web') {
      const localUri = await captureRef(imageRef, {
        height: 440,
        quality: 1,
      });
      await MediaLibrary.saveToLibraryAsync(localUri);
      if (localUri) {
        alert("Saved!");
      }
    } else {
      // Use the same logic for saving images on web as you had before.
      // The web part remains unchanged.
      const dataUrl = await domToImage.toJpeg(imageRef.current, {
        quality: 0.95,
        width: 320,
        height: 440,
      });
      let link = document.createElement('a');
      link.download = 'sticker-smash.jpeg';
      link.href = dataUrl;
      link.click();
    }
  } catch (error) {
    console.log(error);
  }
};
  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.imageContainer}>
      <View ref={imageRef} collapsable={false}>
        <ImageViewer ImageSource={Images} selectedImg={selectedImg}/>
        {pickedEmoji !== null ? <EmojiSticker imageSize={40} stickerSource={pickedEmoji} /> : null}
      </View>
      </View>
      {showOption ? (
        <View style={styles.optionsContainer}>
          <View style={styles.optionsRow}>
            <IconButton icon={'refresh'} label={'Reset'} onPress={onReset}/>
            <CircleButton onPress={onAddSticker}/>
            <IconButton icon={'save-alt'} label={'Save'} onPress={onSaveImageAsync}/>
          </View>
        </View>
      ) : (
      <View style={styles.footerCon}>
        <Button theme={'primary'} label={'Choose a photo'} onPress={pickImageAsync}/>
        <Button theme={'primary'} label="Use this photo"  onPress={() => setShowOption(true)}  />
      </View>
      )}
      <EmojiPicker isVisible={isModelVisible} onClose={onModalClose}>
        <EmojiList onSelect={setPickedEmoji} onCloseModal={onModalClose}/>
      </EmojiPicker>
      <StatusBar style="light" />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
  },
  imageContainer: {
    flex: 1,
    paddingTop: 58, 
  },
  footerCon: {
    flex: 1/3,
    alignItems: 'center',
  },
    optionsContainer: {
    position: 'absolute',
    bottom: 80,
  },
  optionsRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
});
