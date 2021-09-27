// deprecated. 现在已经不再使用这个组件了
import { Accordion, AccordionDetails, AccordionSummary, IconButton, makeStyles, Table, TableBody, TableCell, TableRow, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { NodeInfo } from "../api/api";
import EventNoteIcon from '@material-ui/icons/EventNote';
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import { green, red, yellow } from "@material-ui/core/colors";
import NetworkCellIcon from '@material-ui/icons/NetworkCell';
import SignalCellularConnectedNoInternet3BarIcon from '@material-ui/icons/SignalCellularConnectedNoInternet3Bar';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


const useStyles = makeStyles((theme) => ({
  iconButton: {
    marginLeft: theme.spacing(1),
  },
  failPing: {
    color: red[500],
  },
  normalPing: {
    color: yellow[800],
  },
  succeedPing: {
    color: green[500],
  },
  headerCell: {
    minWidth: theme.spacing(10),
    width: theme.spacing(20),
  },
  succeedPingHeader: {
    backgroundColor: green[50],
    color: green[500],
  },
  normalPingHeader: {
    backgroundColor: yellow[50],
    color: yellow[800],
  },
  failPingHeader: {
    backgroundColor: red[50],
    color: red[500],
  }
}));

export interface V2NodeItemProps {
  nodeInfo: NodeInfo
}

const V2NodeItem = (props: V2NodeItemProps) => {
  const classes = useStyles()
  const [copySuccess, setCopySuccess] = useState({active: false, msg: ""})
  let nodeInfo = props.nodeInfo

  const HeaderCell = (props: {children: NonNullable<React.ReactNode>}) => {
    return (
      <TableCell className={classes.headerCell}>
        <Typography variant="body1">
          {props.children}
        </Typography>
      </TableCell>
    )
  }

  const ContentCell = (props: {children: NonNullable<React.ReactNode>}) => {
    return (
      <TableCell align="left">
        <div>
        <Typography variant="body1">
          {props.children}
        </Typography>
        </div>
      </TableCell>
    )
  }

  // 选择扩展面板的头部色调
  const accordHeadClass = (() => {
    if (nodeInfo.delay === -1) {
      return classes.failPingHeader
    } else if (nodeInfo.delay >= 1000) {
      return classes.normalPingHeader
    } else {
      return classes.succeedPingHeader
    }
  })()

  return (
    <>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls={`accord-content-${nodeInfo.nodeId}`}
          id={`accord-sum-${nodeInfo.nodeId}`}
          className={accordHeadClass}
        >
          <Typography variant="h4">节点: {nodeInfo.name}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Table style={{wordBreak: "break-word"}}>
            <TableBody>
              <TableRow>
                <HeaderCell>ID: </HeaderCell>
                <ContentCell>{nodeInfo.nodeId.toString()}</ContentCell>
              </TableRow>
              <TableRow>
                <HeaderCell>位置: </HeaderCell>
                <ContentCell>{nodeInfo.location}</ContentCell>
              </TableRow>
              <TableRow>
                <HeaderCell>服务商: </HeaderCell>
                <ContentCell>{nodeInfo.isp === undefined? "" : nodeInfo.isp}</ContentCell>
              </TableRow>
              <TableRow>
                <HeaderCell>贡献者: </HeaderCell>
                <ContentCell>{nodeInfo.provider}</ContentCell>
              </TableRow>
              <TableRow>
                <HeaderCell>
                  延迟: 
                  {
                    nodeInfo.delay === -1?
                    <IconButton 
                    className={classes.iconButton} 
                    color="inherit" 
                    aria-label="ping-failed"
                    size="small">
                      <SignalCellularConnectedNoInternet3BarIcon fontSize="small" className={classes.failPing}/>
                    </IconButton>
                     :
                    <IconButton 
                     className={classes.iconButton} 
                     color="inherit" 
                     aria-label="ping-failed"
                     size="small">
                       <NetworkCellIcon fontSize="small" className={nodeInfo.delay >= 1000? classes.normalPing : classes.succeedPing}/>
                     </IconButton>
                  }
                </HeaderCell>
                <ContentCell>{nodeInfo.delay.toString() + " ms"}</ContentCell>
              </TableRow>
              <TableRow>
                <HeaderCell>上次 Ping 时间: </HeaderCell>
                <ContentCell>{nodeInfo.delayUpdatedAt === undefined? "" : nodeInfo.delayUpdatedAt}</ContentCell>
              </TableRow>
              <TableRow>
                <HeaderCell>
                  Vmess: 
                  <IconButton 
                  className={classes.iconButton} 
                  color="inherit" 
                  aria-label="copy-vmess"
                  size="medium"
                  onClick={() => {
                    navigator.clipboard.writeText(nodeInfo.CodeVmess)
                    setCopySuccess({active: true, msg: `成功复制节点 ${nodeInfo.name} 的 Vmess！`})
                  }}
                  >
                    <EventNoteIcon fontSize="small"/>
                  </IconButton>
                </HeaderCell>
                <ContentCell>{nodeInfo.CodeVmess}</ContentCell>
              </TableRow>
              <TableRow>
                <HeaderCell>描述: </HeaderCell>
                <ContentCell>{nodeInfo.description!}</ContentCell>
              </TableRow>
            </TableBody>
          </Table>
        </AccordionDetails>
      </Accordion>
      <Snackbar 
      open={copySuccess.active} 
      autoHideDuration={5000} 
      onClose={() => {setCopySuccess({active: false, msg: ""})}} 
      anchorOrigin={{"vertical": "bottom", "horizontal": "center"}}>
        <Alert onClose={() => {setCopySuccess({active: false, msg: ""})}} severity="success" variant="filled">
          {copySuccess.msg}
        </Alert>
      </Snackbar>
    </>
  )
}

export default V2NodeItem