import React from 'react';
import EasyPopover from '../common/EasyPopover';
import { Box, Button, Stack, Typography } from '@mui/material';
import { SketchPicker } from 'react-color';
import ColorPicker from '../common/ColorPicker';

interface Props {
    generateQr: (bg: string) => void;
}

const EditQr = React.memo((props: Props) => {
    const { generateQr } = props;

    return (
        <EasyPopover
            AnchorComponent={React.memo(({ onClick }) => (
                <Button onClick={onClick} variant="outlined">Background</Button>
            ))}
            PopoverComponent={React.memo(({ handleClose }) => (
                <Box sx={{
                    '& .sketch-picker': {
                        border: '0 !important',
                        boxShadow: 'none !important',
                        padding: '0 !important',
                        marginBottom: '-10px'
                    }
                }}>
                    <ColorPicker onChange={generateQr} />
                </Box>
            ))}
        />
    );
});

export default EditQr;
