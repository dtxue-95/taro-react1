import { Component } from 'react'
import { View, Swiper, SwiperItem, Image } from '@tarojs/components'
import { AtTabs, AtTabsPane } from 'taro-ui'

import Taro from '@tarojs/taro'
import './index.scss'
import Today from './today'

interface IProps {

}

interface IImg { // ts要定义类型
  id: number
  url: string
}

interface ITab {
  title: string
  id: number
  page: number
  dataList: IImg[]
}

interface IState {
  current: number
  tabList: ITab[]
  bannerList: IImg[]
  currentTab: ITab
}

// 1	2021-08-11 11:11:37.944	2021-08-11 11:11:37.944		小姐姐
// 2	2021-08-11 11:11:37.951	2021-08-11 11:11:37.951		动漫
// 3	2021-08-11 11:11:37.958	2021-08-11 11:11:37.958		二次元
// 4	2021-08-11 11:11:37.965	2021-08-11 11:11:37.965		情侣
// 5	2021-08-11 11:11:37.972	2021-08-11 11:11:37.972		游戏
// 6	2021-08-11 11:11:37.978	2021-08-11 11:11:37.978		明星
// 7	2021-08-11 11:11:37.987	2021-08-11 11:11:37.987		风景
// 8	2021-08-11 11:11:37.993	2021-08-11 11:11:37.993		小清新
export default class Index extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = {
      current: 0,
      currentTab: { title: '最新', id: 1, page: 1, dataList: [] },
      bannerList: [],
      tabList: [
        { title: '小姐姐', id: 1, page: 1, dataList: [] },
        { title: '动漫', id: 2, page: 1, dataList: [] },
        { title: '二次元', id: 3, page: 1, dataList: [] },
        { title: '情侣', id: 4, page: 1, dataList: [] },
        { title: '游戏', id: 5, page: 1, dataList: [] },
        { title: '明星', id: 6, page: 1, dataList: [] },
        { title: '风景', id: 7, page: 1, dataList: [] },
        { title: '小清新', id: 8, page: 1, dataList: [] },
      ]
    }
  }

  // eslint-disable-next-line react/sort-comp
  handleClick = (value: number) => {
    this.setState({
      current: value
    })
  }

  onChange(value) {
    this.setState({
      value: value
    })
  }

  componentWillMount() {

  }

  componentDidMount() {
    this.getBanner()
    this.setState({
      currentTab: this.state.tabList[0]
    })
    this.getTabData(this.state.tabList[0])
  }

  onPullDownRefresh() {
    Taro.showNavigationBarLoading()
    this.getTabData(this.state.currentTab, true)
    this.getBanner()
  }

  onReachBottom() {
    this.getTabData(this.state.tabList[this.state.current])
  }

  componentWillUnmount() {
  }

  componentDidShow() {
  }

  componentDidHide() {
  }

  go2Detail = (img: IImg) => {
    Taro.navigateTo({
      url: '/pages/detail/index?id=' + img.id
    })
  }
  getBanner = () => {
    Taro.request({
      url: 'https://api.eveadmin.com/api/img/list', //仅为示例，并非真实的接口地址
      data: {
        page: new Date().getDay() % 10
      },
      success: (res) => {
        this.setState({
          bannerList: res.data.data.dataList
        })
      }
    })
  }
  getTabData = (tab: ITab, refresh?: boolean) => {
    Taro.showLoading();
    if (refresh) {
      tab.page = 1;
    }
    Taro.request({
      url: 'https://api.eveadmin.com/api/img/list',
      data: {
        page: tab.page,
        categoryId: tab.id
      },
      success: (res) => {
        tab.page++
        this.setState((state) => ({
          currentTab: tab,
          tabList: state.tabList.map(t => {
            if (t.id === tab.id) {
              if (refresh) {
                Taro.hideNavigationBarLoading()
                Taro.stopPullDownRefresh()
                t.dataList = res.data.data.dataList;
              } else {
                t.dataList.push(...res.data.data.dataList);
              }
            }
            return t
          })
        }))
        Taro.hideLoading()
      }
    })

  }
  changeTab = (index: number) => {
    let tab = this.state.tabList[index]
    tab.page = 1
    this.getTabData(tab, true)
    this.setState({
      current: index
    })
  }

  render() {
    return (
      <View className='index'>
        <Swiper
          className='swiper'
          indicatorColor='#999'
          indicatorActiveColor='#333'
          circular
          indicatorDots
          autoplay
        >
          {
            this.state.bannerList.map((item, index) => (
              <SwiperItem
                key={index}
                onClick={() => {
                  this.go2Detail(item)
                }}
              >
                <Image
                  mode='aspectFill'
                  className='item'
                  src={item.url}
                />
              </SwiperItem>
            ))
          }
        </Swiper>
        <Today />
        <AtTabs
          current={this.state.current}
          tabList={this.state.tabList}
          scroll
          onClick={(index) => {
            this.changeTab(index)
          }}
        >
          {
            this.state.tabList.map((tab, index) => (
              <AtTabsPane current={this.state.current} index={index} key={index}>
                <View className='pic-list'>
                  {
                    this.state.tabList[index].dataList.map(img => (
                      <View
                        onClick={() => {
                          this.go2Detail(img)
                        }}
                        key={img.id}
                        className='pic-item'
                      >
                        <Image
                          className='img'
                          mode='heightFix'
                          src={img.url}
                        />
                      </View>
                    ))
                  }
                </View>
              </AtTabsPane>
            ))
          }
        </AtTabs>

      </View>
    )
  }
}
