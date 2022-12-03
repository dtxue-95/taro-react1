import React, {Component} from 'react';
import Taro, {getCurrentInstance} from '@tarojs/taro'
import {Image, View} from "@tarojs/components";
import './img.scss'

interface IImg {
  id: number
  url: string
}

interface IState {
  current: number
  dataList: IImg[]
}

class Index extends Component<any, IState> {

  constructor(props: any) {
    super(props);
    this.state = {
      dataList: []
    }
  }

  componentDidMount() {
    const actionType = getCurrentInstance().router.params.actionType
    let title = actionType === "1" ? "我的下载" : '我的收藏'
    Taro.setNavigationBarTitle({
      title: title
    })
    this.getImgList()
  }

  go2Detail = (img: IImg) => {
    Taro.navigateTo({
      url: '/pages/detail/index?id=' + img.id
    })
  }
  getImgList = () => {
    try {
      const token = Taro.getStorageSync('token')
      if (token !== null) {
        Taro.request({
          url: 'https://api.eveadmin.com/api/user/img/list?actionType=' + getCurrentInstance().router.params.actionType,
          method: 'get',
          header: {
            "Authorization": token
          },
          success: (res) => {
            console.log(res.data)
            this.setState({
              dataList: res.data.data
            })
          }
        })
      }
    } catch (e) {

    }
  }

  render() {
    return (
      <>
        <View className='pic-list'>
          {
            this.state.dataList.map(img => (
              <View
                onClick={() => {
                  this.go2Detail(img)
                }}
                key={img.id}
                className='pic-item'
              >
                <Image
                  className='img'
                  mode='widthFix'
                  src={img.url}
                />
              </View>
            ))
          }
        </View>
      </>
    );
  }
}

export default Index;
