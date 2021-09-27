import axios from 'axios'
import docCookies from '../util/cookie'
import HitokotoRes from './hitokoto'

const APIV1 = "/api/v1"
const APIHitokoto = "https://v1.hitokoto.cn"

export interface BaseRes {
  code: number
  msg: string
  payload: any
}

export interface BaseResWithPayload<T> {
  code: number
  msg: string
  payload: T
}

// deprecated. v2ray 节点信息
export interface NodeInfo {
  nodeId: number
  name: string
  host: string
  location: string
  description?: string
  isp?: string
  provider: string
  delay: number
  delayUpdatedAt?: string
  CodeVmess: string
}

export interface ProxyInfo {
  id: number
  name: string
  sub_url: string
}


const api = {
  login: {
    postLogin: (username: string) => {
      return axios.post(
        APIV1 + "/user/login",
        {
          "username": username
        }
      )
    }
  },
  statistic: {
    getStatistic: () => {
      return axios.get(
        APIV1 + "/statistic/visit"
      )
    },
    postAddVisit: () => {
      return axios.post(
        APIV1 + "/statistic/visit"
      )
    },
  },
  // deprecated. 原本用于 v2ray，现在转综合 proxy 页面了
  node: {
    getNodes: (jwt: string) => {
      return axios.get(
        APIV1 + "/vray/info",
        {
          headers: {
            "Authorization": `Bearer ${jwt}`
          }
        }
      )
    }
  },
  proxy: {
    getProxy: (jwt: string) => {
      return axios.get(
        APIV1 + "/proxy/info",
        {
          headers: {
            "Authorization": `Bearer ${jwt}`
          }
        }
      )
    }
  },
  hitokoto: {
    getHitokoto: () => {
      return axios.get<HitokotoRes>(
        APIHitokoto + "/?encode=json&charset=utf-8",
      )
    }
  },
  // 特殊的注销 api
  logoff: {
    logoff: () => {
      docCookies.removeItem("jwt")
      docCookies.removeItem("username")
    }
  }
}

export default api;
