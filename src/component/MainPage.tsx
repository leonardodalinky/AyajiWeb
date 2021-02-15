import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { AxiosError, AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import api from "../api/api"

const useStyles = makeStyles((theme) => ({
  middle: {
    position: 'absolute', 
    left: '50%', 
    top: '50%',
    transform: 'translate(-50%, -50%)'
  },
  textMain: {
    color: "#ffffff"
  },
  textSub: {
    color: "#cccccc"
  }
}));

const MainPage = () => {
  const classes = useStyles()
  const [visitCount, setVisitCount] = useState(-1)
  useEffect(() => {
    api.statistic.GetStatistic().then((res: AxiosResponse<any>) => {
      var data = res.data
      setVisitCount(data['payload']['total'])
    }).catch((error: AxiosError<any>) => {
      console.log(error.response)
    })
    api.statistic.PostAddVisit()
  }, [])

  return (
    <Grid container spacing={2} className={classes.middle}>
      <Grid item xs={12}>
        <Typography variant="h1" align="center" className={classes.textMain}>
          你好，我的朋友
        </Typography>
      </Grid>
      {
        visitCount !== -1?
        <Grid item xs={12}>
          <Typography variant="h3" align="center" className={classes.textSub}>
            已经有 {visitCount} 个人次来过力...
          </Typography>
        </Grid> : null
      }
    </Grid>
  )
};

export default MainPage;