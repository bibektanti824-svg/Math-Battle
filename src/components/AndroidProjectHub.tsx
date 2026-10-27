/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import JSZip from 'jszip';
import {
  FolderTree,
  FileCode,
  Download,
  Copy,
  Check,
  Smartphone,
  Layers,
  Terminal,
  HelpCircle,
  ExternalLink,
  QrCode,
  CheckCircle2,
} from 'lucide-react';
import { ANDROID_PROJECT_FILES, AndroidFileRecord } from '../android/androidProjectFiles';

export const AndroidProjectHub: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<AndroidFileRecord>(ANDROID_PROJECT_FILES[0]);
  const [copied, setCopied] = useState(false);
  const [isZipping, setIsZipping] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filteredFiles =
    activeCategory === 'all'
      ? ANDROID_PROJECT_FILES
      : ANDROID_PROJECT_FILES.filter((f) => f.category === activeCategory);

  const handleCopy = () => {
    navigator.clipboard.writeText(selectedFile.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadZip = async () => {
    setIsZipping(true);
    try {
      const zip = new JSZip();

      // Add every Android Studio project file to the zip in its exact folder structure
      ANDROID_PROJECT_FILES.forEach((file) => {
        zip.file(file.path, file.content);
      });

      // Try fetching and bundling the user's real uploaded PhonePe QR code
      try {
        const qrResponse = await fetch('/assets/aistudio/AccountQRCodeJio_Payments_Bank_-_2056_DARK_THEME_a7476353.png');
        if (qrResponse.ok) {
          const qrBlob = await qrResponse.blob();
          zip.file('app/src/main/res/drawable/phonepe_qr.png', qrBlob);
        }
      } catch (_err) {
        // Safe fallback if asset is missing
      }

      // Add README.md
      zip.file(
        'README.md',
        `# Math Battle - Complete Android Studio Project
Package Name: com.bibek.mathbattle
Author: Bibek Kumar Tanti

## How to Open & Run in Android Studio
1. Open Android Studio (Ladybug / Hedgehog / Flamingo or newer).
2. Choose **Open an Existing Project** and select this extracted folder.
3. Let Android Studio perform Gradle Sync automatically.
4. Connect an Android phone via USB (with USB Debugging enabled) or start an Android Emulator.
5. Click the green **Run (▶)** button!

## Adding Your Real PhonePe QR Image
Place your PNG image named \`phonepe_qr.png\` inside:
\`app/src/main/res/drawable/phonepe_qr.png\`
The app will automatically detect and show your real payment QR code on the Support screen!
`
      );

      const content = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(content);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'MathBattle_Android_Studio_Project.zip';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Error generating zip:', err);
    } finally {
      setIsZipping(false);
    }
  };

  return (
    <div className="w-full h-full flex flex-col bg-slate-950 text-slate-100 overflow-hidden">
      {/* Top Banner */}
      <div className="px-6 py-4 border-b border-slate-800 bg-slate-900/80 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Smartphone className="w-6 h-6 text-sky-400" />
            <h1 className="text-xl font-bold tracking-tight text-white">
              Android Studio Project Repository
            </h1>
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-mono font-bold border border-emerald-500/30">
              com.bibek.mathbattle
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Complete, integrated Kotlin, Gradle, XML, and Resource architecture ready for Android Studio.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={handleDownloadZip}
            disabled={isZipping}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold shadow-lg shadow-blue-600/30 active:scale-95 transition disabled:opacity-50"
          >
            <Download className="w-4 h-4" />
            <span>{isZipping ? 'Bundling ZIP...' : 'Download Full Project (.ZIP)'}</span>
          </button>
        </div>
      </div>

      {/* Main Content Area: Sidebar + Code Viewer */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Left Sidebar: File Tree & Filters */}
        <div className="w-full lg:w-80 border-r border-slate-800 bg-slate-900/50 flex flex-col overflow-hidden">
          {/* Category Filter Tabs */}
          <div className="p-3 border-b border-slate-800 flex flex-wrap gap-1 text-[11px]">
            {['all', 'kotlin', 'layout', 'values', 'gradle', 'manifest'].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-2.5 py-1 rounded-lg uppercase tracking-wider font-bold transition ${
                  activeCategory === cat
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* File List */}
          <div className="flex-1 overflow-y-auto p-2 space-y-1">
            {filteredFiles.map((file) => {
              const isSelected = selectedFile.path === file.path;
              return (
                <button
                  key={file.path}
                  onClick={() => setSelectedFile(file)}
                  className={`w-full text-left px-3 py-2 rounded-xl transition flex items-start gap-2.5 text-xs ${
                    isSelected
                      ? 'bg-blue-600/20 border border-blue-500/50 text-white shadow-sm'
                      : 'hover:bg-slate-800/60 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <FileCode
                    className={`w-4 h-4 shrink-0 mt-0.5 ${
                      isSelected ? 'text-sky-400' : 'text-slate-500'
                    }`}
                  />
                  <div className="truncate">
                    <p className={`font-mono truncate ${isSelected ? 'font-bold' : ''}`}>
                      {file.path.split('/').pop()}
                    </p>
                    <p className="text-[10px] text-slate-500 truncate font-sans">
                      {file.path}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Quick Info Box */}
          <div className="p-3 border-t border-slate-800 bg-slate-900/80 text-[11px] text-slate-400 space-y-1.5">
            <div className="flex items-center gap-1.5 text-purple-400 font-bold">
              <QrCode className="w-3.5 h-3.5" />
              <span>PhonePe QR Image Path:</span>
            </div>
            <code className="block bg-black/50 p-1.5 rounded text-[10px] text-amber-300 font-mono break-all select-all">
              app/src/main/res/drawable/phonepe_qr.png
            </code>
          </div>
        </div>

        {/* Right Code Display */}
        <div className="flex-1 flex flex-col bg-slate-950 overflow-hidden">
          {/* File Header Bar */}
          <div className="px-5 py-3 border-b border-slate-800 bg-slate-900/60 flex items-center justify-between gap-4">
            <div className="truncate">
              <p className="text-xs font-mono text-sky-400 font-bold truncate">
                {selectedFile.path}
              </p>
              <p className="text-[11px] text-slate-400 truncate">
                {selectedFile.description}
              </p>
            </div>

            <button
              onClick={handleCopy}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition active:scale-95 shrink-0 ${
                copied
                  ? 'bg-emerald-600/20 border-emerald-500 text-emerald-300'
                  : 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700'
              }`}
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy File'}</span>
            </button>
          </div>

          {/* Code Content */}
          <div className="flex-1 overflow-auto p-4 bg-slate-950 font-mono text-xs leading-relaxed text-slate-300 select-text">
            <pre className="whitespace-pre">
              <code>{selectedFile.content}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};
