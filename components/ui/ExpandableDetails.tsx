import { ChevronDown } from 'lucide-react';

export function ExpandableDetails({ title = 'VIEW DETAILS', children }: { title?: string; children: React.ReactNode }) {
  return (
    <details className="expandable-wrap">
      <summary className="detail-toggle focus-ring">
        <span>{title}</span><ChevronDown size={16} aria-hidden="true" />
      </summary>
      <div className="detail-panel" role="region">
        <div className="detail-panel-inner">{children}</div>
      </div>
    </details>
  );
}
