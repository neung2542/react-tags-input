# React Tag Input Component


## Features

- Multiple separator options (comma, semicolon, pipe, space)
- Maximum tags limit
- Duplicate tag prevention
- Click the × button on any tag

## Installation

```bash
npm install
npm run dev
```

OR

Visit Live: [https://react-tags-input-taupe.vercel.app/](https://react-tags-input-taupe.vercel.app/)

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
    />
  );
}
```