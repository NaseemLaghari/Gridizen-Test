import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { getPosts } from '../Services/HomeServices';
import { setData } from '../Redux/postsDataReducer';
import { useDispatch, useSelector } from 'react-redux';
import { FlatList } from 'react-native-gesture-handler';
import { PROPERTIES } from '../constants';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const {data} = useSelector(state => state.postsData)
  const navigation = useNavigation();
  React.useEffect(()=>{

    const controller = new AbortController();
    const signal = controller.signal
    const tempData = [
      {
        "userId": 1,
        "id": 1,
        "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
        "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
      },
      {
        "userId": 1,
        "id": 2,
        "title": "qui est esse",
        "body": "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla"
      }
      ]

      
      getPosts(signal)
      .then(res => {
        dispatch( setData(res.data) );
        console.log("🚀 ~ file: Home.js:16 ~ React.useEffect ~ res:", res)
      })
      .finally(() => {})
      .catch(e => {
        dispatch( setData(tempData) );
        console.log('Err: ', e)
      })
      
    return () => {
      controller.abort();
    }
  }, [])

  const RowType = ({key_, value})=> {
    return (
      <View style={{  
        flexDirection: 'row',
        marginTop: 2
      }}>
        <View style={{ flex: 0.25 }}>
          <Text style ={[styles.text, {fontWeight: '700',}]}>{key_}</Text>
        </View>
        <View style={{ flex: 0.65 }}>
          <Text style={styles.text}>{value}</Text>
        </View>
      </View>
    )
  }

  return (
    <View style={{flex: 1, backgroundColor: '#fff5' }}>
      <FlatList
        data={data}
        keyExtractor={(key, index) => `${key+''+index}`}
        renderItem={({item, index}) => {
          return (
            <View style={{ paddingHorizontal: '4%' }}>
              <View style={{  
                paddingHorizontal: '3%',
                marginTop: '2%',
                paddingVertical: '2%',
                backgroundColor: '#fff',
                elevation: 1,
                borderRadius: 5,
              }}>
                <RowType key_={"Title"} value={item.title}/>
                <RowType key_={"Details"} value={item.body}/>
              </View>

            </View>
          )
        }}
      />
      <View style={{ paddingHorizontal: '4%' }}>
        <Button
          title='Add Post'
          onPress={()=>{
            navigation.navigate('AddPostScreen')
          }}
        />
      
      </View>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  text: {
    fontSize: PROPERTIES.SIZE,
    fontWeight: '600',
    fontFamily: PROPERTIES.FONT_FAMILY,
  }
})