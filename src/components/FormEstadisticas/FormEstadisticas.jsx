import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { es } from "react-date-range/dist/locale";
import { DateRangePicker } from "react-date-range";

export default function FormEstadisticas({ setRangeDates, rangeDates }) {
  return (
    <DateRangePicker
      onChange={(item) => setRangeDates([item.selection])}
      showSelectionPreview={true}
      moveRangeOnFirstSelection={false}
      months={2}
      ranges={rangeDates}
      direction="horizontal"
      locale={es}
    />
  );
}
