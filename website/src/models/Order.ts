import mongoose, { Schema, Document, Model } from "mongoose";

// 1. Define the item type
interface OrderItem {
  templateId: mongoose.Types.ObjectId;
  title: string;
  price: number | 'Free';
}

// 2. Define the Order document interface
export interface OrderDocument extends Document {
  userId: mongoose.Types.ObjectId;
  items: OrderItem[];
  total: number;
  status: 'free' | 'paid' | 'cancelled';
  stripeSessionId?: string | null;
}

// 3. Define the static method interface
interface OrderModel extends Model<OrderDocument> {
  ordersForUser(userId: string): Promise<OrderDocument[]>;
}

// 4. Create the schema
const orderSchema = new Schema<OrderDocument, OrderModel>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      {
        templateId: {
          type: Schema.Types.ObjectId,
          ref: "Template",
          required: true,
        },
        title: String,
        price: Schema.Types.Mixed,
      },
    ],
    total: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["free", "paid", "cancelled"],
      required: true,
    },
    stripeSessionId: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

// 5. Implement the static method
orderSchema.statics.ordersForUser = function (userId: string) {
  return this.find({ userId });
};

// 6. Create the model with custom statics
const Order = mongoose.models.Order as OrderModel || mongoose.model<OrderDocument, OrderModel>('Order', orderSchema);

export default Order;
