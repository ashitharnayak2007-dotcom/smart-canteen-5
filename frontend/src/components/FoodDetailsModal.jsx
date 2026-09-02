import React from 'react';
import { X, Clock, Flame, Star, Check, Plus, ShoppingBag } from 'lucide-react';
import { useApp } from '../context/AppContext.jsx';

export default function FoodDetailsModal() {
  const { selectedFoodDetail, setSelectedFoodDetail, addToCart, cart, updateCartQty, setIsCartOpen } = useApp();

  if (!selectedFoodDetail) return null;

  const inCart = cart.find((i) => i.id === selectedFoodDetail.id);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        backgroundColor: 'rgba(10, 15, 29, 0.8)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem'
      }}
      onClick={() => setSelectedFoodDetail(null)}
    >
      <div
        className="card card-glow"
        style={{
          width: '100%',
          maxWidth: '520px',
          background: '#1e293b',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          borderRadius: '20px',
          padding: '2rem',
          position: 'relative',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setSelectedFoodDetail(null)}
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            background: 'rgba(255, 255, 255, 0.08)',
            border: 'none',
            color: '#94a3b8',
            borderRadius: '50%',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
        >
          <X size={18} />
        </button>

        {/* Emoji Hero & Tag */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', marginBottom: '1.5rem' }}>
          <div
            style={{
              fontSize: '3.5rem',
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '16px',
              width: '90px',
              height: '90px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid var(--border-subtle)'
            }}
          >
            {selectedFoodDetail.image}
          </div>
          <div>
            <span className="badge badge-brand" style={{ marginBottom: '0.4rem' }}>
              {selectedFoodDetail.tag || selectedFoodDetail.category}
            </span>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>{selectedFoodDetail.name}</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '0.25rem', fontSize: '0.85rem' }}>
              <span style={{ color: '#10b981', fontWeight: 800, fontSize: '1.25rem' }}>₹{selectedFoodDetail.price}</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', color: '#fbbf24' }}>
                <Star size={14} fill="#fbbf24" /> {selectedFoodDetail.rating}
              </span>
            </div>
          </div>
        </div>

        {/* Description */}
        <p style={{ color: '#cbd5e1', fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
          {selectedFoodDetail.description}
        </p>

        {/* Metrics Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '0.75rem',
            background: 'rgba(15, 23, 42, 0.6)',
            padding: '1rem',
            borderRadius: '12px',
            marginBottom: '1.75rem',
            border: '1px solid var(--border-subtle)'
          }}
        >
          <div style={{ textAlign: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'center', color: '#38bdf8', marginBottom: '0.2rem' }}>
              <Clock size={16} />
            </div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>PREP TIME</div>
            <div style={{ fontSize: '0.85rem', fontWeight: 700 }}>{selectedFoodDetail.prepTime}</div>
          </div>
          <div style={{ textAlign: 'center', borderLeft: '1px solid var(--border-subtle)', borderRight: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'flex', justifyContent: 'center', color: '#f59e0b', marginBottom: '0.2rem' }}>
              <Flame size={16} />
            </div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>CALORIES</div>
            <div style={{ fontSize: '0.85rem', fontWeight: 700 }}>{selectedFoodDetail.calories}</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'center', color: '#10b981', marginBottom: '0.2rem' }}>
              <Check size={16} />
            </div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>DIETARY</div>
            <div style={{ fontSize: '0.85rem', fontWeight: 700 }}>100% Veg</div>
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          {inCart ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flex: 1 }}>
              <button
                onClick={() => updateCartQty(selectedFoodDetail.id, -1)}
                style={{
                  background: '#334155',
                  border: 'none',
                  color: '#fff',
                  borderRadius: '8px',
                  width: '44px',
                  height: '44px',
                  fontSize: '1.25rem',
                  cursor: 'pointer',
                  fontWeight: 700
                }}
              >
                -
              </button>
              <div style={{ flex: 1, textAlign: 'center', fontWeight: 800, fontSize: '1.1rem' }}>
                {inCart.qty} in Cart
              </div>
              <button
                onClick={() => updateCartQty(selectedFoodDetail.id, 1)}
                style={{
                  background: '#10b981',
                  border: 'none',
                  color: '#fff',
                  borderRadius: '8px',
                  width: '44px',
                  height: '44px',
                  fontSize: '1.25rem',
                  cursor: 'pointer',
                  fontWeight: 700
                }}
              >
                +
              </button>
            </div>
          ) : (
            <button
              onClick={() => {
                addToCart(selectedFoodDetail);
              }}
              className="btn btn-primary"
              style={{ flex: 1, padding: '0.85rem', fontSize: '0.95rem' }}
            >
              <Plus size={18} /> Add to Cart • ₹{selectedFoodDetail.price}
            </button>
          )}

          <button
            onClick={() => {
              if (!inCart) addToCart(selectedFoodDetail);
              setSelectedFoodDetail(null);
              setIsCartOpen(true);
            }}
            className="btn btn-secondary"
            style={{ padding: '0.85rem 1.25rem', fontSize: '0.95rem' }}
          >
            <ShoppingBag size={18} /> Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
