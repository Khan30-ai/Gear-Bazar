import React, { useEffect } from 'react';
import { CheckCircle } from 'lucide-react';

export default function Toast({ message, onClose }) {
    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                onClose();
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [message, onClose]);

    if (!message) return null;

    return (
        <div className="fixed bottom-4 right-4 z-[100] flex items-center gap-2 px-4 py-3 bg-slate-900 text-white text-sm font-medium rounded shadow-lg transition-all duration-300 transform translate-y-0 opacity-100">
            <CheckCircle className="w-5 h-5 text-green-400" />
            {message}
        </div>
    );
}
