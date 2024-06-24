import React from 'react'
import { Box, Button, Paper, Stack, Typography } from '@mui/material';
import qrCode from "qrcode";
import EditQr from './EditQr';

interface Props {
    url: string,
    qrDataUri: string,
    setQrDataUri: (value: string) => void
}

export default function QrContainer(props: Props) {
    const { url, qrDataUri, setQrDataUri } = props;

    React.useEffect(() => {
        if (typeof url === 'string' && url.length > 0) {
            generateQr()
        }
    }, [url])

    const generateQr = React.useCallback(async (bg: string = "#fff") => {
        const dataUrl = await qrCode.toDataURL(url as string, { scale: 20, margin: 2, color: { dark: '#000', light: bg } });
        setQrDataUri(dataUrl);
    }, [url]);

    const handleDownload = async () => {
        const link = document.createElement('a');
        link.href = qrDataUri;
        link.download = 'qr.jpeg';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    return (
        <Box
            p={2}
            component={Paper}
            variant="outlined"
            display="flex"
            alignItems="center"
            justifyContent="center"
            sx={{ aspectRatio: 1 }}
        >
            {qrDataUri ? (
                <Stack alignItems="center" spacing={2}>
                    <img src={qrDataUri} style={{ width: 300, maxWidth: '100%', aspectRatio: 1 }} />
                    <Stack direction="row" spacing={2}>
                        <Button variant="contained" disableElevation onClick={handleDownload}>Download</Button>
                        <EditQr generateQr={generateQr} />
                    </Stack>
                </Stack>
            ) : (
                <Typography variant="body1" sx={{ opacity: 0.5 }}>
                    The QR will appear here.
                </Typography>
            )}
        </Box>
    )
}
