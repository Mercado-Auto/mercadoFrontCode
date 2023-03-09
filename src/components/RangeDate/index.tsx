import { useEffect } from "react";
import { DatePicker } from "antd";
import { isFuture, subMonths } from "date-fns";
import { RangePickerProps } from "antd/lib/date-picker";

interface RangeDateProps {}

const { RangePicker } = DatePicker;

const RangeDate: React.FC<RangeDateProps> = () => {
  const disabledDate: RangePickerProps["disabledDate"] = (current) => {
    return current && isFuture(current.toDate());
  };

  // UseReadDashboardData({
  //   end_date: new Date(),
  //   initial_date: subMonths(new Date(), 1),
  // });

  const onSubmit = (values: { startDate: Date; endDate: Date } | null) => {};

  useEffect(() => {
    // onSubmit(null);
  }, []);

  return (
    <RangePicker
      onChange={(values) => {
        onSubmit(
          values
            ? {
                endDate: (values[0] as any).toDate(),
                startDate: (values[1] as any).toDate(),
              }
            : null
        );
      }}
      format="DD-MM-YYYY"
      disabledDate={disabledDate}
    />
  );
};

export default RangeDate;
