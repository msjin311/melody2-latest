// app/(auth)/layout.js

import { ReactNode } from "react"

// type LayoutProps = {
//     children: ReactNode
// }

const AuthLayout = ({children} ) => {
    return (
        <div className="flex flex-col min-h-screen items-center justify-center bg-gray-100 text-black">
            <div className="bg-white p-8 rounded shadow-md">{children}</div>
        </div>
    )
}

export default AuthLayout