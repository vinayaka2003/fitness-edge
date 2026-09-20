import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import { SvglGoogleG } from '../common/SvglIcons';
import { Card3D } from '../common/Card3D';
import { Star, Copy, Check, ExternalLink } from 'lucide-react';
import { gymData } from '../../data/gym';

interface GoogleReviewQrCardProps {
  className?: string;
}

export const GoogleReviewQrCard: React.FC<GoogleReviewQrCardProps> = ({ className = '' }) => {
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
  const [copied, setCopied] = useState(false);

  const reviewUrl = gymData.coordinates.mapsSearchUrl;

  useEffect(() => {
    QRCode.toDataURL(reviewUrl, {
      width: 360,
      margin: 1,
      color: {
        dark: '#0a0a0e',
        light: '#ffffff',
      },
      errorCorrectionLevel: 'H',
    })
      .then((url: string) => setQrCodeUrl(url))
      .catch((err: unknown) => console.error('Error generating QR code:', err));
  }, [reviewUrl]);

  const handleCopy = () => {
    navigator.clipboard.writeText(reviewUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card3D
      intensity={12}
      scaleOnHover={1.02}
      glow={true}
      glowColor="rgba(66, 133, 244, 0.15)"
      className={`max-w-[340px] sm:max-w-[360px] mx-auto w-full select-none ${className}`}
    >
      <div className="relative w-full">
      {/* Main Front Glassmorphism Card */}
      <div className="relative rounded-[2rem] bg-gradient-to-br from-[#1c1c24] to-[#0a0a0f] text-white p-6 sm:p-8 shadow-[0_0_40px_rgba(0,0,0,0.5)] border border-white/[0.08] flex flex-col items-center">
        {/* Header Row */}
        <div className="w-full flex items-start justify-between gap-3 mb-6">
          {/* Google G Brand + Title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center p-2 shrink-0 shadow-inner">
              <SvglGoogleG size={22} />
            </div>
            <div>
              <span className="text-[10px] text-neutral-400 font-mono tracking-widest uppercase block leading-tight mb-1">
                Review Us On
              </span>
              <span className="text-xl font-bold text-white tracking-tight block leading-none">
                Google
              </span>
            </div>
          </div>

          {/* Clean Circular Stamp Badge (Static, refined, non-gimmicky) */}
          <div className="relative shrink-0 w-12 h-12 rounded-full bg-transparent border border-white/10 shadow-sm flex items-center justify-center">
            {/* SVG Circular Ring Text */}
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <path
                id="stampPath"
                d="M 50, 50 m -36, 0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0"
                fill="none"
              />
              <text className="text-[9.5px] font-mono uppercase tracking-[0.14em] fill-neutral-400 font-semibold">
                <textPath href="#stampPath" startOffset="0%">
                  • FITNESS EDGE • SCAN TO REVIEW
                </textPath>
              </text>
            </svg>
            {/* Center Star */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-4 h-4 rounded-full flex items-center justify-center">
                <Star className="w-3 h-3 text-[#C50212] fill-[#C50212]" />
              </div>
            </div>
          </div>
        </div>

        {/* QR Code Frame */}
        <div className="relative w-48 h-48 sm:w-52 sm:h-52 rounded-2xl bg-white p-3 border border-white/10 shadow-lg flex items-center justify-center mb-6">
          {qrCodeUrl ? (
            <img
              src={qrCodeUrl}
              alt="Scan to review Fitness Edge Prime on Google"
              className="w-full h-full object-contain rounded-lg mix-blend-multiply"
              loading="eager"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-neutral-400">
              <div className="w-6 h-6 rounded-full border-2 border-neutral-600 border-t-neutral-400 animate-spin" />
              <span className="text-[11px] font-mono">Loading QR...</span>
            </div>
          )}
        </div>

        {/* Descriptive Instruction */}
        <p className="text-center text-xs text-neutral-400 font-sans leading-relaxed px-2 mb-6">
          Scan the above QR code with your smartphone and make our day by leaving us a review on Google.
        </p>


      </div>
    </div>
  </Card3D>
);
};
