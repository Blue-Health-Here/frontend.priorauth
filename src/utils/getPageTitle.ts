// getPageTitle.js
import { match } from "path-to-regexp";
import { pageTitles } from "./pageTitles";

export const getPageTitle = (pathname: string) => {
    for (const pattern in pageTitles) {
        const matcher = match(pattern, { decode: decodeURIComponent });
        const matched = matcher(pathname);
        if (matched) {
            return pageTitles[pattern];
        }
    }
    return "Unknown Page";
};
