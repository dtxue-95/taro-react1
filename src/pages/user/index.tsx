import React, { Component } from 'react'
import { View, OpenData } from '@tarojs/components'
import './index.scss'
import Taro from '@tarojs/taro'
import { AtAvatar, AtList, AtListItem } from 'taro-ui'
import Today from "./Today";

interface IState {
  auth: boolean
}

interface IProps {

}

export default class index extends Component<IProps, IState> {

  constructor(props: IProps) {
    super(props);
    try {
      const value = Taro.getStorageSync('token')
      if (value !== null) {
        this.state = {
          auth: true
        }
      }
    } catch (e) {
      this.state = {
        auth: false
      }
    }
    this.state = {
      auth: false
    }
  }



  componentDidMount() {
    Taro.checkSession({
      success: () => {
        try {
          const value = Taro.getStorageSync('token')
          if (value !== null) {
            this.login()
          }
        } catch (e) {

        }
      },
      fail: () => {
        this.login()
      }
    })
  }
  login = () => {
    Taro.login({
      success: (res) => {
        Taro.request({
          url: 'https://api.eveadmin.com/api/user/auth',
          method: 'post',
          data: {
            code: res.code
          },
          success: (res1) => {
            const { code } = res1.data
            if (code === 0) {
              const { token } = res1.data.data
              try {
                Taro.setStorageSync('token', token)
              } catch (e) {
                console.log(e)
              }
            }
          }
        })
      }
    })
  }
  showDownload = () => {
    Taro.navigateTo({
      url: '/pages/user/img?actionType=1',
    })
  }
  showFavorite = () => {
    Taro.navigateTo({
      url: '/pages/user/img?actionType=2',
    })
  }

  render() {
    return (
      <View className='container'>
        <View className='user-info'>
          <AtAvatar size={'large'} openData={{ type: 'userAvatarUrl' }} circle />
          <OpenData className='nickname' type='userNickName' />
        </View>
        <AtList>
          <AtListItem
            onClick={this.showFavorite}
            title='我的收藏'
            arrow='right'
            thumb='https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png'
          />
          <AtListItem
            onClick={this.showDownload}
            title='我的下载'
            arrow='right'
            thumb='http://img10.360buyimg.com/jdphoto/s72x72_jfs/t5872/209/5240187906/2872/8fa98cd/595c3b2aN4155b931.png'
          />
        </AtList>
        <Today />
      </View>

    )
  }
}
