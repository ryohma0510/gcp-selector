import { components, OptionProps } from 'react-select';

interface Item {
  label: string;
  value: string;
}

const Option = (props: OptionProps<Item, false>) => {
  const input = props.selectProps.inputValue;
  const label = props.data.label;

  if (input === "") {
    return <components.Option {...props} />;
  }

  const idx = label.toLowerCase().indexOf(input.toLowerCase());

  return (
    <components.Option {...props}>
      <div>
        <span>{label.slice(0, idx)}</span>
        <span className="highlight">{label.slice(idx, idx + input.length)}</span>
        <span>{label.slice(idx + input.length)}</span>
      </div>
    </components.Option>
  );
};

export default Option;
