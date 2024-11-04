const OrdersExample = {
  member_id: 1,
  order_sn: 'OR241015001',
  payment_method: 1,
  payment_deadline: '2024-10-17T01:18:42.853Z',
  request_refund: false,
  refund_reason: null,
  request_refund_at: null,
  refund_at: null,
  amount: 100,
  status: 1,
  member: {
    sn: 'MB240923001',
    name: 'aaa',
    email: 'aaa@gmail.com',
  },
  order_items: [
    {
      id: 1,
      plan_id: 1,
      quantity: 1,
      plan: {
        description: 'description',
        image: 'image',
        image_alt: 'image alt',
        option_text: 'option text',
        person: 1,
        price: 100,
        special_price: 100,
        limit: 100,
        type: 1,
      },
    },
  ],
};

export default OrdersExample;
