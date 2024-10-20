import { useRef } from 'react';
import {mergeProps, useCalendarCell, useFocusRing } from 'react-aria';
import { CalendarState } from 'react-stately';
import { CalendarDate, getLocalTimeZone, isSameMonth, isToday } from '@internationalized/date';
import { cn } from '@/lib/utils';

export function CalendarCell({
  state,
  date,
  currentMonth,
  isUnavailable
}: {
  state: CalendarState;
  date: CalendarDate;
  currentMonth: CalendarDate;
  isUnavailable?: boolean;
  }) {

  let ref = useRef(null);
  let {
    cellProps,
    buttonProps,
    isSelected,
    isDisabled,
    formattedDate
  } = useCalendarCell({ date }, state, ref);

  const {focusProps, isFocusVisible} = useFocusRing();

  const isDateToday = isToday(date, getLocalTimeZone());

  const isOutsideOfMonth = !isSameMonth(currentMonth, date);

  const finallyIsDisabled = isDisabled || isUnavailable;

  return (
    <td {...cellProps} className={`py-0.5 px-0.5 relative ${isFocusVisible} ? "z-10" : "z-0"`}>
      <div className="size-10 sm:size-12 outline-none group rounded-md" ref={ref} {...mergeProps(buttonProps, focusProps)}>
        <div className={cn(
          "size-full rounded-sm flex items-center justify-center text-sm font-semibold",finallyIsDisabled ? 'text-muted-foreground cursor-not-allowed' : '', isSelected ? 'bg-primary text-white' : '', !isSelected && !finallyIsDisabled ? 'hover:bg-primary/15 transition-all bg-secondary duration-100' : '', isOutsideOfMonth ? 'hidden' : ""
        )}>
          {formattedDate}
          {isDateToday && (<div className={cn("absolute bottom-2.5 left-1/2 transform -translate-x-1/2 translate-y-1/2 size-1 bg-primary rounded-full", isSelected ? "bg-white" : "")}/>)}
        </div>
      </div>
    </td>
  )
}