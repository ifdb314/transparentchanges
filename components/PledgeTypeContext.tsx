"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

export type PledgeType = "money" | "word" | "volunteer" | "employee";

type Ctx = {
  pledgeType: PledgeType | "";
  setPledgeType: (t: PledgeType | "") => void;
};

const PledgeTypeContext = createContext<Ctx | null>(null);

export function PledgeTypeProvider({ children }: { children: ReactNode }) {
  const [pledgeType, setPledgeType] = useState<PledgeType | "">("");
  return (
    <PledgeTypeContext.Provider value={{ pledgeType, setPledgeType }}>
      {children}
    </PledgeTypeContext.Provider>
  );
}

export function usePledgeType() {
  const ctx = useContext(PledgeTypeContext);
  if (!ctx) throw new Error("usePledgeType must be used within a PledgeTypeProvider");
  return ctx;
}
