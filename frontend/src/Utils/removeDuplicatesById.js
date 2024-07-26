export const removeDuplicateProducts = (name_filteredProducts) => {
    // Create a Set to track unique product IDs. sets dont allow duplicates
    const uniqueProductIds = new Set();

    // Filter the products based on unique IDs
    const uniqueProducts = name_filteredProducts.filter(product => {
        if (!uniqueProductIds.has(product._id)) {
            uniqueProductIds.add(product._id);
            return true; // Include this product in the result
        }
        return false; // Exclude this product from the result
    });

    return uniqueProducts;
}