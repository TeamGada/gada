import React, { FC, useState, useCallback } from 'react';
import styled from 'styled-components';
import { DateRange } from 'react-date-range';
import { addDays } from 'date-fns'
import ko from 'date-fns/locale/ko';
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const NewPlanDate: FC = () => {
    const [calendar, setCalendar] = useState<any>([
        {
            startDate: new Date(),
            endDate: addDays(new Date(), 1),
            key: "selection",
        },
    ])

    const getDateInput = useCallback((calendar: any) => {
        const start = calendar.startDate.toISOString().split('T')[0];
        const end = calendar.endDate.toISOString().split('T')[0];
        return `${start} ~ ${end}`
    }, [calendar])

    const handleChange = (item: any) => {
      setCalendar(() => {
        return [item.selection]
      })
    }

    return (
        <>
            <DateWrapper>
                <DateLabel
                    htmlFor="title"
                >
                    날짜
                </DateLabel>
                <DateInput
                    type='text'
                    name="date"
                    value={getDateInput(calendar[0])}
                    disabled
                />
            </DateWrapper>

            <DateRangeWrapper
                locale={ko}
                onChange={handleChange}
                moveRangeOnFirstSelection={false}
                ranges={calendar}
                dateDisplayFormat='yyyy.MM.dd'
            />
        </>
    )
}

export default NewPlanDate;

const DateWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const DateLabel = styled.label`
  display: inline-block;
  width: 62.56px;
  color: #60A5F8;
  font-weight: bold;
  font-size: 17px;
  margin-right: 26px;
  letter-spacing: 10px;
  text-align: center;

`
const DateInput = styled.input`
  width: 180px;
  padding: 10px 20px;
  font-size: 15px;
  font-weight: 500;
  border: none;
  border-radius: 5px;
  background-color: #ECF3FD;
  cursor: not-allowed;

  &:focus {outline:none;}
`

const DateRangeWrapper = styled(DateRange)`
  background-color: white;

  .rdrMonth {
    width: 320px;
    height: 250px;
  }

  .rdrMonthAndYearWrapper {
    padding: 0 10px;
  }
  .rdrMonthsVertical {
    margin-left: auto;
    margin-right: auto;
  }

  .rdrDateDisplayWrapper {
    display: none;
  }
`