import React from 'react'
import { SketchPicker } from 'react-color';

interface Props {
    onChange: (newColor: string) => void
}

export default function ColorPicker(props: Props) {
    const { onChange } = props;
    const [color, setColor] = React.useState<string>('');

    return (
        <SketchPicker disableAlpha={true} color={color} onChange={({hex}) => {setColor(hex); onChange(hex)}} />
    )
}
