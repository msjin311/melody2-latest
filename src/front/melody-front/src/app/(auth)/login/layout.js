import './layout.css'
// app/(auth)/layout.js

import { ReactNode } from "react"

// type LayoutProps = {
//     children: ReactNode
// }

const loginLayout = ({children} ) => {
    return (
        <div className="containerLogin">
            <section className="login">
                {children}
            </section>
        </div>
    )
}

export default loginLayout