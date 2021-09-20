import React from 'react';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import TextField from '@mui/material/TextField';

export default function CalendarSelector({value, setValue} ) {
 const date = new Date()

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DateTimePicker
          renderInput={(params) => <TextField {...params} />}
          label="Seleccina fecha y hora de la Meetup"
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
          }}
          maxDate={date.setDate(date.getDate() + 15)}
          minDate={date.setDate(date.getDate() - 15)}

        />
    </LocalizationProvider>
  );
}
