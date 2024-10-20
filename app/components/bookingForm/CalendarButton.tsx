import { Button } from '@/components/ui/button';
import { AriaButtonProps, useButton } from '@react-aria/button';
import { CalendarState } from '@react-stately/calendar';
import { mergeProps } from '@react-aria/utils';
import { useRef } from 'react';
import { useFocusRing } from '@react-aria/focus';

export function CalendarButton(props: AriaButtonProps<"button"> & {
  state?: CalendarState;
  side?: 'left' | 'right';
}) {

  const ref = useRef(null);
  
  // Event handler
  const { buttonProps } = useButton(props, ref );

  // Styles for the focused button (selected)
  const { focusProps } = useFocusRing()

  return(
    <Button className="mr-3" variant="outline" size="icon" ref={ref} disabled={props.isDisabled} {...mergeProps(buttonProps, focusProps)}>
      {props.children}
    </Button>
  )

}
