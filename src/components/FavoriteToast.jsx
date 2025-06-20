import toast from "react-hot-toast";

export const FavoriteToast = ({ message, type }) => {
    const textColor = type === "remove" ? "text-red-700" : "text-green-700";

    return (
        <div className={`flex items-center backdrop-blur-sm bg-white/20 justify-between gap-4 ${textColor} px-8 py-4 rounded-lg shadow-xl w-full max-w-md`}>
            <span className="w-full text-center text-md font-medium">{message}</span>
        </div>
    )
}