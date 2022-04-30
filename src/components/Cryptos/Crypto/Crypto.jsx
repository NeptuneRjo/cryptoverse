import React from 'react';
import { Link } from 'react-router-dom';

import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material'
import { styled } from '@mui/material/styles';

const Crypto = ({ coinData }) => {

  const CustomizedCard = styled(Card)`
    color: #fff;
    background: #303030;
    height: 130px;
  `;

  const CustomizedCardContent = styled(CardContent)`
    background: #3f51b5;
  `;

  return (
    <Link to={`/crypto/${coinData.uuid}`}               
      data-testid='crypto-item'
    >
      <CustomizedCard width={100}>
        <CardActionArea
          sx={{
            display: 'flex',
            flexDirect: 'row-reverse',
            justifyContent: 'space-between',
            background: 'transparent'
          }}
        >
          <CardContent
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '50%',
              height: '100%',
              background: 'transparent'
            }}
          >
            <CardMedia 
              component='img'
              image={coinData.iconUrl}
              alt='coin icon'
              sx={{
                height: '35px',
                width: '35px',
                background: 'transparent'
              }}
          />
          </CardContent>
          <CustomizedCardContent 
            sx={{
              width: '50%',
              height: '100px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRight: 'solid 2px #303030'
            }}
          >
            <Typography 
              variant='h6' 
              component='div' 
              backgroundColor='transparent'
            >
              {coinData.name}
            </Typography>
          </CustomizedCardContent>
        </CardActionArea>
        </CustomizedCard>
    </ Link>
  )
}

export default Crypto