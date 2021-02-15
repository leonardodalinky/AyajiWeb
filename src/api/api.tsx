import axios from 'axios'

const APIV1 = "/api/v1"

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
  }
}

export default api;
