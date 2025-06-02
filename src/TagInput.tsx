import React, { useState, type KeyboardEvent, type ChangeEvent } from 'react';

interface TagInputProps {
  tags: string[];
  onTagsChange: (tags: string[]) => void;
  placeholder?: string;
  separator?: string;
  maxTags?: number;
  className?: string;
  tagClassName?: string;
  inputClassName?: string;
  disabled?: boolean;
}

export const TagInput: React.FC<TagInputProps> = ({
  tags,
  onTagsChange,
  placeholder = "Type and press Enter to add tags",
  separator = ",",
  maxTags,
  className = "",
  tagClassName = "",
  inputClassName = "",
  disabled = false,
}) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [error, setError] = useState<boolean>(false);

  const addTags = (values: string[]) => {
    const validValues = values
      .map(value => value.trim())
      .filter(value => value !== '');

    if (validValues.length === 0) return;

    const duplicateValues = validValues.filter(value => tags.includes(value));
    if (duplicateValues.length > 0) {
      setError(true);
      return;
    }

    if (maxTags && tags.length + validValues.length > maxTags) {
      validValues.splice(maxTags - tags.length);
    }

    onTagsChange([...tags, ...validValues]);
  };


  const removeTag = (indexToRemove: number) => {
    onTagsChange(tags.filter((_, index) => index !== indexToRemove));
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();

      // const values = inputValue.split(separator);
      // values.forEach(value => addTag(value));

      // setInputValue("");
      handleSeperator(inputValue);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // if (value.includes(separator)) {
    //   const parts = value.split(separator);
    //   const tagsToAdd = parts.slice(0, -1);

    //   tagsToAdd.forEach(tag => addTag(tag));
    //   setInputValue(parts[parts.length - 1]);
    // } else {
    // }
    setInputValue(value);
    setError(false);
  };

  const handleSeperator = (texts: string) => {
    if (texts.includes(separator)) {
      const separate = texts.split(separator);
      addTags(separate);
      setInputValue("");
    } else {
      if (texts.trim()) {
        addTags([texts]);
        setInputValue("");
      } else {
        setInputValue(texts);
      }
    }
  }


  const handleBlur = () => {
    if (inputValue.trim()) {
      // addTag(inputValue);
      // setInputValue("");
      handleSeperator(inputValue);
    }
  };

  return (
    <div style={{
      border: '1px solid #e5e7eb',
      borderRadius: '12px',
      padding: '20px',
      backgroundColor: '#fafafa',
      position: 'relative',
    }}>
      {error && (
        <div style={{
          position: 'absolute',
          bottom: '0',
          left: '20px',
          right: '0',
          backgroundColor: '#fee2e2',
          color: '#b91c1c',
          borderRadius: '6px',
          textAlign: 'center',
          fontSize: '14px',
          width: 'fit-content',
          padding: '0 8px'
        }}>
          cannot have duplicate tag.
        </div>
      )}
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px',gap: '8px' }}>
        <span style={{ fontSize: '16px', fontWeight: '600' }}>
          Setting:
        </span>
        {separator === ',' ? 'Comma' : separator === ';' ? 'Semicolon' : separator === '|' ? 'Pipe' : 'Space'} separator
        {maxTags ? ` --- Max ${maxTags} tags` : '--- No limit'}
        {tags.length > 0 && ` --- ${tags.length} tag${tags.length === 1 ? '' : 's'}`}
      </div>
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '8px',
        padding: '12px',
        border: '1px solid #d1d5db',
        borderRadius: '8px',
        backgroundColor: 'white',
        minHeight: '44px',
        opacity: disabled ? 0.5 : 1,
        cursor: disabled ? 'not-allowed' : 'text',
      }} className={className}>
        {tags.map((tag, index) => (
          <span
            key={index}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              padding: '4px 8px',
              backgroundColor: '#dbeafe',
              color: '#1e40af',
              fontSize: '14px',
              borderRadius: '6px',
              whiteSpace: 'nowrap'
            }}
            className={tagClassName}
          >
            <span>{tag}</span>
            <button
              type="button"
              onClick={() => removeTag(index)}
              disabled={disabled}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '16px',
                height: '16px',
                border: 'none',
                background: 'transparent',
                cursor: disabled ? 'not-allowed' : 'pointer',
                borderRadius: '50%',
                fontSize: '12px',
                fontWeight: 'bold',
                color: '#1e40af',
                transition: 'background-color 0.2s'
              }}
              onMouseEnter={(e) => {
                if (!disabled) {
                  e.currentTarget.style.backgroundColor = '#bfdbfe';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
              aria-label={`Remove ${tag} tag`}
            >
              ×
            </button>
          </span>
        ))}

        {/* Input field */}
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          placeholder={tags.length === 0 ? placeholder : ""}
          disabled={disabled || !!(maxTags && tags.length >= maxTags)}
          style={{
            flex: '1',
            minWidth: '120px',
            border: 'none',
            outline: 'none',
            backgroundColor: 'transparent',
            fontSize: '14px',
            cursor: disabled || (maxTags && tags.length >= maxTags) ? 'not-allowed' : 'text'
          }}
          className={inputClassName}
        />
      </div>
    </div>
  );
};