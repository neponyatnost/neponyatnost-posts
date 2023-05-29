import { FC } from 'react'

interface ITextInputProps {
  type?: string
  name: string
  value: string
  onChange: ({ currentTarget }: React.FormEvent<HTMLInputElement>) => void
  onClear: () => void
}

const TextInput: FC<ITextInputProps> = ({
  type,
  name,
  value,
  onChange,
  onClear,
}) => {
  return (
    <>
      <div className='input-group mb-3'>
        <input
          type={type}
          value={value}
          onChange={onChange}
          name={name}
          className='form-control'
          placeholder='Search...'
          aria-describedby='button-addon2'
        />
        <button
          onClick={onClear}
          className='btn btn-outline-primary'
          type='button'
          id='button-addon2'
          data-mdb-ripple-color='dark'
        >
          X
        </button>
      </div>
    </>
  )
}

TextInput.defaultProps = {
  type: 'text',
}

export default TextInput
