import FaqHeaders from "./FaqHeaders";

const Layout = ({ children }) => {
    return (
        <div>
            <FaqHeaders />
            <div>{children}</div>
        </div>
    );
};

export default Layout;