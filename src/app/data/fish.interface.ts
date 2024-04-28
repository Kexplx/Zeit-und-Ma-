type River = 'Donau' | 'Rhein' | 'Weser' | 'Elbe';

export interface Fish {
  name: string;
  latinName: string;
  noFishingPeriod: string | null;
  minSizeInCm: number | null;
  catchmentAreas: River[];
  imageUrl: string | null;
}
