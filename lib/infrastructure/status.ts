export type InfrastructureStatus = {
  apiGateway: "connected" | "unavailable";
  agentWorkers: "idle" | "disabled";
  vectorDatabase: "not_configured" | "offline";
  jobQueue: "inactive" | "offline";
  environment: "development" | "production";
  lastCheck: string;
};

export const infrastructureStatus: InfrastructureStatus = {
  apiGateway: "connected",
  agentWorkers: "idle",
  vectorDatabase: "not_configured",
  jobQueue: "inactive",
  environment: "development",
  lastCheck: new Date().toISOString(),
};