const path = require('path');
const { StatusCodes } = require('http-status-codes');
const {
   CustomAPIError,
   UnauthenticatedError,
   NotFoundError,
   BadRequestError,
} = require('../errors');

const uploadProductImage = async (req, res) => {
   if (!req.files) {
      throw new BadRequestError('No file uploaded');
   }
   const productImage = req.files.image;

   if (!productImage.mimetype.startsWith('image')) {
      throw new BadRequestError('Please upload image');
   }

   const maxSize = 1024 * 1024;
   if (productImage.size > maxSize) {
      throw new BadRequestError('Please upload smaller image');
   }

   const imagePath = path.join(
      __dirname,
      '../public/uploads/' + `${productImage.name}`
   );

   await productImage.mv(imagePath);
   return res
      .status(StatusCodes.OK)
      .json({ image: { src: `/uploads/${productImage.name}` } });
};

module.exports = { uploadProductImage };
