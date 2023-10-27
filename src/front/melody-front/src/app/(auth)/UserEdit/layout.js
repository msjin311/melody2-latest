import "./layout.css"

const myPageLayout = ({children}) => {

    return(
        <>
            <div className="containerUserEdit">
                <section className="userEdit">
                    {children}
                </section>
            </div>
        </>
    )
}

export default myPageLayout;