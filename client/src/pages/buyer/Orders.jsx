import React, { useContext, useState, useEffect } from "react";
import {
  ChevronDown,
  ChevronUp,
  MapPin,
  Phone,
  User,
  Download,
  RotateCcw,
  ExternalLink,
  XCircle,
  Package,
  CreditCard,
  Banknote,
  Smartphone,
} from "lucide-react";
import { CartContext } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast"
import { ArrowLeft } from "lucide-react";
import api from "../../services/api"
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";

//Status
const STATUS = {
  PENDING: {
    label: "Pending",
    dot: "bg-yellow-500",
    text: "text-yellow-700",
    bg: "bg-yellow-50",
    border: "border-yellow-200",
  },
  CONFIRMED: {
    label: "Confirmed",
    dot: "bg-blue-500",
    text: "text-blue-700",
    bg: "bg-blue-50",
    border: "border-blue-200",
  },
  DELIVERED: {
    label: "Delivered",
    dot: "bg-green-500",
    text: "text-green-700",
    bg: "bg-green-50",
    border: "border-green-200",
  },
  CANCELLED: {
    label: "Cancelled",
    dot: "bg-red-500",
    text: "text-red-700",
    bg: "bg-red-50",
    border: "border-red-200",
  },
};

const PAYMENT_ICON = {
  UPI: <Smartphone className="h-3.5 w-3.5" />,
  COD: <Banknote className="h-3.5 w-3.5" />,
  Card: <CreditCard className="h-3.5 w-3.5" />,
};

function fmt(n) {
  return "₹" + n.toLocaleString("en-IN");
}

// loading skeleton
function SkeletonCard() {
  return (
    <div className="rounded-sm border border-slate-200 bg-white p-6 animate-pulse">
      <div className="flex items-start gap-4">
        <div className="h-20 w-20 flex-shrink-0 rounded-sm bg-slate-100" />
        <div className="flex-1 space-y-2.5">
          <div className="h-4 w-2/3 rounded-sm bg-slate-100" />
          <div className="h-3 w-1/3 rounded-sm bg-slate-100" />
          <div className="h-3 w-1/4 rounded-sm bg-slate-100" />
        </div>
        <div className="flex flex-col items-end gap-2">
          <div className="h-5 w-20 rounded-sm bg-slate-100" />
          <div className="h-5 w-16 rounded-sm bg-slate-100" />
        </div>
      </div>
    </div>
  );
}

function formatDate(date) {
  if (!date) return null;

  return new Date(date).toLocaleDateString(
    "en-IN",
    {
      day: "numeric",
      month: "short",
      year: "numeric",
    }
  );
}

