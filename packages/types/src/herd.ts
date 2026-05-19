export type AnimalStatus = "OPTIMAL" | "WARNING" | "CRITICAL" | "UNKNOWN";

export type AnimalResponseDto = {
  animalUid: string;
  name?: string;
  species?: string;
  breed?: string;
  status?: AnimalStatus;
  farmId?: string;
  wafId?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type FarmSnapshotDto = {
  farmId: string;
  name: string;
  animalCount?: number;
  location?: string;
};

export type FarmAnimalSnapshotDto = {
  animalUid: string;
  name?: string;
  species?: string;
  status?: AnimalStatus;
  lastVaccinationAt?: string;
};
