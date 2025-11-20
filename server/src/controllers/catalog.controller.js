export const listCatalog = (req, res) => {
    res.status(200).json({ message: 'List of catalog entries' });
};

export const getCatalogEntry = (req, res) => {
    const id = req.params.id;
    res.status(200).json({ id: id });
};


