import React, {Component} from 'react'
import {View, Image, Button, Text} from '@tarojs/components'
import './index.scss'
import Taro, {getCurrentInstance} from '@tarojs/taro'
import {AtDivider} from 'taro-ui'

interface IImg {
  id: number
  url: string
}

interface IPage {
  id: number
  title: string
  nickname: string
}

// id: 40
// mid: 2650906491
// nickname: "超清手机壁纸大全"
// title: "不容错过的手机壁纸，赶快收藏！"

interface IState {
  img: IImg
  imgList: IImg[]
  isLoading: boolean
  height: number
}

export default class index extends Component<any, IState> {

  constructor(props: any) {
    super(props);
    this.state = {
      img: {} as IImg,
      isLoading: true,
      height: 0,
      imgList: []
    }
  }


//然后根据开发文档
  // 首先在生命周期配置,这样右上角的朋友圈按钮才能使用
  componentDidMount() {
    Taro.getSystemInfo({
      success: (res) => {
        this.setState({
          height: res.windowHeight
        })
      }
    })
    const id = getCurrentInstance().router.params.id
    Taro.request({
      url: 'https://api.eveadmin.com/api/img/detail/' + id, //仅为示例，并非真实的接口地址
      success: (res) => {
        this.setState({
          img: res.data.data.img,
          imgList: res.data.data.imgList,
          isLoading: false
        })
      }
    })
  }

  onAddToFavorites(res) {
    return {
      title: "漂亮美眉人人爱",
      query: "id=" + this.state.img.id,
      imageUrl: this.state.img.url
    };
  }

  onShareAppMessage() {
    return {
      title: "漂亮美眉人人爱",
      query: "/pages/detail/index?id=" + this.state.img.id,
      imageUrl: this.state?.img.url
    };
  } //转发好友
  onShareTimeline() {
    return {
      title: "漂亮美眉人人爱",
      query: "/pages/detail/index?id=" + this.state.img.id,
      imageUrl: this.state?.img.url
    };
  } //分享朋友圈
  go2home = () => {
    const tag = getCurrentInstance().router.params.tag
    if (tag === '1') {
      Taro.reLaunch({
        url: '/pages/index/index'
      });
    } else {
      // 不是直接打开当前页面就回退
      if (Taro.getCurrentPages().length > 1) {
        Taro.navigateBack({
          delta: 1
        });
      } else {
        // 通过分享详情页打开的，回退之后直接重新加载首页
        Taro.reLaunch({
          url: '/pages/index/index'
        });

      }
    }
  }
  download = () => {
    if (process.env.TARO_ENV === 'weapp') {
      const id = getCurrentInstance().router.params.id
      //下载
      try {
        const token = Taro.getStorageSync('token')
        Taro.request({
          url: `https://api.eveadmin.com/api/user/img/${id}/1`,
          method: 'post',
          header: {
            "Authorization": token
          }
        })
      } catch (e) {
        console.log(e)
      }

      Taro.getSetting({
        success: () => {
          Taro.authorize({
            scope: 'scope.writePhotosAlbum',
            success: () => {
              Taro.showToast({
                title: '开始下载',
                icon: 'loading'
              })
              Taro.downloadFile({
                url: this.state?.img.url,
                fail: (res) => {
                  Taro.showToast({
                    title: res.tempFilePath,
                    icon: 'success'
                  })
                },
                success: (res) => {
                  if (res.statusCode === 200) {
                    Taro.playVoice({
                      filePath: ''
                    })
                  }
                  Taro.saveImageToPhotosAlbum({
                    filePath: res.tempFilePath, //返回的临时文件路径，下载后的文件会存储到一个临时文件
                    success: () => {
                      Taro.showToast({
                        title: '成功保存到相册',
                        icon: 'success'
                      })
                    },
                    fail: (res) => {
                      Taro.showToast({
                        title: res.errMsg,
                        icon: 'none'
                      })
                    }
                  })
                }
              })
            }
          })
        }
      })
    }

  }
  share = () => {
    this.onShareTimeline()
  }
  go2Detail = (img: IImg) => {
    Taro.navigateTo({
      url: '/pages/detail/index?id=' + img.id + '&tag=1'
    })
  }
  favorite = () => {
    const id = getCurrentInstance().router.params.id
    //收藏
    try {
      const token = Taro.getStorageSync('token')
      Taro.request({
        url: `https://api.eveadmin.com/api/user/img/${id}/2`,
        method: 'post',
        header: {
          "Authorization": token
        },
        success: () => {
          Taro.showToast({
            title: '成功',
            icon: 'success',
            duration: 2000
          })
        }
      })
    } catch (e) {
      console.log(e)
    }
  }

  render() {
    if (this.state.isLoading) {
      return null
    }
    return (
      <View className='container'>
        <Image mode='scaleToFill' style={{height: this.state.height}} src={this.state.img.url} className='img'/>
        <View className='btn-list' style={{top: this.state.height - 68}}>
          <Button onClick={() => {
            this.go2home()
          }} size='mini' type='primary' className='at-icon at-icon-chevron-left btn-icon'>
            返回
          </Button>
          <Button size='mini' onClick={this.favorite} type='primary' className='at-icon at-icon-heart btn-icon'>
            收藏
          </Button>
          <Button onClick={() => {
            this.download()
          }} size='mini' type='primary' className='at-icon at-icon-download btn-icon'>
            下载
          </Button>
          <Button openType="share" size='mini' type='primary' className='at-icon at-icon-share btn-icon'>
            分享
          </Button>
        </View>
        <AtDivider content='猜你喜欢' fontColor='#ff9900' lineColor='#ff9900'/>
        <View className='pic-list'>
          {
            this.state.imgList.map(img => (
              <View
                onClick={() => {
                  this.go2Detail(img)
                }}
                key={img.id}
                className='pic-item'
              >
                <Image
                  className='img'
                  mode='aspectFill'
                  src={img.url}
                />
              </View>
            ))
          }
        </View>
      </View>
    );
  }
}
