import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import {
  ShoppingBag,
  Search,
  Eye,
  CheckCircle2,
  Clock,
  Scissors,
  Truck,
  Check,
  X,
  ExternalLink,
  Sparkles,
} from 'lucide-react';
import api from '../../services/api.js';
import toast from 'react-hot-toast';

const stages = [
  'Order Placed',
  'Confirmed',
  'Designing',
  'Stitching',
  'Quality Check',
  'Shipped',
  'Delivered',
  'Cancelled',
];

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [statusFilter, setStatusFilter] = useState('');
  const [updating, setUpdating] = useState(false);

  const { currency, currencyRate } = useSelector((state) => state.ui);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/orders');
      if (data.success) {
        setOrders(data.data || []);
      }
    } catch (err) {
      console.error('Error loading orders:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (orderId, newStatus) => {
    setUpdating(true);
    try {
      const { data } = await api.put(`/orders/${orderId}/status`, {
        status: newStatus,
        note: `Transitioned status to ${newStatus} by Master Atelier Admin`,
      });

      if (data.success) {
        toast.success(`Order status updated to: ${newStatus}`);
        setOrders(orders.map((o) => (o._id === orderId ? data.data : o)));
        if (selectedOrder && selectedOrder._id === orderId) {
          setSelectedOrder(data.data);
        }
      }
    } catch (err) {
      toast.error('Failed to update status.');
    } finally {
      setUpdating(false);
    }
  };

  const formatPrice = (amount) => {
    if (!amount) return '';
    const converted = Math.round(amount * currencyRate);
    return `${currency} ${converted.toLocaleString()}`;
  };

  const filteredOrders = statusFilter
    ? orders.filter((o) => o.status === statusFilter)
    : orders;

  return (
    <>
      <Helmet>
        <title>Bridal Orders & Stitching Queue | ZURIELLE ADMIN</title>
      </Helmet>

      <div className="space-y-6 select-none max-w-7xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-bridal-gold block">
              Atelier Workshop Queue
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl text-bridal-charcoal font-semibold">
              Bridal Orders & Stitching Tracker ({orders.length})
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 bg-white border border-bridal-border rounded-btn text-xs font-semibold text-bridal-charcoal focus:outline-none"
            >
              <option value="">All Statuses ({orders.length})</option>
              {stages.map((st) => (
                <option key={st} value={st}>
                  {st} ({orders.filter((o) => o.status === st).length})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white border border-bridal-border rounded-card shadow-sm overflow-hidden">
          {loading ? (
            <div className="py-16 text-center text-xs text-bridal-mutedText animate-pulse">
              Retrieving bridal commission logs...
            </div>
          ) : filteredOrders.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-bridal-cream/60 border-b border-bridal-border text-bridal-charcoal font-semibold uppercase text-[10px] tracking-wider">
                  <tr>
                    <th className="py-3 px-4">Order #</th>
                    <th className="py-3 px-3">Date</th>
                    <th className="py-3 px-3">Client & City</th>
                    <th className="py-3 px-3">Items & Custom Specs</th>
                    <th className="py-3 px-3">Current Status</th>
                    <th className="py-3 px-3">Amount</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-bridal-border/60 text-bridal-mutedText">
                  {filteredOrders.map((ord) => (
                    <tr key={ord._id} className="hover:bg-bridal-cream/30 transition">
                      <td className="py-3 px-4 font-mono font-bold text-bridal-charcoal">
                        {ord.orderNumber}
                      </td>
                      <td className="py-3 px-3 text-[11px] text-bridal-lightText">
                        {new Date(ord.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-3">
                        <span className="font-semibold text-bridal-charcoal block">{ord.shippingAddress?.fullName}</span>
                        <span className="text-[10px] text-bridal-mutedText">{ord.shippingAddress?.city}, {ord.shippingAddress?.country}</span>
                      </td>
                      <td className="py-3 px-3">
                        <div className="space-y-0.5">
                          {ord.orderItems?.map((it, idx) => (
                            <div key={idx} className="flex items-center gap-1.5">
                              <span className="font-medium text-bridal-charcoal truncate max-w-[180px]">{it.name}</span>
                              {it.isCustomized && (
                                <span className="px-1.5 py-0.2 bg-bridal-gold/15 text-bridal-deepGold text-[9px] font-bold rounded">
                                  Bespoke
                                </span>
                              )}
                            </div>
                          ))}
                        </div>
                      </td>
                      <td className="py-3 px-3">
                        <select
                          value={ord.status}
                          disabled={updating}
                          onChange={(e) => handleUpdateStatus(ord._id, e.target.value)}
                          className="px-2.5 py-1 bg-bridal-cream border border-bridal-border rounded text-[11px] font-bold text-bridal-charcoal cursor-pointer focus:outline-none focus:border-bridal-gold"
                        >
                          {stages.map((st) => (
                            <option key={st} value={st}>
                              {st}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="py-3 px-3 font-semibold text-bridal-charcoal">
                        {formatPrice(ord.totalPrice)}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => setSelectedOrder(ord)}
                          className="px-3 py-1 bg-bridal-charcoal hover:bg-black text-white text-[11px] font-semibold rounded-btn shadow-sm"
                        >
                          Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="py-16 text-center text-xs text-bridal-mutedText">
              No orders found matching the filter.
            </div>
          )}
        </div>

        {/* Order Details Modal */}
        {selectedOrder && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
            <div className="w-full max-w-2xl bg-white border border-bridal-border rounded-card shadow-2xl p-6 sm:p-8 space-y-5 my-8 animate-in fade-in zoom-in-95 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between border-b border-bridal-border pb-3">
                <div>
                  <span className="font-mono text-xs text-bridal-gold font-bold">{selectedOrder.orderNumber}</span>
                  <h3 className="font-serif text-lg font-semibold text-bridal-charcoal">
                    Atelier Commission Dossier
                  </h3>
                </div>
                <button onClick={() => setSelectedOrder(null)} className="text-bridal-mutedText hover:text-bridal-charcoal">
                  <X size={20} />
                </button>
              </div>

              {/* Status Update Quick Buttons */}
              <div className="p-4 bg-bridal-cream/40 border border-bridal-border rounded-card space-y-2">
                <span className="text-[10px] uppercase font-bold tracking-wider text-bridal-gold block">
                  Advance Workshop Status Progression
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {stages.map((st) => (
                    <button
                      key={st}
                      disabled={updating}
                      onClick={() => handleUpdateStatus(selectedOrder._id, st)}
                      className={`px-3 py-1 text-[11px] font-semibold rounded-md border transition ${
                        selectedOrder.status === st
                          ? 'bg-bridal-charcoal text-white border-bridal-charcoal shadow-sm'
                          : 'bg-white text-bridal-charcoal border-bridal-border hover:border-bridal-gold'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {/* Shipping & Contact */}
              <div className="p-4 bg-bridal-cream/20 border border-bridal-border rounded-card text-xs space-y-1">
                <h4 className="font-semibold text-bridal-charcoal uppercase tracking-wider">Client & Shipping</h4>
                <p><strong>Name:</strong> {selectedOrder.shippingAddress?.fullName} ({selectedOrder.shippingAddress?.phone})</p>
                <p><strong>Address:</strong> {selectedOrder.shippingAddress?.street}, {selectedOrder.shippingAddress?.city}, {selectedOrder.shippingAddress?.country}</p>
                <p><strong>Payment:</strong> {selectedOrder.paymentMethod} • <strong>Total:</strong> {formatPrice(selectedOrder.totalPrice)}</p>
              </div>

              {/* Items & Custom Measurements */}
              <div className="space-y-3">
                <h4 className="font-serif text-sm font-semibold text-bridal-charcoal">Commissioned Pieces</h4>
                {selectedOrder.orderItems?.map((it, idx) => (
                  <div key={idx} className="p-4 border border-bridal-border rounded-card bg-white space-y-2 text-xs">
                    <div className="flex justify-between items-center font-semibold text-bridal-charcoal">
                      <span>{it.name} (Qty: {it.qty})</span>
                      <span className="text-bridal-deepGold">{formatPrice(it.price * it.qty)}</span>
                    </div>

                    {it.isCustomized && it.customizationDetails && (
                      <div className="p-3 bg-bridal-cream/50 rounded text-[11px] space-y-1">
                        <p><strong>Silhouette:</strong> {it.customizationDetails.design?.lehengaFlair} • {it.customizationDetails.design?.choliStyle}</p>
                        <p><strong>Fabric & Color:</strong> {it.customizationDetails.fabric?.name} • {it.customizationDetails.colors?.baseColor?.name}</p>
                        <p><strong>Embroidery:</strong> {it.customizationDetails.embroidery?.intensity}</p>
                        {it.customizationDetails.personalization?.enabled && (
                          <p className="text-bridal-deepGold"><strong>Monogram:</strong> "{it.customizationDetails.personalization.text}" ({it.customizationDetails.personalization.placement})</p>
                        )}
                        {it.customizationDetails.measurements?.type === 'custom' && (
                          <div className="pt-1 mt-1 border-t border-bridal-border grid grid-cols-3 gap-1 font-mono text-[10px]">
                            <span>Bust: {it.customizationDetails.measurements.customData.bust}"</span>
                            <span>Waist: {it.customizationDetails.measurements.customData.waist}"</span>
                            <span>Hips: {it.customizationDetails.measurements.customData.hips}"</span>
                            <span>Length: {it.customizationDetails.measurements.customData.lehengaLength}"</span>
                            <span>Choli: {it.customizationDetails.measurements.customData.choliLength}"</span>
                            <span>Sleeve: {it.customizationDetails.measurements.customData.sleeveLength}"</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Audit Timeline */}
              <div className="space-y-2 pt-2 border-t border-bridal-border text-xs">
                <h4 className="font-semibold text-bridal-charcoal uppercase tracking-wider">Status Audit History</h4>
                <div className="space-y-1 text-[11px] text-bridal-mutedText">
                  {selectedOrder.statusTimeline?.map((t, idx) => (
                    <div key={idx} className="flex justify-between">
                      <span>• {t.status}: {t.note || 'Status updated'}</span>
                      <span className="font-mono text-[10px]">{new Date(t.timestamp).toLocaleTimeString()}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
