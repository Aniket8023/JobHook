import { useEffect, useState } from 'react';
import { Combobox, InputBase, ScrollAreaAutosize, useCombobox } from '@mantine/core';

const SelectInput=(props:any)=> {
        useEffect(()=>{
            setData(props.options);
            setValue(props.value);
            setSearch(props.value);
            

        }, [])
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const [data, setData] = useState<string[]>([]);
  const [value, setValue] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  const exactOptionMatch = data.some((item) => item === search);
  const filteredOptions = exactOptionMatch
    ? data
    : data.filter((item) => item.toLowerCase().includes(search.toLowerCase().trim()));

  const options = filteredOptions.map((item) => (
    <Combobox.Option value={item} key={item}>
      {item}
    </Combobox.Option>
  ));

  return (
    <Combobox
      store={combobox}
      withinPortal={false}
      onOptionSubmit={(val) => {
        if (val === '$create') {
          setData((current) => [...current, search]);
          setValue(search);
          props.onChange?.(search);
        } else {
          setValue(val);
          setSearch(val);
          props.onChange?.(val);
        }

        combobox.closeDropdown();
      }}
    >
      <Combobox.Target>
        <InputBase withAsterisk
        leftSection={<props.leftSection stroke={1.5}/>}
        label={props.label}
          rightSection={<Combobox.Chevron />}
          value={search}
          onChange={(event) => {
            combobox.openDropdown();
            combobox.updateSelectedOptionIndex();
            setSearch(event.currentTarget.value);
          }}
          onClick={() => combobox.openDropdown()}
          onFocus={() => combobox.openDropdown()}
          onBlur={() => {
            combobox.closeDropdown();
            setSearch(value || '');
          }}
          placeholder={props.placeholder}
          rightSectionPointerEvents="none"
        />
      </Combobox.Target>

      <Combobox.Dropdown>
        <Combobox.Options>
            <ScrollAreaAutosize mah={200} type="scroll">
          {options}
          {!exactOptionMatch && search.trim().length > 0 && (
            <Combobox.Option value="$create">+ Create {search}</Combobox.Option>
          )}
            </ScrollAreaAutosize>
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}
export default SelectInput;