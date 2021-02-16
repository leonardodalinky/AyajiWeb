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

// 节点信息
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

const api = {
  login: {
    PostLogin: (username: string) => {
      return axios.post(
        APIV1 + "/user/login",
        {
          "username": username
        }
      )
    }
  },
  statistic: {
    GetStatistic: () => {
      return axios.get(
        APIV1 + "/statistic/visit"
      )
    },
    PostAddVisit: () => {
      return axios.post(
        APIV1 + "/statistic/visit"
      )
    },
  },
  node: {
    GetNodes: (jwt: string) => {
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
  hitokoto: {
    GetHitokoto: () => {
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
