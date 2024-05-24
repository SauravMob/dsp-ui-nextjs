import React from 'react'
import { useDroppable } from '@dnd-kit/core'

const Droppable = ({ children, id, data }: { children: React.ReactNode, id: string, data: CreativeType }) => {
    const { isOver, setNodeRef } = useDroppable({
        id,
        data
    })
    const style = {
        color: isOver ? 'green' : undefined
    }


    return (
        <div ref={setNodeRef} style={style}>
            {children}
        </div>
    )
}

export default Droppable