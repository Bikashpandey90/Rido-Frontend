import { AnimatePresence, motion } from "framer-motion";
import { FiAlertCircle, FiX } from "react-icons/fi";
import { useContext, useEffect, useState, createContext } from "react";



const StackedNotifications = ({ children }: { children?: React.ReactNode }) => {
    const [notification, setNotification] = useState<NotificationType[]>(
        []
    );
    const removeNotif = (id: number) => {
        setNotification((prev) => prev.filter((n) => n.id !== id));
    };
    const addNotification = (text: string) => {
        setNotification((prev) => [
            ...prev,
            { id: Math.random(), text },
        ]);
    }

    return (
        <NotificationContext.Provider value={{ addNotification }} >
            {children}
            <AnimatePresence>
                {notification.map((n) => (
                    <Notification
                        removeNotif={removeNotif}
                        key={n.id}
                        {...n}
                    />
                ))}
            </AnimatePresence>
        </NotificationContext.Provider>
    );
};

const NOTIFICATION_TTL = 5000;

export interface NotificationType {
    id: number;
    text: string;
};
const NotificationContext = createContext<{
    addNotification: (text: string) => void;

} | null>(null);
export const useNotifications = () => {
    const context = useContext(NotificationContext);
    if (!context) throw new Error("useNotifications must be used within a NotificationProvider");
    return context;

}

const Notification = ({
    text,
    id,
    removeNotif,
}: NotificationType & { removeNotif: (id: number) => void }) => {
    useEffect(() => {
        const timeoutRef = setTimeout(() => {
            removeNotif(id);
        }, NOTIFICATION_TTL);

        return () => clearTimeout(timeoutRef);
    }, [id, removeNotif]);

    return (
        <motion.div
            layout
            initial={{ y: 15, scale: 0.9, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: -25, scale: 0.9, opacity: 0 }}
            transition={{ type: "spring" }}
            className="p-4 w-80 flex items-start rounded-lg gap-2 text-sm font-medium shadow-lg text-white bg-blue-600 fixed z-50 bottom-4 right-4"
        >
            <FiAlertCircle className="text-3xl absolute -top-4 -left-4 p-2 rounded-full bg-white text-blue-600 shadow" />
            <span>{text}</span>
            <button onClick={() => removeNotif(id)} className="ml-auto mt-0.5">
                <FiX />
            </button>
        </motion.div>
    );
};

export default StackedNotifications;
