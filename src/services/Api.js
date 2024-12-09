import Http from "./Http";
//User
export const getAllUsers = (config) => Http.get("/users", config);
export const createUser = (data, config) => Http.post("/users/register", data, config);
export const getUser = (id) => Http.get(`/users/${id}`);
export const updateUser = (data, id) => Http.post(`/users/edit/${id}`, data)
export const deleteUser = (id) => Http.get(`/users/delete/${id}`)

//Product
export const getAllProducts = (config) => Http.get("/products", config);
export const createProduct = (data, config) => Http.post("/products/create", data, config);
export const getEditProduct = (id) => Http.get(`/products/edit/${id}`);
export const updateProduct = (id, data) => Http.post(`/products/update/${id}`, data)
export const deleteProduct = (id) => Http.get(`/products/delete/${id}`)

//Category
export const getAllCategories = (config) => Http.get("/categories", config);
export const createCategory = (data, config) => Http.post("/categories/create", data, config);
export const getEditCategory = (id) => Http.get(`/categories/edit/${id}`);
export const updateCategory = (id, data) => Http.post(`/categories/update/${id}`, data)
export const deleteCategory = (id) => Http.get(`/categories/delete/${id}`)

//Comment
export const getAllComments = (config) => Http.get(`/comments`,config)
export const deleteComment = (id) => Http.get(`/comments/delete/${id}`)
export const activeComment = (id, data) => Http.post(`/comments/hidden/${id}`, data)

//Order
export const getOrders = (config) => Http.get(`/orders`,config)
export const editOrder = (id, data) => Http.put(`/orders/update/${id}`,data)
export const getDetailOrder = (id)=> Http.get(`/orders/${id}`)






///////////////////////


export const apiLogin = (data) => Http.post('/users/login', data);
export const apiGetCode = (data) => Http.post('/getcode', data);
export const apiChangePassword = (data) => Http.put('/changepassword', data);
export const apiChangePasswordNext = (data) => Http.put('/changepasswordnext', data);
export const apiLoginGoogle = (config) => Http.get('/auth/google', config);





export const deleteManyUser = (data, config) => Http.post('/users/deletemany', data, config)

export const editUser = (id, data, config) => Http.put('/users/edit/' + id, data, config)

export const getCategory = (id, config) => Http.get('/categories/' + id, config)
export const editCategory = (id, data, config) => Http.put('/categories/edit/' + id, data, config)
export const deleteManyCategory = (data, config) => Http.post('/categories/deletemany', data, config)



export const getCommentsProduct = (id, config) => Http.get(`/products/${id}/comments/`, config)
export const createComment = (id, data, config) => Http.post(`/products/${id}/comments`, data, config)
export const deleteManyComment = (data, config) => Http.post('/comments/deletemany', data, config)


export const deleteManyProduct = (data, config) => Http.post('/products/deletemany', data, config)

export const getProduct = (id, config) => Http.get('/productsDetails/' + id, config)
export const editProduct = (id, data, config) => Http.put('/products/edit/' + id, data, config)

export const getProductHot = (config) => Http.get('/products/productFeatured', config)
export const getProductByDm = (id, config) => Http.get(`categories/${id}/products`, config)


export const createCart = (data, config) => Http.post('/cart/create', data, config)
export const getCartUser = (id, config) => Http.get('/cart/' + id, config)
export const deleteProToCart = (id, config) => Http.delete('/cart/delete/' + id, config)
export const updateCart = (data, config) => Http.put('/cart/update', data, config)
export const deleteCart = (id, config) => Http.delete(`/cart/deleteAll/${id}`,config)

export const orderApi = (data, config) => Http.post('/create/order', data, config)

export const getOrderUser = (id, config) => Http.get(`/user/${id}/orders`, config)
export const getOrdersByDate = (config) => Http.get('/order/bydate', config)
export const deleteOrder = (id, config) => Http.delete('/order/delete/' + id, config)

export const getBlogs = (config) => Http.get('/blogs', config)
export const createBlog = (data, config) => Http.post('/blogs/create', data, config)
export const deleteBlog = (id, config) => Http.delete('/blogs/delete/' + id, config)
export const getBlogDetail = (id, config) => Http.get('/blogs/'+ id, config)
export const editBlog = (id, data, config) => Http.put('/blogs/edit/' + id, data, config)

export const getAllCommentsBlog = (config) => Http.get('/commentsblog', config)
export const getCommentsBlog = (id, config) => Http.get('/commentsblog/blog/' + id, config)
export const createCommentBlog = (data, config) => Http.post('/commentsblog/create', data, config)
export const deleteCommentBlog = (id, config) => Http.delete('/commentsblog/delete/' + id, config)

export const bankingAPi = (data) => Http.post('/create_payment_url', data)






















