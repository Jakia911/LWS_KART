import { cartModel } from '@/models/cart-model';
import { Types } from 'mongoose';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function addToCart(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST requests allowed' });
  }

  const { userId, productId, quantity } = req.body;

  // Validate ObjectId
  if (!Types.ObjectId.isValid(userId) || !Types.ObjectId.isValid(productId)) {
    return res.status(400).json({ message: 'Invalid User ID or Product ID' });
  }

  try {
    let cart = await cartModel.findOne({ user: new Types.ObjectId(userId) });

    if (!cart) {
      cart = new cartModel({
        user: new Types.ObjectId(userId),
        items: [{ productId: new Types.ObjectId(productId), quantity }],
      });
    } else {
      const itemIndex = cart.items.findIndex(item => 
  item.productId.toString() === productId
);


      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
      } else {
        cart.items.push({ 
  productId: new Types.ObjectId(productId), 
  quantity 
});
      }
    }

    await cart.save();
    return res.status(200).json(cart);
  } catch (error) {
    return res.status(500).json({ message: 'Error adding to cart', error });
  }
}
