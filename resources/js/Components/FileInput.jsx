import { forwardRef, useRef } from 'react';

export default forwardRef(function FileInput({ value = null, multiple = false, className = '', ...props }, ref) {
    const input = ref ? ref : useRef();

    return (
        <input
            {...props}
            multiple={multiple}
            type={'file'}
            className={
                'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm ' +
                className
            }
            ref={input}
        />
    );
});
