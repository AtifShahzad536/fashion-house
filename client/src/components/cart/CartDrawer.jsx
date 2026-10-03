import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { X, Trash2, ShoppingBag, ArrowRight, Sparkles } from 'lucide-react';
import {
  toggleCartDrawer,
  removeFromCart,
  updateQuantity,
  calculateTotals,
} from '../../redux/slices/cartSlice.js';

export default function CartDrawer() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems, isCartOpen } = useSelector((state) => state.cart);
  const totals = calculateTotals({ cartItems });

  if (!isCartOpen) return null;

  const handleCheckout = () => {
    dispatch(toggleCartDrawer(false));
    navigate('/checkout');
  };

  const handleViewCart = () => {
    dispatch(toggleCartDrawer(false));
    navigate('/cart');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => dispatch(toggleCartDrawer(false))}
        className="absolute inset-0 bg-bridal-charcoal/60 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white border-l border-bridal-border flex flex-col shadow-2xl">
          {/* Header */}
          <div className="px-6 py-5 border-b border-gray-200 flex items-center justify-between bg-[#F9FAFB]">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#991B1B]" />
              <h2 className="text-lg font-serif tracking-wider text-[#111827] uppercase">
                Bridal Bag ({cartItems.reduce((a, c) => a + c.qty, 0)})
              </h2>
            </div>
            <button
              onClick={() => dispatch(toggleCartDrawer(false))}
              className="p-1.5 rounded-[6px] text-gray-400 hover:text-[#111827] hover:bg-gray-100 transition"
            >
              <X size={20} />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#F9FAFB] border border-gray-200 flex items-center justify-center text-[#991B1B]">
                  <ShoppingBag size={28} />
                </div>
                <div className="space-y-1">
                  <h3 className="font-serif text-lg text-[#111827]">Your Atelier Bag is Empty</h3>
                  <p className="text-xs text-gray-500 max-w-xs">
                    Explore our heirloom bridal collections or design a bespoke custom lehenga.
                  </p>
                </div>
                <button
                  onClick={() => {
                    dispatch(toggleCartDrawer(false));
                    navigate('/shop');
                  }}
                  className="px-6 py-2.5 bg-[#111827] hover:bg-[#991B1B] text-white text-xs font-semibold uppercase tracking-wider rounded-[6px] transition shadow-md"
                >
                  Explore Collections
                </button>
              </div>
            ) : (
              cartItems.map((item, index) => {
                const isCustom = !!item.isCustomized;
                return (
                  <div
                    key={`${item._id}-${item.size}-${index}`}
                    className="flex gap-4 p-3 bg-[#F9FAFB] border border-gray-200 rounded-[6px] relative group"
                  >
                    <img
                      src={item.image || item.previewImage || 'https://images.unsplash.com/photo-1610030469983-98e550d6193c'}
                      alt={item.name}
                      className="w-20 h-26 object-cover rounded-[4px] flex-shrink-0"
                    />

                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <h4 className="text-xs font-semibold text-[#111827] truncate max-w-[180px]">
                            {item.name}
                          </h4>
                          <button
                            onClick={() =>
                              dispatch(
                                removeFromCart({
                                  id: item._id,
                                  size: item.size,
                                  customizationId: item.customizationId,
                                })
                              )
                            }
                            className="text-gray-400 hover:text-red-600 p-0.5 transition"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>

                        {isCustom ? (
                          <div className="mt-1 space-y-0.5">
                            <span className="inline-flex items-center gap-1 text-[10px] bg-[#991B1B]/10 text-[#991B1B] font-semibold px-2 py-0.5 rounded-[4px]">
                              <Sparkles size={10} /> Bespoke Tailored
                            </span>
                            <p className="text-[11px] text-gray-500 truncate">
                              Fabric: {item.customizationDetails?.fabric?.name || 'Pure Raw Silk'}
                            </p>
                            <p className="text-[11px] text-gray-500">
                              Measurements: {item.customizationDetails?.measurements?.type === 'custom' ? 'Custom Tailored' : `Size ${item.size}`}
                            </p>
                          </div>
                        ) : (
                          <p className="text-[11px] text-gray-500 mt-1">
                            Size: <span className="font-semibold text-[#111827]">{item.size || 'M'}</span>
                          </p>
                        )}
                      </div>

                      <div className="flex justify-between items-center mt-3 pt-2 border-t border-gray-200">
                        {/* Qty Controls */}
                        <div className="flex items-center border border-gray-200 rounded-[6px] bg-white">
                          <button
                            onClick={() =>
                              dispatch(
                                updateQuantity({
                                  id: item._id,
                                  size: item.size,
                                  customizationId: item.customizationId,
                                  qty: item.qty - 1,
                                })
                              )
                            }
                            disabled={item.qty <= 1}
                            className="px-2 py-0.5 text-xs text-[#111827] hover:bg-gray-100 disabled:opacity-30"
                          >
                            -
                          </button>
                          <span className="px-2 text-xs font-medium text-[#111827]">{item.qty}</span>
                          <button
                            onClick={() =>
                              dispatch(
                                updateQuantity({
                                  id: item._id,
                                  size: item.size,
                                  customizationId: item.customizationId,
                                  qty: item.qty + 1,
                                })
                              )
                            }
                            className="px-2 py-0.5 text-xs text-[#111827] hover:bg-gray-100"
                          >
                            +
                          </button>
                        </div>

                        <div className="text-right">
                          <span className="text-xs font-semibold text-[#111827]">
                            PKR {((item.price + (item.customizationCharge || 0)) * item.qty).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer Summary & Checkout */}
          {cartItems.length > 0 && (
            <div className="p-6 bg-[#F9FAFB] border-t border-gray-200 space-y-4">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-gray-500">
                  <span>Subtotal</span>
                  <span className="font-medium text-[#111827]">PKR {totals.itemsPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>Estimated Bridal Shipping</span>
                  <span className="font-medium text-[#111827]">
                    {totals.shippingPrice === 0 ? 'Complimentary' : `PKR ${totals.shippingPrice.toLocaleString()}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-semibold text-[#111827] pt-2 border-t border-gray-200">
                  <span>Estimated Total</span>
                  <span className="text-[#991B1B]">PKR {totals.totalPrice.toLocaleString()}</span>
                </div>
              </div>

              <div className="space-y-2">
                <button
                  onClick={handleCheckout}
                  className="w-full py-3 bg-[#111827] hover:bg-[#991B1B] text-white text-xs font-semibold uppercase tracking-widest rounded-[6px] flex items-center justify-center gap-2 shadow-luxury transition"
                >
                  <span>Proceed to Secure Checkout</span>
                  <ArrowRight size={14} />
                </button>
                <button
                  onClick={handleViewCart}
                  className="w-full py-2.5 bg-white hover:bg-gray-100 border border-gray-200 text-[#111827] text-xs font-medium uppercase tracking-wider rounded-[6px] transition"
                >
                  View Full Shopping Bag
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
