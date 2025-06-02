import { useState } from 'react'

import './App.css'
import { TagInput } from './TagInput.tsx'

interface TagInputConfig {
  id: string;
  separator: string;
  maxTags?: number;
  tags: string[];
}

interface ConfigFormProps {
  onSubmit: (config: Omit<TagInputConfig, 'id' | 'tags'>) => void;
}

const ConfigForm: React.FC<ConfigFormProps> = ({ onSubmit }) => {
  const [config, setConfig] = useState({
    separator: ',',
    maxTags: '',
  });

  const handleSubmit = () => {

    onSubmit({
      separator: config.separator,
      maxTags: config.maxTags ? parseInt(config.maxTags) : undefined,
    });

    setConfig({
      separator: ',',
      maxTags: '',
    });
  };

  return (
    <div style={{
      border: '1px solid #e5e7eb',
      borderRadius: '12px',
      padding: '20px',
      backgroundColor: '#fafafa',
      position: 'relative',
    }}>
      <div style={{
        // backgroundColor: 'white',
        // padding: '24px',
        // borderRadius: '12px',
        // boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
        // width: '100%',
        // maxWidth: '500px',
        // margin: '20px'
      }}>
        <h3 style={{ margin: '0 0 20px 0', fontSize: '20px', fontWeight: '600' }}>
          Configure New Tag Input
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '12px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '4px', fontWeight: '500' }}>
                Separator
              </label>
              <select
                value={config.separator}
                onChange={(e) => setConfig({ ...config, separator: e.target.value })}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '14px'
                }}
              >
                <option value=",">Comma (,)</option>
                <option value=";">Semicolon (;)</option>
                <option value="|">Pipe (|)</option>
                <option value=" ">Space</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '4px', fontWeight: '500' }}>
                Max Tags
              </label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <input
                  type="number"
                  value={config.maxTags}
                  onChange={(e) => setConfig({ ...config, maxTags: e.target.value })}
                  placeholder="No limit"
                  min="1"
                  max="100"
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '14px'
                  }}
                />
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '8px' }}>
            <button
              type="button"
              onClick={handleSubmit}
              style={{
                padding: '12px 24px',
                backgroundColor: '#3b82f6',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '500',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              +  Add New Tag Input
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [tagInputs, setTagInputs] = useState<TagInputConfig[]>([
    {
      id: 'default-1',
      separator: ',',
      maxTags: 10,
      tags: ['test1', 'test2']
    }
  ]);

  const addNewTagInput = (config: Omit<TagInputConfig, 'id' | 'tags'>) => {
    const newTagInput: TagInputConfig = {
      ...config,
      id: `tag-input-${Date.now()}`,
      tags: []
    };

    setTagInputs([...tagInputs, newTagInput]);
  };

  const updateTagInputTags = (id: string, tags: string[]) => {
    console.log(`Updating tags for input ${id}:`, tags);

    setTagInputs(tagInputs.map(input =>
      input.id === id ? { ...input, tags } : input
    ));
  };

  return (
    <div className='main-container'>
      <div>
        <h1>
          Tag Input
        </h1>

      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {tagInputs.map((input) => (
          <div key={input.id} >

            <TagInput
              tags={input.tags}
              onTagsChange={(tags) => updateTagInputTags(input.id, tags)}
              separator={input.separator}
              maxTags={input.maxTags}
            />
          </div>
        ))}
      </div>

      <ConfigForm
        onSubmit={addNewTagInput}
      />
    </div>
  );
};

export default App;
