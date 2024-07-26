import { removeDuplicateProducts } from "./removeDuplicatesById"

export const returnSimilarFavProducts = (favProductsList, allProducts) => {
    console.log(`all Products`, allProducts)
    let similarProducts = []
    /* ========= similar-category ======= */
    let favCategories = []
    //extract categories from fav products
    favProductsList.forEach((favProduct) => {
        const isDuplicate = favCategories.includes(favProduct.category)
        if (!isDuplicate) {
            favCategories.push(favProduct.category)
        }
    })
    // console.log(`fav Cat`, favCategories)

    let similarProductsByCategory = []
    favCategories.forEach((favCategory) => {
        const category_filteredProducts = allProducts.filter((product) => product.category._id == favCategory)
        if (category_filteredProducts.length > 0) { similarProductsByCategory.push(...category_filteredProducts) }
    })
    /* ========= similar-brand ======= */
    let favBrands = []
    //extract categories from fav products
    favProductsList.forEach((favProduct) => {
        const isDuplicate = favBrands.includes(favProduct.brand)
        if (!isDuplicate) {
            favBrands.push(favProduct.brand)
        }
    })
    // console.log(`fav Brand`, favBrands)

    let similarProductsByBrand = []
    favBrands.forEach((favBrand) => {
        const brand_filteredProducts = allProducts.filter(product => product.brand === favBrand)
        if (brand_filteredProducts.length > 0) { similarProductsByBrand.push(...brand_filteredProducts) }
    })
    /* ========= similar-name ======= */
    let similarNames = []
    //extract similar names from fav products
    favProductsList.forEach((favProduct) => {
        const splitNameArray = favProduct.name.split(' ')
        splitNameArray.forEach((word) => {
            const isDuplicate = similarNames.includes(word)
            if (!isDuplicate) { similarNames.push(word) }
        })
    })
    // console.log(`similar names`, similarNames)
    let similarProductsByName = []
    similarNames.forEach((similarName) => {
        const name_filteredProducts = allProducts.filter(product => product.name.includes(similarName))
        if (name_filteredProducts.length > 0) {
            similarProductsByName.push(...name_filteredProducts)
        }
    })
    // console.log(
    //     "CATEGORY", similarProductsByCategory,
    // )
    // console.log(
    //     "BRAND", similarProductsByBrand,
    // )
    // console.log(
    //     "NAME", similarProductsByName
    // )
    similarProducts = [...similarProductsByCategory, ...similarProductsByBrand, ...similarProductsByName]
    // console.log(similarProducts)
    const unDuplicatedSimilarProducts = removeDuplicateProducts(similarProducts)
    // console.log("similar Products", unDuplicatedSimilarProducts)
    return unDuplicatedSimilarProducts

}