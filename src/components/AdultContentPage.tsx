import React, { useState } from 'react';
import { ChevronLeft, Search, X } from 'lucide-react';
import { AdultBannerItem } from '../types';

interface AdultContentPageProps {
  items: AdultBannerItem[];
  tutorialBanner?: string;   // "কিভাবে দেখবেন" banner URL
  tutorialLink?: string;
  onClose: () => void;
}

const AdultContentPage: React.FC<AdultContentPageProps> = ({
  items, tutorialBanner, tutorialLink, onClose
}) => {
  const allCats = ['All', ...Array.from(new Set(items.map(i => i.category || 'General')))];
  const [activeCat, setActiveCat] = useState('All');
  const [search, setSearch] = useState('');

  const filtered = items
    .filter(i => activeCat === 'All' || (i.category || 'General') === activeCat)
    .filter(i => !search || i.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div style={{
      position: 'fixed', inset: 0,
      background: '#f4f4f8',
      zIndex: 200,
      overflowY: 'auto',
      WebkitOverflowScrolling: 'touch',
    }}>

      {/* ── Header ── */}
      <div style={{
        position: 'sticky', top: 0,
        background: '#f4f4f8',
        zIndex: 10,
        borderBottom: '1px solid rgba(0,0,0,0.07)',
        transform: 'translateZ(0)',
      }}>
        <div style={{ padding: '12px 16px 0' }}>
          {/* Back + Title */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
            <button
              onClick={onClose}
              style={{
                width: 36, height: 36, borderRadius: '50%',
                background: 'rgba(0,0,0,0.07)',
                border: 'none',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <ChevronLeft size={20} color="#333" />
            </button>
            <h1 style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: '17px', fontWeight: 800, color: '#111',
            }}>🔞 18+ Channel</h1>
          </div>

          {/* Category tabs */}
          <div className="no-scrollbar" style={{
            display: 'flex', gap: '8px',
            overflowX: 'auto', paddingBottom: '12px',
          }}>
            {allCats.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCat(cat)}
                style={{
                  flexShrink: 0,
                  padding: '8px 18px',
                  borderRadius: '24px',
                  border: 'none',
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '12px', fontWeight: 700,
                  cursor: 'pointer',
                  background: activeCat === cat ? '#1877F2' : '#e5e5ea',
                  color: activeCat === cat ? '#fff' : '#555',
                  boxShadow: activeCat === cat ? '0 3px 10px rgba(24,119,242,0.35)' : 'none',
                }}
              >
                {cat === 'Trending' ? `${cat} 🔥` : cat}
              </button>
            ))}
          </div>

          {/* Search bar */}
          <div style={{
            position: 'relative',
            marginBottom: '14px',
          }}>
            <Search size={16} color="#999" style={{
              position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)',
            }} />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search title..."
              style={{
                width: '100%',
                padding: '11px 40px 11px 40px',
                borderRadius: '14px',
                border: '1.5px solid rgba(0,0,0,0.1)',
                background: '#fff',
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '13px', color: '#111',
                outline: 'none',
                boxSizing: 'border-box',
                boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
              }}
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                style={{
                  position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
                  background: 'none', border: 'none', cursor: 'pointer',
                }}
              >
                <X size={16} color="#999" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── Content ── */}
      <div style={{ padding: '14px 16px 100px' }}>

        {/* Tutorial Banner */}
        {tutorialBanner && (
          <div
            onClick={() => tutorialLink && window.open(tutorialLink, '_blank')}
            style={{
              borderRadius: '16px',
              overflow: 'hidden',
              marginBottom: '16px',
              cursor: tutorialLink ? 'pointer' : 'default',
              boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
            }}
          >
            <img
              src={tutorialBanner}
              alt="How to watch"
              style={{ width: '100%', display: 'block', borderRadius: '16px' }}
            />
          </div>
        )}

        {/* Content List */}
        {filtered.length === 0 ? (
          <div style={{
            textAlign: 'center', padding: '50px 0',
            color: '#999',
            fontFamily: "'DM Sans', sans-serif", fontSize: '13px',
          }}>
            কোনো content পাওয়া যায়নি
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {filtered.map(item => (
              <ContentCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// ── Content Card — list style ──
const ContentCard: React.FC<{ item: AdultBannerItem }> = ({ item }) => {
  const handleWatch = () => {
    if (item.channelLink) window.open(item.channelLink, '_blank');
  };

  return (
    <div style={{
      background: '#fff',
      borderRadius: '16px',
      padding: '12px',
      display: 'flex',
      gap: '12px',
      alignItems: 'stretch',
      boxShadow: '0 2px 10px rgba(0,0,0,0.07)',
    }}>
      {/* Thumbnail */}
      <div style={{
        position: 'relative',
        width: '120px',
        flexShrink: 0,
        borderRadius: '10px',
        overflow: 'hidden',
        background: '#eee',
        aspectRatio: '4/3',
        alignSelf: 'center',
      }}>
        <img
          src={item.thumbnail}
          alt={item.title}
          loading="lazy"
          decoding="async"
          style={{
            width: '100%', height: '100%',
            objectFit: 'cover',
          }}
        />
        {/* Duration badge if available */}
        {(item as any).duration && (
          <div style={{
            position: 'absolute', bottom: 5, right: 5,
            background: 'rgba(0,0,0,0.75)',
            borderRadius: '5px', padding: '2px 5px',
          }}>
            <span style={{ fontSize: '10px', color: '#fff', fontWeight: 700 }}>
              {(item as any).duration}
            </span>
          </div>
        )}
      </div>

      {/* Info */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minWidth: 0 }}>
        {/* Title */}
        <p style={{
          fontFamily: "'Outfit', sans-serif",
          fontSize: '14px', fontWeight: 700,
          color: '#111',
          marginBottom: '4px',
          overflow: 'hidden',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          lineHeight: '1.35',
        }}>
          {item.title}
        </p>

        {/* Watch & Unlock label */}
        <p style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: '12px', fontWeight: 700,
          color: '#1877F2',
          marginBottom: '8px',
        }}>
          WATCH & UNLOCK 😊
        </p>

        {/* Watch button */}
        <button
          onClick={handleWatch}
          style={{
            width: '100%',
            padding: '10px',
            borderRadius: '10px',
            border: 'none',
            background: 'linear-gradient(135deg, #1877F2, #0a5cd8)',
            color: '#fff',
            fontFamily: "'Outfit', sans-serif",
            fontSize: '12px', fontWeight: 800,
            cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            gap: '6px',
            boxShadow: '0 4px 12px rgba(24,119,242,0.35)',
            letterSpacing: '0.03em',
          }}
        >
          🔓 WATCH NOW
        </button>
      </div>
    </div>
  );
};

export default AdultContentPage;
