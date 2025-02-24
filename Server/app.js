import express from 'express'
import { dbConnection } from './db/dbConnection.js';
import { user_routes } from './Modules/UserModule/UserRoutes.js';
import { cart_routes } from './Modules/CartModule/CartRoutes.js';
import { wishlist_routes } from './Modules/WishlistModule/WishRoutes.js';
import cookieParser from 'cookie-parser';
import category_routes from './Modules/CategoryModule/CategoryRoutes.js';
import { product_routes } from './Modules/ProductModule/ProductRoutes.js';
import uploads_router from './Modules/uploadRoutes/uploadRoutes.js';
import { order_routes } from './Modules/OrderModule/OrderRoutes.js';
import cors from "cors"
import path from "path";




dbConnection
const app = express();

const corsOptions = {
  origin: 'http://localhost:4200', 
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type,Authorization'
};

app.use(cors(corsOptions)); 
app.use(cookieParser()); 
app.use(express.json())
app.use(user_routes)
app.use(category_routes)
app.use(product_routes)
app.use(cart_routes)

app.use(wishlist_routes)
//app.use("*", (req, res)=>{res.status(404).json({message: "Error 404, not founded page"})})

app.use(order_routes)


const __dirname = path.resolve();
const uploadPath = path.join(__dirname, "../Client/src/assets/uploads");
app.use(uploads_router, express.static(path.join(__dirname + "../Client/src/assets/uploads")));






app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ message: err.message || "Something went wrong!" });
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
