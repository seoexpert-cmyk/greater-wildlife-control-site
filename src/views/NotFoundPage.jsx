import React from 'react';
import { Bug, ArrowLeft } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-stone-50 px-6 text-center">
      <Bug className="mb-6 h-12 w-12 text-emerald-700" strokeWidth={1.5} />
      <h1 className="text-4xl font-bold text-stone-900">We couldn't find that page</h1>
      <p className="mt-3 max-w-md text-stone-600">
        The location or service you're looking for doesn't exist in our directory yet.
      </p>
      <a
        href="/"
        className="mt-8 inline-flex items-center gap-2 rounded-xl bg-emerald-700 px-6 py-3 font-semibold text-white transition hover:bg-emerald-800"
      >
        <ArrowLeft className="h-4 w-4" /> Back home
      </a>
    </div>
  );
};

export default NotFoundPage;
