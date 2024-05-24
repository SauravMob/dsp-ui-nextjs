import React from 'react'
import { useDraggable } from '@dnd-kit/core'

const Draggable = React.forwardRef(({ children, id, data }: { children: React.ReactNode, id: string, data: CreativeType }, ref) => {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id,
        data
    })
    const style = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`
    } : undefined

    return (
        <button ref={node => {
            setNodeRef(node)
            if (typeof ref === 'function') {
                ref(node)
            } else if (ref) {
                ref.current = node
            }
        }} style={style} {...listeners} {...attributes}>
            {children}
        </button>
    )
})

Draggable.displayName = 'Draggable'

export default Draggable

