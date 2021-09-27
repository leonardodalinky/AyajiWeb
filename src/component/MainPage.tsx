import { Box, Hidden, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { AxiosError, AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import api from "../api/api"
import HitokotoRes from "../api/hitokoto";

const useStyles = makeStyles((theme) => ({
  middle: {
    position: 'absolute', 
    left: '50%', 
    top: '50%',
    minWidth: '90%',
    transform: 'translate(-50%, -50%)'
  },
  textMain: {
    color: "#ffffff",
    wordWrap: "break-word"
  },
}));

const MainPage = () => {
  const classes = useStyles()
  // TODO 看看 visitCount 在哪里显示更好
  const [visitCount, setVisitCount] = useState(-1)
  const [hito, setHito] = useState<HitokotoRes>()
  useEffect(() => {
    // 获取访问信息
    api.statistic.getStatistic().then((res: AxiosResponse<any>) => {
      var data = res.data
      setVisitCount(data['payload']['total'])
    }).catch((error: AxiosError<any>) => {
      console.error(error.response)
    })
    // 每日格言
    api.hitokoto.getHitokoto().then((res) => {
      setHito(res.data)
    }).catch((error: AxiosError<any>) => {
      // TODO
      console.error(error)
    })
  }, [])

  return (
    <>
      <Hidden xsDown>
        <Box className={classes.middle} justifyContent="center" alignContent="center">
          <Box>
            <Typography variant="h1" align="left" className={classes.textMain}>
              「
            </Typography>
            <Typography variant="h3" align="center" className={classes.textMain} style={{marginLeft: "2em", marginRight: "2em"}}>
              {hito?.hitokoto}
            </Typography>
            <Typography variant="h1" align="right" className={classes.textMain}>
              」
            </Typography>
          </Box>
          <Box justifyContent="center" alignContent="center" fontStyle="italic">
            <Typography variant="subtitle1" align="center" className={classes.textMain} style={{fontSize: 22}}>
              选自 {`『 ${hito?.from} 』`}
            </Typography>
            {
              hito?.from_who !== undefined && hito.from_who !== "" && hito.from_who !== null?
              <Typography variant="subtitle2" align="center" className={classes.textMain} style={{fontSize: 18}}>
                —— {hito?.from_who}
              </Typography> : null
            }
          </Box>
        </Box>
      </Hidden>
      <Hidden smUp>
        <Box className={classes.middle} justifyContent="center" alignContent="center">
          <Box>
            <Typography variant="h3" align="left" className={classes.textMain}>
              「
            </Typography>
            <Typography variant="h5" align="center" className={classes.textMain} style={{marginLeft: "2em", marginRight: "2em"}}>
              {hito?.hitokoto}
            </Typography>
            <Typography variant="h3" align="right" className={classes.textMain}>
              」
            </Typography>
          </Box>
          <Box justifyContent="center" alignContent="center" fontStyle="italic">
            <Typography variant="subtitle1" align="center" className={classes.textMain} style={{fontSize: 22}}>
              选自 {`『 ${hito?.from} 』`}
            </Typography>
            {
              hito?.from_who !== undefined && hito.from_who !== "" && hito.from_who !== null?
              <Typography variant="subtitle2" align="center" className={classes.textMain} style={{fontSize: 18}}>
                —— {hito?.from_who}
              </Typography> : null
            }
          </Box>
        </Box>
      </Hidden>
    </>
  )
};

export default MainPage;
