"use client";

import React, { useState } from 'react';
import { MapPin, Star, X } from 'lucide-react';

const getCategoryStyle = (category) => {
  const cat = category ? category.toLowerCase() : '';
  if (cat.includes('alam')) return { bg: 'rgba(16, 185, 129, 0.15)', text: '#34d399' }; // Hijau / Emerald
  if (cat.includes('kota') || cat.includes('landmark')) return { bg: 'rgba(59, 130, 246, 0.15)', text: '#60a5fa' }; // Biru
  if (cat.includes('budaya') || cat.includes('sejarah')) return { bg: 'rgba(245, 158, 11, 0.15)', text: '#fbbf24' }; // Kuning/Amber
  if (cat.includes('hiburan')) return { bg: 'rgba(236, 72, 153, 0.15)', text: '#f472b6' }; // Pink
  if (cat.includes('religi')) return { bg: 'rgba(168, 85, 247, 0.15)', text: '#c084fc' }; // Ungu
  return { bg: 'rgba(20, 184, 166, 0.1)', text: 'var(--accent-teal)' }; // Default Teal
};

export default function DataTable({ data, start }) {
  const [selectedItem, setSelectedItem] = useState(null);

  // Fungsi untuk mencegah body scrolling saat popup terbuka
  React.useEffect(() => {
    if (selectedItem) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [selectedItem]);

  return (
    <>
      <div className="glass" style={{ overflowX: 'auto', padding: '1rem', borderRadius: '16px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.95rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--glass-border)', color: 'var(--accent-teal)' }}>
              <th style={{ padding: '1rem 1.5rem', fontWeight: '600' }}>No</th>
              <th style={{ padding: '1rem 1.5rem', fontWeight: '600' }}>Destinasi Wisata</th>
              <th style={{ padding: '1rem 1.5rem', fontWeight: '600' }}>Kategori</th>
              <th style={{ padding: '1rem 1.5rem', fontWeight: '600' }}>Alamat</th>
              <th style={{ padding: '1rem 1.5rem', fontWeight: '600' }}>Rating (Ulasan)</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => {
              const catStyle = getCategoryStyle(item.kategori);
              return (
                  <tr 
                    key={item.id || item.place_id || index} 
                    className="table-row-hover"
                    style={{ 
                      borderBottom: '1px solid rgba(255, 255, 255, 0.05)', 
                      transition: 'background 0.2s',
                      cursor: 'pointer'
                    }}
                    onClick={() => setSelectedItem(item)}
                  >
                  <td style={{ padding: '1rem 1.5rem', color: 'var(--text-secondary)' }}>{start + index + 1}</td>
                  <td style={{ padding: '1rem 1.5rem' }}>
                    <div style={{ fontWeight: '500', color: 'var(--text-primary)', fontFamily: 'Outfit, sans-serif', fontSize: '1.05rem' }}>{item.nama_wisata}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>{item.kabupaten}</div>
                  </td>
                  <td style={{ padding: '1rem 1.5rem' }}>
                    <span style={{ 
                      display: 'inline-block', 
                      whiteSpace: 'nowrap',
                      background: catStyle.bg, 
                      color: catStyle.text, 
                      padding: '0.35rem 0.75rem', 
                      borderRadius: '12px', 
                      fontSize: '0.75rem', 
                      fontWeight: '600' 
                    }}>
                      {item.kategori || '-'}
                    </span>
                  </td>
                  <td style={{ padding: '1rem 1.5rem', color: 'var(--text-secondary)', maxWidth: '250px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={item.alamat}>
                    {item.alamat || '-'}
                  </td>
                  <td style={{ padding: '1rem 1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: '#fbbf24', fontWeight: '600' }}>
                      ★ {item.rating ? Number(item.rating).toFixed(1) : 'N/A'} <span style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', fontWeight: 'normal' }}>({item.jumlah_review ? parseInt(item.jumlah_review).toLocaleString('id-ID') : '0'})</span>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* POP UP Modal Detail Wisata */}
      {selectedItem && (
        <div 
          className="modal-container"
          style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, 
            backgroundColor: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            zIndex: 9999, padding: '1.5rem'
          }}
          onClick={() => setSelectedItem(null)} //Tutup jika area luar di klik
        >
          <div 
            className="animate-fade-in modal-box"
            style={{
              width: '100%', maxWidth: '750px', backgroundColor: 'var(--bg-dark)',
              borderRadius: '24px', overflow: 'hidden', position: 'relative',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)', border: '1px solid var(--glass-border)',
              display: 'flex', flexDirection: 'column', maxHeight: '95vh'
            }}
            onClick={(e) => e.stopPropagation()} // Mencegah tutup saat popup di klik
          >
            {/* Tombol Tutup (X) */}
            <button 
              onClick={() => setSelectedItem(null)}
              style={{
                position: 'absolute', top: '15px', right: '15px', 
                background: 'rgba(0,0,0,0.6)', border: '1px solid rgba(255,255,255,0.2)', 
                color: 'white', borderRadius: '50%', width: '40px', height: '40px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', zIndex: 10, transition: '0.2s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.8)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(0,0,0,0.6)'}
            >
              <X size={20} />
            </button>
            
            {/* Maps Banner */}
            <div className="modal-banner" style={{ width: '100%', height: '320px', backgroundColor: '#1e293b', position: 'relative', flexShrink: 0 }}>
              {(selectedItem.lat && selectedItem.long) ? (
                <iframe
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  style={{ border: 0 }}
                  src={`https://maps.google.com/maps?q=${selectedItem.lat},${selectedItem.long}&z=15&output=embed`}
                  allowFullScreen
                  title={selectedItem.nama_wisata}
                />
              ) : (
                <div style={{ width: '100%', height: '100%', display: 'flex', flexCol: 'column', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)' }}>
                  <MapPin size={48} opacity={0.5} style={{ marginBottom: '1rem' }} />
                  <p>Koordinat Peta Tidak Tersedia</p>
                </div>
              )}
            </div>

            {/* Isi Konten Popup */}
            <div className="modal-body" style={{ flex: 1, minHeight: 0, padding: '2rem', position: 'relative', marginTop: '-40px', overflowY: 'auto' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                <div style={{ flex: '1 1 min-content' }}>
                  <span style={{ 
                    display: 'inline-block', background: getCategoryStyle(selectedItem.kategori).bg, color: getCategoryStyle(selectedItem.kategori).text, 
                    padding: '0.4rem 1rem', borderRadius: '20px', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.8rem',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.3)'
                  }}>
                    {selectedItem.kategori || 'Tanpa Kategori'}
                  </span>
                  <h2 className="modal-title" style={{ fontSize: '2.2rem', fontFamily: 'Outfit, sans-serif', color: 'var(--text-primary)', marginBottom: '0.5rem', lineHeight: '1.1' }}>
                    {selectedItem.nama_wisata}
                  </h2>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                    <MapPin size={16} color="var(--accent-teal)" />
                    {selectedItem.kabupaten}, {selectedItem.provinsi || 'Sulawesi Selatan'}
                  </div>
                </div>
                <div className="modal-stats" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', background: 'rgba(30, 41, 59, 0.8)', padding: '0.8rem 1.2rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#fbbf24', fontSize: '1.6rem', fontWeight: 'bold' }}>
                    <Star size={24} fill="#fbbf24" /> {selectedItem.rating ? Number(selectedItem.rating).toFixed(1) : 'N/A'}
                  </div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
                    {selectedItem.jumlah_review ? parseInt(selectedItem.jumlah_review).toLocaleString('id-ID') : '0'} ulasan
                  </div>
                </div>
              </div>

              <div style={{ borderTop: '1px solid var(--glass-border)', paddingTop: '1.5rem' }}>
                <h4 style={{ color: 'var(--text-primary)', marginBottom: '0.8rem', fontSize: '1.1rem', fontFamily: 'Outfit, sans-serif' }}>📍 Alamat Lengkap</h4>
                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', fontSize: '1rem', background: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: '12px' }}>
                  {selectedItem.alamat || 'Informasi alamat tidak tersedia.'}
                </p>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginTop: '1.5rem' }}>
                  <span style={{ color: 'var(--glass-border)', fontSize: '0.75rem' }}>
                    {selectedItem.place_id ? `Google Place ID: ${selectedItem.place_id}` : ''}
                  </span>
                  
                  {/* Tombol Ke Maps Asli */}
                  <a 
                    href={selectedItem.lat && selectedItem.long ? `https://www.google.com/maps/search/?api=1&query=${selectedItem.lat},${selectedItem.long}${selectedItem.place_id ? `&query_place_id=${selectedItem.place_id}` : ''}` : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(selectedItem.nama_wisata)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                      background: 'linear-gradient(135deg, var(--accent-blue), var(--accent-teal))',
                      color: 'white', padding: '0.75rem 1.5rem', borderRadius: '30px',
                      textDecoration: 'none', fontWeight: 'bold', fontSize: '0.95rem',
                      boxShadow: '0 4px 15px rgba(20, 184, 166, 0.3)', transition: 'all 0.2s',
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(20, 184, 166, 0.4)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 15px rgba(20, 184, 166, 0.3)'; }}
                  >
                    <MapPin size={18} /> Buka di Google Maps
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
