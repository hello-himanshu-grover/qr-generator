import React, { useState } from 'react';
import { Button, FormGroup, InputLabel, Stack, TextField } from '@mui/material';
import validator from 'validator';

interface Props {
    setUrl: (value: string) => void,
    setQrDataUri: (value: string) => void
}

interface FormData {
    upiId: string,
    name: string,
    amount: number,
}

interface ValidationResult {
    valid: boolean;
    message: string;
}

function validateUPILink(url: string): ValidationResult {
    // Regular expression to match the UPI URL format
    const upiRegex = /^upi:\/\/pay\?pa=([a-zA-Z0-9.\-_]+@[a-zA-Z0-9]+)&pn=([^&]+)&am=([0-9]+(?:\.[0-9]{1,2})?)&cu=INR$/;

    // Test the URL against the regex
    const match = url.match(upiRegex);

    // If match is null, the URL is invalid
    if (!match) {
        return { valid: false, message: "Invalid Details." };
    }

    // Extract matched groups
    const [, vpa, name, amount] = match;

    // Additional validation for VPA (Virtual Payment Address)
    if (!/^[a-zA-Z0-9.\-_]+@[a-zA-Z0-9]+$/.test(vpa)) {
        return { valid: false, message: "Invalid UPI Id." };
    }

    // Additional validation for amount (should be a positive number)
    if (isNaN(Number(amount)) || Number(amount) <= 0) {
        return { valid: false, message: "Amount should be a positive number." };
    }

    // Additional validation for currency (should be INR)
    if (url.indexOf("&cu=INR") === -1) {
        return { valid: false, message: "Currency should be INR." };
    }

    // If all checks pass, the URL is valid
    return { valid: true, message: "UPI link is valid." };
}


export default function UrlForm(props: Props) {
    const { setUrl, setQrDataUri } = props;
    const [formData, setFormData] = useState<FormData>({ upiId: '', name: '', amount: 0 });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const upiUrl = `upi://pay?pa=${formData.upiId}&pn=${formData.name}&am=${formData.amount}&cu=INR`;
        const validation = validateUPILink(upiUrl);
        if (validation?.valid) {
            setUrl(upiUrl);
        } else {
            alert(validation?.message || 'Invalid Details');
        }
    };

    React.useEffect(() => {
        setQrDataUri('');
    }, [formData])

    return (
        <form onSubmit={handleSubmit} autoComplete="off">
            <Stack spacing={2}>
                <FormGroup>
                    <InputLabel>Your UPI ID</InputLabel>
                    <TextField
                        name="upiId"
                        size="small"
                        placeholder="Enter your UPI Id here..."
                        value={formData.upiId}
                        onChange={(e) => setFormData(prevState => ({ ...prevState, upiId: e.target.value }))}
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <InputLabel>Your Name</InputLabel>
                    <TextField
                        name="upiId"
                        size="small"
                        placeholder="Enter your Name here..."
                        value={formData.name}
                        onChange={(e) => setFormData(prevState => ({ ...prevState, name: e.target.value }))}
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <InputLabel>Amount</InputLabel>
                    <TextField
                        name="upiId"
                        size="small"
                        placeholder="Enter amount here..."
                        value={formData.amount}
                        onChange={(e) => setFormData(prevState => ({ ...prevState, amount: parseInt(e.target.value) }))}
                        required
                    />
                </FormGroup>
                <Button variant="contained" type="submit" disableElevation>
                    Generate
                </Button>
            </Stack>
        </form>
    );
}
