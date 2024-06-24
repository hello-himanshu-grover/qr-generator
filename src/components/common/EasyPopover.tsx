import React from 'react'
import { Box, Popover } from '@mui/material';

interface AnchorProps {
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

interface PopoverProps {
    handleClose: () => void;
}

interface Props {
    AnchorComponent: React.FC<AnchorProps>,
    PopoverComponent: React.FC<PopoverProps>
}

export default function EasyPopover(props: Props) {
    const { AnchorComponent, PopoverComponent } = props;

    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };  

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    return (
        <>
            <AnchorComponent onClick={handleClick} />
            <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
                }}
            >
                <Box p={2}>
                    <PopoverComponent handleClose={handleClose} />
                </Box>
            </Popover>
        </>
    )
}