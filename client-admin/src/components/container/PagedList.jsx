import { useEffect, useState } from "react";

import Button from "../button/Button";
import LoadingGate from "../effect/LoadingGate";
import SpacedItems from "./SpacedItems";


const PagedList = ({ ItemComponent, pageItems, loadMore, loading, isMore }) => {
    
    return (
        <>
            <SpacedItems>
                {pageItems.map((item, index) => (
                    <ItemComponent key={item.id} data={item} />
                ))}
                <div className="paged-list-more">
                    <LoadingGate isLoading={loading}>
                        <Button 
                            label={"Show More"}
                            disabled={!isMore}
                            action={loadMore}
                            isSmall
                        />
                    </LoadingGate>
                </div>
            </SpacedItems>
        </>
    );
}
 
export default PagedList;