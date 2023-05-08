import React from 'react'
import { useForm } from 'react-hook-form';

// ContactForm component
const ContactForm = () => {
    // Form validation
    const {
        register,
        trigger,
        formState: { errors }
    } = useForm();

    // Submit form
    const onSubmit = async (e) => {
        const isValid = await trigger();
        if (!isValid) {
            e.preventDefault();
        }
    }

    return (
        <div className='mt-10 md:mt-2'>
            <form
                target='_blank'
                onSubmit={onSubmit}
                action='https://formsubmit.co/86a0455a2ddfdeedd188dc81a10788d9'
                method='POST'
            >
                {/* Name input for form submission */}
                <input
                    className='w-full bg-dark font-semibold placeholder-light/75 p-3 rounded-lg
                        dark:bg-light dark:placeholder-dark/75'
                    type='text'
                    placeholder='NAME'
                    {...register("name", {
                        required: true,
                        maxLength: 100,
                    })} />
                {
                    // Error handling for name input
                    errors.name && (
                        <p className='text-primary dark:text-primaryDark font-semibold'>
                            {errors.name.type === 'required' && "This field is required."}
                            {errors.name.type === 'maxLength' && "Max length exceeded."}
                        </p>
                    )
                }
                {/* Email input for form submission */}
                <input
                    className='w-full bg-dark font-semibold placeholder-light/75 p-3 mt-5 rounded-lg
                        dark:bg-light dark:placeholder-dark/75'
                    type='text'
                    placeholder='EMAIL'
                    {...register("email", {
                        required: true,
                        pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    })}
                />
                {
                    // Error handling for email input
                    errors.email && (
                        <p className='text-primary dark:text-primaryDark font-semibold'>
                            {errors.email.type === 'required' && "This field is required."}
                            {errors.email.type === 'pattern' && "Invalid email address"}
                        </p>
                    )
                }
                {/* Message input for form submission */}
                <textarea
                    className='w-full bg-dark font-semibold placeholder-light/75 p-3 mt-5 rounded-lg
                        dark:bg-light dark:placeholder-dark/75'
                    type='text'
                    placeholder='MESSAGE'
                    rows="4"
                    cols="50"
                    {...register("message", {
                        required: true,
                        maxLength: 2000,
                    })}
                />
                {
                    // Error handling for message input
                    errors.message && (
                        <p className='text-primary dark:text-primaryDark font-semibold'>
                            {errors.message.type === 'required' && "This field is required."}
                            {errors.message.type === 'maxLength' && "Max length exceeded. 2000 characters allowed."}
                        </p>
                    )
                }
                <button
                    type='submit'
                    className='flex items-center bg-dark text-light p-2.5 px-6
                            rounded-lg text-lg font-semibold hover:bg-light hover:text-dark my-5
                            border-2 border-solid border-transparent hover:border-dark dark:bg-light dark:text-dark
                            hover:dark:bg-dark hover:dark:text-light hover:dark:border-light md:p-2 md:px-4 md:text-base'>
                    Submit
                </button>
            </form>
        </div>
    )
}

export default ContactForm