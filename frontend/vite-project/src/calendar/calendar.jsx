import React, { useState } from "react";
import { NavigationBar } from "../navigationBar";
//import Calendar from 'react-calendar';
import dayjs from "dayjs";
import "dayjs/locale/ko";
dayjs.locale("ko");

const ToDoCalendar = () => {
  const today = dayjs();
  const currentMonth = today.format("MMMM");
  const currentYear = today.format("YYYY");
  const daysInMonth = today.daysInMonth();
  const firstDayOfMonth = today.startOf("month").day();

  // 달력에 표시할 날짜들을 생성
  const calendarDays = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push(null); // 달의 첫 날까지 빈 칸으로 채우기
  }
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push(i);
  }

  return (
    <div className="calendar">
      <div className="header">
        {currentMonth} {currentYear}
      </div>
      <div className="body">
        {calendarDays.map((day, index) => (
          <div key={index} className="day">
            {day}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ToDoCalendar;
