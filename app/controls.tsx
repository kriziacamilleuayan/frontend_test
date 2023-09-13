import { useEffect, useState } from "react";
import Select, { SingleValue } from "react-select";

type ControlsProps = {
  handleSort: (sort: string, sortDir: string) => void;
  sortDir: String | null;
  sort: String | null;
};
export type SortProps = SingleValue<{ label: string; value: string; }>

export const fieldOptions = [
  { label: "Name", value: "name" },
  { label: "Company", value: "company" },
  { label: "Email", value: "email" },
];

export const directionOptions = [
  { label: "Ascending", value: "ascending" },
  { label: "Descending", value: "descending" },
];

const Controls = ({handleSort, sortDir, sort}: ControlsProps) => {
  const [isMounted, setIsMounted] = useState(false);

  const controlHandleSort = (option: SortProps | null, name: string) => {
    if(option?.value) {
      handleSort(option.value, name);
    }
  };

  useEffect(() => setIsMounted(true), []);
  
  const sortValue = sort ? fieldOptions.filter(item => item.value === sort) : null;
  const dirValue = sortDir ? directionOptions.filter(item => item.value === sortDir) : null;

  return (
    <div className="gallery-controls controls">
      <div className="form-group group">
        <label htmlFor="sort-field" className="label">
          Sort Field
        </label>
       {isMounted ? <Select options={fieldOptions} 
          inputId="sort-field" 
          className="input" 
          name="sort-field"
          value={sortValue}
          onChange={(data) => controlHandleSort(data, "sort-field")}
        /> : null}
      </div>
      <div className="form-group group">
        <label htmlFor="sort-direction" className="label">
          Sort Direction
        </label>
        {isMounted ? <Select
          options={directionOptions}
          inputId="sort-direction"
          className="input"
          value={dirValue}
          onChange={(data) => controlHandleSort(data, "sort-direction")}
        /> : null}
      </div>
    </div>
  );
};

export default Controls;
