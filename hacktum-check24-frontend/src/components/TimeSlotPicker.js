import React, { useState } from "react";
import "./TimeSlotPicker.css";

const generateAvailability = () => {
  return Array.from({ length: 9 }, () => Math.random() >= 0.5);
};

const TimeSlotPicker = ({ onTimeSelect }) => {
  const [selectedTime, setSelectedTime] = useState(null);
  const [availability] = useState(generateAvailability());

  const timeSlots = [
    "09:00 - 10:00",
    "10:00 - 11:00",
    "11:00 - 12:00",
    "12:00 - 13:00",
    "13:00 - 14:00",
    "14:00 - 15:00",
    "15:00 - 16:00",
    "16:00 - 17:00",
    "17:00 - 18:00",
  ];

  const handleTimeClick = (timeIndex) => {
    if (availability[timeIndex]) {
      setSelectedTime(timeSlots[timeIndex]);
      onTimeSelect(timeSlots[timeIndex]);
    }
  };

  return (
    <div className="timeslot-picker">
      {timeSlots.map((time, index) => (
        <button
          key={time}
          className={`timeslot ${availability[index] ? "" : "unavailable"} ${
            selectedTime === time ? "selected" : ""
          }`}
          onClick={() => handleTimeClick(index)}
          disabled={!availability[index]}
        >
          {time}
        </button>
      ))}
    </div>
  );
};

export default TimeSlotPicker;
