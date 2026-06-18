import { useEffect, useState } from 'react';
import { Combobox, InputBase, ScrollAreaAutosize, useCombobox } from '@mantine/core';

const SelectInput = (props: any) => {
    const [data, setData] = useState<string[]>([]);
    
    useEffect(() => {
        setData(props.options);
    }, [props.options]);

    const combobox = useCombobox({
        onDropdownClose: () => combobox.resetSelectedOption(),
    });

    const [search, setSearch] = useState(props.value || '');

    useEffect(() => {
        setSearch(props.value || '');
    }, [props.value]);

    const exactOptionMatch = data.some((item) => item === search);
    const filteredOptions = data.filter((item) => item.toLowerCase().includes(search.toLowerCase().trim()));

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
                const newValue = val === '$create' ? search : val;
                if (val === '$create') {
                    setData((current) => [...current, search]);
                }
                props.onChange(newValue);
                setSearch(newValue);
                combobox.closeDropdown();
            }}
        >
            <Combobox.Target>
                <InputBase withAsterisk className='[&_input]:font-medium'
                    label={props.label}
                    rightSection={<Combobox.Chevron />}
                    value={search}
                    onChange={(event) => {
                        combobox.openDropdown();
                        combobox.updateSelectedOptionIndex();
                        setSearch(event.currentTarget.value);
                    }}
                    onBlur={() => {
                        combobox.closeDropdown();
                        setSearch(props.value || '');
                        if (props.onBlur) props.onBlur();
                    }}
                    onClick={() => combobox.openDropdown()}
                    onFocus={() => combobox.openDropdown()}
                    error={props.error}
                    placeholder={props.placeholder}
                    rightSectionPointerEvents="none"
                />
            </Combobox.Target>

            <Combobox.Dropdown>
                <Combobox.Options>
                    <ScrollAreaAutosize mah={200} type="scroll">
                        {options.length > 0 ? options : <Combobox.Empty>Nothing found</Combobox.Empty>}
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