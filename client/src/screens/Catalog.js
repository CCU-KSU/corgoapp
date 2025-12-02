import { Routes, Route } from 'react-router-dom';

import Feed from './catalog/Feed';
import ArticlePage from './catalog/ArticlePage';
import NotFound from './error/NotFound';

const Catalog = ({ setViewParams }) => {

    return (
        <Routes>
            <Route index element={<Feed setViewParams={setViewParams} />}/>
            <Route path=":itemId" element={<ArticlePage setViewParams={setViewParams} />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}
 
export default Catalog;