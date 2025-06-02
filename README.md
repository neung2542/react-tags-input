# React Tag Input Component


## Features

- Multiple separator options (comma, semicolon, pipe, space)
- Maximum tags limit
- Duplicate tag prevention
- Customizable styling
- Disabled state support
- Responsive design
- Keyboard navigation support

## Installation

```bash
npm install react-tag-input
# or
yarn add react-tag-input
```

## Usage

```tsx
import { TagInput } from './TagInput';

function App() {
  const [tags, setTags] = useState<string[]>([]);

  return (
    <TagInput
      tags={tags}
      onTagsChange={setTags}
      separator=","
      maxTags={5}
      placeholder="Type and press Enter to add tags"
    />
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `tags` | `string[]` | Required | Array of current tags |
| `onTagsChange` | `(tags: string[]) => void` | Required | Callback function when tags change |
| `placeholder` | `string` | "Type and press Enter to add tags" | Input placeholder text |
| `separator` | `string` | "," | Character to separate tags (comma, semicolon, pipe, space) |
| `maxTags` | `number` | undefined | Maximum number of tags allowed |
| `disabled` | `boolean` | false | Disable the tag input |
| `className` | `string` | "" | Custom class for the container |
| `tagClassName` | `string` | "" | Custom class for individual tags |
| `inputClassName` | `string` | "" | Custom class for the input field |

## Features

### Adding Tags
- Type text and press Enter
- Use configured separator (default: comma)
- Click away (blur) to add tag

### Removing Tags
- Click the × button on any tag

### Validation
- Prevents duplicate tags
- Shows error message for duplicate attempts
- Respects maximum tags limit
- Trims whitespace

## Styling

The component comes with default styling but can be customized using className props or by overriding the default styles:

```tsx
<TagInput
  className="custom-container"
  tagClassName="custom-tag"
  inputClassName="custom-input"
/>
```

## Example

```tsx
import { useState } from 'react';
import { TagInput } from './TagInput';

function Example() {
  const [tags, setTags] = useState<string[]>(['react', 'typescript']);

  return (
    <TagInput
      tags={tags}
      onTagsChange={setTags}
      maxTags={5}
      separator=","
      placeholder="Add technologies..."
    />
  );
}
```

## License

MIT

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.