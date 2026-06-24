export const USERS_SERVICE = 'USERS_SERVICE';
export const PRODUCTS_SERVICE = 'PRODUCTS_SERVICE';
export const ORDERS_SERVICE = 'ORDERS_SERVICE';

export const MessagePatterns = {
  Users: {
    FindAll: 'users.findAll',
    FindOne: 'users.findOne',
    Create: 'users.create',
  },
  Products: {
    FindAll: 'products.findAll',
    FindOne: 'products.findOne',
    Create: 'products.create',
  },
  Orders: {
    FindAll: 'orders.findAll',
    Create: 'orders.create',
  },
} as const;
