import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]'; // Path to your NextAuth config
import dbConnect from '../../../utils/dbConnect';
import User from '../../../models/User';
import { NextResponse } from 'next/server';

export const PUT = async(request:Request):Promise<NextResponse> {
  try {
   
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    
    const body =  await request.json();

    
    await dbConnect();

   
    const updatedUser = await User.findOneAndUpdate(
      { email: session.user.email },
      { $set: body },               
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error updating user', error }, { status: 500 });
  }
}

export const config = {
  api: {
    bodyParser: false, 
  },
};
