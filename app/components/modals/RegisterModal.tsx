"use client";
import axios from 'axios'
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { toast } from 'react-hot-toast';
import { useCallback, useState } from 'react'
import { FieldValues, useForm, SubmitHandler } from 'react-hook-form'
import Modal from "./Modal";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import Heading from '../Heading';
import Input from '../inputs/Input';
import Button from '../Button';

const RegisterModal = () => {
    const registerModal = useRegisterModal()
    const [isLoading, setIsLoading] = useState(false)

    const { register, handleSubmit, formState: {
        errors
    } } = useForm<FieldValues>({
        defaultValues: {
            name: "",
            email: '',
            password: ""
        }
    })

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true)
        axios.post('/api/register', data).then(() => {
            toast.success('success')
            registerModal.onClose()
        }).catch(error => {
            toast.error('Something went wrong')
        }).finally(() => {
            setIsLoading(false)
        })
    }

    const bodyContent = (
        <form onSubmit={(e) => e.preventDefault()} className='flex flex-col gap-4'>
            <Heading title='Welcome to Airbnb' subTitle='Create an account' />
            <Input id='email' autoComplete='username' type='email' label='Email' disabled={isLoading} register={register} errors={errors} required />
            <Input id='name' type='text' label='Name' disabled={isLoading} register={register} errors={errors} required />
            <Input id='password' autoComplete="new-password" type='password' label='Password' disabled={isLoading} register={register} errors={errors} required />
        </form>
    )

    const footerContent = (
        <div className="flex flex-col gap-4 mt-3">
            <hr />
            <Button outline onClick={() => { }} label='Continue with Google' icon={FcGoogle} />
            <Button outline onClick={() => { }} label='Continue with Github' icon={AiFillGithub} />
            <div className="text-center text-neutral-500 mt-4 font-light">
                <div className="flex flex-row justify-center items-center gap-4">
                    <p>Already have an account</p>
                    <p className='text-neutral-800 cursor-pointer hover:underline'>Log in</p>
                </div>
            </div>
        </div>
    )


    return (
        <Modal disabled={isLoading} title='Register' actionLabel='Create' isOpen={registerModal.isOpen} body={bodyContent} onClose={registerModal.onClose} onSubmit={handleSubmit(onSubmit)} footer={footerContent} />
    )
}
export default RegisterModal