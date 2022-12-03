import React, {Component} from 'react'
import {View, ScrollView, Image, Text} from '@tarojs/components'
import Taro from '@tarojs/taro'
import {AtListItem, AtSearchBar, AtTag} from 'taro-ui'
import './index.scss'

interface IProps {

}

interface IState {
  value: string
}

export default class index extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = {
      value: ''
    }
  }

  //然后根据开发文档
  // 首先在生命周期配置,这样右上角的朋友圈按钮才能使用
  componentDidMount() {
    if (process.env.TARO_ENV === 'weapp') {
      Taro.showShareMenu({
        withShareTicket: true,
        menus: ['shareAppMessage', 'shareTimeline'],
        success(res) {
          console.log(res)
        },
        fail(e) {
          console.log(e)
        }
      })
    }
  }

  onAddToFavorites(res) {
    return {
      title: "漂亮美眉人人爱",
      query: "/pages/detail/index",
      imageUrl: 'https://mmbiz.qpic.cn/mmbiz_png/WH5EFl06SVgDN1XHryUAf7vC1tCHO7MGW4k8r21Q9VWYzqy4KfOMhT25OlibcExIEWiarIe7RXghgUnDUIwDtjuw/640?wx_fmt=png'
    };
  }

  //最后
  onShareAppMessage() {
    return {
      title: "漂亮美眉人人爱",
      query: "/pages/detail/index",
      imageUrl: 'https://mmbiz.qpic.cn/mmbiz_png/WH5EFl06SVgDN1XHryUAf7vC1tCHO7MGW4k8r21Q9VWYzqy4KfOMhT25OlibcExIEWiarIe7RXghgUnDUIwDtjuw/640?wx_fmt=png'
    };
  } //转发好友
  onShareTimeline() {
    return {
      title: "漂亮美眉人人爱",
      query: "/pages/detail/index",
      imageUrl: 'https://mmbiz.qpic.cn/mmbiz_png/WH5EFl06SVgDN1XHryUAf7vC1tCHO7MGW4k8r21Q9VWYzqy4KfOMhT25OlibcExIEWiarIe7RXghgUnDUIwDtjuw/640?wx_fmt=png'
    };
  } //分享朋友圈
  onChange(value) {
    this.setState({
      value: value
    })
  }

  categoryList = [
    {
      categoryName: '下载榜',
      categoryNameEnglish: 'Download',
      id: 1
    },
    {
      categoryName: '新品榜',
      categoryNameEnglish: 'New',
      id: 2
    },
    {
      categoryName: '收藏榜',
      categoryNameEnglish: 'Collection',
      id: 3
    },
    {
      categoryName: '热度榜',
      categoryNameEnglish: 'Hot',
      id: 4
    },
  ]

  render() {
    return (
      <View>
        <AtSearchBar
          placeholder='搜索高清壁纸'
          disabled
          value={this.state.value}
          onChange={this.onChange.bind(this)}
        />
        <ScrollView scrollX id='category-list'>
          {
            this.categoryList.map(category => (
              <View className='category-tag' key={category.id}>
                <View className='title'>{category.categoryName}</View>
                <View className='sub-title'>{category.categoryNameEnglish}</View>
              </View>
            ))
          }
        </ScrollView>
        <AtListItem title='标签'/>
        <View id='category-tag-container'>
          {
            [1, 2, 3, 343, 33, 1, 2, 3].map((tag, index) => (
              <AtTag className='category-tag' key={index}>标签{tag}</AtTag>
            ))
          }
        </View>
        <AtListItem title='分类'/>
        <View id='category-card-list'>
          {
            [1, 2, 22, 2, 2].map((category, index) => (
              <View className='category-card' key={index}>
                <Image src={MM} mode='widthFix' className='img'/>
                <Text className='title'>清新可爱</Text>
              </View>
            ))
          }
        </View>
      </View>
    )
  }
}
