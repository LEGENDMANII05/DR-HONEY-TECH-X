'use client';

import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

export function ExpandableDetails({ title = 'VIEW DETAILS', children }: { title?: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="expandable-wrap">
      <button type="button" className={`detail-toggle focus-ring ${open ? 'is-open' : ''}`} onClick={() => setOpen((v) => !v)} aria-expanded={open}>
        <span>{open ? 'HIDE DETAILS' : title}</span><ChevronDown size={16} />
      </button>
      <div className={`detail-panel ${open ? 'detail-panel-open' : ''}`} aria-hidden={!open}>
        <div className="detail-panel-inner">{children}</div>
      </div>
    </div>
  );
}
