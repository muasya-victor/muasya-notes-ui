// src/components/Sidebar.js
import { Lightbulb, Bell, Tag, Archive, Trash } from 'lucide-react'

export const Sidebar = () => {
    const menuItems = [
        { icon: <Lightbulb size={20} />, text: 'Notes', active: true },
        { icon: <Bell size={20} />, text: 'Reminders' },
        { icon: <Tag size={20} />, text: 'Edit labels' },
        { icon: <Archive size={20} />, text: 'Archive' },
        { icon: <Trash size={20} />, text: 'Trash' },
    ]

    return (
        <aside className="w-64 h-screen bg-white border-r py-2">
            {menuItems.map((item, index) => (
                <button
                    style={{borderRadius: '0 1.5rem 1.5rem 0'}}
                    key={index}
                    className={`flex items-center w-full px-6 py-3 text-gray-700 hover:bg-gray-100 ${
                        item.active ? 'bg-yellow-200' : ''
                    }`}
                >
                    {item.icon}
                    <span className="ml-4">{item.text}</span>
                </button>
            ))}
        </aside>
    )
}
