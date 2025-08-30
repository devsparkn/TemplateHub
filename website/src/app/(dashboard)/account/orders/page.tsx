"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import {
  Calendar,
  Download,
  FileText,
  Loader,
  CheckCircle,
  Clock,
  AlertCircle,
  XCircle,
} from "lucide-react";

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
        })
        .catch(() => {
          setLoading(false);
        });
    }
  }, [status]);

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "paid":
        return <CheckCircle size={16} className="text-green-500" />;
      case "pending":
        return <Clock size={16} className="text-amber-500" />;
      case "cancelled":
        return <XCircle size={16} className="text-red-500" />;
      default:
        return <AlertCircle size={16} className="text-gray-500" />;
    }
  };

  const formatPrice = (price: string | number) => {
    if (price === "Free" || price === 0) return "Free";
    return typeof price === "string" ? `$${price}` : `$${price.toFixed(2)}`;
  };

  if (status === "loading" || loading) {
    return (
      <div className="flex justify-center items-center">
        <div className="text-center">
          <Loader className="mx-auto h-8 w-8 text-blue-600 animate-spin" />
          <p className="mt-4 text-lg text-gray-600">Loading your orders...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex items-center justify-center">
        <div className="max-w-md w-full rounded-lg shadow-md p-6 text-center">
          <AlertCircle className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-4 text-lg font-medium text-gray-900">
            Authentication required
          </h3>
          <p className="mt-2 text-sm text-gray-500">
            Please log in to view your orders.
          </p>
          <div className="mt-6">
            <Link
              href="/auth/signin"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Order History</h1>
          <p className="mt-2 text-sm text-gray-600">
            View all your previous orders and download your templates.
          </p>
        </div>

        {orders.length === 0 ? (
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-12 sm:px-6 text-center">
              <FileText className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-lg font-medium text-gray-900">
                No orders yet
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                You haven&#39;t placed any orders yet.
              </p>
              <div className="mt-6">
                <Link
                  href="/templates"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Browse Templates
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => {
              const orderDate = new Date(order.createdAt);
              const formattedDate = orderDate.toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              });
              const formattedTime = orderDate.toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
              });

              return (
                <div
                  key={order._id}
                  className="bg-white overflow-hidden shadow rounded-lg border border-gray-200"
                >
                  <div className="px-4 py-5 sm:px-6 bg-gray-50 border-b border-gray-200">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <div>
                        <h3 className="text-lg font-medium leading-6 text-gray-900">
                          Order #{order._id.substring(0, 8)}...
                        </h3>
                        <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-gray-500">
                          <Calendar size={14} />
                          <span>
                            {formattedDate} at {formattedTime}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                            order.status === "paid"
                              ? "bg-green-100 text-green-800"
                              : order.status === "pending"
                              ? "bg-amber-100 text-amber-800"
                              : order.status === "cancelled"
                              ? "bg-red-100 text-red-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {getStatusIcon(order.status)}
                          <span className="ml-1.5 capitalize">
                            {order.status}
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="px-4 py-5 sm:p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {order.items.map((item) => (
                        <div
                          key={item.templateId}
                          className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                        >
                          <h4 className="font-medium text-gray-900 truncate">
                            {item.title}
                          </h4>
                          <div className="mt-2 flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-900">
                              {formatPrice(item.price)}
                            </span>
                            <Link
                              href={`/templates/${item.templateId}/download`}
                              className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                              <Download size={14} className="mr-1.5" />
                              Download
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;
