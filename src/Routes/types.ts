export const RoutesPrefixes = {
    homePage: '/home',
    dashBoard: '/dashboard',
    contract: '/contract',
    searchPage: '/search',
    authenticateUser: '/authenticateUser',
    page404: '/page404',

};

export interface Page {
    
    path: string;
    exact?: boolean;
    component: JSX.Element;
    isPrivate?: boolean;
}