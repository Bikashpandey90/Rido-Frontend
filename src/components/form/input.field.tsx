import { useController } from "react-hook-form"


interface LabelProps {
    htmlFor: string,
    children: any
}
export const InputLabel = ({ htmlFor, children }: LabelProps) => {
    return (<>
        <label className="text-sm font-medium" htmlFor={htmlFor}>
            {children}
        </label>

    </>)
}
export enum InputType {
    TEXT = 'text',
    EMAIL = 'email',
    PASSWORD = 'password',
    DATE = 'date',
    URL = 'url',
    TEL = 'tel',
    FILE = 'file',
    NUMBER = 'number'
}
export interface TextInputFieldProps {
    control: any,
    name: string,
    errMsg: string,
    type?: InputType,
    placeholder?: string,
    className?: string,


}
export const TextInputField = ({ control, errMsg, name, type = InputType.TEXT, placeholder, className = '' }: TextInputFieldProps) => {

    const { field } = useController({
        control: control,
        name: name,



    });
    return (<>
        <input
            className={`flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm ${className}`}
            placeholder={placeholder}
            type={type}
            {...field}


        />
        <span className="text-red-400">
            {errMsg}
        </span>
    </>)

}