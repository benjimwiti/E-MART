import { useGetTopProductsQuery } from "../redux/api/productApiSlice";
import Loader from "./Loader";
import SmallProduct from "../pages/Products/SmallProduct";
import ProductCarousel from "../pages/Products/ProductCarousel";

const Header = () => {
  const { data: topProducts, isLoading, error } = useGetTopProductsQuery();

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <h1>ERROR</h1>;
  }

  return (
    <>
      <div className="flex justify-around flex-col mx-[10rem]">
        <div className="xl:block lg:hidden md:hidden:sm:hidden">
          <span className="block text-[2rem] mx-[9rem] mb-[2%]">our top products</span>
          {/* <div className="grid grid-cols-2">
            {topProducts.map((product) => (
              <div key={product._id}>
                <SmallProduct product={product} />
              </div>
            ))}
          </div> */}
        </div>
        <ProductCarousel />
      </div>
    </>
  );
};

export default Header;
