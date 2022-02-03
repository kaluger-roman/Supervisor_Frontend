import React, { useState } from "react"
import CalendarRaw from "react-calendar"
import { CalendarProps } from "./types"
import "react-calendar/dist/Calendar.css"
import "./styles.scss"

export const Calendar: React.FC<CalendarProps> = ({ onChange, defaultDate }) => {
    return <CalendarRaw onChange={onChange} value={defaultDate} />
}
