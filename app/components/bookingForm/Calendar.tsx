"use client"

import { useCalendar, useLocale } from 'react-aria';
import { useCalendarState } from 'react-stately';
import { createCalendar } from '@internationalized/date';
import { CalendarProps, DateValue } from '@react-types/calendar';
import { CalendarHeader } from './CalendarHeader';
import { CalendarGrid } from './CalendarGrid';

export function Calendar(props: CalendarProps<DateValue> & { isDateUnavailable?: (date: DateValue) => boolean}) {
  
  // It formats the calendar accordingly to the region of the user
  const {locale} = useLocale()

  // Manages the internal state of the calendar, 1 month at the time
  let state = useCalendarState({
    ...props,
    visibleDuration: {months: 1},
    locale,
    createCalendar,
  })
  

  // Makes sure that the calendar is accessible to the user, with those values
  let { calendarProps, prevButtonProps, nextButtonProps, title } = useCalendar(
    props,
    state
  );

  return(
    <div {...calendarProps} className="inline-block">
      <CalendarHeader state={state} calendarProps={calendarProps} nextButtonProps={nextButtonProps} prevButtonProps={prevButtonProps} /> 

      <div className="flex gap-8">
        <CalendarGrid state={state} isDateUnavailable={props.isDateUnavailable}/>
      </div>
    </div>
  )
}
