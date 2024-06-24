import React from 'react';
import { Box, Stack, Container, Typography, Grid } from '@mui/material'
import QrCodeIcon from '@mui/icons-material/QrCode';
import './App.css';
import QrContainer from './components/qrPreview/QrContainer';
import UrlForm from './components/UrlForm';

function App() {
  const [url, setUrl] = React.useState("");
  const [qrDataUri, setQrDataUri] = React.useState<string>("");

  return (
    <Container>
      <Box p={3}>
        <header>
          <Box p={3}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <QrCodeIcon fontSize="large" /><Typography variant="h5" sx={{ fontWeight: 'bold' }}>QR Generator</Typography>
            </Stack>
          </Box>
        </header>
        <main>
          <Box p={3}>
            <Grid container alignItems="center" spacing={6}>
              <Grid item md={6} sm={12}>
                <UrlForm setUrl={setUrl} setQrDataUri={setQrDataUri} />
              </Grid>
              <Grid item md={6} sm={12}>
                <QrContainer url={url} qrDataUri={qrDataUri} setQrDataUri={setQrDataUri} />
              </Grid>
            </Grid>
          </Box>
        </main>
      </Box>
    </Container>
  );
}

export default App;
