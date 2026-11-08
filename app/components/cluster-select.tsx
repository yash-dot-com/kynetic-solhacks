"use client";

import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCluster, CLUSTERS } from "./cluster-context";

const clusterColors: Record<string, string> = {
  mainnet: "bg-success",
  devnet: "bg-info",
  testnet: "bg-warning",
  localnet: "bg-muted-foreground",
};

export function ClusterSelect() {
  const { cluster, setCluster } = useCluster();

  return (
    <Select value={cluster} onValueChange={(value) => value && setCluster(value as typeof cluster)}>
      <SelectTrigger className="h-9 w-[118px] rounded-full border-border bg-surface text-xs capitalize">
        <span className={`size-2 rounded-full ${clusterColors[cluster] ?? "bg-muted-foreground"}`} />
        <SelectValue />
      </SelectTrigger>
      <SelectContent align="end">
        <SelectGroup>
          {CLUSTERS.map((item) => (
            <SelectItem key={item} value={item} className="capitalize">
              <span className={`size-2 rounded-full ${clusterColors[item] ?? "bg-muted-foreground"}`} />
              {item}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
