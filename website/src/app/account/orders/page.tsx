"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";

type OrderItem = {
  templateId: string;
  title: string;
  price: string | number;
};

type Order = {
  _id: string;
  createdAt: string;
  status: string;
  items: OrderItem[];
};

const OrdersPage = () => {
  const { data: session, status } = useSession();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "authenticated") {
      fetch("/api/user/orders")
        .then((res) => res.json())
        .then((data) => {
          setOrders(data.orders || []);
          setLoading(false);
        });
    }
  }, [status]);

  if (loading) return <div className="p-8">Loading...</div>;
  if (!session)
    return <div className="p-8">Please log in to view your orders.</div>;

  return (
    <div className="container py-12 px-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-8">My Orders</h1>
          {orders.length === 0 ? (
            <div>You have not placed any orders yet.</div>
          ) : (
            <div className="space-y-8">
              {orders.map((order) => (
                <div key={order._id} className="border rounded-lg p-6">
                  <div className="flex justify-between items-center mb-2">
                    <div>
                      <span className="font-semibold">
                        Order #{order._id.slice(-6)}
                      </span>
                      <span className="ml-4 text-sm text-muted-foreground">
                        {new Date(order.createdAt).toLocaleString()}
                      </span>
                    </div>
                    <span className="text-sm px-2 py-1 rounded bg-gray-100 dark:bg-gray-800">
                      {order.status}
                    </span>
                  </div>
                  <div className="grid md:grid-cols-3 gap-4">
                    {order.items.map((item) => (
                      <div
                        key={item.templateId}
                        className="border rounded p-3 flex flex-col"
                      >
                        <span className="font-medium">{item.title}</span>
                        <span className="text-sm text-muted-foreground">
                          {item.price === "Free" ? "Free" : `$${item.price}`}
                        </span>
                        <Link
                          href={`/templates/${item.templateId}/download`}
                          className="text-blue-600 mt-2 text-sm underline"
                        >
                          Re-download
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;
