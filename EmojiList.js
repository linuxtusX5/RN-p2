import { useState } from "react";
import { StyleSheet, FlatList, Image, Platform, Pressable } from "react-native";

export default function EmojiList({onSelect, onCloseModal}){
    const [emoji] = useState([
        require('./assets/emoji/emojipng.com-1738931.png'),
        require('./assets/emoji/emojipng.com-35971.png'),
        require('./assets/emoji/emojipng.com-861142.png'),
    ]);
    return(
        <FlatList
        horizontal
        showsHorizontalScrollIndicator={Platform.OS === 'web'}
        data={emoji}
        contentContainerStyle={styles.listContainer}
        renderItem={({item, index}) => {
            return(
                <Pressable
                onPress={() => {
                    onSelect(item);
                    onCloseModal();
                }}>
                    <Image source={item} key={index} style={styles.image}/>
                </Pressable>
            )
        }}></FlatList>
    )
    
}
const styles = StyleSheet.create({
  listContainer: {
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 20,
  },
});
