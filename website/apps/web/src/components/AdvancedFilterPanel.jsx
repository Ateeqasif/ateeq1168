import React, { useState } from 'react';
import { ChevronDown, ChevronUp, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

const CITIES = ['Lahore', 'Karachi', 'Islamabad', 'Rawalpindi', 'Peshawar'];
const COURT_TYPES = ['Professional Glass Court', 'Premium Indoor Court', 'Outdoor Court', 'Standard Court'];
const ENVIRONMENTS = ['Indoor', 'Outdoor'];
const SURFACES = ['Glass', 'Artificial Grass', 'Concrete', 'Synthetic'];
const FACILITIES = ['Parking', 'Locker Rooms', 'Coaching', 'Cafe', 'First Aid', 'Equipment Rental'];
const SORT_OPTIONS = [
  { value: 'default', label: 'Default' },
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
  { value: 'name_asc', label: 'Name: A to Z' },
];

function FilterSection({ title, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-border last:border-0">
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className="flex w-full items-center justify-between py-3 text-sm font-bold uppercase tracking-wide text-foreground hover:text-primary transition-colors"
      >
        {title}
        {open ? <ChevronUp className="h-4 w-4 shrink-0" /> : <ChevronDown className="h-4 w-4 shrink-0" />}
      </button>
      {open && <div className="pb-4 space-y-2">{children}</div>}
    </div>
  );
}

function CheckItem({ id, label, count, checked, onChange }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Checkbox id={id} checked={checked} onCheckedChange={onChange} />
        <Label htmlFor={id} className="text-sm font-normal cursor-pointer text-muted-foreground hover:text-foreground transition-colors">
          {label}
        </Label>
      </div>
      {count !== undefined && (
        <span className="text-xs text-muted-foreground">{count.toLocaleString()}</span>
      )}
    </div>
  );
}

const AdvancedFilterPanel = ({ filters, onFiltersChange, arenaCounts = {}, onApply, onClear, className }) => {
  const toggle = (field, value) => {
    const current = filters[field] || [];
    const updated = current.includes(value)
      ? current.filter(v => v !== value)
      : [...current, value];
    onFiltersChange({ ...filters, [field]: updated });
  };

  const set = (field, value) => {
    onFiltersChange({ ...filters, [field]: value });
  };

  const handlePriceGo = () => {
    onApply?.();
  };

  const activeCount = [
    filters.cities?.length,
    filters.courtTypes?.length,
    filters.environments?.length,
    filters.surfaces?.length,
    filters.facilities?.length,
    filters.priceFrom ? 1 : 0,
    filters.priceTo ? 1 : 0,
    filters.sortBy !== 'default' ? 1 : 0,
  ].reduce((a, b) => a + (b || 0), 0);

  return (
    <div className={cn('bg-card border border-border rounded-xl overflow-hidden', className)}>
      {/* Header */}
      <div className="bg-primary px-4 py-3 flex items-center justify-between">
        <span className="text-sm font-bold uppercase tracking-wider text-primary-foreground">
          Show Results By
        </span>
        {activeCount > 0 && (
          <span className="text-xs bg-white/20 text-primary-foreground px-2 py-0.5 rounded-full font-semibold">
            {activeCount} active
          </span>
        )}
      </div>

      <div className="px-4 py-2 divide-y divide-border">
        {/* Sort By */}
        <FilterSection title="Sort By">
          <div className="space-y-2">
            {SORT_OPTIONS.map(opt => (
              <div key={opt.value} className="flex items-center gap-2">
                <input
                  type="radio"
                  id={`sort-${opt.value}`}
                  name="sortBy"
                  value={opt.value}
                  checked={filters.sortBy === opt.value}
                  onChange={() => set('sortBy', opt.value)}
                  className="accent-primary cursor-pointer"
                />
                <Label htmlFor={`sort-${opt.value}`} className="text-sm font-normal cursor-pointer text-muted-foreground hover:text-foreground transition-colors">
                  {opt.label}
                </Label>
              </div>
            ))}
          </div>
        </FilterSection>

        {/* City */}
        <FilterSection title="City">
          {CITIES.map(city => (
            <CheckItem
              key={city}
              id={`city-${city}`}
              label={city}
              count={arenaCounts[city]}
              checked={(filters.cities || []).includes(city)}
              onChange={() => toggle('cities', city)}
            />
          ))}
        </FilterSection>

        {/* Price Range */}
        <FilterSection title="Price Range (Rs.)">
          <div className="flex items-center gap-2">
            <Input
              type="number"
              placeholder="From"
              value={filters.priceFrom || ''}
              onChange={e => set('priceFrom', e.target.value)}
              className="h-8 text-sm"
            />
            <Input
              type="number"
              placeholder="To"
              value={filters.priceTo || ''}
              onChange={e => set('priceTo', e.target.value)}
              className="h-8 text-sm"
            />
            <Button size="sm" onClick={handlePriceGo} className="h-8 px-3 shrink-0 bg-primary hover:bg-primary/90">
              Go
            </Button>
          </div>
        </FilterSection>

        {/* Court Type */}
        <FilterSection title="Court Type">
          {COURT_TYPES.map(type => (
            <CheckItem
              key={type}
              id={`type-${type}`}
              label={type}
              checked={(filters.courtTypes || []).includes(type)}
              onChange={() => toggle('courtTypes', type)}
            />
          ))}
        </FilterSection>

        {/* Indoor / Outdoor */}
        <FilterSection title="Environment" defaultOpen={false}>
          {ENVIRONMENTS.map(env => (
            <CheckItem
              key={env}
              id={`env-${env}`}
              label={env}
              checked={(filters.environments || []).includes(env)}
              onChange={() => toggle('environments', env)}
            />
          ))}
        </FilterSection>

        {/* Surface Type */}
        <FilterSection title="Surface Type" defaultOpen={false}>
          {SURFACES.map(surface => (
            <CheckItem
              key={surface}
              id={`surface-${surface}`}
              label={surface}
              checked={(filters.surfaces || []).includes(surface)}
              onChange={() => toggle('surfaces', surface)}
            />
          ))}
        </FilterSection>

        {/* Facilities */}
        <FilterSection title="Facilities" defaultOpen={false}>
          {FACILITIES.map(facility => (
            <CheckItem
              key={facility}
              id={`facility-${facility}`}
              label={facility}
              checked={(filters.facilities || []).includes(facility)}
              onChange={() => toggle('facilities', facility)}
            />
          ))}
        </FilterSection>
      </div>

      {/* Footer Actions */}
      <div className="px-4 py-3 border-t border-border flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onClear}
          className="flex-1 text-xs border-border hover:bg-muted"
        >
          <RotateCcw className="h-3 w-3 mr-1" />
          Clear All
        </Button>
        {onApply && (
          <Button
            size="sm"
            onClick={onApply}
            className="flex-1 text-xs bg-primary hover:bg-primary/90"
          >
            Apply Filters
          </Button>
        )}
      </div>
    </div>
  );
};

export default AdvancedFilterPanel;
