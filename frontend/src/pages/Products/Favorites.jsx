import { useSelector } from "react-redux";
import { selectFavoriteProduct } from "../../redux/features/favorites/favoriteSlice";
import Product from "./Product";
import { returnSimilarFavProducts } from "../../Utils/productSuggestion";
import { useAllProductsQuery } from "../../redux/api/productApiSlice";
import ProductCourselModel from "./ProductCourselModel";
import Slider from "react-slick";

const Favorites = () => {
  const favorites = useSelector(selectFavoriteProduct);
  const {
    data: allProducts,
    isLoading,
    isError,
  } = useAllProductsQuery("fetching all products for suggestion algorithm");
  let suggestions = [];
  if (!isLoading && !isError) {
    suggestions = returnSimilarFavProducts(favorites, allProducts);
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="ml-[10rem]">
      <h1 className="text-lg font-bold ml-[3rem] mt-[3rem]">
        FAVORITE PRODUCTS
      </h1>

      <div className="flex flex-wrap">
        {favorites.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>

      <div className="text-fuchsia-200">
        <span className="text-xl font-semibold text-white animate-pulse">
          Suggested Products For You
        </span>
        {suggestions.length > 0 && (
          <Slider
            {...settings}
            className="xl:w-[50rem]  lg:w-[50rem] md:w-[56rem] sm:w-[40rem] sm:block mt-[1%]"
          >
            {suggestions.map((product) => (
              <ProductCourselModel productDetails={product} />
            ))}
          </Slider>
        )}
      </div>
    </div>
  );
};

export default Favorites;
