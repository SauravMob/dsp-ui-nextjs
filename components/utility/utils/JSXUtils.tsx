import { AlertTriangle, Clock, Pause, PauseCircle, Play, Trash, Trash2, X } from "lucide-react"

export function handleStatus(status: string) {
    if (status === 'ACTIVE') return <PauseCircle className='mr-2' size={18} />
    else if (status === 'PAUSE') return <Play className='mr-2' size={18} />
    else if (status === 'INACTIVE') return <Play className='mr-2' size={18} />
    else return <Trash2 size={16} />
}

export const getStatusAvatar = (s: string) => {
    switch (s) {
        case 'ACTIVE':
            return <div className="bg-green-600 rounded-full p-[10px] flex justify-center"><Play color="darkGreen" size={20} strokeWidth={3}/></div>
        case 'INACTIVE':
            return <div className="bg-orange-600 rounded-full p-[10px] flex justify-center"><AlertTriangle color="orange" size={20} strokeWidth={3}/></div>
        case 'PAUSE':
            return <div className="bg-blue-300 rounded-full p-[10px] flex justify-center"><Pause color="blue" size={20} strokeWidth={3}/></div>
        case 'DELETE':
            return <div className="bg-red-400 rounded-full p-[10px] flex justify-center"><Trash color="darkRed" size={20} strokeWidth={3}/></div>
        case 'DELETED':
            return <div className="bg-red-400 rounded-full p-[10px] flex justify-center"><Trash color="darkRed" size={20} strokeWidth={3}/></div>
        case 'REJECTED':
            return <div className="bg-orange-600 rounded-full p-[10px] flex justify-center"><X size={20} strokeWidth={3}/></div>
        case 'DEACTIVE':
            return <div className="bg-gray-600 rounded-full p-[10px] flex justify-center"><AlertTriangle size={20} strokeWidth={3}/></div>
        case 'EXPIRED':
            return <div className="bg-red-500 rounded-full p-[10px] flex justify-center"><Clock size={20} strokeWidth={3}/></div>
        default:
            return ''
    }
}