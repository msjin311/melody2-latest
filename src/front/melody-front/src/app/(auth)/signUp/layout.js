import './layout.css'

const signupLayout = ( {children} ) => {
    return (
        <div className="containersignup">
            <section className="signup">
                {children}
            </section>
        </div>
    )
}

export default signupLayout