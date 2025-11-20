const Form = ({ children, id, onSubmit, onReset, onChange }) => {
    return (
        <>
            <form className="form" id={id} onSubmit={onSubmit} onReset={onReset} onChange={onChange}>
                {children}
            </form>
        </>
    );
}
 
export default Form;