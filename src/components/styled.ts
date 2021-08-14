import styled from "@emotion/styled"

export const CenteredDivStyle = `
    display: flex;
    justify-content: center;
    align-items: center;
`

export const ControlStyle = `
    width: max-content;
    cursor: pointer;
    user-select: none;
`

export const FullSizeStyle = `
    width: 100%;
    height: 100%;
`

export const CenteredDiv = styled.div`
    ${CenteredDivStyle}
`

export const Control = styled(CenteredDiv)`
    ${ControlStyle}
`

export const FullSize = styled.div`
    ${FullSizeStyle}
`
