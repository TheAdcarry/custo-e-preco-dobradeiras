import { environment } from "../environments/environment";

export const ApiUrls = {
    GROUPS: `${environment.apiBaseUrl}/api/v1/groups`,
    SIMILAR: `${environment.apiBaseUrl}/api/v1/similar`,
    PRODUCTS: `${environment.apiBaseUrl}/api/v1/products`,    
    REPROCESSA: `${environment.apiBaseUrl}/api/v1/reprocessa-precos`,
    LOG_CUSTOS_PRODUCTS: `${environment.apiBaseUrl}/api/log-custos/products`,
    LOG_CUSTOS_VISUALIZA_CUSTOS: `${environment.apiBaseUrl}/api/log-custos/visualiza-custos`,
};