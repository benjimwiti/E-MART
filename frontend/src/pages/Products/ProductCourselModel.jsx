import React from 'react'
import moment from "moment";
import {
    FaBox,
    FaClock,
    FaShoppingCart,
    FaStar,
    FaStore,
} from "react-icons/fa";
import { IMAGE_URL } from "../../../config/imageUrl";
import ProductDetails from "./ProductDetails";


const ProductCourselModel = ({productDetails}) => {
    const {
        image,
        _id,
        name,
        price,
        description,
        brand,
        createdAt,
        numReviews,
        rating,
        quantity,
        countInStock,
    } = productDetails
return (
    <div key={_id}>
                <img
                src={`${IMAGE_URL}/${image}`}
                alt={name}
                className="rounded-lg object-cover h-[20rem] w-full"
                />

                <div className="mt-4 flex justify-between">
                <div className="one">
                    <h2>{name}</h2>
                    <p> $ {price}</p> <br /> <br />
                    <p className="w-[25rem]">
                    {description.substring(0, 170)} ...
                    </p>
                </div>

                <div className="flex justify-between w-[20rem]">
                    <div className="one">
                    <h1 className="flex items-center mb-6">
                        <FaStore className="mr-2 text-white" /> Brand : {brand}
                    </h1>
                    <h1 className="flex items-center mb-6">
                        <FaClock className="mr-2 text-white" /> Added :{" "}
                        {moment(createdAt).fromNow()}
                    </h1>
                    <h1 className="flex items-center mb-6">
                        <FaStar className="mr-2 text-white" /> Reviews : {" "}
                        {numReviews}
                    </h1>
                    </div>

                    <div className="two">
                    <h1 className="flex items-center mb-6">
                        <FaStar className="mr-2 text-white" /> Ratings : {" "}
                        {Math.round(rating)}
                    </h1>
                    <h1 className="flex items-center mb-6">
                        <FaShoppingCart className="mr-2 text-white" /> Quantity : {" "}
                        {quantity}
                    </h1>
                    <h1 className="flex items-center mb-6">
                        <FaBox className="mr-2 text-white" /> In Stock : {" "}
                        {countInStock}
                    </h1>
                    </div>
                </div>
                </div>
            </div>
)
}

export default ProductCourselModel