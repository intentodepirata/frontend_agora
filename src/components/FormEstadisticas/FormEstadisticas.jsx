import { addDays } from "date-fns";

import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { es } from "react-date-range/dist/locale";
import { DateRangePicker } from "react-date-range";
import { useState } from "react";

export default function FormEstadisticas({ setRangeDates, rangeDates }) {
  const [locale, setLocale] = useState("es");

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
