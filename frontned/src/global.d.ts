declare interface Root {
  "@odata.count": number;
  "@search.coverage": any;
  "@search.facets": SearchFacets;
  value: Value[];
}

declare interface SearchFacets {
  CategoryIds: CategoryId[];
  BenefitNames: BenefitName[];
  Theme: Theme[];
  BranchId: BranchId[];
}

declare interface CategoryId {
  type: number;
  from: any;
  to: any;
  value: string;
  count: number;
}

declare interface BenefitName {
  type: number;
  from: any;
  to: any;
  value: string;
  count: number;
}

declare interface Theme {
  type: number;
  from: any;
  to: any;
  value: string;
  count: number;
}

declare interface BranchId {
  type: number;
  from: any;
  to: any;
  value: number;
  count: number;
}

declare interface Value {
  id: string;
  institutionId: number;
  organizationId: number;
  organizationIds: string[];
  branchId: number;
  branchIds: string[];
  organizationName: string;
  organizationProfilePicture: string;
  organizationNames: string[];
  name: string;
  description: string;
  location: string;
  startsOn: string;
  endsOn: string;
  imagePath: string;
  theme: string;
  categoryIds: string[];
  categoryNames: string[];
  benefitNames: string[];
  visibility: string;
  status: string;
  latitude?: string;
  longitude?: string;
  recScore: any;
  "@search.score": number;
}
