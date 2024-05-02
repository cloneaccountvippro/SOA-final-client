import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Power } from 'lucide-react';
import { useDispatch } from "react-redux";
import { resetUserState } from "@/state/user/userSlice";

function LogoutButton() {
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(resetUserState());
    };

    return (
        <div className="w-full flex items-center">
            <AlertDialog>
                <AlertDialogTrigger className="w-full">
                    <div className="px-5 h-10 cursor-pointer items-center flex justify-start rounded-md
                     hover:bg-rose-500 hover:text-white hover:fill-white gap-3">
                        <Power className="w-5 h-5"/>
                        <p className="font-semibold">Logout</p>
                    </div>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure want to sign out</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone and will require you to login again
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleLogout}>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}

export default LogoutButton
