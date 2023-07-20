import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Typography
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import TokenService from 'src/services/TokenService';
import {fCurrency} from 'src/utils/formatNumber';
import Page from '../Page';

export const ProfileDetails = (props) => {
  const profile = JSON.parse(TokenService.getLocalProfile('profile'));
  const { t } = useTranslation("translation");
  const data = useSelector(state => state.balance.data);
  const dataLanguage = TokenService.getLocalLanguage();
  return (
    <Page title={t("title_04")}>
      <form
        autoComplete="off"
        noValidate
        {...props}
      >
        <Card>
          <CardHeader
            subheader={t("profile_detail_04")}
            title={t("profile_detail_00")}
          />
          <Divider />
          <CardContent sx={{ px: 5 }}>
            <Grid container spacing={3}>
              <Grid
                container
                item
              >
                <Grid
                  item
                  md={6}
                  xs={6}
                >
                  <Typography variant="body2">
                    {t("profile_detail_01")}
                  </Typography>
                </Grid>
                <Grid
                  item
                  md={6}
                  xs={6}
                >
                  <Typography variant="body2">
                    {profile.username}
                  </Typography>
                </Grid>
              </Grid>
              <Grid
                container
                item            >
                <Grid
                  item
                  md={6}
                  xs={6}
                >
                  <Typography variant="body2">
                    Email:
                  </Typography>
                </Grid>
                <Grid
                  item
                  md={6}
                  xs={6}
                >
                  <Typography variant="body2">
                    {profile.email}
                  </Typography>
                </Grid>
              </Grid>
              <Grid
                container
                item
              >
                <Grid
                  item
                  md={6}
                  xs={6}
                >
                  <Typography variant="body2">
                    {t("profile_detail_02")}
                  </Typography>
                </Grid>
                <Grid
                  item
                  md={6}
                  xs={6}
                >
                  <Typography variant="body2" sx={{ display: "inline-block", mr: 1, color: '#000' }}>
                  {dataLanguage === 'vie' ?
                        <>
                          {fCurrency(data.balance)}
                        </>
                        :
                        <>
                          {fCurrency(data.balance / 24000)}
                        </>
                      }
                  </Typography>
                  <span>{t("$")}
                  </span>
                </Grid>
              </Grid>
              <Grid
                container
                item
              >
                <Grid
                  item
                  md={6}
                  xs={6}
                >
                  <Typography variant="body2">
                    {t("profile_detail_03")}
                  </Typography>
                </Grid>
                <Grid
                  item
                  md={6}
                  xs={6}
                >
                  <Button variant="contained" color={(profile.status === 'ACTIVE' && 'success') || 'error'} sx={{ cursor: 'default', color: '#fff' }}>
                    {(profile.status)}
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
          <Divider />
        </Card>
      </form>
    </Page>


  );
};