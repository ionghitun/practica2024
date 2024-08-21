import {forwardRef, useRef} from 'react';

export default forwardRef(function SelectInput({options = [], value, className = '', ...props}, ref) {
    const input = ref ? ref : useRef();

    return (
        <select
            {...props}
            className={
                'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm ' +
                className
            }
            ref={input}
            value={value}
        >
            <option value={''}>Please select</option>
            {options.map((option, index) => (
                <option key={index} value={option.id}>{option.name}</option>
            ))}
        </select>
    );
});
