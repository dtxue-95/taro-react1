import React, {Component} from 'react'
import {Image, ScrollView, View} from '@tarojs/components'
import Taro from '@tarojs/taro'
import {AtListItem} from "taro-ui"

import './today.scss'

interface IImg {
  id: number
  url: string
}

interface IState {
  imgList: IImg[]
}

export default class Today extends Component<any, IState> {

  constructor(props: any) {
    super(props);
    this.state = {
      imgList: []
    }
  }

  go2Detail = (img: IImg) => {
    Taro.navigateTo({
      url: '/pages/detail/index?id=' + img.id
    })
  }

  componentDidMount() {
    Taro.request({
      url: 'https://api.eveadmin.com/api/img/list', //仅为示例，并非真实的接口地址
      data: {
        page: new Date().getMinutes() % 6
      },
      success: (res) => {
        this.setState({
          imgList: res.data.data.dataList
        })
      }
    })
  }

  render() {
    return (
      <View>
        <AtListItem title='猜你喜欢'/>
        <ScrollView scrollX className='today'>
          {
            this.state.imgList.map((img, index) => (
              <Image

                onClick={() => {
                  this.go2Detail(img)
                }}
                key={index}
                className='img'
                mode='heightFix'
                src={img.url}
              />
            ))
          }
        </ScrollView>
      </View>
    )
  }
}
