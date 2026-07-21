import { ShieldIcon, SparkIcon } from "./icons";

export function ScamNotice() {
  return (
    <div className="flex gap-3 rounded-2xl border border-amber-200 bg-amber-50/70 p-4 text-sm text-amber-900">
      <ShieldIcon className="mt-0.5 h-5 w-5 flex-shrink-0 text-amber-500" />
      <div>
        <p className="font-semibold">Scam safety</p>
        <p className="mt-1 leading-relaxed">
          You should <strong>never have to pay to apply</strong> for a job, and a legitimate employer will never ask you
          to buy your own equipment upfront or share bank details before hiring. If a listing asks for money, report it
          and walk away.
        </p>
      </div>
    </div>
  );
}

export function ReferralNudge() {
  return (
    <div className="flex gap-3 rounded-2xl border border-brand-200 bg-brand-50 p-4 text-sm text-brand-900">
      <SparkIcon className="mt-0.5 h-5 w-5 flex-shrink-0 text-brand-500" />
      <p className="leading-relaxed">
        Found this role here? Please <strong>mention AnywhereJobs</strong> in your application — it helps us keep
        surfacing truly location-independent jobs.
      </p>
    </div>
  );
}
