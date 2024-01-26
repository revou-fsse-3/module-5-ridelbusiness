import { useMemo } from "react";


interface Props{
    label: string;
    className?: string;
    onClick: () => void;
    variant?: 'primary' | 'secondary';

}

const  Button = ({ label, className, onClick, variant = 'primary' } : Props) => {

    const style = useMemo(
        () => {
            if( variant === 'primary'){
                return 'bg-blue-500 btn overflow-hidden relative w-64  text-white py-4 px-4 rounded-xl font-bold uppercase -- before:block before:absolute before:h-full before:w-full before:bg-red-300 before:left-0 before:top-0 before:-translate-y-full hover:before:translate-y-0 before:transition-transform';
            }
            return 'btn-default overflow-hidden relative w-64 bg-stone-50 text-gray-900 py-4 px-4 rounded-xl font-bold uppercase transition-all duration-100 -- hover:shadow-md border border-stone-100 hover:bg-gradient-to-t hover:from-stone-100 before:to-stone-50 hover:-translate-y-[3px]';
        },
        [variant]
    )

    return (
        <button className={`${className} ${style} `} onClick={onClick}>{label}</button>
    );
}

export default Button;