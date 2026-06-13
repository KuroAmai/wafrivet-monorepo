export type AdminLivestockCriticalAlertDto = {
  animalUid: string;
  species: string;
  message: string;
  severity: "HIGH";
};

export type AdminLivestockSummaryDto = {
  generatedAt: string;
  totalAnimals: number;
  speciesBreakdown: Record<string, number>;
  highSeverityAlertCount: number;
  criticalAlerts: AdminLivestockCriticalAlertDto[];
};

export type AdminAnimalListItemDto = {
  animalUid: string;
  species: string;
  breed: string | null;
  status: string;
  ownerId: string;
  ownerName: string;
  ownerEmail: string;
  farmId: string;
  farmName: string;
  ageLabel: string | null;
  lastEventType: string | null;
  lastEventAt: string | null;
  estimatedValueNgn: number | null;
  registeredAt: string;
  highAlertCount: number;
};

export type AdminAnimalListResponseDto = {
  data: AdminAnimalListItemDto[];
  meta: {
    nextCursor: string | null;
    hasNextPage: boolean;
  };
};

export type AdminAnimalAlertDto = {
  type: string;
  severity: string;
  message: string;
  context?: Record<string, unknown>;
};

export type AdminAnimalVitalSnapshotDto = {
  weightKg: number | null;
  bcs: number | null;
  recordedAt: string | null;
};

export type AdminAnimalDetailDto = {
  animalUid: string;
  species: string;
  breed: string | null;
  sex: string;
  status: string;
  name: string | null;
  dateOfBirth: string | null;
  ageLabel: string | null;
  productionType: string | null;
  tagEarNumber: string | null;
  weightKg: number | null;
  registeredAt: string;
  updatedAt: string;
  ownerId: string;
  ownerName: string;
  ownerEmail: string;
  farmId: string;
  farmName: string;
  alerts: AdminAnimalAlertDto[];
  latestVitals: AdminAnimalVitalSnapshotDto | null;
  estimatedValueNgn: number | null;
  clinicalCounts: {
    vaccinations: number;
    treatments: number;
    diagnoses: number;
    deworming: number;
    metrics: number;
  };
};

export type AdminAnimalClinicalEventDto = {
  id: string;
  kind: "DIAGNOSIS" | "VACCINATION" | "TREATMENT" | "DEWORMING" | "METRIC";
  title: string;
  summary: string | null;
  occurredAt: string;
  actorLabel: string | null;
};

export type AdminAnimalClinicalDto = {
  animalUid: string;
  events: AdminAnimalClinicalEventDto[];
};

export type AdminAnimalVitalsHistoryItemDto = {
  id: string;
  recordedAt: string;
  weightKg: number | null;
  bcs: number | null;
  milkYieldL: number | null;
  method: string | null;
};

export type AdminAnimalVitalsDto = {
  animalUid: string;
  species: string;
  breed: string | null;
  status: string;
  ownerName: string;
  farmName: string;
  alerts: AdminAnimalAlertDto[];
  latestVitals: AdminAnimalVitalSnapshotDto | null;
  history: AdminAnimalVitalsHistoryItemDto[];
  baselines: {
    avgWeightKg: number | null;
    avgBcs: number | null;
  };
};

export type AdminHealthEventListItemDto = {
  id: string;
  animalUid: string;
  species: string;
  ownerName: string;
  eventType: string;
  occurredAt: string;
  summary: string;
  loggedBy: string | null;
};

export type AdminHealthEventListResponseDto = {
  data: AdminHealthEventListItemDto[];
  meta: {
    nextCursor: string | null;
    hasNextPage: boolean;
  };
};

export type AdminDiagnosisListItemDto = {
  id: string;
  animalUid: string;
  species: string;
  ownerName: string;
  visitDate: string;
  visitType: string;
  diagnosisLabel: string | null;
  status: string;
  attendingVetId: string;
  attendingVetName: string | null;
};

export type AdminDiagnosisListResponseDto = {
  data: AdminDiagnosisListItemDto[];
  meta: {
    nextCursor: string | null;
    hasNextPage: boolean;
  };
};

export type AdminValuationListItemDto = {
  animalUid: string;
  species: string;
  breed: string | null;
  ownerName: string;
  farmName: string;
  weightKg: number | null;
  bcs: number | null;
  recordedAt: string | null;
  certificateId: string | null;
  estimatedValueNgn: number;
  method: "WEIGHT_ESTIMATE";
};

export type AdminValuationListResponseDto = {
  data: AdminValuationListItemDto[];
  meta: {
    nextCursor: string | null;
    hasNextPage: boolean;
  };
};
