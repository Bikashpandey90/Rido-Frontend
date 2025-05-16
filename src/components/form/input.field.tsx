import { useController } from "react-hook-form"
import { Textarea } from "../ui/textarea"


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
    NUMBER = 'number',
    TIME = 'time',
    SELECT = 'select'
}
export interface TextInputFieldProps {
    control: any,
    name: string,
    errMsg: string,
    type?: InputType,
    placeholder?: string,
    className?: string,
    id?: string,
    options?: { label: string; value: string }[] // Add this line to support select options
    defaultValue?: string // Optional: add defaultValue for selects
    onChangeEvent?: (event: React.ChangeEvent<HTMLInputElement>) => void


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

// export const LocationInputField = ({ control, errMsg, name, type = InputType.TEXT, placeholder, className = '', id, onChangeEvent }: TextInputFieldProps) => {

//     const { field } = useController({
//         control: control,
//         name: name,




//     });
//     return (<>
//         <input
//             className={`flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm ${className}`}
//             placeholder={placeholder}
//             type={type}
//             {...field}
//             id={id}
//             onChange={onChangeEvent || (() => { })}


//         />
//         <span className="text-red-400">
//             {errMsg}
//         </span>
//     </>)

// }
export interface LocationInputFieldProps extends Omit<TextInputFieldProps, "type"> {
    onLocationSelect?: () => void
    icon?: React.ReactNode
    disabled?: boolean
}

export const LocationInputField = ({
    control,
    errMsg,
    name,
    placeholder,
    className = "",
    onLocationSelect,
    icon,
    disabled = false,
}: LocationInputFieldProps) => {
    const { field } = useController({
        control: control,
        name: name,
    })

    return (
        <div className="relative">
            <input
                className={`flex h-10 w-full rounded-md border border-input bg-transparent pl-3 pr-10 py-2 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm ${className}`}
                placeholder={placeholder}
                type="text"
                disabled={disabled}
                {...field}
            />
            {icon && (
                <button
                    type="button"
                    onClick={onLocationSelect}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                >
                    {icon}
                </button>
            )}
            {errMsg && <span className="text-red-400 text-xs mt-1 block">{errMsg}</span>}
        </div>
    )
}
export interface TextAreaFieldProps {
    name: string,
    control: any,
    defaultValue?: string,
    errMsg?: string,
    placeholder?: string,
    className?: string,
    rows?: number,


}

export const TextAreaField = ({ control, name, defaultValue = '', placeholder, errMsg = '', className = '', rows = 4 }: TextAreaFieldProps) => {
    const { field } = useController({
        control: control,
        name: name,
        defaultValue: defaultValue
    })
    return (<>
        <Textarea
            placeholder={placeholder}
            {...field}
            rows={rows}
            className={className}
        />
        <span className="text-red-500 text-sm">{errMsg}</span>


    </>)

}


