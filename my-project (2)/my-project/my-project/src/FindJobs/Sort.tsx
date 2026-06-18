import { useState } from 'react';
import {  Combobox, useCombobox } from '@mantine/core';
import { IconAdjustments } from '@tabler/icons-react';

const opt = ['Relevance', 'Most Recent', 'Salary (Low to High)', 'Salary (HIgh to Low)'];

const Sort=()=> {
  const [selectedItem, setSelectedItem] = useState<string | null>('Relevance');
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const options = opt.map((item) => (
    <Combobox.Option
        className="!text-xs md:!text-sm"
        value={item}
        key={item}
      >
      {item}
    </Combobox.Option>
  ));

  return (
      <Combobox
        store={combobox}
        width={220}
        position="bottom-start"
        onOptionSubmit={(val) => {
          setSelectedItem(val);
          combobox.closeDropdown();
        }}
      >
        <Combobox.Target>
          <div
            onClick={() => combobox.toggleDropdown()}
            className="
              cursor-pointer
              border
              border-bright-sun-400
              gap-2
              flex
              items-center
              justify-between
              px-3
              py-2
              text-xs
              md:text-sm
              rounded-xl
              min-w-[150px]
              md:min-w-[220px]
            "
          >
            {selectedItem}<IconAdjustments className=' h-5 w-5  text-bright-sun-400' />
          </div>
        </Combobox.Target>

        <Combobox.Dropdown>
          <Combobox.Options>{options}</Combobox.Options>
        </Combobox.Dropdown>
      </Combobox>
  
  );
}
export default Sort;
