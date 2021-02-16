import AndroidIcon from '@material-ui/icons/Android';
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import DesktopWindowsIcon from '@material-ui/icons/DesktopWindows';
import Link from "@material-ui/core/Link";
import React, { useEffect, useState } from "react";
import V2rayIcon from '../img/navbar/V2rayIcon';
import { Container, Divider, Paper, Typography } from "@material-ui/core";
import { blue, grey } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";
import api, { BaseRes, NodeInfo } from '../api/api';
import { RootState } from '../redux/store';
import { useSelector } from 'react-redux';
import { AxiosError, AxiosResponse } from 'axios';
import V2NodeItem from './V2NodeItem';

const useStyles = makeStyles((theme) => ({
  cardRoot: {
    minWidth: 275,
    backgroundColor: grey[100],
    marginBottom: theme.spacing(4)
  },
  header: {
    backgroundColor: blue[300]
  },
  content: {
    minHeight: "20vh"
  },
  iconButton: {
    marginRight: theme.spacing(1),
    marginLeft: "auto",
    alignContent: "flex-end"
  },
  actions: {
    display: "flex",
    backgroundColor: grey[200]
  },
  nodePaper: {
    marginTop: theme.spacing(2)
  },
}));

interface RawNodeInfo {
  node_id: number
  name: string
  host: string
  location: string
  description?: string
  isp?: string
  provider: string
  delay: number
  delay_updated_at?: string
  code_vmess: string
}


const V2Page = () => {
  const classes = useStyles();
  var userStatus = useSelector((state: RootState) => state.user)
  const [nodeInfos, setNodeInfos] = useState(new Array<NodeInfo>())

  const GetNodeInfos = (jwt: string) => {
    api.node.GetNodes(jwt).then((res: AxiosResponse<BaseRes>) => {
      let data = res.data
      var payload: RawNodeInfo[] = data.payload["nodes"]
      var newNodeInfos = payload.map<NodeInfo>((value, index, array) => {
        return {
          nodeId: value.node_id,
          name: value.name,
          host: value.host,
          location: value.location,
          description: value.description,
          isp: value.isp,
          provider: value.provider,
          delay: value.delay,
          delayUpdatedAt: value.delay_updated_at,
          CodeVmess: value.code_vmess
        }
      })
      setNodeInfos(newNodeInfos)
    }).catch((error: AxiosError<BaseRes>) => {
      // TODO 打印失败消息
    })
  }
  useEffect(() => {
    GetNodeInfos(userStatus.token)
  }, [userStatus.token])

  return (
    <Container>
      <Card className={classes.cardRoot} variant="elevation">
        <CardHeader 
        title={<Typography variant="h5">
          V2ray 下载
        </Typography>}
        className={classes.header} 
        avatar={<V2rayIcon width="2em" height="2em"/>}/>
        <CardContent className={classes.content}>
          <Typography>
            目前，我们仅仅提供安卓版及 Windows 版本的 V2ray
          </Typography>
        </CardContent>
        <Divider />
        <CardActions className={classes.actions}>
          <Button 
          className={classes.iconButton} 
          startIcon={<DesktopWindowsIcon />} 
          color="inherit" 
          aria-label="windows" 
          size="small">
            <Link href="https://cloud.ayajike.xyz/s/EqGk6J62as9sqWz">Win 下载</Link>
          </Button>
          <Button 
          className={classes.iconButton} 
          startIcon={<AndroidIcon />} 
          color="inherit" 
          aria-label="android" 
          size="small">
            <Link href="https://cloud.ayajike.xyz/s/mGQafMj27Aeb2w4">安卓下载</Link>
          </Button>
        </CardActions>
      </Card>

      {/* 节点信息 */}
      {
        nodeInfos.map((value, index, array) => {
          return (
            <Paper className={classes.nodePaper}>
              <V2NodeItem nodeInfo={value} />
            </Paper>
          )
        })
      }
    </Container>
  )
};

export default V2Page;