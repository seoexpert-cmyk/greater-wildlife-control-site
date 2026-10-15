import React from 'react';
import { Phone } from 'lucide-react';

// Sticky bottom bar shown only on small screens, mirroring the desktop
// header's dual actions: call now, or jump to the lead capture form.
const MobileStickyBar = () => (
  <div className="fixed inset-x-0 bottom-0 z-50 flex items-stretch border-t border-stone-800 bg-stone-900 sm:hidden">
    <a
      href="tel:18002649416"
      className="flex flex-1 items-center justify-center gap-2 py-3.5 text-sm font-semibold text-stone-200"
    >
      <Phone className="h-4 w-4" />
      Call
    </a>
    <a
      href="#lead-capture"
      className="flex flex-1 items-center justify-center gap-2 bg-emerald-700 py-3.5 text-sm font-semibold text-white"
    >
      Get a Quote
    </a>
  </div>
);

export default MobileStickyBar;
