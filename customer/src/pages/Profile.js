import { Container, Grid } from '@mui/material';
import React, { useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProfileDetails } from 'src/components/profile/ProfileDetails';
import TokenService from 'src/services/TokenService';

const Profile = () => {
  const profile = JSON.parse(TokenService.getLocalProfile('profile'));
  const navigate = useNavigate();
  useLayoutEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      navigate('/login', { replace: true });
    }
  }, [])
  
  return (
    <Container maxWidth="lg">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <ProfileDetails profile={profile}></ProfileDetails>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Profile;