"use client";

import { IProduct } from "@/types/product";
import { FC } from "react";

interface ProductDescriptionProps {
  product: (Omit<IProduct, "_id"> & { id: string }) | null;
}

const ProductDescription: FC<ProductDescriptionProps> = ({ product }) => {
  return (
    <div className="container pb-16">
      <h3 className="border-b border-gray-200 font-roboto text-gray-800 pb-3 font-medium">
        Product details
      </h3>
      <div className="w-3/5 pt-6">
        <div className="text-gray-600">
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tenetur
            necessitatibus deleniti natus dolore cum maiores suscipit optio
            itaque voluptatibus veritatis tempora iste facilis non aut sapiente
            dolor quisquam, ex ab.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum,
            quae accusantium voluptatem blanditiis sapiente voluptatum. Autem
            ab, dolorum assumenda earum veniam eius illo fugiat possimus illum
            dolor totam, ducimus excepturi.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Error quia
            modi ut expedita! Iure molestiae labore cumque nobis quasi fuga,
            quibusdam rem? Temporibus consectetur corrupti rerum veritatis
            numquam labore amet.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductDescription;
