import React from 'react';

const Footer = () => {
  return (
    <footer id="footer" className="relative mt-16 overflow-hidden">
      {/* Top border gradient */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />

      <div className="bg-gray-950/80 backdrop-blur-xl py-10 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center gap-6">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/30">
                <span className="text-white text-lg font-black">S</span>
              </div>
              <span className="text-white font-extrabold text-2xl tracking-tight">
                Study<span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Spark</span>
              </span>
            </div>

            {/* Tagline */}
            <p className="text-gray-400 text-sm text-center max-w-sm">
              Your smart academic companion — track, plan, and achieve your academic goals.
            </p>

            {/* Author Info */}
            <div className="flex flex-col items-center gap-1 text-center">
              <div className="text-white font-semibold text-base">Manushree V</div>
              <a
                href="mailto:vmanushree2006@gmail.com"
                id="footer-email-link"
                className="text-blue-400 hover:text-blue-300 text-sm transition-colors"
              >
                vmanushree2006@gmail.com
              </a>
            </div>

            {/* CTA Button */}
            <a
              id="digital-heroes-btn"
              href="https://digitalheroesco.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold text-sm shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 hover:opacity-90 transition-all duration-200 hover:-translate-y-0.5"
            >
              Built for Digital Heroes
            </a>

            {/* Divider */}
            <div className="w-full h-px bg-white/5" />

            {/* Bottom bar */}
            <div className="flex flex-wrap justify-center sm:justify-between items-center w-full gap-2 text-xs text-gray-600 text-center">
              <span>© 2026 StudySpark by Manushree V</span>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Data stored locally
                </span>
                <span>No backend · No data collection</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
