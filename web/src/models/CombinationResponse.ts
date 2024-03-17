import { CombinationResult } from "./CombinationResult";

export interface CombinationResponse {
  result: Array<CombinationResult>;
  completed: boolean;
}