// Timeline
function Timeline({ steps }) {
  return (
    <div className="flex flex-col gap-0">
      {steps.map((step, i) => {
        const isLast = i === steps.length - 1;
        return (
          <div key={i} className="flex gap-3">
            {/* dot + line */}
            <div className="flex flex-col items-center">
              <div
                className={`h-5 w-5 flex-shrink-0 rounded-full border-2 flex items-center justify-center ${step.done
                  ? "border-orange-600 bg-orange-600"
                  : "border-slate-300 bg-white"
                  }`}
              >
                {step.done && (
                  <svg className="h-2.5 w-2.5 text-white" viewBox="0 0 10 10" fill="currentColor">
                    <path d="M1.5 5.5L4 8l4.5-5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
              {!isLast && (
                <div className={`w-px flex-1 min-h-[24px] mt-0.5 ${step.done ? "bg-orange-200" : "bg-slate-200"}`} />
              )}
            </div>
            {/* label */}
            <div className={`pb-5 ${isLast ? "pb-0" : ""}`}>
              <p className={`text-sm font-semibold ${step.done ? "text-slate-900" : "text-slate-400"}`}>
                {step.label}
              </p>
              {step.date && (
                <p className="text-xs text-slate-500 mt-0.5">{step.date}</p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function getTimeline(order) {
  if (order.orderStatus === "PENDING") {
    return [
      {
        label: "Order Placed",
        date: formatDate(order.createdAt),
        done: true,
      },
      {
        label: "Order Confirmed",
        date: null,
        done: false,
      },
      {
        label: "Order Delivered",
        date: null,
        done: false,
      },
    ];
  }
  if (order.orderStatus === "CONFIRMED") {
    return [
      {
        label: "Order Placed",
        date: formatDate(order.createdAt),
        done: true,
      },
      {
        label: "Order Confirmed",
        date: formatDate(order.confirmedAt),
        done: true,
      },
      {
        label: "Order Delivered",
        date: null,
        done: false,
      },
    ];
  }
  if (order.orderStatus === "DELIVERED") {
    return [
      {
        label: "Order Placed",
        date: formatDate(order.createdAt),
        done: true,
      },
      {
        label: "Order Confirmed",
        date: formatDate(order.confirmedAt),
        done: true,
      },
      {
        label: "Order Delivered",
        date: formatDate(order.deliveredAt),
        done: true,
      },
    ];
  }
  if (order.orderStatus === "CANCELLED") {
    const confirmed = !!order.confirmedAt
    return [
      {
        label: "Order Placed",
        date: formatDate(order.createdAt),
        done: true,
      },
      ...(confirmed ? [{
        label: "Order Confirmed",
        date: formatDate(order.confirmedAt),
        done: true,
      }] : []),
      {
        label: "Order Cancelled",
        date: formatDate(order.cancelledAt),
        done: true,
      }
    ];
  }
}

// Order Card
function OrderCard({ order }) {
  const [open, setOpen] = useState(false);
  const s = STATUS[order.orderStatus];
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();
  const canCancel = order.orderStatus === "PENDING" || order.orderStatus === "CONFIRMED";

  const handleBuyAgain = () => {
    addToCart({
      _id: order.productId?._id || order.productId,
      name: order.productSnapshot.name,
      price: order.priceAtOrderTime,
      images: [order.productSnapshot.image],
    }, order.quantity);

    toast.success("Added to cart!");
    navigate("/cart");
  }

  return (
    <div className="rounded-sm border border-slate-200 bg-white overflow-hidden">
      {/* Summary row */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full text-left px-6 py-5 flex items-start gap-4 transition-colors duration-200 hover:bg-slate-50"
      >
        {/* Product image */}
        <img
          src={order.productSnapshot?.image || order.productId?.images?.[0] || "/placeholder.jpg"}
          alt={order.productSnapshot?.name || order.productName}
          className="h-20 w-20 flex-shrink-0 rounded-sm border border-slate-200 object-cover bg-slate-50"
        />

        {/* Center info */}
        <div className="flex-1 min-w-0">
          <p className="text-base font-semibold text-slate-900 line-clamp-1 leading-snug">
            {order.productSnapshot?.name || order.productId?.name}
          </p>
          <p className="mt-1 text-xs text-slate-500">Sold by {order.sellerId?.shopName}</p>
          <p className="mt-0.5 text-xs text-slate-500">Qty: {order.quantity}</p>
          <p className="mt-0.5 text-xs text-slate-400">Ordered on {new Date(order.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</p>
        </div>

        {/* Right: status + price + chevron */}
        <div className="flex flex-col items-end gap-2 flex-shrink-0">
          <span
            className={`inline-flex items-center gap-1.5 rounded-sm border px-2 py-0.5 text-[11px] font-semibold uppercase tracking-[0.1em] ${s.bg} ${s.border} ${s.text}`}
          >
            <span className={`h-1.5 w-1.5 rounded-full ${s.dot}`} />
            {s.label}
          </span>
          <p className="text-base font-bold text-slate-900">{fmt(order.grandTotal)}</p>
          <span className="text-slate-400">
            {open ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </span>
        </div>
      </button>

      {/* Expanded section */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-out ${open ? "max-h-[900px] opacity-100" : "max-h-0 opacity-0"
          }`}
      >
        <div className="border-t border-slate-200 px-6 pt-6 pb-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {/* Timeline */}
            <div>
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.15em] text-slate-400">
                Tracking
              </p>
              <Timeline steps={getTimeline(order)} />
            </div>

            {/* Shipping + Payment stacked */}
            <div className="flex flex-col gap-4">
              {/* Shipping */}
              <div>
                <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.15em] text-slate-400">
                  Shipping Address
                </p>
                <div className="rounded-sm border border-slate-200 bg-slate-50 px-4 py-3 space-y-1">
                  <div className="flex items-center gap-1.5">
                    <User className="h-3.5 w-3.5 text-slate-400" />
                    <p className="text-sm font-semibold text-slate-900">{order.shippingAddress?.fullName}</p>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Phone className="h-3.5 w-3.5 text-slate-400" />
                    <p className="text-xs text-slate-500">{order.shippingAddress?.phone}</p>
                  </div>
                  <div className="flex items-start gap-1.5">
                    <MapPin className="h-3.5 w-3.5 text-slate-400 mt-0.5 flex-shrink-0" />
                    <p className="text-xs text-slate-500 leading-relaxed">{`${order.shippingAddress?.address}, ${order.shippingAddress?.city}, ${order.shippingAddress?.state}, ${order.shippingAddress?.postalCode}`}</p>
                  </div>
                </div>
              </div>

              {/* Payment */}
              <div>
                <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.15em] text-slate-400">
                  Payment
                </p>
                <div className="rounded-sm border border-slate-200 bg-slate-50 px-4 py-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-xs text-slate-500">
                      {PAYMENT_ICON[order.paymentMethod]}
                      {order.paymentMethod}
                    </span>
                    <span
                      className={`text-xs font-semibold ${order.paymentStatus === "Refunded"
                        ? "text-blue-600"
                        : "text-green-700"
                        }`}
                    >
                      {order.paymentStatus}
                    </span>
                  </div>
                  <div className="flex items-center justify-between border-t border-slate-200 pt-2">
                    <span className="text-xs text-slate-500">Total</span>
                    <span className="text-sm font-bold text-slate-900">{fmt(order.grandTotal)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div>
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.15em] text-slate-400">
                Actions
              </p>
              <div className="flex flex-col gap-2">
                <button
                  type="button"
                  className="inline-flex items-center justify-center gap-2 rounded-sm bg-orange-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-orange-700"
                  onClick={() => navigate(`/product/${order.productId?._id || order.productId}`)}
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  View Product
                </button>
                <button
                  type="button"
                  disabled
                  className="inline-flex items-center justify-center gap-2 rounded-sm border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 transition-colors duration-200 hover:bg-slate-50 hover:border-slate-400 disabled:opacity-50 cursor-not-allowed"
                  title="Coming Soon"
                >
                  <Download className="h-3.5 w-3.5" />
                  Download Invoice
                </button>
                <button
                  type="button"
                  onClick={handleBuyAgain}
                  className="inline-flex items-center justify-center gap-2 rounded-sm border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 transition-colors duration-200 hover:bg-slate-50 hover:border-slate-400"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  Buy Again
                </button>
                {canCancel && (
                  <button
                    type="button"
                    className="inline-flex items-center justify-center gap-2 rounded-sm border border-red-200 px-4 py-2.5 text-sm font-semibold text-red-600 transition-colors duration-200 hover:bg-red-50"
                  >
                    <XCircle className="h-3.5 w-3.5" />
                    Cancel Order
                  </button>
                )}
              </div>

              {/* Order ID */}
              <p className="mt-4 text-[11px] font-mono text-slate-400 tracking-wide">
                Order #{order._id}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const { data } = await api.get("/orders")
        setOrders(data.orders);
      } catch (error) {
        setError(error.response?.data?.message)
      } finally {
        setLoading(false);
      }
    }
    fetchOrders();
  }, [])

  return (
    <> <Header />
      <div className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6">
        <div className="mx-auto max-w-[1000px]">
          <button
            onClick={() => navigate('/')}
            className=" mb-6 flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-orange-600 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">My Orders</h1>
            <p className="mt-1 text-sm text-slate-500">Track and manage all your purchases.</p>
          </div>

          {/* Order list */}
          {loading ? (
            <div className="flex flex-col gap-4">
              {[...Array(5)].map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : orders.length === 0 ? (
            <div className="rounded-sm border border-slate-200 bg-white px-6 py-12 text-center">
              <p className="text-sm font-semibold text-slate-900">No orders found</p>
              <p className="mt-1 text-xs text-slate-500">You haven't placed any orders yet.</p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {orders.map((order) => (
                <OrderCard key={order._id} order={order} />
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}