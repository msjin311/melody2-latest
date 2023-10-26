import CsHeader from './CsHeader';

const CsLayout = ({ children }) => {
    return (
        <div>
            <CsHeader />
            <div>{children}</div>
        </div>
    );
};

export default CsLayout;