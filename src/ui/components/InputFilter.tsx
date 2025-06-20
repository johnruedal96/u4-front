import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

interface InputFilterProps {
    value: string,
    setFilter: React.Dispatch<React.SetStateAction<string>>
}

export const InputFilter: React.FC<InputFilterProps> = ({ setFilter, value }) => {
    return (
        <div className="flex justify-end mb-4">
            <div className="relative w-full max-w-md">
                <input
                    type="text"
                    placeholder="Filtrar por id, equipo, ciudad, fase o jugador destacado"
                    className="w-full border border-gray-300 rounded-md py-2 pl-10 pr-3 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    value={value}
                    onChange={(e) => setFilter(e.target.value)}
                />
                <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute top-2.5 left-2.5" />
            </div>
        </div>
    )
}
