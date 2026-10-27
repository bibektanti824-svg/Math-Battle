/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import {
  ArrowLeft,
  QrCode,
  Upload,
  Copy,
  Check,
  Heart,
  Info,
  Camera,
  X,
  Eye,
  AlertCircle,
  HelpCircle,
} from 'lucide-react';
import { LanguageCode, TRANSLATIONS } from '../utils/translations';
import { soundManager } from '../utils/soundEffects';

interface SupportScreenProps {
  language: LanguageCode;
  soundEnabled: boolean;
  onBack: () => void;
}

export const SupportScreen: React.FC<SupportScreenProps> = ({
  language,
  soundEnabled,
  onBack,
}) => {
  const t = TRANSLATIONS[language];

  // The user provided their real QR image in workspace at /public/assets/aistudio/AccountQRCodeJio_Payments_Bank_-_2056_DARK_THEME_a7476353.png
  const uploadedAssetPath = '/assets/aistudio/AccountQRCodeJio_Payments_Bank_-_2056_DARK_THEME_a7476353.png';

  // Toggle between 'placeholder' (safe empty box) and 'preview_uploaded' (showing the user's real uploaded QR)
  const [activeDisplayMode, setActiveDisplayMode] = useState<'placeholder' | 'uploaded'>('uploaded');
  const [customFileUrl, setCustomFileUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // Separate Camera Scanner State (kept completely separated from the Support QR display)
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      soundManager.playButtonClick(soundEnabled);
      const url = URL.createObjectURL(file);
      setCustomFileUrl(url);
      setActiveDisplayMode('uploaded');
    }
  };

  const handleCopyNote = () => {
    soundManager.playButtonClick(soundEnabled);
    navigator.clipboard.writeText(t.support_friendly_msg);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Dedicated QR Camera Scanner methods (only requests permission on explicit user click)
  const startCameraScanner = async () => {
    soundManager.playButtonClick(soundEnabled);
    setCameraError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
      });
      mediaStreamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      setCameraActive(true);
    } catch (err: any) {
      setCameraError(
        err.name === 'NotAllowedError'
          ? 'Camera permission was denied. Please allow camera access in your browser settings to scan.'
          : 'Unable to access camera on this device.'
      );
      setCameraActive(false);
    }
  };

  const stopCameraScanner = () => {
    soundManager.playButtonClick(soundEnabled);
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      mediaStreamRef.current = null;
    }
    setCameraActive(false);
    setIsScannerOpen(false);
  };

  return (
    <div className="relative w-full h-full overflow-y-auto px-4 py-5 flex flex-col justify-between text-white select-none">
      <div>
        {/* Navigation & Title */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                soundManager.playButtonClick(soundEnabled);
                onBack();
              }}
              className="p-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 hover:text-white transition active:scale-95"
              aria-label={t.back}
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h2 className="text-lg font-bold text-slate-100">{t.support_title}</h2>
              <p className="text-xs text-purple-300 font-medium">Voluntary Creator Support</p>
            </div>
          </div>

          {/* Optional Separate Scanner Action */}
          <button
            onClick={() => {
              soundManager.playButtonClick(soundEnabled);
              setIsScannerOpen(true);
            }}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-900/90 border border-slate-700 text-slate-300 hover:text-white text-xs font-semibold hover:border-purple-500/50 transition active:scale-95"
            title="Open separate QR Scanner tool"
          >
            <Camera className="w-3.5 h-3.5 text-purple-400" />
            <span className="hidden sm:inline">Scanner</span>
          </button>
        </div>

        {/* Friendly Voluntary Support Message */}
        <div className="mt-4 p-4 rounded-2xl bg-gradient-to-br from-purple-950 via-slate-900 to-indigo-950 border border-purple-500/40 shadow-xl">
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-purple-600/30 text-purple-300 border border-purple-400/30 shrink-0">
              <Heart className="w-5 h-5 text-pink-400" />
            </div>
            <div>
              <p className="text-xs sm:text-sm text-purple-100 leading-relaxed font-medium">
                "{t.support_friendly_msg}"
              </p>
              <p className="text-[10px] text-purple-300/80 mt-1.5 font-sans">
                {t.qr_optional_note}
              </p>
            </div>
          </div>
        </div>

        {/* Main PhonePe QR Card */}
        <div className="mt-4 p-4 sm:p-5 rounded-3xl bg-slate-900/90 border border-purple-500/40 shadow-2xl flex flex-col items-center text-center relative overflow-hidden">
          {/* Top PhonePe-style Accent Bar */}
          <div className="w-full flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-purple-600 flex items-center justify-center font-bold text-xs text-white shadow-sm">
                पे
              </div>
              <span className="text-xs font-bold text-slate-200">PhonePe / UPI QR</span>
            </div>
            <span className="text-[10px] text-slate-400 font-mono">Direct Support</span>
          </div>

          {/* Mode Switcher: Placeholder vs Real Attached QR */}
          <div className="mt-3 flex items-center p-1 rounded-xl bg-slate-950/80 border border-slate-800 text-[11px] font-semibold">
            <button
              onClick={() => {
                soundManager.playButtonClick(soundEnabled);
                setActiveDisplayMode('uploaded');
              }}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg transition ${
                activeDisplayMode === 'uploaded'
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Real QR Image</span>
            </button>

            <button
              onClick={() => {
                soundManager.playButtonClick(soundEnabled);
                setActiveDisplayMode('placeholder');
              }}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg transition ${
                activeDisplayMode === 'placeholder'
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <QrCode className="w-3.5 h-3.5" />
              <span>Placeholder View</span>
            </button>
          </div>

          {/* QR Display Area */}
          <div className="my-3.5 p-3 bg-white rounded-2xl shadow-xl flex items-center justify-center">
            {activeDisplayMode === 'uploaded' ? (
              <div className="relative">
                <img
                  src={customFileUrl || uploadedAssetPath}
                  alt="Bibek Kumar Tanti PhonePe QR Code"
                  className="w-48 h-48 object-contain rounded-lg"
                  onError={() => {
                    // Safe fallback if local image fails to load
                    setActiveDisplayMode('placeholder');
                  }}
                />
              </div>
            ) : (
              /* Clearly marked placeholder when real QR is not shown */
              <div className="w-48 h-48 border-2 border-dashed border-purple-500 rounded-xl bg-purple-50/60 flex flex-col items-center justify-center p-3 text-slate-800">
                <QrCode className="w-16 h-16 text-purple-700 mb-1" />
                <span className="text-[10px] font-black uppercase text-purple-950 tracking-wider">
                  REAL PHONEPE QR PLACEHOLDER
                </span>
                <span className="text-[9px] text-purple-800/90 text-center mt-1 font-medium">
                  Reserved for Bibek's QR image.
                  <br />
                  No fake QR or fake UPI ID is used.
                </span>
              </div>
            )}
          </div>

          <p className="text-xs font-semibold text-slate-300">{t.phonepe_qr_subtitle}</p>

          {/* Android Studio File Path Guidance */}
          <div className="mt-3 w-full p-2.5 rounded-xl bg-slate-950/70 border border-slate-800 text-left">
            <div className="flex items-center gap-1.5 text-sky-400 text-[11px] font-semibold mb-1">
              <Info className="w-3.5 h-3.5" />
              <span>Android Resource Location for your QR image:</span>
            </div>
            <code className="block text-[10px] font-mono text-amber-300 break-all select-all bg-black/40 p-1.5 rounded">
              app/src/main/res/drawable/phonepe_qr.png
            </code>
            <p className="text-[10px] text-slate-400 mt-1">
              The Android app code safely falls back to a clean vector drawable if <span className="font-mono text-slate-300">phonepe_qr.png</span> is not present, ensuring zero compilation or runtime errors.
            </p>
          </div>

          {/* Upload another QR image option */}
          <div className="mt-3 w-full">
            <label className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-purple-900/30 hover:bg-purple-800/40 border border-purple-500/30 text-purple-200 text-xs font-semibold cursor-pointer transition active:scale-95">
              <Upload className="w-3.5 h-3.5" />
              <span>Upload Custom QR Image</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          </div>
        </div>
      </div>

      {/* Copy Note Button */}
      <div className="mt-4 pt-2">
        <button
          onClick={handleCopyNote}
          className="w-full py-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-xs text-slate-300 hover:text-white font-medium flex items-center justify-center gap-1.5 transition active:scale-95"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? t.copied : t.copy_support_msg}</span>
        </button>
      </div>

      {/* Dedicated Separate QR Camera Scanner Modal */}
      {isScannerOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
          <div className="w-full max-w-sm rounded-3xl bg-slate-900 border border-slate-700 p-5 text-white shadow-2xl relative">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Camera className="w-5 h-5 text-purple-400" />
                <h3 className="text-base font-bold text-white">QR Code Scanner</h3>
              </div>
              <button
                onClick={stopCameraScanner}
                className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-800"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="my-4 text-xs text-slate-300 leading-relaxed">
              <p>
                This camera scanner is completely separate from the creator support display. Camera permission is only requested when you start scanning.
              </p>
            </div>

            {/* Video Preview or Start Button */}
            <div className="w-full h-56 rounded-2xl bg-black border border-slate-800 flex flex-col items-center justify-center overflow-hidden relative">
              {cameraActive ? (
                <>
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    className="w-full h-full object-cover"
                  />
                  {/* Viewfinder Overlay */}
                  <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                    <div className="w-40 h-40 border-2 border-purple-400 rounded-xl animate-pulse" />
                  </div>
                </>
              ) : (
                <div className="p-4 text-center">
                  <Camera className="w-10 h-10 text-slate-600 mx-auto mb-2" />
                  <p className="text-xs text-slate-400 mb-3">
                    Camera is currently off. Click below to request permission and start scanning.
                  </p>
                  <button
                    onClick={startCameraScanner}
                    className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold shadow-md active:scale-95 transition"
                  >
                    Start Camera Scan
                  </button>
                </div>
              )}
            </div>

            {cameraError && (
              <div className="mt-3 p-2.5 rounded-xl bg-red-950/60 border border-red-800/80 text-red-200 text-xs flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <span>{cameraError}</span>
              </div>
            )}

            <div className="mt-4 pt-2">
              <button
                onClick={stopCameraScanner}
                className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition"
              >
                Close Scanner
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
