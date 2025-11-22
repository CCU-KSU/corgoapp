const SpacedItems = ({ children, direction="column" }) => {

    const style = {
        flexDirection: direction,
    }

    return ( 
        <>
            <div className="spaced-items" style={style}>
                {children}
            </div>
        </>
     );
}
 
export default SpacedItems;