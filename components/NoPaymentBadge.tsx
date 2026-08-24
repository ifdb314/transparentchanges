"use client";

import { usePledgeType } from "@/components/PledgeTypeContext";

export function NoPaymentBadge() {
  const { pledgeType } = usePledgeType();
  if (pledgeType !== "money") return null;
  return <div className="band-eyebrow">No payment required</div>;
}
