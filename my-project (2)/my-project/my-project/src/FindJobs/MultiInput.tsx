import { useEffect, useState } from 'react';
import { Checkbox, Combobox, Group, Input, Pill, PillsInput, useCombobox } from '@mantine/core';
import { IconSelector } from '@tabler/icons-react';

const MultiInput=(props:any)=> {
    useEffect(()=>{
            setData(props.options);
    },[props.options])

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
    onDropdownOpen: () => combobox.updateSelectedOptionIndex('active'),
  });

  const [search, setSearch] = useState('');
  const [data, setData] = useState<string[]>([]);
  const value = props.value || [];

  const exactOptionMatch = data.some((item: string) => item === search);

  const handleValueSelect = (val: string) => {
    setSearch('');
    let newValue;
    if (val === '$create') {
      setData((current) => [...current, search]);
      newValue = [...value, search];
    } else {
      newValue = value.includes(val) ? value.filter((v: any) => v !== val) : [...value, val];
    }
    props.onChange(newValue);
  };

  const handleValueRemove = (val: string) => {
    const newValue = value.filter((v: any) => v !== val);
    props.onChange(newValue);
  };

  const values = value
    .slice(0,1)
   .map((item: string) => (
      <Pill key={item} withRemoveButton onRemove={() => handleValueRemove(item)}>
        {item}
      </Pill>
    ));

  const options = data .filter((item: string) =>
  item.toLowerCase().includes(search.trim().toLowerCase())
  )
  .map((item) => (
    <Combobox.Option value={item} key={item} active={value.includes(item)}>
      <Group gap="sm">
        <Checkbox size='xs' color='bright-sun.4'
          checked={value.includes(item)}
          onChange={() => {}}
          aria-hidden
          tabIndex={-1}
          style={{ pointerEvents: 'none' }}
        />
        <span className='text-mine-shaft-300'>{item}</span>
      </Group>
    </Combobox.Option>
  ));
  return (
    <Combobox store={combobox} onOptionSubmit={handleValueSelect} withinPortal={false}>
      <Combobox.DropdownTarget>
        <PillsInput className="w-full" variant='unstyled' rightSection={<IconSelector/>} onClick={() => combobox.toggleDropdown()}
            leftSection={
                <div className='text-bright-sun-400 p-1 bg-mine-shaft-900 rounded-full mr-2 shrink-0'>
                    <props.icon/>
                </div>
            }
        >
          <Pill.Group>
            {value.length > 0 ? (
              <>
                {values}
                {value.length >1 && (
                  <Pill>+{value.length - 1} more</Pill>
                )}
              </>
            ) : (
              <Input.Placeholder className='!text-mine-shaft-200'>{props.title}</Input.Placeholder>
            )}
          </Pill.Group>
        </PillsInput>
      </Combobox.DropdownTarget>

      <Combobox.Dropdown>
      <Combobox.Search
            value={search}
            onChange={(event) => setSearch(event.currentTarget.value)}
            placeholder={`Search ${props.title}`}
          />
        <Combobox.Options>
          {options}

          {!exactOptionMatch && search.trim().length > 0 && (
            <Combobox.Option value="$create">+ Create {search}</Combobox.Option>
          )}

          {exactOptionMatch && search.trim().length > 0 && options.length === 0 && (
            <Combobox.Empty>Nothing found</Combobox.Empty>
          )}
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}
export default MultiInput;