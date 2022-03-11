export type IconProps = { icon: string; scale?: number }

export type ButtonProps = {
    disabled?: boolean
    width?: number
    onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
    children?: React.ReactChild | React.ReactChild[]
}
